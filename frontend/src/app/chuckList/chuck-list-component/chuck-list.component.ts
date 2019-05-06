import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

import { Subscription } from 'rxjs';

import { ApiService } from '../../shared/api/api.service';

import { Joke } from '../../models/joke/joke';
import { RefreshService } from '../../shared/refresh/refresh.service';
import { StorageService } from '../../shared/storage/storage.service';

@Component({
  selector: 'app-chuck-list-component',
  templateUrl: './chuck-list.component.html',
  styleUrls: ['./chuck-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChuckListComponent implements OnInit, OnDestroy {
  jokes: Joke[] = [];
  favoriteJokes: Joke[] = [];
  random: number;
  haveFavorites = false;
  subscription: Subscription;
  timeout = 5000;

  constructor(
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private refreshService: RefreshService,
    private storageService: StorageService
  ) {
    this.random = Math.floor(Math.random() * 4);

  }

  ngOnInit() {
    this.getJokes();
    this.subscribeToRefresh();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscribeToRefresh() {
    this.subscription = this.refreshService.refreshChuckList.subscribe(() => {
      this.getJokes();
    });
  }

  getRandomBackground(): number {
    return this.random;
  }

  /**
   * Get the joke to display in our html
   * @param joke string to convert to html
   */
  getSafeJoke(joke: string) {
    /*
     * sanitize the joke so it displays html entities. We could validate more here,
     * like scanning for spam links or whatever.
     * But we can trust Chuck to have knocked out the evil people already
     */
    return this.sanitizer.bypassSecurityTrustHtml(joke);
  }

  /**
   * Get a list of jokes from our API and fill it. If this is the first time we run it, also retrieve favorites.
   */
  getJokes() {
    this.apiService.getJokes().subscribe((res) => {
      this.jokes = res;
      if (!this.haveFavorites) {
        this.getFavorites();
        this.haveFavorites = true;
      }
    });
  }

  /**
   * Get list of favorites.
   * Compare it with currently loaded jokes and mark any as favorite so it can be made visible which jokes are already listed
   */
  getFavorites() {
    if (this.storageService.haveJokeStorage()) {
      this.favoriteJokes = this.storageService.getJokeStorage();
      if (!!this.jokes && this.jokes.length > 0 && !!this.favoriteJokes && this.favoriteJokes.length > 0) {
        this.jokes.forEach(joke => {
          this.favoriteJokes.forEach(favorite => {
            if (favorite.id === joke.id) {
              joke.favorite = true;
            }
          });
        });
      }
    }
  }

  /**
   * Set a joke as favorite
   * If we have more than 10 items, we wont allow new ones
   * If it is already market as favorite, deselect it
   * After we've done that, we store it on our storageservice
   * @param joke joke to set as favorite
   */
  setFavorite(joke: Joke) {
    if (!joke.favorite && this.favoriteJokes.length > 9) {
      this.snackBar.open('Favorite limit of 10 items reached', '', { duration: 2000});
    } else {
      joke.favorite = !joke.favorite;
      if (joke.favorite) {
        this.favoriteJokes.push(joke);
      } else {
        const favorites = [];
        this.favoriteJokes.forEach(favoriteJoke => {
          if (favoriteJoke.id !== joke.id) {
            favorites.push(favoriteJoke);
          }
        });
        this.favoriteJokes = favorites;
      }
      this.storageService.setJokeStorage(this.favoriteJokes);
    }
  }

  /**
   * Fill our favorites list with new jokes. Put it on an interval so a new one apears every 5 seconds
   */
  fillFavorites() {
    const interval = setInterval(() => {
      if (this.favoriteJokes.length < 10) {
        this.getNewFavorite();
      } else {
        clearInterval(interval);
      }
    }, this.timeout);
  }

  /**
   * Get a new favorite joke from our service
   */
  getNewFavorite() {
    this.apiService.getRandomJoke().subscribe((res) => {
      if (!!res) {
        this.setFavorite(res);
      }
    });
  }
}
