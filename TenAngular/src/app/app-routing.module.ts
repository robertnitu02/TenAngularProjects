import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { TicTacToePageComponent } from './tic-tac-toe-page/tic-tac-toe-page.component';
import { HangmanPageComponent } from './hangman-page/hangman-page.component';
import { ManeaTilesPageComponent } from './manea-tiles-page/manea-tiles-page.component';
import {RockPaperScissorsPageComponent} from "./rock-paper-scissors-page/rock-paper-scissors-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, pathMatch: 'full' },
  { path: 'tic-tac-toe', component: TicTacToePageComponent, pathMatch: 'full' },
  { path: 'hangman', component: HangmanPageComponent, pathMatch: 'full' },
  {
    path: 'manea-tiles',
    component: ManeaTilesPageComponent,
    pathMatch: 'full',
  },
  { path: 'rock-paper-scissors', component: RockPaperScissorsPageComponent, pathMatch: 'full'},
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
