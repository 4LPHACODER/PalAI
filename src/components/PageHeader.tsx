import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  right?: ReactNode;
}

export function PageHeader({ title, subtitle, backTo, right }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+12px)] backdrop-blur min-[390px]:px-5 md:px-8">
      <div className="flex min-h-[48px] items-center gap-2">
        {backTo &&
        <Link
          to={backTo}
          aria-label="Go back"
          className="-ml-3 grid h-12 w-12 shrink-0 place-items-center rounded-full text-primary-dark active:bg-primary-soft">
          
            <ChevronLeftIcon className="h-7 w-7" aria-hidden />
          </Link>
        }
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[24px] font-bold leading-tight text-primary-dark">{title}</h1>
          {subtitle && <p className="truncate text-[14px] text-ink-muted">{subtitle}</p>}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </header>);

}