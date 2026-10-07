import React from 'react';
import { InfoIcon } from 'lucide-react';
import { workflowStages } from '../../data/landing';
import { LandingContainer } from './LandingContainer';
import { Reveal } from './Reveal';

export function ConnectedWorkflowSection() {
  return (
    <section id="workflow" aria-labelledby="workflow-title" className="scroll-mt-20 py-14 lg:py-20">
      <LandingContainer>
        <h2 id="workflow-title" className="max-w-[680px] text-[28px] font-bold leading-tight text-primary-dark md:text-[36px]">
          Connect ground observations with the wider field.
        </h2>
        <p className="mt-2 max-w-[640px] text-[17px] leading-relaxed text-ink-muted">
          Leaf observations and aerial patterns provide different evidence. Field inspection helps clarify what is happening.
        </p>

        <ol className="mt-8 grid gap-3 lg:grid-cols-4 lg:gap-4">
          {workflowStages.map(({ icon: Icon, title, text, exampleLabel, example }, i) =>
          <li key={title} className="relative">
              <Reveal delay={i * 0.04} className="h-full">
                <div className="flex h-full gap-4 rounded-card border border-line bg-card p-4 lg:flex-col lg:p-5">
                  <div className="flex flex-col items-center lg:flex-row lg:gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="mt-2 text-[13px] font-bold text-ink-muted lg:mt-0">Step {i + 1}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="text-[18px] font-bold text-primary-dark">{title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink">{text}</p>
                    <p className="mt-auto pt-3">
                      <span className="inline-flex flex-wrap gap-x-1 rounded-xl bg-canvas px-3 py-2 text-[14px]">
                        <span className="text-ink-muted">{exampleLabel}:</span>
                        <span className="font-semibold text-ink">{example}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          )}
        </ol>

        <p className="mt-5 flex max-w-[720px] gap-2 text-[14px] leading-relaxed text-ink-muted">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          A mobile scan does not trigger a drone flight, and scans do not include a free survey. Drone surveys are arranged separately by
          participating organizations.
        </p>
      </LandingContainer>
    </section>);

}