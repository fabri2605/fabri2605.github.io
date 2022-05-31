import React from 'react';
import classes from './SongComp.module.css';
const SongComp = (props) => {
    const aud = document.getElementsByClassName('player');
    function secondsToString(seconds) {
        var minute = Math.floor((seconds / 60) % 60);
        minute = minute < 10 ? '0' + minute : minute;
        var second = seconds % 60;
        second = second < 10 ? '0' + Math.floor(second) : Math.floor(second);
        return minute + ':' + second;
    }
    const imgClickHandler = (e) => {
        for (const cual of aud) {
            if (cual.id === props.song.name) {
                cual.play();
            } else {
                cual.pause();
            }
        }
    };
    const playing = (e) => {
        for (const cual of aud) {
            cual.volume = 0.5;
            if (cual.id === props.song.name) {
            } else {
                cual.pause();
            }
        }
    };
    return (
        <div className={classes.cartel}>
            <p>{secondsToString(props.song.duration)}</p>
            <img
                onClick={imgClickHandler}
                alt={props.song.name}
                src={props.song.img}
            ></img>
            <h3 className={classes.title}>{props.song.name}</h3>
            <a href={props.song.authorUrl}>
                <h5 className={classes.artist}>{props.song.author}</h5>
            </a>
            <div>
                <a href={props.song.url.spotify}>Listen it on Spoltify!</a>
            </div>
            <audio
                id={props.song.name}
                className='player'
                onPlay={playing}
                controls
            >
                <source src={props.song.preview} type='audio/mpeg' />
            </audio>
        </div>
    );
};

export default SongComp;
