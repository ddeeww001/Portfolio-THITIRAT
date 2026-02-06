


interface LinkItem {
  label: string; // ชื่อที่จะโชว์บนปุ่ม เช่น "GitHub", "Live Site"
  url: string;   // ลิงก์เว็บจริงๆ
}

interface ProjectData{
    id:number;
    title:string;
    date:string;//date -> year-month-day
    role:string[]|any|string;
    details:string[];

    link:LinkItem[];
}

export const getProject = (id:number,
    title:string,
    date:string,//date -> year-month-day
    role:string[]|any|string,
    details:string[],

    link:LinkItem[]):ProjectData =>{
       // คืนค่ากลับเป็น Object ที่มี property ตรงตาม Interface
    return {
        id: id,
        title: title,
        date: date,
        role: role,
        details: details,
        link: link
    };
    }

    export const ProjectCart = ({data}:{data:ProjectData})=>{
    return(
        
        <div className="title">
            <h2>{data.title}</h2>
            <h3>{data.date}</h3>
            <h3>{data.role}</h3>
            <div className="details">
            <ul>
                {data.details.map((detail,index)=>(
                <li className="project-grid"  key={index}>{detail}</li>
                ))}
                </ul>
            </div>

            <div className="link-preview">
                {data.link.map((item,index)=> (
                    <a 
                    key={index} 
                    href={item.url} 
                    target="_blank"/*เปิดลิงค์หน้าไหม่*/
                    rel="noreferrer" >{/*/ตัวกันความปลอดภัย (ใช้คู่กับ _blank)*/}
                
            

            <div className="preview-card">

                {/* ใช้ thum.io ถ่ายรูปเว็บปลายทางเพื่อนำมาแสดงในหน้าเว็บ */}
  {/*AI tool */} <img
  // เปลี่ยนจาก thum.io เป็น microlink.io (ใช้ฟรีและเสถียรกว่า)
  src={`https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&embed=screenshot.url`}
  
  alt={item.label}
  style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
  
  // กันระบบร่ม
  // ถ้ารูปโหลดไม่ได้ (เช่น Google Drive) ให้เปลี่ยนเป็น "รูปไอคอน" แทนทันที
  onError={(e) => {
    const target = e.currentTarget;
    target.style.objectFit = "contain"; // ปรับรูปให้พอดีกรอบ ไม่โดนตัด
    target.style.padding = "20px";      // เว้นขอบนิดนึงให้ดูสวย

    // เช็คว่าเป็น Google Drive หรือไม่?
    if (item.url.includes('drive.google')) {
      target.src = "https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png";
    } 
    // เช็คว่าเป็น Notion หรือไม่?
    else if (item.url.includes('notion')) {
      target.src = "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png";
    }
    // ถ้าไม่ใช่อะไรเลย ให้ใช้รูป Link ทั่วไป
    else {
      target.src = "https://cdn-icons-png.flaticon.com/512/2088/2088617.png";
    }
  }}
/>{/*AI tool */}
              <div className="url-name">
                {item.label} 🔗
              </div>
            </div>
            </a> ))}
            </div>
        </div>
        
        
    )

}

export const MyProject:ProjectData[]=[
    //2024//
    {
    id:1,
    title:"GRAND SUWAN",
    date:"5 / 11 / 2024",
    role: "",
    details:["Created website, Quotation, and LINE api  for Family Business",
      "Platform: Built and designed on Wix.",
      "Seamlessly linked   Quotation Forms with LINE Messaging API/Notify.",
      "Efficiency: Automated the data flow to ensure consistent and timely responses to customer leads." 
    ],
    link:[
        {label:"Google drive",url:"https://drive.google.com/drive/folders/1NVeNw2uRRK6cXBaPld896XcZjgbEl7Pg?usp=sharing"},
        {label:"GRAND SUWAN website",url:"https://www.grandsuwanproperty.com/"}
    ]

},

    //2025//
    {
    id:2,
    title:"HACKATHON : Dsign mascot CENTRAL THAM",
    date:"30 / 10 /2025 - 31 / 10 /2025",
    role: "Design mascot",
    details:["Collaborated with a teammate to put our heads together to brainstorm and create a mascot."
      //,"ทำงานร่วมกับธีมได้ช่วยกันคิดออกแบบมาสคอตพร้อมทั้งช่วยกันออกแบบดีไซน์"
    ],
    link:[
        {label:"Google drive",url:"https://drive.google.com/drive/folders/1yHbN5bEUX7J-nh5HPlfEDBv5ML67_Qqt?usp=sharing"},
        {label:"CENTRAL THAM hackathon",url:"https://www.centraltham.com/th/newsroom/news-and-updates/150/central-tham-mascot-contest-illustration-impact-with-central-tham?fbclid=IwVERDUANwNt5leHRuA2FlbQIxMQABHvyW9tTacB4Tazik376LqPpoJUTVxjyg2cep4NC0u2eoOM1lKEtpr4APLc_q_aem_jeqlMmr6v_LT0I8hTT1W7g"}
    ]
},

    {
    id:3,
    title:"GROUP PROJECT :  SMART ACCOUNTING AND MANAGEMENT",
    date:"27 / 8 / 2025",
    role: "Frontend developer, UX/UI Designer",
    details:["Designed the user interface for product selection and customized dashboards to track sales and restock activities."
    ],
    link:[
        {label:"SMART ACCOUNTING AND MANAGEMENT",url:"https://www.canva.com/design/DAG-RdyzwBM/DpWwYhyVe11hhewbgSG1Aw/view?utm_content=DAG-RdyzwBM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5d0f09fba1"}
    ]
    
},
{
    id:4,
    title:"Design templates ",
    date:"4 / 11 / 2025 -  8 / 11 / 2025",
    role: "Designner",
    details:["Design templates ligth team and dark team for  COLLEG OF ARTS, MEDIA AND TECHNOLOGY"
        //, "ออกแบบเทมเพลตสำหรับการทำสไลด์โดยมีทั้งทีมสีอ่อนและทีมสีเข่ม สำหรับสาขา DII วิทยาลัยศิลปะ สื่อ และเทคโนโลยี"
    ],
    link:[
        {label:"— LIGHT TEAM",url:"https://www.canva.com/design/DAG-MThjO7s/QHk_AUP7K2tppS4AOaaVSw/view?utm_content=DAG-MThjO7s&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb480482753"},
        {label:"— DARK TEAM",url:"https://www.canva.com/design/DAG-MfTGOD0/8Ecgfe9gtOXGT0X4QVi89Q/view?utm_content=DAG-MfTGOD0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0db13d2742"}
    ]
},

{
    id:5,
    title:"CAMT open house : WEB3 Clup,Design,Blochchain,Chaing Mai",
    date:"27 / 8 / 2025",
    role: "Designer",
    details:["I was responsible for the end-to-end booklet design, logo creation, and design poster customization"
       // ,"รับผิดชอบในส่วนของการออกแบบบุคเล็ตตั้งแต่ต้นจนจบ การสร้างโลโก้ และ ปรับแต่งโปสเตอร์"
    ],
    link:[
        {label:"Booklet",url:"https://heyzine.com/flip-book/6c7e35871a.html?ref=web3.camt.cmu.ac.th"},
        {label:"Website Web3",url:"https://web3.camt.cmu.ac.th/"}
    ]
},

//2026//
{
    id:6,
    title:" YOUNG DEV HACKATHON",
    date:"11 /  01  /  2026 ",
    role: "STAFF",
    details:[ "Instructed participants on the web design process, specifically covering user flows, wireframes, and essential design basics."
       
    ],
    link:[
        {label:"Facebook",url:"https://www.facebook.com/share/p/1BgvpSZCgo/"}
    ]
},
{
    id:7,
    title:"HACKATHON : ETHChaingmai",
    date:"28 / 01 /2026 - 3 / 02 / 2026",
    role: "Frontend",
    details:["My role involved customizing specific parts of the homepage design. Additionally, I implemented the map feature by connecting to an API to fetch and render location"
    ],
    link:[
        {label:"Project",url:"https://devfolio.co/projects/relief-mesh-7406"},
        {label:"Presentation",url:"https://www.canva.com/design/DAHAEBR-F5o/kU3WI2J8YAblFhI51HkCuA/view?utm_content=DAHAEBR-F5o&utm_campaign=designshare&utm_medium=link&utm_source=viewer"}
    ]
},
];


