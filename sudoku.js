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
      const field = document.createElement("div");
      field.className = "sudoku-field";
      field.textContent = board[row][col] !== 0 ? board[row][col] : "";
      field.id = `cell-${row}-${col}`;
      sudokuBoardContainer.appendChild(field);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  createSudoku(board);

  document.getElementById("solve-button").addEventListener("click", () => {
    if (solveSudoku(board)) {
      createSudoku(board);
    } else {
      alert("No solution exists");
    }
  });
});
