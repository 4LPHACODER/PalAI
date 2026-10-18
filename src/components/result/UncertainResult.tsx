import React from 'react';
import { CameraIcon, HelpCircleIcon, UserRoundCheckIcon } from 'lucide-react';
import { useT } from '../../hooks/useT';

/** Unknown or failed result — no disease-specific steps are attached. */
export function UncertainResult({ onRetake }: {onRetake?: () => void;}) {
  const t = useT();
  return (
    <section aria-labelledby="uncertain-title" className="rounded-card border border-line bg-card p-4 shadow-card min-[390px]:p-5">
      <h2 id="uncertain-title" className="flex items-center gap-2 text-[20px] font-bold text-primary-dark">
        <HelpCircleIcon className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
        {t('result.uncertainTitle')}
      </h2>
      <p className="mt-2 text-[16px] leading-relaxed text-ink">{t('result.uncertainText')}</p>
      <div className="mt-4 flex gap-3 rounded-2xl bg-canvas p-3">
        <UserRoundCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div>
          <p className="text-[15px] font-bold text-primary-dark">{t('result.askTechTitle')}</p>
          <p className="mt-0.5 text-[15px] leading-snug text-ink">{t('result.askTechText')}</p>
        </div>
      </div>
      {onRetake &&
      <button
        type="button"
        onClick={onRetake}
        className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-[16px] font-bold text-white">
        
          <CameraIcon className="h-5 w-5 shrink-0" aria-hidden /> {t('scan.retake')}
        </button>
      }
    </section>);

}