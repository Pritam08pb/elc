import React from 'react'
import styles from '../styles/navigation.module.css'
const navigation = () => {
  return (
    <div className={styles.nav}>
        <div className={styles.navprofile}>
        <a className={styles.navphoto} href=""></a>
        <div className={styles.navname}>Subham Nayak</div>
        <div className={styles.navregistration}>2001105210</div>
        </div>
        <div className={styles.navline}></div>
        <a href="#" className={styles.navsub}>Home</a>
        <div className={styles.navline}></div>
        <a href="#" className={styles.navsub}>Notes</a>
        <div className={styles.navline}></div>
        <a href="#" className={styles.navsub}>Forum</a>
        <div className={styles.navline}></div>
        <a href="#" className={styles.navsub}>Assignment</a>
        <div className={styles.navline}></div>
        <div className={styles.navspacer}></div>
        <button className={styles.navlogout}>Log Out</button>
    </div>
  )
}

export default navigation