import { generateDOM } from "../../src/viv.js";

// square component
function square(onclick) {
  return {
    tag: "button",
    class: "square",
    text(value = null) { return value; },
    onclick
  };
}



// Generating an array of square components for the application.
const uiSquares = [];
for (let i = 0; i < 9; i++) {
  uiSquares.push(square((e) => squareOnClick(e, i)));
}

// board component. The uiSquares array is used to populate the board.
const board = [
  {
    tag: "div",
    class: "board-row",
    children: [
      uiSquares[0],
      uiSquares[1],
      uiSquares[2],
    ],
  },
  {
    tag: "div",
    class: "board-row",
    children: [
      uiSquares[3],
      uiSquares[4],
      uiSquares[5],
    ],
  },
  {
    tag: "div",
    class: "board-row",
    children: [
      uiSquares[6],
      uiSquares[7],
      uiSquares[8],
    ],
  },
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
const moves = {
  tag: "ol",
  children() {
    return state.history.map((step, move) => {
      const desc = move > 0 ?
        "Go to move #" + move :
        "Go to game start";
      return {
        tag: "li",
        key: move,
        children: [
          {
            tag: "button",
            text: desc,
            onclick: () => jumpTo(move)
          }
        ]
      };
    });
  }
};

// Displays the status info
const status = {
  tag: "div",
  text() {
    const squares = state.history[state.stepNumber].squares;
    const winner = calculateWinner(squares);
    if (winner) {
      return "Winner: " + winner;
    }
    else {
      return "Next player: " + (state.xIsNext ? "X" : "O");
    }
  }
};

// Structure of the application.
const app = {
  tag: "div",
  class: "game",
  children: [
    {
      tag: "div",
      class: "game-board",
      children: board
    },
    {
      tag: "div",
      class: "game-info",
      children: [
        status,
        moves
      ],
    },
  ],
};

// Adding our application to the browser.
document.getElementById("root").replaceWith(generateDOM(app));


// This is the event handler that is added to square components
// This handler runs when somone clicks on a square component.
function squareOnClick(e, i) {
  const { text } = e.target.vivNode;
  const history = state.history.slice(0, state.stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = state.xIsNext ? "X" : "O";
  text(squares[i]);
  state = {
    history: history.concat([
      {
        squares: squares
      }
    ]),
    stepNumber: history.length,
    xIsNext: !state.xIsNext
  };
  status.text();
  moves.children();
}


// This is executed as an onclick handler when someone
// clicks on one of the move buttons in "moveButtons".
function jumpTo(step) {
  state.stepNumber = step;
  state.xIsNext = (step % 2) === 0;
  status.text();
  const historySquares = state.history[step].squares;
  for (let i = 0; i < historySquares.length; i++) {
    uiSquares[i].text(historySquares[i]);
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




