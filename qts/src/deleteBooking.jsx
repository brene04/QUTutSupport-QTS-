import { useState } from 'react';
import axiosInstance from './axiosConfig';

const DeleteBooking = () => {
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Are you sure you want to delete booking #${bookingId}?`
    );
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/bookings/${bookingId}`);
      setMessage('✅ Booking deleted successfully!');
      setBookingId('');
    } catch (error) {
      setMessage('❌ Failed to delete booking. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cancelling a Session</h2>

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
          placeholder="Enter booking ID to delete"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          required
        />
      </div>

      <p className="text-sm text-muted mb-12">
        Warning: This action cannot be undone. Please confirm the booking ID before proceeding.
      </p>

      <button
        type="submit"
        className="btn btn-danger"
        onClick={handleSubmit}
      >
        Cancel Booking
      </button>
    </div>
  );
};

export default DeleteBooking;