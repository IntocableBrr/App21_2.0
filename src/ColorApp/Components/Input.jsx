import React, { useState } from 'react';
import { sha256 } from 'js-sha256';
const Input = () => {
  const [OutputText, setData] = useState(null);
  const [color, setColor] = useState(null);

  const inputChangeHandler = (event) => {
    const newInput = event.target.value;
    setData(event.target.value);
    const hash = sha256(newInput);
    setColor('#' + hash.substring(0, 6));
  };

  return (
    <div>
      <h2 style={{ color: color }}>{OutputText}</h2>
      <input onChange={inputChangeHandler} />
    </div>
  );
};

export default Input;
