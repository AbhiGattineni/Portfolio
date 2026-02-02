/**
 * Context Builder - Generates concise, relevant context for LLM queries
 * Uses keyword matching to determine which sections are most relevant
 * Keeps context minimal for web usage efficiency
 */

import portfolioData from './portfolioData';

// Keywords mapped to sections for relevance matching
const sectionKeywords = {
  personal: ['name', 'who', 'abhishek', 'contact', 'email', 'phone', 'location', 'where', 'live', 'based'],
  about: ['about', 'summary', 'bio', 'interest', 'hobby', 'like', 'passion'],
  skills: ['skill', 'technology', 'tech', 'stack', 'know', 'proficient', 'expertise', 'programming', 'language', 'framework', 'react', 'node', 'python', 'javascript', 'css', 'aws', 'database', 'sql', 'api', 'django', 'fastapi', 'graphql'],
  experience: ['experience', 'work', 'job', 'company', 'companies', 'worked', 'position', 'role', 'career', 'c3', 'wells', 'fargo', 'cyient', 'fractal', 'startup', 'wheelz'],
  education: ['education', 'degree', 'university', 'college', 'school', 'study', 'studied', 'csulb', 'bachelor', 'master', 'gpa'],
  projects: ['project', 'built', 'created', 'developed', 'portfolio', 'work', 'product', 'app', 'website', 'chrome', 'extension', 'pos', 'indimitra', 'qr', 'menu'],
  contact: ['contact', 'reach', 'connect', 'hire', 'freelance', 'available', 'opportunity', 'linkedin', 'social', 'facebook', 'instagram']
};

/**
 * Calculate relevance score for a section based on question keywords
 */
function getSectionRelevance(question, sectionName) {
  const questionLower = question.toLowerCase();
  const keywords = sectionKeywords[sectionName] || [];
  let score = 0;
  
  for (const keyword of keywords) {
    if (questionLower.includes(keyword)) {
      score += 1;
    }
  }
  return score;
}

/**
 * Build compact personal info context
 */
function buildPersonalContext() {
  const p = portfolioData.personal;
  return `[Personal] ${p.name}, ${p.title}. Location: ${p.location}. Email: ${p.email}. Phone: ${p.phone}. Education: ${p.degree}. Freelance: ${p.freelance}.`;
}

/**
 * Build compact about context
 */
function buildAboutContext() {
  const a = portfolioData.about;
  return `[About] ${a.summary} Interests: ${a.interests.join(', ')}.`;
}

/**
 * Build compact skills context
 */
function buildSkillsContext() {
  const s = portfolioData.skills;
  const allSkills = [
    ...s.frontend.map(sk => sk.name),
    ...s.backend.map(sk => sk.name),
    ...s.databases.map(sk => sk.name),
    ...s.platforms.map(sk => sk.name)
  ];
  return `[Skills] Frontend: React JS (expert), CSS, JavaScript. Backend: Node JS, Django, FastAPI, REST API, GraphQL. Database: SQL, NoSQL. Cloud: AWS. Other: WordPress, Shopify.`;
}

/**
 * Build compact experience context
 */
function buildExperienceContext() {
  const exp = portfolioData.experience;
  const expLines = exp.map(e => 
    `• ${e.year} (${e.duration}): ${e.title} - ${e.description.substring(0, 150)}...`
  ).join('\n');
  return `[Experience]\n${expLines}`;
}

/**
 * Build compact education context
 */
function buildEducationContext() {
  const edu = portfolioData.experience.filter(e => 
    e.title.toLowerCase().includes('master') || 
    e.title.toLowerCase().includes('bachelor')
  );
  const eduLines = edu.map(e => 
    `• ${e.title} (${e.year}) - ${e.description.substring(0, 100)}...`
  ).join('\n');
  return `[Education]\n${eduLines}`;
}

/**
 * Build compact projects context
 */
function buildProjectsContext() {
  const proj = portfolioData.projects;
  const projLines = proj.map(p => 
    `• ${p.title} (${p.type}): ${p.description.substring(0, 80)}... Tech: ${p.technologies.slice(0, 3).join(', ')}`
  ).join('\n');
  return `[Projects]\n${projLines}`;
}

/**
 * Build compact contact context
 */
function buildContactContext() {
  const c = portfolioData.contact;
  return `[Contact] ${c.message} Email: ${c.email}. LinkedIn: ${c.social.linkedin}`;
}

/**
 * Section builders mapping
 */
const sectionBuilders = {
  personal: buildPersonalContext,
  about: buildAboutContext,
  skills: buildSkillsContext,
  experience: buildExperienceContext,
  education: buildEducationContext,
  projects: buildProjectsContext,
  contact: buildContactContext
};

/**
 * Build dynamic context based on question relevance
 * @param {string} question - User's question
 * @param {number} maxSections - Maximum number of sections to include
 * @returns {string} - Formatted context string
 */
export function buildContext(question, maxSections = 4) {
  // Always include personal info as base context
  const contexts = [buildPersonalContext()];
  
  // Calculate relevance scores for all sections
  const scores = Object.keys(sectionKeywords)
    .filter(s => s !== 'personal') // Already included
    .map(section => ({
      section,
      score: getSectionRelevance(question, section)
    }))
    .sort((a, b) => b.score - a.score);
  
  // Get top relevant sections (or all if none are relevant for general questions)
  const relevantSections = scores.filter(s => s.score > 0);
  
  if (relevantSections.length === 0) {
    // General question - include brief overview of each section
    contexts.push(buildAboutContext());
    contexts.push(buildSkillsContext());
    contexts.push(`[Experience Summary] ${portfolioData.experience.length} positions including: Senior Applications Engineer at C3 AI/Fractal (current), Software Engineer at Wells Fargo, 4 years at Cyient Ltd.`);
    contexts.push(`[Projects Summary] Key projects: Word Highlighter Chrome Extension, POS System, Indimitra B2B E-commerce, QR Menu Scanner.`);
  } else {
    // Add relevant sections up to maxSections
    for (let i = 0; i < Math.min(relevantSections.length, maxSections - 1); i++) {
      const section = relevantSections[i].section;
      if (sectionBuilders[section]) {
        contexts.push(sectionBuilders[section]());
      }
    }
  }
  
  return contexts.join('\n\n');
}

/**
 * Build full context (for complete portfolio overview)
 * @returns {string} - Full formatted context
 */
export function buildFullContext() {
  return [
    buildPersonalContext(),
    buildAboutContext(),
    buildSkillsContext(),
    buildExperienceContext(),
    buildProjectsContext(),
    buildContactContext()
  ].join('\n\n');
}

/**
 * Get resume path for reference
 */
export function getResumePath() {
  return portfolioData.personal.resumePath;
}

export default {
  buildContext,
  buildFullContext,
  getResumePath,
  portfolioData
};

