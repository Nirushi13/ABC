import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffManage.css';

const StaffManage = ({ url }) => {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);  // To track which staff is being edited
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(url + '/api/staff/all');
      setStaff(response.data.staff);
    } catch (error) {
      setError('Error fetching staff members');
    }
  };

  const handleAddStaff = async () => {
    try {
      const response = await axios.post(url + '/api/staff/add', { name, email, password });
      if (response.data.success) {
        fetchStaff();  // Refresh staff list
        setName('');
        setEmail('');
        setPassword('');
        setError('');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error adding staff member');
    }
  };

  const handleEditStaff = (staffMember) => {
    setEditId(staffMember._id);
    setName(staffMember.name);
    setEmail(staffMember.email);
    setPassword(''); // Password will not be pre-filled
  };

  const handleUpdateStaff = async () => {
    try {
      const response = await axios.put(`${url}/api/staff/update/${editId}`, {
        name,
        email,
        password: password || undefined,  // Only update password if it's not empty
      });

      if (response.data.success) {
        setEditId(null);  // Close the edit form
        fetchStaff();  // Refresh the list
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error updating staff member');
    }
  };

  const handleDeleteStaff = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/staff/delete/${id}`);
      
      if (response.data.success) {
        alert('Staff Deleted Successfully');
        fetchStaff(); 
      } else {
        console.error('Error from server:', response.data.message);  // Log the backend error message
        setError(response.data.message);  // Set error message if deletion fails
      }
    } catch (error) {
      console.error('Error deleting staff:', error);  // Log the exact error
      setError('Error deleting staff member');  // Set a user-friendly error message
    }
  };
  
  return (
    <div className="admin-staff-manage">
      <h2 className="admin-staff-manage__title">Manage Staff Members</h2>

      {error && <div className="admin-staff-manage__error-message">{error}</div>}

      <div className="admin-staff-manage__form">
        <h3>{editId ? 'Update Staff Member' : 'Add New Staff Member'}</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {editId ? (
          <button className="admin-staff-manage__action-button" onClick={handleUpdateStaff}>
            Save Changes
          </button>
        ) : (
          <button className="admin-staff-manage__action-button" onClick={handleAddStaff}>
            Add Staff
          </button>
        )}
      </div>

      <table className="admin-staff-manage__table">
        <thead>
          <tr className="admin-staff-manage__table-header">
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember) => (
            <tr key={staffMember._id} className="admin-staff-manage__table-row">
              <td className="admin-staff-manage__table-cell">{staffMember.name}</td>
              <td className="admin-staff-manage__table-cell">{staffMember.email}</td>
              <td className="admin-staff-manage__table-cell">{staffMember.password}</td>
              <td className="admin-staff-manage__table-cell">
                <button
                  className="admin-staff-manage__action-button"
                  onClick={() => handleEditStaff(staffMember)}
                >
                  Update
                </button>
                <button
                  className="admin-staff-manage__delete-button"
                  onClick={() => handleDeleteStaff(staffMember._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffManage;
