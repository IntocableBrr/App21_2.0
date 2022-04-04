import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function Slider() {
  const [currentSlide, setSlide] = useState(null);
  const [headerColor, setColor] = useState(null);

  const slideHandler = (event) => {
    setSlide(event.target.value);
    setColor('#' + event.target.value);
  };

  return (
    <div>
      <h1 style={{ color: headerColor }}>{currentSlide}</h1>
      <Box sx={{ width: 525 }}>
        <Slider
          defaultValue={0}
          step={1}
          min={1}
          max={1000000}
          onChange={slideHandler}
        />
      </Box>
    </div>
  );
}
