import { differenceInCalendarDays, format, parseISO } from 'date-fns';

/** Fixed "today" for the sample demo records. */
export const DEMO_NOW = new Date('2026-10-06T08:15:00');

export function longDate(iso: string): string {
  return format(parseISO(iso), 'MMMM d, yyyy');
}

export function shortDate(iso: string): string {
  return format(parseISO(iso), 'MMM d, yyyy');
}

/** Today's real date as yyyy-MM-dd (used to reject future dates). */
export function todayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function dueLabel(iso: string): string {
  const diff = differenceInCalendarDays(parseISO(iso), DEMO_NOW);
  if (diff < 0) return 'Overdue';
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  return format(parseISO(iso), 'EEE, MMM d');
}

export function formatArea(areaHa: number | null): string | null {
  if (areaHa === null) return null;
  return `${areaHa} ${areaHa === 1 ? 'hectare' : 'hectares'}`;
}

export function formatCoords(lat: number | null, lng: number | null): string | null {
  if (lat === null || lng === null) return null;
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}