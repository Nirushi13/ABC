import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QueriesPage from './pages/QueriesPage/QueriesPage';
import ReplyQueryPage from './pages/ReplyQueryPage/ReplyQueryPage';
import AdminManageOffers from './pages/ManageOffer/AdminManageOffers';
import AdminReservations from './pages/AdminReservations/AdminReservations';
import GalleryAdmin from './pages/GalleryAdmin/GalleryAdmin';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login.jsx';
import UserManage from './pages/UserManage/UserManage.jsx';
import StaffManage from './pages/StaffManage/StaffManage.jsx'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const url = "http://localhost:4000";

  // Function to handle login success
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      {!isLoggedIn && <Login path='/login' onLoginSuccess={handleLogin} url={url} />}
      <hr />
      <div className="app-content">
        {isLoggedIn && <Sidebar />}
        <Routes>
          <Route
            path="/add"
            element={isLoggedIn ? <Add url={url} /> : <Navigate to="/login" />}
          />
          <Route
            path="/list"
            element={isLoggedIn ? <List url={url} /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={isLoggedIn ? <Orders url={url} /> : <Navigate to="/login" />}
          />
          <Route
            path="/queries"
            element={isLoggedIn ? <QueriesPage url={url} /> : <Navigate to="/login" />}
          />
          <Route
            path="/reply/:id"
            element={isLoggedIn ? <ReplyQueryPage url={url} /> : <Navigate to="/login" />}
          />
          <Route
            path="/offers"
            element={isLoggedIn ? <AdminManageOffers url={url} /> : <Navigate to="/login" />}
          />
          <Route
            path="/reserve"
            element={isLoggedIn ? <AdminReservations url={url} /> : <Navigate to="/login" />}
          />
          <Route
            path="/gallery"
            element={isLoggedIn ? <GalleryAdmin url={url} /> : <Navigate to="/login" />}
          />
           <Route
            path="/usermanage"
            element={isLoggedIn ? <UserManage url={url} /> : <Navigate to="/login" />}
          />
          <Route
            path="/staff"
            element={isLoggedIn ? <StaffManage url={url} /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard url={url} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
