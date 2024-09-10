import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/dashboard" className="sidebar-option" activeClassName="active">
          <img src={assets.dashboard} alt="dashboard" />
          <p>DashBoard</p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option" activeClassName="active">
          <img src={assets.add_icon} alt="Add Items" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option" activeClassName="active">
          <img src={assets.order_icon} alt="List Items" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option" activeClassName="active">
          <img src={assets.parcel_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/queries" className="sidebar-option" activeClassName="active">
          <img src={assets.query} alt="Queries" />
          <p>Queries</p>
        </NavLink>
        <NavLink to="/offers" className="sidebar-option" activeClassName="active">
          <img src={assets.offer} alt="Offers" />
          <p>Offers</p>
        </NavLink>
        <NavLink to="/reserve" className="sidebar-option" activeClassName="active">
          <img src={assets.reserve} alt="Reservations" />
          <p>Reservations</p>
        </NavLink>
        <NavLink to="/gallery" className="sidebar-option" activeClassName="active">
          <img src={assets.gallery} alt="Gallery" />
          <p>Gallery</p>
        </NavLink>
        <NavLink to="/usermanage" className="sidebar-option" activeClassName="active">
          <img src={assets.add_icon} alt="user" />
          <p>UserManage</p>
        </NavLink>
        <NavLink to="/staff" className="sidebar-option" activeClassName="active">
          <img src={assets.add_icon} alt="staff" />
          <p>StaffManage</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
