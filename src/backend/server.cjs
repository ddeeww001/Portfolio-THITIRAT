const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, '../data/portfolio.db');

const sqlite3 = require('sqlite3').verbose();
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('[DB ERROR]', err.message);
    process.exit(1);
  }
  console.log(`[DB] Connected to ${DB_PATH}`);
  initializeDatabase();
});

function initializeDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS home_content (
      id INTEGER PRIMARY KEY,
      greeting TEXT,
      name TEXT,
      role TEXT,
      description TEXT,
      about_me_link TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS profile_content (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT,
      phone TEXT,
      birthday TEXT,
      introduce TEXT,
      roles TEXT DEFAULT '[]',
      socials TEXT DEFAULT '[]',
      technical_skills TEXT DEFAULT '[]',
      tools TEXT DEFAULT '[]',
      languages TEXT DEFAULT '[]',
      certifications TEXT DEFAULT '[]'
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT,
      role TEXT DEFAULT '[]',
      details TEXT DEFAULT '[]',
      link TEXT DEFAULT '[]',
      tags TEXT DEFAULT '[]',
      image_url TEXT DEFAULT '',
      description TEXT DEFAULT '',
      is_deleted INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS history_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_name TEXT,
      record_id INTEGER,
      old_data TEXT,
      action_type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    seedDefaultData();
  });
}

function seedDefaultData() {
  db.get('SELECT COUNT(*) as count FROM home_content', [], (err, row) => {
    if (!err && row.count === 0) {
      db.run(`INSERT INTO home_content (id, greeting, name, role, description, about_me_link) VALUES (1, ?, ?, ?, ?, ?)`,
        [
          'Welcome to my portfolio',
          'THITIRAT SIRISAWAD',
          'UX/UI Designer & Frontend Developer',
          'เว็บไซต์นี้รวบรวมความตั้งใจของฉันในการออกแบบและพัฒนาเว็บไซต์ ฉันหลงใหลในการสร้างสรรค์ประสบการณ์ดิจิทัลที่ใช้งานง่ายและมีดีไซน์ที่ทันสมัย หวังว่าคุณจะสนุกกับการเยี่ยมชมผลงานของฉันนะคะ',
          '#profile'
        ],
        (err) => { if (!err) console.log('[SEED] Home content inserted'); }
      );
    }
  });

  db.get('SELECT COUNT(*) as count FROM profile_content', [], (err, row) => {
    if (!err && row.count === 0) {
      db.run(`INSERT INTO profile_content (id, name, email, phone, birthday, introduce, roles, socials, technical_skills, tools, languages, certifications) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          'THITIRAT SIRISAWAD',
          'dewthitirat@gmail.com',
          '099-430-0222',
          '14 June 2006',
          'I am a passionate UX/UI Designer and Frontend Developer dedicated to creating intuitive, user-centric digital experiences with modern design.',
          JSON.stringify(["UX/UI Designer", "Frontend Developer"]),
          JSON.stringify([
            { platform: "GitHub", username: "ddeeww001", url: "https://github.com/ddeeww001" },
            { platform: "Line ID", username: "t.s", url: "" },
            { platform: "Instagram", username: "ddeeww_o_o", url: "https://instagram.com/ddeeww_o_o" },
            { platform: "Facebook", username: "Dew Chobkinkaitod", url: "https://facebook.com/dew.chobkinkaitod" }
          ]),
          JSON.stringify([
            { skill: "React", level: "Intermediate" },
            { skill: "TypeScript", level: "Intermediate" },
            { skill: "HTML/CSS", level: "Advanced" },
            { skill: "JavaScript", level: "Intermediate" },
            { skill: "Java", level: "Beginner" },
            { skill: "Figma", level: "Advanced" }
          ]),
          JSON.stringify(["Figma", "Canva", "Visual Studio Code", "IntelliJ", "Affinity"]),
          JSON.stringify([
            { lang: "Thai", level: "Native" },
            { lang: "English", level: "Pre-intermediate" }
          ]),
          JSON.stringify([
            "UXUI Foundation Program (LIFELONG) - Organized by T.C.C. Technology Co., Ltd",
            "Creativity and Imagination (LIFELONG)"
          ])
        ],
        (err) => { if (!err) console.log('[SEED] Profile content inserted'); }
      );
    }
  });

  db.get('SELECT COUNT(*) as count FROM projects', [], (err, row) => {
    if (!err && row.count === 0) {
      const projects = [
        {
          title: 'GRAND SUWAN',
          date: '5 / 11 / 2024',
          role: JSON.stringify(["Fullstack Developer"]),
          details: JSON.stringify([
            "Created website, Quotation, and LINE api for Family Business.",
            "Seamlessly linked Quotation Forms with LINE Messaging API/Notify.",
            "Automated the data flow to ensure consistent and timely responses to customer leads."
          ]),
          link: JSON.stringify([
            { label: "Google Drive", url: "https://drive.google.com/drive/folders/1NVeNw2uRRK6cXBaPld896XcZjgbEl7Pg?usp=sharing" },
            { label: "Website", url: "https://www.grandsuwanproperty.com/" }
          ]),
          tags: JSON.stringify(["Fullstack", "API Integration", "Business"]),
          image_url: '',
          description: 'Website and LINE API integration for family real estate business'
        },
        {
          title: 'HACKATHON : Design mascot CENTRAL THAM',
          date: '30 / 10 / 2025 - 31 / 10 / 2025',
          role: JSON.stringify(["Designer"]),
          details: JSON.stringify([
            "Collaborated with a teammate to brainstorm and create a mascot."
          ]),
          link: JSON.stringify([
            { label: "Google Drive", url: "https://drive.google.com/drive/folders/1yHbN5bEUX7J-nh5HPlfEDBv5ML67_Qqt?usp=sharing" },
            { label: "CENTRAL THAM", url: "https://www.centraltham.com/th/newsroom/news-and-updates/150/central-tham-mascot-contest-illustration-impact-with-central-tham" }
          ]),
          tags: JSON.stringify(["Hackathon", "Design", "Illustration"]),
          image_url: '',
          description: 'Mascot design for Central Tham hackathon contest'
        },
        {
          title: 'SMART ACCOUNTING AND MANAGEMENT',
          date: '27 / 8 / 2025',
          role: JSON.stringify(["Frontend Developer", "UX/UI Designer"]),
          details: JSON.stringify([
            "Designed the user interface for product selection and customized dashboards.",
            "Developed a Point of Sale (POS) and Accounting system for Ban Mae Hoi Ngoen School."
          ]),
          link: JSON.stringify([
            { label: "Project Link", url: "https://www.canva.com/design/DAG-RdyzwBM/DpWwYhyVe11hhewbgSG1Aw/view" },
            { label: "Medium Article", url: "https://medium.com/@dewthitirat/journey-of-my-project-โปรเจคแรกกับ-smart-accountingand-management-9cb386688094" }
          ]),
          tags: JSON.stringify(["Frontend", "UX/UI", "Dashboard"]),
          image_url: '',
          description: 'POS and Accounting web app for school business management'
        },
        {
          title: 'Design templates',
          date: '4 / 11 / 2025 - 8 / 11 / 2025',
          role: JSON.stringify(["Designer"]),
          details: JSON.stringify([
            "Design templates light team and dark team for COLLEGE OF ARTS, MEDIA AND TECHNOLOGY"
          ]),
          link: JSON.stringify([
            { label: "LIGHT TEAM", url: "https://www.canva.com/design/DAG-MThjO7s/QHk_AUP7K2tppS4AOaaVSw/view?utm_content=DAG-MThjO7s&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb480482753" },
            { label: "DARK TEAM", url: "https://www.canva.com/design/DAG-MfTGOD0/8Ecgfe9gtOXGT0X4QVi89Q/view?utm_content=DAG-MfTGOD0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0db13d2742" }
          ]),
          tags: JSON.stringify(["Design", "Templates", "Branding"]),
          image_url: '',
          description: 'Light and dark design templates for CAMT'
        },
        {
          title: 'CAMT open house : WEB3 Club',
          date: '27 / 8 / 2025',
          role: JSON.stringify(["Designer"]),
          details: JSON.stringify([
            "End-to-end booklet design, logo creation, and design poster customization."
          ]),
          link: JSON.stringify([
            { label: "Booklet", url: "https://heyzine.com/flip-book/6c7e35871a.html?ref=web3.camt.cmu.ac.th" },
            { label: "Website Web3", url: "https://web3.camt.cmu.ac.th/" }
          ]),
          tags: JSON.stringify(["Design", "Branding", "Web3"]),
          image_url: '',
          description: 'Branding and booklet design for CAMT Web3 Club open house'
        },
        {
          title: 'YOUNG DEV HACKATHON',
          date: '11 / 01 / 2026',
          role: JSON.stringify(["Staff"]),
          details: JSON.stringify([
            "Instructed participants on the web design process, specifically covering user flows, wireframes, and essential design basics."
          ]),
          link: JSON.stringify([
            { label: "Facebook", url: "https://www.facebook.com/share/p/1BgvpSZCgo/" }
          ]),
          tags: JSON.stringify(["Teaching", "Workshop", "UX/UI"]),
          image_url: '',
          description: 'Workshop instructor for web design process at hackathon'
        },
        {
          title: 'HACKATHON : ETHChaingmai',
          date: '28 / 01 / 2026 - 3 / 02 / 2026',
          role: JSON.stringify(["Frontend"]),
          details: JSON.stringify([
            "Customized specific parts of the homepage design and implemented a map feature."
          ]),
          link: JSON.stringify([
            { label: "Project", url: "https://devfolio.co/projects/relief-mesh-7406" },
            { label: "Presentation", url: "https://www.canva.com/design/DAHAEBR-F5o/kU3WI2J8YAblFhI51HkCuA/view" }
          ]),
          tags: JSON.stringify(["Hackathon", "Frontend", "API Integration"]),
          image_url: '',
          description: 'Real-time disaster relief map with API integration'
        },
        {
          title: 'AI HACKATHON : BobInsight',
          date: '2024',
          role: JSON.stringify(["Frontend Developer", "UX/UI Designer"]),
          details: JSON.stringify([
            "Developed an AI-driven insight platform to simplify complex data visualization.",
            "Collaborated in a team to integrate IBM AI technologies into a seamless user experience."
          ]),
          link: JSON.stringify([
            { label: "Project Link", url: "https://lablab.ai/ai-hackathons/ibm-bob-hackathon/uia/bobinsight" },
            { label: "GitHub", url: "https://github.com/Pinont/UIA-LABLAB" }
          ]),
          tags: JSON.stringify(["Frontend", "UX/UI", "AI"]),
          image_url: '',
          description: 'AI-driven data insight platform for IBM Bob Hackathon'
        }
      ];

      const stmt = db.prepare(`INSERT INTO projects (title, date, role, details, link, tags, image_url, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
      projects.forEach(p => {
        stmt.run([p.title, p.date, p.role, p.details, p.link, p.tags, p.image_url, p.description]);
      });
      stmt.finalize();
      console.log(`[SEED] ${projects.length} projects inserted`);
    }
  });

  db.get('SELECT COUNT(*) as count FROM users', [], (err, row) => {
    if (!err && row.count === 0) {
      const hashedPw = bcrypt.hashSync('admin123', 10);
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['dew', hashedPw], (err) => {
        if (!err) console.log('[SEED] Default admin user created (username: dew)');
      });
    }
  });
}

let httpsOptions;
try {
  httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem'))
  };
} catch (err) {
  console.error('[SECURITY ERROR] SSL Certificates (key.pem/cert.pem) not found in src/backend/certs/');
  console.log('Please generate self-signed certificates for local development:');
  console.log('openssl req -x509 -newkey rsa:4096 -keyout src/backend/certs/key.pem -out src/backend/certs/cert.pem -days 365 -nodes');
}

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  console.log(`[AUTH] Login attempt for user: ${username}`);

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      console.error(`[AUTH ERROR] Database error: ${err.message}`);
      return res.status(500).json({ error: 'Internal server error during authentication' });
    }

    if (!user) {
      console.log(`[AUTH] User not found: ${username}`);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    try {
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        console.log(`[AUTH] Invalid password for user: ${username}`);
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      console.log(`[AUTH] Success! User logged in: ${username}`);
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });

      res.json({
        message: 'Login successful',
        token: token,
        user: { id: user.id, username: user.username }
      });
    } catch (bcryptErr) {
      console.error(`[AUTH ERROR] Bcrypt error: ${bcryptErr.message}`);
      res.status(500).json({ error: 'Error processing authentication' });
    }
  });
});

app.get('/api/home', (req, res) => {
  db.get('SELECT * FROM home_content LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});

app.post('/api/home', authenticateToken, (req, res) => {
  const { greeting, name, role, description, about_me_link } = req.body;
  db.run(
    `INSERT OR REPLACE INTO home_content (id, greeting, name, role, description, about_me_link)
     VALUES (1, ?, ?, ?, ?, ?)`,
    [greeting, name, role, description, about_me_link],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Home content updated', id: this.lastID });
    }
  );
});

app.get('/api/profile', (req, res) => {
  db.get('SELECT * FROM profile_content LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) {
      const profile = {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        birthday: row.birthday,
        introduce: row.introduce,
        role: JSON.parse(row.roles || '[]'),
        socials: JSON.parse(row.socials || '[]'),
        technicalSkills: JSON.parse(row.technical_skills || '[]'),
        tools: JSON.parse(row.tools || '[]'),
        languages: JSON.parse(row.languages || '[]'),
        certifications: JSON.parse(row.certifications || '[]')
      };
      res.json(profile);
    } else {
      res.json({});
    }
  });
});

app.post('/api/profile', authenticateToken, (req, res) => {
  const data = req.body;
  db.run(
    `INSERT OR REPLACE INTO profile_content (id, name, email, phone, birthday, introduce, roles, socials, technical_skills, tools, languages, certifications)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name, data.email, data.phone, data.birthday, data.introduce,
      JSON.stringify(data.role || []),
      JSON.stringify(data.socials || []),
      JSON.stringify(data.technicalSkills || []),
      JSON.stringify(data.tools || []),
      JSON.stringify(data.languages || []),
      JSON.stringify(data.certifications || [])
    ],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Profile updated' });
    }
  );
});

app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects WHERE is_deleted = 0 ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    rows.forEach(row => {
      row.role = JSON.parse(row.role || '[]');
      row.details = JSON.parse(row.details || '[]');
      row.link = JSON.parse(row.link || '[]');
      row.tags = JSON.parse(row.tags || '[]');
    });
    res.json(rows);
  });
});

app.post('/api/projects', authenticateToken, (req, res) => {
  const data = req.body;
  const { id, title, date, role, details, link, tags, image_url, description } = data;

  if (id) {
    db.get('SELECT * FROM projects WHERE id = ?', [id], (err, oldRow) => {
      if (oldRow) {
        db.run(
          'INSERT INTO history_log (table_name, record_id, old_data, action_type) VALUES (?, ?, ?, ?)',
          ['projects', id, JSON.stringify(oldRow), 'UPDATE']
        );
      }

      db.run(
        `UPDATE projects SET title=?, date=?, role=?, details=?, link=?, tags=?, image_url=?, description=? WHERE id=?`,
        [
          title, date, JSON.stringify(role), JSON.stringify(details),
          JSON.stringify(link), JSON.stringify(tags), image_url, description, id
        ],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: 'Project updated and old version archived' });
        }
      );
    });
  } else {
    db.run(
      `INSERT INTO projects (title, date, role, details, link, tags, image_url, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, date, JSON.stringify(role), JSON.stringify(details),
        JSON.stringify(link), JSON.stringify(tags), image_url, description
      ],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Project added', id: this.lastID });
      }
    );
  }
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run('UPDATE projects SET is_deleted = 1 WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project archived successfully (Soft Delete)' });
  });
});

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

if (httpsOptions) {
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`[SECURE] Backend server is running on https://localhost:${PORT}`);
    console.log(`JWT secret loaded: ${JWT_SECRET !== 'fallback_secret' ? 'YES' : 'NO'}`);
  });
} else {
  app.listen(PORT, () => {
    console.warn(`[WARNING] SSL certs missing. Falling back to http://localhost:${PORT}`);
    console.log('Run the openssl command above to enable HTTPS.');
  });
}

process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[CRITICAL] Unhandled Rejection at:', promise, 'reason:', reason);
});
