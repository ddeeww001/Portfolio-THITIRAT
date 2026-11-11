/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USER_NAME?: string;
  readonly VITE_USER_EMAIL?: string;
  readonly VITE_USER_PHONE?: string;
  readonly VITE_USER_BIRTHDAY?: string;
  readonly VITE_GITHUB_USERNAME?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_LINE_ID?: string;
  readonly VITE_INSTAGRAM_USERNAME?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_FACEBOOK_NAME?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_SECURITY_MODE?: string;
  readonly VITE_ENABLE_SELF_XSS_WARNING?: string;
  readonly VITE_ENABLE_SECURITY_LOGS?: string;
  readonly VITE_TEST_CSP_ENFORCE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
