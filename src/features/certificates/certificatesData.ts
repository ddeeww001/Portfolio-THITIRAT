// Certificate files, categories and matching rules.
import { ALL_FILTER } from '../../shared/hooks/useFilteredList';

const CERT_DIR = '/certify_LifeLongLearning';

/** Certificate title → PDF file name in /public/certify_LifeLongLearning (names match the files on disk). */
const certFiles: Record<string, string> = {
  'UXUI Foundation Program (LIFELONG) - Organized by T.C.C. Technology Co., Ltd': 'UXUI Foundation Program.pdf',
  'Creativity and Imagination (LIFELONG)': 'Creativity and Imageination.pdf',
  'Agile Thinking': 'Agile Thinking.pdf',
  'Logical Reasoning': 'Logical Reasoning.pdf',
  'Capability': 'Aapability.pdf',
  'Active Listening': 'Active listening.pdf',
  'Adopting Different Perspectives': 'Adopting different perspectives.pdf',
  'Asking the Right Questions': 'Asink the right questions.pdf',
  'Learning How to Learn': 'Learning how to learn.pdf',
  'Seeking Relevant Information': 'Seeking relevant information.pdf',
  'Storytelling and Public Speaking': 'Storytelling and Pulblic Speaking.pdf',
  'Structured Problem Solving': 'Structured Provlem Ssoving.pdf',
  'Synthesizing Messages': 'Synthizing messages.pdf',
  'Time Management and Prioritization': 'Time Management and Priotization.pdf',
  'Translating Knowledge to Different Contexts': 'Translatingg Knoeledge to different context.pdf',
  'Understanding Biases': 'Understanding Biases.pdf',
  'Work-Plan Development': 'Work-plan Development.pdf',
};

export const certFilePath = (title: string) =>
  `${CERT_DIR}/${certFiles[title] ?? `${title.toLowerCase().replace(/\s+/g, '_')}.pdf`}`;

/** Category tab → keywords; a certificate belongs to a category if its title contains any keyword. */
const categoryKeywords: Record<string, string[]> = {
  'UX/UI & Foundation': ['uxui', 'design'],
  'Lifelong Learning': ['lifelong', 'learning'],
  'Agile & Thinking': ['agile', 'reasoning', 'problem'],
  'Communication': ['speaking', 'listening', 'storytelling'],
};

export const CERT_CATEGORIES = [ALL_FILTER, ...Object.keys(categoryKeywords)];

export const certMatchesCategory = (title: string, category: string) => {
  const keywords = categoryKeywords[category];
  if (!keywords) return true;
  const t = title.toLowerCase();
  return keywords.some((k) => t.includes(k));
};

export const certMatchesSearch = (title: string, q: string) => title.toLowerCase().includes(q);

/** First category a certificate belongs to (shown under its title), or a generic label. */
export const certCategoryOf = (title: string) =>
  Object.keys(categoryKeywords).find((category) => certMatchesCategory(title, category)) ?? 'Certificate';
