import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import {Subject} from "rxjs/Subject";

@Injectable()
export class FilmsService {

  CHAT_URL = "ws://localhost:8080/MovieServer/ws";
  films =
    [
      {name_film: 'Всеобъемлющий пиздец'},
      {name_film: 'Ужасы шайтана'},
      {name_film: 'Пиздюля'},
      {name_film: 'Последний пузырь'},
      {name_film: 'Приключения недоносков'},

    ];

  getFilms(){
    return this.films
  }

  public messages: Subject<String>;

  constructor(wsService: WebSocketService) {
    this.messages = <Subject<String>>wsService
      .connect(this.CHAT_URL)
      .map((response: MessageEvent): String => {
        return response.data;
      });
  }

}

