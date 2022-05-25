import React from 'react';
import classes from './SongComp.module.css';

const RegisterForm = (props) => {
    const [name, setName] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [touched, setTouched] = React.useState(false);
    const [touchedp, setTouchedp] = React.useState(false);

    const submitHandler = (e) => {
        setTouched(true);
        e.preventDefault();
        if (namevalid && passvalid) {
            console.log('Registred!');
            props.submitionHandler(name, pass);
        }
    };

    const setNameHandler = (e) => {
        setName(e.target.value);
    };
    const setPassHandler = (e) => {
        setPass(e.target.value);
    };
    const blurNameHandler = () => {
        setTouched(true);
    };
    const blurPassHandler = () => {
        setTouchedp(true);
    };
    const namevalid = name.length>3;
    const passvalid = pass.length>3;

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
                <input type='password' onBlur={blurPassHandler} onChange={setPassHandler} value={pass} />
            </div>
            <button type='submit'>Register</button>
            {!namevalid && touched && <p>Invalid username!</p>}
            {!passvalid && namevalid && touchedp && <p>Invalid password!</p>}
        </form>
    );
};

export default RegisterForm;
