import React from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon } from 'lucide-react';

interface PrimaryActionCardProps {
  title: string;
  description: string;
  actionLabel: string;
  to: string;
  supportLabel?: string;
  image?: string;
}

export function PrimaryActionCard({ title, description, actionLabel, to, supportLabel, image }: PrimaryActionCardProps) {
  return (
    <section aria-labelledby="primary-action-title" className="rounded-card bg-primary p-5 text-white shadow-cta">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <h2 id="primary-action-title" className="text-[22px] font-bold leading-tight min-[390px]:text-[24px]">
            {title}
          </h2>
          <p className="mt-2 text-[16px] leading-snug text-white/90">{description}</p>
        </div>
        {image &&
        <img
          src={image}
          alt=""
          className="h-[76px] w-[76px] shrink-0 rounded-2xl object-cover ring-2 ring-white/25 min-[390px]:h-[84px] min-[390px]:w-[84px]" />

        }
      </div>
      <Link
        to={to}
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-accent text-[18px] font-bold text-primary-dark transition-transform duration-150 ease-out active:scale-[0.98]">
        
        <CameraIcon className="h-6 w-6" aria-hidden />
        {actionLabel}
      </Link>
      {supportLabel && <p className="mt-3 text-center text-[14px] font-medium text-white/85">{supportLabel}</p>}
    </section>);

}