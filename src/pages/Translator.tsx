import React, { useState } from 'react';
import { runAi } from '../helpers/index'; // Or any other Gemini client library

const Translator = () => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async (value) => {
    const response = await runAi(value, 'en');
    setTranslatedText(response);
  };

  return (
    <div>
      <textarea value={textToTranslate} onChange={(e) => setTextToTranslate(e.target.value)} />
      <button onClick={handleTranslate}>Translate</button>
      <div>{translatedText}</div>
    </div>
  );
};

export default Translator;
