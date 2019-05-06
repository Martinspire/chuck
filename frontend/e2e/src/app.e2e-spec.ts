import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Your Chuck Norris Jokes of the day');
  });

  it('should show our navigation', () => {
    page.navigateTo();
    expect(page.getNavButtons().count()).toEqual(2);
  });

  it('Should redirect to the quote page when \'Get a Quote\' is clicked', () => {
      const quoteButton = page.getQuoteButton();
      quoteButton.click();
      expect(browser.driver.getCurrentUrl()).toContain('/quote');
  });

  it('Should redirect to the chucklist page when \'Get 10 lines\' is clicked', () => {
      const chuckButton = page.getChuckButton();
      chuckButton.click();
      expect(browser.driver.getCurrentUrl()).toContain('/chucklist');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
