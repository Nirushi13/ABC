import express from 'express';
import { staffLogin, addStaff, updateStaff, deleteStaff, getAllStaff } from '../controllers/staffController.js';
const router = express.Router();

router.post('/login', staffLogin);
router.post('/add', addStaff);
router.put('/update/:id', updateStaff);
router.delete('/delete/:id', deleteStaff);
router.get('/all', getAllStaff);

export default router;
