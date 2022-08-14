import React from 'react';
import classes from './SongComp.module.css';
import CryptoJS from 'crypto-js';

const RegisterForm = (props) => {
    const [name, setName] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [touched, setTouched] = React.useState(false);
    const [touchedp, setTouchedp] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    const submitHandler = async function (e) {
        setTouched(true);
        e.preventDefault();
        if (namevalid && passvalid) {
            await fetch(
                'https://react-http-467cc-default-rtdb.firebaseio.com/users.json'
            )
                .then((response) => response.json())
                .then((response) => {
                    let found = false;
                    for (const key in response) {
                        if (response[key].Name === name) {
                            if (response[key].Password !== pass) {
                                setHasError(true);
                                return null;
                            }
                            props.submitionHandler(name, pass, true);
                            found = true;
                        }
                    }
                    if (!hasError && found === false) {
                        props.submitionHandler(name, pass, false);
                    }
                });
        }
    };

    const setNameHandler = (e) => {
        setName(e.target.value.trim());
    };
    const setPassHandler = (e) => {
        const cipher = CryptoJS.AES.encrypt('PASSWORD', e.target.value.trim());
        setPass(cipher);
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
            <div>
                <label>Username:</label>
                <input
                    type='text'
                    onBlur={blurNameHandler}
                    onChange={setNameHandler}
                    value={name}
                />
            </div>

            <div>
                <label>Password:</label>
                <input
                    type='password'
                    onBlur={blurPassHandler}
                    onChange={setPassHandler}
                    value={pass}
                />
            </div>
            <button type='submit'>Register</button>
            {!namevalid && touched && <p>Invalid username!</p>}
            {!passvalid && namevalid && touchedp && <p>Invalid password!</p>}
            {hasError && <p>User already in use || incorrect password!</p>}
        </form>
    );
};

export default RegisterForm;
