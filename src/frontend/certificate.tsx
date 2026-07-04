
import { profileDatabase } from '../data/profileData';
import './certificate.css';

const Certificate = () => {
  // Mapping ชื่อใน Database -> ชื่อไฟล์จริงในโฟลเดอร์ public/certify_LifeLongLearning/
  const certMapping: { [key: string]: string } = {
    "UXUI Foundation Program (LIFELONG) - Organized by T.C.C. Technology Co., Ltd": "UXUI Foundation Program.pdf",
    "Creativity and Imagination (LIFELONG)": "Creativity and Imageination.pdf",
    // คุณสามารถเพิ่มการ Map ชื่ออื่นๆ ได้ที่นี่ เช่น:
    // "Agile Thinking": "Agile Thinking.pdf",
  };

  const certifications = profileDatabase.certifications;
  
  // สร้างชุดข้อมูลซ้ำ 3 ชุดเพื่อให้เลื่อนวนได้แบบไร้รอยต่อ (Infinite Loop)
  const loopCerts = [...certifications, ...certifications, ...certifications];

  return (
    <section id="certificates" className="certificate-section">
      <div className="cert-container">
        <h2 className="cert-header">CERTIFICATIONS</h2>
        
        <div className="cert-slider">
          <div className="cert-track">
            {loopCerts.map((cert, index) => {
              // ถ้าไม่มีใน Mapping ให้ใช้ชื่อไฟล์ที่เป็นตัวเล็กและเปลี่ยนช่องว่างเป็น _ (หรือใส่ชื่อ default)
              const fileName = certMapping[cert] || `${cert.toLowerCase().replace(/\s+/g, '_')}.pdf`;
              
              return (
                <div className="cert-card" key={index}>
                  <div className="cert-image-wrapper">
                    <embed 
                      src={`/certify_LifeLongLearning/${fileName}`} 
                      type="application/pdf"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                  </div>
                  <div className="cert-info">
                    <p>{cert}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;