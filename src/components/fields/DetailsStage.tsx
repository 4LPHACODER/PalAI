import React from 'react';
import { cropStages, riceVarieties } from '../../data/riceVarieties';
import { FIELD_ID_PREFIX, FieldFormErrors, FieldFormValues } from '../../hooks/useFieldForm';
import { useT } from '../../hooks/useT';
import { CropStage } from '../../types/farm';
import { stageKey } from '../../utils/farm';
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
        <h2 className="text-[20px] font-bold text-primary-dark">{t('ff.detailsTitle')}</h2>
        <p className="mt-1 text-[15px] text-ink-muted">{t('ff.detailsText')}</p>
      </div>

      <TextField
        id={id('name')}
        label={t('field.name')}
        value={values.name}
        onChange={(e) => set('name', e.target.value)}
        error={errors.name}
        placeholder={t('ff.namePh')}
        enterKeyHint="next" />
      

      <TextField
        id={id('area')}
        label={t('field.area')}
        optional
        inputMode="decimal"
        placeholder={t('ff.areaPh')}
        value={values.area}
        onChange={(e) => set('area', e.target.value.replace(',', '.'))}
        error={errors.area}
        hint={t('ff.areaHint')} />
      

      <ComboField
        id={id('variety')}
        label={t('field.variety')}
        optional
        value={values.variety}
        onChange={(v) => set('variety', v)}
        suggestions={riceVarieties}
        placeholder={t('ff.varietyPh')}
        hint={t('ff.varietyHint')} />
      
      {values.variety === 'Other' &&
      <TextField
        id={id('varietyOther')}
        label={t('ff.varietyName')}
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
        hint={t('ff.plantingHint')} />
      

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
              {t(stageKey(s))}
            </option>
          )}
        </select>
        <FieldMessage id={id('stage')} hint={t('ff.stageHint')} />
      </div>

      <TextField
        id={id('notes')}
        label={t('field.notes')}
        optional
        multiline
        value={values.notes}
        onChange={(e) => set('notes', e.target.value)}
        placeholder={t('ff.notesPh')} />
      

      <PhotoField id={id('photo')} label={t('field.photo')} optional value={values.photo} onChange={(v) => set('photo', v)} />
    </div>);

}