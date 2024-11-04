import React, { useEffect, useState } from "react";
import UploadProfileImage from "../../components/UploadProfileImage";
import { useSelector } from "react-redux";

const Profile = () => {
  const [imageSrc, setImageSrc] = useState("");
  const userId = useSelector((state) => state.global.userId);

  // Fetch the profile image initially
  const fetchProfileImage = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/general/image/${userId}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
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

  return (
    <div>
      <h1>Profile Page</h1>
      {imageSrc ? (
        <img src={imageSrc} alt="Profile" />
      ) : (
        <p>Loading image...</p>
      )}

      <UploadProfileImage onUploadSuccess={handleImageUploadSuccess} />
    </div>
  );
};

export default Profile;
