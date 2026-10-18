import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { StorageBanner } from './StorageBanner';

/** Full-screen task layout for forms: no bottom navigation, so sticky actions never cover it. */
export function FormShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-primary-soft">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[640px] flex-col bg-canvas md:border-x md:border-line">
        <StorageBanner />
        <Outlet />
      </div>
    </div>);

}