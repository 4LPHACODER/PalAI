import { Field } from '../types/farm';
import { images } from './images';

export const demoFields: Field[] = [
{
  id: 'riverside',
  name: 'Riverside Plot',
  areaHa: 1.2,
  variety: 'NSIC Rc 222',
  plantingDate: '2026-09-08',
  stage: 'Tillering',
  notes: 'Beside the river canal. Water comes from the river pump.',
  photo: images.fieldRiverside,
  location: {
    province: 'Surigao del Sur',
    city: 'Tandag City',
    barangay: 'Telaje',
    detail: 'Purok 3, beside the river canal',
    lat: 9.0786,
    lng: 126.1934,
    source: 'map'
  },
  archived: false,
  createdAt: '2026-09-08T08:00:00'
},
{
  id: 'north',
  name: 'North Plot',
  areaHa: 0.8,
  variety: 'NSIC Rc 160',
  plantingDate: '2026-08-10',
  stage: 'Reproductive',
  notes: '',
  photo: images.fieldNorth,
  location: {
    province: 'Surigao del Sur',
    city: 'Tandag City',
    barangay: 'Mabua',
    detail: '',
    lat: null,
    lng: null,
    source: 'manual'
  },
  archived: false,
  createdAt: '2026-08-10T08:00:00'
}];