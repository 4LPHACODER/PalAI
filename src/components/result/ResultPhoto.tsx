import React, { useState } from 'react';
import { ImageOffIcon } from 'lucide-react';
import { useT } from '../../hooks/useT';
interface ResultPhotoProps {
  src: string | null;
  alt: string;
  illustrative?: boolean;
  variant?: 'hero' | 'thumb';
  className?: string;
}

/** Record photo with "Illustration only" labeling and a neutral fallback when no image is available. */
export function ResultPhoto({ src, alt, illustrative = false, variant = 'hero', className = '' }: ResultPhotoProps) {
  const t = useT();
  const [failed, setFailed] = useState(false);
  const hasImage = !!src && !failed;

  if (variant === 'thumb') {
    return (
      <span className={`grid shrink-0 place-items-center overflow-hidden bg-canvas text-ink-muted ${className}`}>
        {hasImage ?
        <img src={src ?? ''} alt="" onError={() => setFailed(true)} className="h-full w-full object-cover" /> :

        <ImageOffIcon className="h-5 w-5" aria-hidden />
        }
      </span>);

  }

  return (
    <div className={`relative overflow-hidden rounded-card bg-primary-soft ${className}`}>
      {hasImage ?
      <img src={src ?? ''} alt={alt} onError={() => setFailed(true)} className="h-full w-full object-cover" /> :

      <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center text-ink-muted">
          <ImageOffIcon className="h-8 w-8" aria-hidden />
          <p className="text-[15px] font-semibold">{t('result.noImage')}</p>
        </div>
      }
      {illustrative && hasImage &&
      <span className="absolute left-3 top-3 rounded-full bg-ink/75 px-2 py-0.5 text-[13px] font-semibold text-white">{t('result.illustrative')}</span>
      }
    </div>);

}