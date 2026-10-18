import React, { ReactNode } from 'react';

export function SectionHeading({ id, title, action }: {id?: string;title: string;action?: ReactNode;}) {
  return (
    <div className="mb-2 flex min-h-[48px] items-center justify-between gap-3">
      <h2 id={id} className="text-[19px] font-bold text-primary-dark">
        {title}
      </h2>
      {action}
    </div>);

}