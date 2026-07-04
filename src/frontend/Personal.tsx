
// Import data from centralized database
import { profileDatabase, type ProfileData } from '../data/profileData';
import profileImg from '../picture/profile.jpg';

// Export for backward compatibility
export const myDetailsData = profileDatabase;

// Main Profile Component
export const Profile = ({ data }: { data: ProfileData }) => {
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
               <span key={index} className="role-badge">
                 <i className="bi bi-patch-check-fill" style={{ marginRight: '6px' }}></i>
                 {role}
               </span>
            ))}
          </div>

          <div className="sidebar-section">
            <h3>CONTACT INFO</h3>
            <ul className="contact-list">
               <li>
                 <span className="icon"><i className="bi bi-envelope-fill"></i></span>
                 <a href={`mailto:${data.email}`}>{data.email}</a>
               </li>
               <li>
                 <span className="icon"><i className="bi bi-telephone-fill"></i></span>
                 <span>{data.phone}</span>
               </li>
               <li>
                 <span className="icon"><i className="bi bi-cake2-fill"></i></span>
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
                  <div key={index} className="skill-tag technical" title={skill}>
                    <img src={`/icons/${skill.toLowerCase()}.svg`}   alt={skill} />
                  </div>
                ))}
              </div>
            </section>

            {/* Tools */}
            <section className="content-section">
              <h3 className="section-header">TOOLS & SOFTWARE</h3>
              <div className="skills-grid">
                {data.tools.map((tool, index) => (
                  <div key={index} className="skill-tag tool" title={tool}>
                    <img src={`/icons/${tool.toLowerCase().replace(/\s+/g, '-')}.svg`}alt={tool} />
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
                 <span className="cert-icon"><i className="bi bi-award-fill"></i></span>
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