import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { generateAtsPlainText } from '../utils/pdfGenerator';
import { Copy, Check, X, FileText, Code } from 'lucide-react';

interface AtsTextExportModalProps {
  data: ResumeData;
  isOpen: boolean;
  onClose: () => void;
}

export const AtsTextExportModal: React.FC<AtsTextExportModalProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'text' | 'markdown'>('text');

  if (!isOpen) return null;

  const plainText = generateAtsPlainText(data);

  const markdownText = `# ${data.personalInfo.fullName}
**${data.personalInfo.targetTitle} | ${data.personalInfo.secondaryTitle}**
${data.personalInfo.location} | Phone: ${data.personalInfo.phone} | Email: ${data.personalInfo.email}
LinkedIn: [${data.personalInfo.linkedin}](https://${data.personalInfo.linkedin})
*${data.personalInfo.visaStatus} | ${data.personalInfo.availability} | ${data.personalInfo.drivingLicense}*

---

## PROFESSIONAL SUMMARY
${data.summary}

---

## CORE TECHNICAL COMPETENCIES
${data.competencies
  .map((cat) => `* **${cat.category}**: ${cat.items.join(', ')}`)
  .join('\n')}

---

## PROFESSIONAL EXPERIENCE
${data.experience
  .map(
    (exp) => `### ${exp.role} — ${exp.company} ${exp.framework ? `(${exp.framework})` : ''}
*${exp.location} | ${exp.periodLabel}*

${exp.bullets.map((b) => `* ${b}`).join('\n')}
`
  )
  .join('\n')}

---

## CERTIFICATIONS
${data.certifications
  .map((c) => `* **${c.title}** (${c.year}) — ${c.accreditation}, ${c.issuer}, ${c.location}`)
  .join('\n')}

---

## EDUCATION
${data.education
  .map((e) => `* **${e.degree}** (${e.year}) — ${e.institution}, ${e.location}`)
  .join('\n')}

---

## LANGUAGES
${data.languages.map((l) => `* **${l.language}**: ${l.proficiency}`).join('\n')}
`;

  const activeContent = format === 'text' ? plainText : markdownText;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              ATS-Optimized Text &amp; Portal Export
            </h3>
            <p className="text-xs text-slate-500">
              Paste directly into job application portals (ADNOC, Bayt, GulfTalent, LinkedIn)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector & Copy Action */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-0.5 bg-slate-200/70 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFormat('text')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                format === 'text' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Plain Text (ATS)
            </button>
            <button
              onClick={() => setFormat('markdown')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                format === 'markdown' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> Markdown (.md)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard' : 'Copy All Text'}
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto p-5 font-mono text-xs text-slate-800 leading-relaxed bg-slate-900 text-slate-100 selection:bg-blue-500">
          <pre className="whitespace-pre-wrap break-words">{activeContent}</pre>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
