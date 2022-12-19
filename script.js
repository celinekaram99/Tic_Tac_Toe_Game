"use strict";

// array of game conditions
const cond = [0, 0, 0, 0, 0, 0, 0, 0, 0];

let counter = 0;
const timeOut = "You Loose !";

// function to check game timer
function gameTimer() {
  console.log({ cond });
  let fullCellsCount = cond.filter((cell) => cell !== 0).length;
  console.log({ counter, fullCellsCount });
  if (counter === fullCellsCount) {
    alert(timeOut);
    newGame();
  }
}

let timeout;
let breakGame = false;
let currentplayer = "X";

//function  reastart game
function newGame() {
  let playerDisplay = document.querySelector(".displayplayer");
  playerDisplay.innerHTML = "X";
  currentplayer = "X";
  counter = 0;
  let grid = document.querySelectorAll(".tile");
  breakGame = false;

  for (let i = 0; i < grid.length; i++) {
    grid[i].innerHTML = "";
  }
  for (let j = 0; j < cond.length; j++) {
    cond[j] = 0;
  }
}

// function to index X & O into the tiles

function playersTurn(_id) {
  let playerDisplay = document.querySelector(".displayplayer");

  clearTimeout(timeout);
  if (breakGame) {
    return;
  }
  let box = _id.charAt(1);
  if (cond[box] > 0) {
    return;
  }
  let g = document.getElementById(_id);
  counter++;

  if (currentplayer == "X") {
    playerDisplay.innerHTML = "O";
    g.innerHTML = "X";
    cond[box] = 1;

    currentplayer = "O";
  } else {
    playerDisplay.innerHTML = "X";
    g.innerHTML = "O";
    cond[box] = 2;

    currentplayer = "X";
  }

  //Checks if the player exceeds the time & if the gameover

  timeout = setTimeout(function () {
    gameTimer();
  }, 30000);
  checkWinner();
}

// Winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Check if the player meets one of win conditions and return the game result

function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const firstCond = cond[winCondition[0]];
    const secondCond = cond[winCondition[1]];
    const thirdCond = cond[winCondition[2]];

    // check if player X win
    if (firstCond === 1 && secondCond === 1 && thirdCond === 1) {
      alert("Player X is The WINNER...!");
      newGame();
      return;
    }

    // check if player O win

    if (firstCond === 2 && secondCond === 2 && thirdCond === 2) {
      alert("Player O is The WINNER...!");
      newGame();
      return;
    }
  }

  //check if all the cells is ful and in the last turn one of the players wins
  if (cond.every((x) => x !== 1 && x !== 2)) {
    return;
    newGame();
  }

  // check if no player win --> (Toe condition)

  if (cond.every((x) => x > 0)) {
    alert("Toe..! ");
    newGame();
  }
}
