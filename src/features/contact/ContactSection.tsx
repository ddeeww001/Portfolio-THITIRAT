import React, { useState } from 'react';
import { profileDatabase } from '../profile/profileData';
import { CheckIcon, CopyIcon, MailIcon, PhoneIcon } from '../../shared/components/ContactIcons';
import { socialIcons } from './socialIcons';

const iconButtonStyle: React.CSSProperties = {
  width: '56px',
  height: '56px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid var(--border-medium)',
  borderRadius: 'var(--radius-full)',
  color: '#ffffff',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
};

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { email, phone } = profileDatabase;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section contact-section" style={{ position: 'relative', width: '100%' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
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
          className="card-outline contact-card-container"
          style={{
            padding: 'clamp(24px, 5vw, 10px) clamp(16px, 4vw, 40px)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative', // anchors the "copied" message without adding height
            overflow: 'hidden',
          }}
        >
          {/* Contact channels — icons only; values from .env are never printed on the page */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            {email && (
              <a href={`mailto:${email}`} aria-label="Send email" title="Send email" style={iconButtonStyle} className="interactive-hover">
                <MailIcon />
              </a>
            )}
            {email && (
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={copied ? 'Email copied' : 'Copy email'}
                title={copied ? 'Copied' : 'Copy email'}
                style={{ ...iconButtonStyle, cursor: 'pointer' }}
                className="interactive-hover"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            )}
            {phone && (
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} aria-label="Call" title="Call" style={iconButtonStyle} className="interactive-hover">
                <PhoneIcon />
              </a>
            )}
            {profileDatabase.socials.map((social) => {
              const Icon = socialIcons[social.label];
              const isGitHub = social.label === 'GitHub';
              return (
                <a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isGitHub ? `GitHub: ${social.value}` : `Open ${social.label}`}
                  title={social.label}
                  style={isGitHub ? { ...iconButtonStyle, width: 'auto', padding: '0 18px', gap: '10px' } : iconButtonStyle}
                  className="interactive-hover"
                >
                  {Icon ? <Icon /> : social.label}
                  {/* GitHub username is the only social handle shown as text */}
                  {isGitHub && <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{social.value}</span>}
                </a>
              );
            })}
          </div>

          {/* Overlays the bottom padding, so space above and below the icons stays equal */}
          <p role="status" aria-live="polite" style={{ position: 'absolute', left: 0, right: 0, bottom: '4px', textAlign: 'center', margin: 0, fontSize: '0.75rem', lineHeight: 1.2, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', pointerEvents: 'none' }}>
            {copied ? '✓ COPIED TO CLIPBOARD' : ''}
          </p>
        </div>
      </div>
    </section>
  );
};
