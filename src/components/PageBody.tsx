import React, { ReactNode } from 'react';

/** Shared horizontal padding for every screen: 16px at 360, 20px from 390, wider on tablets. */
export function PageBody({ children, className = '' }: {children: ReactNode;className?: string;}) {
  return <div className={`px-4 min-[390px]:px-5 md:px-8 ${className}`}>{children}</div>;
}