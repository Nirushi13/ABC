import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer } from 'react-toastify';
import AboutUs from './pages/AboutUs/AboutUs';
import ReservationForm from './components/ReservationForm/ReservationForm';
import FoodSearch from './components/FoodSearch/FoodSearch.jsx';



function App() {

  const [showLogin,setShowLogin]=useState(false);

  return (
    <>
    {showLogin?<LoginPopUp path='/login' setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/search" element={<FoodSearch />} />
      </Routes>
    </div>
    <Footer/>
    <ToastContainer/>
    </>
  );
}

export default App;
