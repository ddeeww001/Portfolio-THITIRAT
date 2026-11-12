import { useCallback, useState } from 'react';
import { profileDatabase } from '../profile/profileData';
import { useFilteredList } from '../../shared/hooks/useFilteredList';
import { useAutoScroll } from '../../shared/hooks/useAutoScroll';
import { playClickSound } from '../../shared/lib/SoundEffects';
import { EmptyState, FilterTabs, SearchBox } from '../../shared/components/ListControls';
import { CERT_CATEGORIES, certMatchesCategory, certMatchesSearch, toCertificateItem, type CertificateItem } from './certificatesData';
import { CertificateRow } from './CertificateRow';
import { CertificateLightbox } from './CertificateLightbox';
import './certificate.css';

const Certificate = () => {
  const list = useFilteredList({
    items: profileDatabase.certifications,
    matchesFilter: certMatchesCategory,
    matchesSearch: certMatchesSearch,
  });
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const closeViewer = useCallback(() => setSelectedCert(null), []);
  const tickerRef = useAutoScroll<HTMLDivElement>({ speed: 25 });

  const scrollTicker = (direction: 1 | -1) => {
    playClickSound();
    tickerRef.current?.scrollBy?.({ left: direction * 440, behavior: 'smooth' });
  };

  return (
    <section id="certificates" className="certificate-section" style={{ padding: '80px 0', overflow: 'hidden', width: '100%' }}>
      <div className="cert-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px', width: '100%' }}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3.8rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            CERTIFICATIONS & CREDENTIALS .
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 28px', fontSize: '1.05rem', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Continuous infinite gallery of verified certificates from Lifelong Learning programs, design workshops, and agile technical domains.
          </p>

          <SearchBox
            value={list.query}
            placeholder="Search certification title, topic, or domain..."
            busy={list.isUpdating}
            onChange={list.setQuery}
            onClear={list.clearQuery}
          />


          <FilterTabs
            options={CERT_CATEGORIES}
            active={list.activeFilter}
            onSelect={list.selectFilter}
            style={{ marginBottom: '24px' }}
          />
        </div>
      </div>

      {list.filtered.length === 0 ? (
        <EmptyState
          title="No certificates found"
          message={<>No certificates matched &quot;{list.query}&quot; under &quot;{list.activeFilter}&quot;.</>}
          resetLabel="Reset Search ⟳"
          onReset={list.reset}
        />
      ) : (
        /* Slow auto-scrolling ticker of glass rows; wheel / trackpad / touch / drag / ← → to scroll by hand */
        <div className="cert-ticker">
          <div
            ref={tickerRef}
            className="cert-ticker__viewport"
            tabIndex={0}
            role="region"
            aria-label="Certificates (scroll horizontally)"
          >
            <ul className="cert-ticker__track">
              {/* list rendered twice for a seamless loop; the copy is hidden from screen readers */}
              {[...list.filtered, ...list.filtered].map((title, index) => (
                <li key={`${title}-${index}`} aria-hidden={index >= list.filtered.length || undefined}>
                  <CertificateRow
                    cert={toCertificateItem(title)}
                    onOpen={setSelectedCert}
                    tabIndex={index >= list.filtered.length ? -1 : undefined}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="cert-ticker__controls">
            <button type="button" className="btn btn--glass btn--sm" onClick={() => scrollTicker(-1)} aria-label="Scroll certificates left">
              ←
            </button>
            <span className="cert-ticker__hint">Drag or scroll to browse</span>
            <button type="button" className="btn btn--glass btn--sm" onClick={() => scrollTicker(1)} aria-label="Scroll certificates right">
              →
            </button>
          </div>
        </div>
      )}

      <CertificateLightbox cert={selectedCert} onClose={closeViewer} />
    </section>
  );
};

export default Certificate;
