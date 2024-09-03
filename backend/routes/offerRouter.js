import express from 'express';
import multer from 'multer';
import path from 'path';
import { createOffer, getAllOffers, getOfferById, updateOffer, deleteOffer } from '../controllers/offerController.js';

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const router = express.Router();


router.post('/', upload.single('image'), createOffer); // 'image' is the field name in the form
router.get('/', getAllOffers);
router.get('/:id', getOfferById);
router.put('/:id', updateOffer);
router.delete('/:id', deleteOffer);

export default router;
