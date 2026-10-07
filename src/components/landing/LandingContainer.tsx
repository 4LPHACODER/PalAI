import React, { ReactNode } from 'react';

export function LandingContainer({ children, className = '' }: {children: ReactNode;className?: string;}) {
  return <div className={`mx-auto w-full max-w-6xl px-4 min-[390px]:px-5 md:px-8 ${className}`}>{children}</div>;
}