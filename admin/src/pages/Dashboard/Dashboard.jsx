import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'

const Dashboard = ({url}) => {
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalFoods: 0,
    totalOffers: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(url+'/api/admin/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat">
          <h3>Total Revenue</h3>
          <p>${dashboardData.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat">
          <h3>Total Foods</h3>
          <p>{dashboardData.totalFoods}</p>
        </div>
        <div className="stat">
          <h3>Total Offers</h3>
          <p>{dashboardData.totalOffers}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
