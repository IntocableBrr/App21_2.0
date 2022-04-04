import React, { useState } from 'react';
import './GamePlay.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
let pauseQuittitle = 'Pause';
let onPause = false;
let speed = 500;
let message = 'Good luck';
let disableButton = true;
let userWon = false;
let hideRetryQuit = true;
let hideGameplay = true;
let hideMainmenu = false;
let hideButtons = false;
let x = false; // Becomes true when user starts gameplay so that it can go throug the algorithm and the computer can make the first play. Also becomes true on buttons 1-3 clicks so that computer can make the next play. Becomes false after it goes through the algorithm to prevent the computer from playing 2 times in a row.

const GamePlay = () => {
  const [, setStartQuitgame] = useState(null);
  const [currentSlide, setSlide] = useState(null);
  const [hideOptions, setOptions] = useState(true);
  const [hidePausemenu, setPause] = useState(true);

  let [count, setCount] = useState(0);

  const pauseHandler = () => {
    if (hidePausemenu === false) {
      hideGameplay = false;
      setPause(true);
    } else {
      hideGameplay = true;
      setPause(false);
    }
    onPause = true;
  };

  const optionHandler = () => {
    hideMainmenu = true;
    hideGameplay = true;
    setOptions(false);
    setPause(true);
  };

  const saveHandler = () => {
    speed = currentSlide;
    if (onPause === true) {
      hideGameplay = true;
      setOptions(true);
      setPause(false);
    } else {
      hideMainmenu = false;
      setOptions(true);
      setPause(true);
    }
  };

  const slideHandler = (event) => {
    setSlide(event.target.value);
  };

  const retryHandler = () => {
    hideRetryQuit = true;
    message = 'Good luck';
    hideButtons = false;
    disableButton = true;
    hideGameplay = false;
    x = true;
    pauseQuittitle = 'Pause';
    setCount(0);
    setPause(true);
  };
  const quitHandler = () => {
    hideGameplay = true;
    hideMainmenu = false;
    onPause = false;
    setCount();
    setStartQuitgame();
    setPause(true);
  };

  const startHandler = () => {
    x = true;
    disableButton = true;
    hideGameplay = false;
    hideMainmenu = true;
    message = 'Good luck';
    hideRetryQuit = true;
    hideButtons = false;
    setCount(0);
    setStartQuitgame();
  };

  const clickHandler = (event) => {
    disableButton = true;
    x = true;
    if (count < 21) {
      setCount(parseInt(event.target.value) + count);
    }
  };
  if ((count > 20) & (x === false) & (userWon === false)) {
    message = 'Victory';
    userWon === true;
    setTimeout(() => {
      message = 'You defeated me, I bet you can not win twice in a row';
      setCount(0);
    }, 1000);
  } else if ((count < 21) & (x === true)) {
    if ((count % 4 === 0) & (x === true) & (userWon === false)) {
      x = false;
      let compPlay = Math.floor(Math.random() * 3) + 1;
      setTimeout(() => {
        setCount((count = count + compPlay), (disableButton = false));
      }, speed);
    } else {
      if (((count / 4 + 0.75) % 1 === 0) & (x === true)) {
        x = false;
        setTimeout(() => {
          setCount(count + 3, (disableButton = false));
        }, speed);
      } else if (((count / 4 + 0.5) % 1 === 0) & (x === true)) {
        x = false;
        setTimeout(() => {
          setCount(count + 2, (disableButton = false));
        }, speed);
      } else if (((count / 4 + 0.25) % 1 === 0) & (x === true)) {
        x = false;
        setTimeout(() => {
          setCount(count + 1, (disableButton = false));
        }, speed);
      }
    }
  } else if ((count > 20) & (x === true)) {
    message = 'Loser 😭';
    hideRetryQuit = false;
    hideButtons = true;
    pauseQuittitle = 'Quit';
  }
  return (
    <div>
      <div hidden={hideGameplay}>
        <h4 className="center">{message}</h4>
        <h3 className="center">{count}</h3>
        <div className="center">
          <button
            hidden={hideButtons}
            className="button"
            disabled={disableButton} // -------------- 1
            value="1"
            onClick={clickHandler}
          >
            1
          </button>
          <button
            hidden={hideButtons}
            className="button"
            disabled={disableButton} // -------------- 2
            value="2"
            onClick={clickHandler}
          >
            2
          </button>
          <button
            hidden={hideButtons}
            className="button"
            disabled={disableButton} // -------------- 3
            value="3"
            onClick={clickHandler}
          >
            3
          </button>
          <button
            className="button"
            hidden={hideRetryQuit} // -------------- Retry
            onClick={retryHandler}
          >
            Retry
          </button>
          <button
            className="button"
            hidden={false} // -------------- Pause
            onClick={pauseHandler}
          >
            {pauseQuittitle}
          </button>
        </div>
      </div>
      <div hidden={hideMainmenu}>
        <button onClick={startHandler}>Start</button>
        <button onClick={optionHandler}>Options</button>
        <button>Instructions</button>
        <button>Exit</button>
      </div>
      <div hidden={hideOptions}>
        <h4>Speed</h4>
        <Box sx={{ width: 175 }}>
          <Slider
            defaultValue={0}
            step={1}
            min={1}
            max={2000}
            onChange={slideHandler}
          />
        </Box>
        <button onClick={saveHandler}>Save</button>
      </div>
      <div hidden={hidePausemenu}>
        <button onClick={pauseHandler}>Continue</button>
        <button onClick={retryHandler}>Retry</button>
        <button onClick={optionHandler}>Options</button>
        <button onClick={quitHandler}>Quit</button>
      </div>
    </div>
  );
};
export default GamePlay;

//setTimeout(() => {
//disableButton = false;
//}, 1500);  used to have this before I created the main menu
