import { WifiOffIcon, XIcon, CheckCircle2Icon } from 'lucide-react';

interface DroneConnectModalProps {
  open: boolean;
  onClose: () => void;
}

export function DroneConnectModal({ open, onClose }: DroneConnectModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drone-connect-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card p-6 shadow-2xl border border-line">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-muted hover:bg-canvas active:bg-primary-soft transition-colors"
        >
          <XIcon className="h-5 w-5" aria-hidden />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-warn-soft text-warn">
            <WifiOffIcon className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <span className="inline-block text-[12px] font-bold uppercase tracking-wider text-warn">
              Hardware Bridge Notice
            </span>
            <h3 id="drone-connect-title" className="text-[20px] font-bold text-primary-dark">
              Drone Integration Pending
            </h3>
          </div>
        </div>

        {/* Main Status Message */}
        <div className="mt-4 rounded-2xl bg-warn-soft/60 p-4 border border-accent/30 text-[14px] leading-relaxed text-ink">
          <p className="font-semibold text-warn">
            Drone integration is not yet available.
          </p>
          <p className="mt-1 text-ink">
            The PalAI platform is preparing the frontend interface for future hardware connectivity with the{' '}
            <strong>LYZRC L600 Pro</strong> drone via the <strong>RX Drone GPS</strong> companion application. Live video
            feed, telemetry streaming, and flight command execution will be enabled in subsequent releases.
          </p>
        </div>

        {/* Hardware & Protocol Specs */}
        <div className="mt-4 space-y-2">
          <p className="text-[13px] font-semibold text-ink-muted uppercase tracking-wider">
            Target Hardware Specifications
          </p>
          <div className="grid grid-cols-2 gap-2 text-[13px]">
            <div className="rounded-xl border border-line bg-canvas p-2.5">
              <span className="block text-ink-muted">Drone Model</span>
              <span className="font-bold text-ink">LYZRC L600 Pro</span>
            </div>
            <div className="rounded-xl border border-line bg-canvas p-2.5">
              <span className="block text-ink-muted">Companion App</span>
              <span className="font-bold text-ink">RX Drone GPS</span>
            </div>
            <div className="rounded-xl border border-line bg-canvas p-2.5">
              <span className="block text-ink-muted">Camera Sensor</span>
              <span className="font-bold text-ink">4K Dual EIS Gimbal</span>
            </div>
            <div className="rounded-xl border border-line bg-canvas p-2.5">
              <span className="block text-ink-muted">Interface Protocol</span>
              <span className="font-bold text-ink">RTSP / 5GHz Wi-Fi</span>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-canvas p-3 text-[13px] text-ink-muted">
          <CheckCircle2Icon className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden />
          <span>
            <strong className="text-ink">Frontend Interface Prepared:</strong> Camera HUD controls, telemetry displays,
            and survey management are ready for integration once the WebSocket/WebRTC drone gateway is configured.
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-[15px] font-bold text-white shadow-cta hover:bg-primary-dark transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
