import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../../contexts/SessionContext';
import { BrandMark } from '../BrandMark';
import { LandingContainer } from './LandingContainer';

const links = [
{ href: '#products', label: 'Mobile screening' },
{ href: '#drone-showcase', label: 'Drone insights' },
{ href: '#institutions', label: 'For teams' }];


export function LandingNav() {
  const { session } = useSession();
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      <LandingContainer className="flex h-16 items-center justify-between gap-3">
        <BrandMark />
        <nav aria-label="Overview sections" className="hidden items-center gap-1 md:flex">
          {links.map((l) =>
          <a key={l.href} href={l.href} className="flex h-12 items-center rounded-xl px-3 text-[15px] font-semibold text-ink-muted hover:text-primary-dark">
              {l.label}
            </a>
          )}
        </nav>
        <Link
          to={session ? '/' : '/signin'}
          className="flex h-12 items-center rounded-xl border border-line bg-card px-4 text-[15px] font-bold text-primary">
          
          {session ? 'Open app' : 'Sign in'}
        </Link>
      </LandingContainer>
    </header>);

}