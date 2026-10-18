import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, SlidersHorizontalIcon } from 'lucide-react';
import { droneSurveys } from '../../data/droneSurveys';
import { surveyViews } from '../../data/surveyViews';
import { InspectionArea, LinkedRecord, SurveyView } from '../../types/drone';
import { viewDetails } from '../../utils/survey';
import { BottomSheet } from '../BottomSheet';
import { AreaRowContent } from '../drone/AreaRowContent';
import { AreaSheet } from '../drone/AreaSheet';
import { LinkedRecordSheet } from '../drone/LinkedRecordSheet';
import { SurveyDetailsList } from '../drone/SurveyDetailsList';
import { SurveyLegend } from '../drone/SurveyLegend';
import { SurveyViewer } from '../drone/SurveyViewer';
import { ViewSelector } from '../drone/ViewSelector';
import { LandingContainer } from './LandingContainer';

const survey = droneSurveys[0];

export function DroneShowcaseSection() {
  const [view, setView] = useState<SurveyView>('aerial');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [area, setArea] = useState<InspectionArea | null>(null);
  const [record, setRecord] = useState<LinkedRecord | null>(null);
  const closeDetails = useCallback(() => setDetailsOpen(false), []);
  const closeArea = useCallback(() => setArea(null), []);
  const closeRecord = useCallback(() => setRecord(null), []);
  const meta = surveyViews[view];

  return (
    <section id="drone-showcase" aria-labelledby="showcase-title" className="scroll-mt-20 border-y border-line bg-card py-14 lg:py-20">
      <LandingContainer>
        <h2 id="showcase-title" className="text-[28px] font-bold leading-tight text-primary-dark md:text-[36px]">
          A closer look from above.
        </h2>
        <p className="mt-2 max-w-[600px] text-[17px] leading-relaxed text-ink-muted">Explore how different survey views can help organize field observations.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-10">
          <div className="order-2 lg:order-1">
            <ViewSelector value={view} onChange={setView} layout="list" className="mb-6 hidden lg:flex" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                aria-live="polite">
                
                <p className="text-[14px] font-semibold text-primary">
                  View {meta.letter} · {survey.site}
                </p>
                <h3 className="mt-1 text-[22px] font-bold text-primary-dark">{meta.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink">{meta.text}</p>
                <dl className="mt-4 grid grid-cols-1 gap-2 min-[390px]:grid-cols-3 lg:grid-cols-1">
                  {viewDetails(survey, view).map((d) =>
                  <div key={d.label} className="rounded-2xl bg-canvas px-3 py-2.5">
                      <dt className="text-[13px] text-ink-muted">{d.label}</dt>
                      <dd className="text-[15px] font-semibold text-ink">{d.value}</dd>
                    </div>
                  )}
                </dl>
                {view === 'priorities' &&
                <ul className="mt-4 space-y-2">
                    {survey.areas.map((a) =>
                  <li key={a.id}>
                        <button
                      type="button"
                      onClick={() => setArea(a)}
                      className="flex min-h-[64px] w-full items-center gap-3 rounded-2xl border border-line bg-card p-3 text-left active:bg-canvas">
                      
                          <AreaRowContent area={a} />
                        </button>
                      </li>
                  )}
                  </ul>
                }
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setDetailsOpen(true)}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-line text-[15px] font-bold text-primary lg:hidden">
              
              <SlidersHorizontalIcon className="h-4 w-4" aria-hidden /> Survey Details
            </button>
            <details className="mt-6 hidden rounded-2xl border border-line lg:block">
              <summary className="flex min-h-[52px] cursor-pointer items-center px-4 text-[15px] font-bold text-primary">Survey Details</summary>
              <div className="px-4 pb-4">
                <SurveyDetailsList survey={survey} />
              </div>
            </details>
            <Link
              to="/drone-insights?from=drone-showcase"
              className="mt-3 flex h-12 items-center justify-center gap-1.5 rounded-xl text-[15px] font-bold text-primary lg:justify-start lg:px-1">
              
              Open the full Drone Insights preview <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="order-1 space-y-3 lg:order-2">
            <ViewSelector value={view} onChange={setView} layout="grid" className="lg:hidden" />
            <SurveyViewer
              survey={survey}
              view={view}
              showMarkers={view === 'priorities'}
              selectedAreaId={area?.id}
              onSelectArea={setArea}
              onSelectRecord={setRecord}
              lazy />
            
            <SurveyLegend view={view} />
          </div>
        </div>
      </LandingContainer>

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
    </section>);

}