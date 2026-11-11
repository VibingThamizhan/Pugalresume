import { useState } from 'react';
import { DEFAULT_RESUME_DATA } from './data/defaultResume';
import { ResumeData, ResumeFormat, SpacingDensity, ColorCustomization } from './types/resume';
import { ResumePreview } from './components/ResumePreview';
import { CoverLetterView } from './components/CoverLetterView';
import { ResumeEditor } from './components/ResumeEditor';
import { AtsTextExportModal } from './components/AtsTextExportModal';
import { AiTailorModal } from './components/AiTailorModal';
import { ColorStudioModal } from './components/ColorStudioModal';
import { downloadResumePdf, printResume } from './utils/pdfGenerator';
import {
  Download,
  Printer,
  Edit3,
  Sparkles,
  ZoomIn,
  ZoomOut,
  CheckCircle,
  Shield,
  Layers,
  Palette,
} from 'lucide-react';

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const [activeTab, setActiveTab] = useState<'preview' | 'coverletter' | 'editor'>('preview');
  const [format, setFormat] = useState<ResumeFormat>('full');
  const [density, setDensity] = useState<SpacingDensity>('normal');
  const [showMetricsBar, setShowMetricsBar] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Infinite Color Studio State (Supports 16.7 million colors, paper tints, and header styles)
  const [colorConfig, setColorConfig] = useState<ColorCustomization>({
    primaryColor: '#0B2545',
    secondaryColor: '#334155',
    paperColor: '#FFFFFF',
    headerStyle: 'classic',
  });
  const [showColorStudio, setShowColorStudio] = useState(false);

  // Modals
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  // Industry Preset Handler
  const handleApplyIndustryPreset = (sector: string) => {
    const updated = { ...resumeData };
    if (sector === 'oilgas') {
      updated.personalInfo.targetTitle = 'Certified Document Controller';
      updated.personalInfo.secondaryTitle = 'Oil & Gas / EPC Project Documentation Specialist';
      updated.summary =
        'Certified Document Controller (ACTVET / CPD) with 10+ years of international professional experience, specializing in rigorous document governance, Aconex EDMS administration, and Master Document Register (MDR) maintenance for high-stakes Oil & Gas, EPC, and engineering projects. Proven track record managing 200+ controlled technical documents monthly under stringent maritime and port standards (PSA framework) with 100% audit compliance. Expert in transmittals, RFI tracking, vendor document control, and ISO 9001 QA/QC gatekeeping. Based in Abu Dhabi on Spouse Visa with immediate availability.';
      setColorConfig((prev) => ({ ...prev, primaryColor: '#003366' })); // ADNOC Royal Blue
    } else if (sector === 'marine') {
      updated.personalInfo.targetTitle = 'Document Controller & Marine Operations Specialist';
      updated.personalInfo.secondaryTitle = 'PSA Framework & Maritime Logistics Coordinator';
      updated.summary =
        'Certified Document Controller (ACTVET / CPD) with 10+ years of international experience spanning Singapore and India, including 7+ years under the Port of Singapore Authority (PSA) maritime operations framework. Expert in Aconex EDMS, SharePoint, Master Document Registers (MDR), and technical transmittal workflows for marine engineering and port operations. Maintained 100% compliance during multi-agency audits and managed zero-incident safety documentation for 70+ personnel. Abu Dhabi resident with immediate work authorization.';
      setColorConfig((prev) => ({ ...prev, primaryColor: '#0B2545' })); // Maritime Navy
    } else if (sector === 'infrastructure') {
      updated.personalInfo.targetTitle = 'Senior Document Controller';
      updated.personalInfo.secondaryTitle = 'Major Infrastructure & Engineering Projects';
      updated.summary =
        'Certified Document Controller (ACTVET / CPD) and Computer Applications (BCA) graduate with 10+ years of experience establishing order, traceability, and quality control on major infrastructure and engineering projects. Administered Aconex EDMS and SharePoint to manage 200+ controlled drawings, submittals, and inspection records monthly with 100% audit compliance. Experienced in contractor correspondence, submittal logs, and ISO 9001 quality systems. Available immediately in the UAE.';
      setColorConfig((prev) => ({ ...prev, primaryColor: '#0E3B43' })); // Petroleum Teal
    } else {
      updated.personalInfo.targetTitle = 'Certified Document Controller';
      updated.personalInfo.secondaryTitle = 'Administration & Operations Professional';
      updated.summary = DEFAULT_RESUME_DATA.summary;
      setColorConfig((prev) => ({ ...prev, primaryColor: '#0B2545' }));
    }
    setResumeData(updated);
  };

  const handleApplyAiSummary = (newSummary: string, newTitle: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        targetTitle: newTitle,
      },
      summary: newSummary,
    }));
    setExportNotice('Resume tailored to target job specifications!');
    setTimeout(() => setExportNotice(null), 3000);
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    setExportNotice('Rendering high-resolution A4 PDF document...');
    const targetElementId = activeTab === 'coverletter' ? 'cover-letter-paper' : 'resume-document-root';
    const filename =
      activeTab === 'coverletter'
        ? 'Pugazhendhi_Chandraboss_Cover_Letter.pdf'
        : 'Pugazhendhi_Chandraboss_Document_Controller_Resume.pdf';

    const success = await downloadResumePdf(targetElementId, filename);
    setIsExporting(false);
    if (success) {
      setExportNotice('PDF downloaded successfully!');
    } else {
      setExportNotice('Opening native PDF print dialogue...');
    }
    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* ==================================================================== */}
      {/* 1. TOP BAR CONTRACT                                                  */}
      {/* [Brand wordmark] — [Nav links] — [Primary action]                    */}
      {/* ==================================================================== */}
      <header className="app-header no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              Pugazhendhi Chandraboss
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              ACTVET / CPD
            </span>
          </div>

          {/* Zone 2: Navigation Links (Single-line, unboxed text with active underline) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('preview')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'preview' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
              }`}
            >
              Resume Dossier
            </button>
            <button
              onClick={() => setActiveTab('coverletter')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'coverletter' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
              }`}
            >
              Cover Letter
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'editor' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
              }`}
            >
              Edit Content
            </button>
            <button
              onClick={() => setShowAtsModal(true)}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5"
            >
              ATS Text Export
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowColorStudio(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Open Color Studio (Thousands of colors)"
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                style={{ backgroundColor: colorConfig.primaryColor }}
              />
              <span className="hidden sm:inline">Color Studio</span>
            </button>

            <button
              onClick={() => setShowAiModal(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Tailor to Job Description"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              AI Tailor
            </button>

            <button
              onClick={printResume}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Print to PDF / System Print"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Exporting...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

        {/* Mobile View Switcher */}
        <div className="md:hidden flex border-t border-slate-200 text-xs font-medium bg-slate-50">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 text-center ${
              activeTab === 'preview' ? 'text-blue-600 font-bold bg-white border-b-2 border-blue-600' : 'text-slate-600'
            }`}
          >
            Resume
          </button>
          <button
            onClick={() => setActiveTab('coverletter')}
            className={`flex-1 py-2 text-center ${
              activeTab === 'coverletter' ? 'text-blue-600 font-bold bg-white border-b-2 border-blue-600' : 'text-slate-600'
            }`}
          >
            Cover Letter
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-2 text-center ${
              activeTab === 'editor' ? 'text-blue-600 font-bold bg-white border-b-2 border-blue-600' : 'text-slate-600'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setShowColorStudio(true)}
            className="flex-1 py-2 text-center text-slate-600 font-semibold"
          >
            🎨 Colors
          </button>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 2. SECONDARY WORKSPACE CONTROLS BAR (PRINT HIDDEN)                   */}
      {/* ==================================================================== */}
      <div className="no-print bg-white border-b border-slate-200 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Quick status trust markers */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-slate-800">
              <Shield className="w-3.5 h-3.5 text-blue-600 inline" />
              Certified Document Controller (ACTVET / CPD)
            </span>
            <span className="text-slate-300">·</span>
            <span>Port of Singapore Authority (PSA) Framework</span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Immediate UAE Availability (Spouse Visa)
            </span>
          </div>

          {/* Document Styling & Layout Toolbar (When in Preview) */}
          {activeTab === 'preview' && (
            <div className="flex flex-wrap items-center gap-2">
              {/* Quick Real-Time Color Picker Pill */}
              <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                <Palette className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[11px] font-medium text-slate-600 hidden sm:inline">Accent Color:</span>
                <input
                  type="color"
                  value={colorConfig.primaryColor}
                  onChange={(e) => setColorConfig((c) => ({ ...c, primaryColor: e.target.value }))}
                  className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
                  title="Pick from 16.7 million colors in real time"
                />
                <button
                  onClick={() => setShowColorStudio(true)}
                  className="text-[11px] font-bold text-blue-700 hover:underline pl-0.5"
                >
                  {colorConfig.primaryColor.toUpperCase()} · More
                </button>
              </div>

              {/* Format / Length */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                <Layers className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
                <button
                  onClick={() => setFormat('full')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                    format === 'full' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2-Page Dossier
                </button>
                <button
                  onClick={() => setFormat('compact')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                    format === 'compact' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1-Page Focused
                </button>
              </div>

              {/* Density */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                <button
                  onClick={() => setDensity('compact')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                    density === 'compact' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dense
                </button>
                <button
                  onClick={() => setDensity('normal')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                    density === 'normal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Standard
                </button>
              </div>

              {/* Metrics Toggle */}
              <button
                onClick={() => setShowMetricsBar(!showMetricsBar)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
                  showMetricsBar
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {showMetricsBar ? '✓ Metrics Banner' : '+ Metrics Banner'}
              </button>

              {/* Zoom Controls */}
              <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 10, 70))}
                  className="p-1 hover:bg-white rounded text-slate-600"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1 text-[11px] font-mono tabular-nums text-slate-600">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 10, 130))}
                  className="p-1 hover:bg-white rounded text-slate-600"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {exportNotice && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. MAIN WORKSPACE CONTENT AREA                                       */}
      {/* ==================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'preview' && (
          <div className="space-y-4">
            {/* Quick Helper Banner */}
            <div className="no-print bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-800">
                <Shield className="w-4 h-4 text-blue-700 shrink-0" />
                <span>
                  <strong>A4 Print-Ready Architecture:</strong> Formatted to exact ISO 216 dimensions with zero overflow and 100% audit-compliant typography.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowColorStudio(true)}
                  className="flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-semibold"
                >
                  <Palette className="w-3.5 h-3.5" /> Infinite Color Studio (16.7M Colors)
                </button>
                <span className="text-slate-300">·</span>
                <button
                  onClick={() => setActiveTab('editor')}
                  className="flex items-center gap-1 text-blue-700 hover:text-blue-800 font-semibold"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Info
                </button>
                <span className="text-slate-300">·</span>
                <button
                  onClick={() => setShowAiModal(true)}
                  className="flex items-center gap-1 text-blue-700 hover:text-blue-800 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Tailor for Job
                </button>
              </div>
            </div>

            {/* Resume Canvas */}
            <div className="overflow-x-auto pb-8">
              <ResumePreview
                data={resumeData}
                colorConfig={colorConfig}
                format={format}
                density={density}
                showMetricsBar={showMetricsBar}
                zoomLevel={zoomLevel}
              />
            </div>
          </div>
        )}

        {activeTab === 'coverletter' && (
          <CoverLetterView
            data={resumeData}
            targetRole={resumeData.personalInfo.targetTitle}
            primaryColor={colorConfig.primaryColor}
          />
        )}

        {activeTab === 'editor' && (
          <ResumeEditor
            data={resumeData}
            onChange={setResumeData}
            onApplyIndustryPreset={handleApplyIndustryPreset}
          />
        )}
      </main>

      {/* ==================================================================== */}
      {/* 4. MODALS (COLOR STUDIO, ATS TEXT & AI TAILOR)                       */}
      {/* ==================================================================== */}
      <ColorStudioModal
        isOpen={showColorStudio}
        onClose={() => setShowColorStudio(false)}
        config={colorConfig}
        onChange={setColorConfig}
      />

      <AtsTextExportModal
        data={resumeData}
        isOpen={showAtsModal}
        onClose={() => setShowAtsModal(false)}
      />

      <AiTailorModal
        data={resumeData}
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onApplyRecommendation={handleApplyAiSummary}
      />

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Pugazhendhi Chandraboss · Certified Document Controller (ACTVET / CPD)</span>
          <div className="flex items-center gap-4">
            <a href="mailto:email2pugal@gmail.com" className="hover:text-slate-900 transition-colors">
              email2pugal@gmail.com
            </a>
            <span>·</span>
            <a href="tel:+971565686395" className="hover:text-slate-900 transition-colors">
              +971 56 568 6395
            </a>
            <span>·</span>
            <span>Abu Dhabi, UAE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
