import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";



@Injectable()
export class LocationService {

  private readonly _URL: string;
  private readonly _URLws: string;
  private readonly _url: URL;


  get url(): URL {
    return this._url;
  }

  get URL(): string {
    return this._URL;
  }

  get URLws(): string {
    return this._URLws;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {

    this._url = new URL(this.document.location.href);
    this._URL = 'http://' + this.url.hostname + ':' + this.url.port + '/MovieServer_war/rest';
    this._URLws = 'ws://' + this.url.hostname + ':' + this.url.port + '/MovieServer_war/ws';

  }

}
