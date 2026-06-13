// showExperience.tsx
import type { ProjectExperience } from '../types/portfolio'; 
import { ProjectCart } from './Experience'; 
import '../CSS/experience.css';

interface ShowExperienceProps {
  data: ProjectExperience[];
}

function ShowExperience({ data }: ShowExperienceProps) {
  if (!data || data.length === 0) {
    return (
      <div className="experience-presentation-wrapper">
        <section>
          <h1>MY EXPERIENCE</h1>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>กำลังโหลดข้อมูลผลงาน...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="experience-presentation-wrapper">
      <section>
        <h1>MY EXPERIENCE</h1>
      </section>

      {/* วนลูปข้อมูลที่ได้รับจาก props (จากฐานข้อมูล SQLite) */}
      {data.map((project: ProjectExperience) => (
        <section className="snap-section project-slide" key={project.id}>
          <ProjectCart data={project} />
        </section>
      ))}
    </div>
  );
}

export default ShowExperience;
