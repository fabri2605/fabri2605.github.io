import classes from './Nav.module.css';
import React from 'react';
const Nav = (props) => {

    const pageTitle = React.createRef();

    return (
        <nav
            className={
                props.loading ? classes.loading + ' ' + classes.nav : classes.nav
            }
        >
            <p ref={pageTitle} className={classes.logo}>
                French Drillin
            </p>

            {!props.user ? (
                <button onClick={props.showForm} className={classes.fetchbutton}>
                    Register / Login
                </button>
            ) : (
                <div className={classes.navButtons}>
                    <button className={classes.fetchbutton} onClick={props.fetching}>
                        Load Songs
                    </button>
                    <button onClick={props.logoutHandler} className={classes.logout}>
                        Log Out
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Nav;
