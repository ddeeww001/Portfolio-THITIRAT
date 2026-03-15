import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-hero-container">
      <div className="hero-glass-card">
        <div className="hero-content">
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
    </div>
  );
};

export default Home;