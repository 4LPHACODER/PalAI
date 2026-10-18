import React from 'react';
import { useT } from '../hooks/useT';
import { BadgeMeta, toneClasses } from '../utils/status';

/** Status always pairs color with readable text. Long labels wrap rather than truncate. */
export function StatusBadge({ meta }: {meta: BadgeMeta;}) {
  const t = useT();
  const Icon = meta.icon;
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-1 text-left text-[13px] font-semibold leading-tight ${toneClasses[meta.tone]}`}>
      
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      <span>{t(meta.labelKey)}</span>
    </span>);

}