import express from 'express';
import {
  createReservation,
  getAllReservations,
  deleteReservation,
  approveReservation,
  rejectReservation,
  generateReport
} from '../controllers/reservationController.js';

const router = express.Router();


router.post('/', createReservation);
router.get('/', getAllReservations);
router.delete('/:id', deleteReservation);
router.put('/:id/approve', approveReservation);
router.put('/:id/reject', rejectReservation);
router.get('/report', generateReport);

export default router;
