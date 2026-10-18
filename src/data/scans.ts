import { ScanRecord } from '../types/farm';
import { GUIDANCE_VERSION, guidanceForCode } from './guidance';
import { images } from './images';

/** Four seeded demo scans. Photos are AI-generated illustrations. */
export const demoScans: ScanRecord[] = [
{
  id: 'scan-seed-sheath',
  fieldId: 'riverside',
  date: '2026-10-06T07:40:00',
  diseaseCode: 'sheath_blight',
  status: 'followup',
  image: images.diseaseSheathBlight,
  imageIllustrative: true,
  source: 'simulated',
  guidanceVersion: GUIDANCE_VERSION,
  ...guidanceForCode('sheath_blight'),
  userNotes: '',
  seeded: true
},
{
  id: 'scan-seed-tungro',
  fieldId: 'north',
  date: '2026-10-05T16:10:00',
  diseaseCode: 'tungro',
  status: 'followup',
  image: images.diseaseTungro,
  imageIllustrative: true,
  source: 'simulated',
  guidanceVersion: GUIDANCE_VERSION,
  ...guidanceForCode('tungro'),
  userNotes: '',
  seeded: true
},
{
  id: 'scan-seed-blast',
  fieldId: 'riverside',
  date: '2026-10-04T08:20:00',
  diseaseCode: 'blast',
  status: 'saved',
  image: images.diseaseBlast,
  imageIllustrative: true,
  source: 'simulated',
  guidanceVersion: GUIDANCE_VERSION,
  ...guidanceForCode('blast'),
  userNotes: '',
  seeded: true
},
{
  id: 'scan-seed-bacterial',
  fieldId: 'north',
  date: '2026-10-03T07:05:00',
  diseaseCode: 'bacterial_blight',
  status: 'saved',
  image: images.diseaseBacterialBlight,
  imageIllustrative: true,
  source: 'simulated',
  guidanceVersion: GUIDANCE_VERSION,
  ...guidanceForCode('bacterial_blight'),
  userNotes: '',
  seeded: true
}];