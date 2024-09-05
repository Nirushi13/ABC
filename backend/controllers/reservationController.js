import Reservation from '../models/ReservationModel.js';
import { sendEmail } from '../services/emailService.js';
import { Parser } from 'json2csv';

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

// Generate report
export const generateReport = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found' });
    }

    // Transform data to a format suitable for CSV
    const transformedReservations = reservations.map(res => ({
      name: res.name,
      email: res.email,
      phone: res.phone,
      date: new Date(res.date).toLocaleDateString(),
      time: res.time,
      guests: res.guests,
      status: res.status,
    }));

    // Create CSV parser instance
    const parser = new Parser();
    // Parse the transformed reservations data into CSV
    const csv = parser.parse(transformedReservations);

    // Set headers to indicate a file attachment
    res.header('Content-Type', 'text/csv');
    res.attachment('reservations_report.csv');
    res.send(csv);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while generating the report' });
  }
};