import { AppNotification } from '../types/farm';

export const initialNotifications: AppNotification[] = [
{
  id: 'notif-reminder',
  titleKey: 'notif.reminder.title',
  bodyKey: 'notif.reminder.body',
  fieldId: 'riverside',
  time: '2026-10-06T07:45:00',
  read: false,
  target: { type: 'reminder', id: 'rem-riverside', labelKey: 'rem.view' }
},
{
  id: 'notif-record',
  titleKey: 'notif.record.title',
  bodyKey: 'notif.record.body',
  fieldId: 'riverside',
  time: '2026-10-06T07:41:00',
  read: false,
  target: { type: 'scan', id: 'scan-seed-sheath', labelKey: 'common.viewRecord' }
},
{
  id: 'notif-welcome',
  titleKey: 'notif.welcome.title',
  bodyKey: 'notif.welcome.demoBody',
  time: '2026-10-01T09:00:00',
  read: true
}];


export const accountWelcomeNotification: AppNotification = {
  id: 'notif-welcome',
  titleKey: 'notif.welcome.title',
  bodyKey: 'notif.welcome.accountBody',
  time: new Date().toISOString(),
  read: true
};