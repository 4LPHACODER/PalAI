import React, { ReactNode } from 'react';

/** Sticky bottom action area. It sits in normal flow at the end, so it never hides the last field. */
export function FormActionBar({ children }: {children: ReactNode;}) {
  return (
    <div className="sticky bottom-0 z-20 mt-auto flex items-stretch gap-2 border-t border-line bg-card px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 min-[390px]:px-5 md:px-8">
      {children}
    </div>);

}