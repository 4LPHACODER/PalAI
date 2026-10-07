import React, { useCallback, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeftIcon, FileTextIcon, NotebookPenIcon, ScanSearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { BottomSheet } from '../../components/BottomSheet';
import { DemoTag } from '../../components/DemoTag';
import { ActionReportSheet } from '../../components/drone/ActionReportSheet';
import { AreaRowContent } from '../../components/drone/AreaRowContent';
import { AreaSheet } from '../../components/drone/AreaSheet';
import { LinkedRecordSheet } from '../../components/drone/LinkedRecordSheet';
import { SurveyDetailsList } from '../../components/drone/SurveyDetailsList';
import { SurveyLegend } from '../../components/drone/SurveyLegend';
import { SurveyViewer } from '../../components/drone/SurveyViewer';
import { ViewSelector } from '../../components/drone/ViewSelector';
import { SwitchRow } from '../../components/form/SwitchRow';
import { droneSurveys } from '../../data/droneSurveys';
import { surveyViews } from '../../data/surveyViews';
import { InspectionArea, LinkedRecord, SurveyView } from '../../types/drone';
import { longDate, shortDate } from '../../utils/format';

const returnSections = ['hero', 'products', 'drone-showcase', 'workflow', 'institutions'];

export function DroneInsights() {
  const [params] = useSearchParams();
  const from = params.get('from');
  const backTo = from === 'workspace' ? '/workspace' : `/landing#${from && returnSections.includes(from) ? from : 'products'}`;
  const backLabel = from === 'workspace' ? 'Back to workspace' : 'Back to overview';

  const [surveyId, setSurveyId] = useState(droneSurveys[0].id);
  const [view, setView] = useState<SurveyView>('priorities');
  const [showBoundary, setShowBoundary] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [area, setArea] = useState<InspectionArea | null>(null);
  const [record, setRecord] = useState<LinkedRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const closeArea = useCallback(() => setArea(null), []);
  const closeRecord = useCallback(() => setRecord(null), []);
  const closeDetails = useCallback(() => setDetailsOpen(false), []);
  const closeReport = useCallback(() => setReportOpen(false), []);

  const survey = droneSurveys.find((s) => s.id === surveyId) ?? droneSurveys[0];

  const selectArea = (a: InspectionArea) => {
    setView('priorities');
    setArea(a);
  };

  const changeSurvey = (id: string) => {
    setSurveyId(id);
    setArea(null);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-canvas pb-[calc(env(safe-area-inset-bottom)+104px)] lg:pb-12">
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 min-[390px]:px-5 md:px-8">
          <Link
            to={backTo}
            aria-label={backLabel}
            className="-ml-3 grid h-12 w-12 shrink-0 place-items-center rounded-full text-primary-dark active:bg-primary-soft">
            
            <ChevronLeftIcon className="h-7 w-7" aria-hidden />
          </Link>
          <h1 className="min-w-0 flex-1 truncate text-[20px] font-bold text-primary-dark min-[390px]:text-[22px]">Drone Field Insights</h1>
          <DemoTag />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pt-4 min-[390px]:px-5 md:px-8 lg:pt-8">
        <p className="text-[15px] leading-relaxed text-ink-muted lg:text-[16px]">
          A recorded-survey preview with sample data. It is not a live drone connection.
        </p>

        <div role="radiogroup" aria-label="Sample survey" className="mt-4 grid grid-cols-1 gap-2 min-[390px]:grid-cols-2 lg:max-w-[640px]">
          {droneSurveys.map((s) => {
            const selected = s.id === survey.id;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => changeSurvey(s.id)}
                className={`min-h-[64px] rounded-2xl border-2 px-4 py-2 text-left transition-colors duration-150 ${
                selected ? 'border-primary bg-primary-soft' : 'border-line bg-card'}`
                }>
                
                <span className="block text-[16px] font-bold text-ink">{s.site}</span>
                <span className="block text-[14px] text-ink-muted">
                  {s.name} · {shortDate(s.captured)}
                </span>
              </button>);

          })}
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-10">
          <div className="space-y-3">
            <ViewSelector value={view} onChange={setView} layout="grid" className="lg:grid-cols-4" />
            <SurveyViewer
              survey={survey}
              view={view}
              showBoundary={showBoundary}
              showMarkers={showMarkers}
              selectedAreaId={area?.id}
              onSelectArea={selectArea}
              onSelectRecord={setRecord} />
            
            <SurveyLegend view={view} />
            <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
              <SwitchRow id="di-boundary" label="Field boundaries" checked={showBoundary} onChange={setShowBoundary} />
              <SwitchRow
                id="di-markers"
                label="Farmer observation markers"
                description={survey.records.length ? undefined : 'No farmer records shared for this site.'}
                checked={showMarkers}
                onChange={setShowMarkers} />
              
            </div>
          </div>

          <div className="space-y-7">
            <section aria-labelledby="di-view">
              <p className="text-[14px] font-semibold text-primary">
                View {surveyViews[view].letter} · {survey.site}
              </p>
              <h2 id="di-view" className="mt-1 text-[22px] font-bold text-primary-dark">
                {surveyViews[view].title}
              </h2>
              <p className="mt-1.5 text-[16px] leading-relaxed text-ink">{surveyViews[view].text}</p>
              <p className="mt-2 text-[14px] text-ink-muted">
                {survey.siteNote} · Captured {longDate(survey.captured)}
              </p>
              <button
                type="button"
                onClick={() => setDetailsOpen(true)}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-line bg-card text-[15px] font-bold text-primary">
                
                <SlidersHorizontalIcon className="h-4 w-4" aria-hidden /> Survey Details
              </button>
            </section>

            <section aria-labelledby="di-areas">
              <h2 id="di-areas" className="text-[19px] font-bold text-primary-dark">
                Marked areas
              </h2>
              <p className="mt-0.5 text-[14px] text-ink-muted">Tap an area to read its sample inspection note.</p>
              <ul className="mt-3 space-y-2">
                {survey.areas.map((a) =>
                <li key={a.id}>
                    <button
                    type="button"
                    onClick={() => selectArea(a)}
                    aria-pressed={area?.id === a.id}
                    className={`flex min-h-[64px] w-full items-center gap-3 rounded-2xl border-2 bg-card p-3 text-left active:bg-canvas ${
                    area?.id === a.id ? 'border-primary' : 'border-line'}`
                    }>
                    
                      <AreaRowContent area={a} />
                    </button>
                  </li>
                )}
              </ul>
            </section>

            <section aria-labelledby="di-records">
              <h2 id="di-records" className="text-[19px] font-bold text-primary-dark">
                Field observations
              </h2>
              <p className="mt-0.5 text-[14px] text-ink-muted">Shared by farmers with their permission (sample).</p>
              {survey.records.length ?
              <ul className="mt-3 space-y-2">
                  {survey.records.map((r) =>
                <li key={r.id}>
                      <button
                    type="button"
                    onClick={() => setRecord(r)}
                    className="flex min-h-[72px] w-full items-center gap-3 rounded-2xl border border-line bg-card p-3 text-left active:bg-canvas">
                    
                        {r.image ?
                    <img src={r.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" /> :

                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-canvas text-ink-muted">
                            <NotebookPenIcon className="h-6 w-6" aria-hidden />
                          </span>
                    }
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1 text-[13px] text-ink-muted">
                            {r.kind === 'scan' && <ScanSearchIcon className="h-3.5 w-3.5" aria-hidden />}
                            {r.kind === 'scan' ? 'AI screening (simulated)' : 'Farmer observation'} · {shortDate(r.date)}
                          </span>
                          <span className="block text-[15px] font-bold leading-snug text-ink">{r.title}</span>
                          <span className="line-clamp-1 block text-[14px] text-ink-muted">{r.text}</span>
                        </span>
                      </button>
                    </li>
                )}
                </ul> :

              <p className="mt-3 rounded-2xl border border-dashed border-line bg-card p-4 text-[15px] leading-relaxed text-ink-muted">
                  No farmer observations have been shared for this fictional site. Ground inspection is needed to understand each pattern.
                </p>
              }
            </section>

            <button
              type="button"
              onClick={() => setReportOpen(true)}
              className="hidden h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[17px] font-bold text-white shadow-cta lg:flex">
              
              <FileTextIcon className="h-5 w-5" aria-hidden /> Preview Action Report
            </button>
            <Link to={backTo} className="flex h-12 items-center justify-center rounded-xl text-[15px] font-bold text-primary">
              {backLabel}
            </Link>
          </div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur min-[390px]:px-5 lg:hidden">
        <button
          type="button"
          onClick={() => setReportOpen(true)}
          className="mx-auto flex h-14 w-full max-w-[640px] items-center justify-center gap-2 rounded-2xl bg-primary text-[17px] font-bold text-white">
          
          <FileTextIcon className="h-5 w-5" aria-hidden /> Preview Action Report
        </button>
      </div>

      <BottomSheet open={detailsOpen} onClose={closeDetails} title="Survey Details">
        <SurveyDetailsList survey={survey} />
      </BottomSheet>
      <AreaSheet
        survey={survey}
        area={area}
        onClose={closeArea}
        onOpenRecord={(r) => {
          setArea(null);
          setRecord(r);
        }} />
      
      <LinkedRecordSheet record={record} onClose={closeRecord} />
      <ActionReportSheet survey={survey} open={reportOpen} onClose={closeReport} />
    </div>);

}