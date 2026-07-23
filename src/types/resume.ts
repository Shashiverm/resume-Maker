export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent?: boolean;
}

export interface Project {
  id: string;
  title: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  link?: string;
  description: string;
  technologies?: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  link?: string;
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
  profileImage?: string;
}

export interface ResumeStyle {
  primaryColor: string;
  fontFamily: 'Inter' | 'Roboto' | 'Outfit' | 'Poppins' | 'Plus Jakarta Sans' | 'Merriweather' | 'Playfair Display' | 'Lora' | 'JetBrains Mono' | 'Fira Code' | 'system-ui';
  fontSize: 'sm' | 'base' | 'lg';
  lineHeight: 'tight' | 'normal' | 'relaxed';
  spacingDensity: 'compact' | 'normal' | 'loose';
  paperSize: 'A4' | 'LETTER';
  backgroundColor: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certificates: Certificate[];
  targetIndustry: string;
  targetJobDescription: string;
  targetCompany?: string;
  style: ResumeStyle;
}

export type TemplateType = 
  | 'standard-ats' 
  | 'modern' 
  | 'executive' 
  | 'minimal' 
  | 'creative' 
  | 'compact' 
  | 'academic'
  | 'tech-code'
  | 'data-analyst'
  | 'sales-growth'
  | 'marketing-pro'
  | 'photo-creative';

export interface AtsScanResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  matchingKeywords: string[];
  missingKeywords: string[];
  checklist: {
    id: string;
    label: string;
    passed: boolean;
    recommendation: string;
    impact: 'critical' | 'important' | 'bonus';
  }[];
  summaryFeedback: string;
}