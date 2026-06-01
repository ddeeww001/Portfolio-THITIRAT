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
    title: "SMART ACCOUNTING AND MANAGEMENT",
    date: "27 / 8 / 2025",
    role: "Frontend developer, UX/UI Designer",
    details: [
      "Designed the user interface for product selection and customized dashboards."
    ],
    link: [
      {
        label: "Project Link",
        url: "https://www.canva.com/design/DAG-RdyzwBM/DpWwYhyVe11hhewbgSG1Aw/view"
      }
    ],
    tags: ["Frontend", "UX/UI"],
    caseStudy: {
      problem: "เจ้าของธุรกิจขนาดเล็กจัดการสต็อกสินค้าและบัญชีได้ยากเนื่องจาก UI ซับซ้อนเกินไป",
      solution: "สร้าง Dashboard ที่เน้นความเรียบง่าย แสดงสถานะสินค้าด้วยสีที่ชัดเจน (Red/Green) เพื่อการตัดสินใจที่รวดเร็ว",
      toolsUsed: "React สำหรับระบบที่ตอบสนองไว และ CSS Variables สำหรับการทำธีมที่สะอาดตา",
      learning: "ได้ฝึกทักษะการออกแบบ Dashboard ที่เน้นการใช้งานจริง (Usability) มากกว่าความสวยงามเพียงอย่างเดียว"
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
