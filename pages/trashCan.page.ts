import BasePage  from  '../common/pageObjects/base.page' ;
import {codeForSelectors as dragAndDrop} from 'html-dnd';

class TrashCanPage extends BasePage {

    constructor(validate=false) {
        super();
    }


  getPage(url) {
      // browser.reloadSession();
    this.open(url);
      console.log('Setting viewport size');
      browser.setWindowSize(
          1500,
          800
      );
      // var windowSize = browser.windowHandleSize();
    return this;
  };

  dragAndDropWdio() {
      // Wait for the bin to be there
      const trashCan = $('.trash');
      trashCan.waitForDisplayed(15000);

      // First check how many documents whe have
      // expect($$('.document').length).toEqual(
      //     4,
      //     'There are less documents, this is not correct',
      // );
      // for demo purpose
      browser.pause(500)
      // Drag the first document to the trash can
      $$('.document')[0].dragAndDrop(trashCan);
      // for demo purpose
      browser.pause(500)
      // Drag the 2nd document to the trash can
      $$('.document')[0].dragAndDrop(trashCan);
      // for demo purpose
      browser.pause(500)
      // Drag the rd document to the trash can
      $$('.document')[0].dragAndDrop(trashCan);

      // for demo purpose
      browser.pause(500)

  }


    dragAndDropHtmlDnD() {
        // Wait for the bin to be there
        const trashCan = $('.trash');
        trashCan.waitForDisplayed(15000);

        // First check how many documents whe have
        // expect($$('.document').length).toEqual(
        //     4,
        //     'There are less documents, this is not correct',
        // );
        // for demo purpose
        browser.pause(500)
        // Drag the first document to the trash can
        browser.execute(dragAndDrop,'.document','.trash')
        // for demo purpose
        browser.pause(500)
        // Drag the 2nd document to the trash can
        browser.execute(dragAndDrop,'.document','.trash')
        // for demo purpose
        browser.pause(500)
        // Drag the rd document to the trash can
        browser.execute(dragAndDrop,'.document','.trash')

        // for demo purpose
        browser.pause(500)

        // Check the amount of documents is 1
        assert.equal($$('.document').length,1)

    }


}
export default TrashCanPage;