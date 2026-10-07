import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon, InfoIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ScanRecord } from '../types/farm';
import { longDate } from '../utils/format';
import { scanStatusMeta } from '../utils/status';
import { BottomSheet } from './BottomSheet';
import { DemoTag } from './DemoTag';
import { StatusBadge } from './StatusBadge';

export function RecordDetailSheet({ scan, onClose }: {scan: ScanRecord | null;onClose: () => void;}) {
  const { getFieldById } = useApp();
  const [shown, setShown] = useState<ScanRecord | null>(scan);

  useEffect(() => {
    if (scan) setShown(scan);
  }, [scan]);

  const field = shown ? getFieldById(shown.fieldId) : undefined;

  return (
    <BottomSheet open={!!scan} onClose={onClose} title="Scan record">
      {shown &&
      <div className="pb-1">
          <div className="relative h-44 overflow-hidden rounded-2xl bg-canvas">
            <img
            src={shown.image}
            alt={`Leaf photo${field ? ` from ${field.name}` : ''}`}
            className={`h-full w-full object-cover ${shown.imageUnclear ? 'scale-110 blur-[4px] brightness-75' : ''}`} />
          
            <span className="absolute left-3 top-3">
              <DemoTag label="Simulated screening" />
            </span>
          </div>

          <h3 className="mt-4 text-[22px] font-bold leading-tight text-primary-dark">{shown.result}</h3>
          <p className="mt-1 text-[15px] text-ink-muted">
            {field?.name ?? 'No field linked'} · {longDate(shown.date)}
          </p>
          <div className="mt-2">
            <StatusBadge meta={scanStatusMeta[shown.status]} />
          </div>
          <p className="mt-3 text-[16px] leading-relaxed text-ink">{shown.summary}</p>

          <h4 className="mt-5 text-[17px] font-bold text-primary-dark">Suggested next steps</h4>
          <ol className="mt-2 space-y-2.5">
            {shown.nextSteps.map((step, i) =>
          <li key={step} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-[14px] font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-[16px] leading-snug text-ink">{step}</span>
              </li>
          )}
          </ol>

          <p className="mt-5 flex gap-2 rounded-2xl bg-canvas p-3 text-[14px] leading-snug text-ink-muted">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Simulated screening for this prototype. It is not a diagnosis, and one leaf photo cannot describe a whole field.
          </p>

          <div className={`mt-5 grid gap-2 ${field ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {field &&
          <Link
            to={`/fields/${field.id}`}
            className="flex h-12 items-center justify-center rounded-xl border border-line text-[15px] font-bold text-primary">
            
                View Field
              </Link>
          }
            <Link
            to={field && !field.archived ? `/scan?field=${field.id}` : '/scan'}
            className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-primary text-[15px] font-bold text-white">
            
              <CameraIcon className="h-4 w-4" aria-hidden /> New photo
            </Link>
          </div>
        </div>
      }
    </BottomSheet>);

}