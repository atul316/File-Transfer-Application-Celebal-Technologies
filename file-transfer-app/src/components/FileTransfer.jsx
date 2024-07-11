import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const ENDPOINT = "http://localhost:5000";
const socket = socketIOClient(ENDPOINT);

const FileTransfer = ({ authToken }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });
            setFileName(response.data.filename);
            socket.emit('sendFile', { fileName: response.data.filename });
        } catch (error) {
            console.error("Error uploading file", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="mb-4 text-2xl">File Transfer</h2>
            <input type="file" onChange={handleFileChange} className="w-full p-2 mb-2 border rounded" />
            <button onClick={handleFileUpload} className="w-full p-2 text-white bg-blue-500 rounded">Upload</button>
            <div className="w-full h-4 mt-4 bg-gray-200 rounded-full">
                <div className="h-4 bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            {fileName && <p className="mt-4">File uploaded: {fileName}</p>}
        </div>
    );
};

export default FileTransfer;
