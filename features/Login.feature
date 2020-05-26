@Sanity @Regression @Smoke
Feature: Login
  As a system administrator
  In order to test login access control to the management portal
  I want to log in with valid and invalid credentials with default authentication options
  And log out of the page

  Scenario Outline: Log in as <login> to access <title>
    Given I attempt to log into the application as user <login> with password <passwd> <access>
    Then I confirm the page title is <title> as expected <access>
    And the text <text> appears on the page

    Examples:
      | login   | passwd | title | text                             | access |
      | _SYSTEM | SYS    | Home  | Welcome to the Management Portal | true   |
#      | abc     | xyz    | Login | ERROR #822: Access Denied        | false  |
#
#  Scenario:  Log out of application and validate landing page
#    Given I log in to the application
#    Then I log out of the application