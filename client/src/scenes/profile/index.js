import React, { useEffect, useState } from "react";
import UploadProfileImage from "../../components/UploadProfileImage";
import { useSelector } from "react-redux";
import Container from '@mui/material/Container';

const Profile = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [dbImage, setDbImage] = useState("");
  const [imageExist, setImageExist] = useState(false)
  const userId = useSelector((state) => state.global.userId);

  // Fetch the profile image initially
  const fetchProfileImage = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/general/image/${userId}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageExist(true);
      setImageSrc(url);
      setDbImage(url);
    } catch (err) {
      console.error("Failed to fetch image", err);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  // Handler to be called after successful image upload
  const handleImageUploadSuccess = () => {
    fetchProfileImage();
  };

  const handleImageSelect = (image) => {
    if(image) {
      setImageSrc(image);
    } else {
      setImageSrc(dbImage);
    }
  }

  return ( 
    <Container maxWidth="sm">
      <h1>Profile Page</h1>
      {imageSrc ? (
        <img style={{borderRadius: '50%'}} width={500} height={500} src={imageSrc} alt="Profile" />
      ) : (
        <p>Loading image...</p>
      )}

      <UploadProfileImage imageExist={imageExist} onImageSelect={handleImageSelect} onUploadSuccess={handleImageUploadSuccess} />
    </Container>
  );
};

export default Profile;
