import React, { KeyboardEvent, useMemo, useState } from 'react';
import { FieldLabel, FieldMessage, inputClass } from './TextField';

interface ComboFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  error?: string;
  hint?: string;
  optional?: boolean;
  placeholder?: string;
}

/** Searchable input with suggestions that always accepts free text. */
export function ComboField({ id, label, value, onChange, suggestions, error, hint, optional, placeholder }: ComboFieldProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    return suggestions.filter((s) => (!q || s.toLowerCase().includes(q)) && s.toLowerCase() !== q).slice(0, 6);
  }, [value, suggestions]);

  const showList = open && matches.length > 0;
  const listId = `${id}-list`;

  const choose = (s: string) => {
    onChange(s);
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showList) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, matches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      choose(matches[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} optional={optional} />
      <div className="relative">
        <input
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && active >= 0 ? `${id}-opt-${active}` : undefined}
          aria-invalid={!!error}
          aria-describedby={error || hint ? `${id}-msg` : undefined}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          className={`${inputClass(error)} h-12`} />
        
        {showList &&
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-line bg-card py-1 shadow-card">
          
            {matches.map((s, i) =>
          <li key={s} id={`${id}-opt-${i}`} role="option" aria-selected={i === active}>
                <button
              type="button"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(s)}
              className={`flex min-h-[48px] w-full items-center px-4 text-left text-[16px] ${
              i === active ? 'bg-primary-soft text-primary-dark' : 'text-ink'}`
              }>
              
                  {s}
                </button>
              </li>
          )}
          </ul>
        }
      </div>
      <FieldMessage id={id} error={error} hint={hint} />
    </div>);

}