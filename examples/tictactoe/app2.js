import { elementConstructors } from "../../src/viv.js";

const { button, div, ol, li } = elementConstructors;

// square component
function square(onclick) {
  return button("square", { onclick }, (value = null) => value || "")
}

// Generating an array of square components for the application.
const uiSquares = [];
for (let i = 0; i < 9; i++) {
  uiSquares.push(square((e) => squareOnClick(e, i)));
}

// board component. The uiSquares array is used to populate the board.
const board =
  [
    div("board-row", uiSquares[0], uiSquares[1], uiSquares[2]),
    div("board-row", uiSquares[3], uiSquares[4], uiSquares[5]),
    div("board-row", uiSquares[6], uiSquares[7], uiSquares[8]),
  ];

// Application state
let state = {
  history: [
    {
      squares: new Array(9).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: true
};

// Displays the buttons to show the moves that have been
// taken.
const moves = ol(() => {
  return state.history.map((step, move) => {
    const desc = move > 0 ?
      "Go to move #" + move :
      "Go to game start";
    return li({ key: move },
      button({ onclick: () => jumpTo(move) }, desc))
  })
});


// Displays the status info
const status = div(function update() {
  const squares = state.history[state.stepNumber].squares;
  const winner = calculateWinner(squares);
  if (winner) {
    return "Winner: " + winner;
  }
  else {
    return "Next player: " + (state.xIsNext ? "X" : "O");
  }
});

// Structure of the application.
const app =
  div("game",
    div("game-board", ...board),
    div("game-info", status, moves)
  );

// Adding our application to the browser.
document.getElementById("root").replaceWith(app);

// This is the event handler that is added to square components
// This handler runs when somone clicks on a square component.
function squareOnClick(e, i) {
  const uiSquare = e.target;
  const history = state.history.slice(0, state.stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = state.xIsNext ? "X" : "O";

  uiSquare.viv.functions[0](squares[i]);
  state = {
    history: history.concat([
      {
        squares: squares
      }
    ]),
    stepNumber: history.length,
    xIsNext: !state.xIsNext
  };
  //status.viv.functions[0]();
  status.viv.functions.update();
  moves.viv.functions[0]();
}


// This is executed as an onclick handler when someone
// clicks on one of the move buttons in "moveButtons".
function jumpTo(step) {
  state.stepNumber = step;
  state.xIsNext = (step % 2) === 0;
  status.viv.functions.update();
  const historySquares = state.history[step].squares;
  for (let i = 0; i < historySquares.length; i++) {
    uiSquares[i].viv.functions[0](historySquares[i]);
  }
}

// Calculates if a particular move in the game has a winner.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}




