import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  return (
    <div className="home-hero-container">
      <div className={`hero-glass-card ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
          {/* Animated greeting */}
          <p className="greeting animate-slide-down">
            👋 Welcome to my portfolio
          </p>
          
          {/* Name with gradient animation */}
          <h1 className="hero-name animate-slide-up">
            THITIRAT SIRISAWAD
          </h1>
          
          {/* Role with typing effect styling */}
          <h2 className="hero-role animate-fade-in">
            UX/UI Designer & Frontend Developer
          </h2>
          
          {/* Description */}
          <p className="hero-description animate-fade-in-delay">
            เว็บไซต์นี้รวบรวมความตั้งใจของฉันในการออกแบบและพัฒนาเว็บไซต์ 
            ฉันหลงใหลในการสร้างสรรค์ประสบการณ์ดิจิทัลที่ใช้งานง่ายและมีดีไซน์ที่ทันสมัย 
            หวังว่าคุณจะสนุกกับการเยี่ยมชมผลงานของฉันนะคะ
          </p>

          {/* Action buttons with hover effects */}
          <div className="hero-actions animate-fade-in-delay-2">
            <Link to="/Profile" className="btn-secondary">
              <span>About Me</span>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator animate-bounce">
            <span>↓</span>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="hero-bg-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
};

export default Home;

// Made with Bob
