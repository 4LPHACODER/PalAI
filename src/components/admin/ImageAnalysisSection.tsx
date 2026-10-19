import { useRef, useState } from 'react';
import {
  UploadCloudIcon,
  Trash2Icon,
  SparklesIcon,
  ImageIcon,
  InfoIcon,
  PlusIcon,
  Maximize2Icon
} from 'lucide-react';
import { images } from '../../data/images';
import { toast } from 'sonner';

export interface UploadedImage {
  id: string;
  name: string;
  sizeBytes: number;
  dataUrl: string;
  timestamp: string;
  format: string;
  status: 'ready' | 'pending';
}

interface ImageAnalysisSectionProps {
  uploadedImages: UploadedImage[];
  onAddImages: (newImages: UploadedImage[]) => void;
  onRemoveImage: (id: string) => void;
  onClearAll: () => void;
  onOpenAiModal: () => void;
  onPreviewImage: (src: string, title: string, meta: string) => void;
}

export function ImageAnalysisSection({
  uploadedImages,
  onAddImages,
  onRemoveImage,
  onClearAll,
  onOpenAiModal,
  onPreviewImage,
}: ImageAnalysisSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Process files
  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      // Extract format extension
      const ext = file.name.split('.').pop()?.toUpperCase() || 'IMG';
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const newItem: UploadedImage = {
          id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          name: file.name,
          sizeBytes: file.size,
          dataUrl,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          format: ext,
          status: 'ready',
        };
        onAddImages([newItem]);
        toast.success(`Loaded "${file.name}" for local preview.`);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  // Quick action: Load Sample Demo Aerial Image
  const handleLoadSample = () => {
    const sampleItem: UploadedImage = {
      id: `sample-${Date.now()}`,
      name: 'Riverside_Plot_Drone_Orthophoto.jpg',
      sizeBytes: 3.4 * 1024 * 1024,
      dataUrl: images.surveyRiverside,
      timestamp: 'Demo Survey 001',
      format: 'JPG',
      status: 'ready',
    };
    onAddImages([sampleItem]);
    toast.success('Loaded sample aerial survey photo for preview.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-bold text-primary-dark">Image Capture & Upload Interface</h2>
          <p className="mt-1 text-[14px] text-ink-muted">
            Manage field drone captures and local imagery. Inspect files before queuing for AI health diagnostics.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {uploadedImages.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="flex h-10 items-center gap-1.5 rounded-xl border border-line bg-card px-3 text-[13px] font-medium text-danger hover:bg-danger-soft transition-colors"
            >
              <Trash2Icon className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleLoadSample}
            className="flex h-10 items-center gap-1.5 rounded-xl border border-primary/30 bg-primary-soft px-3.5 text-[13px] font-bold text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <ImageIcon className="h-4 w-4" />
            <span>Load Sample Photo</span>
          </button>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all ${
          isDragging
            ? 'border-primary bg-primary-soft/50 scale-[1.01]'
            : 'border-line bg-card hover:border-primary/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/tiff,image/x-adobe-dng,image/webp"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="admin-image-upload"
        />

        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm mb-4">
          <UploadCloudIcon className="h-8 w-8" aria-hidden />
        </span>

        <h3 className="text-[18px] font-bold text-primary-dark">
          Select drone images from your computer
        </h3>
        <p className="mt-1.5 text-[14px] text-ink-muted max-w-md">
          Drag and drop your aerial photos or field survey imagery here, or browse files directly from your device.
        </p>

        <label
          htmlFor="admin-image-upload"
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[15px] font-bold text-white shadow-cta hover:bg-primary-dark transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Browse Image Files</span>
        </label>

        {/* Supported Formats Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[12px] text-ink-muted">
          <span className="font-semibold text-ink">Supported Formats:</span>
          <span className="rounded-md bg-canvas px-2 py-0.5 font-mono text-[11px] border border-line">JPG</span>
          <span className="rounded-md bg-canvas px-2 py-0.5 font-mono text-[11px] border border-line">PNG</span>
          <span className="rounded-md bg-canvas px-2 py-0.5 font-mono text-[11px] border border-line">TIFF</span>
          <span className="rounded-md bg-canvas px-2 py-0.5 font-mono text-[11px] border border-line">DNG</span>
          <span className="text-ink-muted">· Max 25 MB per file</span>
        </div>
      </div>

      {/* Uploaded Images Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[17px] font-bold text-primary-dark">Staged Drone Images</h3>
            <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[12px] font-bold text-primary">
              {uploadedImages.length} {uploadedImages.length === 1 ? 'file' : 'files'}
            </span>
          </div>

          {/* Analyze Image Button */}
          {uploadedImages.length > 0 && (
            <button
              type="button"
              onClick={onOpenAiModal}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[14px] font-bold text-white shadow-cta hover:bg-primary-dark transition-colors"
            >
              <SparklesIcon className="h-4 w-4 text-accent" />
              <span>Analyze {uploadedImages.length} Image{uploadedImages.length === 1 ? '' : 's'}</span>
            </button>
          )}
        </div>

        {uploadedImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-card py-12 px-4 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-canvas text-ink-muted mb-3">
              <ImageIcon className="h-6 w-6" />
            </span>
            <p className="text-[15px] font-bold text-ink">No images selected yet</p>
            <p className="mt-1 text-[13px] text-ink-muted max-w-sm">
              Use the upload area above or click "Load Sample Photo" to test the client-side inspection preview.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedImages.map((img) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-2xl border border-line bg-card shadow-card hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                {/* Image Thumbnail Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-dark">
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Format Badge */}
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-ink/80 px-2 py-0.5 font-mono text-[11px] font-bold text-white backdrop-blur">
                    {img.format}
                  </span>

                  {/* Hover Overlay Button to Open Full Lightbox */}
                  <button
                    type="button"
                    onClick={() =>
                      onPreviewImage(img.dataUrl, img.name, `${formatSize(img.sizeBytes)} · ${img.format}`)
                    }
                    aria-label={`View full resolution ${img.name}`}
                    className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]"
                  >
                    <span className="flex items-center gap-1.5 rounded-xl bg-white/90 px-3.5 py-2 text-[13px] font-bold text-primary-dark shadow-md">
                      <Maximize2Icon className="h-4 w-4" />
                      <span>Inspect Full View</span>
                    </span>
                  </button>
                </div>

                {/* Metadata & Actions */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[14px] font-bold text-ink truncate" title={img.name}>
                      {img.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onRemoveImage(img.id);
                        toast.info(`Removed "${img.name}".`);
                      }}
                      title="Remove image"
                      className="grid h-7 w-7 place-items-center rounded-lg text-ink-muted hover:bg-danger-soft hover:text-danger transition-colors shrink-0"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[12px] text-ink-muted">
                    <span>{formatSize(img.sizeBytes)}</span>
                    <span className="rounded-full bg-primary-soft px-2 py-0.5 font-semibold text-primary">
                      Ready for AI Analysis
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Local Verification Notice */}
        <div className="flex items-start gap-2.5 rounded-xl bg-canvas border border-line p-3 text-[13px] text-ink-muted">
          <InfoIcon className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden />
          <span>
            <strong>Client-Side Storage:</strong> Images remain in your browser’s temporary memory for inspection.
            No files are transmitted to external servers. The "Analyze Image" action will indicate that AI integration
            is pending.
          </span>
        </div>
      </div>
    </div>
  );
}
