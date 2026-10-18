import { accountWelcomeNotification, initialNotifications } from '../data/notifications';
import { AppNotification, ScanRecord, WorkspaceData } from '../types/farm';
import { cloneDemoReminders, cloneDemoScans, WORKSPACE_VERSION } from './workspace';

const LEGACY_SEED_IDS = new Set(['scan-1004', 'scan-1005', 'scan-1006']);

const isSeed = (s: {id: string;seeded?: boolean;}) => s.seeded === true || s.id.startsWith('scan-seed-') || LEGACY_SEED_IDS.has(s.id);

/** Only records in the new structured shape can be kept. */
const isStructured = (s: unknown): s is ScanRecord =>
typeof s === 'object' && s !== null && 'diseaseCode' in s && 'steps' in s && 'analysis' in s;

/**
 * Upgrades a stored workspace to the current version without losing user data.
 * Seeded demo records are swapped for the current samples; everything the person created is kept.
 */
export function migrateWorkspace(stored: WorkspaceData, isDemo: boolean): WorkspaceData {
  if (stored.version === WORKSPACE_VERSION) return stored;

  const userScans = (stored.scans as unknown[]).filter((s): s is ScanRecord => isStructured(s) && !isSeed(s));
  const scans = isDemo ? [...userScans, ...cloneDemoScans()] : userScans;
  scans.sort((a, b) => b.date.localeCompare(a.date));

  const readIds = new Set(
    (stored.notifications as unknown as {id: string;read?: boolean;}[]).filter((n) => n.read).map((n) => n.id)
  );
  const baseNotifications: AppNotification[] = isDemo ? initialNotifications : [accountWelcomeNotification];
  const notifications = baseNotifications.map((n) => ({ ...n, read: n.read || readIds.has(n.id) }));

  return {
    ...stored,
    version: WORKSPACE_VERSION,
    scans,
    reminders: isDemo ? cloneDemoReminders() : [],
    notifications
  };
}