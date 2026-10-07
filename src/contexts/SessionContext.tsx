import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { demoProfile } from '../data/profiles';
import { LangCode, Session, SyncState } from '../types/farm';
import { readJSON, removeKey, writeJSON } from '../utils/storage';

interface Account {
  email: string;
  fullName: string;
  workspaceId: string;
}

interface Prefs {
  language: LangCode;
  onboardingDone: boolean;
}

export type StartScreen = 'auto' | 'onboarding' | 'demoHome';

interface SessionValue {
  session: Session | null;
  currentAccount: Account | null;
  language: LangCode;
  setLanguage: (lang: LangCode) => void;
  onboardingDone: boolean;
  completeOnboarding: () => void;
  signInDemo: () => void;
  signIn: (email: string) => boolean;
  register: (fullName: string, email: string) => boolean;
  signOut: () => void;
  initialSyncState: SyncState;
}

const PREFS_KEY = 'palai.prefs';
const SESSION_KEY = 'palai.session';
const ACCOUNTS_KEY = 'palai.accounts';

const demoSession: Session = { mode: 'demo', workspaceId: 'demo', email: demoProfile.email };

const SessionContext = createContext<SessionValue | null>(null);

interface SessionProviderProps {
  children: ReactNode;
  initialSyncState?: SyncState;
  startScreen?: StartScreen;
}

export function SessionProvider({ children, initialSyncState = 'synced', startScreen = 'auto' }: SessionProviderProps) {
  const [prefs, setPrefs] = useState<Prefs>(() => {
    const stored = readJSON<Prefs>(PREFS_KEY) ?? { language: 'en', onboardingDone: false };
    if (startScreen === 'onboarding') return { ...stored, onboardingDone: false };
    if (startScreen === 'demoHome') return { ...stored, onboardingDone: true };
    return stored;
  });
  const [session, setSession] = useState<Session | null>(() => {
    if (startScreen === 'onboarding') return null;
    if (startScreen === 'demoHome') return demoSession;
    return readJSON<Session>(SESSION_KEY);
  });
  const [accounts, setAccounts] = useState<Account[]>(() => readJSON<Account[]>(ACCOUNTS_KEY) ?? []);

  useEffect(() => {
    writeJSON(PREFS_KEY, prefs);
    document.documentElement.lang = prefs.language;
  }, [prefs]);

  useEffect(() => {
    if (session) writeJSON(SESSION_KEY, session);else
    removeKey(SESSION_KEY);
  }, [session]);

  useEffect(() => {
    writeJSON(ACCOUNTS_KEY, accounts);
  }, [accounts]);

  const setLanguage = useCallback((language: LangCode) => setPrefs((p) => ({ ...p, language })), []);
  const completeOnboarding = useCallback(() => setPrefs((p) => ({ ...p, onboardingDone: true })), []);

  const signInDemo = useCallback(() => {
    setPrefs((p) => ({ ...p, onboardingDone: true }));
    setSession(demoSession);
  }, []);

  // Simulated sign-in: only accounts created on this device can be opened. No password is checked or stored.
  const signIn = useCallback(
    (email: string) => {
      const acc = accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
      if (!acc) return false;
      setSession({ mode: 'account', workspaceId: acc.workspaceId, email: acc.email });
      return true;
    },
    [accounts]
  );

  const register = useCallback(
    (fullName: string, email: string) => {
      const clean = email.trim();
      if (accounts.some((a) => a.email.toLowerCase() === clean.toLowerCase())) return false;
      const acc: Account = { email: clean, fullName: fullName.trim(), workspaceId: `acct-${Date.now().toString(36)}` };
      setAccounts((prev) => [...prev, acc]);
      setPrefs((p) => ({ ...p, onboardingDone: true }));
      setSession({ mode: 'account', workspaceId: acc.workspaceId, email: acc.email });
      return true;
    },
    [accounts]
  );

  const signOut = useCallback(() => setSession(null), []);

  const value = useMemo<SessionValue>(
    () => ({
      session,
      currentAccount: session?.mode === 'account' ? accounts.find((a) => a.workspaceId === session.workspaceId) ?? null : null,
      language: prefs.language,
      setLanguage,
      onboardingDone: prefs.onboardingDone,
      completeOnboarding,
      signInDemo,
      signIn,
      register,
      signOut,
      initialSyncState
    }),
    [session, accounts, prefs, setLanguage, completeOnboarding, signInDemo, signIn, register, signOut, initialSyncState]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}