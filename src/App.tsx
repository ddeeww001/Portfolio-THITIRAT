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

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'experience', 'certificates', 'profile', 'faq', 'contact'];
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
    <div className="navbar" style={{ background: 'rgba(10, 10, 12, 0.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-subtle)' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={() => scrollToSection('home')} className="profile-btn" onMouseEnter={playHoverSound} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <img alt="Thitirat Sirisawad" src={profileImg} className="navbar-profile-pic" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #ffffff' }} />
          </button>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            THITIRAT<span style={{ color: '#ffffff' }}>.</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''} onMouseEnter={playHoverSound}>
            Home
          </button>
          <button onClick={() => scrollToSection('services')} className={activeSection === 'services' ? 'active' : ''} onMouseEnter={playHoverSound}>
            Services
          </button>
          <button onClick={() => scrollToSection('experience')} className={activeSection === 'experience' ? 'active' : ''} onMouseEnter={playHoverSound}>
            Work
          </button>
          <button onClick={() => scrollToSection('certificates')} className={activeSection === 'certificates' ? 'active' : ''} onMouseEnter={playHoverSound}>
            Certificates
          </button>
          <button onClick={() => scrollToSection('profile')} className={activeSection === 'profile' ? 'active' : ''} onMouseEnter={playHoverSound}>
            About
          </button>
          <button onClick={() => scrollToSection('faq')} className={activeSection === 'faq' ? 'active' : ''} onMouseEnter={playHoverSound}>
            FAQ
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

// Studio Hero Section Inspired by OhhMyDesign
const HeroSection = () => {
  return (
    <section id="home" className="section hero-section" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '130px 20px 70px' }}>
      <div style={{ maxWidth: '1080px', textAlign: 'center', zIndex: 1 }}>
        
        {/* Availability Badge */}
        <div className="availability-pill animate-fade-in" style={{ display: 'inline-flex', marginBottom: '32px' }}>
          <span className="status-dot"></span>
          <span>AVAILABLE FOR FREELANCE & FULL-TIME ROLES WORLDWIDE</span>
        </div>

        {/* Studio Impact Hero Title */}
        <h1
          className="animate-slide-up"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6.2rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            marginBottom: '24px',
            color: '#ffffff',
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
            fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
            color: 'var(--text-secondary)',
            maxWidth: '760px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
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
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div className="availability-pill" style={{ marginBottom: '20px', display: 'inline-flex' }}>
          <span className="status-dot"></span>
          <span>THE STUDIO PHILOSOPHY</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            color: '#ffffff',
          }}
        >
          We make people stop and ask, who made that?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.65 }}>
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
              © 2026 THITIRAT SIRISAWAD. All rights reserved. • Studio Architecture Inspired by OhhMyDesign.
            </p>
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: '20px' }}>
            <a href="https://github.com/ddeeww001" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', fontWeight: 600 }}>
              GitHub ↗
            </a>
            <a href="mailto:dewthitirat@gmail.com" style={{ color: 'var(--text-secondary)' }}>
              hello@thitirat.dev
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;



// Made with Bob
