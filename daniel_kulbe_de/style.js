/*  _    _          ___           __ _     (R)
 * | |  (_)_ _____ / __|___ _ _  / _(_)__ _
 * | |__| \ V / -_) (__/ _ \ ' \|  _| / _` |
 * |____|_|\_/\___|\___\___/_||_|_| |_\__, |
 *                                    |___/
 * Copyright (c) 2009-2015 Keppler IT GmbH.
 * ---------------------------------------------------------------------------
 * $Id: style.js 3910 2015-11-09 21:47:50Z kk $
 *
 * style.js
 * JavaScript code for default template
 * ---------------------------------------------------------------------------
 */

!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.salvattore=t()}(this,function(){
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),n=document.getElementsByTagName("script")[0],r=null;t.type="text/css",t.id="matchmediajs-test",n.parentNode.insertBefore(t,n),r="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle,e={matchMedium:function(e){var n="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=n:t.textContent=n,"1px"===r.width}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}()),
/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
function(){"use strict";if(window.matchMedia&&window.matchMedia("all").addListener)return!1;var e=window.matchMedia,t=e("only all").matches,n=!1,r=0,a=[],i=function(t){clearTimeout(r),r=setTimeout(function(){for(var t=0,n=a.length;n>t;t++){var r=a[t].mql,i=a[t].listeners||[],o=e(r.media).matches;if(o!==r.matches){r.matches=o;for(var c=0,l=i.length;l>c;c++)i[c].call(window,r)}}},30)};window.matchMedia=function(r){var o=e(r),c=[],l=0;return o.addListener=function(e){t&&(n||(n=!0,window.addEventListener("resize",i,!0)),0===l&&(l=a.push({mql:o,listeners:c})),c.push(e))},o.removeListener=function(e){for(var t=0,n=c.length;n>t;t++)c[t]===e&&c.splice(t,1)},o}}(),function(){"use strict";for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var r=(new Date).getTime(),a=Math.max(0,16-(r-e)),i=window.setTimeout(function(){t(r+a)},a);return e=r+a,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),"function"!=typeof window.CustomEvent&&!function(){"use strict";function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}();
/*! Salvattore 1.0.8 by @rnmp and @ppold. https://github.com/rnmp/salvattore */
var e=function(e,t,n){"use strict";var r={},a=[],i=[],o=[],c=function(e,t,n){e.dataset?e.dataset[t]=n:e.setAttribute("data-"+t,n)};return r.obtainGridSettings=function(t){var n=e.getComputedStyle(t,":before"),r=n.getPropertyValue("content").slice(1,-1),a=r.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/),i=1,o=[];return a?(i=a[1],o=a[2],o=o?o.split("."):["column"]):(a=r.match(/^\s*\.(.+)\s+(\d+)\s*$/),a&&(o=a[1],i=a[2],i&&(i=i.split(".")))),{numberOfColumns:i,columnClasses:o}},r.addColumns=function(e,n){for(var a,i=r.obtainGridSettings(e),o=i.numberOfColumns,l=i.columnClasses,s=new Array(+o),u=t.createDocumentFragment(),d=o;0!==d--;)a="[data-columns] > *:nth-child("+o+"n-"+d+")",s.push(n.querySelectorAll(a));s.forEach(function(e){var n=t.createElement("div"),r=t.createDocumentFragment();n.className=l.join(" "),Array.prototype.forEach.call(e,function(e){r.appendChild(e)}),n.appendChild(r),u.appendChild(n)}),e.appendChild(u),c(e,"columns",o)},r.removeColumns=function(n){var r=t.createRange();r.selectNodeContents(n);var a=Array.prototype.filter.call(r.extractContents().childNodes,function(t){return t instanceof e.HTMLElement}),i=a.length,o=a[0].childNodes.length,l=new Array(o*i);Array.prototype.forEach.call(a,function(e,t){Array.prototype.forEach.call(e.children,function(e,n){l[n*i+t]=e})});var s=t.createElement("div");return c(s,"columns",0),l.filter(function(e){return!!e}).forEach(function(e){s.appendChild(e)}),s},r.recreateColumns=function(t){e.requestAnimationFrame(function(){r.addColumns(t,r.removeColumns(t));var e=new CustomEvent("columnsChange");t.dispatchEvent(e)})},r.mediaQueryChange=function(e){e.matches&&Array.prototype.forEach.call(a,r.recreateColumns)},r.getCSSRules=function(e){var t;try{t=e.sheet.cssRules||e.sheet.rules}catch(n){return[]}return t||[]},r.getStylesheets=function(){var e=Array.prototype.slice.call(t.querySelectorAll("style"));return e.forEach(function(t,n){"text/css"!==t.type&&""!==t.type&&e.splice(n,1)}),Array.prototype.concat.call(e,Array.prototype.slice.call(t.querySelectorAll("link[rel='stylesheet']")))},r.mediaRuleHasColumnsSelector=function(e){var t,n;try{t=e.length}catch(r){t=0}for(;t--;)if(n=e[t],n.selectorText&&n.selectorText.match(/\[data-columns\](.*)::?before$/))return!0;return!1},r.scanMediaQueries=function(){var t=[];if(e.matchMedia){r.getStylesheets().forEach(function(e){Array.prototype.forEach.call(r.getCSSRules(e),function(e){try{e.media&&e.cssRules&&r.mediaRuleHasColumnsSelector(e.cssRules)&&t.push(e)}catch(n){}})});var n=i.filter(function(e){return-1===t.indexOf(e)});o.filter(function(e){return-1!==n.indexOf(e.rule)}).forEach(function(e){e.mql.removeListener(r.mediaQueryChange)}),o=o.filter(function(e){return-1===n.indexOf(e.rule)}),t.filter(function(e){return-1==i.indexOf(e)}).forEach(function(t){var n=e.matchMedia(t.media.mediaText);n.addListener(r.mediaQueryChange),o.push({rule:t,mql:n})}),i.length=0,i=t}},r.rescanMediaQueries=function(){r.scanMediaQueries(),Array.prototype.forEach.call(a,r.recreateColumns)},r.nextElementColumnIndex=function(e,t){var n,r,a,i=e.children,o=i.length,c=0,l=0;for(a=0;o>a;a++)n=i[a],r=n.children.length+(t[a].children||t[a].childNodes).length,0===c&&(c=r),c>r&&(l=a,c=r);return l},r.createFragmentsList=function(e){for(var n=new Array(e),r=0;r!==e;)n[r]=t.createDocumentFragment(),r++;return n},r.appendElements=function(e,t){var n=e.children,a=n.length,i=r.createFragmentsList(a);Array.prototype.forEach.call(t,function(t){var n=r.nextElementColumnIndex(e,i);i[n].appendChild(t)}),Array.prototype.forEach.call(n,function(e,t){e.appendChild(i[t])})},r.prependElements=function(e,n){var a=e.children,i=a.length,o=r.createFragmentsList(i),c=i-1;n.forEach(function(e){var t=o[c];t.insertBefore(e,t.firstChild),0===c?c=i-1:c--}),Array.prototype.forEach.call(a,function(e,t){e.insertBefore(o[t],e.firstChild)});for(var l=t.createDocumentFragment(),s=n.length%i;0!==s--;)l.appendChild(e.lastChild);e.insertBefore(l,e.firstChild)},r.registerGrid=function(n){if("none"!==e.getComputedStyle(n).display){var i=t.createRange();i.selectNodeContents(n);var o=t.createElement("div");o.appendChild(i.extractContents()),c(o,"columns",0),r.addColumns(n,o),a.push(n)}},r.init=function(){var e=t.createElement("style");e.innerHTML="[data-columns]::before{display:block;visibility:hidden;position:absolute;font-size:1px;}",t.head.appendChild(e);var n=t.querySelectorAll("[data-columns]");Array.prototype.forEach.call(n,r.registerGrid),r.scanMediaQueries()},r.init(),{appendElements:r.appendElements,prependElements:r.prependElements,registerGrid:r.registerGrid,recreateColumns:r.recreateColumns,rescanMediaQueries:r.rescanMediaQueries,init:r.init,append_elements:r.appendElements,prepend_elements:r.prependElements,register_grid:r.registerGrid,recreate_columns:r.recreateColumns,rescan_media_queries:r.rescanMediaQueries}}(window,window.document);return e
});

// init
+function($){ $(function(){ salvattore && salvattore.init() }) }(jQuery);

/*! Outdated Browser v1.1.2, @Copyright 2015 Burocratik, http://www.burocratik.com */
var outdatedBrowser=function(t){function o(t){s.style.opacity=t/100,s.style.filter="alpha(opacity="+t+")"}function e(t){o(t),1==t&&(s.style.display="block"),100==t&&(u=!0)}function r(){var t=document.getElementById("btnCloseUpdateBrowser"),o=document.getElementById("btnUpdateBrowser");s.style.backgroundColor=bkgColor,s.style.color=txtColor,s.children[0].style.color=txtColor,s.children[1].style.color=txtColor,o.style.color=txtColor,o.style.borderColor&&(o.style.borderColor=txtColor),t.style.color=txtColor,t.onmousedown=function(){return s.style.display="none",!1},o.onmouseover=function(){this.style.color=bkgColor,this.style.backgroundColor=txtColor},o.onmouseout=function(){this.style.color=txtColor,this.style.backgroundColor=bkgColor}}function l(){var t=!1;if(window.XMLHttpRequest)t=new XMLHttpRequest;else if(window.ActiveXObject)try{t=new ActiveXObject("Msxml2.XMLHTTP")}catch(o){try{t=new ActiveXObject("Microsoft.XMLHTTP")}catch(o){t=!1}}return t}function a(t){var o=l();return o&&(o.onreadystatechange=function(){n(o)},o.open("GET",t,!0),o.send(null)),!1}function n(t){var o=document.getElementById("outdated");return 4==t.readyState&&(o.innerHTML=200==t.status||304==t.status?t.responseText:d,r()),!1}var s=document.getElementById("outdated");this.defaultOpts={bgColor:"#f25648",color:"#ffffff",lowerThan:"transform",languagePath:"../outdatedbrowser/lang/en.html"},t?("IE8"==t.lowerThan||"borderSpacing"==t.lowerThan?t.lowerThan="borderSpacing":"IE9"==t.lowerThan||"boxShadow"==t.lowerThan?t.lowerThan="boxShadow":"IE10"==t.lowerThan||"transform"==t.lowerThan||""==t.lowerThan||"undefined"==typeof t.lowerThan?t.lowerThan="transform":("IE11"==t.lowerThan||"borderImage"==t.lowerThan)&&(t.lowerThan="borderImage"),this.defaultOpts.bgColor=t.bgColor,this.defaultOpts.color=t.color,this.defaultOpts.lowerThan=t.lowerThan,this.defaultOpts.languagePath=t.languagePath,bkgColor=this.defaultOpts.bgColor,txtColor=this.defaultOpts.color,cssProp=this.defaultOpts.lowerThan,languagePath=this.defaultOpts.languagePath):(bkgColor=this.defaultOpts.bgColor,txtColor=this.defaultOpts.color,cssProp=this.defaultOpts.lowerThan,languagePath=this.defaultOpts.languagePath);var u=!0,i=function(){var t=document.createElement("div"),o="Khtml Ms O Moz Webkit".split(" "),e=o.length;return function(r){if(r in t.style)return!0;for(r=r.replace(/^[a-z]/,function(t){return t.toUpperCase()});e--;)if(o[e]+r in t.style)return!0;return!1}}();if(!i(""+cssProp)){if(u&&"1"!==s.style.opacity){u=!1;for(var c=1;100>=c;c++)setTimeout(function(t){return function(){e(t)}}(c),8*c)}" "===languagePath||0==languagePath.length?r():a(languagePath);var d='<h6>Your browser is out-of-date!</h6><p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>'}};

// init
+function($){
	var userLang = navigator.language || navigator.userLanguage || 'en';
	var supportedLang = ['de','en','es','fr','hr','nl','sr','th'];

	if ($.inArray(userLang, supportedLang) === -1) userLang = 'en';
	var strings = {
		de: '<h6>Ihr Browser ist veraltet!</h6><p>Bitte aktualisieren Sie Ihren Browser, um diese Website korrekt dazustellen. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/de">Den Browser jetzt aktualisieren </a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Schließen">&times;</a></p>',
		en: '<h6>Your browser is out of date!</h6><p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>',
		es: '<h6>¡Tu navegador está anticuado!</h6><p>Actualiza tu navegador para ver esta página correctamente. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/es">Actualizar mi navegador ahora</a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Cerrar">&times;</a></p>',
		fr: '<h6>Votre navigateur est obsolète!</h6><p>Mettez à jour votre navigateur pour afficher correctement ce site Web. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/fr">Mettre à jour maintenant </a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Fermer">&times;</a></p>',
		hr: '<h6>Vaš Internet preglednik nije ažuriran!</h6><p>Ažurirajte Vaš preglednik za ispravan prikaz ove stranice. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Ažuriraj odmah </a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Zatvori">&times;</a></p>',
		nl: '<h6>Je gebruikt een verouderde browser!</h6><p>Update je browser om deze website correct te bekijken. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/nl">Update mijn browser nu </a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Sluiten">&times;</a></p>',
		sr: '<h6>Ваш претраживач је оут-оф-дате!</h6><p>Ажурирате свој претраживач да правилно видели ове интернет странице. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Упдате мој прегледач сада</a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Затвори">&times;</a></p>',
		th: '<h6>เบราว์เซอร์ของคุณจะออกจากวัน!</h6><p>อัพเดทเบราว์เซอร์ของคุณเพื่อดูเว็บไซต์นี้ได้อย่างถูกต้อง<a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">อัพเดทเบราว์เซอร์ของฉันตอนนี้ </a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="ใกล้">&times;</a></p>'
	}

	$('<div />',{id:'outdated'}).html(strings[userLang]).appendTo('body');

	$(function(){
		outdatedBrowser({
	        bgColor: '#eebe24',
	        color: '#ffffff',
	        lowerThan: 'transform', // < IE10
	        languagePath: ''
	    });
	});
}(jQuery);

/*
 * Menu
 */

+function($){
	$(function(){
		var menu = $('.xfixed');

		if (!menu.length) return; // no navigation available

		var dirty = false;
		var fixed = false;
		var lockTop = false;
		var lockBottom = false;
		var lastY = 0;
		var newTop = 0;
		var winHeight = $(window).height();
		var mainHeight = $('main').height();

		var menuBtn = $('<div id="dMenuIcon">&#x2630;</div>').click(function() {
			$('.xfixed').toggleClass('in');
		});

		var sidebar = {
			obj: menu.children('ul'),
			height: 0,
			pTop: 15,			/* padding-top */
			pBottom: 15			/* padding-bottom */
		};

		$('header > img').after(menuBtn);

		sidebar.height = sidebar.obj.outerHeight(true);

		var top = parseFloat(menu[0].offsetTop);

		function lcScrollHandler () {
			var y = $(this).scrollTop();
			// no scroll effect: content is smaller than navigation
			if (!dirty && (mainHeight <= sidebar.height + sidebar.pTop + sidebar.pBottom))
				return;

			if (dirty) {
				dirty = false;
				lastY = y+1;
			}
			if (y >= lastY) {
				// scrolling down
				if (!lockBottom && sidebar.height + sidebar.pTop + sidebar.pBottom <= winHeight) {
					newTop=0;
					sidebar.obj.addClass('fixed').css('top',(newTop)+'px');
					lockBottom=true;
				}
				if (!lockBottom && y + winHeight >= sidebar.height + top + newTop + sidebar.pTop + sidebar.pBottom && !fixed) {
					newTop = winHeight-sidebar.height-sidebar.pTop-sidebar.pBottom-top;
					sidebar.obj.addClass('fixed').css('top', newTop+'px');
					lockBottom=true;
				} else if (lockTop && (!lockBottom || (sidebar.height + top + sidebar.pTop + sidebar.pBottom) > winHeight)) {
					newTop = y;
					if (newTop < 0) newTop=0;
					sidebar.obj.removeClass('fixed').css('top', newTop+'px');
					lockTop = false;
					lockBottom = false;
				}
			} else if (y < lastY) {
				// scrolling up
				if (lockBottom && sidebar.height + sidebar.pTop + sidebar.pBottom > winHeight) {
					newTop = (winHeight-sidebar.height-sidebar.pTop-sidebar.pBottom-top);
					if (newTop < 0) newTop = 0;
					sidebar.obj.removeClass('fixed').css('top', newTop+'px');
					fixed=false;
					lockTop = false;
					lockBottom = false;
				} else if (!lockBottom && !lockTop && y < newTop) {
					sidebar.obj.addClass('fixed').css('top',(0)+'px');
					lockTop=true;
				}
			}
			lastY=y;
		}

		function lcResizeHandler () {
			winHeight = $(window).height();
			mainHeight = $('main').height();
			$(window).trigger("scroll");
		}

		function lcMenuHandler () {
			$(this)
				.toggleClass('closed')
				.next()
				.slideToggle(200, function() {
				   	sidebar.height = sidebar.obj.outerHeight(true);
				   	dirty=true;
				   	$(window).trigger("scroll");
				});
		}

		$(window)
			.resize(lcResizeHandler)
			.scroll(lcScrollHandler);

		$('body > nav > ul > li > span').click(lcMenuHandler);
	});

}(jQuery);

/* <EOF> ------------------------------------------------------------------ */
