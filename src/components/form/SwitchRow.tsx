import React from 'react';

interface SwitchRowProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SwitchRow({ id, label, description, checked, onChange }: SwitchRowProps) {
  return (
    <div className="flex min-h-[60px] items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0">
        <p id={`${id}-label`} className="text-[16px] font-semibold text-ink">
          {label}
        </p>
        {description &&
        <p id={`${id}-desc`} className="mt-0.5 text-[14px] leading-snug text-ink-muted">
            {description}
          </p>
        }
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={description ? `${id}-desc` : undefined}
        onClick={() => onChange(!checked)}
        className="grid h-12 w-16 shrink-0 place-items-center">
        
        <span className={`relative h-8 w-14 rounded-full transition-colors duration-200 ${checked ? 'bg-primary' : 'bg-line'}`}>
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ease-out ${
            checked ? 'translate-x-7' : 'translate-x-1'}`
            } />
          
        </span>
      </button>
    </div>);

}