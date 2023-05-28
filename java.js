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
  const p1 = document.getElementById("playerOne");
  const p2 = document.getElementById("playerTwo");
  const submit = document.getElementById("psubmit");

  const addPlayer = () => {
    if (pname.value === "") return;
    else if (players.length === 2) {
      submit.textContent = "Game's Full";
      return;
    } else if (players.length === 0) {
      submit.classList.remove("alert");
      players.push(makePlayer(pname.value, "X"));
    } else {
      players.push(makePlayer(pname.value, "O"));
      activePlayer = players[Math.floor(Math.random() * 2)];
      if (activePlayer === players[0]) {
        p1.classList.add("alert");
      } else {
        p2.classList.add("alert");
      }
    }
  };

  submit.addEventListener("click", (e) => {
    addPlayer();
    pname.value = "";
    if (players.length === 1) {
      p1.textContent = `${players[0].name}`;
    } else if (players.length === 2) {
      p2.textContent = `${players[1].name}`;
    }
  });

  let getPlayers = () => players;
  let getActive = () => activePlayer;

  let switchActive = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
      p2.classList.add("alert");
      p1.classList.remove("alert");
    } else {
      activePlayer = players[0];
      p1.classList.add("alert");
      p2.classList.remove("alert");
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
  const p1 = document.getElementById("playerOne");
  const p2 = document.getElementById("playerTwo");
  const p1winner = document.getElementById("p1announcement");
  const p2winner = document.getElementById("p2announcement");
  const p1Wins = document.getElementById("Xwins");
  const p2Wins = document.getElementById("Owins");
  const newGame = document.getElementById("newGame");
  let winnerDeclared = false;

  let xWins = 0;
  let oWins = 0;

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
        let attempts = 0;
        // placing your X or O
        button.addEventListener("click", (e) => {
          if (winnerDeclared === true) {
            newGame.classList.add("alert");
          } else if (players.getPlayers().length < 2) {
            const submit = document.getElementById("psubmit");
            submit.classList.add("alert");
            return;
          } else if (
            board
              .getBoard()
              [Number(e.target.dataset.row)][
                Number(e.target.dataset.column)
              ].getMark() !== "stunna"
          ) {
            return;
          } else {
            if (players.getActive() === players.getPlayers()[0]) {
              e.target.textContent = "X";
            } else {
              e.target.textContent = "0";
            }
            board
              .getBoard()
              [Number(e.target.dataset.row)][
                Number(e.target.dataset.column)
              ].addMark(players.getActive());
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

  //takes winning player and adds to their total win count, makes pop-up appear
  function gameOverMan(player) {
    let winningMsgs = [
      "astonishes with their magnificent ",
      "perserveres aided by their crafty ",
      "dominates leading the big big ",
    ];
    if (player === players.getPlayers()[0]) {
      p1winner.classList.add("pop");
      p1winner.textContent = `${player.name} ${
        winningMsgs[Math.floor(Math.random() * 3)]
      } ${player.marker}s`;
    } else p2winner.classList.add("pop");
    p2winner.textContent = `${player.name} ${
      winningMsgs[Math.floor(Math.random() * 3)]
    } ${player.marker}s`;
    p1Wins.textContent = `X wins: ${xWins}`;
    p2Wins.textContent = `O wins: ${oWins}`;
    newGame.classList.add("pop");
  }

  newGame.addEventListener("click", (e) => {
    winnerDeclared = false;
    newGame.classList.remove("alert");
    p1winner.classList.remove("pop");
    p2winner.classList.remove("pop");
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
      winnerDeclared = true;
      xWins++;
      p1.classList.remove("alert");
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
      winnerDeclared = true;
      oWins++;
      p2.classList.remove("alert");
      gameOverMan(players.getActive());
    } else players.switchActive();
  }
  return { displayBoard };
}

gameState().displayBoard();
