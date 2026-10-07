import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckIcon, ChevronRightIcon, InfoIcon, LayersIcon } from 'lucide-react';
import { PageBody } from '../components/PageBody';
import { PageHeader } from '../components/PageHeader';
import { institutionTypes, workflowSteps } from '../data/workflow';

export function Workspace() {
  const [params] = useSearchParams();
  const fromLanding = params.get('from') === 'institutions';
  return (
    <div>
      <PageHeader title="Institutional Workspace" subtitle="Demo preview" backTo={fromLanding ? '/landing#institutions' : '/profile'} />
      <PageBody className="pt-4">
        <p role="note" className="flex gap-2 rounded-2xl border border-accent/50 bg-accent-soft p-4 text-[15px] leading-snug text-accent-ink">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          Demo navigation only. This is not a real sign-in, it grants no account permissions, and no institutional data is
          connected.
        </p>

        <h2 className="mt-6 text-[22px] font-bold leading-tight text-primary-dark">From a leaf photo to an action plan</h2>
        <p className="mt-2 text-[16px] leading-relaxed text-ink">
          The workspace will help organizations review farmer records, drone surveys, and field maps to decide where
          support is needed first.
        </p>

        <ol className="mt-5 rounded-card border border-line bg-card p-4 shadow-card">
          {workflowSteps.map((step, i) =>
          <li key={step.title} className="relative flex gap-3 pb-5 last:pb-0">
              {i < workflowSteps.length - 1 &&
            <span className="absolute left-[15px] top-9 h-[calc(100%-32px)] w-0.5 bg-line" aria-hidden />
            }
              <span
              className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full text-[14px] font-bold ${
              step.available ? 'bg-primary text-white' : 'border-2 border-line bg-card text-ink-muted'}`
              }>
              
                {step.available ? <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden /> : i + 1}
              </span>
              <div className="min-w-0 pt-1">
                <p className="text-[16px] font-bold text-primary-dark">{step.title}</p>
                <p className="mt-0.5 text-[14px] leading-snug text-ink-muted">{step.text}</p>
                <p className={`mt-1 text-[13px] font-semibold ${step.available ? 'text-primary' : 'text-ink-muted'}`}>
                  {step.available ? 'Available in the farmer app' : 'Coming in a later step'}
                </p>
              </div>
            </li>
          )}
        </ol>

        <Link
          to="/drone-insights?from=workspace"
          className="mt-5 flex min-h-[72px] items-center gap-3 rounded-card border border-line bg-card p-4 shadow-card active:bg-canvas">
          
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-white">
            <LayersIcon className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[16px] font-bold text-primary-dark">Drone Field Insights preview</span>
            <span className="block text-[14px] text-ink-muted">Sample surveys, inspection areas, and an action report</span>
          </span>
          <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
        </Link>

        <h3 className="mt-7 text-[17px] font-bold text-primary-dark">Built for</h3>
        <ul className="mt-2 divide-y divide-line rounded-card border border-line bg-card px-4">
          {institutionTypes.map((t) =>
          <li key={t} className="py-3 text-[16px] text-ink">
              {t}
            </li>
          )}
        </ul>

        <Link to="/" className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-primary text-[17px] font-bold text-white">
          Back to farmer app
        </Link>
      </PageBody>
    </div>);

}