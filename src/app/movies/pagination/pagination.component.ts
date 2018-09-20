import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilmsService} from '../films.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {

  length: number = 8;
  numbersActive: number[];
  pages: number;
  maxPage: number;
  numSelector: number;
  private subscription: Subscription;
  public currentPage: number;
  private numbers: Array<number>;

  constructor(private filmsService: FilmsService) { }



  ngOnInit() {

    this.numSelector = this.filmsService.numSelector;
    this.currentPage = this.filmsService.currentPage;

    this.subscription = this.filmsService.pageSubject.subscribe((msg) => {
      this.pages = this.filmsService.pages;
      this.maxPage = this.filmsService.pages;
      this.numbers = Array.from({ length: this.filmsService.pages }, (v, k) => k + 1);
      this.currentPage = this.filmsService.currentPage;
      console.log("begin" + this.biganPages());
      this.numbersActive = this.numbers.splice( this.biganPages(), this.length);

      console.log(this.numbersActive);
      console.log('numSelector: ' + this.numSelector + ' currentPage: ' + this.currentPage);
      console.log('Pages: ' + this.pages);

    });

  }

  biganPages() {
    let index: number;
    console.log("страницы: " + this.numbers.length);
    index = this.numbers.length - this.currentPage + 1;

    if (this.numbers.length < this.length) { return 0; }
    if (index < this.length ) { console.log("2-var"); return (this.currentPage + 1 - (this.length - index)) - 3;}
    console.log("3-var");
    return this.currentPage + 1 > this.numSelector ? this.currentPage + 1 - this.numSelector : 0;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public pageClick(event, page) {
    console.log('Open: ' + page);
    window.scrollTo(0, 500);
    // this.numbersActive = this.numbers.splice( page > this.numSelector ? page - this.numSelector : 0, this.length);
    // console.log(this.numbersActive);
    this.filmsService.goPage(page);
    this.currentPage = this.filmsService.currentPage;


  }

}
