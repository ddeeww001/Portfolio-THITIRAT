
import React, { useRef } from 'react';
import { profileDatabase } from '../data/profileData';
import './CSS/certificate.css';

const Certificate = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
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
  // Duplicate for seamless infinite loop
  const loopCerts = [...certifications, ...certifications, ...certifications];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      const currentScroll = scrollRef.current.scrollLeft;

      if (direction === 'left' && currentScroll <= 0) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
      } else if (direction === 'right' && currentScroll >= (scrollRef.current.scrollWidth * 2) / 3) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
      }

      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="certificates" className="certificate-section">
      <div className="cert-container">
        <div className="cert-header-wrapper">
          <h2 className="cert-header">CERTIFICATIONS</h2>
          <div className="cert-header-underline"></div>
        </div>
        
        <div className="cert-slider-wrapper">
          <button className="nav-btn prev" onClick={() => scroll('left')}>
            <span className="nav-text">&lt;</span>
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
            <span className="nav-text">&gt;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
