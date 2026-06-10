
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../data/portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // 1. Home Content Table
    db.run(`CREATE TABLE IF NOT EXISTS home_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      greeting TEXT,
      name TEXT,
      role TEXT,
      description TEXT,
      about_me_link TEXT
    )`);

    // 2. Profile Content Table
    db.run(`CREATE TABLE IF NOT EXISTS profile_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      birthday TEXT,
      introduce TEXT,
      roles TEXT,
      socials TEXT,
      technical_skills TEXT,
      tools TEXT,
      languages TEXT,
      certifications TEXT
    )`);

    // 3. Projects Table
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      date TEXT,
      role TEXT,
      details TEXT,
      link TEXT,
      tags TEXT
    )`);

    // 4. Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`);
    
    console.log('Database tables initialized.');
  });
}

module.exports = db;
