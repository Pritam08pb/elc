import React, { useEffect, useState } from "react";
import { students, faculties } from "../dummy";
import Otp from "./otp";
import { useMutation } from "react-query";
import { newUser, sendOtp, verifyOtp, newAdmin } from "../lib/helper";
import Image from "next/image";
import Styles from "../styles/register.module.css";
import user from "../public/user.svg";
import hide from "../public/hide.svg";
import show from "../public/show.svg";
import Loader from "./loader";
import Switch from "../components/switch";
import { Carousel } from "react-responsive-carousel"; // Import the carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStyleRegistry } from "styled-jsx";

function Register() {
  const router = useRouter();

  const [registrationNumber, setRegistrationNumber] = useState('');
  const [errMessage, setErrorMessage] = useState('');
  const [idx, setIdx] = useState(-1);
  const [steps, setSteps] = useState(1);
  const [togglePassword, setTogglePassword] = useState(0);
  const [togglePasswordConfirm, setTogglePasswordConfirm] = useState(0);
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [email, setemail] = useState('');
  const [load, setload] = useState(false);

  const toggleChange = () => {
    setIsChecked(!isChecked);
  };

  const setError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000); // Clear error message after 5 seconds
  };

  function adminSubmit(event) {
    event.preventDefault();
    const flength = faculties.length;
    var index = -1;

    //check validation of registration number
    for (var i = 0; i < flength; i++) {
      if (email == faculties[i].email) {
        index = i;
        setIdx(i);
        break;
      }
    }
    if (index == -1) setError("Invalid registration number");
    else adminOtpSend(event, index);
  }

  // to submit registration number and send otp
  function submit(event) {
    event.preventDefault();
    const length = students.length;
    var index = -1;

    //check validation of registration number
    for (var i = 0; i < length; i++) {
      if (registrationNumber == students[i].registrationNumber) {
        index = i;
        setIdx(i);
        break;
      }
    }

    //if invalid
    if (index == -1) setError("Invalid registration number");
    else otpSend(event, index);
  }

  // to activate focus on input by clicking on label
  function clickHandler(event) {
    event.target.previousSibling.focus();
  }

  const mutationOtp = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      console.log("data inserted");
    },
  });

  const mutationOtpVerify = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      console.log("otp sent for verification");
    },
  });

  const mutationUser = useMutation({
    mutationFn: newUser,
    onSuccess: () => {
      console.log("Data sent for new user");
    },
  });
  const mutationAdmin = useMutation({
    mutationFn: newAdmin,
    onSuccess: () => {
      console.log("Data sent for new user");
    },
  });

  function otpSend(event, id) {
    event.preventDefault();
    const formData = {
      email: students[id].email,
      registrationNumber: registrationNumber,
    };
    if (Object.keys(formData).length === 0) setError("Don't have Data");
    mutationOtp.mutate(formData);
  }
  function adminOtpSend(event, id) {
    event.preventDefault();
    const formData = {
      email: email,
      registrationNumber: faculties[id].registrationNumber,
    };
    if (Object.keys(formData).length === 0) setError("Don't have Data");
    mutationOtp.mutate(formData);
  }

  useEffect(() => {
    if (mutationOtp.data) {
      if (mutationOtp.data.status == "success") setSteps(2);
    }
  }, [mutationOtp]);

  function otpHandler(number) {
    console.log(number);
    const formData = {
      registrationNumber,
      otp: number,
    };
    if (Object.keys(formData).length === 0)
      return console.log("Don't have form Data");
    mutationOtpVerify.mutate(formData);
  }

  useEffect(() => {
    if (mutationOtpVerify.data) {
      if (mutationOtpVerify.data.status == "success") setSteps(3);
      else {
        setError("OTP verification failed.");
      }
    }
  });

  function allSubmit(event) {
    event.preventDefault();
    setload(true);
    const formData = {
      registrationNumber,
      email: students[idx].email,
      name: students[idx].name,
      password,
      passwordConfirm,
      profileUrl:'',
      publicid:'',
    };
    console.log(formData);
    if (Object.keys(formData).length === 0) setError("Don't have data");
    mutationUser.mutate(formData);
  }

  function allSubmitAdmin(event) {
    setload(true);
    event.preventDefault();
    const formData = {
      registrationNumber: faculties[idx].registrationNumber,
      email,
      name: faculties[idx].name,
      password,
      passwordConfirm,
      profileUrl:'',
      publicid:'',
    };
    console.log(formData);
    if (Object.keys(formData).length === 0) setError("Don't have data");
    mutationAdmin.mutate(formData);
  }

  useEffect(() => {
    if (mutationUser.data) {
      if (mutationUser.data.status == "success") {
        setSteps(4);
        
      } else setError("can't register");
    }
  }, [mutationUser]);

  useEffect(() => {
    if (mutationAdmin.data) {
      if (mutationAdmin.data.status == "success") {
        setSteps(4);
      } else setError("can't register");
    }
  }, [mutationAdmin]);

  useEffect(() => {
    if(steps===4){
      setload(false);
      router.push('./');
      toast.success("Successfully Registered.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }
  }, [steps]);

  return (
    <div className={Styles.body}>
      {load && <Loader/>}
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
      {/* Registration number input */}
      {mutationOtp.isLoading ||
      mutationOtpVerify.isLoading ||
      mutationUser.isLoading ? (
        <Loader />
      ) : null}
      {steps == 1 ? (
        <>
          <img id={Styles.im} src="./elclogo.png" alt="" />
          <form id={Styles.form}>
            <div className={Styles.imgparent}>
              <img className={Styles.img1} src="./login.png" alt="" />
              <h2>Registration</h2>
              <br />
            </div>
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
                  id={Styles.input}
                  type="email"
                  required={true}
                  value={email}
                  onChange={(event) => setemail(event.target.value)}
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
                  id={Styles.input}
                  type="text"
                  required={true}
                  value={registrationNumber}
                  onChange={(event) =>
                    setRegistrationNumber(event.target.value)
                  }
                />
              </>
            )}

            <br />
            <div className={Styles.btns}>
              {isChecked ? (
                // Admin Login Button
                <button
                  className={Styles.button}
                  onClick={(event) => adminSubmit(event)}
                >
                  Register
                </button>
              ) : (
                // Normal Login Button
                <button
                  className={Styles.button}
                  onClick={(event) => submit(event)}
                >
                  Register
                </button>
              )}
              <Link href="/" className={Styles.signupbutton}>
                LogIn
              </Link>
            </div>

            {errMessage && <p className={Styles.error}>{errMessage}</p>}
          </form>
        </>
      ) : (
        <></>
      )}
      {steps == 2 ? (
        <Otp otpHandler={otpHandler} errMessage={errMessage} />
      ) : (
        <></>
      )}
      {steps == 3 ? (
        <>
          <div className={Styles.parent}>
            <div>
              <div className={Styles.par}>
                <label>Password</label>
                <div className={Styles.element}>
                  <input
                    type={togglePassword ? "text" : "password"}
                    required={true}
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  {togglePassword ? (
                    <Image
                      className={Styles.icon}
                      onClick={() => setTogglePassword(!togglePassword)}
                      src={show}
                      alt=""
                    />
                  ) : (
                    <Image
                      className={Styles.icon}
                      onClick={() => setTogglePassword(!togglePassword)}
                      src={hide}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <br />
              <div className={Styles.par}>
                <label>Confirm Password</label>
                <div className={Styles.element}>
                  <input
                    type={togglePasswordConfirm ? "text" : "password"}
                    required={true}
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                  />

                  {togglePasswordConfirm ? (
                    <Image
                      className={Styles.icon}
                      onClick={() =>
                        setTogglePasswordConfirm(!togglePasswordConfirm)
                      }
                      src={show}
                      alt=""
                    />
                  ) : (
                    <Image
                      className={Styles.icon}
                      onClick={() =>
                        setTogglePasswordConfirm(!togglePasswordConfirm)
                      }
                      src={hide}
                      alt=""
                    />
                  )}
                </div>
              </div>
              {errMessage ? (
                <p className={Styles.error2}>{errMessage}</p>
              ) : (
                <div className={Styles.blank}></div>
              )}
              <div className={Styles.btns}>
                {isChecked ? (
                  <button
                    className={Styles.btn}
                    onClick={(event) => allSubmitAdmin(event)}
                  >
                    Create
                  </button>
                ) : (
                  <button
                    className={Styles.btn}
                    onClick={(event) => allSubmit(event)}
                  >
                    Create
                  </button>
                )}
                ;
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Register;
