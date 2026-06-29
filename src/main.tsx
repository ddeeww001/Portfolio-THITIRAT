import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './CSS/variables.css';
import './CSS/App.css';
import './CSS/navbar.css';
import './CSS/home.css';
import './CSS/experience.css';
import './CSS/showExperience.css';
import './CSS/profile.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
