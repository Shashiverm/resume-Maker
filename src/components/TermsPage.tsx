import { FileCheck, ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onNavigateHome: () => void;
}

export default function TermsPage({ onNavigateHome }: TermsPageProps) {
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
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Fair Open Use License</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Terms & Conditions</h1>
          <p className="text-xs text-slate-500">Effective Date: July 23, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>ATS ResumeMaker</strong>, you agree to comply with and be bound by these Terms and Conditions. Our platform is provided 100% free of charge for personal career and job application use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">2. Free Fair Use & No Subscriptions</h2>
            <p>
              ATS ResumeMaker offers unrestricted access to all builder tools, ATS keyword scanning, template customizations, and PDF exports without fees, subscriptions, or paywalls.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">3. User Content & Authenticity</h2>
            <p>
              You remain 100% responsible for the accuracy, truthfulness, and authenticity of the information entered into your resume. ATS ResumeMaker does not verify candidate work histories or academic credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">4. Disclaimer of Warranties</h2>
            <p>
              While our platform provides real-time ATS optimization guidelines based on standard applicant tracking system algorithms (Workday, Taleo, Greenhouse, Lever), we do not guarantee job placement or interview invitations.
            </p>
          </section>

          <section className="space-y-2 border-t border-gray-100 pt-4">
            <h2 className="text-sm font-bold text-slate-900">5. Modifications to Service</h2>
            <p>
              We reserve the right to modify or update features to improve ATS compatibility and user experience at any time.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
