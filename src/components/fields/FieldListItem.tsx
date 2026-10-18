import React from 'react';
import { Link } from 'react-router-dom';
import { ArchiveIcon, CameraIcon, ChevronRightIcon, MapPinIcon, NotebookPenIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useT } from '../../hooks/useT';
import { Field } from '../../types/farm';
import { deriveFieldStatus, displayStageKey, fieldShortLocation, latestRecordDate } from '../../utils/farm';
import { formatArea, shortDate } from '../../utils/format';
import { fieldStatusMeta } from '../../utils/status';
import { StatusBadge } from '../StatusBadge';
import { FieldPreview } from './FieldPreview';

/** Compact, tappable field row with the two most common actions one tap away. */
export function FieldListItem({ field }: {field: Field;}) {
  const t = useT();
  const { scans, observations } = useApp();
  const latest = latestRecordDate(field.id, scans, observations);
  const status = deriveFieldStatus(field.id, scans, observations);
  const stage = displayStageKey(field.stage);
  const facts = [formatArea(field.areaHa), field.variety, stage && t(stage)].filter(Boolean).join(' · ');
  const action =
  'flex min-h-[48px] flex-1 items-center justify-center gap-1.5 px-2 py-2 text-center text-[15px] font-bold leading-tight text-primary active:bg-primary-soft';

  return (
    <article className={`overflow-hidden rounded-card border bg-card shadow-card ${status.status === 'followup' && !field.archived ? 'border-warn/40' : 'border-line'}`}>
      <Link
        to={`/fields/${field.id}`}
        aria-label={t('fields.openField', { name: field.name })}
        className="flex items-start gap-3 p-4 transition-colors duration-150 active:bg-canvas">
        
        <FieldPreview field={field} className={`h-16 w-16 shrink-0 rounded-2xl ${field.archived ? 'opacity-60' : ''}`} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] font-bold leading-snug text-primary-dark">{field.name}</h3>
          <p className="mt-0.5 flex items-start gap-1 text-[14px] leading-snug text-ink-muted">
            <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="min-w-0">{fieldShortLocation(field) || t('common.notRecorded')}</span>
          </p>
          {facts && <p className="mt-0.5 text-[14px] leading-snug text-ink">{facts}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            {field.archived ?
            <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-2 py-0.5 text-[13px] font-semibold text-ink-muted ring-1 ring-inset ring-line">
                <ArchiveIcon className="h-3.5 w-3.5" aria-hidden /> {t('fields.archived')}
              </span> :

            <StatusBadge meta={fieldStatusMeta[status.status]} />
            }
            <span className="text-[13px] text-ink-muted">{latest ? t('fields.lastRecord', { date: shortDate(latest) }) : t('fields.noRecordYet')}</span>
          </div>
        </div>
        <ChevronRightIcon className="mt-5 h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
      </Link>

      {!field.archived &&
      <div className="flex divide-x divide-line border-t border-line">
          <Link to={`/scan?field=${field.id}`} className={action}>
            <CameraIcon className="h-4 w-4 shrink-0" aria-hidden /> {t('common.scanLeaf')}
          </Link>
          <Link to={`/fields/${field.id}/observations/new`} className={action}>
            <NotebookPenIcon className="h-4 w-4 shrink-0" aria-hidden /> {t('fields.addNote')}
          </Link>
        </div>
      }
    </article>);

}