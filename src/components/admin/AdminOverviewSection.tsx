import {
  MapPinIcon,
  FolderArchiveIcon,
  ImagesIcon,
  AlertTriangleIcon,
  RadioIcon,
  ScanIcon,
  ArrowUpRightIcon
} from 'lucide-react';
import { droneSurveys } from '../../data/droneSurveys';
import { longDate } from '../../utils/format';
import { AdminTab } from './AdminSidebar';
import { DemoTag } from '../DemoTag';

interface AdminOverviewSectionProps {
  onNavigateTab: (tab: AdminTab) => void;
  onSelectSurvey: (surveyId: string) => void;
  onOpenDroneConnectModal: () => void;
  localImageCount: number;
}

export function AdminOverviewSection({
  onNavigateTab,
  onSelectSurvey,
  onOpenDroneConnectModal,
  localImageCount
}: AdminOverviewSectionProps) {
  // Aggregate statistics based strictly on demo surveys
  const totalHectares = droneSurveys.reduce((acc, s) => acc + s.areaHa, 0).toFixed(1);
  const totalFootprints = droneSurveys.reduce((acc, s) => {
    // survey 1 has 30, survey 2 has 35 footprints in details
    const footprintDetail = s.details.find((d) => d.label === 'Image footprints');
    const count = footprintDetail ? parseInt(footprintDetail.value) || 30 : 30;
    return acc + count;
  }, 0);
  const totalAreas = droneSurveys.reduce((acc, s) => acc + s.areas.length, 0);
  const inspectFirstCount = droneSurveys.reduce(
    (acc, s) => acc + s.areas.filter((a) => a.priority === 'inspect').length,
    0
  );
  const checkSoonCount = droneSurveys.reduce(
    (acc, s) => acc + s.areas.filter((a) => a.priority === 'check').length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-primary to-primary-dark p-6 text-white shadow-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
              Executive Administration
            </span>
            <DemoTag label="Demonstration Environment" />
          </div>
          <h2 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight">
            Agricultural Drone Monitoring Hub
          </h2>
          <p className="text-[14px] text-white/80 max-w-2xl leading-relaxed">
            Centralized operations dashboard for rice health aerial inspection, survey flight logs, and ground inspection priorities.
            Prepared for future LYZRC L600 Pro drone telemetry integration.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('monitoring')}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[14px] font-bold text-primary-dark hover:bg-canvas transition-colors shadow-sm"
          >
            <RadioIcon className="h-4 w-4 text-primary" />
            <span>Open Drone Station</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('insights')}
            className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-[14px] font-bold text-white hover:bg-white/25 transition-colors"
          >
            <ScanIcon className="h-4 w-4" />
            <span>Inspect Fields</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Monitored Fields Card */}
        <div className="rounded-2xl border border-line bg-card p-5 shadow-card hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <MapPinIcon className="h-5 w-5" aria-hidden />
            </span>
            <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-semibold text-ink-muted">
              {totalHectares} ha Total
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[28px] font-extrabold text-ink">{droneSurveys.length}</span>
            <span className="block text-[14px] font-semibold text-primary-dark">Monitored Fields</span>
            <p className="mt-1 text-[12px] text-ink-muted">
              Riverside Plot (1.2 ha) & Demo Site A (8.4 ha)
            </p>
          </div>
        </div>

        {/* Drone Surveys Card */}
        <div className="rounded-2xl border border-line bg-card p-5 shadow-card hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <FolderArchiveIcon className="h-5 w-5" aria-hidden />
            </span>
            <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-semibold text-ink-muted">
              Latest: Oct 5
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[28px] font-extrabold text-ink">{droneSurveys.length}</span>
            <span className="block text-[14px] font-semibold text-primary-dark">Recorded Surveys</span>
            <p className="mt-1 text-[12px] text-ink-muted">
              Demonstration flights with aligned coverage overlays
            </p>
          </div>
        </div>

        {/* Captured Images Card */}
        <div className="rounded-2xl border border-line bg-card p-5 shadow-card hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <ImagesIcon className="h-5 w-5" aria-hidden />
            </span>
            {localImageCount > 0 && (
              <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary">
                +{localImageCount} Staged
              </span>
            )}
          </div>
          <div className="mt-3">
            <span className="text-[28px] font-extrabold text-ink">
              {totalFootprints + localImageCount}
            </span>
            <span className="block text-[14px] font-semibold text-primary-dark">Survey Footprints</span>
            <p className="mt-1 text-[12px] text-ink-muted">
              65 demo aerial frames{localImageCount > 0 ? ` + ${localImageCount} user local images` : ''}
            </p>
          </div>
        </div>

        {/* Inspection Priorities Card */}
        <div className="rounded-2xl border border-line bg-card p-5 shadow-card hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-danger-soft text-danger">
              <AlertTriangleIcon className="h-5 w-5" aria-hidden />
            </span>
            <span className="rounded-full bg-danger-soft px-2 py-0.5 text-[11px] font-bold text-danger">
              {inspectFirstCount} High Priority
            </span>
          </div>
          <div className="mt-3">
            <span className="text-[28px] font-extrabold text-ink">{totalAreas}</span>
            <span className="block text-[14px] font-semibold text-primary-dark">Inspection Priorities</span>
            <p className="mt-1 text-[12px] text-ink-muted">
              {inspectFirstCount} Inspect First · {checkSoonCount} Check Soon
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Hardware Status Banner + Priority Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hardware Readiness Widget (1 Col) */}
        <div className="rounded-2xl border border-line bg-card p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-primary-dark">Hardware Readiness</h3>
            <span className="rounded-full bg-warn-soft px-2 py-0.5 text-[11px] font-bold text-warn">
              Standby
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl bg-canvas p-3 border border-line">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                Configured Drone
              </span>
              <p className="text-[15px] font-bold text-ink">LYZRC L600 Pro</p>
              <p className="text-[12px] text-ink-muted">4K Dual EIS Gimbal Camera</p>
            </div>

            <div className="rounded-xl bg-canvas p-3 border border-line">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                Companion Protocol
              </span>
              <p className="text-[15px] font-bold text-ink">RX Drone GPS</p>
              <p className="text-[12px] text-ink-muted">RTSP: 192.168.1.1:554 (Standby)</p>
            </div>

            <div className="rounded-xl bg-canvas p-3 border border-line">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                Connection Status
              </span>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-danger animate-pulse" />
                <span className="text-[13px] font-semibold text-danger">Drone Not Connected</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenDroneConnectModal}
            className="w-full flex h-11 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary-soft/60 text-[14px] font-bold text-primary hover:bg-primary-soft transition-colors"
          >
            <RadioIcon className="h-4 w-4" />
            <span>Connection Diagnostics</span>
          </button>
        </div>

        {/* Survey Records & Recent Activity (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-line bg-card p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-primary-dark">Demonstration Surveys</h3>
              <p className="text-[12px] text-ink-muted">Select a recorded flight to inspect multi-layer analysis</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('records')}
              className="flex items-center gap-1 text-[13px] font-bold text-primary hover:underline"
            >
              <span>View all records</span>
              <ArrowUpRightIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="divide-y divide-line rounded-xl border border-line overflow-hidden">
            {droneSurveys.map((survey) => {
              const inspectFirst = survey.areas.filter((a) => a.priority === 'inspect').length;
              return (
                <div
                  key={survey.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-canvas transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={survey.image}
                      alt={survey.site}
                      className="h-14 w-14 shrink-0 rounded-xl object-cover border border-line"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-bold text-ink">{survey.site}</h4>
                        <span className="rounded-md bg-canvas px-1.5 py-0.5 text-[11px] font-semibold text-ink-muted border border-line">
                          {survey.name}
                        </span>
                      </div>
                      <p className="text-[13px] text-ink-muted">
                        Captured {longDate(survey.captured)} · {survey.areaHa} ha
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-danger">
                          <AlertTriangleIcon className="h-3.5 w-3.5" />
                          {inspectFirst} Inspect First
                        </span>
                        <span className="text-line">·</span>
                        <span className="text-[12px] text-ink-muted">
                          {survey.areas.length} Total Marked Areas
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectSurvey(survey.id);
                        onNavigateTab('insights');
                      }}
                      className="flex h-9 items-center gap-1.5 rounded-xl bg-primary px-3 text-[13px] font-bold text-white shadow-sm hover:bg-primary-dark transition-colors"
                    >
                      <ScanIcon className="h-3.5 w-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* High Priority Warning Callout */}
          <div className="flex items-start gap-3 rounded-xl bg-warn-soft/60 border border-accent/40 p-3 text-[13px] leading-snug text-ink">
            <AlertTriangleIcon className="h-4 w-4 shrink-0 text-warn mt-0.5" aria-hidden />
            <div>
              <span className="font-bold text-warn">Demonstration Notice:</span> All statistical summaries and
              survey layers reflect recorded demo records (Riverside Plot & Demo Site A). No live telemetry connection
              or backend API is simulated.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
