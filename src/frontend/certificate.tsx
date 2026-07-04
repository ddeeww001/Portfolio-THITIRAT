
import React, { useEffect, useState } from 'react';
import { profileDatabase } from '../data/profileData';
import './CSS/certificate.css';

const Certificate = () => {
  const [visibleCerts, setVisibleCerts] = useState<number[]>([]);
  
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCerts((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    const elements = document.querySelectorAll('.cert-item-wrapper');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="certificates" className="certificate-section">
      <div className="cert-container">
        <div className="cert-header-wrapper">
          <h2 className="cert-header">CERTIFICATIONS</h2>
          <div className="cert-header-underline"></div>
        </div>
        
        <div className="cert-timeline-wrapper">
          <div className="timeline-main-line"></div>
          
          <div className="cert-list">
            {certifications.map((cert, index) => {
              const fileName = certMapping[cert] || `${cert.toLowerCase().replace(/\s+/g, '_')}.pdf`;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  className={`cert-item-wrapper ${isEven ? 'left' : 'right'}`} 
                  key={index}
                  data-index={index}
                >
                  <div className={`cert-card ${visibleCerts.includes(index) ? 'visible' : ''}`} 
                       style={{ transitionDelay: `${(index % 3) * 0.1}s` }}>
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
                  
                  <div className="cert-connector">
                    <div className="connector-line"></div>
                    <div className="connector-dot"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
