import React from 'react';
import SongComp from './SongComp';
import classes from './SongComp.module.css';
import RegisterForm from './RegisterForm';
import MyLoader from './Loader/MyLoader';
import Nav from './nav/Nav';
import './extra/Transition.css';
import Swal from 'sweetalert2';

const SpoltifyApp = () => {
    const [isRegistring, setIsRegistring] = React.useState(false);
    const [User, setUser] = React.useState(localStorage.getItem('isLogged'));
    const [songs, setSongs] = React.useState([]);
    const [filtredSongs, setFiltredSongs] = React.useState([]);
    const [artists, setArtists] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState('');

    const localUser = localStorage.getItem('isLogged');
    const localFilter = localStorage.getItem('filtred');

    const fetching = React.useCallback(
        async function () {
            setIsRegistring(false);
            if (!localUser) {
                setFiltredSongs('');
                localStorage.setItem('filtred', '');
                setHasError('You need to register first!');
                return null;
            } else if (songs.length > 0 && filtredSongs.length === 0) {
                setFiltredSongs(songs);
                return null;
            } else if (filtredSongs.length > 0 && songs.length > 0) {
                if (localFilter) {
                    setFiltredSongs(
                        songs.filter((u) => u.author === localFilter)
                    );
                } else {
                    setFiltredSongs(songs);
                }
                return null;
            }
            setIsRegistring(false);
            setIsLoading(true);

            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key':
                        process.env.REACT_APP_X_RapidAPI_Key,
                    'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
                },
            };

            await fetch(
                process.env.REACT_APP_MUSIC_LINK,
                options
            )
                .then((response) => response.json())
                .then((response) => {

                    console.log(response);
                    const songis = [];
                    const artis = [];
                    for (const key in response) {
                        if (key === 'items') {
                            for (const song of response[key]) {
                                if (song.track) {
                                    songis.push({
                                        id: song.track.id,
                                        name: song.track.name,
                                        authorUrl: song.track.artists[0].uri,
                                        author: song.track.artists[0].name,
                                        preview: song.track.preview_url,
                                        img: song.track.album.images[0].url,
                                        url: song.track.external_urls,
                                        duration:
                                            song.track.duration_ms * 0.001,
                                    });
                                    artis.push(song.track.artists[0].name);
                                }
                            }
                        }
                    }
                    var result = [];
                    artis.sort();
                    artis.forEach((item) => {
                        if (result.indexOf(item) < 0) {
                            result.push(item);
                        }
                    });
                    setArtists(result);
                    setSongs(songis);
                    if (localFilter === 'All' || !localFilter) {
                        console.log('localFilter == All || ""');
                        setFiltredSongs(songis);
                    } else {
                        setFiltredSongs(
                            songis.filter((u) => u.author === localFilter)
                        );
                    }
                });
            setIsLoading(false);
        },
        [User, localFilter, songs]
    );

    React.useEffect(() => {
        if (localUser === !!User) {
            setUser(localUser);
        }
        if (localFilter) {
            fetching();
        }
    }, []);

    async function registration(name, pass, isRegistred) {
        setIsLoading(true);
        setIsRegistring(false);
        setHasError('');
        if (!isRegistred) {
            const object = { Name: name, Password: pass };

            try {
                await fetch(
                    process.env.REACT_APP_FIRE_POST_LINK,
                    {
                        method: 'POST',
                        body: JSON.stringify(object),
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            } catch (e) {
                console.log(e.message);
            }
            Swal.fire(
                'Registered succesfully!',
                'Hope you enjoy the page!',
                'success'
            );
        } else {
            Swal.fire(
                'Welcome back ' + name + ' !',
                'Logged succesfully!',
                'success'
            );
        }
        setUser(name);
        localStorage.setItem('isLogged', name);
        setIsLoading(false);
    }

    const showForm = () => {
        setIsRegistring(true);
    };

    const throwSongs = (e) => {
        if (e.target.value === 'All') {
            setFiltredSongs(songs);
            localStorage.setItem('filtred', '');
        } else {
            const filtredSongss = songs.filter(
                (u) => u.author === e.target.value
            );
            setFiltredSongs(filtredSongss);
            localStorage.setItem('filtred', e.target.value);
        }
    };

    const logoutHandler = () => {
        setUser('');
        setFiltredSongs([]);
        localStorage.setItem('isLogged', '');
        localStorage.setItem('filtred', '');
        Swal.fire('Good bye!', 'Logged out succesfully!');
    };

    return (
        <React.Fragment>
            <Nav
                loading={isLoading}
                fetching={fetching}
                showForm={showForm}
                logoutHandler={logoutHandler}
                user={User}
            />
            {!isRegistring ? (
                <div className={isLoading ? classes.loading : 'white-p'}>
                    {filtredSongs.length > 0 && User && (
                        <div className={classes.filter}>
                            <label>Filter by artist:</label>
                            <select onChange={throwSongs}>
                                <option key='All' value='All'>
                                    All
                                </option>
                                {artists.map((e) => (
                                    <option key={e} value={e}>
                                        {e}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {isLoading && !hasError && (
                        <div>
                            <MyLoader />
                        </div>
                    )}
                    {!hasError &&
                        filtredSongs.length === 0 &&
                        !isLoading &&
                        !isRegistring && (
                            <p>Songs list is empty, load to see them all!</p>
                        )}
                    {hasError && <p>{hasError}</p>}
                    <div className={classes.general}>
                        {!isLoading &&
                            !isRegistring &&
                            filtredSongs.length > 0 &&
                            User &&
                            filtredSongs.map((e) => {
                                return <SongComp key={e.id} song={e} />;
                            })}
                    </div>
                </div>
            ) : (
                <RegisterForm submitionHandler={registration} />
            )}
        </React.Fragment>
    );
};

export default SpoltifyApp;
