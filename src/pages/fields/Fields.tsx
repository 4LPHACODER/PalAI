import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircleIcon, ArchiveIcon, CheckCircle2Icon, PlusIcon, SearchIcon, SearchXIcon, SproutIcon, XIcon } from 'lucide-react';
import { EmptyState } from '../../components/EmptyState';
import { FieldListItem } from '../../components/fields/FieldListItem';
import { PageBody } from '../../components/PageBody';
import { PageHeader } from '../../components/PageHeader';
import { useApp } from '../../contexts/AppContext';
import type { TKey } from '../../data/translations';
import { useT } from '../../hooks/useT';
import { deriveFieldStatus, latestRecordDate } from '../../utils/farm';

type Filter = 'all' | 'active' | 'followup' | 'archived';

const filters: {key: Filter;labelKey: TKey;}[] = [
{ key: 'all', labelKey: 'fields.all' },
{ key: 'active', labelKey: 'fields.active' },
{ key: 'followup', labelKey: 'fields.followup' },
{ key: 'archived', labelKey: 'fields.archived' }];


export function Fields() {
  const t = useT();
  const { fields, scans, observations } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const enriched = useMemo(
    () =>
    fields.map((f) => ({
      field: f,
      followup: !f.archived && deriveFieldStatus(f.id, scans, observations).status === 'followup',
      latest: latestRecordDate(f.id, scans, observations) ?? ''
    })),
    [fields, scans, observations]
  );

  const active = enriched.filter((e) => !e.field.archived);
  const followupCount = enriched.filter((e) => e.followup).length;
  const totalHa = active.reduce((sum, e) => sum + (e.field.areaHa ?? 0), 0);
  const haLabel = Number.isInteger(totalHa) ? String(totalHa) : totalHa.toFixed(1);
  const summary = active.length === 1 ? t('fields.summaryOne', { ha: haLabel }) : t('fields.summary', { n: active.length, ha: haLabel });

  const q = query.trim().toLowerCase();
  const results = enriched.
  filter((e) =>
  filter === 'all' ? true : filter === 'active' ? !e.field.archived : filter === 'followup' ? e.followup : e.field.archived
  ).
  filter(
    (e) =>
    !q ||
    [e.field.name, e.field.location.barangay, e.field.location.city, e.field.location.province, e.field.location.detail, e.field.variety ?? ''].
    join(' ').
    toLowerCase().
    includes(q)
  )
  // Follow-up first, then most recent activity; archived fields always last.
  .sort(
    (a, b) =>
    Number(a.field.archived) - Number(b.field.archived) || Number(b.followup) - Number(a.followup) || b.latest.localeCompare(a.latest)
  );

  const addButton =
  <Link
    to="/fields/new"
    aria-label={t('field.addField')}
    className="flex h-12 items-center gap-1 whitespace-nowrap rounded-xl bg-primary px-4 text-[16px] font-bold text-white transition-transform duration-150 ease-out active:scale-[0.97]">
    
      <PlusIcon className="h-5 w-5" strokeWidth={2.5} aria-hidden /> {t('fields.addShort')}
    </Link>;


  const emptyForFilter = () => {
    if (q) {
      return (
        <EmptyState
          icon={SearchXIcon}
          bordered
          title={t('fields.noMatch')}
          description={t('fields.noMatchText')}
          action={
          <button type="button" onClick={() => setQuery('')} className="min-h-[48px] w-full rounded-xl border border-line text-[16px] font-bold text-primary">
              {t('fields.clearSearch')}
            </button>
          } />);


    }
    if (filter === 'archived') return <EmptyState icon={ArchiveIcon} bordered title={t('fields.noArchived')} description={t('fields.noArchivedText')} />;
    if (filter === 'followup') return <EmptyState icon={CheckCircle2Icon} bordered title={t('fields.noFollowup')} description={t('fields.noFollowupText')} />;
    return <EmptyState icon={SproutIcon} bordered title={t('fields.noActive')} description={t('fields.noActiveText')} />;
  };

  return (
    <div>
      <PageHeader title={t('nav.fields')} subtitle={fields.length ? summary : undefined} right={addButton} />
      <PageBody className="pt-3">
        {fields.length === 0 ?
        <div className="mt-3">
            <EmptyState
            icon={SproutIcon}
            bordered
            title={t('fields.noneTitle')}
            description={t('fields.noneText')}
            action={
            <Link to="/fields/new" className="flex h-12 w-full items-center justify-center gap-1 rounded-xl bg-primary text-[16px] font-bold text-white">
                  <PlusIcon className="h-5 w-5" aria-hidden /> {t('fields.addShort')}
                </Link>
            } />
          
          </div> :

        <>
            {followupCount > 0 && filter !== 'followup' &&
          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-warn/30 bg-warn-soft p-3">
                <AlertCircleIcon className="h-5 w-5 shrink-0 text-warn" aria-hidden />
                <p className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-ink">
                  {followupCount === 1 ? t('fields.bannerOne') : t('fields.bannerMany', { n: followupCount })}
                </p>
                <button
              type="button"
              onClick={() => setFilter('followup')}
              className="min-h-[44px] shrink-0 rounded-xl bg-card px-3 text-[14px] font-bold text-primary ring-1 ring-line">
              
                  {t('fields.show')}
                </button>
              </div>
          }

            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" aria-hidden />
              <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('fields.search')}
              aria-label={t('fields.search')}
              className="h-12 w-full rounded-xl border border-line bg-card pl-11 pr-12 text-[16px] text-ink placeholder:text-ink-muted/80 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
            
              {query &&
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t('fields.clearSearch')}
              className="absolute right-0 top-0 grid h-12 w-12 place-items-center text-ink-muted">
              
                  <XIcon className="h-5 w-5" aria-hidden />
                </button>
            }
            </div>

            <div role="radiogroup" aria-label={t('fields.filterAria')} className="mt-2 grid grid-cols-4 gap-1 rounded-xl bg-primary-soft/60 p-1">
              {filters.map((f) => {
              const selected = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setFilter(f.key)}
                  className={`min-h-[44px] whitespace-nowrap rounded-lg px-1 text-[14px] font-bold transition-colors duration-150 ${
                  selected ? 'bg-card text-primary-dark shadow-card' : 'text-ink-muted'}`
                  }>
                  
                    {t(f.labelKey)}
                  </button>);

            })}
            </div>

            <div className="mt-3 space-y-3">{results.length === 0 ? emptyForFilter() : results.map((e) => <FieldListItem key={e.field.id} field={e.field} />)}</div>
          </>
        }
      </PageBody>
    </div>);

}