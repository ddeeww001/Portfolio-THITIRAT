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
import { ContactSection } from './frontend/components/ContactSection';
import { playClickSound, playHoverSound, setSoundEnabled } from './frontend/components/SoundEffects';
import profileImg from './picture/profile.jpg';

const scrollToSection = (sectionId: string) => {
  playClickSound();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'certificates', 'profile', 'contact'];
      const scrollPosition = window.scrollY + 120;

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
  }, []);

  const toggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    setSoundEnabled(nextState);
    if (nextState) playClickSound();
  };

  return (
    <div className="navbar" style={{ background: 'rgba(7, 8, 10, 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-subtle)' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={() => scrollToSection('home')} className="profile-btn" onMouseEnter={playHoverSound} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <img alt="Thitirat Sirisawad" src={profileImg} className="navbar-profile-pic" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid var(--neon-lime)' }} />
          </button>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            THITIRAT<span style={{ color: 'var(--neon-lime)' }}>.</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''} onMouseEnter={playHoverSound}>
            Home
          </button>
          <button onClick={() => scrollToSection('experience')} className={activeSection === 'experience' ? 'active' : ''} onMouseEnter={playHoverSound}>
            Projects
          </button>
          <button onClick={() => scrollToSection('certificates')} className={activeSection === 'certificates' ? 'active' : ''} onMouseEnter={playHoverSound}>
            Certificates
          </button>
          <button onClick={() => scrollToSection('profile')} className={activeSection === 'profile' ? 'active' : ''} onMouseEnter={playHoverSound}>
            About
          </button>
          <button onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''} onMouseEnter={playHoverSound}>
            Contact
          </button>

          {/* Sound Toggle */}
          <button className="sound-toggle-btn" onClick={toggleSound} title="Toggle UI sound feedback">
            <div className={`sound-waves ${soundActive ? 'active' : ''}`}>
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
            </div>
            <span>{soundActive ? 'AUDIO ON' : 'MUTED'}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

// Hero Section with Trionn Aesthetic
const HeroSection = () => {
  return (
    <section id="home" className="section hero-section" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '120px 20px 60px' }}>
      <div style={{ maxWidth: '1000px', textAlign: 'center', zIndex: 1 }}>
        
        {/* Availability Badge */}
        <div className="availability-pill animate-fade-in" style={{ display: 'inline-flex', marginBottom: '28px' }}>
          <span className="status-dot"></span>
          <span>AVAILABLE FOR FREELANCE & FULL-TIME ROLES</span>
        </div>

        {/* Hero Title */}
        <h1
          className="animate-slide-up"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}
        >
          THITIRAT SIRISAWAD <br />
          <span style={{ background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            CREATIVE FRONTEND & UX/UI
          </span>
        </h1>

        <p
          className="animate-fade-in-delay"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          Dedicated to building intuitive, high-performance digital products and visually captivating web experiences with modern architecture.
        </p>

        {/* Hero Action Buttons */}
        <div className="animate-fade-in-delay-2" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => scrollToSection('experience')}
            style={{
              background: 'var(--neon-lime)',
              color: '#0b0f19',
              border: 'none',
              padding: '14px 32px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 0 25px var(--neon-lime-glow)',
              transition: 'all 0.3s ease',
            }}
            className="interactive-hover"
            onMouseEnter={playHoverSound}
          >
            VIEW FEATURED WORK ↗
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
              padding: '14px 32px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            className="interactive-hover"
            onMouseEnter={playHoverSound}
          >
            GET IN TOUCH
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => scrollToSection('experience')}
          style={{
            marginTop: '60px',
            cursor: 'pointer',
            color: 'var(--neon-lime)',
            fontSize: '1.5rem',
            animation: 'bounce 2s infinite',
          }}
        >
          ↓
        </div>
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

        <section id="experience" className="section experience-section">
          <Experience />
        </section>

        <section id="certificates" className="section">
          <Certificate />
        </section>

        <section id="profile" className="section profile-section">
          <Profile data={myDetailsData} />
        </section>

        {/* Security & Anti-Spam Contact Form */}
        <ContactSection />
      </main>

      <footer className="footer" style={{ borderTop: '1px solid var(--border-subtle)', padding: '40px 20px', background: 'var(--trionn-bg-alt)' }}>
        <div className="footer-content" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              © 2026 THITIRAT SIRISAWAD. All rights reserved. • Redesigned with Trionn Cyber Aesthetics.
            </p>
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: '20px' }}>
            <a href="https://github.com/ddeeww001" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-lime)' }}>
              GitHub ↗
            </a>
            <a href="mailto:dewthitirat@gmail.com" style={{ color: 'var(--text-primary)' }}>
              Email Direct
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


// Made with Bob
