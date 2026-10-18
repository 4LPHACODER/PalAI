import React, { useEffect, useState } from 'react';
import { ChevronRightIcon, InfoIcon, NotebookPenIcon, ScanSearchIcon } from 'lucide-react';
import { DroneSurvey, InspectionArea, LinkedRecord } from '../../types/drone';
import { shortDate } from '../../utils/format';
import { priorityMeta } from '../../utils/survey';
import { BottomSheet } from '../BottomSheet';

interface AreaSheetProps {
  survey: DroneSurvey;
  area: InspectionArea | null;
  onClose: () => void;
  onOpenRecord: (r: LinkedRecord) => void;
}

export function AreaSheet({ survey, area, onClose, onOpenRecord }: AreaSheetProps) {
  const [shown, setShown] = useState(area);
  useEffect(() => {
    if (area) setShown(area);
  }, [area]);
  const records = shown ? survey.records.filter((r) => shown.linkedRecordIds.includes(r.id)) : [];

  return (
    <BottomSheet open={!!area} onClose={onClose} title={shown ? `${shown.label} · ${survey.site}` : 'Area'}>
      {shown &&
      <div className="space-y-5 pb-1">
          <span className={`inline-flex rounded-full px-3 py-1 text-[14px] font-bold ${priorityMeta[shown.priority].badge}`}>
            {priorityMeta[shown.priority].label}
          </span>
          <div>
            <h3 className="text-[16px] font-bold text-primary-dark">Why this area</h3>
            <p className="mt-1 text-[16px] leading-relaxed text-ink">{shown.reason}</p>
          </div>
          <div className="rounded-2xl bg-canvas p-4">
            <h3 className="text-[16px] font-bold text-primary-dark">Sample inspection note</h3>
            <p className="mt-1 text-[16px] leading-relaxed text-ink">{shown.note}</p>
            <p className="mt-2 text-[14px] font-semibold text-primary">Next action: {shown.action}</p>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-primary-dark">Linked farmer records</h3>
            {records.length ?
          <ul className="mt-2 space-y-2">
                {records.map((r) =>
            <li key={r.id}>
                    <button
                type="button"
                onClick={() => onOpenRecord(r)}
                className="flex min-h-[64px] w-full items-center gap-3 rounded-2xl border border-line bg-card p-3 text-left active:bg-canvas">
                
                      {r.image ?
                <img src={r.image} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" /> :

                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-canvas text-ink-muted">
                          <NotebookPenIcon className="h-5 w-5" aria-hidden />
                        </span>
                }
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1 text-[13px] text-ink-muted">
                          {r.kind === 'scan' ? <ScanSearchIcon className="h-3.5 w-3.5" aria-hidden /> : null}
                          {r.kind === 'scan' ? 'AI screening' : 'Farmer observation'} · {shortDate(r.date)}
                        </span>
                        <span className="block text-[15px] font-bold leading-snug text-ink">{r.title}</span>
                      </span>
                      <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
                    </button>
                  </li>
            )}
              </ul> :

          <p className="mt-1 text-[15px] text-ink-muted">No farmer records have been shared for this area.</p>
          }
          </div>
          <p className="flex gap-2 text-[14px] leading-snug text-ink-muted">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Aerial patterns do not confirm a disease. Field inspection helps clarify what is happening.
          </p>
        </div>
      }
    </BottomSheet>);

}