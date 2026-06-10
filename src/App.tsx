import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './CSS/App.css';
import './CSS/variables.css';
import './CSS/navbar.css';
import './CSS/home.css';
import './CSS/profile.css';
import './CSS/experience.css';

import Experience from './frontend/showExperience';
import { Profile, myDetailsData } from './frontend/Personal';
import Login from './frontend/Login';
import profileImg from './picture/profile.jpg';

// Smooth scroll navigation
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    if (isLoginPage) return;

    const handleScroll = () => {
      const sections = ['home', 'experience', 'profile'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoginPage]);

  if (isLoginPage) return null;

  return (
    <div className="navbar">
      <nav>
        <button
          onClick={() => scrollToSection('home')}
          className={activeSection === 'home' ? 'active' : ''}
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('experience')}
          className={activeSection === 'experience' ? 'active' : ''}
        >
          Experience
        </button>
        <button
          onClick={() => scrollToSection('profile')}
          className={activeSection === 'profile' ? 'active' : ''}
        >
          Profile
        </button>
        <div className="navbar-right">
          {isAdmin && <span className="admin-badge">Admin Mode</span>}
          <Link to="/login" className="profile-btn">
            <img alt="ddeeww_o_o" src={profileImg} className="navbar-profile-pic" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="section hero-section">
      <div className={`hero-glass-card ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <p className="greeting animate-slide-down">
            <i className="bi bi-hand-wave"></i> Welcome to my portfolio
          </p>
          <h1 className="hero-name animate-slide-up">THITIRAT SIRISAWAD</h1>
          <h2 className="hero-role animate-fade-in">UX/UI Designer & Frontend Developer</h2>
          <p className="hero-description animate-fade-in-delay">
            เว็บไซต์นี้รวบรวมความตั้งใจของฉันในการออกแบบและพัฒนาเว็บไซต์
            ฉันหลงใหลในการสร้างสรรค์ประสบการณ์ดิจิทัลที่ใช้งานง่ายและมีดีไซน์ที่ทันสมัย
            หวังว่าคุณจะสนุกกับการเยี่ยมชมผลงานของฉันนะคะ
          </p>
          <div className="hero-actions animate-fade-in-delay-2">
            <button onClick={() => scrollToSection('profile')} className="btn-primary">
              <span>About Me</span>
            </button>
          </div>
          <div className="scroll-indicator animate-bounce" onClick={() => scrollToSection('experience')}>
            <i className="bi bi-arrow-down"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioPage = ({ isAdmin, onLogout }: { isAdmin: boolean, onLogout: () => void }) => {
  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <main className="main-content">
        <HeroSection />
        
        <section id="experience" className="section experience-section">
          <Experience />
        </section>
        
        <section id="profile" className="section profile-section">
          <Profile data={myDetailsData} />
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 THITIRAT SIRISAWAD. All rights reserved.</p>
          <div className="footer-links">
            {isAdmin && (
              <button onClick={onLogout} className="logout-link" style={{ 
                background: 'none', 
                border: '1px solid var(--border-subtle)', 
                color: 'var(--text-muted)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                marginRight: '15px'
              }}>
                Logout Admin
              </button>
            )}
            <a href="https://github.com/ddeeww001" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="mailto:dewthitirat@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check local storage for admin session
    const user = localStorage.getItem('adminUser');
    if (user) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    setIsAdmin(false);
    window.location.reload();
  };

  return (
    <Router>
      <div className="app-container">
        {/* Persistent background decoration for all pages */}
        <div className="bg-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>

        <Routes>
          <Route path="/" element={<PortfolioPage isAdmin={isAdmin} onLogout={handleLogout} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
