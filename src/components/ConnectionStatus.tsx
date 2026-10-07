import React from 'react';
import { InfoIcon, Loader2Icon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { syncStateMeta, toneClasses } from '../utils/status';

export function ConnectionStatus({ onInfo }: {onInfo: () => void;}) {
  const { syncState, retrying, retrySync } = useApp();
  const meta = syncStateMeta[syncState];
  const Icon = meta.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[56px] items-center gap-3 rounded-2xl border border-line bg-card py-1 pl-3 pr-1">
      
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${toneClasses[meta.tone]}`}>
        {retrying ? <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden /> : <Icon className="h-4 w-4" aria-hidden />}
      </span>
      <p className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-ink">
        {retrying ? 'Retrying…' : meta.label}
      </p>
      {syncState === 'failed' && !retrying &&
      <button
        type="button"
        onClick={retrySync}
        className="h-12 shrink-0 rounded-xl px-3 text-[15px] font-bold text-danger active:bg-danger-soft">
        
          Retry
        </button>
      }
      <button
        type="button"
        onClick={onInfo}
        aria-label="About connection status"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-ink-muted active:bg-canvas">
        
        <InfoIcon className="h-5 w-5" aria-hidden />
      </button>
    </div>);

}