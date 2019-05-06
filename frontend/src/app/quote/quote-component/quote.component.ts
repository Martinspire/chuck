import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { RefreshService } from 'src/app/shared/refresh/refresh.service';
import { Joke } from 'src/app/models/joke/joke';

@Component({
  selector: 'app-quote-component',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit, OnDestroy {
  joke: Joke;
  random: number;
  subscription: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private apiService: ApiService,
    private refreshService: RefreshService
  ) {
    this.random = Math.floor(Math.random() * 4);
  }

  /**
   * Run on startup when DOM is ready to start initializing our component
   */
  ngOnInit() {
    this.getRandomJoke();
    this.subscribeToRefresh();
  }

  /**
   * Run on destruction when DOM is ready to start removing our component
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Whenever the page refreshes (when user clicks navigation) we reload the random joke so we get a new one each time
   */
  subscribeToRefresh() {
    this.subscription = this.refreshService.refreshQuote.subscribe(() => {
      this.getRandomJoke();
    });
  }

  /**
   * Generate a random number to set a different background
   */
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
   * Get random joke from our backend
   */
  getRandomJoke() {
    this.apiService.getRandomJoke().subscribe((res) => {
      if (!!res) {
        this.joke = res;
      }
    });
  }
}
