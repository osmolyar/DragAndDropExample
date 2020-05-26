/// <reference types="chai" />

interface Context {
    page: any
    chart: any
    stackP: any[];
    [key: string]: any
}

declare const context: Context

declare module NodeJS {
    interface Global {
        expect: Chai.ExpectStatic
        assert: Chai.AssertStatic
        should: Chai.Should
        context: any
    }
}

declare const expect: Chai.ExpectStatic
declare const assert: Chai.AssertStatic
declare const should: Chai.Should

// for data sets
declare module WebdriverIO {
    interface Browser {
        dataLoadChecked: { [namespace: string]: { [dataset: string]: boolean } }
    }
}

declare module "@babel/register"
