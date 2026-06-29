import { useState, useEffect } from 'react';
import type { HomeContent, ProfileContent, ProjectExperience } from './types/portfolio';
import { Profile } from './frontend/Personal';
import ShowExperience from './frontend/showExperience';
import profileImg from './picture/profile.jpg';

const CACHE_KEY = 'portfolio_cache';
const CACHE_TTL = 1000 * 60 * 60;

function loadCache(): { home: HomeContent | null; profile: ProfileContent | null; projects: ProjectExperience[] } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(CACHE_KEY); return null; }
    return data;
  } catch { return null; }
}

function saveCache(home: HomeContent | null, profile: ProfileContent | null, projects: ProjectExperience[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: { home, profile, projects } }));
  } catch {}
}

const FALLBACK_HOME: HomeContent = {
  id: 1,
  greeting: 'Welcome to my portfolio \u2192',
  name: 'THITIRAT SIRISAWAD',
  role: 'UX/UI Designer & Frontend Developer',
  description: '\u0E40\u0E27\u0E47\u0E1A\u0E44\u0E0B\u0E15\u0E4C\u0E19\u0E35\u0E49\u0E23\u0E27\u0E1A\u0E23\u0E27\u0E21\u0E04\u0E27\u0E32\u0E21\u0E15\u0E31\u0E49\u0E07\u0E43\u0E08\u0E02\u0E2D\u0E07\u0E09\u0E31\u0E19\u0E43\u0E19\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E41\u0E25\u0E30\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E40\u0E27\u0E47\u0E1A\u0E44\u0E0B\u0E15\u0E4C \u0E09\u0E31\u0E19\u0E2B\u0E25\u0E07\u0E43\u0E2B\u0E25\u0E43\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E23\u0E23\u0E04\u0E1B\u0E23\u0E30\u0E2A\u0E1A\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E14\u0E34\u0E08\u0E17\u0E31\u0E25\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E07\u0E48\u0E32\u0E22\u0E41\u0E25\u0E30\u0E21\u0E35\u0E14\u0E35\u0E44\u0E0B\u0E19\u0E4C\u0E17\u0E35\u0E48\u0E17\u0E31\u0E19\u0E2A\u0E21\u0E31\u0E22 \u0E2B\u0E27\u0E31\u0E07\u0E27\u0E48\u0E32\u0E04\u0E38\u0E13\u0E08\u0E30\u0E2A\u0E19\u0E38\u0E01\u0E01\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21\u0E0A\u0E21\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E02\u0E2D\u0E07\u0E09\u0E31\u0E19\u0E19\u0E30\u0E04\u0E30',
  about_me_link: '#profile'
};

const FALLBACK_PROFILE: ProfileContent = {
  id: 1, name: 'THITIRAT SIRISAWAD', email: 'dewthitirat@gmail.com', phone: '099-430-0222', birthday: '14 June 2006',
  introduce: 'I am a passionate UX/UI Designer and Frontend Developer dedicated to creating intuitive, user-centric digital experiences with modern design.',
  role: ['UX/UI Designer', 'Frontend Developer'],
  socials: [
    { platform: 'GitHub', url: 'https://github.com/ddeeww001', username: 'ddeeww001' },
    { platform: 'Line ID', url: '', username: 't.s' },
    { platform: 'Instagram', url: 'https://instagram.com/ddeeww_o_o', username: 'ddeeww_o_o' },
    { platform: 'Facebook', url: 'https://facebook.com/dew.chobkinkaitod', username: 'Dew Chobkinkaitod' }
  ],
  technicalSkills: [
    { skill: 'Java', level: 'Beginner' }, { skill: 'HTML', level: 'Advanced' }, { skill: 'CSS', level: 'Advanced' },
    { skill: 'React', level: 'Intermediate' }, { skill: 'TypeScript', level: 'Intermediate' },
    { skill: 'JavaScript', level: 'Intermediate' }, { skill: 'Figma', level: 'Advanced' }
  ],
  tools: ['Figma', 'Canva', 'Visual Studio Code', 'IntelliJ', 'Affinity'],
  languages: [{ lang: 'Thai', level: 'Native' }, { lang: 'English', level: 'Pre-intermediate' }],
  certifications: ['UXUI Foundation Program (LIFELONG) - Organized by T.C.C. Technology Co., Ltd', 'Creativity and Imagination (LIFELONG)']
};

const FALLBACK_PROJECTS: ProjectExperience[] = [
  { id: 8, title: 'AI HACKATHON : BobInsight (IBM Bob Hackathon)', date: '2024', role: ['Frontend Developer', 'UX/UI Designer'], details: ['Developed an AI-driven insight platform to simplify complex data visualization.', 'Collaborated in a team to integrate IBM AI technologies into a seamless user experience.'], link: [{ label: 'View Project', url: 'https://lablab.ai/ai-hackathons/ibm-bob-hackathon/uia/bobinsight' }, { label: 'GitHub', url: 'https://github.com/Pinont/UIA-LABLAB' }], tags: ['Frontend', 'UX/UI'], image_url: '', description: 'AI-driven data insight platform for IBM Bob Hackathon', case_study: { problem: '\u0E01\u0E32\u0E23\u0E17\u0E33\u0E04\u0E27\u0E32\u0E21\u0E40\u0E02\u0E49\u0E32\u0E43\u0E08\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 (Data Insights) \u0E08\u0E33\u0E19\u0E27\u0E19\u0E21\u0E32\u0E01\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E22\u0E32\u0E01\u0E41\u0E25\u0E30\u0E43\u0E0A\u0E49\u0E40\u0E27\u0E25\u0E32\u0E19\u0E32\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B', solution: '\u0E2A\u0E23\u0E49\u0E32\u0E07 Platform \u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49 AI \u0E0A\u0E48\u0E27\u0E22\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E41\u0E25\u0E30\u0E2A\u0E23\u0E38\u0E1B\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E2D\u0E01\u0E21\u0E32\u0E40\u0E1B\u0E47\u0E19 Visual \u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E43\u0E08\u0E07\u0E48\u0E32\u0E22\u0E41\u0E25\u0E30\u0E42\u0E15\u0E49\u0E15\u0E2D\u0E1A\u0E44\u0E14\u0E49', toolsUsed: 'React \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Frontend \u0E41\u0E25\u0E30 IBM AI Services \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E21\u0E27\u0E25\u0E1C\u0E25\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25', learning: '\u0E44\u0E14\u0E49\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E39\u0E49\u0E01\u0E32\u0E23\u0E17\u0E33\u0E07\u0E32\u0E19\u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35 AI \u0E02\u0E2D\u0E07 IBM \u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A Dashboard \u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E25\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E41\u0E1A\u0E1A Dynamic' } },
  { id: 7, title: 'HACKATHON : ETHChaingmai', date: '28 / 01 /2026 - 3 / 02 / 2026', role: ['Frontend'], details: ['Customized specific parts of the homepage design and implemented a map feature by connecting to an API to fetch and render location.'], link: [{ label: 'View Project', url: 'https://devfolio.co/projects/relief-mesh-7406' }, { label: 'Presentation', url: 'https://www.canva.com/design/DAHAEBR-F5o/kU3WI2J8YAblFhI51HkCuA/view?utm_content=DAHAEBR-F5o&utm_campaign=designshare&utm_medium=link&utm_source=viewer' }], tags: ['Frontend'], image_url: '', description: 'Real-time disaster relief map with API integration', case_study: { problem: '\u0E04\u0E27\u0E32\u0E21\u0E22\u0E32\u0E01\u0E43\u0E19\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1E\u0E34\u0E01\u0E31\u0E14\u0E04\u0E27\u0E32\u0E21\u0E0A\u0E48\u0E27\u0E22\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E43\u0E19\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E48\u0E32\u0E07\u0E44\u0E01\u0E25\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E40\u0E01\u0E34\u0E14\u0E20\u0E31\u0E22\u0E1E\u0E34\u0E1A\u0E31\u0E15\u0E34', solution: '\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E30\u0E1A\u0E1A\u0E41\u0E1C\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A Real-time \u0E17\u0E35\u0E48\u0E14\u0E36\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E48\u0E32\u0E19 API \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E41\u0E2A\u0E14\u0E07\u0E08\u0E38\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E04\u0E27\u0E32\u0E21\u0E0A\u0E48\u0E27\u0E22\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E41\u0E21\u0E48\u0E19\u0E4D\u0E33', toolsUsed: 'React \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A Leaflet API \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E41\u0E1C\u0E19\u0E17\u0E35\u0E48\u0E17\u0E35\u0E48\u0E40\u0E1A\u0E32\u0E41\u0E25\u0E30\u0E23\u0E27\u0E14\u0E40\u0E23\u0E47\u0E27', learning: '\u0E44\u0E14\u0E49\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E39\u0E49\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23 Asynchronous data \u0E08\u0E32\u0E01 API \u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E17\u0E33 UI \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E41\u0E1C\u0E19\u0E17\u0E35\u0E48\u0E43\u0E2B\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E07\u0E48\u0E32\u0E22\u0E43\u0E19\u0E2A\u0E20\u0E32\u0E27\u0E30\u0E04\u0E31\u0E1A\u0E02\u0E31\u0E19' } },
  { id: 6, title: 'YOUNG DEV HACKATHON', date: '11 / 01 / 2026', role: ['Staff'], details: ['Instructed participants on the web design process, specifically covering user flows, wireframes, and essential design basics.'], link: [{ label: 'View on Facebook', url: 'https://www.facebook.com/share/p/1BgvpSZCgo/' }], tags: ['Teaching', 'Workshop', 'UX/UI'], image_url: '', description: 'Workshop instructor for web design process at hackathon', case_study: null },
  { id: 5, title: 'CAMT open house : WEB3 Club', date: '27 / 8 / 2025', role: ['Designer'], details: ['End-to-end booklet design, logo creation, and design poster customization.'], link: [{ label: 'View Booklet', url: 'https://heyzine.com/flip-book/6c7e35871a.html?ref=web3.camt.cmu.ac.th' }, { label: 'Visit Website', url: 'https://web3.camt.cmu.ac.th/' }], tags: ['Design'], image_url: '', description: 'Branding and booklet design for CAMT Web3 Club open house', case_study: { problem: '\u0E04\u0E27\u0E32\u0E21\u0E40\u0E02\u0E49\u0E32\u0E43\u0E08\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07 Web3 \u0E40\u0E1B\u0E47\u0E19\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E22\u0E32\u0E01\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E2A\u0E37\u0E48\u0E2D\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E40\u0E14\u0E34\u0E21\u0E44\u0E21\u0E48\u0E14\u0E36\u0E07\u0E14\u0E39\u0E14', solution: '\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A Booklet \u0E41\u0E25\u0E30 Logo \u0E43\u0E2B\u0E21\u0E48\u0E42\u0E14\u0E22\u0E43\u0E0A\u0E49 Visual Language \u0E17\u0E35\u0E48\u0E17\u0E31\u0E19\u0E2A\u0E21\u0E31\u0E22\u0E41\u0E15\u0E48\u0E14\u0E39\u0E40\u0E1B\u0E47\u0E19\u0E21\u0E34\u0E15\u0E23 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14\u0E01\u0E33\u0E41\u0E1E\u0E07\u0E04\u0E27\u0E32\u0E21\u0E40\u0E02\u0E49\u0E32\u0E43\u0E08', toolsUsed: 'Affinity \u0E41\u0E25\u0E30 Figma \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E07\u0E32\u0E19\u0E23\u0E27\u0E21\u0E20\u0E32\u0E1E Vector \u0E17\u0E35\u0E48\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33\u0E2A\u0E39\u0E07', learning: '\u0E40\u0E02\u0E49\u0E32\u0E43\u0E08\u0E01\u0E32\u0E23\u0E17\u0E33 Branding \u0E43\u0E2B\u0E49\u0E40\u0E02\u0E49\u0E32\u0E01\u0E31\u0E1A\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E32\u0E07 \u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E1C\u0E48\u0E32\u0E19\u0E07\u0E32\u0E19\u0E14\u0E35\u0E44\u0E0B\u0E19\u0E4C' } },
  { id: 4, title: 'Design templates', date: '4 / 11 / 2025 - 8 / 11 / 2025', role: ['Designer'], details: ['Design templates light team and dark team for COLLEGE OF ARTS, MEDIA AND TECHNOLOGY'], link: [{ label: 'Light Team', url: 'https://www.canva.com/design/DAG-MThjO7s/QHk_AUP7K2tppS4AOaaVSw/view?utm_content=DAG-MThjO7s&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb480482753' }, { label: 'Dark Team', url: 'https://www.canva.com/design/DAG-MfTGOD0/8Ecgfe9gtOXGT0X4QVi89Q/view?utm_content=DAG-MfTGOD0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0db13d2742' }], tags: ['Design', 'Templates', 'Branding'], image_url: '', description: 'Light and dark design templates for CAMT', case_study: null },
  { id: 3, title: 'SMART ACCOUNTING AND MANAGEMENT', date: '27 / 8 / 2025', role: ['Frontend Developer', 'UX/UI Designer'], details: ['Designed the user interface for product selection and customized dashboards.', 'Developed a Point of Sale (POS) and Accounting system for Ban Mae Hoi Ngoen School.'], link: [{ label: 'View Project', url: 'https://www.canva.com/design/DAG-RdyzwBM/DpWwYhyVe11hhewbgSG1Aw/view?utm_content=DAG-RdyzwBM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5d0f09fba1' }], tags: ['Frontend', 'UX/UI'], image_url: '', description: 'POS and Accounting web app for school business management', case_study: { problem: '\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E1A\u0E49\u0E32\u0E19\u0E41\u0E21\u0E48\u0E2D\u0E49\u0E2D\u0E22\u0E40\u0E07\u0E34\u0E19\u0E1B\u0E23\u0E30\u0E2A\u0E1A\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E41\u0E25\u0E30\u0E2A\u0E15\u0E47\u0E2D\u0E01\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E17\u0E35\u0E48\u0E25\u0E48\u0E32\u0E0A\u0E49\u0E32\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E08\u0E32\u0E01\u0E43\u0E0A\u0E49\u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E23\u0E30\u0E14\u0E32\u0E29 (Manual)', solution: '\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E40\u0E27\u0E47\u0E1A\u0E41\u0E2D\u0E1E\u0E1E\u0E25\u0E34\u0E40\u0E04\u0E0A\u0E31\u0E19 POS \u0E41\u0E25\u0E30\u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E17\u0E35\u0E48\u0E21\u0E35 UI \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E07\u0E48\u0E32\u0E22 \u0E40\u0E19\u0E49\u0E19\u0E01\u0E32\u0E23\u0E15\u0E31\u0E14\u0E2A\u0E15\u0E47\u0E2D\u0E01\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E01\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33', toolsUsed: 'HTML, CSS, JavaScript \u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A User Flow \u0E1C\u0E48\u0E32\u0E19 Figma \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E07\u0E48\u0E32\u0E22\u0E43\u0E19\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19', learning: '\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E39\u0E49\u0E01\u0E23\u0E30\u0E1A\u0E27\u0E19\u0E01\u0E32\u0E23\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E0B\u0E2D\u0E1F\u0E15\u0E4C\u0E41\u0E27\u0E23\u0E4C\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E41\u0E01\u0E49\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E43\u0E19\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E08\u0E23\u0E34\u0E07 (Real-world system development) \u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E17\u0E33\u0E07\u0E32\u0E19\u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19' } },
  { id: 2, title: 'Design mascot CENTRAL THAM', date: '30 / 10 /2025 - 31 / 10 /2025', role: ['Design mascot'], details: ['Collaborated with a teammate to brainstorm and create a mascot.'], link: [{ label: 'View on Drive', url: 'https://drive.google.com/drive/folders/1yHbN5bEUX7J-nh5HPlfEDBv5ML67_Qqt?usp=sharing' }, { label: 'CENTRAL THAM', url: 'https://www.centraltham.com/th/newsroom/news-and-updates/150/central-tham-mascot-contest-illustration-impact-with-central-tham?fbclid=IwVERDUANwNt5leHRuA2FlbQIxMQABHvyW9tTacB4Tazik376LqPpoJUTVxjyg2cep4NC0u2eoOM1lKEtpr4APLc_q_aem_jeqlMmr6v_LT0I8hTT1W7g' }], tags: ['Hackathon', 'Design', 'Illustration'], image_url: '', description: 'Mascot design for Central Tham hackathon contest', case_study: null },
  { id: 1, title: 'GRAND SUWAN', date: '5 / 11 / 2024', role: ['Fullstack Developer'], details: ['Created website, Quotation, and LINE api for Family Business.', 'Platform: Built and designed on Wix.', 'Seamlessly linked Quotation Forms with LINE Messaging API/Notify.', 'Automated the data flow to ensure consistent and timely responses to customer leads.'], link: [{ label: 'View on Drive', url: 'https://drive.google.com/drive/folders/1NVeNw2uRRK6cXBaPld896XcZjgbEl7Pg?usp=sharing' }, { label: 'Visit Website', url: 'https://www.grandsuwanproperty.com/' }], tags: ['Frontend'], image_url: '', description: 'Website and LINE API integration for family real estate business', case_study: { problem: '\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E23\u0E31\u0E27\u0E02\u0E32\u0E14\u0E23\u0E30\u0E1A\u0E1A\u0E23\u0E31\u0E1A\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E17\u0E35\u0E48\u0E23\u0E27\u0E14\u0E40\u0E23\u0E47\u0E27 \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E43\u0E19\u0E01\u0E32\u0E23\u0E02\u0E32\u0E22', solution: '\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E30\u0E1A\u0E1A\u0E2A\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E32\u0E01\u0E41\u0E1A\u0E1A\u0E1F\u0E2D\u0E23\u0E4C\u0E21\u0E43\u0E1A\u0E40\u0E2A\u0E19\u0E2D\u0E23\u0E32\u0E04\u0E32\u0E15\u0E23\u0E07\u0E40\u0E02\u0E49\u0E32 LINE Notify \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E43\u0E2B\u0E49\u0E17\u0E35\u0E21\u0E07\u0E32\u0E19\u0E23\u0E39\u0E49\u0E15\u0E31\u0E27\u0E17\u0E31\u0E19\u0E17\u0E35', toolsUsed: 'Wix \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E42\u0E04\u0E23\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E27\u0E47\u0E1A \u0E41\u0E25\u0E30 LINE Messaging API \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E23\u0E30\u0E1A\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19', learning: '\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E39\u0E49\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E17\u0E33 Automation \u0E43\u0E19\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14\u0E02\u0E31\u0E49\u0E19\u0E15\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E17\u0E33\u0E07\u0E32\u0E19\u0E14\u0E49\u0E27\u0E22\u0E21\u0E37\u0E2D' } }
];

function App() {
  const [homeData, setHomeData] = useState<HomeContent | null>(null);
  const [profileData, setProfileData] = useState<ProfileContent | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'experience' || hash === 'profile') {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
      const sections = ['hero', 'experience', 'profile'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cached = loadCache();
    if (cached) {
      if (cached.home) setHomeData(cached.home);
      if (cached.profile) setProfileData(cached.profile);
      if (cached.projects.length > 0) setProjectsData(cached.projects);
      setLoading(false);
    }

    const fetchData = async () => {
      try {
        const [homeRes, profileRes, projectsRes] = await Promise.all([
          fetch('/api/home'), fetch('/api/profile'), fetch('/api/projects')
        ]);
        let home: HomeContent | null = null;
        let profile: ProfileContent | null = null;
        let projects: ProjectExperience[] = [];
        if (homeRes.ok) { const d = await homeRes.json(); if (d?.id) { home = d; setHomeData(d); } }
        if (profileRes.ok) { const d = await profileRes.json(); if (d?.id) { profile = d; setProfileData(d); } }
        if (projectsRes.ok) { const d = await projectsRes.json(); if (Array.isArray(d)) { projects = d; setProjectsData(d); } }
        saveCache(home, profile, projects);
      } catch {
        const c = loadCache();
        if (c) {
          if (c.home) setHomeData(c.home);
          if (c.profile) setProfileData(c.profile);
          if (c.projects.length > 0) setProjectsData(c.projects);
        } else {
          if (!homeData) setHomeData(FALLBACK_HOME);
          if (!profileData) setProfileData(FALLBACK_PROFILE);
          if (projectsData.length === 0) setProjectsData(FALLBACK_PROJECTS);
        }
      } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Work' },
    { id: 'profile', label: 'About' }
  ];

  return (
    <div className="app-container">
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a className="navbar-brand" href="#hero">TS.</a>
          <div className="navbar-links">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollTo('hero')} className="profile-btn">
              <img alt="profile" src={profileImg} className="navbar-profile-pic" />
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section id="hero" className="section hero-section">
          <div className="hero-content">
            <p className="hero-greeting">{homeData?.greeting || 'Hello \u2192'}</p>
            <h1 className="hero-name">{homeData?.name || 'Loading...'}</h1>
            <p className="hero-role">{homeData?.role || ''}</p>
            <p className="hero-desc">{homeData?.description || ''}</p>
            <div className="hero-actions">
              <button className="hero-btn primary" onClick={() => scrollTo('experience')}>
                View My Work <i className="bi bi-arrow-right"></i>
              </button>
              <button className="hero-btn secondary" onClick={() => scrollTo('profile')}>
                About Me <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="scroll-indicator animate-bounce" onClick={() => scrollTo('experience')}>
            <i className="bi bi-chevron-down"></i>
          </div>
          <div className="hero-decorations">
            <div className="hero-float float-1"></div>
            <div className="hero-float float-2"></div>
            <div className="hero-float float-3"></div>
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <ShowExperience data={projectsData} />
        </section>

        <section id="profile" className="section profile-section">
          {profileData ? <Profile data={profileData} /> : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '80px 20px' }}>
              {loading ? <p><i className="bi bi-arrow-repeat"></i> Loading...</p> : <p>Profile unavailable</p>}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} THITIRAT SIRISAWAD</p>
          <div className="footer-links">
            <a href="https://github.com/ddeeww001" target="_blank" rel="noreferrer">GitHub <i className="bi bi-arrow-up-right"></i></a>
            <a href="mailto:dewthitirat@gmail.com">Email <i className="bi bi-arrow-up-right"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
