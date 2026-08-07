import { profileDatabase, type ProfileData } from '../data/profileData';
import profileImg from '../picture/profile.jpg';
import { playHoverSound } from './components/SoundEffects';
import { GitHubSection } from './components/GitHubSection';

export const myDetailsData = profileDatabase;

export const Profile = ({ data }: { data: ProfileData }) => {
  return (
    <div className="profile-page-wrapper" style={{ padding: '80px 20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div className="availability-pill">
          <span className="status-dot"></span>
          <span>PROFILE & TECH STACK • THITIRAT SIRISAWAD</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            background: 'var(--text-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}
        >
          ABOUT ME & <br />
          <span style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>
            CAPABILITIES
          </span>
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
        }}
      >
        {/* Profile Card Sidebar */}
        <aside
          style={{
            background: 'var(--trionn-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--neon-lime)',
              boxShadow: '0 0 25px var(--neon-lime-glow)',
              marginBottom: '20px',
            }}
          >
            <img src={profileImg} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
            {data.name}
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
            {data.role.map((role, idx) => (
              <span
                key={idx}
                style={{
                  background: 'rgba(56, 189, 248, 0.1)',
                  color: 'var(--neon-lime)',
                  border: '1px solid var(--border-glow)',
                  padding: '4px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                }}
              >
                ✦ {role}
              </span>
            ))}
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '28px' }}>
            {data.introduce}
          </p>

          <div style={{ width: '100%', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '12px' }}>
              LANGUAGE FLUENCY
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {data.languages.map((lang, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem',
                  }}
                >
                  <strong style={{ color: 'var(--text-primary)' }}>{lang.lang}</strong> ({lang.level})
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Technical Stack Chips & Authentic Live GitHub Data */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Core Technical Stack (Clean Chips - No Fake Percentages) */}
          <div
            style={{
              background: 'var(--trionn-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '36px',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Core Languages & Technologies
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {data.technicalSkills.map((skill, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid var(--border-glow)',
                    padding: '10px 22px',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--neon-lime)',
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  className="interactive-hover"
                  onMouseEnter={playHoverSound}
                >
                  <span>✦</span> {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Design Tools & Platforms */}
          <div
            style={{
              background: 'var(--trionn-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '36px',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Design Tools & Software Environment
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {data.tools.map((tool, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-medium)',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}
                  className="interactive-hover"
                  onMouseEnter={playHoverSound}
                >
                  ⚡ {tool}
                </div>
              ))}
            </div>
          </div>

          {/* Live Authentic GitHub Activity & Repositories */}
          <GitHubSection />
        </main>
      </div>
    </div>
  );
};
