import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppProvider } from '../../contexts/AppContext';
import { useSession } from '../../contexts/SessionContext';

export function RequireSession() {
  const { session, onboardingDone, currentAccount, initialSyncState } = useSession();
  if (!session) return <Navigate to={onboardingDone ? '/signin' : '/welcome'} replace />;
  return (
    <AppProvider key={session.workspaceId} session={session} account={currentAccount} initialSyncState={initialSyncState}>
      <Outlet />
    </AppProvider>);

}