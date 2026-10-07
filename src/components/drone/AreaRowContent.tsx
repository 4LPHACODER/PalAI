import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { InspectionArea } from '../../types/drone';
import { priorityMeta } from '../../utils/survey';

/** Inner content of a tappable inspection-area row. */
export function AreaRowContent({ area }: {area: InspectionArea;}) {
  const meta = priorityMeta[area.priority];
  return (
    <>
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[14px] font-bold ${meta.text}`}
        style={{ backgroundColor: meta.color }}
        aria-hidden>
        
        {area.label.replace('Area ', '')}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[15px] font-bold text-ink">{area.label}</span>
          <span className={`rounded-full px-2 py-0.5 text-[13px] font-semibold ${meta.badge}`}>{meta.label}</span>
        </span>
        <span className="mt-0.5 line-clamp-2 block text-[14px] leading-snug text-ink-muted">{area.reason}</span>
      </span>
      <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
    </>);

}