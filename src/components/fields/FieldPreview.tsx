import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { images } from '../../data/images';
import { useT } from '../../hooks/useT';
import { Field } from '../../types/farm';
import { mapPosition } from './mapBounds';

/** Field photo, a demo-map preview of its pin, or a neutral placeholder. */
export function FieldPreview({ field, className = '' }: {field: Field;className?: string;}) {
  const t = useT();
  if (field.photo) {
    return <img src={field.photo} alt={t('fd.photoAlt', { name: field.name })} className={`object-cover ${className}`} />;
  }
  const pos = mapPosition(field.location.lat, field.location.lng);
  if (pos) {
    return (
      <div className={`relative overflow-hidden bg-primary-soft ${className}`} role="img" aria-label={t('fd.mapAlt', { name: field.name })}>
        <img src={images.demoMap} alt="" className="h-full w-full scale-150 object-cover" style={{ transformOrigin: `${pos.x}% ${pos.y}%` }} />
        <MapPinIcon className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-full fill-primary text-white" aria-hidden />
      </div>);

  }
  return (
    <div className={`grid place-items-center bg-primary-soft text-primary ${className}`} role="img" aria-label={t('fd.noPhoto')}>
      <MapPinIcon className="h-6 w-6" aria-hidden />
    </div>);

}