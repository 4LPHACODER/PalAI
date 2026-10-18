import React from 'react';
import { CheckIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { SyncState } from '../types/farm';
import { syncStateMeta, toneClasses } from '../utils/status';
import { BottomSheet } from './BottomSheet';
import { DemoTag } from './DemoTag';

const states: SyncState[] = ['synced', 'offline', 'pending', 'failed'];

export function ConnectionInfoSheet({ open, onClose }: {open: boolean;onClose: () => void;}) {
  const { syncState, setSyncState } = useApp();
  const meta = syncStateMeta[syncState];
  const Icon = meta.icon;

  return (
    <BottomSheet open={open} onClose={onClose} title="Connection status">
      <div className="flex items-start gap-3 rounded-2xl bg-canvas p-4">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${toneClasses[meta.tone]}`}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-[17px] font-bold text-primary-dark">{meta.title}</p>
          <p className="mt-1 text-[15px] leading-relaxed text-ink">{meta.explanation}</p>
        </div>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
        Your changes are <strong className="font-semibold text-ink">saved on this device</strong>. Cloud sync is not
        connected in this prototype, so no records are uploaded.
      </p>

      <div className="mt-5 flex items-center justify-between gap-2">
        <h3 id="sync-preview" className="text-[16px] font-bold text-primary-dark">
          Preview a status
        </h3>
        <DemoTag label="Demo only" />
      </div>
      <div role="radiogroup" aria-labelledby="sync-preview" className="mt-2 space-y-2 pb-1">
        {states.map((s) => {
          const m = syncStateMeta[s];
          const selected = s === syncState;
          return (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setSyncState(s)}
              className={`flex min-h-[52px] w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 text-left text-[15px] font-semibold transition-colors duration-150 ${
              selected ? 'border-primary bg-primary-soft text-primary-dark' : 'border-line bg-card text-ink'}`
              }>
              
              {m.label}
              {selected && <CheckIcon className="h-5 w-5 shrink-0 text-primary" strokeWidth={3} aria-hidden />}
            </button>);

        })}
      </div>
    </BottomSheet>);

}