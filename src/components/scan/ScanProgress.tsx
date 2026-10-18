import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { TKey } from '../../data/translations';
import { useT } from '../../hooks/useT';

const steps: TKey[] = ['scan.step.photo', 'scan.step.review', 'scan.step.result'];

/** Compact three-step progress: Litrato → Tan-awa → Resulta. */
export function ScanProgress({ current }: {current: 0 | 1 | 2;}) {
  const t = useT();
  return (
    <ol aria-label={t('scan.flow')} className="flex items-start gap-1">
      {steps.map((k, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={k} aria-current={active ? 'step' : undefined} className="flex flex-1 flex-col items-center gap-1 text-center">
            <span className="flex w-full items-center">
              <span className={`h-0.5 flex-1 ${i === 0 ? 'invisible' : done || active ? 'bg-primary' : 'bg-line'}`} />
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-bold ${
                active ? 'bg-primary text-white' : done ? 'bg-primary-soft text-primary' : 'border-2 border-line bg-card text-ink-muted'}`
                }>
                
                {done ? <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden /> : i + 1}
              </span>
              <span className={`h-0.5 flex-1 ${i === steps.length - 1 ? 'invisible' : done ? 'bg-primary' : 'bg-line'}`} />
            </span>
            <span className={`text-[13px] leading-tight ${active ? 'font-bold text-primary-dark' : 'text-ink-muted'}`}>{t(k)}</span>
          </li>);

      })}
    </ol>);

}