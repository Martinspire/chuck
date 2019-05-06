import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';

/**
 * API Service. Gets data from our backend and serves it up
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  jokeUrlBackup = 'http://api.icndb.com/jokes/random/10';
  randomJokeUrlBackup = 'http://api.icndb.com/jokes/random/';
  jokeUrl = 'http://localhost:3000/api/v1/jokes/random/10';
  randomJokeUrl = 'http://localhost:3000/api/v1/jokes/random/';

  constructor(private httpClient: HttpClient) {}

  public getJokes() {
    return this.httpClient.get(this.jokeUrl).pipe(map((res: any) => {
      if (res && res.type === 'success') {
        return res.value;
      }
      return [];
    })).pipe(share());
  }

  public getRandomJoke() {
    return this.httpClient.get(this.randomJokeUrl).pipe(map((res: any) => {
      if (res && res.type === 'success') {
        return res.value;
      }
      return '';
    })).pipe(share());
  }
}
