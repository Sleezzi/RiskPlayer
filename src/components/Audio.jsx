export default function Audio() {
    return (
        <>
            <audio controls>
                <source src="horse.ogg" type="audio/ogg"></source>
                <source src="horse.mp3" type="audio/mpeg"></source>
                Your browser does not support the audio element.
            </audio>
        </>
    )
}