import React, { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { useT, useTText } from '../../hooks/useT';

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  trailing?: ReactNode;
};

type InputProps = BaseProps & {multiline?: false;} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>;
type AreaProps = BaseProps & {multiline: true;} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>;

export const inputClass = (error?: string) =>
`w-full scroll-mb-32 rounded-xl border bg-card px-4 text-[16px] text-ink placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 ${
error ? 'border-danger focus:ring-danger/40' : 'border-line focus:border-primary focus:ring-primary/30'}`;


export function FieldLabel({ htmlFor, label, optional }: {htmlFor: string;label: string;optional?: boolean;}) {
  const t = useT();
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[15px] font-semibold text-ink">
      {label}
      {optional && <span className="font-normal text-ink-muted"> ({t('common.optional')})</span>}
    </label>);

}

export function FieldMessage({ id, error, hint }: {id: string;error?: string;hint?: string;}) {
  const tt = useTText();
  if (error) {
    return (
      <p id={`${id}-msg`} role="alert" className="mt-1.5 text-[14px] font-medium text-danger">
        {tt(error)}
      </p>);

  }
  if (hint) {
    return (
      <p id={`${id}-msg`} className="mt-1.5 text-[14px] text-ink-muted">
        {hint}
      </p>);

  }
  return null;
}

export function TextField(props: InputProps | AreaProps) {
  const { id, label, error, hint, optional, trailing } = props;
  const describedBy = error || hint ? `${id}-msg` : undefined;

  if (props.multiline) {
    const { multiline: _m, id: _i, label: _l, error: _e, hint: _h, optional: _o, trailing: _t, className, ...rest } = props;
    return (
      <div>
        <FieldLabel htmlFor={id} label={label} optional={optional} />
        <textarea
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`${inputClass(error)} min-h-[104px] py-3 leading-relaxed ${className ?? ''}`}
          {...rest} />
        
        <FieldMessage id={id} error={error} hint={hint} />
      </div>);

  }

  const { multiline: _m, id: _i, label: _l, error: _e, hint: _h, optional: _o, trailing: _t, className, ...rest } = props;
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} optional={optional} />
      <div className="relative">
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`${inputClass(error)} h-12 ${trailing ? 'pr-20' : ''} ${className ?? ''}`}
          {...rest} />
        
        {trailing && <div className="absolute inset-y-0 right-0 flex items-center pr-1">{trailing}</div>}
      </div>
      <FieldMessage id={id} error={error} hint={hint} />
    </div>);

}