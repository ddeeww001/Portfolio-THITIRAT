
// อย่าลืม import รูปของคุณเข้ามา (ตรวจสอบ path ให้ถูกต้อง)
// ถ้าชื่อไฟล์คือ 1769004959717.jpg ให้เปลี่ยนชื่อเป็น profile.jpg หรือแก้ path ตรงนี้
import profileImg from '../picture/profile.jpg'; 

// 1. กำหนดโครงสร้างข้อมูล (Interface)
interface MyDetails {
  id: number;
  name: string;
  role: string[];
  birthday: string;
  email: string;
  phone: string;
  socials: { label: string; value: string; link?: string }[];
  introduce: string;
  
  // ข้อมูลใหม่ที่เพิ่มเข้ามา
  technicalSkills: string[];
  tools: string[];
  languages: { lang: string; level: string }[];
  certifications: string[];
}

// 2. ใส่ข้อมูลจริงของคุณ
export const myDetailsData: MyDetails = {
  id: 1,
  name: "THITIRAT SIRISAWAD",
  role: ["UX/UI Designer", "Frontend Developer"],
  birthday: "14 June 2006",
  email: "dewthitirat@gmail.com",
  phone: "099-430-0222",
  socials: [
    { label: "GitHub", value: "ddeeww001", link: "https://github.com/ddeeww001" },
    { label: "Line ID", value: "t.s" },
    { label: "Instagram", value: "ddeeww_o_o" },
    { label: "Facebook", value: "Dew Chobkinkaitod" }
  ],
  introduce: "I am a passionate UX/UI Designer and Frontend Developer dedicated to creating intuitive, user-centric digital experiences with modern design.",
  
  // Technical Skills
  technicalSkills: ["Java", "HTML", "CSS", "React", "TypeScript"],
  
  // Tools
  tools: ["Figma", "Canva", "Visual Studio Code", "IntelliJ"],
  
  // Languages
  languages: [
    { lang: "Thai", level: "Native" },
    { lang: "English", level: "Pre-intermediate" }
  ],
  
  // Certifications
  certifications: [
    "UXUI Foundation Program (LIFELONG) - Organized by T.C.C. Technology Co., Ltd",
    "Creativity and Imagination (LIFELONG)"
  ]
};

// 3. สร้าง Component แสดงผล
export const Profile = ({ data }: { data: MyDetails }) => {
  return (
    <div className="profile-page-wrapper">
      <div className="profile-card-container">
        
        {/* --- ส่วนด้านซ้าย (Left Sidebar): รูป + ข้อมูลส่วนตัว --- */}
        <aside className="profile-sidebar">
          <div className="profile-pic-wrapper">
            <img src={profileImg} alt={data.name} />
          </div>
          
          <h2 className="profile-name">{data.name}</h2>
          
          <div className="profile-roles">
            {data.role.map((role, index) => (
              <span key={index} className="role-badge">{role}</span>
            ))}
          </div>

          <div className="sidebar-section">
            <h3>CONTACT INFO</h3>
            <ul className="contact-list">
              <li>
                <span className="icon">📧</span>
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </li>
              <li>
                <span className="icon">📞</span>
                <span>{data.phone}</span>
              </li>
              <li>
                <span className="icon">🎂</span>
                <span>{data.birthday}</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>SOCIALS</h3>
            <ul className="social-list">
              {data.socials.map((item, index) => (
                <li key={index}>
                  <span className="social-label">{item.label}:</span> 
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer" className="social-link">
                      {item.value} ↗
                    </a>
                  ) : (
                    <span className="social-value">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* --- ส่วนด้านขวา (Main Content): Skills & Certs --- */}
        <main className="profile-content">
          
          {/* Introduction */}
          <section className="content-section">
            <h1 className="section-header">ABOUT ME</h1>
            <p className="introduce-text">{data.introduce}</p>
          </section>

          {/* Technical Skills */}
          <section className="content-section">
            <h3 className="section-header">TECHNICAL SKILLS</h3>
            <div className="skills-grid">
              {data.technicalSkills.map((skill, index) => (
                <div key={index} className="skill-tag technical">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section className="content-section">
            <h3 className="section-header">TOOLS & SOFTWARE</h3>
            <div className="skills-grid">
              {data.tools.map((tool, index) => (
                <div key={index} className="skill-tag tool">
                  {tool}
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="content-section">
            <h3 className="section-header">LANGUAGES</h3>
            <div className="language-list">
              {data.languages.map((lang, index) => (
                <div key={index} className="lang-item">
                  <span className="lang-name">{lang.lang}</span>
                  <span className="lang-dot">•</span>
                  <span className="lang-level">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="content-section">
            <h3 className="section-header">CERTIFICATIONS</h3>
            <ul className="cert-list">
              {data.certifications.map((cert, index) => (
                <li key={index} className="cert-item">
                  <span className="cert-icon">📜</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </section>

        </main>
      </div>
    </div>
  );
};