// Experience.tsx
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
}

export const ProjectCart = ({ data }: { data: ProjectData }) => {
  return (
    <div className="title">
      <h2>{data.title}</h2>
      <h3>{data.date}</h3>
      <h3>{data.role}</h3>
      <div className="details">
        <ul>
          {data.details.map((detail, index) => (
            <li className="project-grid" key={index}>{detail}</li>
          ))}
        </ul>
      </div>

      <div className="link-preview">
        {data.link.map((item, index) => (
          <a key={index} href={item.url} target="_blank" rel="noreferrer">
            <div className="preview-card">
              <img
                src={`https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&embed=screenshot.url`}
                alt={item.label}
                style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.objectFit = "contain";
                  target.style.padding = "20px";
                  if (item.url.includes('drive.google')) {
                    target.src = "https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png";
                  } else if (item.url.includes('notion')) {
                    target.src = "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png";
                  } else {
                    target.src = "https://cdn-icons-png.flaticon.com/512/2088/2088617.png";
                  }
                }}
              />
              <div className="url-name">{item.label} 🔗</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};