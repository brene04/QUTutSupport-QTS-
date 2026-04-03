import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import CreateBooking from './createBooking';
import ViewBookings from './viewBooking';
import UpdateBooking from './editBooking';
import DeleteBooking from './deleteBooking';
import './App.css';

function App() {
  const savedUser = localStorage.getItem('user');
  const [user, setUser]     = useState(savedUser ? JSON.parse(savedUser) : null);
  const [screen, setScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('create');

  const handleLogin    = (userData) => setUser(userData);
  const handleRegister = (userData) => setUser(userData);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setScreen('login');
  };

  // ── Not logged in ──
  if (!user) {
    if (screen === 'register') {
      return (
        <Register
          onRegister={handleRegister}
          switchToLogin={() => setScreen('login')}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        switchToRegister={() => setScreen('register')}
      />
    );
  }

  // ── Logged in ──
  return (
    <div className="App">

      <div className="app-header">
        <p className="welcome">Welcome,</p>
        <h1>{user.name}</h1>
        <p style={{ fontSize: '12px', opacity: 0.7 }}>{user.email}</p>
      </div>

      {/* Page Content */}
      <div className="page-content">
        {activeTab === 'create' && <CreateBooking />}
        {activeTab === 'view'   && <ViewBookings />}
        {activeTab === 'update' && <UpdateBooking />}
        {activeTab === 'delete' && <DeleteBooking />}
      </div>

      {/* Bottom Tab Navigation */}
      <nav className="bottom-nav">
        <div
          className={`nav-item ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ fontSize: '16px', marginBottom: '20px', marginTop: '20px'}}>New</span>
        </div>
        <div
          className={`nav-item ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ fontSize: '16px', marginBottom: '20px', marginTop: '20px'}}>View</span>
        </div>
        <div
          className={`nav-item ${activeTab === 'update' ? 'active' : ''}`}
          onClick={() => setActiveTab('update')}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ fontSize: '16px', marginBottom: '20px', marginTop: '20px'}}>Edit</span>
        </div>
        <div
          className={`nav-item ${activeTab === 'delete' ? 'active' : ''}`}
          onClick={() => setActiveTab('delete')}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ fontSize: '16px', marginBottom: '20px', marginTop: '20px'}}>Delete</span>
        </div>
        <div
          className="nav-item"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ fontSize: '16px', marginBottom: '20px', marginTop: '20px'}}>Logout</span>
        </div>
      </nav>

    </div>
  );
}

export default App;