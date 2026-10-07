import { demoFields } from '../data/fields';
import { initialNotifications } from '../data/notifications';
import { demoObservations } from '../data/observations';
import { demoProfile } from '../data/profiles';
import { demoReminders } from '../data/reminders';
import { demoScans } from '../data/scans';
import { SharingPrefs, WorkspaceData } from '../types/farm';

export const WORKSPACE_VERSION = 2;

export const defaultSharing: SharingPrefs = {
  enabled: false,
  organizationId: null,
  fieldIds: [],
  includePhotos: false,
  includeObservations: false,
  includePreciseLocation: false,
  updatedAt: null
};

export function createDemoWorkspace(): WorkspaceData {
  return {
    version: WORKSPACE_VERSION,
    profile: { ...demoProfile },
    fields: demoFields.map((f) => ({ ...f, location: { ...f.location } })),
    scans: demoScans.map((s) => ({ ...s })),
    observations: demoObservations.map((o) => ({ ...o })),
    reminders: demoReminders.map((r) => ({ ...r })),
    notifications: initialNotifications.map((n) => ({ ...n })),
    selectedFieldId: demoFields[0].id,
    sharing: { ...defaultSharing }
  };
}

/** A new person starts with an empty personal workspace — never Juan's sample data. */
export function createAccountWorkspace(fullName: string, email: string | null): WorkspaceData {
  return {
    version: WORKSPACE_VERSION,
    profile: {
      fullName,
      displayName: fullName.trim().split(/\s+/)[0] ?? '',
      email,
      province: '',
      city: '',
      barangay: '',
      mobile: '',
      cooperative: '',
      photo: null,
      setupComplete: false
    },
    fields: [],
    scans: [],
    observations: [],
    reminders: [],
    notifications: [
    {
      id: 'notif-welcome',
      title: 'Welcome to PalAI',
      body: 'Your rice health companion. Start by scanning a leaf or adding a field.',
      time: 'Just now',
      read: true
    }],

    selectedFieldId: null,
    sharing: { ...defaultSharing }
  };
}