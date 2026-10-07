import { DroneSurvey, InspectionPriority, SurveyView } from '../types/drone';
import { longDate } from './format';

export interface Footprint {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function buildFootprints(s: DroneSurvey): Footprint[] {
  const spacing = s.flightLines.length > 1 ? s.flightLines[1] - s.flightLines[0] : 12;
  const w = spacing * 1.5;
  const h = s.lineStep * 1.3;
  const out: Footprint[] = [];
  s.flightLines.forEach((x) => {
    for (let y = s.lineTop; y <= s.lineBottom + 0.01; y += s.lineStep) out.push({ x: x - w / 2, y: y - h / 2, w, h });
  });
  return out;
}

/** Lawnmower path: down one line, up the next. */
export function buildFlightPath(s: DroneSurvey): string {
  return s.flightLines.
  flatMap((x, i) => i % 2 === 0 ? [`${x},${s.lineTop}`, `${x},${s.lineBottom}`] : [`${x},${s.lineBottom}`, `${x},${s.lineTop}`]).
  join(' ');
}

export function buildDirectionArrows(s: DroneSurvey): {x: number;y: number;down: boolean;}[] {
  const mid = (s.lineTop + s.lineBottom) / 2;
  return s.flightLines.map((x, i) => ({ x, y: mid, down: i % 2 === 0 }));
}

export const priorityMeta: Record<InspectionPriority, {label: string;color: string;badge: string;text: string;}> = {
  inspect: { label: 'Inspect first', color: '#C2410C', badge: 'bg-danger-soft text-danger', text: 'text-white' },
  check: { label: 'Check soon', color: '#E7B844', badge: 'bg-warn-soft text-warn', text: 'text-primary-dark' }
};

export function viewDetails(s: DroneSurvey, view: SurveyView): {label: string;value: string;}[] {
  if (view === 'aerial') {
    return [
    { label: 'Selected field', value: `${s.site} · ${s.areaHa} ha` },
    { label: 'Capture date', value: longDate(s.captured) },
    { label: 'Survey', value: s.name }];

  }
  if (view === 'coverage') {
    return [
    { label: 'Flight lines', value: `${s.flightLines.length} (illustrative)` },
    { label: 'Image footprints shown', value: String(buildFootprints(s).length) },
    { label: 'Direction', value: 'Parallel north–south lines' }];

  }
  if (view === 'multispectral') {
    return [
    { label: 'Layer', value: 'Sample vegetation index' },
    { label: 'Sensor', value: 'Compatible multispectral camera (sample)' },
    { label: 'Sample stress patterns', value: String(s.stress.length) }];

  }
  return [
  { label: 'Inspect first', value: String(s.areas.filter((a) => a.priority === 'inspect').length) },
  { label: 'Check soon', value: String(s.areas.filter((a) => a.priority === 'check').length) },
  { label: 'Shared farmer records', value: String(s.records.length) }];

}