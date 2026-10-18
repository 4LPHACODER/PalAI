import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, FlaskConicalIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useT } from '../hooks/useT';
import { ScanRecord } from '../types/farm';
import { scanTitleKey } from '../utils/farm';
import { shortDate } from '../utils/format';
import { scanStatusMeta } from '../utils/status';
import { ResultPhoto } from './result/ResultPhoto';
import { StatusBadge } from './StatusBadge';

interface ScanRecordRowProps {
  scan: ScanRecord;
  /** Use wording scoped to the single submitted photo (field detail). */
  scoped?: boolean;
  /** Small sample indicator — only for mixed lists of real and sample records. */
  markSimulated?: boolean;
}

/** Compact, fully tappable record row: thumbnail, title, field · date, one status badge. */
export function ScanRecordRow({ scan, scoped = false, markSimulated = false }: ScanRecordRowProps) {
  const t = useT();
  const { pathname } = useLocation();
  const { getFieldById } = useApp();
  const field = getFieldById(scan.fieldId);
  const title = t(scanTitleKey(scan));
  const heading =
  scoped && scan.diseaseCode !== 'uncertain' ?
  t('scan.scoped', { title }) :
  scoped ?
  t('scan.scopedUncertain') :
  title;

  return (
    <Link
      to={`/records/${scan.id}`}
      state={{ from: pathname }}
      aria-label={t('records.open', { title })}
      className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors duration-150 active:bg-canvas">
      
      <ResultPhoto src={scan.image} alt="" variant="thumb" className="h-16 w-16 rounded-xl" />
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 block text-[16px] font-bold leading-snug text-ink">{heading}</span>
        <span className="mt-0.5 block text-[14px] leading-snug text-ink-muted">
          {scoped ? t('scan.aiScreening') : field?.name ?? t('common.noField')} · {shortDate(scan.date)}
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <StatusBadge meta={scanStatusMeta[scan.status]} />
          {markSimulated && scan.source === 'simulated' &&
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-1 text-[12px] font-semibold leading-tight text-accent-ink">
              <FlaskConicalIcon className="h-3 w-3 shrink-0" aria-hidden />
              {t('common.sample')}
            </span>
          }
        </span>
      </span>
      <ChevronRightIcon className="mt-5 h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
    </Link>);

}