<<<<<<< HEAD
﻿// Experience.tsx
import { type ProjectData, type LinkItem } from '../data/projectsData';
import { useState } from 'react';

export type { ProjectData, LinkItem };

export const ProjectCart = ({ data }: { data: ProjectData }) => {
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  const handleImageLoad = (url: string) => {
    setImageLoaded(prev => ({ ...prev, [url]: true }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, url: string) => {
    const target = e.currentTarget;
    setImageError(prev => ({ ...prev, [url]: true }));
    target.style.objectFit = "contain";
    target.style.padding = "20px";
    target.style.backgroundColor = "var(--bg-secondary)";

    if (url.includes('drive.google')) {
      target.src = "https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png";
    } else if (url.includes('notion')) {
      target.src = "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png";
    } else if (url.includes('canva')) {
      target.src = "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg";
    } else if (url.includes('figma')) {
      target.src = "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg";
    } else {
      target.src = "https://cdn-icons-png.flaticon.com/512/2088/2088617.png";
    }
  };

  return (
    <div className="project-card-container">
      <div className="project-header">
        <div className="header-main">
          <h2>{data.title}</h2>
          <span className="project-date"><i className="bi bi-calendar3"></i> {data.date}</span>
        </div>
        <div className="project-tags">
          {data.tags.map((tag, i) => (
            <span key={i} className="tag-pill"><i className="bi bi-hash"></i>{tag}</span>
          ))}
        </div>
        <div className="project-role">
          <i className="bi bi-person-badge"></i> {Array.isArray(data.role) ? data.role.join(' | ') : data.role}
        </div>
      </div>

      <div className="project-details">
        <ul>
          {data.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>

      {data.caseStudy && (
        <div className="case-study-section">
          <button 
            className="toggle-case-study"
            onClick={() => setShowCaseStudy(!showCaseStudy)}
          >
            <i className={`bi ${showCaseStudy ? 'bi-dash-circle' : 'bi-plus-circle'}`}></i>
            {showCaseStudy ? " Close Case Study" : " View Case Study & Storytelling"}
          </button>
          
          {showCaseStudy && (
            <div className="case-study-content animate-fade-in">
              <div className="case-grid">
                <div className="case-item">
                  <h4><i className="bi bi-exclamation-octagon text-danger"></i> Problem</h4>
                  <p>{data.caseStudy.problem}</p>
                </div>
                <div className="case-item">
                  <h4><i className="bi bi-check2-circle text-success"></i> Solution</h4>
                  <p>{data.caseStudy.solution}</p>
                </div>
                <div className="case-item">
                  <h4><i className="bi bi-tools"></i> Tools Used</h4>
                  <p>{data.caseStudy.toolsUsed}</p>
                </div>
                <div className="case-item">
                  <h4><i className="bi bi-lightbulb"></i> What I Learned</h4>
                  <p>{data.caseStudy.learning}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="project-links-grid">
        {data.link.map((item, index) => (
          <a key={index} href={item.url} target="_blank" rel="noreferrer" className="project-link-item">
            <div className="preview-card">
              {!imageLoaded[item.url] && !imageError[item.url] && (
                <div className="image-skeleton"><div className="skeleton-shimmer"></div></div>
              )}
              <img
                src={`https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&embed=screenshot.url`}
                alt={item.label}
                className={`preview-image ${imageLoaded[item.url] ? 'loaded' : ''}`}
                onLoad={() => handleImageLoad(item.url)}
                onError={(e) => handleImageError(e, item.url)}
                loading="lazy"
              />
              <div className="link-info">
                <span className="link-label">{item.label}</span>
                <i className="bi bi-box-arrow-up-right"></i>
              </div>
=======
// Experience.tsx
export interface LinkItem {
  label: string;
  url: string;
}

export interface ProjectData {
  id: number;
  title: string;
  date: string;
  role: string | string[];
  details: string[];
  link: LinkItem[];
}

export const ProjectCart = ({ data }: { data: ProjectData }) => {
  return (
    <div className="title">
      <h2>{data.title}</h2>
      <h3>{data.date}</h3>
      <h3>{data.role}</h3>
      <div className="details">
        <ul>
          {data.details.map((detail, index) => (
            <li className="project-grid" key={index}>{detail}</li>
          ))}
        </ul>
      </div>

      <div className="link-preview">
        {data.link.map((item, index) => (
          <a key={index} href={item.url} target="_blank" rel="noreferrer">
            <div className="preview-card">
              <img
                src={`https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&embed=screenshot.url`}
                alt={item.label}
                style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.objectFit = "contain";
                  target.style.padding = "20px";
                  if (item.url.includes('drive.google')) {
                    target.src = "https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png";
                  } else if (item.url.includes('notion')) {
                    target.src = "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png";
                  } else {
                    target.src = "https://cdn-icons-png.flaticon.com/512/2088/2088617.png";
                  }
                }}
              />
              <div className="url-name">{item.label} 🔗</div>
>>>>>>> parent of e356d4d (docs(Portfolio_01): restructure project with centralized data management and unified dark theme)
            </div>
          </a>
        ))}
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> parent of e356d4d (docs(Portfolio_01): restructure project with centralized data management and unified dark theme)
