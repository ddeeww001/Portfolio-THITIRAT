import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles/App.css';
import './shared/styles/variables.css';
import './app/styles/navbar.css';
import './app/styles/home.css';
import './features/profile/profile.css';
import './features/projects/experience.css';
import App from './app/App.tsx'
import { initSecurityGuards } from './shared/lib/security.ts';
import { ENV_CONFIG } from './config/env.ts';

// Initialize Client Security & Console Warnings
initSecurityGuards({ selfXssWarning: ENV_CONFIG.enableSelfXssWarning });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
