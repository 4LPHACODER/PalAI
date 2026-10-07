import React, { ChangeEvent, useRef, useState } from 'react';
import { ImagePlusIcon, Loader2Icon } from 'lucide-react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await fileToDataUrl(file, round ? 320 : 720));
    } catch (err) {
      setError(
        err instanceof Error && err.message === 'not-image' ?
        'That file isn’t a photo. Choose a JPG or PNG image.' :
        'We couldn’t read that photo. Try another one.'
      );
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
          <img
          src={value}
          alt="Selected"
          className={`shrink-0 object-cover ${round ? 'h-20 w-20 rounded-full' : 'h-24 w-32 rounded-2xl'}`} />
        
          <div className="flex flex-1 flex-col gap-2">
            <button type="button" onClick={() => inputRef.current?.click()} className="h-12 rounded-xl border border-line bg-card text-[15px] font-bold text-primary">
              Replace photo
            </button>
            <button type="button" onClick={() => onChange(null)} className="h-12 rounded-xl text-[15px] font-bold text-ink-muted">
              Remove
            </button>
          </div>
        </div> :

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="flex h-20 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-card text-[16px] font-semibold text-primary active:bg-canvas">
        
          {busy ? <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden /> : <ImagePlusIcon className="h-5 w-5" aria-hidden />}
          {busy ? 'Preparing photo…' : 'Add photo'}
        </button>
      }
      {error ?
      <p role="alert" className="mt-1.5 text-[14px] font-medium text-danger">
          {error}
        </p> :

      <p className="mt-1.5 text-[14px] text-ink-muted">{hint ?? 'Saved on this device only.'}</p>
      }
    </div>);

}