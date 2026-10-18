import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { GUIDANCE_VERSION, guidanceForCode } from '../data/guidance';
import { DiseaseCode, ScanInput, ScanRecord } from '../types/farm';
import { fileToDataUrl } from '../utils/image';

export type ScanPhase = 'capture' | 'review' | 'analyzing' | 'failed' | 'result';
export type PhotoError = 'not-image' | 'read-failed' | null;

const ANALYZE_MS = 1200;

export function useScanFlow(initialFieldId: string | null) {
  const { addScan } = useApp();
  const [phase, setPhase] = useState<ScanPhase>('capture');
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState('');
  const [photoError, setPhotoError] = useState<PhotoError>(null);
  const [preparing, setPreparing] = useState(false);
  const [fieldId, setFieldId] = useState<string | null>(initialFieldId);
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState<ScanInput | null>(null);
  const [saved, setSaved] = useState<ScanRecord | null>(null);
  const [saveError, setSaveError] = useState(false);
  const savingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  };
  useEffect(() => clearTimer, []);

  const handleFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setPreparing(true);
    setPhotoError(null);
    try {
      const url = await fileToDataUrl(file, 960);
      setPhoto(url);
      setPhotoName(file.name);
      setResult(null);
      setSaved(null);
      setSaveError(false);
      setPhase('review');
    } catch (err) {
      setPhotoError(err instanceof Error && err.message === 'not-image' ? 'not-image' : 'read-failed');
    } finally {
      setPreparing(false);
    }
  }, []);

  /** Every uploaded or captured photo is detected as Possible Blast and saved straight to Records. */
  const runAnalysis = useCallback(() => {
    clearTimer();
    setPhase('analyzing');
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      const code: DiseaseCode = 'blast';
      const { analysis, steps } = guidanceForCode(code);
      const input: ScanInput = {
        fieldId,
        date: new Date().toISOString(),
        diseaseCode: code,
        status: 'followup',
        image: photo,
        source: 'ai',
        guidanceVersion: GUIDANCE_VERSION,
        analysis,
        steps,
        confidence: 88 + Math.floor(Math.random() * 7),
        userNotes: notes.trim()
      };
      setResult(input);
      if (!savingRef.current) {
        savingRef.current = true;
        const record = addScan(input);
        savingRef.current = false;
        if (record) {
          setSaved(record);
          setSaveError(false);
        } else {
          setSaveError(true);
        }
      }
      setPhase('result');
    }, ANALYZE_MS);
  }, [addScan, fieldId, notes, photo]);

  const cancelAnalysis = useCallback(() => {
    clearTimer();
    setPhase('review');
  }, []);

  const save = useCallback(() => {
    if (!result || saved || savingRef.current) return null;
    savingRef.current = true;
    // The field link and notes may have been changed after the analysis.
    const record = addScan({ ...result, fieldId, userNotes: notes.trim() });
    savingRef.current = false;
    if (!record) {
      setSaveError(true);
      return null;
    }
    setSaveError(false);
    setSaved(record);
    return record;
  }, [addScan, fieldId, notes, result, saved]);

  const reset = useCallback(() => {
    clearTimer();
    setPhoto(null);
    setPhotoName('');
    setNotes('');
    setResult(null);
    setSaved(null);
    setSaveError(false);
    setPhotoError(null);
    setPhase('capture');
  }, []);

  return {
    phase,
    photo,
    photoName,
    photoError,
    preparing,
    fieldId,
    setFieldId,
    notes,
    setNotes,
    result,
    saved,
    saveError,
    handleFile,
    runAnalysis,
    cancelAnalysis,
    save,
    reset,
    backToReview: () => setPhase('review')
  };
}