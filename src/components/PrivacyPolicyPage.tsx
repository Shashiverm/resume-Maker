import React from 'react';
import { ShieldCheck, Lock, Database, EyeOff, FileText, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
}

export default function PrivacyPolicyPage({ onNavigateHome }: PrivacyPolicyPageProps) {
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
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Client-Side Privacy Guarantee</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Effective Date: July 23, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" /> 1. Zero Server Storage & Complete Data Privacy
            </h2>
            <p>
              At <strong>ATS ResumeMaker</strong>, we prioritize candidate data privacy above all else. We do <strong>NOT</strong> collect, store, sell, or transmit any of your personal details, resume entries, contact information, work history, or job descriptions to remote cloud servers.
            </p>
            <p>
              All resume data created using our application runs entirely client-side inside your browser environment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" /> 2. LocalStorage Persistence
            </h2>
            <p>
              Your resume state is saved locally within your device’s browser storage (<code>localStorage</code>) so that your work is preserved across page refreshes. You can clear this data at any time by clicking the "Reset to Blank" option or clearing your browser cache.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-amber-600" /> 3. No Account Registration & No Credit Cards
            </h2>
            <p>
              We do not require user accounts, passwords, email signups, or credit card numbers. You can freely build, evaluate ATS scores, and export PDF resumes anonymously.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" /> 4. PDF Generation Security
            </h2>
            <p>
              PDF file rendering occurs directly within your client browser using HTML canvas and print layout styling. No PDF files are uploaded to external PDF processing servers.
            </p>
          </section>

          <section className="space-y-2 border-t border-gray-100 pt-4">
            <h2 className="text-sm font-bold text-slate-900">5. Contact Us</h2>
            <p>
              If you have any questions regarding our Privacy Policy or data architecture, please contact our team via GitHub.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
