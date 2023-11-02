import React from 'react'
import styles from '../styles/resourse.module.css'

const resourse = () => {
  return (
    <div>
    <div className={styles.nav}>
        <div className={styles.dropdown}>
        <button className={styles.button}>Semester<img  src="/drop.png" width={"12px"} alt="" /></button>
        <div className={styles.content}>
           <a href="#">First</a>
           <a href="#">Second</a>
           <a href="#">Third</a>
           <a href="#">Fourth</a>
           <a href="#">Fifth</a>
           <a href="#">Sixth</a>
           <a href="#">Seventh</a>
           <a href="#">Eighth</a>
         </div>
    </div>
    <div className={styles.dropdown}>
        <button className={styles.button}>Subject <img  src="/drop.png" width={"12px"} alt="" /></button>
        <div className={styles.content}>
           <a href="#">Networking</a>
           <a href="#">DAA</a>
           <a href="#">MPMC</a>
           <a href="#">AI</a>
           <a href="#">OOPs</a>
           
         </div>
    </div>
            </div>
        <div className={styles.full}>
        <div className={styles.inner}>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            <a className={styles.note} href=""><div className={styles.cover}></div><h3>Book Name</h3></a>
            
            
            
        </div>
        </div>
    </div>
  )
}

export default resourse