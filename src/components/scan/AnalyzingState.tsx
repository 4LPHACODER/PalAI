import React from 'react';
import { AlertCircleIcon, Loader2Icon } from 'lucide-react';
import { useT } from '../../hooks/useT';

export function AnalyzingState({ photo, onCancel }: {photo: string;onCancel: () => void;}) {
  const t = useT();
  return (
    <section aria-live="polite" className="mt-5">
      <div className="relative overflow-hidden rounded-card border border-line bg-ink">
        <img src={photo} alt={t('scan.photoAlt')} className="h-[min(40vh,320px)] w-full object-contain opacity-60" />
        <div className="absolute inset-0 grid place-items-center">
          <p role="status" className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-[16px] font-bold text-primary-dark shadow-card">
            <Loader2Icon className="h-5 w-5 animate-spin text-primary" aria-hidden /> {t('scan.analyzing')}
          </p>
        </div>
      </div>
      <p className="mt-3 text-center text-[14px] text-ink-muted">{t('scan.analyzingNote')}</p>
      <button type="button" onClick={onCancel} className="mt-3 min-h-[48px] w-full rounded-xl border border-line bg-card text-[16px] font-bold text-primary">
        {t('common.cancel')}
      </button>
    </section>);

}

export function AnalysisFailed({ onRetry, onChooseAnother }: {onRetry: () => void;onChooseAnother: () => void;}) {
  const t = useT();
  return (
    <section role="alert" className="mt-5 rounded-card border border-danger/30 bg-danger-soft p-5">
      <h2 className="flex items-center gap-2 text-[19px] font-bold text-danger">
        <AlertCircleIcon className="h-5 w-5 shrink-0" aria-hidden /> {t('scan.failedTitle')}
      </h2>
      <p className="mt-2 text-[16px] leading-relaxed text-ink">{t('scan.failedText')}</p>
      <div className="mt-4 grid gap-2">
        <button type="button" onClick={onRetry} className="min-h-[48px] rounded-xl bg-primary px-3 py-2 text-[16px] font-bold text-white">
          {t('common.tryAgain')}
        </button>
        <button type="button" onClick={onChooseAnother} className="min-h-[48px] rounded-xl border border-line bg-card px-3 py-2 text-[16px] font-bold text-primary">
          {t('scan.chooseAnother')}
        </button>
      </div>
    </section>);

}