import { useState } from 'react';
import axiosInstance from './axiosConfig';

const UpdateBooking = () => {
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    time: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/bookings/${formData.id}`, {
        date: formData.date,
        time: formData.time,
      });
      setMessage('✅ Booking updated successfully!');
      setFormData({ id: '', date: '', time: '' });
    } catch (error) {
      setMessage('❌ Failed to update booking. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit a session below</h2>

      {message && (
        <div className={`message ${message.includes('✅') ? 'message-success' : 'message-error'}`}>
          {message}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Booking ID</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter booking ID to update"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">New Date</label>
        <input
          className="form-input"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">New Time</label>
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
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Update Session
      </button>
    </div>
  );
};

export default UpdateBooking;