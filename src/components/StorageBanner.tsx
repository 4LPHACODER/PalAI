import React from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function StorageBanner() {
  const { storageError, retryStorage } = useApp();
  if (!storageError) return null;
  return (
    <div role="alert" className="flex items-center gap-3 bg-danger-soft px-4 pb-2 pt-[calc(env(safe-area-inset-top)+8px)] min-[390px]:px-5">
      <AlertCircleIcon className="h-5 w-5 shrink-0 text-danger" aria-hidden />
      <p className="min-w-0 flex-1 text-[14px] font-medium leading-snug text-danger">
        Couldn’t save on this device. Your latest changes may be lost if you close the app.
      </p>
      <button type="button" onClick={retryStorage} className="h-12 shrink-0 rounded-xl bg-card px-4 text-[15px] font-bold text-danger">
        Retry
      </button>
    </div>);

}