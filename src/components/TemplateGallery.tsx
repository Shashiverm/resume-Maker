import { useState } from 'react';
import { TemplateType } from '../types/resume';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

interface TemplateGalleryProps {
  onSelectTemplate: (template: TemplateType) => void;
  onNavigateHome: () => void;
}

export default function TemplateGallery({ onSelectTemplate, onNavigateHome }: TemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const templates: { id: TemplateType; title: string; desc: string; category: 'ats' | 'tech' | 'creative' | 'executive' | 'minimal'; tag: string; badge: string }[] = [
    { id: 'standard-ats', title: 'Standard ATS Machine Readable', desc: 'Single-column 100% parsable format recommended for corporate online portals (Greenhouse, Lever, Taleo).', category: 'ats', tag: 'ATS Standard', badge: '100% Parsable' },
    { id: 'tech-code', title: 'Software Engineering & Tech', desc: 'Syntax code accents, tech stack chips, repository links & project telemetry highlights.', category: 'tech', tag: 'Developer', badge: 'Tech Stack Chips' },
    { id: 'data-analyst', title: 'Data Science & Analytics', desc: 'Quantitative metric callouts, SQL/Python skills matrix, data pipeline emphasis.', category: 'tech', tag: 'Data Science', badge: 'Metrics Grid' },
    { id: 'photo-creative', title: 'Creative Headshot & Profile Photo', desc: 'Modern candidate avatar frame, vibrant header badge, portfolio links.', category: 'creative', tag: 'Headshot Photo', badge: 'Photo Avatar' },
    { id: 'sales-growth', title: 'Sales & Revenue Leadership', desc: 'ACV revenue callout cards, quota achievement bullet emphasis, leadership focus.', category: 'executive', tag: 'Sales', badge: 'Quota Callouts' },
    { id: 'marketing-pro', title: 'Digital Marketing Lead', desc: 'Dark emerald header banner, campaign results breakdown, multi-channel skills.', category: 'creative', tag: 'Marketing', badge: 'Campaign Focus' },
    { id: 'modern', title: 'Modern Contemporary', desc: 'Left accent border, clean section divider bars, contemporary spacing.', category: 'creative', tag: 'Modern', badge: 'Contemporary' },
    { id: 'executive', title: 'Executive Corporate', desc: 'Serif typography, clean centered header, executive summary highlight box.', category: 'executive', tag: 'Executive', badge: 'Board Format' },
    { id: 'minimal', title: 'Minimalist Slate', desc: 'Generous whitespace, elegant typography, subtle section lines.', category: 'minimal', tag: 'Minimal', badge: 'Clean Whitespace' },
    { id: 'compact', title: 'Compact 1-Page Fit', desc: 'Tight spacing density for fitting dense 10+ year experience onto a single sheet.', category: 'minimal', tag: '1-Page Fit', badge: 'Dense 1-Page' },
    { id: 'creative', title: 'Creative Header Accent', desc: 'Vibrant accent colors, visual skill level indicators, portfolio section.', category: 'creative', tag: 'Creative', badge: 'Vibrant Accent' },
    { id: 'academic', title: 'Academic & Research', desc: 'Serif font, publications and research appointments emphasis.', category: 'executive', tag: 'Academic', badge: 'Research CV' }
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Back Link */}
        <div>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-white transition gap-1.5 cursor-pointer bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> 12+ Resume Templates
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Choose a Job-Winning Resume Template
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            All templates are 100% free, customizable, and optimized for applicant tracking systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {[
            { id: 'all', label: 'All Templates' },
            { id: 'ats', label: '📄 ATS Machine-Readable' },
            { id: 'tech', label: '💻 Tech & Developer' },
            { id: 'creative', label: '🎨 Creative & Photo' },
            { id: 'executive', label: '💼 Executive & Sales' },
            { id: 'minimal', label: '✨ Minimalist' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredTemplates.map((tpl) => (
            <div 
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl.id)}
              className="group bg-slate-900 border border-slate-800 hover:border-blue-500/60 rounded-3xl p-6 transition duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
                    {tpl.tag}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {tpl.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-blue-400 transition">{tpl.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tpl.desc}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-400 group-hover:translate-x-1 transition flex items-center gap-1">
                  Use This Template <ArrowRight className="w-4 h-4" />
                </span>
                <span className="w-7 h-7 rounded-full bg-blue-600/10 group-hover:bg-blue-600 text-blue-400 group-hover:text-white flex items-center justify-center transition">
                  <Check className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
