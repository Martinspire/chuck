import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class ChuckListPage {
  navigateToChuck() {
    return browser.get('/chucklist') as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  // see if we have the chuck and chuck-<number> class
  getChuck() {
    return element(by.css('app-root app-chuck-list-component .chuck'));
  }

  // see if we have the chuck and chuck-<number> class
  hasChuckClass() {
    return this.getChuck().getAttribute('class');
  }

  // Use classlist to see if one of the backgrounds has been set
  hasChuckClassNumber() {
    return this.getChuck().getAttribute('class').then((classNames) => {
      let haveResult = false;
      const options = ['0', '1', '2', '3', '4'];
      options.forEach(option => {
        if (classNames.indexOf('chuck-' + option) !== -1) {
          haveResult = true;
        }
      });
      return haveResult;
    });
  }

  getJokes(): ElementArrayFinder {
    return element.all(by.css('.joke-container .joke'));
  }

  getJokeNumber(index): ElementFinder {
    return this.getJokes().get(index).all(by.css('.index')).get(0);
  }
  getJokeText(index): ElementFinder {
    return this.getJokes().get(index).all(by.css('.text')).get(0);
  }
  getJokeGenre(index): ElementFinder {
    return this.getJokes().get(index).all(by.css('.genre')).get(0);
  }
  getJokeFavorite(index): ElementFinder {
    return this.getJokes().get(index).all(by.css('.favorite')).get(0);
  }
  getJokeFavoriteIcon(index): ElementFinder {
    return this.getJokes().get(index).all(by.css('.favorite i')).get(0);
  }

  getTabs(): ElementArrayFinder {
    return element.all(by.css('.mat-tab-label'));
  }

  getFavorites(): ElementArrayFinder {
    return element.all(by.css('.favorites-container .joke'));
  }

  getJokesTab(): ElementArrayFinder {
    return element.all(by.css('.joke-container'));
  }
  getFavoritesTab(): ElementArrayFinder {
    return element.all(by.css('.favorites-container'));
  }
}
