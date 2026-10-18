import React, { useEffect, useState } from 'react';
import { NotebookPenIcon, ShieldCheckIcon } from 'lucide-react';
import { LinkedRecord } from '../../types/drone';
import { longDate } from '../../utils/format';
import { BottomSheet } from '../BottomSheet';
import { DemoTag } from '../DemoTag';

export function LinkedRecordSheet({ record, onClose }: {record: LinkedRecord | null;onClose: () => void;}) {
  const [shown, setShown] = useState(record);
  useEffect(() => {
    if (record) setShown(record);
  }, [record]);

  return (
    <BottomSheet open={!!record} onClose={onClose} title={shown?.kind === 'scan' ? 'Shared scan record' : 'Shared farmer observation'}>
      {shown &&
      <div className="space-y-4 pb-1">
          {shown.image ?
        <div className="relative h-44 overflow-hidden rounded-2xl">
              <img src={shown.image} alt="Leaf photo from the farmer" className="h-full w-full object-cover" />
              <span className="absolute left-3 top-3">
                <DemoTag label="Simulated screening" />
              </span>
            </div> :

        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-canvas text-ink-muted">
              <NotebookPenIcon className="h-7 w-7" aria-hidden />
            </span>
        }
          <div>
            <p className="text-[14px] font-semibold text-ink-muted">
              {shown.kind === 'scan' ? 'AI screening' : 'Farmer observation'} · {longDate(shown.date)}
            </p>
            <h3 className="mt-1 text-[20px] font-bold leading-tight text-primary-dark">{shown.title}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-ink">{shown.text}</p>
            <p className="mt-2 text-[14px] text-ink-muted">By {shown.author} · Riverside Plot</p>
          </div>
          <p className="flex gap-2 rounded-2xl bg-primary-soft p-3 text-[14px] leading-snug text-primary-dark">
            <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Shared with the farmer’s permission (sample). Farmers choose which field records are shared.
          </p>
        </div>
      }
    </BottomSheet>);

}