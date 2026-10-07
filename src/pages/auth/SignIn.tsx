import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircleIcon, Loader2Icon } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordField } from '../../components/form/PasswordField';
import { TextField } from '../../components/form/TextField';
import { useSession } from '../../contexts/SessionContext';
import { useT } from '../../hooks/useT';
import { wait } from '../../utils/farm';
import { focusFirstError, validateEmail } from '../../utils/validation';

export function SignIn() {
  const t = useT();
  const navigate = useNavigate();
  const { signIn, signInDemo } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string;password?: string;}>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const errs = { email: validateEmail(email), password: password ? undefined : 'Enter your password.' };
    setErrors(errs);
    setFormError(null);
    if (errs.email || errs.password) {
      focusFirstError(errs, 'signin-');
      return;
    }
    setLoading(true);
    await wait(700);
    if (signIn(email)) {
      navigate('/', { replace: true });
      return;
    }
    setLoading(false);
    setFormError('No account with this email was created on this device. Create an account, or try the demo.');
  };

  return (
    <AuthLayout title={t('auth.welcomeBack')} subtitle="Sign in to see your fields and records.">
      <form onSubmit={submit} noValidate className="space-y-5">
        {formError &&
        <p role="alert" className="flex gap-2 rounded-2xl bg-danger-soft p-3 text-[15px] leading-snug text-danger">
            <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            {formError}
          </p>
        }
        <TextField
          id="signin-email"
          label={t('auth.email')}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((x) => ({ ...x, email: undefined }));
          }}
          error={errors.email} />
        
        <div>
          <PasswordField
            id="signin-password"
            label={t('auth.password')}
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((x) => ({ ...x, password: undefined }));
            }}
            error={errors.password} />
          
          <Link to="/forgot-password" className="mt-1 inline-flex h-12 items-center text-[15px] font-bold text-primary">
            {t('auth.forgot')}
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[17px] font-bold text-white disabled:opacity-80">
          
          {loading && <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden />}
          {loading ? 'Signing in…' : t('auth.signIn')}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-[14px] text-ink-muted" aria-hidden>
        <span className="h-px flex-1 bg-line" />
        {t('auth.or')}
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="space-y-2">
        <Link to="/register" className="flex h-14 w-full items-center justify-center rounded-2xl border border-line bg-card text-[17px] font-bold text-primary">
          {t('auth.createAccount')}
        </Link>
        <button
          type="button"
          onClick={() => {
            signInDemo();
            navigate('/', { replace: true });
          }}
          className="h-14 w-full rounded-2xl border-2 border-accent bg-accent-soft text-[17px] font-bold text-primary-dark">
          
          {t('common.tryDemo')}
        </button>
        <p className="text-center text-[14px] text-ink-muted">Opens Juan Dela Cruz’s sample farm right away.</p>
      </div>
    </AuthLayout>);

}