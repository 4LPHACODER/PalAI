import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SparklesIcon } from 'lucide-react';
import { confidenceBreakdown, guidanceLibrary } from '../../data/guidance';
import { useT } from '../../hooks/useT';
import { DiseaseCode } from '../../types/farm';

const ease = [0.23, 1, 0.32, 1] as const;

/** AI confidence for the top match only. */
export function ConfidenceMeter({ code, confidence }: {code: DiseaseCode;confidence?: number;}) {
  const t = useT();
  const reduce = useReducedMotion();
  const top = confidenceBreakdown(code, confidence)[0];
  if (!top) return null;
  const level = top.pct >= 85 ? t('result.confidenceLevelHigh') : t('result.confidenceLevelMid');

  return (
    <div className="rounded-2xl bg-primary-soft/50 p-4">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[14px] font-semibold text-primary">
            <SparklesIcon className="h-4 w-4 shrink-0" aria-hidden />
            {t('result.confidence')}
          </p>
          <p className="mt-0.5 text-[17px] font-bold leading-snug text-primary-dark">{t(guidanceLibrary[top.code].titleKey)}</p>
        </div>
        <p className="shrink-0 text-right">
          <span className="block text-[32px] font-bold leading-none tabular-nums text-primary-dark">{top.pct}%</span>
          <span className="text-[13px] font-semibold text-primary">{level}</span>
        </p>
      </div>
      <div
        className="mt-3 h-2.5 overflow-hidden rounded-full bg-primary-soft"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={top.pct}
        aria-label={t('result.confidence')}>
        
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={reduce ? { width: `${top.pct}%` } : { width: 0 }}
          animate={{ width: `${top.pct}%` }}
          transition={{ duration: 0.3, ease }} />
        
      </div>
    </div>);

}