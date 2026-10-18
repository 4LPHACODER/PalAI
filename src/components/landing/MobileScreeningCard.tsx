import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { images } from '../../data/images';
import { mobileFeatures } from '../../data/landing';
import { PhoneResultPreview } from './PhoneResultPreview';

export function MobileScreeningCard({ onExplore }: {onExplore: () => void;}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-card shadow-card">
      <div className="relative h-[280px] overflow-hidden bg-primary-soft md:h-[300px]">
        <img src={images.diseaseSheathBlight} alt="Close-up of a rice plant with possible disease signs (illustrative)" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-[13px] font-semibold text-accent-ink ring-1 ring-line">
          Close-up leaf photo · Demo
        </span>
        <div className="absolute bottom-4 right-4">
          <PhoneResultPreview className="w-[118px] text-[9.5px] md:w-[132px] md:text-[10.5px]" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-[14px] font-semibold text-primary">Mobile leaf screening · Free</p>
        <h3 className="mt-1 text-[24px] font-bold leading-tight text-primary-dark">Start with what you see.</h3>
        <p className="mt-2 text-[16px] leading-relaxed text-ink">
          Capture a rice-leaf photo, review a preliminary screening result, and save observations to your field.
        </p>
        <ul className="mt-5 space-y-3">
          {mobileFeatures.map(({ icon: Icon, label }) =>
          <li key={label} className="flex items-start gap-3 text-[15px] text-ink">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span className="pt-1">{label}</span>
            </li>
          )}
        </ul>
        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={onExplore}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[17px] font-bold text-white">
            
            Explore Mobile Screening <ArrowRightIcon className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </article>);

}