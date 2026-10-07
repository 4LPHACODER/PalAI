import { useCallback, useEffect, useRef } from 'react';
import { BlockerFunction, useBlocker } from 'react-router-dom';

/** Blocks in-app navigation and tab close while a form has unsaved changes. */
export function useUnsavedChangesGuard(dirty: boolean) {
  const bypass = useRef(false);

  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) =>
    dirty &&
    !bypass.current &&
    currentLocation.pathname + currentLocation.search !== nextLocation.pathname + nextLocation.search,
    [dirty]
  );
  const blocker = useBlocker(shouldBlock);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  const allowNextNavigation = useCallback(() => {
    bypass.current = true;
  }, []);

  return { blocker, allowNextNavigation };
}