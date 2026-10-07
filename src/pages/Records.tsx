import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon, SearchXIcon } from 'lucide-react';
import { DemoTag } from '../components/DemoTag';
import { EmptyState } from '../components/EmptyState';
import { PageBody } from '../components/PageBody';
import { PageHeader } from '../components/PageHeader';
import { RecordDetailSheet } from '../components/RecordDetailSheet';
import { ScanRecordRow } from '../components/ScanRecordRow';
import { useApp } from '../contexts/AppContext';
import { useT } from '../hooks/useT';
import { ScanRecord, ScanStatus } from '../types/farm';

type StatusFilter = 'all' | ScanStatus;

const filters: {key: StatusFilter;label: string;}[] = [
{ key: 'all', label: 'All' },
{ key: 'followup', label: 'Follow-up needed' },
{ key: 'saved', label: 'Saved' },
{ key: 'retake', label: 'Retake photo' }];


export function Records() {
  const t = useT();
  const { scans, fields, isDemo } = useApp();
  const [status, setStatus] = useState<StatusFilter>('all');
  const [fieldId, setFieldId] = useState('all');
  const [activeScan, setActiveScan] = useState<ScanRecord | null>(null);
  const closeScan = useCallback(() => setActiveScan(null), []);

  const byField = scans.filter((s) => fieldId === 'all' || s.fieldId === fieldId);
  const filtered = byField.filter((s) => status === 'all' || s.status === status);
  const countFor = (key: StatusFilter) => key === 'all' ? byField.length : byField.filter((s) => s.status === key).length;

  return (
    <div>
      <PageHeader title={t('nav.records')} subtitle={`${scans.length} scans saved`} right={isDemo ? <DemoTag /> : undefined} />
      <PageBody className="pt-4">
        {scans.length === 0 ?
        <EmptyState
          icon={CameraIcon}
          bordered
          title="No records yet"
          description="Scan a rice leaf and the record will appear here."
          action={
          <Link to="/scan" className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-[16px] font-bold text-white">
                {t('common.scanLeaf')}
              </Link>
          } /> :


        <>
            <label htmlFor="field-filter" className="text-[14px] font-semibold text-ink-muted">
              Field
            </label>
            <select
            id="field-filter"
            value={fieldId}
            onChange={(e) => setFieldId(e.target.value)}
            className="mt-1 h-12 w-full rounded-xl border border-line bg-card px-4 text-[16px] font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-primary">
            
              <option value="all">All fields</option>
              {fields.map((f) =>
            <option key={f.id} value={f.id}>
                  {f.name}
                  {f.archived ? ' (archived)' : ''}
                </option>
            )}
            </select>

            <div role="group" aria-label="Filter by status" className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 min-[390px]:-mx-5 min-[390px]:px-5">
              {filters.map((f) => {
              const selected = status === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setStatus(f.key)}
                  className={`flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[15px] font-semibold transition-colors duration-150 ${
                  selected ? 'border-primary bg-primary text-white' : 'border-line bg-card text-ink'}`
                  }>
                  
                    {f.label}
                    <span className={`rounded-full px-2 text-[13px] ${selected ? 'bg-white/20' : 'bg-canvas text-ink-muted'}`}>{countFor(f.key)}</span>
                  </button>);

            })}
            </div>

            <div className="mt-4">
              {filtered.length === 0 ?
            <EmptyState
              icon={SearchXIcon}
              bordered
              title="No records match"
              description="Try another field or status."
              action={
              <button
                type="button"
                onClick={() => {
                  setStatus('all');
                  setFieldId('all');
                }}
                className="h-12 w-full rounded-xl bg-primary text-[16px] font-bold text-white">
                
                      Show all records
                    </button>
              } /> :


            <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card shadow-card">
                  {filtered.map((s) =>
              <ScanRecordRow key={s.id} scan={s} onOpen={setActiveScan} />
              )}
                </div>
            }
              <p className="mt-2 text-[13px] text-ink-muted">Screening results are simulated in this preview.</p>
            </div>
          </>
        }
      </PageBody>
      <RecordDetailSheet scan={activeScan} onClose={closeScan} />
    </div>);

}