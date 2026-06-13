const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./config/database.cjs');

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// SSL Certificate Options
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware to protect admin routes
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

// --- Auth Routes ---
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

// --- Home Routes ---
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

// --- Profile Routes ---
app.get('/api/profile', (req, res) => {
  db.get('SELECT * FROM profile_content LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) {
      // Map to camelCase to match Frontend Interface
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

// --- Projects (Experience) Routes ---
app.get('/api/projects', (req, res) => {
  // Only get active projects
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
    // 1. BACKUP old data first
    db.get('SELECT * FROM projects WHERE id = ?', [id], (err, oldRow) => {
      if (oldRow) {
        db.run(
          'INSERT INTO history_log (table_name, record_id, old_data, action_type) VALUES (?, ?, ?, ?)',
          ['projects', id, JSON.stringify(oldRow), 'UPDATE']
        );
      }
      
      // 2. UPDATE existing project
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
    // ... INSERT new project logic
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
  // Soft Delete: Just mark as is_deleted = 1
  db.run('UPDATE projects SET is_deleted = 1 WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project archived successfully (Soft Delete)' });
  });
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Replace app.listen with https.createServer
if (httpsOptions) {
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`[SECURE] Backend server is running on https://localhost:${PORT}`);
    console.log(`JWT secret loaded: ${JWT_SECRET !== 'fallback_secret' ? 'YES' : 'NO'}`);
  });
} else {
  // Fallback to HTTP but warn the user
  app.listen(PORT, () => {
    console.warn(`[WARNING] SSL certs missing. Falling back to http://localhost:${PORT}`);
    console.log('Run the openssl command above to enable HTTPS.');
  });
}

// Prevent process from exiting on uncaught errors
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[CRITICAL] Unhandled Rejection at:', promise, 'reason:', reason);
});
