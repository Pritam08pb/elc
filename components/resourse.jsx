import React, { useState, useEffect } from "react";
import styles from "../styles/resourse.module.css";
import Loader from "../components/loader";

const resourse = () => {
  const [notes, setNotes] = useState([]);
  const [activeNotes, setActiveNotes] = useState([]);
  const [active, setActive] = useState(false);
  const [load, setload] = useState(false);
  useEffect(() => {
    // Fetch from server API
    setload(true);
    async function fetchNotes() {
      try {
        const response = await fetch("/api/getnotes");
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
          setload(false);
        } else {
          console.error("Failed to fetch notes");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchNotes();
  }, []);
  const handleMouseEnter = (index) => {
    const newActiveNotes = [...activeNotes];
    newActiveNotes[index] = true;
    setActiveNotes(newActiveNotes);
  };

  const handleMouseLeave = (index) => {
    const newActiveNotes = [...activeNotes];
    newActiveNotes[index] = false;
    setActiveNotes(newActiveNotes);
  };
  return (
    <div>
      {load && <Loader />}
      <div className={styles.nav}>
        <div className={styles.dropdown}>
          <button className={styles.button}>
            Semester
            <img src="/drop.png" width={"12px"} alt="" />
          </button>
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
          <button className={styles.button}>
            Subject <img src="/drop.png" width={"12px"} alt="" />
          </button>
          <div className={styles.content}>
            <a href="#">Networking</a>
            <a href="#">DAA</a>
            <a href="#">MPMC</a>
            <a href="#">AI</a>
            <a href="#">OOPs</a>
          </div>
        </div>
      </div>
      <div
        className={styles.full}
        
      >
        <div className={styles.inner} onMouseEnter={() => {
          const newActiveNotes = activeNotes.map(() => false);
          setActiveNotes(newActiveNotes);
        }}>
          {notes.map((note, index) => (
            <a
              key={note.id}
              className={styles.note}
              href={note.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className={styles.cover}>
                <div
                  className={
                    activeNotes[index] ? styles.dtl : styles.invisible2
                  }
                >
                  <div>
                    <h3 className={styles.tag}>Subject: {note.subject}</h3>
                    <p className={styles.tag}>Semester: {note.sem}</p>
                    <p className={styles.tag1}>{note.time}</p>
                  </div>

                  <div className={styles.profile}>
                    <img
                      className={styles.profileimg}
                      src={note.profileUrl}
                      alt=""
                    />
                    {note.username}
                  </div>
                  <div className={styles.info}>{note.info}</div>
                </div>
                <embed
                  className={
                    activeNotes[index] ? styles.invisible : styles.embed
                  }
                  src={note.pdfUrl}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              </div>
              <h3>{note.title}</h3>
            </a>
          ))}

          {/* <p>Semester: {note.sem}</p>
              <p>Subject: {note.subject}</p>
              <p>Info: {note.info}</p>
              <p>Uploaded By: {note.username}</p> */}
        </div>
      </div>
    </div>
  );
};

export default resourse;
