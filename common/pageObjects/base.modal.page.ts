import BasePage from'./base.page' ;

class ModalPage extends BasePage {
    iFrame = '//iframe[@class="modalGroupIframe"]';
    constructor() {
        super();
    }

    switchToIFrame() {
        const id = browser.findElement("xpath", this.iFrame);
        browser.switchToFrame(id);
    };

    validateIFrameOpen() {
        assert.equal(this.element.isExisting(this.iFrame),true);
    }

    /**
     * meant to be overridden by inherited classes
     * to include another "page". e.g. banner and footer
     *
     * @returns {Array}
     */

}

export default ModalPage;
