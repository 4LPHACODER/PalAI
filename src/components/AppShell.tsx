import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { StorageBanner } from './StorageBanner';

export function AppShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-primary-soft">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[640px] flex-col bg-canvas md:border-x md:border-line">
        <StorageBanner />
        <main className="flex-1 pb-[calc(96px+env(safe-area-inset-bottom))]">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>);

}