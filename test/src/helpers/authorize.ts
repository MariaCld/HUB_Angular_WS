import { browser, by, element } from "protractor";
import { env } from "../../env";

export function authorizePage() {
    console.log("started authorizePage() helper");

    browser.get(env.URL);
    var username = element(by.id('userNameId'));
    var login = element(by.id('buttonLogin'));
    username.isPresent().then(function (elem)
    {
        if (elem)
        {
            username.sendKeys('admin');
            browser.sleep(2000);
            login.click();
            browser.sleep(4000);
        } else {
            console.log("...Element was not found...")
        }
    });
}
