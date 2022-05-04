import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-manea-tiles-page',
  templateUrl: './manea-tiles-page.component.html',
  styleUrls: ['./manea-tiles-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManeaTilesPageComponent implements OnInit {
  moves = [
    ['', '', '', '', ''], // 0
    ['', '', '', '', ''], // 1
    ['', '', '', '', ''], // 2
    ['', '', '', '', ''], // 3
    ['', '', '', '', ''], // 4
  ];
  audioPlayer = new Audio();
  columnPositions = [0, 0, 0, 0, 0];

  awaitBoardClass = '';
  infoMessage = '';

  freezeGame = false;
  gameStarted = false;

  score = 0;
  songSelectedNumber = -1;

  constructor() {}

  ngOnInit(): void {}

  songSelected(songNumber: number) {
    this.gameStarted = true;
    this.songSelectedNumber = songNumber;
    this.playMusic();
    this.infoMessage = `Game will start in 3...`;
    this.awaitBoardClass = 'manea-tiles__await-opacity';
    let timerCount = 3;
    let prepareInterval = setInterval(() => {
      timerCount--;
      this.infoMessage = `Game will start in ${timerCount}...`;
      if (timerCount == 0) {
        this.startGame();
        clearInterval(prepareInterval);
      }
    }, 1000);
  }

  startGame() {
    this.moves = [
      ['', '', '', '', ''], // 0
      ['', '', '', '', ''], // 1
      ['', '', '', '', ''], // 2
      ['', '', '', '', ''], // 3
      ['', '', '', '', ''], // 4
    ];
    this.columnPositions = [0, 0, 0, 0, 0];
    this.freezeGame = false;
    this.awaitBoardClass = '';
    this.score = 0;
    this.infoMessage = `Your Score: ${this.score}`;
    this.audioPlayer = new Audio();

    for (let i = 0; i < 5; i++) {
      let randomNumber = Math.floor(Math.random() * 4);
      this.moves[i][randomNumber] = 'manea-tiles__sing-block-color';
      this.columnPositions[i] = randomNumber;
    }
  }

  checkSong(column: number) {
    if (this.freezeGame) return;
    if (this.moves[4][column] == '') {
      this.moves[4][column] = 'manea-tiles__lose-block-color';
      this.freezeGame = true;
      this.awaitBoardClass = 'manea-tiles__await-opacity';
      this.infoMessage = `You Lost! Your Score was ${this.score}.`;
      // TODO stop song
      return;
    }

    for (let i = 4; i > 0; i--) {
      this.columnPositions[i] = this.columnPositions[i - 1];
    }
    this.columnPositions[0] = Math.floor(Math.random() * 4);

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        this.moves[i][j] =
          this.columnPositions[i] == j ? 'manea-tiles__sing-block-color' : '';
      }
    }

    let bonusPoints =
      this.score >= 50 && this.score <= 100 ? Math.floor(Math.random() * 5) : 0;
    this.score += 10 + bonusPoints;
    this.infoMessage = `Your Score: ${this.score}${
      bonusPoints > 0 ? `(+${bonusPoints} bonus points)` : ''
    }`;
  }

  playAgain() {
    this.freezeGame = false;
    this.songSelected(this.songSelectedNumber);
  }

  selectSong() {
    window.location.reload();
  }

  playMusic() {
    this.audioPlayer.src =
      '../../../assets/manea-tiles-songs/music' +
      (this.songSelectedNumber + 1) +
      '.wav';
    this.audioPlayer.load();
    this.audioPlayer.play();
  }
}
