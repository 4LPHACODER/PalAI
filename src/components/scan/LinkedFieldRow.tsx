import React from 'react';
import { LinkIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useT } from '../../hooks/useT';
import { FieldPreview } from '../fields/FieldPreview';

interface LinkedFieldRowProps {
  fieldId: string | null;
  onChange: () => void;
  onRemove: () => void;
  disabled?: boolean;
}

/** Shows which field the scan is linked to, with Change (Usba) and Remove (Tangtanga). */
export function LinkedFieldRow({ fieldId, onChange, onRemove, disabled = false }: LinkedFieldRowProps) {
  const t = useT();
  const { getFieldById } = useApp();
  const linked = getFieldById(fieldId);

  return (
    <div className="flex min-h-[64px] items-center gap-3 rounded-2xl border border-line bg-card p-3">
      {linked ?
      <FieldPreview field={linked} className="h-11 w-11 shrink-0 rounded-xl" /> :

      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-canvas text-ink-muted">
          <LinkIcon className="h-5 w-5" aria-hidden />
        </span>
      }
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] text-ink-muted">{t('scan.linkedField')}</span>
        <span className="block text-[16px] font-bold leading-snug text-primary-dark">{linked?.name ?? t('scan.notLinked')}</span>
      </span>
      {!disabled &&
      <span className="flex shrink-0 flex-wrap justify-end">
          <button type="button" onClick={onChange} aria-haspopup="dialog" className="min-h-[48px] px-2 text-[15px] font-bold text-primary">
            {linked ? t('common.change') : t('common.choose')}
          </button>
          {linked &&
        <button type="button" onClick={onRemove} className="-mr-1 min-h-[48px] px-2 text-[15px] font-bold text-ink-muted">
              {t('common.remove')}
            </button>
        }
        </span>
      }
    </div>);

}