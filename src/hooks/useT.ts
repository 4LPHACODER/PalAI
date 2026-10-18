import { useCallback } from 'react';
import { useSession } from '../contexts/SessionContext';
import { translate, translateText, TKey, TVars } from '../data/translations';

/** Returns a translator for the selected language with English fallback and {placeholder} support. */
export function useT() {
  const { language } = useSession();
  return useCallback((key: TKey, vars?: TVars) => translate(language, key, vars), [language]);
}

/** Translates an app-owned English message (e.g. a validation error) into the selected language. */
export function useTText() {
  const { language } = useSession();
  return useCallback((text: string | undefined | null) => text ? translateText(language, text) : '', [language]);
}

export type Translator = ReturnType<typeof useT>;