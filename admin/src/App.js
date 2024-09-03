import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QueriesPage from './pages/QueriesPage/QueriesPage'
import ReplyQueryPage from './pages/ReplyQueryPage/ReplyQueryPage'
import AdminManageOffers from './pages/ManageOffer/AdminManageOffers'
import AdminReservations from './pages/AdminReservations/AdminReservations'
import GalleryAdmin from './pages/GalleryAdmin/GalleryAdmin'

const App = () => {

  const url="http://localhost:4000";

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
          <Route path="/queries" element={<QueriesPage url={url}/>}/>
          <Route path="/reply/:id" element={<ReplyQueryPage url={url} />} />
          <Route path="/offers" element={<AdminManageOffers url={url}/>}/>
          <Route path='/reserve' element= {<AdminReservations url={url}/>}/>
          <Route path='/gallery' element={<GalleryAdmin url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App