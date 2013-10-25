/*!
 * cubicloud.com
 * Version: 1.5
 * Updated: 02-09-2010
 * http://cubiccloud.com/
 *
 * Copyright (c) 2009 paramana.com
 *
 */

//Activate FancyBox
var gallery = {
    makeGallery: function() {
        $(".gallery a").fancybox({
            'overlayShow' : true,
            'padding' : 10,
            'frameWidth' : 660,
            'frameHeight': 505,
            'hideOnContentClick' : false
        });
        $(".videolink").fancybox({
            'overlayShow' : true,
            'padding' : 10,
            'frameWidth' : 480,
            'frameHeight': 360,
            'hideOnContentClick' : false
        });
    },
    init: function(){
        this.makeGallery();
    }
};
var animations = {
    accordionMain: function() {
        $('#footer a').click(function(){
            if(!$(this).attr('target')) {
                var _thisId = $(this).attr('href');
                $('.container').each(function (){
                    if ($(this).children(':eq(0)').attr('id') != _thisId) {
                        $(this).slideUp();
                    }
                    else
                        $(this).slideDown();
                });
                window.location.hash = _thisId;
                return false;
            }
        });
    },
    accordionPort: function() {
        $('.port').hide();
        $('.postbutton').click(function(){
            var thisId = $(this).attr('href');
            if(!$(this).data('open_port') || $(this).data('open_port') == false) {
                $('.postbutton').data('open_port', false);
                $(this).data('open_port', true);
                $('.postbutton').css('color', '#CCCCCC');
                
                $(this).css('color', '#ffffff');

                $('#portfoliocontent').animate({
                    paddingTop: 10,
                    paddingLeft: 330
                });
                $('.port').slideUp();
                $('#' + thisId).slideDown();
            }
            else {
                $(this).css('color', '#CCCCCC');
                $('.postbutton').data('open_port', false);
                $('#portfoliocontent').animate({
                    paddingTop: 350,
                    paddingLeft: 480
                });
                $('.port').slideUp();
            }
            
            //alert($('#' + $(this).attr('href')));
            return false;
        });
    },
    redirectUrl: function(){
        var hash = window.location.hash.substr(1);
        var found = false;
        if (hash != '') {
            $('#footer a').each(function(){
                var href = $(this).attr('href');
                if(hash == href){
                    $('#' + href).parent().show();
                    found = true;
                }
            });
            if(!found)
                $('#about').parent().show();
            
        }
        else
            $('#about').parent().show();
    },
    init: function(){
        //this.contentFader();
        this.redirectUrl();
        this.accordionMain();
        this.accordionPort();
    }
};
$(function extrnalLinks () {
    $("a.externalLink").attr("target", "_blank");
});

var webStart = {
    siteLoader: function() {
        $(window).load(function () {
            //$("#siteLoading,#siteLoadOverlay_Frame").fadeOut("fast").remove();
            $("#siteLoading").fadeOut('normal', function (){
                $(this).remove();
            });
        });
        $('.container').hide();
    },
    init: function(){
        this.siteLoader();
    }
};
$(function contactForma () {
    $('.error').hide();
    $("#submit").click(function() {
        // validate and process form
        // first hide any error messages
        $('.error').hide();

        var name = $("input#name").val();
        if (name == "" || name == "your name..") {
            $("#nameError").fadeIn('fast');
            $("input#name").focus();
            return false;
        }
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var email = $("input#email").val();
        if (email == "" || email == "your e-mail goes here..") {
            $("#emailError").fadeIn('fast');
            $("input#email").focus();
            return false;
        }
        else if (!emailReg.test(email)) {
            $("#emailWrong").fadeIn('fast');
            $("input#email").focus();
            return false;
        }
        var message = $("textarea#message").val();
        if (message == "") {
            $("#messageError").fadeIn('fast');
            $("textarea#message").focus();
            return false;
        }

        var dataString = 'name='+ name + '&email=' + email + '&message=' + message;

        $.ajax({
            type: "POST",
            url: "bin/process.php",
            data: dataString,
            success: function() {
                $('#forma').html("<div id='feedback'><h3>Contact Form Submitted!</h3><p>I will be in touch soon.</p><img id='checkmark' src='images/mailbox.png' alt='' /></div>");
            }
        });
        return false;
    });
});

jQuery.fn.clearFields = function(focusClass) {
    this.each(function() {
        $(this).focus(function() {
            // clear value if current value is the default
            if($(this).val() == this.defaultValue) {
                $(this).val("");
            }

            // if focusClass is set, add the class
            if(focusClass) {
                $(this).addClass(focusClass);
            }
        }).blur(function() {
            // restore to the default value if current value is empty
            if($(this).val() == "") {
                $(this).val(this.defaultValue);
            }

            // if focusClass is set, remove class
            if(focusClass) {
                $(this).removeClass(focusClass);
            }
        });
    });
}
$(document).ready( function(){
    $("#name, #email, #message").clearFields("activeField");
    $("#message").clearForm();
    $("#name").val("your name..");
    $("#email").val("your e-mail goes here..");
    $("input#name").keypress(function (e){
        $("#nameError").fadeOut('slow');
    });
    $("input#email").keypress(function (e){
        $("#emailError").fadeOut('slow');
        $("#emailWrong").fadeOut('slow');
    });
    $("textarea#message").keypress(function (e){
        $("#messageError").fadeOut('slow');
    });
    webStart.init();
    animations.init();
    tooltip();
    gallery.init();
});

this.tooltip = function(){
    /* CONFIG */
    xOffset = -10;
    yOffset = 20;
    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result
    /* END CONFIG */
    $("a.tooltip").hover(function(e){
        this.t = this.title;
        this.title = "";
        var tipContent = this.t.split('::');
        $("body").append('<div id="tooltip">\
                            <div>\
                                <div class="tool-title">\
                                    <span>' + tipContent[0] + '</span>\
                                </div>\
                                <div class="tool-text">\
                                    <span>'+
                                        tipContent[1]
                                    +'</span>\
                                </div>\
                            </div>\
                        </div>');
        $("#tooltip")
        .css("top",(e.pageY - xOffset) + "px")
        .css("left",(e.pageX + yOffset) + "px")
        .fadeIn("fast");
    },
    function(){
        this.title = this.t;
        $("#tooltip").remove();
    });
    $("a.tooltip").mousemove(function(e){
        $("#tooltip")
        .css("top",(e.pageY - xOffset) + "px")
        .css("left",(e.pageX + yOffset) + "px");
    });
    $("a.tooltip").click(function(e){
        return false;
    });
};

$.fn.clearForm = function() {
    return this.each(function() {
        var type = this.type, tag = this.tagName.toLowerCase();
        if (tag == 'form')
            return $(':input',this).clearForm();
        if (type == 'text' || type == 'password' || tag == 'textarea')
            this.value = '';
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

