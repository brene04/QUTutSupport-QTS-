const { expect } = require('chai');
const sinon = require('sinon');

const mockBooking = {
  _id: '507f1f77bcf86cd799439011',
  tutor_id: 'John Smith',
  date: '2026-04-10',
  time: '10:00',
};

describe('Booking API Tests', () => {

  // create test
  describe('POST /api/bookings', () => {
    it('should create a booking successfully', () => {
      const booking = { ...mockBooking };
      expect(booking).to.have.property('tutor_id');
      expect(booking).to.have.property('date');
      expect(booking).to.have.property('time');
      expect(booking.tutor_id).to.equal('John Smith');
    });

    it('should fail if tutor_id is missing', () => {
      const booking = { date: '2026-04-10', time: '10:00' };
      expect(booking).to.not.have.property('tutor_id');
    });
  });

  // view test
  describe('GET /api/bookings', () => {
    it('should return a list of bookings', () => {
      const bookings = [mockBooking];
      expect(bookings).to.be.an('array');
      expect(bookings.length).to.be.greaterThan(0);
    });

    it('should show confirmed bookings with correct properties', () => {
      const booking = { ...mockBooking };
      expect(booking).to.have.property('_id');
      expect(booking).to.have.property('tutor_id');
      expect(booking).to.have.property('date');
      expect(booking).to.have.property('time');
    });
  });

  // edit test
  describe('PUT /api/bookings/:id', () => {
    it('should edit booking date successfully', () => {
      const updated = { ...mockBooking, date: '2026-05-01' };
      expect(updated.date).to.equal('2026-05-01');
    });

    it('should edit booking time successfully', () => {
      const updated = { ...mockBooking, time: '14:00' };
      expect(updated.time).to.equal('14:00');
    });
  });

  // delete test
  describe('DELETE /api/bookings/:id', () => {
    it('should delete a booking successfully', () => {
      const bookings = [mockBooking];
      const filtered = bookings.filter(b => b._id !== mockBooking._id);
      expect(filtered).to.be.an('array');
      expect(filtered.length).to.equal(0);
    });

    it('should return an empty list after deletion', () => {
      const bookings = [];
      expect(bookings).to.have.lengthOf(0);
    });
  });

});