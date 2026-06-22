import { useState, useMemo } from 'react';
import type { ProjectExperience } from '../types/portfolio';
import { ProjectCart } from './Experience';
import '../CSS/experience.css';
import '../CSS/showExperience.css';

interface ShowExperienceProps {
  data: ProjectExperience[];
}

function ShowExperience({ data }: ShowExperienceProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    data.forEach(project => {
      project.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [data]);

  const filteredData = useMemo(() => {
    if (activeFilter === 'all') return data;
    return data.filter(project =>
      project.tags?.some(tag => tag === activeFilter)
    );
  }, [data, activeFilter]);

  if (!data || data.length === 0) {
    return (
      <div className="show-experience-wrapper">
        <div className="experience-header">
          <h1><i className="bi bi-collection"></i> MY EXPERIENCE</h1>
          <p>กำลังโหลดข้อมูลผลงาน...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="show-experience-wrapper">
      <div className="experience-header">
        <h1><i className="bi bi-collection"></i> MY EXPERIENCE</h1>
        <p>ผลงานและประสบการณ์ที่น่าสนใจ</p>
      </div>

      <div className="experience-filter-bar">
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          <i className="bi bi-grid-3x3-gap"></i> All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="experience-grid">
        {filteredData.map((project: ProjectExperience) => (
          <ProjectCart key={project.id} data={project} />
        ))}
      </div>
    </div>
  );
}

export default ShowExperience;
