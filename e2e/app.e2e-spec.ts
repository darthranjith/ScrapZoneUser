import { ScrapZoneNGPage } from './app.po';

describe('scrap-zone-ng App', () => {
  let page: ScrapZoneNGPage;

  beforeEach(() => {
    page = new ScrapZoneNGPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
