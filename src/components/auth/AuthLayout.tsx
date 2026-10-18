import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, GlobeIcon } from 'lucide-react';
import { useSession } from '../../contexts/SessionContext';
import { languageOptions } from '../../data/translations';
import { BrandMark } from '../BrandMark';
import { LanguageSheet } from '../LanguageSheet';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, backTo, children }: AuthLayoutProps) {
  const { language } = useSession();
  const [langOpen, setLangOpen] = useState(false);
  const langLabel = languageOptions.find((l) => l.code === language)?.label ?? 'English';

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-primary-soft">
      <div className="mx-auto flex min-h-screen w-full max-w-[640px] flex-col bg-canvas md:border-x md:border-line">
        <header className="flex items-center justify-between gap-2 px-4 pt-[calc(env(safe-area-inset-top)+12px)] min-[390px]:px-5 md:px-8">
          {backTo ?
          <Link to={backTo} aria-label="Go back" className="-ml-3 grid h-12 w-12 place-items-center rounded-full text-primary-dark active:bg-primary-soft">
              <ChevronLeftIcon className="h-7 w-7" aria-hidden />
            </Link> :

          <BrandMark />
          }
          <button
            type="button"
            onClick={() => setLangOpen(true)}
            className="-mr-2 flex h-12 items-center gap-1.5 rounded-xl px-3 text-[15px] font-semibold text-primary active:bg-primary-soft">
            
            <GlobeIcon className="h-5 w-5" aria-hidden />
            {langLabel}
          </button>
        </header>

        <main className="flex-1 px-4 pb-8 pt-6 min-[390px]:px-5 md:px-8">
          {backTo &&
          <div className="mb-5">
              <BrandMark showTagline />
            </div>
          }
          <h1 className="text-[26px] font-bold leading-tight text-primary-dark">{title}</h1>
          {subtitle && <p className="mt-1.5 text-[16px] leading-relaxed text-ink-muted">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </main>

        <footer className="px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] text-center text-[13px] leading-relaxed text-ink-muted min-[390px]:px-5">
          Prototype · Accounts are simulated and kept only on this device.
        </footer>
      </div>
      <LanguageSheet open={langOpen} onClose={() => setLangOpen(false)} />
    </div>);

}