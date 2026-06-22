import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import './CSS/App.css';
import './CSS/variables.css';
import './CSS/navbar.css';
import './CSS/home.css';
import './CSS/profile.css';
import './CSS/experience.css';
import './CSS/showExperience.css';

import Experience from './frontend/showExperience';
import { Profile } from './frontend/Personal';
import Login from './frontend/Login';
import AdminDashboard from './frontend/AdminDashboard';
import profileImg from './picture/profile.jpg';
import type { HomeContent, ProfileContent, ProjectExperience } from './types/portfolio';

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
  const isLoginPage = location.pathname === '/login' || location.pathname === '/admin-dashboard';

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
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/login" className="profile-btn">
            <img alt="ddeeww_o_o" src={profileImg} className="navbar-profile-pic" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

// Hero Section with dynamic data
const HeroSection = ({ data }: { data: HomeContent | null }) => {
  if (!data) return <div style={{ height: '100vh' }}></div>;

  return (
    <section id="home" className="section hero-section">
      <div className="hero-glass-card fade-in">
        <div className="hero-content">
          <p className="greeting animate-slide-down">
            <i className="bi bi-hand-wave"></i> {data.greeting}
          </p>
          <h1 className="hero-name animate-slide-up">{data.name}</h1>
          <h2 className="hero-role animate-fade-in">{data.role}</h2>
          <p className="hero-description animate-fade-in-delay">{data.description}</p>
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
  const [homeData, setHomeData] = useState<HomeContent | null>(null);
  const [profileData, setProfileData] = useState<ProfileContent | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectExperience[]>([]);

  useEffect(() => {
    const fetchData = async <T,>(url: string, setter: (data: T) => void) => {
      try {
        const res = await fetch(url);
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setter(data);
        }
      } catch (err) {
        console.error(`Failed to fetch from ${url}:`, err);
      }
    };

    fetchData<HomeContent>('/api/home', setHomeData);
    fetchData<ProfileContent>('/api/profile', setProfileData);
    fetchData<ProjectExperience[]>('/api/projects', setProjectsData);
  }, []);

  return (
    <>
      <Navbar />
      <main className="main-content">
        <HeroSection data={homeData} />
        
        <section id="experience" className="section experience-section">
          <Experience data={projectsData} />
        </section>
        
        <section id="profile" className="section profile-section">
          {profileData && <Profile data={profileData} />}
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
  const [isAdmin, setIsAdmin] = useState(() => {
    return !!localStorage.getItem('adminUser');
  });

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="app-container">
        <div className="bg-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>

        <Routes>
          <Route path="/" element={<PortfolioPage isAdmin={isAdmin} onLogout={handleLogout} />} />
          <Route path="/login" element={isAdmin ? <Navigate to="/admin-dashboard" replace /> : <Login />} />
          <Route path="/admin-dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
