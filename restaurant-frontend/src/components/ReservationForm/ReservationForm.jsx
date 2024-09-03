import React, { useState } from 'react';
import axios from 'axios';
import './ReservationForm.css';


const ReservationForm = () => {
  const [reservation, setReservation] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/reservations', reservation);
      alert('Reservation made successfully!');
      setReservation({ name: '', email: '', phone: '', date: '', time: '', guests: '' });
    } catch (error) {
      console.error('Error making reservation:', error);
    }
  };

  return (
    <>
    <div className="reservation-form-container">
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={reservation.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={reservation.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={reservation.phone} onChange={handleChange} required />
        <input type="date" name="date" value={reservation.date} onChange={handleChange} required />
        <input type="time" name="time" value={reservation.time} onChange={handleChange} required />
        <input type="number" name="guests" placeholder="Number of Guests" value={reservation.guests} onChange={handleChange} required />
        <button type="submit">Reserve Now</button>
      </form>
    </div>
    </>
  );
};

export default ReservationForm;
