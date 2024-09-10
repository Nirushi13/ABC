import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QueriesPage from './pages/QueriesPage/QueriesPage';
import ReplyQueryPage from './pages/ReplyQueryPage/ReplyQueryPage';
import AdminReservations from './pages/AdminReservations/AdminReservations';
import Login from './pages/Login/Login.jsx';


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
            path="/reserve"
            element={isLoggedIn ? <AdminReservations url={url} /> : <Navigate to="/login" />}
          />
          
        </Routes>
      </div>
    </div>
  );
};

export default App;
