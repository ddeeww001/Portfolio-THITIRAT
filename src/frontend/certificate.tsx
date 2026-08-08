import { useState } from 'react';
import { profileDatabase } from '../data/profileData';
import { playClickSound, playHoverSound } from './components/SoundEffects';
import './CSS/certificate.css';

const Certificate = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCert, setSelectedCert] = useState<{ title: string; file: string } | null>(null);

  const certMapping: { [key: string]: string } = {
    "UXUI Foundation Program (LIFELONG) - Organized by T.C.C. Technology Co., Ltd": "UXUI Foundation Program.pdf",
    "Creativity and Imagination (LIFELONG)": "Creativity and Imageination.pdf",
    "Agile Thinking": "Agile Thinking.pdf",
    "Logical Reasoning": "Logical Reasoning.pdf",
    "Logical Resoning": "Logical Resoning.pdf",
    "Aapability": "Aapability.pdf",
    "Active listening": "Active listening.pdf",
    "Adopting different perspectives": "Adopting different perspectives.pdf",
    "Asink the right questions": "Asink the right questions.pdf",
    "Learning how to learn": "Learning how to learn.pdf",
    "Seeking relevant information": "Seeking relevant information.pdf",
    "Storytelling and Pulblic Speaking": "Storytelling and Pulblic Speaking.pdf",
    "Structured Provlem Ssoving": "Structured Provlem Ssoving.pdf",
    "Synthizing messages": "Synthizing messages.pdf",
    "Time Management and Priotization": "Time Management and Priotization.pdf",
    "Translatingg Knoeledge to different context": "Translatingg Knoeledge to different context.pdf",
    "Understanding Biases": "Understanding Biases.pdf",
    "Work-plan Development": "Work-plan Development.pdf",
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
                  {/* High-Impact Visual Certificate Document Preview Card */}
                  <div
                    style={{
                      height: '160px',
                      background: 'linear-gradient(135deg, #14151c 0%, #232430 100%)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '18px',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      overflow: 'hidden',
                      position: 'relative',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {/* Top Watermark & Seal */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                        ACCREDITED PDF
                      </span>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: 'var(--radius-full)',
                          padding: '2px 8px',
                          fontSize: '0.65rem',
                          color: '#ffffff',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                        }}
                      >
                        ✓ VERIFIED
                      </div>
                    </div>

                    {/* Certificate Graphic Icon & Title Emblem */}
                    <div style={{ textAlign: 'center', margin: '8px 0' }}>
                      <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>📜</div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#ffffff',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}
                      >
                        LIFELONG CERTIFICATE
                      </div>
                    </div>

                    {/* Bottom Document Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        CMU • T.C.C.
                      </span>
                      <span style={{ fontSize: '0.65rem', color: '#ffffff', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        VIEW PDF ↗
                      </span>
                    </div>
                  </div>

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

