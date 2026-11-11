// src/config/profileDefaults.ts
// Fallback profile values, used when a VITE_* value is missing from .env / the host settings
// (e.g. a deploy where environment variables were not configured).
// .env (or the host) always wins; edit here only to change what a deploy shows without env vars.
// NOTE: everything here is committed to git and public — never put secrets in this file.
// Plain object (no ImportMetaEnv type) so vite.config.ts can import it too, for the <title>.
export const PROFILE_DEFAULTS: Readonly<Partial<Record<`VITE_${string}`, string>>> = {
  VITE_USER_NAME: "THITIRAT SIRISAWAD",
  VITE_USER_EMAIL: "dewthitirat@gmail.com",
  VITE_USER_PHONE: "099-430-0222",
  VITE_USER_BIRTHDAY: "14 June 2006",
  VITE_GITHUB_USERNAME: "ddeeww001",
  VITE_GITHUB_URL: "https://github.com/ddeeww001",
  VITE_LINE_ID: "t.s",
  VITE_INSTAGRAM_USERNAME: "ddeeww_o_o",
  VITE_INSTAGRAM_URL: "https://instagram.com/ddeeww_o_o",
  VITE_FACEBOOK_NAME: "Dew Chobkinkaitod",
  VITE_FACEBOOK_URL: "https://facebook.com/dew.chobkinkaitod",
};
