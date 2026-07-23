import React, { useRef } from 'react';
import { 
  FileText, 
  Download, 
  Settings, 
  ShieldCheck, 
  Sparkles, 
  Upload, 
  FileCode, 
  RotateCcw,
  Layout,
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { TemplateType, AtsScanResult } from '../types/resume';

interface HeaderNavProps {
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
}

export default function HeaderNav({
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
  onOpenAtsPanel
}: HeaderNavProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-emerald-500/10';
    if (score >= 70) return 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 shadow-amber-500/10';
    return 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 shadow-rose-500/10';
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Free Badge */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold transform hover:scale-105 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-900 tracking-tight">ATS ResumeMaker</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  100% Free
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">Zero Signup • Private Local Save • Instant PDF</p>
            </div>
          </div>

          {/* Center Template Picker & Demo Selector */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <div className="relative">
              <select
                value={template}
                onChange={(e) => onTemplateChange(e.target.value as TemplateType)}
                className="appearance-none pl-8 pr-8 py-1.5 bg-white text-slate-800 text-xs rounded-lg font-semibold shadow-xs border border-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <optgroup label="📋 Standard ATS Formats">
                  <option value="standard-ats">📄 Standard ATS (100% Parsable)</option>
                  <option value="minimal">✨ Minimalist Slate</option>
                  <option value="compact">⚡ Compact 1-Page</option>
                </optgroup>

                <optgroup label="🚀 Tech & Analytics Formats">
                  <option value="tech-code">💻 Software Engineering & Tech</option>
                  <option value="data-analyst">📊 Data Science & Analytics</option>
                  <option value="modern">⚡ Modern Contemporary</option>
                </optgroup>

                <optgroup label="💼 Business & Growth Formats">
                  <option value="sales-growth">📈 Sales & Revenue Leadership</option>
                  <option value="marketing-pro">🎯 Digital Marketing Lead</option>
                  <option value="executive">💼 Executive Corporate</option>
                  <option value="academic">🏛️ Academic & Legal</option>
                </optgroup>
              </select>
              <Layout className="w-3.5 h-3.5 text-blue-600 absolute left-2.5 top-2.5 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) onLoadDemo(e.target.value);
                  e.target.value = '';
                }}
                defaultValue=""
                className="appearance-none pl-7 pr-7 py-1.5 bg-slate-50 hover:bg-white text-slate-700 text-xs rounded-lg font-medium cursor-pointer border border-transparent hover:border-slate-200 focus:outline-none transition"
              >
                <option value="" disabled>✨ Load Industry Presets</option>
                <option value="softwareEngineer">💻 Software Engineer</option>
                <option value="dataAnalyst">📊 Data Analyst & Scientist</option>
                <option value="marketingManager">📈 Marketing Lead</option>
                <option value="salesDirector">🎯 Sales Director</option>
              </select>
              <Briefcase className="w-3.5 h-3.5 text-amber-500 absolute left-2 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2 shrink-0">

            {/* Style Drawer Toggle */}
            <button
              onClick={onToggleStyleSettings}
              className={`flex items-center px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                showStyleSettings
                  ? 'bg-blue-50 text-blue-700 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-xs'
              }`}
              title="Customize fonts, accent colors, and margins"
            >
              <Settings className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              <span className="hidden sm:inline">Design &</span> Style
            </button>

            {/* ATS Score Button */}
            <button
              onClick={onOpenAtsPanel}
              className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold border shadow-xs transition-all transform hover:scale-[1.02] ${getScoreBadgeColor(atsResult.score)}`}
              title="Click to open ATS optimization panel"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              <span>ATS {atsResult.score}%</span>
              <span className="hidden sm:inline ml-1 font-semibold">({atsResult.grade})</span>
            </button>

            {/* Download PDF Primary Button */}
            <button
              onClick={onDownloadPdf}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition-all transform hover:scale-[1.02] active:scale-95"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download PDF
            </button>

            {/* Extra Options Dropdown */}
            <div className="relative group">
              <button
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition"
                title="Backup and Export options"
              >
                •••
              </button>

              <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 hidden group-hover:block z-50 animate-in fade-in duration-150">
                <button
                  onClick={onExportJson}
                  className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center font-medium"
                >
                  <FileCode className="w-3.5 h-3.5 mr-2 text-indigo-600" />
                  Export JSON Backup
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center font-medium"
                >
                  <Upload className="w-3.5 h-3.5 mr-2 text-blue-600" />
                  Import JSON Backup
                </button>
                <button
                  onClick={onExportTxt}
                  className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center font-medium"
                >
                  <FileText className="w-3.5 h-3.5 mr-2 text-emerald-600" />
                  Export Plain Text (.txt)
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <button
                  onClick={onResetData}
                  className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-2" />
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
    </header>
  );
}
