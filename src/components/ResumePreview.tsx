import React from 'react';
import { ResumeData, ResumeFormat, SpacingDensity, ColorCustomization } from '../types/resume';
import { Mail, Phone, MapPin, Linkedin, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  colorConfig: ColorCustomization;
  format: ResumeFormat;
  density: SpacingDensity;
  showMetricsBar: boolean;
  zoomLevel?: number;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  colorConfig,
  format,
  density,
  showMetricsBar,
  zoomLevel = 100,
}) => {
  const { personalInfo, summary, metrics, competencies, experience, education, certifications, languages, additionalInfo } = data;
  const { primaryColor, paperColor, headerStyle } = colorConfig;

  // Density classes
  const spacingClasses = {
    compact: {
      sectionGap: 'mb-4',
      itemGap: 'mb-2.5',
      bulletGap: 'space-y-1',
      fontSize: 'text-[12px] leading-[1.35]',
      headingSize: 'text-sm font-bold tracking-tight',
      headerPadding: 'pb-3 mb-3',
      containerPad: 'p-8',
    },
    normal: {
      sectionGap: 'mb-5',
      itemGap: 'mb-3.5',
      bulletGap: 'space-y-1.5',
      fontSize: 'text-[13px] leading-[1.45]',
      headingSize: 'text-[15px] font-bold tracking-tight',
      headerPadding: 'pb-4 mb-4',
      containerPad: 'p-10',
    },
    spacious: {
      sectionGap: 'mb-6',
      itemGap: 'mb-4',
      bulletGap: 'space-y-2',
      fontSize: 'text-[13.5px] leading-[1.55]',
      headingSize: 'text-base font-bold tracking-tight',
      headerPadding: 'pb-5 mb-5',
      containerPad: 'p-12',
    },
  }[density];

  // Filter experiences if compact format is chosen
  const displayedExperience = format === 'compact' ? experience.slice(0, 2) : experience;

  return (
    <div
      className="flex justify-center transition-transform origin-top duration-150"
      style={{ transform: `scale(${zoomLevel / 100})` }}
    >
      <div
        id="resume-document-root"
        className={`resume-paper text-slate-900 shadow-xl print:shadow-none w-full max-w-[830px] min-h-[1140px] mx-auto ${spacingClasses.containerPad} transition-all rounded-xs`}
        style={{
          backgroundColor: paperColor || '#FFFFFF',
          fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* ==================================================================== */}
        {/* 1. HEADER ZONE                                                       */}
        {/* ==================================================================== */}
        {headerStyle === 'solid-banner' ? (
          // Solid Colored Executive Banner Header
          <header
            className="mb-4 -mx-10 -mt-10 p-8 text-white rounded-t-xs"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase text-white">
                  {personalInfo.fullName}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm md:text-[15px] font-semibold text-white/90">
                  <span>{personalInfo.targetTitle}</span>
                  <span className="text-white/40">|</span>
                  <span>{personalInfo.secondaryTitle}</span>
                </div>
              </div>

              {/* Status */}
              <div className="text-left md:text-right text-xs text-white/80 space-y-0.5">
                <div className="font-semibold text-white flex items-center md:justify-end gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 inline shrink-0" />
                  <span>{personalInfo.visaStatus}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 text-white/90">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Availability: <strong>{personalInfo.availability}</strong></span>
                </div>
                <div>{personalInfo.drivingLicense}</div>
              </div>
            </div>

            {/* Contact row */}
            <div className="mt-3 pt-2.5 border-t border-white/20 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-white/70" />
                {personalInfo.location}
              </span>
              <span className="text-white/30">·</span>
              <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1 hover:underline">
                <Phone className="w-3.5 h-3.5 text-white/70" />
                {personalInfo.phone}
              </a>
              <span className="text-white/30">·</span>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline">
                <Mail className="w-3.5 h-3.5 text-white/70" />
                {personalInfo.email}
              </a>
              <span className="text-white/30">·</span>
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                <Linkedin className="w-3.5 h-3.5 text-white/70" />
                {personalInfo.linkedin}
              </a>
            </div>
          </header>
        ) : headerStyle === 'modern-bar' ? (
          // Modern Left Pillar Accent Bar
          <header
            className={`border-l-4 pl-4 ${spacingClasses.headerPadding}`}
            style={{ borderLeftColor: primaryColor }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
                  {personalInfo.fullName}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm md:text-[15px] font-semibold text-slate-700">
                  <span style={{ color: primaryColor }}>{personalInfo.targetTitle}</span>
                  <span className="text-slate-300 font-normal">|</span>
                  <span>{personalInfo.secondaryTitle}</span>
                </div>
              </div>

              <div className="text-left md:text-right text-xs text-slate-600 space-y-0.5">
                <div className="font-semibold text-slate-900 flex items-center md:justify-end gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                  <span>{personalInfo.visaStatus}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 text-slate-700">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Availability: <strong className="text-slate-900 font-medium">{personalInfo.availability}</strong></span>
                </div>
                <div>{personalInfo.drivingLicense}</div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1 text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {personalInfo.location}
              </span>
              <span className="text-slate-300">·</span>
              <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1 text-slate-800 hover:text-blue-600">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {personalInfo.phone}
              </a>
              <span className="text-slate-300">·</span>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 text-slate-800 hover:text-blue-600">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {personalInfo.email}
              </a>
              <span className="text-slate-300">·</span>
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-800 hover:text-blue-600">
                <Linkedin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {personalInfo.linkedin}
              </a>
            </div>
          </header>
        ) : (
          // Classic Bottom Border (Default)
          <header
            className={`border-b-2 ${spacingClasses.headerPadding}`}
            style={{ borderBottomColor: primaryColor }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
                  {personalInfo.fullName}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm md:text-[15px] font-semibold text-slate-700">
                  <span style={{ color: primaryColor }}>{personalInfo.targetTitle}</span>
                  <span className="text-slate-300 font-normal">|</span>
                  <span>{personalInfo.secondaryTitle}</span>
                </div>
              </div>

              <div className="text-left md:text-right text-xs text-slate-600 space-y-0.5">
                <div className="font-semibold text-slate-900 flex items-center md:justify-end gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                  <span>{personalInfo.visaStatus}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 text-slate-700">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Availability: <strong className="text-slate-900 font-medium">{personalInfo.availability}</strong></span>
                </div>
                <div>{personalInfo.drivingLicense}</div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1 text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {personalInfo.location}
              </span>
              <span className="text-slate-300">·</span>
              <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1 text-slate-800 hover:text-blue-600">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {personalInfo.phone}
              </a>
              <span className="text-slate-300">·</span>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 text-slate-800 hover:text-blue-600">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {personalInfo.email}
              </a>
              <span className="text-slate-300">·</span>
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-800 hover:text-blue-600">
                <Linkedin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {personalInfo.linkedin}
              </a>
            </div>
          </header>
        )}

        {/* ==================================================================== */}
        {/* 2. VERIFIED METRICS / IMPACT BANNER (OPTIONAL TOGGLE)               */}
        {/* ==================================================================== */}
        {showMetricsBar && (
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 p-2.5 rounded border"
            style={{
              borderColor: `${primaryColor}25`,
              backgroundColor: `${primaryColor}08`,
            }}
          >
            {metrics.map((m, idx) => (
              <div key={idx} className="text-center px-1 py-0.5">
                <div
                  className="text-base font-bold tabular-nums tracking-tight"
                  style={{ color: primaryColor }}
                >
                  {m.value}
                </div>
                <div className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight truncate">
                  {m.detail}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================================================================== */}
        {/* 3. PROFESSIONAL SUMMARY                                              */}
        {/* ==================================================================== */}
        <section className={`${spacingClasses.sectionGap} avoid-break`}>
          <div
            className="flex items-center justify-between pb-1 mb-2 border-b"
            style={{ borderBottomColor: `${primaryColor}30` }}
          >
            <h2
              className={`${spacingClasses.headingSize} uppercase`}
              style={{ color: primaryColor }}
            >
              Executive Profile &amp; Summary
            </h2>
            <span className="text-[11px] font-medium text-slate-400">ACTVET &amp; CPD Certified</span>
          </div>
          <p className={`${spacingClasses.fontSize} text-slate-700 text-justify text-wrap-balance`}>
            {summary}
          </p>
        </section>

        {/* ==================================================================== */}
        {/* 4. CORE TECHNICAL COMPETENCIES MATRIX                                */}
        {/* ==================================================================== */}
        <section className={`${spacingClasses.sectionGap} avoid-break`}>
          <div
            className="flex items-center justify-between pb-1 mb-2.5 border-b"
            style={{ borderBottomColor: `${primaryColor}30` }}
          >
            <h2
              className={`${spacingClasses.headingSize} uppercase`}
              style={{ color: primaryColor }}
            >
              Technical Competencies &amp; Systems
            </h2>
            <span className="text-[11px] font-medium text-slate-400">EDMS &amp; Compliance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
            {competencies.map((cat, idx) => (
              <div
                key={idx}
                className="border-l-2 pl-2.5"
                style={{ borderLeftColor: `${primaryColor}50` }}
              >
                <h3 className="text-xs font-bold text-slate-900 tracking-wide mb-1">
                  {cat.category}
                </h3>
                <p className="text-[12px] leading-relaxed text-slate-600">
                  {cat.items.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 5. PROFESSIONAL EXPERIENCE                                           */}
        {/* ==================================================================== */}
        <section className={spacingClasses.sectionGap}>
          <div
            className="flex items-center justify-between pb-1 mb-3 border-b"
            style={{ borderBottomColor: `${primaryColor}30` }}
          >
            <h2
              className={`${spacingClasses.headingSize} uppercase`}
              style={{ color: primaryColor }}
            >
              Professional Experience
            </h2>
            <span className="text-[11px] font-medium text-slate-400">10+ Years International</span>
          </div>

          <div className="space-y-4">
            {displayedExperience.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className={`avoid-break ${spacingClasses.itemGap} pb-3.5 ${
                  idx < displayedExperience.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                {/* Role and Period */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[14px] font-bold text-slate-950">
                      {exp.role}
                    </span>
                    <span className="text-slate-400 font-normal">|</span>
                    <span className="text-[13px] font-semibold text-slate-800">
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-[11.5px] font-semibold text-slate-600 tabular-nums shrink-0">
                    {exp.periodLabel}
                  </span>
                </div>

                {/* Subtitle / Framework / Location */}
                <div className="flex flex-wrap items-center gap-x-2 text-[11.5px] text-slate-500 mt-0.5 mb-2">
                  {exp.framework && (
                    <>
                      <span
                        className="font-medium px-1.5 py-0.2 rounded text-[11px]"
                        style={{
                          backgroundColor: `${primaryColor}12`,
                          color: primaryColor,
                        }}
                      >
                        {exp.framework}
                      </span>
                      <span className="text-slate-300">·</span>
                    </>
                  )}
                  <span>{exp.location}</span>
                </div>

                {/* Bullet Points */}
                <ul className={`${spacingClasses.bulletGap} pl-4 list-disc text-slate-700 ${spacingClasses.fontSize}`}>
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="pl-1 marker:text-slate-400 leading-normal">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 6. PROFESSIONAL CERTIFICATIONS                                       */}
        {/* ==================================================================== */}
        <section className={`${spacingClasses.sectionGap} avoid-break`}>
          <div
            className="flex items-center justify-between pb-1 mb-2.5 border-b"
            style={{ borderBottomColor: `${primaryColor}30` }}
          >
            <h2
              className={`${spacingClasses.headingSize} uppercase`}
              style={{ color: primaryColor }}
            >
              Professional Certifications &amp; Accreditations
            </h2>
            <span className="text-[11px] font-medium text-slate-400">ACTVET &amp; CPD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-2.5 rounded border"
                style={{
                  backgroundColor: `${primaryColor}06`,
                  borderColor: `${primaryColor}20`,
                }}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-xs font-bold text-slate-950 leading-tight">
                    {cert.title}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 tabular-nums shrink-0">
                    {cert.year}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-slate-700 mt-1">
                  {cert.accreditation}
                </div>
                <div className="text-[10.5px] text-slate-500 mt-0.5">
                  {cert.issuer} · {cert.location}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 7. EDUCATION & LANGUAGES & MOBILITY                                 */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1 avoid-break">
          {/* Education */}
          <section>
            <div
              className="flex items-center justify-between pb-1 mb-2 border-b"
              style={{ borderBottomColor: `${primaryColor}30` }}
            >
              <h2
                className={`${spacingClasses.headingSize} uppercase`}
                style={{ color: primaryColor }}
              >
                Education
              </h2>
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <strong className="text-slate-900 font-bold">{edu.degree}</strong>
                  <span className="text-slate-500 tabular-nums">{edu.year}</span>
                </div>
                <div className="text-slate-600 text-[11.5px]">{edu.institution} · {edu.location}</div>
              </div>
            ))}

            {/* Languages */}
            <div className="mt-3 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Languages
              </span>
              <div className="flex flex-wrap gap-x-3 text-xs text-slate-700">
                {languages.map((l, i) => (
                  <span key={i} className="inline-flex items-center gap-1">
                    <strong className="text-slate-900 font-medium">{l.language}</strong>
                    <span className="text-slate-400">({l.proficiency.split(' ')[0]})</span>
                    {i < languages.length - 1 && <span className="text-slate-300 ml-2">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Operational Readiness / UAE Credentials */}
          <section>
            <div
              className="flex items-center justify-between pb-1 mb-2 border-b"
              style={{ borderBottomColor: `${primaryColor}30` }}
            >
              <h2
                className={`${spacingClasses.headingSize} uppercase`}
                style={{ color: primaryColor }}
              >
                UAE Employment Readiness
              </h2>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {additionalInfo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 font-semibold">{item.label}:</strong>{' '}
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer Audit Verification Note */}
        <footer className="mt-6 pt-3 border-t border-slate-200 text-[10px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-1 avoid-break">
          <span>Pugazhendhi Chandraboss — Document Controller Dossier</span>
          <span>Certified Under ACTVET &amp; CPD · ISO 9001 Alignment · Ref: PSA-EDMS-2026</span>
        </footer>
      </div>
    </div>
  );
};
