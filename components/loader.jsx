// Loader.jsx

import React from "react";
import Styles from "../styles/loader.module.css";

const Loader = () => {
  return (
    <div className={Styles.loaderOverlay}>
      <div className={Styles.loader}></div>
    </div>
  );
};

export default Loader;
 