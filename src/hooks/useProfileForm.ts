import { useCallback, useState } from 'react';
import { LangCode } from '../types/farm';
import { focusFirstError, validateMobile, validateRequired } from '../utils/validation';

export interface ProfileFormValues {
  displayName: string;
  province: string;
  city: string;
  barangay: string;
  mobile: string;
  cooperative: string;
  photo: string | null;
  language: LangCode;
}

export type ProfileFormErrors = Partial<Record<keyof ProfileFormValues, string>>;

export const PROFILE_ID_PREFIX = 'profile-';

export function validateProfileForm(v: ProfileFormValues): ProfileFormErrors {
  return {
    displayName: validateRequired(v.displayName, 'Enter the name PalAI should call you.'),
    province: validateRequired(v.province, 'Enter your province.'),
    city: validateRequired(v.city, 'Enter your city or municipality.'),
    barangay: validateRequired(v.barangay, 'Enter your barangay.'),
    mobile: validateMobile(v.mobile)
  };
}

export function useProfileForm(initial: ProfileFormValues) {
  const [snapshot] = useState(initial);
  const [values, setValues] = useState<ProfileFormValues>(initial);
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const set = useCallback(<K extends keyof ProfileFormValues,>(key: K, value: ProfileFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }, []);

  const validate = useCallback(() => {
    const e = validateProfileForm(values);
    setErrors(e);
    const ok = !Object.values(e).some(Boolean);
    if (!ok) focusFirstError(e, PROFILE_ID_PREFIX);
    return ok;
  }, [values]);

  const dirty = JSON.stringify(values) !== JSON.stringify(snapshot);

  return { values, errors, set, validate, dirty };
}