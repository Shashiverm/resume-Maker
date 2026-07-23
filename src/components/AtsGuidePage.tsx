import { Target, CheckCircle2, AlertTriangle, ArrowLeft, Sparkles, Zap } from 'lucide-react';

interface AtsGuidePageProps {
  onNavigateHome: () => void;
}

export default function AtsGuidePage({ onNavigateHome }: AtsGuidePageProps) {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Resume Builder
        </button>

        {/* Title */}
        <div className="space-y-2 border-b border-gray-200 pb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
            <Target className="w-3.5 h-3.5" />
            <span>Official 2026 ATS Optimization Blueprint</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">How to Pass 100% of Applicant Tracking Systems</h1>
          <p className="text-sm text-slate-600">
            Over 98% of Fortune 500 companies use ATS screeners (Workday, Taleo, Greenhouse, Lever, iCIMS). Here is how to ensure your resume reaches human recruiters.
          </p>
        </div>

        {/* Core Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Rule 1: Single Column */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-max">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">1. Use Single-Column Semantic Layouts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Legacy ATS scanners read left-to-right, top-to-bottom. Complex multi-column layouts, floating text boxes, and sidebar graphics confuse parsers, causing them to merge job titles with company names.
            </p>
          </div>

          {/* Rule 2: Action Verbs + Metrics */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl w-max">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">2. Use the "Action Verb + Metric" Formula</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Avoid passive phrasing ("Responsible for managing sales"). Instead, start every bullet point with a power verb and quantifiable metric: <em>"Spearheaded sales pipeline expansion, boosting annual revenue by 35% ($1.2M)."</em>
            </p>
          </div>

          {/* Rule 3: Avoid ATS Poison */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl w-max">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">3. Eliminate Graphic Skill Rating Bars</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never use graphic rating bars or star ratings (e.g. 4/5 stars for JavaScript). ATS screeners cannot parse images and will treat your skill level as empty.
            </p>
          </div>

          {/* Rule 4: Match Job Description Keywords */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl w-max">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">4. Match Exact Job Description Terms</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If the job posting asks for "React.js" and "TypeScript", include those exact keywords in your skills and experience bullets. Paste your JD into our scanner to detect missing terms instantly.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl text-center space-y-3">
          <h3 className="text-lg font-bold">Start Building Your 100% ATS Resume</h3>
          <p className="text-xs text-slate-300">No account required. Instant PDF download.</p>
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition"
          >
            Launch Builder Now
          </button>
        </div>

      </div>
    </div>
  );
}
