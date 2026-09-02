import React, { useState } from 'react';
import { profileDatabase } from '../../data/profileData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileDatabase.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section contact-section" style={{ position: 'relative', width: '100%' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="availability-pill" style={{ display: 'inline-flex' }}>
            <span className="status-dot"></span>
            <span>DIRECT CHANNELS • NO FORMS NEEDED</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 4rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
              color: '#ffffff',
              marginTop: '12px',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            GET IN TOUCH .
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: '1.1rem', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Skip the form. Reach out directly via email, phone, or any of my active social platforms.
          </p>
        </div>

        {/* Direct Personal Contact Card Container */}
        <div
          className="contact-card-container"
          style={{
            background: 'var(--trionn-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 40px)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
            overflow: 'hidden',
          }}
        >
          {/* Main Direct Channels */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '30px',
            }}
          >
            {/* Email Card */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                DIRECT EMAIL
              </span>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: '8px 0 16px', wordBreak: 'break-all', fontFamily: 'var(--font-heading)' }}>
                {profileDatabase.email}
              </h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleCopyEmail}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid var(--border-medium)',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {copied ? (
                    '✓ COPIED TO CLIPBOARD'
                  ) : (
                    <>
                      <span>COPY EMAIL</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                      </svg>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${profileDatabase.email}`}
                  style={{
                    background: '#ffffff',
                    color: '#0a0a0c',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  SEND EMAIL ↗
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                PHONE NUMBER
              </span>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: '8px 0 16px', fontFamily: 'var(--font-heading)' }}>
                {profileDatabase.phone}
              </h3>
              <a
                href={`tel:${profileDatabase.phone.replace(/-/g, '')}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-medium)',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>CALL DIRECTLY</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
              Social & Online Profiles
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '14px',
              }}
            >
              {profileDatabase.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link || '#'}
                  target={social.link ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-medium)',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'all 0.3s ease',
                  }}
                  className="interactive-hover"
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {social.label}
                  </span>
                  <span style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 600 }}>
                    {social.value} {social.link ? '↗' : ''}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
