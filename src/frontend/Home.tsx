<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
=======
﻿import { useState, useEffect } from 'react';
>>>>>>> parent of 26484bd ( Revert docs(Portfolio_01): restructure project with centralized data management and unified dark theme This reverts commit e356d4d2d2afee6560399b0df809b44bb3977eb0.)

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
<<<<<<< HEAD
          {/* Animated greeting */}
=======
>>>>>>> parent of 26484bd ( Revert docs(Portfolio_01): restructure project with centralized data management and unified dark theme This reverts commit e356d4d2d2afee6560399b0df809b44bb3977eb0.)
          <p className="greeting animate-slide-down">
            <i className="bi bi-hand-wave"></i> Welcome to my portfolio
          </p>
<<<<<<< HEAD
          
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
            <i className="bi bi-arrow-down"></i>
=======
          <div className="hero-main-text">
            {/* Additional content can go here */}
>>>>>>> parent of 26484bd ( Revert docs(Portfolio_01): restructure project with centralized data management and unified dark theme This reverts commit e356d4d2d2afee6560399b0df809b44bb3977eb0.)
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Background decorative elements */}
=======
>>>>>>> parent of 26484bd ( Revert docs(Portfolio_01): restructure project with centralized data management and unified dark theme This reverts commit e356d4d2d2afee6560399b0df809b44bb3977eb0.)
      <div className="hero-bg-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
};

export default Home;
<<<<<<< HEAD

// Made with Bob
=======
>>>>>>> parent of 26484bd ( Revert docs(Portfolio_01): restructure project with centralized data management and unified dark theme This reverts commit e356d4d2d2afee6560399b0df809b44bb3977eb0.)
