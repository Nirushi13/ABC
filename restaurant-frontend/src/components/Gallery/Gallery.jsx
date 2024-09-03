import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]); // State to hold images fetched from the backend

  // Fetch images from the backend on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Function to fetch images from the backend
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/gallery');
      setImages(response.data.data); // Set the fetched images to state
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <h2 className="gallery-title">
        Our <span>ABC</span> Gallery
      </h2>
     
      <div className="gallery">
        {images.map((image) => (
          <div key={image._id} className="gallery-item">
            <img src={`http://localhost:4000/images/${image.image}`} alt="Gallery Item" className="gallery-img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
