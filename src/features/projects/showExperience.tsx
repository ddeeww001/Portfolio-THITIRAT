import { useState } from 'react';
import { projectsDatabase, type ProjectData } from './projectsData';
import { ProjectModal } from './ProjectModal';
import { ProjectCard } from './ProjectCard';
import { ALL_FILTER, useFilteredList } from '../../shared/hooks/useFilteredList';
import { EmptyState, FilterTabs, SearchBox } from '../../shared/components/ListControls';
import './experience.css';

const FILTERS = [ALL_FILTER, 'Hackathon', 'Design', 'Frontend', 'UX/UI', 'API Integration'];

const matchesFilter = (project: ProjectData, filter: string) =>
  !!project.tags?.some((t) => t.toLowerCase() === filter.toLowerCase());

const matchesSearch = (project: ProjectData, q: string) =>
  project.title.toLowerCase().includes(q) ||
  project.role.toString().toLowerCase().includes(q) ||
  !!project.tags?.some((t) => t.toLowerCase().includes(q)) ||
  project.details.some((d) => d.toLowerCase().includes(q));

function ShowExperience() {
  const list = useFilteredList({ items: projectsDatabase, matchesFilter, matchesSearch });
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <div className="experience-presentation-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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

        <SearchBox
          value={list.query}
          placeholder="Search projects by title, stack, or tags..."
          busy={list.isUpdating}
          onChange={list.setQuery}
          onClear={list.clearQuery}
        />

      </div>

      <FilterTabs options={FILTERS} active={list.activeFilter} onSelect={list.selectFilter} />

      {list.filtered.length === 0 ? (
        <EmptyState
          title="No matching projects found"
          message={<>No projects matched your search query &quot;{list.query}&quot; under &quot;{list.activeFilter}&quot; filter.</>}
          resetLabel="Reset Filters ⟳"
          onReset={list.reset}
        />
      ) : (
        <>
          {/* First result = Featured card (full width), the rest = vertical grid */}
          <ProjectCard project={list.filtered[0]} onQuickView={setSelectedProject} layout="featured" />
          {list.filtered.length > 1 && (
            <div className="projects-grid">
              {list.filtered.slice(1).map((project) => (
                <ProjectCard key={project.id} project={project} onQuickView={setSelectedProject} />
              ))}
            </div>
          )}
        </>
      )}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

export default ShowExperience;
