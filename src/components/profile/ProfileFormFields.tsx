import React from 'react';
import { ShieldCheckIcon } from 'lucide-react';
import { barangaySuggestions, citySuggestions, provinceSuggestions } from '../../data/locations';
import { languageOptions } from '../../data/translations';
import { PROFILE_ID_PREFIX, ProfileFormErrors, ProfileFormValues } from '../../hooks/useProfileForm';
import { useT } from '../../hooks/useT';
import { ComboField } from '../form/ComboField';
import { PhotoField } from '../form/PhotoField';
import { TextField } from '../form/TextField';

interface ProfileFormFieldsProps {
  values: ProfileFormValues;
  errors: ProfileFormErrors;
  set: <K extends keyof ProfileFormValues>(key: K, value: ProfileFormValues[K]) => void;
}

const id = (k: keyof ProfileFormValues) => `${PROFILE_ID_PREFIX}${k}`;

export function ProfileFormFields({ values, errors, set }: ProfileFormFieldsProps) {
  const t = useT();
  return (
    <div className="space-y-8">
      <section aria-labelledby="pf-about" className="space-y-5">
        <h2 id="pf-about" className="text-[18px] font-bold text-primary-dark">
          About you
        </h2>
        <TextField
          id={id('displayName')}
          label={t('form.displayName')}
          value={values.displayName}
          onChange={(e) => set('displayName', e.target.value)}
          error={errors.displayName}
          hint="This is how PalAI greets you on Home."
          autoComplete="nickname"
          enterKeyHint="next" />
        
        <TextField
          id={id('mobile')}
          label={t('form.mobile')}
          optional
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0917 123 4567"
          value={values.mobile}
          onChange={(e) => set('mobile', e.target.value)}
          error={errors.mobile} />
        
        <TextField
          id={id('cooperative')}
          label={t('form.coop')}
          optional
          value={values.cooperative}
          onChange={(e) => set('cooperative', e.target.value)} />
        
        <PhotoField id={id('photo')} label={t('form.profilePhoto')} optional round value={values.photo} onChange={(v) => set('photo', v)} />
      </section>

      <section aria-labelledby="pf-where" className="space-y-5">
        <div>
          <h2 id="pf-where" className="text-[18px] font-bold text-primary-dark">
            Where you farm
          </h2>
          <p className="mt-1 text-[14px] text-ink-muted">Suggestions are a partial list. Type any name if yours isn’t shown.</p>
        </div>
        <ComboField
          id={id('province')}
          label={t('form.province')}
          value={values.province}
          onChange={(v) => set('province', v)}
          suggestions={provinceSuggestions}
          error={errors.province} />
        
        <ComboField
          id={id('city')}
          label={t('form.city')}
          value={values.city}
          onChange={(v) => set('city', v)}
          suggestions={citySuggestions[values.province.trim()] ?? []}
          error={errors.city} />
        
        <ComboField
          id={id('barangay')}
          label={t('form.barangay')}
          value={values.barangay}
          onChange={(v) => set('barangay', v)}
          suggestions={barangaySuggestions[values.city.trim()] ?? []}
          error={errors.barangay} />
        
      </section>

      <fieldset>
        <legend className="mb-2 text-[15px] font-semibold text-ink">{t('form.language')}</legend>
        <div className="grid grid-cols-3 gap-1 rounded-2xl bg-card p-1 ring-1 ring-line">
          {languageOptions.map((l) =>
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={values.language === l.code}
            lang={l.code}
            onClick={() => set('language', l.code)}
            className={`h-12 rounded-xl text-[15px] font-semibold transition-colors duration-150 ${
            values.language === l.code ? 'bg-primary text-white' : 'text-ink'}`
            }>
            
              {l.label}
            </button>
          )}
        </div>
      </fieldset>

      <p className="flex gap-2 text-[14px] leading-snug text-ink-muted">
        <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        PalAI never asks for IDs, land titles, or bank details.
      </p>
    </div>);

}