import React, { useEffect, useState } from "react";
import styles from "../styles/profile.module.css";

const profile = ({ decodedToken }) => {
  const { userId, username, email, registrationNumber, profileUrl } =
    decodedToken || {};
  const [admin, setAdmin] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const handleclick = () => {};

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

  return (
    <>
      <div className={styles.full}>
        <div className={styles.inside}>
          <div className={styles.object}></div>
          <div className={styles.profileimage}>
            <img className={styles.img} src={profileImage} alt="" />
          </div>
          <div className={styles.detail}>
            <h1>{username}</h1> <div className={styles.b}></div>
            <div>
              <p className={styles.p}>{admin ? "User" : "regd. No."}</p>
              <hr color="#6C4C9A" />
              <h2>{admin ? "Admin" : registrationNumber}</h2>
            </div>
            <div className={styles.b}></div>
            <div>
              <p className={styles.p}>email Id</p>
              <hr color="#6C4C9A" />
              <h2>{email}</h2>
            </div>
          </div>
        </div>
        <button className={styles['ui-btn']} onClick={handleclick}>
          <span>Change Password</span>
        </button>
      </div>
    </>
  );
};

export default profile;
