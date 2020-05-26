import BasePage  from  '../common/pageObjects/base.page' ;
import HomePageLocators  from '../locDefs/googleHome.locators';
import GoogleResultsPage  from './/googleResults.page';
import {codeForSelectors as dragAndDrop} from 'html-dnd';

class HomePage extends BasePage {

    constructor(validate=false) {
        super();
        if (validate===true)
            this.validatePageOpen();
    }

  get map() {
    return new HomePageLocators();
  };
  getPage(url) {
      browser.reloadSession();
    this.open(url);
      console.log('Setting viewport size');
      browser.setWindowSize(
          1500,
          800
      );
      // var windowSize = browser.windowHandleSize();
    return this;
  };

  dragAndDropHTMLDnD() {
      browser.execute(dragAndDrop, 'div.gb_h:nth-child(1) > a:nth-child(1)', '.gLFyf');
  }

    dragAndDropWdio() {
        $('div.gb_h:nth-child(1) > a:nth-child(1)').dragAndDrop($('.gLFyf'))
    }

    clickSearch(Search='') {
        this.element.click(this.map.searchBtn);
        return new GoogleResultsPage(true);
    };
  search(Search='') {
      this.element.setValue(this.map.searchForm,Search);
      this.element.click(this.map.searchBtn);
      return new GoogleResultsPage(true);
  };

    getLucky(Search='') {
        this.element.setValue(this.map.searchForm,Search);
        this.element.click(this.map.iFeelLuckyBtn);
        return new GoogleResultsPage(true);
    };

   validatePageOpen() {
       assert.equal(browser.getTitle(), 'Google');
   };

}
export default HomePage;