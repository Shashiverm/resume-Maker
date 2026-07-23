import React, { useRef, useState } from 'react';
import { 
  FileText, 
  Download, 
  Settings, 
  ShieldCheck, 
  Upload, 
  FileCode, 
  RotateCcw,
  Layout,
  Briefcase,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { TemplateType, AtsScanResult } from '../types/resume';

interface HeaderNavProps {
  route?: string;
  template: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
  view?: 'form' | 'preview';
  onViewChange?: (view: 'form' | 'preview') => void;
  showStyleSettings: boolean;
  onToggleStyleSettings: () => void;
  onDownloadPdf: () => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportTxt: () => void;
  onLoadDemo: (presetKey: string) => void;
  onResetData: () => void;
  atsResult: AtsScanResult;
  onOpenAtsPanel: () => void;
  onNavigate?: (route: string) => void;
}

export default function HeaderNav({
  route = '',
  template,
  onTemplateChange,
  showStyleSettings,
  onToggleStyleSettings,
  onDownloadPdf,
  onExportJson,
  onImportJson,
  onExportTxt,
  onLoadDemo,
  onResetData,
  atsResult,
  onOpenAtsPanel,
  onNavigate
}: HeaderNavProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isBuilderView = route === '#builder';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const navLinks = [
    { label: 'Home', route: '#landing' },
    { label: 'Builder', route: '#builder' },
    { label: 'Templates', route: '#templates' },
    { label: 'ATS Guide', route: '#ats-guide' },
  ];

  return (
    <header className="sticky top-0 z-40">
      {/* ── Primary Nav Bar ── */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-12">
            
            {/* Logo */}
            <a 
              href="#landing" 
              onClick={(e) => { e.preventDefault(); onNavigate?.('#landing'); }}
              className="flex items-center gap-2 cursor-pointer group shrink-0"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">ATS ResumeMaker</span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-2.5 h-2.5 mr-0.5" />
                FREE
              </span>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-0.5 text-[11px] font-semibold text-slate-600">
              {navLinks.map((link) => {
                const isActive = route === link.route || 
                  (link.route === '#landing' && (route === '' || route === '#home'));
                return (
                  <a 
                    key={link.route}
                    href={link.route} 
                    onClick={(e) => { e.preventDefault(); onNavigate?.(link.route); }} 
                    className={`px-2.5 py-1 rounded-md transition ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-bold' 
                        : 'hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              {isBuilderView && (
                <>
                  {/* ATS Score Pill */}
                  <button
                    onClick={onOpenAtsPanel}
                    className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-slate-50 border border-slate-200 hover:bg-slate-100 transition"
                    title="View ATS optimization details"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${getScoreBg(atsResult.score)}`} />
                    <span className={getScoreColor(atsResult.score)}>{atsResult.score}%</span>
                    <span className="text-slate-400 font-medium">{atsResult.grade}</span>
                  </button>

                  {/* Download PDF */}
                  <button
                    onClick={onDownloadPdf}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold shadow-sm transition active:scale-95"
                  >
                    <Download className="w-3 h-3" />
                    <span className="hidden sm:inline">PDF</span>
                  </button>
                </>
              )}

              {!isBuilderView && (
                <button
                  onClick={() => onNavigate?.('#builder')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold shadow-sm transition active:scale-95"
                >
                  Build Resume →
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Builder Toolbar (second row, only on builder view) ── */}
      {isBuilderView && (
        <div className="bg-slate-50/95 backdrop-blur-sm border-b border-slate-200/60">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex items-center justify-between h-9 gap-2 overflow-x-auto scrollbar-hide">
              
              {/* Left: Template + Presets */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Template Picker */}
                <div className="relative">
                  <select
                    value={template}
                    onChange={(e) => onTemplateChange(e.target.value as TemplateType)}
                    className="appearance-none pl-6 pr-6 py-1 bg-white text-slate-800 text-[11px] rounded-md font-semibold border border-slate-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                  >
                    <optgroup label="ATS Formats">
                      <option value="standard-ats">Standard ATS</option>
                      <option value="minimal">Minimalist</option>
                      <option value="compact">Compact 1-Page</option>
                    </optgroup>
                    <optgroup label="Tech & Analytics">
                      <option value="tech-code">Software Eng</option>
                      <option value="data-analyst">Data Science</option>
                      <option value="modern">Modern</option>
                    </optgroup>
                    <optgroup label="Creative">
                      <option value="photo-creative">Photo Creative</option>
                    </optgroup>
                    <optgroup label="Business">
                      <option value="sales-growth">Sales</option>
                      <option value="marketing-pro">Marketing</option>
                      <option value="executive">Executive</option>
                      <option value="academic">Academic</option>
                    </optgroup>
                  </select>
                  <Layout className="w-3 h-3 text-blue-500 absolute left-2 top-[7px] pointer-events-none" />
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-[7px] pointer-events-none" />
                </div>

                {/* Presets */}
                <div className="relative hidden sm:block">
                  <select
                    onChange={(e) => {
                      if (e.target.value) onLoadDemo(e.target.value);
                      e.target.value = '';
                    }}
                    defaultValue=""
                    className="appearance-none pl-6 pr-5 py-1 bg-white hover:bg-slate-50 text-slate-700 text-[11px] rounded-md font-medium cursor-pointer border border-slate-200 focus:outline-none transition"
                  >
                    <option value="" disabled>Presets</option>
                    <option value="softwareEngineer">💻 Software Eng</option>
                    <option value="dataAnalyst">📊 Data Analyst</option>
                    <option value="marketingManager">📈 Marketing</option>
                    <option value="salesDirector">🎯 Sales</option>
                  </select>
                  <Briefcase className="w-3 h-3 text-amber-500 absolute left-2 top-[7px] pointer-events-none" />
                </div>

                <div className="w-px h-4 bg-slate-200 mx-0.5 hidden sm:block" />

                {/* Style Toggle */}
                <button
                  onClick={onToggleStyleSettings}
                  className={`flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-md border transition ${
                    showStyleSettings
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Settings className="w-3 h-3" />
                  <span className="hidden sm:inline">Style</span>
                </button>
              </div>

              {/* Right: Export options */}
              <div className="flex items-center gap-1 shrink-0">
                <div className="relative group">
                  <button
                    className="flex items-center gap-1 px-2 py-1 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-md text-[11px] font-medium transition"
                    title="Export & backup options"
                  >
                    <FileCode className="w-3 h-3" />
                    <span className="hidden sm:inline">Export</span>
                    <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                  </button>

                  <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 hidden group-hover:block z-50">
                    <button
                      onClick={onExportJson}
                      className="w-full text-left px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center font-medium"
                    >
                      <FileCode className="w-3 h-3 mr-2 text-indigo-500" />
                      JSON Backup
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full text-left px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center font-medium"
                    >
                      <Upload className="w-3 h-3 mr-2 text-blue-500" />
                      Import JSON
                    </button>
                    <button
                      onClick={onExportTxt}
                      className="w-full text-left px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center font-medium"
                    >
                      <FileText className="w-3 h-3 mr-2 text-emerald-500" />
                      Plain Text (.txt)
                    </button>
                    <div className="border-t border-slate-100 my-0.5" />
                    <button
                      onClick={onResetData}
                      className="w-full text-left px-3 py-1.5 text-[11px] text-rose-600 hover:bg-rose-50 flex items-center font-semibold"
                    >
                      <RotateCcw className="w-3 h-3 mr-2" />
                      Reset to Blank
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={onImportJson}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Menu Drawer ── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-lg animate-in slide-in-from-top duration-150">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = route === link.route || 
                (link.route === '#landing' && (route === '' || route === '#home'));
              return (
                <a 
                  key={link.route}
                  href={link.route} 
                  onClick={(e) => { e.preventDefault(); onNavigate?.(link.route); setMobileMenuOpen(false); }} 
                  className={`block px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
