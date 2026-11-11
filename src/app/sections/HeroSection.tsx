import { profileDatabase } from '../../features/profile/profileData';
import { playHoverSound } from '../../shared/lib/SoundEffects';
import { scrollToSection } from '../navigation';

export const HeroSection = () => (
  <section id="home" className="section hero-section" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '130px 20px 70px' }}>
    <div style={{ maxWidth: '1080px', textAlign: 'center', zIndex: 1, width: '100%' }}>
      {/* Availability Badge */}
      <div className="availability-pill animate-fade-in" style={{ display: 'inline-flex', marginBottom: '28px' }}>
        <span className="status-dot"></span>
        <span>AVAILABLE FOR FREELANCE & FULL-TIME ROLES WORLDWIDE</span>
      </div>

      {/* Hero Title */}
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
        {profileDatabase.name} — Creative Frontend & UX/UI Designer crafting bold digital products, intuitive web applications, and interfaces that refuse to look ordinary.
      </p>

      {/* Action Buttons */}
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
