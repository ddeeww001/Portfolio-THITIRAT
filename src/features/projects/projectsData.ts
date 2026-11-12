// src/data/projectsData.ts
// Centralized database for all project information
import { deepFreeze } from '../../shared/lib/security';

export interface LinkItem {
  label: string;
  url: string;
}

export interface ProjectData {
  id: number;
  title: string;
  date: string;
  role: string | string[];
  details: string[];
  link: LinkItem[];
  tags?: string[]; // Optional: for filtering/categorization
  /** Static card image in /public (replaces the live website screenshot on the card). */
  image?: string;
  /** Screenshots shown in the SEE MORE modal — taken only from this project's own links / Drive files. */
  gallery?: GalleryImage[];
}

export interface GalleryImage {
  src: string;
  caption: string;
}

export const projectsDatabase: ProjectData[] = deepFreeze([
 /* {
    id: 8,
    title: "MY PROJECT DESIGN WEBSITE",
    date: "NOW",
    role: "Frontend & UX/UI Designer",
    details: [],
    link: [
      { 
        label: "Project", 
        url: "https://www.figma.com/design/f91hiWcRtLAB5SnPPrtv6U/Untitled?node-id=0-1&t=wfEWnCKOQ9U5G10H-1" 
      }
    ],
    tags: ["Design", "Frontend", "UX/UI"]
  },*/
  {
    id: 11,
    title: "CMU E-SPORTS FRESHMEN GAMES 2026 : End Game Design",
    date: "20 / 09 / 2026",
    role: "Graphic Designer (End game screens)",
    image: "/projects/cmu-esports-endgame-design.webp",
    gallery: [
      { src: "/projects/cmu-esports-endgame-design.webp", caption: "End game design board — Victory / Defeat overlays, results screen, match VS screen and player bracket" },
      { src: "/projects/cmu-esports-grand-finals.webp", caption: "CMU E-SPORTS FRESHMEN GAMES 2026 | GRAND FINALS — live stream (CMU ESPORTS, YouTube)" },
    ],
    details: [
      "Designed the end game screens for the CMU Esports club's FRESHMEN GAMES 2026: Victory / Defeat score overlays, the results table, the match VS screen and the player bracket.",
      "Refined the design over several feedback rounds, from the first draft to the final edit.",
      "The designs were shown on the live broadcast of the CMU E-SPORTS FRESHMEN GAMES 2026 Grand Finals."
    ],
    link: [
      { label: "Grand Finals live stream", url: "https://www.youtube.com/live/skfuqIVAbzE" }
    ],
    tags: ["Design", "Esports", "Broadcast"]
  },
  {
    id: 10,
    title: "CAMT Digital Contest 2026 : AI Agent Workshop",
    date: "8 / 08 / 2026",
    role: "Teaching Assistant (TA)",
    image: "/projects/camt-digital-contest-stage.webp",
    gallery: [
      { src: "/projects/camt-digital-contest-stage.webp", caption: "CAMT Digital Contest 2026 (photo: CAMT CMU news)" },
      { src: "/projects/camt-digital-contest-workshop.webp", caption: "Hands-on activities at CAMT Digital Contest 2026 (photo: CAMT CMU news)" },
      { src: "/projects/camt-digital-contest-ai-workshops.webp", caption: "AI Revolution Workshops at CAMT Digital Contest 2026 (photo: CAMT CMU news)" },
    ],
    details: [
      // details[0] = short summary on the card; all lines are listed in SEE MORE.
      "Helped participants install, use and build on AI Agents as a TA in the AI Agent workshop at CAMT Digital Contest 2026, Chiang Mai University.",
      "Setup: I taught participants how to install and set up the programs needed to use AI Agents on their own devices.",
      "Impact: I shared new ways of using AI, giving participants a starting point they can build on their own work."
    ],
    link: [
      { label: "CAMT news", url: "https://camt.cmu.ac.th/camt-%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%87%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%94%E0%B8%B2/" }
    ],
    tags: ["Teaching", "Workshop", "AI"]
  },
  {
    // Also known as the CMU Esports "Free Fire Map-Building Competition Website" (merged card)
    id: 9,
    image: "/projects/cm-craft-map-hero.webp",
    gallery: [
      { src: "/projects/cm-craft-map-hero.webp", caption: "Competition website — hero (cmcraftmap.camt.cmu.ac.th)" },
      { src: "/projects/cm-craft-map-about.webp", caption: "About the competition section" },
      { src: "/projects/cm-craft-map-milestones.webp", caption: "Key milestones timeline" },
    ],
    title: "CM CRAFT MAP : Chiang Mai's Digital Map Design Competition",
    date: "2026",
    role: "UX/UI Designer",
    details: [
      // details[0] = short summary on the card; all lines are listed in SEE MORE.
      "One official website with everything teams need for \"Chiang Mai's Digital Map Design Competition by Free Fire Craftland\", organised by NREL and CAMT, Chiang Mai University.",
      "Problem: Competition news was spread across Facebook and other websites, so teams had to search in many places and organisers had to post the same information again and again.",
      "Solution: We put everything in one place — regulations, tutorial, timeline (with add-to-calendar), registration and a TH/EN language switch.",
      "My role: As UX/UI Designer, I contributed design ideas and worked with teammates to solve design problems throughout the project.",
      "Helped: I designed the UI for people joining the competition can understand the website and find what they need as quickly as possible."
    ],
    link: [
      {
        label: "Website",
        url: "https://cmcraftmap.camt.cmu.ac.th/"
      }
    ],
    tags: ["UX/UI", "Esports", "Design"]
  },
  {
    id: 7,
    image: "/projects/ethchiangmai-presentation.webp",
    gallery: [
      { src: "/projects/ethchiangmai-devfolio.webp", caption: "Relief Mesh on Devfolio (ETHChiangmai Hackathon 2026)" },
      { src: "/projects/ethchiangmai-presentation.webp", caption: "Relief Mesh presentation (Canva)" },
    ],
    title: "HACKATHON : ETHChaingmai",
    date: "28 / 01 /2026 - 3 / 02 / 2026",
    role: ["Frontend Developer", "Idea & Design"],
    details: [
      // details[0] = short summary on the card; all lines are listed in SEE MORE.
      "Relief Mesh: a communication tool for disasters, when phone networks fail and it is hard to call for help.",
      "Problem: During a disaster, central phone and internet networks can go down, so people cannot contact rescuers or ask for help.",
      "Idea: Instead of depending on one central signal source, devices share the connection with each other (a decentralised mesh). People can also donate to cover relief costs.",
      "My role: I shared ideas during brainstorming, helped design the experience, customised parts of the homepage, and built the map feature that fetches and shows locations from an API."
    ],
    link: [
      { label: "Project", url: "https://devfolio.co/projects/relief-mesh-7406" },
      { 
        label: "Presentation", 
        url: "https://www.canva.com/design/DAHAEBR-F5o/kU3WI2J8YAblFhI51HkCuA/view?utm_content=DAHAEBR-F5o&utm_campaign=designshare&utm_medium=link&utm_source=viewer" 
      }
    ],
    tags: ["Hackathon", "Frontend"]
  },
  {
    id: 6,
    image: "/projects/young-dev-hackathon.webp",
    gallery: [
      { src: "/projects/young-dev-hackathon.webp", caption: "YOUNG DEV HACKATHON — team photo, CAMT, Chiang Mai University" },
    ],
    title: "YOUNG DEV HACKATHON",
    date: "11 / 01 / 2026",
    role: "Staff & Design Mentor",
    details: [
      // details[0] = short summary on the card; all lines are listed in SEE MORE.
      "Taught young participants how to design websites and how to think about the people who will use them.",
      "What I taught: the web design process, including user flows, wireframes and basic design principles.",
      "Focus on users: I encouraged participants to think about who will use their website and what those people need.",
      "Impact: The competition helped participants discover what they enjoy and what they are good at."
    ],
    link: [
      { label: "Facebook", url: "https://www.facebook.com/share/p/1BgvpSZCgo/" }
    ],
    tags: ["Teaching", "Workshop", "UX/UI"]
  },
  {
    id: 5,
    image: "/projects/camt-web3-club-booth.webp",
    gallery: [
      { src: "/projects/camt-web3-club-booth.webp", caption: "Web3 Club booth at the CAMT event (photo: Chiang Mai University news)" },
      { src: "/projects/camt-web3-exhibits.webp", caption: "Web3 exhibits — Digital Token & Learning Playground (photo: Chiang Mai University news)" },
      { src: "/projects/camt-web3-mou-group.webp", caption: "CAMT CMU × Demo Corp. Blockchain & Web3 MOU (photo: Chiang Mai University news)" },
      { src: "/projects/camt-web3-news-cover.webp", caption: "CMU news: CAMT CMU partners with Demo Corp. on Blockchain & Web3" },
      { src: "/projects/web3-club-website.webp", caption: "CAMT Web3 Club website" },
    ],
    title: "CAMT open house : WEB3 Club, Design, Blockchain, Chiang Mai",
    date: "27 / 8 / 2025",
    role: "Designer",
    details: [
      // details[0] = short summary on the card; all lines are listed in SEE MORE.
      "A booklet and visual materials that help visitors understand Web3 and blockchain at the CAMT Open House.",
      "Goal: Web3 is a new and complex topic, so visitors needed simple materials to understand how it works.",
      "My role: I was part of the team that made the booklet explaining how Web3 works, and I designed its pages so visitors could understand the content as easily as possible.",
      "Also: I created the logo and customised the event posters."
    ],
    link: [
      { label: "Booklet", url: "https://heyzine.com/flip-book/6c7e35871a.html?ref=web3.camt.cmu.ac.th" },
      { label: "Website Web3", url: "https://web3.camt.cmu.ac.th/" },
      { label: "CMU news", url: "https://www.cmu.ac.th/th/article/9302055a-80e1-4f38-bf57-243298acb6d3" }
    ],
    tags: ["Design", "Branding", "Web3"]
  },
  {
    id: 4,
    gallery: [
      { src: "/projects/design-templates-light.webp", caption: "Presentation template — Light team (Canva)" },
      { src: "/projects/design-templates-dark.webp", caption: "Presentation template — Dark team (Canva)" },
    ],
    title: "Design templates",
    date: "4 / 11 / 2025 - 8 / 11 / 2025",
    role: "Designer",
    details: [
      // details[0] = short summary on the card; all lines are listed in SEE MORE.
      "Reusable presentation templates (light and dark versions) for the College of Arts, Media and Technology.",
      "Problem: The department and faculty often had to design new slides again and again for different events.",
      "Solution: I designed light and dark templates that staff can reuse for many presentations.",
      "Result: Less repeated design work, and presentations that look consistent across events."
    ],
    link: [
      { 
        label: "— LIGHT TEAM", 
        url: "https://www.canva.com/design/DAG-MThjO7s/QHk_AUP7K2tppS4AOaaVSw/view?utm_content=DAG-MThjO7s&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb480482753" 
      },
      { 
        label: "— DARK TEAM", 
        url: "https://www.canva.com/design/DAG-MfTGOD0/8Ecgfe9gtOXGT0X4QVi89Q/view?utm_content=DAG-MfTGOD0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0db13d2742" 
      }
    ],
    tags: ["Design", "Templates", "Branding"]
  },
  {
    id: 3,
    gallery: [
      { src: "/projects/smart-accounting-pitch-deck.webp", caption: "Smart Accounting and Management — pitch deck (Canva)" },
    ],
    title: "GROUP PROJECT : SMART ACCOUNTING AND MANAGEMENT",
    date: "27 / 8 / 2025",
    role: "Frontend developer, UX/UI Designer",
    details: [
      // details[0] = short summary on the card; all lines are listed in SEE MORE.
      "A sales and stock system for the student-run shop at Mae Hoi Ngoen School (โรงเรียนแม่ฮ้อยเงิน), so teachers no longer record every sale by hand.",
      "Problem: Teachers had to write down every sale and stock change in the school shop by hand, which took a lot of their time.",
      "Research: I visited the school to listen to teachers and students, and practised asking questions to understand what they really needed.",
      "Design: I designed the product-selection screen and dashboards that show sales and tell the team when items need restocking.",
      "Result: Teachers spend less time on bookkeeping, and students practise selling with a real tool, like in a real job."
    ],
    link: [
      { 
        label: "SMART ACCOUNTING AND MANAGEMENT", 
        url: "https://www.canva.com/design/DAG-RdyzwBM/DpWwYhyVe11hhewbgSG1Aw/view?utm_content=DAG-RdyzwBM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5d0f09fba1" 
      }
    ],
    tags: ["Frontend", "UX/UI", "Dashboard"]
  },
  {
    id: 2,
    gallery: [
      { src: "/projects/central-tham-mascot.webp", caption: "Mascot design (from the project Google Drive)" },
      { src: "/projects/central-tham-mascot-sheet.webp", caption: "Mascot contest sheet (from the project Google Drive)" },
      { src: "/projects/central-tham-news.webp", caption: "Central Tham Mascot Contest announcement" },
    ],
    title: "HACKATHON : Design mascot CENTRAL THAM",
    date: "30 / 10 /2025 - 31 / 10 /2025",
    role: "Design mascot",
    details: [
      "Collaborated with a teammate to put our heads together to brainstorm and create a mascot."
    ],
    link: [
      { 
        label: "Google drive", 
        url: "https://drive.google.com/drive/folders/1yHbN5bEUX7J-nh5HPlfEDBv5ML67_Qqt?usp=sharing" 
      },
      { 
        label: "CENTRAL THAM hackathon", 
        url: "https://www.centraltham.com/th/newsroom/news-and-updates/150/central-tham-mascot-contest-illustration-impact-with-central-tham?fbclid=IwVERDUANwNt5leHRuA2FlbQIxMQABHvyW9tTacB4Tazik376LqPpoJUTVxjyg2cep4NC0u2eoOM1lKEtpr4APLc_q_aem_jeqlMmr6v_LT0I8hTT1W7g" 
      }
    ],
    tags: ["Hackathon", "Design", "Illustration"]
  },
  {
    id: 1,
    gallery: [
      { src: "/projects/grand-suwan-brochure.webp", caption: "Brochure (from the project Google Drive)" },
      { src: "/projects/grand-suwan-flowchart.webp", caption: "Quotation workflow flowchart (from the project Google Drive)" },
    ],
    title: "GRAND SUWAN",
    date: "5 / 11 / 2024",
    role: "Fullstack Developer",
    details: [
      // details[0] = short summary on the card; all lines are listed in SEE MORE.
      "A website, quotation form and LINE integration for a family house-building business, which saves admin time.",
      "Problem: The admin had to contact each customer and fill in many details by hand, and customers asked a lot of questions about building and decorating a house.",
      "Solution: I built and designed the website on Wix, with a quotation form that collects the customer's details and sends them to LINE (Messaging API / Notify).",
      "Result: Less manual work for the admin, faster and more consistent replies, and customers can find answers on the website instead of asking every question."
    ],
    link: [
      { 
        label: "Google drive", 
        url: "https://drive.google.com/drive/folders/1NVeNw2uRRK6cXBaPld896XcZjgbEl7Pg?usp=sharing" 
      },
      { label: "GRAND SUWAN website", url: "https://www.grandsuwanproperty.com/" }
    ],
    tags: ["Fullstack", "API Integration", "Business"]
  }
]) as unknown as ProjectData[];

// Helper function to get all projects
export const getAllProjects = (): ProjectData[] => {
  return projectsDatabase;
};

// Helper function to get project by ID
export const getProjectById = (id: number): ProjectData | undefined => {
  return projectsDatabase.find(project => project.id === id);
};

// Helper function to filter projects by tag
export const getProjectsByTag = (tag: string): ProjectData[] => {
  return projectsDatabase.filter(project => 
    project.tags?.includes(tag)
  );
};

// Helper function to get recent projects
export const getRecentProjects = (count: number = 3): ProjectData[] => {
  return projectsDatabase.slice(0, count);
};

// Made with Bob
