import React, { useEffect } from 'react';
import type { ProjectData } from '../../data/projectsData';

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

        {project.link && project.link.length > 0 && (
          <div className="modal-links">
            {project.link.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link-btn"
              >
                <span>{item.label}</span>
                <span style={{ fontSize: '1.1rem' }}>↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
