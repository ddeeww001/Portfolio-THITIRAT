<<<<<<< HEAD
// Personal.tsx
import type { ProfileContent } from '../types/portfolio';
import profileImg from '../picture/profile.jpg';

// Main Profile Component
export const Profile = ({ data }: { data: ProfileContent }) => {
=======
﻿// Import data from centralized database
import { profileDatabase, type ProfileData } from '../data/profileData';
import profileImg from '../picture/profile.jpg';

// Export for backward compatibility
export const myDetailsData = profileDatabase;

// Main Profile Component
export const Profile = ({ data }: { data: ProfileData }) => {
>>>>>>> parent of 26484bd ( Revert docs(Portfolio_01): restructure project with centralized data management and unified dark theme This reverts commit e356d4d2d2afee6560399b0df809b44bb3977eb0.)
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
            {data.role && data.role.map((role, index) => (
              <span key={index} className="role-badge">{role}</span>
            ))}
          </div>

          <div className="sidebar-section">
            <h3>CONTACT INFO</h3>
            <ul className="contact-list">
              <li>
                <i className="bi bi-envelope-fill icon"></i>
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </li>
              <li>
                <i className="bi bi-telephone-fill icon"></i>
                <span>{data.phone}</span>
              </li>
              <li>
                <i className="bi bi-cake2-fill icon"></i>
                <span>{data.birthday}</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>SOCIALS</h3>
            <ul className="social-list">
              {data.socials && data.socials.map((item, index) => (
                <li key={index}>
                  <span className="social-label">{item.platform}:</span> 
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noreferrer" className="social-link">
                      {item.username || item.platform} <i className="bi bi-box-arrow-up-right"></i>
                    </a>
                  ) : (
                    <span className="social-value">{item.username || item.platform}</span>
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
              {data.technicalSkills && data.technicalSkills.map((s, index) => (
                <div key={index} className="skill-tag technical">
                  {s.skill} <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>({s.level})</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section className="content-section">
            <h3 className="section-header">TOOLS & SOFTWARE</h3>
            <div className="skills-grid">
              {data.tools && data.tools.map((tool, index) => (
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
              {data.languages && data.languages.map((lang, index) => (
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
              {data.certifications && data.certifications.map((cert, index) => (
                <li key={index} className="cert-item">
                  <i className="bi bi-patch-check-fill cert-icon"></i>
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
