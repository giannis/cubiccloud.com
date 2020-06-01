/*!
 * cubiccloud.com
 * Version: 2.0
 * Started: 26-10-2013
 * Updated: 26-10-2013
 * Url    : http://www.cubiccloud.com
 * Author : giannis (hello AT cubiccloud DOT com)
 *
 */

/*
 * Self calling function for our app
 *
 */
(function(window){
    var App = {};
    var $header = $('.header');
    
    App.gmap = {
        inited : false,
        map    : {},
        marker : {},
        coordinates : [52.354456, 4.91887],//mpraxami 37.941932,23.730001
        resize: function(){
            if (!this.inited)
                return;
            
            $('#map-canvas').css('height', $(window).height() * 0.5);
            this.map.setCenter(new google.maps.LatLng(this.coordinates[0], this.coordinates[1]));
        },
        init: function(){
            if (typeof google === "undefined") {
                $('.location-strip:eq(0)').html('Contact');
                $('#map-canvas').hide();
                return;
            }
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
            
            this.inited = true;
        }
    };
    
    App.nav = {
        windowHeight: 0,
        $lastSel: {},
        anchors: [],
        init: function(){
            var _self  = this,
                anchor = location.hash.replace(/^#/, '');
            
            this.windowHeight = $(window).height();
            this.getAnchorPos();
            this.goTo(anchor, $('.' + (anchor || 'home')));
            
            $('body').on({
                click: function(event){
                    var $target = $(event.target);
                    
                    if ($target.hasClass('nav-link')) {
                        var parts  = $target.attr('href').split('#'),
                            anchor = (parts[parts.length - 1] || 'home');                        

                        _self.goTo(anchor, $target);
                        return false;
                    }
                    
                    if ($target.hasClass('bezel')) {
                        if ($header.hasClass('open')) {
                            $header.removeClass('open').addClass('closed');
                            $target.removeClass('icon-arrow-up').addClass('icon-arrow-down');
                        }
                        else {
                            $header.removeClass('closed').addClass('open');
                            $target.removeClass('icon-arrow-down').addClass('icon-arrow-up');
                        }

                        return false;
                    }
                }
            });
        },
        goTo: function(anchor, $target){            
            if (!anchor || anchor == 'home') {
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
            this.$lastSel = $target;
            
            $('html,body').stop().animate({
                scrollTop: top
            }, {
                duration: 'slow', easing: 'swing'
            });
            
            // if (anchor)
            //     location.hash = anchor;
        },
        getAnchorPos: function(){
            var _self = this;
            
            this.anchors = [];
            $('.anchor').each(function () {
                _self.anchors.push({
                    id  : this.id, 
                    $link : $('.' + this.id, '.main-nav'),
                    top : $(this).offset().top,
                    height: $(this).outerHeight()
                }); 
            });
        },
        setNav: function(){
            var windowPos = $(window).scrollTop(),
                hash      = '',
                windowT   = this.windowHeight / 8,
                currentHash, current;
        
            for (var i = 0, l = this.anchors.length; i < l; i++) {
                current  = this.anchors[i];
                hash     = current.id;
                
                if (windowPos < (current.top - $header.outerHeight() - windowT) || 
                    windowPos > (current.top + current.height + $header.outerHeight() + windowT))
                    continue;
                
                currentHash = hash;
                this.$lastSel.removeClass('active');
                current.$link.addClass('active');
                this.$lastSel = current.$link;
            }
        }
    };
    
    var headerHeight = $header.height();
    
    $(window)
            .scroll(function() {
                if ($(this).scrollTop() <= 20) {
                    if ($header.hasClass('scroll'))
                        $header.removeClass('scroll')//.stop().animate({'height': headerHeight}, 'fast')
                }
                else {
                    if (!$header.hasClass('scroll'))
                        $header.addClass('scroll');//.stop().animate({'height': 80}, 'fast');

                    App.nav.setNav();
                }
            })
            .resize(function() {
                App.gmap.resize();
                App.nav.getAnchorPos();
                App.nav.windowHeight = $(window).height();
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
