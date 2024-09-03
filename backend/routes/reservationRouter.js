import express from 'express';
import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  approveReservation,
  rejectReservation,
} from '../controllers/reservationController.js';

const router = express.Router();


router.post('/', createReservation);
router.get('/', getAllReservations);
router.get('/:id', getReservationById);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);
router.put('/:id/approve', approveReservation);
router.put('/:id/reject', rejectReservation);

export default router;
