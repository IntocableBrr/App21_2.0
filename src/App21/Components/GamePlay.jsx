import React, { useState } from 'react';
import './GamePlay.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
//let ab = 500;
let pauseQuittitle = 'Pause';
let onPause = false;
let speed = 500;
let message = 'Good luck';
let disableButton = true;
let userWon = false;

//let hideRetryQuit = true;
//let hideGameplay = true;
//let hideMainMenu = false;
//let hideButtons = false;
let x = false; // Becomes true when user starts gameplay so that it can go throug the algorithm and the computer can make the first play. Also becomes true on buttons 1-3 clicks so that computer can make the next play. Becomes false after it goes through the algorithm to prevent the computer from playing 2 times in a row.

const GamePlay = () => {
  let [hideRetryQuit, setRetryQuit] = useState(true);
  const [hideGameplay, setGameplay] = useState(true);
  const [hideMainMenu, setMainMenu] = useState(false);
  let [hideButtons, setButtons] = useState(false);

  // const [, setStartQuitgame] = useState(null);
  const [currentSlide, setSlide] = useState(500);
  const [hideOptions, setOptions] = useState(true);
  const [hidePausemenu, setPause] = useState(true);
  const [hideInstructions, setInstructions] = useState(true);
  let [count, setCount] = useState(0);

  const instructionsbackHandler = (event) => {
    if (event.target.value === 'Back') {
      //hideMainMenu = false;
      setMainMenu(false);
      setInstructions(true);
      console.log('working boss!');
    } else {
      // hideMainMenu = true;
      setMainMenu(true);
      setInstructions(false);
    }
  };

  const pauseHandler = () => {
    if (hidePausemenu === false) {
      //hideGameplay = false;
      setGameplay(false);
      setPause(true);
    } else {
      //hideGameplay = true;
      setGameplay(true);
      setPause(false);
    }
    onPause = true;
  };

  const optionHandler = () => {
    //hideMainMenu = true;
    setMainMenu(true);
    //hideGameplay = true;
    setGameplay(true);
    setOptions(false);
    setPause(true);
  };

  const slideHandler = (event) => {
    setSlide((event.target.value - 1500) * -1);
  };

  const savediscardHandler = (event) => {
    if (event.target.value === 'Save') {
      speed = currentSlide;
    } else if (event.target.value === 'Discard') {
      setSlide(speed);
    }

    if (onPause === true) {
      //hideGameplay = true;
      setGameplay(true);
      setOptions(true);
      setPause(false);
    } else {
      // hideMainMenu = false;
      setMainMenu(false);
      setOptions(true);
      setPause(true);
    }
  };

  const retryHandler = () => {
    //hideRetryQuit = true;
    setRetryQuit(true);
    message = 'Good luck';
    //hideButtons = false;
    setButtons(false);
    disableButton = true;
    //hideGameplay = false;
    setGameplay(false);
    x = true;
    pauseQuittitle = 'Pause';
    setCount(0);
    setPause(true);
  };

  const quitHandler = () => {
    //hideGameplay = true;
    setGameplay(true);
    //hideMainMenu = false;
    setMainMenu(false);
    onPause = false;
    setCount();
    // setStartQuitgame();
    setPause(true);
  };

  const startHandler = () => {
    x = true;
    disableButton = true;
    // hideGameplay = false;
    setGameplay(false);
    // hideMainMenu = true;
    setMainMenu(true);
    message = 'Good luck';
    //hideRetryQuit = true;
    setRetryQuit(true);
    //hideButtons = false;
    setButtons(false);
    pauseQuittitle = 'Pause';
    setCount(0);
    //setStartQuitgame();
  };

  const gameplayHandler = (event) => {
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
    //setRetryQuit(false);
    hideButtons = true;
    //setButtons(true);
    pauseQuittitle = 'Quit';
  }
  return (
    <div>
      <div className="gameplay" hidden={hideGameplay}>
        <h4 className="center">{message}</h4>
        <h3 className="center">{count}</h3>
        <div className="center">
          <button
            hidden={hideButtons}
            className="gameplay_buttons"
            disabled={disableButton} // -------------- 1
            value="1"
            onClick={gameplayHandler}
          >
            1
          </button>
          <button
            hidden={hideButtons}
            className="gameplay_buttons"
            disabled={disableButton} // -------------- 2
            value="2"
            onClick={gameplayHandler}
          >
            2
          </button>
          <button
            hidden={hideButtons}
            className="gameplay_buttons"
            disabled={disableButton} // -------------- 3
            value="3"
            onClick={gameplayHandler}
          >
            3
          </button>
          <button
            className="gameplay_buttons"
            hidden={hideRetryQuit} // -------------- Retry
            onClick={retryHandler}
          >
            Retry
          </button>
          <button
            className="gameplay_buttons"
            hidden={false} // -------------- Pause/Quit
            onClick={'Pause' == pauseQuittitle ? pauseHandler : quitHandler}
          >
            {pauseQuittitle}
          </button>
        </div>
      </div>
      <div className="main_menu" hidden={hideMainMenu}>
        <h1 className="center">21 And Over</h1>
        <button className="main_buttons" onClick={startHandler}>
          Start
        </button>
        <button className="main_buttons" onClick={optionHandler}>
          Options
        </button>
        <button
          onClick={instructionsbackHandler}
          value="Instructions"
          className="main_buttons"
        >
          Instructions
        </button>
        <button className="main_buttons">Exit</button>
      </div>
      <div className="options_menu" hidden={hideOptions}>
        <h4>Speed</h4>
        <Box sx={{ width: 175 }}>
          <Slider
            value={(currentSlide - 1500) * -1}
            step={1}
            min={1}
            max={1500}
            onChange={slideHandler}
          />
        </Box>
        <button
          className="option_buttons"
          value="Save"
          onClick={savediscardHandler}
        >
          Save
        </button>
        <button
          className="option_buttons"
          value="Discard"
          onClick={savediscardHandler}
        >
          Discard
        </button>
      </div>
      <div className="pause_menu" hidden={hidePausemenu}>
        <button className="pause_menu_buttons" onClick={pauseHandler}>
          Continue
        </button>
        <button className="pause_menu_buttons" onClick={optionHandler}>
          Options
        </button>
        <button className="pause_menu_buttons" onClick={retryHandler}>
          Retry
        </button>
        <button className="pause_menu_buttons" onClick={quitHandler}>
          Quit
        </button>
      </div>
      <div hidden={hideInstructions} className="instructions_menu">
        <h3>
          There are <em className="number_4">4</em> things you need to know
        </h3>
        <ol>
          <li className="list_item">You can only make one play per turn</li>
          <li className="list_item">
            The play you make will be added to the count
          </li>
          <li className="list_item">Whoever goes 21 or over loses</li>
          <li className="list_item_4">
            You are better of not making the first play
          </li>
        </ol>
        <button
          value="Back"
          onClick={instructionsbackHandler}
          className="instructions_button"
        >
          Back
        </button>
      </div>
    </div>
  );
};
export default GamePlay;
