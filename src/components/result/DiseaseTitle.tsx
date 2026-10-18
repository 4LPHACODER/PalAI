import React from 'react';
import { useT } from '../../hooks/useT';
import { DiseaseCode } from '../../types/farm';
import { guidanceLibrary } from '../../data/guidance';

interface DiseaseTitleProps {
  code: DiseaseCode;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  size?: 'lg' | 'md';
}

/** Recognized disease name with its Cebuano/English explanation underneath. */
export function DiseaseTitle({ code, as: Tag = 'h2', size = 'lg' }: DiseaseTitleProps) {
  const t = useT();
  const g = guidanceLibrary[code];
  return (
    <div>
      <Tag className={`font-bold leading-tight text-primary-dark ${size === 'lg' ? 'text-[24px]' : 'text-[18px]'}`}>{t(g.titleKey)}</Tag>
      <p className={`mt-0.5 leading-snug text-ink-muted ${size === 'lg' ? 'text-[16px]' : 'text-[14px]'}`}>{t(g.labelKey)}</p>
    </div>);

}