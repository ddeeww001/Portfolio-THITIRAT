interface CertificateLightboxProps {
  cert: { title: string; file: string } | null;
  onClose: () => void;
}

/** Full-size PDF viewer shown when a certificate card is opened. */
export const CertificateLightbox = ({ cert, onClose }: CertificateLightboxProps) => {
  if (!cert) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '850px', height: '85vh' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '16px', paddingRight: '40px' }}>
          {cert.title}
        </h3>

        <div style={{ width: '100%', height: 'calc(100% - 100px)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#0a0a0c' }}>
          <iframe src={cert.file} title={cert.title} style={{ width: '100%', height: '100%', border: 'none' }} />
        </div>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <a href={cert.file} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
            OPEN FULL PDF ↗
          </a>
        </div>
      </div>
    </div>
  );
};
