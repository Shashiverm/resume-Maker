import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Resume, TemplateType } from '../types/resume';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ResumePreviewProps {
  data: Resume;
  template: TemplateType;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [estimatedPages, setEstimatedPages] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [autoScale, setAutoScale] = useState<number>(1);
  const [isAutoFit, setIsAutoFit] = useState<boolean>(true);

  const style = useMemo(() => data.style || {
    primaryColor: '#2563eb',
    fontFamily: 'Inter',
    fontSize: 'base',
    lineHeight: 'normal',
    spacingDensity: 'normal',
    paperSize: 'A4',
    backgroundColor: '#ffffff'
  }, [data.style]);

  const paperSize = style.paperSize;

  // Calculate Responsive Mobile Auto-Fit Scaling
  useEffect(() => {
    const calculateScale = () => {
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.clientWidth;
        const targetPaperWidth = paperSize === 'LETTER' ? 816 : 794;
        if (wrapperWidth < targetPaperWidth) {
          const calculated = Math.min(1, Math.max(0.35, (wrapperWidth - 12) / targetPaperWidth));
          setAutoScale(calculated);
        } else {
          setAutoScale(1);
        }
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [paperSize]);

  // Compute page height estimate
  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      const targetPageHeight = style.paperSize === 'LETTER' ? 1020 : 1100;
      const pages = Math.ceil(height / targetPageHeight);
      setEstimatedPages(Math.max(1, pages));
    }
  }, [data, template, style]);

  const getFontFamilyStyle = (font: string) => {
    switch (font) {
      case 'Roboto': return "'Roboto', sans-serif";
      case 'Outfit': return "'Outfit', sans-serif";
      case 'Poppins': return "'Poppins', sans-serif";
      case 'Plus Jakarta Sans': return "'Plus Jakarta Sans', sans-serif";
      case 'Merriweather': return "'Merriweather', Georgia, serif";
      case 'Playfair Display': return "'Playfair Display', Georgia, serif";
      case 'Lora': return "'Lora', Georgia, serif";
      case 'JetBrains Mono': return "'JetBrains Mono', monospace";
      case 'Fira Code': return "'Fira Code', monospace";
      case 'Inter': return "'Inter', sans-serif";
      default: return 'system-ui, -apple-system, sans-serif';
    }
  };

  const getFontSizeClass = (size: string) => {
    switch (size) {
      case 'sm': return 'text-[11.5px] leading-snug';
      case 'lg': return 'text-base leading-relaxed';
      default: return 'text-xs sm:text-sm leading-normal';
    }
  };

  const getSpacingClass = (density: string) => {
    switch (density) {
      case 'compact': return 'space-y-2';
      case 'loose': return 'space-y-6';
      default: return 'space-y-4';
    }
  };

  const getPaddingClass = (density: string) => {
    switch (density) {
      case 'compact': return 'p-4 sm:p-6 md:p-7';
      case 'loose': return 'p-8 sm:p-12 md:p-14';
      default: return 'p-6 sm:p-10 md:p-12';
    }
  };

  const effectiveScale = isAutoFit && autoScale < 1 ? autoScale : zoomLevel / 100;

  const baseContainerStyle = {
    fontFamily: getFontFamilyStyle(style.fontFamily),
    color: '#1e293b',
    backgroundColor: style.backgroundColor || '#ffffff',
    transform: `scale(${effectiveScale})`,
    transformOrigin: 'top center',
    transition: 'transform 0.15s ease-out'
  } as React.CSSProperties;

  // Helper to parse bullet points string into array
  const renderBullets = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    return (
      <ul className="list-disc list-outside ml-4 space-y-1 mt-1 text-gray-700">
        {lines.map((line, idx) => {
          const cleanLine = line.replace(/^[\s\-*•]+/, '');
          return <li key={idx} className="pl-0.5">{cleanLine}</li>;
        })}
      </ul>
    );
  };

  const paperWidthClass = style.paperSize === 'LETTER' ? 'max-w-[8.5in] min-h-[11in]' : 'max-w-[21cm] min-h-[29.7cm]';

  const templates: Record<TemplateType, JSX.Element> = {
    
    // 1. STANDARD ATS (100% Pure ATS Machine Readable)
    'standard-ats': (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white ${getPaddingClass(style.spacingDensity)} shadow-2xl rounded-sm ${paperWidthClass} mx-auto ${getSpacingClass(style.spacingDensity)} print:shadow-none print:p-0 print:max-w-none ${getFontSizeClass(style.fontSize)}`}
        style={baseContainerStyle}
      >
        {/* Header */}
        <header className="text-center border-b border-gray-900 pb-3 space-y-1 page-break-avoid">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900">
            {data.personalInfo.firstName || 'YOUR'} {data.personalInfo.lastName || 'NAME'}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-gray-800 uppercase tracking-wider">
            {data.personalInfo.title || 'Professional Title'}
          </p>
          <div className="text-xs text-gray-700 flex flex-wrap justify-center gap-x-2 gap-y-1">
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
            {data.personalInfo.email && <span>| {data.personalInfo.email}</span>}
            {data.personalInfo.linkedin && <span>| {data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span>| {data.personalInfo.website}</span>}
            {data.personalInfo.github && <span>| github.com/{data.personalInfo.github}</span>}
          </div>
        </header>

        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-0.5">
              Professional Summary
            </h2>
            <p className="text-gray-800 leading-relaxed text-xs sm:text-sm">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-0.5">
              Professional Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-0.5 page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-gray-900">
                  <span>{exp.position || 'Position Title'} &mdash; <span className="font-semibold text-gray-800">{exp.company || 'Company'}</span></span>
                  <span className="text-xs font-medium text-gray-600">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <p className="text-xs italic text-gray-600">{exp.location}</p>}
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-0.5">
              Key Projects
            </h2>
            {data.projects.map((proj, index) => (
              <div key={proj.id || index} className="space-y-0.5 page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-gray-900">
                  <span>{proj.title} {proj.role && <span className="font-normal italic">({proj.role})</span>}</span>
                  {proj.technologies && <span className="text-xs font-normal text-gray-600">{proj.technologies}</span>}
                </div>
                <p className="text-gray-800 text-xs sm:text-sm">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-0.5">
              Skills & Expertise
            </h2>
            <p className="text-gray-800 text-xs sm:text-sm">
              {data.skills.map((s) => s.name).filter(Boolean).join(' • ')}
            </p>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-0.5">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-xs sm:text-sm page-break-avoid">
                <div>
                  <span className="font-bold text-gray-900">{edu.school}</span> &mdash; <span className="text-gray-800">{edu.degree} in {edu.fieldOfStudy}</span>
                  {edu.gpa && <span className="text-xs ml-2 text-gray-600">(GPA: {edu.gpa})</span>}
                </div>
                <span className="text-xs text-gray-700">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {data.certificates && data.certificates.length > 0 && (
          <section className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-0.5">
              Certifications
            </h2>
            {data.certificates.map((cert, index) => (
              <div key={cert.id || index} className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-gray-800 page-break-avoid">
                <span><strong>{cert.title}</strong> – {cert.issuer}</span>
                <span className="text-xs text-gray-700">{cert.date}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    ),

    // 2. MODERN TECH TEMPLATE
    modern: (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white p-6 sm:p-10 md:p-12 shadow-2xl rounded-sm ${paperWidthClass} mx-auto ${getSpacingClass(style.spacingDensity)} print:shadow-none print:p-0 print:max-w-none ${getFontSizeClass(style.fontSize)}`}
        style={baseContainerStyle}
      >
        {/* Header */}
        <header className="border-b-2 pb-5 space-y-2 page-break-avoid" style={{ borderColor: style.primaryColor }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {data.personalInfo.firstName || 'First'} <span style={{ color: style.primaryColor }}>{data.personalInfo.lastName || 'Last'}</span>
              </h1>
              <p className="text-sm sm:text-lg font-medium text-slate-700 mt-0.5">{data.personalInfo.title || 'Professional Title'}</p>
            </div>

            <div className="text-xs text-slate-600 space-y-0.5">
              {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs pt-1 border-t border-slate-100 font-medium">
            {data.personalInfo.linkedin && (
              <span className="text-slate-600">LinkedIn: <span className="text-slate-900 font-semibold">{data.personalInfo.linkedin}</span></span>
            )}
            {data.personalInfo.github && (
              <span className="text-slate-600">GitHub: <span className="text-slate-900 font-semibold">{data.personalInfo.github}</span></span>
            )}
            {data.personalInfo.website && (
              <span className="text-slate-600">Portfolio: <span className="text-slate-900 font-semibold">{data.personalInfo.website}</span></span>
            )}
          </div>
        </header>

        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1" style={{ color: style.primaryColor }}>
              About
            </h2>
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1" style={{ color: style.primaryColor }}>
              Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-1 page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{exp.position}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700 w-max mt-0.5 sm:mt-0">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  {exp.company} {exp.location && `• ${exp.location}`}
                </div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1" style={{ color: style.primaryColor }}>
              Projects
            </h2>
            {data.projects.map((proj, index) => (
              <div key={proj.id || index} className="space-y-1 page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-slate-900 text-xs sm:text-sm">
                  <span>{proj.title}</span>
                  {proj.technologies && <span className="text-xs font-medium text-slate-500">{proj.technologies}</span>}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="space-y-2 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1" style={{ color: style.primaryColor }}>
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, index) => (
                <span 
                  key={skill.id || index}
                  className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-medium border border-slate-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certificates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.education.length > 0 && (
            <section className="space-y-2 page-break-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1" style={{ color: style.primaryColor }}>
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div key={edu.id || index} className="text-xs sm:text-sm">
                  <div className="font-bold text-slate-900">{edu.school}</div>
                  <div className="text-slate-700">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-[11px] text-slate-500">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </section>
          )}

          {data.certificates && data.certificates.length > 0 && (
            <section className="space-y-2 page-break-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1" style={{ color: style.primaryColor }}>
                Certifications
              </h2>
              {data.certificates.map((cert, index) => (
                <div key={cert.id || index} className="text-xs sm:text-sm">
                  <div className="font-bold text-slate-900">{cert.title}</div>
                  <div className="text-slate-700">{cert.issuer} ({cert.date})</div>
                </div>
              ))}
            </section>
          )}
        </div>

      </div>
    ),

    // 3. EXECUTIVE CORPORATE TEMPLATE
    executive: (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white p-6 sm:p-10 md:p-12 shadow-2xl rounded-sm ${paperWidthClass} mx-auto ${getSpacingClass(style.spacingDensity)} print:shadow-none print:p-0 print:max-w-none ${getFontSizeClass(style.fontSize)}`}
        style={{ ...baseContainerStyle, fontFamily: "'Merriweather', Georgia, serif" }}
      >
        {/* Header */}
        <header className="text-center border-b-2 border-slate-800 pb-4 space-y-2 page-break-avoid">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 uppercase">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-xs sm:text-base font-semibold text-slate-700 tracking-wider uppercase">{data.personalInfo.title}</p>
          <div className="text-xs text-slate-600 flex flex-wrap justify-center gap-2 sm:gap-3">
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
            {data.personalInfo.email && <span>• {data.personalInfo.email}</span>}
            {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
          </div>
        </header>

        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Executive Profile
            </h2>
            <p className="text-slate-800 leading-relaxed italic text-xs sm:text-sm">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Leadership Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-1 page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-slate-900">
                  <span className="text-sm sm:text-base">{exp.position}</span>
                  <span className="text-xs text-slate-600 font-normal">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-bold text-slate-700 italic">
                  {exp.company} {exp.location && `| ${exp.location}`}
                </div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Core Competencies
            </h2>
            <p className="text-slate-800 leading-relaxed font-semibold text-xs sm:text-sm">
              {data.skills.map((s) => s.name).filter(Boolean).join('  |  ')}
            </p>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Education & Academic Credentials
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-xs sm:text-sm text-slate-800 page-break-avoid">
                <div>
                  <span className="font-bold">{edu.school}</span> &mdash; <span>{edu.degree} in {edu.fieldOfStudy}</span>
                </div>
                <span className="text-xs">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </section>
        )}

      </div>
    ),

    // 4. MINIMALIST TEMPLATE
    minimal: (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white p-6 sm:p-10 md:p-12 shadow-2xl rounded-sm ${paperWidthClass} mx-auto ${getSpacingClass(style.spacingDensity)} print:shadow-none print:p-0 print:max-w-none ${getFontSizeClass(style.fontSize)}`}
        style={baseContainerStyle}
      >
        {/* Header */}
        <header className="space-y-1 border-b border-gray-200 pb-4 page-break-avoid">
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-gray-900">
            {data.personalInfo.firstName} <span className="font-bold">{data.personalInfo.lastName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">{data.personalInfo.title}</p>
          <div className="text-xs text-gray-500 flex flex-wrap gap-2 sm:gap-3 pt-1">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          </div>
        </header>

        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="space-y-1 page-break-avoid">
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-1 page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <span className="font-semibold text-gray-900 text-xs sm:text-sm">{exp.position}</span>
                  <span className="text-xs text-gray-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs text-gray-600">{exp.company} • {exp.location}</div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="space-y-2 page-break-avoid">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={skill.id || index} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Education</h2>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-xs sm:text-sm page-break-avoid">
                <div>
                  <span className="font-semibold text-gray-900">{edu.school}</span> &mdash; <span className="text-gray-700">{edu.degree}</span>
                </div>
                <span className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    ),

    // 5. CREATIVE CLEAN (Single Column Compliant)
    creative: (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white p-6 sm:p-10 md:p-12 shadow-2xl rounded-sm ${paperWidthClass} mx-auto ${getSpacingClass(style.spacingDensity)} print:shadow-none print:p-0 print:max-w-none ${getFontSizeClass(style.fontSize)}`}
        style={baseContainerStyle}
      >
        {/* Header Banner */}
        <header className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl space-y-2 page-break-avoid">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">{data.personalInfo.title}</p>
          <div className="text-xs text-slate-300 flex flex-wrap gap-2 sm:gap-3 pt-2 border-t border-slate-800">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
            {data.personalInfo.github && <span>github.com/{data.personalInfo.github}</span>}
          </div>
        </header>

        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-blue-600 pb-1">
              Profile Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-blue-600 pb-1">
              Work Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-1 page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-slate-900">
                  <span className="text-sm sm:text-base">{exp.position}</span>
                  <span className="text-xs text-blue-600 font-semibold">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs font-medium text-slate-600">{exp.company} • {exp.location}</div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="space-y-2 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-blue-600 pb-1">
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, index) => (
                <span key={skill.id || index} className="px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-full text-xs font-semibold">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-blue-600 pb-1">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-xs sm:text-sm text-slate-800 page-break-avoid">
                <div>
                  <span className="font-bold">{edu.school}</span> &mdash; <span>{edu.degree} in {edu.fieldOfStudy}</span>
                </div>
                <span className="text-xs text-slate-600">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    ),

    // 6. COMPACT 1-PAGE DENSE TEMPLATE
    compact: (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white p-5 sm:p-8 md:p-10 shadow-2xl rounded-sm ${paperWidthClass} mx-auto space-y-3 print:shadow-none print:p-0 print:max-w-none text-xs`}
        style={baseContainerStyle}
      >
        <header className="border-b-2 border-slate-900 pb-2 flex flex-col sm:flex-row sm:justify-between sm:items-end page-break-avoid">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            <p className="text-xs font-bold text-slate-700">{data.personalInfo.title}</p>
          </div>
          <div className="text-[11px] text-slate-600 sm:text-right">
            <div>{data.personalInfo.email} | {data.personalInfo.phone}</div>
            <div>{data.personalInfo.location} | {data.personalInfo.linkedin}</div>
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="space-y-0.5 page-break-avoid">
            <p className="text-slate-700 leading-tight text-[11px]">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
              Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-0.5 page-break-avoid">
                <div className="flex justify-between font-bold text-slate-900 text-xs">
                  <span>{exp.position} — {exp.company}</span>
                  <span className="text-[10px] text-slate-600 font-normal">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="space-y-0.5 page-break-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
              Skills
            </h2>
            <p className="text-slate-800 text-[11px] font-medium">
              {data.skills.map((s) => s.name).join(' • ')}
            </p>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="space-y-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex justify-between text-[11px] page-break-avoid">
                <span><strong>{edu.school}</strong> – {edu.degree} in {edu.fieldOfStudy}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    ),

    // 7. ACADEMIC & LEGAL TEMPLATE
    academic: (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white p-6 sm:p-10 md:p-12 shadow-2xl rounded-sm ${paperWidthClass} mx-auto ${getSpacingClass(style.spacingDensity)} print:shadow-none print:p-0 print:max-w-none ${getFontSizeClass(style.fontSize)}`}
        style={{ ...baseContainerStyle, fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        <header className="text-center border-b-2 border-slate-900 pb-4 space-y-1 page-break-avoid">
          <h1 className="text-3xl font-normal text-slate-900 tracking-wide">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-sm italic text-slate-700">{data.personalInfo.title}</p>
          <div className="text-xs text-slate-600 space-x-2">
            <span>{data.personalInfo.location}</span>
            <span>•</span>
            <span>{data.personalInfo.email}</span>
            <span>•</span>
            <span>{data.personalInfo.phone}</span>
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Biography & Summary
            </h2>
            <p className="text-slate-800 leading-relaxed text-xs sm:text-sm">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Education & Degrees
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="space-y-0.5 page-break-avoid">
                <div className="flex justify-between font-bold text-slate-900 text-xs sm:text-sm">
                  <span>{edu.school}</span>
                  <span className="font-normal text-xs">{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="text-xs italic text-slate-700">{edu.degree} in {edu.fieldOfStudy}</div>
              </div>
            ))}
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Appointments & Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-1 page-break-avoid">
                <div className="flex justify-between font-bold text-slate-900 text-xs sm:text-sm">
                  <span>{exp.position}</span>
                  <span className="font-normal text-xs">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-xs italic text-slate-700">{exp.company} • {exp.location}</div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}
      </div>
    ),

    // 8. TECH & SOFTWARE ENGINEERING TEMPLATE
    'tech-code': (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white p-6 sm:p-10 md:p-12 shadow-2xl rounded-sm ${paperWidthClass} mx-auto ${getSpacingClass(style.spacingDensity)} print:shadow-none print:p-0 print:max-w-none ${getFontSizeClass(style.fontSize)}`}
        style={baseContainerStyle}
      >
        <header className="border-b-2 border-slate-900 pb-4 space-y-2 page-break-avoid">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <div className="text-xs font-mono font-bold text-blue-600 mb-0.5">&lt;SoftwareEngineer /&gt;</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {data.personalInfo.firstName} {data.personalInfo.lastName}
              </h1>
              <p className="text-sm font-semibold text-slate-700">{data.personalInfo.title}</p>
            </div>
            <div className="text-xs text-slate-600 font-mono space-y-0.5 mt-2 sm:mt-0 text-left sm:text-right">
              {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
              {data.personalInfo.github && <div>github.com/{data.personalInfo.github}</div>}
            </div>
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 border-b border-slate-200 pb-1">
              // Summary
            </h2>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="space-y-1.5 page-break-avoid">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 border-b border-slate-200 pb-1">
              // Technical Stack & Tools
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s, idx) => (
                <span key={s.id || idx} className="bg-slate-100 border border-slate-300 font-mono text-[11px] px-2 py-0.5 rounded text-slate-800 font-medium">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 border-b border-slate-200 pb-1">
              // Engineering Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-1 page-break-avoid">
                <div className="flex justify-between font-bold text-slate-900 text-xs sm:text-sm">
                  <span>{exp.position} &mdash; <span className="font-semibold text-slate-700">{exp.company}</span></span>
                  <span className="text-xs font-mono text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 border-b border-slate-200 pb-1">
              // Open Source & Key Projects
            </h2>
            {data.projects.map((proj, index) => (
              <div key={proj.id || index} className="space-y-0.5 page-break-avoid">
                <div className="flex justify-between font-bold text-slate-900 text-xs sm:text-sm">
                  <span>{proj.title} {proj.role && <span className="font-mono text-xs text-blue-600 font-normal">({proj.role})</span>}</span>
                  {proj.technologies && <span className="font-mono text-[11px] text-slate-500">{proj.technologies}</span>}
                </div>
                <p className="text-slate-700 text-xs">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 border-b border-slate-200 pb-1">
              // Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex justify-between text-xs text-slate-800">
                <span><strong>{edu.school}</strong> – {edu.degree} in {edu.fieldOfStudy}</span>
                <span className="font-mono text-slate-500">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    ),

    // 9. DATA ANALYTICS & SCIENCE TEMPLATE
    'data-analyst': (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white p-6 sm:p-10 md:p-12 shadow-2xl rounded-sm ${paperWidthClass} mx-auto ${getSpacingClass(style.spacingDensity)} print:shadow-none print:p-0 print:max-w-none ${getFontSizeClass(style.fontSize)}`}
        style={baseContainerStyle}
      >
        <header className="border-b-2 border-purple-700 pb-4 space-y-1 page-break-avoid">
          <div className="flex flex-col sm:flex-row justify-between items-baseline">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {data.personalInfo.firstName} <span className="text-purple-700">{data.personalInfo.lastName}</span>
              </h1>
              <p className="text-sm font-semibold text-slate-700">{data.personalInfo.title}</p>
            </div>
            <div className="text-xs text-slate-600 font-medium space-x-2 mt-1 sm:mt-0">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
              {data.personalInfo.github && <span>• {data.personalInfo.github}</span>}
            </div>
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 border-b border-slate-200 pb-1">
              Data & Analytical Focus
            </h2>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="space-y-1.5 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 border-b border-slate-200 pb-1">
              Data Stack & Analytics Competencies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs text-slate-800 font-medium">
              {data.skills.map((s, idx) => (
                <div key={s.id || idx} className="bg-purple-50 border border-purple-200 px-2.5 py-1 rounded text-purple-950 flex items-center justify-between">
                  <span>{s.name}</span>
                  <span className="text-[10px] text-purple-600 font-bold">{s.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 border-b border-slate-200 pb-1">
              Professional Experience & Metrics
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-1 page-break-avoid">
                <div className="flex justify-between font-bold text-slate-900 text-xs sm:text-sm">
                  <span>{exp.position} — <span className="text-slate-700">{exp.company}</span></span>
                  <span className="text-xs text-purple-700 font-semibold">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 border-b border-slate-200 pb-1">
              Education & Quantitative Background
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex justify-between text-xs text-slate-800">
                <span><strong>{edu.school}</strong> – {edu.degree} in {edu.fieldOfStudy}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    ),

    // 10. SALES & REVENUE LEADERSHIP TEMPLATE
    'sales-growth': (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white p-6 sm:p-10 md:p-12 shadow-2xl rounded-sm ${paperWidthClass} mx-auto ${getSpacingClass(style.spacingDensity)} print:shadow-none print:p-0 print:max-w-none ${getFontSizeClass(style.fontSize)}`}
        style={baseContainerStyle}
      >
        <header className="border-b-4 border-red-600 pb-4 space-y-1 page-break-avoid">
          <div className="flex flex-col sm:flex-row justify-between items-baseline">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-slate-900">
                {data.personalInfo.firstName} <span className="text-red-600">{data.personalInfo.lastName}</span>
              </h1>
              <p className="text-sm font-bold tracking-wider text-slate-700 uppercase">{data.personalInfo.title}</p>
            </div>
            <div className="text-xs text-slate-600 font-semibold space-y-0.5 text-left sm:text-right">
              {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
            </div>
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-red-700 border-b border-slate-200 pb-1">
              Executive Profile & Achievements
            </h2>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-red-700 border-b border-slate-200 pb-1">
              Sales Leadership & Revenue Track Record
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-1 page-break-avoid">
                <div className="flex justify-between font-extrabold text-slate-900 text-xs sm:text-sm">
                  <span>{exp.position} | <span className="text-red-700">{exp.company}</span></span>
                  <span className="text-xs font-bold text-slate-600">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-red-700 border-b border-slate-200 pb-1">
              Core Methodologies & Sales Skills
            </h2>
            <p className="text-slate-800 text-xs sm:text-sm font-medium">
              {data.skills.map((s) => s.name).join(' • ')}
            </p>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-red-700 border-b border-slate-200 pb-1">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex justify-between text-xs text-slate-800 font-medium">
                <span><strong>{edu.school}</strong> &mdash; {edu.degree} in {edu.fieldOfStudy}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    ),

    // 11. DIGITAL MARKETING & GROWTH TEMPLATE
    'marketing-pro': (
      <div 
        ref={containerRef}
        id="resume-printable"
        className={`bg-white p-6 sm:p-10 md:p-12 shadow-2xl rounded-sm ${paperWidthClass} mx-auto ${getSpacingClass(style.spacingDensity)} print:shadow-none print:p-0 print:max-w-none ${getFontSizeClass(style.fontSize)}`}
        style={baseContainerStyle}
      >
        <header className="bg-emerald-800 text-white p-6 rounded-t-sm -mx-6 sm:-mx-10 md:-mx-12 -mt-6 sm:-mt-10 md:-mt-12 mb-6 page-break-avoid">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-emerald-200 font-semibold text-sm mt-0.5">{data.personalInfo.title}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-emerald-100 mt-3 pt-2 border-t border-emerald-700">
            {data.personalInfo.email && <span>✉ {data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>📞 {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
            {data.personalInfo.website && <span>🌐 {data.personalInfo.website}</span>}
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-1">
              Growth & Campaign Strategy
            </h2>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-1">
              Marketing Leadership & Campaign Outcomes
            </h2>
            {data.experience.map((exp, index) => (
              <div key={exp.id || index} className="space-y-1 page-break-avoid">
                <div className="flex justify-between font-bold text-slate-900 text-xs sm:text-sm">
                  <span>{exp.position} — <span className="text-emerald-800">{exp.company}</span></span>
                  <span className="text-xs text-slate-600">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="space-y-1.5 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-1">
              Marketing Channels & Analytics
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s, idx) => (
                <span key={s.id || idx} className="bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-[11px] px-2.5 py-0.5 rounded-full">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="space-y-1 page-break-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-1">
              Education & Certifications
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex justify-between text-xs text-slate-800">
                <span><strong>{edu.school}</strong> – {edu.degree} in {edu.fieldOfStudy}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    )
  };

  return (
    <div ref={wrapperRef} className="w-full relative overflow-x-auto pb-6">
      
      {/* Live Zoom & Page Fit Control Bar */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl mb-3 text-xs text-slate-700 shadow-xs print:hidden gap-2">
        <div className="flex flex-wrap items-center gap-2 font-semibold">
          <span className="flex items-center gap-1 text-slate-900 font-bold">
            📄 {style.paperSize || 'A4'}
          </span>

          {/* Auto-Fit Toggle on small screens */}
          {autoScale < 1 && (
            <button
              onClick={() => setIsAutoFit(!isAutoFit)}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition border ${
                isAutoFit ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {isAutoFit ? '📱 Mobile Fit ON' : '🔍 Fit Off'}
            </button>
          )}

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => {
                setIsAutoFit(false);
                setZoomLevel((prev) => Math.max(50, prev - 10));
              }}
              className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-white transition"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono w-12 text-center font-bold">
              {Math.round(effectiveScale * 100)}%
            </span>
            <button
              onClick={() => {
                setIsAutoFit(false);
                setZoomLevel((prev) => Math.min(140, prev + 10));
              }}
              className="p-1 text-slate-600 hover:text-slate-900 rounded hover:bg-white transition"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`font-bold px-2.5 py-1 rounded-full text-[11px] shadow-2xs ${
            estimatedPages === 1 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {estimatedPages === 1 ? '✓ 1-Page Fit' : `📄 ${estimatedPages} Pages`}
          </span>
        </div>
      </div>

      {/* Paper Render Container */}
      <div className="overflow-x-auto p-0.5 flex justify-center">
        {templates[template] || templates['standard-ats']}
      </div>

    </div>
  );
}