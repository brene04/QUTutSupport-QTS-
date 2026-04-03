import { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get('/bookings');
        setBookings(response.data);
      } catch (error) {
        setMessage('❌ Failed to fetch bookings. Is your backend running?');
      }
    };
    fetchBookings();
  }, []);

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div>
      {message && (
        <div className="message message-error">{message}</div>
      )}

      {bookings.length === 0 && !message ? (
        <div className="card">
          <p className="text-center text-muted text-sm">
            No bookings found. Create one above!
          </p>
        </div>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="session-card" style={{ flexDirection: 'column' }}>

            {/* Booking ID row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                color: 'var(--text-muted)',
                background: 'var(--off-white)',
                padding: '3px 8px',
                borderRadius: '4px',
                border: '1px solid var(--light-grey)'
              }}>
                ID: {booking._id}
              </span>
              <button
                onClick={() => copyId(booking._id)}
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  border: '1px solid var(--light-grey)',
                  borderRadius: '6px',
                  background: copied === booking._id ? 'var(--success)' : 'var(--white)',
                  color: copied === booking._id ? 'white' : 'var(--navy)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                {copied === booking._id ? '✅ Copied!' : 'Copy BookingID'}
              </button>
            </div>

            {/* Booking details */}
            <div className="session-info">
              <h4>Tutor Name: {booking.tutor_id}</h4>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <div className="mt-8">
              <span className="badge badge-confirmed">Booking Confirmed</span>
              </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default ViewBookings;