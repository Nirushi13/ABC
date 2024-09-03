import Reservation from '../models/ReservationModel.js';
import { sendEmail } from '../services/emailService.js';

// Create a new reservation
export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;
    
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      status: 'pending',  // Default status is 'pending'
    });

    await newReservation.save();
    res.json({ success: true, message: 'Reservation created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single reservation by ID
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a reservation
export const updateReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation.name = name || reservation.name;
    reservation.email = email || reservation.email;
    reservation.phone = phone || reservation.phone;
    reservation.date = date || reservation.date;
    reservation.time = time || reservation.time;
    reservation.guests = guests || reservation.guests;

    await reservation.save();
    res.json({ message: 'Reservation updated successfully', reservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a reservation
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await reservation.remove();
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve a reservation
export const approveReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation.status = 'approved';

    await reservation.save();

    await sendEmail(
      reservation.email,
      'Your Reservation is Approved!',
      `Hello ${reservation.name},\n\nYour reservation for ${reservation.date} at ${reservation.time} has been approved.\n\nThank you for choosing our service!`
    );

    res.json({ message: 'Reservation approved and email sent.' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject a reservation
export const rejectReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    const { adminComment } = req.body;
    reservation.status = 'rejected';
    reservation.adminComment = adminComment;  // Optional comment

    await reservation.save();

    // Send rejection email
    await sendEmail(
      reservation.email,
      'Your Reservation is Rejected',
      `Hello ${reservation.name},\n\nWe regret to inform you that your reservation for ${reservation.date} at ${reservation.time} has been rejected.\n\nPlease contact us for further information.`
    );

    res.json({ message: 'Reservation rejected successfully', reservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
