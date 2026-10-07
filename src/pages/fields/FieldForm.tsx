import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader2Icon, SearchXIcon } from 'lucide-react';
import { toast } from 'sonner';
import { EmptyState } from '../../components/EmptyState';
import { DetailsStage } from '../../components/fields/DetailsStage';
import { LocationStage } from '../../components/fields/LocationStage';
import { ReviewStage } from '../../components/fields/ReviewStage';
import { FormActionBar } from '../../components/form/FormActionBar';
import { OfflineFormNote } from '../../components/form/OfflineFormNote';
import { StageIndicator } from '../../components/form/StageIndicator';
import { FormHeader } from '../../components/FormHeader';
import { PageBody } from '../../components/PageBody';
import { UnsavedChangesDialog } from '../../components/UnsavedChangesDialog';
import { useApp } from '../../contexts/AppContext';
import { inputFromValues, useFieldForm } from '../../hooks/useFieldForm';
import { useT } from '../../hooks/useT';
import { useUnsavedChangesGuard } from '../../hooks/useUnsavedChangesGuard';
import { Field } from '../../types/farm';
import { wait } from '../../utils/farm';

export function FieldForm({ mode }: {mode: 'new' | 'edit';}) {
  const { fieldId } = useParams();
  const { getFieldById } = useApp();
  const field = mode === 'edit' ? getFieldById(fieldId) : undefined;

  if (mode === 'edit' && !field) {
    return (
      <PageBody className="pt-[calc(env(safe-area-inset-top)+32px)]">
        <EmptyState
          icon={SearchXIcon}
          tone="error"
          bordered
          title="Field not found"
          description="This field may have been removed."
          action={
          <Link to="/fields" className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-[16px] font-bold text-white">
              Back to My Fields
            </Link>
          } />
        
      </PageBody>);

  }
  return <FieldFormContent key={field?.id ?? 'new'} field={field} />;
}

function FieldFormContent({ field }: {field?: Field;}) {
  const t = useT();
  const navigate = useNavigate();
  const { addField, updateField } = useApp();
  const form = useFieldForm(field);
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const guard = useUnsavedChangesGuard(form.dirty && !saving);
  const isEdit = !!field;
  const cancelTo = field ? `/fields/${field.id}` : '/fields';
  const stages = [t('field.stageDetails'), t('field.stageLocation'), t('field.stageReview')];

  const save = async () => {
    if (savingRef.current) return; // prevents duplicate fields from repeated taps
    if (!form.validateAll()) return;
    savingRef.current = true;
    setSaving(true);
    await wait(450);
    const input = inputFromValues(form.values);
    let id: string;
    if (field) {
      updateField(field.id, input);
      id = field.id;
      toast.success('Field updated', { description: 'Saved on this device.' });
    } else {
      id = addField(input).id;
      toast.success('Field added', { description: 'It’s now in My Fields and the Home field selector.' });
    }
    guard.allowNextNavigation();
    navigate(`/fields/${id}`, { replace: true });
  };

  return (
    <>
      <FormHeader title={isEdit ? t('field.editField') : t('field.addField')} subtitle={field?.name} cancelTo={cancelTo}>
        <StageIndicator stages={stages} current={form.stage} maxReached={form.maxStage} onSelect={form.goTo} />
      </FormHeader>

      <PageBody className="flex-1 pb-8 pt-5">
        <OfflineFormNote />
        {form.stage === 0 && <DetailsStage values={form.values} errors={form.errors} set={form.set} />}
        {form.stage === 1 && <LocationStage values={form.values} errors={form.errors} set={form.set} setMany={form.setMany} />}
        {form.stage === 2 && <ReviewStage values={form.values} onEdit={form.goTo} />}
      </PageBody>

      <FormActionBar>
        {form.stage > 0 ?
        <button type="button" onClick={form.back} className="h-14 flex-1 rounded-2xl border border-line text-[16px] font-bold text-primary">
            {t('common.back')}
          </button> :

        <Link to={cancelTo} className="flex h-14 flex-1 items-center justify-center rounded-2xl border border-line text-[16px] font-bold text-primary">
            {t('common.cancel')}
          </Link>
        }
        {form.stage < 2 ?
        <button type="button" onClick={form.next} className="h-14 flex-[2] rounded-2xl bg-primary text-[16px] font-bold text-white">
            {t('common.next')}
          </button> :

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex h-14 flex-[2] items-center justify-center gap-2 rounded-2xl bg-primary text-[16px] font-bold text-white disabled:opacity-80">
          
            {saving && <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden />}
            {saving ? 'Saving…' : isEdit ? t('common.saveChanges') : t('field.saveField')}
          </button>
        }
      </FormActionBar>

      <UnsavedChangesDialog blocker={guard.blocker} />
    </>);

}