export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'ATS & Scanning' | 'Privacy & Pricing' | 'Formatting & Export' | 'Tips';
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Privacy & Pricing',
    question: 'Is this Resume Maker really 100% free with no signup required?',
    answer: 'Yes! Unlike commercial competitors (Zety, Resume.io, Novoresume) that trap users behind hidden paywalls or email registration popups after building, our ATS Resume Maker is 100% free forever. You can fill out your information, check your ATS score, and download pixel-perfect PDF files instantly without creating an account.'
  },
  {
    id: 'faq-2',
    category: 'ATS & Scanning',
    question: 'How does the real-time 100% ATS score calculator work?',
    answer: 'Our ATS Scanner engine evaluates your resume in real time against 5 core criteria: (1) Contact information completeness, (2) Professional summary word density (25–100 words), (3) Work experience bullet count & quantifiable impact metrics (% or $), (4) Core skills count, and (5) Job Description keyword match density.'
  },
  {
    id: 'faq-3',
    category: 'ATS & Scanning',
    question: 'Will my resume pass legacy ATS systems like Workday, Taleo, Greenhouse, and Lever?',
    answer: 'Yes! All 5 templates in our builder are engineered using single-column, standard semantic HTML hierarchy. We purposefully avoid non-ATS elements like graphic skill bars, complex multi-column tables, text boxes, and non-standard symbols that cause legacy ATS parsers to misread candidate profiles.'
  },
  {
    id: 'faq-4',
    category: 'ATS & Scanning',
    question: 'How do I match my resume to a specific job description (JD)?',
    answer: 'Open the "ATS Score" panel, select your Target Industry (e.g. Software Engineering, Digital Marketing, Finance, Healthcare), and paste the job posting text into the Job Description Scanner box. The tool extracts top required keywords and shows you exactly which keywords match and which ones are missing, allowing you to add missing skills with 1 click.'
  },
  {
    id: 'faq-5',
    category: 'Privacy & Pricing',
    question: 'Is my personal information safe and private?',
    answer: '100% Yes! Your data is stored locally inside your browser’s LocalStorage. No resume data or personal details are transmitted or saved to external databases or tracking servers.'
  },
  {
    id: 'faq-6',
    category: 'Formatting & Export',
    question: 'Can I export my resume to PDF without watermarks?',
    answer: 'Absolutely. Clicking "Download PDF" generates a clean, high-resolution PDF file without watermarks, branding headers, or hidden fees.'
  },
  {
    id: 'faq-7',
    category: 'Formatting & Export',
    question: 'What are the best ATS-compliant font choices?',
    answer: 'We recommend clean sans-serif fonts such as Inter or Roboto for Tech, Startup, and Marketing roles, or Merriweather serif font for Executive, Corporate, and Legal roles. All fonts offered in our builder are web-safe and 100% ATS parsable.'
  },
  {
    id: 'faq-8',
    category: 'Formatting & Export',
    question: 'Can I backup and import my resume data for editing later?',
    answer: 'Yes! Click the `•••` dropdown menu in the top navigation bar to select "Export JSON Backup". This saves your entire raw resume state to a local `.json` file, which you can re-import anytime.'
  },
  {
    id: 'faq-9',
    category: 'Formatting & Export',
    question: 'How do I fit my resume onto exactly 1 page?',
    answer: 'Use the "Spacing Density" control in the Style Customizer to switch to "Compact Spacing". This tightens section margins and line spacing, allowing 1.1–1.2 pages of content to fit onto 1 single page.'
  },
  {
    id: 'faq-10',
    category: 'Formatting & Export',
    question: 'What is the difference between A4 and US Letter paper formats?',
    answer: 'US Letter (8.5x11 inches) is standard in North America (USA, Canada), while A4 (210x297 mm) is standard across Europe, Asia, and Latin America. You can toggle between A4 and US Letter in our Style Controls.'
  },
  {
    id: 'faq-11',
    category: 'Tips',
    question: 'Why should I avoid skill progress bars and rating charts?',
    answer: 'ATS software reads plain text. Visual rating bars (e.g. 4/5 stars or 80% progress bar) are converted into empty or garbled characters by ATS algorithms, leading to lower candidate scores.'
  },
  {
    id: 'faq-12',
    category: 'Tips',
    question: 'How do I use the Action Verb & Bullet Assistant?',
    answer: 'When writing work experience entries, click the "Action Verbs & Formula Helper" button. Choose from action verb categories (Leadership, Technical, Analytics, Growth, Efficiency) to start your bullets with strong verbs instead of passive phrases.'
  },
  {
    id: 'faq-13',
    category: 'Tips',
    question: 'Can I tailor my resume for specific target companies like Google, Amazon, or Deloitte?',
    answer: 'Yes! Enter your Target Company in the ATS Optimizer drawer to personalize recommendations and ensure your title and skills align with top enterprise recruiters.'
  },
  {
    id: 'faq-14',
    category: 'Formatting & Export',
    question: 'Can I export a Plain Text (.txt) version for ATS application forms?',
    answer: 'Yes! Click `•••` -> "Export Plain Text (.txt)" to download an unformatted text version perfect for copy-pasting into multi-field online job applications.'
  },
  {
    id: 'faq-15',
    category: 'Privacy & Pricing',
    question: 'Does this builder work on mobile phones and tablets?',
    answer: 'Yes! Our builder features a responsive mobile dock, section jump tabs, and 1-tap quick skill additions designed for seamless phone and tablet editing.'
  }
];
