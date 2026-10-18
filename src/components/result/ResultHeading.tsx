import React from 'react';
import { FlaskConicalIcon } from 'lucide-react';
import { guidanceLibrary } from '../../data/guidance';
import { useT } from '../../hooks/useT';
import { DiseaseCode } from '../../types/farm';

interface ResultHeadingProps {
  code: DiseaseCode;
  simulated: boolean;
  as?: 'h1' | 'h2';
  id?: string;
  meta?: string;
  badge?: React.ReactNode;
}

/** Disease title with the single discreet "Pananglitan nga Resulta" label for simulated results. */
export function ResultHeading({ code, simulated, as: Tag = 'h1', id, meta, badge }: ResultHeadingProps) {
  const t = useT();
  return (
    <div>
      <Tag id={id} className="text-[24px] font-bold leading-tight text-primary-dark">
        {t(guidanceLibrary[code].titleKey)}
      </Tag>
      {meta && <p className="mt-1 text-[15px] leading-snug text-ink-muted">{meta}</p>}
      {(badge || simulated) &&
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {badge}
          {simulated &&
        <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-1 text-[13px] font-semibold leading-tight text-accent-ink">
              <FlaskConicalIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {t('common.simulated')}
            </span>
        }
        </div>
      }
    </div>);

}