@Test
Feature: User Management
  As a system administrator
  In order to test the User Management functionality
  I want to create valid and invalid users and delete and edit user definitions

#  Background:
#    Given I log in to the application
#    And I navigate to the Users page

  Scenario Outline: Create roles - all fields <name>
    Given I log in to the application
    Given I navigate to the Roles page
    When I create a static role with the following options:
      | name | <name> |
    And I add the resource <resource> to the role
    And I add the following resources to the role:
      | resource    | permissions |
      | %DB_IRISSYS | RW          |
    Then the Edit Role page validation elements are confirmed
      | responseText        | <responseText>        |
      | nameHintHighlighted | <nameHintHighlighted> |
    And I confirm the role exists in the database <exists>
    And the role contains the specified resource and permissions in the database <exists>
    And the role contains the specified set of resources and permissions in the database <exists>

    Examples:
      | name       | resource      | exists | responseText | nameHintHighlighted |
#      | roleSecure | %Admin_Secure | true   | Role saved.  | false               |
      | roleManage | %Admin_Manage | true   | Role saved.  | false               |
#      | roleOperate       | %Admin_Operate  | true   | Role saved.  | false               |
#      | roleDevelopment   | %Development    | true   | Role saved.  | false               |


  Scenario Outline: Confirm a user's Management Portal access with an existing role <login>
    Given I log in to the application
    And I navigate to the Users page
    When I create a user with the given options and assign a role via SQL:
      | login         | <login>         |
      | passwd        | <passwd>        |
      | passwdConfirm | <passwdConfirm> |
      | role          | <role>          |
    And I log out of the application
    And I log into the application as the new user
    Then I confirm the user exists in the database true
    And I confirm via SQL that the role has been assigned to the user true
    And I confirm that the following navigation bar links are correctly enabled or disabled:
      | leftNavItem          | enabled                |
      | home                 | true                   |
      | analytics            | <analytics>            |
      | interoperability     | <interoperability>     |
      | systemOperation      | <systemOperation>      |
      | systemExplorer       | <systemExplorer>       |
      | systemAdministration | <systemAdministration> |
    Then I log out of the application

    Examples:
      | login         | passwd | passwdConfirm | role        | analytics | interoperability | systemOperation | systemExplorer | systemAdministration |
#      | accessAll           | passwd | passwd        | %All              | true      | true             | true            | true           | true                 |
#      | accessSecure  | passwd | passwd        | roleSecure  | true      | false            | false           | false          | true                 |
      | accessManage  | passwd | passwd        | roleManage  | true      | false            | false           | false          | true                 |

  Scenario Outline: Navigate to a page through the UI: mixed success cases. Log in as <login> to access <click1> <click2> <click3> <click4>
    Given I log into the application as user <login> with password <passwd>
    When I navigate to the following path:
      | click1 | <click1> |
      | click2 | <click2> |
      | click3 | <click3> |
      | click4 | <click4> |
      | access | <access> |
    Then I confirm the page title is <title> as expected <access>

    Examples:
      | login         | passwd | click1                | click2        | click3                            | click4                             | title                                        | access |
      | accessManage  | passwd | System Administration | Configuration | SQL and Object Settings           | System DDL Mappings                | System-defined DDL Mappings                  | true   |
      | accessManage  | passwd | System Administration | Configuration | SQL and Object Settings           | User DDL Mappings                  | User-defined DDL Mappings                    | true   |

#
#  Scenario Outline: Create users - basic fields <login>
#    When I create a user with the following options:
#      | login         | <login>         |
#      | passwd        | <passwd>        |
#      | passwdConfirm | <passwdConfirm> |
#    And I validate the table row for the user <exists>
#      | Selector | Name | Full Name | Enabled | Namespace | Routine | Type          | Delete | Profile |
#      |          | xx   |           | Yes     |           |         | Password user | Delete | Profile |
#    And I validate the following subset of columns in the user row <exists>
#      | Full Name | Enabled | Type          |
#      |           | Yes     | Password user |
#    Examples:
#      | login | passwd | passwdConfirm | exists |
#  #    | newUser1 | newUser1 | newUser1      | true   |
#
#  Scenario Outline: Create users - basic fields <login>
#    When I create a user with the following options:
#      | login                      | <login>                      |
#      | passwd                     | <passwd>                     |
#      | passwdConfirm              | <passwdConfirm>              |
#      | expDate                    | <expDate>                    |
#      | startupNamespace           | <startupNamespace>           |
#      | startupTagRoutine          | <startupTagRoutine>          |
#      | mobilePhoneServiceProvider | <mobilePhoneServiceProvider> |
#      | mobilePhoneNumber          | <mobilePhoneNumber>          |
#    Then the Edit User page validation elements are confirmed
#      | responseText         | <responseText>         |
#      | nameHintRed          | <nameHintRed>          |
#      | passwdHintRed        | <passwdHintRed>        |
#      | passwdConfirmHintRed | <passwdConfirmHintRed> |
#      | routineHint          | <routineHint>          |
#      | namespaceHint        | <namespaceHint>        |
#    And I find the row number of the user row
#    And I validate the table row for the user <exists>
#      | Selector | Name | Full Name | Enabled | Namespace | Routine | Type          | Delete | Profile |
#      |          | xx   |           | Yes     |           |         | Password user | Delete | Profile |
#    And I validate the following subset of columns in the user row <exists>
#      | Name    | Full Name | Namespace          | Enabled | Type          |
#      | <login> |           | <startupNamespace> | Yes     | Password user |
#    Then I confirm the user exists in the database <exists>
#    Examples:
#      | login    | passwd          | passwdConfirm   | expDate | startupNamespace | startupTagRoutine | exists | responseText                                                         | nameHintRed | passwdHintRed | passwdConfirmHintRed | namespaceHint | routineHint | mobilePhoneNumber | mobilePhoneServiceProvider |
#      | newUser1 | newUser1        | newUser1        |         |                  |                   | true   | User saved.                                                          | false       | false         | false                |               |             | 111-111-1111      | Verizon                    |
# #     |          | missingNameUser | missingNameUser |         |                  |                   | false  | There was a problem with the form. See the highlighted fields below. | true        | false         | false                |               |             | 222-222-2222      | Nextel                     |
##      | missingPasswdUser            |                                   | missingPasswdUser                 |            |                  |                   | false  | There was a problem with the form. See the highlighted fields below.                                                                                                                                               | false       | true          | false                |                                       |                                                        |111-111-1111      | T-Mobile                  |
##      | nonMatchingConfirmPasswdUser | passwd                            | nonMatchingPasswd                 |            |                  |                   | false  | There was a problem with the form. See the highlighted fields below.                                                                                                                                               | false       | false         | true                 |                                       |                                                        |111-111-1111      | AT&T Wireless             |
##      | missingConfirmPasswdUser     | passwd                            |                                   |            |                  |                   | false  | There was a problem with the form. See the highlighted fields below.                                                                                                                                               | false       | false         | true                 |                                       |                                                        |111-111-1111      | Alltel                    |
##      | validDateLeapYear            | passwd                            | passwd                            | 2020-02-29 |                  |                   | true   | User saved.                                                                                                                                                                                                        | false       | false         | false                |                                       |                                                        |111-111-1111      | Sprint PCS                |
##      | invalidCharDate              | passwd                            | passwd                            | abc        |                  |                   | false  | ERROR #944: Invalid expiration date ERROR #7204: Datatype value '-1' less than MINVAL allowed of 0 > ERROR #5802: Datatype validation failed on property 'Security.Users:ExpirationDate', with value equal to "-1" | false       | false         | false                |                                       |                                                        |111-111-1111      | Cellular One              |
##      | invalidValueDate1            | passwd                            | passwd                            | 2017-02-29 |                  |                   | false  | ERROR #944: Invalid expiration date ERROR #7204: Datatype value '-1' less than MINVAL allowed of 0 > ERROR #5802: Datatype validation failed on property 'Security.Users:ExpirationDate', with value equal to "-1" | false       | false         | false                |                                       |                                                        |111-111-1111      | Verizon                   |
##      | invalidValueDate2            | passwd                            | passwd                            | 2017-13-29 |                  |                   | false  | ERROR #944: Invalid expiration date ERROR #7204: Datatype value '-1' less than MINVAL allowed of 0 > ERROR #5802: Datatype validation failed on property 'Security.Users:ExpirationDate', with value equal to "-1" | false       | false         | false                |                                       |                                                        |111-111-1111      | Nextel                    |
##      | invalidFormatDate            | passwd                            | passwd                            | 1/1/2025   |                  |                   | false  | ERROR #944: Invalid expiration date ERROR #7204: Datatype value '-1' less than MINVAL allowed of 0 > ERROR #5802: Datatype validation failed on property 'Security.Users:ExpirationDate', with value equal to "-1" | false       | false         | false                |                                       |                                                        |111-111-1111      | T-Mobile                  |
##      | passwdOverMaxConfigLength    | 123456789012345678901234567890123 | 123456789012345678901234567890123 |            |                  |                   | false  | ERROR #845: Password does not match length or pattern requirements                                                                                                                                                 | false       | false         | false                |                                       |                                                        |111-111-1111      | AT&T Wireless             |
##      | passwdUnderMinConfigLength   | 12                                | 12                                |            |                  |                   | false  | ERROR #845: Password does not match length or pattern requirements                                                                                                                                                 | false       | false         | false                |                                       |                                                        |111-111-1111      | Alltel                    |
##      | routineNotInNamespace        | passwd                            | passwd                            |            | %SYS             | ^NoRoutine        | false  | There was a problem with the form. See the highlighted fields below.                                                                                                                                               | false       | false         | false                |                                       | Routine 'NoRoutine' does not exist in namespace '%SYS' |111-111-1111      | Sprint PCS                |
##      | routineWithNoNamespace       | passwd                            | passwd                            |            |                  | ^NoNamespace      | false  | There was a problem with the form. See the highlighted fields below.                                                                                                                                               | false       | false         | false                | Required if startup routine specified |                                                        |111-111-1111      | Cellular One              |
##
#  Scenario Outline: Create users - all fields <login>
#    When I create a user with the following options:
#      | login                      | <login>              |
#      | passwd                     | <passwd>             |
#      | passwdConfirm              | <passwdConfirm>      |
#      | fullName                   | <fullName>           |
#      | comment                    | <comment>            |
#      | chgPasswdNextLogin         | <chgPasswdNextLogin> |
#      | passwdNeverExpires         | <passwdNeverExpires> |
#      | userEnabled                | <userEnabled>        |
#      | expDate                    | <expDate>            |
#      | acctNeverExpires           | <acctNeverExpires>   |
#      | startupNamespace           | <startupNamespace>   |
#      | startupTagRoutine          | <startupTagRoutine>  |
#      | emailAddress               | <emailAddress>       |
#      | mobilePhoneServiceProvider | Verizon              |
#      | mobilePhoneNumber          | 111-111-1111         |
#    Then the Edit User page validation elements are confirmed
#      | responseText         | <responseText>         |
#      | nameHintRed          | <nameHintRed>          |
#      | passwdHintRed        | <passwdHintRed>        |
#      | passwdConfirmHintRed | <passwdConfirmHintRed> |
#    Then I confirm the user is listed on the Users page <exists>
#    Then I confirm the user exists in the database <exists>
#    And I validate the following subset of columns in the user row <exists>
#      | Name    | Full Name  | Namespace          | Enabled | Type          |
#      | <login> | <fullName> | <startupNamespace> | Yes     | Password user |
#    #Commenting out startupTagRoutine until code is in place to add one
#    Examples:
#      | login         | passwd | passwdConfirm | fullName   | comment | chgPasswdNextLogin | passwdNeverExpires | userEnabled | expDate    | acctNeverExpires | startupNamespace | startupTagRoutine | emailAddress      | mobilePhoneServiceProvider | mobilePhoneNumber | status | responseText | exists | nameHintRed | passwdHintRed | passwdConfirmHintRed |
# ##     | allFieldsUser | passwd | passwd        | All Fields | comment | true               | false              | true        | 2025-01-01 | false            | %SYS             | ^ZWELCOME         | newUser@gmail.com | Verizon                    | 111-111-1111      | true   | User saved.  | true   | false       | false         | false                |
# #     | allFieldsUser | passwd | passwd        | All Fields | comment | true               | false              | true        | 2025-01-01 | false            | %SYS             |                   | newUser@gmail.com | Verizon                    | 111-111-1111      | true   | User saved.  | true   | false       | false         | false                |
##
##  Scenario: Create a user with all fields at Maximum length
##    When I create a user with the following options:
##      | login             | allMaxLengthFieldsUser3456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123412345678901234567890123456789012                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
##      | passwd            | 12345678901234567890123456789012                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##      | passwdConfirm     | 12345678901234567890123456789012                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##      | fullName          | allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153 |
##      | comment           | allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153 |
##      | emailAddress      | 12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234561234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##      | mobilePhoneNumber | 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567812345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##      | mobilePhoneServiceProvider | Verizon |
##
##    Then the user response should contain User saved.
##    And I confirm the user is listed on the Users page true
##    Then I confirm the user exists in the database true
##
##
##  Scenario: Create a user with all fields over Maximum length
##    When I create a user with the following options:
##      | login             | allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901123456789012345678901234567890123                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
##      | passwd            | 123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##      | passwdConfirm     | 123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##      | fullName          | allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_1534 |
##      | comment           | allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser345678901allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_153661186554523456789012345678901234567890123456789012345678901234567890123456789012345678901_1536611865545allOverMaxLengthFieldsUser34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901_153661186554512345678901234567890123456789012345678901234567890123456789012345678901_1534 |
##      | emailAddress      | 123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345612345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##      | mobilePhoneNumber | 12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
##      | mobilePhoneServiceProvider | Verizon |
##    Then I confirm the user is listed on the Users page false
##    Then I confirm the user exists in the database false
##    And the user response should contain length longer than MAXLEN allowed of 160 > ERROR #5802: Datatype validation failed on property 'Security.Users:Name'
##    And the user response should contain length longer than MAXLEN allowed of 128 > ERROR #5802: Datatype validation failed on property 'Security.Users:PasswordExternal', with value equal to "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789"
##    And the user response should contain length longer than MAXLEN allowed of 2048 > ERROR #5802: Datatype validation failed on property 'Security.Users:FullName'
##    And the user response should contain length longer than MAXLEN allowed of 2048 > ERROR #5802: Datatype validation failed on property 'Security.Users:Comment'
##    And the user response should contain length longer than MAXLEN allowed of 512 > ERROR #5802: Datatype validation failed on property 'Security.Users:EmailAddress'
##    And the user response should contain length longer than MAXLEN allowed of 256 > ERROR #5802: Datatype validation failed on property 'Security.Users:PhoneNumber'
##
##
##  Scenario Outline: Edit user - all fields <login>
##    When I create a user with the following options:
##      | login                      | <login>                      |
##      | passwd                     | <passwd>                     |
##      | passwdConfirm              | <passwdConfirm>              |
##      | fullName                   | <fullName>                   |
##      | comment                    | <comment>                    |
##      | chgPasswdNextLogin         | <chgPasswdNextLogin>         |
##      | passwdNeverExpires         | <passwdNeverExpires>         |
##      | userEnabled                | <userEnabled>                |
##      | expDate                    | <expDate>                    |
##      | acctNeverExpires           | <acctNeverExpires>           |
##      | startupNamespace           | <startupNamespace>           |
##      | startupTagRoutine          | <startupTagRoutine>          |
##      | emailAddress               | <emailAddress>               |
##      | mobilePhoneServiceProvider | <mobilePhoneServiceProvider> |
##      | mobilePhoneNumber          | <mobilePhoneNumber>          |
##    And I confirm the user is listed on the Users page <exists>
##    Then I confirm the user exists in the database <exists>
##    When I edit the user with the following changes:
##      | passwd                     | editedPasswd         |
##      | passwdConfirm              | editedPasswd         |
##      | fullName                   | Edited Full Name     |
##      | comment                    | Edited Comment       |
##      | chgPasswdNextLogin         | false                |
##      | passwdNeverExpires         | true                 |
##      | userEnabled                | false                |
##      | expDate                    | 2026-01-01           |
##      | startupNamespace           | USER                 |
##      | startupTagRoutine          |                      |
##      | emailAddress               | editedUser@gmail.com |
##      | mobilePhoneServiceProvider | Nextel               |
##      | mobilePhoneNumber          | 222-222-2222         |
##    Then I confirm the user is listed on the Users page <exists>
##    Then I confirm the user exists in the database <exists>
##    And the Edit User page validation elements are confirmed
##      | responseText         | <responseText>         |
##      | nameHintRed          | <nameHintRed>          |
##      | passwdHintRed        | <passwdHintRed>        |
##      | passwdConfirmHintRed | <passwdConfirmHintRed> |
##
##    Examples:
##      | login            | passwd | passwdConfirm | fullName   | comment | chgPasswdNextLogin | passwdNeverExpires | userEnabled | expDate    | acctNeverExpires | startupNamespace | startupTagRoutine | emailAddress      | mobilePhoneServiceProvider | mobilePhoneNumber | exists | responseText | nameHintRed | passwdHintRed | passwdConfirmHintRed | exists | nameHintRed | passwdHintRed |
##      | editedFieldsUser | passwd | passwd        | All Fields | comment | true               | false              | true        | 2025-01-01 | false            | %SYS             |                   | newUser@gmail.com | Verizon                    | 111-111-1111      | true   | User saved.  | false       | false         | false                | true   |             |               |
##
##  Scenario Outline: Delete user <login>
##    When I create a user with the following options:
##      | login                      | <login>                      |
##      | passwd                     | <passwd>                     |
##      | passwdConfirm              | <passwdConfirm>              |
##      | fullName                   | <fullName>                   |
##      | comment                    | <comment>                    |
##      | chgPasswdNextLogin         | <chgPasswdNextLogin>         |
##      | passwdNeverExpires         | <passwdNeverExpires>         |
##      | userEnabled                | <userEnabled>                |
##      | expDate                    | <expDate>                    |
##      | acctNeverExpires           | <acctNeverExpires>           |
##      | startupNamespace           | <startupNamespace>           |
##      | startupTagRoutine          | <startupTagRoutine>          |
##      | emailAddress               | <emailAddress>               |
##      | mobilePhoneServiceProvider | <mobilePhoneServiceProvider> |
##      | mobilePhoneNumber          | <mobilePhoneNumber>          |
##    When I delete the user <confirm>
##    Then I confirm the user is listed on the Users page <exists>
##    And I confirm the user exists in the database <exists>
##
##    Examples:
##      | login               | passwd | passwdConfirm | fullName   | comment | chgPasswdNextLogin | passwdNeverExpires | userEnabled | expDate    | acctNeverExpires | startupNamespace | startupTagRoutine | emailAddress      | mobilePhoneServiceProvider | mobilePhoneNumber | confirm | exists |
##      | deletedUser         | passwd | passwd        | All Fields | comment | true               | false              | true        | 2025-01-01 | false            | %SYS             |                   | newUser@gmail.com | Verizon                    | 111-111-1111      | confirm | false  |
##      | deleteCancelledUser | passwd | passwd        | All Fields | comment | true               | false              | true        | 2025-01-01 | false            | %SYS             |                   | newUser@gmail.com | Verizon                    | 111-111-1111      | false   | exists |
##
##
##  Scenario Outline: Assign a role to a user via the UI <login>
##    When I create a user with the following options:
##      | login         | <login>         |
##      | passwd        | <passwd>        |
##      | passwdConfirm | <passwdConfirm> |
##      | role          | <role>          |
##      | grantOption   | <grantOption>   |
##      | mobilePhoneServiceProvider | Verizon                      |
##      | mobilePhoneNumber          | 111-111-1111                 |
##    Then I confirm the user exists in the database true
##    And I confirm via SQL that the role has been assigned to the user true
##
##    Examples:
##      | login               | passwd | passwdConfirm | role | grantOption |
##      | userAccess%All      | passwd | passwd        | %All | false       |
##      | userAccessRolesAll  | passwd | passwd        | All  |             |
##      | userWithGrantOption | passwd | passwd        | %All | true        |
##
##  Scenario Outline: Create user with a role via the UI, then remove role <login>
##    When I create a user with the following options:
##      | login               | <login>               |
##      | passwd              | <passwd>              |
##      | passwdConfirm       | <passwdConfirm>       |
##      | role                | <role>                |
##      | grantOption         | <grantOption>         |
##      | assigned            | <assigned>            |
##      | assignedAfterRemove | <assignedAfterRemove> |
##      | mobilePhoneServiceProvider | Verizon                      |
##      | mobilePhoneNumber          | 111-111-1111                 |
##    Then I confirm the user exists in the database true
##    And I confirm via SQL that the role has been assigned to the user <assigned>
##    When I remove the role <role> from the user
##    And I confirm via SQL that the role has been assigned to the user <assignedAfterRemove>
##
##    Examples:
##      | login                     | passwd | passwdConfirm | role         | grantOption | assigned | assignedAfterRemove |
##      | userAccess%AllRemove      | passwd | passwd        | %All         | false       | true     | false               |
##      | userAccessDbDefault       | passwd | passwd        | %DB_%DEFAULT |             | true     | false               |
##      | userWithGrantOptionRemove | passwd | passwd        | %All         | true        | true     | false               |
##
##  Scenario Outline: Edit a user to assign a role via the UI and then remove role <login>
##    When I create a user with the following options:
##      | login               | <login>               |
##      | passwd              | <passwd>              |
##      | passwdConfirm       | <passwdConfirm>       |
##      | grantOption         | <grantOption>         |
##      | assigned            | <assigned>            |
##      | assignedAfterRemove | <assignedAfterRemove> |
##      | mobilePhoneServiceProvider | Verizon                      |
##      | mobilePhoneNumber          | 111-111-1111                 |
##    Then I confirm the user exists in the database true
##    When I assign the role <role> to the user
##    And I add grant option to the role <role>
##    And I confirm via SQL that the new role <role> has been assigned to the user <assigned>
##    When I remove the role <role> from the user
##    And I confirm via SQL that the new role <role> has been assigned to the user <assignedAfterRemove>
##
##    Examples:
##      | login                   | passwd | passwdConfirm | role         | grantOption | assigned | assignedAfterRemove |
##      | userAccess%AllEdit      | passwd | passwd        | %All         | false       | true     | false               |
##      | userAccessRolesAllEdit  | passwd | passwd        | %DB_%DEFAULT |             | true     | false               |
##      | userWithGrantOptionEdit | passwd | passwd        | %All         | true        | true     | false               |
##
##   Scenario Outline: Edit a user to assign an SQL Privilege via the UI and then remove the SQL Privilege <login>
##    When I create a user with the following options:
##      | login               | <login>               |
##      | passwd              | <passwd>              |
##      | passwdConfirm       | <passwdConfirm>       |
##      | grantOption         | <grantOption>         |
##      | assigned            | <assigned>            |
##      | assignedAfterRemove | <assignedAfterRemove> |
##      | mobilePhoneServiceProvider | Verizon                      |
##      | mobilePhoneNumber          | 111-111-1111                 |
##    Then I confirm the user exists in the database true
##    When I assign the SQL privilege <privilege> to the user
##    And I add grant option to the SQL privilege <privilege>
###    And I confirm via SQL that the new privilege <privilege> has been assigned to the user <assigned>
##    When I remove the privilege <privilege> from the user
###    And I confirm via SQL that the new privilege <privilege> has been assigned to the user <assignedAfterRemove>
##
##    Examples:
##      | login               | passwd | passwdConfirm | privilege         | grantOption | assigned | assignedAfterRemove |
##      | userCreateFunction  | passwd | passwd        | %CREATE_FUNCTION  | false       | true     | false               |
##      | userDropFunction    | passwd | passwd        | %DROP_FUNCTION    |             | true     | false               |
##      | userCreateMethod    | passwd | passwd        | %CREATE_METHOD    | true        | true     | false               |
##
##   Scenario Outline: Edit a user to assign multiple SQL Privileges via the UI <login>
##    When I create a user with the following options:
##      | login               | <login>               |
##      | passwd              | <passwd>              |
##      | passwdConfirm       | <passwdConfirm>       |
##      | assigned            | <assigned>            |
##      | mobilePhoneServiceProvider | Verizon                      |
##      | mobilePhoneNumber          | 111-111-1111                 |
##    Then I confirm the user exists in the database true
##    When I assign the following SQL privileges to the user:
##     |SQLPrivilege  | grantOption|
##     | %DROP_FUNCTION  | true    |
##     | %DROP_PROCEDURE | false   |
##     | %ALTER_TABLE    | true    |
##
##    Examples:
##      | login                   | passwd | passwdConfirm |   assigned |
##      | userMultiSQLPrivileges  | passwd | passwd        |   true     |
##
##        Scenario Outline: Edit a user to assign all SQL Tables via the UI  <login>
##    When I create a user with the following options:
##      | login               | <login>               |
##      | passwd              | <passwd>              |
##      | passwdConfirm       | <passwdConfirm>       |
##      | assigned            | <assigned>            |
##      | assignedAfterRemove | <assignedAfterRemove> |
##      | mobilePhoneServiceProvider | Verizon                      |
##      | mobilePhoneNumber          | 111-111-1111                 |
##    Then I confirm the user exists in the database true
##    When I assign the SQL table privilege <table> in schema <schema> to the user
##    And I edit the SQL table privilege <table> to add the following permissions:
##     | permissions          | select,update                 |
##     | grantOptions         | update,insert,delete          |
###    And I confirm via SQL that the new privilege <privilege> has been assigned to the user <assigned>
##
##    Examples:
##      | login                | passwd | passwdConfirm | table              | schema                 | assigned |
##      | userAllTables        | passwd | passwd        | All                |  %SYS                  | true     |
##
##   Scenario Outline: Edit a user to assign an SQL Table via the UI and then revoke the SQL Table privilege <login>
##    When I create a user with the following options:
##      | login               | <login>               |
##      | passwd              | <passwd>              |
##      | passwdConfirm       | <passwdConfirm>       |
##      | assigned            | <assigned>            |
##      | assignedAfterRemove | <assignedAfterRemove> |
##      | mobilePhoneServiceProvider | Verizon                      |
##      | mobilePhoneNumber          | 111-111-1111                 |
##    Then I confirm the user exists in the database true
##    When I assign the SQL table privilege <table> in schema <schema> to the user
##    And I edit the SQL table privilege <table> to add the following permissions:
##     | permissions          | select,update                 |
##     | grantOptions         | update,insert,delete          |
###    And I confirm via SQL that the new privilege <privilege> has been assigned to the user <assigned>
##    When I revoke the SQL table privilege <table> from the user
###    And I confirm via SQL that the new privilege <privilege> has been assigned to the user <assignedAfterRemove>
##
##    Examples:
##      | login               | passwd | passwdConfirm | table             | schema                | assigned | assignedAfterRemove |
##      | userTableDefinition  | passwd | passwd        | Definition       | %DeepSee_Dashboard    | true     | false               |
##      | userCreateMethod    | passwd | passwd        | %CREATE_METHOD    | true        | true     | false
##
##   Scenario Outline: Edit a user to assign multiple SQL Tables and table permissions via the UI <login>
##    When I create a user with the following options:
##      | login               | <login>               |
##      | passwd              | <passwd>              |
##      | passwdConfirm       | <passwdConfirm>       |
##      | assigned            | <assigned>            |
##      | assignedAfterRemove | <assignedAfterRemove> |
##      | mobilePhoneServiceProvider | Verizon                      |
##      | mobilePhoneNumber          | 111-111-1111                 |
##    Then I confirm the user exists in the database true
##    When I assign the following SQL table privileges to the user:
##      | schema               | %Monitor                                       |
##      | tables               | Alert, AlertLog, Application, Item, ItemGroup  |
##      | permissions          | update, delete, references                     |
##      | grantOptions         | insert, select                                 |
##    And I edit the SQL table privilege <table> to add the following permissions:
##     | permissions          | select,update                 |
##     | grantOptions         | update,insert,delete          |
###    And I confirm via SQL that the new privilege <privilege> has been assigned to the user <assigned>
##    When I revoke the SQL table privilege <table> from the user
###    And I confirm via SQL that the new privilege <privilege> has been assigned to the user <assignedAfterRemove>
##
##    Examples:
##      | login               | passwd | passwdConfirm | table        | assigned | assignedAfterRemove |
##      | userMultiTables     | passwd | passwd        | AlertLog     | true     | false               |
##
#
