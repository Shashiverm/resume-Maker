export interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  website?: string;
  github?: string;
  linkedin?: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  certificates?: {
    title: string;
    issuer: string;
    date: string;
    description: string;
    link?: string;
  }[];
  style?: {
    primaryColor: string;
    fontFamily: string;
    fontSize: string;
    backgroundColor: string;
  };
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'professional' | 'technical';