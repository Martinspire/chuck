import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './shared/animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RefreshService } from './shared/refresh/refresh.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  random: number;
  url: string;

  constructor(private router: Router, private refreshService: RefreshService) {
    this.random = Math.floor(Math.random() * 6);
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd ) {
        this.url = event.url;
      }
    });
  }

  /**
   * Get animation properties to use on routing
   * @param outlet Router outlet to animate
   */
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  /**
   * Get random background number to switch up the backgrounds
   */
  getRandomBackground(): number {
    return this.random;
  }

  /**
   * Trigger refresh of pages whenever we click a button twice.
   */
  refreshJokes() {
    if (this.url === '/chucklist') {
      this.refreshService.setRefreshChuckList();
    }
  }
  refreshQuote() {
    if (this.url === '/quote') {
      this.refreshService.setRefreshQuote();
    }
  }
}
