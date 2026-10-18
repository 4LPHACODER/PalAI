import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClockIcon, CameraIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useT } from '../hooks/useT';
import { Reminder } from '../types/farm';
import { scanTitleKey } from '../utils/farm';
import { dueLabel, longDate, shortDate } from '../utils/format';
import { BottomSheet } from './BottomSheet';
import { ResultPhoto } from './result/ResultPhoto';

interface ReminderSheetProps {
  reminder: Reminder | null;
  open: boolean;
  onClose: () => void;
  onViewRecord: (scanId: string) => void;
}

export function ReminderSheet({ reminder, open, onClose, onViewRecord }: ReminderSheetProps) {
  const t = useT();
  const { getFieldById, getScanById } = useApp();
  const field = reminder ? getFieldById(reminder.fieldId) : undefined;
  const scan = reminder ? getScanById(reminder.scanId) : undefined;
  const vars = { field: field?.name ?? '' };

  return (
    <BottomSheet open={open && !!reminder} onClose={onClose} title={t('rem.title')}>
      {reminder &&
      <>
          <div className="rounded-2xl bg-accent-soft p-4">
            <p className="flex items-center gap-2 text-[14px] font-semibold text-accent-ink">
              <CalendarClockIcon className="h-4 w-4 shrink-0" aria-hidden />
              {t('rem.dueLong', { when: dueLabel(reminder.due), date: longDate(reminder.due) })}
            </p>
            <h3 className="mt-1 text-[20px] font-bold leading-tight text-primary-dark">{t(reminder.titleKey, vars)}</h3>
            <p className="mt-1 text-[15px] text-ink">{t(reminder.descriptionKey, vars)}</p>
          </div>

          <h4 className="mt-5 text-[17px] font-bold text-primary-dark">{t('rem.whatToDo')}</h4>
          <ol className="mt-2 space-y-2.5">
            {reminder.stepKeys.map((k, i) =>
          <li key={k} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-[14px] font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-[16px] leading-snug text-ink">{t(k, vars)}</span>
              </li>
          )}
          </ol>

          {scan &&
        <button
          type="button"
          onClick={() => onViewRecord(scan.id)}
          className="mt-5 flex min-h-[64px] w-full items-center gap-3 rounded-2xl border border-line p-3 text-left active:bg-canvas">
          
              <ResultPhoto src={scan.image} alt="" variant="thumb" className="h-12 w-12 rounded-xl" />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] text-ink-muted">{t('rem.related')}</span>
                <span className="block text-[15px] font-bold leading-snug text-ink">
                  {t(scanTitleKey(scan))} · {field?.name ?? t('common.noField')}, {shortDate(scan.date)}
                </span>
              </span>
            </button>
        }

          <Link
          to={field && !field.archived ? `/scan?field=${field.id}` : '/scan'}
          className="mt-4 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-[17px] font-bold text-white">
          
            <CameraIcon className="h-5 w-5 shrink-0" aria-hidden /> {t('rem.goScan')}
          </Link>
        </>
      }
    </BottomSheet>);

}