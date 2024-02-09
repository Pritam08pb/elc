import React, { useState, useEffect } from "react";
import styles from "../styles/resourse.module.css";
import Loader from "../components/loader";

const resourse = () => {
  const [notes, setNotes] = useState([]);
  const [activeNotes, setActiveNotes] = useState([]);
  const [active, setActive] = useState(false);
  const [load, setload] = useState(false);
  const [profileUrls, setProfileUrls] = useState({});

  const [selectedSemester, setSelectedSemester] = useState("Semester");
  const [selectedSubject, setSelectedSubject] = useState("Subject");
  const [sem, setSem] = useState("");
  const [subject, setSubject] = useState("");
  const semesters = [
    "Semester",
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
  ];

  const subjects = {
    Semester: ["Subject"],
    First: ["Subject", "Math", "Mechanical", "Electrical", "C++", "Physics"],
    Second: ["Subject", "DSUC", "OOPS java"],
    Third: ["Subject", "SubjectA", "SubjectB", "SubjectC"],
    Fourth: ["Subject", "SubjectX", "SubjectY", "SubjectZ"],
    Fifth: ["Subject", "SubjectM", "SubjectN", "SubjectO"],
    Sixth: ["Subject", "SubjectP", "SubjectQ", "SubjectR"],
    Seventh: ["Subject", "SubjectL", "SubjectK", "SubjectJ"],
    Eighth: ["Subject", "SubjectD", "SubjectE", "SubjectF"],
  };
  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;
    setSelectedSemester(selectedSemester);
    setSelectedSubject(subjects[selectedSemester][0]);
  };
  async function fetchNotes() {
    try {
      const response = await fetch("/api/getnotes");
      if (response.ok) {
        const data = await response.json();
        const filteredNotes = data.filter(note => {
          return (
            (selectedSemester === "Semester" || note.sem === selectedSemester) &&
            (selectedSubject === "Subject" || note.subject === selectedSubject)
          );
        });
        setNotes(filteredNotes);
        setload(false);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  useEffect(() => {
    // Fetch from server API
    setload(true);
    fetchNotes();
  }, [selectedSemester, selectedSubject]);

  useEffect(() => {
    const fetchProfileUrls = async () => {
      const urls = {};
      for (const note of notes) {
        const profileUrl = await fetchUserProfileUrl(note.senderid);
        urls[note.senderid] = profileUrl;
      }
      setProfileUrls(urls);
    };

    fetchProfileUrls();
  }, [notes]);

  useEffect(() => {
    // Fetch from server API
    setload(true);

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
  const fetchUserProfileUrl = async (senderid) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "senderid": senderid })
      };

      const response = await fetch('/api/getdata', requestOptions);

      if (response.ok) {
        const userData = await response.json();
        return userData.profileUrl; // Assuming profileUrl is returned from the backend
      } else {
        console.error('Failed to fetch user profile');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
};

  return (
    <div>
      {load && <Loader />}
      <div className={styles.nav}>
        <div className={styles.dropdown}>
          <select
            id="semester"
            className={styles.inputSem}
            value={selectedSemester}
            onChange={(e) => {
              handleSemesterChange(e);
              setSem(e.target.value);
            }}
          >
            {semesters.map((semester, index) => (
              <option key={index} value={semester}>
                {semester}
              </option>
            ))}
          </select>
          <select
            id="subject"
            className={styles.subinput}
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSubject(e.target.value);
            }}
          >
            {subjects[selectedSemester].map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.full}>
        <div
          className={styles.inner}
          onMouseEnter={() => {
            const newActiveNotes = activeNotes.map(() => false);
            setActiveNotes(newActiveNotes);
          }}
        >
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
                      src={profileUrls[note.senderid]}
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
