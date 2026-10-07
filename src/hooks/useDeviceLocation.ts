import { useCallback, useState } from 'react';

export type DeviceLocationStatus = 'idle' | 'requesting' | 'success' | 'denied' | 'unavailable' | 'offline';
export type SimulatedLocationIssue = 'denied' | 'unavailable' | 'offline';

/** Requests device location only when called (after the user taps "Use My Location"). */
export function useDeviceLocation() {
  const [status, setStatus] = useState<DeviceLocationStatus>('idle');
  const [coords, setCoords] = useState<{lat: number;lng: number;accuracy: number;} | null>(null);

  const request = useCallback((simulate?: SimulatedLocationIssue) => {
    setCoords(null);
    if (simulate) {
      setStatus('requesting');
      window.setTimeout(() => setStatus(simulate), 600);
      return;
    }
    if (!navigator.onLine) {
      setStatus('offline');
      return;
    }
    if (!('geolocation' in navigator)) {
      setStatus('unavailable');
      return;
    }
    setStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy });
        setStatus('success');
      },
      (err) => setStatus(err.code === err.PERMISSION_DENIED ? 'denied' : 'unavailable'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setCoords(null);
  }, []);

  return { status, coords, request, reset };
}