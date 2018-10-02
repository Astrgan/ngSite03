import { Injectable } from '@angular/core';
import 'rxjs/add/observable/dom/webSocket';
import {Film} from './film';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Lists} from './Lists';
import {MyUrl} from '../my-url';
import {WebSocketSubject} from "rxjs/observable/dom/WebSocketSubject";
import {Observable} from "rxjs";



@Injectable()
export class FilmsService {
  URL = MyUrl.URL + '/films';
  films: Film[];
  URLws = 'ws://localhost:8080/MovieServer_war_exploded/ws';
  public wsSubject: WebSocketSubject<Object>;
  public pageSubject: Subject<any>;
  public pages: number;
  public currentPage: number;
  public numSelector = 6;
  public listFilmsSubject: Subject<any>;
  public listsSubject: Subject<any>;

  public filterFilm: Film;
  public lists: Lists;

  constructor(private http: HttpClient) {

    this.wsSubject = Observable.webSocket(this.URLws);
    this.wsSubject.subscribe(
      (msg) => {
        this.parseAnswer(msg);

      },
      (err) => console.log(err),
      () => console.log('complete')
    );

    this.filterFilm = new Film();
    this.pages = 0;
    this.currentPage = 0;
    this.pageSubject = new Subject();
    this.listFilmsSubject = new Subject();
    this.listsSubject = new Subject();
    this.getListGenres();
  }

  setfilterFilm(filterFilm: Film) {
    this.filterFilm = filterFilm;
  }

  getListGenres() {
    this.http.get(this.URL).subscribe(
      (data: any[]) => {
        this.listsSubject.next(data);
      }
    );
  }


  getFilms() {

   /* const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept-Encoding': 'gzip'
      })
    };

    this.http.post(this.URL, JSON.stringify(this.filterFilm), httpOptions).subscribe(
      (data: any[]) => {
        this.parseAnswer(data);

      }
    );

    this.filterFilm.name = "";*/
    console.log("json: " +JSON.stringify(this.filterFilm));
    this.filterFilm.limit = "6";
    this.wsSubject.next(JSON.stringify(this.filterFilm));

    this.filterFilm.limit = "0";
    this.wsSubject.next(JSON.stringify(this.filterFilm));

    this.filterFilm.name = null;
  }



/*  parseAnswer(msg) {
    // this.pages = 0;
    this.currentPage = 0;
    this.films = msg;
    this.pages = Math.ceil(this.films.length / this.numSelector);
    console.log("length: " + this.films.length);
    this.pageSubject.next(this.films.slice(this.currentPage, this.numSelector));

  }*/


  parseAnswer(msg) {
    // this.pages = 0;
    this.currentPage = 0;
    this.films = msg;
    this.pages = Math.ceil(this.films.length / this.numSelector);
    console.log("length: " + this.films.length);
    this.pageSubject.next(this.films.slice(this.currentPage, this.numSelector));

  }

  goPage(number: number) {
    this.currentPage = number - 1;
    this.pageSubject.next(this.films.slice(((number - 1) * this.numSelector), ((number - 1) * this.numSelector) + (this.numSelector) ));
  }
}

