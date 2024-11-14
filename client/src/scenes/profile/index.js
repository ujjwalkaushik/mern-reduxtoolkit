import React, { useEffect, useState } from "react";
import UploadProfileImage from "../../components/UploadProfileImage";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { useProfileImage } from "context/ProfileImageContext";

const Profile = () => {
  const { profileImage, fetchProfilesImage } =
    useProfileImage();

  const [selectedImage, setSelectedImage] = useState(null); // Local state for temporary image
  const [isModified, setIsModified] = useState(false); // Track if an image is selected

  // Handler to be called after successful image upload
  const handleImageUploadSuccess = async () => {
    await fetchProfilesImage();
    setSelectedImage(null); // Clear local selected image
    setIsModified(false);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setIsModified(true);
  };

  const handleImageDelete = () => {
    setSelectedImage(null); // Reset to show original context image
    setIsModified(false);
  };

  return (
    <Container maxWidth="sm">
      <h1>Profile Page</h1>
      <img
        style={{ borderRadius: "50%" }}
        width={500}
        height={500}
        src={selectedImage || profileImage}
        alt="Profile"
      />

      <UploadProfileImage
        onImageDelete={handleImageDelete}
        onImageSelect={handleImageSelect}
        onUploadSuccess={handleImageUploadSuccess}
      />
    </Container>
  );
};

export default Profile;
