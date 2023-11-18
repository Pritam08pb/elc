import React from 'react'
import styles from '../styles/navigation.module.css'
const navigation = ({ onNavigationClick, activeComponent }) => {
  return (
    <div className={styles.nav}>
        <div className={styles.navprofile}>
        <a className={styles.navphoto} href=""><img src='' alt="" /></a>
        <div className={styles.navname}>Subham Nayak</div>
        <div className={styles.navregistration}>2001105210</div>
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
        <button className={styles.navlogout}><span>Log Out</span> <img src="/logout.svg" alt="" /></button>
    </div>
  )
}

export default navigation