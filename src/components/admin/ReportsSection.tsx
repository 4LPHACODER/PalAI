import { useState } from 'react';
import {
  PrinterIcon,
  DownloadIcon,
  InfoIcon
} from 'lucide-react';
import { droneSurveys } from '../../data/droneSurveys';
import { shortDate } from '../../utils/format';
import { priorityMeta } from '../../utils/survey';
import { DemoTag } from '../DemoTag';
import { toast } from 'sonner';

interface ReportsSectionProps {
  initialSurveyId?: string;
}

export function ReportsSection({ initialSurveyId }: ReportsSectionProps) {
  const [selectedSurveyId, setSelectedSurveyId] = useState(
    initialSurveyId ?? droneSurveys[0].id
  );

  const survey = droneSurveys.find((s) => s.id === selectedSurveyId) ?? droneSurveys[0];
  const orderedAreas = [...survey.areas].sort((a, b) =>
    a.priority === b.priority ? 0 : a.priority === 'inspect' ? -1 : 1
  );

  const handlePrint = () => {
    toast.success('Document prepared for printing. (Browser print preview triggered)');
    window.print();
  };

  const handleExportPdf = () => {
    toast.info('PDF Export generated locally for demonstration.');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-primary-dark">Administrative Action Reports</h2>
          <p className="mt-1 text-[14px] text-ink-muted">
            Ground inspection priority schedules compiled from aerial survey anomalies and field observations.
          </p>
        </div>

        {/* Print / Export Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex h-10 items-center gap-2 rounded-xl border border-line bg-card px-4 text-[13px] font-bold text-ink hover:bg-canvas transition-colors shadow-sm"
          >
            <PrinterIcon className="h-4 w-4 text-ink-muted" />
            <span>Print Report</span>
          </button>
          <button
            type="button"
            onClick={handleExportPdf}
            className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-[13px] font-bold text-white shadow-cta hover:bg-primary-dark transition-colors"
          >
            <DownloadIcon className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Survey Selector Bar */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-card p-2 shadow-card">
        <span className="px-3 text-[13px] font-bold text-ink-muted uppercase tracking-wider">
          Select Field Report:
        </span>
        {droneSurveys.map((s) => {
          const isSelected = s.id === survey.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedSurveyId(s.id)}
              className={`rounded-xl px-4 py-2 text-[13px] font-bold transition-all ${
                isSelected
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-canvas text-ink hover:bg-line'
              }`}
            >
              {s.site} ({s.name})
            </button>
          );
        })}
      </div>

      {/* Formal Administrative Document Container */}
      <article className="rounded-3xl border border-line bg-card p-6 sm:p-10 shadow-card max-w-4xl mx-auto space-y-8 text-ink print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <header className="border-b-2 border-primary pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[20px] font-extrabold tracking-tight text-primary-dark">PalAI</span>
              <span className="text-[12px] font-bold uppercase tracking-wider text-primary border-l border-line pl-2">
                Rice Health Monitoring System
              </span>
            </div>
            <h1 className="mt-2 text-[24px] font-bold text-primary-dark">
              Field Action & Ground Inspection Report
            </h1>
            <p className="text-[14px] text-ink-muted">
              Official Agronomic Ground Protocol · Survey ID: <span className="font-mono">{survey.id}</span>
            </p>
          </div>

          <DemoTag label="Sample Report · Demo Data" />
        </header>

        {/* Survey Metadata Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl bg-canvas p-4 border border-line text-[13px]">
          <div>
            <span className="block text-ink-muted">Field Site</span>
            <span className="font-bold text-ink">{survey.site}</span>
          </div>
          <div>
            <span className="block text-ink-muted">Area Coverage</span>
            <span className="font-bold text-ink">{survey.areaHa} Hectares</span>
          </div>
          <div>
            <span className="block text-ink-muted">Survey Flight Date</span>
            <span className="font-bold text-ink">{shortDate(survey.captured)}</span>
          </div>
          <div>
            <span className="block text-ink-muted">Report Prepared</span>
            <span className="font-bold text-ink">{shortDate(survey.reportDate)}</span>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="space-y-2">
          <h3 className="text-[17px] font-bold text-primary-dark uppercase tracking-wider">
            1. Executive Survey Summary
          </h3>
          <p className="text-[15px] leading-relaxed text-ink bg-card p-4 rounded-2xl border border-line">
            {survey.reportSummary}
          </p>
        </section>

        {/* Prioritized Ground Schedule Table */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px] font-bold text-primary-dark uppercase tracking-wider">
              2. Prioritized Ground Inspection Schedule
            </h3>
            <span className="text-[12px] text-ink-muted font-medium">
              {orderedAreas.length} Target Zones Identified
            </span>
          </div>

          <div className="divide-y divide-line rounded-2xl border border-line overflow-hidden">
            {orderedAreas.map((area) => {
              const meta = priorityMeta[area.priority];
              const linked = survey.records.filter((r) => area.linkedRecordIds.includes(r.id));
              return (
                <div key={area.id} className="p-4 sm:p-5 space-y-2 hover:bg-canvas/40 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-bold text-ink">{area.label}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${meta.badge}`}>
                        {meta.label}
                      </span>
                    </div>
                    <span className="text-[12px] font-mono text-ink-muted">
                      Coords: X {area.cx}% · Y {area.cy}%
                    </span>
                  </div>

                  <p className="text-[14px] leading-relaxed text-ink">
                    <strong className="text-primary-dark">Observation Rationale: </strong>
                    {area.reason}
                  </p>

                  <div className="rounded-xl bg-canvas p-3 border border-line text-[13px] leading-relaxed text-ink">
                    <strong className="text-primary font-bold">Field Action Protocol: </strong>
                    {area.action}. {area.note}
                  </div>

                  {linked.length > 0 && (
                    <div className="text-[12px] text-ink-muted pt-1">
                      <span className="font-semibold text-ink">Correlated Farmer Field Scans: </span>
                      {linked.map((r) => r.title).join('; ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Protocol Next Steps */}
        <section className="space-y-3">
          <h3 className="text-[17px] font-bold text-primary-dark uppercase tracking-wider">
            3. Standard Field Agronomist Next Steps
          </h3>
          <ol className="space-y-2.5">
            {survey.reportNextSteps.map((step, idx) => (
              <li key={step} className="flex items-start gap-3 text-[14px] text-ink">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-[12px] font-bold text-primary">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Scientific Disclaimer Footer */}
        <footer className="rounded-2xl border border-line bg-canvas p-4 text-[13px] leading-relaxed text-ink-muted flex items-start gap-3">
          <InfoIcon className="h-5 w-5 text-accent-ink shrink-0 mt-0.5" />
          <div>
            <strong>Agronomic Advisory Notice:</strong> Aerial multispectral and RGB surveys highlight stress
            signatures and vegetative anomalies. They do not diagnose specific plant pathogens without ground leaf
            confirmation and laboratory verification. Field inspection by certified extension personnel is required.
          </div>
        </footer>
      </article>
    </div>
  );
}
