const { Given, When, Then } = require('cucumber');
let URL='https://google.com';

import  HomePage from '../../pages/googleHome.page';
let homepage=new HomePage();


Given(/^I navigate to the Google home page$/, function () {
    homepage.getPage(URL);
});

When(/^I drag the Gmail link to the input box$/, function () {
    homepage.dragAndDrop();
});

When(/^I click the search button$/, function () {
    context.resultsPage=homepage.clickSearch();
});

When(/^I search for text (.*)$/, function (text) {
    context.resultsPage=homepage.search(text);
});

When(/^I search for (.*) and click I'm Feeling Lucky$/, function (text) {
    context.resultsPage=homepage.getLucky(text);
});

When(/^I use the Google results page to search for text (.*)$/, function (text) {
    context.resultsPage=context.resultsPage.searchAgain(text);
});


When(/^I click on search result containing text (.*)$/, function (text) {
    context.resultsPage.clickOnResultByPartialText(text);
});

Then(/^the page title contains (.*)$/, function (text2) {
    assert.include(browser.getTitle(), text2);
});
