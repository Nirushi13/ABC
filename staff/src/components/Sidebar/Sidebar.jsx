import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">

                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink  to="/list" className="sidebar-option">

                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to="/orders" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
            <NavLink to="/queries" className="sidebar-option">
                <img src={assets.add_icon} alt="Queries" /> 
                <p>Queries</p>
            </NavLink>
            <NavLink to="/offers" className="sidebar-option">
                <img src={assets.add_icon} alt="offers" /> 
                <p>Offers</p>
            </NavLink>
            <NavLink to="/reserve" className="sidebar-option">
                <img src={assets.add_icon} alt="offers" /> 
                <p>Reservations</p>
            </NavLink>
            <NavLink to="/gallery" className="sidebar-option">
                <img src={assets.add_icon} alt="gallery" /> 
                <p>Gallery</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar