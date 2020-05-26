@Sanity @Smoke @Regression
Feature: Generic Tests
  As a system administrator
  In order to test the menu links, icons, list items and other elements on the home page and main navigation nodes
  I want to navigate to the pages, crawl the visible elements and validate landing pages on navigation

  Background:
    Given I log in to the application

  Scenario Outline: Navigate menu links
    When I navigate to the <item> menu item
    Then I confirm the page title is <title> as expected true

    Examples:
      | item       | title      |
      | Classes    | Classes    |
      | Namespaces | Namespaces |
      | Routines   | Routines   |

  Scenario: Walk front page and validate elements
    Given I walk the front page and validate displayed elements

  Scenario: Verify home page list items
    Given I validate home page list items

  Scenario: Edit web application - enable Analytics
    Given I switch to columns view
    And I navigate to the System Administration WebApplications page
    When I edit the /csp/user web application as follows:
      | enableAnalytics | true |

  Scenario: Verify Analytics page list items
    Given I validate Analytics page list items


  Scenario: Verify Interoperability page list items
    Given I validate Interoperability page list items

  Scenario: Verify System Operation page list items
    Given I validate System Operation page list items

  Scenario: Verify System Explorer page list items
    Given I validate System Explorer page list items

  Scenario: Verify System Administration page list items
    Given I validate System Administration page list items

  Scenario: Navigate to About page and verify all labels
    Given I navigate to About page and verify all labels