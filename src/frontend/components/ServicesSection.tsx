import React from 'react';
import { playHoverSound } from './SoundEffects';

interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
}

const services: ServiceItem[] = [
  {
    number: '01',
    title: 'UI/UX DESIGN',
    subtitle: 'Figma & Design Systems',
    description:
      'Websites and apps, from first wireframe to pixel-final Figma. Creating intuitive, aesthetic interfaces built for seamless user experiences.',
    tools: ['Figma', 'Canva', 'Affinity', 'User Flows', 'Wireframing'],
  },
  {
    number: '02',
    title: 'FRONTEND DEVELOPMENT',
    subtitle: 'React, TypeScript & Vite',
    description:
      'Fast, responsive, animated web apps with modern component architecture. Building pixel-perfect frontend experiences with clean code.',
    tools: ['React', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Vite'],
  },
  {
    number: '03',
    title: 'PRODUCT ARCHITECTURE',
    subtitle: 'Agile Strategy & Logic',
    description:
      'Turning complex requirements into structured digital solutions. Combining logical reasoning, agile thinking, and robust system design.',
    tools: ['Java', 'Agile Thinking', 'Logical Reasoning', 'System Design', 'Git'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="section services-section" style={{ background: 'var(--trionn-bg-alt)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '60px' }}>
          <div className="availability-pill" style={{ marginBottom: '16px' }}>
            <span className="status-dot"></span>
            <span>SERVICES • WHAT I MAKE</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            WHAT I MAKE .
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Turning ideas into high-impact digital products. Every screen and line of code is crafted with purpose, precision, and performance.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.number}
              className="service-card interactive-hover"
              onMouseEnter={playHoverSound}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '16px',
                    gap: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: '#ffffff',
                    }}
                  >
                    {service.number}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-subtle)',
                      maxWidth: '100%',
                    }}
                  >
                    {service.subtitle}
                  </span>
                </div>

                <h3 className="service-card-title">
                  {service.title}
                </h3>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.98rem',
                    lineHeight: 1.65,
                    marginBottom: '28px',
                  }}
                >
                  {service.description}
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  {service.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#ffffff',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid var(--border-medium)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
