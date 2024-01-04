// Switch.js

import React from 'react';
import styles from '../styles/switch.module.css'; // Import the provided CSS

const Switch = ({ isChecked, onChange }) => {
  return (
    <div className={styles['checkbox-wrapper-35']}>
      <input
        value="private"
        name="switch"
        id="switch"
        type="checkbox"
        className={styles.switch}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor="switch" className={styles.label}>
        <span className={styles['switch-x-text']}>For </span>
        <span className={styles['switch-x-toggletext']}>
          <span className={styles['switch-x-unchecked']}>
            <span className={styles['switch-x-hiddenlabel']}>Unchecked: </span>Student
          </span>
          <span className={styles['switch-x-checked']}>
            <span className={styles['switch-x-hiddenlabel']}>Checked: </span>Faculty
          </span>
        </span>
      </label>
    </div>
  );
};

export default Switch;
