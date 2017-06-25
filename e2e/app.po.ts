import { browser, by, element } from 'protractor';

export class ScrapZoneNGPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
