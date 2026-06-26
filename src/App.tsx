import { useState, useEffect } from 'react';
import type { HomeContent, ProfileContent, ProjectExperience } from './types/portfolio';
import { Profile } from './frontend/Personal';
import ShowExperience from './frontend/showExperience';

function App() {
  const [homeData, setHomeData] = useState<HomeContent | null>(null);
  const [profileData, setProfileData] = useState<ProfileContent | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'experience') {
      setTimeout(() => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, profileRes, projectsRes] = await Promise.all([
          fetch('/api/home'),
          fetch('/api/profile'),
          fetch('/api/projects')
        ]);

        if (homeRes.ok) {
          const data = await homeRes.json();
          if (data && data.id) setHomeData(data);
        }
        if (profileRes.ok) {
          const data = await profileRes.json();
          if (data && data.id) setProfileData(data);
        }
        if (projectsRes.ok) {
          const data = await projectsRes.json();
          if (Array.isArray(data)) setProjectsData(data);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a className="navbar-brand" href="/">PORTFOLIO</a>
          <div className="navbar-links">
            <button onClick={() => scrollTo('hero')}>Home</button>
            <button onClick={() => scrollTo('experience')}>Experience</button>
            <button onClick={() => scrollTo('profile')}>Profile</button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section id="hero" className="section hero-section">
          <div className="hero-content">
            <span className="hero-greeting">{homeData?.greeting || 'Hello,'}</span>
            <h1 className="hero-name">{homeData?.name || 'Loading...'}</h1>
            <p className="hero-role">{homeData?.role || ''}</p>
            <p className="hero-desc">{homeData?.description || ''}</p>
            <div className="hero-actions">
              <button className="hero-btn primary" onClick={() => scrollTo('experience')}>
                <i className="bi bi-collection"></i> View My Work
              </button>
              {homeData?.about_me_link && (
                <a href={homeData.about_me_link} target="_blank" rel="noreferrer" className="hero-btn secondary">
                  <i className="bi bi-person"></i> About Me
                </a>
              )}
            </div>
          </div>

          <div className="hero-decorations">
            <div className="hero-float float-1"></div>
            <div className="hero-float float-2"></div>
            <div className="hero-float float-3"></div>
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <ShowExperience data={projectsData} />
        </section>

        <section id="profile" className="section profile-section">
          {profileData ? (
            <Profile data={profileData} />
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '80px 20px' }}>
              {loading ? <p><i className="bi bi-arrow-repeat"></i> Loading profile...</p> : <p>Profile data unavailable</p>}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          <div className="footer-links">
            <a href="#hero">Back to Top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
