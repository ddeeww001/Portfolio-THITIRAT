import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './CSS/App.css';
import './CSS/variables.css';
import './CSS/navbar.css';
import './CSS/home.css';
import './CSS/profile.css';
import './CSS/experience.css';

import Experience from './frontend/showExperience';
import { Profile } from './frontend/Personal';
import Login from './frontend/Login';
import AdminDashboard from './frontend/AdminDashboard';
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
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {isAdmin && (
            <Link to="/admin-dashboard" className="admin-badge" style={{ 
              background: 'var(--primary-gradient)', 
              color: 'white', 
              padding: '4px 12px', 
              borderRadius: 'var(--radius-full)',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
              Admin Dashboard
            </Link>
          )}
          <Link to="/login" className="profile-btn">
            <img alt="ddeeww_o_o" src={profileImg} className="navbar-profile-pic" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

// Hero Section with dynamic data
const HeroSection = ({ data }: { data: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  if (!data) return <div style={{ height: '100vh' }}></div>;

  return (
    <section id="home" className="section hero-section">
      <div className={`hero-glass-card ${isVisible ? 'fade-in' : ''}`}>
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
  const [homeData, setHomeData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async (url: string, setter: any) => {
      try {
        const res = await fetch(url);
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setter(data);
        } else {
          console.error(`Error fetching ${url}: Not a JSON response`);
        }
      } catch (err) {
        console.error(`Failed to fetch from ${url}:`, err);
      }
    };

    fetchData('http://localhost:5000/api/home', setHomeData);
    fetchData('http://localhost:5000/api/profile', setProfileData);
  }, []);

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <main className="main-content">
        <HeroSection data={homeData} />
        
        <section id="experience" className="section experience-section">
          <Experience />
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (user) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
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
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={isAdmin ? <AdminDashboard /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
