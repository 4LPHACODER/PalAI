import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordField } from '../../components/form/PasswordField';
import { TextField } from '../../components/form/TextField';
import { useSession } from '../../contexts/SessionContext';
import { useT } from '../../hooks/useT';
import { wait } from '../../utils/farm';
import {
  focusFirstError,
  validateConfirmPassword,
  validateEmail,
  validateNewPassword,
  validateRequired } from
'../../utils/validation';

type Key = 'fullName' | 'email' | 'password' | 'confirm';
type Errors = Partial<Record<Key, string>>;

export function Register() {
  const t = useT();
  const navigate = useNavigate();
  const { register, signInDemo } = useSession();
  // Passwords stay in component memory only — never written to storage.
  const [values, setValues] = useState<Record<Key, string>>({ fullName: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validateOne = (key: Key, v = values): string | undefined => {
    if (key === 'fullName') return validateRequired(v.fullName, 'Enter your full name.');
    if (key === 'email') return validateEmail(v.email);
    if (key === 'password') return validateNewPassword(v.password);
    return validateConfirmPassword(v.password, v.confirm);
  };

  const change = (key: Key, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors[key]) setErrors((e) => ({ ...e, [key]: validateOne(key, next) }));
  };

  const blur = (key: Key) => {
    if (values[key]) setErrors((e) => ({ ...e, [key]: validateOne(key) }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const errs: Errors = {
      fullName: validateOne('fullName'),
      email: validateOne('email'),
      password: validateOne('password'),
      confirm: validateOne('confirm')
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      focusFirstError(errs, 'reg-');
      return;
    }
    setLoading(true);
    await wait(800);
    if (!register(values.fullName, values.email)) {
      setLoading(false);
      setErrors({ email: 'An account with this email already exists on this device. Sign in instead.' });
      focusFirstError({ email: 'x' }, 'reg-');
      return;
    }
    navigate('/setup', { replace: true });
  };

  return (
    <AuthLayout title={t('auth.createTitle')} subtitle="It’s free. Your records stay on this device in this prototype." backTo="/signin">
      <form onSubmit={submit} noValidate className="space-y-5">
        <TextField
          id="reg-fullName"
          label={t('auth.fullName')}
          autoComplete="name"
          value={values.fullName}
          onChange={(e) => change('fullName', e.target.value)}
          onBlur={() => blur('fullName')}
          error={errors.fullName} />
        
        <TextField
          id="reg-email"
          label={t('auth.email')}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          value={values.email}
          onChange={(e) => change('email', e.target.value)}
          onBlur={() => blur('email')}
          error={errors.email} />
        
        <PasswordField
          id="reg-password"
          label={t('auth.password')}
          autoComplete="new-password"
          value={values.password}
          onChange={(e) => change('password', e.target.value)}
          onBlur={() => blur('password')}
          error={errors.password}
          hint="At least 8 characters." />
        
        <PasswordField
          id="reg-confirm"
          label={t('auth.confirmPassword')}
          autoComplete="new-password"
          value={values.confirm}
          onChange={(e) => change('confirm', e.target.value)}
          onBlur={() => blur('confirm')}
          error={errors.confirm} />
        
        <p className="rounded-2xl bg-card p-3 text-[14px] leading-snug text-ink-muted ring-1 ring-line">
          Demo: no verification email is sent and no account is created on a server. Your password is not saved.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[17px] font-bold text-white disabled:opacity-80">
          
          {loading && <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden />}
          {loading ? 'Creating account…' : t('auth.createAccount')}
        </button>
      </form>
      <div className="mt-6 space-y-2 text-center">
        <p className="text-[15px] text-ink-muted">
          Already have an account?{' '}
          <Link to="/signin" className="inline-flex h-12 items-center font-bold text-primary">
            {t('auth.signIn')}
          </Link>
        </p>
        <button
          type="button"
          onClick={() => {
            signInDemo();
            navigate('/', { replace: true });
          }}
          className="h-14 w-full rounded-2xl border-2 border-accent bg-accent-soft text-[17px] font-bold text-primary-dark">
          
          {t('common.tryDemo')}
        </button>
      </div>
    </AuthLayout>);

}