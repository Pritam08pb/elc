import React, { useEffect, useState } from "react";
import styles from "../styles/navigation.module.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/loader";

const navigation = ({ onNavigationClick, activeComponent, decodedToken }) => {
  const { userId, username, email, registrationNumber, profileUrl } =
    decodedToken || {};
  const [logoutRender, setlogoutRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [card, setcard] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (registrationNumber === "0000000000") {
      setAdmin(true);
      console.log(admin);
      console.log(registrationNumber);
    }
  });
  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    setProfileImage(storedProfileImage || profileUrl);
  });
  const router = useRouter();
  useEffect(() => {
    if (logoutRender) {
      setLoading(true);
      localStorage.removeItem("token");

      setTimeout(() => {
        router.push("/");
        setLoading(false);
        toast.success("Successfully logged out.", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1800);
      localStorage.removeItem("profileImage");
    }
  }, [logoutRender]);

  const logout = () => {
    setlogoutRender(true);
  };

  // In your frontend component
  const handleProfileChange = async (event) => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "myUpload");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/doirocccb/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data.imageUrl);
        localStorage.setItem("profileImage", data.secure_url);
        setcard(false);

        let apiRoute = "/api/updateUserProfile";
        if (admin) {
          apiRoute = "/api/updateAdminProfile";
        }

        const updateResponse = await fetch(apiRoute, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId, // Assuming you have userId available in decodedToken
            profileUrl: data.secure_url,
          }),
        });

        if (updateResponse.ok) {
          console.log("User profileUrl updated successfully.");
        } else {
          console.error("Failed to update user profileUrl.");
        }
        //......................
        setLoading(false);
        setProfileImage(data.secure_url);
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className={styles.nav}>
      {loading && <Loader />}
      <div className={styles.navprofile}>
        <button
          onClick={() => {
            setcard(true);
          }}
          className={styles.navphoto}
          href=""
        >
          <img className={styles.insideImg} src={profileImage} alt="img" />
        </button>

        {card && (
          <div className={styles.card}>
            <button
              className={styles.x}
              onClick={() => {
                setcard(false);
              }}
            >
              X
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setSelectedFile(event.target.files[0]);
              }}
            />
            <button
              className={styles.navphotoInput}
              onClick={handleProfileChange}
            >
              Upload
            </button>
          </div>
        )}
        <div className={styles.navname}>{username}</div>
        <div className={styles.navregistration}>
          {admin ? "Admin" : registrationNumber}
        </div>
      </div>
      <div className={styles.navline}></div>
      <a
        href="#"
        className={
          activeComponent === "Home"
            ? `${styles.navsub} ${styles.notesButtonActive}`
            : styles.navsub
        }
        onClick={() => onNavigationClick("Home")}
      >
        Profile
      </a>

      <div className={styles.navline}></div>
      <a
        href="#"
        className={
          activeComponent === "Resource"
            ? `${styles.navsub} ${styles.notesButtonActive}`
            : styles.navsub
        }
        onClick={() => onNavigationClick("Resource")}
      >
        Notes
      </a>

      <div className={styles.navline}></div>
      <a
        href="#"
        className={
          activeComponent === "Forum"
            ? `${styles.navsub} ${styles.notesButtonActive}`
            : styles.navsub
        }
        onClick={() => onNavigationClick("Forum")}
      >
        Forum
      </a>

      <div className={styles.navline}></div>
      {admin ? (
        <a
          href="#"
          className={
            activeComponent === "Admin"
              ? `${styles.navsub} ${styles.notesButtonActive}`
              : styles.navsub
          }
          onClick={() => onNavigationClick("Admin")}
        >
          Admin
        </a>
      ) : (
        <a
          href="#"
          className={
            activeComponent === "Admin"
              ? `${styles.navsub} ${styles.notesButtonActive}`
              : styles.navsub
          }
          onClick={() => onNavigationClick("Assn")}
        >
          Assignment
        </a>
      )}

      <div className={styles.navline}></div>
      <div className={styles.navspacer}></div>
      <button className={styles.btn} onClick={logout}>
        <span>Log Out</span>
        <img src="/logout.svg" alt="" />
      </button>
    </div>
  );
};

export default navigation;
