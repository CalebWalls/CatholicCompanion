import { CatholicCompanionPage } from './app.po';

describe('catholic-companion App', function() {
  let page: CatholicCompanionPage;

  beforeEach(() => {
    page = new CatholicCompanionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
