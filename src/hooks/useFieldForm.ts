import { useCallback, useState } from 'react';
import { riceVarieties } from '../data/riceVarieties';
import { CropStage, Field, FieldInput, LocationSource } from '../types/farm';
import { focusFirstError, validateArea, validatePastDate, validateRequired } from '../utils/validation';

export interface FieldFormValues {
  name: string;
  area: string;
  variety: string;
  varietyOther: string;
  plantingDate: string;
  stage: CropStage;
  notes: string;
  photo: string | null;
  province: string;
  city: string;
  barangay: string;
  detail: string;
  lat: number | null;
  lng: number | null;
  source: LocationSource;
}

export type FieldFormErrors = Partial<Record<keyof FieldFormValues, string>>;

export const FIELD_ID_PREFIX = 'ff-';

export function valuesFromField(f?: Field): FieldFormValues {
  if (!f) {
    return {
      name: '',
      area: '',
      variety: '',
      varietyOther: '',
      plantingDate: '',
      stage: 'Not specified',
      notes: '',
      photo: null,
      province: '',
      city: '',
      barangay: '',
      detail: '',
      lat: null,
      lng: null,
      source: 'manual'
    };
  }
  const known = f.variety === null || riceVarieties.includes(f.variety);
  return {
    name: f.name,
    area: f.areaHa === null ? '' : String(f.areaHa),
    variety: f.variety === null ? '' : known ? f.variety : 'Other',
    varietyOther: known ? '' : f.variety ?? '',
    plantingDate: f.plantingDate ?? '',
    stage: f.stage,
    notes: f.notes,
    photo: f.photo,
    province: f.location.province,
    city: f.location.city,
    barangay: f.location.barangay,
    detail: f.location.detail,
    lat: f.location.lat,
    lng: f.location.lng,
    source: f.location.source
  };
}

export function resolveVariety(v: FieldFormValues): string | null {
  if (v.variety === 'Other') return v.varietyOther.trim() || null;
  return v.variety.trim() || null;
}

export function inputFromValues(v: FieldFormValues): FieldInput {
  return {
    name: v.name.trim(),
    areaHa: v.area.trim() ? Number(v.area) : null,
    variety: resolveVariety(v),
    plantingDate: v.plantingDate || null,
    stage: v.stage,
    notes: v.notes.trim(),
    photo: v.photo,
    location: {
      province: v.province.trim(),
      city: v.city.trim(),
      barangay: v.barangay.trim(),
      detail: v.detail.trim(),
      lat: v.lat,
      lng: v.lng,
      source: v.lat !== null ? v.source : 'manual'
    }
  };
}

function validateDetails(v: FieldFormValues): FieldFormErrors {
  return {
    name: validateRequired(v.name, 'Give this field a name, like “Riverside Plot”.'),
    area: validateArea(v.area),
    varietyOther: v.variety === 'Other' && !v.varietyOther.trim() ? 'Type the variety name, or choose “Not sure”.' : undefined,
    plantingDate: validatePastDate(
      v.plantingDate,
      'Planting date can’t be in the future. Enter the day the rice was actually planted, or leave it blank.'
    )
  };
}

function validateLocation(v: FieldFormValues): FieldFormErrors {
  return {
    province: validateRequired(v.province, 'Enter the province.'),
    city: validateRequired(v.city, 'Enter the city or municipality.'),
    barangay: validateRequired(v.barangay, 'Enter the barangay so the field can be identified.')
  };
}

const hasError = (e: FieldFormErrors) => Object.values(e).some(Boolean);

export function useFieldForm(field?: Field) {
  const [initial] = useState(() => valuesFromField(field));
  const [values, setValues] = useState<FieldFormValues>(initial);
  const [errors, setErrors] = useState<FieldFormErrors>({});
  const [stage, setStage] = useState(0);
  const [maxStage, setMaxStage] = useState(field ? 2 : 0);

  const set = useCallback(<K extends keyof FieldFormValues,>(key: K, value: FieldFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }, []);

  const setMany = useCallback((patch: Partial<FieldFormValues>) => {
    setValues((v) => ({ ...v, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      (Object.keys(patch) as (keyof FieldFormValues)[]).forEach((k) => delete next[k]);
      return next;
    });
  }, []);

  const moveTo = (s: number) => {
    setStage(s);
    setMaxStage((m) => Math.max(m, s));
    window.scrollTo({ top: 0 });
  };

  const check = (s: number): boolean => {
    const details = validateDetails(values);
    const location = validateLocation(values);
    const e = s === 0 ? details : s === 1 ? location : { ...details, ...location };
    setErrors(e);
    if (!hasError(e)) return true;
    if (s === 2) setStage(hasError(details) ? 0 : 1);
    focusFirstError(e, FIELD_ID_PREFIX);
    return false;
  };

  const next = () => {
    if (check(stage)) moveTo(Math.min(stage + 1, 2));
  };

  const back = () => moveTo(Math.max(0, stage - 1));

  const goTo = (s: number) => {
    if (s < stage || check(stage)) moveTo(s);
  };

  const dirty = JSON.stringify(values) !== JSON.stringify(initial);

  return { values, errors, stage, maxStage, set, setMany, next, back, goTo, validateAll: () => check(2), dirty };
}