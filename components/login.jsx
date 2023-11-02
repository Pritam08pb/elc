import React from 'react'
import styles from "../styles/login.module.css"
function login() {
  return (
    <div className={styles.body}>
       <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
    <form id={styles.form}>
        <h3>Login Here</h3>

        <label id={styles.label} htmlFor="username">Username</label>
        <input className={styles.input} type="text" placeholder="Email or Phone" id="username" />

        <label id={styles.label} htmlFor="password">Password</label>
        <input className={styles.input} type="password" placeholder="Password" id="password" />
        <br />   
        <a href="">Forgot Password ?</a>

        <button className={styles.button}>Log In</button>
        
        
    </form>
    </div>
  )
}

export default login
