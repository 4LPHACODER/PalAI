import React from "react";
import { NavLink } from "react-router-dom";
import { CameraIcon, HistoryIcon, HomeIcon, SproutIcon, UserRoundIcon, BoxIcon } from "lucide-react";
import { TKey } from "../data/translations";
import { useT } from "../hooks/useT";
interface NavItem {
  to: string;
  labelKey: TKey;
  icon: BoxIcon;
  primary?: boolean;
}
const items: NavItem[] = [{
  to: '/',
  labelKey: 'nav.home',
  icon: HomeIcon
}, {
  to: '/fields',
  labelKey: 'nav.fields',
  icon: SproutIcon
}, {
  to: '/scan',
  labelKey: 'nav.scan',
  icon: CameraIcon,
  primary: true
}, {
  to: '/records',
  labelKey: 'nav.records',
  icon: HistoryIcon
}, {
  to: '/profile',
  labelKey: 'nav.profile',
  icon: UserRoundIcon
}];
export function BottomNav() {
  const t = useT();
  return <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[640px] border-t border-line bg-card shadow-nav pb-[env(safe-area-inset-bottom)]">
      <ul className="grid h-[72px] grid-cols-5 items-center px-1">
        {items.map((item) => {
        const Icon = item.icon;
        const label = t(item.labelKey);
        return <li key={item.to} className="flex h-full items-center justify-center">
              <NavLink to={item.to} end={item.to === '/'} className="group flex h-full w-full items-center justify-center px-0.5">
                {({
              isActive
            }) => item.primary ? <span className={`flex h-[58px] w-full max-w-[76px] flex-col items-center justify-center gap-0.5 rounded-2xl bg-primary text-white shadow-cta transition-transform duration-150 ease-out group-active:scale-95 ${isActive ? 'ring-2 ring-accent ring-offset-2 ring-offset-card' : ''}`}>
                      <Icon className="h-6 w-6" strokeWidth={2.2} aria-hidden />
                      <span className="text-[13px] font-semibold">{label}</span>
                    </span> : <span className={`flex flex-col items-center gap-1 whitespace-nowrap text-[13px] transition-colors duration-150 ${isActive ? 'font-bold text-primary' : 'font-medium text-ink-muted'}`}>
                      <span className={`grid h-8 w-14 place-items-center rounded-full transition-colors duration-150 ${isActive ? 'bg-primary-soft' : ''}`}>
                        <Icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.4 : 2} aria-hidden />
                      </span>
                      {label}
                    </span>}
              </NavLink>
            </li>;
      })}
      </ul>
    </nav>;
}