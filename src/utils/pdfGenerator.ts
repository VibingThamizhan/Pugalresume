import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '../types/resume';

/**
 * Generates and downloads a high-resolution A4 PDF directly in the browser
 */
export async function downloadResumePdf(
  elementId: string,
  fileName: string = 'Pugazhendhi_Chandraboss_Document_Controller_Resume.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    // A4 dimensions in mm: 210 x 297
    // Render with 2.5x scale for ultra-sharp typography
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Add subsequent pages if content exceeds 1 page
    while (heightLeft > 5) {
      position = position - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to print
    window.print();
    return false;
  }
}

/**
 * Triggers standard browser print dialog which formats via @media print for 100% vector print-to-PDF
 */
export function printResume(): void {
  window.print();
}

/**
 * Exports resume as ATS-Friendly plain text suitable for direct copy-pasting into HR portals
 */
export function generateAtsPlainText(data: ResumeData): string {
  const p = data.personalInfo;
  const lines: string[] = [];

  lines.push(`${p.fullName.toUpperCase()}`);
  lines.push(`${p.targetTitle} | ${p.secondaryTitle}`);
  lines.push(`${p.location} | Phone: ${p.phone} | Email: ${p.email}`);
  lines.push(`LinkedIn: ${p.linkedin} | ${p.visaStatus} | ${p.availability}`);
  lines.push('='.repeat(80));
  lines.push('');

  lines.push('PROFESSIONAL SUMMARY');
  lines.push('-'.repeat(40));
  lines.push(data.summary);
  lines.push('');

  lines.push('CORE TECHNICAL COMPETENCIES');
  lines.push('-'.repeat(40));
  data.competencies.forEach((cat) => {
    lines.push(`• ${cat.category}:`);
    lines.push(`  ${cat.items.join(', ')}`);
  });
  lines.push('');

  lines.push('PROFESSIONAL EXPERIENCE');
  lines.push('-'.repeat(40));
  data.experience.forEach((exp) => {
    lines.push(`${exp.company.toUpperCase()} ${exp.framework ? `(${exp.framework})` : ''} - ${exp.location}`);
    lines.push(`${exp.role} | ${exp.periodLabel}`);
    exp.bullets.forEach((b) => {
      lines.push(`  * ${b}`);
    });
    lines.push('');
  });

  lines.push('PROFESSIONAL CERTIFICATIONS');
  lines.push('-'.repeat(40));
  data.certifications.forEach((c) => {
    lines.push(`• ${c.title} (${c.year})`);
    lines.push(`  ${c.accreditation} | ${c.issuer}, ${c.location}`);
  });
  lines.push('');

  lines.push('EDUCATION');
  lines.push('-'.repeat(40));
  data.education.forEach((edu) => {
    lines.push(`• ${edu.degree} (${edu.year})`);
    lines.push(`  ${edu.institution}, ${edu.location}`);
  });
  lines.push('');

  lines.push('LANGUAGES');
  lines.push('-'.repeat(40));
  data.languages.forEach((l) => {
    lines.push(`• ${l.language}: ${l.proficiency}`);
  });
  lines.push('');

  lines.push('ADDITIONAL DETAILS');
  lines.push('-'.repeat(40));
  data.additionalInfo.forEach((item) => {
    lines.push(`• ${item.label}: ${item.value}`);
  });

  return lines.join('\n');
}
