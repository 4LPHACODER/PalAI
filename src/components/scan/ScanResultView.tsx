import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2Icon, NotebookPenIcon, RotateCcwIcon } from 'lucide-react';
import { useT } from '../../hooks/useT';
import { ScanInput, ScanRecord } from '../../types/farm';
import { ResultCards } from '../result/ResultCards';
import { ResultHeading } from '../result/ResultHeading';
import { ResultPhoto } from '../result/ResultPhoto';

interface ScanResultViewProps {
  result: ScanInput;
  notes: string;
  saved: ScanRecord | null;
  saveError: boolean;
  onSave: () => void;
  onRetake: () => void;
  onNewScan: () => void;
}

/** Step 3 — uses exactly the same result cards as a reopened record. */
export function ScanResultView({ result, notes, saved, saveError, onSave, onRetake, onNewScan }: ScanResultViewProps) {
  const t = useT();
  return (
    <section aria-labelledby="scan-result-title" className="mt-5 space-y-4">
      <ResultPhoto src={result.image} alt={t('scan.photoAlt')} className="aspect-[4/3] w-full" />
      <ResultHeading id="scan-result-title" as="h2" code={result.diseaseCode} simulated={result.source === 'simulated'} />
      {notes.trim() &&
      <div className="rounded-2xl border border-line bg-card p-4">
          <p className="flex items-center gap-2 text-[15px] font-bold text-primary-dark">
            <NotebookPenIcon className="h-4 w-4 text-primary" aria-hidden /> {t('scan.notesLabel')}
          </p>
          <p className="mt-1 whitespace-pre-wrap text-[16px] leading-relaxed text-ink">{notes.trim()}</p>
        </div>
      }

      <ResultCards result={{ ...result, id: saved?.id }} onRetake={onRetake} />

      <div className="sticky bottom-[calc(76px+env(safe-area-inset-bottom))] z-20 -mx-4 border-t border-line bg-canvas/95 px-4 pb-3 pt-3 backdrop-blur min-[390px]:-mx-5 min-[390px]:px-5">
        {saveError &&
        <p role="alert" className="mb-2 text-[14px] font-semibold text-danger">
            {t('scan.saveFailed')}
          </p>
        }
        {saved ?
        <div className="space-y-2">
            <p role="status" className="flex items-center gap-2 text-[15px] font-bold text-primary">
              <CheckCircle2Icon className="h-5 w-5 shrink-0" aria-hidden /> {t('scan.saved')}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Link
              to={`/records/${saved.id}`}
              state={{ from: '/records' }}
              className="flex min-h-[52px] items-center justify-center rounded-2xl bg-primary px-3 py-2 text-center text-[16px] font-bold leading-tight text-white">
              
                {t('common.viewRecord')}
              </Link>
              <button
              type="button"
              onClick={onNewScan}
              className="flex min-h-[52px] items-center justify-center gap-1.5 rounded-2xl border border-line bg-card px-3 py-2 text-center text-[16px] font-bold leading-tight text-primary">
              
                <RotateCcwIcon className="h-4 w-4 shrink-0" aria-hidden /> {t('scan.newScan')}
              </button>
            </div>
          </div> :

        <button
          type="button"
          onClick={onSave}
          className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-[17px] font-bold text-white shadow-cta">
          
            {saveError ? t('common.tryAgain') : t('scan.save')}
          </button>
        }
      </div>
    </section>);

}