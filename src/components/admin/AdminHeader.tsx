import { useState, useRef, useEffect } from 'react';
import {
  MenuIcon,
  BellIcon,
  RadioIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  AlertTriangleIcon
} from 'lucide-react';
import { AdminTab } from './AdminSidebar';
import { ConnectionStatus } from '../../types/droneConnection';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onOpenMobile: () => void;
  onOpenDroneConnectModal: () => void;
  onNavigateTab: (tab: AdminTab) => void;
  connectionStatus?: ConnectionStatus;
}

const tabTitles: Record<AdminTab, { title: string; breadcrumb: string }> = {
  overview: { title: 'Dashboard Overview', breadcrumb: 'Dashboard' },
  monitoring: { title: 'Live Drone Monitoring', breadcrumb: 'Drone Monitoring' },
  insights: { title: 'Drone Field Insights', breadcrumb: 'Field Insights' },
  upload: { title: 'Image Capture & Upload', breadcrumb: 'Image Analysis' },
  records: { title: 'Drone Survey Records', breadcrumb: 'Survey Records' },
  reports: { title: 'Action Reports Generator', breadcrumb: 'Reports' },
  settings: { title: 'Drone & System Settings', breadcrumb: 'Settings' },
};

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: 'alert' | 'info' | 'hardware';
  targetTab?: AdminTab;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'High-Priority Anomaly Flagged',
    description: 'Riverside Plot Area A canal-side cluster identified for ground inspection.',
    time: '2 hours ago',
    unread: true,
    type: 'alert',
    targetTab: 'insights',
  },
  {
    id: 'n2',
    title: 'LYZRC L600 Pro Integration Ready',
    description: 'Frontend telemetry interface staged for RX Drone GPS companion protocol.',
    time: '1 day ago',
    unread: true,
    type: 'hardware',
    targetTab: 'monitoring',
  },
  {
    id: 'n3',
    title: 'Local Browser Storage Active',
    description: 'Demonstration survey cached in browser session memory.',
    time: '2 days ago',
    unread: false,
    type: 'info',
    targetTab: 'overview',
  },
];

export function AdminHeader({
  activeTab,
  onOpenMobile,
  onOpenDroneConnectModal,
  onNavigateTab,
  connectionStatus = 'disconnected',
}: AdminHeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-line bg-card/95 px-4 md:px-6 backdrop-blur">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Open sidebar menu"
          className="grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-canvas lg:hidden"
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex items-center gap-1.5 text-[13px] text-ink-muted">
            <li className="font-semibold text-primary-dark">PalAI Admin</li>
            <li aria-hidden="true" className="text-line">/</li>
            <li className="hidden sm:inline-block">Drone Operations</li>
            <li aria-hidden="true" className="hidden sm:inline-block text-line">/</li>
            <li className="font-bold text-ink truncate max-w-[160px] sm:max-w-none">
              {tabTitles[activeTab]?.breadcrumb ?? 'Dashboard'}
            </li>
          </ol>
          <h1 className="sr-only">{tabTitles[activeTab]?.title}</h1>
        </nav>
      </div>

      {/* Right: Status Pill, Notifications, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Drone Connection Status Indicator Pill */}
        <button
          type="button"
          onClick={onOpenDroneConnectModal}
          title="Click to configure IP and view connection diagnostics"
          className={`group flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors border ${
            connectionStatus === 'connected'
              ? 'border-primary/40 bg-primary-soft/80 text-primary hover:bg-primary-soft'
              : connectionStatus === 'connecting'
              ? 'border-accent/40 bg-warn-soft/80 text-warn hover:bg-warn-soft'
              : connectionStatus === 'connection_failed'
              ? 'border-danger/40 bg-danger-soft/80 text-danger hover:bg-danger-soft'
              : 'border-danger/30 bg-danger-soft/60 text-danger hover:bg-danger-soft'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                connectionStatus === 'connected'
                  ? 'animate-ping bg-primary'
                  : connectionStatus === 'connecting'
                  ? 'animate-ping bg-warn'
                  : 'animate-ping bg-danger'
              }`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                connectionStatus === 'connected'
                  ? 'bg-primary'
                  : connectionStatus === 'connecting'
                  ? 'bg-warn'
                  : 'bg-danger'
              }`}
            />
          </span>
          <span className="hidden min-[480px]:inline font-bold">LYZRC L600 Pro</span>
          <span className="font-medium">
            {connectionStatus === 'connected'
              ? 'Live Stream'
              : connectionStatus === 'connecting'
              ? 'Connecting...'
              : connectionStatus === 'connection_failed'
              ? 'Stream Error'
              : 'Disconnected'}
          </span>
        </button>

        {/* Notifications Icon & Popover */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((prev) => !prev)}
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={notifOpen}
            className="relative grid h-10 w-10 place-items-center rounded-xl text-ink-muted hover:bg-canvas hover:text-ink active:bg-primary-soft transition-colors"
          >
            <BellIcon className="h-5 w-5" aria-hidden />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-line bg-card p-3 shadow-2xl animate-fade-in">
              <div className="flex items-center justify-between border-b border-line pb-2.5 px-2">
                <div>
                  <h4 className="text-[14px] font-bold text-primary-dark">Admin Notifications</h4>
                  <p className="text-[11px] text-ink-muted">Simulated operational telemetry alerts</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-[12px] font-semibold text-primary hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="mt-2 divide-y divide-line max-h-80 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.targetTab) onNavigateTab(item.targetTab);
                      setNotifOpen(false);
                    }}
                    className={`flex cursor-pointer items-start gap-3 p-2.5 rounded-xl transition-colors hover:bg-canvas ${
                      item.unread ? 'bg-primary-soft/30' : ''
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg mt-0.5 ${
                        item.type === 'alert'
                          ? 'bg-danger-soft text-danger'
                          : item.type === 'hardware'
                          ? 'bg-warn-soft text-warn'
                          : 'bg-primary-soft text-primary'
                      }`}
                    >
                      {item.type === 'alert' ? (
                        <AlertTriangleIcon className="h-4 w-4" />
                      ) : (
                        <RadioIcon className="h-4 w-4" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[13px] font-bold text-ink truncate">{item.title}</span>
                        {item.unread && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-[12px] text-ink-muted leading-snug mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                      <span className="mt-1 block text-[11px] text-ink-muted/80">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Administrator Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-expanded={profileOpen}
            className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-canvas active:bg-primary-soft transition-colors"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-bold text-white text-[13px] shadow-sm">
              MS
            </span>
            <div className="hidden text-left md:block leading-tight">
              <span className="block text-[13px] font-bold text-ink">Dr. Maria Santos</span>
              <span className="block text-[11px] font-semibold text-primary">System Admin</span>
            </div>
            <ChevronDownIcon className="hidden sm:block h-4 w-4 text-ink-muted" aria-hidden />
          </button>

          {/* Profile Menu Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-line bg-card p-3 shadow-2xl animate-fade-in">
              <div className="border-b border-line pb-3 px-2">
                <span className="inline-block rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-bold text-primary">
                  System Administrator
                </span>
                <p className="mt-1 text-[14px] font-bold text-primary-dark">Dr. Maria Santos</p>
                <p className="text-[12px] text-ink-muted truncate">m.santos@agri-lab.gov.ph</p>
              </div>

              <div className="mt-2 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    onNavigateTab('settings');
                    setProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] font-medium text-ink hover:bg-canvas transition-colors"
                >
                  <ShieldCheckIcon className="h-4 w-4 text-primary" />
                  <span>Admin Privileges Active</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigateTab('monitoring');
                    setProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] font-medium text-ink hover:bg-canvas transition-colors"
                >
                  <RadioIcon className="h-4 w-4 text-primary" />
                  <span>Drone Station Control</span>
                </button>
              </div>

              <div className="mt-2 border-t border-line pt-2">
                <span className="block px-2 text-[11px] text-ink-muted">
                  Session role: Full Frontend Admin
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
