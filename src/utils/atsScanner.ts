import { Resume, AtsScanResult } from '../types/resume';
import { INDUSTRY_KEYWORDS } from './presetData';

export function calculateAtsScore(resume: Resume): AtsScanResult {
  const checklist: AtsScanResult['checklist'] = [];
  let score = 0;

  // 1. Personal Contact Info Check (Max 20 pts)
  const hasEmail = Boolean(resume.personalInfo.email && resume.personalInfo.email.includes('@'));
  const hasPhone = Boolean(resume.personalInfo.phone && resume.personalInfo.phone.trim().length >= 7);
  const hasLocation = Boolean(resume.personalInfo.location && resume.personalInfo.location.trim().length > 0);
  const hasTitle = Boolean(resume.personalInfo.title && resume.personalInfo.title.trim().length > 0);

  let contactScore = 0;
  if (hasEmail) contactScore += 5;
  if (hasPhone) contactScore += 5;
  if (hasLocation) contactScore += 5;
  if (hasTitle) contactScore += 5;
  score += contactScore;

  checklist.push({
    id: 'contact_info',
    label: 'Complete Contact Information',
    passed: contactScore === 20,
    recommendation: contactScore === 20 
      ? 'All essential contact details (email, phone, location, title) are clear and parsable.'
      : 'Ensure email, phone number, location, and professional title are provided.',
    impact: 'critical'
  });

  // 2. Professional Summary Check (Max 10 pts)
  const summaryLength = resume.personalInfo.summary ? resume.personalInfo.summary.trim().split(/\s+/).length : 0;
  const summaryPassed = summaryLength >= 25 && summaryLength <= 100;
  if (summaryPassed) score += 10;
  else if (summaryLength > 0) score += 5;

  checklist.push({
    id: 'summary_check',
    label: 'Optimized Summary Statement',
    passed: summaryPassed,
    recommendation: summaryPassed
      ? 'Summary length is ideal for ATS keyword extraction (25–100 words).'
      : 'Aim for a 30–60 word summary capturing your core title, years of experience, and key skills.',
    impact: 'important'
  });

  // 3. Work Experience & Quantifiable Metrics (Max 30 pts)
  const experienceCount = resume.experience.length;
  let hasMetrics = false;
  let totalBullets = 0;
  let actionVerbCount = 0;

  const metricRegex = /(\d+%|\$\d+|\d+\+|\d+x|doubled|tripled|reduced by \d+|increased by \d+)/i;
  const actionVerbsList = ['led', 'spearheaded', 'developed', 'architected', 'managed', 'engineered', 'created', 'built', 'reduced', 'increased', 'optimized', 'scaled', 'implemented', 'designed', 'directed'];

  resume.experience.forEach((exp) => {
    if (metricRegex.test(exp.description)) {
      hasMetrics = true;
    }
    const bullets = exp.description.split('\n').filter(b => b.trim().length > 0);
    totalBullets += bullets.length;

    bullets.forEach(b => {
      const firstWord = b.trim().replace(/^[^a-zA-Z]+/, '').split(/\s+/)[0]?.toLowerCase();
      if (firstWord && actionVerbsList.includes(firstWord)) {
        actionVerbCount++;
      }
    });
  });

  let expScore = 0;
  if (experienceCount >= 1) expScore += 10;
  if (totalBullets >= 3) expScore += 10;
  if (hasMetrics || actionVerbCount >= 2) expScore += 10;
  score += expScore;

  checklist.push({
    id: 'work_experience',
    label: 'Work Experience & Bullet Metrics',
    passed: expScore === 30,
    recommendation: hasMetrics 
      ? 'Great job! Your bullet points contain quantifiable numbers, metrics, or KPIs.'
      : 'Add numbers, percentages (%), dollar amounts ($), or team sizes to highlight your impact.',
    impact: 'critical'
  });

  // 4. Skills & Keyword Density Check (Max 20 pts)
  const skillCount = resume.skills.length;
  const skillsPassed = skillCount >= 5;
  if (skillsPassed) score += 20;
  else score += Math.min(20, skillCount * 4);

  checklist.push({
    id: 'skills_count',
    label: 'Core Skills & Categorization',
    passed: skillsPassed,
    recommendation: skillsPassed
      ? `Strong skill section with ${skillCount} targeted skills listed.`
      : 'List at least 6–10 hard and soft skills related to your target job.',
    impact: 'critical'
  });

  // 5. Job Description & Industry Keyword Matcher (Max 20 pts)
  const matchingKeywords: string[] = [];
  const missingKeywords: string[] = [];

  // Combine target industry keywords + custom Job Description keywords
  let targetKeywordsToSearch: string[] = [];
  if (resume.targetIndustry && INDUSTRY_KEYWORDS[resume.targetIndustry]) {
    targetKeywordsToSearch = [...INDUSTRY_KEYWORDS[resume.targetIndustry]];
  }

  // Extract candidate keywords from Job Description if provided
  if (resume.targetJobDescription && resume.targetJobDescription.trim().length > 0) {
    const jdWords = resume.targetJobDescription
      .replace(/[^a-zA-Z0-9\s+#.-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 3);
    
    // Pick unique capital/technical terms or frequently occurring words
    const wordFreq: Record<string, number> = {};
    jdWords.forEach(w => {
      const clean = w.trim();
      if (!['the', 'and', 'for', 'with', 'you', 'our', 'will', 'that', 'this', 'have', 'from', 'are'].includes(clean.toLowerCase())) {
        wordFreq[clean] = (wordFreq[clean] || 0) + 1;
      }
    });

    const topJdKeywords = Object.keys(wordFreq)
      .sort((a, b) => wordFreq[b] - wordFreq[a])
      .slice(0, 15);

    targetKeywordsToSearch = Array.from(new Set([...targetKeywordsToSearch, ...topJdKeywords]));
  }

  // Search full resume text for keyword matches
  const fullResumeText = `
    ${resume.personalInfo.title}
    ${resume.personalInfo.summary}
    ${resume.experience.map(e => e.position + ' ' + e.company + ' ' + e.description).join(' ')}
    ${resume.projects.map(p => p.title + ' ' + p.description + ' ' + (p.technologies || '')).join(' ')}
    ${resume.skills.map(s => s.name).join(' ')}
    ${resume.education.map(e => e.degree + ' ' + e.fieldOfStudy + ' ' + e.school).join(' ')}
  `.toLowerCase();

  targetKeywordsToSearch.forEach((kw) => {
    if (fullResumeText.includes(kw.toLowerCase())) {
      matchingKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  let keywordScore = 0;
  if (targetKeywordsToSearch.length > 0) {
    const matchRatio = matchingKeywords.length / targetKeywordsToSearch.length;
    keywordScore = Math.round(matchRatio * 20);
  } else {
    keywordScore = 15; // default benchmark if no JD or industry selected
  }
  score += keywordScore;

  checklist.push({
    id: 'keyword_match',
    label: 'Job Description & Industry Keyword Match',
    passed: keywordScore >= 14,
    recommendation: targetKeywordsToSearch.length > 0
      ? `Matched ${matchingKeywords.length} of ${targetKeywordsToSearch.length} target keywords. Add missing keywords into experience bullets.`
      : 'Select an Industry or paste a Job Description to scan keyword alignment.',
    impact: 'critical'
  });

  // Calculate overall grade
  let grade: AtsScanResult['grade'] = 'D';
  if (score >= 92) grade = 'A+';
  else if (score >= 82) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 55) grade = 'C';
  else grade = 'D';

  let summaryFeedback = '';
  if (score >= 85) {
    summaryFeedback = '🚀 Excellent! Your resume is highly optimized for ATS software and recruiters. It features clear section formatting, strong action verbs, and quantifiable impact.';
  } else if (score >= 70) {
    summaryFeedback = '👍 Good structure! Incorporating a few more metrics (%) and missing industry keywords will push your resume into the top 5% applicant tier.';
  } else {
    summaryFeedback = '⚠️ Attention Needed: Enhance your bullet points with action verbs, add measurable accomplishments, and align your keywords with your target role.';
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    grade,
    matchingKeywords,
    missingKeywords: missingKeywords.slice(0, 12),
    checklist,
    summaryFeedback
  };
}
