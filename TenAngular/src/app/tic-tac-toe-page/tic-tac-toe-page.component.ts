import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-page',
  templateUrl: './tic-tac-toe-page.component.html',
  styleUrls: ['./tic-tac-toe-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TicTacToePageComponent implements OnInit {
  isGameStarted = false;
  freezeGame = false;

  currentTurn = 'X';
  lastWinner = '';

  winningConditions = [
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  board = ['', '', '', '', '', '', '', '', ''];
  lastWinPositions = [0, 0, 0];

  // Players Data
  Player1Name = '';
  Player2Name = '';
  Player1Score = 0;
  Player2Score = 0;

  // Messages
  NameInitWarningMessage = '';
  InfoMessage = '';

  constructor() {}

  ngOnInit(): void {}

  startingGame(player1Name: string, player2Name: string) {
    // TODO: add toast notifications
    if (player1Name == '' || player2Name == '') {
      this.NameInitWarningMessage = `Player${
        player1Name == '' && player2Name == ''
          ? 's'
          : player1Name == ''
          ? ' 1'
          : ' 2'
      } must enter a name!`;
      return;
    }
    if (player1Name == player2Name) {
      this.NameInitWarningMessage = `You can't have the same name!`;
      return;
    }
    this.Player1Name = player1Name;
    this.Player2Name = player2Name;
    this.startGame();
  }

  startGame() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.isGameStarted = true;
    this.freezeGame = false;
    this.lastWinPositions = [];
    this.currentTurn =
      this.lastWinner == '' ? 'X' : this.lastWinner == 'X' ? '0' : 'X';
    this.InfoMessage = `${this.Player1Name} (${this.currentTurn}) Turn!`;
  }

  makeMove(position: number) {
    if (this.board[position] != '' || this.freezeGame) return;
    this.board[position] = this.currentTurn;

    if (this.checkWinner()) {
      this.giveWin();
      return;
    }
    if (this.checkDraw()) {
      this.InfoMessage = 'Draw! No one won.';
      this.freezeGame = true;
      return;
    }

    this.changeTurn();
  }

  changeTurn() {
    this.currentTurn = this.currentTurn == 'X' ? '0' : 'X';
    this.InfoMessage = `${
      this.currentTurn == 'X' ? this.Player1Name : this.Player2Name
    } (${this.currentTurn}) Turn!`;
  }

  giveWin() {
    let infoMessage;
    if (this.currentTurn == 'X') {
      this.Player1Score++;
      infoMessage = `${this.Player1Name} won!`;
    } else {
      this.Player2Score++;
      infoMessage = `${this.Player2Name} won!`;
    }
    this.InfoMessage = infoMessage;
    this.lastWinner = this.currentTurn;
    this.lastWinPositions.forEach((position) => {
      this.board[position] = `>${this.currentTurn}<`;
    });
    this.freezeGame = true;
  }

  checkWinner() {
    let value = false;
    this.winningConditions.forEach((condition) => {
      if (
        this.board[condition[0]] == this.currentTurn &&
        this.board[condition[1]] == this.currentTurn &&
        this.board[condition[2]] == this.currentTurn &&
        !value
      ) {
        this.lastWinPositions = condition;
        value = true;
      }
    });
    return value;
  }

  checkDraw() {
    let moves = 0;
    this.board.forEach((block) => {
      if (block != '') moves++;
    });
    return moves == 9;
  }
}
