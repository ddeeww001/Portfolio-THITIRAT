import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './home.css'
import './variables.css'
import './navbar.css'
import './profile.css'
import './experience.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
