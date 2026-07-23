import { useState } from 'react';
import { FAQ_DATA } from '../utils/faqData';
import { HelpCircle, ChevronDown, Sparkles, Search } from 'lucide-react';

interface FaqPageProps {
  onNavigateHome: () => void;
}

export default function FaqPage({ onNavigateHome }: FaqPageProps) {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'ATS & Scanning', 'Privacy & Pricing', 'Formatting & Export', 'Tips'];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // JSON-LD Schema for Google Rich Snippet FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_DATA.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Inject FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>15 Comprehensive Answers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about building a 100% ATS-friendly resume, data privacy, PDF exports, and bypassing digital gatekeepers.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search FAQs (e.g. ATS score, PDF download, privacy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl transition ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
              <p className="text-xs text-gray-500">No matching questions found for "{searchQuery}".</p>
            </div>
          ) : (
            filteredFaqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? '' : item.id)}
                    className="w-full p-4 text-left flex items-center justify-between space-x-3 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-slate-900">{item.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transform transition-transform ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-700 leading-relaxed border-t border-gray-100 bg-slate-50/50">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Action Callout */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-md text-center space-y-3">
          <h3 className="text-lg font-bold">Ready to build your ATS-winning resume?</h3>
          <p className="text-xs text-blue-100 max-w-md mx-auto">
            100% free forever. Zero registration required. Build and export your resume in less than 5 minutes.
          </p>
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 bg-white text-blue-600 rounded-xl text-xs font-bold shadow-sm hover:bg-blue-50 transition"
          >
            🚀 Launch Free Resume Builder
          </button>
        </div>

      </div>
    </div>
  );
}
