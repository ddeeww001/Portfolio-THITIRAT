
import React, { useState } from 'react';
import '../login.css';
import '../variables.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple logic for "Only me" (One user)
    // In a real app, this would be an API call
    if (username === 'admin' && password === 'password123') {
      alert('Login Successful! Welcome back.');
      window.location.href = '/'; // Redirect to home
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to login</p>
        </div>
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your username"
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

          {error && <p style={{ color: '#ff4d4d', fontSize: '0.85rem', textAlign: 'center', marginTop: '5px' }}>{error}</p>}
          
          <button type="submit" className="login-btn">
            Login
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
