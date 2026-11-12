import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { PUBLIC_PROFILE } from './src/config/profile';

/** Fills __PROFILE_NAME__ in index.html with the public name from src/config/profile.ts. */
function profileNameInHtml(): Plugin {
  const name = PUBLIC_PROFILE.name.trim() || 'Portfolio';
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
  plugins: [react(), profileNameInHtml()],
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
