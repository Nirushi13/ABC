import Gallery from '../models/GalleryModel.js';
import fs from 'fs';

// Add image to the gallery
export const addImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Save the filename in the database
    const newImage = new Gallery({ image: req.file.filename });
    await newImage.save();
    res.json({ success: true, message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get all images
export const getImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete image by ID
export const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Gallery.findById(id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Remove the image file from the server
    fs.unlinkSync(`uploads/${image.image}`);

    await image.deleteOne();
    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
