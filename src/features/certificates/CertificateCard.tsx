import { PDFThumbnail } from './PDFThumbnail';
import { playClickSound, playHoverSound } from '../../shared/lib/SoundEffects';

interface CertificateCardProps {
  title: string;
  file: string;
  onOpen: (cert: { title: string; file: string }) => void;
}

export const CertificateCard = ({ title, file, onOpen }: CertificateCardProps) => {
  const open = () => {
    playClickSound();
    onOpen({ title, file });
  };

  return (
    <div
      style={{
        minWidth: '310px',
        maxWidth: '310px',
        background: 'var(--trionn-card)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-lg)',
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-lg)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      className="interactive-hover"
      onClick={open}
    >
      <div>
        <PDFThumbnail url={file} title={title} />
        <h4
          style={{
            fontSize: '0.94rem',
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            marginBottom: '12px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            height: '2.8em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </h4>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        onMouseEnter={playHoverSound}
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid var(--border-medium)',
          color: '#ffffff',
          padding: '10px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
          marginTop: '10px',
          transition: 'all 0.2s ease',
        }}
      >
        PREVIEW DOCUMENT ↗
      </button>
    </div>
  );
};
