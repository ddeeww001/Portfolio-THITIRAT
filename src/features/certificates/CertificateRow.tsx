import { PDFThumbnail } from './PDFThumbnail';
import { certCategoryOf } from './certificatesData';
import { playClickSound, playHoverSound } from '../../shared/lib/SoundEffects';

interface CertificateRowProps {
  title: string;
  file: string;
  onOpen: (cert: { title: string; file: string }) => void;
  tabIndex?: number;
}

/** Figma "Certificate Row / Glass" (17:91): thumbnail · title + category · PDF ↗. The whole row opens the viewer. */
export const CertificateRow = ({ title, file, onOpen, tabIndex }: CertificateRowProps) => (
  <button
    type="button"
    tabIndex={tabIndex}
    className="cert-row card-outline"
    onClick={() => {
      playClickSound();
      onOpen({ title, file });
    }}
    onMouseEnter={playHoverSound}
    aria-label={`Open certificate: ${title}`}
  >
    <span className="cert-row__thumb">
      <PDFThumbnail url={file} title={title} />
    </span>
    <span className="cert-row__text">
      <span className="cert-row__title">{title}</span>
      <span className="cert-row__meta">{certCategoryOf(title)}</span>
    </span>
    <span className="glass-label cert-row__cta" aria-hidden="true">
      PDF ↗
    </span>
  </button>
);
