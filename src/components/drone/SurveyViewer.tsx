import React, { useId, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MapPinIcon } from 'lucide-react';
import { images } from '../../data/images';
import { surveyViews } from '../../data/surveyViews';
import { DroneSurvey, InspectionArea, LinkedRecord, SurveyView } from '../../types/drone';
import { shortDate } from '../../utils/format';
import { buildDirectionArrows, buildFlightPath, buildFootprints, priorityMeta } from '../../utils/survey';

interface SurveyViewerProps {
  survey: DroneSurvey;
  view: SurveyView;
  showBoundary?: boolean;
  showMarkers?: boolean;
  selectedAreaId?: string | null;
  onSelectArea?: (area: InspectionArea) => void;
  onSelectRecord?: (record: LinkedRecord) => void;
  lazy?: boolean;
  /** No rounded corners or corner labels — for embedding inside a cropped card visual. */
  bare?: boolean;
  className?: string;
}

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.24, ease: 'easeOut' } };

/** Recorded-survey preview with aligned overlays. Not a drone-control interface. */
export function SurveyViewer({
  survey,
  view,
  showBoundary = true,
  showMarkers = false,
  selectedAreaId = null,
  onSelectArea,
  onSelectRecord,
  lazy = false,
  bare = false,
  className = ''
}: SurveyViewerProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const msId = `ms${uid}`;
  const blurId = `bl${uid}`;
  const footprints = useMemo(() => buildFootprints(survey), [survey]);
  const path = useMemo(() => buildFlightPath(survey), [survey]);
  const arrows = useMemo(() => buildDirectionArrows(survey), [survey]);
  const showDrone = view === 'aerial' || view === 'coverage';
  const showStress = view === 'multispectral' || view === 'priorities';
  const showAreas = view === 'priorities';
  const dfw = 22;
  const dfh = 18;

  return (
    <div className={`relative aspect-square w-full overflow-hidden bg-primary-dark ${bare ? '' : 'rounded-card'} ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id={msId} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="-1.4 1.9 -0.3 0 0.05  -1.4 1.9 -0.3 0 0.05  -1.4 1.9 -0.3 0 0.05  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.78 0.93 0.96 0.55 0.13" />
            <feFuncG type="table" tableValues="0.2 0.45 0.82 0.78 0.52" />
            <feFuncB type="table" tableValues="0.12 0.12 0.22 0.25 0.22" />
          </feComponentTransfer>
        </filter>
      </svg>

      <img
        src={survey.image}
        alt={`Illustrative top-down survey image of ${survey.site}`}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover" />
      
      <AnimatePresence>
        {view === 'multispectral' &&
        <motion.img
          key="ms"
          {...fade}
          src={survey.image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: `url(#${msId})` }} />

        }
      </AnimatePresence>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <AnimatePresence>
          {showStress &&
          <motion.g key="stress" {...fade} filter={`url(#${blurId})`}>
              {survey.stress.map((p, i) =>
            <ellipse key={i} cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} fill="#D9542B" opacity={view === 'priorities' ? p.strength * 0.5 : p.strength} />
            )}
            </motion.g>
          }

          {view === 'aerial' &&
          <motion.rect
            key="fp"
            {...fade}
            x={survey.drone.x - dfw / 2}
            y={survey.drone.y - dfh / 2}
            width={dfw}
            height={dfh}
            fill="rgba(255,255,255,0.18)"
            stroke="#fff"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke" />

          }

          {view === 'coverage' &&
          <motion.g key="cov" {...fade}>
              {footprints.map((f, i) =>
            <rect
              key={i}
              x={f.x}
              y={f.y}
              width={f.w}
              height={f.h}
              fill="rgba(255,255,255,0.09)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke" />

            )}
              <polyline points={path} fill="none" stroke="#E7B844" strokeWidth={2.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {arrows.map((a, i) =>
            <polygon
              key={i}
              points={a.down ? `${a.x - 1.6},${a.y - 1.2} ${a.x + 1.6},${a.y - 1.2} ${a.x},${a.y + 1.6}` : `${a.x - 1.6},${a.y + 1.2} ${a.x + 1.6},${a.y + 1.2} ${a.x},${a.y - 1.6}`}
              fill="#E7B844" />

            )}
            </motion.g>
          }

          {showAreas &&
          <motion.g key="areas" {...fade}>
              {survey.areas.map((a) => {
              const c = priorityMeta[a.priority].color;
              const selected = a.id === selectedAreaId;
              return (
                <ellipse
                  key={a.id}
                  cx={a.cx}
                  cy={a.cy}
                  rx={a.rx}
                  ry={a.ry}
                  fill={c}
                  fillOpacity={0.2}
                  stroke={selected ? '#fff' : c}
                  strokeWidth={selected ? 3.5 : 2.5}
                  strokeDasharray={a.priority === 'check' ? '5 3' : undefined}
                  vectorEffect="non-scaling-stroke" />);


            })}
            </motion.g>
          }
        </AnimatePresence>

        {showBoundary &&
        <g>
            {survey.plots.map((p) =>
          <polygon key={p} points={p} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          )}
            <polygon points={survey.boundary} fill="none" stroke="#fff" strokeWidth={2} strokeDasharray="7 4" vectorEffect="non-scaling-stroke" />
          </g>
        }
      </svg>

      {view === 'coverage' && !reduce &&
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-[10%] w-[12%] bg-white/15"
        initial={{ left: '10%' }}
        animate={{ left: ['10%', '78%'] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }} />

      }

      <AnimatePresence>
        {showDrone &&
        <motion.div
          key="drone"
          {...fade}
          className="pointer-events-none absolute w-[26%]"
          style={{ left: `${survey.drone.x}%`, top: `${survey.drone.y}%`, x: '-50%', y: '-62%' }}>
          
            <motion.img
            src={images.surveyDrone}
            alt=""
            aria-hidden
            className="w-full mix-blend-multiply"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity }} />
          
          </motion.div>
        }
      </AnimatePresence>

      {showAreas &&
      survey.areas.map((a) => {
        const selected = a.id === selectedAreaId;
        return (
          <button
            key={a.id}
            type="button"
            disabled={!onSelectArea}
            onClick={() => onSelectArea?.(a)}
            aria-pressed={selected}
            aria-label={`${a.label}, ${priorityMeta[a.priority].label}`}
            className="absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center"
            style={{ left: `${a.cx}%`, top: `${a.cy}%` }}>
            
              <span
              className={`grid h-8 w-8 place-items-center rounded-full text-[14px] font-bold shadow ${priorityMeta[a.priority].text} ${selected ? 'ring-4 ring-white' : 'ring-2 ring-white/80'}`}
              style={{ backgroundColor: priorityMeta[a.priority].color }}>
              
                {a.label.replace('Area ', '')}
              </span>
            </button>);

      })}

      {showMarkers &&
      survey.records.map((r) =>
      <button
        key={r.id}
        type="button"
        disabled={!onSelectRecord}
        onClick={() => onSelectRecord?.(r)}
        aria-label={`Shared farmer record: ${r.title}, ${shortDate(r.date)}`}
        className="absolute grid h-12 w-12 -translate-x-1/2 -translate-y-full place-items-end justify-center"
        style={{ left: `${r.x}%`, top: `${r.y}%` }}>
        
            <MapPinIcon className="h-8 w-8 fill-white text-primary-dark drop-shadow" strokeWidth={2} aria-hidden />
          </button>
      )}

      {!bare &&
      <>
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-[13px] font-semibold text-accent-ink ring-1 ring-line">
            Illustrative survey · Demo data
          </span>
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-[13px] font-medium text-white">
            {view === 'aerial' ? `${survey.name} · ${shortDate(survey.captured)}` : surveyViews[view].badge}
          </span>
        </>
      }
    </div>);

}