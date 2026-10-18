import React from 'react';
import { CameraIcon, ImageIcon, ImageOffIcon, InfoIcon, Loader2Icon } from 'lucide-react';
import { photoTips } from '../../data/photoTips';
import { useT } from '../../hooks/useT';
import { PhotoError } from '../../hooks/useScanFlow';
import { EmptyState } from '../EmptyState';

interface CaptureStartProps {
  onTake: () => void;
  onUpload: () => void;
  error: PhotoError;
  preparing: boolean;
}

/** Step 1 — Kuhaa o pilia ang litrato. */
export function CaptureStart({ onTake, onUpload, error, preparing }: CaptureStartProps) {
  const t = useT();
  return (
    <>
      {error &&
      <div className="mt-5">
          <EmptyState
          icon={ImageOffIcon}
          tone="error"
          bordered
          title={error === 'not-image' ? t('scan.notImageTitle') : t('scan.readFailedTitle')}
          description={error === 'not-image' ? t('scan.notImageText') : t('scan.readFailedText')}
          action={
          <button type="button" onClick={onUpload} className="min-h-[48px] w-full rounded-xl bg-primary px-3 py-2 text-[16px] font-bold text-white">
                {t('scan.chooseAnother')}
              </button>
          } />
        
        </div>
      }

      <h2 className="mt-6 text-[19px] font-bold text-primary-dark">{t('scan.tipsTitle')}</h2>
      <ul className="mt-3 space-y-3">
        {photoTips.map(({ icon: Icon, titleKey, textKey }) =>
        <li key={titleKey} className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[16px] font-semibold leading-snug text-ink">{t(titleKey)}</p>
              <p className="text-[14px] leading-snug text-ink-muted">{t(textKey)}</p>
            </div>
          </li>
        )}
      </ul>

      <div className="mt-7 space-y-2">
        {preparing ?
        <p role="status" className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border border-line bg-card text-[16px] font-semibold text-ink">
            <Loader2Icon className="h-5 w-5 animate-spin text-primary" aria-hidden /> {t('scan.opening')}
          </p> :

        <>
            <button
            type="button"
            onClick={onTake}
            className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-[18px] font-bold text-white shadow-cta transition-transform duration-150 ease-out active:scale-[0.98]">
            
              <CameraIcon className="h-6 w-6 shrink-0" aria-hidden /> {t('scan.takePhoto')}
            </button>
            <button
            type="button"
            onClick={onUpload}
            className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl border border-line bg-card px-4 py-2 text-[17px] font-bold text-primary">
            
              <ImageIcon className="h-5 w-5 shrink-0" aria-hidden /> {t('scan.uploadPhoto')}
            </button>
          </>
        }
      </div>

      <p className="mt-4 flex gap-2 text-[14px] leading-snug text-ink-muted">
        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        {t('scan.disclaimer')}
      </p>
    </>);

}