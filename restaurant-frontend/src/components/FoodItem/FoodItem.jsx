import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
  
  const {cartItems,addToCart,removeFromCart,url,isLoggedIn}=useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);
  
  
  const handleAddToCart = (itemId) => {
    if (!isLoggedIn) {
      setShowPopup(true); 
    } else {
      addToCart(itemId);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    if (!isLoggedIn) {
      setShowPopup(true);   
    } else {
      removeFromCart(itemId);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close popup when user clicks "OK"
  };

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={url+"/images/"+image} alt="" className="food-item-image" />
            {!cartItems[id]
              ?<img className='add' onClick={()=>handleAddToCart(id)}src={assets.add_icon_white} alt=''/>
              :<  div className='food-item-counter'>
                    <img onClick={()=>handleRemoveFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>handleAddToCart(id)} src={assets.add_icon_green} alt="" />
                  </div>}
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
        {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Please log in to add items to the cart.</p>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FoodItem