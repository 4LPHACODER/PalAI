import React from 'react';
import { Loader2Icon, LocateOffIcon, MapPinCheckIcon, WifiOffIcon } from 'lucide-react';
import type { TKey } from '../../data/translations';
import { DeviceLocationStatus, SimulatedLocationIssue } from '../../hooks/useDeviceLocation';
import { useT } from '../../hooks/useT';
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

const problems: Record<'denied' | 'unavailable' | 'offline', {titleKey: TKey;textKey: TKey;icon: typeof LocateOffIcon;}> = {
  denied: { titleKey: 'dev.denied.title', textKey: 'dev.denied.text', icon: LocateOffIcon },
  unavailable: { titleKey: 'dev.unavailable.title', textKey: 'dev.unavailable.text', icon: LocateOffIcon },
  offline: { titleKey: 'dev.offline.title', textKey: 'dev.offline.text', icon: WifiOffIcon }
};

export function DeviceLocationPanel({ status, coords, onRetry, onSimulate, onManual, onAdjust }: DeviceLocationPanelProps) {
  const t = useT();
  return (
    <div className="space-y-3">
      {status === 'requesting' &&
      <p role="status" className="flex items-center gap-2 rounded-2xl border border-line bg-card p-4 text-[16px] font-semibold text-ink">
          <Loader2Icon className="h-5 w-5 animate-spin text-primary" aria-hidden /> {t('dev.finding')}
        </p>
      }

      {status === 'success' && coords &&
      <div role="status" className="rounded-2xl border border-line bg-card p-4">
          <p className="flex items-center gap-2 text-[16px] font-bold text-primary-dark">
            <MapPinCheckIcon className="h-5 w-5 text-primary" aria-hidden /> {t('dev.found')}
          </p>
          <p className="mt-1 text-[15px] text-ink">{formatCoords(coords.lat, coords.lng)}</p>
          <p className="text-[14px] text-ink-muted">{t('dev.accuracy', { m: Math.round(coords.accuracy) })}</p>
          <button type="button" onClick={onAdjust} className="mt-3 min-h-[48px] w-full rounded-xl border border-line px-3 py-2 text-[15px] font-bold leading-tight text-primary">
            {t('dev.adjust')}
          </button>
        </div>
      }

      {(status === 'denied' || status === 'unavailable' || status === 'offline') &&
      <div role="alert" className="rounded-2xl border border-danger/30 bg-danger-soft p-4">
          <p className="flex items-center gap-2 text-[16px] font-bold text-danger">
            {React.createElement(problems[status].icon, { className: 'h-5 w-5 shrink-0', 'aria-hidden': true })}
            {t(problems[status].titleKey)}
          </p>
          <p className="mt-1 text-[15px] leading-snug text-ink">{t(problems[status].textKey)}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={onManual} className="min-h-[48px] rounded-xl bg-primary px-2 py-2 text-[15px] font-bold leading-tight text-white">
              {t('dev.manual')}
            </button>
            <button type="button" onClick={onRetry} className="min-h-[48px] rounded-xl border border-line bg-card px-2 py-2 text-[15px] font-bold leading-tight text-primary">
              {t('common.tryAgain')}
            </button>
          </div>
        </div>
      }

      <details className="rounded-2xl border border-dashed border-line">
        <summary className="flex min-h-[48px] cursor-pointer items-center gap-2 px-4 text-[14px] font-semibold text-ink-muted">
          {t('dev.preview')} <DemoTag label={t('common.demo')} />
        </summary>
        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {(['denied', 'unavailable', 'offline'] as SimulatedLocationIssue[]).map((i) =>
          <button key={i} type="button" onClick={() => onSimulate(i)} className="min-h-[48px] rounded-xl border border-line bg-card px-3 py-2 text-left text-[14px] font-semibold text-ink">
              {t(problems[i as keyof typeof problems].titleKey)}
            </button>
          )}
        </div>
      </details>
    </div>);

}