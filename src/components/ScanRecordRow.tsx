import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ScanRecord } from '../types/farm';
import { scopedScanLabel } from '../utils/farm';
import { shortDate } from '../utils/format';
import { scanStatusMeta } from '../utils/status';
import { StatusBadge } from './StatusBadge';

interface ScanRecordRowProps {
  scan: ScanRecord;
  onOpen: (scan: ScanRecord) => void;
  /** Use wording scoped to the single submitted photo (field detail). */
  scoped?: boolean;
}

export function ScanRecordRow({ scan, onOpen, scoped = false }: ScanRecordRowProps) {
  const { getFieldById } = useApp();
  const field = getFieldById(scan.fieldId);
  return (
    <button
      type="button"
      onClick={() => onOpen(scan)}
      className="flex min-h-[84px] w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 active:bg-canvas">
      
      <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-canvas">
        <img
          src={scan.image}
          alt=""
          className={`h-full w-full object-cover ${scan.imageUnclear ? 'scale-110 blur-[3px] brightness-75' : ''}`} />
        
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-[16px] font-bold text-ink ${scoped ? 'leading-snug' : 'truncate'}`}>
          {scoped ? scopedScanLabel(scan) : scan.result}
        </span>
        <span className="block truncate text-[14px] text-ink-muted">
          {scoped ? 'AI screening' : field?.name ?? 'No field linked'} · {shortDate(scan.date)}
        </span>
        <span className="mt-1.5 block">
          <StatusBadge meta={scanStatusMeta[scan.status]} />
        </span>
      </span>
      <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
    </button>);

}