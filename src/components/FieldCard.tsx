import React from 'react';
import { Link } from 'react-router-dom';
import { ArchiveIcon, ChevronRightIcon, MapPinIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useT } from '../hooks/useT';
import { Field } from '../types/farm';
import { deriveFieldStatus, displayStageKey, fieldShortLocation, latestRecordDate } from '../utils/farm';
import { formatArea, shortDate } from '../utils/format';
import { fieldStatusMeta } from '../utils/status';
import { FieldPreview } from './fields/FieldPreview';
import { StatusBadge } from './StatusBadge';

export function FieldCard({ field }: {field: Field;}) {
  const { scans, observations } = useApp();
  const t = useT();
  const latest = latestRecordDate(field.id, scans, observations);
  const status = deriveFieldStatus(field.id, scans, observations);
  const notRecorded = t('common.notRecorded');
  const stage = displayStageKey(field.stage);

  const facts = [
  { id: 'area', label: t('field.area'), value: formatArea(field.areaHa), empty: notRecorded },
  { id: 'variety', label: t('field.variety'), value: field.variety, empty: notRecorded },
  { id: 'stage', label: t('field.stage'), value: stage ? t(stage) : null, empty: notRecorded },
  { id: 'latest', label: t('field.latest'), value: latest ? shortDate(latest) : null, empty: t('field.noneYet') }];


  return (
    <article className="rounded-card border border-line bg-card p-4 shadow-card">
      <div className="flex items-center gap-3">
        <FieldPreview field={field} className="h-16 w-16 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <h3 className="text-[18px] font-bold leading-snug text-primary-dark">{field.name}</h3>
          <p className="flex items-center gap-1 text-[14px] text-ink-muted">
            <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="min-w-0">{fieldShortLocation(field) || notRecorded}</span>
          </p>
          {field.archived &&
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-canvas px-2 py-0.5 text-[13px] font-semibold text-ink-muted ring-1 ring-inset ring-line">
              <ArchiveIcon className="h-3.5 w-3.5" aria-hidden /> {t('fields.archived')}
            </span>
          }
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3">
        {facts.map((f) =>
        <div key={f.id} className="min-w-0">
            <dt className="text-[13px] leading-snug text-ink-muted">{f.label}</dt>
            <dd className={`text-[15px] leading-snug ${f.value ? 'font-semibold text-ink' : 'text-ink-muted'}`}>{f.value ?? f.empty}</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 border-t border-line pt-3">
        <StatusBadge meta={fieldStatusMeta[status.status]} />
        <p className="mt-1.5 text-[14px] leading-snug text-ink-muted">{t(status.noteKey, status.noteVars)}</p>
      </div>

      <Link
        to={`/fields/${field.id}`}
        className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-1 rounded-xl border border-line px-3 py-2 text-[16px] font-bold text-primary active:bg-primary-soft">
        
        {t('common.viewField')}
        <ChevronRightIcon className="h-5 w-5 shrink-0" aria-hidden />
      </Link>
    </article>);

}