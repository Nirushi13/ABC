import mongoose from 'mongoose';


const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,  
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  }
});


const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
