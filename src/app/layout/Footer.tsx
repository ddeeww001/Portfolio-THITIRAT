import { profileDatabase } from '../../features/profile/profileData';
import { GitHubIcon, MailIcon } from '../../shared/components/ContactIcons';

const githubLink = profileDatabase.socials.find((s) => s.label === 'GitHub')?.link;

export const Footer = () => (
  <footer className="footer" style={{ borderTop: '1px solid var(--border-subtle)', padding: '40px 20px', background: 'var(--trionn-bg-alt)' }}>
    <div className="footer-content" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} {profileDatabase.name}.
      </p>
      <div className="footer-links" style={{ display: 'flex', gap: '20px' }}>
        {githubLink && (
          <a href={githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" style={{ color: '#ffffff', display: 'inline-flex' }}>
            <GitHubIcon />
          </a>
        )}
        {profileDatabase.email && (
          <a href={`mailto:${profileDatabase.email}`} aria-label="Send email" title="Send email" style={{ color: 'var(--text-secondary)', display: 'inline-flex' }}>
            <MailIcon />
          </a>
        )}
      </div>
    </div>
  </footer>
);
