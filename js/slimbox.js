/*
	Slimbox v1.41 - The ultimate lightweight Lightbox clone
	by Christophe Beyls (http://www.digitalia.be) - MIT-style license.
	Inspired by the original Lightbox v2 by Lokesh Dhakar.
*/
var Lightbox={init:function(b){this.options=$extend({resizeDuration:400,resizeTransition:false,initialWidth:250,initialHeight:250,animateCaption:true,showCounter:true},b||{});this.anchors=[];$each(document.links,function(a){if(a.rel&&a.rel.test(/^lightbox/i)){a.onclick=this.click.pass(a,this);this.anchors.push(a)}},this);this.eventKeyDown=this.keyboardListener.bindAsEventListener(this);this.eventPosition=this.position.bind(this);this.overlay=new Element('div',{'id':'lbOverlay'}).injectInside(document.body);this.center=new Element('div',{'id':'lbCenter','styles':{'width':this.options.initialWidth,'height':this.options.initialHeight,'marginLeft':-(this.options.initialWidth/2),'display':'none'}}).injectInside(document.body);this.image=new Element('div',{'id':'lbImage'}).injectInside(this.center);this.prevLink=new Element('a',{'id':'lbPrevLink','href':'#','styles':{'display':'none'}}).injectInside(this.image);this.nextLink=this.prevLink.clone().setProperty('id','lbNextLink').injectInside(this.image);this.prevLink.onclick=this.previous.bind(this);this.nextLink.onclick=this.next.bind(this);this.bottomContainer=new Element('div',{'id':'lbBottomContainer','styles':{'display':'none'}}).injectInside(document.body);this.bottom=new Element('div',{'id':'lbBottom'}).injectInside(this.bottomContainer);new Element('a',{'id':'lbCloseLink','href':'#'}).injectInside(this.bottom).onclick=this.overlay.onclick=this.close.bind(this);this.caption=new Element('div',{'id':'lbCaption'}).injectInside(this.bottom);this.number=new Element('div',{'id':'lbNumber'}).injectInside(this.bottom);new Element('div',{'styles':{'clear':'both'}}).injectInside(this.bottom);var c=this.nextEffect.bind(this);this.fx={overlay:this.overlay.effect('opacity',{duration:500}).hide(),resize:this.center.effects($extend({duration:this.options.resizeDuration,onComplete:c},this.options.resizeTransition?{transition:this.options.resizeTransition}:{})),image:this.image.effect('opacity',{duration:500,onComplete:c}),bottom:this.bottom.effect('margin-top',{duration:400,onComplete:c})};this.preloadPrev=new Image();this.preloadNext=new Image()},click:function(b){if(b.rel.length==8)return this.show(b.href,b.title);var j,imageNum,images=[];this.anchors.each(function(a){if(a.rel==b.rel){for(j=0;j<images.length;j++)if(images[j][0]==a.href)break;if(j==images.length){images.push([a.href,a.title]);if(a.href==b.href)imageNum=j}}},this);return this.open(images,imageNum)},show:function(a,b){return this.open([[a,b]],0)},open:function(a,b){this.images=a;this.position();this.setup(true);this.top=window.getScrollTop()+(window.getHeight()/15);this.center.setStyles({top:this.top,display:''});this.fx.overlay.start(0.8);return this.changeImage(b)},position:function(){this.overlay.setStyles({'top':window.getScrollTop(),'height':window.getHeight()})},setup:function(b){var c=$A(document.getElementsByTagName('object'));c.extend(document.getElementsByTagName(window.ie?'select':'embed'));c.each(function(a){if(b)a.lbBackupStyle=a.style.visibility;a.style.visibility=b?'hidden':a.lbBackupStyle});var d=b?'addEvent':'removeEvent';window[d]('scroll',this.eventPosition)[d]('resize',this.eventPosition);document[d]('keydown',this.eventKeyDown);this.step=0},keyboardListener:function(a){switch(a.keyCode){case 27:case 88:case 67:this.close();break;case 37:case 80:this.previous();break;case 39:case 78:this.next()}},previous:function(){return this.changeImage(this.activeImage-1)},next:function(){return this.changeImage(this.activeImage+1)},changeImage:function(a){if(this.step||(a<0)||(a>=this.images.length))return false;this.step=1;this.activeImage=a;this.bottomContainer.style.display=this.prevLink.style.display=this.nextLink.style.display='none';this.fx.image.hide();this.center.className='lbLoading';this.preload=new Image();this.preload.onload=this.nextEffect.bind(this);this.preload.src=this.images[a][0];return false},nextEffect:function(){switch(this.step++){case 1:this.center.className='';this.image.style.backgroundImage='url('+this.images[this.activeImage][0]+')';this.image.style.width=this.bottom.style.width=this.preload.width+'px';this.image.style.height=this.prevLink.style.height=this.nextLink.style.height=this.preload.height+'px';this.caption.setHTML(this.images[this.activeImage][1]||'');this.number.setHTML((!this.options.showCounter||(this.images.length==1))?'':'Image '+(this.activeImage+1)+' of '+this.images.length);if(this.activeImage)this.preloadPrev.src=this.images[this.activeImage-1][0];if(this.activeImage!=(this.images.length-1))this.preloadNext.src=this.images[this.activeImage+1][0];if(this.center.clientHeight!=this.image.offsetHeight){this.fx.resize.start({height:this.image.offsetHeight});break}this.step++;case 2:if(this.center.clientWidth!=this.image.offsetWidth){this.fx.resize.start({width:this.image.offsetWidth,marginLeft:-this.image.offsetWidth/2});break}this.step++;case 3:this.bottomContainer.setStyles({top:this.top+this.center.clientHeight,height:0,marginLeft:this.center.style.marginLeft,display:''});this.fx.image.start(1);break;case 4:if(this.options.animateCaption){this.fx.bottom.set(-this.bottom.offsetHeight);this.bottomContainer.style.height='';this.fx.bottom.start(0);break}this.bottomContainer.style.height='';case 5:if(this.activeImage)this.prevLink.style.display='';if(this.activeImage!=(this.images.length-1))this.nextLink.style.display='';this.step=0}},close:function(){if(this.step<0)return;this.step=-1;if(this.preload){this.preload.onload=Class.empty;this.preload=null}for(var f in this.fx)this.fx[f].stop();this.center.style.display=this.bottomContainer.style.display='none';this.fx.overlay.chain(this.setup.pass(false,this)).start(0);return false}};window.addEvent('domready',Lightbox.init.bind(Lightbox));