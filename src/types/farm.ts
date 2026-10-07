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

export interface ScanRecord {
  id: string;
  fieldId: string | null;
  date: string;
  result: string;
  summary: string;
  status: ScanStatus;
  image: string;
  imageUnclear?: boolean;
  nextSteps: string[];
}

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
  title: string;
  description: string;
  due: string;
  steps: string[];
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  target?: {type: 'reminder' | 'scan';id: string;label: string;};
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