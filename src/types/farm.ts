import type { TKey } from '../data/translations';

export type LangCode = 'en' | 'fil' | 'ceb';

export type CropStage =
'Not specified' |
'Land preparation' |
'Seedling' |
'Tillering' |
'Reproductive' |
'Ripening' |
'Harvested';

export type FieldStatus = 'followup' | 'ok' | 'none';

export type ScanStatus = 'followup' | 'saved' | 'retake';

export type SyncState = 'synced' | 'offline' | 'pending' | 'failed';

export type LocationSource = 'device' | 'map' | 'manual';

export interface FieldLocation {
  province: string;
  city: string;
  barangay: string;
  detail: string;
  lat: number | null;
  lng: number | null;
  source: LocationSource;
}

export interface Field {
  id: string;
  name: string;
  areaHa: number | null;
  variety: string | null;
  /** yyyy-MM-dd, actual planting date as entered by the farmer */
  plantingDate: string | null;
  stage: CropStage;
  notes: string;
  photo: string | null;
  location: FieldLocation;
  archived: boolean;
  createdAt: string;
}

export type FieldInput = Omit<Field, 'id' | 'archived' | 'createdAt'>;

/** Stable codes — display text is resolved from the dictionary at render time. */
export type DiseaseCode = 'sheath_blight' | 'tungro' | 'blast' | 'bacterial_blight' | 'uncertain';
export type KnownDiseaseCode = Exclude<DiseaseCode, 'uncertain'>;
export type StepType = 'inspection' | 'prevention' | 'technician';
export type StepGroup = 'now' | 'next';
export type DaDocId = 'pagdumala' | 'palaycheck' | 'hybrid' | 'climate' | 'caraga';

export interface SourceRef {
  docId: DaDocId;
  sectionKey: TKey;
  /** Printed page label as it appears in the document, e.g. "20–24". */
  printedPage: string;
  /** First PDF page to open. */
  pdfPage: number;
  /** PDF page label when it spans several pages, e.g. "25–29". */
  pdfPages?: string;
}

export interface GuidanceStep {
  id: string;
  textKey: TKey;
  whenKey: TKey;
  type: StepType;
  group: StepGroup;
  sources: SourceRef[];
  basisKey?: TKey;
}

export interface ScanAnalysis {
  /** Reference symptoms from the guide — never claimed as image findings. */
  signsKey: TKey | null;
  noteKeys: TKey[];
}

export interface ScanRecord {
  id: string;
  fieldId: string | null;
  /** ISO date and time of capture */
  date: string;
  diseaseCode: DiseaseCode;
  status: ScanStatus;
  image: string | null;
  /** Seeded demo photos are AI-generated illustrations. */
  imageIllustrative?: boolean;
  source: 'simulated' | 'ai';
  guidanceVersion: string;
  analysis: ScanAnalysis;
  steps: GuidanceStep[];
  /** Top-match confidence, 0–100. */
  confidence?: number;
  /** Saved exactly as typed — never translated. */
  userNotes: string;
  seeded?: boolean;
}

export type ScanInput = Omit<ScanRecord, 'id' | 'seeded'>;

export interface Observation {
  id: string;
  fieldId: string;
  /** yyyy-MM-dd */
  date: string;
  notes: string;
  photo: string | null;
  author: string;
  createdAt: string;
  updatedAt: string | null;
}

export type ObservationInput = Pick<Observation, 'fieldId' | 'date' | 'notes' | 'photo'>;

export interface Reminder {
  id: string;
  fieldId: string;
  scanId: string;
  titleKey: TKey;
  descriptionKey: TKey;
  stepKeys: TKey[];
  due: string;
}

export interface AppNotification {
  id: string;
  titleKey: TKey;
  bodyKey: TKey;
  /** Field name is filled in at render time. */
  fieldId?: string;
  /** ISO timestamp */
  time: string;
  read: boolean;
  target?: {type: 'reminder' | 'scan';id: string;labelKey: TKey;};
}

export interface FarmerProfile {
  fullName: string;
  displayName: string;
  email: string | null;
  province: string;
  city: string;
  barangay: string;
  mobile: string;
  cooperative: string;
  photo: string | null;
  setupComplete: boolean;
}

export interface SharingPrefs {
  enabled: boolean;
  organizationId: string | null;
  fieldIds: string[];
  includePhotos: boolean;
  includeObservations: boolean;
  includePreciseLocation: boolean;
  updatedAt: string | null;
}

export interface WorkspaceData {
  version: number;
  profile: FarmerProfile;
  fields: Field[];
  scans: ScanRecord[];
  observations: Observation[];
  reminders: Reminder[];
  notifications: AppNotification[];
  selectedFieldId: string | null;
  sharing: SharingPrefs;
}

export interface Session {
  mode: 'demo' | 'account';
  workspaceId: string;
  email: string | null;
}