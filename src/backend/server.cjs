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
  db.all('SELECT * FROM projects ORDER BY id DESC', (err, rows) => {
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
  db.run(
    `INSERT INTO projects (title, date, role, details, link, tags) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.title, data.date, JSON.stringify(data.role), 
      JSON.stringify(data.details), JSON.stringify(data.link), JSON.stringify(data.tags)
    ],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Project added', id: this.lastID });
    }
  );
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log(`JWT secret loaded: ${JWT_SECRET !== 'fallback_secret' ? 'YES' : 'NO'}`);
});

// Prevent process from exiting on uncaught errors
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[CRITICAL] Unhandled Rejection at:', promise, 'reason:', reason);
});
