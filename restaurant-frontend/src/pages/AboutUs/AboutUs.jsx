import React, { useState } from 'react'
import Header from '../../components/Header/Header';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import QueryForm from '../../components/QueryForm/QueryForm'
import UserOffersPage from '../../components/Offer/UserOffersPage';

const AboutUs = () => {
    const[category,setCategory]=useState("All");

  return (
    <div>
        <Header/>
        <FoodDisplay category={category}/>
        <UserOffersPage/>
        <QueryForm/>
    </div>
  )
}

export default AboutUs