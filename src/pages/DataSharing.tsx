import React, { useCallback, useState } from 'react';
import { CheckIcon, ShieldCheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { DemoTag } from '../components/DemoTag';
import { FormActionBar } from '../components/form/FormActionBar';
import { SwitchRow } from '../components/form/SwitchRow';
import { FormHeader } from '../components/FormHeader';
import { PageBody } from '../components/PageBody';
import { UnsavedChangesDialog } from '../components/UnsavedChangesDialog';
import { useApp } from '../contexts/AppContext';
import { sampleOrganizations } from '../data/organizations';
import { useT } from '../hooks/useT';
import { useUnsavedChangesGuard } from '../hooks/useUnsavedChangesGuard';
import { SharingPrefs } from '../types/farm';
import { shortDate } from '../utils/format';

type Draft = Omit<SharingPrefs, 'updatedAt'>;

export function DataSharing() {
  const t = useT();
  const { sharing, activeFields, getFieldById, saveSharing, stopSharing } = useApp();
  const toDraft = (s: SharingPrefs): Draft => ({
    enabled: s.enabled,
    organizationId: s.organizationId,
    fieldIds: s.fieldIds,
    includePhotos: s.includePhotos,
    includeObservations: s.includeObservations,
    includePreciseLocation: s.includePreciseLocation
  });
  const [saved, setSaved] = useState<Draft>(() => toDraft(sharing));
  const [draft, setDraft] = useState<Draft>(saved);
  const [errors, setErrors] = useState<{org?: string;fields?: string;}>({});
  const [confirmStop, setConfirmStop] = useState(false);
  const cancelStop = useCallback(() => setConfirmStop(false), []);
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const guard = useUnsavedChangesGuard(dirty);

  const org = sampleOrganizations.find((o) => o.id === sharing.organizationId);
  const sharedNames = sharing.fieldIds.map((id) => getFieldById(id)?.name).filter(Boolean);

  const update = (patch: Partial<Draft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors({});
  };

  const toggleField = (id: string) =>
  update({ fieldIds: draft.fieldIds.includes(id) ? draft.fieldIds.filter((f) => f !== id) : [...draft.fieldIds, id] });

  const save = () => {
    if (draft.enabled) {
      const errs = {
        org: draft.organizationId ? undefined : 'Choose an organization.',
        fields: draft.fieldIds.length ? undefined : 'Choose at least one field to share.'
      };
      setErrors(errs);
      if (errs.org || errs.fields) return;
    }
    const next = draft.enabled ? draft : { ...draft, fieldIds: [] };
    saveSharing(next);
    setSaved(next);
    setDraft(next);
    toast.success('Preferences saved', { description: 'Demo: nothing is actually shared.' });
  };

  const doStop = () => {
    stopSharing();
    const next = { ...draft, enabled: false, fieldIds: [] };
    setSaved(next);
    setDraft(next);
    setConfirmStop(false);
    toast.success('Sharing stopped');
  };

  return (
    <>
      <FormHeader title={t('profile.sharing')} cancelTo="/profile" />
      <PageBody className="flex-1 space-y-5 pb-8 pt-5">
        <div>
          <p className="text-[17px] leading-relaxed text-ink">
            You choose whether participating agricultural organizations can view selected field records.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <DemoTag label="Demo · sample organizations" />
            <span className="text-[14px] text-ink-muted">Nothing is actually shared in this prototype.</span>
          </div>
        </div>

        <div role="status" className={`rounded-2xl p-4 ${sharing.enabled ? 'bg-primary-soft' : 'border border-line bg-card'}`}>
          <p className="text-[16px] font-bold text-primary-dark">{sharing.enabled ? 'Sharing is on' : 'Sharing is off'}</p>
          <p className="mt-1 text-[15px] leading-snug text-ink">
            {sharing.enabled && org ?
            `Sharing ${sharedNames.join(', ')} with ${org.name} (sample).` :
            'No field records are shared. This is the default.'}
          </p>
          {sharing.updatedAt && <p className="mt-1 text-[13px] text-ink-muted">Last saved {shortDate(sharing.updatedAt)}</p>}
        </div>

        <div className="overflow-hidden rounded-card border border-line bg-card">
          <SwitchRow
            id="share-enabled"
            label="Share selected field records"
            description="Optional. Off by default."
            checked={draft.enabled}
            onChange={(v) => update({ enabled: v })} />
          
        </div>

        {draft.enabled &&
        <>
            <fieldset>
              <legend className="text-[16px] font-bold text-primary-dark">Organization</legend>
              {errors.org &&
            <p role="alert" className="mt-1 text-[14px] font-medium text-danger">
                  {errors.org}
                </p>
            }
              <div role="radiogroup" className="mt-2 space-y-2">
                {sampleOrganizations.map((o) => {
                const selected = draft.organizationId === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => update({ organizationId: o.id })}
                    className={`flex min-h-[64px] w-full items-center gap-3 rounded-2xl border-2 px-4 py-2 text-left ${
                    selected ? 'border-primary bg-primary-soft' : 'border-line bg-card'}`
                    }>
                    
                      <span className="min-w-0 flex-1">
                        <span className="block text-[16px] font-semibold text-ink">{o.name}</span>
                        <span className="block text-[14px] text-ink-muted">{o.type} · Sample organization</span>
                      </span>
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${selected ? 'bg-primary text-white' : 'border-2 border-line'}`}>
                        {selected && <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden />}
                      </span>
                    </button>);

              })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-[16px] font-bold text-primary-dark">Fields to share</legend>
              <p className="mt-1 text-[14px] text-ink-muted">Only the fields you tick are shared. Others stay private.</p>
              {errors.fields &&
            <p role="alert" className="mt-1 text-[14px] font-medium text-danger">
                  {errors.fields}
                </p>
            }
              <div className="mt-2 space-y-2">
                {activeFields.length === 0 && <p className="text-[15px] text-ink-muted">You have no active fields to share.</p>}
                {activeFields.map((f) => {
                const checked = draft.fieldIds.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggleField(f.id)}
                    className={`flex min-h-[56px] w-full items-center gap-3 rounded-2xl border-2 px-4 text-left ${
                    checked ? 'border-primary bg-primary-soft' : 'border-line bg-card'}`
                    }>
                    
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${checked ? 'bg-primary text-white' : 'border-2 border-ink-muted/40'}`}>
                        {checked && <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden />}
                      </span>
                      <span className="flex-1 text-[16px] font-semibold text-ink">{f.name}</span>
                    </button>);

              })}
              </div>
            </fieldset>

            <div>
              <h3 className="text-[16px] font-bold text-primary-dark">What to include</h3>
              <div className="mt-2 divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
                <SwitchRow id="share-photos" label="Leaf photos" checked={draft.includePhotos} onChange={(v) => update({ includePhotos: v })} />
                <SwitchRow
                id="share-obs"
                label="Farmer observations"
                checked={draft.includeObservations}
                onChange={(v) => update({ includeObservations: v })} />
              
                <SwitchRow
                id="share-location"
                label="Precise field location"
                description="When off, only the barangay and city are shared."
                checked={draft.includePreciseLocation}
                onChange={(v) => update({ includePreciseLocation: v })} />
              
              </div>
            </div>
          </>
        }

        <p className="flex gap-2 text-[14px] leading-snug text-ink-muted">
          <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          Scanning and your personal records work the same whether sharing is on or off.
        </p>
      </PageBody>

      <FormActionBar>
        {sharing.enabled &&
        <button type="button" onClick={() => setConfirmStop(true)} className="h-14 flex-1 rounded-2xl border border-line text-[15px] font-bold text-danger">
            {t('common.stopSharing')}
          </button>
        }
        <button type="button" onClick={save} disabled={!dirty} className="h-14 flex-[2] rounded-2xl bg-primary text-[16px] font-bold text-white disabled:bg-line disabled:text-ink-muted">
          {t('common.savePreferences')}
        </button>
      </FormActionBar>

      <ConfirmDialog
        open={confirmStop}
        title="Stop sharing?"
        description="Organizations will no longer see your field records. Your records stay on this device."
        confirmLabel={t('common.stopSharing')}
        cancelLabel={t('common.cancel')}
        tone="danger"
        onConfirm={doStop}
        onCancel={cancelStop} />
      
      <UnsavedChangesDialog blocker={guard.blocker} />
    </>);

}