import { legacyBrowser } from "../commands/customCommands"
import speed from "../config/speed";

class Element {
    setUniversal = legacyBrowser._setUniversal;
    getUniversal = legacyBrowser._getUniversal;
    click = legacyBrowser._click;
    setValue = legacyBrowser._setValue;
    selectValue = legacyBrowser._selectValue;
    selectLabelIncludes = legacyBrowser._selectLabelIncludes;
    selectLabel = legacyBrowser._selectLabel;
    selectIndex = legacyBrowser._selectIndex;
    selectByIndex = legacyBrowser._selectByIndex;
    appendValue = legacyBrowser._appendValue;
    clearValue = legacyBrowser._clearValue;
    dragAndDrop = legacyBrowser._dragAndDrop;
    isVisible = legacyBrowser._isVisible;
    isClickable = legacyBrowser._isClickable;
    isEnabled = legacyBrowser._isEnabled;
    isExisting = legacyBrowser._isExisting;
    setCheckbox = legacyBrowser._setCheckBox;
    setRadio = legacyBrowser._setRadio;
    getText=legacyBrowser._getText;
    getValue=legacyBrowser._getValue;
    getAttribute=legacyBrowser._getAttribute;
    scrollIntoView=legacyBrowser._scrollIntoView;
    waitForExist=legacyBrowser._waitForExist;
    waitForVisible=legacyBrowser._waitForVisible;
    waitForDisplayed=legacyBrowser._waitForDisplayed;

    constructor() {}
}

export default Element
