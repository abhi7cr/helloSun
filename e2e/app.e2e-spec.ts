import { HelloEarthPage } from './app.po';

describe('hello-earth App', () => {
  let page: HelloEarthPage;

  beforeEach(() => {
    page = new HelloEarthPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
