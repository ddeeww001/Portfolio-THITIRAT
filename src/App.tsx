import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import './variables.css';
import './navbar.css';
import './home.css';
import './profile.css';
import './experience.css';

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

const Navbar = () => {
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
        <Link to="/login" className="profile-btn">
          <img alt="ddeeww_o_o" src={profileImg} className="navbar-profile-pic" />
        </Link>
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
          <p className="greeting animate-slide-down">👋 Welcome to my portfolio</p>
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
            <span>↓</span>
          </div>
        </div>
      </div>
      <div className="hero-bg-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </section>
  );
};

const PortfolioPage = () => {
  return (
    <>
      <Navbar />
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
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// Made with Bob
