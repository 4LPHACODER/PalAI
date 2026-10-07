import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArchiveIcon, PlusIcon, SearchIcon, SearchXIcon, SproutIcon, XIcon } from 'lucide-react';
import { EmptyState } from '../../components/EmptyState';
import { FieldCard } from '../../components/FieldCard';
import { PageBody } from '../../components/PageBody';
import { PageHeader } from '../../components/PageHeader';
import { useApp } from '../../contexts/AppContext';
import { useT } from '../../hooks/useT';

type Filter = 'all' | 'active' | 'archived';

export function Fields() {
  const t = useT();
  const { fields } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const counts: Record<Filter, number> = {
    all: fields.length,
    active: fields.filter((f) => !f.archived).length,
    archived: fields.filter((f) => f.archived).length
  };
  const q = query.trim().toLowerCase();
  const results = fields.
  filter((f) => filter === 'all' ? true : filter === 'active' ? !f.archived : f.archived).
  filter((f) => !q || [f.name, f.location.barangay, f.location.city, f.location.province, f.location.detail].join(' ').toLowerCase().includes(q)).
  sort((a, b) => Number(a.archived) - Number(b.archived));

  const addButton =
  <Link to="/fields/new" className="flex h-12 items-center gap-1.5 rounded-xl bg-primary px-4 text-[15px] font-bold text-white">
      <PlusIcon className="h-5 w-5" aria-hidden /> {t('field.addField')}
    </Link>;


  return (
    <div>
      <PageHeader title={t('nav.fields')} right={addButton} />
      <PageBody className="pt-3">
        <p className="text-[15px] text-ink-muted">{t('fields.subtitle')}</p>

        {fields.length === 0 ?
        <div className="mt-6">
            <EmptyState
            icon={SproutIcon}
            bordered
            title="No fields yet"
            description="Add your first field to organize your observations."
            action={
            <Link to="/fields/new" className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-[16px] font-bold text-white">
                  {t('field.addField')}
                </Link>
            } />
          
          </div> :

        <>
            <div className="relative mt-4">
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
              aria-label="Clear search"
              className="absolute right-0 top-0 grid h-12 w-12 place-items-center text-ink-muted">
              
                  <XIcon className="h-5 w-5" aria-hidden />
                </button>
            }
            </div>

            <div role="radiogroup" aria-label="Filter fields" className="mt-3 grid grid-cols-3 gap-1 rounded-2xl bg-card p-1 ring-1 ring-line">
              {(['all', 'active', 'archived'] as Filter[]).map((f) =>
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={filter === f}
              onClick={() => setFilter(f)}
              className={`h-12 rounded-xl text-[15px] font-semibold transition-colors duration-150 ${filter === f ? 'bg-primary text-white' : 'text-ink'}`}>
              
                  {t(`fields.${f}` as const)} <span className={filter === f ? 'text-white/80' : 'text-ink-muted'}>({counts[f]})</span>
                </button>
            )}
            </div>

            <div className="mt-4 space-y-4">
              {results.length === 0 ?
            q ?
            <EmptyState
              icon={SearchXIcon}
              bordered
              title="No fields match your search."
              description="Check the spelling, or search by barangay or city."
              action={
              <button type="button" onClick={() => setQuery('')} className="h-12 w-full rounded-xl border border-line text-[16px] font-bold text-primary">
                        Clear search
                      </button>
              } /> :

            filter === 'archived' ?
            <EmptyState icon={ArchiveIcon} bordered title="No archived fields" description="Archived fields will appear here." /> :

            <EmptyState icon={SproutIcon} bordered title="No active fields" description="Add a field or restore one from Archived." /> :


            results.map((f) => <FieldCard key={f.id} field={f} />)
            }
            </div>
          </>
        }
      </PageBody>
    </div>);

}