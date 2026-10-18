import { guidanceLibrary } from '../data/guidance';
import type { TKey, TVars } from '../data/translations';
import { CropStage, Field, FieldStatus, LocationSource, Observation, ScanRecord } from '../types/farm';

export function fieldAddress(f: Field): string {
  const { barangay, city, province } = f.location;
  return [barangay && `Brgy. ${barangay}`, city, province].filter(Boolean).join(', ');
}

export function fieldShortLocation(f: Field): string {
  const { barangay, city, province } = f.location;
  return [barangay && `Brgy. ${barangay}`, city || province].filter(Boolean).join(', ');
}

export const locationSourceKey: Record<LocationSource, TKey> = {
  device: 'loc.device',
  map: 'loc.map',
  manual: 'loc.manual'
};

export function stageKey(stage: CropStage): TKey {
  return `stage.${stage}` as TKey;
}

/** Translation key for a recorded crop stage, or null when not specified. */
export function displayStageKey(stage: CropStage): TKey | null {
  return stage === 'Not specified' ? null : stageKey(stage);
}

export function latestRecordDate(fieldId: string, scans: ScanRecord[], observations: Observation[]): string | null {
  const dates = [
  ...scans.filter((s) => s.fieldId === fieldId).map((s) => s.date.slice(0, 10)),
  ...observations.filter((o) => o.fieldId === fieldId).map((o) => o.date)].
  sort();
  return dates.length ? dates[dates.length - 1] : null;
}

export function deriveFieldStatus(
fieldId: string,
scans: ScanRecord[],
observations: Observation[])
: {status: FieldStatus;noteKey: TKey;noteVars?: TVars;} {
  const fieldScans = scans.filter((s) => s.fieldId === fieldId);
  const followups = fieldScans.filter((s) => s.status === 'followup').length;
  if (followups > 0) {
    return followups === 1 ?
    { status: 'followup', noteKey: 'fstatus.noteOne' } :
    { status: 'followup', noteKey: 'fstatus.noteMany', noteVars: { n: followups } };
  }
  const hasObs = observations.some((o) => o.fieldId === fieldId);
  if (fieldScans.length || hasObs) return { status: 'ok', noteKey: 'fstatus.noteOk' };
  return { status: 'none', noteKey: 'fstatus.noteNone' };
}

export function scanTitleKey(scan: Pick<ScanRecord, 'diseaseCode'>): TKey {
  return guidanceLibrary[scan.diseaseCode].titleKey;
}

export function scanLabelKey(scan: Pick<ScanRecord, 'diseaseCode'>): TKey {
  return guidanceLibrary[scan.diseaseCode].labelKey;
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}