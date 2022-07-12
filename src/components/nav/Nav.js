import classes from '../SongComp.module.css';
import React from 'react';
const Nav = (props) => {

    const pageTitle = React.createRef();

    return (
        <nav
            className={
                props.loading ? classes.loading + ' ' + classes.nav : classes.nav
            }
        >
            <p ref={pageTitle} /* className={algo ? '' : ''} */>
                French Drillin
            </p>
            <button className={classes.fetchbutton} onClick={props.fetching}>
                Fetch Songs
            </button>
            {!props.user ? (
                <button onClick={props.showForm} className={classes.fetchbutton}>
                    Register / Login
                </button>
            ) : (
                <>
                    <button className={classes.user} disabled>
                        {props.user}
                    </button>
                    <button onClick={props.logoutHandler} className={classes.logout}>
                        Log Out
                    </button>
                </>
            )}
        </nav>
    );
};

export default Nav;
