import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Same headers as public/_headers (production), so dev and `vite preview` behave like the live site.
const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: { headers: SECURITY_HEADERS },
  preview: { headers: SECURITY_HEADERS },
  esbuild: {
    // Production: remove EVERY `console.*` call and `debugger` (our code and bundled libraries),
    // so no paths, errors or data can leak to visitors' DevTools.
    // The only exception is the Self-XSS warning, which deliberately calls `window.console`.
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
  },
  build: {
    sourcemap: false, // never ship source maps: they expose the original source code
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
}));
