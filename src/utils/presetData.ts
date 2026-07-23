import { Resume } from '../types/resume';

export const ACTION_VERBS = {
  Leadership: [
    'Spearheaded', 'Directed', 'Orchestrated', 'Championed', 'Led', 
    'Transformed', 'Formulated', 'Navigated', 'Supervised', 'Executed'
  ],
  Technical: [
    'Architected', 'Implemented', 'Engineered', 'Deployed', 'Refactored', 
    'Optimized', 'Automated', 'Scaled', 'Configured', 'Debugged'
  ],
  Analytics: [
    'Analyzed', 'Evaluated', 'Forecasted', 'Quantified', 'Synthesized', 
    'Identified', 'Benchmarked', 'Modeled', 'Discovered', 'Measured'
  ],
  Growth: [
    'Accelerated', 'Expanded', 'Boosted', 'Captured', 'Generated', 
    'Maximized', 'Increased', 'Retained', 'Outperformed', 'Drive'
  ],
  Efficiency: [
    'Streamlined', 'Reduced', 'Consolidated', 'Eliminated', 'Standardized', 
    'Restructured', 'Automated', 'Mitigated', 'Simplified', 'Modernized'
  ]
};

export const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  'Software Engineering': [
    'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes',
    'CI/CD', 'REST API', 'GraphQL', 'Microservices', 'Git', 'Agile', 'Scrum',
    'Unit Testing', 'System Design', 'SQL', 'NoSQL', 'Performance Optimization'
  ],
  'Data Science & Analytics': [
    'Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow', 'PyTorch',
    'Pandas', 'Tableau', 'Power BI', 'Data Visualization', 'A/B Testing',
    'Statistical Modeling', 'BigQuery', 'Spark', 'ETL Pipelines', 'Scikit-learn'
  ],
  'Product Management': [
    'Product Strategy', 'Roadmap Creation', 'User Research', 'A/B Testing',
    'Agile/Scrum', 'KPI Tracking', 'Cross-functional Leadership', 'Wireframing',
    'Stakeholder Management', 'Customer Journey', 'Go-to-Market (GTM)', 'PRD'
  ],
  'Digital Marketing': [
    'SEO', 'SEM', 'Google Analytics', 'Content Strategy', 'Social Media Ads',
    'Conversion Rate Optimization (CRO)', 'Email Marketing', 'PPC', 'HubSpot',
    'Brand Strategy', 'ROI Optimization', 'Copywriting', 'Campaign Management'
  ],
  'Finance & Accounting': [
    'Financial Modeling', 'Forecasting', 'Budgeting', 'Variance Analysis',
    'GAAP', 'Audit', 'ERP Systems', 'SAP', 'Excel (VLOOKUP/Pivot)',
    'Financial Statements', 'Risk Assessment', 'Cash Flow Management'
  ],
  'Healthcare & Nursing': [
    'Patient Care', 'Electronic Health Records (EHR)', 'Triage', 'HIPAA Compliance',
    'Vital Signs Monitoring', 'Patient Assessment', 'Medication Administration',
    'Clinical Documentation', 'Acute Care', 'BLS/ACLS'
  ]
};

export const DEMO_RESUMES: Record<string, Resume> = {
  softwareEngineer: {
    personalInfo: {
      firstName: 'Alex',
      lastName: 'Morgan',
      email: 'alex.morgan@techmail.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      title: 'Senior Full Stack Engineer',
      summary: 'Results-oriented Senior Full Stack Engineer with 6+ years of experience designing and scaling microservices and web applications. Proven track record of boosting application performance by 40% and leading high-velocity engineering teams.',
      website: 'https://alexmorgan.dev',
      github: 'alexmorgan-dev',
      linkedin: 'linkedin.com/in/alexmorgan-tech'
    },
    experience: [
      {
        id: 'exp-1',
        company: 'CloudScale Technologies',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: 'Jan 2022',
        endDate: 'Present',
        isCurrent: true,
        description: '• Spearheaded architectural overhaul of core SaaS dashboard using React, TypeScript, and Node.js, improving page load speeds by 45%.\n• Engineered distributed event streaming pipeline using Kafka and Docker, handling over 10M daily user events with 99.99% uptime.\n• Mentored 5 junior engineers and introduced automated CI/CD workflows, reducing release deployment cycles from 2 weeks to 3 days.'
      },
      {
        id: 'exp-2',
        company: 'Nexus Software Solutions',
        position: 'Full Stack Engineer',
        location: 'San Jose, CA',
        startDate: 'Jun 2019',
        endDate: 'Dec 2021',
        isCurrent: false,
        description: '• Developed RESTful APIs and GraphQL endpoints for mobile app backend serving 500k+ monthly active users.\n• Optimized SQL query performance and database indexing, cutting server response times by 30%.\n• Championed unit testing and integration test coverage from 40% to 85% using Jest and Cypress.'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'DevPulse - Developer Productivity Metrics Platform',
        role: 'Creator & Core Maintainer',
        startDate: '2023',
        endDate: '2023',
        link: 'https://github.com/alexmorgan-dev/devpulse',
        description: 'Built an open-source telemetry engine that tracks GitHub commit analytics and team velocity using React and Go.',
        technologies: 'React, Go, PostgreSQL, Docker, Tailwind CSS'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2015',
        endDate: '2019',
        description: 'Graduated Magna Cum Laude. President of Computer Science Undergraduate Society.',
        gpa: '3.85'
      }
    ],
    skills: [
      { id: 's1', name: 'TypeScript / JavaScript', category: 'Frontend', level: 'Expert' },
      { id: 's2', name: 'React & Next.js', category: 'Frontend', level: 'Expert' },
      { id: 's3', name: 'Node.js & Express', category: 'Backend', level: 'Advanced' },
      { id: 's4', name: 'Python & Django', category: 'Backend', level: 'Advanced' },
      { id: 's5', name: 'AWS & Kubernetes', category: 'DevOps', level: 'Intermediate' },
      { id: 's6', name: 'SQL & PostgreSQL', category: 'Database', level: 'Advanced' }
    ],
    certificates: [
      {
        id: 'c1',
        title: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        date: '2023',
        description: 'Demonstrated expertise in designing scalable distributed systems on AWS.'
      }
    ],
    targetIndustry: 'Software Engineering',
    targetJobDescription: 'Seeking a Senior Full Stack Engineer proficient in React, TypeScript, Node.js, AWS microservices, and system architecture optimization.',
    targetCompany: 'Google',
    style: {
      primaryColor: '#2563eb',
      fontFamily: 'Inter',
      fontSize: 'base',
      lineHeight: 'normal',
      spacingDensity: 'normal',
      paperSize: 'A4',
      backgroundColor: '#ffffff'
    }
  },
  marketingManager: {
    personalInfo: {
      firstName: 'Sarah',
      lastName: 'Jenkins',
      email: 'sarah.jenkins@marketpro.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      title: 'Digital Marketing & Growth Director',
      summary: 'Data-driven Growth Marketing Director with 7+ years leading multi-channel acquisition campaigns. Generated $4.2M+ in pipeline revenue and scaled customer acquisition by 180% year-over-year.',
      website: 'https://sarahjenkinsmarketing.com',
      linkedin: 'linkedin.com/in/sarahjenkins-marketing'
    },
    experience: [
      {
        id: 'exp-1',
        company: 'Vanguard Growth Media',
        position: 'Director of Growth Marketing',
        location: 'New York, NY',
        startDate: 'Feb 2021',
        endDate: 'Present',
        isCurrent: true,
        description: '• Managed $1.5M annual ad budget across Google Ads, Meta, and LinkedIn, decreasing CAC by 28% while doubling qualified lead volume.\n• Orchestrated enterprise SEO revamp targeting 150+ high-intent keywords, driving organic search traffic up by 210%.\n• Built automated email drip campaigns in HubSpot, elevating lead-to-customer conversion rates from 3.2% to 7.8%.'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Rebrand & Product Hunt Launch Campaign',
        role: 'Lead Strategist',
        startDate: '2022',
        endDate: '2022',
        description: 'Spearheaded Product Hunt launch that achieved #1 Product of the Day with 2,400+ upvotes and 15,000 signups in 48 hours.',
        technologies: 'Product Hunt, Google Analytics, Copywriting, Social Ads'
      }
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Columbia University',
        degree: 'Bachelor of Arts',
        fieldOfStudy: 'Marketing & Communications',
        startDate: '2013',
        endDate: '2017',
        description: 'Dean’s List recipient. Chief Editor of Campus Marketing Journal.',
        gpa: '3.90'
      }
    ],
    skills: [
      { id: 's1', name: 'SEO & SEM Strategy', level: 'Expert' },
      { id: 's2', name: 'Google Analytics 4 & Mixpanel', level: 'Expert' },
      { id: 's3', name: 'Conversion Rate Optimization (CRO)', level: 'Advanced' },
      { id: 's4', name: 'HubSpot & Marketo', level: 'Advanced' }
    ],
    certificates: [
      {
        id: 'c1',
        title: 'Google Analytics Individual Qualification (GAIQ)',
        issuer: 'Google',
        date: '2023'
      }
    ],
    targetIndustry: 'Digital Marketing',
    targetJobDescription: 'Looking for a Senior Growth Marketing Lead to manage paid acquisition, SEO, CRO, and analytics tracking.',
    targetCompany: 'HubSpot',
    style: {
      primaryColor: '#059669',
      fontFamily: 'Roboto',
      fontSize: 'base',
      lineHeight: 'normal',
      spacingDensity: 'normal',
      paperSize: 'A4',
      backgroundColor: '#ffffff'
    }
  },
  dataAnalyst: {
    personalInfo: {
      firstName: 'David',
      lastName: 'Chen',
      email: 'david.chen@dataworks.io',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      title: 'Lead Data Analyst & Business Intelligence Specialist',
      summary: 'Insight-driven Lead Data Analyst with 5+ years of experience transforming complex datasets into actionable business strategies. Expert in Python, SQL, Tableau, and automated ETL pipelines, increasing executive decision efficiency by 35%.',
      website: 'https://davidchen-data.io',
      github: 'davidchen-analytics',
      linkedin: 'linkedin.com/in/davidchen-data'
    },
    experience: [
      {
        id: 'exp-d1',
        company: 'DataMetrics Corp',
        position: 'Lead Data Analyst',
        location: 'Austin, TX',
        startDate: 'Mar 2022',
        endDate: 'Present',
        isCurrent: true,
        description: '• Architected executive Tableau dashboards visualizing $50M+ ARR across 12 product lines, cutting monthly reporting overhead by 80 hours.\n• Conducted A/B testing models using Python (SciPy, Statsmodels) on 2M user sessions, identifying user drop-off bottlenecks and boosting retention by 14%.\n• Designed automated Snowflake SQL pipelines to ingest multi-source marketing data with 99.9% data reliability.'
      },
      {
        id: 'exp-d2',
        company: 'FinTech Solutions',
        position: 'Data Analyst',
        location: 'Dallas, TX',
        startDate: 'Jul 2019',
        endDate: 'Feb 2022',
        isCurrent: false,
        description: '• Analyzed transaction logs using SQL and pandas to detect fraudulent patterns, reducing chargeback losses by $340k annually.\n• Built automated KPI email notifications using Python scripts and AWS Lambda.'
      }
    ],
    projects: [
      {
        id: 'proj-d1',
        title: 'Predictive Churn Model & Dashboard',
        role: 'Data Scientist',
        startDate: '2023',
        endDate: '2023',
        description: 'Developed Random Forest classifier achieving 89% accuracy in predicting customer subscription cancellations.',
        technologies: 'Python, Scikit-learn, SQL, Tableau, Streamlit'
      }
    ],
    education: [
      {
        id: 'edu-d1',
        school: 'University of Texas at Austin',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Statistics & Data Science',
        startDate: '2015',
        endDate: '2019',
        description: 'Capstones in predictive analytics and financial econometrics.',
        gpa: '3.88'
      }
    ],
    skills: [
      { id: 'ds1', name: 'SQL (PostgreSQL, Snowflake, BigQuery)', level: 'Expert' },
      { id: 'ds2', name: 'Python (Pandas, NumPy, Scikit-learn)', level: 'Expert' },
      { id: 'ds3', name: 'Tableau & Power BI', level: 'Expert' },
      { id: 'ds4', name: 'Statistical Modeling & A/B Testing', level: 'Advanced' },
      { id: 'ds5', name: 'ETL Pipeline Automation (Airflow)', level: 'Advanced' }
    ],
    certificates: [
      {
        id: 'dc1',
        title: 'Tableau Desktop Certified Professional',
        issuer: 'Tableau',
        date: '2023'
      }
    ],
    targetIndustry: 'Data Science & Analytics',
    targetJobDescription: 'Seeking Senior Data Analyst role focusing on SQL modeling, Tableau dashboards, Python data pipelines, and business intelligence.',
    targetCompany: 'Meta',
    style: {
      primaryColor: '#7c3aed',
      fontFamily: 'JetBrains Mono',
      fontSize: 'base',
      lineHeight: 'normal',
      spacingDensity: 'normal',
      paperSize: 'A4',
      backgroundColor: '#ffffff'
    }
  },
  salesDirector: {
    personalInfo: {
      firstName: 'Marcus',
      lastName: 'Vance',
      email: 'marcus.vance@salesleader.com',
      phone: '+1 (555) 876-5432',
      location: 'Chicago, IL',
      title: 'Enterprise Sales Director & Revenue Leader',
      summary: 'High-performing Enterprise Sales Leader with 8+ years exceeding quota in B2B SaaS and cloud software. Consistently achieved 140%+ of annual revenue targets, closing over $18M in cumulative contract value (ACV).',
      linkedin: 'linkedin.com/in/marcusvance-sales'
    },
    experience: [
      {
        id: 'exp-s1',
        company: 'Apex Cloud Systems',
        position: 'Enterprise Sales Director',
        location: 'Chicago, IL',
        startDate: 'Jan 2021',
        endDate: 'Present',
        isCurrent: true,
        description: '• Delivered $6.4M in ARR (145% of $4.4M quota) in 2023 by closing 8 fortune 500 enterprise accounts.\n• Led a team of 6 Account Executives, coaching them on MEDDPICC sales methodology and increasing average deal size by 35%.\n• Negotiated multi-year enterprise contracts ranging from $250k to $1.2M ACV with legal and C-level stakeholders.'
      },
      {
        id: 'exp-s2',
        company: 'SaaSify Global',
        position: 'Senior Enterprise Account Executive',
        location: 'Chicago, IL',
        startDate: 'Aug 2017',
        endDate: 'Dec 2020',
        isCurrent: false,
        description: '• Awarded President’s Club for 3 consecutive years (2018-2020).\n• Generated 45+ new strategic logos across financial services and healthcare verticals.'
      }
    ],
    projects: [],
    education: [
      {
        id: 'edu-s1',
        school: 'Northwestern University',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Business Administration',
        startDate: '2013',
        endDate: '2017',
        description: 'Concentration in Strategic Sales & Management.'
      }
    ],
    skills: [
      { id: 'ss1', name: 'B2B Enterprise SaaS Sales', level: 'Expert' },
      { id: 'ss2', name: 'MEDDPICC & Solution Selling', level: 'Expert' },
      { id: 'ss3', name: 'Salesforce CRM & Gong.io', level: 'Expert' },
      { id: 'ss4', name: 'Executive Pipeline Forecasting', level: 'Advanced' }
    ],
    certificates: [
      {
        id: 'sc1',
        title: 'MEDDPICC Certified Master Sales Practitioner',
        issuer: 'MEDDIC Academy',
        date: '2022'
      }
    ],
    targetIndustry: 'Sales & Business Development',
    targetJobDescription: 'Seeking Vice President / Director of Enterprise Sales role managing high-velocity AE teams and driving multi-million dollar B2B software revenue.',
    targetCompany: 'Salesforce',
    style: {
      primaryColor: '#dc2626',
      fontFamily: 'Inter',
      fontSize: 'base',
      lineHeight: 'normal',
      spacingDensity: 'normal',
      paperSize: 'A4',
      backgroundColor: '#ffffff'
    }
  }
};
