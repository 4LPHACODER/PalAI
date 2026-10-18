import React, { useState } from 'react';
import { droneSurveys } from '../../data/droneSurveys';
import { droneFeatures } from '../../data/landing';
import { surveyViews } from '../../data/surveyViews';
import { SurveyView } from '../../types/drone';
import { SurveyViewer } from '../drone/SurveyViewer';

const layers: SurveyView[] = ['aerial', 'multispectral', 'priorities'];
const layerLabels: Record<string, string> = { aerial: 'Aerial', multispectral: 'Multispectral', priorities: 'Priorities' };

export function DroneAnalyticsCard({ onExplore }: {onExplore: () => void;}) {
  const [view, setView] = useState<SurveyView>('aerial');
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-card shadow-card">
      <div className="relative h-[280px] overflow-hidden bg-primary-dark md:h-[300px]">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <SurveyViewer survey={droneSurveys[0]} view={view} bare lazy />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-[13px] font-semibold text-accent-ink ring-1 ring-line">
          Illustrative survey · Demo data
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-[13px] font-medium text-white">{surveyViews[view].badge}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-[14px] font-semibold text-primary">Drone field analytics · For organizations</p>
        <h3 className="mt-1 text-[24px] font-bold leading-tight text-primary-dark">See beyond a single plant.</h3>
        <p className="mt-2 text-[16px] leading-relaxed text-ink">
          Review aerial survey imagery and field patterns to help prioritize areas for closer inspection.
        </p>
        <div role="radiogroup" aria-label="Survey layer" className="mt-4 grid grid-cols-3 gap-1 rounded-2xl bg-canvas p-1 ring-1 ring-line">
          {layers.map((l) =>
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={view === l}
            onClick={() => setView(l)}
            className={`h-12 rounded-xl text-[14px] font-semibold transition-colors duration-150 ${view === l ? 'bg-primary text-white' : 'text-ink'}`}>
            
              {layerLabels[l]}
            </button>
          )}
        </div>
        <ul className="mt-5 space-y-3">
          {droneFeatures.map(({ icon: Icon, label }) =>
          <li key={label} className="flex items-start gap-3 text-[15px] text-ink">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span className="pt-1">{label}</span>
            </li>
          )}
        </ul>
        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={onExplore}
            className="flex h-14 w-full items-center justify-center rounded-2xl border-2 border-primary bg-card text-[17px] font-bold text-primary">
            
            Explore Drone Insights
          </button>
        </div>
      </div>
    </article>);

}