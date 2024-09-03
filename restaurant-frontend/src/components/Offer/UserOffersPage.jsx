import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserOffersPage.css';

const UserOffersPage = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/offer");
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  return (
    <div className="user-offers-container">
      <h1>Special Offers</h1>
      <div className="offers-grid">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div className="offer-card" key={offer._id}>
              {offer.image ? (
                <img src={`http://localhost:4000/images/${offer.image}`} alt={offer.title} className="offer-image" />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
              <div className="offer-details">
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <p>Discount: {offer.discountPercentage}%</p>
                <p className="offer-date">
                  Valid from {new Date(offer.startDate).toLocaleDateString()} to {new Date(offer.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No offers available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default UserOffersPage;
