import React from 'react';
import { InfoIcon } from 'lucide-react';
import { droneSurveys } from '../../data/droneSurveys';
import { institutionalBenefits } from '../../data/landing';
import { useLandingActions } from '../../hooks/useLandingActions';
import { shortDate } from '../../utils/format';
import { priorityMeta } from '../../utils/survey';
import { SurveyViewer } from '../drone/SurveyViewer';
import { LandingContainer } from './LandingContainer';
import { Reveal } from './Reveal';

const site = droneSurveys[1];

export function InstitutionalSection() {
  const { viewInstitutional, exploreDrone } = useLandingActions();
  return (
    <section id="institutions" aria-labelledby="inst-title" className="scroll-mt-20 bg-primary-dark py-14 text-white lg:py-20">
      <LandingContainer className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div>
          <h2 id="inst-title" className="text-[28px] font-bold leading-tight md:text-[36px]">
            Field-wide insights for agricultural teams.
          </h2>
          <p className="mt-3 max-w-[560px] text-[17px] leading-relaxed text-white/85">
            Bring shared farmer observations, drone surveys, and inspection priorities into one workspace.
          </p>
          <ul className="mt-7 space-y-3">
            {institutionalBenefits.map(({ icon: Icon, title, text }, i) =>
            <li key={title}>
                <Reveal delay={i * 0.04}>
                  <div className="flex gap-4 rounded-card border border-white/15 bg-white/[0.06] p-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-primary-dark">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-[17px] font-bold">{title}</h3>
                      <p className="mt-0.5 text-[15px] leading-relaxed text-white/80">{text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            )}
          </ul>
          <p className="mt-6 flex gap-2 rounded-2xl bg-white/[0.08] p-4 text-[15px] leading-relaxed text-white">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
            Basic farmer screening is free. Drone surveying and institutional analytics are separate services.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button type="button" onClick={viewInstitutional} className="h-14 rounded-2xl bg-accent px-6 text-[17px] font-bold text-primary-dark">
              View Institutional Demo
            </button>
            <button
              type="button"
              onClick={() => exploreDrone('institutions')}
              className="h-14 rounded-2xl border border-white/30 px-6 text-[17px] font-bold text-white">
              
              Explore Drone Insights
            </button>
          </div>
        </div>

        <div className="relative pb-24 sm:pb-16">
          <SurveyViewer survey={site} view="priorities" lazy />
          <div className="absolute inset-x-4 bottom-0 rounded-card bg-card p-4 text-ink shadow-card sm:left-auto sm:right-4 sm:w-[300px]">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[15px] font-bold text-primary-dark">Sample Action Report</p>
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[13px] font-semibold text-accent-ink">Demo</span>
            </div>
            <p className="text-[13px] text-ink-muted">
              {site.site} · {site.name}
            </p>
            <ul className="mt-2 space-y-1.5">
              {site.areas.map((a) =>
              <li key={a.id} className="flex items-center justify-between gap-2 text-[14px]">
                  <span className="font-semibold">{a.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[13px] font-semibold ${priorityMeta[a.priority].badge}`}>{priorityMeta[a.priority].label}</span>
                </li>
              )}
            </ul>
            <p className="mt-2 text-[13px] text-ink-muted">Prepared {shortDate(site.reportDate)} (sample)</p>
          </div>
        </div>
      </LandingContainer>
    </section>);

}