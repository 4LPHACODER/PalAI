import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../contexts/SessionContext';

export function PublicOnly() {
  const { session } = useSession();
  if (session) return <Navigate to="/" replace />;
  return <Outlet />;
}