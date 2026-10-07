import React from "react";
import { CrosshairIcon, LayersIcon, RouteIcon, ScanIcon, BoxIcon } from "lucide-react";
import { surveyViewOrder, surveyViews } from "../../data/surveyViews";
import { SurveyView } from "../../types/drone";
const icons: Record<SurveyView, BoxIcon> = {
  aerial: ScanIcon,
  coverage: RouteIcon,
  multispectral: LayersIcon,
  priorities: CrosshairIcon
};
interface ViewSelectorProps {
  value: SurveyView;
  onChange: (v: SurveyView) => void;
  layout?: 'grid' | 'list';
  className?: string;
}
export function ViewSelector({
  value,
  onChange,
  layout = 'grid',
  className = ''
}: ViewSelectorProps) {
  return <div role="radiogroup" aria-label="Survey view" className={`${layout === 'grid' ? 'grid grid-cols-2 gap-2' : 'flex flex-col gap-2'} ${className}`}>
      {surveyViewOrder.map((v) => {
      const Icon = icons[v];
      const selected = v === value;
      return <button key={v} type="button" role="radio" aria-checked={selected} onClick={() => onChange(v)} className={`flex min-h-[56px] items-center gap-2.5 rounded-2xl border-2 px-3 text-left transition-colors duration-150 ${selected ? 'border-primary bg-primary text-white' : 'border-line bg-card text-ink'}`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${selected ? 'bg-white/15 text-white' : 'bg-primary-soft text-primary'}`}>
              <Icon className="h-[18px] w-[18px]" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className={`block text-[12px] font-bold ${selected ? 'text-white/75' : 'text-ink-muted'}`}>{surveyViews[v].letter}</span>
              <span className="block text-[14px] font-semibold leading-tight">{surveyViews[v].label}</span>
            </span>
          </button>;
    })}
    </div>;
}