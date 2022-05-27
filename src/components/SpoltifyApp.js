import React from 'react';
import SongComp from './SongComp';
import classes from './SongComp.module.css';
import RegisterForm from './RegisterForm';

const SpoltifyApp = () => {
    const [isRegistring, setIsRegistring] = React.useState(false);
    const [User, setUser] = React.useState('');
    const [songs, setSongs] = React.useState([]);
    const [artists, setArtists] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const fetching = async function () {
        setIsRegistring(false)
        setIsLoading(true);

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
                'X-RapidAPI-Key':
                    'fbf0c29f17msh2ea8c42d058efb8p1cb340jsn87a4660d26d6',
            },
        };

        fetch(
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
                            console.log(song.track.external_urls);
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
                artis.forEach((item)=> {
                    if (result.indexOf(item) < 0) {
                        result.push(item);
                    }
                });
                setArtists(result);
                setSongs(songis);
            })
            .catch((err) => console.error(err));
        setIsLoading(false);
    };

    async function registration(name, pass) {
        const object = { Name: name, Password: pass };
        setIsRegistring(false);
        setIsLoading(true);
        try {
            fetch(
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
        setUser(name);
        setIsLoading(false);
    }

    const throwSongs = (e) => {
        const filtredSongs = songs.filter((u) => u.author === e.target.value);
        setSongs(filtredSongs);
    };

    const registrationn = () => {
        setIsRegistring(true);
    };

    const logoutHandler = () => {
        setUser('');
    };

    return (
        <React.Fragment>
            <nav className={classes.nav}>
                <button className={classes.fetchbutton} onClick={fetching}>
                    Fetch Songs
                </button>
                {!User ? (
                    <button
                        onClick={registrationn}
                        className={classes.fetchbutton}
                    >
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
                <div>
                    {songs.length > 0 && (
                        <div className={classes.filter}>
                            <label>Filter by artist:</label>
                            <select onChange={throwSongs}>
                                {artists.map((e) => (
                                    <option key={e} value={e}>
                                        {e}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className={classes.general}>
                        {isLoading && <p>Loading...</p>}
                        {songs.length === 0 && !isLoading && !isRegistring && (
                            <p>Songs list is empty, fetch to see some music!</p>
                        )}
                        {!isLoading &&
                            !isRegistring &&
                            songs.map((e) => <SongComp key={e.id} song={e} />)}
                    </div>
                </div>
            ) : (
                <RegisterForm submitionHandler={registration} />
            )}
        </React.Fragment>
    );
};

export default SpoltifyApp;
