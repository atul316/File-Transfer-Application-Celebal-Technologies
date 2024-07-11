import React, { useState } from 'react';
import socket from '../socket';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const fileBuffer = new Uint8Array(reader.result);
      socket.emit('file-upload', { fileName: file.name, fileBuffer: fileBuffer });
    };
    reader.readAsArrayBuffer(file);

    socket.on('file-upload-status', (data) => {
      setUploadStatus(data.message);
    });
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;