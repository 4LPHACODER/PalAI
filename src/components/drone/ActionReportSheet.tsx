import React from 'react';
import { InfoIcon } from 'lucide-react';
import { DroneSurvey } from '../../types/drone';
import { longDate } from '../../utils/format';
import { priorityMeta } from '../../utils/survey';
import { BottomSheet } from '../BottomSheet';
import { DemoTag } from '../DemoTag';

interface ActionReportSheetProps {
  survey: DroneSurvey;
  open: boolean;
  onClose: () => void;
}

export function ActionReportSheet({ survey, open, onClose }: ActionReportSheetProps) {
  const ordered = [...survey.areas].sort((a, b) => a.priority === b.priority ? 0 : a.priority === 'inspect' ? -1 : 1);
  return (
    <BottomSheet open={open} onClose={onClose} title="Sample Action Report">
      <article className="space-y-6 pb-1">
        <header className="rounded-2xl bg-canvas p-4">
          <DemoTag label="Sample report · Demo data" />
          <h3 className="mt-2 text-[20px] font-bold leading-tight text-primary-dark">{survey.site}</h3>
          <p className="text-[14px] text-ink-muted">{survey.siteNote}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3">
            <div>
              <dt className="text-[13px] text-ink-muted">Survey</dt>
              <dd className="text-[15px] font-semibold text-ink">{survey.name}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-muted">Captured</dt>
              <dd className="text-[15px] font-semibold text-ink">{longDate(survey.captured)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[13px] text-ink-muted">Report prepared</dt>
              <dd className="text-[15px] font-semibold text-ink">{longDate(survey.reportDate)} (sample)</dd>
            </div>
          </dl>
        </header>

        <section aria-labelledby="rep-summary">
          <h4 id="rep-summary" className="text-[17px] font-bold text-primary-dark">
            Summary
          </h4>
          <p className="mt-1 text-[16px] leading-relaxed text-ink">{survey.reportSummary}</p>
        </section>

        <section aria-labelledby="rep-priorities">
          <h4 id="rep-priorities" className="text-[17px] font-bold text-primary-dark">
            Inspection priorities
          </h4>
          <ol className="mt-2 divide-y divide-line rounded-2xl border border-line">
            {ordered.map((a) => {
              const meta = priorityMeta[a.priority];
              const linked = survey.records.filter((r) => a.linkedRecordIds.includes(r.id));
              return (
                <li key={a.id} className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[16px] font-bold text-ink">{a.label}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[13px] font-semibold ${meta.badge}`}>{meta.label}</span>
                  </div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink">
                    <span className="font-semibold">Why: </span>
                    {a.reason}
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink">
                    <span className="font-semibold">Action: </span>
                    {a.action}. {a.note}
                  </p>
                  {linked.length > 0 &&
                  <p className="mt-1 text-[14px] text-ink-muted">Linked farmer records: {linked.map((r) => r.title).join('; ')}</p>
                  }
                </li>);

            })}
          </ol>
        </section>

        <section aria-labelledby="rep-next">
          <h4 id="rep-next" className="text-[17px] font-bold text-primary-dark">
            Next steps for field personnel
          </h4>
          <ol className="mt-2 space-y-2">
            {survey.reportNextSteps.map((s, i) =>
            <li key={s} className="flex gap-3 text-[16px] leading-relaxed text-ink">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-[13px] font-bold text-primary">
                  {i + 1}
                </span>
                {s}
              </li>
            )}
          </ol>
        </section>

        <p className="flex gap-2 rounded-2xl border border-line p-3 text-[14px] leading-relaxed text-ink-muted">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          Sample report for demonstration. Aerial patterns and leaf screening do not confirm a disease. Field inspection by qualified
          personnel is needed.
        </p>
      </article>
    </BottomSheet>);

}