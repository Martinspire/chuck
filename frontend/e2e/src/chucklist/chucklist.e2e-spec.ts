import { ChuckListPage } from './chucklist.po';
import { browser, logging } from 'protractor';

describe('Chucklist page', () => {
  let page: ChuckListPage;

  beforeEach(() => {
    browser.executeScript('window.localStorage.clear();');
    page = new ChuckListPage();
    page.navigateToChuck();
  });

  describe('Structure', () => {
    it('should display welcome message', () => {
      expect(page.getTitleText()).toEqual('Your Chuck Norris Jokes of the day');
    });
    it('has tabs', () => {
      expect(page.getTabs().count()).toEqual(2);
    });
  });

  describe('Chuck', () => {
    it('chuck is displayed', () => {
      expect(page.hasChuckClass()).toContain('chuck-');
    });
    it('chuck is displayed with class', () => {
      expect(page.hasChuckClassNumber()).toBeTruthy();
    });

    it('chuck is displayed with class', () => {
      expect(page.hasChuckClassNumber()).toBeTruthy();
    });
  });

  describe('Jokes', () => {
    it('shows 10 jokes when you start the page', () => {
      expect(page.getJokes().count()).toEqual(10);
    });
    it('shows index, text, genre and favorite', () => {
      expect(page.getJokeNumber(0).getText()).toBeDefined();
      expect(page.getJokeText(0).getText()).toBeDefined();
      expect(page.getJokeGenre(0).getText()).toBeDefined();
      expect(page.getJokeFavorite(0).getText()).toBeDefined();
    });
    it('can select a favorite', () => {
      expect(page.getJokeFavoriteIcon(0).getText()).toEqual('favorite_border');
      page.getJokeFavorite(0).click();
      expect(page.getJokeFavoriteIcon(0).getText()).toEqual('favorite');
    });
  });

  describe('Favorites', () => {
    beforeEach(() => {
      browser.executeScript('window.localStorage.clear();');
    });
    it('shows no favorites', () => {
      page.getTabs().get(1).click();
      expect(page.getFavorites().count()).toEqual(0);
    });
    it('shows a favorite when we add one', () => {
      page.getTabs().get(0).click();
      expect(page.getFavorites().count()).toEqual(0);
      page.getJokeFavorite(0).click().then(() => {
        page.getTabs().get(1).click();
        expect(page.getFavorites().count()).toEqual(1);
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
