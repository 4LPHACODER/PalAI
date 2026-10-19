import { SparklesIcon, AlertCircleIcon, XIcon } from 'lucide-react';

interface AiAnalysisModalProps {
  open: boolean;
  onClose: () => void;
  imageCount: number;
}

export function AiAnalysisModal({ open, onClose, imageCount }: AiAnalysisModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-analysis-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card p-6 shadow-2xl border border-line">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-muted hover:bg-canvas active:bg-primary-soft transition-colors"
        >
          <XIcon className="h-5 w-5" aria-hidden />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
            <SparklesIcon className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <span className="inline-block text-[12px] font-bold uppercase tracking-wider text-primary">
              PalAI Computer Vision Engine
            </span>
            <h3 id="ai-analysis-title" className="text-[20px] font-bold text-primary-dark">
              AI Analysis Integration Pending
            </h3>
          </div>
        </div>

        {/* Notice Message */}
        <div className="mt-4 rounded-2xl bg-primary-soft/40 p-4 border border-primary/20 text-[14px] leading-relaxed text-ink">
          <p className="font-semibold text-primary-dark">
            AI Inference pipeline is currently in development.
          </p>
          <p className="mt-1 text-ink">
            You staged <strong>{imageCount} image{imageCount === 1 ? '' : 's'}</strong> for inspection.
            In this frontend phase, images are rendered client-side and are <strong>not sent to any backend server or API</strong>.
          </p>
        </div>

        {/* Planned Diagnostics Pipeline */}
        <div className="mt-4 space-y-2">
          <p className="text-[13px] font-semibold text-ink-muted uppercase tracking-wider">
            Planned Detection Pipeline
          </p>
          <div className="space-y-2 text-[13px]">
            <div className="flex items-start gap-2.5 rounded-xl border border-line bg-canvas p-2.5">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white text-[11px] font-bold">1</span>
              <div>
                <span className="font-semibold text-ink">Multi-Scale Crop Segmentation:</span>
                <span className="text-ink-muted ml-1">Separates rice canopy from soil, water bunds, and background.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl border border-line bg-canvas p-2.5">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white text-[11px] font-bold">2</span>
              <div>
                <span className="font-semibold text-ink">Pathology Classifier:</span>
                <span className="text-ink-muted ml-1">Detects Brown Spot, Blast lesions, and nutritional yellowing patterns.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl border border-line bg-canvas p-2.5">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white text-[11px] font-bold">3</span>
              <div>
                <span className="font-semibold text-ink">Field Priority Heatmapping:</span>
                <span className="text-ink-muted ml-1">Clusters anomalies into priority inspection zones for ground agronomists.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Safe notice */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-canvas border border-line p-2.5 text-[12px] text-ink-muted">
          <AlertCircleIcon className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden />
          <span>Local image preview remains active. No network bandwidth or quota consumed.</span>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-[15px] font-bold text-white shadow-cta hover:bg-primary-dark transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
