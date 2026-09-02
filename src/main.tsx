import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './frontend/CSS/App.css';
import './frontend/CSS/variables.css';
import './frontend/CSS/navbar.css';
import './frontend/CSS/home.css';
import './frontend/CSS/profile.css';
import './frontend/CSS/experience.css';
import App from './App.tsx'
import { initSecurityGuards } from './utils/security.ts';

// Initialize Client Security & Console Warnings
initSecurityGuards();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
