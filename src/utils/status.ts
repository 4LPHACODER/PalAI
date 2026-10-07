import {
  AlertCircleIcon,
  CameraIcon,
  CheckCircle2Icon,
  ClipboardIcon,
  ClockIcon,
  EyeIcon,
  LucideIcon,
  WifiOffIcon } from
'lucide-react';
import { FieldStatus, ScanStatus, SyncState } from '../types/farm';

export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeMeta {
  tone: BadgeTone;
  label: string;
  icon: LucideIcon;
}

export const toneClasses: Record<BadgeTone, string> = {
  success: 'bg-primary-soft text-primary-dark',
  warning: 'bg-warn-soft text-warn',
  danger: 'bg-danger-soft text-danger',
  neutral: 'bg-canvas text-ink-muted ring-1 ring-inset ring-line'
};

export const scanStatusMeta: Record<ScanStatus, BadgeMeta> = {
  followup: { tone: 'warning', label: 'Follow-up needed', icon: EyeIcon },
  saved: { tone: 'success', label: 'Saved', icon: CheckCircle2Icon },
  retake: { tone: 'neutral', label: 'Retake photo', icon: CameraIcon }
};

export const fieldStatusMeta: Record<FieldStatus, BadgeMeta> = {
  followup: { tone: 'warning', label: 'Follow-up recommended', icon: EyeIcon },
  ok: { tone: 'success', label: 'No follow-up needed', icon: CheckCircle2Icon },
  none: { tone: 'neutral', label: 'No records yet', icon: ClipboardIcon }
};

export const syncStateMeta: Record<SyncState, BadgeMeta & {title: string;explanation: string;}> = {
  synced: {
    tone: 'success',
    label: 'Online · All records synced',
    icon: CheckCircle2Icon,
    title: 'Online, all records synced',
    explanation: 'Your scans and field notes are saved and up to date on this phone.'
  },
  offline: {
    tone: 'neutral',
    label: 'Offline · Saved records available',
    icon: WifiOffIcon,
    title: 'Offline',
    explanation: 'There is no signal right now. You can still open saved records, fill in forms, and take new photos.'
  },
  pending: {
    tone: 'warning',
    label: '2 records waiting to sync',
    icon: ClockIcon,
    title: '2 records waiting to sync',
    explanation: 'Two records are saved on this phone and are waiting for a stable connection.'
  },
  failed: {
    tone: 'danger',
    label: 'Sync failed',
    icon: AlertCircleIcon,
    title: 'Sync failed',
    explanation: 'Your records could not be sent, but they are still saved on this phone. Tap Retry to try again.'
  }
};