# Notakto
Notakto is a variation of tic-tac-toe that is played across several boards (in this case three) with both players playing as the same piece (in this case an 'X'). The game ends when all boards contain three X's in a row; the player who made the last move loses the game.

Players can enter their moves in the following format: {boardNum}-{cellNum}. **boardNum** refers to the the board on which the player wishes to make their move. **cellNum** refers to the cell on the board where the player wishes to make their move. In the 3x3 board, there are 9 available cells:
```
  0 | 1 | 2
 -----------
  3 | 4 | 5
 -----------
  6 | 7 | 8 
```

Program is meant to be ran via the command line using node:
```
node notakto.js
```

Todo: 
* Implement AI player
* Allow for a variable number of boards
* Allow for a variable board size