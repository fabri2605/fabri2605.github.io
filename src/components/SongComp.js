import React from 'react';
import classes from './SongComp.module.css';
import MyExtra from './extra/MyExtra';
const SongComp = (props) => {
    const aud = document.getElementsByClassName('player');
    const [played, setPlayed] = React.useState(false);
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
        setPlayed(!document.getElementById(props.song.name).paused);
        for (const cual of aud) {
            cual.volume = 0.1;
            if (cual.id === props.song.name) {
                cual.setAttribute('controls', '');
            } else {
                cual.pause();
                cual.removeAttribute('controls');
            }
        }
    };
    const Thunderbolt = (e) => {
        setPlayed(!document.getElementById(props.song.name).paused);
    };
    return (
        <div className={classes.cartel}>
            <p>{secondsToString(props.song.duration)}</p>
            <img
                onClick={imgClickHandler}
                alt={props.song.name}
                src={props.song.img}
            ></img>
            {played && <MyExtra />}
            <h3 className={classes.title}>{props.song.name}</h3>
            <a href={props.song.authorUrl}>
                <h5 className={classes.artist}>{props.song.author}</h5>
            </a>
            <div className={classes.spol}>
                <a href={props.song.url.spotify}>Listen it on Spoltify!</a>
            </div>
            {/*  <p>{props.song.name}</p> */}
            <audio
                onPause={Thunderbolt}
                id={props.song.name}
                className='player'
                onPlay={playing}
            >
                <source src={props.song.preview} type='audio/mpeg' />
            </audio>
        </div>
    );
};

export default SongComp;
