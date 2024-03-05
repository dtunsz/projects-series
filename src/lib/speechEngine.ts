import { useState } from "react";


const speechEngine = (sentences: Array<string>) => {

    let speechMaker: SpeechSynthesis
    if (typeof window !== 'undefined') {
        speechMaker = window.speechSynthesis;
    }
    // const speechMaker = window.speechSynthesis;

    let utterance: SpeechSynthesisUtterance | null = (null)
    // const [utterance, setUtterrance] = useState<SpeechSynthesisUtterance | null>(null)
    const [sentenceNum, setSentenceNum] = useState(0);
    const [currentSentence, setCurrentSentence] = useState("");
    const [currentWord, setCurrentWord] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [currentWordCharLength, setCurrentWordCharLength] = useState<number>(0);
    let number = 0;

    const loadUtterance = (word: string) => {
        let wordUtterance = new SpeechSynthesisUtterance(word);

        wordUtterance.onboundary = (e: SpeechSynthesisEvent) => {
            // console.log(e, 11111, e.name)
            // currentSentence = sentences[(number-1)]
            let wordIndex = e.charIndex;
            setCurrentWordIndex(e.charIndex);
            let wordLength = e.charLength;
            setCurrentWordCharLength(e.charLength)
            // let word = currentSentence.charAt(wordIndex)
            function findWord() {
                let word = "";
                for (let index = wordIndex; index < wordIndex + wordLength; index++) {
                    // const element = (wordIndex+wordLength);
                    const char = currentSentence.charAt(index);
                    word += char;
                }
                return word;
            }
            let current = findWord();
            setCurrentWord(current);
            console.log(e, 11111, e.name, current, currentSentence);
        },
            wordUtterance.onend = (e: SpeechSynthesisEvent) => {
                // console.log(e, 222222, e.utterance)
                console.log(222222, e.utterance);
                console.log('Finished playing')
                // setSentenceNum(sentenceNum+1)
            },

            // setUtterrance(utterance);
            utterance = wordUtterance;
    };

    const setupPlay = () => {
        console.log(sentenceNum, number, "each time");
        if (number > sentences.length) {
            setCurrentSentence('');
            return;
        }
        setCurrentSentence(sentences[number]);
        loadUtterance(sentences[number]);
        play();

        setSentenceNum(sentenceNum + 1);
        // if (number < sentences.length) {
        //     number = number + 1;
        // }
        number = number + 1;

        console.log('I on actually played')
    };

    const play = () => {
        if (!utterance) throw new Error("No active utterance found to play");
        speechMaker.cancel();
        speechMaker.speak(utterance);
    }

    const pause = () => {
        speechMaker.pause();
    };

    const stop = () => {
        speechMaker.cancel();
    };

    return {
        setupPlay,
        pause,
        stop,
        sentenceNum,
        currentSentence,
        // currentWord,
        currentWordIndex,
        currentWordCharLength
    }

};

export { speechEngine };