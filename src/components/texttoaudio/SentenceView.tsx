import { useEffect, useState } from "react";

// This component displays the currently read word and sentence

type SentenceProps = {
    sentences: Array<string>;
    currentSentence: string;
    currentWord: string;
    currentWordIndex: number;
    currentWordCharLength: number
}
export const SentenceView = ({ sentences, currentSentence, currentWord, currentWordIndex, currentWordCharLength }: SentenceProps) => {
    // let allSentences = sentences.join()
    // let firstSentence = ''
    // let remainingSentence = ''
    const [beforeCurrWord, setBeforeCurrWord] = useState('')
    const [afterCurrWord, setAfterCurrWord] = useState('')
    const rearrangeSetence = () => {
        let beforeCurrentWord = ''
        let afterCurrentWord = ''
        if (currentWordIndex !== 0) {
            beforeCurrentWord = currentSentence.substring(0, currentWordIndex);
            setBeforeCurrWord(beforeCurrentWord)
            afterCurrentWord = currentSentence.substring(currentWordIndex + currentWordCharLength)
        } else if ((currentWordIndex + currentWordCharLength) === currentSentence.length) {
            afterCurrentWord = ''
        }
        else {
            afterCurrentWord = currentSentence.substring(currentWordCharLength + 1)
        }
        setAfterCurrWord(afterCurrentWord)
        // let
        // arr.push(currentSentence.substring(0, currentWordIndex-1));
        // arr.push(str.substring(22));
    }
    useEffect(() => {
        rearrangeSetence()
    }, [currentWordCharLength])
    return (
        <div className="currently-reading">
            <h3>Currently reading:</h3>
            <div className="currently-reading-text inline">
                {currentWordIndex !== 0 ? beforeCurrWord : ''}
                <div className="text-red-600"> {' ' + currentWord}</div>
                {currentSentence && (currentWordIndex + currentWordCharLength) === currentSentence.length ? afterCurrWord : ''}
            </div>
            <div>
                <h3>Sentence to be read:</h3>
                <p>{sentences.join(' ')}</p>
            </div>
        </div>
    );
};
