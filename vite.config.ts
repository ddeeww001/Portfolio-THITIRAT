import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { PROFILE_DEFAULTS } from './src/config/profileDefaults';

/** Fills __PROFILE_NAME__ in index.html: .env / host env first, then the fallback in profileDefaults.ts. */
function profileNameInHtml(mode: string): Plugin {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const name = env.VITE_USER_NAME?.trim() || PROFILE_DEFAULTS.VITE_USER_NAME?.trim() || 'Portfolio';
  const escaped = name.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  return {
    name: 'profile-name-in-html',
    transformIndexHtml: (html) => html.replaceAll('__PROFILE_NAME__', escaped),
  };
}

// Same security headers as vercel.json (production), so dev and `vite preview` behave like the live site.
const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), profileNameInHtml(mode)],
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
