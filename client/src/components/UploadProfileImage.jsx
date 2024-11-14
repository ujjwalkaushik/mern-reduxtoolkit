import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { toast } from 'react-toastify';

const UploadProfileImage = ({ onUploadSuccess, onImageSelect, onImageDelete }) => {
  const [image, setImage] = useState(null);
  const userId = useSelector((state) => state.global.userId);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // base64 string
      onImageSelect(reader.result);
    };
    reader.readAsDataURL(file);
    
  };

  const handleUpload = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/general/image-upload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, name: "profile-pic", image }),
        }
      );
      const data = await response.json();
      toast.success('Profile Picture Changed successful!');
      onUploadSuccess(); // Call the parent handler after a successful upload
      setImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDeleteImage = () => {
    onImageDelete();
    setImage(null);
  }

  return (
    <div style={{display: "flex",
      justifyContent:"center",
      alignContent: "center", gap: "1rem", marginTop: "1rem"}}>
        {!image && (
          <Button variant="contained" component="label">
          Change Profile Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </Button>
        )}

        {(image) ? (
          <>
            <Button variant="contained" disabled={!image} onClick={handleUpload}>
              Save
            </Button>
            <Button variant="contained" disabled={!image} onClick={handleDeleteImage}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            
          </>
        )}
    </div>
  );
};

export default UploadProfileImage;
