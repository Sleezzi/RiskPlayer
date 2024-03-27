import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./cdn/css/index.css";

import Audio from "./components/Audio";

import Settings from './pages/Settings';
import Body from "./components/index";


function App() {

    const [audio, setAudio] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoop, setIsLoop] = useState(localStorage.getItem("loop") || false);
    const [time, setTime] = useState(0);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Body audio={[audio, setAudio]} isPlaying={[isPlaying, setIsPlaying]} isLoop={[isLoop, setIsLoop]} time={[time, setTime]} />
        },
        {
            path: "settings",
            element: <Settings />
        },
        {
            path: "*",
            element: <Body audio={[audio, setAudio]} isPlaying={[isPlaying, setIsPlaying]} isLoop={[isLoop, setIsLoop]} time={[time, setTime]}/>
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
            <Audio audio={[audio, setAudio]} isPlaying={[isPlaying, setIsPlaying]} isLoop={[isLoop, setIsLoop]} time={[time, setTime]} />
        </>
    );
}

export default App;
