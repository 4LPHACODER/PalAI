import { useEffect, useMemo, useState } from 'react';
import { DiseaseCode, Field, ScanRecord, ScanStatus } from '../types/farm';

export type StatusFilter = 'all' | ScanStatus;
export type DateFilter = 'all' | '7' | '30' | '90';

export interface RecordFilters {
  fieldId: string;
  disease: 'all' | DiseaseCode;
  status: StatusFilter;
  date: DateFilter;
}

export const emptyFilters: RecordFilters = { fieldId: 'all', disease: 'all', status: 'all', date: 'all' };

// Kept for the session so search, filters and scroll survive opening a record.
let stored: {query: string;filters: RecordFilters;scrollY: number;} = { query: '', filters: emptyFilters, scrollY: 0 };

export function applyFilters(scans: ScanRecord[], filters: RecordFilters, query: string, fieldName: (id: string | null) => string, titleOf: (s: ScanRecord) => string) {
  const q = query.trim().toLowerCase();
  const now = Date.now();
  return scans.
  filter((s) => filters.fieldId === 'all' || s.fieldId === filters.fieldId).
  filter((s) => filters.disease === 'all' || s.diseaseCode === filters.disease).
  filter((s) => filters.status === 'all' || s.status === filters.status).
  filter((s) => filters.date === 'all' || now - new Date(s.date).getTime() <= Number(filters.date) * 86400000).
  filter((s) => !q || titleOf(s).toLowerCase().includes(q) || fieldName(s.fieldId).toLowerCase().includes(q)).
  sort((a, b) => b.date.localeCompare(a.date));
}

/** Filters counted on the "Salain" button (the field and status have their own visible controls). */
export function sheetFilterCount(f: RecordFilters) {
  return (f.disease !== 'all' ? 1 : 0) + (f.date !== 'all' ? 1 : 0) + (f.status === 'retake' ? 1 : 0);
}

export function useRecordsFilters(scans: ScanRecord[], fields: Field[], titleOf: (s: ScanRecord) => string, noField: string) {
  const [query, setQuery] = useState(stored.query);
  const [filters, setFilters] = useState<RecordFilters>(stored.filters);

  useEffect(() => {
    stored = { ...stored, query, filters };
  }, [query, filters]);

  // Restore and remember the list scroll position.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => window.scrollTo(0, stored.scrollY));
    return () => {
      window.cancelAnimationFrame(id);
      stored = { ...stored, scrollY: window.scrollY };
    };
  }, []);

  const fieldName = useMemo(() => {
    const map = new Map(fields.map((f) => [f.id, f.name]));
    return (id: string | null) => id ? map.get(id) ?? noField : noField;
  }, [fields, noField]);

  const results = useMemo(() => applyFilters(scans, filters, query, fieldName, titleOf), [scans, filters, query, fieldName, titleOf]);

  const clear = () => {
    setQuery('');
    setFilters(emptyFilters);
  };

  const isFiltered = !!query.trim() || JSON.stringify(filters) !== JSON.stringify(emptyFilters);

  return { query, setQuery, filters, setFilters, results, clear, isFiltered, fieldName };
}