import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './QueriesPage.css';

const QueriesPage = ({ url }) => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(url + "/api/query/get");
        setQueries(response.data);
      } catch (error) {
        toast.error('Failed to fetch queries');
      }
    };

    fetchQueries();
  }, [url]);

  // Function to download the report
  const downloadReport = async () => {
    try {
      const response = await axios.get(url + '/api/query/report', {
        responseType: 'blob',
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'queries_report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Error downloading report');
    }
  };

  return (
    <div className="queries-page">
      <div className="header">
        <h1>Manage Queries</h1>
        <button className="download-btn" onClick={downloadReport}>Download Report</button>
      </div>
      
      <table className="queries-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query._id}>
              <td>{query.name}</td>
              <td>{query.email}</td>
              <td>{query.message}</td>
              <td>
                <Link to={`/reply/${query._id}`}>
                  <button className="reply-btn">Reply</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueriesPage;
