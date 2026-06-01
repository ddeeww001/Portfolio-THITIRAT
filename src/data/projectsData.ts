
// src/data/projectsData.ts
// Centralized database for all project information

export interface LinkItem {
  label: string;
  url: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  toolsUsed: string;
  learning: string;
}

export interface ProjectData {
  id: number;
  title: string;
  date: string;
  role: string | string[];
  details: string[];
  link: LinkItem[];
  tags: string[]; 
  caseStudy?: CaseStudy;
}

export const projectsDatabase: ProjectData[] = [
  {
    id: 8,
    title: "AI HACKATHON : BobInsight (IBM Bob Hackathon)",
    date: "2024",
    role: ["Frontend Developer", "UX/UI Designer"],
    details: [
      "Developed an AI-driven insight platform to simplify complex data visualization.",
      "Collaborated in a team to integrate IBM AI technologies into a seamless user experience."
    ],
    link: [
      { label: "Project Link", url: "https://lablab.ai/ai-hackathons/ibm-bob-hackathon/uia/bobinsight" },
      { label: "GitHub Repository", url: "https://github.com/Pinont/UIA-LABLAB" }
    ],
    tags: ["Frontend", "UX/UI"],
    caseStudy: {
      problem: "การทำความเข้าใจข้อมูล (Data Insights) จำนวนมากเป็นเรื่องยากและใช้เวลานานสำหรับผู้ใช้งานทั่วไป",
      solution: "สร้าง Platform ที่ใช้ AI ช่วยวิเคราะห์และสรุปข้อมูลออกมาเป็น Visual ที่เข้าใจง่ายและโต้ตอบได้",
      toolsUsed: "React สำหรับ Frontend และ IBM AI Services สำหรับการประมวลผลข้อมูล",
      learning: "ได้เรียนรู้การทำงานร่วมกับเทคโนโลยี AI ของ IBM และการออกแบบ Dashboard ที่ต้องรองรับการแสดงผลข้อมูลแบบ Dynamic"
    }
  },
  {
    id: 7,
    title: "HACKATHON : ETHChaingmai",
    date: "28 / 01 /2026 - 3 / 02 / 2026",
    role: "Frontend",
    details: [
      "Customized specific parts of the homepage design and implemented a map feature."
    ],
    link: [
      { label: "Project", url: "https://devfolio.co/projects/relief-mesh-7406" },
      { label: "Presentation", url: "https://www.canva.com/design/DAHAEBR-F5o/kU3WI2J8YAblFhI51HkCuA/view" }
    ],
    tags: ["Frontend"],
    caseStudy: {
      problem: "ความยากในการเข้าถึงข้อมูลพิกัดความช่วยเหลือในพื้นที่ห่างไกลระหว่างเกิดภัยพิบัติ",
      solution: "สร้างระบบแผนที่แบบ Real-time ที่ดึงข้อมูลผ่าน API เพื่อแสดงจุดที่ต้องการความช่วยเหลืออย่างแม่นยำ",
      toolsUsed: "React ร่วมกับ Leaflet API เพื่อการจัดการแผนที่ที่เบาและรวดเร็ว",
      learning: "ได้เรียนรู้การจัดการ Asynchronous data จาก API และการทำ UI สำหรับแผนที่ให้ใช้งานง่ายในสภาวะคับขัน"
    }
  },
  {
    id: 5,
    title: "CAMT open house : WEB3 Club",
    date: "27 / 8 / 2025",
    role: "Designer",
    details: [
      "End-to-end booklet design, logo creation, and design poster customization."     
    ],
    link: [
      { label: "Booklet", url: "https://heyzine.com/flip-book/6c7e35871a.html?ref=web3.camt.cmu.ac.th" },       
      { label: "Website Web3", url: "https://web3.camt.cmu.ac.th/" }
    ],
    tags: ["Design"],
    caseStudy: {
      problem: "ความเข้าใจเรื่อง Web3 เป็นเรื่องยากสำหรับบุคคลทั่วไป ทำให้สื่อประชาสัมพันธ์เดิมไม่ดึงดูด",
      solution: "ออกแบบ Booklet และ Logo ใหม่โดยใช้ Visual Language ที่ทันสมัยแต่ดูเป็นมิตร เพื่อลดกำแพงความเข้าใจ",
      toolsUsed: "Affinity และ Figma สำหรับงาน Vector ที่มีความแม่นยำสูง",
      learning: "เข้าใจการทำ Branding ให้เข้ากับกลุ่มเป้าหมายเฉพาะทาง และการสื่อสารข้อมูลซับซ้อนผ่านงานดีไซน์"
    }
  },
  {
    id: 3,
    title: "GROUP PROJECT : SMART ACCOUNTING AND MANAGEMENT",
    date: "27 / 8 / 2025",
    role: "Frontend developer, UX/UI Designer",
    details: [
      "Designed the user interface for product selection and customized dashboards.",
      "Developed a Point of Sale (POS) and Accounting system for Ban Mae Hoi Ngoen School."
    ],
    link: [
      { label: "Medium Article", url: "https://medium.com/@dewthitirat/journey-of-my-project-โปรเจคแรกกับ-smart-accountingand-management-9cb386688094" },
      { label: "Project Link", url: "https://www.canva.com/design/DAG-RdyzwBM/DpWwYhyVe11hhewbgSG1Aw/view" }
    ],
    tags: ["Frontend", "UX/UI"],
    caseStudy: {
      problem: "โรงเรียนบ้านแม่ฮ้อยเงินประสบปัญหาการจัดการบัญชีและสต็อกสินค้าที่ล่าช้าเนื่องจากใช้ระบบกระดาษ (Manual)",
      solution: "พัฒนาเว็บแอปพลิเคชัน POS และระบบจัดการบัญชีที่มี UI เรียบง่าย เน้นการตัดสต็อกอัตโนมัติและการออกรายงานที่แม่นยำ",
      toolsUsed: "HTML, CSS, JavaScript และการออกแบบ User Flow ผ่าน Figma เพื่อความง่ายในการใช้งาน",
      learning: "เรียนรู้กระบวนการพัฒนาซอฟต์แวร์เพื่อแก้ปัญหาในชีวิตจริง (Real-world system development) และการทำงานร่วมกับลูกค้ากลุ่มโรงเรียน"
    }
  },
  {
    id: 1,
    title: "GRAND SUWAN",
    date: "5 / 11 / 2024",
    role: "Fullstack Developer",
    details: [
      "Created website, Quotation, and LINE api for Family Business."
    ],
    link: [
      { label: "Website", url: "https://www.grandsuwanproperty.com/" }
    ],
    tags: ["Frontend"],
    caseStudy: {
      problem: "ธุรกิจครอบครัวขาดระบบรับเรื่องลูกค้าที่รวดเร็ว ทำให้เสียโอกาสในการขาย",
      solution: "สร้างระบบส่งข้อมูลจากแบบฟอร์มใบเสนอราคาตรงเข้า LINE Notify เพื่อให้ทีมงานรู้ตัวทันที",
      toolsUsed: "Wix สำหรับโครงสร้างเว็บ และ LINE Messaging API สำหรับระบบแจ้งเตือน",
      learning: "เรียนรู้ความสำคัญของการทำ Automation ในธุรกิจ เพื่อลดขั้นตอนการทำงานด้วยมือ"
    }
  }
];

export const getAllProjects = (): ProjectData[] => projectsDatabase;
export const getProjectById = (id: number): ProjectData | undefined => projectsDatabase.find(p => p.id === id);

