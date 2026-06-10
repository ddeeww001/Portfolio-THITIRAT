
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./config/database.cjs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- Auth Routes ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'User not found' });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid password' });

    res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  });
});

// --- Home Routes ---
app.get('/api/home', (req, res) => {
  db.get('SELECT * FROM home_content LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});

app.post('/api/home', (req, res) => {
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
      // Parse JSON strings back to arrays/objects
      row.roles = JSON.parse(row.roles || '[]');
      row.technical_skills = JSON.parse(row.technical_skills || '[]');
      row.tools = JSON.parse(row.tools || '[]');
      row.languages = JSON.parse(row.languages || '[]');
      row.certifications = JSON.parse(row.certifications || '[]');
    }
    res.json(row || {});
  });
});

app.post('/api/profile', (req, res) => {
  const data = req.body;
  db.run(
    `INSERT OR REPLACE INTO profile_content (id, name, email, phone, birthday, introduce, roles, technical_skills, tools, languages, certifications) 
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name, data.email, data.phone, data.birthday, data.introduce,
      JSON.stringify(data.roles), JSON.stringify(data.technical_skills),
      JSON.stringify(data.tools), JSON.stringify(data.languages), JSON.stringify(data.certifications)
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

app.post('/api/projects', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
