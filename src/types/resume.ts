export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  framework?: string;
  location: string;
  startDate: string;
  endDate: string;
  periodLabel: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  accreditation: string;
  issuer: string;
  location: string;
  year: string;
}

export interface CompetencyCategory {
  category: string;
  items: string[];
}

export interface MetricHighlight {
  label: string;
  value: string;
  detail: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    targetTitle: string;
    secondaryTitle: string;
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    portfolioUrl?: string;
    visaStatus: string;
    availability: string;
    drivingLicense: string;
    relocation: string;
  };
  summary: string;
  metrics: MetricHighlight[];
  competencies: CompetencyCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  languages: { language: string; proficiency: string }[];
  additionalInfo: { label: string; value: string }[];
}

export type ResumeTheme = 'navy' | 'ats' | 'teal' | 'slate';
export type ResumeFormat = 'full' | 'compact';
export type SpacingDensity = 'compact' | 'normal' | 'spacious';
