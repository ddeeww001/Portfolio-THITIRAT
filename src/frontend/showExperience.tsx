import { useState } from 'react';
import { projectsDatabase, type ProjectData } from '../data/projectsData'; 
import { ProjectCart } from './Experience'; 
import '../experience.css';

function ShowExperience() {
  const [filter, setFilter] = useState('All');
  
  // Hardcoded tags as per user request
  const allTags = ['All', 'Frontend', 'UX/UI', 'Design'];

  const filteredProjects = filter === 'All' 
    ? projectsDatabase 
    : projectsDatabase.filter(p => p.tags.includes(filter));

  return (
    <div className="experience-presentation-wrapper">
      <section className="experience-header-section">
        <h1>MY EXPERIENCE</h1>
        <div className="filter-container">
          {allTags.map(tag => (
            <button 
              key={tag}
              className={`filter-btn ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <div className="projects-list">
        {filteredProjects.map((project: ProjectData) => (
          <section className="snap-section project-slide" key={project.id}>
            <ProjectCart data={project} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default ShowExperience;
