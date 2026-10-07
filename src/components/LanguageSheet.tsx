import React from 'react';
import { CheckIcon } from 'lucide-react';
import { useSession } from '../contexts/SessionContext';
import { languageOptions } from '../data/translations';
import { useT } from '../hooks/useT';
import { BottomSheet } from './BottomSheet';

export function LanguageSheet({ open, onClose }: {open: boolean;onClose: () => void;}) {
  const { language, setLanguage } = useSession();
  const t = useT();
  return (
    <BottomSheet open={open} onClose={onClose} title={t('common.language')}>
      <div role="radiogroup" aria-label={t('common.language')} className="space-y-2">
        {languageOptions.map((l) => {
          const selected = l.code === language;
          return (
            <button
              key={l.code}
              type="button"
              role="radio"
              aria-checked={selected}
              lang={l.code}
              onClick={() => setLanguage(l.code)}
              className={`flex h-14 w-full items-center justify-between rounded-2xl border-2 px-4 text-[16px] font-semibold transition-colors duration-150 ${
              selected ? 'border-primary bg-primary-soft text-primary-dark' : 'border-line text-ink'}`
              }>
              
              {l.label}
              {selected && <CheckIcon className="h-5 w-5 text-primary" strokeWidth={3} aria-hidden />}
            </button>);

        })}
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
        Menus, buttons, and form labels change language. Some text and all crop guidance stay in English for now. Translations
        are a preview and have not been professionally reviewed.
      </p>
      <button type="button" onClick={onClose} className="mt-4 h-12 w-full rounded-xl bg-primary text-[16px] font-bold text-white">
        {t('common.done')}
      </button>
    </BottomSheet>);

}