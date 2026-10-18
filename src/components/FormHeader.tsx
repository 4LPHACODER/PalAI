import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { XIcon } from 'lucide-react';
import { useT } from '../hooks/useT';

interface FormHeaderProps {
  title: string;
  subtitle?: string;
  cancelTo: string;
  children?: ReactNode;
}

/** Sticky header for full-screen forms with a close action (guarded by unsaved-changes checks). */
export function FormHeader({ title, subtitle, cancelTo, children }: FormHeaderProps) {
  const t = useT();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 px-4 pb-2 pt-[calc(env(safe-area-inset-top)+12px)] backdrop-blur min-[390px]:px-5 md:px-8">
      <div className="flex min-h-[48px] items-center gap-2">
        <Link to={cancelTo} aria-label={t('common.close')} className="-ml-3 grid h-12 w-12 shrink-0 place-items-center rounded-full text-primary-dark active:bg-primary-soft">
          <XIcon className="h-6 w-6" aria-hidden />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="text-[22px] font-bold leading-tight text-primary-dark">{title}</h1>
          {subtitle && <p className="truncate text-[14px] text-ink-muted">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="mt-1">{children}</div>}
    </header>);

}