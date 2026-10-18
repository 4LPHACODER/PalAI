import React, { useCallback, useState } from 'react';
import { BookOpenIcon, ExternalLinkIcon, LibraryIcon } from 'lucide-react';
import { daDocuments, guideLink } from '../../data/daSources';
import { useT } from '../../hooks/useT';
import { GuidanceStep, SourceRef } from '../../types/farm';
import { BottomSheet } from '../BottomSheet';

/** Unique cited sources, in step order. */
function collectSources(steps: GuidanceStep[]): SourceRef[] {
  const map = new Map<string, SourceRef>();
  steps.forEach((s) =>
  s.sources.forEach((r) => {
    const key = `${r.docId}|${r.printedPage}`;
    if (!map.has(key)) map.set(key, r);
  })
  );
  return [...map.values()];
}

const buttonClass =
'inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-card px-4 py-2 text-[15px] font-bold leading-tight text-primary active:bg-primary-soft';

/**
 * Compact "Teknikal nga Giya gikan sa DA" footer. One source opens its PDF page directly;
 * several open a short source list with titles and page references.
 */
export function GuideSourcesFooter({ steps }: {steps: GuidanceStep[];}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const sources = collectSources(steps).filter((s) => guideLink(s.docId, s.pdfPage));
  if (!sources.length) return null;

  const single = sources.length === 1 ? sources[0] : null;

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-line pt-3">
      <p className="flex min-w-0 items-center gap-2 text-[14px] font-semibold text-primary-dark">
        <LibraryIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        {t('result.daTitle')}
      </p>
      {single ?
      <a
        href={guideLink(single.docId, single.pdfPage) ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('result.viewGuideAria', { title: daDocuments[single.docId].title, n: single.pdfPage })}
        className={buttonClass}>
        
          <BookOpenIcon className="h-4 w-4 shrink-0" aria-hidden />
          {t('result.viewGuide')}
        </a> :

      <button type="button" onClick={() => setOpen(true)} className={buttonClass}>
          <BookOpenIcon className="h-4 w-4 shrink-0" aria-hidden />
          {t('result.viewGuide')}
        </button>
      }

      <BottomSheet open={open} onClose={close} title={t('result.sourcesTitle')}>
        <p className="text-[14px] leading-snug text-ink-muted">{t('result.sourcesText')}</p>
        <ul className="mt-3 divide-y divide-line rounded-2xl border border-line">
          {sources.map((s) =>
          <li key={`${s.docId}-${s.printedPage}`}>
              <a
              href={guideLink(s.docId, s.pdfPage) ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[64px] items-center gap-3 px-4 py-3 active:bg-canvas">
              
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-bold leading-snug text-ink">{daDocuments[s.docId].title}</span>
                  <span className="block text-[14px] leading-snug text-ink-muted">{t(s.sectionKey)}</span>
                  <span className="block text-[13px] leading-snug text-ink-muted">
                    {t('result.pages', { p: s.printedPage, pdf: s.pdfPages ?? String(s.pdfPage) })}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[14px] font-bold text-primary">
                  {t('result.openGuide')}
                  <ExternalLinkIcon className="h-4 w-4" aria-hidden />
                </span>
              </a>
            </li>
          )}
        </ul>
      </BottomSheet>
    </div>);

}