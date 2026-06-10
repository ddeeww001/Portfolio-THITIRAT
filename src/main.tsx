import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './CSS/home.css'
import './CSS/variables.css'
import './CSS/navbar.css'
import './CSS/profile.css'
import './CSS/experience.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
