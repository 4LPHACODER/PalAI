import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon, LucideIcon } from "lucide-react";
interface SettingsRowProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  description?: string;
  badge?: ReactNode;
  onClick?: () => void;
  to?: string;
}
export function SettingsRow({
  icon: Icon,
  label,
  value,
  description,
  badge,
  onClick,
  to
}: SettingsRowProps) {
  const content = <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[16px] font-semibold text-ink">{label}</span>
          {badge}
        </span>
        {description && <span className="mt-0.5 block text-[14px] leading-snug text-ink-muted">{description}</span>}
      </span>
      {value && <span className="max-w-[40%] truncate text-[14px] text-ink-muted">{value}</span>}
      <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
    </>;
  const cls = 'flex min-h-[60px] w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 active:bg-canvas';
  if (to) {
    return <Link to={to} className={cls}>
        {content}
      </Link>;
  }
  return <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>;
}