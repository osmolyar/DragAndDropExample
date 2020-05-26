'use strict';
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class {EventEmitter}
 */
import WDIOReporter from '@wdio/reporter'
import EventEmitter from 'events';
import fs  from 'fs';
import path  from 'path';
import _os  from 'os';
const _os2 = _interopRequireDefault(_os);

class CucumberJSONReporter extends WDIOReporter {

    report: object;
    runnerData: object;
    options: object;
    unsynced: Array<any>;
    reportIdentifier;

    constructor(options) {
        options = Object.assign(options, { stdout: true });
        super(options);
        this.runnerData={};
        this.options = options;
        this.reportIdentifier = new Date().getTime();
        this.unsynced = [];
        this.report = {};
        this.report.features=[];
    }

    /**
     * This hook is used to retrieve the browser data, but this is done only once
     *
     * @param {object} runnerData
     */
    onRunnerStart(runnerData) {
        this.runnerData=runnerData;
    }

    onSuiteStart (test) {
        if (test.type=="scenario") {
            let featureIndex = this.report.features.findIndex(function (feature) {
                return feature.cid   === test.cid;
            });
            let scenarioData = {
                id: test.uid,
                name: test.title,
                cid: test.cid,
                steps: [],
            };
            this.report.features[featureIndex].testsRun++;
            this.report.features[featureIndex].scenarios.push(scenarioData);
        } else {
            const capabilities = this.runnerData.sanitizedCapabilities;
            const jobName = process.env.JOB_NAME;
            const buildNumber = process.env.BUILD_NUMBER;
            const buildUrl = process.env.BUILD_URL;
            const jobUrl = process.env.JOB_URL;
            const linkToAllureReport = process.env.BUILD_URL+'allure';
            //flatten tags
            let tags = [];
            for (let i = 0; i < test.tags.length; i++) {
                if (!(tags.indexOf(test.tags[i].name) > -1)) {
                    tags.push(test.tags[i].name);
                }
            }
            tags = tags.join();
            let featureName = test.title.slice(0, -8);
            let platform = this.getPlatformId() + ' ' + _os2.default.type() + ' ' + _os2.default.release();
            this.report.features.push({
                source: "Selenium",
                name: featureName,
                id: test.uid,
                cid: test.cid,
                tags: tags,
                feature: featureName,
                browser: capabilities,
                browserPlatform: platform,
                jenkinsJobName: jobName,
                jenkinsBuildNumber: buildNumber,
                jenkinsBuildUrl: buildUrl,
                jenkinsJobUrl: jobUrl,
                linkToAllureReport: linkToAllureReport,
                testcases: [],
                scenarios: [],
                result: 1,
                testsRun: 0,
                testsPassed: 0,
                testsFailed: 0,
            });
        }
    };

    onTestFail(test) {
        let featureIndex = this.report.features.findIndex(function (feature) {
            return feature.cid === test.cid;
        });
        //current scenario is the last one in the feature
        let scenarioIndex=this.report.features[featureIndex].scenarios.length-1;
        let scenario = this.report.features[featureIndex].scenarios[scenarioIndex];
        let stepData = {
            scenarioName: scenario.name,
            step:  test.title,
            result: 'failed',
        };
        if (test.errors[0].stack) {
            stepData.error_message = test.errors[0].stack;
        } else {
            stepData.error_message = test.errors[0].message;
        }
        this.report.features[featureIndex].result = 0;
        this.report.features[featureIndex].testsFailed++;
        this.report.features[featureIndex].testcases.push(stepData);
    };

    /**
     * Clean up features and scenarios
     */
    onSuiteEnd(suite) {
        // Feature
        if (suite.type === "feature") {
            this.deleteIdAndScenarios({
                cid: suite.cid,
            });
        }
    };

    /**
     * Once all tests completed, generate JSON report
     */
    onRunnerEnd () {
        if (!this?.options || typeof this.options.outputDir !== 'string') {
            console.log('Cannot write json report: empty or invalid "outputDir".');
            return;
        }
        try {
            let dir = path.resolve(this.options.outputDir);
            let filename = (this.reportIdentifier === 0 ? 'report' : 'report_' + this.reportIdentifier) + '.json';
            let filepath = path.join(dir, filename);
            fs.writeFileSync(filepath, JSON.stringify(this.report.features));
            console.log("this.options is "+JSON.stringify(this.options));
            if (this.options.CustomReporter?.verbose === true) {
                console.log('Wrote json report \'' + filename + '\' to [' + this.options.outputDir + '].');
            }
        } catch (e) {
            console.log('Failed to write json report to [' + this.options.outputDir + ']. Error: ' + e);
        }
    };

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this?.unsynced.length === 0
    }

    deleteIdAndScenarios(options) {
        this.report.features.forEach(function (feature) {
            delete feature.id;
            delete feature.scenarios;
            feature.testsPassed = feature.testsRun - feature.testsFailed;
        });
    };

    /**
     * Grabs meta data about the OS for the report output
     */
    getPlatformId() {
        switch (process.platform) {
            case 'darwin':
                return 'osx';
            case 'win32':
                return 'windows';
            default:
                return 'linux';
        }
    }
}

CucumberJSONReporter.reporterName = 'custom-json-reporter';

export default CucumberJSONReporter;