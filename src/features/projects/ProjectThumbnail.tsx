import { useState } from 'react';
import { screenshotUrl } from './microlink';

interface ProjectThumbnailProps {
  url: string;
  title: string;
  label: string;
}

export const ProjectThumbnail = ({ url, title, label }: ProjectThumbnailProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Spinner while the screenshot loads */}
      {!imageLoaded && !imageError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div
            className="spinner-ring"
            style={{ width: '28px', height: '28px', borderWidth: '2.5px', borderTopColor: 'var(--accent-purple-soft)' }}
          />
        </div>
      )}

      {/* Screenshot fades in once loaded */}
      {!imageError && (
        <img
          src={screenshotUrl(url)}
          alt={title}
          className={`img-fade-in ${imageLoaded ? 'is-loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'contrast(1.05) brightness(0.95)',
            zIndex: 2,
          }}
        />
      )}

      {/* Destination label */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          background: 'rgba(10, 10, 12, 0.88)',
          backdropFilter: 'blur(6px)',
          border: '1px solid var(--border-medium)',
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono)',
          color: '#ffffff',
          zIndex: 3,
        }}
      >
        {label}
      </div>
    </div>
  );
};
