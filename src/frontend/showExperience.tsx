// showExperience.tsx
import projectsData from './projects.json'; // 1. ดึงข้อมูล Data มา
import { ProjectCart,type ProjectData } from './Experience.tsx'; // 2. ดึงแม่พิมพ์ Component มา
import '../experience.css'; // สมมติว่าคุณมีไฟล์ CSS สำหรับตกแต่ง

function ShowExperience() {
  return (
    <div className="experience-presentation-wrapper">
      <section>
        <h1>MY EXPERIENCE</h1>
      </section>

      {/* 3. วนลูปข้อมูลจาก JSON แล้วส่งผ่าน Props (data) ไปให้ ProjectCart */}
      {projectsData.map((project: ProjectData) => (
        <section className="snap-section project-slide" key={project.id}>
          <ProjectCart data={project} />
        </section>
      ))}
    </div>
  );
}

export default ShowExperience;