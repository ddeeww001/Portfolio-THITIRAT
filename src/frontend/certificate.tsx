import { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { profileDatabase } from '../data/profileData';
import { playClickSound, playHoverSound } from './components/SoundEffects';
import './CSS/certificate.css';

// Set bundled local worker source for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Real Certificate Document Page Renderer Component
const PDFThumbnail = ({ url, title }: { url: string; title: string }) => {
  const [rendered, setRendered] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        if (!isMounted) return;

        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport, canvas } as any).promise;
          if (isMounted) {
            const dataUrl = canvas.toDataURL('image/png');
            setImgUrl(dataUrl);
            setRendered(true);
          }
        }
      } catch (err) {
        console.log("PDF canvas fallback active for:", url, err);
      }
    };

    renderPDF();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <div
      style={{
        height: '165px',
        background: '#0a0a0c',
        borderRadius: 'var(--radius-md)',
        marginBottom: '18px',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
      }}
    >
      {/* 1. Shimmer Skeleton while rendering */}
      {!rendered && (
        <div className="skeleton-box" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
      )}

      {/* 2. Real Rendered Certificate Image */}
      {rendered && imgUrl ? (
        <img
          src={imgUrl}
          alt={title}
          className="img-fade-in is-loaded"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 2,
          }}
        />
      ) : (
        /* 3. High-Impact Visual Certificate Cover */
        <div style={{ padding: '16px', textAlign: 'center', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #14151c 0%, #232430 100%)', zIndex: 2 }}>
          <div style={{ marginBottom: '8px', opacity: 0.9 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.05em' }}>
            {title}
          </span>
        </div>
      )}

      {/* Verified Badge Stamp */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(10, 10, 12, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 'var(--radius-full)',
          padding: '2px 8px',
          fontSize: '0.65rem',
          color: '#ffffff',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          backdropFilter: 'blur(4px)',
          zIndex: 2,
        }}
      >
        ✓ VERIFIED
      </div>
    </div>
  );
};

const Certificate = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCert, setSelectedCert] = useState<{ title: string; file: string } | null>(null);

  const certMapping: { [key: string]: string } = {
    "UXUI Foundation Program (LIFELONG) - Organized by T.C.C. Technology Co., Ltd": "UXUI Foundation Program.pdf",
    "Creativity and Imagination (LIFELONG)": "Creativity and Imageination.pdf",
    "Agile Thinking": "Agile Thinking.pdf",
    "Logical Reasoning": "Logical Reasoning.pdf",
    "Capability": "Aapability.pdf",
    "Active Listening": "Active listening.pdf",
    "Adopting Different Perspectives": "Adopting different perspectives.pdf",
    "Asking the Right Questions": "Asink the right questions.pdf",
    "Learning How to Learn": "Learning how to learn.pdf",
    "Seeking Relevant Information": "Seeking relevant information.pdf",
    "Storytelling and Public Speaking": "Storytelling and Pulblic Speaking.pdf",
    "Structured Problem Solving": "Structured Provlem Ssoving.pdf",
    "Synthesizing Messages": "Synthizing messages.pdf",
    "Time Management and Prioritization": "Time Management and Priotization.pdf",
    "Translating Knowledge to Different Contexts": "Translatingg Knoeledge to different context.pdf",
    "Understanding Biases": "Understanding Biases.pdf",
    "Work-Plan Development": "Work-plan Development.pdf",
  };

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isSearching, setIsSearching] = useState(false);

  const categories = ['ALL', 'UX/UI & Foundation', 'Lifelong Learning', 'Agile & Thinking', 'Communication'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 200);
  };

  const handleCategoryChange = (cat: string) => {
    playClickSound();
    setIsSearching(true);
    setSelectedCategory(cat);
    setTimeout(() => {
      setIsSearching(false);
    }, 180);
  };

  const certifications = profileDatabase.certifications;

  const filteredCerts = certifications.filter((cert) => {
    const matchesSearch = cert.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'UX/UI & Foundation') return cert.toLowerCase().includes('uxui') || cert.toLowerCase().includes('design');
    if (selectedCategory === 'Lifelong Learning') return cert.toLowerCase().includes('lifelong') || cert.toLowerCase().includes('learning');
    if (selectedCategory === 'Agile & Thinking') return cert.toLowerCase().includes('agile') || cert.toLowerCase().includes('reasoning') || cert.toLowerCase().includes('problem');
    if (selectedCategory === 'Communication') return cert.toLowerCase().includes('speaking') || cert.toLowerCase().includes('listening') || cert.toLowerCase().includes('storytelling');

    return true;
  });

  // Duplicate list for continuous infinite marquee looping
  const marqueeList = [...filteredCerts, ...filteredCerts];

  const resetCertFilters = () => {
    playClickSound();
    setSelectedCategory('ALL');
    setSearchTerm('');
  };

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

          {/* Interactive Search Box with Real-time Loading Indicator */}
          <div className="interactive-search-box">
            <span className="search-icon-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>

            <input
              type="text"
              className="search-input-field"
              placeholder="Search certification title, topic, or domain..."
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <div className="search-action-right">
              {isSearching && <div className="search-loading-spinner" title="Searching..." />}
              {searchTerm && (
                <button className="search-clear-btn" onClick={() => setSearchTerm('')} title="Clear search">
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Live Result Feedback Pill */}
          <div className={`feedback-counter-badge ${isSearching ? 'is-updating' : ''}`}>
            <span className={`feedback-dot ${isSearching ? 'pulse' : 'green'}`} />
            <span>
              {isSearching
                ? 'SEARCHING CERTIFICATIONS . . .'
                : `SHOWING ${filteredCerts.length} OF ${certifications.length} CERTIFICATES`}
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="filter-container" style={{ marginBottom: '24px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
                onMouseEnter={playHoverSound}
                style={{ fontSize: '0.82rem', padding: '7px 16px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State when 0 certificates match */}
      {filteredCerts.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: 0 }}>No certificates found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: '380px' }}>
            No certificates matched &quot;{searchTerm}&quot; under &quot;{selectedCategory}&quot;.
          </p>
          <button className="empty-state-btn" onClick={resetCertFilters}>
            Reset Search ⟳
          </button>
        </div>
      ) : (
        /* Continuous Infinite Marquee Track Container */
        <div className="cert-marquee-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="cert-marquee-track">
            {marqueeList.map((cert, index) => {
              const fileName = certMapping[cert] || `${cert.toLowerCase().replace(/\s+/g, '_')}.pdf`;
              const filePath = `/certify_LifeLongLearning/${fileName}`;

            return (
              <div
                key={index}
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
                onClick={() => {
                  playClickSound();
                  setSelectedCert({ title: cert, file: filePath });
                }}
              >
                <div>
                  {/* Real PDF Canvas Thumbnail Renderer */}
                  <PDFThumbnail url={filePath} title={cert} />
                  
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
                    {cert}
                  </h4>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                    setSelectedCert({ title: cert, file: filePath });
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
          })}
        </div>
      </div>
      )}

      {/* Certificate Lightbox Modal Viewer */}
      {selectedCert && (
        <div className="modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div
            className="modal-card"
            style={{ maxWidth: '850px', height: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={() => setSelectedCert(null)}>
              ✕
            </button>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '16px', paddingRight: '40px' }}>
              {selectedCert.title}
            </h3>

            <div style={{ width: '100%', height: 'calc(100% - 100px)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#0a0a0c' }}>
              <iframe
                src={selectedCert.file}
                title={selectedCert.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <a
                href={selectedCert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link-btn"
              >
                OPEN FULL PDF ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificate;

