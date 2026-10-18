import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon, SearchIcon, SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { DemoTag } from '../components/DemoTag';
import { EmptyState } from '../components/EmptyState';
import { PageBody } from '../components/PageBody';
import { PageHeader } from '../components/PageHeader';
import { RecordsFilterSheet } from '../components/records/RecordsFilterSheet';
import { ScanRecordRow } from '../components/ScanRecordRow';
import { useApp } from '../contexts/AppContext';
import type { TKey } from '../data/translations';
import { applyFilters, emptyFilters, sheetFilterCount, StatusFilter, useRecordsFilters } from '../hooks/useRecordsFilters';
import { useT } from '../hooks/useT';
import { ScanRecord } from '../types/farm';
import { scanTitleKey } from '../utils/farm';

const segments: {key: StatusFilter;labelKey: TKey;}[] = [
{ key: 'all', labelKey: 'common.all' },
{ key: 'followup', labelKey: 'status.followup' },
{ key: 'saved', labelKey: 'status.saved' }];


export function Records() {
  const t = useT();
  const { scans, fields, isDemo } = useApp();
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const titleOf = useCallback((s: ScanRecord) => t(scanTitleKey(s)), [t]);
  const { query, setQuery, filters, setFilters, results, clear, isFiltered, fieldName } = useRecordsFilters(scans, fields, titleOf, t('common.noField'));

  const subtitle = scans.length === 1 ? t('records.countOne') : t('records.count', { n: scans.length });
  const mixed = scans.some((s) => s.source === 'simulated') && scans.some((s) => s.source !== 'simulated');
  const sheetCount = sheetFilterCount(filters);

  return (
    <div>
      <PageHeader title={t('nav.records')} subtitle={subtitle} right={isDemo ? <DemoTag label={t('common.sample')} /> : undefined} />
      <PageBody className="pt-3">
        {scans.length === 0 ?
        <EmptyState
          icon={CameraIcon}
          bordered
          title={t('records.emptyTitle')}
          description={t('records.emptyText')}
          action={
          <Link to="/scan" className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-[16px] font-bold text-white">
                {t('common.scanLeaf')}
              </Link>
          } /> :


        <>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" aria-hidden />
              <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('records.search')}
              aria-label={t('records.search')}
              className="h-12 w-full rounded-xl border border-line bg-card pl-11 pr-11 text-[16px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary" />
            
              {query &&
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t('records.clear')}
              className="absolute right-0 top-0 grid h-12 w-12 place-items-center text-ink-muted">
              
                  <XIcon className="h-5 w-5" aria-hidden />
                </button>
            }
            </div>

            <div className="mt-2 flex gap-2">
              <select
              aria-label={t('records.fieldLabel')}
              value={filters.fieldId}
              onChange={(e) => setFilters({ ...filters, fieldId: e.target.value })}
              className="h-12 min-w-0 flex-1 rounded-xl border border-line bg-card px-3 text-[15px] font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-primary">
              
                <option value="all">{t('home.allFields')}</option>
                {fields.map((f) =>
              <option key={f.id} value={f.id}>
                    {f.name}
                    {f.archived ? ` ${t('records.archivedSuffix')}` : ''}
                  </option>
              )}
              </select>
              <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className={`inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 text-[15px] font-bold ${
              sheetCount ? 'border-primary bg-primary-soft text-primary-dark' : 'border-line bg-card text-primary'}`
              }>
              
                <SlidersHorizontalIcon className="h-4 w-4 shrink-0" aria-hidden />
                {sheetCount ? t('records.filterCount', { n: sheetCount }) : t('records.filter')}
              </button>
            </div>

            <div role="radiogroup" aria-label={t('records.filterStatus')} className="mt-2 grid grid-cols-[auto_1fr_auto] gap-1 rounded-xl bg-primary-soft/60 p-1">
              {segments.map((s) => {
              const selected = filters.status === s.key;
              return (
                <button
                  key={s.key}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setFilters({ ...filters, status: s.key })}
                  className={`min-h-[44px] whitespace-nowrap rounded-lg px-3 text-[14px] font-bold transition-colors duration-150 ${
                  selected ? 'bg-card text-primary-dark shadow-card' : 'text-ink-muted'}`
                  }>
                  
                    {t(s.labelKey)}
                  </button>);

            })}
            </div>

            <div className="mt-3">
              {results.length === 0 ?
            <EmptyState
              icon={SearchXIcon}
              bordered
              title={t('records.noMatch')}
              description={t('records.noMatchText')}
              action={
              isFiltered ?
              <button type="button" onClick={clear} className="min-h-[48px] w-full rounded-xl bg-primary px-3 py-2 text-[16px] font-bold text-white">
                        {t('records.clear')}
                      </button> :
              undefined
              } /> :


            <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card shadow-card">
                  {results.map((s) =>
              <ScanRecordRow key={s.id} scan={s} markSimulated={mixed} />
              )}
                </div>
            }
            </div>
          </>
        }
      </PageBody>

      <RecordsFilterSheet
        open={sheetOpen}
        onClose={closeSheet}
        fields={fields}
        filters={filters}
        countFor={(f) => applyFilters(scans, f, query, fieldName, titleOf).length}
        onApply={(f) => {
          setFilters(f);
          setSheetOpen(false);
        }}
        onClear={() => {
          setFilters(emptyFilters);
          setSheetOpen(false);
        }} />
      
    </div>);

}