import React from 'react';
import { Github, Linkedin, Twitter, Heart, ShieldCheck, Sparkles, HelpCircle, FileText, Lock, FileCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                <FileText className="h-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-wide">ATS ResumeMaker</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% Free online ATS resume maker with zero signup required. Real-time ATS score calculation, JD keyword matching, and pixel-perfect PDF export.
            </p>
            <div className="inline-flex items-center px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              100% Free • Privacy First
            </div>
          </div>

          {/* Quick Navigation (MPA Routes) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Pages & Tools</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('')} className="hover:text-white transition flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Resume Builder App</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#faq')} className="hover:text-white transition flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>15 FAQs & Answers</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#ats-guide')} className="hover:text-white transition flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>ATS Optimization Guide</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Privacy</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('#privacy')} className="hover:text-white transition flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#terms')} className="hover:text-white transition flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Connect & Open Source</h4>
            <div className="flex space-x-3">
              <a 
                href="https://github.com/Shashiverm" 
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub" 
                className="text-slate-400 hover:text-white transition p-2 rounded-full hover:bg-slate-800 border border-slate-800"
              >
                <Github size={16} />
              </a>
              <a 
                href="https://www.linkedin.com/in/shashikantkumargaya/" 
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn" 
                className="text-slate-400 hover:text-white transition p-2 rounded-full hover:bg-slate-800 border border-slate-800"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="https://x.com/Shashivermn" 
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter" 
                className="text-slate-400 hover:text-white transition p-2 rounded-full hover:bg-slate-800 border border-slate-800"
              >
                <Twitter size={16} />
              </a>
            </div>

            <div className="flex items-center space-x-1 text-xs text-slate-400">
              <span>Made by Shashi with</span>
              <Heart size={14} className="text-rose-500 fill-rose-500" />
            </div>
          </div>

        </div>

        {/* SEO Keywords Footer Chips */}
        <div className="pt-2 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Popular Searches:</span>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700">Free Resume Maker No Signup</span>
            <span className="px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700">100% ATS Resume Builder</span>
            <span className="px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700">Online Resume Maker Without Login</span>
            <span className="px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700">Workday & Taleo ATS Template</span>
            <span className="px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700">Free PDF Resume Download</span>
            <span className="px-2 py-0.5 bg-slate-800/80 rounded border border-slate-700">Job Description Keyword Scanner</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-[11px] text-slate-500 border-t border-slate-800/60 pt-4">
          © 2026 ATS ResumeMaker. 100% Free Forever • Zero Signup Required.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
