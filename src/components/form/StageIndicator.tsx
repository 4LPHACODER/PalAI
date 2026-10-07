import React from 'react';
import { CheckIcon } from 'lucide-react';

interface StageIndicatorProps {
  stages: string[];
  current: number;
  maxReached: number;
  onSelect: (index: number) => void;
}

export function StageIndicator({ stages, current, maxReached, onSelect }: StageIndicatorProps) {
  return (
    <ol className="flex items-center gap-2" aria-label="Form progress">
      {stages.map((label, i) => {
        const done = i < current;
        const isCurrent = i === current;
        const reachable = i <= maxReached && !isCurrent;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              disabled={!reachable}
              onClick={() => onSelect(i)}
              aria-current={isCurrent ? 'step' : undefined}
              className="flex min-h-[48px] flex-1 flex-col items-center justify-center gap-1">
              
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-[14px] font-bold ${
                isCurrent ?
                'bg-primary text-white' :
                done ?
                'bg-primary-soft text-primary' :
                'border-2 border-line bg-card text-ink-muted'}`
                }>
                
                {done ? <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden /> : i + 1}
              </span>
              <span className={`whitespace-nowrap text-[13px] ${isCurrent ? 'font-bold text-primary-dark' : 'text-ink-muted'}`}>
                {label}
              </span>
            </button>
            {i < stages.length - 1 && <span className={`mb-5 h-0.5 w-6 shrink-0 rounded ${done ? 'bg-primary' : 'bg-line'}`} aria-hidden />}
          </li>);

      })}
    </ol>);

}