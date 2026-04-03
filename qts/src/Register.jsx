import { useState } from 'react';
import axiosInstance from './axiosConfig';

const Register = ({ onRegister, switchToLogin }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    role: 'student'
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axiosInstance.post('/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      setMessage('✅ Registration successful!');
      onRegister(response.data);
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Registration failed. Please try again.'));
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
          <h2 className="form-title">Register</h2>

          {message && (
            <div className={`message ${message.includes('✅') ? 'message-success' : 'message-error'}`}>
              {message}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">QUT Email</label>
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
              placeholder="Min. 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-input"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          <button
            className="btn btn-navy"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-sm text-muted mt-16">
            Already have an account?{' '}
            <span
              onClick={switchToLogin}
              style={{ color: 'var(--blue-accent)', cursor: 'pointer', fontWeight: 600 }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;