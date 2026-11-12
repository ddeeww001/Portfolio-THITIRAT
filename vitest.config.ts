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
    // Fixed fake values so tests never depend on (or leak) the real .env.
    // (Public profile data is in src/config/profile.ts, not env.)
    env: {
      VITE_USER_PHONE: '000-000-0000',
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
