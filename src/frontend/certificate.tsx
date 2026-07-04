
import React, { useRef } from 'react';
import { profileDatabase } from '../data/profileData';
import './CSS/certificate.css';

const Certificate = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Mapping based on actual file names found in your folder
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

  // Get ALL certificates from database
  const certifications = profileDatabase.certifications;
  
  // For the infinite effect, we still use a loop, but we ensure ALL data is used
  const loopCerts = [...certifications, ...certifications, ...certifications];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="certificates" className="certificate-section">
      <div className="cert-container">
        <h2 className="cert-header">CERTIFICATIONS</h2>
        
        <div className="cert-slider-wrapper">
          <button className="nav-btn prev" onClick={() => scroll('left')}>
            <i className="bi bi-chevron-left"></i>
          </button>
          
          <div className="cert-slider" ref={scrollRef}>
            <div className="cert-track">
              {loopCerts.map((cert, index) => {
                const fileName = certMapping[cert] || `${cert.toLowerCase().replace(/\s+/g, '_')}.pdf`;
                return (
                  <div className="cert-card" key={index}>
                    <div className="cert-image-wrapper">
                      <embed 
                        src={`/certify_LifeLongLearning/${fileName}`} 
                        type="application/pdf"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                      />
                    </div>
                    <div className="cert-info">
                      <p>{cert}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="nav-btn next" onClick={() => scroll('right')}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
