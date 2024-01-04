import React, { useEffect, useState } from 'react'
import styles from '../styles/navigation.module.css'
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../components/loader';


const navigation = ({ onNavigationClick, activeComponent, decodedToken }) => {
  const { userId, username, email, registrationNumber } = decodedToken || {};

  const [logoutRender, setlogoutRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (logoutRender) {
      setLoading(true);
      localStorage.removeItem('token');
      
      setTimeout(() => {
        router.push('/');
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
      
    }
  }, [logoutRender]);

  const logout = () => {
    setlogoutRender(true);
  };

  return (
    <div className={styles.nav}>
        <div className={styles.navprofile}>
        <a className={styles.navphoto} href=""><img src='' alt="" /></a>
        <div className={styles.navname}>{username}</div>
        <div className={styles.navregistration}>{registrationNumber}</div>
        </div>
        <div className={styles.navline}></div>
        
        <a
        href="#"
        className={
          activeComponent === 'Home'
            ? `${styles.navsub} ${styles.notesButtonActive}`
            : styles.navsub
        }
        onClick={() => onNavigationClick('Home')}
      >
        Home
      </a>
 
        <div className={styles.navline}></div>
        <a
        href="#"
        className={
          activeComponent === 'Resource'
            ? `${styles.navsub} ${styles.notesButtonActive}`
            : styles.navsub
        }
        onClick={() => onNavigationClick('Resource')}
      >
        Notes
      </a>
        

        <div className={styles.navline}></div>
        <a
        href="#"
        className={
          activeComponent === 'Forum'
            ? `${styles.navsub} ${styles.notesButtonActive}`
            : styles.navsub
        }
        onClick={() => onNavigationClick('Forum')}
      >
        Forum
      </a>
        
        <div className={styles.navline}></div>
        <a
        href="#"
        className={
          activeComponent === 'Admin'
            ? `${styles.navsub} ${styles.notesButtonActive}`
            : styles.navsub
        }
        onClick={() => onNavigationClick('Admin')}
      >
        Assignment
      </a>


        <div className={styles.navline}></div>
        <div className={styles.navspacer}></div>
        <button className={styles.navlogout} onClick={logout}><span> {loading && <Loader/>}Log Out</span> <img src="/logout.svg" alt="" /></button>
    </div>
  )
}

export default navigation