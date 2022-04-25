import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-page',
  templateUrl: './tic-tac-toe-page.component.html',
  styleUrls: ['./tic-tac-toe-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TicTacToePageComponent implements OnInit {
  Player1Name = '';
  Player2Name = '';
  isGameStarted = false;

  // Messages
  NameInitWarningMessage = '';

  constructor() {}

  ngOnInit(): void {}

  startGame(player1Name: string, player2Name: string) {
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
    this.isGameStarted = true;
  }
}
