import React, { ReactNode, useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useT } from '../hooks/useT';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const t = useT();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
          className="absolute inset-0 bg-ink/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={onClose}
          aria-hidden />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative max-h-[88vh] w-full max-w-[640px] overflow-y-auto rounded-t-[24px] bg-card pb-[calc(env(safe-area-inset-bottom)+20px)]"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}>
          
            <div className="sticky top-0 z-10 bg-card px-4 pt-2 min-[390px]:px-5">
              <div className="mx-auto h-1.5 w-10 rounded-full bg-line" aria-hidden />
              <div className="flex items-center justify-between gap-3 py-1.5">
                <h2 id={titleId} className="min-w-0 text-[20px] font-bold leading-tight text-primary-dark">
                  {title}
                </h2>
                <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t('common.close')}
                className="-mr-2 grid h-12 w-12 place-items-center rounded-full text-ink-muted active:bg-canvas">
                
                  <XIcon className="h-6 w-6" aria-hidden />
                </button>
              </div>
            </div>
            <div className="px-4 min-[390px]:px-5">{children}</div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}