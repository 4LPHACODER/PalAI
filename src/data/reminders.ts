import { Reminder } from '../types/farm';

export const demoReminders: Reminder[] = [
{
  id: 'rem-riverside',
  fieldId: 'riverside',
  scanId: 'scan-seed-sheath',
  titleKey: 'rem.recheck.title',
  descriptionKey: 'rem.recheck.desc',
  stepKeys: ['rem.recheck.s1', 'rem.recheck.s2', 'rem.recheck.s3'],
  due: '2026-10-07T07:00:00'
}];