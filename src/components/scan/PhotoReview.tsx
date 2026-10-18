import React from 'react';
import { CameraIcon, ImageIcon, SparklesIcon } from 'lucide-react';
import { useT } from '../../hooks/useT';
import { TextField } from '../form/TextField';

interface PhotoReviewProps {
  photo: string;
  photoName: string;
  notes: string;
  onNotes: (v: string) => void;
  onAnalyze: () => void;
  onRetake: () => void;
  onChooseAnother: () => void;
  onCancel: () => void;
}

/** Step 2 — Tan-awa ang litrato, add optional notes, then start the (sample) analysis. */
export function PhotoReview({ photo, photoName, notes, onNotes, onAnalyze, onRetake, onChooseAnother, onCancel }: PhotoReviewProps) {
  const t = useT();
  return (
    <section aria-labelledby="review-title" className="mt-5">
      <h2 id="review-title" className="text-[20px] font-bold text-primary-dark">
        {t('scan.reviewTitle')}
      </h2>
      <p className="mt-0.5 text-[15px] text-ink-muted">{t('scan.reviewText')}</p>
      <div className="mt-3 overflow-hidden rounded-card border border-line bg-ink">
        <img src={photo} alt={t('scan.photoAlt')} className="h-[min(46vh,360px)] w-full object-contain" />
      </div>
      <p className="mt-2 break-all text-[13px] text-ink-muted">{photoName}</p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={onRetake} className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border border-line bg-card px-2 py-2 text-center text-[14px] font-bold leading-tight text-primary">
          <CameraIcon className="h-4 w-4 shrink-0" aria-hidden /> {t('scan.retake')}
        </button>
        <button type="button" onClick={onChooseAnother} className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border border-line bg-card px-2 py-2 text-center text-[14px] font-bold leading-tight text-primary">
          <ImageIcon className="h-4 w-4 shrink-0" aria-hidden /> {t('scan.chooseAnother')}
        </button>
      </div>

      <div className="mt-5">
        <TextField
          id="scan-notes"
          multiline
          label={t('scan.notesLabel')}
          optional
          hint={t('scan.notesHint')}
          placeholder={t('scan.notesPlaceholder')}
          value={notes}
          maxLength={500}
          onChange={(e) => onNotes(e.target.value)} />
        
      </div>

      <button
        type="button"
        onClick={onAnalyze}
        className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-center text-[17px] font-bold leading-tight text-white shadow-cta transition-transform duration-150 ease-out active:scale-[0.98]">
        
        <SparklesIcon className="h-5 w-5 shrink-0" aria-hidden />
        {t('scan.analyze')}
      </button>
      <button type="button" onClick={onCancel} className="mt-2 min-h-[48px] w-full text-[15px] font-bold text-ink-muted">
        {t('common.cancel')}
      </button>
    </section>);

}