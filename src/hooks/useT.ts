import { useCallback } from 'react';
import { useSession } from '../contexts/SessionContext';
import { translations, TKey } from '../data/translations';

/** Returns a translator for the selected language with English fallback. */
export function useT() {
  const { language } = useSession();
  return useCallback((key: TKey) => translations[language][key] ?? translations.en[key], [language]);
}