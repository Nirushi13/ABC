import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManage.css'

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/getusers');
        setUsers(response.data.users);
      } catch (error) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      setError('Error deleting user');
    }
  };

  return (
    <div className="admin-user-manage">
      <h1 className="admin-user-manage__title">Manage Users</h1>
      {error && <p className="admin-user-manage__error-message">{error}</p>}
      <table className="admin-user-manage__table">
        <thead>
          <tr>
            <th className="admin-user-manage__table-header">Name</th>
            <th className="admin-user-manage__table-header">Email</th>
            <th className="admin-user-manage__table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="admin-user-manage__table-row">
              <td className="admin-user-manage__table-cell">{user.name}</td>
              <td className="admin-user-manage__table-cell">{user.email}</td>
              <td className="admin-user-manage__table-cell">
                <button 
                  className="admin-user-manage__delete-button"
                  onClick={() => handleDelete(user._id)}
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

export default UserManage;
