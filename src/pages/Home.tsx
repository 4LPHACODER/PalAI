import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CameraIcon, ChevronDownIcon, LightbulbIcon, MapPinIcon, PlusIcon, SproutIcon } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { ConnectionInfoSheet } from '../components/ConnectionInfoSheet';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { EmptyState } from '../components/EmptyState';
import { FieldCard } from '../components/FieldCard';
import { FieldPickerSheet } from '../components/FieldPickerSheet';
import { NotificationSheet } from '../components/NotificationSheet';
import { PageBody } from '../components/PageBody';
import { PrimaryActionCard } from '../components/PrimaryActionCard';
import { RecordDetailSheet } from '../components/RecordDetailSheet';
import { ReminderCard } from '../components/ReminderCard';
import { ReminderSheet } from '../components/ReminderSheet';
import { ScanRecordRow } from '../components/ScanRecordRow';
import { SectionHeading } from '../components/SectionHeading';
import { useApp } from '../contexts/AppContext';
import { images } from '../data/images';
import { useT } from '../hooks/useT';
import { AppNotification, Reminder, ScanRecord } from '../types/farm';

type SheetKey = 'notifications' | 'connection' | 'picker' | null;

const linkCls = '-mr-2 flex min-h-[48px] items-center px-2 text-[15px] font-bold text-primary';

export function Home() {
  const t = useT();
  const { profile, activeFields, selectedField, selectedFieldId, setSelectedFieldId, reminders, scans, getFieldById } = useApp();
  const [sheet, setSheet] = useState<SheetKey>(null);
  const [activeScan, setActiveScan] = useState<ScanRecord | null>(null);
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null);

  const closeSheet = useCallback(() => setSheet(null), []);
  const closeScan = useCallback(() => setActiveScan(null), []);
  const closeReminder = useCallback(() => setActiveReminder(null), []);

  const reminder = reminders.find((r) => {
    const f = getFieldById(r.fieldId);
    return f && !f.archived;
  });
  const name = profile.displayName.trim() || profile.fullName.trim().split(/\s+/)[0] || 'Farmer';
  const place = [profile.city, profile.province].filter(Boolean).join(', ');

  const openRecord = (scanId: string) => {
    setSheet(null);
    setActiveReminder(null);
    setActiveScan(scans.find((s) => s.id === scanId) ?? null);
  };

  const handleNotificationAction = (n: AppNotification) => {
    if (!n.target) return;
    setSheet(null);
    if (n.target.type === 'reminder') setActiveReminder(reminders.find((r) => r.id === n.target?.id) ?? null);else
    openRecord(n.target.id);
  };

  return (
    <PageBody className="pb-4">
      <AppHeader onOpenNotifications={() => setSheet('notifications')} />

      <section className="mt-5">
        <h1 className="text-[26px] font-bold leading-tight text-primary-dark min-[390px]:text-[28px]">
          {t('home.greeting')}, {name}!
        </h1>
        <p className="mt-1 text-[17px] text-ink">{t('home.subtitle')}</p>
        {place &&
        <p className="mt-1.5 flex items-center gap-1 text-[14px] text-ink-muted">
            <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden />
            {place}
          </p>
        }
      </section>

      <div className="mt-4">
        <ConnectionStatus onInfo={() => setSheet('connection')} />
      </div>

      <div className="mt-4">
        <PrimaryActionCard
          title="Check your rice leaves"
          description="Take a clear photo to screen for possible disease."
          actionLabel={t('common.scanLeaf')}
          to={selectedField ? `/scan?field=${selectedField.id}` : '/scan'}
          supportLabel="Free basic screening"
          image={images.leafHealthy} />
        
      </div>

      <section aria-labelledby="my-field" className="mt-7">
        <SectionHeading
          id="my-field"
          title={t('home.myField')}
          action={
          <Link to="/fields" className={linkCls}>
              {t('home.allFields')}
            </Link>
          } />
        
        {selectedField ?
        <>
            <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setSheet('picker')}
            className="mb-3 flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-line bg-card px-4 text-left active:bg-canvas">
            
              <span className="min-w-0 truncate text-[15px] text-ink-muted">
                Showing: <span className="font-bold text-ink">{selectedField.name}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-[14px] font-semibold text-primary">
                {t('common.change')} <ChevronDownIcon className="h-4 w-4" aria-hidden />
              </span>
            </button>
            <FieldCard field={selectedField} />
          </> :

        <EmptyState
          icon={SproutIcon}
          bordered
          title="Add or select a field"
          description={
          activeFields.length ?
          'Choose which field to show here.' :
          'You can scan without a field. Adding one keeps your records organized.'
          }
          action={
          <div className="space-y-2">
                {activeFields.length > 0 &&
            <button type="button" onClick={() => setSheet('picker')} className="h-12 w-full rounded-xl bg-primary text-[16px] font-bold text-white">
                    Choose a field
                  </button>
            }
                <Link
              to="/fields/new"
              className={`flex h-12 w-full items-center justify-center gap-1.5 rounded-xl text-[16px] font-bold ${
              activeFields.length ? 'border border-line text-primary' : 'bg-primary text-white'}`
              }>
              
                  <PlusIcon className="h-5 w-5" aria-hidden /> {t('field.addField')}
                </Link>
              </div>
          } />

        }
      </section>

      {reminder &&
      <section aria-labelledby="reminders" className="mt-7">
          <SectionHeading id="reminders" title="Reminder" />
          <ReminderCard reminder={reminder} onView={() => setActiveReminder(reminder)} />
        </section>
      }

      <section aria-labelledby="recent-scans" className="mt-7">
        <SectionHeading
          id="recent-scans"
          title={t('home.recentScans')}
          action={
          scans.length > 0 ?
          <Link to="/records" className={linkCls}>
                {t('common.viewAll')}
              </Link> :
          undefined
          } />
        
        {scans.length > 0 ?
        <>
            <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card shadow-card">
              {scans.slice(0, 3).map((s) =>
            <ScanRecordRow key={s.id} scan={s} onOpen={setActiveScan} />
            )}
            </div>
            <p className="mt-2 text-[13px] text-ink-muted">Screening results are simulated in this preview.</p>
          </> :

        <EmptyState
          icon={CameraIcon}
          bordered
          title="No scans yet"
          description="Your leaf screening records will appear here."
          action={
          <Link to="/scan" className="flex h-12 w-full items-center justify-center rounded-xl border border-line text-[16px] font-bold text-primary">
                {t('common.scanLeaf')}
              </Link>
          } />

        }
      </section>

      <aside aria-label="Photo tip" className="mt-7 flex gap-3 rounded-2xl border border-line bg-card/70 p-4">
        <LightbulbIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden />
        <div>
          <p className="text-[15px] font-bold text-primary-dark">A clearer photo helps</p>
          <p className="mt-0.5 text-[14px] leading-snug text-ink-muted">Photograph one leaf in good light and keep it in focus.</p>
        </div>
      </aside>

      <NotificationSheet open={sheet === 'notifications'} onClose={closeSheet} onAction={handleNotificationAction} />
      <ConnectionInfoSheet open={sheet === 'connection'} onClose={closeSheet} />
      <FieldPickerSheet
        open={sheet === 'picker'}
        onClose={closeSheet}
        fields={activeFields}
        selectedId={selectedFieldId}
        onSelect={setSelectedFieldId} />
      
      <ReminderSheet reminder={activeReminder} open={!!activeReminder} onClose={closeReminder} onViewRecord={openRecord} />
      <RecordDetailSheet scan={activeScan} onClose={closeScan} />
    </PageBody>);

}