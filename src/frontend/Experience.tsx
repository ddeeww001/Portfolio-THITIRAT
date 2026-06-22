<<<<<<< HEAD
=======
﻿// Experience.tsx
import { type ProjectData, type LinkItem } from '../data/projectsData';
>>>>>>> parent of 26484bd ( Revert docs(Portfolio_01): restructure project with centralized data management and unified dark theme This reverts commit e356d4d2d2afee6560399b0df809b44bb3977eb0.)
import { useState } from 'react';
import type { ProjectExperience, LinkItem } from '../types/portfolio';

export const ProjectCart = ({ data }: { data: ProjectExperience }) => {
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (url: string) => {
    setImageLoaded(prev => ({ ...prev, [url]: true }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, url: string) => {
    const target = e.currentTarget;
    setImageError(prev => ({ ...prev, [url]: true }));

    target.style.objectFit = "contain";
    target.style.padding = "20px";

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

  const categoryIcon = () => {
    const tags = data.tags || [];
    if (tags.some(t => t.toLowerCase().includes('ui') || t.toLowerCase().includes('ux') || t.toLowerCase().includes('design'))) {
      return 'bi-palette';
    }
    if (tags.some(t => t.toLowerCase().includes('react') || t.toLowerCase().includes('vue') || t.toLowerCase().includes('frontend') || t.toLowerCase().includes('web'))) {
      return 'bi-code-slash';
    }
    if (tags.some(t => t.toLowerCase().includes('figma'))) {
      return 'bi-vector-pen';
    }
    return 'bi-folder2-open';
  };

  return (
    <article className="project-card">
      <div className="project-card-image">
        {!imageLoaded[data.image_url || ''] && !imageError[data.image_url || ''] && data.image_url && (
          <div className="image-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        {data.image_url && (
          <img
            src={data.image_url}
            alt={data.title}
            style={{
              display: imageLoaded[data.image_url] || imageError[data.image_url] ? "block" : "none"
            }}
            onLoad={() => handleImageLoad(data.image_url)}
            onError={(e) => handleImageError(e, data.image_url)}
          />
        )}
        <div className="project-card-overlay">
          <span className="project-card-category">
            <i className={`bi ${categoryIcon()}`}></i>
            {data.tags && data.tags.length > 0 ? data.tags[0] : 'Project'}
          </span>
        </div>
      </div>

      <div className="project-card-body">
        <div className="project-card-meta">
          <span className="project-card-date">
            <i className="bi bi-calendar3"></i> {data.date}
          </span>
          <span className="project-card-role">
            {Array.isArray(data.role) ? data.role.join(' / ') : data.role}
          </span>
        </div>

        <h3 className="project-card-title">{data.title}</h3>

        {data.description && (
          <p className="project-card-desc">{data.description}</p>
        )}

        {data.details && data.details.length > 0 && (
          <ul className="project-card-details">
            {data.details.slice(0, 3).map((detail, index) => (
              <li key={index}>
                <i className="bi bi-check-circle"></i> {detail}
              </li>
            ))}
          </ul>
        )}

        <div className="project-card-links">
          {data.link && data.link.map((item: LinkItem, index: number) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="project-link-btn"
            >
              <i className="bi bi-box-arrow-up-right"></i>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {data.tags && data.tags.length > 0 && (
          <div className="project-card-tags">
            {data.tags.map((tag, index) => (
              <span key={index} className="card-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
<<<<<<< HEAD
    </article>
=======

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
            </div>
          </a>
        ))}
      </div>
    </div>
>>>>>>> parent of 26484bd ( Revert docs(Portfolio_01): restructure project with centralized data management and unified dark theme This reverts commit e356d4d2d2afee6560399b0df809b44bb3977eb0.)
  );
};
