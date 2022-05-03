import { Component, OnInit, ViewEncapsulation } from '@angular/core';

enum Categories {
  Champions_League,
  Films,
  Cities,
}

@Component({
  selector: 'app-hangman-page',
  templateUrl: './hangman-page.component.html',
  styleUrls: ['./hangman-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HangmanPageComponent implements OnInit {
  words = [
    ['psg', 'barcelona', 'chelsea', 'real madrid', 'liverpool'],
    ['knowing', 'going in style', 'pitch perfect', 'nothing', 'get a job'],
    ['bucuresti', 'madrid', 'paris', 'pula', 'amsterdam'],
  ];
  hints = [
    [
      "Messi's new team (2022).",
      'Team up with Camp Nou Stadium.',
      'Ex Cristiano Ronaldo soul team.',
      'Best team in England.',
    ],
    [
      'SCI-FI 2009 with Nicolas Cage.',
      'Morgan Freeman with the Elderly Brigade.',
      'Anna Kendrick comedy movie.',
      'Nothing.',
      'Words a student hears.',
    ],
    [
      'Capital of Romania.',
      'Capital of Spain.',
      'Capital of France.',
      'City of Croatia.',
      'Capital of Netherlands.',
    ],
  ];
  stickmanPhotoPhase = [
    'https://i.imgur.com/fdwfbXJ.jpg',
    'https://i.imgur.com/3Dee7Nb.jpg',
    'https://i.imgur.com/0hGm8JL.jpg',
    'https://i.imgur.com/X8qEWxZ.jpg',
    'https://i.imgur.com/0sjpPic.jpg',
    'https://i.imgur.com/4lMLutV.jpg',
    'https://i.imgur.com/1AWvpN2.jpg',
    'https://i.imgur.com/ltcU0KQ.jpg',
    'https://i.imgur.com/5D49LzC.jpg',
    'https://i.imgur.com/KSiiizW.jpg',
  ];

  alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  lives = 10;
  tries = -1;
  wantHint = false;
  freezeGame = false;
  hintMessage = '';
  statusMessage = '';

  letterGuessed = [''];
  guessWord = [''];
  guessWordShow = '';

  currentWord = '';
  currentWordChars = [''];
  currentCategory = '';
  currentHint = '';
  currentStickmanUrl = 'https://i.imgur.com/0Rxz5mI.jpg';

  constructor() {}

  ngOnInit(): void {
    this.setWord();
  }

  checkWord(letter: string) {
    if (this.freezeGame) return;
    if (this.lives > 0) {
      let containsLetter = this.currentWordChars.find((char) => char == letter);

      if (containsLetter) {
        this.setGuessWordShow(letter);
      } else {
        this.lives--;
        this.tries++;
        this.currentStickmanUrl = this.stickmanPhotoPhase[this.tries];
        if (this.lives == 0) {
          this.freezeGame = true;
          this.statusMessage = `You lost! The word was: ${this.currentWord}.`;
          this.guessWordShow = '';
        }
      }
    }
  }

  setWord() {
    let randomCategory = Math.floor(Math.random() * 3);
    let randomNumber = Math.floor(Math.random() * 5);
    this.tries = -1;
    this.letterGuessed = [''];
    this.guessWord = [''];
    this.guessWordShow = '';
    this.hintMessage = '';
    this.statusMessage = '';
    this.wantHint = false;
    this.freezeGame = false;
    this.currentStickmanUrl = 'https://i.imgur.com/0Rxz5mI.jpg';

    this.currentWord = this.words[randomCategory][randomNumber];
    this.currentWordChars = [...this.currentWord];
    this.currentHint = this.hints[randomCategory][randomNumber];
    this.currentCategory = Categories[randomCategory].includes('_')
      ? Categories[randomCategory].replace('_', ' ')
      : Categories[randomCategory];

    this.lives = 10;
    this.currentWordChars.forEach((char) => {
      this.guessWord.push('_');
      this.guessWordShow = this.guessWordShow + '_' + ' ';
    });
  }

  setGuessWordShow(letter: string) {
    this.letterGuessed.push(letter);

    this.guessWord = [''];
    this.guessWordShow = '';

    this.currentWordChars.forEach((char) => {
      let knownLetter = this.letterGuessed.find((letter) => letter == char);

      if (knownLetter) {
        this.guessWord.push(char);
      } else {
        this.guessWord.push('_');
      }
      this.guessWordShow =
        this.guessWordShow + this.guessWord[this.guessWord.length - 1] + ' ';
    });

    if (!this.checkWin()) {
      this.freezeGame = true;
      this.statusMessage = `You won!`;
    }
  }

  showHint() {
    if (!this.wantHint && !this.freezeGame) this.wantHint = true;
  }

  checkWin() {
    let guessWordShowChars = [...this.guessWord];
    return guessWordShowChars.find((char) => char == '_');
  }
}
