import React, { useState } from 'react';
import { useSelector } from "react-redux";

const UploadProfileImage = ({ onUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const userId = useSelector((state) => state.global.userId);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    try {
      const response = await fetch('http://localhost:5001/general/image-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  userId, name: 'profile-pic', image }),
      });
      const data = await response.json();
      onUploadSuccess(); // Call the parent handler after a successful upload
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Preview" style={{ width: '100px', height: '100px' }} />}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadProfileImage;
