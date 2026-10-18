import React, { useEffect, useState } from 'react';
import type { TKey } from '../../data/translations';
import { guidanceLibrary, knownDiseases } from '../../data/guidance';
import { DateFilter, RecordFilters, StatusFilter } from '../../hooks/useRecordsFilters';
import { useT } from '../../hooks/useT';
import { Field } from '../../types/farm';
import { BottomSheet } from '../BottomSheet';

interface RecordsFilterSheetProps {
  open: boolean;
  onClose: () => void;
  fields: Field[];
  filters: RecordFilters;
  onApply: (f: RecordFilters) => void;
  onClear: () => void;
  countFor: (f: RecordFilters) => number;
}

const statuses: {key: StatusFilter;labelKey: TKey;}[] = [
{ key: 'all', labelKey: 'common.all' },
{ key: 'followup', labelKey: 'status.followup' },
{ key: 'saved', labelKey: 'status.saved' },
{ key: 'retake', labelKey: 'status.retake' }];


const dates: {key: DateFilter;labelKey: TKey;}[] = [
{ key: 'all', labelKey: 'records.dateAll' },
{ key: '7', labelKey: 'records.date7' },
{ key: '30', labelKey: 'records.date30' },
{ key: '90', labelKey: 'records.date90' }];


function Chip({ selected, onClick, children }: {selected: boolean;onClick: () => void;children: React.ReactNode;}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`min-h-[48px] rounded-full border px-4 py-2 text-left text-[15px] font-semibold leading-tight transition-colors duration-150 ${
      selected ? 'border-primary bg-primary text-white' : 'border-line bg-card text-ink'}`
      }>
      
      {children}
    </button>);

}

function Group({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <fieldset className="border-t border-line pt-4 first:border-t-0 first:pt-0">
      <legend className="mb-2 text-[15px] font-bold text-primary-dark">{title}</legend>
      {children}
    </fieldset>);

}

/** "Salain" — field, disease, status and date, applied with one action. */
export function RecordsFilterSheet({ open, onClose, fields, filters, onApply, onClear, countFor }: RecordsFilterSheetProps) {
  const t = useT();
  const [draft, setDraft] = useState(filters);
  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);
  const set = (patch: Partial<RecordFilters>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <BottomSheet open={open} onClose={onClose} title={t('records.filter')}>
      <div className="space-y-4">
        <Group title={t('records.fieldLabel')}>
          <select
            aria-label={t('records.fieldLabel')}
            value={draft.fieldId}
            onChange={(e) => set({ fieldId: e.target.value })}
            className="h-12 w-full rounded-xl border border-line bg-card px-4 text-[16px] font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-primary">
            
            <option value="all">{t('home.allFields')}</option>
            {fields.map((f) =>
            <option key={f.id} value={f.id}>
                {f.name}
                {f.archived ? ` ${t('records.archivedSuffix')}` : ''}
              </option>
            )}
          </select>
        </Group>
        <Group title={t('records.disease')}>
          <div className="flex flex-wrap gap-2">
            <Chip selected={draft.disease === 'all'} onClick={() => set({ disease: 'all' })}>
              {t('records.allDiseases')}
            </Chip>
            {[...knownDiseases, 'uncertain' as const].map((d) =>
            <Chip key={d} selected={draft.disease === d} onClick={() => set({ disease: d })}>
                {t(guidanceLibrary[d].titleKey)}
              </Chip>
            )}
          </div>
        </Group>
        <Group title={t('records.status')}>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) =>
            <Chip key={s.key} selected={draft.status === s.key} onClick={() => set({ status: s.key })}>
                {t(s.labelKey)}
              </Chip>
            )}
          </div>
        </Group>
        <Group title={t('records.date')}>
          <div className="flex flex-wrap gap-2">
            {dates.map((d) =>
            <Chip key={d.key} selected={draft.date === d.key} onClick={() => set({ date: d.key })}>
                {t(d.labelKey)}
              </Chip>
            )}
          </div>
        </Group>
      </div>
      <div className="mt-5 grid gap-2">
        <button
          type="button"
          onClick={() => onApply(draft)}
          className="min-h-[52px] w-full rounded-2xl bg-primary px-4 py-2 text-[16px] font-bold text-white">
          
          {t('records.applyCount', { n: countFor(draft) })}
        </button>
        <button type="button" onClick={onClear} className="min-h-[48px] w-full rounded-2xl px-4 py-2 text-[15px] font-bold text-primary">
          {t('records.clear')}
        </button>
      </div>
    </BottomSheet>);

}