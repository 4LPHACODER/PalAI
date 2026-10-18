import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { FormActionBar } from '../components/form/FormActionBar';
import { OfflineFormNote } from '../components/form/OfflineFormNote';
import { FormHeader } from '../components/FormHeader';
import { PageBody } from '../components/PageBody';
import { ProfileFormFields } from '../components/profile/ProfileFormFields';
import { UnsavedChangesDialog } from '../components/UnsavedChangesDialog';
import { useApp } from '../contexts/AppContext';
import { useSession } from '../contexts/SessionContext';
import { useProfileForm } from '../hooks/useProfileForm';
import { useT } from '../hooks/useT';
import { useUnsavedChangesGuard } from '../hooks/useUnsavedChangesGuard';
import { wait } from '../utils/farm';

export function ProfileEdit() {
  const t = useT();
  const navigate = useNavigate();
  const { profile, updateProfile } = useApp();
  const { language, setLanguage } = useSession();
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const form = useProfileForm({
    displayName: profile.displayName,
    province: profile.province,
    city: profile.city,
    barangay: profile.barangay,
    mobile: profile.mobile,
    cooperative: profile.cooperative,
    photo: profile.photo,
    language
  });
  const guard = useUnsavedChangesGuard(form.dirty && !saving);

  const save = async () => {
    if (savingRef.current || !form.validate()) return;
    savingRef.current = true;
    setSaving(true);
    await wait(400);
    const { language: lang, ...rest } = form.values;
    setLanguage(lang);
    updateProfile({ ...rest, displayName: rest.displayName.trim() });
    toast.success('Profile saved', { description: 'Saved on this device.' });
    guard.allowNextNavigation();
    navigate('/profile', { replace: true });
  };

  return (
    <>
      <FormHeader title={t('profile.edit')} cancelTo="/profile" />
      <PageBody className="flex-1 pb-8 pt-5">
        <OfflineFormNote />
        <ProfileFormFields values={form.values} errors={form.errors} set={form.set} />
      </PageBody>
      <FormActionBar>
        <Link to="/profile" className="flex h-14 flex-1 items-center justify-center rounded-2xl border border-line text-[16px] font-bold text-primary">
          {t('common.cancel')}
        </Link>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex h-14 flex-[2] items-center justify-center gap-2 rounded-2xl bg-primary text-[16px] font-bold text-white disabled:opacity-80">
          
          {saving && <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden />}
          {saving ? 'Saving…' : t('common.saveChanges')}
        </button>
      </FormActionBar>
      <UnsavedChangesDialog blocker={guard.blocker} />
    </>);

}