import React, { useState, useEffect } from 'react';
import HeaderNav from './components/HeaderNav';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import AtsAnalyzerPanel from './components/AtsAnalyzerPanel';
import FaqPage from './components/FaqPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsPage from './components/TermsPage';
import AtsGuidePage from './components/AtsGuidePage';
import LandingPage from './components/LandingPage';
import TemplateGallery from './components/TemplateGallery';
import { Resume, TemplateType } from './types/resume';
import { calculateAtsScore } from './utils/atsScanner';
import { DEMO_RESUMES } from './utils/presetData';
import { FileText, Eye, Sparkles, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import Footer from './components/Footer';

const LOCAL_STORAGE_KEY = 'ats_resume_maker_data_v2';

const initialResumeData: Resume = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    website: '',
    github: '',
    linkedin: ''
  },
  education: [
    {
      id: 'edu-demo',
      school: 'State University',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2018',
      endDate: '2022',
      description: ''
    }
  ],
  experience: [
    {
      id: 'exp-demo',
      company: 'Innovate Solutions Inc.',
      position: 'Software Developer',
      location: 'New York, NY',
      startDate: 'Jan 2022',
      endDate: 'Present',
      isCurrent: true,
      description: '• Developed high-throughput web APIs, improving data response speed by 30%.\n• Collaborated with product teams to ship 12+ features on schedule.'
    }
  ],
  projects: [],
  skills: [
    { id: 'sk-1', name: 'JavaScript', level: 'Advanced' },
    { id: 'sk-2', name: 'React', level: 'Advanced' },
    { id: 'sk-3', name: 'Problem Solving', level: 'Expert' }
  ],
  certificates: [],
  targetIndustry: 'Software Engineering',
  targetJobDescription: '',
  targetCompany: '',
  style: {
    primaryColor: '#2563eb',
    fontFamily: 'Inter',
    fontSize: 'base',
    lineHeight: 'normal',
    spacingDensity: 'normal',
    paperSize: 'A4',
    backgroundColor: '#ffffff'
  }
};

function App() {
  const [data, setData] = useState<Resume>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (err) {
      console.error('Failed to parse local storage resume:', err);
    }
    return DEMO_RESUMES.softwareEngineer;
  });

  // MPA Route State synced with window.location.hash
  const [route, setRoute] = useState<string>(() => window.location.hash || '');
  const [template, setTemplate] = useState<TemplateType>('standard-ats');
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const [showStyleSettings, setShowStyleSettings] = useState(false);
  const [isAtsPanelOpen, setIsAtsPanelOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showMobileNotice, setShowMobileNotice] = useState(true);

  // Hash Navigation Handler
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newRoute: string) => {
    window.location.hash = newRoute;
    setRoute(newRoute);
    window.scrollTo(0, 0);
  };

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save to local storage:', err);
    }
  }, [data]);

  // Compute live ATS score
  const atsResult = calculateAtsScore(data);

  // Handlers
  const handleUpdateResume = (updated: Partial<Resume>) => {
    setData((prev) => ({ ...prev, ...updated }));
  };

  const handleStyleChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        [field]: value
      }
    }));
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('resume-printable');
    if (!element) {
      window.print();
      return;
    }

    setIsGeneratingPdf(true);

    try {
      const fileName = `${data.personalInfo.firstName || 'Resume'}_${data.personalInfo.lastName || 'ATS'}.pdf`;
      const format = data.style?.paperSize === 'LETTER' ? 'letter' : 'a4';

      const opt = {
        margin: [8, 10, 8, 10] as [number, number, number, number],
        filename: fileName,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: format, orientation: 'portrait' as const },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.warn('html2pdf export failed, falling back to window.print():', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personalInfo.firstName || 'Resume'}_${data.personalInfo.lastName || 'Backup'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.personalInfo) {
          setData(parsed);
          alert('Resume JSON imported successfully!');
        } else {
          alert('Invalid resume JSON structure.');
        }
      } catch {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleExportTxt = () => {
    let txt = `${data.personalInfo.firstName.toUpperCase()} ${data.personalInfo.lastName.toUpperCase()}\n`;
    txt += `${data.personalInfo.title}\n`;
    txt += `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}\n\n`;

    if (data.personalInfo.summary) {
      txt += `SUMMARY\n---------------------\n${data.personalInfo.summary}\n\n`;
    }

    if (data.experience.length > 0) {
      txt += `EXPERIENCE\n---------------------\n`;
      data.experience.forEach((exp) => {
        txt += `${exp.position} - ${exp.company} (${exp.startDate} - ${exp.endDate})\n`;
        txt += `${exp.description}\n\n`;
      });
    }

    if (data.skills.length > 0) {
      txt += `SKILLS\n---------------------\n${data.skills.map((s) => s.name).join(', ')}\n\n`;
    }

    if (data.education.length > 0) {
      txt += `EDUCATION\n---------------------\n`;
      data.education.forEach((edu) => {
        txt += `${edu.school} - ${edu.degree} in ${edu.fieldOfStudy} (${edu.startDate} - ${edu.endDate})\n`;
      });
    }

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personalInfo.firstName || 'Resume'}_${data.personalInfo.lastName || 'Text'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadDemo = (presetKey: string) => {
    if (DEMO_RESUMES[presetKey]) {
      setData(DEMO_RESUMES[presetKey]);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to clear all resume fields?')) {
      setData(initialResumeData);
    }
  };

  const handleAddSkillFromAts = (skillName: string) => {
    const exists = data.skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase());
    if (!exists) {
      const newSkill = { id: `sk-${Date.now()}`, name: skillName, level: 'Advanced' as const };
      setData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
    }
  };

  // MPA Page Router Render Logic
  const renderPageContent = () => {
    switch (route) {
      case '#landing':
      case '#home':
      case '':
        return (
          <LandingPage
            onStartBuilding={(chosenTemplate) => {
              if (chosenTemplate) setTemplate(chosenTemplate);
              navigateTo('#builder');
            }}
            onNavigate={navigateTo}
          />
        );
      case '#templates':
        return (
          <TemplateGallery
            onSelectTemplate={(chosenTemplate) => {
              setTemplate(chosenTemplate);
              navigateTo('#builder');
            }}
            onNavigateHome={() => navigateTo('#landing')}
          />
        );
      case '#faq':
        return <FaqPage onNavigateHome={() => navigateTo('#builder')} />;
      case '#privacy':
        return <PrivacyPolicyPage onNavigateHome={() => navigateTo('#builder')} />;
      case '#terms':
        return <TermsPage onNavigateHome={() => navigateTo('#builder')} />;
      case '#ats-guide':
        return <AtsGuidePage onNavigateHome={() => navigateTo('#builder')} />;
      case '#builder':
      default:
        return (
          <main className="flex-grow max-w-7xl w-full mx-auto py-3 sm:py-6 px-2 sm:px-6 lg:px-8">

            {/* Mobile Device Best Fit Alert Banner */}
            {showMobileNotice && (
              <div className="lg:hidden mb-4 p-3 bg-indigo-900 text-indigo-100 rounded-2xl shadow-md border border-indigo-700/60 flex items-start justify-between gap-2 animate-in fade-in duration-200">
                <div className="flex items-start space-x-2 text-xs">
                  <span className="text-base leading-none">📱</span>
                  <div>
                    <span className="font-bold text-white">Best Experience Tip:</span> For full side-by-side editing, pixel-perfect layout alignment & PDF print previewing, we recommend using a <strong>tablet or desktop device</strong>. Mobile editing is fully supported below with quick tab switching!
                  </div>
                </div>
                <button
                  onClick={() => setShowMobileNotice(false)}
                  className="text-indigo-300 hover:text-white p-0.5 rounded text-xs font-bold shrink-0"
                  title="Dismiss notice"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Desktop Split View (Grid: 12 columns) */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Editor */}
              <div className="lg:col-span-6 space-y-6 print:hidden">
                <ResumeForm data={data} onChange={setData} atsResult={atsResult} />
              </div>

              {/* Right Column: Live Paper Preview Sticky Container */}
              <div className="lg:col-span-6 sticky top-20 print:col-span-12">
                <div className="bg-slate-200/90 p-4 sm:p-6 rounded-2xl border border-slate-300 shadow-inner">
                  <ResumePreview data={data} template={template} onUpdateStyle={handleStyleChange} />
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Single Column View */}
            <div className="block lg:hidden space-y-4">

              {/* Mobile Template & Demo Selector Toolbar */}
              <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-2 items-center justify-between">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Template Format</label>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value as TemplateType)}
                    className="w-full text-xs p-1.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-800"
                  >
                    <option value="standard-ats">📄 Standard ATS</option>
                    <option value="tech-code">💻 Software Eng & Tech</option>
                    <option value="data-analyst">📊 Data Analytics</option>
                    <option value="photo-creative">📷 Creative Photo</option>
                    <option value="sales-growth">📈 Sales Leadership</option>
                    <option value="marketing-pro">🎯 Marketing Lead</option>
                    <option value="modern">⚡ Modern Contemporary</option>
                    <option value="executive">💼 Executive</option>
                    <option value="minimal">✨ Minimalist</option>
                    <option value="compact">⚡ Compact 1-Page</option>
                  </select>
                </div>

                <div className="flex-1 min-w-[140px]">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Industry Presets</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) handleLoadDemo(e.target.value);
                      e.target.value = '';
                    }}
                    defaultValue=""
                    className="w-full text-xs p-1.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-800"
                  >
                    <option value="" disabled>✨ Load Demo</option>
                    <option value="softwareEngineer">💻 Software Eng</option>
                    <option value="dataAnalyst">📊 Data Analyst</option>
                    <option value="marketingManager">📈 Marketing</option>
                    <option value="salesDirector">🎯 Sales Director</option>
                  </select>
                </div>
              </div>

              {mobileTab === 'form' ? (
                <ResumeForm data={data} onChange={setData} atsResult={atsResult} />
              ) : (
                <div className="bg-slate-200/90 p-2 sm:p-4 rounded-2xl border border-slate-300">
                  <ResumePreview data={data} template={template} onUpdateStyle={handleStyleChange} />
                </div>
              )}
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-16 lg:pb-0">

      {/* Top Sticky Nav */}
      <div className="print:hidden">
        <HeaderNav
          route={route}
          template={template}
          onTemplateChange={setTemplate}
          view={mobileTab}
          onViewChange={setMobileTab}
          showStyleSettings={showStyleSettings}
          onToggleStyleSettings={() => setShowStyleSettings(!showStyleSettings)}
          onDownloadPdf={handleDownloadPdf}
          onExportJson={handleExportJson}
          onImportJson={handleImportJson}
          onExportTxt={handleExportTxt}
          onLoadDemo={handleLoadDemo}
          onResetData={handleResetData}
          atsResult={atsResult}
          onOpenAtsPanel={() => setIsAtsPanelOpen(true)}
          onNavigate={navigateTo}
        />
      </div>

      {/* Style Controls Drawer */}
      {showStyleSettings && (route === '' || route === '#builder') && (
        <div className="bg-white border-b border-gray-200 shadow-xs print:hidden animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Paper Format</label>
                <select
                  value={data.style?.paperSize || 'A4'}
                  onChange={(e) => handleStyleChange('paperSize', e.target.value)}
                  className="w-full text-xs p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                >
                  <option value="A4">A4 (Standard Global 210x297mm)</option>
                  <option value="LETTER">US Letter (North America 8.5x11in)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Spacing Density (Fit Control)</label>
                <select
                  value={data.style?.spacingDensity || 'normal'}
                  onChange={(e) => handleStyleChange('spacingDensity', e.target.value)}
                  className="w-full text-xs p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                >
                  <option value="compact">⚡ Compact (Fit 1-Page)</option>
                  <option value="normal">Standard Spacing</option>
                  <option value="loose">Spacious Layout</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Typography Font</label>
                <select
                  value={data.style?.fontFamily || 'Inter'}
                  onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                  className="w-full text-xs p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <optgroup label="Sans-Serif (Modern & Clean)">
                    <option value="Inter">Inter (Modern Clean)</option>
                    <option value="Roboto">Roboto (Corporate Tech)</option>
                    <option value="Outfit">Outfit (Trendy Minimal)</option>
                    <option value="Poppins">Poppins (Geometric Sans)</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans (Contemporary)</option>
                  </optgroup>

                  <optgroup label="Serif (Classic & Executive)">
                    <option value="Merriweather">Merriweather (Classic Serif)</option>
                    <option value="Playfair Display">Playfair Display (Executive)</option>
                    <option value="Lora">Lora (Editorial Serif)</option>
                  </optgroup>

                  <optgroup label="Monospace (Technical & Code)">
                    <option value="JetBrains Mono">JetBrains Mono (Technical)</option>
                    <option value="Fira Code">Fira Code (Developer Mono)</option>
                  </optgroup>

                  <option value="system-ui">System UI Default</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Color Accent</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={data.style?.primaryColor || '#2563eb'}
                    onChange={(e) => handleStyleChange('primaryColor', e.target.value)}
                    className="h-8 w-12 rounded cursor-pointer border border-gray-300 p-0.5"
                  />
                  <span className="text-xs font-mono text-gray-600">{data.style?.primaryColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Font Size Scale</label>
                <select
                  value={data.style?.fontSize || 'base'}
                  onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                  className="w-full text-xs p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sm">Compact (Small)</option>
                  <option value="base">Standard (Medium)</option>
                  <option value="lg">Expanded (Large)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic MPA Page Content */}
      {renderPageContent()}

      {/* Sticky Bottom Quick Navigation Bar for Mobile / Tablet (Home route only) */}
      {route === '' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-2 lg:hidden shadow-lg print:hidden">
          <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
            <button
              onClick={() => setMobileTab('form')}
              className={`flex-1 flex flex-col items-center py-1.5 rounded-xl text-xs font-semibold transition ${mobileTab === 'form' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <FileText className="w-4 h-4 mb-0.5" />
              <span>Form</span>
            </button>

            <button
              onClick={() => setMobileTab('preview')}
              className={`flex-1 flex flex-col items-center py-1.5 rounded-xl text-xs font-semibold transition ${mobileTab === 'preview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Eye className="w-4 h-4 mb-0.5" />
              <span>Preview</span>
            </button>

            <button
              onClick={() => setIsAtsPanelOpen(true)}
              className="flex-1 flex flex-col items-center py-1.5 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
            >
              <Sparkles className="w-4 h-4 mb-0.5 text-amber-600" />
              <span>Score {atsResult.score}%</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex-1 flex flex-col items-center py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <Download className="w-4 h-4 mb-0.5" />
              <span>{isGeneratingPdf ? 'Exporting...' : 'PDF'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ATS Analyzer Drawer */}
      <AtsAnalyzerPanel
        isOpen={isAtsPanelOpen}
        onClose={() => setIsAtsPanelOpen(false)}
        resume={data}
        atsResult={atsResult}
        onUpdateResume={handleUpdateResume}
        onAddSkill={handleAddSkillFromAts}
      />

      {/* Footer */}
      <div className="print:hidden">
        <Footer onNavigate={navigateTo} />
      </div>

    </div>
  );
}

export default App;
