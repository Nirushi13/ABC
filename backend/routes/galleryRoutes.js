import express from 'express';
import multer from 'multer';
import { addImage, getImages, deleteImage } from '../controllers/GalleryController.js';

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage });

router.post('/add', upload.single('image'), addImage);
router.get('/', getImages);
router.delete('/:id', deleteImage);

export default router;
