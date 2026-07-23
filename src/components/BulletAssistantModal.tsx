import { useState } from 'react';
import { Sparkles, X, Check, Lightbulb } from 'lucide-react';
import { ACTION_VERBS } from '../utils/presetData';

interface BulletAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBullet: (bulletText: string) => void;
}

export default function BulletAssistantModal({
  isOpen,
  onClose,
  onSelectBullet
}: BulletAssistantModalProps) {
  const [activeTab, setActiveTab] = useState<'verbs' | 'formula' | 'examples'>('verbs');
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (verb: string) => {
    onSelectBullet(verb + ' ');
    setCopiedVerb(verb);
    setTimeout(() => setCopiedVerb(null), 1500);
  };

  const SAMPLE_BULLETS = [
    'Spearheaded development of a microservices backend, boosting API throughput by 40% and reducing latency by 120ms.',
    'Engineered an automated CI/CD pipeline, reducing deployment failure rates by 65% and saving 15 engineering hours weekly.',
    'Orchestrated multi-channel paid acquisition strategy with $200k budget, driving 150% growth in qualified sales leads.',
    'Restructured database query indexing strategy, reducing server load by 35% during peak traffic hours.',
    'Managed cross-functional team of 8 designers and developers to deliver enterprise product MVP 2 weeks ahead of schedule.'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-base">Smart Bullet & Action Verb Assistant</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('verbs')}
            className={`flex-1 py-3 text-center border-b-2 transition ${
              activeTab === 'verbs'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            🔥 Power Action Verbs
          </button>
          <button
            onClick={() => setActiveTab('formula')}
            className={`flex-1 py-3 text-center border-b-2 transition ${
              activeTab === 'formula'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            🎯 100% ATS Bullet Formula
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`flex-1 py-3 text-center border-b-2 transition ${
              activeTab === 'examples'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            💡 High-Impact Examples
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-700">
          
          {activeTab === 'verbs' && (
            <div className="space-y-4">
              <p className="text-gray-600 text-xs">
                Click any action verb to insert it directly into your bullet point text.
              </p>

              {Object.entries(ACTION_VERBS).map(([category, verbs]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-blue-700">
                    {category} Verbs
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {verbs.map((verb) => (
                      <button
                        key={verb}
                        onClick={() => handleCopy(verb)}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-gray-200 rounded-md font-medium transition cursor-pointer text-xs flex items-center"
                      >
                        {copiedVerb === verb ? (
                          <Check className="w-3 h-3 mr-1 text-emerald-600" />
                        ) : null}
                        {verb}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'formula' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                <span className="font-bold text-blue-900 text-xs uppercase tracking-wide block">
                  The Winning ATS Bullet Formula
                </span>
                <div className="text-sm font-semibold text-slate-800 bg-white p-3 rounded-lg border border-blue-100 font-mono text-center">
                  [Strong Action Verb] + [Context / Skill / Technology] + [Quantifiable Impact / Result (% or $)]
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-900">Why Metrics Matter to ATS & Recruiters:</h4>
                <ul className="space-y-2 list-disc list-inside text-gray-600 leading-relaxed">
                  <li><strong>Numbers grab eyes</strong>: Bullet points with numbers get 70% higher recruiter engagement.</li>
                  <li><strong>Avoid passive language</strong>: Use "Architected" instead of "Responsible for building".</li>
                  <li><strong>Focus on outcomes</strong>: Explain <em>what changed</em> as a result of your work.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-3">
              <p className="text-gray-600">
                Click any high-impact bullet point to insert it into your active entry:
              </p>

              <div className="space-y-2">
                {SAMPLE_BULLETS.map((bullet, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onSelectBullet(bullet);
                      onClose();
                    }}
                    className="p-3 bg-gray-50 hover:bg-blue-50/70 border border-gray-200 hover:border-blue-300 rounded-xl cursor-pointer transition text-gray-800 flex items-start space-x-2 group"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 group-hover:scale-110 transition" />
                    <span className="flex-grow font-normal leading-normal">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-semibold transition"
          >
            Close Assistant
          </button>
        </div>

      </div>
    </div>
  );
}
