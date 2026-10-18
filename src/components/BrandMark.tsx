import React from 'react';

/** Provisional rice-leaf mark — replace with the final PalAI logo. */
export function BrandMark({ showTagline = false }: {showTagline?: boolean;}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary" aria-hidden>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path d="M5 20.5C5.5 12.5 10.5 5.5 19.5 3.5C19 12 13.5 18.5 5 20.5Z" fill="#FFFFFF" />
          <path d="M5.5 20L15.5 8" stroke="#236B3B" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="18.5" cy="18" r="2" fill="#E7B844" />
        </svg>
      </span>
      <div className="leading-none">
        <span className="block text-[22px] font-extrabold tracking-tight text-primary-dark">PalAI</span>
        {showTagline && <span className="mt-1 block text-[13px] text-ink-muted">Your rice health companion</span>}
      </div>
    </div>);

}