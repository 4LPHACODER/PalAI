import React, { useCallback, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArchiveIcon, ArchiveRestoreIcon, CameraIcon, ChevronLeftIcon, MoreVerticalIcon, NotebookPenIcon, PencilIcon, PlusIcon, SearchXIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';
import { FieldPreview } from '../../components/fields/FieldPreview';
import { ObservationItem } from '../../components/ObservationItem';
import { PageBody } from '../../components/PageBody';
import { ReminderCard } from '../../components/ReminderCard';
import { ReminderSheet } from '../../components/ReminderSheet';
import { ScanRecordRow } from '../../components/ScanRecordRow';
import { SectionHeading } from '../../components/SectionHeading';
import { StatusBadge } from '../../components/StatusBadge';
import { useApp } from '../../contexts/AppContext';
import { useT } from '../../hooks/useT';
import { Reminder } from '../../types/farm';
import { deriveFieldStatus, displayStageKey, fieldAddress, locationSourceKey } from '../../utils/farm';
import { formatArea, longDate } from '../../utils/format';
import { fieldStatusMeta } from '../../utils/status';

export function FieldDetail() {
  const t = useT();
  const navigate = useNavigate();
  const { fieldId } = useParams();
  const { getFieldById, scans, observations, reminders, archiveField, restoreField } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null);
  const closeReminder = useCallback(() => setActiveReminder(null), []);
  const cancelArchive = useCallback(() => setConfirmArchive(false), []);
  const field = getFieldById(fieldId);

  if (!field) {
    return (
      <PageBody className="pt-[calc(env(safe-area-inset-top)+32px)]">
        <EmptyState
          icon={SearchXIcon}
          tone="error"
          bordered
          title={t('fd.notFound')}
          description={t('fd.notFoundText')}
          action={
          <Link to="/fields" className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-[16px] font-bold text-white">
              {t('fd.backToFields')}
            </Link>
          } />
        
      </PageBody>);

  }

  const fieldScans = scans.filter((s) => s.fieldId === field.id);
  const fieldObs = observations.
  filter((o) => o.fieldId === field.id).
  sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
  const fieldReminders = reminders.filter((r) => r.fieldId === field.id);
  const status = deriveFieldStatus(field.id, scans, observations);
  const notRecorded = t('common.notRecorded');
  const stage = displayStageKey(field.stage);

  const summary = [
  { id: 'area', label: t('field.area'), value: formatArea(field.areaHa) },
  { id: 'variety', label: t('field.variety'), value: field.variety },
  { id: 'planting', label: t('field.plantingDate'), value: field.plantingDate ? longDate(field.plantingDate) : null },
  { id: 'stage', label: t('field.stage'), value: stage ? t(stage) : null }];


  const doArchive = () => {
    archiveField(field.id);
    setConfirmArchive(false);
    toast(t('fd.archivedToast'), {
      description: t('fd.archivedToastDesc'),
      action: { label: t('common.undo'), onClick: () => restoreField(field.id) }
    });
  };

  const doRestore = () => {
    restoreField(field.id);
    setMenuOpen(false);
    toast.success(t('fd.restoredToast'), { description: t('fd.restoredToastDesc', { name: field.name }) });
  };

  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 px-4 pb-2 pt-[calc(env(safe-area-inset-top)+12px)] backdrop-blur min-[390px]:px-5 md:px-8">
        <div className="flex min-h-[48px] items-center gap-1">
          <Link to="/fields" aria-label={t('fd.backToFields')} className="-ml-3 grid h-12 w-12 shrink-0 place-items-center rounded-full text-primary-dark active:bg-primary-soft">
            <ChevronLeftIcon className="h-7 w-7" aria-hidden />
          </Link>
          <h1 className="min-w-0 flex-1 text-[22px] font-bold leading-tight text-primary-dark">{field.name}</h1>
          <Link to={`/fields/${field.id}/edit`} className="flex min-h-[48px] shrink-0 items-center gap-1.5 rounded-xl px-3 text-[15px] font-bold text-primary active:bg-primary-soft">
            <PencilIcon className="h-4 w-4" aria-hidden /> {t('common.edit')}
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label={t('fd.moreOptions')}
              className="-mr-2 grid h-12 w-12 place-items-center rounded-full text-primary-dark active:bg-primary-soft">
              
              <MoreVerticalIcon className="h-5 w-5" aria-hidden />
            </button>
            {menuOpen &&
            <>
                <button type="button" className="fixed inset-0 z-10 cursor-default" aria-label={t('fd.closeMenu')} onClick={() => setMenuOpen(false)} />
                <div role="menu" className="absolute right-0 top-12 z-20 w-60 rounded-2xl border border-line bg-card p-1 shadow-card">
                  {field.archived ?
                <button type="button" role="menuitem" onClick={doRestore} className="flex min-h-[48px] w-full items-center gap-2 rounded-xl px-3 text-left text-[15px] font-semibold text-ink active:bg-canvas">
                      <ArchiveRestoreIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden /> {t('field.restore')}
                    </button> :

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setConfirmArchive(true);
                  }}
                  className="flex min-h-[48px] w-full items-center gap-2 rounded-xl px-3 text-left text-[15px] font-semibold text-ink active:bg-canvas">
                  
                      <ArchiveIcon className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden /> {t('field.archive')}
                    </button>
                }
                </div>
              </>
            }
          </div>
        </div>
      </header>

      <PageBody className="pt-4">
        {field.archived &&
        <div role="status" className="mb-4 flex items-center gap-3 rounded-2xl border border-line bg-card p-3">
            <ArchiveIcon className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
            <p className="min-w-0 flex-1 text-[15px] leading-snug text-ink">{t('fd.archivedBanner')}</p>
            <button type="button" onClick={doRestore} className="min-h-[48px] shrink-0 rounded-xl bg-primary px-3 py-2 text-[14px] font-bold leading-tight text-white">
              {t('field.restore')}
            </button>
          </div>
        }

        <FieldPreview field={field} className="h-44 w-full rounded-card" />

        <div className="mt-4 rounded-card border border-line bg-card p-4 shadow-card">
          <StatusBadge meta={fieldStatusMeta[status.status]} />
          <p className="mt-2 text-[15px] leading-snug text-ink">{t(status.noteKey, status.noteVars)}</p>
          <dl className="mt-4 space-y-3 border-t border-line pt-4">
            <div>
              <dt className="text-[13px] text-ink-muted">{t('fd.address')}</dt>
              <dd className="text-[15px] font-semibold text-ink">
                {fieldAddress(field) || notRecorded}
                {field.location.detail && <span className="block font-normal text-ink-muted">{field.location.detail}</span>}
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
              {summary.map((s) =>
              <div key={s.id} className="min-w-0">
                  <dt className="text-[13px] leading-snug text-ink-muted">{s.label}</dt>
                  <dd className={`text-[15px] leading-snug ${s.value ? 'font-semibold text-ink' : 'text-ink-muted'}`}>{s.value ?? notRecorded}</dd>
                </div>
              )}
              <div className="col-span-2">
                <dt className="text-[13px] text-ink-muted">{t('fd.locSource')}</dt>
                <dd className="text-[15px] font-semibold text-ink">{t(locationSourceKey[field.location.source])}</dd>
              </div>
            </div>
          </dl>
        </div>

        {!field.archived ?
        <Link
          to={`/scan?field=${field.id}`}
          className="mt-4 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-[17px] font-bold text-white shadow-cta">
          
            <CameraIcon className="h-5 w-5 shrink-0" aria-hidden /> {t('common.scanLeaf')}
          </Link> :

        <p className="mt-4 text-center text-[14px] text-ink-muted">{t('fd.restoreToScan')}</p>
        }

        <section aria-labelledby="fd-scans" className="mt-7">
          <SectionHeading id="fd-scans" title={t('fd.recentScans')} />
          {fieldScans.length ?
          <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card shadow-card">
              {fieldScans.map((s) =>
            <ScanRecordRow key={s.id} scan={s} scoped />
            )}
            </div> :

          <EmptyState icon={CameraIcon} bordered title={t('fd.noScans')} description={t('fd.noScansText')} />
          }
        </section>

        <section aria-labelledby="fd-obs" className="mt-7">
          <SectionHeading
            id="fd-obs"
            title={t('fd.observations')}
            action={
            <Link to={`/fields/${field.id}/observations/new`} className="-mr-2 flex min-h-[48px] items-center gap-1 px-2 text-right text-[15px] font-bold leading-tight text-primary">
                <PlusIcon className="h-4 w-4 shrink-0" aria-hidden /> {t('common.addObservation')}
              </Link>
            } />
          
          {fieldObs.length ?
          <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card shadow-card">
              {fieldObs.map((o) =>
            <ObservationItem key={o.id} observation={o} canEdit />
            )}
            </ul> :

          <EmptyState icon={NotebookPenIcon} bordered title={t('fd.noObs')} description={t('fd.noObsText')} />
          }
        </section>

        <section aria-labelledby="fd-tasks" className="mt-7">
          <SectionHeading id="fd-tasks" title={t('fd.tasks')} />
          {fieldReminders.length ?
          <div className="space-y-3">
              {fieldReminders.map((r) =>
            <ReminderCard key={r.id} reminder={r} onView={() => setActiveReminder(r)} />
            )}
            </div> :

          <p className="rounded-2xl border border-dashed border-line bg-card p-4 text-[15px] text-ink-muted">{t('fd.noTasks')}</p>
          }
        </section>
      </PageBody>

      <ConfirmDialog
        open={confirmArchive}
        title={t('fd.archiveTitle')}
        description={t('fd.archiveText')}
        confirmLabel={t('field.archive')}
        cancelLabel={t('common.cancel')}
        onConfirm={doArchive}
        onCancel={cancelArchive} />
      
      <ReminderSheet
        reminder={activeReminder}
        open={!!activeReminder}
        onClose={closeReminder}
        onViewRecord={(id) => {
          setActiveReminder(null);
          navigate(`/records/${id}`, { state: { from: `/fields/${field.id}` } });
        }} />
      
    </div>);

}