// Set the require.js configuration
require.config({
    baseUrl: (typeof base_path !== "undefined" ? base_path : "") + "app/",
    
    shim: {
        "underscore": {
            "exports": '_'
        },
        "backbone": {
            "deps": ["underscore", "jquery"],
            "exports": "Backbone"
        },
        'backbone-queryparams': {
            deps: [
                'backbone'
            ]
        },
        "jmd5": ["jquery"]
    },
    map: {
        // Ensure Lo-Dash is used instead of underscore.
        "*": {"underscore": "lodash"}
    },
    paths: {
        "jquery": "../components/jquery/jquery",
        "lodash": "../components/lodash/lodash",
        "backbone": "../components/backbone/backbone",
        'backbone-queryparams': '../components/backbone-query-parameters/backbone.queryparams',
        "mustache": "../components/mustache/mustache",
        "text": "../components/requirejs-text/text",
        "jmd5": "../components/jQuery-MD5/jquery.md5",
        
        "App": "app",
        "Core": "plugins/core/core",
        "Router": "plugins/ext.router/router",
        "Config": "plugins/ext.config/config",
        "Templating": "plugins/ext.templating/templating",
        "Helpers": "plugins/ext.helpers/helpers",
        "Error": "plugins/ext.error/error",
        "Email": "plugins/ext.email/email",
        "Loaders": "plugins/ext.loaders/loaders",
        "Util": "plugins/ext.util/util",
        "CacheProvider": "plugins/ext.cache-provider/cache-provider",
        "Gauge": "plugins/ext.util/gauge",
        "Modal": "plugins/ext.util/modal",
        "Notify": "plugins/ext.util/notify",
        "Offline": "plugins/ext.offline/offline",
        "Keyboard": "plugins/core/keyboard",
        
        "CreateView": "plugins/core/create",
        "Paging": "plugins/core/paging",
        
        "PageView": "plugins/ext.views/page",
        "ListView": "plugins/ext.views/list",
        "GaugeView": "plugins/ext.views/gauge",
        "MonthlyAveragesView": "plugins/ext.views/monthly-averages",
        "DropDownView": "plugins/ext.views/dropdown",
        "ReportCriteriasView": "plugins/ext.views/report-criterias",
        "ReportTableView": "plugins/ext.views/report-table",
        
        "MainCollection": "plugins/ext.collections/main",
        "MainModel": "plugins/ext.models/main",
        
        "Account": "plugins/ext.account/account",
        "NavButtons": "plugins/ext.navbuttons/navbuttons",
        
        "MonitoringPage": "plugins/ext.paging/monitoring",
        "MonitorPage": "plugins/ext.paging/monitor",
        "ReportingPage": "plugins/ext.paging/reporting",
        "ManagerReportingPage": "plugins/ext.paging/manager-reporting",
        "ReportPage": "plugins/ext.paging/report",
        "SessionsPage": "plugins/ext.paging/sessions",
        "AddUsersPage": "plugins/ext.paging/add-users",
        "RemoveUsersPage": "plugins/ext.paging/remove-users",
        "DownloadsPage": "plugins/ext.paging/downloads"
    }
});

require(['App'], function(App) {
    App.boot();
});