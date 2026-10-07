import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CameraIcon, ImageIcon, ImageOffIcon, InfoIcon, LinkIcon } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { FieldPickerSheet } from '../components/FieldPickerSheet';
import { FieldPreview } from '../components/fields/FieldPreview';
import { PageBody } from '../components/PageBody';
import { PageHeader } from '../components/PageHeader';
import { useApp } from '../contexts/AppContext';
import { photoTips } from '../data/photoTips';
import { useT } from '../hooks/useT';

interface PickedPhoto {
  url: string;
  name: string;
}

export function Scan() {
  const t = useT();
  const [params] = useSearchParams();
  const { activeFields, selectedField, getFieldById } = useApp();
  const paramField = getFieldById(params.get('field'));
  // A field opened from its detail screen is carried in; the farmer can change or remove it.
  const [linkedId, setLinkedId] = useState<string | null>(() =>
  paramField && !paramField.archived ? paramField.id : selectedField?.id ?? null
  );
  const linked = getFieldById(linkedId);
  const [photo, setPhoto] = useState<PickedPhoto | null>(null);
  const [error, setError] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const closePicker = useCallback(() => setPickerOpen(false), []);

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo.url);
    };
  }, [photo]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhoto(null);
      setError(true);
      return;
    }
    setError(false);
    setPhoto({ url: URL.createObjectURL(file), name: file.name });
  };

  const takePhoto = () => cameraRef.current?.click();
  const uploadPhoto = () => uploadRef.current?.click();

  return (
    <div>
      <PageHeader title={t('common.scanLeaf')} subtitle="Photograph one leaf for screening" />
      <PageBody className="pt-4">
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="sr-only" onChange={handleFile} tabIndex={-1} aria-hidden />
        <input ref={uploadRef} type="file" accept="image/*" className="sr-only" onChange={handleFile} tabIndex={-1} aria-hidden />

        <div className="flex min-h-[64px] items-center gap-3 rounded-2xl border border-line bg-card p-3">
          {linked ?
          <FieldPreview field={linked} className="h-11 w-11 shrink-0 rounded-xl" /> :

          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-canvas text-ink-muted">
              <LinkIcon className="h-5 w-5" aria-hidden />
            </span>
          }
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] text-ink-muted">Linked field</span>
            <span className="block truncate text-[16px] font-bold text-primary-dark">{linked?.name ?? 'Not linked to a field'}</span>
          </span>
          <button type="button" onClick={() => setPickerOpen(true)} aria-haspopup="dialog" className="h-12 shrink-0 px-2 text-[15px] font-bold text-primary">
            {linked ? t('common.change') : 'Choose'}
          </button>
          {linked &&
          <button type="button" onClick={() => setLinkedId(null)} className="-mr-1 h-12 shrink-0 px-2 text-[15px] font-bold text-ink-muted">
              Remove
            </button>
          }
        </div>

        {error &&
        <div className="mt-5">
            <EmptyState
            icon={ImageOffIcon}
            tone="error"
            bordered
            title="That file isn’t a photo"
            description="Choose a JPG or PNG image of one rice leaf."
            action={
            <button type="button" onClick={uploadPhoto} className="h-12 w-full rounded-xl bg-primary text-[16px] font-bold text-white">
                  Choose another photo
                </button>
            } />
          
          </div>
        }

        {photo ?
        <section aria-label="Selected photo" className="mt-5">
            <div className="overflow-hidden rounded-card border border-line bg-ink">
              <img src={photo.url} alt="Your selected leaf photo" className="h-[min(48vh,380px)] w-full object-contain" />
            </div>
            <p className="mt-2 truncate text-[14px] text-ink-muted">{photo.name}</p>
            <div className="mt-4 rounded-2xl border border-line bg-card p-4">
              <p className="text-[17px] font-bold text-primary-dark">Photo ready</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink">
                Screening will be added in the next step of this prototype. Your photo stays on this device and is not uploaded.
                {linked ? ` It will be linked to ${linked.name}.` : ''}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={takePhoto} className="h-12 rounded-xl bg-primary text-[15px] font-bold text-white">
                Retake photo
              </button>
              <button type="button" onClick={uploadPhoto} className="h-12 rounded-xl border border-line bg-card text-[15px] font-bold text-primary">
                Choose another
              </button>
            </div>
            <button type="button" onClick={() => setPhoto(null)} className="mt-2 h-12 w-full text-[15px] font-bold text-ink-muted">
              {t('common.cancel')}
            </button>
          </section> :

        <>
            <h2 className="mt-6 text-[19px] font-bold text-primary-dark">Before you take a photo</h2>
            <ul className="mt-3 space-y-3">
              {photoTips.map(({ icon: Icon, title, text }) =>
            <li key={title} className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[16px] font-semibold text-ink">{title}</p>
                    <p className="text-[14px] leading-snug text-ink-muted">{text}</p>
                  </div>
                </li>
            )}
            </ul>

            <div className="mt-7 space-y-2">
              <button
              type="button"
              onClick={takePhoto}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[18px] font-bold text-white shadow-cta transition-transform duration-150 ease-out active:scale-[0.98]">
              
                <CameraIcon className="h-6 w-6" aria-hidden /> Take Photo
              </button>
              <button
              type="button"
              onClick={uploadPhoto}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-line bg-card text-[17px] font-bold text-primary">
              
                <ImageIcon className="h-5 w-5" aria-hidden /> Upload Photo
              </button>
            </div>

            <p className="mt-4 flex gap-2 text-[14px] leading-snug text-ink-muted">
              <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              PalAI screening is a guide, not a diagnosis. Confirm concerns with your Agricultural Technician.
            </p>
          </>
        }
      </PageBody>
      <FieldPickerSheet open={pickerOpen} onClose={closePicker} fields={activeFields} selectedId={linkedId} onSelect={setLinkedId} allowNone />
    </div>);

}