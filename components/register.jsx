import React, { useEffect, useState } from "react";
import { students } from "../dummy";
import Otp from "./otp";
import { useMutation } from "react-query";
import { newUser, sendOtp, verifyOtp } from "../lib/helper";
import Image from "next/image";
import Styles from "../styles/register.module.css";
import user from "../public/user.svg";
import hide from "../public/hide.svg";
import show from "../public/show.svg";
import Loader from "./loader";

function Register() {
  const [registrationNumber, setRegistrationNumber] = useState();
  const [errMessage, setErrorMessage] = useState();
  const [idx, setIdx] = useState(-1);
  const [steps, setSteps] = useState(1);
  const [togglePassword, setTogglePassword] = useState(0);
  const [togglePasswordConfirm, setTogglePasswordConfirm] = useState(0);
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  // to submit registration number and send otp
  function submit(event) {
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
    if (index == -1) console.log("Invalid registration number");
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

  function otpSend(event, id) {
    event.preventDefault();
    const formData = {
      email: students[id].email,
      registrationNumber: registrationNumber,
    };
    if (Object.keys(formData).length === 0)
      return console.log("Don't have form Data");
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
    }
  });

  function allSubmit(event) {
    event.preventDefault();
    const formData = {
      registrationNumber,
      email: students[idx].email,
      name: students[idx].name,
      password,
      passwordConfirm,
    };
    console.log(formData)
    if (Object.keys(formData).length === 0)
      return console.log("Don't have form data");
    mutationUser.mutate(formData);
  }

  useEffect(() => {
    if (mutationUser.data) {
      if (mutationUser.data.status == "success") setSteps(4);
    }
  }, [mutationUser]);

  return (
    <div className={Styles.body}>
      {/* Registration number input */}
      {mutationOtp.isLoading || mutationOtpVerify.isLoading || mutationUser.isLoading ? (
        <Loader />
      ) : null}
      {steps == 1 ? (
        <>
          <img id={Styles.im} src="./elclogo.png" alt="" />
          <form id={Styles.form}>
          <div className={Styles.imgparent}>
              <img className={Styles.img1} src="./login.png" alt="" />
              <h2>Registration</h2>
            </div>
            <br /><br />
            <label id={Styles.label} htmlFor="rgd">
              Registration Number
            </label>
            <input
              id={Styles.input}
              type="text"
              required={true}
              onChange={(event) => setRegistrationNumber(event.target.value)}
            />
            <br />
            <div className={Styles.btns}>
              <button
                className={Styles.button}
                onClick={(event) => submit(event)}
              >
                Register
              </button>
              <button className={Styles.button}>Log In</button>
            </div>
            <p className={Styles.forget} onClick={(event) => submit(event)}>
              Forgot Password ?
            </p>
           
           
           
          </form>
        </>
      ) : (
        <></>
      )}
      {steps == 2 ? <Otp otpHandler={otpHandler} /> : <></>}
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
          <label >Confirm Password</label>
          <div className={Styles.element}>
            <input
              type={togglePasswordConfirm ? "text" : "password"}
              required={true}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />

            {togglePasswordConfirm ? (
              <Image
                className={Styles.icon}
                onClick={() => setTogglePasswordConfirm(!togglePasswordConfirm)}
                src={show}
                alt=""
              />
            ) : (
              <Image
                className={Styles.icon}
                onClick={() => setTogglePasswordConfirm(!togglePasswordConfirm)}
                src={hide}
                alt=""
              />
            )}
          </div>
          </div>
          <div className={Styles.btns}>
            <button
              className={Styles.btn}
              onClick={(event) => allSubmit(event)}
            >
              Create
            </button>
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
