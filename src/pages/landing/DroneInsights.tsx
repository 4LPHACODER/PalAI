import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BottomSheet } from '../../components/BottomSheet';
import { AreaSheet } from '../../components/drone/AreaSheet';
import { LinkedRecordSheet } from '../../components/drone/LinkedRecordSheet';
import { ActionReportSheet } from '../../components/drone/ActionReportSheet';
import { SurveyDetailsList } from '../../components/drone/SurveyDetailsList';
import { droneSurveys } from '../../data/droneSurveys';
import { InspectionArea, LinkedRecord, SurveyView } from '../../types/drone';
import { CapturedDroneFrame } from '../../types/droneConnection';

// Admin Dashboard Components
import { AdminSidebar, AdminTab } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminOverviewSection } from '../../components/admin/AdminOverviewSection';
import { DroneMonitoringSection } from '../../components/admin/DroneMonitoringSection';
import { FieldInsightsSection } from '../../components/admin/FieldInsightsSection';
import { ImageAnalysisSection, UploadedImage } from '../../components/admin/ImageAnalysisSection';
import { SurveyRecordsSection } from '../../components/admin/SurveyRecordsSection';
import { ReportsSection } from '../../components/admin/ReportsSection';
import { AdminSettingsSection } from '../../components/admin/AdminSettingsSection';
import { DroneConnectModal } from '../../components/admin/DroneConnectModal';
import { AiAnalysisModal } from '../../components/admin/AiAnalysisModal';
import { ImageLightboxModal } from '../../components/admin/ImageLightboxModal';

const returnSections = ['hero', 'products', 'drone-showcase', 'workflow', 'institutions'];

export function DroneInsights() {
  const [params, setParams] = useSearchParams();
  const from = params.get('from');
  const initialTabParam = params.get('tab') as AdminTab | null;

  const backTo =
    from === 'workspace'
      ? '/workspace'
      : `/landing#${from && returnSections.includes(from) ? from : 'products'}`;
  const backLabel = from === 'workspace' ? 'Back to workspace' : 'Back to public app';

  // State management
  const [activeTab, setActiveTab] = useState<AdminTab>(
    initialTabParam && ['overview', 'monitoring', 'insights', 'upload', 'records', 'reports', 'settings'].includes(initialTabParam)
      ? initialTabParam
      : from === 'drone-showcase'
      ? 'insights'
      : 'overview'
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Survey & insights state
  const [surveyId, setSurveyId] = useState(droneSurveys[0].id);
  const [view, setView] = useState<SurveyView>('priorities');
  const [area, setArea] = useState<InspectionArea | null>(null);
  const [record, setRecord] = useState<LinkedRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  // Local uploaded images state
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  // Modals state
  const [droneConnectModalOpen, setDroneConnectModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState<{
    open: boolean;
    src: string | null;
    title: string;
    meta?: string;
  }>({
    open: false,
    src: null,
    title: '',
  });

  const survey = droneSurveys.find((s) => s.id === surveyId) ?? droneSurveys[0];

  const handleSelectArea = (a: InspectionArea) => {
    setView('priorities');
    setArea(a);
  };

  const handleSelectSurvey = (id: string) => {
    setSurveyId(id);
    setArea(null);
  };

  const handleOpenReportForSurvey = (id: string) => {
    setSurveyId(id);
    setActiveTab('reports');
  };

  const handlePreviewImage = (src: string, title: string, meta?: string) => {
    setLightboxState({
      open: true,
      src,
      title,
      meta,
    });
  };

  // Uploaded images management
  const handleAddImages = (newImages: UploadedImage[]) => {
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleClearAllImages = () => {
    setUploadedImages([]);
  };

  const handleStageCapturedFrame = (frame: CapturedDroneFrame) => {
    const stagedImage: UploadedImage = {
      id: frame.id,
      name: frame.filename,
      sizeBytes: frame.sizeBytes,
      dataUrl: frame.dataUrl,
      timestamp: frame.timestamp,
      format: 'JPG',
      status: 'ready',
    };
    handleAddImages([stagedImage]);
  };

  return (
    <div className="min-h-screen w-full bg-canvas text-ink flex">
      {/* Collapsible Administrative Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          // sync URL param without reloading
          setParams(
            (prev) => {
              const next = new URLSearchParams(prev);
              next.set('tab', tab);
              return next;
            },
            { replace: true }
          );
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        backTo={backTo}
        backLabel={backLabel}
      />

      {/* Main Administrative Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobile={() => setMobileMenuOpen(true)}
          onOpenDroneConnectModal={() => setDroneConnectModalOpen(true)}
          onNavigateTab={(tab) => {
            setActiveTab(tab);
            setParams(
              (prev) => {
                const next = new URLSearchParams(prev);
                next.set('tab', tab);
                return next;
              },
              { replace: true }
            );
          }}
        />

        {/* Dynamic Admin Page Sections */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <AdminOverviewSection
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setParams(
                  (prev) => {
                    const next = new URLSearchParams(prev);
                    next.set('tab', tab);
                    return next;
                  },
                  { replace: true }
                );
              }}
              onSelectSurvey={handleSelectSurvey}
              onOpenDroneConnectModal={() => setDroneConnectModalOpen(true)}
              localImageCount={uploadedImages.length}
            />
          )}

          {activeTab === 'monitoring' && (
            <DroneMonitoringSection
              onOpenAiModal={() => setAiModalOpen(true)}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setParams(
                  (prev) => {
                    const next = new URLSearchParams(prev);
                    next.set('tab', tab);
                    return next;
                  },
                  { replace: true }
                );
              }}
              onStageCapturedFrame={handleStageCapturedFrame}
            />
          )}

          {activeTab === 'insights' && (
            <FieldInsightsSection
              survey={survey}
              onSelectSurveyId={handleSelectSurvey}
              view={view}
              onChangeView={setView}
              selectedArea={area}
              onSelectArea={handleSelectArea}
              onSelectRecord={setRecord}
              onOpenDetails={() => setDetailsOpen(true)}
              onOpenReport={() => setReportOpen(true)}
              onPreviewImage={handlePreviewImage}
            />
          )}

          {activeTab === 'upload' && (
            <ImageAnalysisSection
              uploadedImages={uploadedImages}
              onAddImages={handleAddImages}
              onRemoveImage={handleRemoveImage}
              onClearAll={handleClearAllImages}
              onOpenAiModal={() => setAiModalOpen(true)}
              onPreviewImage={handlePreviewImage}
            />
          )}

          {activeTab === 'records' && (
            <SurveyRecordsSection
              onSelectSurvey={handleSelectSurvey}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setParams(
                  (prev) => {
                    const next = new URLSearchParams(prev);
                    next.set('tab', tab);
                    return next;
                  },
                  { replace: true }
                );
              }}
              onOpenReportForSurvey={handleOpenReportForSurvey}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsSection initialSurveyId={surveyId} />
          )}

          {activeTab === 'settings' && (
            <AdminSettingsSection
              onClearLocalImages={handleClearAllImages}
              localImageCount={uploadedImages.length}
            />
          )}
        </main>
      </div>

      {/* Global Administrative Modals */}
      <DroneConnectModal
        open={droneConnectModalOpen}
        onClose={() => setDroneConnectModalOpen(false)}
      />

      <AiAnalysisModal
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        imageCount={uploadedImages.length}
      />

      <ImageLightboxModal
        imageSrc={lightboxState.src}
        imageTitle={lightboxState.title}
        imageMeta={lightboxState.meta}
        onClose={() => setLightboxState((prev) => ({ ...prev, open: false, src: null }))}
      />

      {/* Existing Sheets for Field Insights Deep Details */}
      <BottomSheet open={detailsOpen} onClose={() => setDetailsOpen(false)} title="Survey Flight Parameters">
        <SurveyDetailsList survey={survey} />
      </BottomSheet>

      <AreaSheet
        survey={survey}
        area={area}
        onClose={() => setArea(null)}
        onOpenRecord={(r) => {
          setArea(null);
          setRecord(r);
        }}
      />

      <LinkedRecordSheet record={record} onClose={() => setRecord(null)} />

      <ActionReportSheet
        survey={survey}
        open={reportOpen}
        onClose={() => setReportOpen(false)}
      />
    </div>
  );
}