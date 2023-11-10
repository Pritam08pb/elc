import React, { useState, useEffect } from "react";
import styles from "../styles/admin.module.css";

const Admin = () => {
  const semesters = [
    'Semester', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth'
  ];

  const subjects = {
    Semester: ['Subject'],
    First: ['Subject', 'Math', 'Mechanical', 'Electrical', 'C++', 'Physics'],
    Second: ['Subject', 'DSUC', 'OOPS java'],
    Third: ['Subject', 'SubjectA', 'SubjectB', 'SubjectC'],
    Fourth: ['Subject', 'SubjectX', 'SubjectY', 'SubjectZ'],
    Fifth: ['Subject', 'SubjectM', 'SubjectN', 'SubjectO'],
    Sixth: ['Subject', 'SubjectP', 'SubjectQ', 'SubjectR'],
    Seventh: ['Subject', 'SubjectL', 'SubjectK', 'SubjectJ'],
    Eighth: ['Subject', 'SubjectD', 'SubjectE', 'SubjectF'],
  };

  const [selectedSemester, setSelectedSemester] = useState('Semester');
  const [selectedSubject, setSelectedSubject] = useState('Subject');
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

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = {
      title,
      sem,
      subject,
      info,
      pdfUrl: "this is pdf url",
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
  };

  return (
    <div className={styles.full}>
      <div className={styles.half}>
        <div className={styles.note}>
          <h2 className={styles.formTitle}>Upload Resource</h2>
          <form className={styles.body} onSubmit={handleUpload}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <label htmlFor="info">Info:</label>
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
                    setSubject(e.target.value);}}
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
              <label htmlFor="pdf">File:</label>
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
    </div>
  );
};

export default Admin;
