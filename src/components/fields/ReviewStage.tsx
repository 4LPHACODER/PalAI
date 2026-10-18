import React, { ReactNode } from 'react';
import { FieldFormValues, resolveVariety } from '../../hooks/useFieldForm';
import { useT } from '../../hooks/useT';
import { displayStageKey, locationSourceKey } from '../../utils/farm';
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
        <button type="button" onClick={onEdit} className="-mr-2 min-h-[48px] shrink-0 px-2 text-[15px] font-bold text-primary" aria-label={t('ff.editSection', { section: title })}>
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
  const stage = displayStageKey(values.stage);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[20px] font-bold text-primary-dark">{t('ff.reviewTitle')}</h2>
        <p className="mt-1 text-[15px] text-ink-muted">{t('ff.reviewText')}</p>
      </div>
      <Section title={t('ff.detailsTitle')} onEdit={() => onEdit(0)}>
        <Row label={t('field.name')} value={values.name.trim() || null} />
        <Row label={t('field.area')} value={area} />
      </Section>
      <Section title={t('ff.cropInfo')} onEdit={() => onEdit(0)}>
        <Row label={t('field.variety')} value={resolveVariety(values)} />
        <Row label={t('field.plantingDate')} value={values.plantingDate ? longDate(values.plantingDate) : null} />
        <Row label={t('field.stage')} value={stage ? t(stage) : null} />
      </Section>
      <Section title={t('field.stageLocation')} onEdit={() => onEdit(1)}>
        <Row label={t('fd.address')} value={address || null} />
        <Row label={t('ff.description')} value={values.detail.trim() || null} />
        <Row label={t('fd.locSource')} value={t(locationSourceKey[values.lat !== null ? values.source : 'manual'])} />
        <Row label={t('ff.pin')} value={coords ?? t('ff.noPin')} />
      </Section>
      <Section title={t('ff.notesPhoto')} onEdit={() => onEdit(0)}>
        <Row label={t('field.notes')} value={values.notes.trim() || null} />
        <div className="flex items-center justify-between gap-4">
          <dt className="text-[14px] text-ink-muted">{t('field.photo')}</dt>
          <dd>
            {values.photo ?
            <img src={values.photo} alt={t('ff.fieldAlt')} className="h-16 w-24 rounded-xl object-cover" /> :

            <span className="text-[15px] text-ink-muted">{t('ff.noPhoto')}</span>
            }
          </dd>
        </div>
      </Section>
    </div>);

}