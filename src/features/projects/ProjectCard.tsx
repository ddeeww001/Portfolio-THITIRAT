import type { ProjectData } from './projectsData';
import { ProjectThumbnail } from './ProjectThumbnail';
import { playClickSound, playHoverSound } from '../../shared/lib/SoundEffects';
import './projectCard.css';

interface ProjectCardProps {
  project: ProjectData;
  onQuickView: (project: ProjectData) => void;
  /** Figma "Project Card / Glass": Vertical = grid card, Featured = full-width hero card. */
  layout?: 'vertical' | 'featured';
}

/**
 * Outline project card (white border, 10px corners). Content order follows the Figma note:
 * category/date → title → role → details → tags → buttons.
 */
export const ProjectCard = ({ project, onQuickView, layout = 'vertical' }: ProjectCardProps) => {
  const mainLink = project.link?.[0];
  const role = Array.isArray(project.role) ? project.role.join(' • ') : project.role;

  return (
    <article className={`project-card project-card--${layout} card-outline`}>
      <div className="project-card__thumb">
        {project.image ? (
          <img className="project-card__image" src={project.image} alt={project.title} loading="lazy" />
        ) : (
          mainLink && <ProjectThumbnail url={mainLink.url} title={project.title} label={mainLink.label} />
        )}
      </div>

      <div className="project-card__body">
        <div className="project-card__top">
          <div className="project-card__meta">
            <span className="glass-label">{project.tags?.[0] ?? 'Project'}</span>
            <span className="project-card__date">{project.date}</span>
          </div>

          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__role">{role}</p>
          {project.details?.length > 0 && <p className="project-card__desc">{project.details[0]}</p>}

          {project.tags && project.tags.length > 0 && (
            <ul className="project-card__tags" aria-label="Tags">
              {project.tags.map((tag) => (
                <li key={tag} className="chip chip--tag">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="project-card__actions">
          <button
            className="btn btn--primary"
            onClick={() => {
              playClickSound();
              onQuickView(project);
            }}
            onMouseEnter={playHoverSound}
          >
            SEE MORE
          </button>

          {mainLink && (
            <a
              className="btn btn--glass"
              href={mainLink.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
            >
              LIVE
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
