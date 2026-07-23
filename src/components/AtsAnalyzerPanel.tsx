import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Briefcase, 
  Building2, 
  Plus, 
  X,
  Target
} from 'lucide-react';
import { Resume, AtsScanResult } from '../types/resume';
import { INDUSTRY_KEYWORDS } from '../utils/presetData';

interface AtsAnalyzerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  resume: Resume;
  atsResult: AtsScanResult;
  onUpdateResume: (updated: Partial<Resume>) => void;
  onAddSkill: (skillName: string) => void;
}

export default function AtsAnalyzerPanel({
  isOpen,
  onClose,
  resume,
  atsResult,
  onUpdateResume,
  onAddSkill
}: AtsAnalyzerPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full min-h-screen shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold">100% Real-Time ATS Optimizer</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">

          {/* Overall Score Badge */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-32 h-32 text-blue-400" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs uppercase tracking-widest text-blue-300 font-semibold mb-1">ATS Pass Rate</span>
              <div className="flex items-baseline justify-center space-x-2">
                <span className="text-5xl font-extrabold tracking-tight text-white">{atsResult.score}%</span>
                <span className="text-2xl font-bold px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-400/30">
                  {atsResult.grade}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-3 max-w-md">
                {atsResult.summaryFeedback}
              </p>
            </div>
          </div>

          {/* Industry & Company Tailoring */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-2 text-blue-900 font-semibold text-sm">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Tailor for Company & Industry</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Target Industry</label>
                <select
                  value={resume.targetIndustry}
                  onChange={(e) => onUpdateResume({ targetIndustry: e.target.value })}
                  className="w-full text-xs p-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">-- Select Industry --</option>
                  {Object.keys(INDUSTRY_KEYWORDS).map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Target Company (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Google, Deloitte, Microsoft"
                  value={resume.targetCompany || ''}
                  onChange={(e) => onUpdateResume({ targetCompany: e.target.value })}
                  className="w-full text-xs p-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Job Description Paste & Matcher */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-700" />
                Target Job Description Keyword Scanner
              </label>
              <span className="text-[11px] text-gray-500">Paste JD to find keyword gaps</span>
            </div>
            
            <textarea
              rows={4}
              placeholder="Paste the full job posting/description here..."
              value={resume.targetJobDescription}
              onChange={(e) => onUpdateResume({ targetJobDescription: e.target.value })}
              className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-gray-700 bg-gray-50"
            />
          </div>

          {/* Keyword Match Results */}
          <div className="space-y-4">
            
            {/* Missing Keywords */}
            {atsResult.missingKeywords.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700">
                  <span>Missing Keywords ({atsResult.missingKeywords.length})</span>
                  <span className="text-[11px] text-gray-500">Click '+' to add to Skills</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {atsResult.missingKeywords.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => onAddSkill(kw)}
                      className="inline-flex items-center px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-full text-xs font-medium transition cursor-pointer group"
                      title={`Click to add "${kw}" to skills`}
                    >
                      <Plus className="w-3 h-3 mr-1 text-rose-600 group-hover:scale-125 transition" />
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Keywords */}
            {atsResult.matchingKeywords.length > 0 && (
              <div className="space-y-2">
                <span className="block text-xs font-bold text-emerald-700">
                  Matched Keywords ({atsResult.matchingKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {atsResult.matchingKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ATS Checklist Audit */}
          <div className="space-y-3 border-t border-gray-200 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
              ATS Compliance Audit Checklist
            </h3>

            <div className="space-y-2">
              {atsResult.checklist.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3 rounded-xl border flex items-start space-x-3 transition ${
                    item.passed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  {item.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  )}

                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">{item.label}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        item.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.passed ? 'PASSED' : 'NEEDS ATTENTION'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            Close Optimizer Panel
          </button>
        </div>

      </div>
    </div>
  );
}
