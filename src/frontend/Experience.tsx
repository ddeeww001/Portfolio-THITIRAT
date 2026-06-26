import { useState } from 'react';
import type { ProjectExperience, LinkItem } from '../types/portfolio';

export const ProjectCart = ({ data }: { data: ProjectExperience }) => {
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const getPreviewImage = (): string | null => {
    if (data.image_url) return data.image_url;
    if (data.link && data.link.length > 0) {
      const firstUrl = data.link[0].url;
      return `https://api.microlink.io/?url=${encodeURIComponent(firstUrl)}&screenshot=true&embed=screenshot.url`;
    }
    return null;
  };

  const previewImage = getPreviewImage();

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

  const getLinkIcon = (url: string): string => {
    if (url.includes('github.com')) return 'bi-github';
    if (url.includes('figma.com')) return 'bi-vector-pen';
    if (url.includes('canva.com')) return 'bi-palette';
    if (url.includes('drive.google')) return 'bi-google';
    if (url.includes('facebook.com')) return 'bi-facebook';
    if (url.includes('devfolio.co')) return 'bi-code-slash';
    if (url.includes('medium.com')) return 'bi-book';
    if (url.includes('lablab.ai')) return 'bi-robot';
    if (url.includes('heyzine.com')) return 'bi-book';
    return 'bi-box-arrow-up-right';
  };

  return (
    <article className="project-card">
      <div className="project-card-image">
        {previewImage && !imageLoaded[previewImage] && !imageError[previewImage] && (
          <div className="image-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        {previewImage && (
          <img
            src={previewImage}
            alt={data.title}
            className="link-preview"
            style={{
              display: imageLoaded[previewImage] || imageError[previewImage] ? "block" : "none"
            }}
            onLoad={() => handleImageLoad(previewImage)}
            onError={(e) => handleImageError(e, previewImage)}
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
              <i className={`bi ${getLinkIcon(item.url)}`}></i>
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
    </article>
  );
};
