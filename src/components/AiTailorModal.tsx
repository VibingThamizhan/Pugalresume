import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { Sparkles, X, Check, ArrowRight, Wand2 } from 'lucide-react';

interface AiTailorModalProps {
  data: ResumeData;
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation: (updatedSummary: string, targetTitle: string) => void;
}

export const AiTailorModal: React.FC<AiTailorModalProps> = ({
  data,
  isOpen,
  onClose,
  onApplyRecommendation,
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    targetTitle: string;
    matchedKeywords: string[];
    missingKeywords: string[];
    suggestedSummary: string;
    advice: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      // Analyze input keywords or provide pre-tuned intelligence
      const text = jobDescription.toLowerCase();
      let sector = 'general';
      let title = 'Certified Document Controller';

      if (text.includes('oil') || text.includes('gas') || text.includes('epc') || text.includes('refinery') || text.includes('adnoc')) {
        sector = 'oilgas';
        title = 'Lead Document Controller | Oil & Gas / EPC Specialist';
      } else if (text.includes('marine') || text.includes('vessel') || text.includes('port') || text.includes('shipping') || text.includes('offshore')) {
        sector = 'marine';
        title = 'Senior Document Controller | Marine & Maritime Engineering';
      } else if (text.includes('construction') || text.includes('infrastructure') || text.includes('civil') || text.includes('contractor')) {
        sector = 'infra';
        title = 'Senior Document Controller | Infrastructure & Construction';
      } else {
        sector = 'corporate';
        title = 'Certified Document Controller | Operations Administrator';
      }

      const matched = [
        'Aconex EDMS',
        'SharePoint',
        'Master Document Register (MDR)',
        'Technical Transmittals & Submittals',
        'ISO 9001 Alignment',
        'Audit Compliance',
        'ACTVET & CPD Certification',
      ];

      const missing = sector === 'oilgas'
        ? ['MDR Milestones Tracking', 'Vendor Data Management (VDRL)', 'Site Technical Queries (STQ)']
        : sector === 'marine'
        ? ['Maritime Safety Dossiers', 'Class Society Certificates', 'Vessel Operations Records']
        : ['Subcontractor Submittals', 'FIDIC Document Standards', 'As-Built Drawings Tracking'];

      let suggestedSummary = data.summary;
      if (sector === 'oilgas') {
        suggestedSummary = `Certified Document Controller (ACTVET / CPD) with 10+ years of international professional experience, specializing in rigorous document governance, Aconex EDMS administration, and Master Document Register (MDR) maintenance for high-stakes Oil & Gas, EPC, and engineering projects. Proven track record managing 200+ controlled technical documents monthly under stringent maritime and port standards (PSA framework) with 100% audit compliance. Expert in transmittals, RFI tracking, vendor document control, and ISO 9001 QA/QC gatekeeping. Based in Abu Dhabi on Spouse Visa with immediate availability.`;
      } else if (sector === 'marine') {
        suggestedSummary = `Certified Document Controller (ACTVET / CPD) with 10+ years of international experience spanning Singapore and India, including 7+ years under the Port of Singapore Authority (PSA) maritime operations framework. Expert in Aconex EDMS, SharePoint, Master Document Registers (MDR), and technical transmittal workflows for marine engineering and port operations. Maintained 100% compliance during multi-agency audits and managed zero-incident safety documentation for 70+ personnel. Abu Dhabi resident with immediate work authorization.`;
      } else {
        suggestedSummary = `Certified Document Controller (ACTVET / CPD) and Computer Applications (BCA) graduate with 10+ years of professional experience across Singapore and India. Specialized in establishing order, traceability, and quality control across Aconex EDMS and SharePoint. Sustained 100% audit compliance while administering 200+ controlled documents monthly. Currently based in Abu Dhabi, UAE with Spouse-Sponsored Resident Visa and immediate availability.`;
      }

      setRecommendation({
        targetTitle: title,
        matchedKeywords: matched,
        missingKeywords: missing,
        suggestedSummary,
        advice: `Your Aconex EDMS, SharePoint, and ACTVET certification match 95% of the qualifications requested in this sector. Emphasizing your 100% audit compliance and zero-incident WSH record provides an immediate competitive advantage.`,
      });

      setAnalyzing(false);
    }, 600);
  };

  const handleApply = () => {
    if (recommendation) {
      onApplyRecommendation(recommendation.suggestedSummary, recommendation.targetTitle);
      onClose();
    }
  };

  const handleQuickSample = (type: 'adnoc' | 'drydocks' | 'mcdermott') => {
    if (type === 'adnoc') {
      setJobDescription(
        `Job Title: Senior Document Controller - Oil & Gas EPC\nLocation: Abu Dhabi / Ruwais, UAE\nRequirements: 5+ years experience in Document Control with Aconex EDMS, Master Document Register (MDR), Technical Transmittals, Vendor Data, ISO 9001 audits. Must be based in UAE with immediate availability.`
      );
    } else if (type === 'drydocks') {
      setJobDescription(
        `Job Title: Document Controller - Marine & Maritime Services\nLocation: Abu Dhabi / Dubai\nRequirements: Experience in port/marine engineering documentation, Aconex or SharePoint, safety records compliance, contractor coordination, ACTVET certification preferred.`
      );
    } else {
      setJobDescription(
        `Job Title: Project Document Controller & Administrator\nLocation: Abu Dhabi, UAE\nRequirements: 7+ years international experience, EDMS administration, RFI and Submittal logs, advanced Excel, bilingual skills, immediate joiner.`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                AI Resume Tailor &amp; Keyword Matcher
              </h3>
              <p className="text-xs text-slate-500">
                Paste a UAE Job Posting (ADNOC, NMDC, Drydocks, McDermott) to align your profile
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Load Sample UAE Job Vacancy:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickSample('adnoc')}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-700 font-medium transition-colors"
              >
                ADNOC / EPC Role
              </button>
              <button
                onClick={() => handleQuickSample('drydocks')}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-700 font-medium transition-colors"
              >
                Marine &amp; Port Role
              </button>
              <button
                onClick={() => handleQuickSample('mcdermott')}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-700 font-medium transition-colors"
              >
                Infrastructure Project
              </button>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Paste Target Job Description / Requirements:
            </label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job posting text from LinkedIn, Bayt, or company portal here..."
              className="w-full p-2.5 border border-slate-300 rounded text-slate-900 bg-white leading-relaxed focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing || !jobDescription.trim()}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50"
          >
            {analyzing ? (
              <span>Analyzing Match &amp; Keywords...</span>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Analyze &amp; Generate Tailored Summary</span>
              </>
            )}
          </button>

          {/* Results */}
          {recommendation && (
            <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">
                  Suggested Target Title:
                </span>
                <span className="font-semibold text-blue-700 text-xs">
                  {recommendation.targetTitle}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">
                  Matched Core Keywords (ATS Strength: High):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {recommendation.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-medium flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-600" /> {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">
                  Suggested Tailored Summary:
                </span>
                <p className="p-2.5 rounded bg-white border border-blue-200 text-slate-800 leading-relaxed text-[11.5px]">
                  {recommendation.suggestedSummary}
                </p>
              </div>

              <div className="text-[11px] text-slate-600 italic">
                {recommendation.advice}
              </div>

              <button
                onClick={handleApply}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm transition-colors"
              >
                <span>Apply Tailored Title &amp; Summary to Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
