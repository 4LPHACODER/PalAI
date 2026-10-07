import { ScanRecord } from '../types/farm';
import { images } from './images';

export const demoScans: ScanRecord[] = [
{
  id: 'scan-1006',
  fieldId: 'riverside',
  date: '2026-10-06T07:40:00',
  result: 'Possible Brown Spot',
  summary:
  'Small oval brown spots were found on the photographed leaf. This is a possible sign of Brown Spot, so it needs another look.',
  status: 'followup',
  image: images.leafBrownSpot,
  nextSteps: [
  'Take another photo of the marked leaves tomorrow.',
  'Check a few plants nearby to see if spots appear elsewhere.',
  'Talk to your Agricultural Technician if the spots spread.']

},
{
  id: 'scan-1005',
  fieldId: 'north',
  date: '2026-10-05T16:10:00',
  result: 'No clear symptoms detected',
  summary: 'The photographed leaf showed no clear signs of disease. Keep checking your field regularly.',
  status: 'saved',
  image: images.leafHealthy,
  nextSteps: ['Continue your usual field care.', 'Scan again in about a week.']
},
{
  id: 'scan-1004',
  fieldId: 'riverside',
  date: '2026-10-04T08:20:00',
  result: 'Unable to assess',
  summary: 'The photo was too blurry or dark to screen. No result was recorded for this leaf.',
  status: 'retake',
  image: images.leafBrownSpot,
  imageUnclear: true,
  nextSteps: [
  'Retake the photo in good daylight.',
  'Hold one leaf flat and keep it in focus.',
  'Avoid shadows and strong backlight.']

}];