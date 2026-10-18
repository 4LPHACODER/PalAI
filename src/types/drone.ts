export type SurveyView = 'aerial' | 'coverage' | 'multispectral' | 'priorities';

export type InspectionPriority = 'inspect' | 'check';

export interface Ellipse {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface InspectionArea extends Ellipse {
  id: string;
  label: string;
  priority: InspectionPriority;
  reason: string;
  note: string;
  action: string;
  linkedRecordIds: string[];
}

export interface LinkedRecord {
  id: string;
  kind: 'scan' | 'observation';
  title: string;
  date: string;
  text: string;
  author: string;
  image: string | null;
  imageUnclear?: boolean;
  x: number;
  y: number;
}

export interface StressPatch extends Ellipse {
  strength: number;
}

export interface DroneSurvey {
  id: string;
  name: string;
  site: string;
  siteNote: string;
  areaHa: number;
  captured: string;
  reportDate: string;
  image: string;
  boundary: string;
  plots: string[];
  flightLines: number[];
  lineTop: number;
  lineBottom: number;
  lineStep: number;
  drone: {x: number;y: number;};
  stress: StressPatch[];
  areas: InspectionArea[];
  records: LinkedRecord[];
  details: {label: string;value: string;}[];
  reportSummary: string;
  reportNextSteps: string[];
}

export type LegendKind =
'boundary' |
'footprint' |
'drone' |
'path' |
'overlap' |
'direction' |
'gradient' |
'stress' |
'inspect' |
'check' |
'marker';