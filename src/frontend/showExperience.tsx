
import { MyProject, ProjectCart } from './Experience.tsx';//ดึงข้อมูลมาใช้
import './Experience.tsx'//ใช้ตกแต่ง

//export my Experiance
function Experience() {
 

  return (
    <>
   
    <div className="experience-presentation-wrapper">
      <section>
        <h1>MY EXPERIENCE</h1>
      </section>
    

        {MyProject.map(
            (project)=>(
                /*ส่วนที่ดึงข้อมูล project Data มาแสดงทีละ id */
                 <section className="snap-section project-slide">
                  <ProjectCart key={project.id}  data={project}/>
                </section> ))}

    
    </div>
    </>
  )
}

export default Experience 