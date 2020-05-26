/*  This is an example of overriding parts of wdio.config
    Make your OWN COPY, in your own name, and in that copy override as much or as little as you need.
    Then, when invoking wdio, pass in this config file, like so:
       wdio common/config/local.wdio.config.js
*/
import BusinessOptions  from'../businessOptions/managementPortalBusinessOptions';
import AnalyticsBusinessOptions  from'../businessOptions/analyticsBusinessOptions';
import SystemExplorerBusinessOptions  from'../businessOptions/systemExplorerBusinessOptions';
import SessionUtilities from '../utilities/sessionUtilities';
const debug = process.env.DEBUG;
const merge = require('deepmerge');
const wdioConf = require('../common/config/wdio.config');
const baseUrl='http://redhatlinux1.iscinternal.com:52773';
const host  = baseUrl.match("//(.*).iscinternal")[1];
const port = baseUrl.slice(-5);

// const seleniumOptions={
//     drivers: {
//         chrome:{
//             version: "81.0.4044.69"
//         }}
// };
console.log("host is "+host);
// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
   // execArgv: ['--inspect'],
    // First, you can define how many instances should be started at the same
    // time. Let's say you have 3 different capabilities (Chrome, Firefox, and
    // Safari) and you have set maxInstances to 1; wdio will spawn 3 processes.
    // Therefore, if you have 10 spec files and you set maxInstances to 10, all
    // spec files will get tested at the same time and 30 processes will get
    // spawned. The property handles how many capabilities from the same test
    // should run tests.
    //
    // seleniumInstallArgs: seleniumOptions,
    // seleniumArgs: {
    //     ...seleniumOptions,
    //     javaArgs: [
    //         '-Dwebdriver.edge.driver=C:\\Windows\\System32\\MicrosoftWebDriver.exe'
    //     ]
    // },
    services: [
        ['selenium-standalone', {
            logPath: 'logs',
            installArgs: {
                drivers: {
                    chrome: { version: '81.0.4044.69' },
                    firefox: { version: '0.26.0' },
                    // edge: {version: '81.0.409.0'},
                    ie: {
                        version: "3.5.1",
                        // arch: "ia32", // forces use of 32 bit driver
                        arch: process.arch,
                        baseURL: "https://selenium-release.storage.googleapis.com"
                    },
                }
            },
            args: {
                drivers: {
                    chrome: { version: '81.0.4044.69' },
                    firefox: { version: '0.26.0' },
                    edge: {version: '81.0.409.0'},
                    ie: {
                        version: "3.5.1",
                        // arch: "ia32", // forces use of 32 bit driver
                        arch: process.arch,
                        baseURL: "https://selenium-release.storage.googleapis.com"
                    },
                }
            },
        }]
    ],
    // services: [["selenium-standalone"]],
    maxInstances: 6,
    capabilities: [
         { browserName: 'firefox'},
        // { browserName: 'MicrosoftEdge',maxInstances: 5},
        // { browserName: 'chrome',
        //     "goog:chromeOptions": {
        //     prefs: {'credentials_enable_service': false, 'profile': {'password_manager_enabled': false}, 'w3c': true},
        //     args: ['--start-maximized', '--disable-cache', '--disable-application-cache',
        //         '--disable-offline-load-stale-cache', '--disk-cache-size=0',
        //         '--v8-cache-options=off', '--disable-infobars']
        //     },
        // },
        // { browserName: 'internet explorer', "browserVersion" : '10',
       //  { browserName: 'internet explorer', "browserVersion" : '11',
       // maxInstances: 5},
    ],
    specs: [
        // './features/*.feature',   //this doesn't seem to work either - picks one feature file at random to run
             './features/**/*.feature',   //this should work but it doesn't
        //Can also specify each feature file individually here and run all
        //'./features/SystemAdministration/Security/UserManagement.feature',
        //'./features/Login.feature'
    ],
    //Specify suite to run as 'wdio common/config/wdio.local.config.js --suite users'
        suites: {
            test: [
                './features/Test.feature',
            ],
            google: [
                './features/GoogleSearch.feature',
            ],
            dragAndDrop: [
                './features/DragAndDrop.feature',
            ]
        },

    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //reporters: ['junit','spec','dot'],
    reporterOptions: {
        outputDir: 'testResults'
    },
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'error',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: baseUrl,
    httpOptions : {
        host: host,
        path: '/api/cucumber/execute',
        //since we are listening on a custom port, we need to specify it by hand
        port: port,
        //This is what changes the request to a POST request
        method: 'POST'
    },
    cucumberOpts: {
        scenarioLevelReporter: true,  //treat scenarios as tests instead of steps
        retry: 2,
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> filetype:compiler used for processing required features
        compiler: [
            'js:@babel/register',
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
    afterStep: function (uri, feature, scenario, stepData,context) {
        console.log("In afterStep");
        if (scenario.passed === false) {
            let date = new Date(Date.now());
            console.log('Error screenshot saved as ./errorShots/ERROR_' + browser.capabilities.browserName + '_'+ date.getMonth() +'-'+date.getDay() +'-'+date.getFullYear()+'T'+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()+ '.png');
            const path = './errorShots/ERROR_' + browser.capabilities.browserName + '_'+ date.getMonth() +'-'+date.getDay() +'-'+date.getFullYear()+'T'+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()+ '.png';
            browser.saveScreenshot(path);
        }
    },
    beforeScenario: function () {
        BusinessOptions.initializeContext();
        AnalyticsBusinessOptions.initializeContext();
        SystemExplorerBusinessOptions.initializeContext();
        console.log("In beforeScenario");
    },
    afterScenario: function (uri) {
        console.log("In afterScenario");
        SessionUtilities.logOutOrReload();
    },

}, { clone: false });

export default exports

// add an additional reporter
//exports.config.reporters.push('allure');

