import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2Icon, MailCheckIcon } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { TextField } from '../../components/form/TextField';
import { useT } from '../../hooks/useT';
import { wait } from '../../utils/farm';
import { focusFirstError, validateEmail } from '../../utils/validation';

export function ForgotPassword() {
  const t = useT();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [phase, setPhase] = useState<'request' | 'sending' | 'sent'>('request');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    setError(err);
    if (err) {
      focusFirstError({ email: err }, 'forgot-');
      return;
    }
    setPhase('sending');
    await wait(800);
    setPhase('sent');
  };

  if (phase === 'sent') {
    return (
      <AuthLayout title="Check your email" backTo="/signin">
        <div role="status" className="flex flex-col items-center rounded-card border border-line bg-card px-5 py-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-primary-soft text-primary">
            <MailCheckIcon className="h-8 w-8" aria-hidden />
          </span>
          <p className="mt-4 text-[16px] leading-relaxed text-ink">
            If an account exists for <span className="font-semibold">{email.trim()}</span>, a password reset link would be sent
            there.
          </p>
          <p className="mt-3 rounded-full bg-canvas px-3 py-1 text-[13px] font-semibold text-ink-muted">Demo—no email sent</p>
        </div>
        <div className="mt-6 space-y-2">
          <Link to="/signin" className="flex h-14 w-full items-center justify-center rounded-2xl bg-primary text-[17px] font-bold text-white">
            {t('auth.backToSignIn')}
          </Link>
          <button type="button" onClick={() => setPhase('request')} className="h-12 w-full text-[15px] font-bold text-primary">
            Use a different email
          </button>
        </div>
      </AuthLayout>);

  }

  return (
    <AuthLayout title={t('auth.resetTitle')} subtitle="Enter the email you used for PalAI." backTo="/signin">
      <form onSubmit={submit} noValidate className="space-y-5">
        <TextField
          id="forgot-email"
          label={t('auth.email')}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(undefined);
          }}
          error={error} />
        
        <button
          type="submit"
          disabled={phase === 'sending'}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[17px] font-bold text-white disabled:opacity-80">
          
          {phase === 'sending' && <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden />}
          {phase === 'sending' ? 'Sending…' : t('auth.sendLink')}
        </button>
      </form>
    </AuthLayout>);

}