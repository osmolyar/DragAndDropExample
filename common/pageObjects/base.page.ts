import colors from "colors"
import { legacyBrowser } from "../commands/customCommands"
import _ from "lodash"
import speed from "../config/speed"
import Element from "./element"

class Page {
    //needs to be commented out pending phase 2 removal of "get rawSelectors" in page objects
    // map: any
    //workaround:
    private _map: any

    get map() {
        return this._map
    }

    set map(value) {
        this._map = value
    }

    element = new Element()
    spinner = legacyBrowser._spinner

    constructor() {
    }

    get speed() {
        return speed
    }

    /**
     * meant to be overridden by inherited classes
     * to include another "page". e.g. banner and footer
     *
     * @returns {Array}
     */
    get components() {
        return []
    }

    open(path = "") {
        const url = path
        browser.url(url)
        console.log("- navigate to:", colors.cyan(url))
    }

    getElement(selector) : WebdriverIO.Element {
        return legacyBrowser.getElement(selector, this)
    }

    getSelector(template = ""): string {
        return legacyBrowser.getSelector(template, this)
    }

    setProperties(businessOptions, itemArray, maxWait?, trailingWait?) {
        for (let i = 0; i < itemArray.length; i++) {
            this.element.setUniversal(this.map[itemArray[i]], businessOptions[itemArray[i]], maxWait, trailingWait)
        }
    }

    getProperties(validationOptions, itemArray, maxWait?, trailingWait?) {
        for (let i = 0; i < itemArray.length; i++) {
            if (this.element.isExisting(this.map[itemArray[i]])) {
                validationOptions[itemArray[i]] = this.element.getUniversal(
                    this.map[itemArray[i]],
                    maxWait,
                    trailingWait
                )
            }
        }
    }

    acceptAlert() : string {
        console.log("accepting alert")
        const alertMessage = browser.getAlertText()
        legacyBrowser._acceptAlert()
        return alertMessage
    }

    acceptAlertIfPresent() : string {
        return legacyBrowser._acceptAlertIfPresent()
    }

    dismissAlert() : string {
        console.log("dismissing alert")
        const alertMessage = browser.getAlertText()
        legacyBrowser._dismissAlert()
        return alertMessage
    }

    dismissAlertIfPresent() : string {
        return legacyBrowser._dismissAlertIfPresent()
    }

    getErrorHintHighlighted(selector) : string {
        if (legacyBrowser._isExisting(selector))
            if (!($(selector).getAttribute("class") === "redText")) return "false"
            else return "true"
    }

    getTitle(maxWait?: number, trailingWait?: number): string {
        return legacyBrowser._getTitle(maxWait, trailingWait);
    }

    waitForZenPageReady(selector?:string, maxWait?: number, trailingWait?: number) {
        legacyBrowser._waitForZenPageReady(selector, maxWait, trailingWait);
    }

    pause(time) {
        browser.pause(time)
    }
}

export default Page
