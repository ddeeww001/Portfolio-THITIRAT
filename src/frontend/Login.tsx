
import React, { useState } from 'react';
import '../CSS/login.css';
import '../CSS/variables.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('dew');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      alert('Login Successful! Welcome back, Admin.');
      // Store user info in localStorage for session management
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      window.location.href = '/'; // Redirect to home
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass-card">
        <div className="login-header">
          <h2>Admin Login</h2>
          <p>เข้าสู่ระบบด้วยฐานข้อมูล SQLite</p>
        </div>
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
          </button>
        </form>

        <div className="back-home">
          <a href="/">← Back to Portfolio</a>
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
