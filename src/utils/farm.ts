import { Field, FieldStatus, LocationSource, Observation, ScanRecord } from '../types/farm';

export function fieldAddress(f: Field): string {
  const { barangay, city, province } = f.location;
  return [barangay && `Brgy. ${barangay}`, city, province].filter(Boolean).join(', ');
}

export function fieldShortLocation(f: Field): string {
  const { barangay, city, province } = f.location;
  return [barangay && `Brgy. ${barangay}`, city || province].filter(Boolean).join(', ');
}

export const locationSourceLabel: Record<LocationSource, string> = {
  device: 'Device location',
  map: 'Map selection',
  manual: 'Manual address'
};

export function displayStage(stage: Field['stage']): string | null {
  return stage === 'Not specified' ? null : stage;
}

export function latestRecordDate(fieldId: string, scans: ScanRecord[], observations: Observation[]): string | null {
  const dates = [
  ...scans.filter((s) => s.fieldId === fieldId).map((s) => s.date),
  ...observations.filter((o) => o.fieldId === fieldId).map((o) => o.date)].
  sort();
  return dates.length ? dates[dates.length - 1] : null;
}

export function deriveFieldStatus(
fieldId: string,
scans: ScanRecord[],
observations: Observation[])
: {status: FieldStatus;note: string;} {
  const fieldScans = scans.filter((s) => s.fieldId === fieldId);
  const followups = fieldScans.filter((s) => s.status === 'followup').length;
  if (followups > 0) {
    return {
      status: 'followup',
      note: followups === 1 ? 'One recent scan needs another observation.' : `${followups} recent scans need another observation.`
    };
  }
  const hasObs = observations.some((o) => o.fieldId === fieldId);
  if (fieldScans.length || hasObs) return { status: 'ok', note: 'No follow-up from recent records.' };
  return { status: 'none', note: 'No scans or observations yet.' };
}

/** Keeps a single leaf result scoped to that one photo. */
export function scopedScanLabel(scan: ScanRecord): string {
  if (scan.status === 'followup') return `${scan.result} in one submitted photo`;
  if (scan.status === 'saved') return 'No clear symptoms in one submitted photo';
  return 'Photo could not be assessed';
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}