import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClockIcon, CameraIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Reminder } from '../types/farm';
import { dueLabel, longDate, shortDate } from '../utils/format';
import { BottomSheet } from './BottomSheet';

interface ReminderSheetProps {
  reminder: Reminder | null;
  open: boolean;
  onClose: () => void;
  onViewRecord: (scanId: string) => void;
}

export function ReminderSheet({ reminder, open, onClose, onViewRecord }: ReminderSheetProps) {
  const { getFieldById, scans } = useApp();
  const field = reminder ? getFieldById(reminder.fieldId) : undefined;
  const scan = reminder ? scans.find((s) => s.id === reminder.scanId) : undefined;

  return (
    <BottomSheet open={open && !!reminder} onClose={onClose} title="Reminder">
      {reminder &&
      <>
          <div className="rounded-2xl bg-accent-soft p-4">
            <p className="flex items-center gap-2 text-[14px] font-semibold text-accent-ink">
              <CalendarClockIcon className="h-4 w-4" aria-hidden />
              Due {dueLabel(reminder.due)} · {longDate(reminder.due)}
            </p>
            <h3 className="mt-1 text-[20px] font-bold text-primary-dark">{reminder.title}</h3>
            <p className="mt-1 text-[15px] text-ink">{reminder.description}</p>
          </div>

          <h4 className="mt-5 text-[17px] font-bold text-primary-dark">What to do</h4>
          <ol className="mt-2 space-y-2.5">
            {reminder.steps.map((step, i) =>
          <li key={step} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-[14px] font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-[16px] leading-snug text-ink">{step}</span>
              </li>
          )}
          </ol>

          {scan &&
        <button
          type="button"
          onClick={() => onViewRecord(scan.id)}
          className="mt-5 flex min-h-[64px] w-full items-center gap-3 rounded-2xl border border-line p-3 text-left active:bg-canvas">
          
              <img src={scan.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] text-ink-muted">Related record</span>
                <span className="block truncate text-[15px] font-bold text-ink">
                  {scan.result} · {field?.name ?? 'No field'}, {shortDate(scan.date)}
                </span>
              </span>
            </button>
        }

          <Link
          to={field && !field.archived ? `/scan?field=${field.id}` : '/scan'}
          className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[17px] font-bold text-white">
          
            <CameraIcon className="h-5 w-5" aria-hidden /> Go to Scan
          </Link>
        </>
      }
    </BottomSheet>);

}