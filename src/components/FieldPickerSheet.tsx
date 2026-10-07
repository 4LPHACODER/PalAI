import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, LinkIcon, PlusIcon } from 'lucide-react';
import { useT } from '../hooks/useT';
import { Field } from '../types/farm';
import { displayStage } from '../utils/farm';
import { formatArea } from '../utils/format';
import { BottomSheet } from './BottomSheet';
import { FieldPreview } from './fields/FieldPreview';

interface FieldPickerSheetProps {
  open: boolean;
  onClose: () => void;
  fields: Field[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  allowNone?: boolean;
}

export function FieldPickerSheet({ open, onClose, fields, selectedId, onSelect, allowNone = false }: FieldPickerSheetProps) {
  const t = useT();
  const pick = (id: string | null) => {
    onSelect(id);
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Choose a field">
      <div role="radiogroup" aria-label="Fields" className="space-y-2 pb-1">
        {fields.map((f) => {
          const selected = f.id === selectedId;
          const meta = [formatArea(f.areaHa), displayStage(f.stage)].filter(Boolean).join(' · ') || t('common.notRecorded');
          return (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => pick(f.id)}
              className={`flex min-h-[72px] w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors duration-150 ${
              selected ? 'border-primary bg-primary-soft' : 'border-line bg-card'}`
              }>
              
              <FieldPreview field={f} className="h-12 w-12 shrink-0 rounded-xl" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[16px] font-bold text-primary-dark">{f.name}</span>
                <span className="block truncate text-[14px] text-ink-muted">{meta}</span>
              </span>
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${selected ? 'bg-primary text-white' : 'border-2 border-line'}`}>
                {selected && <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden />}
              </span>
            </button>);

        })}
        {allowNone &&
        <button
          type="button"
          role="radio"
          aria-checked={selectedId === null}
          onClick={() => pick(null)}
          className={`flex min-h-[60px] w-full items-center gap-3 rounded-2xl border-2 p-3 text-left ${
          selectedId === null ? 'border-primary bg-primary-soft' : 'border-line bg-card'}`
          }>
          
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-canvas text-ink-muted">
              <LinkIcon className="h-5 w-5" aria-hidden />
            </span>
            <span className="flex-1 text-[16px] font-semibold text-ink">Don’t link to a field</span>
          </button>
        }
        {fields.length === 0 && <p className="py-2 text-[15px] text-ink-muted">You have no active fields yet.</p>}
        <Link
          to="/fields/new"
          className="flex h-12 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-primary/40 text-[15px] font-bold text-primary">
          
          <PlusIcon className="h-5 w-5" aria-hidden /> {t('field.addField')}
        </Link>
      </div>
    </BottomSheet>);

}