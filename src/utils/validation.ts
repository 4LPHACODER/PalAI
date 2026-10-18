import { todayISO } from './format';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateRequired(value: string, message: string): string | undefined {
  return value.trim() ? undefined : message;
}

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'Enter your email address.';
  if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address, like name@example.com.';
  return undefined;
}

export function validateNewPassword(value: string): string | undefined {
  if (!value) return 'Create a password.';
  if (value.length < 8) return 'Use at least 8 characters.';
  return undefined;
}

export function validateConfirmPassword(password: string, confirm: string): string | undefined {
  if (!confirm) return 'Type your password again.';
  if (password !== confirm) return 'Passwords do not match.';
  return undefined;
}

export function validateArea(value: string): string | undefined {
  if (!value.trim()) return undefined;
  const n = Number(value);
  if (Number.isNaN(n)) return 'Enter a number, like 1.2.';
  if (n <= 0) return 'Area must be greater than 0.';
  if (n > 500) return 'Check the area. It looks too large for one field.';
  return undefined;
}

export function validatePastDate(value: string, message: string): string | undefined {
  if (!value) return undefined;
  return value > todayISO() ? message : undefined;
}

export function validateMobile(value: string): string | undefined {
  if (!value.trim()) return undefined;
  const digits = value.replace(/\D/g, '');
  if (!/^(09\d{9}|639\d{9})$/.test(digits)) return 'Enter an 11-digit mobile number, like 0917 123 4567.';
  return undefined;
}

/** Moves focus to the first invalid input so errors are never hidden. */
export function focusFirstError(errors: Record<string, string | undefined>, prefix = '') {
  const key = Object.keys(errors).find((k) => errors[k]);
  if (!key) return;
  window.setTimeout(() => {
    const el = document.getElementById(`${prefix}${key}`);
    el?.focus();
    el?.scrollIntoView({ block: 'center' });
  }, 30);
}