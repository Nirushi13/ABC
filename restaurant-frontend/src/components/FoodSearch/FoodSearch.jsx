import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodSearch.css';

const FoodSearch = () => {
  const [search, setSearch] = useState('');
  const [foods, setFoods] = useState([]);

  const url="http://localhost:4000"

  useEffect(() => {
    // Fetch foods whenever the search query changes
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list`, {
          params: { search }
        });
        setFoods(response.data.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, [search, url]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="food-search">
      <h1>Food Search</h1>
      <input
        type="text"
        placeholder="Search by name, category, or description"
        value={search}
        onChange={handleSearchChange}
      />
      <div className="food-list">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div className="food-card" key={food._id}>
              <img src={`${url}/images/${food.image}`} alt={food.name} />
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <p>Category: {food.category}</p>
              <p>Price: ${food.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default FoodSearch;
