import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import './ReplyQueryPage.css'

const ReplyQueryPage = ({ url }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchQueryDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/query/get/${id}`);
        setQuery(response.data.data);
      } catch (error) {
        toast.error('Failed to fetch query details');
      }
    };

    fetchQueryDetails();
  }, [id, url]);

  const handleReplySubmit = async () => {
    try {
      await axios.post(`${url}/api/query/${id}/reply`, { response });
      toast.success('Reply sent successfully!');
      navigate('/queries'); 
    } catch (error) {
      toast.error('Failed to send reply');
    }
  };

  if (!query) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reply-query-container">
      <h1>Reply to Query</h1>
      <div className="query-details">
        <p><strong>Name:</strong> {query.name}</p>
        <p><strong>Email:</strong> {query.email}</p>
        <p><strong>Message:</strong> {query.message}</p>
      </div>
      <div className="reply-section">
        <textarea
          rows="5"
          required
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Write your reply here..."
          
        />
        <button onClick={handleReplySubmit}>Send Reply</button>
      </div>
    </div>
  );
};

export default ReplyQueryPage;
