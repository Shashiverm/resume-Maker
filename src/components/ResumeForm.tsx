import React from 'react';
import { PersonalInfo, Education, Experience, Skill, Resume } from '../types/resume';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface ResumeFormProps {
  data: Resume;
  onChange: (data: Resume) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const handleArrayChange = <T extends keyof Resume>(
    type: T,
    index: number,
    field: string,
    value: string
  ) => {
    const newArray = [...(data[type] as any[])];
    newArray[index] = { ...newArray[index], [field]: value };
    onChange({ ...data, [type]: newArray });
  };

  const addItem = <T extends keyof Resume>(type: T) => {
    let newItem: any;
    
    switch (type) {
      case 'skills':
        newItem = { name: '', level: 'Beginner' };
        break;
      case 'education':
        newItem = { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' };
        break;
      case 'experience':
        newItem = { company: '', position: '', location: '', startDate: '', endDate: '', description: '' };
        break;
      case 'certificates':
        newItem = { title: '', issuer: '', date: '', description: '', link: '' };
        break;
      default:
        return;
    }
    
    onChange({ ...data, [type]: [...(data[type] as any[] || []), newItem] });
  };

  const removeItem = <T extends keyof Resume>(type: T, index: number) => {
    onChange({
      ...data,
      [type]: (data[type] as any[]).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="input-field"
            placeholder="First Name"
            value={data.personalInfo.firstName}
            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Last Name"
            value={data.personalInfo.lastName}
            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Phone"
            value={data.personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
          />
          <input
            className="input-field col-span-2"
            placeholder="Professional Title"
            value={data.personalInfo.title}
            onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
          />
          <input
            className="input-field col-span-2"
            placeholder="Location"
            value={data.personalInfo.location}
            onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Website (optional)"
            value={data.personalInfo.website}
            onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
          />
          <input
            className="input-field"
            placeholder="GitHub Username (optional)"
            value={data.personalInfo.github}
            onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
          />
          <textarea
            className="input-field col-span-2"
            placeholder="Professional Summary"
            rows={4}
            value={data.personalInfo.summary}
            onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Experience</h2>
          <button
            onClick={() => addItem('experience')}
            className="text-blue-600 hover:text-blue-800"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-6 border-b pb-4 last:border-0">
            <div className="grid grid-cols-2 gap-4">
              <input
                className="input-field"
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  handleArrayChange('experience', index, 'company', e.target.value)
                }
              />
              <input
                className="input-field"
                placeholder="Position"
                value={exp.position}
                onChange={(e) =>
                  handleArrayChange('experience', index, 'position', e.target.value)
                }
              />
              <input
                className="input-field"
                placeholder="Location"
                value={exp.location}
                onChange={(e) =>
                  handleArrayChange('experience', index, 'location', e.target.value)
                }
              />
              <div className="flex gap-2">
                <input
                  className="input-field"
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleArrayChange('experience', index, 'startDate', e.target.value)
                  }
                />
                <input
                  className="input-field"
                  type="date"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleArrayChange('experience', index, 'endDate', e.target.value)
                  }
                />
              </div>
              <textarea
                className="input-field col-span-2"
                placeholder="Description"
                rows={3}
                value={exp.description}
                onChange={(e) =>
                  handleArrayChange('experience', index, 'description', e.target.value)
                }
              />
            </div>
            <button
              onClick={() => removeItem('experience', index)}
              className="text-red-600 hover:text-red-800 mt-2"
            >
              <MinusCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            onClick={() => addItem('education')}
            className="text-blue-600 hover:text-blue-800"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-6 border-b pb-4 last:border-0">
            <div className="grid grid-cols-2 gap-4">
              <input
                className="input-field"
                placeholder="School"
                value={edu.school}
                onChange={(e) =>
                  handleArrayChange('education', index, 'school', e.target.value)
                }
              />
              <input
                className="input-field"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleArrayChange('education', index, 'degree', e.target.value)
                }
              />
              <input
                className="input-field"
                placeholder="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) =>
                  handleArrayChange('education', index, 'fieldOfStudy', e.target.value)
                }
              />
              <div className="flex gap-2">
                <input
                  className="input-field"
                  type="date"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleArrayChange('education', index, 'startDate', e.target.value)
                  }
                />
                <input
                  className="input-field"
                  type="date"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleArrayChange('education', index, 'endDate', e.target.value)
                  }
                />
              </div>
              <textarea
                className="input-field col-span-2"
                placeholder="Description"
                rows={3}
                value={edu.description}
                onChange={(e) =>
                  handleArrayChange('education', index, 'description', e.target.value)
                }
              />
            </div>
            <button
              onClick={() => removeItem('education', index)}
              className="text-red-600 hover:text-red-800 mt-2"
            >
              <MinusCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <button
            onClick={() => addItem('skills')}
            className="text-blue-600 hover:text-blue-800"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>
        {data.skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <input
              className="input-field flex-1"
              placeholder="Skill"
              value={skill.name}
              onChange={(e) =>
                handleArrayChange('skills', index, 'name', e.target.value)
              }
            />
            <select
              className="input-field w-40"
              value={skill.level}
              onChange={(e) =>
                handleArrayChange('skills', index, 'level', e.target.value)
              }
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <button
              onClick={() => removeItem('skills', index)}
              className="text-red-600 hover:text-red-800"
            >
              <MinusCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Certificates</h2>
          <button
            onClick={() => addItem('certificates')}
            className="text-blue-600 hover:text-blue-800"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>
        {data.certificates?.map((cert, index) => (
          <div key={index} className="mb-6 border-b pb-4 last:border-0">
            <div className="grid grid-cols-2 gap-4">
              <input
                className="input-field"
                placeholder="Certificate Title"
                value={cert.title}
                onChange={(e) =>
                  handleArrayChange('certificates', index, 'title', e.target.value)
                }
              />
              <input
                className="input-field"
                placeholder="Issuer"
                value={cert.issuer}
                onChange={(e) =>
                  handleArrayChange('certificates', index, 'issuer', e.target.value)
                }
              />
              <input
                className="input-field"
                type="date"
                value={cert.date}
                onChange={(e) =>
                  handleArrayChange('certificates', index, 'date', e.target.value)
                }
              />
              <input
                className="input-field"
                placeholder="Certificate Link (optional)"
                value={cert.link}
                onChange={(e) =>
                  handleArrayChange('certificates', index, 'link', e.target.value)
                }
              />
              <textarea
                className="input-field col-span-2"
                placeholder="Description"
                rows={2}
                value={cert.description}
                onChange={(e) =>
                  handleArrayChange('certificates', index, 'description', e.target.value)
                }
              />
            </div>
            <button
              onClick={() => removeItem('certificates', index)}
              className="text-red-600 hover:text-red-800 mt-2"
            >
              <MinusCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}