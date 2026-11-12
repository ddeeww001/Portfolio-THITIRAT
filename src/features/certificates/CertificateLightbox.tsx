import { useEffect } from 'react';
import type { CertificateItem } from './certificatesData';
import { useImageLoader } from '../../shared/hooks/useImageLoader';

interface CertificateLightboxProps {
  cert: CertificateItem | null;
  onClose: () => void;
}

/**
 * Certificate viewer: shows a pre-rendered image (loaded with async/await, skeleton while it loads).
 * Clicking the image opens the full PDF in a new tab — no extra button.
 */
export const CertificateLightbox = ({ cert, onClose }: CertificateLightboxProps) => {
  const status = useImageLoader(cert?.preview);

  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={cert.title}>
      <div className="modal-card cert-viewer" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close certificate">
          ✕
        </button>

        <h3 className="cert-viewer__title">{cert.title}</h3>

        <a
          className={`cert-viewer__frame is-${status}`}
          href={cert.file}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open full PDF: ${cert.title}`}
          aria-busy={status === 'loading'}
        >
          {status === 'loading' && <span className="cert-viewer__skeleton skeleton-box" aria-hidden="true" />}
          {status === 'error' ? (
            <span className="cert-viewer__fallback">Preview unavailable — click to open the PDF</span>
          ) : (
            <img src={cert.preview} alt={`Certificate: ${cert.title}`} decoding="async" />
          )}
        </a>

        <p className="cert-viewer__hint">Click the certificate to open the full PDF</p>
      </div>
    </div>
  );
};
