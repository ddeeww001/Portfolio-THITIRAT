
import React, { useState, useEffect } from 'react';
import '../CSS/login.css'; // Reuse glassmorphism styles
import '../CSS/variables.css';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveSection] = useState<'home' | 'profile' | 'projects'>('home');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form States
  const [homeData, setHomeData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchHome();
    fetchProfile();
    fetchProjects();
  }, []);

  const fetchHome = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/home');
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        setHomeData(data);
      }
    } catch (e) { console.error("Error fetching home", e); }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/profile');
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        setProfileData(data);
      }
    } catch (e) { console.error("Error fetching profile", e); }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) { console.error("Error fetching projects", e); }
  };


  const handleUpdateHome = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('http://localhost:5000/api/home', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(homeData),
      });
      if (res.status === 401 || res.status === 403) {
        alert('Session expired. Please login again.');
        window.location.href = '/login';
        return;
      }
      if (res.ok) setMessage('Home data updated successfully!');
    } catch (err) { setMessage('Error updating home data'); }
    setLoading(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      });
      if (res.status === 401 || res.status === 403) {
        alert('Session expired. Please login again.');
        window.location.href = '/login';
        return;
      }
      if (res.ok) setMessage('Profile updated successfully!');
    } catch (err) { setMessage('Error updating profile'); }
    setLoading(false);
  };

  return (
    <div className="login-container" style={{ padding: '100px 20px', alignItems: 'flex-start' }}>
      <div className="login-glass-card" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="login-header">
          <h2>Admin Dashboard</h2>
          <p>จัดการเนื้อหาในเว็บไซต์ของคุณ</p>
        </div>

        <div className="dashboard-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button className={`btn-secondary ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveSection('home')}>Home</button>
          <button className={`btn-secondary ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveSection('profile')}>Profile</button>
          <button className={`btn-secondary ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveSection('projects')}>Projects</button>
        </div>

        {message && <p className="success-message" style={{ color: '#4BB543', textAlign: 'center', marginBottom: '15px' }}>{message}</p>}

        {activeTab === 'home' && homeData && (
          <form className="login-form" onSubmit={handleUpdateHome}>
            <div className="form-group">
              <label>Greeting</label>
              <input type="text" value={homeData.greeting} onChange={(e) => setHomeData({...homeData, greeting: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={homeData.name} onChange={(e) => setHomeData({...homeData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" value={homeData.role} onChange={(e) => setHomeData({...homeData, role: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px', color: 'white' }}
                rows={4}
                value={homeData.description} 
                onChange={(e) => setHomeData({...homeData, description: e.target.value})} 
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>Save Home Changes</button>
          </form>
        )}

        {activeTab === 'profile' && profileData && (
          <form className="login-form" onSubmit={handleUpdateProfile}>
             <div className="form-group">
              <label>Introduce</label>
              <textarea 
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px', color: 'white' }}
                rows={4}
                value={profileData.introduce} 
                onChange={(e) => setProfileData({...profileData, introduce: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>Save Profile Changes</button>
          </form>
        )}

        {activeTab === 'projects' && (
          <div className="projects-list">
            <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>รายการโปรเจกต์ปัจจุบัน ({projects.length})</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {projects.map((p) => (
                <div key={p.id} style={{ background: 'var(--bg-card)', padding: '15px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{p.title}</span>
                  <button className="text-link-btn" style={{ color: '#ff4d4d' }}>Delete</button>
                </div>
              ))}
            </div>
            <button className="login-btn" style={{ marginTop: '20px' }}>Add New Project</button>
          </div>
        )}

        <div className="back-home" style={{ marginTop: '30px' }}>
          <a href="/">← Back to Portfolio</a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
