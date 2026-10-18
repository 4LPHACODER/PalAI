import React, { ChangeEvent, useRef, useState } from 'react';
import { ImagePlusIcon, Loader2Icon } from 'lucide-react';
import type { TKey } from '../../data/translations';
import { useT } from '../../hooks/useT';
import { fileToDataUrl } from '../../utils/image';
import { FieldLabel } from './TextField';

interface PhotoFieldProps {
  id: string;
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  optional?: boolean;
  hint?: string;
  round?: boolean;
}

export function PhotoField({ id, label, value, onChange, optional, hint, round }: PhotoFieldProps) {
  const t = useT();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<TKey | null>(null);

  const handle = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await fileToDataUrl(file, round ? 320 : 720));
    } catch (err) {
      setError(err instanceof Error && err.message === 'not-image' ? 'photo.notImage' : 'photo.readFail');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} optional={optional} />
      <input ref={inputRef} id={id} type="file" accept="image/*" className="sr-only" onChange={handle} />
      {value ?
      <div className="flex items-center gap-3">
          <img src={value} alt={t('photo.selectedAlt')} className={`shrink-0 object-cover ${round ? 'h-20 w-20 rounded-full' : 'h-24 w-32 rounded-2xl'}`} />
          <div className="flex flex-1 flex-col gap-2">
            <button type="button" onClick={() => inputRef.current?.click()} className="min-h-[48px] rounded-xl border border-line bg-card px-2 py-2 text-[15px] font-bold leading-tight text-primary">
              {t('photo.replace')}
            </button>
            <button type="button" onClick={() => onChange(null)} className="min-h-[48px] rounded-xl px-2 text-[15px] font-bold text-ink-muted">
              {t('common.remove')}
            </button>
          </div>
        </div> :

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="flex h-20 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-card text-[16px] font-semibold text-primary active:bg-canvas">
        
          {busy ? <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden /> : <ImagePlusIcon className="h-5 w-5" aria-hidden />}
          {busy ? t('photo.preparing') : t('photo.add')}
        </button>
      }
      {error ?
      <p role="alert" className="mt-1.5 text-[14px] font-medium text-danger">
          {t(error)}
        </p> :

      <p className="mt-1.5 text-[14px] text-ink-muted">{hint ?? t('photo.local')}</p>
      }
    </div>);

}