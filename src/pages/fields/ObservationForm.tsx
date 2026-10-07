import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader2Icon, SearchXIcon, UserRoundIcon } from 'lucide-react';
import { toast } from 'sonner';
import { EmptyState } from '../../components/EmptyState';
import { FormActionBar } from '../../components/form/FormActionBar';
import { OfflineFormNote } from '../../components/form/OfflineFormNote';
import { PhotoField } from '../../components/form/PhotoField';
import { TextField } from '../../components/form/TextField';
import { FormHeader } from '../../components/FormHeader';
import { PageBody } from '../../components/PageBody';
import { UnsavedChangesDialog } from '../../components/UnsavedChangesDialog';
import { useApp } from '../../contexts/AppContext';
import { useT } from '../../hooks/useT';
import { useUnsavedChangesGuard } from '../../hooks/useUnsavedChangesGuard';
import { Field, Observation } from '../../types/farm';
import { wait } from '../../utils/farm';
import { todayISO } from '../../utils/format';
import { focusFirstError, validatePastDate } from '../../utils/validation';

export function ObservationForm() {
  const { fieldId, observationId } = useParams();
  const { getFieldById, observations } = useApp();
  const field = getFieldById(fieldId);
  const existing = observationId ? observations.find((o) => o.id === observationId && o.fieldId === fieldId) : undefined;

  if (!field || observationId && !existing) {
    return (
      <PageBody className="pt-[calc(env(safe-area-inset-top)+32px)]">
        <EmptyState
          icon={SearchXIcon}
          tone="error"
          bordered
          title="Observation not found"
          description="It may have been removed, or the field no longer exists."
          action={
          <Link to="/fields" className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-[16px] font-bold text-white">
              Back to My Fields
            </Link>
          } />
        
      </PageBody>);

  }
  return <ObservationFormContent field={field} existing={existing} />;
}

type Values = {date: string;notes: string;photo: string | null;};

function ObservationFormContent({ field, existing }: {field: Field;existing?: Observation;}) {
  const t = useT();
  const navigate = useNavigate();
  const { addObservation, updateObservation } = useApp();
  const [initial] = useState<Values>({ date: existing?.date ?? todayISO(), notes: existing?.notes ?? '', photo: existing?.photo ?? null });
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<{date?: string;notes?: string;}>({});
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const dirty = JSON.stringify(values) !== JSON.stringify(initial);
  const guard = useUnsavedChangesGuard(dirty && !saving);
  const backTo = `/fields/${field.id}`;

  const set = <K extends keyof Values,>(k: K, v: Values[K]) => {
    setValues((x) => ({ ...x, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined, ...(k === 'photo' ? { notes: undefined } : {}) }));
  };

  const save = async () => {
    if (savingRef.current) return;
    const errs = {
      date: values.date ?
      validatePastDate(values.date, 'The observation date can’t be in the future.') :
      'Enter the date you made this observation.',
      notes: !values.notes.trim() && !values.photo ? 'Add a note or a photo.' : undefined
    };
    setErrors(errs);
    if (errs.date || errs.notes) {
      focusFirstError(errs, 'obs-');
      return;
    }
    savingRef.current = true;
    setSaving(true);
    await wait(350);
    const payload = { fieldId: field.id, date: values.date, notes: values.notes.trim(), photo: values.photo };
    if (existing) updateObservation(existing.id, payload);else
    addObservation(payload);
    toast.success('Observation saved', { description: `Added to ${field.name}’s timeline.` });
    guard.allowNextNavigation();
    navigate(backTo, { replace: true });
  };

  return (
    <>
      <FormHeader title={existing ? 'Edit Observation' : t('common.addObservation')} subtitle={field.name} cancelTo={backTo} />
      <PageBody className="flex-1 space-y-5 pb-8 pt-5">
        <OfflineFormNote />
        <div className="rounded-2xl border border-line bg-card p-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-2.5 py-0.5 text-[13px] font-semibold text-ink-muted ring-1 ring-inset ring-line">
            <UserRoundIcon className="h-3.5 w-3.5" aria-hidden /> {t('obs.label')}
          </span>
          <p className="mt-2 text-[15px] leading-snug text-ink">
            Your own note about the field. It is kept separate from AI screening, and a photo here stays an attachment — it is not
            screened.
          </p>
        </div>
        <TextField
          id="obs-date"
          label={t('obs.date')}
          type="date"
          max={todayISO()}
          value={values.date}
          onChange={(e) => set('date', e.target.value)}
          error={errors.date} />
        
        <TextField
          id="obs-notes"
          label={t('field.notes')}
          multiline
          value={values.notes}
          onChange={(e) => set('notes', e.target.value)}
          error={errors.notes}
          placeholder="What did you notice? e.g. brown spots near the canal, water level, pests." />
        
        <PhotoField
          id="obs-photo"
          label="Photo attachment"
          optional
          value={values.photo}
          onChange={(v) => set('photo', v)}
          hint="Kept with this note on this device. To screen a leaf, use Scan instead." />
        
      </PageBody>
      <FormActionBar>
        <Link to={backTo} className="flex h-14 flex-1 items-center justify-center rounded-2xl border border-line text-[16px] font-bold text-primary">
          {t('common.cancel')}
        </Link>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex h-14 flex-[2] items-center justify-center gap-2 rounded-2xl bg-primary text-[16px] font-bold text-white disabled:opacity-80">
          
          {saving && <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden />}
          {saving ? 'Saving…' : 'Save Observation'}
        </button>
      </FormActionBar>
      <UnsavedChangesDialog blocker={guard.blocker} />
    </>);

}