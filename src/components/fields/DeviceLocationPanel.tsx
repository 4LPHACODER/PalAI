import React from 'react';
import { Loader2Icon, LocateOffIcon, MapPinCheckIcon, WifiOffIcon } from 'lucide-react';
import { DeviceLocationStatus, SimulatedLocationIssue } from '../../hooks/useDeviceLocation';
import { formatCoords } from '../../utils/format';
import { DemoTag } from '../DemoTag';

interface DeviceLocationPanelProps {
  status: DeviceLocationStatus;
  coords: {lat: number;lng: number;accuracy: number;} | null;
  onRetry: () => void;
  onSimulate: (issue: SimulatedLocationIssue) => void;
  onManual: () => void;
  onAdjust: () => void;
}

const problems: Record<'denied' | 'unavailable' | 'offline', {title: string;text: string;icon: typeof LocateOffIcon;}> = {
  denied: {
    title: 'Location permission denied',
    text: 'PalAI can’t use your location. Choose on the map or enter the address below.',
    icon: LocateOffIcon
  },
  unavailable: {
    title: 'Location unavailable',
    text: 'Your phone couldn’t find its location. Try again outdoors, or enter the address below.',
    icon: LocateOffIcon
  },
  offline: {
    title: 'No internet connection',
    text: 'Location and maps may not work offline. Enter the address below — you can add a pin later.',
    icon: WifiOffIcon
  }
};

export function DeviceLocationPanel({ status, coords, onRetry, onSimulate, onManual, onAdjust }: DeviceLocationPanelProps) {
  return (
    <div className="space-y-3">
      {status === 'requesting' &&
      <p role="status" className="flex items-center gap-2 rounded-2xl border border-line bg-card p-4 text-[16px] font-semibold text-ink">
          <Loader2Icon className="h-5 w-5 animate-spin text-primary" aria-hidden /> Finding your location…
        </p>
      }

      {status === 'success' && coords &&
      <div role="status" className="rounded-2xl border border-line bg-card p-4">
          <p className="flex items-center gap-2 text-[16px] font-bold text-primary-dark">
            <MapPinCheckIcon className="h-5 w-5 text-primary" aria-hidden /> Location found
          </p>
          <p className="mt-1 text-[15px] text-ink">{formatCoords(coords.lat, coords.lng)}</p>
          <p className="text-[14px] text-ink-muted">Accuracy about {Math.round(coords.accuracy)} m. Is this your field, or just where you are?</p>
          <button type="button" onClick={onAdjust} className="mt-3 h-12 w-full rounded-xl border border-line text-[15px] font-bold text-primary">
            Check or move the pin on the map
          </button>
        </div>
      }

      {(status === 'denied' || status === 'unavailable' || status === 'offline') &&
      <div role="alert" className="rounded-2xl border border-danger/30 bg-danger-soft p-4">
          <p className="flex items-center gap-2 text-[16px] font-bold text-danger">
            {React.createElement(problems[status].icon, { className: 'h-5 w-5', 'aria-hidden': true })}
            {problems[status].title}
          </p>
          <p className="mt-1 text-[15px] leading-snug text-ink">{problems[status].text}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={onManual} className="h-12 rounded-xl bg-primary text-[15px] font-bold text-white">
              Enter manually
            </button>
            <button type="button" onClick={onRetry} className="h-12 rounded-xl border border-line bg-card text-[15px] font-bold text-primary">
              Try again
            </button>
          </div>
        </div>
      }

      <details className="rounded-2xl border border-dashed border-line">
        <summary className="flex min-h-[48px] cursor-pointer items-center gap-2 px-4 text-[14px] font-semibold text-ink-muted">
          Preview location problems <DemoTag label="Demo" />
        </summary>
        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {(['denied', 'unavailable', 'offline'] as SimulatedLocationIssue[]).map((i) =>
          <button key={i} type="button" onClick={() => onSimulate(i)} className="h-12 rounded-xl border border-line bg-card px-3 text-[14px] font-semibold text-ink">
              {problems[i].title}
            </button>
          )}
        </div>
      </details>
    </div>);

}