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
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
