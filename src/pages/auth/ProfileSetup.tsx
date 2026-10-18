import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, ChevronLeftIcon, Loader2Icon, SproutIcon } from 'lucide-react';
import { OfflineFormNote } from '../../components/form/OfflineFormNote';
import { PageBody } from '../../components/PageBody';
import { ProfileFormFields } from '../../components/profile/ProfileFormFields';
import { useApp } from '../../contexts/AppContext';
import { useSession } from '../../contexts/SessionContext';
import { useProfileForm } from '../../hooks/useProfileForm';
import { useT } from '../../hooks/useT';
import { wait } from '../../utils/farm';

export function ProfileSetup() {
  const t = useT();
  const navigate = useNavigate();
  const { profile, updateProfile } = useApp();
  const { language, setLanguage, signOut } = useSession();
  const [phase, setPhase] = useState<'form' | 'success'>('form');
  const [saving, setSaving] = useState(false);
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

  if (profile.setupComplete && phase === 'form') return <Navigate to="/" replace />;

  const save = async () => {
    if (saving || !form.validate()) return;
    setSaving(true);
    await wait(500);
    const { language: lang, ...rest } = form.values;
    setLanguage(lang);
    setPhase('success');
    updateProfile({ ...rest, displayName: rest.displayName.trim(), setupComplete: true });
  };

  if (phase === 'success') {
    return (
      <div className="min-h-screen w-full bg-primary-soft">
        <div className="mx-auto flex min-h-screen max-w-[640px] flex-col justify-center bg-canvas px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-[calc(env(safe-area-inset-top)+24px)] md:border-x md:border-line">
          <div role="status" className="flex flex-col items-center text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="grid h-20 w-20 place-items-center rounded-full bg-primary text-white">
              
              <CheckIcon className="h-10 w-10" strokeWidth={3} aria-hidden />
            </motion.span>
            <h1 className="mt-4 text-[26px] font-bold text-primary-dark">Profile saved</h1>
            <p className="mt-1 text-[16px] text-ink-muted">Welcome, {form.values.displayName.trim()}. Saved on this device.</p>
          </div>
          <section aria-labelledby="first-field" className="mt-8 rounded-card border border-line bg-card p-5 shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
              <SproutIcon className="h-6 w-6" aria-hidden />
            </span>
            <h2 id="first-field" className="mt-3 text-[20px] font-bold text-primary-dark">
              Would you like to add your first field?
            </h2>
            <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">You can still scan leaves without adding a field.</p>
            <div className="mt-5 space-y-2">
              <button type="button" onClick={() => navigate('/fields/new', { replace: true })} className="h-14 w-full rounded-2xl bg-primary text-[17px] font-bold text-white">
                Add My Field
              </button>
              <button type="button" onClick={() => navigate('/', { replace: true })} className="h-12 w-full rounded-2xl border border-line text-[16px] font-bold text-primary">
                Do This Later
              </button>
            </div>
          </section>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-primary-soft">
      <div className="mx-auto flex min-h-screen max-w-[640px] flex-col bg-canvas md:border-x md:border-line">
        <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+12px)] backdrop-blur min-[390px]:px-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => signOut()}
              aria-label="Back to sign in"
              className="-ml-3 grid h-12 w-12 place-items-center rounded-full text-primary-dark active:bg-primary-soft">
              
              <ChevronLeftIcon className="h-7 w-7" aria-hidden />
            </button>
            <div>
              <h1 className="text-[24px] font-bold leading-tight text-primary-dark">Set up your profile</h1>
              <p className="text-[14px] text-ink-muted">Takes about a minute</p>
            </div>
          </div>
        </header>
        <PageBody className="flex-1 pb-6 pt-5">
          <OfflineFormNote />
          <ProfileFormFields values={form.values} errors={form.errors} set={form.set} />
        </PageBody>
        <div className="sticky bottom-0 flex gap-2 border-t border-line bg-card px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 min-[390px]:px-5">
          <button type="button" onClick={() => signOut()} className="h-14 flex-1 rounded-2xl border border-line text-[16px] font-bold text-primary">
            {t('common.back')}
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="flex h-14 flex-[2] items-center justify-center gap-2 rounded-2xl bg-primary text-[16px] font-bold text-white disabled:opacity-80">
            
            {saving && <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden />}
            {saving ? 'Saving…' : t('common.saveContinue')}
          </button>
        </div>
      </div>
    </div>);

}