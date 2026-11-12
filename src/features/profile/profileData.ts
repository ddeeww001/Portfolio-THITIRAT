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

// Public data is in src/config/profile.ts; only the phone number comes from .env (src/config/env.ts).
import { ENV_CONFIG } from '../../config/env';
import { PUBLIC_PROFILE } from '../../config/profile';
export { ENV_CONFIG };

// Main profile database
export const profileDatabase: ProfileData = deepFreeze({
  id: 1,
  name: PUBLIC_PROFILE.name,
  role: ["UX/UI Designer", "Frontend Developer"],
  email: PUBLIC_PROFILE.email,
  phone: ENV_CONFIG.phone, // from .env only — empty → the "Call" icon is hidden
  // Entries with an empty value are dropped, so the UI never shows an empty icon.
  socials: [
    {
      label: "GitHub",
      value: PUBLIC_PROFILE.githubUsername,
      link: PUBLIC_PROFILE.githubUrl
    },
    {
      label: "Line",
      value: PUBLIC_PROFILE.lineId,
      link: PUBLIC_PROFILE.lineId ? `https://line.me/ti/p/~${encodeURIComponent(PUBLIC_PROFILE.lineId)}` : ''
    },
    {
      label: "Instagram",
      value: PUBLIC_PROFILE.instagramUsername,
      link: PUBLIC_PROFILE.instagramUrl
    },
    {
      label: "Facebook",
      value: PUBLIC_PROFILE.facebookName,
      link: PUBLIC_PROFILE.facebookUrl
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
    phone: profileDatabase.phone
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
