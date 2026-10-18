import React, { InputHTMLAttributes, useState } from 'react';
import { useT } from '../../hooks/useT';
import { TextField } from './TextField';

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const t = useT();
  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      trailing={
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-pressed={visible}
        aria-label={visible ? t('auth.hidePw') : t('auth.showPw')}
        className="h-12 min-w-[64px] rounded-lg px-3 text-[14px] font-bold text-primary">
        
          {visible ? t('auth.hide') : t('auth.show')}
        </button>
      } />);


}