import React from 'react';
import classes from './SongComp.module.css';

const RegisterForm = (props) => {
    const [name, setName] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [touched, setTouched] = React.useState(false);

    const submitHandler = (e) =>{
        setTouched(true);
        e.preventDefault();
        if(valid){
            console.log('Registred!');
            props.submitionHandler(name, pass);
        }
    };

    const setNameHandler = (e) =>{
        setTouched(true);
        setName(e.target.value);
    };
    const setPassHandler = (e) =>{
        setTouched(true);
        setPass(e.target.value);
    };
    const valid = name.length>4 && pass.length>4;
    return (
        <form onSubmit={submitHandler} className={classes.myform}>
            <div>
                <label>Username:</label>
                <input type='text' onChange={setNameHandler} value={name}/>
            </div>

            <div>
                <label>Password:</label>
                <input type='password' onChange={setPassHandler} value={pass}/>
            </div>
            <button type='submit'>Register</button>
            {!valid && touched && <p>Invalid entry!</p>}
        </form>
    );
};

export default RegisterForm;
