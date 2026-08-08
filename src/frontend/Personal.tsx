import { profileDatabase, type ProfileData } from '../data/profileData';
import profileImg from '../picture/profile.jpg';
import { playHoverSound } from './components/SoundEffects';
import { GitHubSection } from './components/GitHubSection';

export const myDetailsData = profileDatabase;

const techIcons: { [key: string]: string } = {
  HTML: '/icons/html.svg',
  CSS: '/icons/css.svg',
  JavaScript: '/icons/javascript.svg',
  TypeScript: '/icons/typescript.svg',
  React: '/icons/react.svg',
  Java: '/icons/java.svg',
};

const toolIcons: { [key: string]: string } = {
  Figma: '/icons/figma.svg',
  Canva: '/icons/canva.svg',
  'Visual Studio Code': '/icons/visual-studio-code.svg',
  IntelliJ: '/icons/intellij.svg',
  Affinity: '/icons/affinity.svg',
};

export const Profile = ({ data }: { data: ProfileData }) => {
  return (
    <div className="profile-page-wrapper" style={{ padding: '80px 20px 40px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px', position: 'relative', zIndex: 3 }}>
        <div className="availability-pill" style={{ display: 'inline-flex' }}>
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
            color: '#ffffff',
            marginTop: '12px',
          }}
        >
          ABOUT ME & CAPABILITIES .
        </h2>
      </div>

      {/* Top Section: 2 Symmetrical Equal Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          alignItems: 'stretch',
          marginBottom: '30px',
        }}
      >
        {/* Left Column: Profile Card */}
        <aside
          style={{
            background: 'var(--trionn-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px 32px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #ffffff',
                boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)',
                margin: '0 auto 20px',
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
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
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
          </div>

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

        {/* Right Column: Design Tools + Core Languages Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'space-between' }}>
          {/* Design Tools & Software */}
          <div
            style={{
              background: 'var(--trionn-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '36px',
              boxShadow: 'var(--shadow-lg)',
              flex: 1,
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-display)', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Design Tools & Software
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.tools.map((tool, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-medium)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  className="interactive-hover"
                  onMouseEnter={playHoverSound}
                >
                  {toolIcons[tool] ? (
                    <img src={toolIcons[tool]} alt={tool} style={{ width: '16px', height: '16px' }} />
                  ) : (
                    '⚡'
                  )}
                  <span>{tool}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Languages & Technologies */}
          <div
            style={{
              background: 'var(--trionn-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '36px',
              boxShadow: 'var(--shadow-lg)',
              flex: 1,
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-display)', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Core Languages & Technologies
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.technicalSkills.map((skill, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border-glow)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
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
                  {techIcons[skill] ? (
                    <img src={techIcons[skill]} alt={skill} style={{ width: '16px', height: '16px' }} />
                  ) : (
                    '✦'
                  )}
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Full Width Section: Live GitHub Activity & Repositories */}
      <div style={{ width: '100%' }}>
        <GitHubSection />
      </div>
    </div>
  );
};

