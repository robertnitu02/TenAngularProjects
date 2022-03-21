import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [AppComponent, HomePageComponent, NotFoundPageComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatChipsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
