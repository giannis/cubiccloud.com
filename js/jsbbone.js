var accordNum=0;var accor={checkUrl:function(){var A=false;$$("a.button").each(function(C,B){if(window.location.hash.test(C.hash)){accordNum=B;A=true}});return A;if(!checkHash()){accordNum=0}},mainAccordion:function(){$$("div.warper").each(function(A){new Accordion(A.getElements("a.button"),A.getElements("div.container"),{fixedHeight:550,fixedWidth:800,opacity:false,display:accordNum})})},init:function(){this.checkUrl();this.mainAccordion()}};var accor2={portfolioAccordion:function(){$$("div.portfoliocontent").each(function(C){var D=new Fx.Styles(C,{duration:500});var B=0;var A=0;new Accordion(C.getElements("a.postbutton"),C.getElements("div.port"),{alwaysHide:true,start:"all-closed",onActive:function(E){E.setStyle("color","#ffffff");B++;A-=5;if(B===1){D.start({"padding-top":[350,10],"padding-left":[480,330]})}},onBackground:function(E){E.setStyle("color","#CCCCCC");A++;if(A===6){D.start({"padding-top":[10,350],"padding-left":[330,480]});A=0;B=0}}})})},init:function(){this.portfolioAccordion()}};var tip={makeTip:function(){new Tips($$(".tips"),{initialize:function(){this.fx=new Fx.Style(this.toolTip,"opacity",{duration:400,wait:false}).set(0)},onShow:function(A){this.fx.start(1)},onHide:function(A){this.fx.start(0)}})},init:function(){this.makeTip()}};window.addEvent("domready",function(){accor.init();accor2.init();tip.init();$("contactform").addEvent("submit",function(B){new Event(B).stop();var A=$("log_res").empty().addClass("ajax-loading");this.send({update:A,onComplete:function(){A.removeClass("ajax-loading")}})})});