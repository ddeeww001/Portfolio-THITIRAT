// src/config/profile.ts
// PUBLIC profile data — information that is meant to be seen (it is on the site, on GitHub and on
// social media anyway), so it lives directly in the code instead of .env and needs no host setup.
//
// Not here on purpose (kept in .env / the host's env vars only):
//   • phone number → VITE_USER_PHONE  (see src/config/env.ts)
// Never put passwords, tokens or other secrets in this file: it is committed to git.
//
// No imports: vite.config.ts also reads this file (for the page <title>).
export const PUBLIC_PROFILE = Object.freeze({
  name: 'THITIRAT SIRISAWAD',
  email: 'dewthitirat@gmail.com',
  githubUsername: 'ddeeww001',
  githubUrl: 'https://github.com/ddeeww001',
  lineId: 't.s',
  instagramUsername: 'ddeeww_o_o',
  instagramUrl: 'https://instagram.com/ddeeww_o_o',
  facebookName: 'Dew Chobkinkaitod',
  facebookUrl: 'https://facebook.com/dew.chobkinkaitod',
});

export type PublicProfile = typeof PUBLIC_PROFILE;
