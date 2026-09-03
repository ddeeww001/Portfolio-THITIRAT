// src/data/profileData.ts
// Centralized database for personal profile information
import { deepFreeze } from '../utils/security';

export interface SocialLink {
  label: string;
  value: string;
  link?: string;
}

export interface Language {
  lang: string;
  level: string;
}

export interface ProfileData {
  id: number;
  name: string;
  role: string[];
  birthday: string;
  email: string;
  phone: string;
  socials: SocialLink[];
  introduce: string;
  technicalSkills: string[];
  tools: string[];
  languages: Language[];
  certifications: string[];
  profileImage?: string;
}

// Centralized environment variables configuration with safe fallbacks
export const ENV_CONFIG = deepFreeze({
  name: import.meta.env.VITE_USER_NAME || "THITIRAT SIRISAWAD",
  email: import.meta.env.VITE_USER_EMAIL || "dewthitirat@gmail.com",
  phone: import.meta.env.VITE_USER_PHONE || "099-430-0222",
  birthday: import.meta.env.VITE_USER_BIRTHDAY || "14 June 2006",
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || "ddeeww001",
  githubUrl: import.meta.env.VITE_GITHUB_URL || "https://github.com/ddeeww001",
  lineId: import.meta.env.VITE_LINE_ID || "t.s",
  instagramUsername: import.meta.env.VITE_INSTAGRAM_USERNAME || "ddeeww_o_o",
  instagramUrl: import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com/ddeeww_o_o",
  facebookName: import.meta.env.VITE_FACEBOOK_NAME || "Dew Chobkinkaitod",
  facebookUrl: import.meta.env.VITE_FACEBOOK_URL || "https://facebook.com/dew.chobkinkaitod",
  securityMode: import.meta.env.VITE_SECURITY_MODE || "strict",
  enableSelfXssWarning: import.meta.env.VITE_ENABLE_SELF_XSS_WARNING !== "false",
  enableSecurityLogs: import.meta.env.VITE_ENABLE_SECURITY_LOGS !== "false",
  testCspEnforce: import.meta.env.VITE_TEST_CSP_ENFORCE === "true",
});

// Main profile database
export const profileDatabase: ProfileData = deepFreeze({
  id: 1,
  name: ENV_CONFIG.name,
  role: ["UX/UI Designer", "Frontend Developer"],
  birthday: ENV_CONFIG.birthday,
  email: ENV_CONFIG.email,
  phone: ENV_CONFIG.phone,
  socials: [
    { 
      label: "GitHub", 
      value: ENV_CONFIG.githubUsername, 
      link: ENV_CONFIG.githubUrl 
    },
    { 
      label: "Line ID", 
      value: ENV_CONFIG.lineId 
    },
    { 
      label: "Instagram", 
      value: ENV_CONFIG.instagramUsername,
      link: ENV_CONFIG.instagramUrl
    },
    { 
      label: "Facebook", 
      value: ENV_CONFIG.facebookName,
      link: ENV_CONFIG.facebookUrl
    }
  ],
  introduce: "I am a passionate UX/UI Designer and Frontend Developer dedicated to creating intuitive, user-centric digital experiences with modern design.",
  
  technicalSkills: [
    "Java",
    "HTML",
    "CSS",
    "React",
    "TypeScript",
    "JavaScript"
  ],
  
  tools: [
    "Figma",
    "Canva",
    "Visual Studio Code",
    "IntelliJ",
    "Affinity"
  ],
  
  languages: [
    { lang: "Thai", level: "Native" },
    { lang: "English", level: "Pre-intermediate" }
  ],
  
  certifications: [
    "UXUI Foundation Program (LIFELONG) - Organized by T.C.C. Technology Co., Ltd",
    "Creativity and Imagination (LIFELONG)",
    "Agile Thinking",
    "Logical Reasoning",
    "Capability",
    "Active Listening",
    "Adopting Different Perspectives",
    "Asking the Right Questions",
    "Learning How to Learn",
    "Seeking Relevant Information",
    "Storytelling and Public Speaking",
    "Structured Problem Solving",
    "Synthesizing Messages",
    "Time Management and Prioritization",
    "Translating Knowledge to Different Contexts",
    "Understanding Biases",
    "Work-Plan Development"
  ]
});

// Helper functions
export const getProfileData = (): ProfileData => {
  return profileDatabase;
};

export const getContactInfo = () => {
  return {
    email: profileDatabase.email,
    phone: profileDatabase.phone,
    birthday: profileDatabase.birthday
  };
};

export const getSocialLinks = (): SocialLink[] => {
  return profileDatabase.socials;
};

export const getSkills = () => {
  return {
    technical: profileDatabase.technicalSkills,
    tools: profileDatabase.tools
  };
};

export const getLanguages = (): Language[] => {
  return profileDatabase.languages;
};

export const getCertifications = (): string[] => {
  return profileDatabase.certifications;
};

// Made with Bob
