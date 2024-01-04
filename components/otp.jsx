import React, { useState } from 'react';
import Styles from '../styles/otp.module.css';

function Otp(props) {
    const [number1, setNumber1] = useState();
    const [number2, setNumber2] = useState();
    const [number3, setNumber3] = useState();
    const [number4, setNumber4] = useState();
    const [number5, setNumber5] = useState();
    const [number6, setNumber6] = useState();

    function numberHandler1(event) {
        setNumber1(event.target.value);
        if (event.target.value) event.target.nextSibling.focus();
    }
    function numberHandler2(event) {
        setNumber2(event.target.value);
        if (event.target.value) event.target.nextSibling.focus();
        else event.target.previousSibling.focus();
    }
    function numberHandler3(event) {
        setNumber3(event.target.value);
        if (event.target.value) event.target.nextSibling.focus();
        else event.target.previousSibling.focus();
    }
    function numberHandler4(event) {
        setNumber4(event.target.value);
        if (event.target.value) event.target.nextSibling.focus();
        else event.target.previousSibling.focus();
    }
    function numberHandler5(event) {
        setNumber5(event.target.value);
        if (event.target.value) event.target.nextSibling.focus();
        else event.target.previousSibling.focus();
    }
    function numberHandler6(event) {
        setNumber6(event.target.value);
        if (!event.target.value) event.target.previousSibling.focus();
    }

    function submitHandler(event) {
        event.preventDefault();
        const number = number1 * 100000 + number2 * 10000 + number3 * 1000 + number4 * 100 + number5 * 10 + number6 * 1;
        props.otpHandler(number.toString());
    }

    return (
        <><div className={Styles.par}>
        <div className={Styles.parent}>
            <div className={Styles.logotext}>
            <img src="./otp.png" alt="" />
            {props.errMessage ?( <p className={Styles.error}>{props.errMessage}</p>):(<p>verify OTP here </p>)}</div>
            <div className={Styles.container}>
                <input type="text" required="" maxLength={1} onChange={numberHandler1} />
                <input type="text" required="" maxLength={1} onChange={numberHandler2} />
                <input type="text" required="" maxLength={1} onChange={numberHandler3} />
                <input type="text" required="" maxLength={1} onChange={numberHandler4} />
                <input type="text" required="" maxLength={1} onChange={numberHandler5} />
                <input type="text" required="" maxLength={1} onChange={numberHandler6} />
            </div>
            <button className={Styles.btn} onClick={(event) => submitHandler(event)}>
                Submit
            </button>
            </div></div>
        </>
    );
}

export default Otp; 