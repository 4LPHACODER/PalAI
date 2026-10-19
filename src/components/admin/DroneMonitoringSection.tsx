import { useState, useRef, useEffect, useCallback } from 'react';
import {
  VideoOffIcon,
  RadioIcon,
  CameraIcon,
  UploadCloudIcon,
  SparklesIcon,
  WifiOffIcon,
  ShieldAlertIcon,
  InfoIcon,
  CpuIcon,
  SmartphoneIcon,
  Settings2Icon,
  RotateCcwIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  AlertTriangleIcon,
  CheckCircle2Icon
} from 'lucide-react';
import { AdminTab } from './AdminSidebar';
import { toast } from 'sonner';
import {
  DroneConnectionConfig,
  ConnectionStatus,
  StreamDiagnostics,
  CapturedDroneFrame
} from '../../types/droneConnection';
import { DroneConnectionSettingsModal } from './DroneConnectionSettingsModal';
import { CapturedFrameModal } from './CapturedFrameModal';

interface DroneMonitoringSectionProps {
  onOpenAiModal: () => void;
  onNavigateTab: (tab: AdminTab) => void;
  onStageCapturedFrame: (frame: CapturedDroneFrame) => void;
}

const DEFAULT_CONFIG: DroneConnectionConfig = {
  ip: '192.168.1.1',
  port: '8080',
  protocol: 'mjpeg',
  path: '/mjpeg',
  customUrl: '',
  gatewayUrl: 'http://localhost:8088/stream',
  autoReconnect: false,
};

export function DroneMonitoringSection({
  onOpenAiModal,
  onNavigateTab,
  onStageCapturedFrame,
}: DroneMonitoringSectionProps) {
  // Load saved connection settings from localStorage if available
  const [config, setConfig] = useState<DroneConnectionConfig>(() => {
    try {
      const saved = localStorage.getItem('palai_drone_config');
      return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [showHudOverlay, setShowHudOverlay] = useState(true);
  const [diagnostics, setDiagnostics] = useState<StreamDiagnostics>({
    status: 'disconnected',
    measuredWidth: 0,
    measuredHeight: 0,
    fps: 0,
  });

  const [capturedFrame, setCapturedFrame] = useState<CapturedDroneFrame | null>(null);

  // Video and Image references
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const connectionTimeoutRef = useRef<number | null>(null);
  const frameCountRef = useRef<number>(0);
  const lastFpsCalcTimeRef = useRef<number>(performance.now());
  const animationFrameIdRef = useRef<number | null>(null);

  // Save config
  const handleSaveConfig = (newConfig: DroneConnectionConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('palai_drone_config', JSON.stringify(newConfig));
    } catch {
      // Ignore localStorage write error in strict sandboxes
    }
    toast.success('Connection parameters updated.');
  };

  // Safe disconnection cleanup
  const handleDisconnect = useCallback(() => {
    if (connectionTimeoutRef.current) {
      window.clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = null;
    }

    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }

    // Stop browser camera tracks if active
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = '';
    }

    if (imgRef.current) {
      imgRef.current.src = '';
    }

    setConnectionStatus('disconnected');
    setDiagnostics({
      status: 'disconnected',
      measuredWidth: 0,
      measuredHeight: 0,
      fps: 0,
    });

    toast.info('Drone camera disconnected.');
  }, []);

  // Compute streaming URL
  const getStreamUrl = (cfg: DroneConnectionConfig) => {
    if (cfg.protocol === 'custom_url') return cfg.customUrl;
    if (cfg.protocol === 'rtsp_gateway') {
      const base = cfg.gatewayUrl || 'http://localhost:8088/stream';
      if (base.includes('?url=')) return base;
      const targetRtsp = `rtsp://${cfg.ip}:${cfg.port}${cfg.path}`;
      return `${base}?url=${encodeURIComponent(targetRtsp)}`;
    }
    if (cfg.protocol === 'hls') return `http://${cfg.ip}:${cfg.port}${cfg.path}`;
    return `http://${cfg.ip}:${cfg.port}${cfg.path}`;
  };

  // Establish connection
  const handleConnect = useCallback(
    async (configToUse: DroneConnectionConfig = config) => {
      // Clean up any ongoing stream first
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (connectionTimeoutRef.current) {
        window.clearTimeout(connectionTimeoutRef.current);
      }

      setConnectionStatus('connecting');
      setDiagnostics({
        status: 'connecting',
        measuredWidth: 0,
        measuredHeight: 0,
        fps: 0,
        errorMessage: undefined,
      });

      // MODE 1: Browser Camera / UVC Video Input
      if (configToUse.protocol === 'browser_camera') {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1920 },
              height: { ideal: 1080 },
              facingMode: 'environment',
            },
            audio: false,
          });

          mediaStreamRef.current = stream;

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
                setConnectionStatus('connected');
                setDiagnostics({
                  status: 'connected',
                  measuredWidth: videoRef.current.videoWidth,
                  measuredHeight: videoRef.current.videoHeight,
                  fps: 30,
                  connectedAt: new Date().toLocaleTimeString(),
                });
                toast.success('Live camera stream established.');
              }
            };
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Permission denied or video capture device unavailable.';
          setConnectionStatus('connection_failed');
          setDiagnostics({
            status: 'connection_failed',
            measuredWidth: 0,
            measuredHeight: 0,
            fps: 0,
            errorMessage: `Device Error: ${msg}`,
          });
          toast.error(`Video stream error: ${msg}`);
        }
        return;
      }

      // MODE 2: HTTP MJPEG Stream & RTSP Gateway (both decoded as multipart/x-mixed-replace in <img>)
      if (configToUse.protocol === 'mjpeg' || configToUse.protocol === 'rtsp_gateway') {
        const streamUrl = getStreamUrl(configToUse);

        // Timeout handler (10 seconds)
        connectionTimeoutRef.current = window.setTimeout(() => {
          setConnectionStatus('connection_failed');
          setDiagnostics({
            status: 'connection_failed',
            measuredWidth: 0,
            measuredHeight: 0,
            fps: 0,
            errorMessage:
              configToUse.protocol === 'rtsp_gateway'
                ? `Connection timeout reaching RTSP gateway (${streamUrl}). Verify "npm run gateway" is running and laptop is connected to drone Wi-Fi.`
                : `Connection timeout reaching ${streamUrl}. Verify Windows is connected to drone Wi-Fi.`,
          });
          toast.error(`Connection timeout reaching ${configToUse.ip}:${configToUse.port}`);
        }, 10000);

        if (imgRef.current) {
          imgRef.current.onload = () => {
            if (connectionTimeoutRef.current) {
              window.clearTimeout(connectionTimeoutRef.current);
              connectionTimeoutRef.current = null;
            }
            if (imgRef.current && imgRef.current.naturalWidth > 0) {
              setConnectionStatus('connected');
              setDiagnostics({
                status: 'connected',
                measuredWidth: imgRef.current.naturalWidth,
                measuredHeight: imgRef.current.naturalHeight,
                fps: 25,
                connectedAt: new Date().toLocaleTimeString(),
              });
              toast.success(
                configToUse.protocol === 'rtsp_gateway'
                  ? `Connected to RTSP stream via Local Gateway`
                  : `Connected to MJPEG stream on ${configToUse.ip}`
              );
            }
          };

          imgRef.current.onerror = () => {
            if (connectionTimeoutRef.current) {
              window.clearTimeout(connectionTimeoutRef.current);
              connectionTimeoutRef.current = null;
            }
            setConnectionStatus('connection_failed');
            setDiagnostics({
              status: 'connection_failed',
              measuredWidth: 0,
              measuredHeight: 0,
              fps: 0,
              errorMessage:
                configToUse.protocol === 'rtsp_gateway'
                  ? `Unable to open stream via Local Gateway (${streamUrl}). Verify "npm run gateway" is running and laptop is on drone Wi-Fi.`
                  : `Unable to open MJPEG stream at ${streamUrl}. Check drone IP, port, and CORS policy.`,
            });
            toast.error('Connection refused or stream endpoint unavailable.');
          };

          // Trigger stream request
          imgRef.current.src = streamUrl;
        }
        return;
      }

      // MODE 3: HLS / Custom URL (HTML5 Video Element)
      if (configToUse.protocol === 'hls' || configToUse.protocol === 'custom_url') {
        const streamUrl = getStreamUrl(configToUse);

        connectionTimeoutRef.current = window.setTimeout(() => {
          setConnectionStatus('connection_failed');
          setDiagnostics({
            status: 'connection_failed',
            measuredWidth: 0,
            measuredHeight: 0,
            fps: 0,
            errorMessage: `Stream timeout: No video packets received from ${streamUrl}.`,
          });
          toast.error(`Failed to connect to ${streamUrl}`);
        }, 8000);

        if (videoRef.current) {
          videoRef.current.src = streamUrl;
          videoRef.current.onplaying = () => {
            if (connectionTimeoutRef.current) {
              window.clearTimeout(connectionTimeoutRef.current);
              connectionTimeoutRef.current = null;
            }
            if (videoRef.current) {
              setConnectionStatus('connected');
              setDiagnostics({
                status: 'connected',
                measuredWidth: videoRef.current.videoWidth,
                measuredHeight: videoRef.current.videoHeight,
                fps: 30,
                connectedAt: new Date().toLocaleTimeString(),
              });
              toast.success('Live stream initialized successfully.');
            }
          };

          videoRef.current.onerror = () => {
            if (connectionTimeoutRef.current) {
              window.clearTimeout(connectionTimeoutRef.current);
              connectionTimeoutRef.current = null;
            }
            setConnectionStatus('connection_failed');
            setDiagnostics({
              status: 'connection_failed',
              measuredWidth: 0,
              measuredHeight: 0,
              fps: 0,
              errorMessage: `Stream format error or unreachable server at ${streamUrl}.`,
            });
            toast.error('Video stream error: Target endpoint unreachable.');
          };

          videoRef.current.load();
          videoRef.current.play().catch(() => {});
        }
      }
    },
    [config]
  );

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      handleDisconnect();
    };
  }, [handleDisconnect]);

  // Measure FPS accurately when video is playing
  useEffect(() => {
    if (connectionStatus !== 'connected') return;

    let mounted = true;
    const calcFps = () => {
      frameCountRef.current += 1;
      const now = performance.now();
      const elapsed = now - lastFpsCalcTimeRef.current;

      if (elapsed >= 1000) {
        const measuredFps = (frameCountRef.current * 1000) / elapsed;
        if (mounted) {
          setDiagnostics((prev) => ({
            ...prev,
            fps: Math.round(measuredFps * 10) / 10,
            measuredWidth:
              videoRef.current?.videoWidth ||
              imgRef.current?.naturalWidth ||
              prev.measuredWidth,
            measuredHeight:
              videoRef.current?.videoHeight ||
              imgRef.current?.naturalHeight ||
              prev.measuredHeight,
          }));
        }
        frameCountRef.current = 0;
        lastFpsCalcTimeRef.current = now;
      }

      if (mounted && connectionStatus === 'connected') {
        animationFrameIdRef.current = requestAnimationFrame(calcFps);
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(calcFps);

    return () => {
      mounted = false;
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [connectionStatus]);

  // FRAME CAPTURE FEATURE (Canvas-based uncompressed snapshot extraction)
  const handleCaptureImage = () => {
    if (connectionStatus !== 'connected') {
      toast.error('Capture disabled: No active camera stream available.');
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      let width = 0;
      let height = 0;

      if ((config.protocol === 'mjpeg' || config.protocol === 'rtsp_gateway') && imgRef.current) {
        width = imgRef.current.naturalWidth || 1920;
        height = imgRef.current.naturalHeight || 1080;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Cannot get 2D canvas context');
        ctx.drawImage(imgRef.current, 0, 0, width, height);
      } else if (videoRef.current) {
        width = videoRef.current.videoWidth || 1920;
        height = videoRef.current.videoHeight || 1080;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Cannot get 2D canvas context');
        ctx.drawImage(videoRef.current, 0, 0, width, height);
      } else {
        throw new Error('No valid video or image element found for frame grab');
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      // Estimate size in bytes from base64 string
      const sizeBytes = Math.round((dataUrl.length * 3) / 4);
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const filename = `lyzrc_l600_frame_${Date.now()}.jpg`;

      const newFrame: CapturedDroneFrame = {
        id: `capture-${Date.now()}`,
        dataUrl,
        timestamp,
        width,
        height,
        sizeBytes,
        filename,
      };

      setCapturedFrame(newFrame);
      toast.success(`Frame captured (${width} × ${height} px).`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to capture frame due to CORS / Security restriction.';
      toast.error(`Capture Error: ${msg}`);
    }
  };

  // Stage captured frame to AI Analysis queue
  const handleSendToAi = (frame: CapturedDroneFrame) => {
    onStageCapturedFrame(frame);
    setCapturedFrame(null);
    onNavigateTab('upload');
    toast.success('Live frame staged for PalAI disease detection workflow.');
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[22px] font-bold text-primary-dark">Drone Monitoring Station</h2>

            {connectionStatus === 'connected' ? (
              <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold text-primary border border-primary/30 flex items-center gap-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Live Camera Connected
              </span>
            ) : connectionStatus === 'connecting' ? (
              <span className="rounded-full bg-warn-soft px-3 py-1 text-[11px] font-bold text-warn border border-accent/40 flex items-center gap-1.5 shadow-sm">
                <Loader2Icon className="h-3 w-3 animate-spin" />
                Connecting...
              </span>
            ) : connectionStatus === 'connection_failed' ? (
              <span className="rounded-full bg-danger-soft px-3 py-1 text-[11px] font-bold text-danger border border-danger/30 flex items-center gap-1.5 shadow-sm">
                <AlertTriangleIcon className="h-3 w-3" />
                Connection Failed
              </span>
            ) : (
              <span className="rounded-full bg-canvas px-3 py-1 text-[11px] font-bold text-ink-muted border border-line flex items-center gap-1.5 shadow-sm">
                <WifiOffIcon className="h-3 w-3" />
                Disconnected
              </span>
            )}
          </div>
          <p className="mt-1 text-[14px] text-ink-muted">
            Live IP video feed and telemetry receiver for the <strong>LYZRC L600 Pro</strong> drone via{' '}
            <strong>RX Drone GPS</strong>.
          </p>
        </div>

        {/* Quick Hardware & Configuration Pills */}
        <div className="flex items-center gap-2 text-[12px]">
          <button
            type="button"
            onClick={() => setSettingsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-2 font-bold text-primary hover:bg-primary-soft/50 transition-colors shadow-sm"
          >
            <Settings2Icon className="h-4 w-4 text-primary" />
            <span>Connection Settings</span>
          </button>
          <span className="hidden sm:inline-flex rounded-xl border border-line bg-card px-3 py-2 font-medium text-ink items-center gap-1.5 shadow-sm">
            <CpuIcon className="h-3.5 w-3.5 text-primary" />
            LYZRC L600 Pro
          </span>
        </div>
      </div>

      {/* Cockpit / Camera Container (16:9 responsive HUD) */}
      <div className="relative w-full aspect-video min-h-[380px] max-h-[580px] rounded-3xl overflow-hidden bg-[#0a100d] border border-primary-dark/40 shadow-2xl flex flex-col justify-between p-4 sm:p-6 text-white select-none">
        {/* REAL VIDEO PLAYER LAYERS */}
        {/* HTML5 Video for Browser Camera / HLS / Custom URL */}
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          className={`absolute inset-0 h-full w-full object-contain z-0 ${
            connectionStatus === 'connected' &&
            config.protocol !== 'mjpeg' &&
            config.protocol !== 'rtsp_gateway'
              ? 'block'
              : 'hidden'
          }`}
        />

        {/* Image element for Direct HTTP MJPEG and Local RTSP Gateway */}
        <img
          ref={imgRef}
          alt="LYZRC L600 Pro Live Stream"
          crossOrigin="anonymous"
          className={`absolute inset-0 h-full w-full object-contain z-0 ${
            connectionStatus === 'connected' &&
            (config.protocol === 'mjpeg' || config.protocol === 'rtsp_gateway')
              ? 'block'
              : 'hidden'
          }`}
        />

        {/* Subtle Grid / Cockpit HUD Background (Toggleable) */}
        {showHudOverlay && (
          <div
            className="absolute inset-0 pointer-events-none opacity-25 z-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        )}

        {/* HUD Pitch Ladder & Reticle (Center Overlay, Toggleable) */}
        {showHudOverlay && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div className="relative flex flex-col items-center opacity-30">
              {/* Horizon bar */}
              <div className="w-48 h-0.5 bg-white" />
              <div className="w-1 h-3 bg-white" />
              {/* Crosshairs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* HUD Top Bar: Measured Metrics & Connection Status */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono tracking-wider text-white/80 backdrop-blur-[2px]">
          <div className="flex items-center gap-3">
            {connectionStatus === 'connected' ? (
              <span className="flex items-center gap-1.5 text-primary font-bold bg-primary/20 border border-primary/40 px-2.5 py-1 rounded-lg">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                LIVE STREAM
              </span>
            ) : connectionStatus === 'connecting' ? (
              <span className="flex items-center gap-1.5 text-warn font-bold bg-warn/20 border border-accent/40 px-2.5 py-1 rounded-lg">
                <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
                CONNECTING
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-danger font-bold bg-danger/20 border border-danger/40 px-2.5 py-1 rounded-lg">
                <span className="h-2 w-2 rounded-full bg-danger animate-ping" />
                OFFLINE
              </span>
            )}

            {/* Configured Protocol & Endpoint Pill */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-white/70">
              <RadioIcon className="h-3.5 w-3.5 text-accent" />
              {config.protocol === 'browser_camera'
                ? 'UVC Video Receiver'
                : `${config.ip}:${config.port}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Measured Resolution & FPS when Connected */}
            {connectionStatus === 'connected' && (
              <span className="bg-white/10 px-2.5 py-1 rounded-lg text-white font-bold text-[11px]">
                {diagnostics.measuredWidth}×{diagnostics.measuredHeight} · {diagnostics.fps} FPS
              </span>
            )}

            {/* Toggle HUD Crosshair Overlays */}
            <button
              type="button"
              onClick={() => setShowHudOverlay((prev) => !prev)}
              title={showHudOverlay ? 'Hide HUD Overlays' : 'Show HUD Overlays'}
              className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {showHudOverlay ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Center Content: Standby or Connection Error when not connected */}
        {connectionStatus !== 'connected' && (
          <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center px-4">
            {connectionStatus === 'connecting' ? (
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <span className="grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 border border-primary/30 text-primary shadow-inner">
                    <Loader2Icon className="h-10 w-10 animate-spin" />
                  </span>
                </div>
                <h3 className="text-[20px] font-bold text-white tracking-tight">
                  Establishing Stream Connection...
                </h3>
                <p className="mt-1 text-[13px] text-white/60 max-w-md font-mono">
                  Target: {config.protocol === 'browser_camera' ? 'UVC Receiver' : `${config.ip}:${config.port}${config.path}`}
                </p>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="mt-5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-bold text-white hover:bg-white/20 transition-colors"
                >
                  Cancel Connection
                </button>
              </div>
            ) : connectionStatus === 'connection_failed' ? (
              <div className="flex flex-col items-center max-w-lg">
                <div className="relative mb-3">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-danger/20 border border-danger/40 text-danger">
                    <AlertTriangleIcon className="h-8 w-8" />
                  </span>
                </div>
                <h3 className="text-[20px] font-bold text-white tracking-tight">
                  Connection Attempt Failed
                </h3>
                <p className="mt-2 text-[13px] text-danger-soft/90 leading-relaxed bg-danger/20 border border-danger/40 p-3 rounded-xl font-mono">
                  {diagnostics.errorMessage || 'Target drone IP unreachable or stream rejected.'}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleConnect(config)}
                    className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white shadow-cta hover:bg-primary-dark transition-colors"
                  >
                    <RotateCcwIcon className="h-3.5 w-3.5" />
                    <span>Retry Connection</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettingsModalOpen(true)}
                    className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-bold text-white hover:bg-white/20 transition-colors"
                  >
                    <Settings2Icon className="h-3.5 w-3.5" />
                    <span>Adjust IP Settings</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white/5 border border-white/10 text-white/40 shadow-inner">
                    <VideoOffIcon className="h-10 w-10 text-danger" aria-hidden />
                  </span>
                  <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-danger text-white">
                    <WifiOffIcon className="h-3.5 w-3.5" />
                  </span>
                </div>

                <span className="rounded-full bg-danger/20 border border-danger/40 px-3 py-1 text-[12px] font-bold text-danger uppercase tracking-wider mb-2">
                  Drone Not Connected
                </span>
                <h3 className="text-[20px] sm:text-[24px] font-extrabold text-white tracking-tight">
                  Camera Feed Offline
                </h3>
                <p className="mt-1 text-[14px] text-white/60 max-w-md leading-relaxed">
                  Connect your Windows computer to the <strong>LYZRC L600 Pro</strong> Wi-Fi access point, verify
                  the camera stream IP, and initialize the connection.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleConnect(config)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[14px] font-bold text-white shadow-cta hover:bg-primary-dark transition-all"
                  >
                    <RadioIcon className="h-4 w-4" />
                    <span>Connect Drone ({config.ip})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettingsModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-[14px] font-bold text-white hover:bg-white/20 transition-all border border-white/10"
                  >
                    <Settings2Icon className="h-4 w-4" />
                    <span>Configure IP & Protocol</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HUD Bottom Bar: Unfabricated Telemetry Indicators */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono tracking-wider text-white/70 border-t border-white/10 pt-2.5 backdrop-blur-[2px]">
          <div className="flex items-center gap-4">
            <span title="MAVLink / GPS telemetry requires paired flight controller link">
              GPS: <span className="text-white/50">Unavailable</span>
            </span>
            <span title="Barometer AGL telemetry requires paired flight controller link">
              ALT: <span className="text-white/50">Unavailable</span>
            </span>
            <span title="Ground speed telemetry requires paired flight controller link">
              SPEED: <span className="text-white/50">Unavailable</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span title="Smart battery telemetry requires paired flight controller link">
              BATT: <span className="text-white/50">Unavailable</span>
            </span>
            <span title="Gimbal pitch servo telemetry">
              GIMBAL: <span className="text-white/50">Manual</span>
            </span>
          </div>
        </div>
      </div>

      {/* Station Camera Controls Panel */}
      <div className="rounded-2xl border border-line bg-card p-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-[16px] font-bold text-primary-dark">Station Camera Controls</h3>
            <p className="text-[13px] text-ink-muted">
              Live frame capture is active when a verified video stream is initialized.
            </p>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Connect Drone */}
            {connectionStatus !== 'connected' ? (
              <button
                type="button"
                onClick={() => handleConnect(config)}
                disabled={connectionStatus === 'connecting'}
                className="flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-[14px] font-bold text-white shadow-cta hover:bg-primary-dark disabled:opacity-50 transition-colors"
              >
                {connectionStatus === 'connecting' ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  <RadioIcon className="h-4 w-4" />
                )}
                <span>Connect Drone</span>
              </button>
            ) : (
              /* Disconnect Drone */
              <button
                type="button"
                onClick={handleDisconnect}
                className="flex h-11 items-center gap-2 rounded-xl border border-danger/30 bg-danger-soft px-4 text-[14px] font-bold text-danger hover:bg-danger hover:text-white transition-colors"
              >
                <WifiOffIcon className="h-4 w-4" />
                <span>Disconnect</span>
              </button>
            )}

            {/* Capture Image Button */}
            <button
              type="button"
              onClick={handleCaptureImage}
              disabled={connectionStatus !== 'connected'}
              title={connectionStatus !== 'connected' ? 'Capture requires active live video stream' : 'Capture current video frame'}
              className={`flex h-11 items-center gap-2 rounded-xl px-4 text-[14px] font-bold transition-all ${
                connectionStatus === 'connected'
                  ? 'bg-primary text-white shadow-cta hover:bg-primary-dark cursor-pointer'
                  : 'border border-line bg-canvas text-ink-muted/50 cursor-not-allowed'
              }`}
            >
              <CameraIcon className="h-4 w-4" />
              <span>Capture Image</span>
            </button>

            {/* Upload Image (Active shortcut to Image Analysis) */}
            <button
              type="button"
              onClick={() => onNavigateTab('upload')}
              className="flex h-11 items-center gap-2 rounded-xl border border-line bg-card px-4 text-[14px] font-bold text-ink hover:bg-canvas transition-colors"
            >
              <UploadCloudIcon className="h-4 w-4 text-primary" />
              <span>Upload Image</span>
            </button>

            {/* Analyze Image */}
            <button
              type="button"
              onClick={onOpenAiModal}
              className="flex h-11 items-center gap-2 rounded-xl border border-primary/40 bg-primary-soft px-4 text-[14px] font-bold text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <SparklesIcon className="h-4 w-4" />
              <span>Analyze Image</span>
            </button>

            {/* Connection Settings */}
            <button
              type="button"
              onClick={() => setSettingsModalOpen(true)}
              title="Open Connection Settings"
              className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-card text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
            >
              <Settings2Icon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Guidance notice below controls */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-canvas p-3 border border-line text-[12px] text-ink-muted">
          <InfoIcon className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden />
          <span>
            <strong>Authentic Video Integration:</strong> Live video is received directly from the verified drone IP or local gateway.
            Captured frames are extracted in full resolution via HTML5 Canvas and can be directly staged for the PalAI rice disease analysis pipeline.
            Unconnected telemetry sensors are labeled <em>Unavailable</em>.
          </span>
        </div>
      </div>

      {/* Target Hardware Specifications & Companion Setup Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* LYZRC L600 Pro Specs */}
        <div className="rounded-2xl border border-line bg-card p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
              <CpuIcon className="h-5 w-5" />
            </span>
            <div>
              <h4 className="text-[15px] font-bold text-primary-dark">LYZRC L600 Pro</h4>
              <p className="text-[11px] text-ink-muted">Dual Camera Survey Drone</p>
            </div>
          </div>
          <dl className="space-y-1.5 text-[13px] border-t border-line pt-3">
            <div className="flex justify-between py-1 border-b border-line/60">
              <dt className="text-ink-muted">Camera Sensor</dt>
              <dd className="font-semibold text-ink">4K Ultra HD (3840×2160)</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-line/60">
              <dt className="text-ink-muted">Gimbal Stabilization</dt>
              <dd className="font-semibold text-ink">3-Axis Electronic (EIS)</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-line/60">
              <dt className="text-ink-muted">Target IP Endpoint</dt>
              <dd className="font-mono font-semibold text-ink">{config.ip}:{config.port}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-ink-muted">Protocol Mode</dt>
              <dd className="font-bold text-primary capitalize">{config.protocol.replace('_', ' ')}</dd>
            </div>
          </dl>
        </div>

        {/* RX Drone GPS Companion App */}
        <div className="rounded-2xl border border-line bg-card p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-soft text-accent-ink">
              <SmartphoneIcon className="h-5 w-5" />
            </span>
            <div>
              <h4 className="text-[15px] font-bold text-primary-dark">RX Drone GPS</h4>
              <p className="text-[11px] text-ink-muted">Companion Mobile Application</p>
            </div>
          </div>
          <dl className="space-y-1.5 text-[13px] border-t border-line pt-3">
            <div className="flex justify-between py-1 border-b border-line/60">
              <dt className="text-ink-muted">Protocol Version</dt>
              <dd className="font-semibold text-ink">v3.2.0 (5GHz Wi-Fi)</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-line/60">
              <dt className="text-ink-muted">Stream Gateway</dt>
              <dd className="font-mono text-ink">{config.ip}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-line/60">
              <dt className="text-ink-muted">Video Path</dt>
              <dd className="font-mono text-ink">{config.path}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-ink-muted">FPV Transmission</dt>
              <dd className="font-semibold text-ink">Up to 1000m HD Video</dd>
            </div>
          </dl>
        </div>

        {/* Pre-Flight Checklist */}
        <div className="rounded-2xl border border-line bg-card p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
              <ShieldAlertIcon className="h-5 w-5" />
            </span>
            <div>
              <h4 className="text-[15px] font-bold text-primary-dark">Ground Testing Protocol</h4>
              <p className="text-[11px] text-ink-muted">Safe network verification</p>
            </div>
          </div>
          <ul className="space-y-2 text-[13px] border-t border-line pt-3">
            <li className="flex items-center gap-2 text-ink">
              <CheckCircle2Icon className="h-4 w-4 text-primary shrink-0" />
              <span>Drone stationary, motors disarmed</span>
            </li>
            <li className="flex items-center gap-2 text-ink">
              <CheckCircle2Icon className="h-4 w-4 text-primary shrink-0" />
              <span>Windows connected to drone AP</span>
            </li>
            <li className="flex items-center gap-2 text-ink">
              <CheckCircle2Icon className="h-4 w-4 text-primary shrink-0" />
              <span>IP and port verified via PowerShell</span>
            </li>
            <li className="flex items-center gap-2 text-ink">
              <CheckCircle2Icon className="h-4 w-4 text-primary shrink-0" />
              <span>Local video gateway active if RTSP</span>
            </li>
          </ul>
        </div>
      </div>

      {/* MODALS */}
      {/* 1. Connection Settings Modal */}
      <DroneConnectionSettingsModal
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onConnect={(cfg) => handleConnect(cfg || config)}
        connectionStatus={connectionStatus}
        errorMessage={diagnostics.errorMessage}
      />

      {/* 2. Captured Frame Inspection & AI Staging Modal */}
      <CapturedFrameModal
        frame={capturedFrame}
        onClose={() => setCapturedFrame(null)}
        onSendToAiAnalysis={handleSendToAi}
      />
    </div>
  );
}
