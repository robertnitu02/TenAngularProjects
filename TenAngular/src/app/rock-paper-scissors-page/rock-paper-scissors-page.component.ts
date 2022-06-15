import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-rock-paper-scissors-page',
  templateUrl: './rock-paper-scissors-page.component.html',
  styleUrls: ['./rock-paper-scissors-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RockPaperScissorsPageComponent implements OnInit {
  playerOptions = [
    'https://i.imgur.com/nZjJVzv.png',
    'https://i.imgur.com/VNNHYg5.png',
    'https://i.imgur.com/ql4JdYk.png',
  ];
  computerOptions = [
    'https://i.imgur.com/nZjJVzv.png',
    'https://i.imgur.com/VNNHYg5.png',
    'https://i.imgur.com/ql4JdYk.png',
  ];
  winCases = [
    [0, 2],
    [1, 0],
    [2, 1],
  ];

  playerMove = 0;
  computerMove = 0;
  oldComputerMoves = [-1, 0]; // 0 - move | 1 - moveCount

  playerScore = 0;
  computerScore = 0;
  result = 'Select your move!';

  constructor() {}

  ngOnInit(): void {}

  // 0 rock | 1 paper | 2 scissors
  startRound(move: number) {
    this.playerMove = move;
    let randomMove = Math.floor(Math.random() * 3);
    console.log(randomMove.toString());
    this.computerMove = randomMove;
    if (this.oldComputerMoves[0] == -1) {
      this.oldComputerMoves[0] = randomMove;
    }

    // prevent computer duplicate moves
    if (
      this.oldComputerMoves[0] != -1 &&
      this.oldComputerMoves[0] == randomMove &&
      this.oldComputerMoves[1] > 0
    ) {
      this.oldComputerMoves[1]++;
      if (this.oldComputerMoves[1] == 3) {
        while (this.oldComputerMoves[1] != 0) {
          randomMove = Math.floor(Math.random() * 3);
          this.oldComputerMoves[1]--;
        }
        this.computerMove = randomMove;
        this.oldComputerMoves[0] = randomMove;
      }
    }

    if (move == randomMove) {
      this.result = 'Tie';
    } else {
      let playerWin = false;
      this.winCases.forEach((winCase) => {
        if (winCase[0] == move && winCase[1] == randomMove && !playerWin)
          playerWin = true;
      });

      let resultStr;
      if (playerWin) {
        this.playerScore++;
        resultStr = 'Player won!';
      } else {
        this.computerScore++;
        resultStr = 'Computer won!';
      }
      this.result = resultStr;
    }
  }
}
