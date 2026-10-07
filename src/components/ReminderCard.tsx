import React from 'react';
import { CalendarClockIcon } from 'lucide-react';
import { Reminder } from '../types/farm';
import { dueLabel } from '../utils/format';

export function ReminderCard({ reminder, onView }: {reminder: Reminder;onView: () => void;}) {
  return (
    <article className="rounded-card border border-accent/50 bg-accent-soft p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card text-accent-ink">
          <CalendarClockIcon className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <h3 className="text-[17px] font-bold text-primary-dark">{reminder.title}</h3>
            <span className="rounded-full bg-card px-2.5 py-0.5 text-[13px] font-semibold text-accent-ink">
              Due: {dueLabel(reminder.due)}
            </span>
          </div>
          <p className="mt-1 text-[15px] leading-snug text-ink">{reminder.description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onView}
        className="mt-4 h-12 w-full rounded-xl bg-card text-[16px] font-bold text-primary ring-1 ring-inset ring-accent/50 active:bg-canvas">
        
        View Reminder
      </button>
    </article>);

}