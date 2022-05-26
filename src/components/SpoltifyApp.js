import React from 'react';
import SongComp from './SongComp';
import classes from './SongComp.module.css';
import RegisterForm from './RegisterForm';
alert('This page is not prepared to be excecuted on phones!');

const SpoltifyApp = () => {
    const [isRegistring, setIsRegistring] = React.useState(false);
    const [User, setUser] = React.useState('');
    const [songs, setSongs] = React.useState([]);
    const [artists, setArtists] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const fetching = React.useCallback(async function () {
        setIsRegistring(false);
        setIsLoading(true);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
                'X-RapidAPI-Key':
                    '8cc775c702msheb62061cb0adb6fp1957fcjsna06b77403272',
            },
        };

        const response = await fetch(
            'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5',
            options
        );
        response
            .json()
            .then((response) => {
                console.log(response);
                const songis = [];
                const artis = [];
                for (const key in response) {
                    if (key === 'tracks') {
                        console.log(key);
                        for (const song of response[key].items) {
                            songis.push({
                                id: song.data.albumOfTrack.id,
                                name: song.data.albumOfTrack.name,
                                author: song.data.artists.items[0].profile.name,
                                img: song.data.albumOfTrack.coverArt.sources[0]
                                    .url,
                                url: song.data.albumOfTrack.sharingInfo
                                    .shareUrl,
                                duration:
                                    song.data.duration.totalMilliseconds *
                                    0.001,
                            });
                            artis.push(song.data.artists.items[0].profile.name);
                        }
                    }
                }
                setArtists(artis);
                setSongs(songis);
            })
            .catch((err) => console.error(err));
        setIsLoading(false);
    },[]);
    
    async function registration(name, pass) {
        const object = { Name: name, Password: pass };
        setIsRegistring(false);
        setIsLoading(true);
        try {
            const response = fetch(
                'https://react-http-467cc-default-rtdb.firebaseio.com/users.json',
                {
                    method: 'POST',
                    body: JSON.stringify(object),
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (response.ok) {
                setUser(name);
            }
        } catch (e) {
            console.log(e.message);
        }
        setIsLoading(false);
        console.log(User);
    }

    React.useEffect(() => {
        fetching();
    }, [fetching]);

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
