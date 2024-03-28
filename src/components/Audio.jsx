import "../cdn/css/audio.css";
import { useEffect } from "react";


export default function Audio({
    audio: [audio, setAudio],
    isPlaying: [isPlaying, setIsPlaying],
    isLoop: [isLoop, setIsLoop],
    time: [time, setTime]
}) {
    useEffect(() => {
        if (!audio.url) return;
        document.querySelector("audio").src = audio.url;
        document.querySelector("audio").oncanplaythrough = () => {
            setIsPlaying(true);
            document.querySelector("audio").play();
            document.querySelector("#audioContainer").classList.add("active");
            document.querySelector("#progressBar > progress").max = document.querySelector("audio").duration;
            document.querySelector("#progressBar > input").max = document.querySelector("audio").duration;
            document.querySelector("#title").innerText = audio.title;
            document.querySelector("#cover").src = audio.cover[512];
            document.querySelector("title").innerText = `${audio.title} - Risk`;
            setTime(0);
            document.querySelector("audio").oncanplaythrough = () => {};
        }
    }, [audio]);

    useEffect(() => {
        if (isPlaying) {
            document.querySelector(".play > span").innerText = "pause";
            document.querySelector(".play > span").title = "Pause";
            document.querySelector("audio").play();
        } else {
            document.querySelector(".play > span").innerText = "play_arrow";
            document.querySelector(".play > span").title = "Play";
            document.querySelector("audio").pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isLoop) {
            document.querySelector(".loop > span").innerText = "repeat_one";
            document.querySelector(".loop").classList.add("active");
            document.querySelector("audio").setAttribute("loop", "");
        } else {
            document.querySelector(".loop > span").innerText = "repeat";
            document.querySelector(".loop").classList.remove("active");
            document.querySelector("audio").removeAttribute("loop");
        }
        localStorage.setItem("loop", isLoop);
    }, [isLoop]);

    useEffect(() => {
        if (Math.floor(time / 60) > 0) {
            document.querySelector("#progressBar > p.current").innerText = `${Math.floor(time / 60)}min ${Math.floor(time % 60) < 10 ? "0" : ""}${Math.floor(time % 60)}s`;
        } else {
            document.querySelector("#progressBar > p.current").innerText = `${Math.floor(time % 60) < 10 ? "0" : ""}${Math.floor(time % 60)}s`;
        }
        document.querySelector("#progressBar > progress").value = time;
    }, [time]);
    
    const timeUpdate = (e) => {
        setTime(e.target.currentTime);
    }
    
    const togglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }
    
    const toggleLoop = () => {
        if (isLoop) {
            setIsLoop(false);
        } else {
            setIsLoop(true);
        }
    }
    
    const onChange = async (audio, e) => {
        let wasPlaying = isPlaying;
        setIsPlaying(false);
        audio.currentTime = e.target.value;
        setTime(e.target.value);
        setIsPlaying(wasPlaying);
    }
    
    return (
        <>
            <div id="audioContainer">
                <img id="cover" src={audio.cover[1024]}></img>
                <div id="about">
                    <p id="title">{audio.title}</p>
                    {audio.author.map(author => <a key={author.url} href={author.url} target="_blank" className="author">{author.name}</a>)}
                </div>
                <button className="play" onClick={togglePlay}>
                    <span className="material-symbols-outlined">play_arrow</span>
                </button>
                <button className="loop">
                    <span className="material-symbols-outlined" onClick={toggleLoop}>repeat</span>
                </button>
                <div id="progressBar">
                    <input type="range" defaultValue="0" onChange={(e) => onChange(document.querySelector("audio"), e)}></input>
                    <progress value="0"></progress>
                    <p className="current"></p>
                </div>
                <audio onTimeUpdate={timeUpdate}>
                    Your browser does not support the audio element.
                </audio>
            </div>
        </>
    )
}