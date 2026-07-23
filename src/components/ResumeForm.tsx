import { useState } from 'react';
import { AtsScanResult, PersonalInfo, Resume } from '../types/resume';
import { 
  PlusCircle, 
  Trash2, 
  User, 
  Briefcase, 
  GraduationCap, 
  FolderKanban, 
  Wrench, 
  Sparkles, 
  Linkedin, 
  Github, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  ChevronUp,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import BulletAssistantModal from './BulletAssistantModal';

interface ResumeFormProps {
  data: Resume;
  onChange: (data: Resume) => void;
  atsResult?: AtsScanResult;
}

export default function ResumeForm({ data, onChange, atsResult }: ResumeFormProps) {
  const [activeExpIndexForBullet, setActiveExpIndexForBullet] = useState<number | null>(null);
  
  // Section Accordion Open States (all open by default for seamless editing)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    experience: true,
    projects: true,
    education: true,
    skills: true,
    certificates: true
  });

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const handleArrayChange = <T extends 'experience' | 'education' | 'projects' | 'skills' | 'certificates'>(
    type: T,
    index: number,
    field: string,
    value: string | boolean | number
  ) => {
    const list = [...(data[type] || [])];
    list[index] = { ...list[index], [field]: value };
    onChange({ ...data, [type]: list });
  };

  const addItem = (type: 'experience' | 'education' | 'projects' | 'skills' | 'certificates') => {
    const id = `${type}-${Date.now()}`;
    let newItem: Record<string, string | boolean>;

    if (type === 'experience') {
      newItem = { id, company: '', position: '', location: '', startDate: '', endDate: '', isCurrent: false, description: '' };
    } else if (type === 'education') {
      newItem = { id, school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '', gpa: '' };
    } else if (type === 'projects') {
      newItem = { id, title: '', role: '', startDate: '', endDate: '', link: '', description: '', technologies: '' };
    } else if (type === 'skills') {
      newItem = { id, name: '', category: 'Technical', level: 'Advanced' };
    } else {
      newItem = { id, title: '', issuer: '', date: '', description: '', link: '' };
    }

    onChange({ ...data, [type]: [...(data[type] || []), newItem] });
  };

  const removeItem = (type: 'experience' | 'education' | 'projects' | 'skills' | 'certificates', index: number) => {
    const list = (data[type] || []).filter((_, i) => i !== index);
    onChange({ ...data, [type]: list });
  };

  const moveItem = <T extends 'experience' | 'education' | 'projects' | 'skills' | 'certificates'>(
    type: T,
    index: number,
    direction: 'up' | 'down'
  ) => {
    const list = [...(data[type] || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    onChange({ ...data, [type]: list });
  };

  const insertBulletText = (bulletText: string) => {
    if (activeExpIndexForBullet === null) return;
    const currentExp = data.experience[activeExpIndexForBullet];
    if (!currentExp) return;

    const existingDesc = currentExp.description || '';
    const newDesc = existingDesc ? `${existingDesc}\n• ${bulletText}` : `• ${bulletText}`;
    
    handleArrayChange('experience', activeExpIndexForBullet, 'description', newDesc);
  };

  const QUICK_SKILL_SUGGESTIONS = ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'AWS', 'Agile / Scrum', 'Project Management', 'Communication', 'Data Analysis'];

  const addQuickSkill = (skillName: string) => {
    const exists = data.skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase());
    if (!exists) {
      const newSkill = { id: `sk-${Date.now()}`, name: skillName, category: 'Technical', level: 'Advanced' as const };
      onChange({ ...data, skills: [...data.skills, newSkill] });
    }
  };

  // Compute Summary word count for real-time validation
  const summaryWordCount = data.personalInfo.summary ? data.personalInfo.summary.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-12">
      
      {/* Live Futuristic ATS Coach Widget */}
      {atsResult && (
        <div className="futuristic-card p-5 rounded-3xl border border-blue-200/80 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl glow-blue">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/30 text-white shrink-0">
                {atsResult.score}%
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-extrabold text-white">Live ATS Optimization Coach</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Grade {atsResult.grade}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">Real-time keyword extraction & resume scoring as you type.</p>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <div className="text-xs font-semibold text-slate-300">
                <span className="text-emerald-400 font-bold">{atsResult.matchingKeywords.length}</span> Keywords Matched
              </div>
            </div>
          </div>

          {/* Missing Keywords Inline Suggestion Bar */}
          {atsResult.missingKeywords.length > 0 && (
            <div className="mt-4 pt-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Suggested Keywords to Boost ATS Score (Click to Add):
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {atsResult.missingKeywords.slice(0, 7).map((kw, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addQuickSkill(kw)}
                    className="group px-2.5 py-1 bg-indigo-950/90 hover:bg-blue-600 text-blue-200 hover:text-white rounded-lg text-xs font-semibold border border-indigo-800/80 hover:border-blue-400 transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                    title={`Click to add ${kw} to your skills list`}
                  >
                    <span>+</span>
                    <span>{kw}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* 1. Personal Information Section Card */}
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-200">
        <button
          onClick={() => toggleSection('personal')}
          className="w-full p-5 sm:p-6 text-left flex items-center justify-between bg-white hover:bg-slate-50/80 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-2xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900">Personal & Contact Details</h2>
                {data.personalInfo.email && data.personalInfo.phone && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Complete
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">Contact information parsed by ATS and recruiters.</p>
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${
              openSections.personal ? 'rotate-180 text-blue-600' : ''
            }`}
          />
        </button>

        {openSections.personal && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-white/60 space-y-4 animate-in fade-in duration-150">
            
            {/* Profile Picture Upload Dropzone */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                {data.personalInfo.profileImage ? (
                  <img
                    src={data.personalInfo.profileImage}
                    alt="Profile Avatar"
                    className="w-12 h-12 rounded-xl object-cover border-2 border-blue-500 shadow-xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">
                    📷 Photo
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Candidate Headshot / Profile Photo</h4>
                  <p className="text-[11px] text-slate-500">Optional for photo-supported templates (Creative, Modern).</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="cursor-pointer px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-2xs transition">
                  {data.personalInfo.profileImage ? 'Change Photo' : 'Upload Headshot'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          handlePersonalInfoChange('profileImage', evt.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>

                {data.personalInfo.profileImage && (
                  <button
                    onClick={() => handlePersonalInfoChange('profileImage', '')}
                    className="px-2.5 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-semibold transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                <input
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
                  placeholder="e.g. Alex"
                  value={data.personalInfo.firstName}
                  onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                <input
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
                  placeholder="e.g. Morgan"
                  value={data.personalInfo.lastName}
                  onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Title *</label>
                <input
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
                  placeholder="e.g. Senior Full Stack Engineer / Growth Marketing Director"
                  value={data.personalInfo.title}
                  onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address *
                </label>
                <input
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
                  placeholder="alex@example.com"
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number *
                </label>
                <input
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
                  placeholder="+1 (555) 123-4567"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location (City, State/Country) *
                </label>
                <input
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
                  placeholder="San Francisco, CA"
                  value={data.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" /> LinkedIn Profile
                </label>
                <input
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
                  placeholder="linkedin.com/in/username"
                  value={data.personalInfo.linkedin || ''}
                  onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" /> Portfolio Website
                </label>
                <input
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
                  placeholder="https://yourportfolio.com"
                  value={data.personalInfo.website || ''}
                  onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 text-slate-800" /> GitHub Username
                </label>
                <input
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
                  placeholder="github-username"
                  value={data.personalInfo.github || ''}
                  onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700">Professional Summary (30–60 words)</label>
                  <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-full ${summaryWordCount >= 25 && summaryWordCount <= 100 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {summaryWordCount} words {summaryWordCount >= 25 && summaryWordCount <= 100 ? '✓ Ideal ATS Length' : ''}
                  </span>
                </div>
                <textarea
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
                  placeholder="Results-oriented professional with 5+ years of experience in..."
                  rows={4}
                  value={data.personalInfo.summary}
                  onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Professional Experience Card */}
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-200">
        <button
          onClick={() => toggleSection('experience')}
          className="w-full p-5 sm:p-6 text-left flex items-center justify-between bg-white hover:bg-slate-50/80 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shadow-2xs">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900">Work Experience</h2>
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-200">
                  {data.experience.length} Roles
                </span>
              </div>
              <p className="text-xs text-slate-500">List roles in reverse chronological order with metric bullets.</p>
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${
              openSections.experience ? 'rotate-180 text-indigo-600' : ''
            }`}
          />
        </button>

        {openSections.experience && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-white/60 space-y-5 animate-in fade-in duration-150">
            <div className="flex justify-end pt-2">
              <button
                onClick={() => addItem('experience')}
                className="flex items-center px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition transform hover:scale-[1.02]"
              >
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Add Role
              </button>
            </div>

            {data.experience.length === 0 ? (
              <div className="p-8 text-center bg-slate-50/80 rounded-2xl border border-dashed border-slate-300">
                <p className="text-xs text-slate-500 mb-3">No work experience added yet.</p>
                <button
                  onClick={() => addItem('experience')}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition"
                >
                  + Add First Role
                </button>
              </div>
            ) : (
              data.experience.map((exp, index) => (
                <div key={exp.id || index} className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-2xs transition hover:border-slate-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
                        Role #{index + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate max-w-[150px] sm:max-w-xs">
                        {exp.position || 'Untitled Position'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => moveItem('experience', index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition"
                        title="Move up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveItem('experience', index, 'down')}
                        disabled={index === data.experience.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition"
                        title="Move down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem('experience', index)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition"
                        title="Remove role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Position Title *</label>
                      <input
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                        placeholder="e.g. Senior Software Engineer"
                        value={exp.position}
                        onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Company Name *</label>
                      <input
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                        placeholder="e.g. Google / CloudScale"
                        value={exp.company}
                        onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Location</label>
                      <input
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                        placeholder="e.g. San Francisco, CA / Remote"
                        value={exp.location}
                        onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Employment Dates</label>
                      <div className="flex items-center gap-2">
                        <input
                          className="w-1/2 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white focus:outline-none transition"
                          placeholder="Start (Jan 2021)"
                          value={exp.startDate}
                          onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                        />
                        <input
                          className="w-1/2 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white focus:outline-none transition disabled:bg-slate-100 disabled:text-slate-400"
                          placeholder={exp.isCurrent ? 'Present' : 'End (Dec 2023)'}
                          disabled={exp.isCurrent}
                          value={exp.isCurrent ? 'Present' : exp.endDate}
                          onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={Boolean(exp.isCurrent)}
                      onChange={(e) => {
                        handleArrayChange('experience', index, 'isCurrent', e.target.checked);
                        if (e.target.checked) handleArrayChange('experience', index, 'endDate', 'Present');
                      }}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <label htmlFor={`current-${index}`} className="text-xs font-medium text-slate-700 cursor-pointer">
                      I currently work in this role
                    </label>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <label className="text-xs font-bold text-slate-700">Bullet Points & Impact Metrics</label>
                      <button
                        type="button"
                        onClick={() => setActiveExpIndexForBullet(index)}
                        className="flex items-center px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-[11px] font-semibold transition"
                      >
                        <Sparkles className="w-3 h-3 mr-1 text-amber-600" />
                        Action Verbs Helper
                      </button>
                    </div>

                    <textarea
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white focus:outline-none text-slate-800 font-sans"
                      rows={4}
                      placeholder="• Spearheaded architectural overhaul of SaaS backend, boosting system throughput by 40%..."
                      value={exp.description}
                      onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 3. Featured Projects Card */}
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-200">
        <button
          onClick={() => toggleSection('projects')}
          className="w-full p-5 sm:p-6 text-left flex items-center justify-between bg-white hover:bg-slate-50/80 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shadow-2xs">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900">Featured Projects</h2>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
                  {data.projects?.length || 0} Projects
                </span>
              </div>
              <p className="text-xs text-slate-500">Showcase software apps, key initiatives, or portfolio projects.</p>
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${
              openSections.projects ? 'rotate-180 text-emerald-600' : ''
            }`}
          />
        </button>

        {openSections.projects && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-white/60 space-y-4 animate-in fade-in duration-150">
            <div className="flex justify-end pt-2">
              <button
                onClick={() => addItem('projects')}
                className="flex items-center px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition transform hover:scale-[1.02]"
              >
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Add Project
              </button>
            </div>

            {data.projects?.length === 0 ? (
              <div className="p-6 text-center bg-slate-50/80 rounded-2xl border border-dashed border-slate-300">
                <p className="text-xs text-slate-500 mb-2">No projects added yet.</p>
                <button
                  onClick={() => addItem('projects')}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition"
                >
                  + Add Project
                </button>
              </div>
            ) : (
              data.projects?.map((proj, index) => (
                <div key={proj.id || index} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                      Project #{index + 1}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => moveItem('projects', index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveItem('projects', index, 'down')}
                        disabled={index === (data.projects?.length || 0) - 1}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem('projects', index)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white focus:outline-none transition"
                      placeholder="Project Name (e.g. DevPulse Platform)"
                      value={proj.title}
                      onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                    />

                    <input
                      className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white focus:outline-none transition"
                      placeholder="Role (e.g. Lead Developer)"
                      value={proj.role || ''}
                      onChange={(e) => handleArrayChange('projects', index, 'role', e.target.value)}
                    />

                    <input
                      className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white focus:outline-none transition"
                      placeholder="Technologies (React, Node.js, AWS)"
                      value={proj.technologies || ''}
                      onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
                    />

                    <input
                      className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white focus:outline-none transition"
                      placeholder="Project Link (https://...)"
                      value={proj.link || ''}
                      onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
                    />
                  </div>

                  <textarea
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white focus:outline-none"
                    rows={2}
                    placeholder="Brief description of the project outcome..."
                    value={proj.description}
                    onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 4. Education Card */}
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-200">
        <button
          onClick={() => toggleSection('education')}
          className="w-full p-5 sm:p-6 text-left flex items-center justify-between bg-white hover:bg-slate-50/80 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl shadow-2xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900">Education</h2>
                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-full border border-purple-200">
                  {data.education.length} Entries
                </span>
              </div>
              <p className="text-xs text-slate-500">Degrees, academic honors, and university credentials.</p>
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${
              openSections.education ? 'rotate-180 text-purple-600' : ''
            }`}
          />
        </button>

        {openSections.education && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-white/60 space-y-4 animate-in fade-in duration-150">
            <div className="flex justify-end pt-2">
              <button
                onClick={() => addItem('education')}
                className="flex items-center px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-sm transition transform hover:scale-[1.02]"
              >
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Add School
              </button>
            </div>

            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
                    School #{index + 1}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => moveItem('education', index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItem('education', index, 'down')}
                      disabled={index === data.education.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem('education', index)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 focus:bg-white focus:outline-none transition"
                    placeholder="University (UC Berkeley)"
                    value={edu.school}
                    onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)}
                  />

                  <input
                    className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 focus:bg-white focus:outline-none transition"
                    placeholder="Degree (Bachelor of Science)"
                    value={edu.degree}
                    onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                  />

                  <input
                    className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 focus:bg-white focus:outline-none transition"
                    placeholder="Field of Study (Computer Science)"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleArrayChange('education', index, 'fieldOfStudy', e.target.value)}
                  />

                  <div className="flex gap-2">
                    <input
                      className="w-1/2 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 focus:bg-white focus:outline-none transition"
                      placeholder="Start (2015)"
                      value={edu.startDate}
                      onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)}
                    />
                    <input
                      className="w-1/2 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 focus:bg-white focus:outline-none transition"
                      placeholder="End (2019)"
                      value={edu.endDate}
                      onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Core Skills Card */}
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-200">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full p-5 sm:p-6 text-left flex items-center justify-between bg-white hover:bg-slate-50/80 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shadow-2xs">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900">Skills & Competencies</h2>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full border border-amber-200">
                  {data.skills.length} Listed
                </span>
              </div>
              <p className="text-xs text-slate-500">Tools, frameworks, languages, and technical expertise.</p>
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${
              openSections.skills ? 'rotate-180 text-amber-600' : ''
            }`}
          />
        </button>

        {openSections.skills && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-white/60 space-y-4 animate-in fade-in duration-150">
            <div className="flex justify-end pt-2">
              <button
                onClick={() => addItem('skills')}
                className="flex items-center px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition transform hover:scale-[1.02]"
              >
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Add Skill
              </button>
            </div>

            {/* Quick Skill Chips */}
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/70 space-y-2">
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> 1-Tap Popular Additions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_SKILL_SUGGESTIONS.map((skillName) => (
                  <button
                    key={skillName}
                    type="button"
                    onClick={() => addQuickSkill(skillName)}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-medium transition cursor-pointer"
                  >
                    + {skillName}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.skills.map((skill, index) => (
                <div key={skill.id || index} className="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <input
                    className="flex-grow text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none font-medium"
                    placeholder="Skill Name (React, SQL)"
                    value={skill.name}
                    onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                  />

                  <select
                    className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
                    value={skill.level}
                    onChange={(e) => handleArrayChange('skills', index, 'level', e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>

                  <button
                    onClick={() => removeItem('skills', index)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bullet Assistant Modal */}
      <BulletAssistantModal
        isOpen={activeExpIndexForBullet !== null}
        onClose={() => setActiveExpIndexForBullet(null)}
        onSelectBullet={insertBulletText}
      />

    </div>
  );
}