// src/data/profileData.ts
// Centralized database for personal profile information
import { deepFreeze } from '../../shared/lib/security';

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

// Environment config now lives in src/config/env.ts; re-exported here for existing imports.
import { ENV_CONFIG } from '../../config/env';
export { ENV_CONFIG };

// Main profile database
export const profileDatabase: ProfileData = deepFreeze({
  id: 1,
  name: ENV_CONFIG.name,
  role: ["UX/UI Designer", "Frontend Developer"],
  birthday: ENV_CONFIG.birthday,
  email: ENV_CONFIG.email,
  phone: ENV_CONFIG.phone,
  // Entries whose value is missing from .env are dropped, so the UI never shows an empty icon.
  socials: [
    {
      label: "GitHub",
      value: ENV_CONFIG.githubUsername,
      link: ENV_CONFIG.githubUrl
    },
    {
      label: "Line",
      value: ENV_CONFIG.lineId,
      link: ENV_CONFIG.lineId ? `https://line.me/ti/p/~${encodeURIComponent(ENV_CONFIG.lineId)}` : ''
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
  ].filter((s) => s.value && s.link),
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

/** True when .env provides at least one way to reach the owner (email, phone or a social link). */
export const hasContactChannels =
  !!profileDatabase.email || !!profileDatabase.phone || profileDatabase.socials.length > 0;

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
