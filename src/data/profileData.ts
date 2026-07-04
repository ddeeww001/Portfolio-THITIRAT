// src/data/profileData.ts
// Centralized database for personal profile information

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

// Main profile database
export const profileDatabase: ProfileData = {
  id: 1,
  name: "THITIRAT SIRISAWAD",
  role: ["UX/UI Designer", "Frontend Developer"],
  birthday: "14 June 2006",
  email: "dewthitirat@gmail.com",
  phone: "099-430-0222",
  socials: [
    { 
      label: "GitHub", 
      value: "ddeeww001", 
      link: "https://github.com/ddeeww001" 
    },
    { 
      label: "Line ID", 
      value: "t.s" 
    },
    { 
      label: "Instagram", 
      value: "ddeeww_o_o",
      link: "https://instagram.com/ddeeww_o_o"
    },
    { 
      label: "Facebook", 
      value: "Dew Chobkinkaitod",
      link: "https://facebook.com/dew.chobkinkaitod"
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
    "Logical Resoning",
    "Aapability",
    "Active listening",
    "Adopting different perspectives",
    "Asink the right questions",
    "Learning how to learn",
    "Seeking relevant information",
    "Storytelling and Pulblic Speaking",
    "Structured Provlem Ssoving",
    "Synthizing messages",
    "Time Management and Priotization",
    "Translatingg Knoeledge to different context",
    "Understanding Biases",
    "Work-plan Development"
  ]
};

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
