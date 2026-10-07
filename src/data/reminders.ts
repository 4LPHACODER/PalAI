import { Reminder } from '../types/farm';

export const demoReminders: Reminder[] = [
{
  id: 'rem-riverside',
  fieldId: 'riverside',
  scanId: 'scan-1006',
  title: 'Recheck Riverside Plot',
  description: 'Take another photo of the marked leaves.',
  due: '2026-10-07T07:00:00',
  steps: [
  'Go back to the plants you checked on October 6.',
  'Photograph the same leaves in morning light.',
  'Compare: are there more spots, or about the same?']

}];