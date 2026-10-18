import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ConnectedWorkflowSection } from '../../components/landing/ConnectedWorkflowSection';
import { DroneShowcaseSection } from '../../components/landing/DroneShowcaseSection';
import { InstitutionalSection } from '../../components/landing/InstitutionalSection';
import { LandingFooter } from '../../components/landing/LandingFooter';
import { LandingHero } from '../../components/landing/LandingHero';
import { LandingNav } from '../../components/landing/LandingNav';
import { ProductPairSection } from '../../components/landing/ProductPairSection';

export function Landing() {
  const { hash } = useLocation();

  // Return controls link to /landing#section — restore that position.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }));
    return () => window.cancelAnimationFrame(id);
  }, [hash]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-canvas">
      <LandingNav />
      <main>
        <LandingHero />
        <ProductPairSection />
        <DroneShowcaseSection />
        <ConnectedWorkflowSection />
        <InstitutionalSection />
      </main>
      <LandingFooter />
    </div>);

}