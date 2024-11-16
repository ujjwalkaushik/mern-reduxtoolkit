import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProfileImageContext = createContext();

export const useProfileImage = () => {
  return useContext(ProfileImageContext);
};

export const ProfileImageProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const userId = useSelector((state) => state.global.userId);

  // Function to fetch profile image from API
  const fetchProfilesImage = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}general/image/${userId}`
      );
      if (response.ok) {
        const blob = await response.blob();
        setProfileImage(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  // Fetch profile image once when the component mounts
  useEffect(() => {
    fetchProfilesImage();
  }, []);

  return (
    <ProfileImageContext.Provider
      value={{ profileImage, setProfileImage, fetchProfilesImage }}
    >
      {children}
    </ProfileImageContext.Provider>
  );
};
