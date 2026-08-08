import { useState, useRef, useEffect } from 'react';
import { profileDatabase } from '../data/profileData';
import { playClickSound, playHoverSound } from './components/SoundEffects';
import './CSS/certificate.css';

// PDF.js Canvas Thumbnail Renderer for Real Certificate PDF Images
const PDFThumbnail = ({ url, title }: { url: string; title: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const renderPDF = async () => {
      try {
        if (!(window as any).pdfjsLib) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          document.head.appendChild(script);
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        if (!isMounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: 0.55 });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        if (isMounted) setLoading(false);
      } catch (err) {
        if (isMounted) setError(true);
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
        height: '160px',
        background: 'linear-gradient(135deg, #14151c 0%, #232430 100%)',
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
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: error ? 'none' : 'block',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Loading or Fallback Graphic */}
      {(loading || error) && (
        <div style={{ padding: '16px', textAlign: 'center', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #14151c 0%, #232430 100%)' }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>📜</div>
          <div
            style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              color: '#ffffff',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            {title}
          </div>
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

  const certifications = profileDatabase.certifications;

  const filteredCerts = certifications.filter((cert) =>
    cert.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Duplicate list for continuous infinite marquee looping
  const marqueeList = [...filteredCerts, ...filteredCerts];

  return (
    <section id="certificates" className="certificate-section" style={{ padding: '80px 0', overflow: 'hidden' }}>
      <div className="cert-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="availability-pill">
            <span className="status-dot"></span>
            <span>CONTINUOUS TICKER • VERIFIED ACCOMPLISHMENTS</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              background: 'var(--text-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
            }}
          >
            CERTIFICATIONS & <br />
            <span style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>
              CREDENTIALS
            </span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 24px', fontSize: '1.05rem' }}>
            Continuous infinite gallery of verified certificates from Lifelong Learning programs, design workshops, and agile technical domains.
          </p>

          {/* Search Filter Box */}
          <div style={{ maxWidth: '400px', margin: '0 auto 30px' }}>
            <input
              type="text"
              placeholder="Search certification title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-full)',
                padding: '10px 20px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>      {/* Continuous Infinite Marquee Track Container */}
      <div className="cert-marquee-container" style={{ position: 'relative', zIndex: 1 }}>
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

