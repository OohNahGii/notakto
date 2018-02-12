function Board(num, length) {
  this.num = num;
  this.length = length;
  this.state = [];
  // initalize state
  for (let index = 0; index < length * length; index++) {
    this.state.push('');
  }
  
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

  this.print_board = function() {
    let boardName = 'Board ' + this.num;
    if (this.is_board_dead()) {
      boardName = boardName + ' (DEAD)';
    }
    process.stdout.write(boardName + '\n');

    // cell value + space before and after cell value, eg. ' X '
    const cellSize = 3; 
    // 3 cells per row * cell size + number of '|'s
    let separatorLength = this.length * cellSize + (this.length - 1); 
    for (let index = 0; index < this.state.length; index++) {
      // Print row separator after each row
      if (index > 0 && index % length == 0) {
        process.stdout.write('-'.repeat(separatorLength) + '\n');
      }
      const cellValue = this.state[index] ? this.state[index] : index;
      process.stdout.write(' ' + cellValue + ' ');
      if ((index + 1) % length != 0) {
        process.stdout.write('|');
      } else {
        process.stdout.write('\n');
      }
    }
    process.stdout.write('\n');
  }

  this.update_board = function(cellNum) {
    if (this.is_move_valid(cellNum)) {
      this.state[cellNum] = 'X';
      return true;
    }
    return false;
  }

  this.is_move_valid = function(cellNum) {
    if (this.is_board_dead()) {
      return false;
    }
    return !this.state[cellNum];
  }
}

module.exports = Board;