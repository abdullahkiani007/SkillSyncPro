import React, { useState } from 'react';


const Upload = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
     
      
      // Save the URL in your database by calling another API endpoint
      // Example: axios.post('/save-url', { url: response.data.url });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {url && <p>File uploaded: <a href={url} target="_blank" rel="noopener noreferrer">View PDF</a></p>}
    </div>
  );
};

export default Upload;
