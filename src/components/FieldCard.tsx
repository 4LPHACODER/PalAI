import React from 'react';
import { Link } from 'react-router-dom';
import { ArchiveIcon, ChevronRightIcon, MapPinIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useT } from '../hooks/useT';
import { Field } from '../types/farm';
import { deriveFieldStatus, displayStage, fieldShortLocation, latestRecordDate } from '../utils/farm';
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

  const facts = [
  { label: t('field.area'), value: formatArea(field.areaHa) },
  { label: t('field.variety'), value: field.variety },
  { label: t('field.stage'), value: displayStage(field.stage) },
  { label: 'Latest observation', value: latest ? shortDate(latest) : null }];


  return (
    <article className="rounded-card border border-line bg-card p-4 shadow-card">
      <div className="flex items-center gap-3">
        <FieldPreview field={field} className="h-16 w-16 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[18px] font-bold text-primary-dark">{field.name}</h3>
          <p className="flex items-center gap-1 text-[14px] text-ink-muted">
            <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{fieldShortLocation(field) || notRecorded}</span>
          </p>
          {field.archived &&
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-canvas px-2 py-0.5 text-[13px] font-semibold text-ink-muted ring-1 ring-inset ring-line">
              <ArchiveIcon className="h-3.5 w-3.5" aria-hidden /> Archived
            </span>
          }
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3">
        {facts.map((f) =>
        <div key={f.label} className="min-w-0">
            <dt className="truncate text-[13px] text-ink-muted">{f.label}</dt>
            <dd className={`truncate text-[15px] ${f.value ? 'font-semibold text-ink' : 'text-ink-muted'}`}>
              {f.value ?? (f.label === 'Latest observation' ? 'None yet' : notRecorded)}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-4 border-t border-line pt-3">
        <StatusBadge meta={fieldStatusMeta[status.status]} />
        <p className="mt-1.5 text-[14px] leading-snug text-ink-muted">{status.note}</p>
      </div>

      <Link
        to={`/fields/${field.id}`}
        className="mt-4 flex h-12 w-full items-center justify-center gap-1 rounded-xl border border-line text-[16px] font-bold text-primary active:bg-primary-soft">
        
        {t('common.viewField')}
        <ChevronRightIcon className="h-5 w-5" aria-hidden />
      </Link>
    </article>);

}