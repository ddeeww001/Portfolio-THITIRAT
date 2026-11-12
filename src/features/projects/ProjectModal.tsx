import React, { useEffect } from 'react';
import type { ProjectData } from './projectsData';
import './projectCard.css';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const [mainLink, ...rest] = project.link ?? [];
  // Without a gallery the main link has no picture to sit on, so list it as a text link too.
  const otherLinks = project.gallery?.length ? rest : project.link ?? [];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {project.tags && project.tags.length > 0 && (
          <div className="modal-tag">
            {project.tags.join(' • ')}
          </div>
        )}

        <h2 className="modal-title">{project.title}</h2>
        <div className="modal-date">✦ {project.date}</div>

        {/* Screenshots from this project's own links / Drive files. Clicking a picture opens the
            project's main link (or the full image when the project has no link) — no extra buttons. */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="modal-gallery">
            {project.gallery.map((shot) => (
              <figure key={shot.src} className="modal-gallery__item">
                <a
                  href={mainLink?.url ?? shot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={mainLink ? `Open ${mainLink.label}: ${shot.caption}` : `Open full image: ${shot.caption}`}
                >
                  <img src={shot.src} alt={shot.caption} loading="lazy" decoding="async" />
                </a>
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="modal-role-box">
          <strong>ROLE:</strong> {Array.isArray(project.role) ? project.role.join(', ') : project.role}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '12px', fontSize: '1.1rem' }}>
            Project Highlights & Key Contributions
          </h4>
          <ul className="modal-details-list">
            {project.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Extra links (the main one is already on the pictures) as plain text links, not buttons */}
        {otherLinks.length > 0 && (
          <p className="modal-text-links">
            More:{' '}
            {otherLinks.map((item, index) => (
              <span key={item.url}>
                {index > 0 && ' · '}
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.label} ↗
                </a>
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
};
