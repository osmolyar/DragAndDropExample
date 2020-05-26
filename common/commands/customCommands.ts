import colors from "colors/safe"
import _ from "lodash"
import speed from "../config/speed"

function _acceptAlert() {
    console.log("in _acceptAlert")
    browser.pause(300)
    browser.acceptAlert()
}

function _dismissAlert() {
    browser.pause(300)
    browser.dismissAlert()
}

function getAlertText() {
    return browser.getAlertText()
}

function _acceptAlertIfPresent() {
    console.log("accepting alert if present")
    try {
        let alertMessage=browser.getAlertText()
        browser.acceptAlert();
        console.log("Alert was present. Alert message: " + alertMessage)
        return alertMessage
    } catch (error) {
        console.log("No alert was present." )
        return 'noAlert'
    }
}

function _dismissAlertIfPresent() {
    console.log("dismissing alert if present")
    try {
        let alertMessage=browser.getAlertText()
        browser.dismissAlert();
        console.log("Alert was present. Alert message: " + alertMessage)
        return alertMessage
    } catch (error) {
        console.log("No alert was present." )
        return 'noAlert'
    }
}

function _dismissZenAlertsAndRefresh() {
    var isAlertPresent = legacyBrowser._acceptAlertIfPresent()
    if (isAlertPresent != "noAlert") {
        isAlertPresent = legacyBrowser._acceptAlertIfPresent()
        if (isAlertPresent != "noAlert") {
            legacyBrowser._acceptAlertIfPresent()
        }
        browser.refresh()
    }
}
/**
 * Used for interpolating selectors with placeholders with data
 *
 * from:http://stackoverflow.com/questions/1408289/how-can-i-do-string-interpolation-in-javascript
 * usage:
 *  getSelector('[qd-tag="I am ${NPI}"]', {'npi': 12344555})
 *  => "I am 5
 *  getSelector('[qd-tag="I am ${0}"]', [123456677])
 *  => "I am 5
 *
 * @param template (string)
 * @param scope (object)
 * @returns {string}
 */
const getSelector = function(template = "", scope: object = {}) {
    return template.replace(/\${([^{}]*)}/g, function(match, prop) {
        //e.g. match == "${NPI}", prop == "NPI"
        var replacement = _.get(scope, prop, "")
        return typeof replacement === "string" || typeof replacement === "number" ? replacement : match
    })
}
/**
 * @param element (WebdriverIO.Element or selector string)
 * @param scope
 */
function logExisting(element: any, scope: object) {
    var selector = _.isString(element) ? element : legacyBrowser.getSelector(element, scope)
    var isExisting = $(selector).isExisting()
    console.log(colors.green(selector), isExisting ? colors.green("exists") : colors.red("not exist"))
}
/**
 * @param selector
 * @param scope
 */
function getElement(selector: string, scope?: object) {
    selector = _.isNil(scope) ? selector : legacyBrowser.getSelector(selector, scope)
    return $(selector)
}
/**
 * @param selector
 * @param value
 * @param maxWait
 * @param trailingWait
 */
function _setUniversal(
    selector: string,
    value: any,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    if (value) {
        let tagName = $(selector).getTagName()
        if (tagName === "input") {
            let typeName = $(selector).getAttribute("type")
            if (typeName == "checkbox") {
                return legacyBrowser._setCheckBox(selector, value, maxWait, trailingWait)
            } else if (typeName == "radio") {
                return legacyBrowser._setRadio(selector, value, maxWait, trailingWait)
            }
        } else if (tagName === "select") {
            return legacyBrowser._selectLabel(selector, value, maxWait, trailingWait)
        } else {
            let classes = $(selector).getAttribute("class")
            if (tagName === "ui-select-container" || classes?.includes("ui-select-container")) {
                // ui-select-container is in the list of classes
                return legacyBrowser._setTypeAhead(selector, value, maxWait, trailingWait)
            }
        }
        //default
        return legacyBrowser._setValue(selector, value, maxWait, trailingWait)
    }
}

/**
 * @param selector
 * @param maxWait
 * @param trailingWait
 */
function _getUniversal(selector: string, maxWait: number = speed.implicit, trailingWait: number = speed.fast) {
    let tagName = $(selector).getTagName()
    if (tagName === "input") {
        let typeName = $(selector).getAttribute("type")
        if (typeName == "checkbox" || typeName == "radio") {
            return $(selector).isSelected()
        }
    } else if (tagName === "select") {
        //Assume selects by label because this is the most easily retrieved
        return legacyBrowser._getSelectLabel(selector)
    } else if (tagName === "span" || tagName === "div" || tagName === "a" || tagName === "td") {
        return $(selector).getText()
    } else {
        let classes = $(selector).getAttribute("class")
        if (tagName === "ui-select-container" || classes?.includes("ui-select-container")) {
            // ui-select-container is in the list of classes
            return legacyBrowser._getTypeAhead(selector)
        }
    }
    //default
    return $(selector).getValue()
}

/**
 * @param selector
 * @param value
 * @param maxWait
 * @param trailingWait
 */
function _setValue(selector: string, value: any, maxWait: number = speed.implicit, trailingWait: number = speed.fast) {
    legacyBrowser._action(selector, setValue, maxWait, trailingWait)
    function setValue(element: WebdriverIO.Element) {
        if (value) {
            logSelector(selector, "set", value)
            element.setValue(value)
        }
    }
}

/**
 * @param selector
 * @param value
 * @param maxWait
 * @param trailingWait
 */
function _setTypeAhead(
    selector: string,
    value: any,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._action(selector, setTypeAheadValue, maxWait, trailingWait)
    function setTypeAheadValue(element: WebdriverIO.Element) {
        element.click()
        logSelector(selector, "set", value)
        if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                let v = value[i]
                let inputSelector = selector + ">div.selectize-input>input"
                legacyBrowser._setValue(inputSelector, v)
                let optionSelector =
                    selector +
                    ">div.ui-select-choices>div.ui-select-choices-content>div.ui-select-choices-group>div.ui-select-choices-row"
                legacyBrowser._click(optionSelector)
            }
        } else {
            let inputSelector = selector + ">div.selectize-input>input"
            legacyBrowser._setValue(inputSelector, value)
            let waitTime = (parseInt($(selector + ">div.ui-select-choices").getAttribute("refresh-delay")) || 0) + 500
            browser.pause(waitTime)
            let optionSelector =
                selector +
                ">div.ui-select-choices>div.ui-select-choices-content>div.ui-select-choices-group>div.ui-select-choices-row"
            legacyBrowser._click(optionSelector)
        }
    }
}

/**
 * @param selector
 */
function _getTypeAhead(selector: string) {
    let chosen = selector + ">.selectize-input" // >.ui-select-match"
    var options = $(chosen)
        .getText()
        .split("\n") // Returns an array of all the options
    options = options.filter(item => item !== "×") //remove the × that is used to remove the item from the list
    if (options.length === 1) {
        return options[0]
    }
    return options
}

/**
 * @param selector
 * @param value
 * @param maxWait
 * @param trailingWait
 */
function _appendValue(
    selector: string,
    value: any,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._action(selector, appendValue, maxWait, trailingWait)
    function appendValue(element: WebdriverIO.Element) {
        logSelector(selector, "append", value)
        element.addValue(value)
    }
}

/**
 * @param selector
 * @param maxWait
 * @param trailingWait
 */
function _clearValue(
    selector: string,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._action(selector, clearValue, maxWait, trailingWait)
    function clearValue(element: WebdriverIO.Element) {
        logSelector(selector, "clear")
        element.clearValue()
    }
}

/**
 * @param selector
 * @param state
 * @param maxWait
 * @param trailingWait
 */
function _setCheckBox(
    selector: string,
    state: string | Boolean = true,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._action(selector, setCheckboxValue, maxWait, trailingWait)
    function setCheckboxValue(element: WebdriverIO.Element) {
        logSelector(selector, "set", state)
        if (typeof state === "string" || state instanceof String) {
            state = state.toLowerCase() === "true"
        }
        if (element.isSelected() != state) {
            element.click()
        }
    }
}

/**
 * @param selector
 * @param state
 * @param maxWait
 * @param trailingWait
 */
function _setRadio(
    selector: string,
    state: string | Boolean = true,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._action(selector, setRadioValue, maxWait, trailingWait)
    function setRadioValue(element: WebdriverIO.Element) {
        logSelector(selector, "set", state)
        if (typeof state === "string" || state instanceof String) {
            state = state.toLowerCase() === "true"
        }
        if (element.isSelected() != state && state === true) {
            element.click()
        }
    }
}

/**
 * @param selector
 */
function _isExisting(selector: string) {
    logSelector(selector, "check")
    return $(selector).isExisting()
}

/**
 * @param selector
 */
function _isVisible(selector: string) {
    logSelector(selector, "check")
    return $(selector).isDisplayed()
}

/**
 * @param selector
 */
function _isClickable(selector: string) {
    logSelector(selector, "check")
    return $(selector).isClickable()
}


/**
 * @param selector
 */
function _isEnabled(selector: string) {
    logSelector(selector, "check")
    return $(selector).isEnabled()
}

/**
 * Note - currently does not work
 * @param selector
 * @param value
 * @param maxWait
 * @param trailingWait
 */
function _type(selector: string, value: any, maxWait: number = speed.implicit, trailingWait: number = speed.fast) {
    legacyBrowser._action(selector, typeValue, maxWait, trailingWait)
    function typeValue(element: WebdriverIO.Element) {
        logSelector(selector, "type", value)
    }
}

/**
 * @param selector
 * @param maxWait
 * @param trailingWait
 */
function _click(selector: string, maxWait: number = speed.implicit, trailingWait: number = speed.fast) {
    legacyBrowser._action(selector, click, maxWait, trailingWait)
    function click(element: WebdriverIO.Element) {
        logSelector(selector, "click")
        element.click()
    }
}

/**
 * @param sourceSelector
 * @param targetSelector
 * @param maxWait
 * @param trailingWait
 */
function _dragAndDrop(
    sourceSelector: string,
    targetSelector: string,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._dualElementAction(sourceSelector, targetSelector, dragAndDrop, maxWait, trailingWait)
    function dragAndDrop(element1: WebdriverIO.Element, element2: WebdriverIO.Element) {
        logSelector("drag ", sourceSelector, " to " + targetSelector)
        element1.dragAndDrop(element2)
    }
}

/**
 * @param selector
 * @param value
 * @param maxWait
 * @param trailingWait
 */
function _selectValue(
    selector: string,
    value: any,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._action(selector, selectVal, maxWait, trailingWait)

    function selectVal(element: WebdriverIO.Element) {
        if (value) {
            logSelector(selector, "select", value)
            // element.selectByValue(value)
            element.selectByAttribute("value", value)
        }
    }
}

/**
 * @param selector
 * @param value
 * @param maxWait
 * @param trailingWait
 */
function _selectLabel(
    selector: string,
    value: string,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._action(selector, selectVal, maxWait, trailingWait)

    function selectVal(element: WebdriverIO.Element) {
        if (value) {
            logSelector(selector, "select", value)
            element.selectByVisibleText(value)
        }
    }
}

/**
 * @param selector
 * @param value
 * @param maxWait
 * @param trailingWait
 */
function _selectLabelIncludes(
    selector: string,
    value: string,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._action(selector, selectVal, maxWait, trailingWait)

    function selectVal(element: WebdriverIO.Element) {
        if (value) {
            var options = $(selector)
                .getText()
                .split("\n") // Returns an array of all the options
            logSelector(selector, "select", value)
            let index = options.findIndex(function(v) {
                return v.includes(value)
            })
            element.selectByIndex(index) // Arrays start at 1, instead of 0
        }
    }
}

/**
 * @param selector
 */
function _getSelectLabel(selector: string) {
    let value = $(selector).getValue()
    if (value === "") {
        return ""
    }
    let chosen = selector + '>option[value="' + value + '"]'
    return $(chosen).getText()
}

/**
 * @param selector
 * @param index
 * @param maxWait
 * @param trailingWait
 */
function _selectByIndex(
    selector: string,
    index: number,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._action(selector, selectVal, maxWait, trailingWait)

    function selectVal(element: WebdriverIO.Element) {
        if (index) {
            var options = $(selector)
                .getText()
                .split("\n") // Returns an array of all the options
            logSelector(selector, "select", options[index])
            element.selectByIndex(index) // Some teams needs orig selectByIndex
        }
    }
}

/**
 * @param selector
 * @param index
 * @param maxWait
 * @param trailingWait
 */
function _selectIndex(
    selector: string,
    index: number,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    _selectByIndex(selector, index + 1, maxWait, trailingWait)
}

/**
 * @param selector
 * @param maxWait
 */
function _scrollIntoView(
    selector: string,
    maxWait: number = speed.implicit,
) {
    legacyBrowser._action(selector, scrollIntoView, maxWait)

    function scrollIntoView(element: WebdriverIO.Element) {
        logSelector(selector, "getValue")
        return element.scrollIntoView()
    }
}

/**
 * @param selector
 * @param maxWait
 */
function _getText(
    selector: string,
    maxWait: number = speed.implicit,
) {
    legacyBrowser._getAction(selector, getText, maxWait)
    var result: string
    function getText(element: WebdriverIO.Element) {
        logSelector(selector, "getText")
        result= element.getText()
    }
    return result
}

/**
 * @param selector
 * @param maxWait
 */
function _getValue(
    selector: string,
    maxWait: number = speed.implicit,
) {
    legacyBrowser._getAction(selector, getValue, maxWait)
    var result: string
    function getValue(element: WebdriverIO.Element) {
        logSelector(selector, "getValue")
        result= element.getValue()
    }
    return result
}

/**
 * @param selector
 * @param attribute
 * @param maxWait
 */
function _getAttribute(
    selector: string,
    attribute: string,
    maxWait: number = speed.implicit,
) {
    legacyBrowser._getAction(selector, getAttribute, maxWait)
    var result: string
    function getAttribute(element: WebdriverIO.Element) {
        logSelector(selector, "getAttribute")
        result= element.getAttribute(attribute)
    }
    return result
}
/**
 * @param maxWait
 * @param trailingWait
 */
function _getTitle(maxWait = speed.slow, trailingWait = 0) {
    let timeout = false
    let title = ""
    setTimeout(function() {
        timeout = true
    }, maxWait)
    while (!timeout) {
        try {
            title = browser.getTitle()
        } catch (e) {}
    }
    browser.pause(trailingWait)
    return title
}

type ActionCallback = (element: WebdriverIO.Element) => void

/**
 * reusable wait and do stuff method - waits for an element to exist and then act on it
 * @param selector
 * @param actionCb      - method to call once the element exists
 * @param maxWait       - max wait time in ms
 * @param trailingWait  - ms to pause once actions has been performed
 * @returns element     - for chaining
 */
const _action = function(
    selector: string,
    actionCb: ActionCallback,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    logSelector(selector, "wait", "")
    $(selector).waitForExist(maxWait)
    const element = $(selector)
    actionCb(element)
    browser.pause(trailingWait)
    return element
}

/**
 * reusable wait and do stuff method - waits for an element to exist and then act on it, returning result of action
 * @param selector
 * @param actionCb      - method to call once the element exists
 * @param maxWait       - max wait time in ms
 * @param trailingWait  - ms to pause once actions has been performed
 * @returns element     - for chaining
 */
const _getAction = function(
    selector: string,
    actionCb: ActionCallback,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    logSelector(selector, "wait", "")
    $(selector).waitForExist(maxWait)
    const element = $(selector)
    let result= actionCb(element)
    browser.pause(trailingWait)
    return result
}

type DualActionCallback = (element1: WebdriverIO.Element, element2: WebdriverIO.Element) => void
/**
 * reusable wait and do stuff method with two input parameters - waits for an element to exist and then act on it
 * @param element1
 * @param element2
 * @param actionCb      - method to call once the element exists
 * @param maxWait       - max wait time in ms
 * @param trailingWait  - ms to pause once actions has been performed
 * @returns element     - for chaining
 */
function _dualElementAction(
    selector1: string,
    selector2: string,
    actionCb: DualActionCallback,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    logSelector(selector1, "wait")
    logSelector(selector2, "wait")
    $(selector1).waitForExist(maxWait)
    $(selector2).waitForExist(maxWait)
    let element1 = $(selector1)
    let element2 = $(selector2)
    actionCb(element1, element2)
    browser.pause(trailingWait)
    return element1
}

/*================================================================================
=                           wait and CHECK stuff                                =
================================================================================*/
/**
 * wait a condition to meet where the condition is defined in the callback
 *
 * @description if the condition hasn't been meet, check every 250ms until condition has been met or maxWait has been reached
 *
 * @param conditionCb - return true if condition has been met
 * @param maxWait
 * @param trailingWait
 */

function waitForCondition(
    conditionCb: () => boolean,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    var frequency = 250
    var isValid = false
    browser.pause(frequency) // time before condition met
    while (maxWait > 0 && !isValid) {
        isValid = conditionCb()
        browser.pause(frequency)
        maxWait = maxWait - frequency
    }
    browser.pause(trailingWait) //post spinner processing takes time
}

/**
 * wait for spinner to disappear (display:none)
 * @param selector
 * @param maxWait       - max wait time in ms
 * @param trailingWait  - ms to pause once actions has been performed
 */
function _spinner(
    selector = '[qd-tag="cmp-page-modal-spinner"]',
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser._invisible(selector, maxWait, trailingWait)
    return browser
}

/**
 * wait for spinner to disappear (display:none)
 * @param maxWait
 * @param selector
 * @param trailingWait
 */
function _invisible(selector: string, maxWait: number = speed.implicit, trailingWait: number = speed.fast) {
    legacyBrowser.waitForCondition(
        () => {
            return !$(selector).isDisplayed()
        },
        maxWait,
        trailingWait
    )
    return browser
}

/**
 * wait for element to be displayed (for backwards compatibility)
 * @param maxWait
 * @param selector
 */
function _waitForExist(selector: string, maxWait: number = speed.implicit) {
    legacyBrowser.waitForCondition(
        () => {
            return $(selector).isDisplayed()
        },
        maxWait
    )
    return browser
}

/**
 * wait for element to be visible (for backwards compatibility)
 * @param maxWait
 * @param selector
 */
function _waitForVisible(selector: string, maxWait: number = speed.implicit) {
    legacyBrowser.waitForCondition(
        () => {
            return $(selector).isDisplayed()
        },
        maxWait
    )
    return browser
}

/**
 * wait for element to be displayed (documentation says it accepts a time parameter but webdriverio-core.d.ts doesn't have the parameter in the def, so will cause ts errors)
 * @param maxWait
 * @param selector
 */
function _waitForDisplayed(selector: string, maxWait: number = speed.implicit) {
    legacyBrowser.waitForCondition(
        () => {
            return $(selector).isDisplayed()
        },
        maxWait
    )
    return browser
}

/**
 * @param fromUrl
 */
function _urlChange(fromUrl = browser.getUrl()) {
    legacyBrowser.waitForCondition(() => {
        return fromUrl != browser.getUrl()
    })
    legacyBrowser._spinner()
    return browser
}

/**
 * wait for Zen Mouse Trap to disappear (display:none)
 * @param maxWait
 * @param selector
 * @param trailingWait
 */
function _waitForZenPageReady(
    selector = '//*[@id="zenMouseTrap"]',
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    // legacyBrowser._dismissZenAlertsAndRefresh()
    legacyBrowser._hasStyleDisplaySetToNone(selector, maxWait, trailingWait)
    return browser
}

/**
 * wait for style (display:none)
 * @param maxWait
 * @param selector
 * @param trailingWait
 */
function _hasStyleDisplaySetToNone(
    selector: string,
    maxWait: number = speed.implicit,
    trailingWait: number = speed.fast
) {
    legacyBrowser.waitForCondition(
        () => {
            return legacyBrowser._isExisting(selector) && !$(selector).isDisplayed()
        },
        maxWait,
        trailingWait
    )
    return browser
}

/**
 * wait for Home Page to appear (Title='IRIS - Home')
 * @param maxWait
 * @param trailingWait
 * @param title  page title to wait for
 */
function _waitForPage(title = "Title='IRIS - Home", maxWait: number = speed.implicit, trailingWait = speed.slow) {
    legacyBrowser.waitForCondition(
        () => {
            return browser.getTitle() == title
        },
        maxWait,
        trailingWait
    )
    return browser
}

/**
 * wait for Home Page to disappear (Title='IRIS - Home')
 * @param maxWait
 * @param trailingWait
 * @param title  page title to wait for disappearance
 */
function _waitForNotOnPage(title = "Title='IRIS - Home", maxWait: number = speed.implicit, trailingWait = speed.slow) {
    legacyBrowser.waitForCondition(
        () => {
            return browser.getTitle() != title
        },
        maxWait,
        trailingWait
    )
}

/**
 * @param selector
 * @param prefix
 * @param value
 */
function logSelector(selector, prefix, value?: any) {
    switch (prefix) {
        case "wait":
            console.log("  wait:  ", colors.red(selector))
            break
        case "click":
            console.log(colors.bold("- Click: "), colors.green(selector))
            break
        case "set":
            console.log(colors.bold("- Set:   "), colors.green(selector), "=>", colors.green(value))
            break
        case "append":
            console.log(colors.bold("- Append:   "), colors.green(selector), "=>", colors.green(value))
            break
        case "select":
            console.log(colors.bold("- Select:"), colors.green(selector), "=>", colors.green(value))
            break
        case "check":
            console.log("  Checking for existence of:  ", colors.red(selector))
            break
        case "getTitle":
            console.log(colors.bold("- Get Title:   "), colors.green(selector), "=>", colors.green(value))
            break
        default:
            console.log(selector)
    }
}

export const legacyBrowser = {
    _acceptAlert,
    _dismissAlert,
    getAlertText,
    _acceptAlertIfPresent,
    _dismissAlertIfPresent,
    _dismissZenAlertsAndRefresh,
    logExisting,
    getElement,
    getSelector,
    _setUniversal,
    _getUniversal,
    _setValue,
    _setTypeAhead,
    _getTypeAhead,
    _appendValue,
    _clearValue,
    _setCheckBox,
    _setRadio,
    _isExisting,
    _isVisible,
    _isClickable,
    _isEnabled,
    _type,
    _getTitle,
    _click,
    _dragAndDrop,
    _selectValue,
    _selectLabel,
    _selectLabelIncludes,
    _getSelectLabel,
    _selectIndex,
    _selectByIndex,
    _scrollIntoView,
    _action,
    _getAction,
    _dualElementAction,
    waitForCondition,
    _spinner,
    _invisible,
    _urlChange,
    _waitForZenPageReady,
    _hasStyleDisplaySetToNone,
    _waitForPage,
    _waitForNotOnPage,
    _waitForExist,
    _waitForVisible,
    _waitForDisplayed,
    logSelector,
    _getText,
    _getValue,
    _getAttribute,
}

/**
 * Binds all of the legacyBrowser commands to the browser object
 */
export function registerCustomCommands() {
    Object.entries(legacyBrowser).forEach(([name, cb]) => {
        browser.addCommand(name, cb)
    })
}
