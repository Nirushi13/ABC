import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GalleryAdmin.css'

const GalleryAdmin = ({url}) => {
  const [images, setImages] = useState([]); 
  const [selectedImage, setSelectedImage] = useState(null); 

  
  const fetchImages = async () => {
    try {
      const response = await axios.get(url+'/api/gallery');
      setImages(response.data.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

 
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

 
  const handleAddImage = async () => {
    if (!selectedImage) return alert('Please select an image');
    
    const formData = new FormData();
    formData.append('image', selectedImage); // Append image file to form data

    try {
      await axios.post(url+'/api/gallery/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSelectedImage(null); 
      fetchImages(); // Refresh images after adding
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  // Handle deleting an image
  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`${url}/api/gallery/${id}`);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="gallery-admin">
      <h2>Gallery Management</h2>
      
     
      <div className="add-image">
        <input 
          type="file" 
          onChange={handleImageChange} 
        />
        <button onClick={handleAddImage}>Upload Image</button>
      </div>
      
      
      <div className="gallery-images">
        {images.map((image) => (
          <div key={image._id} className="gallery-image">
            <img src={`http://localhost:4000/images/${image.image}`} alt="Gallery" />
            <button onClick={() => handleDeleteImage(image._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;
