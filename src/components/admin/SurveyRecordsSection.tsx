import { useState } from 'react';
import {
  SearchIcon,
  ScanIcon,
  FileTextIcon,
  DownloadIcon,
  CalendarIcon,
  AlertTriangleIcon
} from 'lucide-react';
import { droneSurveys } from '../../data/droneSurveys';
import { shortDate } from '../../utils/format';
import { AdminTab } from './AdminSidebar';
import { toast } from 'sonner';

interface SurveyRecordsSectionProps {
  onSelectSurvey: (surveyId: string) => void;
  onNavigateTab: (tab: AdminTab) => void;
  onOpenReportForSurvey: (surveyId: string) => void;
}

export function SurveyRecordsSection({
  onSelectSurvey,
  onNavigateTab,
  onOpenReportForSurvey,
}: SurveyRecordsSectionProps) {
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'inspect' | 'check'>('all');

  const filteredSurveys = droneSurveys.filter((s) => {
    const matchesSearch =
      s.site.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filterPriority === 'all') return true;
    return s.areas.some((a) => a.priority === filterPriority);
  });

  const handleExportJson = (surveyName: string) => {
    toast.success(`Metadata JSON for "${surveyName}" prepared (Frontend Simulation).`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-bold text-primary-dark">Drone Survey Records</h2>
          <p className="mt-1 text-[14px] text-ink-muted">
            Administrative flight logs and multi-spectral survey registry for monitored agricultural fields.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary-soft px-3 py-1 text-[12px] font-bold text-primary">
            {droneSurveys.length} Demo Records Registered
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-line bg-card p-3 shadow-card">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by field site, survey ID, or name..."
            className="w-full rounded-xl border border-line bg-canvas pl-10 pr-4 py-2 text-[14px] text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
          />
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[12px] font-semibold text-ink-muted px-1">Filter:</span>
          {(['all', 'inspect', 'check'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setFilterPriority(filter)}
              className={`rounded-xl px-3 py-1.5 text-[12px] font-bold capitalize transition-colors ${
                filterPriority === filter
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-canvas text-ink-muted hover:text-ink'
              }`}
            >
              {filter === 'all' ? 'All Records' : filter === 'inspect' ? 'Inspect First' : 'Check Soon'}
            </button>
          ))}
        </div>
      </div>

      {/* Records Table / Cards */}
      <div className="rounded-3xl border border-line bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[14px]">
            <thead>
              <tr className="border-b border-line bg-canvas/70 text-[12px] font-bold uppercase tracking-wider text-ink-muted">
                <th className="py-3.5 px-4 sm:px-6">Survey & Field Site</th>
                <th className="py-3.5 px-4">Flight Date</th>
                <th className="py-3.5 px-4">Coverage</th>
                <th className="py-3.5 px-4">Altitude / Sensor</th>
                <th className="py-3.5 px-4">Priorities</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredSurveys.map((s) => {
                const inspectFirst = s.areas.filter((a) => a.priority === 'inspect').length;
                const checkSoon = s.areas.filter((a) => a.priority === 'check').length;
                const heightDetail = s.details.find((d) => d.label === 'Height above ground')?.value ?? '60 m';

                return (
                  <tr key={s.id} className="hover:bg-canvas/50 transition-colors">
                    {/* Survey & Field Site */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.image}
                          alt=""
                          className="h-12 w-12 rounded-xl object-cover border border-line shrink-0"
                        />
                        <div>
                          <div className="font-bold text-ink text-[15px]">{s.site}</div>
                          <div className="text-[12px] text-ink-muted font-mono">{s.name} · {s.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Flight Date */}
                    <td className="py-4 px-4 text-ink">
                      <div className="flex items-center gap-1.5 text-[13px]">
                        <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                        <span>{shortDate(s.captured)}</span>
                      </div>
                      <span className="block text-[11px] text-ink-muted">2026 season</span>
                    </td>

                    {/* Coverage */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-ink">{s.areaHa} hectares</div>
                      <span className="text-[12px] text-ink-muted">{s.flightLines.length} flight transects</span>
                    </td>

                    {/* Altitude / Sensor */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-ink">{heightDetail} AGL</div>
                      <span className="text-[12px] text-ink-muted">Dual RGB + Simulated Multispectral</span>
                    </td>

                    {/* Priorities */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        {inspectFirst > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-danger bg-danger-soft px-2 py-0.5 rounded-full w-fit">
                            <AlertTriangleIcon className="h-3 w-3" />
                            {inspectFirst} Inspect First
                          </span>
                        )}
                        {checkSoon > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-warn bg-warn-soft px-2 py-0.5 rounded-full w-fit">
                            {checkSoon} Check Soon
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSurvey(s.id);
                            onNavigateTab('insights');
                          }}
                          title="Open in Field Insights"
                          className="flex h-9 items-center gap-1 rounded-xl bg-primary px-3 text-[12px] font-bold text-white shadow-sm hover:bg-primary-dark transition-colors"
                        >
                          <ScanIcon className="h-3.5 w-3.5" />
                          <span>Inspect</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenReportForSurvey(s.id)}
                          title="View Action Report"
                          className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-canvas hover:bg-card text-ink transition-colors"
                        >
                          <FileTextIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleExportJson(s.site)}
                          title="Export Survey JSON (Simulated)"
                          className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-canvas hover:bg-card text-ink-muted transition-colors"
                        >
                          <DownloadIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
