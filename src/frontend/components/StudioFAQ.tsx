import React, { useState } from 'react';
import { playClickSound, playHoverSound } from './SoundEffects';

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: 'What core technologies & design tools do you use?',
    answer:
      'For design and prototyping: Figma, Canva, Affinity, and Wireframe systems. For engineering: React, TypeScript, JavaScript, HTML5/CSS3, Vite, Java, and Git version control.',
  },
  {
    question: 'How do you approach UI/UX design and development?',
    answer:
      'I focus on user-centric usability, clean visual hierarchy, and fast loading performance. I move from initial user flows and Figma wireframes to pixel-perfect code.',
  },
  {
    question: 'Are you available for freelance projects or full-time roles?',
    answer:
      'Yes! I am available for full-time frontend/UX-UI engineering roles, contract work, and custom design projects worldwide.',
  },
  {
    question: 'How do you ensure project quality and responsive design?',
    answer:
      'Every project is tested across multiple viewports (mobile, tablet, desktop) enforcing WCAG AAA accessibility, clean CSS architecture, and type-safe code.',
  },
];

export const StudioFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    playClickSound();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section faq-section" style={{ background: 'var(--trionn-bg)', width: '100%' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="availability-pill" style={{ marginBottom: '16px', display: 'inline-flex' }}>
            <span className="status-dot"></span>
            <span>FAQ • THE NOSY SECTION</span>
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
            THE NOSY SECTION .
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '1.05rem', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Got questions about process, stack, or availability? Here are straight answers to common questions.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--trionn-card)',
                  border: `1px solid ${isOpen ? '#ffffff' : 'var(--border-medium)'}`,
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  onMouseEnter={playHoverSound}
                  style={{
                    width: '100%',
                    padding: 'clamp(16px, 3vw, 24px) clamp(16px, 3vw, 28px)',
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                    fontWeight: 700,
                    gap: '12px',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  <span style={{ flex: 1, wordBreak: 'break-word', overflowWrap: 'break-word' }}>{item.question}</span>
                  <span
                    style={{
                      fontSize: '1.4rem',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 28px 24px',
                      color: 'var(--text-secondary)',
                      fontSize: '1rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '16px',
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
