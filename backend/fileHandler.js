const fs = require('fs');
const path = require('path');

const handleFileUpload = (data, socket) => {
  const { fileName, fileBuffer } = data;
  const uploadsDir = path.join(__dirname, 'uploads');

  // Ensure the 'uploads' directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const filePath = path.join(uploadsDir, fileName);

  // Convert buffer to a Buffer instance if necessary
  const buffer = Buffer.from(fileBuffer);

  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error('File write error:', err);
      socket.emit('file-upload-status', { status: 'error', message: 'File upload failed' });
    } else {
      console.log('File uploaded successfully');
      socket.emit('file-upload-status', { status: 'success', message: 'File uploaded successfully' });
    }
  });
};

module.exports = { handleFileUpload };