const playerFactory = () => {
  const players = [];
  const makePlayer = (name, marker) => {
    player = {
      name,
      marker,
      wins: 0,
    };
    players.push(player);
  };
  let getPlayers = () => players;
  return { makePlayer, getPlayers };
};

function gameBoard() {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(Cell());
    }
  }

  const makePick = (row, column) => {
    board[row][column].getMark() !== "stunna"
      ? alert("Already taken!")
      : board[row][column].addMark(activePlayer);
  };

  const getBoard = () => board;

  return { getBoard, makePick };
}

function Cell() {
  let mark = "stunna";
  const getMark = () => mark;
  const addMark = (player) => (mark = player.marker);
  return { getMark, addMark };
}

function gameState() {
  const players = playerFactory();
  const board = gameBoard();
  let activePlayer = players.getPlayers()[Math.floor(Math.random() * 2)];

  function switchTurn() {
    activePlayer === players.getPlayers()[0]
      ? (activePlayer = players.getPlayers[1])
      : (activePlayer = players.getPlayers[0]);
  }

  function playRound(row, column) {
    board.makePick(row, column);
    checkForWin();
  }

  //takes winning player and makes the other player go first next game
  function gameOverMan(player) {
    if ((player = players.getPlayers()[0])) {
      activePlayer = players.getPlayers()[1];
    } else activePlayer = players.getPlayers()[0];
    gameBoard();
  }
  function checkForWin() {
    if (
      //row wins
      (board.getBoard[0][0].getMark() === "X" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[0][1].getMark() &&
        board.getBoard()[0][0].getMark() === board.getBoard()[0][2].getMark() &&
        board.getBoard()[0][1].getMark() ===
          board.getBoard()[0][2].getMark()) ||
      (board.getBoard[1][0].getMark() === "X" &&
        board.getBoard()[1][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[1][0].getMark() === board.getBoard()[1][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[1][2].getMark()) ||
      (board.getBoard[2][0].getMark() === "X" &&
        board.getBoard()[2][0].getMark() === board.getBoard()[2][1].getMark() &&
        board.getBoard()[2][0].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[2][1].getMark() ===
          board.getBoard()[2][2].getMark()) ||
      // diagonal win left to right descending
      (board.getBoard[0][0].getMark() === "X" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[0][0].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[2][2].getMark()) ||
      // diagonal win left to right ascending
      (board.getBoard[2][0].getMark() === "X" &&
        board.getBoard()[2][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[2][0].getMark() === board.getBoard()[0][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[0][2].getMark()) ||
      //column wins
      (board.getBoard[1][0].getMark() === "X" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[1][0].getMark() &&
        board.getBoard()[1][0].getMark() === board.getBoard()[2][0].getMark() &&
        board.getBoard()[0][0].getMark() ===
          board.getBoard()[2][0].getMark()) ||
      (board.getBoard[1][1].getMark() === "X" &&
        board.getBoard()[0][1].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[1][1].getMark() === board.getBoard()[2][1].getMark() &&
        board.getBoard()[0][1].getMark() ===
          board.getBoard()[2][1].getMark()) ||
      (board.getBoard[1][2].getMark() === "X" &&
        board.getBoard()[0][2].getMark() === board.getBoard()[1][2].getMark() &&
        board.getBoard()[1][2].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[0][2].getMark() === board.getBoard()[2][2].getMark())
    )
      gameOverMan(players.getPlayers()[0]);
    else if (
      (board.getBoard[0][0].getMark() === "O" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[0][1].getMark() &&
        board.getBoard()[0][0].getMark() === board.getBoard()[0][2].getMark() &&
        board.getBoard()[0][1].getMark() ===
          board.getBoard()[0][2].getMark()) ||
      (board.getBoard[1][0].getMark() === "O" &&
        board.getBoard()[1][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[1][0].getMark() === board.getBoard()[1][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[1][2].getMark()) ||
      (board.getBoard[2][0].getMark() === "O" &&
        board.getBoard()[2][0].getMark() === board.getBoard()[2][1].getMark() &&
        board.getBoard()[2][0].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[2][1].getMark() ===
          board.getBoard()[2][2].getMark()) ||
      // diagonal win left to right descending
      (board.getBoard[0][0].getMark() === "O" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[0][0].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[2][2].getMark()) ||
      // diagonal win left to right ascending
      (board.getBoard[2][0].getMark() === "O" &&
        board.getBoard()[2][0].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[2][0].getMark() === board.getBoard()[0][2].getMark() &&
        board.getBoard()[1][1].getMark() ===
          board.getBoard()[0][2].getMark()) ||
      //column wins
      (board.getBoard[1][0].getMark() === "O" &&
        board.getBoard()[0][0].getMark() === board.getBoard()[1][0].getMark() &&
        board.getBoard()[1][0].getMark() === board.getBoard()[2][0].getMark() &&
        board.getBoard()[0][0].getMark() ===
          board.getBoard()[2][0].getMark()) ||
      (board.getBoard[1][1].getMark() === "X" &&
        board.getBoard()[0][1].getMark() === board.getBoard()[1][1].getMark() &&
        board.getBoard()[1][1].getMark() === board.getBoard()[2][1].getMark() &&
        board.getBoard()[0][1].getMark() ===
          board.getBoard()[2][1].getMark()) ||
      (board.getBoard[1][2].getMark() === "X" &&
        board.getBoard()[0][2].getMark() === board.getBoard()[1][2].getMark() &&
        board.getBoard()[1][2].getMark() === board.getBoard()[2][2].getMark() &&
        board.getBoard()[0][2].getMark() === board.getBoard()[2][2].getMark())
    ) {
      gameOverMan(players.getPlayers[1]);
    } else switchTurn();
  }
  return { playRound };
}

function addPlayer() {
  const name = document.getElementById("p1name");
  const fact = playerFactory();
  fact.makePlayer(name.value, "X");
}

function displayBoard() {
  const board = document.getElementById("gameboard");
  const boardArray = gameBoard().getBoard();
  boardArray.forEach((row) => {
    for (i = 0; i < row.length; i++) {
      const button = document.createElement("button");
      button.classList.add("cell");
      board.appendChild(button);
    }
  });
}

const subP1 = document.getElementById("p1submit");

subP1.addEventListener("click", (e) => {
  e.preventDefault();
  addPlayer();
});
