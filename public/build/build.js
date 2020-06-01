({
    baseUrl: "../app",
    mainConfigFile: "../app/main.js",
    name: "main",
    wrap: false,
    out: "../app/min/release.js",
    preserveLicenseComments: false,
    skipModuleInsertion: false,
    optimizeAllPluginResources: true,
    findNestedDependencies: true
//    ,uglify: {
//        max_line_length: 1000,
//    },
})
