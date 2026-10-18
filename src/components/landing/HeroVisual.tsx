import React, { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { images } from '../../data/images';
import { PhoneResultPreview } from './PhoneResultPreview';

const FOOTPRINT = '36,52 80,45 90,64 44,73';
const DRONE_POINT = { x: 68, y: 33 };

export function HeroVisual() {
  const reduce = useReducedMotion();
  const clipId = `hero${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const corners = FOOTPRINT.split(' ').map((p) => p.split(',').map(Number));

  return (
    <div className="relative h-[340px] w-full min-[390px]:h-[364px] sm:h-[460px] lg:h-[580px]">
      <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-primary-dark shadow-card">
        <img
          src={images.heroAerial}
          alt="Aerial view of green rice fields beside a river (illustrative)"
          className="h-full w-full object-cover"
          decoding="async" />
        
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <clipPath id={clipId}>
              <polygon points={FOOTPRINT} />
            </clipPath>
          </defs>
          <polygon points="16,48 86,37 98,72 24,86" fill="none" stroke="#fff" strokeOpacity={0.85} strokeWidth={1.5} strokeDasharray="6 4" vectorEffect="non-scaling-stroke" />
          {corners.map(([x, y]) =>
          <line key={`${x}-${y}`} x1={DRONE_POINT.x} y1={DRONE_POINT.y} x2={x} y2={y} stroke="#fff" strokeOpacity={0.35} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          )}
          <polygon points={FOOTPRINT} fill="rgba(255,255,255,0.16)" stroke="#fff" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          {!reduce &&
          <g clipPath={`url(#${clipId})`}>
              <motion.rect
              y={40}
              width={7}
              height={40}
              fill="rgba(231,184,68,0.38)"
              initial={{ x: 32 }}
              animate={{ x: [32, 88] }}
              transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }} />
            
            </g>
          }
        </svg>
      </div>

      <motion.div
        className="pointer-events-none absolute right-[3%] top-[2%] w-[50%] max-w-[360px] sm:w-[44%]"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 3.4, ease: 'easeInOut', repeat: Infinity }}>
        
        <img src={images.surveyDrone} alt="Agricultural surveying drone (illustrative)" className="w-full mix-blend-multiply" />
      </motion.div>

      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
        <PhoneResultPreview className="w-[108px] text-[8.5px] min-[390px]:w-[116px] min-[390px]:text-[9px] sm:w-[148px] sm:text-[11.5px] lg:w-[184px] lg:text-[14px]" />
      </div>

      <span className="absolute bottom-3 right-3 rounded-full bg-ink/75 px-2.5 py-1 text-[13px] font-medium text-white sm:bottom-4 sm:right-4">
        Illustrative imagery · Demo data
      </span>
    </div>);

}