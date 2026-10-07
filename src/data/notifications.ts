import { AppNotification } from '../types/farm';

export const initialNotifications: AppNotification[] = [
{
  id: 'notif-reminder',
  title: 'Recheck Riverside Plot tomorrow',
  body: 'A follow-up photo is due for the leaves you scanned on October 6.',
  time: 'Today, 7:45 AM',
  read: false,
  target: { type: 'reminder', id: 'rem-riverside', label: 'View Reminder' }
},
{
  id: 'notif-record',
  title: 'Screening saved: Possible Brown Spot',
  body: 'Riverside Plot · Review the suggested next steps for this record.',
  time: 'Today, 7:41 AM',
  read: false,
  target: { type: 'scan', id: 'scan-1006', label: 'View Record' }
},
{
  id: 'notif-welcome',
  title: 'Welcome to PalAI',
  body: 'Your rice health companion. This preview uses sample data.',
  time: 'Oct 1, 2026',
  read: true
}];