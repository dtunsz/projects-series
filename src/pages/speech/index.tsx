import { useEffect, useState } from "react";
import AudioContol from "@/components/texttoaudio/AudioControl";
import { SentenceView } from "@/components/texttoaudio/SentenceView";
import TextForm from "@/components/texttoaudio/TextForm";
import { speechEngine } from "@/lib/speechEngine";
// import '../../app/globals.css'


export default function Home() {
    const [sentence, setSentence] = useState<string>("");
    const [sentences, setSentences] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState('')
    // const [canPlay, setCanPlay] = useState(false)


    const {
        setupPlay,
        pause,
        stop,
        sentenceNum,
        currentSentence,
        // currentWord,
        currentWordIndex,
        currentWordCharLength
    } = speechEngine(sentences);

    const addSentence = () => {
        if (sentence.length) {
            setSentences([...sentences, sentence])
            setSentence('');
        }
    }

    const canPlaySentence = () => !currentSentence && sentences.length ? true : false

    useEffect(() => {
        // getDataAndParse()
        findWord();
    }, [currentWordCharLength]);


    const findWord = () => {
        let word = "";
        for (let index = currentWordIndex; index < (currentWordIndex + currentWordCharLength); index++) {
            // const element = (wordIndex+wordLength);
            const char = currentSentence.charAt(index);
            word += char;
        }
        // return word;
        let current = word;
        setCurrentWord(current);
    }
    const sentenceObj = {
        sentences: sentences,
        currentSentence: currentSentence,
        currentWord,
        currentWordIndex,
        currentWordCharLength
    };

    const controlProps = {
        play: setupPlay,
        pause,
        stop,
        canPlay: canPlaySentence
    }

    return (
        <div className="center">
            <h1>Text reader</h1>
            <p>This is a simple app that take text and read them out audibly</p>
            <div>
                <TextForm sentence={sentence} setSentence={setSentence} addSentence={addSentence} sentences={sentences} />
            </div>
            <SentenceView {...sentenceObj} />
            <div> <AudioContol {...controlProps} /> </div>
        </div>
    )
}