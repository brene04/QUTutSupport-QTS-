import { useState } from 'react';
import axiosInstance from './axiosConfig';

const Login = ({ onLogin, switchToRegister }) => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axiosInstance.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      setMessage('✅ Login successful!');
      onLogin(response.data);
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Login failed. Please check your credentials.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="app-header">
        <p className="welcome">Welcome to</p>
        <h1>QUTutSupport</h1>
        <p>"Learning made simple. Support made easy"</p>
      </div>

      <div className="page-content">
        <div className="form-container">
          <h2 className="form-title">Login</h2>

          {message && (
            <div className={`message ${message.includes('✅') ? 'message-success' : 'message-error'}`}>
              {message}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="yourname@qut.edu.au"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            className="btn btn-navy"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-muted mt-16">
            Don't have an account?{' '}
            <span
              onClick={switchToRegister}
              style={{ color: 'var(--blue-accent)', cursor: 'pointer', fontWeight: 600 }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;