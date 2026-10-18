import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CameraIcon, ChevronLeftIcon, NotebookPenIcon, SearchXIcon } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { PageBody } from '../components/PageBody';
import { ResultCards } from '../components/result/ResultCards';
import { ResultHeading } from '../components/result/ResultHeading';
import { ResultPhoto } from '../components/result/ResultPhoto';
import { StatusBadge } from '../components/StatusBadge';
import { useApp } from '../contexts/AppContext';
import { useT } from '../hooks/useT';
import { dateTime } from '../utils/format';
import { scanStatusMeta } from '../utils/status';

export function RecordDetail() {
  const t = useT();
  const { scanId } = useParams();
  const location = useLocation();
  const { getScanById, getFieldById } = useApp();
  const scan = getScanById(scanId);
  const backTo = (location.state as {from?: string;} | null)?.from ?? '/records';

  const header =
  <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 px-4 pb-2 pt-[calc(env(safe-area-inset-top)+12px)] backdrop-blur min-[390px]:px-5 md:px-8">
      <div className="flex min-h-[48px] items-center gap-1">
        <Link
        to={backTo}
        aria-label={t('common.goBack')}
        className="-ml-3 grid h-12 w-12 shrink-0 place-items-center rounded-full text-primary-dark active:bg-primary-soft">
        
          <ChevronLeftIcon className="h-7 w-7" aria-hidden />
        </Link>
        <p className="min-w-0 flex-1 text-[20px] font-bold leading-tight text-primary-dark">{t('record.title')}</p>
      </div>
    </header>;


  if (!scan) {
    return (
      <div>
        {header}
        <PageBody className="pt-6">
          <EmptyState
            icon={SearchXIcon}
            tone="error"
            bordered
            title={t('record.notFound')}
            description={t('record.notFoundText')}
            action={
            <Link to="/records" className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-[16px] font-bold text-white">
                {t('record.backToRecords')}
              </Link>
            } />
          
        </PageBody>
      </div>);

  }

  const field = getFieldById(scan.fieldId);

  return (
    <div>
      {header}
      <PageBody className="space-y-4 pb-8 pt-4">
        <ResultPhoto src={scan.image} alt={t('record.photoAlt')} illustrative={scan.imageIllustrative} className="aspect-[4/3] w-full" />

        <ResultHeading
          code={scan.diseaseCode}
          simulated={scan.source === 'simulated'}
          meta={`${field?.name ?? t('common.noField')} · ${dateTime(scan.date)}`}
          badge={<StatusBadge meta={scanStatusMeta[scan.status]} />} />
        

        {scan.userNotes &&
        <section aria-labelledby="rec-notes" className="rounded-2xl border border-line bg-card p-4">
            <h2 id="rec-notes" className="flex items-center gap-2 text-[15px] font-bold text-primary-dark">
              <NotebookPenIcon className="h-4 w-4 text-primary" aria-hidden /> {t('scan.notesLabel')}
            </h2>
            {/* User notes are shown exactly as written — never translated. */}
            <p className="mt-1 whitespace-pre-wrap text-[16px] leading-relaxed text-ink">{scan.userNotes}</p>
          </section>
        }

        <ResultCards result={scan} />

        <div className={`grid gap-2 ${field ? 'min-[390px]:grid-cols-2' : ''}`}>
          {field &&
          <Link
            to={`/fields/${field.id}`}
            className="flex min-h-[48px] items-center justify-center rounded-xl border border-line bg-card px-3 py-2 text-center text-[15px] font-bold text-primary">
            
              {t('common.viewField')}
            </Link>
          }
          <Link
            to={field && !field.archived ? `/scan?field=${field.id}` : '/scan'}
            className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-center text-[15px] font-bold text-white">
            
            <CameraIcon className="h-4 w-4 shrink-0" aria-hidden /> {t('record.newPhoto')}
          </Link>
        </div>
        <p className="text-center text-[13px] text-ink-muted">{t('record.guideVersion', { v: scan.guidanceVersion })}</p>
      </PageBody>
    </div>);

}