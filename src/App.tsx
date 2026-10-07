import React, { useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppShell } from './components/AppShell';
import { FormShell } from './components/FormShell';
import { PublicOnly } from './components/routing/PublicOnly';
import { RequireProfile } from './components/routing/RequireProfile';
import { RequireSession } from './components/routing/RequireSession';
import { SessionProvider } from './contexts/SessionContext';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Onboarding } from './pages/auth/Onboarding';
import { ProfileSetup } from './pages/auth/ProfileSetup';
import { Register } from './pages/auth/Register';
import { SignIn } from './pages/auth/SignIn';
import { DataSharing } from './pages/DataSharing';
import { FieldDetail } from './pages/fields/FieldDetail';
import { FieldForm } from './pages/fields/FieldForm';
import { Fields } from './pages/fields/Fields';
import { ObservationForm } from './pages/fields/ObservationForm';
import { Home } from './pages/Home';
import { DroneInsights } from './pages/landing/DroneInsights';
import { Landing } from './pages/landing/Landing';
import { Profile } from './pages/Profile';
import { ProfileEdit } from './pages/ProfileEdit';
import { Records } from './pages/Records';
import { Scan } from './pages/Scan';
import { Workspace } from './pages/Workspace';

const routes = [
{ path: '/landing', element: <Landing /> },
{ path: '/drone-insights', element: <DroneInsights /> },
{ path: '/welcome', element: <Onboarding /> },
{
  element: <PublicOnly />,
  children: [
  { path: '/signin', element: <SignIn /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> }]

},
{
  element: <RequireSession />,
  children: [
  { path: '/setup', element: <ProfileSetup /> },
  {
    element: <RequireProfile />,
    children: [
    {
      element: <AppShell />,
      children: [
      { path: '/', element: <Home /> },
      { path: '/fields', element: <Fields /> },
      { path: '/fields/:fieldId', element: <FieldDetail /> },
      { path: '/scan', element: <Scan /> },
      { path: '/records', element: <Records /> },
      { path: '/profile', element: <Profile /> },
      { path: '/workspace', element: <Workspace /> }]

    },
    {
      element: <FormShell />,
      children: [
      { path: '/fields/new', element: <FieldForm mode="new" /> },
      { path: '/fields/:fieldId/edit', element: <FieldForm mode="edit" /> },
      { path: '/fields/:fieldId/observations/new', element: <ObservationForm /> },
      { path: '/fields/:fieldId/observations/:observationId', element: <ObservationForm /> },
      { path: '/profile/edit', element: <ProfileEdit /> },
      { path: '/profile/sharing', element: <DataSharing /> }]

    }]

  }]

},
{ path: '*', element: <Navigate to="/" replace /> }];


interface AppProps {
  syncState?: 'synced' | 'offline' | 'pending' | 'failed';
  startScreen?: 'landing' | 'auto' | 'onboarding' | 'demoHome';
}

export function App({ syncState = 'synced', startScreen = 'landing' }: AppProps) {
  const [router] = useState(() => {
    if (startScreen === 'landing' && window.location.pathname === '/') {
      window.history.replaceState(null, '', '/landing');
    }
    return createBrowserRouter(routes);
  });

  return (
    <SessionProvider initialSyncState={syncState} startScreen={startScreen === 'landing' ? 'auto' : startScreen}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        offset={16}
        toastOptions={{
          style: {
            borderRadius: '16px',
            border: '1px solid #DFE8DF',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '15px',
            color: '#202B23'
          }
        }} />
      
    </SessionProvider>);

}