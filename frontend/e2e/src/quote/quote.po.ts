import { browser, by, element } from 'protractor';

export class QuotePage {
  navigateToQuote() {
    return browser.get('/quote') as Promise<any>;
  }

  getQuote() {
    return element(by.css('app-root app-quote-component .quote .text')).getText() as Promise<string>;
  }

  // see if we have the chuck and chuck-<number> class
  getChuck() {
    return element(by.css('app-root app-quote-component .chuck'));
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
}
