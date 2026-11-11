import { useState } from 'react';
import { profileDatabase } from '../profile/profileData';
import { useFilteredList } from '../../shared/hooks/useFilteredList';
import { EmptyState, FilterTabs, ResultCounter, SearchBox } from '../../shared/components/ListControls';
import { CERT_CATEGORIES, certFilePath, certMatchesCategory, certMatchesSearch } from './certificatesData';
import { CertificateCard } from './CertificateCard';
import { CertificateLightbox } from './CertificateLightbox';
import './certificate.css';

const Certificate = () => {
  const list = useFilteredList({
    items: profileDatabase.certifications,
    matchesFilter: certMatchesCategory,
    matchesSearch: certMatchesSearch,
  });
  const [selectedCert, setSelectedCert] = useState<{ title: string; file: string } | null>(null);

  // Duplicate list for continuous infinite marquee looping
  const marqueeList = [...list.filtered, ...list.filtered];

  return (
    <section id="certificates" className="certificate-section" style={{ padding: '80px 0', overflow: 'hidden', width: '100%' }}>
      <div className="cert-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px', width: '100%' }}>
          <div className="availability-pill">
            <span className="status-dot"></span>
            <span>CONTINUOUS TICKER • VERIFIED ACCOMPLISHMENTS</span>
          </div>
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

          <ResultCounter busy={list.isUpdating} busyLabel="SEARCHING CERTIFICATIONS . . .">
            {`SHOWING ${list.filtered.length} OF ${list.total} CERTIFICATES`}
          </ResultCounter>

          <FilterTabs
            options={CERT_CATEGORIES}
            active={list.activeFilter}
            onSelect={list.selectFilter}
            style={{ marginBottom: '24px' }}
            buttonStyle={{ fontSize: '0.82rem', padding: '7px 16px' }}
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
        /* Continuous infinite marquee track */
        <div className="cert-marquee-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="cert-marquee-track">
            {marqueeList.map((title, index) => (
              <CertificateCard key={index} title={title} file={certFilePath(title)} onOpen={setSelectedCert} />
            ))}
          </div>
        </div>
      )}

      <CertificateLightbox cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
};

export default Certificate;
