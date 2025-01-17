import React from 'react';
import { Resume, TemplateType } from '../types/resume';

interface ResumePreviewProps {
  data: Resume;
  template: TemplateType;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const style = data.style || {
    primaryColor: '#2563eb',
    fontFamily: 'system-ui',
    fontSize: 'base',
    backgroundColor: 'white'
  };

  const baseStyles = {
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    '--primary-color': style.primaryColor,
    backgroundColor: style.backgroundColor,
  } as React.CSSProperties;

  const templates = {
    modern: (
      <div className="resume-preview bg-white p-8 shadow-lg max-w-[21cm] mx-auto" style={baseStyles}>
        <header className="border-b-2 pb-4 mb-6" style={{ borderColor: style.primaryColor }}>
          <h1 className="text-3xl font-bold mb-2" style={{ color: style.primaryColor }}>
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-xl mb-2">{data.personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>{data.personalInfo.email}</span>
            <span>{data.personalInfo.phone}</span>
            <span>{data.personalInfo.location}</span>
            {data.personalInfo.website && (
              <a href={data.personalInfo.website} className="text-blue-600">
                Portfolio
              </a>
            )}
            {data.personalInfo.github && (
              <a href={`https://github.com/${data.personalInfo.github}`} className="text-blue-600">
                GitHub
              </a>
            )}
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="mb-6">
            <p className="text-gray-700">{data.personalInfo.summary}</p>
          </section>
        )}

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: style.primaryColor }}>
            Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-lg">{exp.position}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-gray-700">{exp.company}</p>
              <p className="text-gray-600 text-sm">{exp.location}</p>
              <p className="mt-2 text-sm whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: style.primaryColor }}>
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-lg">{edu.school}</h3>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-gray-700">
                {edu.degree} in {edu.fieldOfStudy}
              </p>
              <p className="mt-1 text-sm">{edu.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: style.primaryColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded text-sm"
                style={{ backgroundColor: `${style.primaryColor}20` }}
              >
                {skill.name} • {skill.level}
              </span>
            ))}
          </div>
        </section>

        {data.certificates && data.certificates.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: style.primaryColor }}>
              Certificates
            </h2>
            {data.certificates.map((cert, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{cert.title}</h3>
                  <span className="text-sm text-gray-600">{cert.date}</span>
                </div>
                <p className="text-gray-700">{cert.issuer}</p>
                {cert.link && (
                  <a
                    href={cert.link}
                    className="text-sm mt-1 inline-block"
                    style={{ color: style.primaryColor }}
                  >
                    View Certificate
                  </a>
                )}
                <p className="text-sm mt-1">{cert.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    ),
    classic: (
      <div className="resume-preview bg-white p-8 shadow-lg max-w-[21cm] mx-auto" style={baseStyles}>
        <header className="text-center mb-8">
          <h1 className="text-4xl font-serif mb-2">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-xl text-gray-600 mb-2">{data.personalInfo.title}</p>
          <div className="text-gray-600">
            <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
            <p>{data.personalInfo.location}</p>
            {(data.personalInfo.website || data.personalInfo.github) && (
              <p className="mt-1">
                {data.personalInfo.website && (
                  <a href={data.personalInfo.website} className="text-blue-600 mx-2">
                    Portfolio
                  </a>
                )}
                {data.personalInfo.github && (
                  <a href={`https://github.com/${data.personalInfo.github}`} className="text-blue-600 mx-2">
                    GitHub
                  </a>
                )}
              </p>
            )}
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-serif border-b-2 border-gray-300 mb-4">Summary</h2>
            <p>{data.personalInfo.summary}</p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-serif border-b-2 border-gray-300 mb-4">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold">{exp.company}</h3>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="italic mb-2">{exp.position}</p>
              <p className="text-gray-600 mb-2">{exp.location}</p>
              <p className="whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-serif border-b-2 border-gray-300 mb-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold">{edu.school}</h3>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="italic">{edu.degree} in {edu.fieldOfStudy}</p>
              <p className="mt-2">{edu.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-serif border-b-2 border-gray-300 mb-4">Skills</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {data.skills.map((skill, index) => (
              <div key={index}>
                <span className="font-semibold">{skill.name}</span>
                <span className="text-gray-600"> - {skill.level}</span>
              </div>
            ))}
          </div>
        </section>

        {data.certificates && data.certificates.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif border-b-2 border-gray-300 mb-4">Certificates</h2>
            {data.certificates.map((cert, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">{cert.title}</h3>
                  <span>{cert.date}</span>
                </div>
                <p className="italic">{cert.issuer}</p>
                {cert.link && (
                  <a href={cert.link} className="text-blue-600 text-sm">
                    View Certificate
                  </a>
                )}
                <p className="mt-1">{cert.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    ),
    minimal: (
      <div className="resume-preview bg-white p-8 shadow-lg max-w-[21cm] mx-auto" style={baseStyles}>
        <header className="mb-8">
          <h1 className="text-4xl font-light mb-2">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-gray-600">{data.personalInfo.title}</p>
          <div className="text-sm text-gray-500 mt-2 flex flex-wrap gap-2">
            <span>{data.personalInfo.email}</span>
            <span>•</span>
            <span>{data.personalInfo.phone}</span>
            <span>•</span>
            <span>{data.personalInfo.location}</span>
            {data.personalInfo.website && (
              <>
                <span>•</span>
                <a href={data.personalInfo.website} className="text-blue-600">
                  Portfolio
                </a>
              </>
            )}
            {data.personalInfo.github && (
              <>
                <span>•</span>
                <a href={`https://github.com/${data.personalInfo.github}`} className="text-blue-600">
                  GitHub
                </a>
              </>
            )}
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="mb-8">
            <p className="text-gray-700">{data.personalInfo.summary}</p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-medium">{exp.position}</h3>
              <p className="text-sm text-gray-600">
                {exp.company} • {exp.location} • {exp.startDate} - {exp.endDate}
              </p>
              <p className="mt-2 text-sm whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{edu.school}</h3>
              <p className="text-sm text-gray-600">
                {edu.degree} in {edu.fieldOfStudy} • {edu.startDate} - {edu.endDate}
              </p>
              <p className="mt-1 text-sm">{edu.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-sm rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        {data.certificates && data.certificates.length > 0 && (
          <section>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Certificates</h2>
            {data.certificates.map((cert, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium">{cert.title}</h3>
                <p className="text-sm text-gray-600">
                  {cert.issuer} • {cert.date}
                </p>
                {cert.link && (
                  <a href={cert.link} className="text-blue-600 text-sm block mt-1">
                    View Certificate
                  </a>
                )}
                <p className="mt-1 text-sm">{cert.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    ),
    professional: (
      <div className="bg-white p-8 shadow-lg max-w-[21cm] mx-auto" style={baseStyles}>
        <header className="border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-center mb-2">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <div className="text-center text-sm space-y-1">
            <p>{data.personalInfo.title}</p>
            <p>
              {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
            </p>
            {data.personalInfo.website && (
              <p>
                Website: <a href={data.personalInfo.website} className="text-blue-600">{data.personalInfo.website}</a>
              </p>
            )}
            {data.personalInfo.github && (
              <p>
                GitHub: <a href={`https://github.com/${data.personalInfo.github}`} className="text-blue-600">{data.personalInfo.github}</a>
              </p>
            )}
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b border-gray-300">EDUCATION</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between font-semibold">
                <span>{edu.school}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="font-medium">{edu.degree} in {edu.fieldOfStudy}</p>
              <p className="text-sm">{edu.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b border-gray-300">EXPERIENCE</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between font-semibold">
                <span>{exp.company}</span>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="font-medium">{exp.position}</p>
              <p className="text-sm mb-2">{exp.location}</p>
              <p className="text-sm whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b border-gray-300">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded text-sm">
                {skill.name} ({skill.level})
              </span>
            ))}
          </div>
        </section>

        {data.certificates && data.certificates.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3 border-b border-gray-300">CERTIFICATES</h2>
            {data.certificates.map((cert, index) => (
              <div key={index} className="mb-3">
                <p className="font-semibold">{cert.title}</p>
                <p className="text-sm">{cert.issuer} - {cert.date}</p>
                {cert.link && (
                  <a href={cert.link} className="text-blue-600 text-sm">View Certificate</a>
                )}
                <p className="text-sm mt-1">{cert.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    ),
    technical: (
      <div className="bg-white p-8 shadow-lg max-w-[21cm] mx-auto" style={baseStyles}>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-center">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <div className="text-center space-y-1">
            <p className="text-lg font-medium">{data.personalInfo.title}</p>
            <p className="text-sm">
              {data.personalInfo.email} | {data.personalInfo.phone}
            </p>
            <p className="text-sm">{data.personalInfo.location}</p>
            <div className="flex justify-center gap-4 text-sm">
              {data.personalInfo.github && (
                <a href={`https://github.com/${data.personalInfo.github}`} className="text-blue-600">
                  GitHub: {data.personalInfo.github}
                </a>
              )}
              {data.personalInfo.website && (
                <a href={data.personalInfo.website} className="text-blue-600">
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-gray-600">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300">
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-lg font-bold">{exp.position}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="font-medium text-gray-700 mb-1">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
              <p className="text-sm whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold">{edu.school}</h3>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="font-medium">
                {edu.degree} in {edu.fieldOfStudy}
              </p>
              <p className="text-sm mt-1">{edu.description}</p>
            </div>
          ))}
        </section>

        {data.certificates && data.certificates.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300">
              Certifications
            </h2>
            {data.certificates.map((cert, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{cert.title}</h3>
                  <span className="text-sm text-gray-600">{cert.date}</span>
                </div>
                <p className="text-sm font-medium">{cert.issuer}</p>
                {cert.link && (
                  <a href={cert.link} className="text-blue-600 text-sm block mt-1">
                    View Certificate
                  </a>
                )}
                <p className="text-sm mt-1">{cert.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    ),
  };

  return templates[template];
}