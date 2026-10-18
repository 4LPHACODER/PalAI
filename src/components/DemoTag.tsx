import React from 'react';
import { FlaskConicalIcon } from 'lucide-react';

export function DemoTag({ label = 'Demo Data' }: {label?: string;}) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-accent-soft px-2 py-0.5 text-[13px] font-semibold text-accent-ink">
      <FlaskConicalIcon className="h-3.5 w-3.5" aria-hidden />
      {label}
    </span>);

}