import { useEffect, useState } from "react";

function createCard(title, author, cover, url, id, setTime, setAudio) {
    const changeTrack = (e) => {
        setAudio({title, author, cover, url});
        setTime(0);
    }
    return (
        <button key={id} className="card" onClick={changeTrack}>
            <img src={cover[512]} alt="" />
            <h3 className="name">{title}</h3>
            {author.map(author => <h4 className="author">{author.name}</h4>)}
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
                let response = await fetch("http://localhost:3000/audios", { method: "GET" });
                response = await response.json();
                setChildren(
                    <main>
                        {
                            response.map(song => createCard(
                                song.title,
                                song.artists,
                                song.cover || { 512: "/RiskPlayer/cdn/img/error_img.png", 1024: "/RiskPlayer/cdn/img/error_img.png" },
                                song.url,
                                song.id,
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