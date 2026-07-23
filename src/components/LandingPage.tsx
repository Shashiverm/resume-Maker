import {
  Sparkles,
  FileText,
  ShieldCheck,
  Zap,
  Download,
  ArrowRight,
  CheckCircle2,
  Layout,
  Briefcase,
  Sliders,
  Lock,
  Star
} from 'lucide-react';
import { TemplateType } from '../types/resume';

interface LandingPageProps {
  onStartBuilding: (template?: TemplateType) => void;
  onNavigate: (route: string) => void;
}

export default function LandingPage({ onStartBuilding, onNavigate }: LandingPageProps) {
  const templatesList: { id: TemplateType; title: string; desc: string; category: string; color: string }[] = [
    { id: 'standard-ats', title: 'Standard ATS Classic', desc: '100% Machine-readable single-column layout for strict ATS scanners.', category: 'ATS Classic', color: 'from-blue-600 to-indigo-600' },
    { id: 'tech-code', title: 'Software Eng & Tech', desc: 'Code syntax accents, technical stack chips, GitHub repository highlights.', category: 'Tech & Dev', color: 'from-blue-500 to-cyan-600' },
    { id: 'data-analyst', title: 'Data Science & Analytics', desc: 'Data visualization metrics grid, Python/SQL stack, quantitative impact.', category: 'Data & Analytics', color: 'from-purple-600 to-indigo-600' },
    { id: 'photo-creative', title: 'Creative Headshot & Photo', desc: 'Sleek candidate profile picture avatar frame, contemporary typography.', category: 'Creative Photo', color: 'from-violet-600 to-pink-600' },
    { id: 'sales-growth', title: 'Sales & Revenue Leader', desc: 'Bold ACV callout cards, quota achievement bullet emphasis.', category: 'Sales & Executive', color: 'from-red-600 to-amber-600' },
    { id: 'marketing-pro', title: 'Digital Marketing Lead', desc: 'Dark emerald header banner, CAC/ROAS campaign outcomes.', category: 'Marketing', color: 'from-emerald-600 to-teal-600' },
    { id: 'modern', title: 'Modern Contemporary', desc: 'Left accent border, clean section divider bars, contemporary spacing.', category: 'Modern', color: 'from-indigo-600 to-blue-600' },
    { id: 'compact', title: 'Compact 1-Page Fit', desc: 'Ultra-dense grid for 10+ years experience on a single sheet.', category: '1-Page Fit', color: 'from-slate-700 to-slate-900' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">

        {/* Background Mesh Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Top Pill Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Free ATS Resume Maker </span>
              <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">100% FREE</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Create an <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">ATS-Proof, Job-Winning Resume</span> in 5 Minutes
            </h1>

            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Build professional resumes formatted for applicant tracking systems.
              Zero signup required, 100% private local save, and instant unlimited PDF downloads.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onStartBuilding()}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-extrabold rounded-2xl text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <FileText className="w-5 h-5" />
                <span>Create My Resume Free</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <button
                onClick={() => onNavigate('#templates')}
                className="w-full sm:w-auto px-7 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-2xl text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Layout className="w-5 h-5 text-indigo-400" />
                <span>Explore 12+ Templates</span>
              </button>
            </div>

            {/* Feature Highlights Bar */}
            <div className="pt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Unlimited Exports</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-blue-400" /> No Account or Credit Card</span>
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-indigo-400" /> Private Local Data Saving</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> Real-time ATS Keyword Score</span>
            </div>

          </div>

          {/* Hero App Mockup Preview Frame */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-3 sm:p-4 shadow-2xl shadow-blue-900/20 backdrop-blur-xl">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 mb-3 text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 font-mono text-[11px] text-slate-500 hidden sm:inline">ats-resumemaker.app/builder</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
                  <Sparkles className="w-3 h-3" /> Live ATS Parser Active
                </div>
              </div>

              {/* Mock Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <div className="md:col-span-6 space-y-3 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                    <Sliders className="w-3.5 h-3.5" /> Smart Form Editor & Bullet AI
                  </div>
                  <h3 className="text-xl font-bold text-white">Full Control Over Every Resume Section</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Easily add experience, skills, custom metrics, and candidate headshots.
                    Our built-in action verb assistant helps you craft bullet points recruiters love.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold pt-1">
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">Software Eng</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">Data Science</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">Sales Leadership</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">Digital Marketing</span>
                  </div>
                </div>

                <div className="md:col-span-6 flex justify-center">
                  <div className="w-full bg-white text-slate-900 p-5 rounded-xl shadow-lg border border-slate-200 transform md:rotate-1 hover:rotate-0 transition duration-300 space-y-2 text-left">
                    <div className="border-b border-slate-900 pb-2">
                      <h4 className="text-base font-extrabold uppercase text-slate-900 tracking-tight">ALEX MORGAN</h4>
                      <p className="text-xs font-bold text-blue-600">SENIOR FULL STACK ENGINEER</p>
                    </div>
                    <div className="text-[10px] space-y-1 text-slate-700">
                      <p className="font-semibold text-slate-900 uppercase tracking-wider text-[9px] border-b border-slate-200 pb-0.5">Experience</p>
                      <p className="font-bold text-slate-900">Senior Engineer — CloudScale Tech <span className="float-right font-normal">2022–Present</span></p>
                      <p className="text-slate-600">• Spearheaded React & TypeScript SaaS migration boosting speeds by 45%.</p>
                      <p className="font-semibold text-slate-900 uppercase tracking-wider text-[9px] border-b border-slate-200 pb-0.5 pt-1">Skills</p>
                      <p className="text-slate-800 font-medium">React • TypeScript • Node.js • AWS • PostgreSQL • Docker</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Trust Stats Counter Bar */}
      <section className="bg-slate-900/60 border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white">100,000+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Resumes Created</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">98%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">ATS Scan Pass Rate</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-blue-400">12+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Professional Templates</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-purple-400">$0</div>
              <div className="text-xs text-slate-400 font-medium mt-1">100% Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Breakdown Section */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Why Job Seekers Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Everything You Need to Beat the ATS & Get Hired Faster
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Built with algorithms modeled directly after popular Applicant Tracking Systems (Greenhouse, Lever, Workday, Taleo).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Feature 1 */}
            <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Real-Time ATS Keyword Matcher</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste any job description to get an instant keyword match score, missing skill recommendations, and critical checklist fixes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-indigo-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Dynamic 1-Page Fit Control</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No more accidental 2-page resumes with 3 trailing lines! Toggle Compact 1-Page Fit to automatically balance margins and spacing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-purple-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">100% Free Unlimited Downloads</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unlike paywalled builders that force credit card signups after 2 hours of editing, our PDF downloads are 100% free forever.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Template Showcase Section */}
      <section className="py-20 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-2 inline-block">
                Professional Design Collection
              </span>
              <h2 className="text-3xl font-black text-white">12+ Job-Tailored Resume Templates</h2>
            </div>
            <button
              onClick={() => onNavigate('#templates')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
            >
              View All Templates <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templatesList.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => onStartBuilding(tpl.id)}
                className="group bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-blue-500/60 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`h-2.5 w-12 rounded-full bg-gradient-to-r ${tpl.color} mb-4`}></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {tpl.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2 group-hover:text-blue-400 transition">{tpl.title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{tpl.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:translate-x-1 transition">
                  <span>Use This Template</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-white">Loved by Job Seekers Worldwide</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">See what candidates are saying about our free ATS Resume Maker.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "I tested 4 other builders and they all asked for a credit card at the end. This app is 100% free and the ATS scanner showed me missing keywords that got me 3 interviews!"
              </p>
              <div className="text-xs font-bold text-white pt-2 border-t border-slate-800">
                — Sarah Jenkins, Growth Lead
              </div>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "The Software Engineering template with tech stack chips and GitHub repository highlights was exactly what I needed. Downloaded PDF cleanly in seconds."
              </p>
              <div className="text-xs font-bold text-white pt-2 border-t border-slate-800">
                — Alex Morgan, Senior Full Stack Engineer
              </div>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "The 1-page fit control button saved me. My resume was spilling over into page 2 by 4 lines and clicking Compact 1-Page Fit fixed it instantly."
              </p>
              <div className="text-xs font-bold text-white pt-2 border-t border-slate-800">
                — Marcus Vance, Enterprise Sales Director
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Ready to Build Your Winning Resume?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Zero sign-up, zero paywalls, instant PDF downloads. Start editing your resume right now.
          </p>
          <div>
            <button
              onClick={() => onStartBuilding()}
              className="px-9 py-4 bg-white text-slate-950 font-black rounded-2xl text-base hover:bg-slate-100 transition shadow-2xl shadow-blue-500/20 cursor-pointer inline-flex items-center gap-2"
            >
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span>Start Building Free Now</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
