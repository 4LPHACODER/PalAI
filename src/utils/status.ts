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
import type { TKey } from '../data/translations';
import { FieldStatus, ScanStatus, SyncState } from '../types/farm';

export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeMeta {
  tone: BadgeTone;
  labelKey: TKey;
  icon: LucideIcon;
}

export const toneClasses: Record<BadgeTone, string> = {
  success: 'bg-primary-soft text-primary-dark',
  warning: 'bg-warn-soft text-warn',
  danger: 'bg-danger-soft text-danger',
  neutral: 'bg-canvas text-ink-muted ring-1 ring-inset ring-line'
};

export const scanStatusMeta: Record<ScanStatus, BadgeMeta> = {
  followup: { tone: 'warning', labelKey: 'status.followup', icon: EyeIcon },
  saved: { tone: 'success', labelKey: 'status.saved', icon: CheckCircle2Icon },
  retake: { tone: 'neutral', labelKey: 'status.retake', icon: CameraIcon }
};

export const fieldStatusMeta: Record<FieldStatus, BadgeMeta> = {
  followup: { tone: 'warning', labelKey: 'fstatus.followup', icon: EyeIcon },
  ok: { tone: 'success', labelKey: 'fstatus.ok', icon: CheckCircle2Icon },
  none: { tone: 'neutral', labelKey: 'fstatus.none', icon: ClipboardIcon }
};

export const syncStateMeta: Record<SyncState, BadgeMeta & {titleKey: TKey;textKey: TKey;}> = {
  synced: { tone: 'success', labelKey: 'sync.synced.label', icon: CheckCircle2Icon, titleKey: 'sync.synced.title', textKey: 'sync.synced.text' },
  offline: { tone: 'neutral', labelKey: 'sync.offline.label', icon: WifiOffIcon, titleKey: 'sync.offline.title', textKey: 'sync.offline.text' },
  pending: { tone: 'warning', labelKey: 'sync.pending.label', icon: ClockIcon, titleKey: 'sync.pending.title', textKey: 'sync.pending.text' },
  failed: { tone: 'danger', labelKey: 'sync.failed.label', icon: AlertCircleIcon, titleKey: 'sync.failed.title', textKey: 'sync.failed.text' }
};