import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';
import { useT } from '../../hooks/useT';
import { Field, FieldInput } from '../../types/farm';

interface QuickAddFieldProps {
  onAdded: (field: Field) => void;
  onCancel: () => void;
}

const inputClass =
'mt-1 h-12 w-full rounded-xl border bg-card px-4 text-[16px] text-ink placeholder:text-ink-muted/80 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';

/** Adds a field in place (e.g. during a scan) without leaving the current screen. */
export function QuickAddField({ onAdded, onCancel }: QuickAddFieldProps) {
  const t = useT();
  const { addField } = useApp();
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [place, setPlace] = useState('');
  const [errors, setErrors] = useState<{name?: boolean;area?: boolean;}>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const savingRef = useRef(false);

  useEffect(() => nameRef.current?.focus(), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (savingRef.current) return;
    const areaNum = area.trim() ? Number(area) : null;
    const next = { name: !name.trim(), area: areaNum !== null && (Number.isNaN(areaNum) || areaNum <= 0 || areaNum > 500) };
    setErrors(next);
    if (next.name || next.area) {
      if (next.name) nameRef.current?.focus();
      return;
    }
    savingRef.current = true;
    const [barangay = '', city = ''] = place.split(',').map((s) => s.trim());
    const input: FieldInput = {
      name: name.trim(),
      areaHa: areaNum,
      variety: null,
      plantingDate: null,
      stage: 'Not specified',
      notes: '',
      photo: null,
      location: { province: '', city, barangay, detail: '', lat: null, lng: null, source: 'manual' }
    };
    const field = addField(input);
    toast.success(t('qa.addedToast'));
    onAdded(field);
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-3 pb-1">
      <p className="text-[17px] font-bold text-primary-dark">{t('qa.title')}</p>
      <div>
        <label htmlFor="qa-name" className="text-[15px] font-semibold text-ink">
          {t('qa.name')}
        </label>
        <input
          ref={nameRef}
          id="qa-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((x) => ({ ...x, name: false }));
          }}
          placeholder={t('qa.namePh')}
          aria-invalid={errors.name || undefined}
          aria-describedby={errors.name ? 'qa-name-err' : undefined}
          maxLength={60}
          className={`${inputClass} ${errors.name ? 'border-danger' : 'border-line'}`} />
        
        {errors.name &&
        <p id="qa-name-err" className="mt-1 text-[14px] font-semibold text-danger">
            {t('qa.nameError')}
          </p>
        }
      </div>
      <div>
        <label htmlFor="qa-area" className="text-[15px] font-semibold text-ink">
          {t('qa.area')} <span className="font-normal text-ink-muted">· {t('common.optional')}</span>
        </label>
        <input
          id="qa-area"
          inputMode="decimal"
          value={area}
          onChange={(e) => {
            setArea(e.target.value);
            setErrors((x) => ({ ...x, area: false }));
          }}
          placeholder="1.2"
          aria-invalid={errors.area || undefined}
          className={`${inputClass} ${errors.area ? 'border-danger' : 'border-line'}`} />
        
        {errors.area && <p className="mt-1 text-[14px] font-semibold text-danger">{t('qa.areaError')}</p>}
      </div>
      <div>
        <label htmlFor="qa-place" className="text-[15px] font-semibold text-ink">
          {t('qa.place')} <span className="font-normal text-ink-muted">· {t('common.optional')}</span>
        </label>
        <input id="qa-place" value={place} onChange={(e) => setPlace(e.target.value)} placeholder={t('qa.placePh')} className={`${inputClass} border-line`} />
      </div>
      <button type="submit" className="min-h-[52px] w-full rounded-2xl bg-primary px-4 py-2 text-[16px] font-bold text-white">
        {t('qa.save')}
      </button>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={onCancel} className="min-h-[48px] rounded-xl border border-line px-2 text-[14px] font-bold text-primary">
          {t('qa.cancel')}
        </button>
        <Link to="/fields/new" className="flex min-h-[48px] items-center justify-center rounded-xl px-2 text-center text-[14px] font-bold text-primary">
          {t('qa.full')}
        </Link>
      </div>
    </form>);

}