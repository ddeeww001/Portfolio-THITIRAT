
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('./config/database.cjs');

const dataDir = path.resolve(__dirname, '../data');

async function migrate() {
  console.log('Starting migration...');

  // 1. Migrate Home Data
  const homeData = JSON.parse(fs.readFileSync(path.join(dataDir, 'home.json'), 'utf8'));
  db.run(
    `INSERT OR REPLACE INTO home_content (id, greeting, name, role, description, about_me_link) VALUES (1, ?, ?, ?, ?, ?)`,
    [homeData.greeting, homeData.name, homeData.role, homeData.description, homeData.aboutMeLink]
  );

  // 2. Migrate Profile Data
  const profileData = JSON.parse(fs.readFileSync(path.join(dataDir, 'profile.json'), 'utf8'));
  db.run(
    `INSERT OR REPLACE INTO profile_content (id, name, email, phone, birthday, introduce, roles, socials, technical_skills, tools, languages, certifications) 
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      profileData.name, profileData.email, profileData.phone, profileData.birthday, profileData.introduce,
      JSON.stringify(profileData.role || []), JSON.stringify(profileData.socials || []), 
      JSON.stringify(profileData.technicalSkills || []), JSON.stringify(profileData.tools || []), 
      JSON.stringify(profileData.languages || []), JSON.stringify(profileData.certifications || [])
    ]
  );

  // 3. Migrate Experience Data
  const experienceData = JSON.parse(fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf8'));
  // Clear existing projects first to avoid duplicates in this script
  db.run('DELETE FROM projects', () => {
    experienceData.forEach(project => {
      db.run(
        `INSERT INTO projects (title, date, role, details, link, tags) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          project.title, project.date, JSON.stringify(project.role), 
          JSON.stringify(project.details), JSON.stringify(project.link), JSON.stringify(project.tags)
        ]
      );
    });
  });

  // 4. Add Admin User with Hashed Password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('1462549', salt);

  db.run(
    `INSERT OR REPLACE INTO users (username, password) VALUES (?, ?)`,
    ['dew', hashedPassword],
    (err) => {
      if (err) console.error('Error adding user:', err.message);
      else console.log('Admin user "dew" added successfully with hashed password.');
    }
  );

  console.log('Migration commands sent to database.');
}

// Wait for DB initialization then migrate
setTimeout(migrate, 1000);
