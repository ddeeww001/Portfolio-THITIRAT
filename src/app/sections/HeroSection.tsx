import { profileDatabase } from '../../features/profile/profileData';
import { playHoverSound } from '../../shared/lib/SoundEffects';
import { HERO_CLOUD_IMAGE, HERO_IMAGE } from '../../shared/constants';
import { useScrollProgressVar } from '../../shared/hooks/useScrollProgressVar';
import { contactAvailable, scrollToSection } from '../navigation';
import './hero.css';

// Name comes from src/config/profile.ts (public profile data)
const [firstName = '', ...rest] = profileDatabase.name.toUpperCase().split(/\s+/);
const lastName = rest.join(' ');

export const HeroSection = () => {
  // --hero-scroll: 0 at the top → 1 after scrolling ~60% of the hero; the clouds drift out with it
  const heroRef = useScrollProgressVar<HTMLElement>('--hero-scroll');

  return (
  <section ref={heroRef} id="home" className="section hero-section" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '130px 20px 70px' }}>
    {/* Engraved scan-line cloud banks (public/picture/hero-cloud.webp, made by scripts/make-hero-cloud.py).
        Desktop: right side only. Narrow screens: both sides. They drift out sideways as you scroll
        (hero.css → --hero-scroll). Decorative, so hidden from screen readers. */}
    <img className="hero-cloud hero-cloud--left" src={HERO_CLOUD_IMAGE} alt="" aria-hidden="true" decoding="async" width={1588} height={708} />
    <img className="hero-cloud hero-cloud--right" src={HERO_CLOUD_IMAGE} alt="" aria-hidden="true" decoding="async" width={1588} height={708} />

    <div className="hero-layout">
      <div className="hero-layout__text">
        {/* Name with a small role badge pinned to its top-right corner */}
        <h1 className="hero-name-block animate-slide-up">
          <span className="hero-name-block__badge">UX/UI DESIGNER .</span>
          <span className="hero-name-block__name">
            {firstName}
            {lastName && <><br />{lastName}</>}
          </span>
        </h1>

        <p className="hero-layout__lead animate-fade-in-delay">
          Creative Frontend & UX/UI Designer crafting bold digital products, intuitive web applications, and interfaces that refuse to look ordinary.
        </p>

        {/* Action Buttons */}
        <div className="hero-layout__actions animate-fade-in-delay-2">
          <button onClick={() => scrollToSection('experience')} className="btn btn--primary" onMouseEnter={playHoverSound}>
            LET'S SEE
          </button>

          {contactAvailable && (
            <button onClick={() => scrollToSection('contact')} className="btn btn--glass" onMouseEnter={playHoverSound}>
              MY CONTACT
            </button>
          )}
        </div>
      </div>

      {/* Portrait (transparent cut-out from turnpro.dev/th#talents) */}
      <div className="hero-layout__photo animate-fade-in-delay">
        <img src={HERO_IMAGE} alt={profileDatabase.name || 'Portrait'} width={600} height={1000} fetchPriority="high" />
      </div>
    </div>
  </section>
  );
};
