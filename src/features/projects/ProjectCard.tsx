import type { ProjectData } from './projectsData';
import { ProjectThumbnail } from './ProjectThumbnail';
import { playClickSound, playHoverSound } from '../../shared/lib/SoundEffects';

interface ProjectCardProps {
  project: ProjectData;
  onQuickView: (project: ProjectData) => void;
}

export const ProjectCard = ({ project, onQuickView }: ProjectCardProps) => {
  const mainLink = project.link?.[0];

  return (
    <div className="interactive-hover project-trionn-card">
      <div>
        {/* Category / Date Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#ffffff',
              border: '1px solid var(--border-medium)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
            }}
          >
            {project.tags ? project.tags[0] : 'Project'}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            {project.date}
          </span>
        </div>

        {mainLink && <ProjectThumbnail url={mainLink.url} title={project.title} label={mainLink.label} />}

        <h3
          style={{
            fontSize: 'clamp(1.15rem, 3.5vw, 1.45rem)',
            color: 'var(--text-primary)',
            marginBottom: '12px',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.3,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {project.title}
        </h3>

        <p style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px' }}>
          Role: {Array.isArray(project.role) ? project.role.join(' • ') : project.role}
        </p>

        {project.details?.length > 0 && (
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.92rem',
              lineHeight: 1.5,
              marginBottom: '20px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.details[0]}
          </p>
        )}
      </div>

      <div>
        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              playClickSound();
              onQuickView(project);
            }}
            onMouseEnter={playHoverSound}
            style={{
              flex: '1 1 120px',
              background: 'var(--primary-gradient)',
              color: '#0b0f19',
              border: 'none',
              padding: '10px 14px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            QUICK VIEW ↗
          </button>

          {mainLink && (
            <a
              href={mainLink.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              style={{
                flex: '0 0 auto',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                padding: '10px 16px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              LINK
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
