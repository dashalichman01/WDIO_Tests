import type { Options } from '@wdio/types'
export const config: Options.Testrunner = {
  
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    
    specs: [
        './test/specs/**/*.ts'
    ],
   
    maxInstances: 10,

    capabilities: [{
        browserName: 'chrome'
    }],

    logLevel: 'info',

    bail: 0,

    baseUrl: process.env.BASE_URL,
    
    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    before: function () {
        browser.setWindowSize(1920, 1080);
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
}
