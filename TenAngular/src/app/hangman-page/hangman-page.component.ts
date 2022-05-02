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
    ['PSG', 'Barcelona', 'Chelsea', 'Real Madrid', 'Liverpool'],
    [
      'Knowing',
      'Going In Style',
      'Pitch Perfect 3',
      'The Way Back',
      'Get A Job',
    ],
    ['Bucuresti', 'Madrid', 'Paris', 'Pula', 'Amsterdam'],
  ];
  hints = [
    [
      "Messi's new team (2022).",
      'Team up with Camp Nou Stadium.',
      'Ex Cristiano Ronaldo soul team.',
      'Best team in England.',
    ],
    [
      'SCI-FI 2009 with Nicolas Cage',
      'Morgan Freeman with the Elderly Brigade',
      'Anna Kendrick comedy movie.',
      '',
      '',
    ],
    [
      'Capital of Romania',
      'Capital of Spain',
      'Capital of Paris',
      'City of Croatia',
      'Capital of Netherlands',
    ],
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
  wantHint = false;

  currentWord = '';
  currentCategory = '';
  currentHint = '';

  constructor() {}

  ngOnInit(): void {
    this.setWord();
  }

  checkWord(letter: string) {}

  setWord() {
    let randomCategory = Math.floor(Math.random() * 3);
    let randomNumber = Math.floor(Math.random() * 5);
    this.currentWord = this.words[randomCategory][randomNumber];
    this.currentHint = this.hints[randomCategory][randomNumber];
    this.currentCategory = Categories[randomCategory];

    this.lives = 10;
  }
}
