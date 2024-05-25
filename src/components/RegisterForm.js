import React from 'react';
import classes from './Register.module.css';
import CryptoJS from 'crypto-js';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const RegisterForm = (props) => {
    const [name, setName] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [seeingPass, setSeeingPass] = React.useState(false);
    const [touched, setTouched] = React.useState(false);
    const [touchedp, setTouchedp] = React.useState(false);
    const [hasError, setHasError] = React.useState('');

    const key = CryptoJS.enc.Utf8.parse('b75524255a7f54d2726a951bb39204df');
    const iv = CryptoJS.enc.Utf8.parse('1583288699248111');

    const submitHandler = async function (e) {
        setTouched(true);
        e.preventDefault();
        if (namevalid && passvalid) {
            await fetch(
                process.env.REACT_APP_FIRE_POST_LINK
            )
                .then((response) => response.json())
                .then((response) => {
                    let found = false;
                    for (const key in response) {
                        if (response[key].Name === name) {
                            if (response[key].Password !== pass) {
                                setHasError('Incorrect password!');
                                return null;
                            }
                            props.submitionHandler(name, pass, true);
                            found = true;
                        }
                    }
                    if (!found) {
                        props.submitionHandler(name, pass, false);
                    }
                });
        } else {
            setHasError("Please complete the login!")
        }
    };

    const setNameHandler = (e) => {
        setName(e.target.value.trim());
    };
    const setPassHandler = (e) => {
        /* const decipher = CryptoJS.AES.decrypt(cipher, key); */
        const cipher = CryptoJS.AES.encrypt(e.target.value.trim(), 'PASSWORD');
        setPass(e.target.value.trim());
    };
    const blurNameHandler = () => {
        setTouched(true);
    };
    const blurPassHandler = () => {
        setTouchedp(true);
    };
    const namevalid = name.length > 3;
    const passvalid = pass.length > 3;

    return (
        <form onSubmit={submitHandler} className={classes.myform}>
            <div className={classes.user}>
                <label>Username:</label>
                <input
                    type='text'
                    onBlur={blurNameHandler}
                    onChange={setNameHandler}
                    value={name}
                />
            </div>

            <div className={classes.pass}>
                <label>Password:</label>
                <div className={classes.seePass}>
                    <input
                        type={seeingPass ? 'text' : 'password'}
                        onBlur={blurPassHandler}
                        onChange={setPassHandler}
                        value={pass}
                    />
                    <div>
                        {seeingPass ?
                            <FaRegEyeSlash onClick={() => setSeeingPass((e) => !e)} color='white' />
                            :
                            <FaRegEye onClick={() => setSeeingPass((e) => !e)} color='white' />
                        }
                    </div>
                </div>
            </div>
            <button type='submit' className={classes.submit}>Register</button>
            {!namevalid && touched && <p>Invalid username!</p>}
            {!passvalid && namevalid && touchedp && <p>Invalid password!</p>}
            {hasError && <p>{hasError}</p>}
        </form>
    );
};

export default RegisterForm;
