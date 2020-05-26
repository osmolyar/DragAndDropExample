module.exports= {
    baseURL: 'https://selenium-release.storage.googleapis.com',
    version: '3.141.5',
    ignoreExtraDrivers: true,
    drivers: {
        chrome: {
            version: '81.0.4044.69',
            // arch: process.arch,
            // - Recent versions of the driver: https://sites.google.com/a/chromium.org/chromedriver/
            baseURL: 'https://chromedriver.storage.googleapis.com'
        },
        ie: {
            version: '3.150.0',
            arch: 'x64',
            // - Recent versions of the driver: http://selenium-release.storage.googleapis.com/index.html
            baseURL: 'https://selenium-release.storage.googleapis.com'
        },
        firefox: {
            version: '0.26.0',
            // arch: process.arch,
            baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
        }
    },
    // For running with some other manually downloaded drivers
    javaArgs:[
        "-Dwebdriver.edge.driver=C:\drivers\msedgedriver.exe",
        "-Dwebdriver.chrome.driver=C:\drivers\IEDriverServer.exe",
        "-Dwebdriver.gecko.driver=C:\drivers\geckodriver.exe",
        "-Dwebdriver.chrome.driver=C:\\drivers\chromedriver.exe"
    ]
};