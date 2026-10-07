import React from 'react';
import { BadgeMeta, toneClasses } from '../utils/status';

export function StatusBadge({ meta }: {meta: BadgeMeta;}) {
  const Icon = meta.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[13px] font-semibold ${toneClasses[meta.tone]}`}>
      
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {meta.label}
    </span>);

}