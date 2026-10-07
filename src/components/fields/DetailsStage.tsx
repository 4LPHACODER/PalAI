import React from 'react';
import { cropStages, riceVarieties } from '../../data/riceVarieties';
import { FIELD_ID_PREFIX, FieldFormErrors, FieldFormValues } from '../../hooks/useFieldForm';
import { useT } from '../../hooks/useT';
import { CropStage } from '../../types/farm';
import { todayISO } from '../../utils/format';
import { ComboField } from '../form/ComboField';
import { PhotoField } from '../form/PhotoField';
import { FieldLabel, FieldMessage, inputClass, TextField } from '../form/TextField';

interface StageProps {
  values: FieldFormValues;
  errors: FieldFormErrors;
  set: <K extends keyof FieldFormValues>(key: K, value: FieldFormValues[K]) => void;
}

const id = (k: keyof FieldFormValues) => `${FIELD_ID_PREFIX}${k}`;

export function DetailsStage({ values, errors, set }: StageProps) {
  const t = useT();
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[20px] font-bold text-primary-dark">Field details</h2>
        <p className="mt-1 text-[15px] text-ink-muted">Only the name is required. Skip anything you’re unsure about.</p>
      </div>

      <TextField
        id={id('name')}
        label={t('field.name')}
        value={values.name}
        onChange={(e) => set('name', e.target.value)}
        error={errors.name}
        placeholder="e.g. Riverside Plot"
        enterKeyHint="next" />
      

      <TextField
        id={id('area')}
        label={t('field.area')}
        optional
        inputMode="decimal"
        placeholder="e.g. 1.2"
        value={values.area}
        onChange={(e) => set('area', e.target.value.replace(',', '.'))}
        error={errors.area}
        hint="Leave blank if you don’t know the exact size." />
      

      <ComboField
        id={id('variety')}
        label={t('field.variety')}
        optional
        value={values.variety}
        onChange={(v) => set('variety', v)}
        suggestions={riceVarieties}
        placeholder="Search, e.g. NSIC Rc 222"
        hint="Pick from the list, choose “Not sure”, or choose “Other” to type it." />
      
      {values.variety === 'Other' &&
      <TextField
        id={id('varietyOther')}
        label="Variety name"
        value={values.varietyOther}
        onChange={(e) => set('varietyOther', e.target.value)}
        error={errors.varietyOther} />

      }

      <TextField
        id={id('plantingDate')}
        label={t('field.plantingDate')}
        optional
        type="date"
        max={todayISO()}
        value={values.plantingDate}
        onChange={(e) => set('plantingDate', e.target.value)}
        error={errors.plantingDate}
        hint="The day the rice was actually planted." />
      

      <div>
        <FieldLabel htmlFor={id('stage')} label={t('field.stage')} optional />
        <select
          id={id('stage')}
          value={values.stage}
          onChange={(e) => set('stage', e.target.value as CropStage)}
          aria-describedby={`${id('stage')}-msg`}
          className={`${inputClass()} h-12`}>
          
          {cropStages.map((s) =>
          <option key={s} value={s}>
              {s}
            </option>
          )}
        </select>
        <FieldMessage id={id('stage')} hint="Choose what you see in the field now. PalAI won’t guess it from the planting date." />
      </div>

      <TextField
        id={id('notes')}
        label={t('field.notes')}
        optional
        multiline
        value={values.notes}
        onChange={(e) => set('notes', e.target.value)}
        placeholder="e.g. Water comes from the river pump." />
      

      <PhotoField id={id('photo')} label={t('field.photo')} optional value={values.photo} onChange={(v) => set('photo', v)} />
    </div>);

}