import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getNavButtons(): ElementArrayFinder {
    return element.all(by.css('mat-toolbar a.mat-raised-button'));
  }

  getChuckButton(): ElementFinder {
    return element(by.css('mat-toolbar a.chucklist-button'));
  }

  getQuoteButton(): ElementFinder {
    return element(by.css('mat-toolbar a.quote-button'));
  }
}
