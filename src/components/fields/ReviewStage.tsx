import React, { ReactNode } from 'react';
import { FieldFormValues, resolveVariety } from '../../hooks/useFieldForm';
import { useT } from '../../hooks/useT';
import { locationSourceLabel } from '../../utils/farm';
import { formatArea, formatCoords, longDate } from '../../utils/format';

interface ReviewStageProps {
  values: FieldFormValues;
  onEdit: (stage: number) => void;
}

function Section({ title, onEdit, children }: {title: string;onEdit: () => void;children: ReactNode;}) {
  const t = useT();
  return (
    <section className="rounded-card border border-line bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[17px] font-bold text-primary-dark">{title}</h3>
        <button type="button" onClick={onEdit} className="-mr-2 h-12 px-2 text-[15px] font-bold text-primary" aria-label={`${t('common.edit')} ${title}`}>
          {t('common.edit')}
        </button>
      </div>
      <dl className="mt-1 space-y-2.5">{children}</dl>
    </section>);

}

function Row({ label, value }: {label: string;value: string | null;}) {
  const t = useT();
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-[14px] text-ink-muted">{label}</dt>
      <dd className={`text-right text-[15px] ${value ? 'font-semibold text-ink' : 'text-ink-muted'}`}>{value ?? t('common.notRecorded')}</dd>
    </div>);

}

export function ReviewStage({ values, onEdit }: ReviewStageProps) {
  const t = useT();
  const area = values.area.trim() ? formatArea(Number(values.area)) : null;
  const address = [values.barangay && `Brgy. ${values.barangay}`, values.city, values.province].filter(Boolean).join(', ');
  const coords = formatCoords(values.lat, values.lng);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[20px] font-bold text-primary-dark">Review and save</h2>
        <p className="mt-1 text-[15px] text-ink-muted">Check everything before saving. You can edit it later.</p>
      </div>
      <Section title="Field details" onEdit={() => onEdit(0)}>
        <Row label={t('field.name')} value={values.name.trim() || null} />
        <Row label={t('field.area')} value={area} />
      </Section>
      <Section title="Crop information" onEdit={() => onEdit(0)}>
        <Row label={t('field.variety')} value={resolveVariety(values)} />
        <Row label={t('field.plantingDate')} value={values.plantingDate ? longDate(values.plantingDate) : null} />
        <Row label={t('field.stage')} value={values.stage === 'Not specified' ? null : values.stage} />
      </Section>
      <Section title={t('field.stageLocation')} onEdit={() => onEdit(1)}>
        <Row label="Address" value={address || null} />
        <Row label="Description" value={values.detail.trim() || null} />
        <Row label="Source" value={values.lat !== null ? locationSourceLabel[values.source] : locationSourceLabel.manual} />
        <Row label="Pin" value={coords ?? 'No pin'} />
      </Section>
      <Section title="Notes and photo" onEdit={() => onEdit(0)}>
        <Row label={t('field.notes')} value={values.notes.trim() || null} />
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[14px] text-ink-muted">{t('field.photo')}</dt>
          <dd>
            {values.photo ?
            <img src={values.photo} alt="Field" className="h-16 w-24 rounded-xl object-cover" /> :

            <span className="text-[15px] text-ink-muted">No photo</span>
            }
          </dd>
        </div>
      </Section>
    </div>);

}