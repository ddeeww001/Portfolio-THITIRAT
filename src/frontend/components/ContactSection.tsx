import React, { useState } from 'react';
import { profileDatabase } from '../../data/profileData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    websiteHoneypot: '', // Spam prevention bot trap
  });
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [copied, setCopied] = useState(false);

  // XSS Escaping helper
  const sanitizeInput = (text: string): string => {
    return text.replace(/[&<>"']/g, (match) => {
      const escapeMap: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
      };
      return escapeMap[match] || match;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Bot trap honeypot check
    if (formData.websiteHoneypot) {
      // Spam bot detected, pretend success silently
      setStatusMsg({ text: 'Message sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', message: '', websiteHoneypot: '' });
      return;
    }

    const cleanName = sanitizeInput(formData.name.trim());
    const cleanEmail = sanitizeInput(formData.email.trim());
    const cleanMessage = sanitizeInput(formData.message.trim());

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setStatusMsg({ text: 'Please complete all required fields.', type: 'error' });
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setStatusMsg({ text: 'Please provide a valid email address.', type: 'error' });
      return;
    }

    // Construct mailto for secure direct contact without server leak
    const mailtoSubject = encodeURIComponent(`Portfolio Inquiry from ${cleanName}`);
    const mailtoBody = encodeURIComponent(`Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`);
    
    window.location.href = `mailto:${profileDatabase.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setStatusMsg({ text: 'Opening email application...', type: 'success' });
    setFormData({ name: '', email: '', message: '', websiteHoneypot: '' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileDatabase.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section" style={{ padding: '100px 20px 80px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="availability-pill">
            <span className="status-dot"></span>
            <span>NO FORMS. NO HOOPS. JUST THIS.</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
              color: '#ffffff',
            }}
          >
            LET'S TALK .
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: '1.1rem' }}>
            It’s prime time at the studio. Perfect light for building — send over your idea and let's create something extraordinary.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Direct Info Card */}
          <div
            style={{
              background: 'var(--trionn-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', fontFamily: 'var(--font-display)' }}>
              Direct Contacts
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  EMAIL ADDRESS
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                  <a
                    href={`mailto:${profileDatabase.email}`}
                    style={{ fontSize: '1.1rem', color: 'var(--neon-lime)', fontWeight: 600 }}
                  >
                    {profileDatabase.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-secondary)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  PHONE NUMBER
                </span>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '4px' }}>
                  {profileDatabase.phone}
                </p>
              </div>
            </div>

            <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Social & Portfolios
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {profileDatabase.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link || '#'}
                  target={social.link ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s ease',
                  }}
                  className="interactive-hover"
                >
                  {social.label}: <strong style={{ color: 'var(--text-primary)' }}>{social.value}</strong>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: 'var(--trionn-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {/* Honeypot Bot Trap Field (Hidden from real users) */}
            <input
              type="text"
              name="websiteHoneypot"
              value={formData.websiteHoneypot}
              onChange={handleInputChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                }}
              >
                YOUR NAME *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Thitirat Sirisawad"
                style={{
                  width: '100%',
                  background: 'rgba(7, 8, 10, 0.7)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                }}
              >
                YOUR EMAIL *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="dewthitirat@gmail.com"
                style={{
                  width: '100%',
                  background: 'rgba(7, 8, 10, 0.7)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                }}
              >
                YOUR MESSAGE *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project or inquiry..."
                style={{
                  width: '100%',
                  background: 'rgba(7, 8, 10, 0.7)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                  resize: 'vertical',
                }}
              />
            </div>

            {statusMsg && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  background: statusMsg.type === 'success' ? 'rgba(204, 255, 0, 0.15)' : 'rgba(255, 99, 99, 0.15)',
                  border: `1px solid ${statusMsg.type === 'success' ? 'var(--neon-lime)' : '#ff6363'}`,
                  color: statusMsg.type === 'success' ? 'var(--neon-lime)' : '#ff8888',
                }}
              >
                {statusMsg.text}
              </div>
            )}

            <button
              type="submit"
              style={{
                background: 'var(--primary-gradient)',
                color: '#0b0f19',
                border: 'none',
                padding: '14px 28px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '10px',
                boxShadow: '0 4px 20px var(--neon-lime-glow)',
              }}
              className="interactive-hover"
            >
              SEND MESSAGE ↗
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
