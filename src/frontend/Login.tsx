
import React, { useState, useEffect } from 'react';
import '../CSS/login.css';
import '../CSS/variables.css';
import { handleApiError } from '../utils/apiErrorHandler';
import type { ApiError } from '../utils/apiErrorHandler';
import ErrorMessage from '../components/ErrorMessage';

const Login: React.FC = () => {
  const [username, setUsername] = useState('dew');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) setBackendStatus('online');
      else setBackendStatus('offline');
    } catch {
      setBackendStatus('offline');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);
    
    try {
      // Direct call to port 5000
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        setApiError(handleApiError(response));
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      alert('Login Successful! Welcome back, Admin.');
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      localStorage.setItem('adminToken', data.token);
      window.location.href = '/admin-dashboard';
    } catch (err: any) {
      setApiError(handleApiError(null, err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass-card">
        <div className="login-header">
          <h2>Admin Login</h2>
          <div style={{ marginBottom: '15px' }}>
            {backendStatus === 'online' ? (
              <span style={{ color: '#4BB543', fontSize: '0.8rem' }}>🟢 หลังบ้านพร้อมทำงาน (พอร์ต 5000)</span>
            ) : backendStatus === 'checking' ? (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>⏳ กำลังตรวจสอบการเชื่อมต่อ...</span>
            ) : (
              <span style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>🔴 หลังบ้านยังไม่เชื่อมต่อ (กรุณารัน npm run server)</span>
            )}
          </div>
          <p>เข้าสู่ระบบด้วยฐานข้อมูล SQLite</p>
        </div>
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username"><i className="bi bi-person"></i> Username</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password"><i className="bi bi-lock"></i> Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <ErrorMessage error={apiError} onClose={() => setApiError(null)} />
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
          </button>
        </form>

        <div className="back-home">
          <a href="/"><i className="bi bi-arrow-left"></i> Back to Portfolio</a>
        </div>
      </div>

      <div className="login-bg-decoration">
        <div className="login-circle circle-1"></div>
        <div className="login-circle circle-2"></div>
      </div>
    </div>
  );
};

export default Login;
