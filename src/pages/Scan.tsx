import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { FieldPickerSheet } from '../components/FieldPickerSheet';
import { PageBody } from '../components/PageBody';
import { PageHeader } from '../components/PageHeader';
import { AnalysisFailed, AnalyzingState } from '../components/scan/AnalyzingState';
import { CaptureStart } from '../components/scan/CaptureStart';
import { LinkedFieldRow } from '../components/scan/LinkedFieldRow';
import { PhotoReview } from '../components/scan/PhotoReview';
import { ScanProgress } from '../components/scan/ScanProgress';
import { ScanResultView } from '../components/scan/ScanResultView';
import { useApp } from '../contexts/AppContext';
import { useScanFlow } from '../hooks/useScanFlow';
import { useT } from '../hooks/useT';

export function Scan() {
  const t = useT();
  const [params] = useSearchParams();
  const { activeFields, selectedField, getFieldById } = useApp();
  const paramField = getFieldById(params.get('field'));
  // A field opened from its detail screen is carried in; the farmer can change or remove it.
  const flow = useScanFlow(paramField && !paramField.archived ? paramField.id : selectedField?.id ?? null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const closePicker = useCallback(() => setPickerOpen(false), []);

  const takePhoto = () => cameraRef.current?.click();
  const uploadPhoto = () => uploadRef.current?.click();

  // Results are saved automatically — confirm once when the record lands in Records.
  const savedId = flow.saved?.id;
  useEffect(() => {
    if (savedId) toast.success(t('scan.savedToast'), { description: t('scan.savedToastDesc') });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedId]);

  const step = flow.phase === 'capture' ? 0 : flow.phase === 'result' ? 2 : 1;
  const fieldLocked = !!flow.saved || flow.phase === 'analyzing';

  return (
    <div>
      <PageHeader title={t('common.scanLeaf')} subtitle={t('scan.subtitle')} />
      <PageBody className="pt-4">
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="sr-only" onChange={flow.handleFile} tabIndex={-1} aria-hidden />
        <input ref={uploadRef} type="file" accept="image/*" className="sr-only" onChange={flow.handleFile} tabIndex={-1} aria-hidden />

        <div className="mb-4">
          <ScanProgress current={step} />
        </div>

        <LinkedFieldRow fieldId={flow.fieldId} onChange={() => setPickerOpen(true)} onRemove={() => flow.setFieldId(null)} disabled={fieldLocked} />

        {flow.phase === 'capture' && <CaptureStart onTake={takePhoto} onUpload={uploadPhoto} error={flow.photoError} preparing={flow.preparing} />}

        {flow.phase === 'review' && flow.photo &&
        <PhotoReview
          photo={flow.photo}
          photoName={flow.photoName}
          notes={flow.notes}
          onNotes={flow.setNotes}
          onAnalyze={flow.runAnalysis}
          onRetake={takePhoto}
          onChooseAnother={uploadPhoto}
          onCancel={flow.reset} />

        }

        {flow.phase === 'analyzing' && flow.photo && <AnalyzingState photo={flow.photo} onCancel={flow.cancelAnalysis} />}

        {flow.phase === 'failed' && <AnalysisFailed onRetry={flow.runAnalysis} onChooseAnother={uploadPhoto} />}

        {flow.phase === 'result' && flow.result &&
        <ScanResultView
          result={flow.result}
          notes={flow.notes}
          saved={flow.saved}
          saveError={flow.saveError}
          onSave={flow.save}
          onRetake={() => {
            flow.reset();
            takePhoto();
          }}
          onNewScan={flow.reset} />

        }
      </PageBody>

      <FieldPickerSheet open={pickerOpen} onClose={closePicker} fields={activeFields} selectedId={flow.fieldId} onSelect={flow.setFieldId} allowNone />
    </div>);

}