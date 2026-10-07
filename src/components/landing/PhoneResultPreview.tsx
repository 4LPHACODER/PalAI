import React from 'react';
import { EyeIcon } from 'lucide-react';
import { images } from '../../data/images';

/** Scaled illustration of the farmer app result screen. Size is driven by the parent's font-size. */
export function PhoneResultPreview({ className = '' }: {className?: string;}) {
  return (
    <div
      role="img"
      aria-label="PalAI app preview showing a simulated Possible Brown Spot screening result"
      className={`aspect-[9/18.5] overflow-hidden rounded-[1.9em] border-[0.45em] border-ink bg-card shadow-[0_18px_40px_rgba(23,61,39,0.28)] ${className}`}>
      
      <div className="flex items-center justify-between px-[0.9em] pt-[0.7em]">
        <span className="text-[1.05em] font-extrabold text-primary-dark">PalAI</span>
        <span className="h-[0.45em] w-[2.2em] rounded-full bg-line" />
      </div>
      <div className="px-[0.7em] pt-[0.6em]">
        <div className="overflow-hidden rounded-[0.9em]">
          <img src={images.leafBrownSpot} alt="" className="aspect-[4/3] w-full object-cover" />
        </div>
        <span className="mt-[0.6em] inline-block rounded-full bg-accent-soft px-[0.6em] py-[0.15em] text-[0.78em] font-semibold text-accent-ink">
          Simulated screening
        </span>
        <p className="mt-[0.35em] text-[1.25em] font-bold leading-tight text-primary-dark">Possible Brown Spot</p>
        <p className="text-[0.85em] text-ink-muted">Riverside Plot · Oct 6</p>
        <span className="mt-[0.5em] inline-flex items-center gap-[0.3em] rounded-full bg-warn-soft px-[0.6em] py-[0.2em] text-[0.78em] font-semibold text-warn">
          <EyeIcon className="h-[1em] w-[1em]" aria-hidden /> Follow-up needed
        </span>
        <div className="mt-[0.8em] rounded-[0.7em] bg-primary py-[0.55em] text-center text-[0.85em] font-bold text-white">Save to Records</div>
      </div>
    </div>);

}