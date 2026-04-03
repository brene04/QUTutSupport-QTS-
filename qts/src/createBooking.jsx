import { useState } from 'react';
import axiosInstance from './axiosConfig';

const CreateBooking = () => {
  const [formData, setFormData] = useState({
    tutor_id: '',
    date: '',
    time: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/bookings', formData);
      setMessage('✅ Booking created successfully!');
      setFormData({ tutor_id: '', date: '', time: '' });
    } catch (error) {
      setMessage('❌ Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Request a session below</h2>

      {message && (
        <div className={`message ${message.includes('✅') ? 'message-success' : 'message-error'}`}>
          {message}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Tutor Name</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter tutor name or ID"
          value={formData.tutor_id}
          onChange={(e) => setFormData({ ...formData, tutor_id: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Date</label>
        <input
          className="form-input"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Time</label>
        <input
          className="form-input"
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-navy"
        onClick={handleSubmit}
      >
        Request Session
      </button>
    </div>
  );
};

export default CreateBooking;