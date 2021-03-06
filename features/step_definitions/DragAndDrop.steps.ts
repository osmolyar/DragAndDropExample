const { Given, When, Then } = require('cucumber');
let URL='https://google.com';

import  HomePage from '../../pages/googleHome.page';
import  TrashCanPage from '../../pages/trashCan.page';
let homepage=new HomePage();
let trashCanPage=new TrashCanPage();



Given(/^I navigate to the drag and drop demo page$/, function () {
    homepage.getPage("https://marcojakob.github.io/dart-dnd/basic/");
});

When(/^I drag three documents to the trash can using Wdio$/, function () {
    trashCanPage.dragAndDropWdio();
});

When(/^I drag three documents to the trash can using html-dnd$/, function () {
    trashCanPage.dragAndDropHtmlDnD();
});