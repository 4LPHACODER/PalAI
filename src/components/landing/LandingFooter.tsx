import React from 'react';
import { Link } from 'react-router-dom';
import { useLandingActions } from '../../hooks/useLandingActions';
import { BrandMark } from '../BrandMark';
import { LandingContainer } from './LandingContainer';

export function LandingFooter() {
  const { tryFarmerDemo, hasSession } = useLandingActions();
  return (
    <footer className="pb-[calc(env(safe-area-inset-bottom)+24px)] pt-14">
      <LandingContainer>
        <div className="rounded-card border border-line bg-card p-6 text-center md:p-10">
          <h2 className="text-[26px] font-bold leading-tight text-primary-dark md:text-[32px]">Start with the free farmer demo.</h2>
          <p className="mx-auto mt-2 max-w-[480px] text-[16px] leading-relaxed text-ink-muted">
            Explore Juan Dela Cruz’s sample farm: scan screens, field records, and follow-up reminders.
          </p>
          <div className="mx-auto mt-6 flex max-w-[480px] flex-col gap-2 sm:flex-row sm:justify-center">
            <button type="button" onClick={tryFarmerDemo} className="h-14 rounded-2xl bg-primary px-6 text-[17px] font-bold text-white">
              Try the Farmer Demo
            </button>
            {!hasSession &&
            <Link to="/welcome" className="flex h-14 items-center justify-center rounded-2xl border border-line px-6 text-[17px] font-bold text-primary">
                Create a free account
              </Link>
            }
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <BrandMark showTagline />
          <p className="max-w-[520px] text-[13px] leading-relaxed text-ink-muted">
            Prototype. Imagery is illustrative and all survey, field, and farmer data are fictional. PalAI screening is a guide, not a
            diagnosis.
          </p>
        </div>
      </LandingContainer>
    </footer>);

}