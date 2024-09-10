import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

const Login = ({ url,onLoginSuccess}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/admins/login`, { email, password });
            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                onLoginSuccess();
                alert('Login Successful')
                navigate('/dashboard'); 
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className='admin'>
                <label className='label'>Email:
                    <input className='input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label className='label'>Password:
                    <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit" className='admin-btn'>Login</button>
            </form>
        </div>
    );
};

export default Login;
