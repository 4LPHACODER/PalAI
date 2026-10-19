import { useState } from 'react';
import { XIcon, ZoomInIcon, ZoomOutIcon, RotateCcwIcon, InfoIcon } from 'lucide-react';

interface ImageLightboxModalProps {
  imageSrc: string | null;
  imageTitle?: string;
  imageMeta?: string;
  onClose: () => void;
}

export function ImageLightboxModal({
  imageSrc,
  imageTitle = 'Image Preview',
  imageMeta,
  onClose
}: ImageLightboxModalProps) {
  const [zoom, setZoom] = useState(1);

  if (!imageSrc) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={imageTitle}
      className="fixed inset-0 z-50 flex flex-col bg-ink/90 backdrop-blur-md animate-fade-in"
    >
      {/* Lightbox Topbar */}
      <div className="flex h-16 w-full items-center justify-between border-b border-white/10 px-6 text-white">
        <div>
          <h4 className="text-[16px] font-bold tracking-tight">{imageTitle}</h4>
          {imageMeta && <p className="text-[13px] text-white/60">{imageMeta}</p>}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-white/10 p-1">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              aria-label="Zoom out"
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10 disabled:opacity-40 transition-colors"
            >
              <ZoomOutIcon className="h-4 w-4" aria-hidden />
            </button>
            <span className="w-12 text-center text-[12px] font-mono font-medium">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              aria-label="Zoom in"
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10 disabled:opacity-40 transition-colors"
            >
              <ZoomInIcon className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset zoom"
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10 transition-colors text-white/70"
            >
              <RotateCcwIcon className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white ml-2"
          >
            <XIcon className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Main Canvas Container */}
      <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center">
        <div
          className="transition-transform duration-200 ease-out origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            src={imageSrc}
            alt={imageTitle}
            className="max-h-[82vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex h-10 w-full items-center justify-center border-t border-white/10 bg-black/40 text-[12px] text-white/60">
        <span className="flex items-center gap-1.5">
          <InfoIcon className="h-3.5 w-3.5 text-accent" aria-hidden />
          Local browser preview · Resolution uncompressed
        </span>
      </div>
    </div>
  );
}
