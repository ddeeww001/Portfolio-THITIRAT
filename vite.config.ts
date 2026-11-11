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
    // Production: strip `debugger` and stray debug/info logs (console.log stays for the Self-XSS warning).
    drop: mode === 'production' ? ['debugger'] : [],
    pure: mode === 'production' ? ['console.debug', 'console.info', 'console.trace'] : [],
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
