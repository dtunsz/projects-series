// import { useState } from "react";

interface Props {
    sentence: string;
    setSentence: React.Dispatch<React.SetStateAction<string>>;
    addSentence: () => void;
    sentences: string[];
}

// This component is used to add new sentences
const TextForm = ({ sentence, setSentence, addSentence, sentences }: Props) => {

    return (
        <div>
            <div>
                <textarea
                    name="sentence"
                    id=""
                    cols={30}
                    rows={10}
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)}
                ></textarea>
                <button type="button" onClick={addSentence}>Add Sentence</button>
            </div>
        </div>
    );
};

export default TextForm;
