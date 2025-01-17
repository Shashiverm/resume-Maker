import React, { useState } from 'react';
import { FileText, Download, Eye, Settings } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { Resume, TemplateType } from './types/resume';
import Footer from './components/Footer';

const initialData: Resume = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    website: '',
    github: '',
  },
  education: [],
  experience: [],
  skills: [],
  certificates: [],
  style: {
    primaryColor: '#2563eb',
    fontFamily: 'system-ui',
    fontSize: 'base',
    backgroundColor: 'white',
  },
};

function App() {
  const [data, setData] = useState<Resume>(initialData);
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [view, setView] = useState<'form' | 'preview'>('form');
  const [showStyleSettings, setShowStyleSettings] = useState(false);

  const handleDownload = () => {
    window.print();
  };

  const handleStyleChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      style: {
        ...prev.style!,
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16">
            <div className="flex items-center mb-4 sm:mb-0">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Resume Builder</span>
            </div>
            <div className="flex flex-wrap items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <select
                className="input-field mb-2 sm:mb-0 w-full sm:w-auto"
                value={template}
                onChange={(e) => setTemplate(e.target.value as TemplateType)}
              >
                <option value="modern">Modern Template</option>
                <option value="classic">Classic Template</option>
                <option value="minimal">Minimal Template</option>
                <option value="professional">Professional Template</option>
                <option value="technical">Technical Template</option>
              </select>
              <button
                onClick={() => setShowStyleSettings(!showStyleSettings)}
                className="btn-secondary w-full sm:w-auto"
              >
                <Settings className="h-5 w-5 mr-2" />
                Style
              </button>
              <button
                onClick={() => setView(view === 'form' ? 'preview' : 'form')}
                className="btn-secondary w-full sm:w-auto"
              >
                {view === 'form' ? (
                  <>
                    <Eye className="h-5 w-5 mr-2" />
                    Preview
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 mr-2" />
                    Edit
                  </>
                )}
              </button>
              <button onClick={handleDownload} className="btn-primary w-full sm:w-auto">
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showStyleSettings && (
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                <input
                  type="color"
                  value={data.style?.primaryColor}
                  onChange={(e) => handleStyleChange('primaryColor', e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Font Family</label>
                <select
                  value={data.style?.fontFamily}
                  onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                  className="input-field"
                >
                  <option value="system-ui">System UI</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Monospace</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Font Size</label>
                <select
                  value={data.style?.fontSize}
                  onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                  className="input-field"
                >
                  <option value="sm">Small</option>
                  <option value="base">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Background Color</label>
                <input
                  type="color"
                  value={data.style?.backgroundColor}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {view === 'form' ? (
          <ResumeForm data={data} onChange={setData} />
        ) : (
          <ResumePreview data={data} template={template} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

