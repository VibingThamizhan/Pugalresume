import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Linkedin, ShieldCheck, Download, Printer, Copy, Check } from 'lucide-react';
import { downloadResumePdf, printResume } from '../utils/pdfGenerator';

interface CoverLetterProps {
  data: ResumeData;
  targetRole?: string;
  targetCompany?: string;
}

export const CoverLetterView: React.FC<CoverLetterProps> = ({
  data,
  targetRole = 'Document Controller',
  targetCompany = 'Hiring Manager / Recruitment Team',
}) => {
  const { personalInfo } = data;
  const [recipient, setRecipient] = useState(targetCompany);
  const [roleTitle, setRoleTitle] = useState(targetRole);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const letterText = `Dear ${recipient},

I am writing to express my strong interest in the ${roleTitle} position with your esteemed organization. As a Certified Document Controller (ACTVET / CPD) and Computer Applications (BCA) graduate with 10+ years of international professional experience spanning Singapore and India, I bring a proven track record of establishing rigorous document governance, 100% audit compliance, and seamless operational coordination in demanding environments.

My recent background includes over 3 years of dedicated Document Control within high-volume port and maritime operations under the Port of Singapore Authority (PSA) framework at Royal Greyhound Pte Ltd. In this role, I administered Aconex EDMS and SharePoint platforms, overseeing the full document lifecycle for 200+ controlled technical and operational documents monthly. My responsibilities centered on Master Document Registers (MDR) maintenance, standardized document numbering schemes, QA/QC verification of engineering transmittals and submittals, revision and version control, and multi-departmental workflow optimization. Throughout multiple internal and client audit cycles, I consistently sustained zero non-conformances.

Prior to this, I served for over 4 years as Port Operations Deployment Supervisor, directing shift deployment and safety documentation for 70+ frontline personnel under Singapore Workplace Safety & Health (WSH) regulations, achieving a 100% incident-free safety record throughout my tenure. This foundation provides me with an exceptional understanding of how operational discipline, regulatory compliance, and meticulous record-keeping converge to protect project integrity.

Key Qualifications I Offer Your Team:
• Dual Professional Certification: ACTVET Licensed & CPD Accredited Document Controller (Abu Dhabi, UAE).
• Advanced EDMS Expertise: End-to-end administration of Aconex and SharePoint, MDR registers, transmittal workflows, and digital archiving.
• Audit & QA/QC Governance: Strict adherence to ISO 9001 standards, zero NCR track record, and comprehensive audit dossier compilation.
• Advanced Digital Skills: Advanced MS Excel (Pivot Tables, formulas, data validation), Adobe Acrobat Pro (redaction, bookmarking), and BCA technical degree.
• Immediate UAE Availability: Currently based in Al Danah, Abu Dhabi, holding a valid UAE Resident Visa (Spouse Sponsored) with full work readiness, zero notice period, and a valid UAE driving license.

I am eager to contribute my document governance expertise and operational diligence to your upcoming projects across the UAE. Thank you for your time and consideration. I welcome the opportunity to discuss how my qualifications align with your organizational objectives.

Sincerely,

${personalInfo.fullName}
${personalInfo.targetTitle}
${personalInfo.phone} | ${personalInfo.email}
${personalInfo.location}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    await downloadResumePdf('cover-letter-paper', `Pugazhendhi_Chandraboss_Cover_Letter.pdf`);
    setIsExporting(false);
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 uppercase block">Target Company</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="px-2.5 py-1 text-xs font-medium border border-slate-300 rounded bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
              placeholder="e.g. ADNOC / NMDC / Drydocks"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-500 uppercase block">Target Role</label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="px-2.5 py-1 text-xs font-medium border border-slate-300 rounded bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
              placeholder="e.g. Senior Document Controller"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Text' : 'Copy Text'}
          </button>
          <button
            onClick={printResume}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            {isExporting ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Printable Paper */}
      <div className="flex justify-center">
        <div
          id="cover-letter-paper"
          className="resume-paper bg-white text-slate-900 shadow-xl print:shadow-none w-full max-w-[830px] min-h-[1050px] p-10 md:p-12 mx-auto"
          style={{ fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          {/* Header */}
          <div className="border-b-2 border-[#0B2545] pb-4 mb-6">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 uppercase">
              {personalInfo.fullName}
            </h1>
            <div className="text-sm font-semibold text-[#0B2545] mt-0.5">
              {personalInfo.targetTitle} | {personalInfo.secondaryTitle}
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.phone}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.linkedin}
              </span>
            </div>
          </div>

          {/* Letter Body */}
          <div className="text-[13px] leading-relaxed text-slate-800 space-y-4">
            <div className="text-slate-600 font-medium">
              {currentDate}
            </div>

            <div className="font-semibold text-slate-900">
              To: {recipient}<br />
              Subject: Application for {roleTitle} — Ref: UAE-DC-2026
            </div>

            <p>Dear {recipient},</p>

            <p className="text-justify">
              I am writing to express my strong interest in the <strong>{roleTitle}</strong> position with your esteemed organization. As an <strong>ACTVET Licensed and CPD Accredited Document Controller</strong> with a Bachelor of Computer Applications (BCA) and over 10 years of international professional experience spanning Singapore and India, I bring a proven track record of establishing rigorous document governance, 100% audit compliance, and seamless operational coordination in demanding environments.
            </p>

            <p className="text-justify">
              My recent background includes over 3 years of dedicated Document Control within high-volume port and maritime operations under the <strong>Port of Singapore Authority (PSA) framework</strong> at Royal Greyhound Pte Ltd. In this role, I administered <strong>Aconex EDMS and SharePoint</strong> platforms, governing the complete document lifecycle for <strong>200+ controlled technical and operational documents monthly</strong>. My core responsibilities encompassed maintaining Master Document Registers (MDR), enforcing standardized document numbering conventions, performing QA/QC verification on technical transmittals and submittals, and executing revision and version control across multi-disciplinary teams. Throughout multiple external and client audit cycles, I consistently sustained zero non-conformances.
            </p>

            <p className="text-justify">
              Prior to this, I served for over 4 years as <strong>Port Operations Deployment Supervisor</strong>, directing shift administration and safety compliance for 70+ frontline personnel under Singapore Workplace Safety & Health (WSH) regulations, achieving a <strong>100% incident-free safety record over my 4-year tenure</strong>. This operational foundation gives me a deep appreciation for traceability, precision, and compliance integrity in high-stakes project environments.
            </p>

            <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs text-slate-800 space-y-1.5 my-3">
              <strong className="block text-slate-950 font-bold uppercase tracking-wider text-[11px] mb-1">
                Key Value Highlights for Your Organization:
              </strong>
              <div>• <strong>Dual UAE Credentials:</strong> Certified Document Controller (CPD Accredited) &amp; Document Control Course (ACTVET Licensed) from Abu Dhabi, UAE.</div>
              <div>• <strong>EDMS Proficiency:</strong> Hands-on expertise in Aconex EDMS, SharePoint, MDR maintenance, and transmittal workflows.</div>
              <div>• <strong>Audit &amp; QA/QC Integrity:</strong> ISO 9001 quality alignment, internal audit readiness, and zero non-conformance history.</div>
              <div>• <strong>Advanced Technical Toolkit:</strong> Advanced MS Excel (Pivot Tables, VLOOKUP), Adobe Acrobat Pro (redaction, bookmarking), and BCA technical background.</div>
              <div>• <strong>Immediate UAE Availability:</strong> Resident Visa (Spouse Sponsored) with valid work rights, zero notice period, and valid UAE Driving License.</div>
            </div>

            <p className="text-justify">
              I am based in Al Danah, Abu Dhabi, and am immediately available to join your team with zero notice period. I am open to positions across Abu Dhabi, the Western Region (Al Dhafra / Ruwais), Dubai, and all Emirates across Oil &amp; Gas, Marine Engineering, Infrastructure, and Corporate sectors.
            </p>

            <p>
              Thank you for your time and consideration. I would welcome the opportunity to discuss in an interview how my document management expertise can support your project deliverables.
            </p>

            <div className="pt-4 text-slate-900">
              <p>Sincerely,</p>
              <p className="font-bold text-base mt-2 text-slate-950">{personalInfo.fullName}</p>
              <p className="text-xs text-slate-600">{personalInfo.targetTitle}</p>
              <p className="text-xs text-slate-600">{personalInfo.phone} · {personalInfo.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
