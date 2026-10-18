import React, { useState } from 'react';
import { BellIcon, ChevronRightIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useT } from '../hooks/useT';
import { AppNotification } from '../types/farm';
import { notificationTime } from '../utils/format';
import { BottomSheet } from './BottomSheet';

interface NotificationSheetProps {
  open: boolean;
  onClose: () => void;
  onAction: (notification: AppNotification) => void;
}

export function NotificationSheet({ open, onClose, onAction }: NotificationSheetProps) {
  const t = useT();
  const { notifications, unreadCount, openNotification, getFieldById } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <BottomSheet open={open} onClose={onClose} title={t('notif.title')}>
      <p className="text-[14px] text-ink-muted">
        {unreadCount > 0 ? t('notif.unread', { n: unreadCount }) : t('notif.caught')} · {t('notif.sample')}
      </p>
      <ul className="mt-2 divide-y divide-line">
        {notifications.map((n) => {
          const expanded = expandedId === n.id;
          const vars = { field: getFieldById(n.fieldId)?.name ?? '' };
          return (
            <li key={n.id}>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => {
                  openNotification(n.id);
                  setExpandedId(expanded ? null : n.id);
                }}
                className="flex min-h-[64px] w-full items-start gap-3 py-3 text-left">
                
                <span
                  className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                  n.read ? 'bg-canvas text-ink-muted' : 'bg-primary-soft text-primary'}`
                  }>
                  
                  <BellIcon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className={`text-[16px] leading-snug ${n.read ? 'font-medium text-ink' : 'font-bold text-primary-dark'}`}>
                      {t(n.titleKey, vars)}
                    </span>
                    {!n.read &&
                    <span className="shrink-0 rounded-full bg-danger px-2 py-0.5 text-[12px] font-bold text-white">{t('notif.new')}</span>
                    }
                  </span>
                  <span className={`mt-0.5 block text-[15px] leading-snug text-ink-muted ${expanded ? '' : 'line-clamp-2'}`}>
                    {t(n.bodyKey, vars)}
                  </span>
                  <span className="mt-1 block text-[13px] text-ink-muted">{notificationTime(n.time)}</span>
                </span>
              </button>
              {expanded && n.target &&
              <button
                type="button"
                onClick={() => onAction(n)}
                className="mb-3 ml-[52px] flex min-h-[48px] items-center gap-1 rounded-xl bg-primary px-4 py-2 text-left text-[15px] font-bold text-white">
                
                  {t(n.target.labelKey)}
                  <ChevronRightIcon className="h-4 w-4 shrink-0" aria-hidden />
                </button>
              }
            </li>);

        })}
      </ul>
    </BottomSheet>);

}