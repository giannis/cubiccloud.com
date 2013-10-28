/*!
 * cubiccloud.com
 * Version: 2.0
 * Started: 26-10-2013
 * Updated: 26-10-2013
 * Url    : http://www.cubiccloud.com
 * Author : giannis (giannis AT paramana DOT com)
 *
 * Copyright (c) 2013 paramana.com
 *
 */

/*
 * Self calling function for our app
 *
 */
(function(window){
    var App = {};
    
    App.gmap = {
        map    : {},
        marker : {},
        coordinates : [52.354456, 4.91887],//mpraxami 37.941932,23.730001
        resize: function(){
            $('#map-canvas').css('height', $(window).height() * 0.5);
            this.map.setCenter(new google.maps.LatLng(this.coordinates[0], this.coordinates[1]));
        },
        init: function(){
            var mapStyle = [
                { featureType: "water", stylers: [ { color: "#9fc0dd" } ] },
                { elementType: "labels.text.stroke", stylers: [ { color: "#feffff" } ] },
                { featureType: "road", elementType: "geometry.fill", stylers: [ { color: "#ffffff" } ] },
                { elementType: "geometry.stroke", stylers: [ { visibility: "off" } ] },
                { featureType: "poi.attraction", elementType: "geometry", stylers: [ { visibility: "off" } ] },
                { featureType: "poi.business", stylers: [ { visibility: "off" } ] },
                { featureType: "poi.government", stylers: [ { visibility: "off" } ] },
                { featureType: "poi.medical", stylers: [ { visibility: "off" } ] },
                { featureType: "poi.place_of_worship", stylers: [ { visibility: "off" } ] },
                { featureType: "poi.school", stylers: [ { visibility: "off" } ] },
                { featureType: "poi.sports_complex", stylers: [ { visibility: "off" } ] },
                { featureType: "transit.line", elementType: "geometry", stylers: [ { color: "#cccccc" } ] },
                { featureType: "transit.station", stylers: [ { visibility: "off" } ] },
                { featureType: "administrative", stylers: [ { visibility: "off" } ] },
                { featureType: "administrative.locality", stylers: [ { visibility: "on" } ] },
                { featureType: "road", elementType: "labels.icon", stylers: [ { visibility: "off" } ] },
                { featureType: "road.highway", elementType: "geometry", stylers: [ { color: "#FDFD90" } ] },
                { featureType: "landscape.man_made", stylers: [ { color: "#cccccc" } ] }
            ];

            var myOptions = { 
                center: new google.maps.LatLng(this.coordinates[0], this.coordinates[1]), 
                panControl: false, 
                mapTypeControl: false, 
                streetViewControl: false, 
                zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL }, 
                styles : mapStyle, 
                zoom: 13, 
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

            var markerImage = new google.maps.MarkerImage('images/cloud-marker-30x19.png',
                null, 
                new google.maps.Point(0,0),
                new google.maps.Point(10,10)
            );

            this.marker = new google.maps.Marker({ 
                position: new google.maps.LatLng(this.coordinates[0], this.coordinates[1]), 
                map: this.map, 
                icon: markerImage
            });

            $('#map-canvas').css('height', $(window).height() * 0.5);
        }
    };
    
    App.nav = {
        anchors: [],
        init: function(){
            var _self  = this,
                anchor = location.hash.replace(/^#/, '') || 'home';
            
            this.getAnchorPos();
            this.goTo(anchor, $('.' + anchor));
            
            $('body').on({
                click: function(event){
                    var $target = $(event.target);
                    
                    if ($target.hasClass('nav-link')) {
                        var parts  = $target.attr('href').split('/'),
                            anchor = (parts[parts.length - 1] || 'home');                        

                        _self.goTo(anchor, $target);
                        return false;
                    }
                }
            });
        },
        goTo: function(anchor, $target){
            if (anchor == 'home') {
                var top = 0;
            }
            else {
                var $anchor = $('#' + anchor);
                if (!$anchor.length)
                    top    = 0;
                else
                    top = $anchor.offset().top - 50;
            }
            
            $target.closest('ul').find('.active').removeClass('active');
            $target.addClass('active');

            $('html,body').stop().animate({
                scrollTop: top
            }, {
                duration: 'slow', easing: 'swing'
            });
            
            location.hash = anchor;
        },
        getAnchorPos: function(){
            var _self = this;
            
            this.anchors = [];
            $('.anchor').each(function () {
                _self.anchors.push({
                    id  : this.id, 
                    top : $(this).offset().top
                }); 
            });
        },
        setHash: function(){
            var top      = $(window).scrollTop(),
                distance = 0,
                hash     = '',
                currentHash;
        
            for (var i = 0, l = this.anchors.length; i < l; i++) {
                distance = top - this.anchors[i].top;
                hash     = this.anchors[i].id;
                
                if (distance < 50 && distance > -50 && currentHash != hash) {
                    window.location.hash = hash;
                    currentHash = hash;
                }
            }
        }
    };
    
    $(window)
            .scroll(function() {
                if ($(window).scrollTop() <= 20)
                    $('.header').removeClass('scroll')
                else
                    $('.header').addClass('scroll');
                
                App.nav.setHash();
            })
            .resize(function() {
                App.gmap.resize();
                App.nav.getAnchorPos();
            });

    $(document).ready(function(){
//        $('html,body').animate({
//            scrollTop: 0
//        }, {
//            duration: 'slow', easing: 'swing'
//        });
        App.gmap.init();
        App.nav.init();
    });

    // Expose App to the global object
    window.App = App;
})(window);