import React, { useEffect, useState } from 'react';
import { InfoIcon, LocateFixedIcon, MapIcon, PenLineIcon } from 'lucide-react';
import { barangaySuggestions, citySuggestions, provinceSuggestions } from '../../data/locations';
import type { TKey } from '../../data/translations';
import { FIELD_ID_PREFIX, FieldFormErrors, FieldFormValues } from '../../hooks/useFieldForm';
import { useDeviceLocation } from '../../hooks/useDeviceLocation';
import { useT } from '../../hooks/useT';
import { LocationSource } from '../../types/farm';
import { locationSourceKey } from '../../utils/farm';
import { formatCoords } from '../../utils/format';
import { ComboField } from '../form/ComboField';
import { TextField } from '../form/TextField';
import { DemoMap } from './DemoMap';
import { DeviceLocationPanel } from './DeviceLocationPanel';

interface LocationStageProps {
  values: FieldFormValues;
  errors: FieldFormErrors;
  set: <K extends keyof FieldFormValues>(key: K, value: FieldFormValues[K]) => void;
  setMany: (patch: Partial<FieldFormValues>) => void;
}

const methods: {key: LocationSource;labelKey: TKey;textKey: TKey;icon: typeof MapIcon;}[] = [
{ key: 'device', labelKey: 'loc.useMine', textKey: 'loc.useMineText', icon: LocateFixedIcon },
{ key: 'map', labelKey: 'loc.chooseMap', textKey: 'loc.chooseMapText', icon: MapIcon },
{ key: 'manual', labelKey: 'loc.enterManual', textKey: 'loc.enterManualText', icon: PenLineIcon }];


const id = (k: keyof FieldFormValues) => `${FIELD_ID_PREFIX}${k}`;

export function LocationStage({ values, errors, set, setMany }: LocationStageProps) {
  const t = useT();
  const device = useDeviceLocation();
  const [method, setMethod] = useState<LocationSource | null>(values.lat !== null ? values.source : null);
  const [draft, setDraft] = useState<{lat: number;lng: number;} | null>(
    values.lat !== null && values.lng !== null ? { lat: values.lat, lng: values.lng } : null
  );
  const online = typeof navigator === 'undefined' ? true : navigator.onLine;
  const coords = formatCoords(values.lat, values.lng);

  useEffect(() => {
    if (device.status === 'success' && device.coords) {
      setMany({ lat: Number(device.coords.lat.toFixed(5)), lng: Number(device.coords.lng.toFixed(5)), source: 'device' });
      setDraft({ lat: device.coords.lat, lng: device.coords.lng });
    }
  }, [device.status, device.coords, setMany]);

  const chooseMethod = (m: LocationSource) => {
    setMethod(m);
    if (m === 'device') device.request();
    if (m === 'manual') {
      setMany({ lat: null, lng: null, source: 'manual' });
      window.setTimeout(() => document.getElementById(id('province'))?.focus(), 50);
    }
  };

  const goManual = () => chooseMethod('manual');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-bold text-primary-dark">{t('loc.title')}</h2>
        <p className="mt-2 flex gap-2 rounded-2xl bg-accent-soft p-3 text-[14px] leading-snug text-accent-ink">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {t('loc.warn')}
        </p>
      </div>

      <div role="radiogroup" aria-label={t('loc.methodAria')} className="space-y-2">
        {methods.map((m) => {
          const Icon = m.icon;
          const selected = method === m.key;
          return (
            <button
              key={m.key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => chooseMethod(m.key)}
              className={`flex min-h-[64px] w-full items-center gap-3 rounded-2xl border-2 px-3 py-2 text-left transition-colors duration-150 ${
              selected ? 'border-primary bg-primary-soft' : 'border-line bg-card'}`
              }>
              
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${selected ? 'bg-primary text-white' : 'bg-primary-soft text-primary'}`}>
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[16px] font-bold leading-snug text-ink">{t(m.labelKey)}</span>
                <span className="block text-[14px] leading-snug text-ink-muted">{t(m.textKey)}</span>
              </span>
            </button>);

        })}
      </div>

      {method === 'device' &&
      <DeviceLocationPanel
        status={device.status}
        coords={device.coords}
        onRetry={() => device.request()}
        onSimulate={(issue) => device.request(issue)}
        onManual={goManual}
        onAdjust={() => setMethod('map')} />

      }

      {method === 'map' && (
      online ?
      <div className="space-y-3">
            <DemoMap value={draft} onChange={setDraft} />
            <button
          type="button"
          disabled={!draft}
          onClick={() => draft && setMany({ lat: draft.lat, lng: draft.lng, source: 'map' })}
          className="min-h-[56px] w-full rounded-2xl bg-primary px-4 py-2 text-[17px] font-bold leading-tight text-white disabled:bg-line disabled:text-ink-muted">
          
              {t('loc.confirm')}
            </button>
            {values.source === 'map' && values.lat !== null &&
        <p role="status" className="text-center text-[14px] font-semibold text-primary">
                {t('loc.pinConfirmed')}
              </p>
        }
          </div> :

      <div role="alert" className="rounded-2xl border border-line bg-card p-4">
            <p className="text-[16px] font-bold text-primary-dark">{t('loc.offlineTitle')}</p>
            <p className="mt-1 text-[15px] text-ink-muted">{t('loc.offlineMap')}</p>
          </div>)
      }

      <section aria-labelledby="addr-heading" className="space-y-5 border-t border-line pt-5">
        <div>
          <h3 id="addr-heading" className="text-[17px] font-bold text-primary-dark">
            {t('loc.addrTitle')}
          </h3>
          <p className="mt-1 text-[14px] text-ink-muted">{t('loc.addrText')}</p>
        </div>
        <ComboField id={id('province')} label={t('form.province')} value={values.province} onChange={(v) => set('province', v)} suggestions={provinceSuggestions} error={errors.province} />
        <ComboField
          id={id('city')}
          label={t('form.city')}
          value={values.city}
          onChange={(v) => set('city', v)}
          suggestions={citySuggestions[values.province.trim()] ?? []}
          error={errors.city} />
        
        <ComboField
          id={id('barangay')}
          label={t('form.barangay')}
          value={values.barangay}
          onChange={(v) => set('barangay', v)}
          suggestions={barangaySuggestions[values.city.trim()] ?? []}
          error={errors.barangay} />
        
        <TextField
          id={id('detail')}
          label={t('form.locationDetail')}
          optional
          value={values.detail}
          onChange={(e) => set('detail', e.target.value)}
          placeholder={t('loc.detailPh')} />
        
      </section>

      {coords ?
      <details className="rounded-2xl border border-line bg-card">
          <summary className="flex min-h-[52px] cursor-pointer items-center px-4 text-[15px] font-bold text-primary">{t('loc.pinDetails')}</summary>
          <div className="space-y-2 px-4 pb-4 text-[15px] text-ink">
            <p>
              <span className="text-ink-muted">{t('loc.coords')}</span> {coords}
            </p>
            <p>
              <span className="text-ink-muted">{t('loc.source')}</span> {t(locationSourceKey[values.source])}
            </p>
            <p className="text-[14px] text-ink-muted">{t('loc.pinNote')}</p>
            <button
            type="button"
            onClick={() => {
              setMany({ lat: null, lng: null, source: 'manual' });
              setDraft(null);
            }}
            className="min-h-[48px] rounded-xl px-1 text-[15px] font-bold text-danger">
            
              {t('loc.removePin')}
            </button>
          </div>
        </details> :

      <p className="text-[14px] text-ink-muted">{t('loc.noPin')}</p>
      }
    </div>);

}