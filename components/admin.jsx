import React, { useState, useEffect } from "react";
import styles from "../styles/admin.module.css";
import Loader from "./loader";
import { Background } from "@cloudinary/url-gen/qualifiers";

const Admin = ({ decodedToken }) => {
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
  const { userId, username, email, registrationNumber, profileUrl } =
    decodedToken || {};

  const [selectedSemester, setSelectedSemester] = useState("Semester");
  const [selectedSubject, setSelectedSubject] = useState("Subject");
  const [title, setTitle] = useState("");
  const [sem, setSem] = useState("");
  const [subject, setSubject] = useState("");
  const [info, setInfo] = useState("");
  const [file, setFile] = useState(null);

  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;
    setSelectedSemester(selectedSemester);
    setSelectedSubject(subjects[selectedSemester][0]);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);


  async function fetchNotes() {
    try {
      const response = await fetch("/api/getnotes");
      if (response.ok) {
        const data = await response.json();
        const userNotes = data.filter((note) => note.username === username);
        console.log(userNotes);
        setNotes(userNotes);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    // Fetch from server API
    setIsLoading(true);
    

    fetchNotes();
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
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
        const pdfdata = await response.json();
        console.log("Image uploaded successfully:", pdfdata.imageUrl);
        const data = {
          title,
          sem,
          subject,
          info,
          pdfUrl: pdfdata.secure_url,
          username: username,
          profileUrl: profileUrl,
          time: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }), // Add current timestamp in Indian timezone
        };
        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            setTitle("");
            setSelectedSemester("Semester");
            setInfo("");
            setFile(null);
            
          } else {
            console.error("Upload failed");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      fetchNotes();
      setIsLoading(false);
    }
  };
  const deleteNote = async (note) => {
    // Confirm deletion with the user
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) {
      // If the user cancels, return without deleting
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`/api/deletenote`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note }),
      });

      if (response.ok) {
        setNotes(notes.filter((n) => n.id !== note.id));
        fetchNotes();
        setIsLoading(false);
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.full}>
      {isLoading && <Loader />}
      <div className={styles.half}>
        <div className={styles.note}>
          <h2 className={styles.formTitle}>Upload Resource</h2>
          <form className={styles.body} onSubmit={handleUpload}>
            <div className={styles.formGroup}>
              <label className={styles.lbl} htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                id="title"
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <label className={styles.lbl} htmlFor="info">
              Info:
            </label>
            <textarea
              id="info"
              className={styles.inputInfo}
              rows="2"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            ></textarea>

            <div className={styles.semsub}>
              <div className={styles.formGroup}>
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
              </div>

              <div className={styles.formGroup}>
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

            <div>
              <label className={styles.lbl} htmlFor="pdf">
                File:
              </label>
              <input
                type="file"
                id="pdf"
                className={styles.fileinput}
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <input type="submit" value="Upload" className={styles.upload} />
          </form>
        </div>
        <div className={styles.note}></div>
      </div>

      <div className={styles.delitem2}>
        <p className={styles.box}>Semester</p>
        <br />
        <p className={styles.box}>Subject</p>
        <br />
        <p className={styles.box}>Title</p>
        <br />
        <div
          className={styles.box}
          style={{ backgroundColor: "black" }}
          href=""
        >
          Open
        </div>
        <br />
        <div className={styles.box} style={{ backgroundColor: "black" }}>
          Delete
        </div>
      </div>
      <div className={styles.low}>
        {notes.map((note, index) => (
          <div key={note.id}>
            <div className={styles.delitem}>
              <p className={styles.box}>{note.sem}</p>
              <br />
              <p className={styles.box}>{note.subject}</p>
              <br />
              <p className={styles.box}>{note.title}</p>
              <br />
              <a
                className={styles.box}
                style={{ backgroundColor: "black" }}
                href={note.pdfUrl}
              >
                View
              </a>
              <br />
              <div
                className={styles.box}
                style={{ backgroundColor: "black" }}
                onClick={() => deleteNote(note)}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
