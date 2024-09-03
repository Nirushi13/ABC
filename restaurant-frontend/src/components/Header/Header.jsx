import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {

  const navigate = useNavigate(); 
  const handleReservationClick = () => {
    navigate('/reservation'); 
  };
  
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order Your Favourite Food Here</h2>
            <p>Choose from a diverse menu featuring array of dishes crafted with the finest ingredients and culinary expertisde. Our missin is to satisfy your cravings and elavating your dinning experience, one delicious meal at a time</p>
            <button onClick={handleReservationClick}>Make Reservation</button>
        </div>
    </div>
  )
}

export default Header