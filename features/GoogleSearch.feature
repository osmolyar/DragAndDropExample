@Sanity @Regression
Feature: Google search
  As a user
  In order to test the Google search functionality
  I want to search for specified text on the home page
  And search for new text via the results page
  And click on a result containing specified

  Background:
    Given I navigate to the Google home page

    Scenario:
      When I drag the Gmail link to the input box
      And I click the search button

#  Scenario Outline: Search for <search1> followed by <search2> and click on result containing <result>  <id>
#    When I search for text <search1>
#    And I use the Google results page to search for text <search2>
#    And I click on search result containing text <result>
 #   Then the page title contains <title>
#    Given I navigate to the Google home page
#    When I search for <search1> and click I'm Feeling Lucky
#
#    Given I navigate to the Google home page
#    When I search for text <search1>
#    And I use the Google results page to search for text <search2>
#    And I click on search result containing text <result>
# #   Then the page title contains <title>
#    Given I navigate to the Google home page
#    When I search for <search1> and click I'm Feeling Lucky
#
#    Given I navigate to the Google home page
#    When I search for text <search1>
#    And I use the Google results page to search for text <search2>
#    And I click on search result containing text <result>
#    Given I navigate to the Google home page
#    When I search for <search1> and click I'm Feeling Lucky
#    Given I navigate to the Google home page
#    When I search for text <search1>
#    And I use the Google results page to search for text <search2>
#    And I click on search result containing text <result>
#    Given I navigate to the Google home page
#    When I search for <search1> and click I'm Feeling Lucky
#    Given I navigate to the Google home page
#    When I search for text <search1>
#    And I use the Google results page to search for text <search2>
#    And I click on search result containing text <result>
#    Given I navigate to the Google home page
#    When I search for <search1> and click I'm Feeling Lucky
#    Given I navigate to the Google home page
#    When I search for text <search1>
#    And I use the Google results page to search for text <search2>
#    And I click on search result containing text <result>
#    Given I navigate to the Google home page
#    When I search for <search1> and click I'm Feeling Lucky
#    Given I navigate to the Google home page
#    When I search for text <search1>
#    And I use the Google results page to search for text <search2>
#    And I click on search result containing text <result>
#    Given I navigate to the Google home page
#    When I search for <search1> and click I'm Feeling Lucky
#    Given I navigate to the Google home page
#    When I search for text <search1>
#    And I use the Google results page to search for text <search2>
#    And I click on search result containing text <result>
#    Given I navigate to the Google home page
#    When I search for <search1> and click I'm Feeling Lucky
#    Given I navigate to the Google home page
#    When I search for text <search1>
#    And I use the Google results page to search for text <search2>
#    And I click on search result containing text <result>
#    Given I navigate to the Google home page
#    When I search for <search1> and click I'm Feeling Lucky

#    Examples:
#      | id | search1                                    | search2   | result    | title                |
#      | 1  | Adrian Lewis Darts players abroad          | elephants | Wikipedia | Elephant - Wikipedia |
#      | 2  | Rex Tillerson Darts players abroad         | bears     | Bears       | Elephant - Wikipedia |
#      | 3  | Matthew Perry Darts players abroad         | giraffes  | Wikipedia | Elephant - Wikipedia |
#      | 4  | Oliver Wendell Holmes Darts players abroad | sloths    | Wikipedia | Elephant - Wikipedia |
#      | 5  | Robert Redford Darts players abroad      | crocodiles   | Wikipedia | Elephant - Wikipedia |
#      | 6  | Robert Frost Darts players abroad        | gazelles     | Wikipedia | Elephant - Wikipedia |
#      | 7  | Ernest Hemingway players abroad        | emus         | Wikipedia | Elephant - Wikipedia |
#      | 8  | Emily Bronte Darts players abroad        | pelicans     | Wikipedia | Elephant - Wikipedia |
#      | 9  | Emily Dickinson Darts players abroad     | storks       | Wikipedia | Elephant - Wikipedia |
#      | 10 | Charlotte Bronte Darts players abroad    | flamingos    | Wikipedia | Elephant - Wikipedia |
#      | 11 | Virginia Woolf Darts players abroad      | lions        | Wikipedia | Elephant - Wikipedia |
#      | 12 | Jules Verne Darts players abroad         | tigers       | Wikipedia | Elephant - Wikipedia |
#      | 13 | Agatha Christie Darts players abroad     | wolves       | Wikipedia | Elephant - Wikipedia |
#      | 14 | Sherlock Holmes Darts players abroad     | dogs         | Wikipedia | Elephant - Wikipedia |
#      | 15 | Courtney Cox Darts players abroad        | cats         | Wikipedia | Elephant - Wikipedia |
#      | 16 | Lisa Williams Darts players abroad       | fish         | Wikipedia | Elephant - Wikipedia |
#      | 17 | April Rose Darts players abroad          | guinea pigs  | Wikipedia | Elephant - Wikipedia |
#      | 18 | John Doe Darts players abroad            | hamsters     | Wikipedia | Elephant - Wikipedia |
#      | 19 | Sheriff Jones Darts players abroad       | snakes       | Wikipedia | Elephant - Wikipedia |
#      | 20 | Andrew Harding Darts players abroad      | frogs        | Wikipedia | Elephant - Wikipedia |
#      | 21 | Bill Clinton Darts players abroad        | lizards      | Wikipedia | Elephant - Wikipedia |
#      | 22 | George Bush Holmes Darts players abroad  | geckos       | Wikipedia | Elephant - Wikipedia |
#      | 23 | George HW Bush Darts players abroad      | zebra        | Wikipedia | Elephant - Wikipedia |
#      | 24 | Barack Obama Darts players abroad        | turkeys      | Wikipedia | Elephant - Wikipedia |
#      | 25 | Ronald Reagan Darts players abroad       | chickens     | Wikipedia | Elephant - Wikipedia |
#      | 26 | President Carter Darts players abroad    | chickadees   | Wikipedia | Elephant - Wikipedia |
#      | 27 | George Washington Darts players abroad   | hummingbirds | Wikipedia | Elephant - Wikipedia |
#      | 28 | Martha Washington Darts players abroad   | pigeons      | Wikipedia | Elephant - Wikipedia |
#      | 29 | John Hancock Darts players abroad        | penguins     | Wikipedia | Elephant - Wikipedia |
#      | 30 | John Adams Darts players abroad          | sparrows     | Wikipedia | Elephant - Wikipedia |
#      | 31 | Theodore Roosevelt Darts players abroad  | ostrich      | Wikipedia | Elephant - Wikipedia |
#      | 32 | Amy Klobuchar Darts players abroad       | moose        | Wikipedia | Elephant - Wikipedia |
#      | 33 | Hilary Clinton Darts players abroad      | cows         | Wikipedia | Elephant - Wikipedia |
#      | 34 | Oprah Darts players abroad               | bulls        | Wikipedia | Elephant - Wikipedia |
#      | 35 | Jimmy KimmelDarts players abroad | antelope     | Wikipedia | Elephant - Wikipedia |
#      | 36 | Tina Fey Darts players abroad            | cheetahs     | Wikipedia | Elephant - Wikipedia |
#      | 36 | Amy Schumer Darts players abroad         | leopards     | Wikipedia | Elephant - Wikipedia |
#      | 37 | Chuck Schumer Darts players abroad       | bats         | Wikipedia | Elephant - Wikipedia |
#      | 38 | Nancy Pelosi Darts players abroad        | squirrels    | Wikipedia | Elephant - Wikipedia |
#      | 39 | Rex Tillerson Darts players abroad       | opposums     | Wikipedia | Elephant - Wikipedia |
#      | 40 | Maria Butina Darts players abroad        | skunks       | Wikipedia | Elephant - Wikipedia |
#      | 41 | Herbert Hoover Darts players abroad      | gerbils      | Wikipedia | Elephant - Wikipedia |
#      | 42 | Oliver Wendell Holmes Darts players abroad         | chipmunks    | Wikipedia | Elephant - Wikipedia |
#      | 43 | Mayor Menino Darts players abroad        | monkeys      | Wikipedia | Elephant - Wikipedia |
#      | 44 | Michael Dukakis Darts players abroad     | gorillas     | Wikipedia | Elephant - Wikipedia |
#      | 45 | Olympia Dukakis Darts players abroad     | apes         | Wikipedia | Elephant - Wikipedia |
#      | 46 | Andrew Bott Darts players abroad         | chimpanzees  | Wikipedia | Elephant - Wikipedia |
#      | 47 | Audrey Hepburn Darts players abroad      | eagles       | Wikipedia | Elephant - Wikipedia |
#      | 48 | Peter O'Toole Darts players abroad       | hawks        | Wikipedia | Elephant - Wikipedia |
#      | 49 | Sandra Day Darts players abroad          | ducks        | Wikipedia | Elephant - Wikipedia |

#  Scenario: Perform a search and validate result page
#    When I search for text envy apples in recipes from Massachusetts
#    And I click on search result containing text Information
#    Then the page title contains Envy Apples Information
