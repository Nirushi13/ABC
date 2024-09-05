import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminReservations.css'

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/reservations');
        setReservations(response.data);
      } catch (err) {
        setError('Error fetching reservations');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Approve a reservation
  const approveReservation = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/reservations/${id}/approve`);
      alert('Reservation approved successfully!');
      setReservations(reservations.map(res => res._id === id ? { ...res, status: 'approved' } : res));
    } catch (error) {
      console.error('Error approving reservation:', error);
    }
  };

  // Reject a reservation
  const rejectReservation = async (id, adminComment) => {
    try {
      await axios.put(`http://localhost:4000/api/reservations/${id}/reject`, { adminComment });
      alert('Reservation rejected successfully!');
      setReservations(reservations.map(res => res._id === id ? { ...res, status: 'rejected', adminComment } : res));
    } catch (error) {
      console.error('Error rejecting reservation:', error);
    }
  };

    // Function to download the report
    const downloadReport = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/reservations/report',
           {
          responseType: 'blob',
        });
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reservations_report.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('Error downloading report:', error);
      }
    };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-reservations">
      <h2>Admin - Manage Reservations</h2>
      <button className="download-button" onClick={downloadReport}>
        <i className="fas fa-download"></i> Download Report
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.name}</td>
              <td>{reservation.email}</td>
              <td>{reservation.phone}</td>
              <td>{new Date(reservation.date).toLocaleDateString()}</td>
              <td>{reservation.time}</td>
              <td>{reservation.guests}</td>
              <td>{reservation.status}</td>
              <td>
                {reservation.status === 'pending' && (
                  <>
                    <button onClick={() => approveReservation(reservation._id)}>Approve</button>
                    <button onClick={() => {
                      const adminComment = prompt("Enter reason for rejection:");
                      if (adminComment) rejectReservation(reservation._id, adminComment);
                    }}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReservations;
