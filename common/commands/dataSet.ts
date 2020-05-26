import URL from "url"
import _ from "lodash"
// import request from 'sync-request'
function getNamespaceFromBaseURL() {
    let URL = require("url")
    return URL.parse(browser.options.baseUrl)
        .pathname.replace("/csp/healthshare/", "")
        .split("/")[0]
}
export function loadDataset(dataset, maxMinutes = 5, doCheck = true, maxMinutesCheck = maxMinutes) {
    var request = require("sync-request")
    var success
    var loadResponse
    // dataset text may have modifiers (separated by hyphens)
    // Strip them off, before sending in dataset name.
    // Supported modifiers:
    //  "-modify" will do a final kill after the scenario, because data was modified within the test
    //  "-add" suppresses the initial kill before the dataload
    let initialKillFlag = ""
    let datasetParts = dataset.toLowerCase().split("-")
    dataset = datasetParts.shift()
    if (datasetParts.includes("modify")) {
        console.log(
            "Note - '" + datasetParts.join("-") + "' indicates that the dataset will be unloaded at end of test."
        )
    }
    if (datasetParts.includes("add")) {
        console.log(
            "Note - '" + datasetParts.join("-") + "' indicates that the dataset should be ADDED to existing data."
        )
        initialKillFlag = "/0"
    }
    let namespace = getNamespaceFromBaseURL()
    var loadUrl = URL.resolve(
        browser.options.baseUrl,
        "/api/cucumber/" + namespace + "/dataset/load/" + dataset + initialKillFlag
    )
    console.log("Calling dataload endpoint " + loadUrl)
    success = browser.waitUntil(
        function() {
            //return request('GET', loadUrl).headers.result === '1';
            loadResponse = request("GET", loadUrl)
            console.log("Load API returned: " + loadResponse.getBody("utf8"))
            return loadResponse.headers.result === "1"
        },
        maxMinutes * 60 * 1000, // timeout
        "Waited full " + maxMinutes + " minutes for initial dataload to start",
        15 * 1000 /// polling interval
    )
    if (success) {
        if (doCheck) {
            success = waitForDataset(dataset, maxMinutesCheck)
        }
    } else {
        console.log("Data load failed to start!" + dataset)
    }
    return success
}
export function waitForDataset(dataset, maxMinutes = 5) {
    var URL = require("url")
    var request = require("sync-request")
    var checkResponse
    dataset = dataset.toLowerCase().split("-")[0] // drop any modifiers
    let namespace = getNamespaceFromBaseURL()
    var alreadyChecked = _.get(browser, "dataLoadChecked." + namespace + "." + dataset, null)
    if (alreadyChecked === null) {
        _.set(browser, "dataLoadChecked." + namespace + "." + dataset, false)
        var checkUrl = URL.resolve(browser.options.baseUrl, "/api/cucumber/" + namespace + "/dataset/check/" + dataset)
        console.log("Calling data check endpoint " + checkUrl)
        browser.waitUntil(
            function() {
                //return request('GET', checkUrl).headers.result === '1';
                checkResponse = request("GET", checkUrl)
                console.log("Check API returned: " + checkResponse.getBody("utf8"))
                return checkResponse.headers.result === "1"
            },
            maxMinutes * 60 * 1000, // timeout
            "Waited full " + maxMinutes + " minutes for " + dataset + " dataload to finish",
            15 * 1000 /// polling interval
        )
        // we only get to this point if waitUntil didn't time out
        _.set(browser, "dataLoadChecked." + namespace + "." + dataset, true)
        alreadyChecked = browser.dataLoadChecked[namespace][dataset]
    } else {
        console.log(
            "Already checked for '" + dataset + "' dataset in namespace '" + namespace + "':  " + alreadyChecked
        )
    }
    return alreadyChecked
}