import React from 'react';
import { Blocker } from 'react-router-dom';
import { useT } from '../hooks/useT';
import { ConfirmDialog } from './ConfirmDialog';

export function UnsavedChangesDialog({ blocker }: {blocker: Blocker;}) {
  const t = useT();
  return (
    <ConfirmDialog
      open={blocker.state === 'blocked'}
      title="Discard your changes?"
      description="You have changes that are not saved yet. If you leave now, they will be lost."
      confirmLabel={t('common.keepEditing')}
      cancelLabel={t('common.discard')}
      onConfirm={() => blocker.reset?.()}
      onCancel={() => blocker.proceed?.()} />);


}