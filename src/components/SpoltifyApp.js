import React from 'react';
import SongComp from './SongComp';
import classes from './SongComp.module.css';
import RegisterForm from './RegisterForm';
import MyLoader from './Loader/MyLoader';

const SpoltifyApp = () => {
    const [isRegistring, setIsRegistring] = React.useState(false);
    const [User, setUser] = React.useState(localStorage.getItem('isLogged'));
    const [songs, setSongs] = React.useState([]);
    const [filtredSongs, setFiltredSongs] = React.useState([]);
    const [artists, setArtists] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState('');
    const pageTitle = React.createRef();
    const localUser = localStorage.getItem('isLogged');
    const localFilter = localStorage.getItem('filtred');

    const fetching = React.useCallback(
        async function () {
            setIsRegistring(false);
            if (pageTitle.current.style === 'left') {
            }
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
                        '684f76f0f3msh78c59f0291915e8p1bc6c9jsn6b37b43baa62',
                    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
                },
            };

            await fetch(
                'https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=100',
                options
            )
                .then((response) => response.json())
                .then((response) => {
                    const songis = [];
                    const artis = [];
                    for (const key in response) {
                        if (key === 'items') {
                            for (const song of response[key]) {
                                songis.push({
                                    id: song.track.id,
                                    name: song.track.name,
                                    authorUrl: song.track.artists[0].uri,
                                    author: song.track.artists[0].name,
                                    preview: song.track.preview_url,
                                    img: song.track.album.images[0].url,
                                    url: song.track.external_urls,
                                    duration: song.track.duration_ms * 0.001,
                                });
                                artis.push(song.track.artists[0].name);
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
                })
                .catch((err) => {
                    console.error(err.message);
                    setHasError(err.message);
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
        setIsRegistring(false);
        setIsLoading(true);
        setHasError('');
        if (!isRegistred) {
            const object = { Name: name, Password: pass };

            try {
                await fetch(
                    'https://react-http-467cc-default-rtdb.firebaseio.com/users.json',
                    {
                        method: 'POST',
                        body: JSON.stringify(object),
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            } catch (e) {
                console.log(e.message);
            }
        } else {
            pageTitle.current.innerHTML = 'Welcome back ' + name;
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
        pageTitle.current = 'MyMusicPage';
    };

    return (
        <React.Fragment>
            <nav
                className={
                    isLoading
                        ? classes.loading + ' ' + classes.nav
                        : classes.nav
                }
            >
                <p ref={pageTitle} /* className={algo ? '' : ''} */>
                    French Drillin
                </p>
                <button className={classes.fetchbutton} onClick={fetching}>
                    Fetch Songs
                </button>
                {!User ? (
                    <button onClick={showForm} className={classes.fetchbutton}>
                        Register / Login
                    </button>
                ) : (
                    <>
                        <button className={classes.user} disabled>
                            {User}
                        </button>
                        <button
                            onClick={logoutHandler}
                            className={classes.logout}
                        >
                            Log Out
                        </button>
                    </>
                )}
            </nav>
            {!isRegistring ? (
                <div className={isLoading ? classes.loading : ''}>
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
                            <MyLoader></MyLoader>
                        </div>
                    )}
                    <div className={classes.general}>
                        {!hasError &&
                            filtredSongs.length === 0 &&
                            !isLoading &&
                            !isRegistring && (
                                <p id='nonFetchMsg'>
                                    Songs list is empty, fetch to see some
                                    music!
                                </p>
                            )}
                        {hasError && <p>{hasError}</p>}
                        {!isLoading &&
                            !isRegistring &&
                            filtredSongs.length > 0 &&
                            User &&
                            filtredSongs.map((e) => (
                                <SongComp key={e.id} song={e} />
                            ))}
                    </div>
                </div>
            ) : (
                <RegisterForm submitionHandler={registration} />
            )}
        </React.Fragment>
    );
};

export default SpoltifyApp;
