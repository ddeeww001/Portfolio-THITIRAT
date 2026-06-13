export interface HomeContent {
  id?: number;
  greeting: string;
  name: string;
  role: string;
  description: string;
  about_me_link: string;
}

export interface SocialMedia {
  platform: string; // e.g., GitHub, Email
  url: string;      // e.g., https://github.com/...
  username?: string; // Optional: display name
}

export interface TechnicalSkill {
  skill: string;
  level: string;
}

export interface LanguageSkill {
  lang: string;
  level: string;
}

export interface ProfileContent {
  id?: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  introduce: string;
  role: string[];
  socials: SocialMedia[];
  technicalSkills: TechnicalSkill[];
  tools: string[];
  languages: LanguageSkill[];
  certifications: string[];
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface ProjectExperience {
  id: number;
  title: string;
  date: string;
  role: string[];
  details: string[];
  link: LinkItem[];
  tags: string[];
  image_url: string;
  description: string;
  is_deleted?: number;
}
