import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

export type LandingSection = 'hero' | 'products' | 'drone-showcase' | 'workflow' | 'institutions';

export function useLandingActions() {
  const navigate = useNavigate();
  const { session, signInDemo } = useSession();

  const tryFarmerDemo = useCallback(() => {
    if (session?.mode !== 'demo') signInDemo();
    navigate('/');
  }, [session, signInDemo, navigate]);

  const exploreMobile = useCallback(() => {
    if (!session) signInDemo();
    navigate('/scan');
  }, [session, signInDemo, navigate]);

  const exploreDrone = useCallback((from: LandingSection) => navigate(`/drone-insights?from=${from}`), [navigate]);

  const viewInstitutional = useCallback(() => {
    if (!session) signInDemo();
    navigate('/workspace?from=institutions');
  }, [session, signInDemo, navigate]);

  return { tryFarmerDemo, exploreMobile, exploreDrone, viewInstitutional, hasSession: !!session };
}