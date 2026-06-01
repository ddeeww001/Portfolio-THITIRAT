import { useState, useEffect } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="home-hero-container">
      <div className={`hero-glass-card ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
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
    </div>
  );
};

export default Home;
