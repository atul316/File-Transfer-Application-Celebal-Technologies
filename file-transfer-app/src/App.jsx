import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FileTransfer from './components/FileTransfer';

const App = () => {
    const [authToken, setAuthToken] = useState('');

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
                    <Route path="/" element={<Register />} />
                    <Route path="/file-tranfer" element={<FileTransfer authToken={authToken} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
