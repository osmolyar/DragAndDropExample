/**
 * Created by osmolyar on 11/6/2017.
 */

import speed from "../config/speed"

class ValidateUtilities {
    static getModalGroupTitle() {
        return $(".modalGroupTitle.modalGroupDialog").getText()
    }

    // add some validate utilities here as wrappers to Webdriverio validation functions

    static validateVisibleText(text: string, error?: string, locator = "/html/body", matchcase = true) {
        $(locator).waitForDisplayed()
        let actualText = $(locator).getText()
        if (!matchcase) {
            actualText = actualText.toLowerCase()
        }
        const expectedText = matchcase ? text : text.toLowerCase()
        assert.include(actualText, expectedText, error)
    }

    static validatePageTitle(title: string, error?: string) {
        browser.pause(speed.implicit)
        let actualTitle = browser.getTitle()
        assert.include(actualTitle, title, error)
    }

    static validatePageTitleNotEqual(title: string, error?: string) {
        browser.pause(speed.implicit)
        let actualTitle = browser.getTitle()
        assert.notEqual(actualTitle, title, error)
    }

    static validateAccessDenied(error?: string) {
        browser.pause(speed.implicit)
        let actualTitle = browser.getTitle()
        expect(actualTitle).to.be.oneOf(["", "Login"], error)
    }

    static populateValidationArray(item, value, array) {
        let validationPair = {}
        validationPair[item] = value
        array.push(validationPair)
        console.log("In ValidateUtilities.populateValidationArray: validationArray: %s", JSON.stringify(array))
        return array
    }

    static validateTestArray(expectedArray, actualArray) {
        for (let i = expectedArray.length; i--; ) {
            expect(expectedArray[i]).to.equal(
                actualArray[i],
                "UI Validation failure: Actual " + actualArray[i] + "does not match expected: " + expectedArray[i]
            )
        }
    }
}

export default ValidateUtilities
