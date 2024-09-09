import express from 'express';
import { getAdminDashboardData } from '../controllers/dashboardController.js';

const router = express.Router();


router.get('/dashboard', getAdminDashboardData);

export default router;
