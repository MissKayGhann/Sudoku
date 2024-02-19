let initialBoard = [
  [7, 2, 0, 0, 1, 0, 0, 0, 0],
  [1, 0, 0, 2, 6, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

let currentBoard = JSON.parse(JSON.stringify(initialBoard));

function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) {
      return false;
    }
  }

  let startRow = row - (row % 3),
    startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }
  return true;
}

function findEmptyLocation(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
}

function solveSudoku(board) {
  let empty = findEmptyLocation(board);
  if (!empty) {
    return true;
  }
  let [row, col] = empty;

  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(board)) {
        return true;
      }
      board[row][col] = 0;
    }
  }
  return false;
}

function createSudoku(board) {
  const sudokuBoardContainer = document.getElementById("sudoku-board");
  sudokuBoardContainer.innerHTML = "";
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const field = document.createElement("input");
      field.className = "sudoku-field";
      field.type = "text";
      field.maxLength = "1";
      field.value = board[row][col] !== 0 ? board[row][col] : "";
      field.dataset.row = row;
      field.dataset.col = col;

      field.addEventListener("input", (e) => {
        const target = e.target;
        const value = parseInt(target.value, 10);
        const row = parseInt(target.dataset.row, 10);
        const col = parseInt(target.dataset.col, 10);
        if (!isNaN(value)) {
          if (isSafe(board, row, col, value)) {
            board[row][col] = value;
          } else {
            alert("Invalid number!");
            target.value = "";
          }
        } else {
          board[row][col] = 0;
        }
      });

      sudokuBoardContainer.appendChild(field);
    }
    sudokuBoardContainer.appendChild(document.createElement("br"));
  }
}

function clearBoard() {
  currentBoard = JSON.parse(JSON.stringify(initialBoard));
  createSudoku(currentBoard);
}

function solveBoard() {
  let boardCopy = JSON.parse(JSON.stringify(currentBoard));
  if (solveSudoku(boardCopy)) {
    currentBoard = boardCopy;
    createSudoku(currentBoard);
  } else {
    alert("No solution exists");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createSudoku(initialBoard);

  const solveButton = document.getElementById("solve-button");
  const clearButton = document.getElementById("clear-button");

  solveButton.addEventListener("click", solveBoard);
  clearButton.addEventListener("click", clearBoard);
});
