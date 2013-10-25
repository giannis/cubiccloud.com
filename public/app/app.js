define('App', [
    'jquery', 
    'Config', 
    'CacheProvider', 
    'Loaders', 
    'Core',
    'Router',
    'Modal',
    'Paging',
    'Account',
    'MonitoringPage',  
    'MonitorPage',
    'ReportingPage',
    'ManagerReportingPage',
    'ReportPage',
    'SessionsPage',
    'AddUsersPage',
    'RemoveUsersPage',
    'DownloadsPage',
    'Error',
    'Offline',
    'Helpers',
    'Keyboard',
    'Util',
    'Templating'
], function(
        $, 
        Config, 
        CacheProvider, 
        Loaders, 
        Core,
        Router,
        Modal,
        Paging,
        Account,
        MonitoringPage, 
        MonitorPage,
        ReportingPage,
        ManagerReportingPage,
        ReportPage,
        SessionsPage,
        AddUsersPage,
        RemoveUsersPage,
        DownloadsPage,
        Error,
        Offline,
        Helpers,
        Keyboard,
        Util) {
    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";
    
    /*
     * Checks if the clicked keypressed element
     * has a disabled class and if it has stops the event
     * 
     */
    function handleDisabled(){
        $('body').on({
            click: checkDisabled,
            keypress: checkDisabled,
            dblclick: checkDisabled
        });

        function checkDisabled(event) {
            if ($(event.target).hasClass('disabled'))
                return false;
        }
    }
    
    function clearLocalStorage(force){
        if (force) {
            CacheProvider.empty();
            return true;
        }
        
        if (localstorage_date){
            var last_localstorage_date = CacheProvider.get('localstorage_date', true);
            if (!last_localstorage_date || Util.isNot(parseInt(last_localstorage_date))|| localstorage_date > last_localstorage_date) {
                CacheProvider.empty();
                CacheProvider.set('localstorage_date', localstorage_date, true);
                return true;
            }
        }
        
        return false;
    }
    
    function various(){        
        CacheProvider.set('$warper', $('#warper'));
        CacheProvider.set('$header', $('.header:eq(0)'));

        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            if (options.type == 'GET' || options.type == 'POST')
                options.data = (options.data ? (options.data + '&') : '') + 'nonce=' + q_nonce;
            else
                options.url = (options.url ? (options.url + '&') : '') + 'nonce=' + q_nonce;
        });
    };
    
    function goOnline(){
        Core.dispatcher.on('online', function(reqQueue){
            var i = 0, 
                l = reqQueue.length, 
                req;
                
            for(; i < l; i++) {
                req = reqQueue[i];
                
                if (req.req)
                    Helpers.ajax(req.req, req.no_cache);
            }
        });
    }
    
    function boot() {
        Loaders.mainLoader.animateProgress(80);

        various();
        handleDisabled();
        clearLocalStorage(Config.debug);
        
        Core.router = Router.init();
        
        Offline.init();
        Modal.init();
        
        //initialize our plugins        
        Paging.init();
        
        Error.init();
        Account.init();
        MonitoringPage.init();
        MonitorPage.init();
        ReportingPage.init();
        ReportPage.init();
        SessionsPage.init();
        DownloadsPage.init();
        
        if (Core.isUserAllowed('manager'))
            ManagerReportingPage.init();
        if (Core.isUserAllowed('store_manager')) {
            AddUsersPage.init();
            RemoveUsersPage.init();
        }
        
        Keyboard.init();
        Router.start();
        
        Loaders.mainLoader.animateProgress(20);
        
        goOnline();
    }

    return {
        boot: boot
    };
});