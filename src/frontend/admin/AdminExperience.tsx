import React, { useState } from 'react';
import type { ProjectExperience } from '../../types/portfolio';

interface AdminExperienceProps {
  projects: ProjectExperience[];
  onAdd: (project: ProjectExperience) => void;
  onDelete: (id: number) => void;
}

const AdminExperience: React.FC<AdminExperienceProps> = ({ projects, onAdd, onDelete }) => {
  const [editingProject, setEditingProject] = useState<ProjectExperience | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const emptyProject: ProjectExperience = {
    id: 0,
    title: '',
    date: '',
    role: [],
    details: [],
    link: [],
    tags: [],
    image_url: '',
    description: ''
  };

  const [formData, setFormData] = useState<ProjectExperience>(emptyProject);

  const handleEdit = (project: ProjectExperience) => {
    setEditingProject(project);
    setFormData({
      ...project,
      role: Array.isArray(project.role) ? project.role : [],
      details: Array.isArray(project.details) ? project.details : [],
      link: Array.isArray(project.link) ? project.link : [],
      tags: Array.isArray(project.tags) ? project.tags : []
    });
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setFormData(emptyProject);
    setIsAdding(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: keyof ProjectExperience, index: number, value: any) => {
    const newArr = [...(formData[field] as any[])];
    newArr[index] = value;
    setFormData((prev: any) => ({ ...prev, [field]: newArr }));
  };

  const handleAddItem = (field: keyof ProjectExperience, defaultValue: any = "") => {
    setFormData((prev: any) => ({ ...prev, [field]: [...(prev[field] as any[]), defaultValue] }));
  };

  const handleRemoveItem = (field: keyof ProjectExperience, index: number) => {
    const newArr = (formData[field] as any[]).filter((_: any, i: number) => i !== index);
    setFormData((prev: any) => ({ ...prev, [field]: newArr }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setIsAdding(false);
    setEditingProject(null);
  };

  return (
    <div className="admin-experience-container">
      {!isAdding && !editingProject ? (
        <>
          <button className="btn-add" onClick={handleAddNew} style={{ fontSize: '1rem', padding: '12px 25px' }}>
            <i className="bi bi-plus-lg"></i> เพิ่มโปรเจกต์ใหม่
          </button>
          
          <div className="project-list">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <h4>{project.title}</h4>
                <p style={{ fontSize: '0.8rem', opacity: 0.7, color: 'var(--text-secondary)' }}>{project.date}</p>
                <div className="project-actions">
                  <button className="btn-edit" onClick={() => handleEdit(project)}>แก้ไข</button>
                  <button className="btn-delete" onClick={() => onDelete(project.id)}>ลบ</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>{isAdding ? 'เพิ่มโปรเจกต์ใหม่' : 'แก้ไขโปรเจกต์'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>ชื่อโปรเจกต์ (Title)</label>
                <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>ช่วงเวลา (Date)</label>
                  <input type="text" name="date" className="form-control" value={formData.date} onChange={handleChange} placeholder="เช่น 2023 - Present" />
                </div>
                <div className="form-group">
                  <label>URL รูปภาพ (Image URL)</label>
                  <input type="text" name="image_url" className="form-control" value={formData.image_url} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>คำอธิบาย (Description)</label>
                <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} />
              </div>

              <h4 style={{ margin: '20px 0 10px', color: 'var(--text-primary)' }}>บทบาท (Roles)</h4>
              {formData.role && formData.role.map((r, i) => (
                <div key={i} className="array-item">
                  <input type="text" className="form-control" value={r} onChange={(e) => handleArrayChange('role', i, e.target.value)} />
                  <button type="button" className="btn-remove" onClick={() => handleRemoveItem('role', i)}><i className="bi bi-trash"></i></button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={() => handleAddItem('role')}>+ เพิ่มบทบาท</button>

              <h4 style={{ margin: '20px 0 10px', color: 'var(--text-primary)' }}>รายละเอียด (Details)</h4>
              {formData.details && formData.details.map((d, i) => (
                <div key={i} className="array-item">
                  <textarea className="form-control" value={d} onChange={(e) => handleArrayChange('details', i, e.target.value)} />
                  <button type="button" className="btn-remove" onClick={() => handleRemoveItem('details', i)}><i className="bi bi-trash"></i></button>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={() => handleAddItem('details')}>+ เพิ่มรายละเอียด</button>

              <h4 style={{ margin: '20px 0 10px', color: 'var(--text-primary)' }}>ลิงก์ (Links)</h4>
              {formData.link && formData.link.map((l, i) => (
                <div key={i} className="array-item" style={{ flexDirection: 'column', alignItems: 'flex-start', border: '1px solid var(--glass-border)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', width: '100%', gap: '10px', marginBottom: '5px' }}>
                    <input type="text" placeholder="Label (e.g. GitHub)" className="form-control" value={l.label} onChange={(e) => handleArrayChange('link', i, { ...l, label: e.target.value })} />
                    <button type="button" className="btn-remove" onClick={() => handleRemoveItem('link', i)}><i className="bi bi-trash"></i></button>
                  </div>
                  <input type="text" placeholder="URL" className="form-control" value={l.url} onChange={(e) => handleArrayChange('link', i, { ...l, url: e.target.value })} />
                </div>
              ))}
              <button type="button" className="btn-add" onClick={() => handleAddItem('link', { label: '', url: '' })}>+ เพิ่มลิงก์</button>

              <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                <button type="submit" className="save-btn">บันทึก</button>
                <button type="button" className="btn-secondary" style={{ padding: '10px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => { setIsAdding(false); setEditingProject(null); }}>ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminExperience;
