import { useEffect, useState } from 'react';
import './frontend/CSS/variables.css';
import './frontend/CSS/trionn-components.css';
import './frontend/CSS/App.css';
import './frontend/CSS/navbar.css';
import './frontend/CSS/home.css';
import './frontend/CSS/profile.css';
import './frontend/CSS/experience.css';
import './frontend/CSS/certificate.css';

import Experience from './frontend/showExperience';
import Certificate from './frontend/certificate';
import { Profile, myDetailsData } from './frontend/Personal';
import { CustomCursor } from './frontend/components/CustomCursor';
import { MarqueeTicker } from './frontend/components/MarqueeTicker';
import { ServicesSection } from './frontend/components/ServicesSection';
import { StudioFAQ } from './frontend/components/StudioFAQ';
import { ContactSection } from './frontend/components/ContactSection';
import { playClickSound, playHoverSound, setSoundEnabled } from './frontend/components/SoundEffects';
const profileImg = '/picture/profile.jpg';

const scrollToSection = (sectionId: string) => {
  playClickSound();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Work' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'profile', label: 'About' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const getNavIcon = (id: string) => {
  switch (id) {
    case 'home':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'services':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'experience':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'certificates':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
    case 'profile':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'faq':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      );
    case 'contact':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 120;

      for (const section of sectionIds) {
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
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    setSoundEnabled(nextState);
    if (nextState) playClickSound();
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  const currentActiveItem = navItems.find((item) => item.id === activeSection) || navItems[0];

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="navbar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <header className="navbar-wrapper">
        <nav className="navbar-container">
          {/* Brand Logo & Profile Pic */}
          <div className="navbar-brand">
            <button
              onClick={() => handleNavClick('home')}
              className="navbar-profile-btn"
              onMouseEnter={playHoverSound}
              aria-label="Home"
            >
              <img
                alt="Thitirat Sirisawad"
                src={profileImg}
                className="navbar-profile-pic"
              />
            </button>
            <span
              className="navbar-logo-text"
              onClick={() => handleNavClick('home')}
            >
              THITIRAT<span className="navbar-logo-dot">.</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="navbar-desktop-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`navbar-nav-btn ${activeSection === item.id ? 'active' : ''}`}
                onMouseEnter={playHoverSound}
              >
                {item.label}
              </button>
            ))}

            {/* Sound Toggle Button */}
            <button
              className="sound-toggle-btn"
              onClick={toggleSound}
              title="Toggle UI sound feedback"
            >
              <div className={`sound-waves ${soundActive ? 'active' : ''}`}>
                <div className="sound-bar" />
                <div className="sound-bar" />
                <div className="sound-bar" />
                <div className="sound-bar" />
              </div>
              <span>{soundActive ? 'AUDIO ON' : 'MUTED'}</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="navbar-mobile-controls">
            <button
              className="sound-toggle-btn mobile-sound-btn"
              onClick={toggleSound}
              title="Toggle UI sound feedback"
            >
              <div className={`sound-waves ${soundActive ? 'active' : ''}`}>
                <div className="sound-bar" />
                <div className="sound-bar" />
                <div className="sound-bar" />
                <div className="sound-bar" />
              </div>
              <span className="mobile-sound-text">{soundActive ? 'ON' : 'OFF'}</span>
            </button>

            {/* Mobile Dropdown Trigger */}
            <button
              className={`navbar-mobile-dropdown-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={playHoverSound}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="navbar-dropdown-current-label">
                {currentActiveItem.label}
              </span>
              <svg
                className={`navbar-dropdown-chevron ${mobileMenuOpen ? 'rotated' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-dropdown">
            <div className="navbar-dropdown-list">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    className={`navbar-dropdown-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={playHoverSound}
                  >
                    <span className="navbar-dropdown-item-left">
                      <span className="navbar-dropdown-item-icon">
                        {getNavIcon(item.id)}
                      </span>
                      <span className="navbar-dropdown-item-text">{item.label}</span>
                    </span>
                    {isActive && <span className="navbar-dropdown-active-dot" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

// Studio Hero Section Inspired by OhhMyDesign
const HeroSection = () => {
  return (
    <section id="home" className="section hero-section" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '130px 20px 70px' }}>
      <div style={{ maxWidth: '1080px', textAlign: 'center', zIndex: 1, width: '100%' }}>
        
        {/* Availability Badge */}
        <div className="availability-pill animate-fade-in" style={{ display: 'inline-flex', marginBottom: '28px' }}>
          <span className="status-dot"></span>
          <span>AVAILABLE FOR FREELANCE & FULL-TIME ROLES WORLDWIDE</span>
        </div>

        {/* Studio Impact Hero Title */}
        <h1
          className="animate-slide-up"
          style={{
            fontSize: 'clamp(1.75rem, 7.5vw, 5.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '24px',
            color: '#ffffff',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '100%',
          }}
        >
          IMPOSSIBLE TO <br />
          <span style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', borderBottom: '3px solid #ffffff' }}>
            IGNORE .
          </span>
        </h1>

        <p
          className="animate-fade-in-delay"
          style={{
            fontSize: 'clamp(0.92rem, 2.5vw, 1.3rem)',
            color: 'var(--text-secondary)',
            maxWidth: '760px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          Thitirat Sirisawad — Creative Frontend & UX/UI Designer crafting bold digital products, intuitive web applications, and interfaces that refuse to look ordinary.
        </p>

        {/* Studio Hero Action Buttons */}
        <div className="animate-fade-in-delay-2" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => scrollToSection('experience')}
            style={{
              background: '#ffffff',
              color: '#0a0a0c',
              border: 'none',
              padding: '16px 36px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 0 25px rgba(255, 255, 255, 0.25)',
              transition: 'all 0.3s ease',
            }}
            className="interactive-hover"
            onMouseEnter={playHoverSound}
          >
            SEE THE WORK ↗
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              padding: '16px 36px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            className="interactive-hover"
            onMouseEnter={playHoverSound}
          >
            TALK WITH ME
          </button>
        </div>
      </div>
    </section>
  );
};

// Studio Statement Banner Section Inspired by OhhMyDesign
const StudioStatementSection = () => {
  return (
    <section style={{ padding: '90px 20px', background: 'var(--trionn-bg-alt)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
        <div className="availability-pill" style={{ marginBottom: '20px', display: 'inline-flex' }}>
          <span className="status-dot"></span>
          <span>THE STUDIO PHILOSOPHY</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(1.45rem, 4.5vw, 3.2rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            color: '#ffffff',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          We make people stop and ask, who made that?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.92rem, 2.2vw, 1.15rem)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.65, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          That reaction is the whole job. Strategy, UI/UX design, and clean frontend code built for products that refuse to look ordinary. No templates, ever.
        </p>
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="app-container">
      {/* Custom follower cursor & spotlight */}
      <CustomCursor />

      <Navbar />

      <main>
        <HeroSection />

        {/* Marquee Loop Ticker */}
        <MarqueeTicker />

        {/* Studio Philosophy Statement */}
        <StudioStatementSection />

        {/* Services Grid Section ("What I Make") */}
        <ServicesSection />

        {/* Featured Work Showcase Grid */}
        <section id="experience" className="section experience-section">
          <Experience />
        </section>

        {/* Continuous Certificate Marquee Gallery */}
        <Certificate />

        {/* Profile & Live GitHub API Hub */}
        <section id="profile" className="section profile-section">
          <Profile data={myDetailsData} />
        </section>

        {/* Studio FAQ ("The Nosy Section") */}
        <StudioFAQ />

        {/* Contact Form & Studio Footer */}
        <ContactSection />
      </main>

      <footer className="footer" style={{ borderTop: '1px solid var(--border-subtle)', padding: '40px 20px', background: 'var(--trionn-bg-alt)' }}>
        <div className="footer-content" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              © 2026 THITIRAT SIRISAWAD.
            </p>
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: '20px' }}>
            <a href="https://github.com/ddeeww001" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', fontWeight: 600 }}>
              GitHub ↗
            </a>
            <a href="mailto:dewthitirat@gmail.com" style={{ color: 'var(--text-secondary)' }}>
              dewthitirat@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;



// Made with Bob
