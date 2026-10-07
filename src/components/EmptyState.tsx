import React, { ReactNode } from "react";
import { BoxIcon } from "lucide-react";
interface EmptyStateProps {
  icon: BoxIcon;
  title: string;
  description: string;
  tone?: 'default' | 'error';
  action?: ReactNode;
  bordered?: boolean;
}
export function EmptyState({
  icon: Icon,
  title,
  description,
  tone = 'default',
  action,
  bordered = false
}: EmptyStateProps) {
  return <div role={tone === 'error' ? 'alert' : undefined} className={`flex flex-col items-center px-5 py-8 text-center ${bordered ? 'rounded-card border border-dashed border-line bg-card' : ''}`}>
      <span className={`grid h-14 w-14 place-items-center rounded-full ${tone === 'error' ? 'bg-danger-soft text-danger' : 'bg-primary-soft text-primary'}`}>
        <Icon className="h-7 w-7" aria-hidden />
      </span>
      <p className="mt-3 text-[18px] font-bold text-primary-dark">{title}</p>
      <p className="mt-1 max-w-[320px] text-[15px] leading-relaxed text-ink-muted">{description}</p>
      {action && <div className="mt-5 w-full max-w-[320px]">{action}</div>}
    </div>;
}