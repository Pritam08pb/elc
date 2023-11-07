import React from 'react';
import styles from '../styles/admin.module.css';

const admin = () => {
  return (
    <div className={styles.full}>
      <div className={styles.half}>
        <div className={styles.note}>
          
        <h2 className={styles.formTitle}>Upload Resource</h2>
          <form className={styles.body}>
            {/* upload-------- */}

            <div className={styles.formGroup}>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" className={styles.input} />
            </div>
        <div className={styles.semsub}>
            <div className={styles.formGroup}>
              <label htmlFor="semester">Sem:</label>
              <input type="text" id="semester" className={styles.inputSem} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject:</label>
              <input type="text" id="subject" className={styles.subinput} />
            </div>
          </div>
            <div className={styles.info}>
              <label htmlFor="info">Info:</label>
              <textarea id="info" className={styles.inputInfo} rows="2"></textarea>
            </div>

            <div >
            <label htmlFor="info">File:</label>
              <input type="file" id="file" className={styles.fileinput} />
            </div>

            <input type="submit" value="Upload" className={styles.upload} />
          </form>
        </div>
        <div className={styles.note}>
        </div>
      </div>
    </div>
  );
};

export default admin;
