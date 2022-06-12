import React from 'react';
import classes from './myLoader.module.css'

const myLoader = () => {
    return (
        <div className={classes.myBody}>
        <div className={classes.middle}>
            <div className={`${classes.bar} ${classes.bar1}`}></div>
            <div className={`${classes.bar} ${classes.bar2}`}></div>
            <div className={`${classes.bar} ${classes.bar3}`}></div>
            <div className={`${classes.bar} ${classes.bar4}`}></div>
            <div className={`${classes.bar} ${classes.bar5}`}></div>
            <div className={`${classes.bar} ${classes.bar6}`}></div>
            <div className={`${classes.bar} ${classes.bar7}`}></div>
            <div className={`${classes.bar} ${classes.bar8}`}></div>
        </div>
        </div>
    );
};

export default myLoader;
