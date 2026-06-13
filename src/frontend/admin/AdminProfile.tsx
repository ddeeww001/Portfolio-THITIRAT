import React, { useState, useEffect } from 'react';
import type { ProfileContent } from '../../types/portfolio';

interface AdminProfileProps {
  data: ProfileContent | null;
  onSave: (data: ProfileContent) => void;
  loading: boolean;
}

const AdminProfile: React.FC<AdminProfileProps> = ({ data, onSave, loading }) => {
  const [formData, setFormData] = useState<ProfileContent>({
    name: '',
    email: '',
    phone: '',
    birthday: '',
    introduce: '',
    role: [],
    socials: [],
    technicalSkills: [],
    tools: [],
    languages: [],
    certifications: []
  });

  useEffect(() => {
    if (data) {
      setFormData(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(data)) {
          return {
            ...data,
            role: Array.isArray(data.role) ? data.role : [],
            socials: Array.isArray(data.socials) ? data.socials : [],
            technicalSkills: Array.isArray(data.technicalSkills) ? data.technicalSkills : [],
            tools: Array.isArray(data.tools) ? data.tools : [],
            languages: Array.isArray(data.languages) ? data.languages : [],
            certifications: Array.isArray(data.certifications) ? data.certifications : []
          };
        }
        return prev;
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: keyof ProfileContent, index: number, value: any) => {
    const newArr = [...(formData[field] as any[])];
    newArr[index] = value;
    setFormData((prev: any) => ({ ...prev, [field]: newArr }));
  };

  const handleAddItem = (field: keyof ProfileContent, defaultValue: any = "") => {
    setFormData((prev: any) => ({ ...prev, [field]: [...(prev[field] as any[]), defaultValue] }));
  };

  const handleRemoveItem = (field: keyof ProfileContent, index: number) => {
    const newArr = (formData[field] as any[]).filter((_: any, i: number) => i !== index);
    setFormData((prev: any) => ({ ...prev, [field]: newArr }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="admin-profile-container admin-form-container">
      <form onSubmit={handleSubmit}>
        <h3 className="section-title">ข้อมูลพื้นฐาน</h3>
        <div className="grid-2">
          <div className="form-group">
            <label>ชื่อ-นามสกุล</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>อีเมล</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label>เบอร์โทรศัพท์</label>
            <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>วันเกิด</label>
            <input type="text" name="birthday" className="form-control" value={formData.birthday} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>บทนำ (Introduce)</label>
          <textarea name="introduce" className="form-control" value={formData.introduce} onChange={handleChange} />
        </div>

        <h3 className="section-title">บทบาท (Roles)</h3>
        {formData.role.map((r, i) => (
          <div key={i} className="array-item">
            <input type="text" className="form-control" value={r} onChange={(e) => handleArrayChange('role', i, e.target.value)} />
            <button type="button" className="btn-remove" onClick={() => handleRemoveItem('role', i)}><i className="bi bi-trash"></i></button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={() => handleAddItem('role')}>+ เพิ่มบทบาท</button>

        <h3 className="section-title">ทักษะทางเทคนิค (Technical Skills)</h3>
        {formData.technicalSkills.map((s, i) => (
          <div key={i} className="array-item">
            <input type="text" placeholder="Skill" className="form-control" value={s.skill} onChange={(e) => handleArrayChange('technicalSkills', i, { ...s, skill: e.target.value })} />
            <input type="text" placeholder="Level" className="form-control" value={s.level} onChange={(e) => handleArrayChange('technicalSkills', i, { ...s, level: e.target.value })} />
            <button type="button" className="btn-remove" onClick={() => handleRemoveItem('technicalSkills', i)}><i className="bi bi-trash"></i></button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={() => handleAddItem('technicalSkills', { skill: "", level: "" })}>+ เพิ่มทักษะ</button>

        <h3 className="section-title">เครื่องมือ (Tools)</h3>
        {formData.tools.map((t, i) => (
          <div key={i} className="array-item">
            <input type="text" className="form-control" value={t} onChange={(e) => handleArrayChange('tools', i, e.target.value)} />
            <button type="button" className="btn-remove" onClick={() => handleRemoveItem('tools', i)}><i className="bi bi-trash"></i></button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={() => handleAddItem('tools')}>+ เพิ่มเครื่องมือ</button>

        <h3 className="section-title">ภาษา (Languages)</h3>
        {formData.languages.map((l, i) => (
          <div key={i} className="array-item">
            <input type="text" placeholder="Language" className="form-control" value={l.lang} onChange={(e) => handleArrayChange('languages', i, { ...l, lang: e.target.value })} />
            <input type="text" placeholder="Level" className="form-control" value={l.level} onChange={(e) => handleArrayChange('languages', i, { ...l, level: e.target.value })} />
            <button type="button" className="btn-remove" onClick={() => handleRemoveItem('languages', i)}><i className="bi bi-trash"></i></button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={() => handleAddItem('languages', { lang: "", level: "" })}>+ เพิ่มภาษา</button>

        <h3 className="section-title">ใบประกาศ (Certifications)</h3>
        {formData.certifications.map((c, i) => (
          <div key={i} className="array-item">
            <input type="text" className="form-control" value={c} onChange={(e) => handleArrayChange('certifications', i, e.target.value)} />
            <button type="button" className="btn-remove" onClick={() => handleRemoveItem('certifications', i)}><i className="bi bi-trash"></i></button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={() => handleAddItem('certifications')}>+ เพิ่มใบประกาศ</button>

        <h3 className="section-title">Social Media</h3>
        {formData.socials.map((s, i) => (
          <div key={i} className="array-item" style={{ flexDirection: 'column', alignItems: 'flex-start', border: '1px solid var(--glass-border)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', width: '100%', gap: '10px', marginBottom: '5px' }}>
              <input type="text" placeholder="Platform (e.g. GitHub)" className="form-control" value={s.platform} onChange={(e) => handleArrayChange('socials', i, { ...s, platform: e.target.value })} />
              <button type="button" className="btn-remove" onClick={() => handleRemoveItem('socials', i)}><i className="bi bi-trash"></i></button>
            </div>
            <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
              <input type="text" placeholder="Username/Display" className="form-control" value={s.username || ''} onChange={(e) => handleArrayChange('socials', i, { ...s, username: e.target.value })} />
              <input type="text" placeholder="URL" className="form-control" value={s.url} onChange={(e) => handleArrayChange('socials', i, { ...s, url: e.target.value })} />
            </div>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={() => handleAddItem('socials', { platform: "", url: "", username: "" })}>+ เพิ่ม Social</button>

        <div style={{ marginTop: '40px' }}>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
