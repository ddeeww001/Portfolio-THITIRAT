import { useState } from 'react';
import { projectsDatabase, type ProjectData } from '../data/projectsData';
import { ProjectModal } from './components/ProjectModal';
import { playClickSound, playHoverSound } from './components/SoundEffects';
import { sanitizeInput } from '../utils/security';
import './CSS/experience.css';

const ProjectThumbnail: React.FC<{ url: string; title: string; label: string }> = ({ url, title, label }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const imgUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url&_k=${retryKey}`;

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageError(false);
    setImageLoaded(false);
    setRetryKey((k) => k + 1);
  };

  return (
    <div
      style={{
        height: '165px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        marginBottom: '18px',
        position: 'relative',
        background: 'linear-gradient(135deg, #14151c 0%, #232430 100%)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Loading Skeleton Shimmer */}
      {!imageLoaded && !imageError && (
        <div className="skeleton-box" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
      )}

      {/* Live Status Badge */}
      <div className="image-status-pill">
        {!imageLoaded && !imageError ? (
          <>
            <span className="feedback-dot pulse" />
            <span>FETCHING...</span>
          </>
        ) : imageError ? (
          <>
            <span className="feedback-dot" style={{ background: '#ff5555' }} />
            <span>OFFLINE</span>
            <button className="image-retry-btn" onClick={handleRetry} title="Retry image fetch">
              ⟳ RETRY
            </button>
          </>
        ) : (
          <>
            <span className="feedback-dot green" />
            <span>LIVE PREVIEW</span>
          </>
        )}
      </div>

      {/* Fallback Graphic */}
      <div style={{ textAlign: 'center', zIndex: 2, opacity: imageLoaded ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        <div style={{ marginBottom: '6px', display: 'flex', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>
      </div>

      {!imageError && (
        <img
          key={retryKey}
          src={imgUrl}
          alt={title}
          className={`img-fade-in ${imageLoaded ? 'is-loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'contrast(1.05) brightness(0.95)',
            zIndex: 3,
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          background: 'rgba(10, 10, 12, 0.88)',
          border: '1px solid var(--border-medium)',
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono)',
          color: '#ffffff',
          zIndex: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
};

function ShowExperience() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filters = ['ALL', 'Hackathon', 'Design', 'Frontend', 'UX/UI', 'API Integration'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = sanitizeInput(e.target.value);
    setSearchQuery(val);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 200);
  };

  const handleFilterChange = (filter: string) => {
    playClickSound();
    setIsFiltering(true);
    setActiveFilter(filter);
    setTimeout(() => {
      setIsFiltering(false);
    }, 180);
  };

  const filteredProjects = projectsDatabase.filter((project) => {
    const matchesFilter =
      activeFilter === 'ALL' ||
      project.tags?.some((t) => t.toLowerCase() === activeFilter.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.role.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.details.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const resetFilters = () => {
    playClickSound();
    setActiveFilter('ALL');
    setSearchQuery('');
  };

  return (
    <div className="experience-presentation-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="availability-pill">
          <span className="status-dot"></span>
          <span>PORTFOLIO SHOWCASE • CRAFTED WITH PASSION</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 3.8rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          FEATURED WORK .
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 28px', fontSize: '1.05rem', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          Explore past projects, open-source works, design systems, and client interfaces built with precision.
        </p>

        {/* Interactive Search Box with Real-time Loading Indicator */}
        <div className="interactive-search-box">
          <span className="search-icon-left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          <input
            type="text"
            className="search-input-field"
            placeholder="Search projects by title, stack, or tags..."
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="search-action-right">
            {isSearching && <div className="search-loading-spinner" title="Searching..." />}
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')} title="Clear search">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Counter & Status Badge */}
        <div className={`feedback-counter-badge ${isFiltering || isSearching ? 'is-updating' : ''}`}>
          <span className={`feedback-dot ${isFiltering || isSearching ? 'pulse' : 'green'}`} />
          <span>
            {isFiltering || isSearching
              ? 'UPDATING RESULTS . . .'
              : `SHOWING ${filteredProjects.length} OF ${projectsDatabase.length} PROJECTS`}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-container">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterChange(filter)}
            onMouseEnter={playHoverSound}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Empty State Feedback when no results match */}
      {filteredProjects.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: 0 }}>No matching projects found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: '380px' }}>
            No projects matched your search query &quot;{searchQuery}&quot; under &quot;{activeFilter}&quot; filter.
          </p>
          <button className="empty-state-btn" onClick={resetFilters}>
            Reset Filters ⟳
          </button>
        </div>
      ) : (
        /* Project Cards Grid */
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
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

                {/* Project Image Preview Box with Skeleton Loader & Feedback */}
                {project.link && project.link.length > 0 && (
                  <ProjectThumbnail
                    url={project.link[0].url}
                    title={project.title}
                    label={project.link[0].label}
                  />
                )}

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
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedProject(project);
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

                {project.link && project.link.length > 0 && (
                  <a
                    href={project.link[0].url}
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
        ))}
      </div>
      )}

      {/* Project Modal Drawer */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

export default ShowExperience;