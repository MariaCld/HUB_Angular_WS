import { browser, by, element } from "protractor";
import { env } from "../../env";
import { authorizePage } from "../helpers/authorize";

// jasmine test suit
describe("apps-page", function () {
  // jasmine test hooks
  beforeAll(() => {
    console.log("started a test suite");
    // automated login into form
    authorizePage();
});
  beforeEach(
    async () =>
     await new Promise<void>(done =>
       setTimeout(() =>
        (console.log("starting a test"), done()), 3000)));

  afterEach(() => console.log("finished a test"));
  afterAll(() => console.log("finished a test suite"));

  // jasmine async test
  // it("should show login", async () => {
  //   await browser.get(env.URL);
  //   const loginComponent = element(by.css("app-login"));
  //   expect(await loginComponent.isPresent()).toBe(true);
  // });

  it('verify that an element exists on the page Apps',  async() => {
    browser.get(env.URL);
    // verify page title
    expect(await element(by.tagName('h1')).getText()).toBe('Apps page');

    // verify elements
    element.all(by.className('launcher')).then(function(items) {
      expect(items.length).toBe(14);
      expect(items[0].element(by.tagName('p')).getText()).toBe('[web] app 1');
      expect(items[1].element(by.tagName('p')).getText()).toBe('[desktop] app 2');
    });
  });

  it('verify that an element exists on the page Get',  async() => {
    browser.get(env.URL);
    await element(by.linkText('Get')).click();
    expect(await element(by.id('getMessage')).getText()).toBe('get works!');
    browser.sleep(2000);
  });

  it('verify that an element exists on the page Lock',  async() => {
    browser.get(env.URL);
    await element(by.linkText('Lock')).click();
    expect(await element(by.id('lockMessage')).getText()).toBe('lock works!');
    browser.sleep(2000);
  });
});