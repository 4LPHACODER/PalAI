import React from 'react';
import { AlertTriangleIcon, BrainCircuitIcon, BugIcon, CloudRainIcon, InfoIcon, LeafIcon } from 'lucide-react';
import type { TKey } from '../../data/translations';
import { guidanceLibrary } from '../../data/guidance';
import { useT } from '../../hooks/useT';
import { ScanRecord } from '../../types/farm';
import { ConfidenceMeter } from './ConfidenceMeter';

type AnalysisSource = Pick<ScanRecord, 'diseaseCode' | 'confidence'>;

function Dot() {
  return <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />;
}

const facts = [
{ key: 'cause', labelKey: 'info.cause', icon: BugIcon },
{ key: 'part', labelKey: 'info.part', icon: LeafIcon },
{ key: 'when', labelKey: 'info.when', icon: CloudRainIcon },
{ key: 'risk', labelKey: 'info.risk', icon: AlertTriangleIcon }] as
const;

/** "Analisismo sa AI" — confidence, the possible disease, key facts and signs to inspect. */
export function AnalysisCard({ result }: {result: AnalysisSource;}) {
  const t = useT();
  const code = result.diseaseCode;
  const g = guidanceLibrary[code];
  const signs = g.signKeys.slice(0, 2);

  return (
    <section aria-labelledby="analysis-title" className="rounded-card border border-line bg-card p-4 shadow-card min-[390px]:p-5">
      <h2 id="analysis-title" className="flex items-center gap-2 text-[19px] font-bold text-primary-dark">
        <BrainCircuitIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
        {t('result.analysisTitle')}
      </h2>

      <div className="mt-3">
        <ConfidenceMeter code={code} confidence={result.confidence} />
      </div>

      <ul className="mt-4">
        <li className="flex gap-2.5">
          <Dot />
          <p className="text-[16px] leading-relaxed text-ink">
            <span className="font-bold text-primary-dark">{t(g.titleKey)}</span>
            <span className="block">{t(g.labelKey)}</span>
          </p>
        </li>
      </ul>

      <h3 className="mt-4 text-[15px] font-bold text-primary">{t('result.about')}</h3>
      <dl className="mt-2 divide-y divide-line rounded-2xl border border-line">
        {facts.map(({ key, labelKey, icon: Icon }) =>
        <div key={key} className="flex gap-3 px-3 py-2.5">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <div className="min-w-0">
              <dt className="text-[13px] font-semibold text-ink-muted">{t(labelKey)}</dt>
              <dd className="text-[15px] leading-snug text-ink">{t(`info.${code}.${key}` as TKey)}</dd>
            </div>
          </div>
        )}
      </dl>

      {signs.length > 0 &&
      <>
          <h3 className="mt-4 text-[15px] font-bold text-primary">{t('result.signs')}</h3>
          <ul className="mt-1.5 space-y-1.5">
            {signs.map((k) =>
          <li key={k} className="flex gap-2.5 text-[16px] leading-relaxed text-ink">
                <Dot />
                {t(k)}
              </li>
          )}
          </ul>
        </>
      }

      <p className="mt-4 flex gap-2 border-t border-line pt-3 text-[14px] leading-snug text-ink-muted">
        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        {t('result.confirmNote')}
      </p>
    </section>);

}