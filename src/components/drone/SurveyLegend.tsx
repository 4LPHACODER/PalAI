import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { surveyViews } from '../../data/surveyViews';
import { LegendKind, SurveyView } from '../../types/drone';
import { priorityMeta } from '../../utils/survey';

function Swatch({ kind }: {kind: LegendKind;}) {
  switch (kind) {
    case 'boundary':
      return <span className="h-0 w-6 border-t-2 border-dashed border-primary-dark" />;
    case 'footprint':
      return <span className="h-4 w-6 rounded-sm border border-primary-dark/60 bg-primary-dark/10" />;
    case 'overlap':
      return (
        <span className="relative h-4 w-6">
          <span className="absolute left-0 top-0 h-3.5 w-4 rounded-sm border border-primary-dark/60 bg-primary-dark/10" />
          <span className="absolute bottom-0 right-0 h-3.5 w-4 rounded-sm border border-primary-dark/60 bg-primary-dark/20" />
        </span>);

    case 'drone':
      return <span className="h-3 w-6 rounded-full bg-ink/70" />;
    case 'path':
      return <span className="h-1 w-6 rounded-full bg-accent" />;
    case 'direction':
      return <span className="h-0 w-0 border-x-[6px] border-t-[9px] border-x-transparent border-t-accent" />;
    case 'gradient':
      return (
        <span className="flex h-3 w-16 overflow-hidden rounded-full">
          {['#C7331F', '#ED7A1F', '#F4D03A', '#8CC84B', '#228B3A'].map((c) =>
          <span key={c} className="flex-1" style={{ backgroundColor: c }} />
          )}
        </span>);

    case 'stress':
      return <span className="h-4 w-6 rounded-full bg-[#D9542B]/60 blur-[1px]" />;
    case 'inspect':
      return <span className="h-4 w-4 rounded-full ring-2" style={{ backgroundColor: priorityMeta.inspect.color }} />;
    case 'check':
      return <span className="h-4 w-4 rounded-full border-2 border-dashed" style={{ borderColor: priorityMeta.check.color, backgroundColor: `${priorityMeta.check.color}55` }} />;
    case 'marker':
      return <MapPinIcon className="h-5 w-5 fill-white text-primary-dark" aria-hidden />;
    default:
      return null;
  }
}

export function SurveyLegend({ view }: {view: SurveyView;}) {
  const items = surveyViews[view].legend;
  return (
    <div aria-label="Layer legend" className="rounded-2xl border border-line bg-card p-3">
      <p className="text-[13px] font-semibold text-ink-muted">Legend · {surveyViews[view].label}</p>
      <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 min-[390px]:grid-cols-2">
        {items.map((i) =>
        <li key={i.label} className="flex items-center gap-2.5 text-[14px] text-ink">
            <span className="flex w-16 shrink-0 items-center justify-center">
              <Swatch kind={i.kind} />
            </span>
            {i.kind === 'gradient' ?
          <span>
                Lower → higher
                <span className="block text-[13px] text-ink-muted">{i.label}</span>
              </span> :

          i.label
          }
          </li>
        )}
      </ul>
    </div>);

}