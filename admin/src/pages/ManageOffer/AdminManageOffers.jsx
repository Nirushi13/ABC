import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminManageOffers.css'

const AdminManageOffers = ({url}) => {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    image: null,
  });
 
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(url+'/api/offer');
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  // Handle input change for the new offer form
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewOffer({ ...newOffer, image: files[0] });
    } else {
      setNewOffer({ ...newOffer, [name]: value });
    }
  };

  // Handle form submit to create a new offer
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newOffer) {
      formData.append(key, newOffer[key]);
    }

    try {
      await axios.post(url+'/api/offer', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewOffer({ title: '', description: '', discountPercentage: '', startDate: '', endDate: '', image: null });
      fetchOffers();
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  // Handle delete offer
  const handleDeleteOffer = async (id) => {
    try {
      await axios.delete(`${url}/api/offer/${id}`);
      fetchOffers(); // Refresh offers list
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  return (
    <div className="admin-container">
    <h1>Admin: Manage Offers</h1>
    <form className="offer-form" onSubmit={handleFormSubmit}>
      <input type="text" name="title" placeholder="Title" value={newOffer.title} onChange={handleInputChange} required />
      <textarea name="description" placeholder="Description" value={newOffer.description} onChange={handleInputChange} required />
      <input type="number" name="discountPercentage" placeholder="Discount Percentage" value={newOffer.discountPercentage} onChange={handleInputChange} required />
      <input type="date" name="startDate" value={newOffer.startDate} onChange={handleInputChange} required />
      <input type="date" name="endDate" value={newOffer.endDate} onChange={handleInputChange} required />
      <input type="file" name="image" onChange={handleInputChange} required />
      <button type="submit">Add Offer</button>
    </form>
    <div className="offer-list">
      {offers.map((offer) => (
        <div className="offer-card" key={offer._id}>
          <img src={`${url}/images/${offer.image}`} alt={offer.title} />
          <h3>{offer.title}</h3>
          <p>{offer.description}</p>
          <p>Discount: {offer.discountPercentage}%</p>
          <p className="offer-date">Valid from {new Date(offer.startDate).toLocaleDateString()} to {new Date(offer.endDate).toLocaleDateString()}</p>
          <button className="delete-button" onClick={() => handleDeleteOffer(offer._id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
  );
};

export default AdminManageOffers;
