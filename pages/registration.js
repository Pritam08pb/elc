import React from 'react';
import styles from '../styles/registration.module.css';

function Registration() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1>Registration</h1>
        <div className={styles.formfill}>
          <div >
          <form className={styles.registrationForm}>
             Full Name: <input type="text" className={styles.input} /><br />
             Email: <input type="email" className={styles.input} /><br />
             Password: <input type="password" className={styles.input} /><br />
           </form>
          </div>
          <div>
          <form className={styles.registrationForm}>
             Regd no.: <input type="text" className={styles.input} pattern="[0-9]+" title="Please enter only numeric characters"/><br />
             Semester: <input type="number" className={styles.input} min="1" max="8" /><br />
             Confirm Password: <input type="password" className={styles.input} /><br />
           </form>
          </div>
        </div>
        <div>
            <button type="submit" className={styles.submitButton}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Registration;