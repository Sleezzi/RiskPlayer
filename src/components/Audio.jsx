import { useState } from "react";
import "../cdn/css/audio.css";
import { useEffect } from "react";

export default function Audio() {
    const [audio, setAudio] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!audio) return;
        document.querySelector("audio").src = URL.createObjectURL(audio);
        document.querySelector("audio").oncanplaythrough = () => {
            document.querySelector("#audioFileInput").classList.remove("active");
            document.querySelector("#audioContainer").classList.add("active");
            document.querySelector("#progressBar > progress").max = document.querySelector("audio").duration;
            document.querySelector("#progressBar > input").max = document.querySelector("audio").duration;
            let name = audio.name.split(".");
            name.pop();
            document.querySelector("#name").innerText = name;
            document.querySelector("title").innerText = `${name} - Risk`;
            setTime(0);
            togglePlay();
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
        if (Math.floor(time / 60) > 0) {
            document.querySelector("#progressBar > p.current").innerText = `${Math.floor(time / 60)}min ${Math.floor(time % 60) < 10 ? "0" : ""}${Math.floor(time % 60)}s`;
        } else {
            document.querySelector("#progressBar > p.current").innerText = `${Math.floor(time % 60) < 10 ? "0" : ""}${Math.floor(time % 60)}s`;
        }
        document.querySelector("#progressBar > progress").value = time;
    }, [time]);

    const togglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }

    const timeUpdate = (e) => {
        setTime(e.target.currentTime);
    }
    const ex = () => {
        setIsPlaying(false)
    }

    const onFileSelected = (e) => {
        setAudio(e.target.files[0]);
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
            <input type="file" id="audioFileInput" onChange={onFileSelected} className="active" accept="audio/*"></input>
            <div id="audioContainer">
                <button className="play" onPause={ex} onPlay={() => setIsPlaying(true)} onClick={togglePlay}>
                    <span className="material-symbols-outlined">play_arrow</span>
                </button>
                <p id="name"></p>
                <div id="progressBar">
                    <input type="range" defaultValue="0" onChange={(e) => onChange(document.querySelector("audio"), e)}></input>
                    <progress value="0"></progress>
                    <p className="current"></p>
                </div>
                <audio controls onTimeUpdate={timeUpdate}>
                    Your browser does not support the audio element.
                </audio>
            </div>
        </>
    )
}