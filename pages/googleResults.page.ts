import BasePage  from  '../common/pageObjects/base.page' ;
import ResultsPageLocators  from '../locDefs/googleResults.locators';

class ResultsPage extends BasePage {

    constructor(validate=false) {
        super();
        if (validate===true)
            this.validatePageOpen();
    }

  get map() {
    return new ResultsPageLocators();
  };

  searchAgain(Search='') {
      this.element.setValue(this.map.searchForm,Search);
      this.element.click(this.map.searchIcon);
      return this;
  };

    clickOnImage(imageNo=1) {
        this.element.click(this.map.imageByImageNo(imageNo))
    }


    clickOnResultByNo(resultNo=1) {
        this.element.click(this.map.resultByResultNo(resultNo))
    }

    clickOnResultByPartialText(text='') {
        this.element.click(this.map.resultByPartialText(text))
    }

   validatePageOpen() {
    //   assert.include(this.element.getTitle(), 'Google Search');
   };

}
export default ResultsPage;