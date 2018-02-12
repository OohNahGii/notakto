const Board = require('./board.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function initialize_boards(numBoards, boardLength) {
  let boards = [];
  for (let count = 0; count < numBoards; count++) {
    boards.push(new Board(count, boardLength));
  }
  return boards;
}

function perform_turn(boards, currentPlayer, player1, player2) {
  print_boards(boards);
  if (is_game_over(boards)) {
    console.log('Winner is ' + currentPlayer);
    rl.close();
    return;
  }

  rl.question(currentPlayer + ' enter move: ', (answer) => {
    if (update_boards(boards, answer)) {
      return perform_turn(boards, get_next_player(currentPlayer, player1, player2), player1, player2);
    } else {
      console.log('Move [' + answer + '] is invalid.\n');
      return perform_turn(boards, currentPlayer, player1, player2);
    }
  });
}

function is_game_over(boards) {
  return boards.every((board) => {
    return board.is_board_dead();
  });
}

function print_boards(boards) {
  boards.forEach((board) => {
    board.print_board();
  });
}

function update_boards(boards, input) {
  const values = input.split('-', 2);
  if (values.length != 2) {
    return false;
  }
  if (Number.isNaN(values[0]) || Number.isNaN(values[1])) {
    return false;
  }
  const boardNum = Number.parseInt(values[0], 10);
  const cellNum = Number.parseInt(values[1], 10);
  if (boardNum < 0 || boardNum >= boards.length) {
    return false;
  }
  const boardLength = boards[0].length;
  const numCellsInBoard = boardLength * boardLength;
  if (cellNum < 0 || cellNum >= numCellsInBoard) {
    return false;
  }
  return boards[boardNum].update_board(cellNum);
}

function get_next_player(current, player1, player2) {
  return current === player1 ? player2 : player1;
}

const player1 = 'Player 1';
const player2 = 'Player 2';
const boardLength = 3;
const numBoards = 3;
let boards = initialize_boards(numBoards, boardLength);
perform_turn(boards, player1, player1, player2);