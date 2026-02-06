import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="home-container">
      <div 
        className={`envelope-wrapper ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* พื้นหลังซอง */}
        <div className="envelope-base"></div>

        {/* ปีกซองทั้ง 4 ด้าน */}
        <div className="flap envelope-lid"></div>
        <div className="flap envelope-left"></div>
        <div className="flap envelope-right"></div>
        <div className="flap envelope-pocket"></div>
        
        {/* --- กระดาษเนื้อหา (แก้ไขใหม่) --- */}
        <div className="letter" onClick={(e) => e.stopPropagation()}>
          
          {/* Header เล็กๆ */}
          <h2 style={{fontSize: '1.5rem', marginBottom: '5px'}}>THITIRAT SIRISAWAD</h2>
          <p className="role" style={{fontSize: '0.9rem', marginBottom: '25px'}}>UX/UI Designer & Frontend</p>

          {/* กล่องข้อความต้อนรับ */}
          <div style={{
            textAlign: 'left', 
            width: '100%', 
            padding: '0 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            
            {/* English Section */}
            <div className="msg-en">
              <h3 style={{fontSize: '1.1rem', color: '#7328ff', marginBottom: '8px'}}>
                ✉️ Thanks for stopping by!
              </h3>
              <p style={{fontSize: '0.95rem', lineHeight: '1.6', color: '#334155'}}>
               Thank you so much for clicking on this email! 
               This website showcases my aspirations as a UX/UI 
               Designer and Frontend Developer. I hope you enjoy 
               my creations.
                </p>
            </div>

            {/* เส้นคั่นบางๆ */}
            <div style={{width: '100%', height: '1px', background: '#e2e8f0'}}></div>

            {/* Thai Section */}
            <div className="msg-th">
              <h3 style={{fontSize: '1.1rem', color: '#7328ff', marginBottom: '8px', fontFamily: "'Poppins', sans-serif"}}>
                ยินดีต้อนรับนะคะ!
              </h3>
              <p style={{fontSize: '0.95rem', lineHeight: '1.6', color: '#334155'}}>
                ขอบคุณมากๆ ที่กดเข้ามาดูจดหมายฉบับนี้นะคะ 
                เว็บไซต์นี้รวบรวมความตั้งใจของฉันในการเป็น <b>UX/UI Designer</b> และ <b>Frontend Developer</b> 
                หวังว่าคุณจะมีความสุขและสนุกกับการเยี่ยมชมผลงานที่ฉันสร้างสรรค์ค่ะ
              </p>
            </div>

          </div>

          {/* ปุ่ม CTA */}
          <Link to="/Experience" className="letter-btn" style={{marginTop: 'auto'}}>
            Explore My Work ➜
          </Link>
        </div>

        {/* ข้อความบอกให้คลิก */}
        {!isOpen && (
           <p className="click-hint">Tap to open message 📩</p>
        )}

      </div>
    </div>
  );
};

export default Home;