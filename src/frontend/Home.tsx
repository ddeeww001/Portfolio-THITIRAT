<<<<<<< HEAD
﻿import { useState, useEffect } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

=======
import { Link } from 'react-router-dom';

const Home = () => {
>>>>>>> parent of e356d4d (docs(Portfolio_01): restructure project with centralized data management and unified dark theme)
  return (
    <div className="home-hero-container">
      <div className="hero-glass-card">
        <div className="hero-content">
<<<<<<< HEAD
          <p className="greeting animate-slide-down">
             สวัสดีครับ/ค่ะ ยินดีต้อนรับสู่พื้นที่รวบรวมผลงานของฉัน
          </p>
          <div className="hero-main-text">
            {/* Additional content can go here */}
          </div>
        </div>
      </div>

      <div className="hero-bg-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
=======
          <p className="greeting">👋 Welcome to my portfolio</p>
          <h1 className="hero-name">THITIRAT SIRISAWAD</h1>
          <h2 className="hero-role">UX/UI Designer & Frontend Developer</h2>
          
          <p className="hero-description">
            เว็บไซต์นี้รวบรวมความตั้งใจของฉันในการออกแบบและพัฒนาเว็บไซต์ 
            ฉันหลงใหลในการสร้างสรรค์ประสบการณ์ดิจิทัลที่ใช้งานง่ายและมีดีไซน์ที่ทันสมัย 
            หวังว่าคุณจะสนุกกับการเยี่ยมชมผลงานของฉันนะคะ
          </p>

          <div className="hero-actions">
            <Link to="/Experience" className="btn-primary">
              Explore My Work ➜
            </Link>
            <Link to="/Profile" className="btn-secondary">
              About Me
            </Link>
          </div>
        </div>
      </div>
>>>>>>> parent of e356d4d (docs(Portfolio_01): restructure project with centralized data management and unified dark theme)
    </div>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> parent of e356d4d (docs(Portfolio_01): restructure project with centralized data management and unified dark theme)
