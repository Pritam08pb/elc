import React, { useState, useEffect } from 'react'; 
import styles from '../styles/resourse.module.css'



const resourse = () => {
  const [notes, setNotes] = useState([]);
  // useEffect(() => {
  //   // Fetch from server API
  //   async function fetchNotes() {
  //     try {
  //       const response = await fetch('/api/get-notes'); 
  //       if (response.ok) {
  //         const data = await response.json();
  //         setNotes(data.notes);
  //       } else {
  //         console.error('Failed to fetch notes');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }

  //   fetchNotes();
  // }, []);



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
        {/* {notes.map((note) => (
          <a key={note.id} className={styles.note} href={note.pdfUrl}>
            <div className={styles.cover}></div>
            <h3>{note.title}</h3>
          </a>
        ))} */}
        <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>
          <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>
          <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>

          <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>
          <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a><a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>
          <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>
          <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>
          <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>
          <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>
          <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>
          <a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a><a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a><a  className={styles.note} >
            <div className={styles.cover}></div>
            <h3>fb</h3>
          </a>
            
            
        </div>
        </div>
    </div>
  )
}

export default resourse