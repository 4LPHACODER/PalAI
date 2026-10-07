import { LegendKind, SurveyView } from '../types/drone';

export const surveyViewOrder: SurveyView[] = ['aerial', 'coverage', 'multispectral', 'priorities'];

export const surveyViews: Record<
  SurveyView,
  {letter: string;label: string;title: string;text: string;badge: string;legend: {kind: LegendKind;label: string;}[];}> =
{
  aerial: {
    letter: 'A',
    label: 'Aerial capture',
    title: 'Aerial capture',
    text: 'A top-down image from a recorded survey, with the field boundary and one image footprint marked beneath the drone.',
    badge: 'Recorded survey image',
    legend: [
    { kind: 'boundary', label: 'Field boundary' },
    { kind: 'footprint', label: 'Image footprint' },
    { kind: 'drone', label: 'Drone position at capture' }]

  },
  coverage: {
    letter: 'B',
    label: 'Survey coverage',
    title: 'Survey coverage',
    text: 'Overlapping image footprints along a flight path. Overlap lets many photos be combined into one view of the field.',
    badge: 'Illustrative survey path',
    legend: [
    { kind: 'path', label: 'Illustrative survey path' },
    { kind: 'direction', label: 'Survey direction' },
    { kind: 'footprint', label: 'Image footprint' },
    { kind: 'overlap', label: 'Coverage overlap' }]

  },
  multispectral: {
    letter: 'C',
    label: 'Multispectral preview',
    title: 'Multispectral preview',
    text: 'A sample false-color layer, as produced by a compatible multispectral sensor. Ordinary RGB photos can’t provide these measurements, and color alone doesn’t identify a disease.',
    badge: 'Sample false-color layer',
    legend: [
    { kind: 'gradient', label: 'Relative vegetation index (sample)' },
    { kind: 'stress', label: 'Sample crop-stress pattern' }]

  },
  priorities: {
    letter: 'D',
    label: 'Inspection priorities',
    title: 'Inspection priorities',
    text: 'Areas selected for a field visit, based on aerial patterns and shared farmer observations. Inspection on the ground confirms what is happening.',
    badge: 'Sample inspection priorities',
    legend: [
    { kind: 'inspect', label: 'Inspect first' },
    { kind: 'check', label: 'Check soon' },
    { kind: 'marker', label: 'Shared farmer record' },
    { kind: 'boundary', label: 'Field boundary' }]

  }
};