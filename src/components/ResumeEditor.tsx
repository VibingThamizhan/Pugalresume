import React, { useState } from 'react';
import { ResumeData, ExperienceItem } from '../types/resume';
import { Plus, Trash2, RotateCcw, Check, Sparkles } from 'lucide-react';
import { DEFAULT_RESUME_DATA } from '../data/defaultResume';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
  onApplyIndustryPreset: (industryKey: string) => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  data,
  onChange,
  onApplyIndustryPreset,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'summary' | 'experience' | 'skills' | 'certifications'>('info');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 2500);
  };

  const updatePersonalInfo = (field: keyof typeof data.personalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const updateSummary = (newSummary: string) => {
    onChange({
      ...data,
      summary: newSummary,
    });
  };

  const updateBullet = (expIndex: number, bulletIndex: number, val: string) => {
    const newExp = [...data.experience];
    newExp[expIndex].bullets[bulletIndex] = val;
    onChange({ ...data, experience: newExp });
  };

  const addBullet = (expIndex: number) => {
    const newExp = [...data.experience];
    newExp[expIndex].bullets.push('Spearheaded document quality control procedures to uphold compliance standards.');
    onChange({ ...data, experience: newExp });
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const newExp = [...data.experience];
    newExp[expIndex].bullets.splice(bulletIndex, 1);
    onChange({ ...data, experience: newExp });
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all details back to the verified original data?')) {
      onChange(JSON.parse(JSON.stringify(DEFAULT_RESUME_DATA)));
      showNotification('Restored to default verified credentials.');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-5">
      {/* Header with Quick Sector Presets & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Resume Content Customizer
          </h2>
          <p className="text-xs text-slate-500">
            Fine-tune wording, contact details, or customize for specific UAE job requirements
          </p>
        </div>

        <div className="flex items-center gap-2">
          {statusMsg && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded">
              <Check className="w-3.5 h-3.5" /> {statusMsg}
            </span>
          )}
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
            title="Reset to initial data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Default
          </button>
        </div>
      </div>

      {/* Target Sector Quick Optimizer */}
      <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Target Sector Preset:
          </span>
          <span className="text-[11px] text-slate-500">One-click alignment for specific tenders</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <button
            onClick={() => {
              onApplyIndustryPreset('oilgas');
              showNotification('Aligned for Oil & Gas / EPC roles');
            }}
            className="px-2 py-1 text-xs font-medium text-left bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded text-slate-700 hover:text-blue-700 transition-colors"
          >
            🛢️ Oil &amp; Gas / EPC
          </button>
          <button
            onClick={() => {
              onApplyIndustryPreset('marine');
              showNotification('Aligned for Marine & Port Operations');
            }}
            className="px-2 py-1 text-xs font-medium text-left bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded text-slate-700 hover:text-blue-700 transition-colors"
          >
            ⚓ Marine &amp; Maritime
          </button>
          <button
            onClick={() => {
              onApplyIndustryPreset('infrastructure');
              showNotification('Aligned for Infrastructure & Construction');
            }}
            className="px-2 py-1 text-xs font-medium text-left bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded text-slate-700 hover:text-blue-700 transition-colors"
          >
            🏗️ Infrastructure
          </button>
          <button
            onClick={() => {
              onApplyIndustryPreset('corporate');
              showNotification('Aligned for Corporate Administration');
            }}
            className="px-2 py-1 text-xs font-medium text-left bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded text-slate-700 hover:text-blue-700 transition-colors"
          >
            🏢 Corporate &amp; Ops
          </button>
        </div>
      </div>

      {/* Editor Sub-Tabs */}
      <div className="mt-4 flex border-b border-slate-200 gap-1 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'info'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Contact &amp; Status
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'summary'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Executive Summary
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'experience'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Experience Bullets
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'skills'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Core Competencies
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'certifications'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Certifications &amp; Edu
        </button>
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {/* TAB 1: Contact & Status */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primary Target Title</label>
              <input
                type="text"
                value={data.personalInfo.targetTitle}
                onChange={(e) => updatePersonalInfo('targetTitle', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Secondary Target Title</label>
              <input
                type="text"
                value={data.personalInfo.secondaryTitle}
                onChange={(e) => updatePersonalInfo('secondaryTitle', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Location</label>
              <input
                type="text"
                value={data.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">UAE Phone</label>
              <input
                type="text"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">UAE Visa Status</label>
              <input
                type="text"
                value={data.personalInfo.visaStatus}
                onChange={(e) => updatePersonalInfo('visaStatus', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Availability</label>
              <input
                type="text"
                value={data.personalInfo.availability}
                onChange={(e) => updatePersonalInfo('availability', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Driving License</label>
              <input
                type="text"
                value={data.personalInfo.drivingLicense}
                onChange={(e) => updatePersonalInfo('drivingLicense', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
          </div>
        )}

        {/* TAB 2: Executive Summary */}
        {activeTab === 'summary' && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Professional Profile Summary
              </label>
              <textarea
                rows={7}
                value={data.summary}
                onChange={(e) => updateSummary(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded text-slate-900 bg-white leading-relaxed text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500">
                Tip: Keep key phrases such as &ldquo;ACTVET / CPD&rdquo;, &ldquo;Aconex EDMS&rdquo;, &ldquo;SharePoint&rdquo;, and &ldquo;Port of Singapore Authority (PSA)&rdquo; intact for maximum ATS keyword score.
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-5 text-xs">
            {data.experience.map((exp: ExperienceItem, expIdx: number) => (
              <div key={exp.id || expIdx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-bold text-slate-900">
                  <span>
                    {exp.role} — {exp.company}
                  </span>
                  <span className="text-slate-500 font-normal">{exp.periodLabel}</span>
                </div>

                <div className="space-y-2">
                  {exp.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-1.5">
                      <textarea
                        rows={2}
                        value={b}
                        onChange={(e) => updateBullet(expIdx, bIdx, e.target.value)}
                        className="w-full p-1.5 border border-slate-300 rounded text-slate-800 bg-white text-xs leading-normal"
                      />
                      <button
                        onClick={() => removeBullet(expIdx, bIdx)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addBullet(expIdx)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 pt-1"
                  >
                    <Plus className="w-3 h-3" /> Add Responsibility Bullet
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-3 text-xs">
            {data.competencies.map((cat, cIdx) => (
              <div key={cIdx} className="p-2.5 rounded border border-slate-200 bg-slate-50">
                <label className="font-bold text-slate-900 block mb-1">{cat.category}</label>
                <input
                  type="text"
                  value={cat.items.join(', ')}
                  onChange={(e) => {
                    const updated = [...data.competencies];
                    updated[cIdx].items = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                    onChange({ ...data, competencies: updated });
                  }}
                  className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900 text-xs"
                />
                <span className="text-[10.5px] text-slate-500">Separate technical skills with commas</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: Certifications */}
        {activeTab === 'certifications' && (
          <div className="space-y-3 text-xs">
            <div className="font-bold text-slate-900">Current Certifications</div>
            {data.certifications.map((c, i) => (
              <div key={c.id || i} className="p-2.5 rounded border border-slate-200 bg-slate-50 flex items-start justify-between">
                <div>
                  <div className="font-bold text-slate-900">{c.title} ({c.year})</div>
                  <div className="text-slate-700">{c.accreditation}</div>
                  <div className="text-slate-500 text-[11px]">{c.issuer} · {c.location}</div>
                </div>
              </div>
            ))}

            <div className="font-bold text-slate-900 pt-2 border-t border-slate-200">Education</div>
            {data.education.map((e, i) => (
              <div key={e.id || i} className="p-2.5 rounded border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-900">{e.degree} ({e.year})</div>
                <div className="text-slate-600">{e.institution} · {e.location}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
