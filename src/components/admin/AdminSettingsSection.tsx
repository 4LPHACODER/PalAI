import { useState } from 'react';
import {
  CpuIcon,
  ShieldCheckIcon,
  SaveIcon,
  HardDriveIcon,
  InfoIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminSettingsSectionProps {
  onClearLocalImages: () => void;
  localImageCount: number;
}

export function AdminSettingsSection({
  onClearLocalImages,
  localImageCount,
}: AdminSettingsSectionProps) {
  const [rtspUrl, setRtspUrl] = useState('rtsp://192.168.1.1:554/live');
  const [telemetryPort, setTelemetryPort] = useState('8888');
  const [maxAltitude, setMaxAltitude] = useState('120');
  const [rthBattery, setRthBattery] = useState('25');
  const [geofenceRadius, setGeofenceRadius] = useState('500');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Hardware and safety parameters saved to local session.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-[22px] font-bold text-primary-dark">Drone & System Settings</h2>
        <p className="mt-1 text-[14px] text-ink-muted">
          Configure hardware parameters for the <strong>LYZRC L600 Pro</strong> and companion protocol options.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hardware & Stream Profile */}
        <div className="rounded-3xl border border-line bg-card p-6 shadow-card space-y-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <CpuIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-[17px] font-bold text-primary-dark">Target Drone Hardware Profile</h3>
              <p className="text-[12px] text-ink-muted">Standard configuration for field monitoring unit</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] pt-2">
            <div className="rounded-2xl border border-line bg-canvas p-3">
              <span className="block text-[11px] font-bold uppercase text-ink-muted">Hardware Model</span>
              <span className="font-bold text-ink text-[15px]">LYZRC L600 Pro</span>
              <span className="block text-[12px] text-ink-muted mt-0.5">3-Axis Gimbal Dual 4K EIS</span>
            </div>
            <div className="rounded-2xl border border-line bg-canvas p-3">
              <span className="block text-[11px] font-bold uppercase text-ink-muted">Companion Application</span>
              <span className="font-bold text-ink text-[15px]">RX Drone GPS</span>
              <span className="block text-[12px] text-ink-muted mt-0.5">Mobile Control Protocol v3.2.0</span>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-line">
            <div>
              <label className="block text-[13px] font-bold text-ink">
                FPV Video Stream URL (RTSP Endpoint)
              </label>
              <input
                type="text"
                value={rtspUrl}
                onChange={(e) => setRtspUrl(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-canvas px-3.5 py-2 font-mono text-[13px] text-ink focus:border-primary focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-ink-muted">
                Default RTSP gateway provided by RX Drone GPS Wi-Fi broadcast
              </span>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-ink">
                MAVLink / Telemetry UDP Port
              </label>
              <input
                type="text"
                value={telemetryPort}
                onChange={(e) => setTelemetryPort(e.target.value)}
                className="mt-1 w-full sm:w-48 rounded-xl border border-line bg-canvas px-3.5 py-2 font-mono text-[13px] text-ink focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Flight Safety & Autonomy Limits */}
        <div className="rounded-3xl border border-line bg-card p-6 shadow-card space-y-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <ShieldCheckIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-[17px] font-bold text-primary-dark">Flight Envelope & Safety Enclosure</h3>
              <p className="text-[12px] text-ink-muted">Civil aviation and field boundary limits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-[13px] font-bold text-ink">Max Altitude (m AGL)</label>
              <input
                type="number"
                value={maxAltitude}
                onChange={(e) => setMaxAltitude(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-canvas px-3.5 py-2 text-[14px] font-semibold text-ink focus:border-primary focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-ink-muted">CAAP Ceiling: 120m</span>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-ink">RTH Failsafe Battery (%)</label>
              <input
                type="number"
                value={rthBattery}
                onChange={(e) => setRthBattery(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-canvas px-3.5 py-2 text-[14px] font-semibold text-ink focus:border-primary focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-ink-muted">Auto return-to-home</span>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-ink">Geofence Radius (m)</label>
              <input
                type="number"
                value={geofenceRadius}
                onChange={(e) => setGeofenceRadius(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-canvas px-3.5 py-2 text-[14px] font-semibold text-ink focus:border-primary focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-ink-muted">Boundary safety limit</span>
            </div>
          </div>
        </div>

        {/* Local Storage & Cache */}
        <div className="rounded-3xl border border-line bg-card p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-canvas text-ink-muted">
                <HardDriveIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-[17px] font-bold text-primary-dark">Browser Storage & Cache</h3>
                <p className="text-[12px] text-ink-muted">Manage staged images and session state</p>
              </div>
            </div>

            {localImageCount > 0 && (
              <button
                type="button"
                onClick={onClearLocalImages}
                className="rounded-xl border border-line bg-canvas px-3 py-1.5 text-[12px] font-bold text-danger hover:bg-danger-soft transition-colors"
              >
                Clear {localImageCount} Staged Images
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-canvas p-3 border border-line text-[12px] text-ink-muted">
            <InfoIcon className="h-4 w-4 shrink-0 text-primary" />
            <span>
              All settings are maintained locally in browser memory for the current frontend session.
              No backend configurations are committed.
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-[14px] font-bold text-white shadow-cta hover:bg-primary-dark transition-colors"
          >
            <SaveIcon className="h-4 w-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
