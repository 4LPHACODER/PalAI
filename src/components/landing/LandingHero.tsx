import React from 'react';
import { ArrowRightIcon, MapIcon, SmartphoneIcon } from 'lucide-react';
import { useLandingActions } from '../../hooks/useLandingActions';
import { HeroVisual } from './HeroVisual';
import { LandingContainer } from './LandingContainer';

export function LandingHero() {
  const { tryFarmerDemo, exploreDrone } = useLandingActions();
  return (
    <section id="hero" aria-labelledby="hero-title" className="scroll-mt-20">
      <LandingContainer className="grid gap-8 pb-12 pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-12 lg:pb-20 lg:pt-14">
        <div>
          <h1
            id="hero-title"
            className="text-[34px] font-extrabold leading-[1.08] tracking-tight text-primary-dark min-[390px]:text-[38px] md:text-[48px] lg:text-[54px]">
            
            From a single leaf to the entire field.
          </h1>
          <p className="mt-4 max-w-[560px] text-[17px] leading-relaxed text-ink md:text-[19px]">
            PalAI brings together mobile rice-leaf screening and drone-assisted field insights to help farmers and agricultural organizations
            identify where closer attention is needed.
          </p>
          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={tryFarmerDemo}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[17px] font-bold text-white shadow-cta transition-transform duration-150 ease-out active:scale-[0.98]">
              
              Try the Farmer Demo <ArrowRightIcon className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => exploreDrone('hero')}
              className="flex h-14 items-center justify-center rounded-2xl border border-line bg-card px-6 text-[17px] font-bold text-primary transition-transform duration-150 ease-out active:scale-[0.98]">
              
              Explore Drone Insights
            </button>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            <li className="flex items-center gap-2 text-[15px] font-medium text-ink">
              <SmartphoneIcon className="h-5 w-5 text-primary" aria-hidden /> Free basic farmer screening
            </li>
            <li className="flex items-center gap-2 text-[15px] font-medium text-ink">
              <MapIcon className="h-5 w-5 text-primary" aria-hidden /> Institutional field monitoring
            </li>
          </ul>
        </div>
        <HeroVisual />
      </LandingContainer>
    </section>);

}