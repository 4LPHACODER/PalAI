import React, { useCallback, useState } from 'react';
import { PresentationIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Building2Icon,
  CloudIcon,
  HelpCircleIcon,
  InfoIcon,
  LanguagesIcon,
  LogOutIcon,
  PencilIcon,
  PlayCircleIcon,
  RotateCcwIcon,
  Share2Icon } from
'lucide-react';
import { toast } from 'sonner';
import { Avatar } from '../components/Avatar';
import { BottomSheet } from '../components/BottomSheet';
import { BrandMark } from '../components/BrandMark';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ConnectionInfoSheet } from '../components/ConnectionInfoSheet';
import { DemoTag } from '../components/DemoTag';
import { SwitchRow } from '../components/form/SwitchRow';
import { LanguageSheet } from '../components/LanguageSheet';
import { PageBody } from '../components/PageBody';
import { PageHeader } from '../components/PageHeader';
import { SettingsRow } from '../components/SettingsRow';
import { useApp } from '../contexts/AppContext';
import { useSession } from '../contexts/SessionContext';
import { photoTips } from '../data/photoTips';
import { languageOptions } from '../data/translations';
import { useT } from '../hooks/useT';
import { syncStateMeta } from '../utils/status';

type ProfileSheet = 'language' | 'connection' | 'help' | 'about' | 'signOut' | 'reset' | null;

export function Profile() {
  const t = useT();
  const { profile, sharing, isDemo, syncState, resetDemoData, simulateStorageFailure, setSimulateStorageFailure } = useApp();
  const { language, signOut } = useSession();
  const [sheet, setSheet] = useState<ProfileSheet>(null);
  const close = useCallback(() => setSheet(null), []);
  const place = [profile.barangay && `Brgy. ${profile.barangay}`, profile.city, profile.province].filter(Boolean).join(', ');

  return (
    <div>
      <PageHeader title={t('nav.profile')} right={isDemo ? <DemoTag /> : undefined} />
      <PageBody className="pt-5">
        <section className="rounded-card border border-line bg-card p-4 shadow-card">
          <div className="flex items-center gap-4">
            <Avatar name={profile.fullName || profile.displayName} photo={profile.photo} size={64} />
            <div className="min-w-0">
              <h2 className="text-[20px] font-bold leading-tight text-primary-dark">{profile.fullName || profile.displayName}</h2>
              {place && <p className="mt-0.5 text-[15px] text-ink-muted">{place}</p>}
              {profile.cooperative && <p className="mt-0.5 text-[14px] text-ink">{profile.cooperative}</p>}
            </div>
          </div>
          <p className="mt-3 border-t border-line pt-3 text-[14px] text-ink-muted">
            {profile.email ?? 'No email'} · {isDemo ? 'Sample demo account' : 'Account on this device (simulated)'}
          </p>
          <Link
            to="/profile/edit"
            className="mt-3 flex h-12 w-full items-center justify-center gap-1.5 rounded-xl border border-line text-[16px] font-bold text-primary active:bg-primary-soft">
            
            <PencilIcon className="h-4 w-4" aria-hidden /> {t('profile.edit')}
          </Link>
        </section>

        <h3 className="mb-2 mt-7 text-[15px] font-bold text-ink-muted">Settings</h3>
        <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
          <SettingsRow
            icon={LanguagesIcon}
            label={t('common.language')}
            value={languageOptions.find((l) => l.code === language)?.label}
            onClick={() => setSheet('language')} />
          
          <SettingsRow icon={Share2Icon} label={t('profile.sharing')} value={sharing.enabled ? 'On' : 'Off'} to="/profile/sharing" />
          <SettingsRow icon={CloudIcon} label="Offline & sync" description={syncStateMeta[syncState].label} onClick={() => setSheet('connection')} />
          <SettingsRow icon={PlayCircleIcon} label={t('profile.replay')} to="/welcome?replay=1" />
        </div>

        <h3 className="mb-2 mt-7 text-[15px] font-bold text-ink-muted">Help</h3>
        <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
          <SettingsRow icon={HelpCircleIcon} label="Photo tips" onClick={() => setSheet('help')} />
          <SettingsRow icon={InfoIcon} label="About PalAI" onClick={() => setSheet('about')} />
          <SettingsRow icon={PresentationIcon} label="PalAI overview" description="Mobile screening and drone insights" to="/landing" />
        </div>

        <h3 className="mb-2 mt-7 text-[15px] font-bold text-ink-muted">Demo</h3>
        <div className="divide-y divide-line overflow-hidden rounded-card border-2 border-dashed border-accent/60 bg-card">
          <SettingsRow
            icon={Building2Icon}
            label={t('profile.workspace')}
            badge={<DemoTag label="Demo" />}
            description="Demo navigation only. It does not grant any account permissions."
            to="/workspace" />
          
          {isDemo && <SettingsRow icon={RotateCcwIcon} label="Reset sample data" description="Restore Juan’s original fields and records." onClick={() => setSheet('reset')} />}
          <SwitchRow
            id="sim-storage"
            label="Simulate storage failure"
            description="Preview what happens if this device can’t save."
            checked={simulateStorageFailure}
            onChange={setSimulateStorageFailure} />
          
        </div>

        <button
          type="button"
          onClick={() => setSheet('signOut')}
          className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-line bg-card text-[16px] font-bold text-danger">
          
          <LogOutIcon className="h-5 w-5" aria-hidden /> {t('common.signOut')}
        </button>
        <p className="mt-4 text-center text-[13px] leading-relaxed text-ink-muted">PalAI prototype · Records are saved on this device</p>
      </PageBody>

      <LanguageSheet open={sheet === 'language'} onClose={close} />
      <ConnectionInfoSheet open={sheet === 'connection'} onClose={close} />

      <BottomSheet open={sheet === 'help'} onClose={close} title="Photo tips">
        <ul className="space-y-3 pb-1">
          {photoTips.map(({ icon: Icon, title, text }) =>
          <li key={title} className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-[16px] font-semibold text-ink">{title}</p>
                <p className="text-[14px] text-ink-muted">{text}</p>
              </div>
            </li>
          )}
        </ul>
      </BottomSheet>

      <BottomSheet open={sheet === 'about'} onClose={close} title="About PalAI">
        <BrandMark showTagline />
        <p className="mt-4 text-[15px] leading-relaxed text-ink">
          PalAI helps rice farmers photograph leaves, see possible signs of disease, and keep simple field records. It is a guide, not a
          diagnosis.
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
          This is an early prototype. Accounts, screening results, and sync states are simulated. All names and records are fictional.
        </p>
      </BottomSheet>

      <ConfirmDialog
        open={sheet === 'signOut'}
        title="Sign out?"
        description="Your records stay saved on this device. You can sign in again or try the demo."
        confirmLabel={t('common.signOut')}
        cancelLabel={t('common.cancel')}
        onConfirm={signOut}
        onCancel={close} />
      
      <ConfirmDialog
        open={sheet === 'reset'}
        title="Reset sample data?"
        description="Fields, observations, and settings you changed in the demo will go back to the original sample."
        confirmLabel="Reset"
        cancelLabel={t('common.cancel')}
        tone="danger"
        onConfirm={() => {
          resetDemoData();
          close();
          toast.success('Sample data restored');
        }}
        onCancel={close} />
      
    </div>);

}