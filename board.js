function Board(num, length) {
  this.num = num;
  this.length = length;
  this.state = [];
  // initalize state
  for (let index = 0; index < length * length; index++) {
    this.state.push('');
  }
  
  this.is_board_dead = function() {
    return this.has_horizontal() || this.has_vertical() || this.has_diagonal();
  }

  this.has_horizontal = function() {
    for (let index = 0; index < this.length * this.length - 1; index = index + this.length) {
      const row = this.state.slice(index, index + this.length);
      if (this.is_slice_dead(row)) {
        return true;
      }
    }
    return false;
  }

  this.has_vertical = function() {
    for (let index = 0; index < this.length; index++) {
      let column = [];
      for (let row = index; row < this.state.length; row = row + this.length) {
        column.push(this.state[row]);
      }
      if (this.is_slice_dead(column)) {
        return true;
      }
    }
    return false;
  }

  this.has_diagonal = function() {
    const leftDistance = this.length + 1;
    const rightDistance = this.length - 1;
    
    // top-left to bottom-right
    let topLeft = [];
    for (let index = 0; index < this.state.length; index = index + leftDistance) {
      topLeft.push(this.state[index]);
    }
    if (this.is_slice_dead(topLeft)) {
      return true;
    }

    // top-right to bottom-left
    let topRight = [];
    for (let index = rightDistance; index < this.state.length - 1; index = index + rightDistance) {
      topRight.push(this.state[index]);
    }
    if (this.is_slice_dead(topRight)) {
      return true;
    }
    return false;
  }

  this.is_slice_dead = function(slice) {
    return slice.every(cell => {
      return cell;
    });
  }

  this.print_board = function() {
    // Print board name
    let boardName = 'Board #' + this.num;
    if (this.is_board_dead()) {
      boardName = boardName + ' (DEAD)';
    }
    process.stdout.write(boardName + '\n');

    // Print board
    const cellSize = 3; // eg. ' X '
    let separatorLength = this.length * cellSize + (this.length - 1);
    for (let index = 0; index < this.state.length; index++) {
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