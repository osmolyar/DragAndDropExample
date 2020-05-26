/**
 * Created by osmolyar on 11/6/2017.
 */
import { legacyBrowser } from "common/commands/customCommands";
import  ValidateUtilities  from "common/utilities/validateUtilities";

var speed          = require( '../common/config/speed' );


// import chai from 'chai';
// import chaiAsPromised from 'chai-as-promised';
// chai.use(chaiAsPromised);
// chai.should();
// chai.expect();
//import checkClass from 'src/support/check/checkClass';

class validateUtilities {



    static validatePageTitle(title,error) {
        browser.pause(speed.implicit);
        legacyBrowser._waitForZenPageReady();
        let actualTitle = browser.getTitle();
        if (title=='Edit Service')
            actualTitle=ValidateUtilities.getModalGroupTitle();
        assert.include(actualTitle,title,error);
    }

    static validatePageTitleNotEqual(title,error) {
        browser.pause(speed.implicit);
     //   browser._waitForZenPageReady();
        let actualTitle = browser.getTitle();
        assert.notEqual(actualTitle,title,error);
    }

    static validateAccessDenied(title,error) {
        browser.pause(speed.implicit);
        let actualTitle = browser.getTitle();
        // @ts-ignore
        expect(actualTitle).to.include.oneOf(["","Login"],error);
    }

}


export default validateUtilities;