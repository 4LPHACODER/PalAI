import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

export function RequireProfile() {
  const { profile } = useApp();
  if (!profile.setupComplete) return <Navigate to="/setup" replace />;
  return <Outlet />;
}