import React from 'react';
import { Blocker } from 'react-router-dom';
import { useT } from '../hooks/useT';
import { ConfirmDialog } from './ConfirmDialog';

export function UnsavedChangesDialog({ blocker }: {blocker: Blocker;}) {
  const t = useT();
  return (
    <ConfirmDialog
      open={blocker.state === 'blocked'}
      title={t('unsaved.title')}
      description={t('unsaved.text')}
      confirmLabel={t('common.keepEditing')}
      cancelLabel={t('common.discard')}
      onConfirm={() => blocker.reset?.()}
      onCancel={() => blocker.proceed?.()} />);


}