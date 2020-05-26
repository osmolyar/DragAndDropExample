import CustomReporter from "../utilities/reporter"
import { registerCustomCommands } from "../commands/customCommands"
import { registerDeprecatedCommands } from "../commands/deprecatedBrowser"
import chai from "chai"

const debug = process.env.DEBUG
const defaultTimeoutInterval = 10000
let context = {}

export const config = {
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the
    // directory from which `wdio` was called. Notice that, if you are calling
    // `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script)
    // then the current working directory is where your package.json resides, so
    // `wdio` will be called from there.
    //
    // host: "localhost",
    // port: 4444,
    specs: [
        // './features/*.feature',   //this doesn't seem to work either - picks one feature file at random to run
        //     './features/**/*.feature',   //this should work but it doesn't
        //Can also specify each feature file individually here and run all
        // "./features/UserManagement.feature",
        // "./features/Login.feature",
    ],
    //Specify suite to run as 'wdio common/config/wdio.local.config.js --suite users'
    suites: {
        login: ["./features/Login.feature"],
    },
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: "info",
    coloredLogs: true,
    screenshotPath: "./errorShots/",
    baseUrl: "http://redhatlinux1.iscinternal.com:52773",
    //need to comment this out if maxInstances>1:
    //execArgv: ['--inspect'],
    waitforTimeout: debug ? 24 * 60 * 60 * 1000 : defaultTimeoutInterval,

    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities
    // at the same time. Depending on the number of capabilities, WebdriverIO
    // launches several test sessions. Within your capabilities you can
    // overwrite the spec and exclude options in order to group specific specs
    // to a specific capability.
    //
    // First, you can define how many instances should be started at the same
    // time. Let's say you have 3 different capabilities (Chrome, Firefox, and
    // Safari) and you have set maxInstances to 1; wdio will spawn 3 processes.
    // Therefore, if you have 10 spec files and you set maxInstances to 10, all
    // spec files will get tested at the same time and 30 processes will get
    // spawned. The property handles how many capabilities from the same test
    // should run tests.
    //
    maxInstances: 1,
    //
    // If you have trouble getting all important capabilities together, check
    // out the Sauce Labs platform configurator - a great tool to configure your
    // capabilities: https://docs.saucelabs.com/reference/platforms-configurator

    // Override Capabilities with local wdio config file. e.g. testConfig/wdio.local.config.js to add capabilities
    capabilities: [
        // {
        //     // maxInstances can get overwritten per capability. So if you have an
        //     // in-house Selenium grid with only 5 firefox instance available you can
        //     // make sure that not more than 5 instance gets started at a time.
        //     maxInstances: 5,
        //    { browserName: 'firefox', marionette: true },
        // { browserName: 'chrome', chromeOptions: {
        //     prefs: {'credentials_enable_service': false, 'profile': {'password_manager_enabled': false}},
        //     args: ['--start-maximized', '--disable-cache', '--disable-application-cache',
        //         '--disable-offline-load-stale-cache', '--disk-cache-size=0',
        //         '--v8-cache-options=off', '--disable-infobars']
        // },
        // { browserName: 'internet explorer', "version" : '10',
        // { browserName: 'internet explorer', "version" : '11',
    ],

    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async
    // way e.g. using promises you can set the sync option to false.
    sync: true,

    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,

    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object
    // should have the plugin name as key and the desired plugin options as
    // properties. Make sure you have the plugin installed before running any
    // tests. The following plugins are currently available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },

    framework: "cucumber",

    reporters: [
        "spec",
        [
            "junit",
            {
                outputDir: "testResults",
            },
        ],
        [
            "allure",
            {
                outputDir: "allure-results",
                useCucumberStepReporter: true,
                disableWebdriverStepsReporting: true,
            },
        ],
        [
            CustomReporter,
            {
                verbose: true, // true|false - set to true for verbose logging
                deviceName: "Local test environment", // Meta data for multiple-cucumber-html-reporter
                outputDir: "testResults",
            },
        ],
    ],

    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test
    // process in order to enhance it and to build services around it. You can
    // either apply a single function or an array of methods to it. If one of
    // them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed once before all workers get launched.
    // onPrepare: function onPrepare(config, capabilities) {
    // },
    //
    // Gets executed before test execution begins. At this point you can access
    // all global variables, such as `browser`. It is the perfect place to
    // define custom commands.
    before: () => {
        /**
         * Setup the Chai assertion framework
         */
        global.expect = chai.expect
        global.assert = chai.assert
        global.should = chai.should()
        chai.config.truncateThreshold = 0

        // set up global context
        global.context = context

        // register commands to "browser" object
        registerCustomCommands()
        registerDeprecatedCommands()
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
    beforeScenario() {
        console.log("In beforeScenario")
    },

    afterScenario: () => {
        console.log("In afterScenario")
    },

    //
    // Hook that gets executed before the suite starts
    // beforeSuite: function beforeSuite(suite) {
    // },
    //
    // Hook that gets executed _before_ a hook within the suite starts (e.g.
    // runs before calling beforeEach in Mocha)
    // beforeHook: function beforeHook() {
    // },
    //
    // Hook that gets executed _after_ a hook within the suite starts (e.g. runs
    // after calling afterEach in Mocha)
    // afterHook: function afterHook() {
    // },
    //
    // Function to be executed before a test (in Mocha/Jasmine) or a step (in
    // Cucumber) starts.
    // beforeTest: function beforeTest(test) {
    // },
    //
    // Runs before a WebdriverIO command gets executed.
    // beforeCommand: function beforeCommand(commandName, args) {
    // },
    //
    // Runs after a WebdriverIO command gets executed
    // afterCommand: function afterCommand(commandName, args, result, error) {
    // },
    //
    // Function to be executed after a test (in Mocha/Jasmine) or a step (in
    // Cucumber) starts.
    // afterTest: function afterTest(test) {
    // },
    //
    // Hook that gets executed after the suite has ended
    // afterSuite: function afterSuite(suite) {
    // },
    //
    // Gets executed after all tests are done. You still have access to all
    // global variables from the test.
    // after: function after(result, capabilities, specs) {
    // },
    //
    // Gets executed after all workers got shut down and the process is about to
    // exit. It is not possible to defer the end of the process using a promise.
    // onComplete: function onComplete(exitCode) {
    // }
}
