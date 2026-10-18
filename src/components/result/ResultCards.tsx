import React from 'react';
import { ScanRecord } from '../../types/farm';
import { AnalysisCard } from './AnalysisCard';
import { NextStepsCard } from './NextStepsCard';
import { UncertainResult } from './UncertainResult';

type ResultSource = Pick<ScanRecord, 'diseaseCode' | 'steps' | 'confidence'> & {id?: string;};

/** The same compact cards render on a fresh scan result and on a reopened record. */
export function ResultCards({ result, onRetake }: {result: ResultSource;onRetake?: () => void;}) {
  if (result.diseaseCode === 'uncertain' || result.steps.length === 0) {
    return <UncertainResult onRetake={onRetake} />;
  }
  return (
    <div className="space-y-4">
      <AnalysisCard result={result} />
      <NextStepsCard result={result} />
    </div>);

}