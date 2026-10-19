import { DownloadIcon, SparklesIcon, Trash2Icon, XIcon, CheckCircle2Icon, CameraIcon } from 'lucide-react';
import { CapturedDroneFrame } from '../../types/droneConnection';

interface CapturedFrameModalProps {
  frame: CapturedDroneFrame | null;
  onClose: () => void;
  onSendToAiAnalysis: (frame: CapturedDroneFrame) => void;
}

export function CapturedFrameModal({ frame, onClose, onSendToAiAnalysis }: CapturedFrameModalProps) {
  if (!frame) return null;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="captured-frame-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-card p-6 shadow-2xl border border-line">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close captured frame modal"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-muted hover:bg-canvas active:bg-primary-soft transition-colors"
        >
          <XIcon className="h-5 w-5" aria-hidden />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm">
            <CameraIcon className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary">
              Live Frame Extraction
            </span>
            <h3 id="captured-frame-title" className="text-[20px] font-bold text-primary-dark">
              Drone Camera Snapshot Captured
            </h3>
          </div>
        </div>

        {/* Image Preview */}
        <div className="mt-4 relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-line">
          <img
            src={frame.dataUrl}
            alt="Captured drone frame"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Frame Metadata */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[12px]">
          <div className="rounded-xl border border-line bg-canvas p-2.5">
            <span className="block text-ink-muted text-[11px]">Filename</span>
            <span className="font-bold text-ink truncate block" title={frame.filename}>
              {frame.filename}
            </span>
          </div>
          <div className="rounded-xl border border-line bg-canvas p-2.5">
            <span className="block text-ink-muted text-[11px]">Resolution</span>
            <span className="font-bold text-ink">
              {frame.width} × {frame.height}
            </span>
          </div>
          <div className="rounded-xl border border-line bg-canvas p-2.5">
            <span className="block text-ink-muted text-[11px]">File Size</span>
            <span className="font-bold text-ink">{formatSize(frame.sizeBytes)}</span>
          </div>
          <div className="rounded-xl border border-line bg-canvas p-2.5">
            <span className="block text-ink-muted text-[11px]">Capture Time</span>
            <span className="font-bold text-ink">{frame.timestamp}</span>
          </div>
        </div>

        {/* Status Callout */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary-soft/50 border border-primary/20 p-2.5 text-[13px] text-ink">
          <CheckCircle2Icon className="h-4 w-4 shrink-0 text-primary" />
          <span>
            Verified uncompressed camera frame extracted via HTML5 Canvas API from active video stream.
          </span>
        </div>

        {/* Actions Toolbar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-xl border border-line bg-canvas px-4 py-2.5 text-[14px] font-semibold text-ink-muted hover:text-danger hover:bg-danger-soft transition-colors"
          >
            <Trash2Icon className="h-4 w-4" />
            <span>Discard</span>
          </button>

          <div className="flex items-center gap-2.5">
            {/* Download Link */}
            <a
              href={frame.dataUrl}
              download={frame.filename}
              className="flex items-center gap-1.5 rounded-xl border border-line bg-card px-4 py-2.5 text-[14px] font-bold text-ink hover:bg-canvas transition-colors shadow-sm"
            >
              <DownloadIcon className="h-4 w-4 text-primary" />
              <span>Download Image</span>
            </a>

            {/* Stage for AI Analysis */}
            <button
              type="button"
              onClick={() => onSendToAiAnalysis(frame)}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[14px] font-bold text-white shadow-cta hover:bg-primary-dark transition-colors"
            >
              <SparklesIcon className="h-4 w-4 text-accent" />
              <span>Submit to AI Disease Detection</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
