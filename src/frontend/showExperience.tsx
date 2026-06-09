<<<<<<< HEAD
﻿import { useState } from 'react';
import { projectsDatabase, type ProjectData } from '../data/projectsData'; 
import { ProjectCart } from './Experience'; 
import '../experience.css';
=======
// showExperience.tsx
import projectsData from './projects.json'; // 1. ดึงข้อมูล Data มา
import { ProjectCart,type ProjectData } from './Experience.tsx'; // 2. ดึงแม่พิมพ์ Component มา
import '../experience.css'; // สมมติว่าคุณมีไฟล์ CSS สำหรับตกแต่ง
>>>>>>> parent of e356d4d (docs(Portfolio_01): restructure project with centralized data management and unified dark theme)

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

<<<<<<< HEAD
      <div className="projects-list">
        {filteredProjects.map((project: ProjectData) => (
          <section className="snap-section project-slide" key={project.id}>
            <ProjectCart data={project} />
          </section>
        ))}
      </div>
=======
      {/* 3. วนลูปข้อมูลจาก JSON แล้วส่งผ่าน Props (data) ไปให้ ProjectCart */}
      {projectsData.map((project: ProjectData) => (
        <section className="snap-section project-slide" key={project.id}>
          <ProjectCart data={project} />
        </section>
      ))}
>>>>>>> parent of e356d4d (docs(Portfolio_01): restructure project with centralized data management and unified dark theme)
    </div>
  );
}

export default ShowExperience;
