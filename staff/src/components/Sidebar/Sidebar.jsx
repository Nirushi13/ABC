import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
        <NavLink to="/orders" className="sidebar-option" activeClassName="active">
          <img src={assets.parcel_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/queries" className="sidebar-option" activeClassName="active">
          <img src={assets.query} alt="Queries" />
          <p>Queries</p>
        </NavLink>
        <NavLink to="/reserve" className="sidebar-option" activeClassName="active">
          <img src={assets.reserve} alt="Reservations" />
          <p>Reservations</p>
        </NavLink>
        </div>
    </div>
  )
}

export default Sidebar