/*  This is an example of overriding parts of wdio.config
    Make your OWN COPY, in your own name, and in that copy override as much or as little as you need.
    Then, when invoking wdio, pass in this config file, like so:
       wdio common/config/local.wdio.config.js
*/

var businessOptions          = require( '../businessOptions/managementPortalBusinessOptions' );
var debug = process.env.DEBUG;
var merge = require('deepmerge');
var wdioConf = require('../common/config/wdio.config.js');
var baseUrl='http://redhatlinux1.iscinternal.com:52773';
var host  = baseUrl.match("//(.*).iscinternal")[1];
var port = baseUrl.slice(-5);

console.log("host is "+host);
// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
    capabilities: [
         //  { browserName: 'firefox', marionette: true },
        { browserName: 'chrome', 'goog:chromeOptions': {
            prefs: {'credentials_enable_service': false, 'profile': {'password_manager_enabled': false}},
            args: ['--no-sandbox','--start-maximized', '--disable-cache', '--disable-application-cache',
                '--disable-offline-load-stale-cache', '--disk-cache-size=0',
                '--v8-cache-options=off', '--disable-infobars']
        },
            jenkinsJobName: process.env.JOB_NAME,
            jenkinsBuildNumber: process.env.BUILD_NUMBER,
            jenkinsBuildUrl: process.env.BUILD_URL,
            jenkinsJobUrl: process.env.JOB_URL,
            jenkinsUrl: process.env.JENKINS_URL,
            linkToAllureReport: process.env.BUILD_URL+'/allure'},
        // { browserName: 'internet explorer', "version" : '10',
        //     jenkinsJobName: process.env.JOB_NAME,
        //     jenkinsBuildNumber: process.env.BUILD_NUMBER,
        //     jenkinsBuildUrl: process.env.BUILD_URL,
        //     jenkinsJobUrl: process.env.JOB_URL,
        //     jenkinsUrl: process.env.JENKINS_URL,
        //     linkToAllureReport: process.env.BUILD_URL+'/allure'},
        // { browserName: 'internet explorer', "version" : '11',
        //     jenkinsJobName: process.env.JOB_NAME,
        //     jenkinsBuildNumber: process.env.BUILD_NUMBER,
        //     jenkinsBuildUrl: process.env.BUILD_URL,
        //     jenkinsJobUrl: process.env.JOB_URL,
        //     jenkinsUrl: process.env.JENKINS_URL,
        //     linkToAllureReport: process.env.BUILD_URL+'/allure'},
    ],
    specs: [
        // './features/*.feature',   //this doesn't seem to work either - picks one feature file at random to run
             './features/**/*.feature',   //this should work but it doesn't
        //Can also specify each feature file individually here and run all
        //'./features/SystemAdministration/Security/UserManagement.feature',
        //'./features/Login.feature'
    ],
    //Specify suite to run as 'wdio common/config/wdio.local.config.ts --suite users'
        suites: {
            login: [
                './features/Login.feature',
            ],
            generic: [
                './features/GenericTests.feature',
            ],
            users: [
                './features/SystemAdministration/Security/UserManagement.feature',
            ],
            roles: [
                './features/SystemAdministration/Security/RoleManagement.feature',
            ],
            resources: [
                './features/SystemAdministration/Security/ResourceManagement.feature',
            ],
            license: [
                './features/SystemAdministration/Security/LicenseKey.feature',
            ],
            localdb: [
                './features/SystemAdministration/Configuration/ZZZSystemConfiguration/LocalDatabases.feature',
            ],
            access: [
                './features/SystemAdministration/Security/AccessControl.feature',
            ],
            interopaccess: [
                './features/SystemAdministration/Security/InteroperabilityAccessControl.feature',
            ],
            namespace: [
                './features/SystemAdministration/Configuration/ZZZSystemConfiguration/Namespaces.feature',
            ],
            webapps: [
                './features/SystemAdministration/Security/WebApplications.feature',
            ],
            authentication: [
                './features/SystemAdministration/Security/SystemSecurity/AuthenticationWebSessionOptions.feature',
            ],
            systemsec: [
                './features/SystemAdministration/Security/SystemSecurity/SystemWideSecurityParameters.feature',
            ],
            test: [
                './features/Test.feature',
            ]
        },

    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
       // './features/SystemAdministration/Security/AccessControl.feature'
    ],
    //reporters: ['junit','spec','dot'],
    reporterOptions: {
        outputDir: 'testResults'
    },
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'verbose',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: baseUrl,
    httpOptions : {
        host: host,
        path: '/api/cucumber/execute',
        //since we are listening on a custom port, we need to specify it by hand
        port: port,
        //This is what changes the request to a POST request
        method: 'POST',
        gzip: true,
    },
    cucumberOpts: {
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> filetype:compiler used for processing required features
        compiler: [
            'js:babel-register',
        ],
        // <boolean< Treat ambiguous definitions as errors
        failAmbiguousDefinitions: true,
        // <boolean> invoke formatters without executing steps
        // dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> Enable this config to treat undefined definitions as
        // warnings
        ignoreUndefinedDefinitions: false,
        // <string[]> ("extension:module") require files with the given
        // EXTENSION after requiring MODULE (repeatable)
        name: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        // <string[]> (file/dir) require files before executing features
        require: [
            // steps
            './features/step_definitions/*',
            // './features/step_definitions/Users.steps',
            // './features/step_definitions/LicenseKey.steps',
            // './features/step_definitions/Generic.steps'
        ],
        // <string> specify a custom snippet syntax
        snippetSyntax: undefined,
        // <boolean> fail if there are any undefined or pending steps
        strict: true,
        // <string> (expression) only execute the features or scenarios with
        // tags matching the expression, see
        // https://docs.cucumber.io/tag-expressions/
        tags: 'not @Pending',
        // <boolean> add cucumber tags to feature or scenario name
        tagsInTitle: false,
        // <number> timeout for step definitions
        timeout: 2000000,
    },
    beforeScenario: function () {
        businessOptions.initializeContext();
        console.log("In beforeScenario");
    },

}, { clone: false });

// add an additional reporter
//exports.config.reporters.push('allure');

