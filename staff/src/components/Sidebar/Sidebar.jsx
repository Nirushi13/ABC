import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to="/orders" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
            <NavLink to="/queries" className="sidebar-option">
                <img src={assets.add_icon} alt="Queries" /> 
                <p>Queries</p>
            </NavLink>
            <NavLink to="/reserve" className="sidebar-option">
                <img src={assets.add_icon} alt="offers" /> 
                <p>Reservations</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar