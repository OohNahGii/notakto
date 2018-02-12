function Board(name, length) {
  this.name = name;
  this.length = length;
  this.state = [];
  // Initialize all cells to empty
  for (let index = 0; index < length * length; index++) {
    // Empty cells are represented as an empty string
    this.state.push('');
  }
  
  /**
   * Check if board already contains {length} X's in a row. 
   * 
   * @return true if board contains {length} X's in a row, false otherwise
   */
  this.is_board_dead = function() {
    return has_horizontal(this.length, this.state) || 
      has_vertical(this.length, this.state) || 
      has_diagonal(this.length, this.state);
  }

  function has_horizontal(length, state) {
    for (let index = 0; index < length * length - 1; index = index +length) {
      const row = state.slice(index, index + length);
      if (is_slice_dead(row)) {
        return true;
      }
    }
    return false;
  }

  function has_vertical(length, state) {
    for (let index = 0; index < length; index++) {
      let column = [];
      for (let row = index; row < state.length; row = row + length) {
        column.push(state[row]);
      }
      if (is_slice_dead(column)) {
        return true;
      }
    }
    return false;
  }

  function has_diagonal(length, state) {
    const leftDistance = length + 1;
    const rightDistance = length - 1;
    
    // top-left to bottom-right
    let topLeft = [];
    for (let index = 0; index < state.length; index = index + leftDistance) {
      topLeft.push(state[index]);
    }
    if (is_slice_dead(topLeft)) {
      return true;
    }

    // top-right to bottom-left
    let topRight = [];
    for (let index = rightDistance; index < state.length - 1; index = index + rightDistance) {
      topRight.push(state[index]);
    }
    if (is_slice_dead(topRight)) {
      return true;
    }
    return false;
  }

  function is_slice_dead(slice) {
    return slice.every(cell => {
      return cell;
    });
  }

  /**
   * Print board and board name.
   * If a board is dead, the word '(DEAD)' will be printed alongside the board name.
   * If a cell is empty, the cell index will be printed instead of an empty string. This is intended
   * to make it easier for players to see which cell indicies are still available.
   */
  this.print_board = function() {
    let boardName = 'Board ' + this.name;
    if (this.is_board_dead()) {
      boardName = boardName + ' (DEAD)';
    }
    process.stdout.write(boardName + '\n');

    // A cell contains the cell value ('X' or cellIndex), and a space before and after
    const cellSize = 3; 
    // The row separator length is calulated via the following:
    // # cells per row * cell size + number of column separators
    let separatorLength = this.length * cellSize + (this.length - 1); 
    for (let index = 0; index < this.state.length; index++) {
      // Print row separator after each row
      if (index > 0 && index % length == 0) {
        process.stdout.write('-'.repeat(separatorLength) + '\n');
      }
      const cellValue = this.state[index] ? this.state[index] : index;
      process.stdout.write(' ' + cellValue + ' ');
      if ((index + 1) % length != 0) {
        // Print column separator if we are not the last cell in the row
        process.stdout.write('|');
      } else {
        // Otherwise print newline so we can start a new row
        process.stdout.write('\n');
      }
    }
    process.stdout.write('\n');
  }

  /**
   * Attempt to place a piece at the specificed cell, returning true if the
   * attempted move was valid and the update was successful.
   *
   * @return true if board was successfully updated, false otherwise
   */
  this.update_board = function(cellNum) {
    if (this.is_move_valid(cellNum)) {
      this.state[cellNum] = 'X';
      return true;
    }
    return false;
  }

  /**
   * Determines if a move at the specified cell is valid. A move is considered invalid if:
   *   - The board is already dead
   *   - 'cellNum' is outside the bounds of the board
   *   - There is already a piece at 'cellNum'
   *
   * @return true if the move was valid, false otherwise
   */
  this.is_move_valid = function(cellNum) {
    if (this.is_board_dead()) {
      return false;
    }
    return !this.state[cellNum];
  }
}

module.exports = Board;