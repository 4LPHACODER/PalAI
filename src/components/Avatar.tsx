import React from 'react';

export function Avatar({ name, photo, size = 64 }: {name: string;photo: string | null;size?: number;}) {
  const initials =
  name.
  trim().
  split(/\s+/).
  slice(0, 2).
  map((p) => p[0]?.toUpperCase() ?? '').
  join('') || 'P';
  const style = { width: size, height: size, fontSize: size * 0.34 };
  if (photo) return <img src={photo} alt={name} style={style} className="shrink-0 rounded-full object-cover" />;
  return (
    <span style={style} className="grid shrink-0 place-items-center rounded-full bg-primary font-bold text-white" aria-hidden>
      {initials}
    </span>);

}