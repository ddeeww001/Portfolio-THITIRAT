import React, { useState, useEffect, useCallback } from 'react';
import '../CSS/variables.css';
import '../CSS/admin.css';
import AdminHome from './admin/AdminHome';
import AdminProfile from './admin/AdminProfile';
import AdminExperience from './admin/AdminExperience';
import type { HomeContent, ProfileContent, ProjectExperience } from '../types/portfolio';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveSection] = useState<'home' | 'profile' | 'projects'>('home');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [homeData, setHomeData] = useState<HomeContent | null>(null);
  const [profileData, setProfileData] = useState<ProfileContent | null>(null);
  const [projects, setProjects] = useState<ProjectExperience[]>([]);

  const fetchHome = useCallback(async () => {
    try {
      const res = await fetch('/api/home');
      if (res.ok) setHomeData(await res.json());
    } catch (e) { console.error(e); }
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) setProfileData(await res.json());
    } catch (e) { console.error(e); }
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) setProjects(await res.json());
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    fetchHome();
    fetchProfile();
    fetchProjects();
  }, [fetchHome, fetchProfile, fetchProjects]);

  const handleUpdate = async (endpoint: string, data: any) => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage('บันทึกข้อมูลเรียบร้อยแล้ว!');
        setTimeout(() => setMessage(''), 3000);
        if (endpoint === 'home') fetchHome();
        if (endpoint === 'profile') fetchProfile();
        if (endpoint === 'projects') fetchProjects();
      }
    } catch (err) { 
      console.error(err);
      setMessage('เกิดข้อผิดพลาดในการบันทึก'); 
      setTimeout(() => setMessage(''), 3000);
    }
    setLoading(false);
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโปรเจกต์นี้?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessage('ลบโปรเจกต์เรียบร้อยแล้ว');
        setTimeout(() => setMessage(''), 3000);
        fetchProjects();
      }
    } catch (e) { 
      console.error(e);
      setMessage('เกิดข้อผิดพลาดในการลบ'); 
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">PORTFOLIO ADMIN</div>
        <nav className="sidebar-nav">
          <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveSection('home')}>
            <i className="bi bi-house-door"></i> <span className="nav-text">หน้า Home</span>
          </div>
          <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveSection('profile')}>
            <i className="bi bi-person"></i> <span className="nav-text">ข้อมูล Profile</span>
          </div>
          <div className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveSection('projects')}>
            <i className="bi bi-briefcase"></i> <span className="nav-text">ผลงาน (Projects)</span>
          </div>
        </nav>
        <div className="logout-btn" onClick={() => { localStorage.removeItem('adminToken'); window.location.href='/'; }}>
          <i className="bi bi-box-arrow-right"></i> <span className="nav-text">ออกจากระบบ</span>
        </div>
      </aside>

      <main className="admin-main">
        {message && <div className="toast-msg">{message}</div>}
        
        <header style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h1>{activeTab === 'home' ? 'จัดการหน้า Home' : activeTab === 'profile' ? 'จัดการข้อมูลส่วนตัว' : 'จัดการผลงานและประสบการณ์'}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>ปรับแต่งเนื้อหาในเว็บไซต์ของคุณได้ที่นี่</p>
        </header>

        <div className="admin-content-card">
          {activeTab === 'home' && (
            <AdminHome 
              data={homeData} 
              onSave={(d) => handleUpdate('home', d)} 
              loading={loading} 
            />
          )}
          {activeTab === 'profile' && (
            <AdminProfile 
              data={profileData} 
              onSave={(d) => handleUpdate('profile', d)} 
              loading={loading} 
            />
          )}
          {activeTab === 'projects' && (
            <AdminExperience 
              projects={projects} 
              onAdd={(p) => handleUpdate('projects', p)} 
              onDelete={handleDeleteProject} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
