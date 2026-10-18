import React from 'react';
import { DroneSurvey } from '../../types/drone';

export function SurveyDetailsList({ survey }: {survey: DroneSurvey;}) {
  return (
    <div>
      <dl className="divide-y divide-line">
        {survey.details.map((d) =>
        <div key={d.label} className="flex justify-between gap-4 py-2.5">
            <dt className="shrink-0 text-[14px] text-ink-muted">{d.label}</dt>
            <dd className="text-right text-[14px] font-semibold text-ink">{d.value}</dd>
          </div>
        )}
      </dl>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
        Recorded-survey preview with sample values. Paths, footprints, and layers are illustrative and are not measurements.
      </p>
    </div>);

}