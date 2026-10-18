import React, { useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  tone?: 'default' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, description, confirmLabel, cancelLabel, tone = 'default', onConfirm, onCancel }: ConfirmDialogProps) {
  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
          <motion.div
          className="absolute inset-0 bg-ink/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={onCancel}
          aria-hidden />
        
          <motion.div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="relative mb-[env(safe-area-inset-bottom)] w-full max-w-[400px] rounded-card bg-card p-5 shadow-card"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
          
            <h2 id={titleId} className="text-[20px] font-bold text-primary-dark">
              {title}
            </h2>
            <p id={descId} className="mt-2 text-[16px] leading-relaxed text-ink">
              {description}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <button
              type="button"
              onClick={onConfirm}
              className={`h-12 rounded-xl text-[16px] font-bold text-white ${tone === 'danger' ? 'bg-danger' : 'bg-primary'}`}>
              
                {confirmLabel}
              </button>
              <button
              ref={cancelRef}
              type="button"
              onClick={onCancel}
              className="h-12 rounded-xl border border-line text-[16px] font-bold text-primary">
              
                {cancelLabel}
              </button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}