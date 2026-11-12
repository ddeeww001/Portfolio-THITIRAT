import { certCategoryOf, type CertificateItem } from './certificatesData';
import { playClickSound, playHoverSound } from '../../shared/lib/SoundEffects';
import { preloadImage } from '../../shared/hooks/useImageLoader';

interface CertificateRowProps {
  cert: CertificateItem;
  onOpen: (cert: CertificateItem) => void;
  tabIndex?: number;
}

/** Figma "Certificate Row / Glass" (17:91): thumbnail · title + category. The whole row opens the viewer. */
export const CertificateRow = ({ cert, onOpen, tabIndex }: CertificateRowProps) => (
  <button
    type="button"
    tabIndex={tabIndex}
    className="cert-row card-outline"
    onClick={() => {
      playClickSound();
      onOpen(cert);
    }}
    onMouseEnter={() => {
      playHoverSound();
      preloadImage(cert.preview); // start downloading the big image before the click
    }}
    onFocus={() => preloadImage(cert.preview)}
    aria-label={`Open certificate: ${cert.title}`}
  >
    <span className="cert-row__thumb">
      {/* Pre-rendered page-1 image — the PDF itself is not downloaded for the list */}
      <img src={cert.thumb} alt="" loading="lazy" decoding="async" width={288} height={204} className="cert-row__thumb-img" />
    </span>
    <span className="cert-row__text">
      <span className="cert-row__title">{cert.title}</span>
      <span className="cert-row__meta">{certCategoryOf(cert.title)}</span>
    </span>
  </button>
);
