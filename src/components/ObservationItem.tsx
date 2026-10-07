import React from 'react';
import { Link } from 'react-router-dom';
import { NotebookPenIcon, UserRoundIcon } from 'lucide-react';
import { useT } from '../hooks/useT';
import { Observation } from '../types/farm';
import { longDate } from '../utils/format';

export function ObservationItem({ observation, canEdit }: {observation: Observation;canEdit: boolean;}) {
  const t = useT();
  return (
    <li className="flex gap-3 px-4 py-4">
      {observation.photo ?
      <img src={observation.photo} alt="Observation attachment" className="h-14 w-14 shrink-0 rounded-xl object-cover" /> :

      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-canvas text-ink-muted">
          <NotebookPenIcon className="h-6 w-6" aria-hidden />
        </span>
      }
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-2.5 py-0.5 text-[13px] font-semibold text-ink-muted ring-1 ring-inset ring-line">
            <UserRoundIcon className="h-3.5 w-3.5" aria-hidden /> {t('obs.label')}
          </span>
          <span className="text-[14px] font-semibold text-ink">{longDate(observation.date)}</span>
        </div>
        <p className="mt-1.5 whitespace-pre-line text-[15px] leading-relaxed text-ink">{observation.notes || 'Photo only'}</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="text-[13px] text-ink-muted">
            By {observation.author}
            {observation.updatedAt ? ' · Edited' : ''}
          </p>
          {canEdit &&
          <Link
            to={`/fields/${observation.fieldId}/observations/${observation.id}`}
            className="-mr-2 flex h-12 items-center px-2 text-[15px] font-bold text-primary">
            
              {t('common.edit')}
            </Link>
          }
        </div>
      </div>
    </li>);

}