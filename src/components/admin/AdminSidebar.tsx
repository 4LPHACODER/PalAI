import { Link } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  RadioIcon,
  ScanIcon,
  UploadCloudIcon,
  FolderArchiveIcon,
  FileSpreadsheetIcon,
  SlidersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  CpuIcon,
  LucideIcon
} from 'lucide-react';

export type AdminTab =
  | 'overview'
  | 'monitoring'
  | 'insights'
  | 'upload'
  | 'records'
  | 'reports'
  | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  backTo: string;
  backLabel: string;
}

interface NavItem {
  id: AdminTab;
  label: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboardIcon },
  { id: 'monitoring', label: 'Drone Monitoring', icon: RadioIcon, badge: 'Standby', badgeColor: 'bg-warn-soft text-warn' },
  { id: 'insights', label: 'Field Insights', icon: ScanIcon, badge: '4 Views', badgeColor: 'bg-primary-soft text-primary' },
  { id: 'upload', label: 'Image Analysis', icon: UploadCloudIcon },
  { id: 'records', label: 'Survey Records', icon: FolderArchiveIcon, badge: '2', badgeColor: 'bg-canvas text-ink-muted' },
  { id: 'reports', label: 'Reports', icon: FileSpreadsheetIcon },
  { id: 'settings', label: 'Settings', icon: SlidersIcon },
];

export function AdminSidebar({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  backTo,
  backLabel,
}: AdminSidebarProps) {
  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto bg-card border-r border-line py-5 px-3 select-none">
      {/* Top Header / Branding */}
      <div>
        <div className={`flex items-center gap-3 px-2 mb-6 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-cta" aria-hidden>
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                <path d="M5 20.5C5.5 12.5 10.5 5.5 19.5 3.5C19 12 13.5 18.5 5 20.5Z" fill="#FFFFFF" />
                <path d="M5.5 20L15.5 8" stroke="#236B3B" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="18.5" cy="18" r="2" fill="#E7B844" />
              </svg>
            </span>
            {!collapsed && (
              <div className="leading-tight">
                <span className="block text-[18px] font-extrabold tracking-tight text-primary-dark">PalAI</span>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-primary">
                  Admin Dashboard
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:grid h-7 w-7 place-items-center rounded-lg text-ink-muted hover:bg-canvas hover:text-ink transition-colors"
          >
            {collapsed ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
          </button>
        </div>

        {/* Section title (when expanded) */}
        {!collapsed && (
          <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            Drone Operations
          </p>
        )}

        {/* Navigation Items */}
        <nav aria-label="Admin sidebar" className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                title={collapsed ? item.label : undefined}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm font-semibold'
                    : 'text-ink hover:bg-canvas active:bg-primary-soft/50'
                } ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                    isActive ? 'bg-white/15 text-white' : 'text-primary group-hover:text-primary-dark'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>

                {!collapsed && (
                  <span className="flex-1 truncate leading-tight flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : item.badgeColor ?? 'bg-canvas text-ink-muted'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Back & System Notice */}
      <div className="pt-4 border-t border-line space-y-2">
        <Link
          to={backTo}
          title={collapsed ? backLabel : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-ink-muted hover:text-primary hover:bg-canvas transition-colors ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          <ArrowLeftIcon className="h-4 w-4 shrink-0" aria-hidden />
          {!collapsed && <span className="truncate">{backLabel}</span>}
        </Link>

        {!collapsed && (
          <div className="rounded-xl bg-canvas p-2.5 border border-line text-[11px] leading-snug text-ink-muted">
            <div className="flex items-center gap-1.5 font-bold text-ink">
              <CpuIcon className="h-3.5 w-3.5 text-primary" aria-hidden />
              <span>LYZRC L600 Pro</span>
            </div>
            <span className="block mt-0.5 text-[10px] text-ink-muted">
              Companion: RX Drone GPS · Frontend Demo
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out sticky top-0 h-screen ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          role="presentation"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-card shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
