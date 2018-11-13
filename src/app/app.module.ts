import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MovieCardComponent } from './movies/movie-card/movie-card.component';
import { FrontPageComponent } from './movies/front-page/front-page.component';
import { PlayerPageComponent } from './movies/player-page/player-page.component';
import {RouterModule} from "@angular/router";
import { PaginationComponent } from './movies/pagination/pagination.component';
import {SearchComponent} from "./movies/search/search.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CodeHighlighterModule, TabViewModule} from "primeng/primeng";
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { LeftPanelComponent } from './movies/left-panel/left-panel.component';
import {HttpClientModule} from "@angular/common/http";
import { PlayerComponent } from './movies/player/player.component';
import { CommentComponent } from './users/comment/comment.component';
import { LoginComponent } from './users/login/login.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { ProfileComponent } from './users/profile/profile.component';
import { ContainerPanelAuthComponent } from './users/container-panel-auth/container-panel-auth.component';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { SafePipe } from './movies/safe-pipe.pipe';
import {LocationService} from "./location.service";
// import { ErrorSearchComponent } from './movies/error-search/error-search.component';

const routes = [
  {path: '', component: FrontPageComponent},
  {path: 'player/:filmID', component: PlayerPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent},
  // {path: 'error-search', component: ErrorSearchComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    FrontPageComponent,
    PlayerPageComponent,
    PaginationComponent,
    SearchComponent,
    LeftPanelComponent,
    PlayerComponent,
    CommentComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    ContainerPanelAuthComponent,
    SafePipe,
    // ErrorSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,

    CommonModule,
    FormsModule,
    AutoCompleteModule,
    TabViewModule,
    CodeHighlighterModule,

    MessagesModule,
    MessageModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
