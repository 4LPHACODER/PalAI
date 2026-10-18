import { differenceInCalendarDays, format, isSameDay, parseISO } from 'date-fns';
import { translate } from '../data/translations';
import type { LangCode } from '../types/farm';

/** Fixed "today" for the sample demo records. */
export const DEMO_NOW = new Date('2026-10-06T08:15:00');

/** Set by SessionContext so every date and unit follows the selected language. */
let currentLang: LangCode = 'ceb';
export function setFormatLanguage(lang: LangCode) {
  currentLang = lang;
}

const cebMonths = ['Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Septiyembre', 'Oktubre', 'Nobyembre', 'Disyembre'];
const cebShort = ['Ene', 'Peb', 'Mar', 'Abr', 'May', 'Hun', 'Hul', 'Ago', 'Sep', 'Okt', 'Nob', 'Dis'];
const cebDays = ['Dom', 'Lun', 'Mar', 'Miy', 'Huw', 'Biy', 'Sab'];

export function longDate(iso: string): string {
  const d = parseISO(iso);
  if (currentLang === 'ceb') return `${cebMonths[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  return format(d, 'MMMM d, yyyy');
}

export function shortDate(iso: string): string {
  const d = parseISO(iso);
  if (currentLang === 'ceb') return `${cebShort[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  return format(d, 'MMM d, yyyy');
}

export function timeOfDay(iso: string): string {
  return format(parseISO(iso), 'h:mm a');
}

export function dateTime(iso: string): string {
  return `${longDate(iso)}, ${timeOfDay(iso)}`;
}

/** Today's real date as yyyy-MM-dd (used to reject future dates). */
export function todayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function dueLabel(iso: string): string {
  const d = parseISO(iso);
  const diff = differenceInCalendarDays(d, DEMO_NOW);
  if (diff < 0) return translate(currentLang, 'due.overdue');
  if (diff === 0) return translate(currentLang, 'due.today');
  if (diff === 1) return translate(currentLang, 'due.tomorrow');
  if (currentLang === 'ceb') return `${cebDays[d.getDay()]}, ${cebShort[d.getMonth()]} ${d.getDate()}`;
  return format(d, 'EEE, MMM d');
}

/** Notification timestamps relative to the demo "today". */
export function notificationTime(iso: string): string {
  const d = parseISO(iso);
  if (isSameDay(d, DEMO_NOW)) return translate(currentLang, 'time.todayAt', { time: timeOfDay(iso) });
  return shortDate(iso);
}

export function formatArea(areaHa: number | null): string | null {
  if (areaHa === null) return null;
  return translate(currentLang, areaHa === 1 ? 'unit.hectare' : 'unit.hectares', { n: areaHa });
}

export function formatCoords(lat: number | null, lng: number | null): string | null {
  if (lat === null || lng === null) return null;
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}