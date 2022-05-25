import React from 'react';
import classes from './SongComp.module.css';
const SongComp = (props) => {
    function secondsToString(seconds) {
        var minute = Math.floor((seconds / 60) % 60);
        minute = minute < 10 ? '0' + minute : minute;
        var second = seconds % 60;
        second = second < 10 ? '0' + Math.floor(second) : Math.floor(second);
        return minute + ':' + second;
    }
    return (
        <div className={classes.cartel}>
            <p>{secondsToString(props.song.duration)}</p>
            <img alt={props.song.name} src={props.song.img}></img>
            <h3 className={classes.title}>{props.song.name}</h3>
            <h5 className={classes.artist}>{props.song.author}</h5>
            <a href={props.song.url}>Listen it on Spoltify!</a>
        </div>
    );
};

export default SongComp;
