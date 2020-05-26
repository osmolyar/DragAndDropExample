/**
 * Returns the correct locator strategy for the given selector
 * @param selector either css or xpath
 */
function getLocatorStrategy(selector: string) {
    return selector.startsWith("/") ? "xpath" : "css"
}

/**
 * @deprecated
 */
function element(selector: string) {
    const using = getLocatorStrategy(selector)
    return browser.findElement(using, selector)
}

/**
 * @deprecated
 */
function elements(selector: string) {
    const using = getLocatorStrategy(selector)
    return browser.findElements(using, selector)
}

/**
 * @deprecated
 */
function isExisting(selector: string) {
    return $(selector).isExisting()
}

/**
 * @deprecated
 */
function isVisible(selector: string, maxWait?: number, trailingWait?: number) {
    return $(selector).isDisplayed()
}

/**
 * @deprecated
 */
function getText(selector: string) {
    return $(selector).getText()
}

/**
 * @deprecated
 */
function waitForExist(selector: string, maxWait?, reverse = false) {
    return $(selector).waitForExist(maxWait, reverse)
}

/**
 * @deprecated
 */
function getAttribute(selector: string, attr: string) {
    return $(selector).getAttribute(attr)
}

/**
 * @deprecated
 */
function getValue(selector: string) {
    return $(selector).getValue()
}

/**
 * @deprecated
 */
function isSelected(selector: string) {
    return $(selector).isSelected()
}

/**
 * @deprecated
 */
function getTagName(selector: string) {
    return $(selector).getTagName()
}

/**
 * @deprecated
 */
function waitForVisible(selector: string, maxWait?: number, reverse = false) {
    $(selector).waitForDisplayed(maxWait, reverse)
}

/**
 * @deprecated
 */
function isEnabled(selector: string) {
    return $(selector).isEnabled()
}

/**
 * @deprecated
 */
function frame(id = null as string) {
    (id == null) ? browser.switchToFrame(null) : browser.switchToFrame(id);
}

/**
 * @deprecated
 */
function getTabIds() {
    return browser.getWindowHandles()
}

/**
 * @deprecated
 */
function close(handle: string) {
    browser.closeWindow()
    browser.switchToWindow(handle)
}

/**
 * @deprecated
 */
function reload() {
    browser.reloadSession()
}

/**
 * @deprecated
 */
function setValue(locator: string, value: string) {
    $(locator).setValue(value)
}

/**
 * @deprecated
 */
function click(locator: string) {
    $(locator).click()
}

/**
 * @deprecated
 */
function clearElement(locator: string) {
    $(locator).clearValue()
}

/**
 * @deprecated
 */
function switchTab(handle: string) {
    browser.switchToWindow(handle)
}

/**
 * @deprecated
 */
function windowHandleSize() {
    return browser.getWindowSize()
}

/**
 * @deprecated
 */
function setViewportSize(width: number, height: number) {
    browser.setWindowSize(width, height)
}

export const deprecatedBrowser = {
    element,
    elements,
    isExisting,
    getText,
    isVisible,
    waitForExist,
    getAttribute,
    getValue,
    isSelected,
    getTagName,
    waitForVisible,
    isEnabled,
    frame,
    getTabIds,
    close,
    reload,
    setValue,
    click,
    clearElement,
    switchTab,
    windowHandleSize,
    setViewportSize,
}

/**
 * Registers the deprecated commands to the browser
 */
export function registerDeprecatedCommands() {
    Object.entries(deprecatedBrowser).forEach(([name, cb]) => {
        browser.addCommand(name, cb)
    })
}
