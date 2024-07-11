import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', { username, password });
            alert('User registered successfully');
        } catch (error) {
            console.error("Error registering user");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl mb-4">Register</h2>
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-2 p-2 border rounded w-full" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2 p-2 border rounded w-full" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
            </form>
        </div>
    );
};

export default Register;
