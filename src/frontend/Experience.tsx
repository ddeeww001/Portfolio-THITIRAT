// Experience.tsx
// Import types from centralized database
import { type ProjectData, type LinkItem } from '../data/projectsData';
import { useState } from 'react';

// Re-export for backward compatibility
export type { ProjectData, LinkItem };

export const ProjectCart = ({ data }: { data: ProjectData }) => {
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

  return (
    <div className="title">
      {/* Project Header */}
      <div className="project-header">
        <h2>{data.title}</h2>
        <h3 className="project-date">{data.date}</h3>
        <h3 className="project-role">
          {Array.isArray(data.role) ? data.role.join(' • ') : data.role}
        </h3>
      </div>

      {/* Project Details */}
      {data.details && data.details.length > 0 && (
        <div className="details">
          <ul>
            {data.details.map((detail, index) => (
              <li className="project-grid" key={index}>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Project Links with Preview */}
      <div className="link-preview">
        {data.link.map((item, index) => (
          <a 
            key={index} 
            href={item.url} 
            target="_blank" 
            rel="noreferrer"
            className="preview-link"
          >
            <div className="preview-card">
              {/* Loading skeleton */}
              {!imageLoaded[item.url] && !imageError[item.url] && (
                <div className="image-skeleton">
                  <div className="skeleton-shimmer"></div>
                </div>
              )}
              
              {/* Actual image */}
              <img
                src={`https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&embed=screenshot.url`}
                alt={item.label}
                style={{ 
                  width: "100%", 
                  height: "180px", 
                  objectFit: "cover", 
                  display: imageLoaded[item.url] || imageError[item.url] ? "block" : "none"
                }}
                onLoad={() => handleImageLoad(item.url)}
                onError={(e) => handleImageError(e, item.url)}
              />
              
              {/* Link label with icon */}
              <div className="url-name">
                <span>{item.label}</span>
                <i className="bi bi-link-45deg link-icon"></i>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Tags if available */}
      {data.tags && data.tags.length > 0 && (
        <div className="project-tags">
          {data.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Made with Bob
