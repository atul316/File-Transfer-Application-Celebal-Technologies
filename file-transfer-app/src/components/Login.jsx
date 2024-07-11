import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setAuthToken(response.data.token);
            navigate("/file-tranfer")
        } catch (error) {
            console.error("Invalid login");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="mb-4 text-2xl">Login</h2>
            <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 mb-2 border rounded" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-2 border rounded" />
                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
