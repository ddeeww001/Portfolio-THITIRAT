import { useEffect, useState } from 'react';
import { profileDatabase } from '../../features/profile/profileData';
import { PROFILE_IMAGE } from '../../shared/constants';
import { playClickSound, playHoverSound, setSoundEnabled } from '../../shared/lib/SoundEffects';
import { navItems, scrollToSection, type SectionId } from '../navigation';
import { useActiveSection } from '../useActiveSection';
import { NavIcon } from './NavIcon';
import { SoundToggle } from './SoundToggle';

const MOBILE_BREAKPOINT = 850;
const firstName = profileDatabase.name.split(' ')[0] ?? '';

export const Navbar = () => {
  const activeSection = useActiveSection();
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close the mobile menu on Escape or when resizing up to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMobileMenuOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
    if (next) playClickSound();
  };

  const handleNavClick = (id: SectionId) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  const currentActiveItem = navItems.find((item) => item.id === activeSection) ?? navItems[0];

  return (
    <>
      {mobileMenuOpen && (
        <div className="navbar-backdrop" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
      )}
      <header className="navbar-wrapper">
        <nav className="navbar-container glass">
          {/* Brand Logo & Profile Pic */}
          <div className="navbar-brand">
            <button
              onClick={() => handleNavClick('home')}
              className="navbar-profile-btn"
              onMouseEnter={playHoverSound}
              aria-label="Home"
            >
              <img alt={profileDatabase.name} src={PROFILE_IMAGE} className="navbar-profile-pic" />
            </button>
            <span className="navbar-logo-text" onClick={() => handleNavClick('home')}>
              {firstName.toUpperCase()}
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="navbar-desktop-menu navbar-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`navbar-nav-btn ${activeSection === item.id ? 'active' : ''}`}
                aria-current={activeSection === item.id ? 'true' : undefined}
                onMouseEnter={playHoverSound}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop actions: sound toggle + primary CTA (Figma: LET'S TALK →) */}
          <div className="navbar-actions">
            <SoundToggle active={soundActive} onToggle={toggleSound} />
            {/* <button className="btn btn--primary navbar-cta" onClick={() => handleNavClick('contact')} onMouseEnter={playHoverSound}>
              LET&apos;S TALK <span aria-hidden="true">→</span>
            </button> */}
          </div>

          {/* Mobile Controls */}
          <div className="navbar-mobile-controls">
            <SoundToggle active={soundActive} onToggle={toggleSound} compact />
            <button
              className={`navbar-mobile-dropdown-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={playHoverSound}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="navbar-dropdown-current-label">{currentActiveItem.label}</span>
              <svg
                className={`navbar-dropdown-chevron ${mobileMenuOpen ? 'rotated' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-dropdown">
            <div className="navbar-dropdown-list">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    className={`navbar-dropdown-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={playHoverSound}
                  >
                    <span className="navbar-dropdown-item-left">
                      <span className="navbar-dropdown-item-icon">
                        <NavIcon id={item.id} />
                      </span>
                      <span className="navbar-dropdown-item-text">{item.label}</span>
                    </span>
                    {isActive && <span className="navbar-dropdown-active-dot" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
