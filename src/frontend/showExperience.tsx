import { useState } from 'react';
import { projectsDatabase, type ProjectData } from '../data/projectsData';
import { ProjectModal } from './components/ProjectModal';
import { playClickSound, playHoverSound } from './components/SoundEffects';
import './CSS/experience.css';

function ShowExperience() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filters = ['ALL', 'Hackathon', 'Design', 'Frontend', 'UX/UI', 'API Integration'];

  const filteredProjects = projectsDatabase.filter((project) => {
    if (activeFilter === 'ALL') return true;
    return project.tags?.some((t) => t.toLowerCase() === activeFilter.toLowerCase());
  });

  return (
    <div className="experience-presentation-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div className="availability-pill">
          <span className="status-dot"></span>
          <span>PORTFOLIO SHOWCASE • CRAFTED WITH PASSION</span>
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
          FEATURED PROJECTS & <br />
          <span style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>
            EXPERIENCE
          </span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
          Explore my latest hackathon wins, UI design work, frontend applications, and web development projects.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-container">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => {
              playClickSound();
              setActiveFilter(filter);
            }}
            onMouseEnter={playHoverSound}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            style={{
              background: 'var(--trionn-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
            }}
            className="interactive-hover project-trionn-card"
          >
            <div>
              {/* Category / Date Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    border: '1px solid var(--border-glow)',
                  }}
                >
                  {project.tags ? project.tags[0] : 'Project'}
                </span>
                <span
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {project.date}
                </span>
              </div>

              {/* Project Image Preview Box */}
              {project.link && project.link.length > 0 && (
                <div
                  style={{
                    height: '165px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    marginBottom: '18px',
                    position: 'relative',
                    background: '#121318',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <img
                    src={`https://api.microlink.io/?url=${encodeURIComponent(project.link[0].url)}&screenshot=true&embed=screenshot.url`}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.05) brightness(0.95)',
                      transition: 'transform 0.4s ease',
                    }}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      background: 'rgba(10, 10, 12, 0.85)',
                      border: '1px solid var(--border-medium)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#ffffff',
                    }}
                  >
                    {project.link[0].label}
                  </div>
                </div>
              )}

              <h3
                style={{
                  fontSize: '1.45rem',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}
              >
                Role: {Array.isArray(project.role) ? project.role.join(' • ') : project.role}
              </p>

              {project.details && project.details.length > 0 && (
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
              {/* Tags List */}
              {project.tags && project.tags.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '20px',
                  }}
                >
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
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

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedProject(project);
                  }}
                  onMouseEnter={playHoverSound}
                  style={{
                    flex: 1,
                    background: 'var(--primary-gradient)',
                    color: '#0b0f19',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  QUICK VIEW ↗
                </button>

                {project.link && project.link.length > 0 && (
                  <a
                    href={project.link[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    onMouseEnter={playHoverSound}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      padding: '10px 16px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    LINK
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal Drawer */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

export default ShowExperience;