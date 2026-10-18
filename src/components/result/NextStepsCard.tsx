import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckIcon, EyeIcon, ListChecksIcon, ShieldCheckIcon, UserRoundIcon } from 'lucide-react';
import type { TKey } from '../../data/translations';
import { useT } from '../../hooks/useT';
import { GuidanceStep, ScanRecord, StepType } from '../../types/farm';
import { GuideSourcesFooter } from './GuideSourcesFooter';

type StepsSource = Pick<ScanRecord, 'steps'> & {id?: string;};

const typeMeta: Record<StepType, {icon: typeof EyeIcon;labelKey: TKey;}> = {
  inspection: { icon: EyeIcon, labelKey: 'type.inspection' },
  prevention: { icon: ShieldCheckIcon, labelKey: 'type.prevention' },
  technician: { icon: UserRoundIcon, labelKey: 'type.technician' }
};

const ease = [0.23, 1, 0.32, 1] as const;
const storageKey = (id: string) => `palai.steps.${id}`;

function readDone(id?: string): string[] {
  if (!id) return [];
  try {
    return JSON.parse(window.localStorage.getItem(storageKey(id)) ?? '[]');
  } catch {
    return [];
  }
}

function StepRow({ step, done, onToggle }: {step: GuidanceStep;done: boolean;onToggle: () => void;}) {
  const t = useT();
  const reduce = useReducedMotion();
  const meta = typeMeta[step.type];
  const Icon = meta.icon;
  const text = t(step.textKey);
  return (
    <li>
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={t('result.markDone', { step: text })}
        onClick={onToggle}
        className="flex w-full items-start gap-3 rounded-2xl px-2 py-2.5 text-left transition-colors duration-150 active:bg-canvas">
        
        <span
          className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150 ${
          done ? 'border-primary bg-primary text-white' : 'border-line bg-card'}`
          }
          aria-hidden>
          
          {done &&
          <motion.span initial={reduce ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.16, ease }}>
              <CheckIcon className="h-4 w-4" strokeWidth={3} />
            </motion.span>
          }
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block text-[16px] leading-relaxed transition-colors duration-150 ${done ? 'text-ink-muted line-through decoration-ink-muted/50' : 'text-ink'}`}>
            {text}
          </span>
          <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-semibold text-primary">
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {t(meta.labelKey)}
          </span>
        </span>
      </button>
    </li>);

}

/** "Sunod nga Lakang" — a tickable checklist grouped into now / next planting, then one DA guide footer. */
export function NextStepsCard({ result }: {result: StepsSource;}) {
  const t = useT();
  const reduce = useReducedMotion();
  const [done, setDone] = useState<string[]>(() => readDone(result.id));

  useEffect(() => setDone(readDone(result.id)), [result.id]);

  const toggle = (id: string) =>
  setDone((d) => {
    const next = d.includes(id) ? d.filter((x) => x !== id) : [...d, id];
    if (result.id) window.localStorage.setItem(storageKey(result.id), JSON.stringify(next));
    return next;
  });

  const groups = [
  { key: 'now', labelKey: 'result.groupNow' as TKey, steps: result.steps.filter((s) => s.group === 'now') },
  { key: 'next', labelKey: 'result.groupNext' as TKey, steps: result.steps.filter((s) => s.group === 'next') }].
  filter((g) => g.steps.length);

  const total = result.steps.length;
  const doneCount = result.steps.filter((s) => done.includes(s.id)).length;
  const pct = total ? Math.round(doneCount / total * 100) : 0;

  return (
    <section aria-labelledby="steps-title" className="rounded-card border border-line bg-card p-4 shadow-card min-[390px]:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 id="steps-title" className="flex items-center gap-2 text-[19px] font-bold leading-tight text-primary-dark">
          <ListChecksIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          {t('result.nextTitle')}
        </h2>
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-ink-muted" aria-live="polite">
          {t('result.stepsDone', { done: doneCount, total })}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-soft" aria-hidden>
        <motion.div className="h-full rounded-full bg-primary" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: reduce ? 0 : 0.25, ease }} />
      </div>

      <div className="mt-3 space-y-3">
        {groups.map((g) =>
        <div key={g.key}>
            <h3 className="px-2 text-[13px] font-bold text-primary">{t(g.labelKey)}</h3>
            <ul className="mt-0.5">
              {g.steps.map((s) =>
            <StepRow key={s.id} step={s} done={done.includes(s.id)} onToggle={() => toggle(s.id)} />
            )}
            </ul>
          </div>
        )}
      </div>

      <GuideSourcesFooter steps={result.steps} />
    </section>);

}