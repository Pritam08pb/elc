import React from 'react'; // Import React
import styles from '../styles/login.module.css'

const Login = () => {
  return (
    <div>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button>Log In</button>
        <div className={styles.social}>
          <div className={styles.go}>
            <i className={styles.fab}></i> Google
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
