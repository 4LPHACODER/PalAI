import React, { KeyboardEvent, PointerEvent, useRef } from 'react';
import { MapPinIcon } from 'lucide-react';
import { images } from '../../data/images';
import { MAP_BOUNDS, mapPosition, positionToCoords } from './mapBounds';

interface DemoMapProps {
  value: {lat: number;lng: number;} | null;
  onChange?: (coords: {lat: number;lng: number;}) => void;
}

const STEP = 0.0008;

/** Clearly labeled illustrative map. Tap or drag to place a reference pin. */
export function DemoMap({ value, onChange }: DemoMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const interactive = !!onChange;
  const pos = value ? mapPosition(value.lat, value.lng) : null;
  const outside = !!value && !pos;

  const place = (clientX: number, clientY: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || !onChange) return;
    onChange(positionToCoords((clientX - r.left) / r.width * 100, (clientY - r.top) / r.height * 100));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragging.current = true;
    ref.current?.setPointerCapture(e.pointerId);
    place(e.clientX, e.clientY);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!onChange) return;
    const base = value && pos ? value : { lat: (MAP_BOUNDS.north + MAP_BOUNDS.south) / 2, lng: (MAP_BOUNDS.west + MAP_BOUNDS.east) / 2 };
    const moves: Record<string, [number, number]> = {
      ArrowUp: [STEP, 0],
      ArrowDown: [-STEP, 0],
      ArrowLeft: [0, -STEP],
      ArrowRight: [0, STEP]
    };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    onChange({ lat: Number((base.lat + m[0]).toFixed(5)), lng: Number((base.lng + m[1]).toFixed(5)) });
  };

  return (
    <div
      ref={ref}
      role={interactive ? 'application' : 'img'}
      aria-label={
      interactive ?
      'Demo map. Tap to place the field pin, drag to move it, or use the arrow keys.' :
      'Demo map showing the field pin'
      }
      tabIndex={interactive ? 0 : -1}
      onPointerDown={onPointerDown}
      onPointerMove={(e) => dragging.current && place(e.clientX, e.clientY)}
      onPointerUp={() => dragging.current = false}
      onPointerCancel={() => dragging.current = false}
      onKeyDown={onKeyDown}
      className={`relative aspect-square w-full select-none overflow-hidden rounded-card border border-line bg-primary-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 ${
      interactive ? 'cursor-crosshair touch-none' : ''}`
      }>
      
      <img src={images.demoMap} alt="" draggable={false} className="pointer-events-none h-full w-full object-cover" />
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-[13px] font-semibold text-accent-ink ring-1 ring-line">
        Demo map · not real map data
      </span>
      {pos &&
      <span className="pointer-events-none absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
          <span className="absolute left-1/2 top-0 h-2 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/30" aria-hidden />
          <MapPinIcon className="absolute h-11 w-11 -translate-x-1/2 -translate-y-full fill-primary text-white drop-shadow" strokeWidth={1.8} aria-hidden />
        </span>
      }
      {!value && interactive &&
      <span className="pointer-events-none absolute inset-x-6 bottom-4 rounded-2xl bg-card/95 px-3 py-2 text-center text-[15px] font-semibold text-primary-dark">
          Tap where your field is
        </span>
      }
      {outside &&
      <span className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl bg-card/95 px-3 py-2 text-center text-[14px] font-medium text-ink">
          This location is outside the demo map area. The coordinates are still recorded.
        </span>
      }
    </div>);

}