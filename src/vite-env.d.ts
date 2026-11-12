/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Public profile data (name, email, GitHub, socials) is in src/config/profile.ts — not env.
  readonly VITE_USER_PHONE?: string;
  readonly VITE_SECURITY_MODE?: string;
  readonly VITE_ENABLE_SELF_XSS_WARNING?: string;
  readonly VITE_ENABLE_SECURITY_LOGS?: string;
  readonly VITE_TEST_CSP_ENFORCE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
