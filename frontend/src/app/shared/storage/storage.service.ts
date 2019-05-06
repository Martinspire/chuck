import { Injectable, Output, EventEmitter } from '@angular/core';
import { Joke } from 'src/app/models/joke/joke';

/**
 * Storage service, so we can store and retrieve jokes. Currently using localstorage for this.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * function to get the current condition whether we have something stored or not
   */
  haveJokeStorage(): boolean {
    let result = false;
    if (!!localStorage) {
      if (localStorage.getItem('favoriteJokes') !== undefined && localStorage.getItem('favoriteJokes') !== null) {
        result = true;
      }
    }
    return result;
  }

  /**
   * Get jokes from storage
   */
  getJokeStorage(): Joke[] {
    return JSON.parse(localStorage.getItem('favoriteJokes'));
  }

  /**
   * Store new jokes
   * @param jokes Joke to store
   */
  setJokeStorage(jokes: Joke[]) {
    localStorage.setItem('favoriteJokes', JSON.stringify(jokes));
  }
}
