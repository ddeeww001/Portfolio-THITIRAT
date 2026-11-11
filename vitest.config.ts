/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: false,
    // Fixed fake profile so tests never depend on (or leak) the real .env values.
    env: {
      VITE_USER_NAME: 'TEST USER',
      VITE_USER_EMAIL: 'test.user@example.com',
      VITE_USER_PHONE: '000-000-0000',
      VITE_USER_BIRTHDAY: '1 January 2000',
      VITE_GITHUB_USERNAME: 'test-user',
      VITE_GITHUB_URL: 'https://github.com/test-user',
      VITE_LINE_ID: 'test.line',
      VITE_INSTAGRAM_USERNAME: 'test.ig',
      VITE_INSTAGRAM_URL: 'https://instagram.com/test.ig',
      VITE_FACEBOOK_NAME: 'Test User',
      VITE_FACEBOOK_URL: 'https://facebook.com/test.user',
      VITE_SECURITY_MODE: 'strict',
      VITE_ENABLE_SELF_XSS_WARNING: 'true',
      VITE_ENABLE_SECURITY_LOGS: 'true',
      VITE_TEST_CSP_ENFORCE: 'false',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'tests/setup.ts'],
    },
  },
});
