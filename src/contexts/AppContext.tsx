import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Field,
  FieldInput,
  Observation,
  ObservationInput,
  Session,
  SharingPrefs,
  SyncState,
  WorkspaceData,
  FarmerProfile } from
'../types/farm';
import { readJSON, writeJSON } from '../utils/storage';
import { createAccountWorkspace, createDemoWorkspace, WORKSPACE_VERSION } from '../utils/workspace';

interface AppContextValue extends Omit<WorkspaceData, 'version'> {
  isDemo: boolean;
  activeFields: Field[];
  selectedField: Field | null;
  getFieldById: (id: string | null | undefined) => Field | undefined;
  setSelectedFieldId: (id: string | null) => void;
  updateProfile: (patch: Partial<FarmerProfile>) => void;
  addField: (input: FieldInput) => Field;
  updateField: (id: string, patch: Partial<FieldInput>) => void;
  archiveField: (id: string) => void;
  restoreField: (id: string) => void;
  addObservation: (input: ObservationInput) => Observation;
  updateObservation: (id: string, patch: Partial<ObservationInput>) => void;
  unreadCount: number;
  openNotification: (id: string) => void;
  saveSharing: (prefs: Omit<SharingPrefs, 'updatedAt'>) => void;
  stopSharing: () => void;
  resetDemoData: () => void;
  syncState: SyncState;
  setSyncState: (state: SyncState) => void;
  retrying: boolean;
  retrySync: () => void;
  storageError: boolean;
  retryStorage: () => void;
  simulateStorageFailure: boolean;
  setSimulateStorageFailure: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProps {
  children: ReactNode;
  session: Session;
  account: {fullName: string;email: string;} | null;
  initialSyncState: SyncState;
}

export function AppProvider({ children, session, account, initialSyncState }: AppProviderProps) {
  const storageKey = `palai.workspace.${session.workspaceId}`;
  const [data, setData] = useState<WorkspaceData>(() => {
    const stored = readJSON<WorkspaceData>(storageKey);
    if (stored && stored.version === WORKSPACE_VERSION) return stored;
    return session.mode === 'demo' ?
    createDemoWorkspace() :
    createAccountWorkspace(account?.fullName ?? '', account?.email ?? session.email);
  });
  const [storageError, setStorageError] = useState(false);
  const [simulateStorageFailure, setSimulateStorageFailure] = useState(false);
  const [syncState, setSyncStateRaw] = useState<SyncState>(initialSyncState);
  const [retrying, setRetrying] = useState(false);
  const syncTimer = useRef<number | null>(null);

  // Saved on this device only — this is not cloud synchronization.
  const persist = useCallback(
    (d: WorkspaceData) => {
      const ok = !simulateStorageFailure && writeJSON(storageKey, d);
      setStorageError(!ok);
    },
    [storageKey, simulateStorageFailure]
  );

  useEffect(() => {
    persist(data);
  }, [data, persist]);

  useEffect(() => setSyncStateRaw(initialSyncState), [initialSyncState]);
  useEffect(() => () => {
    if (syncTimer.current) window.clearTimeout(syncTimer.current);
  }, []);

  const setSyncState = useCallback((s: SyncState) => {
    if (syncTimer.current) window.clearTimeout(syncTimer.current);
    setRetrying(false);
    setSyncStateRaw(s);
  }, []);

  const retrySync = useCallback(() => {
    setRetrying(true);
    syncTimer.current = window.setTimeout(() => {
      setRetrying(false);
      setSyncStateRaw('synced');
    }, 1200);
  }, []);

  const updateProfile = useCallback((patch: Partial<FarmerProfile>) => {
    setData((d) => ({ ...d, profile: { ...d.profile, ...patch } }));
  }, []);

  const addField = useCallback((input: FieldInput) => {
    const field: Field = { ...input, id: `field-${Date.now().toString(36)}`, archived: false, createdAt: new Date().toISOString() };
    setData((d) => {
      const selectedStillActive = d.fields.some((f) => f.id === d.selectedFieldId && !f.archived);
      return { ...d, fields: [field, ...d.fields], selectedFieldId: selectedStillActive ? d.selectedFieldId : field.id };
    });
    return field;
  }, []);

  const updateField = useCallback((id: string, patch: Partial<FieldInput>) => {
    setData((d) => ({ ...d, fields: d.fields.map((f) => f.id === id ? { ...f, ...patch } : f) }));
  }, []);

  const archiveField = useCallback((id: string) => {
    setData((d) => {
      const fields = d.fields.map((f) => f.id === id ? { ...f, archived: true } : f);
      const nextSelected =
      d.selectedFieldId === id ? fields.find((f) => !f.archived)?.id ?? null : d.selectedFieldId;
      return { ...d, fields, selectedFieldId: nextSelected };
    });
  }, []);

  const restoreField = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      fields: d.fields.map((f) => f.id === id ? { ...f, archived: false } : f),
      selectedFieldId: d.selectedFieldId ?? id
    }));
  }, []);

  const dataRef = useRef(data);
  dataRef.current = data;

  const addObservation = useCallback((input: ObservationInput) => {
    const { profile } = dataRef.current;
    const created: Observation = {
      ...input,
      id: `obs-${Date.now().toString(36)}`,
      author: profile.fullName || profile.displayName || 'Farmer',
      createdAt: new Date().toISOString(),
      updatedAt: null
    };
    setData((d) => ({ ...d, observations: [created, ...d.observations] }));
    return created;
  }, []);

  const updateObservation = useCallback((id: string, patch: Partial<ObservationInput>) => {
    setData((d) => ({
      ...d,
      observations: d.observations.map((o) => o.id === id ? { ...o, ...patch, updatedAt: new Date().toISOString() } : o)
    }));
  }, []);

  const setSelectedFieldId = useCallback((id: string | null) => setData((d) => ({ ...d, selectedFieldId: id })), []);

  const openNotification = useCallback((id: string) => {
    setData((d) => ({ ...d, notifications: d.notifications.map((n) => n.id === id ? { ...n, read: true } : n) }));
  }, []);

  const saveSharing = useCallback((prefs: Omit<SharingPrefs, 'updatedAt'>) => {
    setData((d) => ({ ...d, sharing: { ...prefs, updatedAt: new Date().toISOString() } }));
  }, []);

  const stopSharing = useCallback(() => {
    setData((d) => ({ ...d, sharing: { ...d.sharing, enabled: false, fieldIds: [], updatedAt: new Date().toISOString() } }));
  }, []);

  const resetDemoData = useCallback(() => setData(createDemoWorkspace()), []);

  const value = useMemo<AppContextValue>(() => {
    const activeFields = data.fields.filter((f) => !f.archived);
    const selectedField = activeFields.find((f) => f.id === data.selectedFieldId) ?? null;
    return {
      ...data,
      isDemo: session.mode === 'demo',
      activeFields,
      selectedField,
      getFieldById: (id) => data.fields.find((f) => f.id === id),
      setSelectedFieldId,
      updateProfile,
      addField,
      updateField,
      archiveField,
      restoreField,
      addObservation,
      updateObservation,
      unreadCount: data.notifications.filter((n) => !n.read).length,
      openNotification,
      saveSharing,
      stopSharing,
      resetDemoData,
      syncState,
      setSyncState,
      retrying,
      retrySync,
      storageError,
      retryStorage: () => persist(data),
      simulateStorageFailure,
      setSimulateStorageFailure
    };
  }, [
  data,
  session.mode,
  setSelectedFieldId,
  updateProfile,
  addField,
  updateField,
  archiveField,
  restoreField,
  addObservation,
  updateObservation,
  openNotification,
  saveSharing,
  stopSharing,
  resetDemoData,
  syncState,
  setSyncState,
  retrying,
  retrySync,
  storageError,
  persist,
  simulateStorageFailure]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}