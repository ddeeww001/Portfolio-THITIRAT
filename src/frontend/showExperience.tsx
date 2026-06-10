// showExperience.tsx
import { projectsDatabase, type ProjectData } from '../data/projectsData'; // Import from centralized database
import { ProjectCart } from './Experience'; // Import component
import '../CSS/experience.css';

function ShowExperience() {
  return (
    <div className="experience-presentation-wrapper">
      <section>
        <h1>MY EXPERIENCE</h1>
      </section>

      {/* 3. วนลูปข้อมูลจาก JSON แล้วส่งผ่าน Props (data) ไปให้ ProjectCart */}
      {projectsDatabase.map((project: ProjectData) => (
        <section className="snap-section project-slide" key={project.id}>
          <ProjectCart data={project} />
        </section>
      ))}
    </div>
  );
}

export default ShowExperience;