import { DroneSurvey } from '../types/drone';
import { images } from './images';

export const droneSurveys: DroneSurvey[] = [
{
  id: 'survey-001',
  name: 'Demo Survey 001',
  site: 'Riverside Plot',
  siteNote: 'Same field as the farmer demo · 1.2 hectares',
  areaHa: 1.2,
  captured: '2026-10-05',
  reportDate: '2026-10-06',
  image: images.surveyRiverside,
  boundary: '16,14 86,11 89,87 12,89',
  plots: [],
  flightLines: [22, 33, 44, 55, 66, 77],
  lineTop: 18,
  lineBottom: 82,
  lineStep: 16,
  drone: { x: 58, y: 44 },
  stress: [
  { cx: 28, cy: 62, rx: 9, ry: 7, strength: 0.6 },
  { cx: 70, cy: 28, rx: 7, ry: 5, strength: 0.35 }],

  areas: [
  {
    id: 'area-a',
    label: 'Area A',
    priority: 'inspect',
    cx: 28,
    cy: 62,
    rx: 9,
    ry: 7,
    reason:
    'The sample crop-stress pattern overlaps where a farmer scan noted Possible Sheath Blight (Oct 6) and a farmer observation mentioned spots near the canal (Oct 5).',
    note: 'Walk the canal-side rows. Check the lower stems and sheaths of several plants and photograph them for a follow-up scan.',
    action: 'Inspect the marked area',
    linkedRecordIds: ['rec-scan-1006', 'rec-obs-1005']
  },
  {
    id: 'area-b',
    label: 'Area B',
    priority: 'check',
    cx: 70,
    cy: 28,
    rx: 7,
    ry: 5,
    reason: 'Uneven color in the sample vegetation layer near the field edge. No ground observation yet, so the cause is unknown.',
    note: 'Check water level and plant color during the next visit. It may relate to water or nutrients — inspection will tell.',
    action: 'Check during the next visit',
    linkedRecordIds: []
  }],

  records: [
  {
    id: 'rec-scan-1006',
    kind: 'scan',
    title: 'Possible Sheath Blight in one submitted photo',
    date: '2026-10-06',
    text: 'Sample result for one photographed lower stem. Simulated screening — not a diagnosis.',
    author: 'Juan Dela Cruz',
    image: images.diseaseSheathBlight,
    x: 31,
    y: 60
  },
  {
    id: 'rec-obs-1005',
    kind: 'observation',
    title: 'Farmer observation',
    date: '2026-10-05',
    text: 'Saw a few brown spots on leaves near the canal side. Will scan them tomorrow morning.',
    author: 'Juan Dela Cruz',
    image: null,
    x: 24,
    y: 67
  }],

  details: [
  { label: 'Survey', value: 'Demo Survey 001' },
  { label: 'Selected field', value: 'Riverside Plot (1.2 ha)' },
  { label: 'Capture date', value: 'October 5, 2026' },
  { label: 'Flight pattern', value: 'Parallel north–south lines (illustrative)' },
  { label: 'Image footprints', value: '30 shown (illustrative)' },
  { label: 'Overlap', value: 'About 75% forward, 65% side (sample settings; drawing simplified)' },
  { label: 'Sensor', value: 'RGB + multispectral camera (sample configuration)' },
  { label: 'Height above ground', value: '60 m (sample)' }],

  reportSummary:
  'One area of Riverside Plot is recommended for inspection first. A farmer scan, a farmer observation, and a sample crop-stress pattern point to the same canal-side location. A second area shows uneven color with no ground observation yet.',
  reportNextSteps: [
  'Visit Area A with the farmer and check several plants along the canal side.',
  'Photograph the lower stems and sheaths for a follow-up scan.',
  'Check water level and plant color in Area B during the same visit.',
  'Record what was found as a field observation.']

},
{
  id: 'survey-002',
  name: 'Demo Survey 002',
  site: 'Demonstration Site A',
  siteNote: 'Separate fictional demonstration site · 8.4 hectares',
  areaHa: 8.4,
  captured: '2026-09-28',
  reportDate: '2026-09-29',
  image: images.surveyDemoSite,
  boundary: '6,7 94,7 94,93 6,93',
  plots: ['6,7 35,7 35,50 6,50', '35,7 65,7 65,50 35,50', '65,7 94,7 94,50 65,50', '6,50 35,50 35,93 6,93', '35,50 65,50 65,93 35,93', '65,50 94,50 94,93 65,93'],
  flightLines: [14, 26, 38, 50, 62, 74, 86],
  lineTop: 14,
  lineBottom: 86,
  lineStep: 18,
  drone: { x: 50, y: 32 },
  stress: [
  { cx: 25, cy: 30, rx: 12, ry: 9, strength: 0.6 },
  { cx: 74, cy: 70, rx: 9, ry: 6, strength: 0.4 },
  { cx: 50, cy: 78, rx: 5, ry: 4, strength: 0.3 }],

  areas: [
  {
    id: 'area-a',
    label: 'Area A',
    priority: 'inspect',
    cx: 25,
    cy: 30,
    rx: 12,
    ry: 9,
    reason: 'The largest sample stress pattern, spanning two plots near the irrigation inlet.',
    note: 'Walk both plots from the inlet side. Note plant color, water depth, and any visible leaf symptoms.',
    action: 'Inspect first',
    linkedRecordIds: []
  },
  {
    id: 'area-b',
    label: 'Area B',
    priority: 'check',
    cx: 74,
    cy: 70,
    rx: 9,
    ry: 6,
    reason: 'A patchy pattern along a bund. It may relate to how water flows across the plot.',
    note: 'Check the bund and water flow during the next visit.',
    action: 'Check soon',
    linkedRecordIds: []
  },
  {
    id: 'area-c',
    label: 'Area C',
    priority: 'check',
    cx: 50,
    cy: 78,
    rx: 5,
    ry: 4,
    reason: 'A small sample pattern. Lower priority until it is checked on the ground.',
    note: 'Look at a few plants here if time allows.',
    action: 'Check if time allows',
    linkedRecordIds: []
  }],

  records: [],
  details: [
  { label: 'Survey', value: 'Demo Survey 002' },
  { label: 'Site', value: 'Demonstration Site A (fictional, 8.4 ha)' },
  { label: 'Capture date', value: 'September 28, 2026' },
  { label: 'Flight pattern', value: 'Parallel north–south lines (illustrative)' },
  { label: 'Image footprints', value: '35 shown (illustrative)' },
  { label: 'Overlap', value: 'About 75% forward, 65% side (sample settings; drawing simplified)' },
  { label: 'Sensor', value: 'RGB + multispectral camera (sample configuration)' },
  { label: 'Height above ground', value: '80 m (sample)' }],

  reportSummary:
  'Three areas of this fictional demonstration site show sample patterns worth checking. No farmer observations have been shared for this site, so ground inspection is needed to understand each pattern.',
  reportNextSteps: [
  'Inspect Area A first, starting from the irrigation inlet.',
  'Check the bund and water flow at Area B.',
  'Look at Area C if time allows.',
  'Invite participating farmers to share scans from these plots.']

}];