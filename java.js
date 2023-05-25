const playerFactory = () => {
  const players = [];
  const makePlayer = (name, marker) => {
    return {
      name,
      marker,
    };
  };

  let activePlayer;
  const pname = document.getElementById("pname");
  const warning = document.querySelector(".warning");
  const p1 = document.getElementById("playerOne");
  const p2 = document.getElementById("playerTwo");

  const addPlayer = () => {
    if (players.length === 2) {
      warning.classList.add("activeWarning");
      return;
    } else if (players.length !== 0) {
      players.push(makePlayer(pname.value, "O"));
      activePlayer = players[Math.floor(Math.random() * 2)];
      if (activePlayer === players[0]) {
        p1.classList.add("activePlayer");
      } else {
        p2.classList.add("activePlayer");
      }
    } else players.push(makePlayer(pname.value, "X"));
  };

  let getPlayers = () => players;
  let getActive = () => activePlayer;

  let switchActive = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
      p2.classList.add("activePlayer");
      p1.classList.remove("activePlayer");
    } else {
      activePlayer = players[0];
      p1.classList.add("activePlayer");
      p2.classList.remove("activePlayer");
    }
  };

  return { addPlayer, getPlayers, getActive, switchActive };
};

function gameBoard() {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;

  return { getBoard };
}

function Cell() {
  let mark = "stunna";
  const getMark = () => mark;
  const addMark = (player) => (mark = player.marker);
  const resetMark = () => (mark = "stunna");
  return { getMark, addMark, resetMark };
}

function gameState() {
  const players = playerFactory();
  const board = gameBoard();
  const submit = document.getElementById("psubmit");

  let xWins = 0;
  let oWins = 0;

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    players.addPlayer();
  });

  function displayBoard() {
    const display = document.getElementById("gameboard");
    let row = 0;
    board.getBoard().forEach((x) => {
      for (i = 0; i < x.length; i++) {
        const button = document.createElement("button");
        button.classList.add("cell");
        button.setAttribute("data-row", `${row}`);
        button.setAttribute("data-column", `${i}`);
        display.appendChild(button);
        // placing your X or O
        button.addEventListener("click", (e) => {
          if (
            board
              .getBoard()
              [Number(e.target.dataset.row)][
                Number(e.target.dataset.column)
              ].getMark() !== "stunna"
          ) {
            return;
          } else {
            if (players.getActive() === players.getPlayers()[0]) {
              e.target.classList.add("red");
            } else {
              e.target.classList.add("green");
            }
            board
              .getBoard()
              [Number(e.target.dataset.row)][
                Number(e.target.dataset.column)
              ].addMark(players.getActive());
            // console.log(
            //   board
            //     .getBoard()
            //     [Number(e.target.dataset.row)][
            //       Number(e.target.dataset.column)
            //     ].getMark()
            // );
            checkForWin();
          }
        });
      }
      row++;
    });
  }

  function eraseBoard() {
    const display = document.getElementById("gameboard");
    const cells = document.getElementsByClassName("cell");
    Array.from(cells).forEach((cell) => display.removeChild(cell));
    board.getBoard().forEach((row) => {
      row.forEach((cell) => cell.resetMark());
    });
  }

  // function switchTurn() {
  //   checkForWin();
  //   players.switchActive();
  // }
  const popup = document.getElementById("popup");
  //takes winning player and adds to their total win count, makes pop-up appear
  function gameOverMan(player) {
    const winner = document.getElementById("winner");
    const p1Wins = document.getElementById("Xwins");
    const p2Wins = document.getElementById("Owins");

    let winningMsgs = [
      "astonishes with their magnificent ",
      "perserveres aided by their crafty ",
      "dominates leading the big big ",
    ];
    popup.classList.add("pop");
    winner.textContent = `${player.name} ${
      winningMsgs[Math.floor(Math.random() * 3)]
    } ${player.marker}s`;
    p1Wins.textContent = `X wins: ${xWins}`;
    p2Wins.textContent = `O wins: ${oWins}`;
  }

  const newGame = document.getElementById("newGame");
  newGame.addEventListener("click", (e) => {
    e.preventDefault;
    popup.classList.remove("pop");
    players.switchActive();
    eraseBoard();
    gameBoard();
    displayBoard();
  });

  function checkForWin() {
    if (
      //row wins
      (board.getBoard()[0][0].getMark() === "X" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[0][1].getMark() &&
        board.getBoard()[0][0].getMark() === board.getBoard()[0][2].getMark() &&
        board.getBoard()[0][1].getMark() ===
          board.getBoard()[0][2].getMark()) ||
      (board.getBoard()[1][0].getMark() === "X" &&
        board.getBoard()[1][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[1][0].getMark() === board.getBoard()[1][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[1][2].getMark()) ||
      (board.getBoard()[2][0].getMark() === "X" &&
        board.getBoard()[2][0].getMark() === board.getBoard()[2][1].getMark() &&
        board.getBoard()[2][0].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[2][1].getMark() ===
          board.getBoard()[2][2].getMark()) ||
      // diagonal win left to right descending
      (board.getBoard()[0][0].getMark() === "X" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[0][0].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[2][2].getMark()) ||
      // diagonal win left to right ascending
      (board.getBoard()[2][0].getMark() === "X" &&
        board.getBoard()[2][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[2][0].getMark() === board.getBoard()[0][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[0][2].getMark()) ||
      //column wins
      (board.getBoard()[1][0].getMark() === "X" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[1][0].getMark() &&
        board.getBoard()[1][0].getMark() === board.getBoard()[2][0].getMark() &&
        board.getBoard()[0][0].getMark() ===
          board.getBoard()[2][0].getMark()) ||
      (board.getBoard()[1][1].getMark() === "X" &&
        board.getBoard()[0][1].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[1][1].getMark() === board.getBoard()[2][1].getMark() &&
        board.getBoard()[0][1].getMark() ===
          board.getBoard()[2][1].getMark()) ||
      (board.getBoard()[1][2].getMark() === "X" &&
        board.getBoard()[0][2].getMark() === board.getBoard()[1][2].getMark() &&
        board.getBoard()[1][2].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[0][2].getMark() === board.getBoard()[2][2].getMark())
    ) {
      xWins++;
      console.log(players.getActive());
      gameOverMan(players.getActive());
    } else if (
      (board.getBoard()[0][0].getMark() === "O" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[0][1].getMark() &&
        board.getBoard()[0][0].getMark() === board.getBoard()[0][2].getMark() &&
        board.getBoard()[0][1].getMark() ===
          board.getBoard()[0][2].getMark()) ||
      (board.getBoard()[1][0].getMark() === "O" &&
        board.getBoard()[1][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[1][0].getMark() === board.getBoard()[1][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[1][2].getMark()) ||
      (board.getBoard()[2][0].getMark() === "O" &&
        board.getBoard()[2][0].getMark() === board.getBoard()[2][1].getMark() &&
        board.getBoard()[2][0].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[2][1].getMark() ===
          board.getBoard()[2][2].getMark()) ||
      // diagonal win left to right descending
      (board.getBoard()[0][0].getMark() === "O" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[0][0].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[2][2].getMark()) ||
      // diagonal win left to right ascending
      (board.getBoard()[2][0].getMark() === "O" &&
        board.getBoard()[2][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[2][0].getMark() === board.getBoard()[0][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[0][2].getMark()) ||
      //column wins
      (board.getBoard()[1][0].getMark() === "O" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[1][0].getMark() &&
        board.getBoard()[1][0].getMark() === board.getBoard()[2][0].getMark() &&
        board.getBoard()[0][0].getMark() ===
          board.getBoard()[2][0].getMark()) ||
      (board.getBoard()[1][1].getMark() === "O" &&
        board.getBoard()[0][1].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[1][1].getMark() === board.getBoard()[2][1].getMark() &&
        board.getBoard()[0][1].getMark() ===
          board.getBoard()[2][1].getMark()) ||
      (board.getBoard()[1][2].getMark() === "O" &&
        board.getBoard()[0][2].getMark() === board.getBoard()[1][2].getMark() &&
        board.getBoard()[1][2].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[0][2].getMark() === board.getBoard()[2][2].getMark())
    ) {
      oWins++;
      gameOverMan(players.getActive());
    } else players.switchActive();
  }
  return { displayBoard };
}

gameState();
gameState().displayBoard();
