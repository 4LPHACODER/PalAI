import React from 'react';
import { useLandingActions } from '../../hooks/useLandingActions';
import { DroneAnalyticsCard } from './DroneAnalyticsCard';
import { LandingContainer } from './LandingContainer';
import { MobileScreeningCard } from './MobileScreeningCard';
import { Reveal } from './Reveal';

export function ProductPairSection() {
  const { exploreMobile, exploreDrone } = useLandingActions();
  return (
    <section id="products" aria-labelledby="products-title" className="scroll-mt-20 pb-14 lg:pb-20">
      <LandingContainer>
        <h2 id="products-title" className="max-w-[640px] text-[28px] font-bold leading-tight text-primary-dark md:text-[36px]">
          Two perspectives. One connected field record.
        </h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:gap-6">
          <Reveal className="h-full">
            <MobileScreeningCard onExplore={exploreMobile} />
          </Reveal>
          <Reveal className="h-full" delay={0.05}>
            <DroneAnalyticsCard onExplore={() => exploreDrone('products')} />
          </Reveal>
        </div>
      </LandingContainer>
    </section>);

}