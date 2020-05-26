@Sanity @Regression
Feature: DragAndDrop
  As a user
  In order to test drag and drop
  I run the function on different browsers

  Background:
    Given I navigate to the drag and drop demo page

    Scenario:
      When I drag three documents to the trash can using Wdio


  Scenario:
    When I drag three documents to the trash can using html-dnd