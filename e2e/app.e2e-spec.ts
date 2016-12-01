import { AdminWebcampPage } from './app.po';

describe('admin-webcamp App', function() {
  let page: AdminWebcampPage;

  beforeEach(() => {
    page = new AdminWebcampPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
