import { useState } from 'react';
import {
  XIcon,
  RadioIcon,
  HelpCircleIcon,
  AlertTriangleIcon,
  TerminalIcon,
  PlayIcon,
  SaveIcon,
  CameraIcon
} from 'lucide-react';
import { DroneConnectionConfig, StreamProtocol, ConnectionStatus } from '../../types/droneConnection';

interface DroneConnectionSettingsModalProps {
  open: boolean;
  onClose: () => void;
  config: DroneConnectionConfig;
  onSaveConfig: (newConfig: DroneConnectionConfig) => void;
  onConnect: (configToUse?: DroneConnectionConfig) => void;
  connectionStatus: ConnectionStatus;
  errorMessage?: string;
}

export function DroneConnectionSettingsModal({
  open,
  onClose,
  config,
  onSaveConfig,
  onConnect,
  connectionStatus,
  errorMessage,
}: DroneConnectionSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'settings' | 'guide' | 'gateway'>('settings');
  const [form, setForm] = useState<DroneConnectionConfig>({ ...config });

  if (!open) return null;

  const handleProtocolChange = (protocol: StreamProtocol) => {
    let defaultPort = form.port;
    let defaultPath = form.path;

    if (protocol === 'mjpeg') {
      defaultPort = form.port === '554' ? '8080' : form.port || '8080';
      defaultPath = form.path === '/live/ch0' ? '/mjpeg' : form.path || '/mjpeg';
    } else if (protocol === 'rtsp_gateway') {
      defaultPort = '554';
      defaultPath = '/live/ch0';
    } else if (protocol === 'hls') {
      defaultPort = '80';
      defaultPath = '/live/stream.m3u8';
    }

    setForm((prev) => ({
      ...prev,
      protocol,
      port: defaultPort,
      path: defaultPath,
    }));
  };

  const handleApplyPreset = (preset: 'gateway_1' | 'gateway_0' | 'local_gateway' | 'browser_cam') => {
    if (preset === 'gateway_1') {
      setForm((prev) => ({
        ...prev,
        ip: '192.168.1.1',
        port: '8080',
        protocol: 'mjpeg',
        path: '/mjpeg',
      }));
    } else if (preset === 'gateway_0') {
      setForm((prev) => ({
        ...prev,
        ip: '192.168.0.1',
        port: '8080',
        protocol: 'mjpeg',
        path: '/?action=stream',
      }));
    } else if (preset === 'local_gateway') {
      setForm((prev) => ({
        ...prev,
        protocol: 'rtsp_gateway',
        gatewayUrl: 'http://localhost:8088/stream',
        ip: '192.168.1.1',
        port: '554',
        path: '/live/ch0',
      }));
    } else if (preset === 'browser_cam') {
      setForm((prev) => ({
        ...prev,
        protocol: 'browser_camera',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(form);
    onConnect(form);
    onClose();
  };

  const computedUrl = () => {
    if (form.protocol === 'browser_camera') {
      return 'Direct Browser UVC Video Receiver / System Webcam';
    }
    if (form.protocol === 'custom_url') {
      return form.customUrl || 'Enter custom streaming URL below';
    }
    if (form.protocol === 'rtsp_gateway') {
      return `${form.gatewayUrl} (transcoding rtsp://${form.ip}:${form.port}${form.path})`;
    }
    return `http://${form.ip}:${form.port}${form.path}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drone-connection-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-card p-6 shadow-2xl border border-line max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-muted hover:bg-canvas active:bg-primary-soft transition-colors"
        >
          <XIcon className="h-5 w-5" aria-hidden />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
            <RadioIcon className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary">
              LYZRC L600 Pro Hardware Bridge
            </span>
            <h3 id="drone-connection-settings-title" className="text-[20px] font-bold text-primary-dark">
              Drone Camera IP Configuration
            </h3>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-4 flex border-b border-line gap-4 text-[13px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === 'settings'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            Connection Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`pb-2 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            <HelpCircleIcon className="h-3.5 w-3.5" />
            <span>Hardware & Discovery Guide</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gateway')}
            className={`pb-2 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'gateway'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            <TerminalIcon className="h-3.5 w-3.5" />
            <span>RTSP Gateway (Node.js)</span>
          </button>
        </div>

        {/* Tab 1: Connection Settings */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1">
            {/* Presets Bar */}
            <div>
              <span className="block text-[11px] font-bold uppercase text-ink-muted mb-1.5">
                Quick Connection Presets:
              </span>
              <div className="flex flex-wrap gap-2 text-[12px]">
                <button
                  type="button"
                  onClick={() => handleApplyPreset('gateway_1')}
                  className="rounded-xl border border-line bg-canvas px-2.5 py-1 text-ink font-medium hover:border-primary transition-colors"
                >
                  192.168.1.1 (MJPEG 8080)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('gateway_0')}
                  className="rounded-xl border border-line bg-canvas px-2.5 py-1 text-ink font-medium hover:border-primary transition-colors"
                >
                  192.168.0.1 (MJPEG / Stream)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('local_gateway')}
                  className="rounded-xl border border-line bg-canvas px-2.5 py-1 text-ink font-medium hover:border-primary transition-colors"
                >
                  RTSP via Local Gateway (554)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('browser_cam')}
                  className="rounded-xl border border-primary/40 bg-primary-soft px-2.5 py-1 text-primary font-bold hover:bg-primary hover:text-white transition-colors"
                >
                  PC Camera / UVC Video (Verify Capture)
                </button>
              </div>
            </div>

            {/* Protocol Selector */}
            <div>
              <label className="block text-[13px] font-bold text-ink">Streaming Protocol</label>
              <select
                value={form.protocol}
                onChange={(e) => handleProtocolChange(e.target.value as StreamProtocol)}
                className="mt-1 w-full rounded-xl border border-line bg-card p-2.5 text-[14px] font-semibold text-ink focus:border-primary focus:outline-none"
              >
                <option value="mjpeg">HTTP MJPEG (Direct Browser Stream from Drone AP)</option>
                <option value="rtsp_gateway">RTSP via Local Video Gateway (Transcoded to Browser)</option>
                <option value="hls">HLS / Web Video URL (.m3u8 / .mp4)</option>
                <option value="browser_camera">Browser Camera / UVC Direct Input (Hardware Test)</option>
                <option value="custom_url">Custom HTTP / WebSocket Stream URL</option>
              </select>
            </div>

            {/* Conditional Fields based on Protocol */}
            {form.protocol !== 'browser_camera' && form.protocol !== 'custom_url' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-bold text-ink">Drone IP Address / Hostname</label>
                  <input
                    type="text"
                    value={form.ip}
                    onChange={(e) => setForm({ ...form, ip: e.target.value })}
                    placeholder="e.g. 192.168.1.1"
                    className="mt-1 w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[14px] font-mono text-ink focus:border-primary focus:outline-none"
                    required
                  />
                  <span className="text-[11px] text-ink-muted">Default gateway assigned by drone AP</span>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-ink">Port Number</label>
                  <input
                    type="text"
                    value={form.port}
                    onChange={(e) => setForm({ ...form, port: e.target.value })}
                    placeholder="8080"
                    className="mt-1 w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[14px] font-mono text-ink focus:border-primary focus:outline-none"
                    required
                  />
                  <span className="text-[11px] text-ink-muted">MJPEG: 8080/80; RTSP: 554</span>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[12px] font-bold text-ink">Video Stream Path</label>
                  <input
                    type="text"
                    value={form.path}
                    onChange={(e) => setForm({ ...form, path: e.target.value })}
                    placeholder="/mjpeg or /live/ch0"
                    className="mt-1 w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[14px] font-mono text-ink focus:border-primary focus:outline-none"
                    required
                  />
                  <span className="text-[11px] text-ink-muted">
                    Exact endpoint path requested on the drone server
                  </span>
                </div>
              </div>
            )}

            {form.protocol === 'rtsp_gateway' && (
              <div className="rounded-2xl bg-canvas p-3 border border-line space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-primary-dark text-[13px]">
                  <TerminalIcon className="h-4 w-4 text-primary" />
                  <span>Local Streaming Gateway URL</span>
                </div>
                <input
                  type="text"
                  value={form.gatewayUrl}
                  onChange={(e) => setForm({ ...form, gatewayUrl: e.target.value })}
                  placeholder="http://localhost:8088/stream"
                  className="w-full rounded-xl border border-line bg-card px-3 py-2 text-[13px] font-mono text-ink focus:border-primary focus:outline-none"
                />
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  Web browsers cannot play raw RTSP directly due to browser sandboxing. The included PalAI Node.js
                  gateway transcodes the LYZRC L600 Pro RTSP stream to a browser-compatible HTTP/WebSocket stream.
                </p>
              </div>
            )}

            {form.protocol === 'custom_url' && (
              <div>
                <label className="block text-[12px] font-bold text-ink">Full Custom Stream URL</label>
                <input
                  type="text"
                  value={form.customUrl}
                  onChange={(e) => setForm({ ...form, customUrl: e.target.value })}
                  placeholder="http://192.168.1.1:8080/videostream.cgi"
                  className="mt-1 w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[14px] font-mono text-ink focus:border-primary focus:outline-none"
                  required
                />
              </div>
            )}

            {form.protocol === 'browser_camera' && (
              <div className="rounded-2xl bg-primary-soft/40 p-4 border border-primary/20 space-y-2">
                <div className="flex items-center gap-2 font-bold text-primary-dark text-[14px]">
                  <CameraIcon className="h-4 w-4 text-primary" />
                  <span>Browser Camera & UVC Video Receiver Mode</span>
                </div>
                <p className="text-[13px] text-ink leading-relaxed">
                  Connects directly to your computer’s video input device (such as an external 5.8GHz / Wi-Fi USB FPV
                  video receiver, HDMI capture card, or built-in camera).
                </p>
                <span className="block text-[11px] text-ink-muted font-semibold">
                  Allows testing 100% of the live monitoring, frame capture, and AI staging workflow on Windows!
                </span>
              </div>
            )}

            {/* Target URL Preview */}
            <div className="rounded-xl border border-line bg-canvas p-2.5 text-[12px]">
              <span className="block font-bold text-ink-muted uppercase text-[10px]">Computed Stream URL:</span>
              <span className="font-mono text-ink break-all font-semibold">{computedUrl()}</span>
            </div>

            {/* Connection Error Message */}
            {connectionStatus === 'connection_failed' && errorMessage && (
              <div className="flex items-start gap-2 rounded-xl bg-danger-soft border border-danger/30 p-3 text-[13px] text-danger">
                <AlertTriangleIcon className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-line flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  onSaveConfig(form);
                  onClose();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-line bg-card px-4 py-2.5 text-[14px] font-bold text-ink hover:bg-canvas transition-colors"
              >
                <SaveIcon className="h-4 w-4" />
                <span>Save Settings Only</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-[14px] font-bold text-white shadow-cta hover:bg-primary-dark transition-colors"
              >
                <PlayIcon className="h-4 w-4 fill-white" />
                <span>Save & Connect</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Hardware Discovery Guide */}
        {activeTab === 'guide' && (
          <div className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1 text-[13px] leading-relaxed text-ink">
            <div className="rounded-2xl bg-warn-soft/60 p-3.5 border border-accent/40 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-warn text-[14px]">
                <AlertTriangleIcon className="h-4 w-4" />
                <span>Pre-Flight Stationary Testing Rule</span>
              </div>
              <p className="text-[12px] text-ink">
                During network discovery and stream verification on Windows, <strong>keep the drone stationary on a level surface with motors disarmed</strong>.
                Do not attempt network diagnostics during active flight.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-line bg-canvas p-3 space-y-1.5">
                <span className="font-bold text-primary-dark block text-[14px]">
                  Step 1: Connect Windows Laptop to the Drone's Wi-Fi
                </span>
                <p className="text-ink-muted">
                  Power on the LYZRC L600 Pro drone. Open Windows Wi-Fi settings and connect to the drone’s network
                  (usually named <code className="font-mono text-ink">RX_DRONE_5G_XXXX</code> or <code className="font-mono text-ink">L600_PRO_XXXX</code>).
                </p>
              </div>

              <div className="rounded-xl border border-line bg-canvas p-3 space-y-1.5">
                <span className="font-bold text-primary-dark block text-[14px]">
                  Step 2: Find Drone IP Address via PowerShell
                </span>
                <p className="text-ink-muted">Open Windows Terminal / PowerShell and run:</p>
                <pre className="rounded-lg bg-ink p-2.5 text-white font-mono text-[12px] overflow-x-auto">
                  ipconfig
                </pre>
                <p className="text-ink-muted text-[12px]">
                  Look under your Wi-Fi adapter for the <strong>Default Gateway</strong> (most commonly <code className="font-mono text-primary font-bold">192.168.1.1</code> or <code className="font-mono text-primary font-bold">192.168.0.1</code>). That is the drone's true IP address.
                </p>
              </div>

              <div className="rounded-xl border border-line bg-canvas p-3 space-y-1.5">
                <span className="font-bold text-primary-dark block text-[14px]">
                  Step 3: Protocol Identification with Wireshark or VLC
                </span>
                <p className="text-ink-muted">
                  If using VLC Media Player: Select <em>Media → Open Network Stream</em> and test:
                </p>
                <ul className="list-disc list-inside text-ink-muted space-y-1 font-mono text-[12px]">
                  <li>rtsp://192.168.1.1:554/live/ch0</li>
                  <li>http://192.168.1.1:8080/mjpeg</li>
                  <li>http://192.168.1.1:8080/?action=stream</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: RTSP Gateway Guide */}
        {activeTab === 'gateway' && (
          <div className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1 text-[13px] leading-relaxed text-ink">
            <div className="rounded-2xl bg-canvas p-4 border border-line space-y-2">
              <span className="font-bold text-primary-dark text-[14px] block">
                PalAI Local Video Gateway (Node.js)
              </span>
              <p className="text-ink-muted">
                Standard web browsers (Chrome, Edge, Safari, Firefox) do not natively play raw RTSP streams for security reasons.
                If your LYZRC L600 Pro broadcasts an RTSP stream (e.g. on port 554), run our lightweight local gateway script on your Windows machine:
              </p>
              <pre className="rounded-lg bg-ink p-3 text-white font-mono text-[12px] overflow-x-auto">
                npm run gateway
              </pre>
              <p className="text-ink-muted text-[12px]">
                The gateway receives the RTSP stream from the drone's Wi-Fi network and makes it available at{' '}
                <code className="font-mono text-primary font-bold">http://localhost:8088/stream</code> for instant, zero-latency browser rendering!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
