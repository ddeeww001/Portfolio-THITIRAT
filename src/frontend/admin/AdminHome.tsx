import React, { useState, useEffect } from 'react';
import type { HomeContent } from '../../types/portfolio';

interface AdminHomeProps {
  data: HomeContent | null;
  onSave: (data: HomeContent) => void;
  loading: boolean;
}

const AdminHome: React.FC<AdminHomeProps> = ({ data, onSave, loading }) => {
  const [formData, setFormData] = useState<HomeContent>({
    greeting: '',
    name: '',
    role: '',
    description: '',
    about_me_link: ''
  });

  useEffect(() => {
    if (data) {
      // Only update if data is different from current form
      setFormData(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(data)) {
          return { ...data };
        }
        return prev;
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="admin-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>คำทักทาย (Greeting)</label>
          <input 
            type="text" 
            name="greeting" 
            className="form-control" 
            value={formData.greeting} 
            onChange={handleChange} 
            placeholder="เช่น Hello, I'm"
          />
        </div>
        
        <div className="form-group">
          <label>ชื่อ (Name)</label>
          <input 
            type="text" 
            name="name" 
            className="form-control" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="ชื่อของคุณ"
          />
        </div>

        <div className="form-group">
          <label>ตำแหน่ง/บทบาท (Role)</label>
          <input 
            type="text" 
            name="role" 
            className="form-control" 
            value={formData.role} 
            onChange={handleChange} 
            placeholder="เช่น Fullstack Developer"
          />
        </div>

        <div className="form-group">
          <label>คำอธิบายย่อ (Short Description)</label>
          <textarea 
            name="description" 
            className="form-control" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="แนะนำตัวสั้นๆ"
          />
        </div>

        <div className="form-group">
          <label>ลิงก์ไปหน้า About (Link)</label>
          <input 
            type="text" 
            name="about_me_link" 
            className="form-control" 
            value={formData.about_me_link} 
            onChange={handleChange} 
            placeholder="/personal"
          />
        </div>

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
        </button>
      </form>
    </div>
  );
};

export default AdminHome;
