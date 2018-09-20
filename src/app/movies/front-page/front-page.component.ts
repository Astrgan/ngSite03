import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilmsService} from "../films.service";
import {Subscription} from "rxjs/Subscription";
import {Film} from "../film";

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  films: any;

  constructor(private filmsService: FilmsService) { }

  ngOnInit(){
    this.subscription = this.filmsService.pageSubject.subscribe((msg)=>{
      this.films = msg;

    });
    const filmFilter: Film  = this.filmsService.filterFilm;
    filmFilter.year = Number("2018");
    this.filmsService.getFilms();
    filmFilter.year = 0;

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
