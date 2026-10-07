import React, { useEffect, useState } from 'react';
import { WifiOffIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function OfflineFormNote() {
  const { syncState } = useApp();
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  if (online && syncState !== 'offline') return null;
  return (
    <p className="mb-4 flex gap-2 rounded-2xl border border-line bg-card p-3 text-[14px] leading-snug text-ink-muted">
      <WifiOffIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      You’re offline. You can keep filling in this form — it is saved on this device.
    </p>);

}