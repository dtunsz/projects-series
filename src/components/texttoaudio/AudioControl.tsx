import { useState } from "react";

interface ControlProps {
    play: () => void;
    pause: () => void;
    canPlay: () => boolean;
    stop: () => void;
}

export default function AudioContol({ play, pause, canPlay, stop }: ControlProps) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const playSentence = () => {
        setIsPlaying(true);
        setIsPaused(false);
        play()
    }
    const pauseSentence = () => {
        setIsPaused(true);
        setIsPlaying(false);
        pause()
    }
    const read = () => {
        let speaker = window.speechSynthesis;
        let utterance = new SpeechSynthesisUtterance("Hello world!");
        speaker.speak(utterance);
    };

    return (
        <div>
            <button onClick={playSentence}>Play</button>
            <button onClick={pauseSentence}>Pause</button>
            {/* { isPlaying ? <button onClick={pauseSentence}>Pause</button>: ''}
            { isPaused || !isPaused &&!isPlaying || canPlay() ? <button onClick={playSentence}>Play</button>: ''} */}
            {/* <button onClick={read}>Test</button> */}
            <button onClick={stop}>Stop</button>
        </div>
    )
}