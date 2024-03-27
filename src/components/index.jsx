import { useEffect, useState } from "react";

function createCard(name, author, cover, url, id, setTime, setAudio) {
    const changeTrack = (e) => {
        setAudio({name, author, cover, url});
        setTime(0);
    }
    return (
        <button key={id} className="card" onClick={changeTrack}>
            <img src={cover === "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png" ? "/RiskPlayer/cdn/img/error_img.png  " : cover} alt="" />
            <h3 className="name">{name}</h3>
            <h4 className="author">{author}</h4>
        </button>
    );
}
export default function Body({
    audio: [audio, setAudio],
    isPlaying: [isPlaying, setIsPlaying],
    isLoop: [isLoop, setIsLoop],
    time: [time, setTime]
}) {
    const [children, setChildren] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                let response = await fetch("https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=0995a5ed8d458dfdd348e336e1c7323f&format=json   ");
                response = await response.json();
                setChildren(
                    <main>
                        {
                            response.tracks.track.map(song => createCard(
                                song.name,
                                song.artist.name,
                                song.image[0]["#text"] || "/RiskPlayer/cdn/img/error_img.png" ,
                                song.url,
                                song.listeners,
                                setTime,
                                setAudio
                            ))
                        }
                    </main>
                );
            } catch (err) { setChildren(<h1>Error: An error occurred while retrieving music</h1>); console.error(err); }
        })();
    }, []);
    
    return <>{children || <h1>Loading...</h1>}</>;
}