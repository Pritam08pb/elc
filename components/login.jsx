import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import Loader from "../components/loader";
import Switch from "../components/switch";
import Image from "next/image";
import hide1 from "../public/hide1.svg";
import show1 from "../public/show1.svg";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel"; // Import the carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles

// ... (imports and other code)

const Login = () => {
  const router = useRouter();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [togglePassword, setTogglePassword] = useState(0);

  const toggleChange = () => {
    setIsChecked(!isChecked);
  };

  async function submit(event) {
    event.preventDefault();
    if (!registrationNumber) {
      // Display a toast for blank registration number
      toast.warn("Registration number cannot be blank.", {
        position: "top-right",
        theme: "light",
      });
      return;
    }
    if (!password) {
      // Display a toast for blank password
      toast.warn("Password cannot be blank.", {
        position: "top-right",
        theme: "light",
      });
      return;
    }

    try {
      setLoading(true); // Set loading to true

      const payload = {
        registrationNumber,
        password,
      };
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      };

      const response = await fetch("/api/login", options);
      const json = await response.json();

      if (response.status === 401) {
        if (json.message === "Invalid credentials") {
          // Display a toast for incorrect credentials
          toast.error("Incorrect credentials. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return; // Stop further execution
        }
      }

      const { token, user } = json;
      localStorage.setItem("token", token);

      // Redirect or perform any action upon successful login
      router.push("/main");
    } catch (error) {
      console.error("Error:", error);

      // Display a generic toast for other errors
      toast.error("Failed to log in. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false); // Set loading to false after the operation is complete
    }
  }

  // adminnn-----------------------------

  async function adminSubmit(event) {
    event.preventDefault();
    // Add admin login logic here
    try {
      // Example admin login logic
      setLoading(true); // Set loading to true

      const payload = {
        email: registrationNumber, // Assuming email is used for admin login
        password,
      };
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      };

      const response = await fetch("/api/admin/login", options);
      const json = await response.json();

      if (response.status === 401) {
        if (json.message === "Invalid credentials") {
          // Display a toast for incorrect credentials
          toast.error("Incorrect credentials. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return; // Stop further execution
        }
      }

      const { token, user } = json;
      localStorage.setItem("token", token);

      // Redirect or perform any action upon successful admin login
      router.push("/admin-dashboard");
    } catch (error) {
      console.error("Error:", error);

      // Display a generic toast for other errors
      toast.error("Failed to log in. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false); // Set loading to false after the operation is complete
    }
  }

  return (
    <>
    




      <div className={Styles.body}>
        <div className={Styles.dark}></div>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
      >
        {/* Add your carousel slides here */}
        <div className={Styles.coros}>
          <img src="/back1.jpg" alt="Background 1" />
        </div>
        <div className={Styles.coros}>
          <img src="/back2.jpg" alt="Background 2" />
        </div>
        <div className={Styles.coros}>
          <img src="/back3.jpg" alt="Background 2" />
        </div>
        
        {/* Add more slides as needed */}
      </Carousel>
        <img id={Styles.im} src="./elclogo.png" alt="" />
        <form id={Styles.form}>
          <div className={Styles.imgparent}>
            <img className={Styles.img1} src="./login.png" alt="" />
            <h2>Log In</h2>
          </div>
          <br />
          <Switch isChecked={isChecked} onChange={toggleChange} />
          <br />
          <br />
          {isChecked ? (
            <>
              {/* Email ID Label */}
              <label id={Styles.label} htmlFor="email">
                Email ID
              </label>
              {/* Email Input */}
              <input
                id={Styles.input1}
                type="email"
                required={true}
                value={registrationNumber}
                onChange={(event) => setRegistrationNumber(event.target.value)}
              />
            </>
          ) : (
            <>
              {/* Registration Number Label */}
              <label id={Styles.label} htmlFor="rgd">
                Registration Number
              </label>
              {/* Registration Number Input */}
              <input
                id={Styles.input1}
                type="text"
                required={true}
                value={registrationNumber}
                onChange={(event) => setRegistrationNumber(event.target.value)}
              />
            </>
          )}
          <label id={Styles.label} htmlFor="rgd">
            Password
          </label>
          <div id={Styles.elem}>
            <input
              id={Styles.input}
              type={togglePassword ? "text" : "password"}
              required={true}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {togglePassword ? (
              <Image
                className={Styles.icon}
                onClick={() => setTogglePassword(!togglePassword)}
                src={show1}
                alt=""
              />
            ) : (
              <Image
                className={Styles.icon}
                onClick={() => setTogglePassword(!togglePassword)}
                src={hide1}
                alt=""
              />
            )}
          </div>

          <a className={Styles.forgot} href="">
            Forgot Password?
          </a>
          <div className={Styles.btns}>
            {isChecked ? (
              // Admin Login Button
              <button
                className={Styles.button}
                onClick={(event) => adminSubmit(event)}
              >
                Login
              </button>
            ) : (
              // Normal Login Button
              <button
                className={Styles.button}
                onClick={(event) => submit(event)}
              >
                Login
              </button>
            )}
            <Link href="/" className={Styles.signupbutton}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default Login;
