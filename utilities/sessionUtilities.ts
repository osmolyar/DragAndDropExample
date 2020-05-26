/**
 * Created by osmolyar on 11/6/2017.
 */

import { legacyBrowser } from "../common/commands/customCommands"
import { deprecatedBrowser } from "../common/commands/deprecatedBrowser"
import speed from "../common/config/speed";

class utilities {

//add some generic utilities here as wrappers to Webdriverio  functions

    static logOutOrReload() {
        try {
            legacyBrowser._waitForZenPageReady();
            legacyBrowser._click('//div[@id="portalTitleMenuBox"]/a[contains(.,"Logout")]');
            legacyBrowser._getText('[name=IRISUsername]',speed.slow)
            // legacyBrowser._acceptAlertIfPresent();
            // legacyBrowser._acceptAlertIfPresent();
        } catch (err) {
            console.log("Logout error: " + JSON.stringify(err));
            browser.reloadSession();
            browser.pause(speed.slow);
        }
    };

    static reloadBrowser() {
        browser.reloadSession();
        console.log('Setting viewport size');
        browser.setWindowSize(1900,900);
        const windowSize = browser.getWindowSize();
        console.log("Window size is: " + JSON.stringify(windowSize));
    };

}



export default utilities;