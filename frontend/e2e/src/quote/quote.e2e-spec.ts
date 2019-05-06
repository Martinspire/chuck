import { QuotePage } from './quote.po';
import { browser, logging } from 'protractor';

describe('Quote page', () => {
  let page: QuotePage;

  beforeEach(() => {
    page = new QuotePage();
    page.navigateToQuote();
  });

  it('should display a quote', () => {
    expect(page.getQuote()).toBeDefined();
  });

  it('chuck is displayed', () => {
    expect(page.hasChuckClass()).toContain('chuck-');
  });
  it('chuck is displayed with class', () => {
    expect(page.hasChuckClassNumber()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
