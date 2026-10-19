import { useState } from 'react';
import {
  SlidersHorizontalIcon,
  FileTextIcon,
  NotebookPenIcon,
  ScanSearchIcon,
  AlertTriangleIcon,
  ZoomInIcon,
  ZoomOutIcon,
  RotateCcwIcon,
  Maximize2Icon
} from 'lucide-react';
import { DroneSurvey, InspectionArea, LinkedRecord, SurveyView } from '../../types/drone';
import { droneSurveys } from '../../data/droneSurveys';
import { surveyViews } from '../../data/surveyViews';
import { shortDate, longDate } from '../../utils/format';
import { priorityMeta } from '../../utils/survey';
import { SurveyViewer } from '../drone/SurveyViewer';
import { ViewSelector } from '../drone/ViewSelector';
import { SurveyLegend } from '../drone/SurveyLegend';
import { SwitchRow } from '../form/SwitchRow';
import { DemoTag } from '../DemoTag';

interface FieldInsightsSectionProps {
  survey: DroneSurvey;
  onSelectSurveyId: (id: string) => void;
  view: SurveyView;
  onChangeView: (view: SurveyView) => void;
  selectedArea: InspectionArea | null;
  onSelectArea: (area: InspectionArea) => void;
  onSelectRecord: (record: LinkedRecord) => void;
  onOpenDetails: () => void;
  onOpenReport: () => void;
  onPreviewImage: (src: string, title: string, meta: string) => void;
}

export function FieldInsightsSection({
  survey,
  onSelectSurveyId,
  view,
  onChangeView,
  selectedArea,
  onSelectArea,
  onSelectRecord,
  onOpenDetails,
  onOpenReport,
  onPreviewImage,
}: FieldInsightsSectionProps) {
  const [showBoundary, setShowBoundary] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  // Extract coverage statistics from details
  const overlapDetail = survey.details.find((d) => d.label === 'Overlap')?.value ?? '75% forward, 65% side';
  const heightDetail = survey.details.find((d) => d.label === 'Height above ground')?.value ?? '60 m';

  return (
    <div className="space-y-6">
      {/* Top Bar: Survey Selection & Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[22px] font-bold text-primary-dark">Drone Field Insights</h2>
            <DemoTag label="Demo Data" />
          </div>
          <p className="mt-1 text-[14px] text-ink-muted">
            Multi-spectral aerial survey analysis and ground inspection priority mapping for registered rice fields.
          </p>
        </div>

        {/* Survey Switcher Radio Group */}
        <div
          role="radiogroup"
          aria-label="Select demonstration survey"
          className="flex flex-wrap sm:flex-nowrap gap-2 bg-canvas p-1 rounded-2xl border border-line"
        >
          {droneSurveys.map((s) => {
            const isSelected = s.id === survey.id;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectSurveyId(s.id)}
                className={`flex flex-col rounded-xl px-3.5 py-2 text-left transition-all ${
                  isSelected
                    ? 'bg-card text-primary shadow-sm border border-line'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-ink">{s.site}</span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </div>
                <span className="text-[11px] text-ink-muted">
                  {s.name} · {shortDate(s.captured)} ({s.areaHa} ha)
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left is Viewer & Controls, Right is Analytics & Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
        {/* Left Column: View Selector, Interactive Map Container, Viewer Controls, Legend */}
        <div className="space-y-4">
          {/* View Selector Tabs (A, B, C, D) */}
          <ViewSelector value={view} onChange={onChangeView} layout="grid" className="grid-cols-2 sm:grid-cols-4" />

          {/* Survey Viewer Container with Zoom & Image Tools */}
          <div className="relative rounded-3xl border border-line bg-card p-3 shadow-card overflow-hidden">
            {/* Viewer Top Toolbar */}
            <div className="flex items-center justify-between pb-2 px-1 text-[12px] text-ink-muted border-b border-line mb-3">
              <span className="font-semibold text-ink">
                {survey.site} · {surveyViews[view].label}
              </span>

              {/* Zoom & Inspect Actions */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  aria-label="Zoom out"
                  className="grid h-7 w-7 place-items-center rounded-lg hover:bg-canvas disabled:opacity-40 text-ink transition-colors"
                >
                  <ZoomOutIcon className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-mono font-medium text-ink">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  aria-label="Zoom in"
                  className="grid h-7 w-7 place-items-center rounded-lg hover:bg-canvas disabled:opacity-40 text-ink transition-colors"
                >
                  <ZoomInIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  title="Reset zoom"
                  className="grid h-7 w-7 place-items-center rounded-lg hover:bg-canvas text-ink-muted transition-colors ml-1"
                >
                  <RotateCcwIcon className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onPreviewImage(
                      survey.image,
                      `${survey.site} - ${survey.name}`,
                      `Captured ${longDate(survey.captured)} · ${survey.areaHa} ha`
                    )
                  }
                  title="Inspect Fullscreen"
                  className="grid h-7 w-7 place-items-center rounded-lg hover:bg-canvas text-primary transition-colors ml-1"
                >
                  <Maximize2Icon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Inner Zoom Container */}
            <div className="relative overflow-hidden rounded-2xl bg-primary-dark">
              <div
                className="transition-transform duration-200 ease-out origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <SurveyViewer
                  survey={survey}
                  view={view}
                  showBoundary={showBoundary}
                  showMarkers={showMarkers}
                  selectedAreaId={selectedArea?.id}
                  onSelectArea={onSelectArea}
                  onSelectRecord={onSelectRecord}
                />
              </div>
            </div>

            {/* View-specific Layer Description Banner */}
            <div className="mt-3 rounded-xl bg-canvas p-2.5 text-[12px] text-ink-muted flex items-center justify-between">
              <span>{surveyViews[view].badge}</span>
              <span className="font-mono text-[11px] text-ink-muted">
                Captured {shortDate(survey.captured)}
              </span>
            </div>
          </div>

          {/* Layer Legend */}
          <SurveyLegend view={view} />

          {/* Overlay Toggles */}
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
            <SwitchRow
              id="admin-boundary"
              label="Field boundaries (GIS Polygon)"
              checked={showBoundary}
              onChange={setShowBoundary}
            />
            <SwitchRow
              id="admin-markers"
              label="Farmer observation markers"
              description={survey.records.length ? undefined : 'No farmer records shared for this demonstration site.'}
              checked={showMarkers}
              onChange={setShowMarkers}
            />
          </div>
        </div>

        {/* Right Column: View Metadata, Area Priorities, Farmer Observations, Reports */}
        <div className="space-y-6">
          {/* Active View Context Card */}
          <section className="rounded-3xl border border-line bg-card p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary-soft px-3 py-1 text-[12px] font-bold text-primary">
                View {surveyViews[view].letter} · {survey.site}
              </span>
              <span className="text-[12px] text-ink-muted">{survey.areaHa} hectares</span>
            </div>

            <h3 className="text-[20px] font-bold text-primary-dark">{surveyViews[view].title}</h3>
            <p className="text-[15px] leading-relaxed text-ink">{surveyViews[view].text}</p>
            <p className="text-[13px] text-ink-muted">
              {survey.siteNote} · Captured {longDate(survey.captured)}
            </p>

            {/* VIEW B SPECIFIC: Survey Coverage Analytics Cards */}
            {view === 'coverage' && (
              <div className="mt-4 grid grid-cols-2 gap-2.5 text-[13px] pt-3 border-t border-line">
                <div className="rounded-xl border border-line bg-canvas p-2.5">
                  <span className="block text-ink-muted text-[11px]">Flight Coverage</span>
                  <span className="font-bold text-ink">{survey.areaHa} Hectares (100%)</span>
                </div>
                <div className="rounded-xl border border-line bg-canvas p-2.5">
                  <span className="block text-ink-muted text-[11px]">Flight Lines</span>
                  <span className="font-bold text-ink">{survey.flightLines.length} Parallel Lines</span>
                </div>
                <div className="rounded-xl border border-line bg-canvas p-2.5">
                  <span className="block text-ink-muted text-[11px]">Forward / Side Overlap</span>
                  <span className="font-bold text-ink">{overlapDetail}</span>
                </div>
                <div className="rounded-xl border border-line bg-canvas p-2.5">
                  <span className="block text-ink-muted text-[11px]">Flight Altitude (AGL)</span>
                  <span className="font-bold text-ink">{heightDetail}</span>
                </div>
              </div>
            )}

            {/* VIEW C SPECIFIC: Multispectral Warning & Scientific Rigor Disclaimer */}
            {view === 'multispectral' && (
              <div className="mt-4 rounded-2xl bg-warn-soft/70 border border-accent/40 p-4 text-[13px] leading-relaxed text-ink space-y-2">
                <div className="flex items-center gap-2 font-bold text-warn">
                  <AlertTriangleIcon className="h-4 w-4 shrink-0" />
                  <span>Simulated Vegetation Index Notice</span>
                </div>
                <p>
                  <strong>Illustrative Demonstration:</strong> Ordinary RGB drone sensors (including standard consumer
                  drones) do not measure near-infrared (NIR) or RedEdge reflectance wavelengths.
                </p>
                <p className="text-ink-muted text-[12px]">
                  Genuine NDVI/NDRE calculation requires calibrated multispectral optical payloads. This false-color
                  simulation visualizes relative canopy density and potential moisture or disease stress patterns for
                  demonstration purposes only.
                </p>
              </div>
            )}

            {/* Survey Details Button */}
            <button
              type="button"
              onClick={onOpenDetails}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line bg-canvas text-[14px] font-bold text-primary hover:bg-card transition-colors"
            >
              <SlidersHorizontalIcon className="h-4 w-4" aria-hidden />
              <span>Full Survey Parameters</span>
            </button>
          </section>

          {/* Marked Areas List (Inspection Priorities) */}
          <section className="rounded-3xl border border-line bg-card p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[17px] font-bold text-primary-dark">Marked Inspection Priorities</h3>
                <p className="text-[12px] text-ink-muted">Select an area to view agronomist field notes</p>
              </div>
              <span className="rounded-full bg-danger-soft px-2.5 py-0.5 text-[11px] font-bold text-danger">
                {survey.areas.length} Flagged
              </span>
            </div>

            <ul className="space-y-2.5">
              {survey.areas.map((a) => {
                const isSelected = selectedArea?.id === a.id;
                const meta = priorityMeta[a.priority];
                return (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => onSelectArea(a)}
                      aria-pressed={isSelected}
                      className={`flex w-full items-start gap-3 rounded-2xl border-2 p-3.5 text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary-soft/40 shadow-sm'
                          : 'border-line bg-card hover:border-primary/40'
                      }`}
                    >
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-bold text-white mt-0.5`}
                        style={{ backgroundColor: meta.color }}
                      >
                        {a.label.replace('Area ', '')}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[15px] font-bold text-ink">{a.label}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${meta.badge}`}>
                            {meta.label}
                          </span>
                        </div>
                        <p className="mt-1 text-[13px] text-ink-muted line-clamp-2">{a.reason}</p>
                        <div className="mt-2 text-[12px] font-medium text-primary">
                          Recommended: {a.action}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Field Observations (Shared Farmer Records) */}
          <section className="rounded-3xl border border-line bg-card p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[17px] font-bold text-primary-dark">Farmer Field Observations</h3>
                <p className="text-[12px] text-ink-muted">Shared mobile scans correlated with drone aerial data</p>
              </div>
              <span className="rounded-full bg-canvas px-2.5 py-0.5 text-[11px] font-semibold text-ink-muted">
                {survey.records.length} Records
              </span>
            </div>

            {survey.records.length > 0 ? (
              <ul className="space-y-2">
                {survey.records.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => onSelectRecord(r)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-line bg-canvas/60 p-3 text-left hover:bg-canvas transition-colors"
                    >
                      {r.image ? (
                        <img
                          src={r.image}
                          alt=""
                          className="h-12 w-12 shrink-0 rounded-xl object-cover border border-line"
                        />
                      ) : (
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-card text-ink-muted border border-line">
                          <NotebookPenIcon className="h-5 w-5" />
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                          {r.kind === 'scan' ? (
                            <ScanSearchIcon className="h-3 w-3 text-primary" />
                          ) : (
                            <NotebookPenIcon className="h-3 w-3 text-accent-ink" />
                          )}
                          <span>
                            {r.kind === 'scan' ? 'Mobile AI Screening' : 'Ground Observation'} · {shortDate(r.date)}
                          </span>
                        </div>
                        <span className="block text-[14px] font-bold text-ink truncate mt-0.5">
                          {r.title}
                        </span>
                        <span className="block text-[12px] text-ink-muted truncate">{r.text}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-dashed border-line bg-canvas p-4 text-[13px] text-ink-muted">
                No farmer observations recorded for this site. Ground ground inspection is required to correlate canopy stress.
              </div>
            )}
          </section>

          {/* Action Report CTA Button */}
          <button
            type="button"
            onClick={onOpenReport}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[15px] font-bold text-white shadow-cta hover:bg-primary-dark transition-colors"
          >
            <FileTextIcon className="h-5 w-5" aria-hidden />
            <span>Generate & Preview Action Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
