import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userProfileData, setUserProfileData] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    const userDataCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="));

    const storedData = JSON.parse(localStorage.getItem("userProfileData"));

    if (userDataCookie) {
      const userData = JSON.parse(
        decodeURIComponent(userDataCookie.split("=")[1])
      );
      setUserProfileData((prevData) => ({ ...prevData, ...userData }));
    } else if (storedData) {
      setUserProfileData((prevData) => ({ ...prevData, ...storedData }));
    }

    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setUserProfileData((prevData) => ({
        ...prevData,
        profileImage: storedImage,
      }));
    }
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem("userProfileData", JSON.stringify(userProfileData));
    localStorage.setItem("profileImage", userProfileData.profileImage);
    toast.success("Profile saved!");
  };

  const handleLogOut = () => {
    localStorage.removeItem("userProfileData");
    document.cookie =
      "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageBase64 = await convertImageToBase64(file);
        setUserProfileData((prevData) => ({
          ...prevData,
          profileImage: imageBase64,
        }));
        toast.success("Profile picture updated!");
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const handleSpanClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const inputFile = useRef(null);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="my-profile-container">
        {userProfileData.name ? (
          <>
            <h1>Your Account</h1>
            <div className="profile-details">
              <div className="image-container">
                {userProfileData.profileImage ? (
                  <img
                    src={userProfileData.profileImage}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  <div className="default-profile">
                    <span role="img" aria-label="User Icon">
                      👤
                    </span>
                  </div>
                )}
                {/* <div
                style={{ border: "2px solid red" }}
                onClick={handleSpanClick}
                className="edit-icon"
              >
                <FontAwesomeIcon icon={faEdit} />
              </div> */}
              </div>

              <input
                type="file"
                accept="image/*"
                id="profileImageInput"
                ref={inputFile}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <span
                style={{
                  marginBottom: "5%",
                  marginTop: "5%",
                  cursor: "pointer",
                }}
                onClick={handleSpanClick}
              >
                Change Profile Picture ?
              </span>

              <div className="user-info">
                <h2>{userProfileData.name || "Guest"}</h2>
                <p>Email: {userProfileData.email}</p>
              </div>
              <div className="btnss">
                <button onClick={handleSaveProfile}>Save Profile</button>
                <button onClick={handleLogOut}>Log Out</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="not-logged-in">Please login to view your profile.</p>
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login/Signup
            </button>
            <button className="guest-btn" onClick={() => navigate("/")}>
              Continue as Guest
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
