import React from 'react';
import { BellIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { BrandMark } from './BrandMark';
import { DemoTag } from './DemoTag';

export function AppHeader({ onOpenNotifications }: {onOpenNotifications: () => void;}) {
  const { unreadCount, isDemo } = useApp();
  return (
    <header className="flex items-center justify-between gap-2 pt-[calc(env(safe-area-inset-top)+12px)]">
      <BrandMark />
      <div className="flex items-center gap-1">
        {isDemo && <DemoTag />}
        <button
          type="button"
          onClick={onOpenNotifications}
          aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : 'Notifications'}
          className="relative -mr-2 grid h-12 w-12 place-items-center rounded-full text-primary-dark active:bg-primary-soft">
          
          <BellIcon className="h-6 w-6" aria-hidden />
          {unreadCount > 0 &&
          <span className="absolute right-1.5 top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-danger px-1 text-[12px] font-bold text-white ring-2 ring-canvas">
              {unreadCount}
            </span>
          }
        </button>
      </div>
    </header>);

}