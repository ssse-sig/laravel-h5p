var oldTether = window.Tether;
!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.Tether=e()}(this,function(t,e,o){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t){var e=getComputedStyle(t),o=e.position;if("fixed"===o)return t;for(var i=t;i=i.parentNode;){var n=void 0;try{n=getComputedStyle(i)}catch(r){}if("undefined"==typeof n||null===n)return i;var s=n.overflow,a=n.overflowX,f=n.overflowY;if(/(auto|scroll)/.test(s+f+a)&&("absolute"!==o||["relative","absolute","fixed"].indexOf(n.position)>=0))return i}return document.body}function r(t){var e=void 0;t===document?(e=document,t=document.documentElement):e=t.ownerDocument;var o=e.documentElement,i={},n=t.getBoundingClientRect();for(var r in n)i[r]=n[r];var s=x(e);return i.top-=s.top,i.left-=s.left,"undefined"==typeof i.width&&(i.width=document.body.scrollWidth-i.left-i.right),"undefined"==typeof i.height&&(i.height=document.body.scrollHeight-i.top-i.bottom),i.top=i.top-o.clientTop,i.left=i.left-o.clientLeft,i.right=e.body.clientWidth-i.width-i.left,i.bottom=e.body.clientHeight-i.height-i.top,i}function s(t){return t.offsetParent||document.documentElement}function a(){var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var e=document.createElement("div");f(e.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),e.appendChild(t),document.body.appendChild(e);var o=t.offsetWidth;e.style.overflow="scroll";var i=t.offsetWidth;o===i&&(i=e.clientWidth),document.body.removeChild(e);var n=o-i;return{width:n,height:n}}function f(){var t=void 0===arguments[0]?{}:arguments[0],e=[];return Array.prototype.push.apply(e,arguments),e.slice(1).forEach(function(e){if(e)for(var o in e)({}).hasOwnProperty.call(e,o)&&(t[o]=e[o])}),t}function h(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.remove(e)});else{var o=new RegExp("(^| )"+e.split(" ").join("|")+"( |$)","gi"),i=u(t).replace(o," ");p(t,i)}}function l(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.add(e)});else{h(t,e);var o=u(t)+(" "+e);p(t,o)}}function d(t,e){if("undefined"!=typeof t.classList)return t.classList.contains(e);var o=u(t);return new RegExp("(^| )"+e+"( |$)","gi").test(o)}function u(t){return t.className instanceof SVGAnimatedString?t.className.baseVal:t.className}function p(t,e){t.setAttribute("class",e)}function c(t,e,o){o.forEach(function(o){-1===e.indexOf(o)&&d(t,o)&&h(t,o)}),e.forEach(function(e){d(t,e)||l(t,e)})}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){var o=void 0===arguments[2]?1:arguments[2];return t+o>=e&&e>=t-o}function m(){return"undefined"!=typeof performance&&"undefined"!=typeof performance.now?performance.now():+new Date}function v(){for(var t={top:0,left:0},e=arguments.length,o=Array(e),i=0;e>i;i++)o[i]=arguments[i];return o.forEach(function(e){var o=e.top,i=e.left;"string"==typeof o&&(o=parseFloat(o,10)),"string"==typeof i&&(i=parseFloat(i,10)),t.top+=o,t.left+=i}),t}function y(t,e){return"string"==typeof t.left&&-1!==t.left.indexOf("%")&&(t.left=parseFloat(t.left,10)/100*e.width),"string"==typeof t.top&&-1!==t.top.indexOf("%")&&(t.top=parseFloat(t.top,10)/100*e.height),t}function b(t,e){return"scrollParent"===e?e=t.scrollParent:"window"===e&&(e=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),e===document&&(e=e.documentElement),"undefined"!=typeof e.nodeType&&!function(){var t=r(e),o=t,i=getComputedStyle(e);e=[o.left,o.top,t.width+o.left,t.height+o.top],U.forEach(function(t,o){t=t[0].toUpperCase()+t.substr(1),"Top"===t||"Left"===t?e[o]+=parseFloat(i["border"+t+"Width"]):e[o]-=parseFloat(i["border"+t+"Width"])})}(),e}var w=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}(),C=void 0;"undefined"==typeof C&&(C={modules:[]});var O=function(){var t=0;return function(){return++t}}(),E={},x=function(t){var e=t._tetherZeroElement;"undefined"==typeof e&&(e=t.createElement("div"),e.setAttribute("data-tether-id",O()),f(e.style,{top:0,left:0,position:"absolute"}),t.body.appendChild(e),t._tetherZeroElement=e);var o=e.getAttribute("data-tether-id");if("undefined"==typeof E[o]){E[o]={};var i=e.getBoundingClientRect();for(var n in i)E[o][n]=i[n];T(function(){delete E[o]})}return E[o]},A=[],T=function(t){A.push(t)},S=function(){for(var t=void 0;t=A.pop();)t()},W=function(){function t(){i(this,t)}return w(t,[{key:"on",value:function(t,e,o){var i=void 0===arguments[3]?!1:arguments[3];"undefined"==typeof this.bindings&&(this.bindings={}),"undefined"==typeof this.bindings[t]&&(this.bindings[t]=[]),this.bindings[t].push({handler:e,ctx:o,once:i})}},{key:"once",value:function(t,e,o){this.on(t,e,o,!0)}},{key:"off",value:function(t,e){if("undefined"==typeof this.bindings||"undefined"==typeof this.bindings[t])if("undefined"==typeof e)delete this.bindings[t];else for(var o=0;o<this.bindings[t].length;)this.bindings[t][o].handler===e?this.bindings[t].splice(o,1):++o}},{key:"trigger",value:function(t){if("undefined"!=typeof this.bindings&&this.bindings[t])for(var e=0;e<this.bindings[t].length;){var o=this.bindings[t][e],i=o.handler,n=o.ctx,r=o.once,s=n;"undefined"==typeof s&&(s=this);for(var a=arguments.length,f=Array(a>1?a-1:0),h=1;a>h;h++)f[h-1]=arguments[h];i.apply(s,f),r?this.bindings[t].splice(e,1):++e}}}]),t}();C.Utils={getScrollParent:n,getBounds:r,getOffsetParent:s,extend:f,addClass:l,removeClass:h,hasClass:d,updateClasses:c,defer:T,flush:S,uniqueId:O,Evented:W,getScrollBarSize:a};var M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),w=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}();if("undefined"==typeof C)throw new Error("You must include the utils.js file before tether.js");var P=C.Utils,n=P.getScrollParent,r=P.getBounds,s=P.getOffsetParent,f=P.extend,l=P.addClass,h=P.removeClass,c=P.updateClasses,T=P.defer,S=P.flush,a=P.getScrollBarSize,k=function(){for(var t=document.createElement("div"),e=["transform","webkitTransform","OTransform","MozTransform","msTransform"],o=0;o<e.length;++o){var i=e[o];if(void 0!==t.style[i])return i}}(),B=[],_=function(){B.forEach(function(t){t.position(!1)}),S()};!function(){var t=null,e=null,o=null,i=function n(){return"undefined"!=typeof e&&e>16?(e=Math.min(e-16,250),void(o=setTimeout(n,250))):void("undefined"!=typeof t&&m()-t<10||("undefined"!=typeof o&&(clearTimeout(o),o=null),t=m(),_(),e=m()-t))};["resize","scroll","touchmove"].forEach(function(t){window.addEventListener(t,i)})}();var z={center:"center",left:"right",right:"left"},F={middle:"middle",top:"bottom",bottom:"top"},L={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},Y=function(t,e){var o=t.left,i=t.top;return"auto"===o&&(o=z[e.left]),"auto"===i&&(i=F[e.top]),{left:o,top:i}},H=function(t){var e=t.left,o=t.top;return"undefined"!=typeof L[t.left]&&(e=L[t.left]),"undefined"!=typeof L[t.top]&&(o=L[t.top]),{left:e,top:o}},X=function(t){var e=t.split(" "),o=M(e,2),i=o[0],n=o[1];return{top:i,left:n}},j=X,N=function(){function t(e){var o=this;i(this,t),this.position=this.position.bind(this),B.push(this),this.history=[],this.setOptions(e,!1),C.modules.forEach(function(t){"undefined"!=typeof t.initialize&&t.initialize.call(o)}),this.position()}return w(t,[{key:"getClass",value:function(){var t=void 0===arguments[0]?"":arguments[0],e=this.options.classes;return"undefined"!=typeof e&&e[t]?this.options.classes[t]:this.options.classPrefix?this.options.classPrefix+"-"+t:t}},{key:"setOptions",value:function(t){var e=this,o=void 0===arguments[1]?!0:arguments[1],i={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"};this.options=f(i,t);var r=this.options,s=r.element,a=r.target,h=r.targetModifier;if(this.element=s,this.target=a,this.targetModifier=h,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(t){if("undefined"==typeof e[t])throw new Error("Tether Error: Both element and target must be defined");"undefined"!=typeof e[t].jquery?e[t]=e[t][0]:"string"==typeof e[t]&&(e[t]=document.querySelector(e[t]))}),l(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&l(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=j(this.options.targetAttachment),this.attachment=j(this.options.attachment),this.offset=X(this.options.offset),this.targetOffset=X(this.options.targetOffset),"undefined"!=typeof this.scrollParent&&this.disable(),this.scrollParent="scroll-handle"===this.targetModifier?this.target:n(this.target),this.options.enabled!==!1&&this.enable(o)}},{key:"getTargetBounds",value:function(){if("undefined"==typeof this.targetModifier)return r(this.target);if("visible"===this.targetModifier){if(this.target===document.body)return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth};var t=r(this.target),e={height:t.height,width:t.width,top:t.top,left:t.left};return e.height=Math.min(e.height,t.height-(pageYOffset-t.top)),e.height=Math.min(e.height,t.height-(t.top+t.height-(pageYOffset+innerHeight))),e.height=Math.min(innerHeight,e.height),e.height-=2,e.width=Math.min(e.width,t.width-(pageXOffset-t.left)),e.width=Math.min(e.width,t.width-(t.left+t.width-(pageXOffset+innerWidth))),e.width=Math.min(innerWidth,e.width),e.width-=2,e.top<pageYOffset&&(e.top=pageYOffset),e.left<pageXOffset&&(e.left=pageXOffset),e}if("scroll-handle"===this.targetModifier){var t=void 0,o=this.target;o===document.body?(o=document.documentElement,t={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):t=r(o);var i=getComputedStyle(o),n=o.scrollWidth>o.clientWidth||[i.overflow,i.overflowX].indexOf("scroll")>=0||this.target!==document.body,s=0;n&&(s=15);var a=t.height-parseFloat(i.borderTopWidth)-parseFloat(i.borderBottomWidth)-s,e={width:15,height:.975*a*(a/o.scrollHeight),left:t.left+t.width-parseFloat(i.borderLeftWidth)-15},f=0;408>a&&this.target===document.body&&(f=-11e-5*Math.pow(a,2)-.00727*a+22.58),this.target!==document.body&&(e.height=Math.max(e.height,24));var h=this.target.scrollTop/(o.scrollHeight-a);return e.top=h*(a-e.height-f)+t.top+parseFloat(i.borderTopWidth),this.target===document.body&&(e.height=Math.max(e.height,24)),e}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(t,e){return"undefined"==typeof this._cache&&(this._cache={}),"undefined"==typeof this._cache[t]&&(this._cache[t]=e.call(this)),this._cache[t]}},{key:"enable",value:function(){var t=void 0===arguments[0]?!0:arguments[0];this.options.addTargetClasses!==!1&&l(this.target,this.getClass("enabled")),l(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParent!==document&&this.scrollParent.addEventListener("scroll",this.position),t&&this.position()}},{key:"disable",value:function(){h(this.target,this.getClass("enabled")),h(this.element,this.getClass("enabled")),this.enabled=!1,"undefined"!=typeof this.scrollParent&&this.scrollParent.removeEventListener("scroll",this.position)}},{key:"destroy",value:function(){var t=this;this.disable(),B.forEach(function(e,o){return e===t?void B.splice(o,1):void 0})}},{key:"updateAttachClasses",value:function(t,e){var o=this;t=t||this.attachment,e=e||this.targetAttachment;var i=["left","top","bottom","right","middle","center"];"undefined"!=typeof this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),"undefined"==typeof this._addAttachClasses&&(this._addAttachClasses=[]);var n=this._addAttachClasses;t.top&&n.push(this.getClass("element-attached")+"-"+t.top),t.left&&n.push(this.getClass("element-attached")+"-"+t.left),e.top&&n.push(this.getClass("target-attached")+"-"+e.top),e.left&&n.push(this.getClass("target-attached")+"-"+e.left);var r=[];i.forEach(function(t){r.push(o.getClass("element-attached")+"-"+t),r.push(o.getClass("target-attached")+"-"+t)}),T(function(){"undefined"!=typeof o._addAttachClasses&&(c(o.element,o._addAttachClasses,r),o.options.addTargetClasses!==!1&&c(o.target,o._addAttachClasses,r),delete o._addAttachClasses)})}},{key:"position",value:function(){var t=this,e=void 0===arguments[0]?!0:arguments[0];if(this.enabled){this.clearCache();var o=Y(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,o);var i=this.cache("element-bounds",function(){return r(t.element)}),n=i.width,f=i.height;if(0===n&&0===f&&"undefined"!=typeof this.lastSize){var h=this.lastSize;n=h.width,f=h.height}else this.lastSize={width:n,height:f};var l=this.cache("target-bounds",function(){return t.getTargetBounds()}),d=l,u=y(H(this.attachment),{width:n,height:f}),p=y(H(o),d),c=y(this.offset,{width:n,height:f}),g=y(this.targetOffset,d);u=v(u,c),p=v(p,g);for(var m=l.left+p.left-u.left,b=l.top+p.top-u.top,w=0;w<C.modules.length;++w){var O=C.modules[w],E=O.position.call(this,{left:m,top:b,targetAttachment:o,targetPos:l,elementPos:i,offset:u,targetOffset:p,manualOffset:c,manualTargetOffset:g,scrollbarSize:A,attachment:this.attachment});if(E===!1)return!1;"undefined"!=typeof E&&"object"==typeof E&&(b=E.top,m=E.left)}var x={page:{top:b,left:m},viewport:{top:b-pageYOffset,bottom:pageYOffset-b-f+innerHeight,left:m-pageXOffset,right:pageXOffset-m-n+innerWidth}},A=void 0;return document.body.scrollWidth>window.innerWidth&&(A=this.cache("scrollbar-size",a),x.viewport.bottom-=A.height),document.body.scrollHeight>window.innerHeight&&(A=this.cache("scrollbar-size",a),x.viewport.right-=A.width),(-1===["","static"].indexOf(document.body.style.position)||-1===["","static"].indexOf(document.body.parentElement.style.position))&&(x.page.bottom=document.body.scrollHeight-b-f,x.page.right=document.body.scrollWidth-m-n),"undefined"!=typeof this.options.optimizations&&this.options.optimizations.moveElement!==!1&&"undefined"==typeof this.targetModifier&&!function(){var e=t.cache("target-offsetparent",function(){return s(t.target)}),o=t.cache("target-offsetparent-bounds",function(){return r(e)}),i=getComputedStyle(e),n=o,a={};if(["Top","Left","Bottom","Right"].forEach(function(t){a[t.toLowerCase()]=parseFloat(i["border"+t+"Width"])}),o.right=document.body.scrollWidth-o.left-n.width+a.right,o.bottom=document.body.scrollHeight-o.top-n.height+a.bottom,x.page.top>=o.top+a.top&&x.page.bottom>=o.bottom&&x.page.left>=o.left+a.left&&x.page.right>=o.right){var f=e.scrollTop,h=e.scrollLeft;x.offset={top:x.page.top-o.top+f-a.top,left:x.page.left-o.left+h-a.left}}}(),this.move(x),this.history.unshift(x),this.history.length>3&&this.history.pop(),e&&S(),!0}}},{key:"move",value:function(t){var e=this;if("undefined"!=typeof this.element.parentNode){var o={};for(var i in t){o[i]={};for(var n in t[i]){for(var r=!1,a=0;a<this.history.length;++a){var h=this.history[a];if("undefined"!=typeof h[i]&&!g(h[i][n],t[i][n])){r=!0;break}}r||(o[i][n]=!0)}}var l={top:"",left:"",right:"",bottom:""},d=function(t,o){var i="undefined"!=typeof e.options.optimizations,n=i?e.options.optimizations.gpu:null;if(n!==!1){var r=void 0,s=void 0;t.top?(l.top=0,r=o.top):(l.bottom=0,r=-o.bottom),t.left?(l.left=0,s=o.left):(l.right=0,s=-o.right),l[k]="translateX("+Math.round(s)+"px) translateY("+Math.round(r)+"px)","msTransform"!==k&&(l[k]+=" translateZ(0)")}else t.top?l.top=o.top+"px":l.bottom=o.bottom+"px",t.left?l.left=o.left+"px":l.right=o.right+"px"},u=!1;(o.page.top||o.page.bottom)&&(o.page.left||o.page.right)?(l.position="absolute",d(o.page,t.page)):(o.viewport.top||o.viewport.bottom)&&(o.viewport.left||o.viewport.right)?(l.position="fixed",d(o.viewport,t.viewport)):"undefined"!=typeof o.offset&&o.offset.top&&o.offset.left?!function(){l.position="absolute";var i=e.cache("target-offsetparent",function(){return s(e.target)});s(e.element)!==i&&T(function(){e.element.parentNode.removeChild(e.element),i.appendChild(e.element)}),d(o.offset,t.offset),u=!0}():(l.position="absolute",d({top:!0,left:!0},t.page)),u||"BODY"===this.element.parentNode.tagName||(this.element.parentNode.removeChild(this.element),document.body.appendChild(this.element));var p={},c=!1;for(var n in l){var m=l[n],v=this.element.style[n];""!==v&&""!==m&&["top","left","bottom","right"].indexOf(n)>=0&&(v=parseFloat(v),m=parseFloat(m)),v!==m&&(c=!0,p[n]=m)}c&&T(function(){f(e.element.style,p)})}}}]),t}();N.modules=[],C.position=_;var R=f(N,C),M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),P=C.Utils,r=P.getBounds,f=P.extend,c=P.updateClasses,T=P.defer,U=["left","top","right","bottom"];C.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=t.targetAttachment;if(!this.options.constraints)return!0;var s=this.cache("element-bounds",function(){return r(e.element)}),a=s.height,h=s.width;if(0===h&&0===a&&"undefined"!=typeof this.lastSize){var l=this.lastSize;h=l.width,a=l.height}var d=this.cache("target-bounds",function(){return e.getTargetBounds()}),u=d.height,p=d.width,g=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(t){var e=t.outOfBoundsClass,o=t.pinnedClass;e&&g.push(e),o&&g.push(o)}),g.forEach(function(t){["left","top","right","bottom"].forEach(function(e){g.push(t+"-"+e)})});var m=[],v=f({},n),y=f({},this.attachment);return this.options.constraints.forEach(function(t){var r=t.to,s=t.attachment,f=t.pin;"undefined"==typeof s&&(s="");var l=void 0,d=void 0;if(s.indexOf(" ")>=0){var c=s.split(" "),g=M(c,2);d=g[0],l=g[1]}else l=d=s;var w=b(e,r);("target"===d||"both"===d)&&(o<w[1]&&"top"===v.top&&(o+=u,v.top="bottom"),o+a>w[3]&&"bottom"===v.top&&(o-=u,v.top="top")),"together"===d&&(o<w[1]&&"top"===v.top&&("bottom"===y.top?(o+=u,v.top="bottom",o+=a,y.top="top"):"top"===y.top&&(o+=u,v.top="bottom",o-=a,y.top="bottom")),o+a>w[3]&&"bottom"===v.top&&("top"===y.top?(o-=u,v.top="top",o-=a,y.top="bottom"):"bottom"===y.top&&(o-=u,v.top="top",o+=a,y.top="top")),"middle"===v.top&&(o+a>w[3]&&"top"===y.top?(o-=a,y.top="bottom"):o<w[1]&&"bottom"===y.top&&(o+=a,y.top="top"))),("target"===l||"both"===l)&&(i<w[0]&&"left"===v.left&&(i+=p,v.left="right"),i+h>w[2]&&"right"===v.left&&(i-=p,v.left="left")),"together"===l&&(i<w[0]&&"left"===v.left?"right"===y.left?(i+=p,v.left="right",i+=h,y.left="left"):"left"===y.left&&(i+=p,v.left="right",i-=h,y.left="right"):i+h>w[2]&&"right"===v.left?"left"===y.left?(i-=p,v.left="left",i-=h,y.left="right"):"right"===y.left&&(i-=p,v.left="left",i+=h,y.left="left"):"center"===v.left&&(i+h>w[2]&&"left"===y.left?(i-=h,y.left="right"):i<w[0]&&"right"===y.left&&(i+=h,y.left="left"))),("element"===d||"both"===d)&&(o<w[1]&&"bottom"===y.top&&(o+=a,y.top="top"),o+a>w[3]&&"top"===y.top&&(o-=a,y.top="bottom")),("element"===l||"both"===l)&&(i<w[0]&&"right"===y.left&&(i+=h,y.left="left"),i+h>w[2]&&"left"===y.left&&(i-=h,y.left="right")),"string"==typeof f?f=f.split(",").map(function(t){return t.trim()}):f===!0&&(f=["top","left","right","bottom"]),f=f||[];var C=[],O=[];o<w[1]&&(f.indexOf("top")>=0?(o=w[1],C.push("top")):O.push("top")),o+a>w[3]&&(f.indexOf("bottom")>=0?(o=w[3]-a,C.push("bottom")):O.push("bottom")),i<w[0]&&(f.indexOf("left")>=0?(i=w[0],C.push("left")):O.push("left")),i+h>w[2]&&(f.indexOf("right")>=0?(i=w[2]-h,C.push("right")):O.push("right")),C.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.pinnedClass?e.options.pinnedClass:e.getClass("pinned"),m.push(t),C.forEach(function(e){m.push(t+"-"+e)})}(),O.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.outOfBoundsClass?e.options.outOfBoundsClass:e.getClass("out-of-bounds"),m.push(t),O.forEach(function(e){m.push(t+"-"+e)})}(),(C.indexOf("left")>=0||C.indexOf("right")>=0)&&(y.left=v.left=!1),(C.indexOf("top")>=0||C.indexOf("bottom")>=0)&&(y.top=v.top=!1),(v.top!==n.top||v.left!==n.left||y.top!==e.attachment.top||y.left!==e.attachment.left)&&e.updateAttachClasses(y,v)}),T(function(){e.options.addTargetClasses!==!1&&c(e.target,m,g),c(e.element,m,g)}),{top:o,left:i}}});var P=C.Utils,r=P.getBounds,c=P.updateClasses,T=P.defer;C.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=this.cache("element-bounds",function(){return r(e.element)}),s=n.height,a=n.width,f=this.getTargetBounds(),h=o+s,l=i+a,d=[];o<=f.bottom&&h>=f.top&&["left","right"].forEach(function(t){var e=f[t];(e===i||e===l)&&d.push(t)}),i<=f.right&&l>=f.left&&["top","bottom"].forEach(function(t){var e=f[t];(e===o||e===h)&&d.push(t)});var u=[],p=[],g=["left","top","right","bottom"];return u.push(this.getClass("abutted")),g.forEach(function(t){u.push(e.getClass("abutted")+"-"+t)}),d.length&&p.push(this.getClass("abutted")),d.forEach(function(t){p.push(e.getClass("abutted")+"-"+t)}),T(function(){e.options.addTargetClasses!==!1&&c(e.target,p,u),c(e.element,p,u)}),!0}});var M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();return C.modules.push({position:function(t){var e=t.top,o=t.left;if(this.options.shift){var i=this.options.shift;"function"==typeof this.options.shift&&(i=this.options.shift.call(this,{top:e,left:o}));var n=void 0,r=void 0;if("string"==typeof i){i=i.split(" "),i[1]=i[1]||i[0];var s=M(i,2);n=s[0],r=s[1],n=parseFloat(n,10),r=parseFloat(r,10)}else n=i.top,r=i.left;return e+=n,o+=r,{top:e,left:o}}}}),R});
H5P.Tether = Tether;
window.Tether = oldTether;
;
var oldDrop = window.Drop;
var oldTether = window.Tether;
Tether = H5P.Tether;
!function(t,e){"function"==typeof define&&define.amd?define(["tether"],e):"object"==typeof exports?module.exports=e(require("tether")):t.Drop=e(t.Tether)}(this,function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function o(t){var e=t.split(" "),n=a(e,2),o=n[0],i=n[1];if(["left","right"].indexOf(o)>=0){var s=[i,o];o=s[0],i=s[1]}return[o,i].join(" ")}function i(t,e){for(var n=void 0,o=[];-1!==(n=t.indexOf(e));)o.push(t.splice(n,1));return o}function s(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],u=function(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return new(r.apply(b,[null].concat(e)))};p(u,{createContext:s,drops:[],defaults:{}});var g={classPrefix:"drop",defaults:{position:"bottom left",openOn:"click",beforeClose:null,constrainToScrollParent:!0,constrainToWindow:!0,classes:"",remove:!1,tetherOptions:{}}};p(u,g,a),p(u.defaults,g.defaults,a.defaults),"undefined"==typeof x[u.classPrefix]&&(x[u.classPrefix]=[]),u.updateBodyClasses=function(){for(var t=!1,e=x[u.classPrefix],n=e.length,o=0;n>o;++o)if(e[o].isOpened()){t=!0;break}t?d(document.body,u.classPrefix+"-open"):c(document.body,u.classPrefix+"-open")};var b=function(s){function r(t){if(e(this,r),l(Object.getPrototypeOf(r.prototype),"constructor",this).call(this),this.options=p({},u.defaults,t),this.target=this.options.target,"undefined"==typeof this.target)throw new Error("Drop Error: You must provide a target.");var n="data-"+u.classPrefix,o=this.target.getAttribute(n);o&&(this.options.content=o);for(var i=["position","openOn"],s=0;s<i.length;++s){var a=this.target.getAttribute(n+"-"+i[s]);a&&(this.options[i[s]]=a)}this.options.classes&&this.options.addTargetClasses!==!1&&d(this.target,this.options.classes),u.drops.push(this),x[u.classPrefix].push(this),this._boundEvents=[],this.bindMethods(),this.setupElements(),this.setupEvents(),this.setupTether()}return n(r,s),h(r,[{key:"_on",value:function(t,e,n){this._boundEvents.push({element:t,event:e,handler:n}),t.addEventListener(e,n)}},{key:"bindMethods",value:function(){this.transitionEndHandler=this._transitionEndHandler.bind(this)}},{key:"setupElements",value:function(){var t=this;if(this.drop=document.createElement("div"),d(this.drop,u.classPrefix),this.options.classes&&d(this.drop,this.options.classes),this.content=document.createElement("div"),d(this.content,u.classPrefix+"-content"),"function"==typeof this.options.content){var e=function(){var e=t.options.content.call(t,t);if("string"==typeof e)t.content.innerHTML=e;else{if("object"!=typeof e)throw new Error("Drop Error: Content function should return a string or HTMLElement.");t.content.innerHTML="",t.content.appendChild(e)}};e(),this.on("open",e.bind(this))}else"object"==typeof this.options.content?this.content.appendChild(this.options.content):this.content.innerHTML=this.options.content;this.drop.appendChild(this.content)}},{key:"setupTether",value:function(){var e=this.options.position.split(" ");e[0]=E[e[0]],e=e.join(" ");var n=[];this.options.constrainToScrollParent?n.push({to:"scrollParent",pin:"top, bottom",attachment:"together none"}):n.push({to:"scrollParent"}),this.options.constrainToWindow!==!1?n.push({to:"window",attachment:"together"}):n.push({to:"window"});var i={element:this.drop,target:this.target,attachment:o(e),targetAttachment:o(this.options.position),classPrefix:u.classPrefix,offset:"0 0",targetOffset:"0 0",enabled:!1,constraints:n,addTargetClasses:this.options.addTargetClasses};this.options.tetherOptions!==!1&&(this.tether=new t(p({},i,this.options.tetherOptions)))}},{key:"setupEvents",value:function(){var t=this;if(this.options.openOn){if("always"===this.options.openOn)return void setTimeout(this.open.bind(this));var e=this.options.openOn.split(" ");if(e.indexOf("click")>=0)for(var n=function(e){t.toggle(e),e.preventDefault()},o=function(e){t.isOpened()&&(e.target===t.drop||t.drop.contains(e.target)||e.target===t.target||t.target.contains(e.target)||t.close(e))},i=0;i<y.length;++i){var s=y[i];this._on(this.target,s,n),this._on(document,s,o)}var r=!1,a=null,h=function(e){r=!0,t.open(e)},l=function(e){r=!1,"undefined"!=typeof a&&clearTimeout(a),a=setTimeout(function(){r||t.close(e),a=null},50)};e.indexOf("hover")>=0&&(this._on(this.target,"mouseover",h),this._on(this.drop,"mouseover",h),this._on(this.target,"mouseout",l),this._on(this.drop,"mouseout",l)),e.indexOf("focus")>=0&&(this._on(this.target,"focus",h),this._on(this.drop,"focus",h),this._on(this.target,"blur",l),this._on(this.drop,"blur",l))}}},{key:"isOpened",value:function(){return this.drop?f(this.drop,u.classPrefix+"-open"):void 0}},{key:"toggle",value:function(t){this.isOpened()?this.close(t):this.open(t)}},{key:"open",value:function(t){var e=this;this.isOpened()||(this.drop.parentNode||document.body.appendChild(this.drop),"undefined"!=typeof this.tether&&this.tether.enable(),d(this.drop,u.classPrefix+"-open"),d(this.drop,u.classPrefix+"-open-transitionend"),setTimeout(function(){e.drop&&d(e.drop,u.classPrefix+"-after-open")}),"undefined"!=typeof this.tether&&this.tether.position(),this.trigger("open"),u.updateBodyClasses())}},{key:"_transitionEndHandler",value:function(t){t.target===t.currentTarget&&(f(this.drop,u.classPrefix+"-open")||c(this.drop,u.classPrefix+"-open-transitionend"),this.drop.removeEventListener(m,this.transitionEndHandler))}},{key:"beforeCloseHandler",value:function(t){var e=!0;return this.isClosing||"function"!=typeof this.options.beforeClose||(this.isClosing=!0,e=this.options.beforeClose(t,this)!==!1),this.isClosing=!1,e}},{key:"close",value:function(t){this.isOpened()&&this.beforeCloseHandler(t)&&(c(this.drop,u.classPrefix+"-open"),c(this.drop,u.classPrefix+"-after-open"),this.drop.addEventListener(m,this.transitionEndHandler),this.trigger("close"),"undefined"!=typeof this.tether&&this.tether.disable(),u.updateBodyClasses(),this.options.remove&&this.remove(t))}},{key:"remove",value:function(t){this.close(t),this.drop.parentNode&&this.drop.parentNode.removeChild(this.drop)}},{key:"position",value:function(){this.isOpened()&&"undefined"!=typeof this.tether&&this.tether.position()}},{key:"destroy",value:function(){this.remove(),"undefined"!=typeof this.tether&&this.tether.destroy();for(var t=0;t<this._boundEvents.length;++t){var e=this._boundEvents[t],n=e.element,o=e.event,s=e.handler;n.removeEventListener(o,s)}this._boundEvents=[],this.tether=null,this.drop=null,this.content=null,this.target=null,i(x[u.classPrefix],this),i(u.drops,this)}}]),r}(v);return u}var r=Function.prototype.bind,a=function(){function t(t,e){var n=[],o=!0,i=!1,s=void 0;try{for(var r,a=t[Symbol.iterator]();!(o=(r=a.next()).done)&&(n.push(r.value),!e||n.length!==e);o=!0);}catch(h){i=!0,s=h}finally{try{!o&&a["return"]&&a["return"]()}finally{if(i)throw s}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),h=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),l=function(t,e,n){for(var o=!0;o;){var i=t,s=e,r=n;a=l=h=void 0,o=!1,null===i&&(i=Function.prototype);var a=Object.getOwnPropertyDescriptor(i,s);if(void 0!==a){if("value"in a)return a.value;var h=a.get;return void 0===h?void 0:h.call(r)}var l=Object.getPrototypeOf(i);if(null===l)return void 0;t=l,e=s,n=r,o=!0}},u=t.Utils,p=u.extend,d=u.addClass,c=u.removeClass,f=u.hasClass,v=u.Evented,y=["click"];"ontouchstart"in document.documentElement&&y.push("touchstart");var g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"},m="";for(var b in g)if({}.hasOwnProperty.call(g,b)){var O=document.createElement("p");"undefined"!=typeof O.style[b]&&(m=g[b])}var E={left:"right",right:"left",top:"bottom",bottom:"top",middle:"middle",center:"center"},x={},P=s();return document.addEventListener("DOMContentLoaded",function(){P.updateBodyClasses()}),P});
H5P.Drop = Drop;
window.Drop = oldDrop;
window.Tether = oldTether;
;
var H5P = H5P || {};
/**
 * Transition contains helper function relevant for transitioning
 */
H5P.Transition = (function ($) {

  /**
   * @class
   * @namespace H5P
   */
  Transition = {};

  /**
   * @private
   */
  Transition.transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'transition':       'transitionend',
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  /**
   * @private
   */
  Transition.cache = [];

  /**
   * Get the vendor property name for an event
   *
   * @function H5P.Transition.getVendorPropertyName
   * @static
   * @private
   * @param  {string} prop Generic property name
   * @return {string}      Vendor specific property name
   */
  Transition.getVendorPropertyName = function (prop) {

    if (Transition.cache[prop] !== undefined) {
      return Transition.cache[prop];
    }

    var div = document.createElement('div');

    // Handle unprefixed versions (FF16+, for example)
    if (prop in div.style) {
      Transition.cache[prop] = prop;
    }
    else {
      var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
      var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

      if (prop in div.style) {
        Transition.cache[prop] = prop;
      }
      else {
        for (var i = 0; i < prefixes.length; ++i) {
          var vendorProp = prefixes[i] + prop_;
          if (vendorProp in div.style) {
            Transition.cache[prop] = vendorProp;
            break;
          }
        }
      }
    }

    return Transition.cache[prop];
  };

  /**
   * Get the name of the transition end event
   *
   * @static
   * @private
   * @return {string}  description
   */
  Transition.getTransitionEndEventName = function () {
    return Transition.transitionEndEventNames[Transition.getVendorPropertyName('transition')] || undefined;
  };

  /**
   * Helper function for listening on transition end events
   *
   * @function H5P.Transition.onTransitionEnd
   * @static
   * @param  {domElement} $element The element which is transitioned
   * @param  {function} callback The callback to be invoked when transition is finished
   * @param  {number} timeout  Timeout in milliseconds. Fallback if transition event is never fired
   */
  Transition.onTransitionEnd = function ($element, callback, timeout) {
    // Fallback on 1 second if transition event is not supported/triggered
    timeout = timeout || 1000;
    Transition.transitionEndEventName = Transition.transitionEndEventName || Transition.getTransitionEndEventName();
    var callbackCalled = false;

    var doCallback = function () {
      if (callbackCalled) {
        return;
      }
      $element.off(Transition.transitionEndEventName, callback);
      callbackCalled = true;
      clearTimeout(timer);
      callback();
    };

    var timer = setTimeout(function () {
      doCallback();
    }, timeout);

    $element.on(Transition.transitionEndEventName, function () {
      doCallback();
    });
  };

  /**
   * Wait for a transition - when finished, invokes next in line
   *
   * @private
   *
   * @param {Object[]}    transitions             Array of transitions
   * @param {H5P.jQuery}  transitions[].$element  Dom element transition is performed on
   * @param {number=}     transitions[].timeout   Timeout fallback if transition end never is triggered
   * @param {bool=}       transitions[].break     If true, sequence breaks after this transition
   * @param {number}      index                   The index for current transition
   */
  var runSequence = function (transitions, index) {
    if (index >= transitions.length) {
      return;
    }

    var transition = transitions[index];
    H5P.Transition.onTransitionEnd(transition.$element, function () {
      if (transition.end) {
        transition.end();
      }
      if (transition.break !== true) {
        runSequence(transitions, index+1);
      }
    }, transition.timeout || undefined);
  };

  /**
   * Run a sequence of transitions
   *
   * @function H5P.Transition.sequence
   * @static
   * @param {Object[]}    transitions             Array of transitions
   * @param {H5P.jQuery}  transitions[].$element  Dom element transition is performed on
   * @param {number=}     transitions[].timeout   Timeout fallback if transition end never is triggered
   * @param {bool=}       transitions[].break     If true, sequence breaks after this transition
   */
  Transition.sequence = function (transitions) {
    runSequence(transitions, 0);
  };

  return Transition;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * Class responsible for creating a help text dialog
 */
H5P.JoubelHelpTextDialog = (function ($) {

  var numInstances = 0;
  /**
   * Display a pop-up containing a message.
   *
   * @param {H5P.jQuery}  $container  The container which message dialog will be appended to
   * @param {string}      message     The message
   * @param {string}      closeButtonTitle The title for the close button
   * @return {H5P.jQuery}
   */
  function JoubelHelpTextDialog(header, message, closeButtonTitle) {
    H5P.EventDispatcher.call(this);

    var self = this;

    numInstances++;
    var headerId = 'joubel-help-text-header-' + numInstances;
    var helpTextId = 'joubel-help-text-body-' + numInstances;

    var $helpTextDialogBox = $('<div>', {
      'class': 'joubel-help-text-dialog-box',
      'role': 'dialog',
      'aria-labelledby': headerId,
      'aria-describedby': helpTextId
    });

    $('<div>', {
      'class': 'joubel-help-text-dialog-background'
    }).appendTo($helpTextDialogBox);

    var $helpTextDialogContainer = $('<div>', {
      'class': 'joubel-help-text-dialog-container'
    }).appendTo($helpTextDialogBox);

    $('<div>', {
      'class': 'joubel-help-text-header',
      'id': headerId,
      'role': 'header',
      'html': header
    }).appendTo($helpTextDialogContainer);

    $('<div>', {
      'class': 'joubel-help-text-body',
      'id': helpTextId,
      'html': message,
      'role': 'document',
      'tabindex': 0
    }).appendTo($helpTextDialogContainer);

    var handleClose = function () {
      $helpTextDialogBox.remove();
      self.trigger('closed');
    };

    var $closeButton = $('<div>', {
      'class': 'joubel-help-text-remove',
      'role': 'button',
      'title': closeButtonTitle,
      'tabindex': 1,
      'click': handleClose,
      'keydown': function (event) {
        // 32 - space, 13 - enter
        if ([32, 13].indexOf(event.which) !== -1) {
          event.preventDefault();
          handleClose();
        }
      }
    }).appendTo($helpTextDialogContainer);

    /**
     * Get the DOM element
     * @return {HTMLElement}
     */
    self.getElement = function () {
      return $helpTextDialogBox;
    };

    self.focus = function () {
      $closeButton.focus();
    };
  }

  JoubelHelpTextDialog.prototype = Object.create(H5P.EventDispatcher.prototype);
  JoubelHelpTextDialog.prototype.constructor = JoubelHelpTextDialog;

  return JoubelHelpTextDialog;
}(H5P.jQuery));
;
var H5P = H5P || {};

/**
 * Class responsible for creating auto-disappearing dialogs
 */
H5P.JoubelMessageDialog = (function ($) {

  /**
   * Display a pop-up containing a message.
   *
   * @param {H5P.jQuery} $container The container which message dialog will be appended to
   * @param {string} message The message
   * @return {H5P.jQuery}
   */
  function JoubelMessageDialog ($container, message) {
    var timeout;

    var removeDialog = function () {
      $warning.remove();
      clearTimeout(timeout);
      $container.off('click.messageDialog');
    };

    // Create warning popup:
    var $warning = $('<div/>', {
      'class': 'joubel-message-dialog',
      text: message
    }).appendTo($container);

    // Remove after 3 seconds or if user clicks anywhere in $container:
    timeout = setTimeout(removeDialog, 3000);
    $container.on('click.messageDialog', removeDialog);

    return $warning;
  }

  return JoubelMessageDialog;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * Class responsible for creating a circular progress bar
 */

H5P.JoubelProgressCircle = (function ($) {

  /**
   * Constructor for the Progress Circle
   *
   * @param {Number} number The amount of progress to display
   * @param {string} progressColor Color for the progress meter
   * @param {string} backgroundColor Color behind the progress meter
   */
  function ProgressCircle(number, progressColor, fillColor, backgroundColor) {
    progressColor = progressColor || '#1a73d9';
    fillColor = fillColor || '#f0f0f0';
    backgroundColor = backgroundColor || '#ffffff';
    var progressColorRGB = this.hexToRgb(progressColor);

    //Verify number
    try {
      number = Number(number);
      if (number === '') {
        throw 'is empty';
      }
      if (isNaN(number)) {
        throw 'is not a number';
      }
    } catch (e) {
      number = 'err';
    }

    //Draw circle
    if (number > 100) {
      number = 100;
    }

    // We can not use rgba, since they will stack on top of each other.
    // Instead we create the equivalent of the rgba color
    // and applies this to the activeborder and background color.
    var progressColorString = 'rgb(' + parseInt(progressColorRGB.r, 10) +
      ',' + parseInt(progressColorRGB.g, 10) +
      ',' + parseInt(progressColorRGB.b, 10) + ')';

    // Circle wrapper
    var $wrapper = $('<div/>', {
      'class': "joubel-progress-circle-wrapper"
    });

    //Active border indicates progress
    var $activeBorder = $('<div/>', {
      'class': "joubel-progress-circle-active-border"
    }).appendTo($wrapper);

    //Background circle
    var $backgroundCircle = $('<div/>', {
      'class': "joubel-progress-circle-circle"
    }).appendTo($activeBorder);

    //Progress text/number
    $('<span/>', {
      'text': number + '%',
      'class': "joubel-progress-circle-percentage"
    }).appendTo($backgroundCircle);

    var deg = number * 3.6;
    if (deg <= 180) {
      $activeBorder.css('background-image',
        'linear-gradient(' + (90 + deg) + 'deg, transparent 50%, ' + fillColor + ' 50%),' +
        'linear-gradient(90deg, ' + fillColor + ' 50%, transparent 50%)')
        .css('border', '2px solid' + backgroundColor)
        .css('background-color', progressColorString);
    } else {
      $activeBorder.css('background-image',
        'linear-gradient(' + (deg - 90) + 'deg, transparent 50%, ' + progressColorString + ' 50%),' +
        'linear-gradient(90deg, ' + fillColor + ' 50%, transparent 50%)')
        .css('border', '2px solid' + backgroundColor)
        .css('background-color', progressColorString);
    }

    this.$activeBorder = $activeBorder;
    this.$backgroundCircle = $backgroundCircle;
    this.$wrapper = $wrapper;

    this.initResizeFunctionality();

    return $wrapper;
  }

  /**
   * Initializes resize functionality for the progress circle
   */
  ProgressCircle.prototype.initResizeFunctionality = function () {
    var self = this;

    $(window).resize(function () {
      // Queue resize
      setTimeout(function () {
        self.resize();
      });
    });

    // First resize
    setTimeout(function () {
      self.resize();
    }, 0);
  };

  /**
   * Resize function makes progress circle grow or shrink relative to parent container
   */
  ProgressCircle.prototype.resize = function () {
    var $parent = this.$wrapper.parent();

    if ($parent !== undefined && $parent) {

      // Measurements
      var fontSize = parseInt($parent.css('font-size'), 10);

      // Static sizes
      var fontSizeMultiplum = 3.75;
      var progressCircleWidthPx = parseInt((fontSize / 4.5), 10) % 2 === 0 ? parseInt((fontSize / 4.5), 10) + 4 : parseInt((fontSize / 4.5), 10) + 5;
      var progressCircleOffset = progressCircleWidthPx / 2;

      var width = fontSize * fontSizeMultiplum;
      var height = fontSize * fontSizeMultiplum;
      this.$activeBorder.css({
        'width': width,
        'height': height
      });

      this.$backgroundCircle.css({
        'width': width - progressCircleWidthPx,
        'height': height - progressCircleWidthPx,
        'top': progressCircleOffset,
        'left': progressCircleOffset
      });
    }
  };

  /**
   * Hex to RGB conversion
   * @param hex
   * @returns {{r: Number, g: Number, b: Number}}
   */
  ProgressCircle.prototype.hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  return ProgressCircle;

}(H5P.jQuery));
;
var H5P = H5P || {};

H5P.SimpleRoundedButton = (function ($) {

  /**
   * Creates a new tip
   */
  function SimpleRoundedButton(text) {

    var $simpleRoundedButton = $('<div>', {
      'class': 'joubel-simple-rounded-button',
      'title': text,
      'role': 'button',
      'tabindex': '0'
    }).keydown(function (e) {
      // 32 - space, 13 - enter
      if ([32, 13].indexOf(e.which) !== -1) {
        $(this).click();
        e.preventDefault();
      }
    });

    $('<span>', {
      'class': 'joubel-simple-rounded-button-text',
      'html': text
    }).appendTo($simpleRoundedButton);

    return $simpleRoundedButton;
  }

  return SimpleRoundedButton;
}(H5P.jQuery));
;
var H5P = H5P || {};

/**
 * Class responsible for creating speech bubbles
 */
H5P.JoubelSpeechBubble = (function ($) {

  var $currentSpeechBubble;
  var $currentContainer;  
  var $tail;
  var $innerTail;
  var removeSpeechBubbleTimeout;
  var currentMaxWidth;

  var DEFAULT_MAX_WIDTH = 400;

  var iDevice = navigator.userAgent.match(/iPod|iPhone|iPad/g) ? true : false;

  /**
   * Creates a new speech bubble
   *
   * @param {H5P.jQuery} $container The speaking object
   * @param {string} text The text to display
   * @param {number} maxWidth The maximum width of the bubble
   * @return {H5P.JoubelSpeechBubble}
   */
  function JoubelSpeechBubble($container, text, maxWidth) {
    maxWidth = maxWidth || DEFAULT_MAX_WIDTH;
    currentMaxWidth = maxWidth;
    $currentContainer = $container;

    this.isCurrent = function ($tip) {
      return $tip.is($currentContainer);
    };

    this.remove = function () {
      remove();
    };

    var fadeOutSpeechBubble = function ($speechBubble) {
      if (!$speechBubble) {
        return;
      }

      // Stop removing bubble
      clearTimeout(removeSpeechBubbleTimeout);

      $speechBubble.removeClass('show');
      setTimeout(function () {
        if ($speechBubble) {
          $speechBubble.remove();
          $speechBubble = undefined;
        }
      }, 500);
    };

    if ($currentSpeechBubble !== undefined) {
      remove();
    }

    var $h5pContainer = getH5PContainer($container);

    // Make sure we fade out old speech bubble
    fadeOutSpeechBubble($currentSpeechBubble);

    // Create bubble
    $tail = $('<div class="joubel-speech-bubble-tail"></div>');
    $innerTail = $('<div class="joubel-speech-bubble-inner-tail"></div>');
    var $innerBubble = $(
      '<div class="joubel-speech-bubble-inner">' +
      '<div class="joubel-speech-bubble-text">' + text + '</div>' +
      '</div>'
    ).prepend($innerTail);

    $currentSpeechBubble = $(
      '<div class="joubel-speech-bubble" aria-live="assertive">'
    ).append([$tail, $innerBubble])
      .appendTo($h5pContainer);

    // Show speech bubble with transition
    setTimeout(function () {
      $currentSpeechBubble.addClass('show');
    }, 0);

    position($currentSpeechBubble, $currentContainer, maxWidth, $tail, $innerTail);

    // Handle click to close
    H5P.$body.on('mousedown.speechBubble', handleOutsideClick);

    // Handle window resizing
    H5P.$window.on('resize', '', handleResize);

    // Handle clicks when inside IV which blocks bubbling.
    $container.parents('.h5p-dialog')
      .on('mousedown.speechBubble', handleOutsideClick);

    if (iDevice) {
      H5P.$body.css('cursor', 'pointer');
    }

    return this;
  }

  // Remove speechbubble if it belongs to a dom element that is about to be hidden
  H5P.externalDispatcher.on('domHidden', function (event) {
    if ($currentSpeechBubble !== undefined && event.data.$dom.find($currentContainer).length !== 0) {
      remove();
    }
  });

  /**
   * Returns the closest h5p container for the given DOM element.
   * 
   * @param {object} $container jquery element
   * @return {object} the h5p container (jquery element)
   */
  function getH5PContainer($container) {
    var $h5pContainer = $container.closest('.h5p-frame');

    // Check closest h5p frame first, then check for container in case there is no frame.
    if (!$h5pContainer.length) {
      $h5pContainer = $container.closest('.h5p-container');
    }

    return $h5pContainer;
  }

  /**
   * Event handler that is called when the window is resized.
   */
  function handleResize() {
    position($currentSpeechBubble, $currentContainer, currentMaxWidth, $tail, $innerTail);
  }

  /**
   * Repositions the speech bubble according to the position of the container.
   * 
   * @param {object} $currentSpeechbubble the speech bubble that should be positioned   
   * @param {object} $container the container to which the speech bubble should point 
   * @param {number} maxWidth the maximum width of the speech bubble
   * @param {object} $tail the tail (the triangle that points to the referenced container)
   * @param {object} $innerTail the inner tail (the triangle that points to the referenced container)
   */
  function position($currentSpeechBubble, $container, maxWidth, $tail, $innerTail) {
    var $h5pContainer = getH5PContainer($container);

    // Calculate offset between the button and the h5p frame
    var offset = getOffsetBetween($h5pContainer, $container);

    var direction = (offset.bottom > offset.top ? 'bottom' : 'top');
    var tipWidth = offset.outerWidth * 0.9; // Var needs to be renamed to make sense
    var bubbleWidth = tipWidth > maxWidth ? maxWidth : tipWidth;

    var bubblePosition = getBubblePosition(bubbleWidth, offset);
    var tailPosition = getTailPosition(bubbleWidth, bubblePosition, offset, $container.width());
    // Need to set font-size, since element is appended to body.
    // Using same font-size as parent. In that way it will grow accordingly
    // when resizing
    var fontSize = 16;//parseFloat($parent.css('font-size'));

    // Set width and position of speech bubble
    $currentSpeechBubble.css(bubbleCSS(
      direction,
      bubbleWidth,
      bubblePosition,
      fontSize
    ));

    var preparedTailCSS = tailCSS(direction, tailPosition);
    $tail.css(preparedTailCSS);
    $innerTail.css(preparedTailCSS);
  }

  /**
   * Static function for removing the speechbubble
   */
  var remove = function () {
    H5P.$body.off('mousedown.speechBubble');
    H5P.$window.off('resize', '', handleResize);
    $currentContainer.parents('.h5p-dialog').off('mousedown.speechBubble');
    if (iDevice) {
      H5P.$body.css('cursor', '');
    }
    if ($currentSpeechBubble !== undefined) {
      // Apply transition, then remove speech bubble
      $currentSpeechBubble.removeClass('show');

      // Make sure we remove any old timeout before reassignment
      clearTimeout(removeSpeechBubbleTimeout);
      removeSpeechBubbleTimeout = setTimeout(function () {
        $currentSpeechBubble.remove();
        $currentSpeechBubble = undefined;
      }, 500);
    }
    // Don't return false here. If the user e.g. clicks a button when the bubble is visible,
    // we want the bubble to disapear AND the button to receive the event
  };

  /**
   * Remove the speech bubble and container reference
   */
  function handleOutsideClick(event) {
    if (event.target === $currentContainer[0]) {
      return; // Button clicks are not outside clicks
    }

    remove();
    // There is no current container when a container isn't clicked
    $currentContainer = undefined;
  }

  /**
   * Calculate position for speech bubble
   *
   * @param {number} bubbleWidth The width of the speech bubble
   * @param {object} offset
   * @return {object} Return position for the speech bubble
   */
  function getBubblePosition(bubbleWidth, offset) {
    var bubblePosition = {};

    var tailOffset = 9;
    var widthOffset = bubbleWidth / 2;

    // Calculate top position
    bubblePosition.top = offset.top + offset.innerHeight;

    // Calculate bottom position
    bubblePosition.bottom = offset.bottom + offset.innerHeight + tailOffset;

    // Calculate left position
    if (offset.left < widthOffset) {
      bubblePosition.left = 3;
    }
    else if ((offset.left + widthOffset) > offset.outerWidth) {
      bubblePosition.left = offset.outerWidth - bubbleWidth - 3;
    }
    else {
      bubblePosition.left = offset.left - widthOffset + (offset.innerWidth / 2);
    }

    return bubblePosition;
  }

  /**
   * Calculate position for speech bubble tail
   *
   * @param {number} bubbleWidth The width of the speech bubble
   * @param {object} bubblePosition Speech bubble position
   * @param {object} offset
   * @param {number} iconWidth The width of the tip icon
   * @return {object} Return position for the tail
   */
  function getTailPosition(bubbleWidth, bubblePosition, offset, iconWidth) {
    var tailPosition = {};
    // Magic numbers. Tuned by hand so that the tail fits visually within
    // the bounds of the speech bubble.
    var leftBoundary = 9;
    var rightBoundary = bubbleWidth - 20;

    tailPosition.left = offset.left - bubblePosition.left + (iconWidth / 2) - 6;
    if (tailPosition.left < leftBoundary) {
      tailPosition.left = leftBoundary;
    }
    if (tailPosition.left > rightBoundary) {
      tailPosition.left = rightBoundary;
    }

    tailPosition.top = -6;
    tailPosition.bottom = -6;

    return tailPosition;
  }

  /**
   * Return bubble CSS for the desired growth direction
   *
   * @param {string} direction The direction the speech bubble will grow
   * @param {number} width The width of the speech bubble
   * @param {object} position Speech bubble position
   * @param {number} fontSize The size of the bubbles font
   * @return {object} Return CSS
   */
  function bubbleCSS(direction, width, position, fontSize) {
    if (direction === 'top') {
      return {
        width: width + 'px',
        bottom: position.bottom + 'px',
        left: position.left + 'px',
        fontSize: fontSize + 'px',
        top: ''
      };
    }
    else {
      return {
        width: width + 'px',
        top: position.top + 'px',
        left: position.left + 'px',
        fontSize: fontSize + 'px',
        bottom: ''
      };
    }
  }

  /**
   * Return tail CSS for the desired growth direction
   *
   * @param {string} direction The direction the speech bubble will grow
   * @param {object} position Tail position
   * @return {object} Return CSS
   */
  function tailCSS(direction, position) {
    if (direction === 'top') {
      return {
        bottom: position.bottom + 'px',
        left: position.left + 'px',
        top: ''
      };
    }
    else {
      return {
        top: position.top + 'px',
        left: position.left + 'px',
        bottom: ''
      };
    }
  }

  /**
   * Calculates the offset between an element inside a container and the
   * container. Only works if all the edges of the inner element are inside the
   * outer element.
   * Width/height of the elements is included as a convenience.
   *
   * @param {H5P.jQuery} $outer
   * @param {H5P.jQuery} $inner
   * @return {object} Position offset
   */
  function getOffsetBetween($outer, $inner) {
    var outer = $outer[0].getBoundingClientRect();
    var inner = $inner[0].getBoundingClientRect();

    return {
      top: inner.top - outer.top,
      right: outer.right - inner.right,
      bottom: outer.bottom - inner.bottom,
      left: inner.left - outer.left,
      innerWidth: inner.width,
      innerHeight: inner.height,
      outerWidth: outer.width,
      outerHeight: outer.height
    };
  }

  return JoubelSpeechBubble;
})(H5P.jQuery);
;
var H5P = H5P || {};

H5P.JoubelThrobber = (function ($) {

  /**
   * Creates a new tip
   */
  function JoubelThrobber() {

    // h5p-throbber css is described in core
    var $throbber = $('<div/>', {
      'class': 'h5p-throbber'
    });

    return $throbber;
  }

  return JoubelThrobber;
}(H5P.jQuery));
;
H5P.JoubelTip = (function ($) {
  var $conv = $('<div/>');

  /**
   * Creates a new tip element.
   *
   * NOTE that this may look like a class but it doesn't behave like one.
   * It returns a jQuery object.
   *
   * @param {string} tipHtml The text to display in the popup
   * @param {Object} [behaviour] Options
   * @param {string} [behaviour.tipLabel] Set to use a custom label for the tip button (you want this for good A11Y)
   * @param {boolean} [behaviour.helpIcon] Set to 'true' to Add help-icon classname to Tip button (changes the icon)
   * @param {boolean} [behaviour.showSpeechBubble] Set to 'false' to disable functionality (you may this in the editor)
   * @param {boolean} [behaviour.tabcontrol] Set to 'true' if you plan on controlling the tabindex in the parent (tabindex="-1")
   * @return {H5P.jQuery|undefined} Tip button jQuery element or 'undefined' if invalid tip
   */
  function JoubelTip(tipHtml, behaviour) {

    // Keep track of the popup that appears when you click the Tip button
    var speechBubble;

    // Parse tip html to determine text
    var tipText = $conv.html(tipHtml).text().trim();
    if (tipText === '') {
      return; // The tip has no textual content, i.e. it's invalid.
    }

    // Set default behaviour
    behaviour = $.extend({
      tipLabel: tipText,
      helpIcon: false,
      showSpeechBubble: true,
      tabcontrol: false
    }, behaviour);

    // Create Tip button
    var $tipButton = $('<div/>', {
      class: 'joubel-tip-container' + (behaviour.showSpeechBubble ? '' : ' be-quiet'),
      title: behaviour.tipLabel,
      'aria-label': behaviour.tipLabel,
      'aria-expanded': false,
      role: 'button',
      tabindex: (behaviour.tabcontrol ? -1 : 0),
      click: function (event) {
        // Toggle show/hide popup
        toggleSpeechBubble();
        event.preventDefault();
      },
      keydown: function (event) {
        if (event.which === 32 || event.which === 13) { // Space & enter key
          // Toggle show/hide popup
          toggleSpeechBubble();
          event.stopPropagation();
          event.preventDefault();
        }
        else { // Any other key
          // Toggle hide popup
          toggleSpeechBubble(false);
        }
      },
      // Add markup to render icon
      html: '<span class="joubel-icon-tip-normal ' + (behaviour.helpIcon ? ' help-icon': '') + '">' +
              '<span class="h5p-icon-shadow"></span>' +
              '<span class="h5p-icon-speech-bubble"></span>' +
              '<span class="h5p-icon-info"></span>' +
            '</span>'
      // IMPORTANT: All of the markup elements must have 'pointer-events: none;'
    });

    const $tipAnnouncer = $('<div>', {
      'class': 'hidden-but-read',
      'aria-live': 'polite',
      appendTo: $tipButton,
    });

    /**
     * Tip button interaction handler.
     * Toggle show or hide the speech bubble popup when interacting with the
     * Tip button.
     *
     * @private
     * @param {boolean} [force] 'true' shows and 'false' hides.
     */
    var toggleSpeechBubble = function (force) {
      if (speechBubble !== undefined && speechBubble.isCurrent($tipButton)) {
        // Hide current popup
        speechBubble.remove();
        speechBubble = undefined;

        $tipButton.attr('aria-expanded', false);
        $tipAnnouncer.html('');
      }
      else if (force !== false && behaviour.showSpeechBubble) {
        // Create and show new popup
        speechBubble = H5P.JoubelSpeechBubble($tipButton, tipHtml);
        $tipButton.attr('aria-expanded', true);
        $tipAnnouncer.html(tipHtml);
      }
    };

    return $tipButton;
  }

  return JoubelTip;
})(H5P.jQuery);
;
var H5P = H5P || {};

H5P.JoubelSlider = (function ($) {

  /**
   * Creates a new Slider
   *
   * @param {object} [params] Additional parameters
   */
  function JoubelSlider(params) {
    H5P.EventDispatcher.call(this);

    this.$slider = $('<div>', $.extend({
      'class': 'h5p-joubel-ui-slider'
    }, params));

    this.$slides = [];
    this.currentIndex = 0;
    this.numSlides = 0;
  }
  JoubelSlider.prototype = Object.create(H5P.EventDispatcher.prototype);
  JoubelSlider.prototype.constructor = JoubelSlider;

  JoubelSlider.prototype.addSlide = function ($content) {
    $content.addClass('h5p-joubel-ui-slide').css({
      'left': (this.numSlides*100) + '%'
    });
    this.$slider.append($content);
    this.$slides.push($content);

    this.numSlides++;

    if(this.numSlides === 1) {
      $content.addClass('current');
    }
  };

  JoubelSlider.prototype.attach = function ($container) {
    $container.append(this.$slider);
  };

  JoubelSlider.prototype.move = function (index) {
    var self = this;

    if(index === 0) {
      self.trigger('first-slide');
    }
    if(index+1 === self.numSlides) {
      self.trigger('last-slide');
    }
    self.trigger('move');

    var $previousSlide = self.$slides[this.currentIndex];
    H5P.Transition.onTransitionEnd(this.$slider, function () {
      $previousSlide.removeClass('current');
      self.trigger('moved');
    });
    this.$slides[index].addClass('current');

    var translateX = 'translateX(' + (-index*100) + '%)';
    this.$slider.css({
      '-webkit-transform': translateX,
      '-moz-transform': translateX,
      '-ms-transform': translateX,
      'transform': translateX
    });

    this.currentIndex = index;
  };

  JoubelSlider.prototype.remove = function () {
    this.$slider.remove();
  };

  JoubelSlider.prototype.next = function () {
    if(this.currentIndex+1 >= this.numSlides) {
      return;
    }

    this.move(this.currentIndex+1);
  };

  JoubelSlider.prototype.previous = function () {
    this.move(this.currentIndex-1);
  };

  JoubelSlider.prototype.first = function () {
    this.move(0);
  };

  JoubelSlider.prototype.last = function () {
    this.move(this.numSlides-1);
  };

  return JoubelSlider;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * @module
 */
H5P.JoubelScoreBar = (function ($) {

  /* Need to use an id for the star SVG since that is the only way to reference
     SVG filters  */
  var idCounter = 0;

  /**
   * Creates a score bar
   * @class H5P.JoubelScoreBar
   * @param {number} maxScore  Maximum score
   * @param {string} [label] Makes it easier for readspeakers to identify the scorebar
   * @param {string} [helpText] Score explanation
   * @param {string} [scoreExplanationButtonLabel] Label for score explanation button
   */
  function JoubelScoreBar(maxScore, label, helpText, scoreExplanationButtonLabel) {
    var self = this;

    self.maxScore = maxScore;
    self.score = 0;
    idCounter++;

    /**
     * @const {string}
     */
    self.STAR_MARKUP = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.77 53.87" aria-hidden="true" focusable="false">' +
        '<title>star</title>' +
        '<filter id="h5p-joubelui-score-bar-star-inner-shadow-' + idCounter + '" x0="-50%" y0="-50%" width="200%" height="200%">' +
          '<feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"></feGaussianBlur>' +
          '<feOffset dy="2" dx="4"></feOffset>' +
          '<feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>' +
          '<feFlood flood-color="#ffe95c" flood-opacity="1"></feFlood>' +
          '<feComposite in2="shadowDiff" operator="in"></feComposite>' +
          '<feComposite in2="SourceGraphic" operator="over" result="firstfilter"></feComposite>' +
          '<feGaussianBlur in="firstfilter" stdDeviation="3" result="blur2"></feGaussianBlur>' +
          '<feOffset dy="-2" dx="-4"></feOffset>' +
          '<feComposite in2="firstfilter" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>' +
          '<feFlood flood-color="#ffe95c" flood-opacity="1"></feFlood>' +
          '<feComposite in2="shadowDiff" operator="in"></feComposite>' +
          '<feComposite in2="firstfilter" operator="over"></feComposite>' +
        '</filter>' +
        '<path class="h5p-joubelui-score-bar-star-shadow" d="M35.08,43.41V9.16H20.91v0L9.51,10.85,9,10.93C2.8,12.18,0,17,0,21.25a11.22,11.22,0,0,0,3,7.48l8.73,8.53-1.07,6.16Z"/>' +
        '<g>' +
          '<path class="h5p-joubelui-score-bar-star-border" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
          '<path class="h5p-joubelui-score-bar-star-fill" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
          '<path filter="url(#h5p-joubelui-score-bar-star-inner-shadow-' + idCounter + ')" class="h5p-joubelui-score-bar-star-fill-full-score" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
        '</g>' +
      '</svg>';

    /**
     * @function appendTo
     * @memberOf H5P.JoubelScoreBar#
     * @param {H5P.jQuery}  $wrapper  Dom container
     */
    self.appendTo = function ($wrapper) {
      self.$scoreBar.appendTo($wrapper);
    };

    /**
     * Create the text representation of the scorebar .
     *
     * @private
     * @return {string}
     */
    var createLabel = function (score) {
      if (!label) {
        return '';
      }

      return label.replace(':num', score).replace(':total', self.maxScore);
    };

    /**
     * Creates the html for this widget
     *
     * @method createHtml
     * @private
     */
    var createHtml = function () {
      // Container div
      self.$scoreBar = $('<div>', {
        'class': 'h5p-joubelui-score-bar',
      });

      var $visuals = $('<div>', {
        'class': 'h5p-joubelui-score-bar-visuals',
        appendTo: self.$scoreBar
      });

      // The progress bar wrapper
      self.$progressWrapper = $('<div>', {
        'class': 'h5p-joubelui-score-bar-progress-wrapper',
        appendTo: $visuals
      });

      self.$progress = $('<div>', {
        'class': 'h5p-joubelui-score-bar-progress',
        'html': createLabel(self.score),
        appendTo: self.$progressWrapper
      });

      // The star
      $('<div>', {
        'class': 'h5p-joubelui-score-bar-star',
        html: self.STAR_MARKUP
      }).appendTo($visuals);

      // The score container
      var $numerics = $('<div>', {
        'class': 'h5p-joubelui-score-numeric',
        appendTo: self.$scoreBar,
        'aria-hidden': true
      });

      // The current score
      self.$scoreCounter = $('<span>', {
        'class': 'h5p-joubelui-score-number h5p-joubelui-score-number-counter',
        text: 0,
        appendTo: $numerics
      });

      // The separator
      $('<span>', {
        'class': 'h5p-joubelui-score-number-separator',
        text: '/',
        appendTo: $numerics
      });

      // Max score
      self.$maxScore = $('<span>', {
        'class': 'h5p-joubelui-score-number h5p-joubelui-score-max',
        text: self.maxScore,
        appendTo: $numerics
      });

      if (helpText) {
        H5P.JoubelUI.createTip(helpText, {
          tipLabel: scoreExplanationButtonLabel ? scoreExplanationButtonLabel : helpText,
          helpIcon: true
        }).appendTo(self.$scoreBar);
        self.$scoreBar.addClass('h5p-score-bar-has-help');
      }
    };

    /**
     * Set the current score
     * @method setScore
     * @memberOf H5P.JoubelScoreBar#
     * @param  {number} score
     */
    self.setScore = function (score) {
      // Do nothing if score hasn't changed
      if (score === self.score) {
        return;
      }
      self.score = score > self.maxScore ? self.maxScore : score;
      self.updateVisuals();
    };

    /**
     * Increment score
     * @method incrementScore
     * @memberOf H5P.JoubelScoreBar#
     * @param  {number=}        incrementBy Optional parameter, defaults to 1
     */
    self.incrementScore = function (incrementBy) {
      self.setScore(self.score + (incrementBy || 1));
    };

    /**
     * Set the max score
     * @method setMaxScore
     * @memberOf H5P.JoubelScoreBar#
     * @param  {number}    maxScore The max score
     */
    self.setMaxScore = function (maxScore) {
      self.maxScore = maxScore;
    };

    /**
     * Updates the progressbar visuals
     * @memberOf H5P.JoubelScoreBar#
     * @method updateVisuals
     */
    self.updateVisuals = function () {
      self.$progress.html(createLabel(self.score));
      self.$scoreCounter.text(self.score);
      self.$maxScore.text(self.maxScore);

      setTimeout(function () {
        // Start the progressbar animation
        self.$progress.css({
          width: ((self.score / self.maxScore) * 100) + '%'
        });

        H5P.Transition.onTransitionEnd(self.$progress, function () {
          // If fullscore fill the star and start the animation
          self.$scoreBar.toggleClass('h5p-joubelui-score-bar-full-score', self.score === self.maxScore);
          self.$scoreBar.toggleClass('h5p-joubelui-score-bar-animation-active', self.score === self.maxScore);

          // Only allow the star animation to run once
          self.$scoreBar.one("animationend", function() {
            self.$scoreBar.removeClass("h5p-joubelui-score-bar-animation-active");
          });
        }, 600);
      }, 300);
    };

    /**
     * Removes all classes
     * @method reset
     */
    self.reset = function () {
      self.$scoreBar.removeClass('h5p-joubelui-score-bar-full-score');
    };

    createHtml();
  }

  return JoubelScoreBar;
})(H5P.jQuery);
;
var H5P = H5P || {};

H5P.JoubelProgressbar = (function ($) {

  /**
   * Joubel progressbar class
   * @method JoubelProgressbar
   * @constructor
   * @param  {number}          steps Number of steps
   * @param {Object} [options] Additional options
   * @param {boolean} [options.disableAria] Disable readspeaker assistance
   * @param {string} [options.progressText] A progress text for describing
   *  current progress out of total progress for readspeakers.
   *  e.g. "Slide :num of :total"
   */
  function JoubelProgressbar(steps, options) {
    H5P.EventDispatcher.call(this);
    var self = this;
    this.options = $.extend({
      progressText: 'Slide :num of :total'
    }, options);
    this.currentStep = 0;
    this.steps = steps;

    this.$progressbar = $('<div>', {
      'class': 'h5p-joubelui-progressbar',
      on: {
        click: function () {
          self.toggleTooltip();
          return false;
        },
        mouseenter: function () {
          self.showTooltip();
        },
        mouseleave: function () {
          setTimeout(function () {
            self.hideTooltip();
          }, 1500);
        }
      }
    });
    this.$background = $('<div>', {
      'class': 'h5p-joubelui-progressbar-background'
    }).appendTo(this.$progressbar);

    $('body').click(function () {
      self.toggleTooltip(true);
    });
  }

  JoubelProgressbar.prototype = Object.create(H5P.EventDispatcher.prototype);
  JoubelProgressbar.prototype.constructor = JoubelProgressbar;

  /**
   * Display tooltip
   * @method showTooltip
   */
  JoubelProgressbar.prototype.showTooltip = function () {
    var self = this;

    if (this.currentStep === 0 || this.tooltip !== undefined) {
      return;
    }

    var parentWidth = self.$progressbar.offset().left + self.$progressbar.width();

    this.tooltip = new H5P.Drop({
      target: this.$background.get(0),
      content: this.currentStep + '/' + this.steps,
      classes: 'drop-theme-arrows-bounce h5p-joubelui-drop',
      position: 'top right',
      openOn: 'always',
      tetherOptions: {
        attachment: 'bottom center',
        targetAttachment: 'top right'
      }
    });
    this.tooltip.on('open', function () {
      var $drop = $(self.tooltip.drop);
      var left = $drop.position().left;
      var dropWidth = $drop.width();

      // Need to handle drops getting outside of the progressbar:
      if (left < 0) {
        $drop.css({marginLeft: (-left) + 'px'});
      }
      else if (left + dropWidth > parentWidth) {
        $drop.css({marginLeft: (parentWidth - (left + dropWidth)) + 'px'});
      }
    });
  };

  JoubelProgressbar.prototype.updateAria = function () {
    var self = this;
    if (this.options.disableAria) {
      return;
    }

    if (!this.$currentStatus) {
      this.$currentStatus = $('<div>', {
        'class': 'h5p-joubelui-progressbar-slide-status-text',
        'aria-live': 'assertive'
      }).appendTo(this.$progressbar);
    }
    var interpolatedProgressText = self.options.progressText
      .replace(':num', self.currentStep)
      .replace(':total', self.steps);
    this.$currentStatus.html(interpolatedProgressText);
  };

  /**
   * Hides tooltip
   * @method hideTooltip
   */
  JoubelProgressbar.prototype.hideTooltip = function () {
    if (this.tooltip !== undefined) {
      this.tooltip.remove();
      this.tooltip.destroy();
      this.tooltip = undefined;
    }
  };

  /**
   * Toggles tooltip-visibility
   * @method toggleTooltip
   * @param  {boolean} [closeOnly] Don't show, only close if open
   */
  JoubelProgressbar.prototype.toggleTooltip = function (closeOnly) {
    if (this.tooltip === undefined && !closeOnly) {
      this.showTooltip();
    }
    else if (this.tooltip !== undefined) {
      this.hideTooltip();
    }
  };

  /**
   * Appends to a container
   * @method appendTo
   * @param  {H5P.jquery} $container
   */
  JoubelProgressbar.prototype.appendTo = function ($container) {
    this.$progressbar.appendTo($container);
  };

  /**
   * Update progress
   * @method setProgress
   * @param  {number}    step
   */
  JoubelProgressbar.prototype.setProgress = function (step) {
    // Check for valid value:
    if (step > this.steps || step < 0) {
      return;
    }
    this.currentStep = step;
    this.$background.css({
      width: ((this.currentStep/this.steps)*100) + '%'
    });

    this.updateAria();
  };

  /**
   * Increment progress with 1
   * @method next
   */
  JoubelProgressbar.prototype.next = function () {
    this.setProgress(this.currentStep+1);
  };

  /**
   * Reset progressbar
   * @method reset
   */
  JoubelProgressbar.prototype.reset = function () {
    this.setProgress(0);
  };

  /**
   * Check if last step is reached
   * @method isLastStep
   * @return {Boolean}
   */
  JoubelProgressbar.prototype.isLastStep = function () {
    return this.steps === this.currentStep;
  };

  return JoubelProgressbar;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * H5P Joubel UI library.
 *
 * This is a utility library, which does not implement attach. I.e, it has to bee actively used by
 * other libraries
 * @module
 */
H5P.JoubelUI = (function ($) {

  /**
   * The internal object to return
   * @class H5P.JoubelUI
   * @static
   */
  function JoubelUI() {}

  /* Public static functions */

  /**
   * Create a tip icon
   * @method H5P.JoubelUI.createTip
   * @param  {string}  text   The textual tip
   * @param  {Object}  params Parameters
   * @return {H5P.JoubelTip}
   */
  JoubelUI.createTip = function (text, params) {
    return new H5P.JoubelTip(text, params);
  };

  /**
   * Create message dialog
   * @method H5P.JoubelUI.createMessageDialog
   * @param  {H5P.jQuery}               $container The dom container
   * @param  {string}                   message    The message
   * @return {H5P.JoubelMessageDialog}
   */
  JoubelUI.createMessageDialog = function ($container, message) {
    return new H5P.JoubelMessageDialog($container, message);
  };

  /**
   * Create help text dialog
   * @method H5P.JoubelUI.createHelpTextDialog
   * @param  {string}             header  The textual header
   * @param  {string}             message The textual message
   * @param  {string}             closeButtonTitle The title for the close button
   * @return {H5P.JoubelHelpTextDialog}
   */
  JoubelUI.createHelpTextDialog = function (header, message, closeButtonTitle) {
    return new H5P.JoubelHelpTextDialog(header, message, closeButtonTitle);
  };

  /**
   * Create progress circle
   * @method H5P.JoubelUI.createProgressCircle
   * @param  {number}             number          The progress (0 to 100)
   * @param  {string}             progressColor   The progress color in hex value
   * @param  {string}             fillColor       The fill color in hex value
   * @param  {string}             backgroundColor The background color in hex value
   * @return {H5P.JoubelProgressCircle}
   */
  JoubelUI.createProgressCircle = function (number, progressColor, fillColor, backgroundColor) {
    return new H5P.JoubelProgressCircle(number, progressColor, fillColor, backgroundColor);
  };

  /**
   * Create throbber for loading
   * @method H5P.JoubelUI.createThrobber
   * @return {H5P.JoubelThrobber}
   */
  JoubelUI.createThrobber = function () {
    return new H5P.JoubelThrobber();
  };

  /**
   * Create simple rounded button
   * @method H5P.JoubelUI.createSimpleRoundedButton
   * @param  {string}                  text The button label
   * @return {H5P.SimpleRoundedButton}
   */
  JoubelUI.createSimpleRoundedButton = function (text) {
    return new H5P.SimpleRoundedButton(text);
  };

  /**
   * Create Slider
   * @method H5P.JoubelUI.createSlider
   * @param  {Object} [params] Parameters
   * @return {H5P.JoubelSlider}
   */
  JoubelUI.createSlider = function (params) {
    return new H5P.JoubelSlider(params);
  };

  /**
   * Create Score Bar
   * @method H5P.JoubelUI.createScoreBar
   * @param  {number=}       maxScore The maximum score
   * @param {string} [label] Makes it easier for readspeakers to identify the scorebar
   * @return {H5P.JoubelScoreBar}
   */
  JoubelUI.createScoreBar = function (maxScore, label, helpText, scoreExplanationButtonLabel) {
    return new H5P.JoubelScoreBar(maxScore, label, helpText, scoreExplanationButtonLabel);
  };

  /**
   * Create Progressbar
   * @method H5P.JoubelUI.createProgressbar
   * @param  {number=}       numSteps The total numer of steps
   * @param {Object} [options] Additional options
   * @param {boolean} [options.disableAria] Disable readspeaker assistance
   * @param {string} [options.progressText] A progress text for describing
   *  current progress out of total progress for readspeakers.
   *  e.g. "Slide :num of :total"
   * @return {H5P.JoubelProgressbar}
   */
  JoubelUI.createProgressbar = function (numSteps, options) {
    return new H5P.JoubelProgressbar(numSteps, options);
  };

  /**
   * Create standard Joubel button
   *
   * @method H5P.JoubelUI.createButton
   * @param {object} params
   *  May hold any properties allowed by jQuery. If href is set, an A tag
   *  is used, if not a button tag is used.
   * @return {H5P.jQuery} The jquery element created
   */
  JoubelUI.createButton = function(params) {
    var type = 'button';
    if (params.href) {
      type = 'a';
    }
    else {
      params.type = 'button';
    }
    if (params.class) {
      params.class += ' h5p-joubelui-button';
    }
    else {
      params.class = 'h5p-joubelui-button';
    }
    return $('<' + type + '/>', params);
  };

  /**
   * Fix for iframe scoll bug in IOS. When focusing an element that doesn't have
   * focus support by default the iframe will scroll the parent frame so that
   * the focused element is out of view. This varies dependening on the elements
   * of the parent frame.
   */
  if (H5P.isFramed && !H5P.hasiOSiframeScrollFix &&
      /iPad|iPhone|iPod/.test(navigator.userAgent)) {
    H5P.hasiOSiframeScrollFix = true;

    // Keep track of original focus function
    var focus = HTMLElement.prototype.focus;

    // Override the original focus
    HTMLElement.prototype.focus = function () {
      // Only focus the element if it supports it natively
      if ( (this instanceof HTMLAnchorElement ||
            this instanceof HTMLInputElement ||
            this instanceof HTMLSelectElement ||
            this instanceof HTMLTextAreaElement ||
            this instanceof HTMLButtonElement ||
            this instanceof HTMLIFrameElement ||
            this instanceof HTMLAreaElement) && // HTMLAreaElement isn't supported by Safari yet.
          !this.getAttribute('role')) { // Focus breaks if a different role has been set
          // In theory this.isContentEditable should be able to recieve focus,
          // but it didn't work when tested.

        // Trigger the original focus with the proper context
        focus.call(this);
      }
    };
  }

  return JoubelUI;
})(H5P.jQuery);
;
/*!
* @license SoundJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/

/**!
 * SoundJS FlashAudioPlugin also includes swfobject (http://code.google.com/p/swfobject/)
 */

var old = this.createjs;

this.createjs=this.createjs||{},function(){var a=createjs.SoundJS=createjs.SoundJS||{};a.version="0.6.2",a.buildDate="Thu, 26 Nov 2015 20:44:31 GMT"}(),this.createjs=this.createjs||{},createjs.extend=function(a,b){"use strict";function c(){this.constructor=a}return c.prototype=b.prototype,a.prototype=new c},this.createjs=this.createjs||{},createjs.promote=function(a,b){"use strict";var c=a.prototype,d=Object.getPrototypeOf&&Object.getPrototypeOf(c)||c.__proto__;if(d){c[(b+="_")+"constructor"]=d.constructor;for(var e in d)c.hasOwnProperty(e)&&"function"==typeof d[e]&&(c[b+e]=d[e])}return a},this.createjs=this.createjs||{},createjs.indexOf=function(a,b){"use strict";for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1},this.createjs=this.createjs||{},function(){"use strict";createjs.proxy=function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(b,Array.prototype.slice.call(arguments,0).concat(c))}}}(),this.createjs=this.createjs||{},function(){"use strict";function BrowserDetect(){throw"BrowserDetect cannot be instantiated"}var a=BrowserDetect.agent=window.navigator.userAgent;BrowserDetect.isWindowPhone=a.indexOf("IEMobile")>-1||a.indexOf("Windows Phone")>-1,BrowserDetect.isFirefox=a.indexOf("Firefox")>-1,BrowserDetect.isOpera=null!=window.opera,BrowserDetect.isChrome=a.indexOf("Chrome")>-1,BrowserDetect.isIOS=(a.indexOf("iPod")>-1||a.indexOf("iPhone")>-1||a.indexOf("iPad")>-1)&&!BrowserDetect.isWindowPhone,BrowserDetect.isAndroid=a.indexOf("Android")>-1&&!BrowserDetect.isWindowPhone,BrowserDetect.isBlackberry=a.indexOf("Blackberry")>-1,createjs.BrowserDetect=BrowserDetect}(),this.createjs=this.createjs||{},function(){"use strict";function EventDispatcher(){this._listeners=null,this._captureListeners=null}var a=EventDispatcher.prototype;EventDispatcher.initialize=function(b){b.addEventListener=a.addEventListener,b.on=a.on,b.removeEventListener=b.off=a.removeEventListener,b.removeAllEventListeners=a.removeAllEventListeners,b.hasEventListener=a.hasEventListener,b.dispatchEvent=a.dispatchEvent,b._dispatchEvent=a._dispatchEvent,b.willTrigger=a.willTrigger},a.addEventListener=function(a,b,c){var d;d=c?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};var e=d[a];return e&&this.removeEventListener(a,b,c),e=d[a],e?e.push(b):d[a]=[b],b},a.on=function(a,b,c,d,e,f){return b.handleEvent&&(c=c||b,b=b.handleEvent),c=c||this,this.addEventListener(a,function(a){b.call(c,a,e),d&&a.remove()},f)},a.removeEventListener=function(a,b,c){var d=c?this._captureListeners:this._listeners;if(d){var e=d[a];if(e)for(var f=0,g=e.length;g>f;f++)if(e[f]==b){1==g?delete d[a]:e.splice(f,1);break}}},a.off=a.removeEventListener,a.removeAllEventListeners=function(a){a?(this._listeners&&delete this._listeners[a],this._captureListeners&&delete this._captureListeners[a]):this._listeners=this._captureListeners=null},a.dispatchEvent=function(a,b,c){if("string"==typeof a){var d=this._listeners;if(!(b||d&&d[a]))return!0;a=new createjs.Event(a,b,c)}else a.target&&a.clone&&(a=a.clone());try{a.target=this}catch(e){}if(a.bubbles&&this.parent){for(var f=this,g=[f];f.parent;)g.push(f=f.parent);var h,i=g.length;for(h=i-1;h>=0&&!a.propagationStopped;h--)g[h]._dispatchEvent(a,1+(0==h));for(h=1;i>h&&!a.propagationStopped;h++)g[h]._dispatchEvent(a,3)}else this._dispatchEvent(a,2);return!a.defaultPrevented},a.hasEventListener=function(a){var b=this._listeners,c=this._captureListeners;return!!(b&&b[a]||c&&c[a])},a.willTrigger=function(a){for(var b=this;b;){if(b.hasEventListener(a))return!0;b=b.parent}return!1},a.toString=function(){return"[EventDispatcher]"},a._dispatchEvent=function(a,b){var c,d=1==b?this._captureListeners:this._listeners;if(a&&d){var e=d[a.type];if(!e||!(c=e.length))return;try{a.currentTarget=this}catch(f){}try{a.eventPhase=b}catch(f){}a.removed=!1,e=e.slice();for(var g=0;c>g&&!a.immediatePropagationStopped;g++){var h=e[g];h.handleEvent?h.handleEvent(a):h(a),a.removed&&(this.off(a.type,h,1==b),a.removed=!1)}}},createjs.EventDispatcher=EventDispatcher}(),this.createjs=this.createjs||{},function(){"use strict";function Event(a,b,c){this.type=a,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=!!b,this.cancelable=!!c,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}var a=Event.prototype;a.preventDefault=function(){this.defaultPrevented=this.cancelable&&!0},a.stopPropagation=function(){this.propagationStopped=!0},a.stopImmediatePropagation=function(){this.immediatePropagationStopped=this.propagationStopped=!0},a.remove=function(){this.removed=!0},a.clone=function(){return new Event(this.type,this.bubbles,this.cancelable)},a.set=function(a){for(var b in a)this[b]=a[b];return this},a.toString=function(){return"[Event (type="+this.type+")]"},createjs.Event=Event}(),this.createjs=this.createjs||{},function(){"use strict";function ErrorEvent(a,b,c){this.Event_constructor("error"),this.title=a,this.message=b,this.data=c}var a=createjs.extend(ErrorEvent,createjs.Event);a.clone=function(){return new createjs.ErrorEvent(this.title,this.message,this.data)},createjs.ErrorEvent=createjs.promote(ErrorEvent,"Event")}(),this.createjs=this.createjs||{},function(){"use strict";function ProgressEvent(a,b){this.Event_constructor("progress"),this.loaded=a,this.total=null==b?1:b,this.progress=0==b?0:this.loaded/this.total}var a=createjs.extend(ProgressEvent,createjs.Event);a.clone=function(){return new createjs.ProgressEvent(this.loaded,this.total)},createjs.ProgressEvent=createjs.promote(ProgressEvent,"Event")}(window),this.createjs=this.createjs||{},function(){"use strict";function LoadItem(){this.src=null,this.type=null,this.id=null,this.maintainOrder=!1,this.callback=null,this.data=null,this.method=createjs.LoadItem.GET,this.values=null,this.headers=null,this.withCredentials=!1,this.mimeType=null,this.crossOrigin=null,this.loadTimeout=b.LOAD_TIMEOUT_DEFAULT}var a=LoadItem.prototype={},b=LoadItem;b.LOAD_TIMEOUT_DEFAULT=8e3,b.create=function(a){if("string"==typeof a){var c=new LoadItem;return c.src=a,c}if(a instanceof b)return a;if(a instanceof Object&&a.src)return null==a.loadTimeout&&(a.loadTimeout=b.LOAD_TIMEOUT_DEFAULT),a;throw new Error("Type not recognized.")},a.set=function(a){for(var b in a)this[b]=a[b];return this},createjs.LoadItem=b}(),function(){var a={};a.ABSOLUTE_PATT=/^(?:\w+:)?\/{2}/i,a.RELATIVE_PATT=/^[.\/]*?\//i,a.EXTENSION_PATT=/\/?[^\/]+\.(\w{1,5})$/i,a.parseURI=function(b){var c={absolute:!1,relative:!1};if(null==b)return c;var d=b.indexOf("?");d>-1&&(b=b.substr(0,d));var e;return a.ABSOLUTE_PATT.test(b)?c.absolute=!0:a.RELATIVE_PATT.test(b)&&(c.relative=!0),(e=b.match(a.EXTENSION_PATT))&&(c.extension=e[1].toLowerCase()),c},a.formatQueryString=function(a,b){if(null==a)throw new Error("You must specify data.");var c=[];for(var d in a)c.push(d+"="+escape(a[d]));return b&&(c=c.concat(b)),c.join("&")},a.buildPath=function(a,b){if(null==b)return a;var c=[],d=a.indexOf("?");if(-1!=d){var e=a.slice(d+1);c=c.concat(e.split("&"))}return-1!=d?a.slice(0,d)+"?"+this.formatQueryString(b,c):a+"?"+this.formatQueryString(b,c)},a.isCrossDomain=function(a){var b=document.createElement("a");b.href=a.src;var c=document.createElement("a");c.href=location.href;var d=""!=b.hostname&&(b.port!=c.port||b.protocol!=c.protocol||b.hostname!=c.hostname);return d},a.isLocal=function(a){var b=document.createElement("a");return b.href=a.src,""==b.hostname&&"file:"==b.protocol},a.isBinary=function(a){switch(a){case createjs.AbstractLoader.IMAGE:case createjs.AbstractLoader.BINARY:return!0;default:return!1}},a.isImageTag=function(a){return a instanceof HTMLImageElement},a.isAudioTag=function(a){return window.HTMLAudioElement?a instanceof HTMLAudioElement:!1},a.isVideoTag=function(a){return window.HTMLVideoElement?a instanceof HTMLVideoElement:!1},a.isText=function(a){switch(a){case createjs.AbstractLoader.TEXT:case createjs.AbstractLoader.JSON:case createjs.AbstractLoader.MANIFEST:case createjs.AbstractLoader.XML:case createjs.AbstractLoader.CSS:case createjs.AbstractLoader.SVG:case createjs.AbstractLoader.JAVASCRIPT:case createjs.AbstractLoader.SPRITESHEET:return!0;default:return!1}},a.getTypeByExtension=function(a){if(null==a)return createjs.AbstractLoader.TEXT;switch(a.toLowerCase()){case"jpeg":case"jpg":case"gif":case"png":case"webp":case"bmp":return createjs.AbstractLoader.IMAGE;case"ogg":case"mp3":case"webm":return createjs.AbstractLoader.SOUND;case"mp4":case"webm":case"ts":return createjs.AbstractLoader.VIDEO;case"json":return createjs.AbstractLoader.JSON;case"xml":return createjs.AbstractLoader.XML;case"css":return createjs.AbstractLoader.CSS;case"js":return createjs.AbstractLoader.JAVASCRIPT;case"svg":return createjs.AbstractLoader.SVG;default:return createjs.AbstractLoader.TEXT}},createjs.RequestUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function AbstractLoader(a,b,c){this.EventDispatcher_constructor(),this.loaded=!1,this.canceled=!1,this.progress=0,this.type=c,this.resultFormatter=null,this._item=a?createjs.LoadItem.create(a):null,this._preferXHR=b,this._result=null,this._rawResult=null,this._loadedItems=null,this._tagSrcAttribute=null,this._tag=null}var a=createjs.extend(AbstractLoader,createjs.EventDispatcher),b=AbstractLoader;b.POST="POST",b.GET="GET",b.BINARY="binary",b.CSS="css",b.IMAGE="image",b.JAVASCRIPT="javascript",b.JSON="json",b.JSONP="jsonp",b.MANIFEST="manifest",b.SOUND="sound",b.VIDEO="video",b.SPRITESHEET="spritesheet",b.SVG="svg",b.TEXT="text",b.XML="xml",a.getItem=function(){return this._item},a.getResult=function(a){return a?this._rawResult:this._result},a.getTag=function(){return this._tag},a.setTag=function(a){this._tag=a},a.load=function(){this._createRequest(),this._request.on("complete",this,this),this._request.on("progress",this,this),this._request.on("loadStart",this,this),this._request.on("abort",this,this),this._request.on("timeout",this,this),this._request.on("error",this,this);var a=new createjs.Event("initialize");a.loader=this._request,this.dispatchEvent(a),this._request.load()},a.cancel=function(){this.canceled=!0,this.destroy()},a.destroy=function(){this._request&&(this._request.removeAllEventListeners(),this._request.destroy()),this._request=null,this._item=null,this._rawResult=null,this._result=null,this._loadItems=null,this.removeAllEventListeners()},a.getLoadedItems=function(){return this._loadedItems},a._createRequest=function(){this._request=this._preferXHR?new createjs.XHRRequest(this._item):new createjs.TagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},a._createTag=function(){return null},a._sendLoadStart=function(){this._isCanceled()||this.dispatchEvent("loadstart")},a._sendProgress=function(a){if(!this._isCanceled()){var b=null;"number"==typeof a?(this.progress=a,b=new createjs.ProgressEvent(this.progress)):(b=a,this.progress=a.loaded/a.total,b.progress=this.progress,(isNaN(this.progress)||1/0==this.progress)&&(this.progress=0)),this.hasEventListener("progress")&&this.dispatchEvent(b)}},a._sendComplete=function(){if(!this._isCanceled()){this.loaded=!0;var a=new createjs.Event("complete");a.rawResult=this._rawResult,null!=this._result&&(a.result=this._result),this.dispatchEvent(a)}},a._sendError=function(a){!this._isCanceled()&&this.hasEventListener("error")&&(null==a&&(a=new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),this.dispatchEvent(a))},a._isCanceled=function(){return null==window.createjs||this.canceled?!0:!1},a.resultFormatter=null,a.handleEvent=function(a){switch(a.type){case"complete":this._rawResult=a.target._response;var b=this.resultFormatter&&this.resultFormatter(this);b instanceof Function?b.call(this,createjs.proxy(this._resultFormatSuccess,this),createjs.proxy(this._resultFormatFailed,this)):(this._result=b||this._rawResult,this._sendComplete());break;case"progress":this._sendProgress(a);break;case"error":this._sendError(a);break;case"loadstart":this._sendLoadStart();break;case"abort":case"timeout":this._isCanceled()||this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_"+a.type.toUpperCase()+"_ERROR"))}},a._resultFormatSuccess=function(a){this._result=a,this._sendComplete()},a._resultFormatFailed=function(a){this._sendError(a)},a.buildPath=function(a,b){return createjs.RequestUtils.buildPath(a,b)},a.toString=function(){return"[PreloadJS AbstractLoader]"},createjs.AbstractLoader=createjs.promote(AbstractLoader,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function AbstractMediaLoader(a,b,c){this.AbstractLoader_constructor(a,b,c),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",this.on("initialize",this._updateXHR,this)}var a=createjs.extend(AbstractMediaLoader,createjs.AbstractLoader);a.load=function(){this._tag||(this._tag=this._createTag(this._item.src)),this._tag.preload="auto",this._tag.load(),this.AbstractLoader_load()},a._createTag=function(){},a._createRequest=function(){this._request=this._preferXHR?new createjs.XHRRequest(this._item):new createjs.MediaTagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},a._updateXHR=function(a){a.loader.setResponseType&&a.loader.setResponseType("blob")},a._formatResult=function(a){if(this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.onstalled=null,this._preferXHR){var b=window.URL||window.webkitURL,c=a.getResult(!0);a.getTag().src=b.createObjectURL(c)}return a.getTag()},createjs.AbstractMediaLoader=createjs.promote(AbstractMediaLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";var AbstractRequest=function(a){this._item=a},a=createjs.extend(AbstractRequest,createjs.EventDispatcher);a.load=function(){},a.destroy=function(){},a.cancel=function(){},createjs.AbstractRequest=createjs.promote(AbstractRequest,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function TagRequest(a,b,c){this.AbstractRequest_constructor(a),this._tag=b,this._tagSrcAttribute=c,this._loadedHandler=createjs.proxy(this._handleTagComplete,this),this._addedToDOM=!1,this._startTagVisibility=null}var a=createjs.extend(TagRequest,createjs.AbstractRequest);a.load=function(){this._tag.onload=createjs.proxy(this._handleTagComplete,this),this._tag.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this),this._tag.onerror=createjs.proxy(this._handleError,this);var a=new createjs.Event("initialize");a.loader=this._tag,this.dispatchEvent(a),this._hideTag(),this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout),this._tag[this._tagSrcAttribute]=this._item.src,null==this._tag.parentNode&&(window.document.body.appendChild(this._tag),this._addedToDOM=!0)},a.destroy=function(){this._clean(),this._tag=null,this.AbstractRequest_destroy()},a._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this._tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleTagComplete()},a._handleError=function(){this._clean(),this.dispatchEvent("error")},a._handleTagComplete=function(){this._rawResult=this._tag,this._result=this.resultFormatter&&this.resultFormatter(this)||this._rawResult,this._clean(),this._showTag(),this.dispatchEvent("complete")},a._handleTimeout=function(){this._clean(),this.dispatchEvent(new createjs.Event("timeout"))},a._clean=function(){this._tag.onload=null,this._tag.onreadystatechange=null,this._tag.onerror=null,this._addedToDOM&&null!=this._tag.parentNode&&this._tag.parentNode.removeChild(this._tag),clearTimeout(this._loadTimeout)},a._hideTag=function(){this._startTagVisibility=this._tag.style.visibility,this._tag.style.visibility="hidden"},a._showTag=function(){this._tag.style.visibility=this._startTagVisibility},a._handleStalled=function(){},createjs.TagRequest=createjs.promote(TagRequest,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function MediaTagRequest(a,b,c){this.AbstractRequest_constructor(a),this._tag=b,this._tagSrcAttribute=c,this._loadedHandler=createjs.proxy(this._handleTagComplete,this)}var a=createjs.extend(MediaTagRequest,createjs.TagRequest);a.load=function(){var a=createjs.proxy(this._handleStalled,this);this._stalledCallback=a;var b=createjs.proxy(this._handleProgress,this);this._handleProgress=b,this._tag.addEventListener("stalled",a),this._tag.addEventListener("progress",b),this._tag.addEventListener&&this._tag.addEventListener("canplaythrough",this._loadedHandler,!1),this.TagRequest_load()},a._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this._tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleTagComplete()},a._handleStalled=function(){},a._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.ProgressEvent(a.loaded,a.total);this.dispatchEvent(b)}},a._clean=function(){this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.removeEventListener("stalled",this._stalledCallback),this._tag.removeEventListener("progress",this._progressCallback),this.TagRequest__clean()},createjs.MediaTagRequest=createjs.promote(MediaTagRequest,"TagRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function XHRRequest(a){this.AbstractRequest_constructor(a),this._request=null,this._loadTimeout=null,this._xhrLevel=1,this._response=null,this._rawResponse=null,this._canceled=!1,this._handleLoadStartProxy=createjs.proxy(this._handleLoadStart,this),this._handleProgressProxy=createjs.proxy(this._handleProgress,this),this._handleAbortProxy=createjs.proxy(this._handleAbort,this),this._handleErrorProxy=createjs.proxy(this._handleError,this),this._handleTimeoutProxy=createjs.proxy(this._handleTimeout,this),this._handleLoadProxy=createjs.proxy(this._handleLoad,this),this._handleReadyStateChangeProxy=createjs.proxy(this._handleReadyStateChange,this),!this._createXHR(a)}var a=createjs.extend(XHRRequest,createjs.AbstractRequest);XHRRequest.ACTIVEX_VERSIONS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],a.getResult=function(a){return a&&this._rawResponse?this._rawResponse:this._response},a.cancel=function(){this.canceled=!0,this._clean(),this._request.abort()},a.load=function(){if(null==this._request)return void this._handleError();null!=this._request.addEventListener?(this._request.addEventListener("loadstart",this._handleLoadStartProxy,!1),this._request.addEventListener("progress",this._handleProgressProxy,!1),this._request.addEventListener("abort",this._handleAbortProxy,!1),this._request.addEventListener("error",this._handleErrorProxy,!1),this._request.addEventListener("timeout",this._handleTimeoutProxy,!1),this._request.addEventListener("load",this._handleLoadProxy,!1),this._request.addEventListener("readystatechange",this._handleReadyStateChangeProxy,!1)):(this._request.onloadstart=this._handleLoadStartProxy,this._request.onprogress=this._handleProgressProxy,this._request.onabort=this._handleAbortProxy,this._request.onerror=this._handleErrorProxy,this._request.ontimeout=this._handleTimeoutProxy,this._request.onload=this._handleLoadProxy,this._request.onreadystatechange=this._handleReadyStateChangeProxy),1==this._xhrLevel&&(this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout));try{this._item.values&&this._item.method!=createjs.AbstractLoader.GET?this._item.method==createjs.AbstractLoader.POST&&this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)):this._request.send()}catch(a){this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND",null,a))}},a.setResponseType=function(a){"blob"===a&&(a=window.URL?"blob":"arraybuffer",this._responseType=a),this._request.responseType=a},a.getAllResponseHeaders=function(){return this._request.getAllResponseHeaders instanceof Function?this._request.getAllResponseHeaders():null},a.getResponseHeader=function(a){return this._request.getResponseHeader instanceof Function?this._request.getResponseHeader(a):null},a._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.ProgressEvent(a.loaded,a.total);this.dispatchEvent(b)}},a._handleLoadStart=function(){clearTimeout(this._loadTimeout),this.dispatchEvent("loadstart")},a._handleAbort=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",null,a))},a._handleError=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent(a.message))},a._handleReadyStateChange=function(){4==this._request.readyState&&this._handleLoad()},a._handleLoad=function(){if(!this.loaded){this.loaded=!0;var a=this._checkError();if(a)return void this._handleError(a);if(this._response=this._getResponse(),"arraybuffer"===this._responseType)try{this._response=new Blob([this._response])}catch(b){if(window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,"TypeError"===b.name&&window.BlobBuilder){var c=new BlobBuilder;c.append(this._response),this._response=c.getBlob()}}this._clean(),this.dispatchEvent(new createjs.Event("complete"))}},a._handleTimeout=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT",null,a))},a._checkError=function(){var a=parseInt(this._request.status);switch(a){case 404:case 0:return new Error(a)}return null},a._getResponse=function(){if(null!=this._response)return this._response;if(null!=this._request.response)return this._request.response;try{if(null!=this._request.responseText)return this._request.responseText}catch(a){}try{if(null!=this._request.responseXML)return this._request.responseXML}catch(a){}return null},a._createXHR=function(a){var b=createjs.RequestUtils.isCrossDomain(a),c={},d=null;if(window.XMLHttpRequest)d=new XMLHttpRequest,b&&void 0===d.withCredentials&&window.XDomainRequest&&(d=new XDomainRequest);else{for(var e=0,f=s.ACTIVEX_VERSIONS.length;f>e;e++){var g=s.ACTIVEX_VERSIONS[e];try{d=new ActiveXObject(g);break}catch(h){}}if(null==d)return!1}null==a.mimeType&&createjs.RequestUtils.isText(a.type)&&(a.mimeType="text/plain; charset=utf-8"),a.mimeType&&d.overrideMimeType&&d.overrideMimeType(a.mimeType),this._xhrLevel="string"==typeof d.responseType?2:1;var i=null;if(i=a.method==createjs.AbstractLoader.GET?createjs.RequestUtils.buildPath(a.src,a.values):a.src,d.open(a.method||createjs.AbstractLoader.GET,i,!0),b&&d instanceof XMLHttpRequest&&1==this._xhrLevel&&(c.Origin=location.origin),a.values&&a.method==createjs.AbstractLoader.POST&&(c["Content-Type"]="application/x-www-form-urlencoded"),b||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest"),a.headers)for(var j in a.headers)c[j]=a.headers[j];for(j in c)d.setRequestHeader(j,c[j]);return d instanceof XMLHttpRequest&&void 0!==a.withCredentials&&(d.withCredentials=a.withCredentials),this._request=d,!0},a._clean=function(){clearTimeout(this._loadTimeout),null!=this._request.removeEventListener?(this._request.removeEventListener("loadstart",this._handleLoadStartProxy),this._request.removeEventListener("progress",this._handleProgressProxy),this._request.removeEventListener("abort",this._handleAbortProxy),this._request.removeEventListener("error",this._handleErrorProxy),this._request.removeEventListener("timeout",this._handleTimeoutProxy),this._request.removeEventListener("load",this._handleLoadProxy),this._request.removeEventListener("readystatechange",this._handleReadyStateChangeProxy)):(this._request.onloadstart=null,this._request.onprogress=null,this._request.onabort=null,this._request.onerror=null,this._request.ontimeout=null,this._request.onload=null,this._request.onreadystatechange=null)},a.toString=function(){return"[PreloadJS XHRRequest]"},createjs.XHRRequest=createjs.promote(XHRRequest,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function SoundLoader(a,b){this.AbstractMediaLoader_constructor(a,b,createjs.AbstractLoader.SOUND),createjs.RequestUtils.isAudioTag(a)?this._tag=a:createjs.RequestUtils.isAudioTag(a.src)?this._tag=a:createjs.RequestUtils.isAudioTag(a.tag)&&(this._tag=createjs.RequestUtils.isAudioTag(a)?a:a.src),null!=this._tag&&(this._preferXHR=!1)}var a=createjs.extend(SoundLoader,createjs.AbstractMediaLoader),b=SoundLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.SOUND},a._createTag=function(a){var b=document.createElement("audio");return b.autoplay=!1,b.preload="none",b.src=a,b},createjs.SoundLoader=createjs.promote(SoundLoader,"AbstractMediaLoader")}(),this.createjs=this.createjs||{},function(){"use strict";var PlayPropsConfig=function(){this.interrupt=null,this.delay=null,this.offset=null,this.loop=null,this.volume=null,this.pan=null,this.startTime=null,this.duration=null},a=PlayPropsConfig.prototype={},b=PlayPropsConfig;b.create=function(a){if(a instanceof b||a instanceof Object){var c=new createjs.PlayPropsConfig;return c.set(a),c}throw new Error("Type not recognized.")},a.set=function(a){for(var b in a)this[b]=a[b];return this},a.toString=function(){return"[PlayPropsConfig]"},createjs.PlayPropsConfig=b}(),this.createjs=this.createjs||{},function(){"use strict";function Sound(){throw"Sound cannot be instantiated"}function a(a,b){this.init(a,b)}var b=Sound;b.INTERRUPT_ANY="any",b.INTERRUPT_EARLY="early",b.INTERRUPT_LATE="late",b.INTERRUPT_NONE="none",b.PLAY_INITED="playInited",b.PLAY_SUCCEEDED="playSucceeded",b.PLAY_INTERRUPTED="playInterrupted",b.PLAY_FINISHED="playFinished",b.PLAY_FAILED="playFailed",b.SUPPORTED_EXTENSIONS=["mp3","ogg","opus","mpeg","wav","m4a","mp4","aiff","wma","mid"],b.EXTENSION_MAP={m4a:"mp4"},b.FILE_PATTERN=/^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([\/.]*?(?:[^?]+)?\/)?((?:[^\/?]+)\.(\w+))(?:\?(\S+)?)?$/,b.defaultInterruptBehavior=b.INTERRUPT_NONE,b.alternateExtensions=[],b.activePlugin=null,b._masterVolume=1,Object.defineProperty(b,"volume",{get:function(){return this._masterVolume},set:function(a){if(null==Number(a))return!1;if(a=Math.max(0,Math.min(1,a)),b._masterVolume=a,!this.activePlugin||!this.activePlugin.setVolume||!this.activePlugin.setVolume(a))for(var c=this._instances,d=0,e=c.length;e>d;d++)c[d].setMasterVolume(a)}}),b._masterMute=!1,Object.defineProperty(b,"muted",{get:function(){return this._masterMute},set:function(a){if(null==a)return!1;if(this._masterMute=a,!this.activePlugin||!this.activePlugin.setMute||!this.activePlugin.setMute(a))for(var b=this._instances,c=0,d=b.length;d>c;c++)b[c].setMasterMute(a);return!0}}),Object.defineProperty(b,"capabilities",{get:function(){return null==b.activePlugin?null:b.activePlugin._capabilities},set:function(){return!1}}),b._pluginsRegistered=!1,b._lastID=0,b._instances=[],b._idHash={},b._preloadHash={},b._defaultPlayPropsHash={},b.addEventListener=null,b.removeEventListener=null,b.removeAllEventListeners=null,b.dispatchEvent=null,b.hasEventListener=null,b._listeners=null,createjs.EventDispatcher.initialize(b),b.getPreloadHandlers=function(){return{callback:createjs.proxy(b.initLoad,b),types:["sound"],extensions:b.SUPPORTED_EXTENSIONS}},b._handleLoadComplete=function(a){var c=a.target.getItem().src;if(b._preloadHash[c])for(var d=0,e=b._preloadHash[c].length;e>d;d++){var f=b._preloadHash[c][d];if(b._preloadHash[c][d]=!0,b.hasEventListener("fileload")){var a=new createjs.Event("fileload");a.src=f.src,a.id=f.id,a.data=f.data,a.sprite=f.sprite,b.dispatchEvent(a)}}},b._handleLoadError=function(a){var c=a.target.getItem().src;if(b._preloadHash[c])for(var d=0,e=b._preloadHash[c].length;e>d;d++){var f=b._preloadHash[c][d];if(b._preloadHash[c][d]=!1,b.hasEventListener("fileerror")){var a=new createjs.Event("fileerror");a.src=f.src,a.id=f.id,a.data=f.data,a.sprite=f.sprite,b.dispatchEvent(a)}}},b._registerPlugin=function(a){return a.isSupported()?(b.activePlugin=new a,!0):!1},b.registerPlugins=function(a){b._pluginsRegistered=!0;for(var c=0,d=a.length;d>c;c++)if(b._registerPlugin(a[c]))return!0;return!1},b.initializeDefaultPlugins=function(){return null!=b.activePlugin?!0:b._pluginsRegistered?!1:b.registerPlugins([createjs.WebAudioPlugin,createjs.HTMLAudioPlugin])?!0:!1},b.isReady=function(){return null!=b.activePlugin},b.getCapabilities=function(){return null==b.activePlugin?null:b.activePlugin._capabilities},b.getCapability=function(a){return null==b.activePlugin?null:b.activePlugin._capabilities[a]},b.initLoad=function(a){return b._registerSound(a)},b._registerSound=function(c){if(!b.initializeDefaultPlugins())return!1;var d;if(c.src instanceof Object?(d=b._parseSrc(c.src),d.src=c.path+d.src):d=b._parsePath(c.src),null==d)return!1;c.src=d.src,c.type="sound";var e=c.data,f=null;if(null!=e&&(isNaN(e.channels)?isNaN(e)||(f=parseInt(e)):f=parseInt(e.channels),e.audioSprite))for(var g,h=e.audioSprite.length;h--;)g=e.audioSprite[h],b._idHash[g.id]={src:c.src,startTime:parseInt(g.startTime),duration:parseInt(g.duration)},g.defaultPlayProps&&(b._defaultPlayPropsHash[g.id]=createjs.PlayPropsConfig.create(g.defaultPlayProps));null!=c.id&&(b._idHash[c.id]={src:c.src});var i=b.activePlugin.register(c);return a.create(c.src,f),null!=e&&isNaN(e)?c.data.channels=f||a.maxPerChannel():c.data=f||a.maxPerChannel(),i.type&&(c.type=i.type),c.defaultPlayProps&&(b._defaultPlayPropsHash[c.src]=createjs.PlayPropsConfig.create(c.defaultPlayProps)),i},b.registerSound=function(a,c,d,e,f){var g={src:a,id:c,data:d,defaultPlayProps:f};a instanceof Object&&a.src&&(e=c,g=a),g=createjs.LoadItem.create(g),g.path=e,null==e||g.src instanceof Object||(g.src=e+a);var h=b._registerSound(g);if(!h)return!1;if(b._preloadHash[g.src]||(b._preloadHash[g.src]=[]),b._preloadHash[g.src].push(g),1==b._preloadHash[g.src].length)h.on("complete",createjs.proxy(this._handleLoadComplete,this)),h.on("error",createjs.proxy(this._handleLoadError,this)),b.activePlugin.preload(h);else if(1==b._preloadHash[g.src][0])return!0;return g},b.registerSounds=function(a,b){var c=[];a.path&&(b?b+=a.path:b=a.path,a=a.manifest);for(var d=0,e=a.length;e>d;d++)c[d]=createjs.Sound.registerSound(a[d].src,a[d].id,a[d].data,b,a[d].defaultPlayProps);return c},b.removeSound=function(c,d){if(null==b.activePlugin)return!1;c instanceof Object&&c.src&&(c=c.src);var e;if(c instanceof Object?e=b._parseSrc(c):(c=b._getSrcById(c).src,e=b._parsePath(c)),null==e)return!1;c=e.src,null!=d&&(c=d+c);for(var f in b._idHash)b._idHash[f].src==c&&delete b._idHash[f];return a.removeSrc(c),delete b._preloadHash[c],b.activePlugin.removeSound(c),!0},b.removeSounds=function(a,b){var c=[];a.path&&(b?b+=a.path:b=a.path,a=a.manifest);for(var d=0,e=a.length;e>d;d++)c[d]=createjs.Sound.removeSound(a[d].src,b);return c},b.removeAllSounds=function(){b._idHash={},b._preloadHash={},a.removeAll(),b.activePlugin&&b.activePlugin.removeAllSounds()},b.loadComplete=function(a){if(!b.isReady())return!1;var c=b._parsePath(a);return a=c?b._getSrcById(c.src).src:b._getSrcById(a).src,void 0==b._preloadHash[a]?!1:1==b._preloadHash[a][0]},b._parsePath=function(a){"string"!=typeof a&&(a=a.toString());var c=a.match(b.FILE_PATTERN);if(null==c)return!1;for(var d=c[4],e=c[5],f=b.capabilities,g=0;!f[e];)if(e=b.alternateExtensions[g++],g>b.alternateExtensions.length)return null;a=a.replace("."+c[5],"."+e);var h={name:d,src:a,extension:e};return h},b._parseSrc=function(a){var c={name:void 0,src:void 0,extension:void 0},d=b.capabilities;for(var e in a)if(a.hasOwnProperty(e)&&d[e]){c.src=a[e],c.extension=e;break}if(!c.src)return!1;var f=c.src.lastIndexOf("/");return c.name=-1!=f?c.src.slice(f+1):c.src,c},b.play=function(a,c,d,e,f,g,h,i,j){var k;k=createjs.PlayPropsConfig.create(c instanceof Object||c instanceof createjs.PlayPropsConfig?c:{interrupt:c,delay:d,offset:e,loop:f,volume:g,pan:h,startTime:i,duration:j});var l=b.createInstance(a,k.startTime,k.duration),m=b._playInstance(l,k);return m||l._playFailed(),l},b.createInstance=function(c,d,e){if(!b.initializeDefaultPlugins())return new createjs.DefaultSoundInstance(c,d,e);var f=b._defaultPlayPropsHash[c];c=b._getSrcById(c);var g=b._parsePath(c.src),h=null;
return null!=g&&null!=g.src?(a.create(g.src),null==d&&(d=c.startTime),h=b.activePlugin.create(g.src,d,e||c.duration),f=f||b._defaultPlayPropsHash[g.src],f&&h.applyPlayProps(f)):h=new createjs.DefaultSoundInstance(c,d,e),h.uniqueId=b._lastID++,h},b.stop=function(){for(var a=this._instances,b=a.length;b--;)a[b].stop()},b.setVolume=function(a){if(null==Number(a))return!1;if(a=Math.max(0,Math.min(1,a)),b._masterVolume=a,!this.activePlugin||!this.activePlugin.setVolume||!this.activePlugin.setVolume(a))for(var c=this._instances,d=0,e=c.length;e>d;d++)c[d].setMasterVolume(a)},b.getVolume=function(){return this._masterVolume},b.setMute=function(a){if(null==a)return!1;if(this._masterMute=a,!this.activePlugin||!this.activePlugin.setMute||!this.activePlugin.setMute(a))for(var b=this._instances,c=0,d=b.length;d>c;c++)b[c].setMasterMute(a);return!0},b.getMute=function(){return this._masterMute},b.setDefaultPlayProps=function(a,c){a=b._getSrcById(a),b._defaultPlayPropsHash[b._parsePath(a.src).src]=createjs.PlayPropsConfig.create(c)},b.getDefaultPlayProps=function(a){return a=b._getSrcById(a),b._defaultPlayPropsHash[b._parsePath(a.src).src]},b._playInstance=function(a,c){var d=b._defaultPlayPropsHash[a.src]||{};if(null==c.interrupt&&(c.interrupt=d.interrupt||b.defaultInterruptBehavior),null==c.delay&&(c.delay=d.delay||0),null==c.offset&&(c.offset=a.getPosition()),null==c.loop&&(c.loop=a.loop),null==c.volume&&(c.volume=a.volume),null==c.pan&&(c.pan=a.pan),0==c.delay){var e=b._beginPlaying(a,c);if(!e)return!1}else{var f=setTimeout(function(){b._beginPlaying(a,c)},c.delay);a.delayTimeoutId=f}return this._instances.push(a),!0},b._beginPlaying=function(b,c){if(!a.add(b,c.interrupt))return!1;var d=b._beginPlaying(c);if(!d){var e=createjs.indexOf(this._instances,b);return e>-1&&this._instances.splice(e,1),!1}return!0},b._getSrcById=function(a){return b._idHash[a]||{src:a}},b._playFinished=function(b){a.remove(b);var c=createjs.indexOf(this._instances,b);c>-1&&this._instances.splice(c,1)},createjs.Sound=Sound,a.channels={},a.create=function(b,c){var d=a.get(b);return null==d?(a.channels[b]=new a(b,c),!0):!1},a.removeSrc=function(b){var c=a.get(b);return null==c?!1:(c._removeAll(),delete a.channels[b],!0)},a.removeAll=function(){for(var b in a.channels)a.channels[b]._removeAll();a.channels={}},a.add=function(b,c){var d=a.get(b.src);return null==d?!1:d._add(b,c)},a.remove=function(b){var c=a.get(b.src);return null==c?!1:(c._remove(b),!0)},a.maxPerChannel=function(){return c.maxDefault},a.get=function(b){return a.channels[b]};var c=a.prototype;c.constructor=a,c.src=null,c.max=null,c.maxDefault=100,c.length=0,c.init=function(a,b){this.src=a,this.max=b||this.maxDefault,-1==this.max&&(this.max=this.maxDefault),this._instances=[]},c._get=function(a){return this._instances[a]},c._add=function(a,b){return this._getSlot(b,a)?(this._instances.push(a),this.length++,!0):!1},c._remove=function(a){var b=createjs.indexOf(this._instances,a);return-1==b?!1:(this._instances.splice(b,1),this.length--,!0)},c._removeAll=function(){for(var a=this.length-1;a>=0;a--)this._instances[a].stop()},c._getSlot=function(a){var b,c;if(a!=Sound.INTERRUPT_NONE&&(c=this._get(0),null==c))return!0;for(var d=0,e=this.max;e>d;d++){if(b=this._get(d),null==b)return!0;if(b.playState==Sound.PLAY_FINISHED||b.playState==Sound.PLAY_INTERRUPTED||b.playState==Sound.PLAY_FAILED){c=b;break}a!=Sound.INTERRUPT_NONE&&(a==Sound.INTERRUPT_EARLY&&b.getPosition()<c.getPosition()||a==Sound.INTERRUPT_LATE&&b.getPosition()>c.getPosition())&&(c=b)}return null!=c?(c._interrupt(),this._remove(c),!0):!1},c.toString=function(){return"[Sound SoundChannel]"}}(),this.createjs=this.createjs||{},function(){"use strict";var AbstractSoundInstance=function(a,b,c,d){this.EventDispatcher_constructor(),this.src=a,this.uniqueId=-1,this.playState=null,this.delayTimeoutId=null,this._volume=1,Object.defineProperty(this,"volume",{get:this.getVolume,set:this.setVolume}),this._pan=0,Object.defineProperty(this,"pan",{get:this.getPan,set:this.setPan}),this._startTime=Math.max(0,b||0),Object.defineProperty(this,"startTime",{get:this.getStartTime,set:this.setStartTime}),this._duration=Math.max(0,c||0),Object.defineProperty(this,"duration",{get:this.getDuration,set:this.setDuration}),this._playbackResource=null,Object.defineProperty(this,"playbackResource",{get:this.getPlaybackResource,set:this.setPlaybackResource}),d!==!1&&d!==!0&&this.setPlaybackResource(d),this._position=0,Object.defineProperty(this,"position",{get:this.getPosition,set:this.setPosition}),this._loop=0,Object.defineProperty(this,"loop",{get:this.getLoop,set:this.setLoop}),this._muted=!1,Object.defineProperty(this,"muted",{get:this.getMuted,set:this.setMuted}),this._paused=!1,Object.defineProperty(this,"paused",{get:this.getPaused,set:this.setPaused})},a=createjs.extend(AbstractSoundInstance,createjs.EventDispatcher);a.play=function(a,b,c,d,e,f){var g;return g=createjs.PlayPropsConfig.create(a instanceof Object||a instanceof createjs.PlayPropsConfig?a:{interrupt:a,delay:b,offset:c,loop:d,volume:e,pan:f}),this.playState==createjs.Sound.PLAY_SUCCEEDED?(this.applyPlayProps(g),void(this._paused&&this.setPaused(!1))):(this._cleanUp(),createjs.Sound._playInstance(this,g),this)},a.stop=function(){return this._position=0,this._paused=!1,this._handleStop(),this._cleanUp(),this.playState=createjs.Sound.PLAY_FINISHED,this},a.destroy=function(){this._cleanUp(),this.src=null,this.playbackResource=null,this.removeAllEventListeners()},a.applyPlayProps=function(a){return null!=a.offset&&this.setPosition(a.offset),null!=a.loop&&this.setLoop(a.loop),null!=a.volume&&this.setVolume(a.volume),null!=a.pan&&this.setPan(a.pan),null!=a.startTime&&(this.setStartTime(a.startTime),this.setDuration(a.duration)),this},a.toString=function(){return"[AbstractSoundInstance]"},a.getPaused=function(){return this._paused},a.setPaused=function(a){return a!==!0&&a!==!1||this._paused==a||1==a&&this.playState!=createjs.Sound.PLAY_SUCCEEDED?void 0:(this._paused=a,a?this._pause():this._resume(),clearTimeout(this.delayTimeoutId),this)},a.setVolume=function(a){return a==this._volume?this:(this._volume=Math.max(0,Math.min(1,a)),this._muted||this._updateVolume(),this)},a.getVolume=function(){return this._volume},a.setMuted=function(a){return a===!0||a===!1?(this._muted=a,this._updateVolume(),this):void 0},a.getMuted=function(){return this._muted},a.setPan=function(a){return a==this._pan?this:(this._pan=Math.max(-1,Math.min(1,a)),this._updatePan(),this)},a.getPan=function(){return this._pan},a.getPosition=function(){return this._paused||this.playState!=createjs.Sound.PLAY_SUCCEEDED||(this._position=this._calculateCurrentPosition()),this._position},a.setPosition=function(a){return this._position=Math.max(0,a),this.playState==createjs.Sound.PLAY_SUCCEEDED&&this._updatePosition(),this},a.getStartTime=function(){return this._startTime},a.setStartTime=function(a){return a==this._startTime?this:(this._startTime=Math.max(0,a||0),this._updateStartTime(),this)},a.getDuration=function(){return this._duration},a.setDuration=function(a){return a==this._duration?this:(this._duration=Math.max(0,a||0),this._updateDuration(),this)},a.setPlaybackResource=function(a){return this._playbackResource=a,0==this._duration&&this._setDurationFromSource(),this},a.getPlaybackResource=function(){return this._playbackResource},a.getLoop=function(){return this._loop},a.setLoop=function(a){null!=this._playbackResource&&(0!=this._loop&&0==a?this._removeLooping(a):0==this._loop&&0!=a&&this._addLooping(a)),this._loop=a},a._sendEvent=function(a){var b=new createjs.Event(a);this.dispatchEvent(b)},a._cleanUp=function(){clearTimeout(this.delayTimeoutId),this._handleCleanUp(),this._paused=!1,createjs.Sound._playFinished(this)},a._interrupt=function(){this._cleanUp(),this.playState=createjs.Sound.PLAY_INTERRUPTED,this._sendEvent("interrupted")},a._beginPlaying=function(a){return this.setPosition(a.offset),this.setLoop(a.loop),this.setVolume(a.volume),this.setPan(a.pan),null!=a.startTime&&(this.setStartTime(a.startTime),this.setDuration(a.duration)),null!=this._playbackResource&&this._position<this._duration?(this._paused=!1,this._handleSoundReady(),this.playState=createjs.Sound.PLAY_SUCCEEDED,this._sendEvent("succeeded"),!0):(this._playFailed(),!1)},a._playFailed=function(){this._cleanUp(),this.playState=createjs.Sound.PLAY_FAILED,this._sendEvent("failed")},a._handleSoundComplete=function(){return this._position=0,0!=this._loop?(this._loop--,this._handleLoop(),void this._sendEvent("loop")):(this._cleanUp(),this.playState=createjs.Sound.PLAY_FINISHED,void this._sendEvent("complete"))},a._handleSoundReady=function(){},a._updateVolume=function(){},a._updatePan=function(){},a._updateStartTime=function(){},a._updateDuration=function(){},a._setDurationFromSource=function(){},a._calculateCurrentPosition=function(){},a._updatePosition=function(){},a._removeLooping=function(){},a._addLooping=function(){},a._pause=function(){},a._resume=function(){},a._handleStop=function(){},a._handleCleanUp=function(){},a._handleLoop=function(){},createjs.AbstractSoundInstance=createjs.promote(AbstractSoundInstance,"EventDispatcher"),createjs.DefaultSoundInstance=createjs.AbstractSoundInstance}(),this.createjs=this.createjs||{},function(){"use strict";var AbstractPlugin=function(){this._capabilities=null,this._loaders={},this._audioSources={},this._soundInstances={},this._volume=1,this._loaderClass,this._soundInstanceClass},a=AbstractPlugin.prototype;AbstractPlugin._capabilities=null,AbstractPlugin.isSupported=function(){return!0},a.register=function(a){var b=this._loaders[a.src];return b&&!b.canceled?this._loaders[a.src]:(this._audioSources[a.src]=!0,this._soundInstances[a.src]=[],b=new this._loaderClass(a),b.on("complete",this._handlePreloadComplete,this),this._loaders[a.src]=b,b)},a.preload=function(a){a.on("error",this._handlePreloadError,this),a.load()},a.isPreloadStarted=function(a){return null!=this._audioSources[a]},a.isPreloadComplete=function(a){return!(null==this._audioSources[a]||1==this._audioSources[a])},a.removeSound=function(a){if(this._soundInstances[a]){for(var b=this._soundInstances[a].length;b--;){var c=this._soundInstances[a][b];c.destroy()}delete this._soundInstances[a],delete this._audioSources[a],this._loaders[a]&&this._loaders[a].destroy(),delete this._loaders[a]}},a.removeAllSounds=function(){for(var a in this._audioSources)this.removeSound(a)},a.create=function(a,b,c){this.isPreloadStarted(a)||this.preload(this.register(a));var d=new this._soundInstanceClass(a,b,c,this._audioSources[a]);return this._soundInstances[a].push(d),d},a.setVolume=function(a){return this._volume=a,this._updateVolume(),!0},a.getVolume=function(){return this._volume},a.setMute=function(){return this._updateVolume(),!0},a.toString=function(){return"[AbstractPlugin]"},a._handlePreloadComplete=function(a){var b=a.target.getItem().src;this._audioSources[b]=a.result;for(var c=0,d=this._soundInstances[b].length;d>c;c++){var e=this._soundInstances[b][c];e.setPlaybackResource(this._audioSources[b])}},a._handlePreloadError=function(){},a._updateVolume=function(){},createjs.AbstractPlugin=AbstractPlugin}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.SOUND)}var b=createjs.extend(a,createjs.AbstractLoader);a.context=null,b.toString=function(){return"[WebAudioLoader]"},b._createRequest=function(){this._request=new createjs.XHRRequest(this._item,!1),this._request.setResponseType("arraybuffer")},b._sendComplete=function(){a.context.decodeAudioData(this._rawResult,createjs.proxy(this._handleAudioDecoded,this),createjs.proxy(this._sendError,this))},b._handleAudioDecoded=function(a){this._result=a,this.AbstractLoader__sendComplete()},createjs.WebAudioLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function WebAudioSoundInstance(a,c,d,e){this.AbstractSoundInstance_constructor(a,c,d,e),this.gainNode=b.context.createGain(),this.panNode=b.context.createPanner(),this.panNode.panningModel=b._panningModel,this.panNode.connect(this.gainNode),this._updatePan(),this.sourceNode=null,this._soundCompleteTimeout=null,this._sourceNodeNext=null,this._playbackStartTime=0,this._endedHandler=createjs.proxy(this._handleSoundComplete,this)}var a=createjs.extend(WebAudioSoundInstance,createjs.AbstractSoundInstance),b=WebAudioSoundInstance;b.context=null,b._scratchBuffer=null,b.destinationNode=null,b._panningModel="equalpower",a.destroy=function(){this.AbstractSoundInstance_destroy(),this.panNode.disconnect(0),this.panNode=null,this.gainNode.disconnect(0),this.gainNode=null},a.toString=function(){return"[WebAudioSoundInstance]"},a._updatePan=function(){this.panNode.setPosition(this._pan,0,-.5)},a._removeLooping=function(){this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext)},a._addLooping=function(){this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0))},a._setDurationFromSource=function(){this._duration=1e3*this.playbackResource.duration},a._handleCleanUp=function(){this.sourceNode&&this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext)),0!=this.gainNode.numberOfOutputs&&this.gainNode.disconnect(0),clearTimeout(this._soundCompleteTimeout),this._playbackStartTime=0},a._cleanUpAudioNode=function(a){if(a){a.stop(0),a.disconnect(0);try{a.buffer=b._scratchBuffer}catch(c){}a=null}return a},a._handleSoundReady=function(){this.gainNode.connect(b.destinationNode);var a=.001*this._duration,c=.001*this._position;c>a&&(c=a),this.sourceNode=this._createAndPlayAudioNode(b.context.currentTime-a,c),this._playbackStartTime=this.sourceNode.startTime-c,this._soundCompleteTimeout=setTimeout(this._endedHandler,1e3*(a-c)),0!=this._loop&&(this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0))},a._createAndPlayAudioNode=function(a,c){var d=b.context.createBufferSource();d.buffer=this.playbackResource,d.connect(this.panNode);var e=.001*this._duration;return d.startTime=a+e,d.start(d.startTime,c+.001*this._startTime,e-c),d},a._pause=function(){this._position=1e3*(b.context.currentTime-this._playbackStartTime),this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext),0!=this.gainNode.numberOfOutputs&&this.gainNode.disconnect(0),clearTimeout(this._soundCompleteTimeout)},a._resume=function(){this._handleSoundReady()},a._updateVolume=function(){var a=this._muted?0:this._volume;a!=this.gainNode.gain.value&&(this.gainNode.gain.value=a)},a._calculateCurrentPosition=function(){return 1e3*(b.context.currentTime-this._playbackStartTime)},a._updatePosition=function(){this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext),clearTimeout(this._soundCompleteTimeout),this._paused||this._handleSoundReady()},a._handleLoop=function(){this._cleanUpAudioNode(this.sourceNode),this.sourceNode=this._sourceNodeNext,this._playbackStartTime=this.sourceNode.startTime,this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0),this._soundCompleteTimeout=setTimeout(this._endedHandler,this._duration)},a._updateDuration=function(){this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._pause(),this._resume())},createjs.WebAudioSoundInstance=createjs.promote(WebAudioSoundInstance,"AbstractSoundInstance")}(),this.createjs=this.createjs||{},function(){"use strict";function WebAudioPlugin(){this.AbstractPlugin_constructor(),this._panningModel=b._panningModel,this.context=b.context,this.dynamicsCompressorNode=this.context.createDynamicsCompressor(),this.dynamicsCompressorNode.connect(this.context.destination),this.gainNode=this.context.createGain(),this.gainNode.connect(this.dynamicsCompressorNode),createjs.WebAudioSoundInstance.destinationNode=this.gainNode,this._capabilities=b._capabilities,this._loaderClass=createjs.WebAudioLoader,this._soundInstanceClass=createjs.WebAudioSoundInstance,this._addPropsToClasses()}var a=createjs.extend(WebAudioPlugin,createjs.AbstractPlugin),b=WebAudioPlugin;b._capabilities=null,b._panningModel="equalpower",b.context=null,b._scratchBuffer=null,b._unlocked=!1,b.isSupported=function(){var a=createjs.BrowserDetect.isIOS||createjs.BrowserDetect.isAndroid||createjs.BrowserDetect.isBlackberry;return"file:"!=location.protocol||a||this._isFileXHRSupported()?(b._generateCapabilities(),null==b.context?!1:!0):!1},b.playEmptySound=function(){if(null!=b.context){var a=b.context.createBufferSource();a.buffer=b._scratchBuffer,a.connect(b.context.destination),a.start(0,0,0)}},b._isFileXHRSupported=function(){var a=!0,b=new XMLHttpRequest;try{b.open("GET","WebAudioPluginTest.fail",!1)}catch(c){return a=!1}b.onerror=function(){a=!1},b.onload=function(){a=404==this.status||200==this.status||0==this.status&&""!=this.response};try{b.send()}catch(c){a=!1}return a},b._generateCapabilities=function(){if(null==b._capabilities){var a=document.createElement("audio");if(null==a.canPlayType)return null;if(null==b.context)if(window.AudioContext)b.context=new AudioContext;else{if(!window.webkitAudioContext)return null;b.context=new webkitAudioContext}null==b._scratchBuffer&&(b._scratchBuffer=b.context.createBuffer(1,1,22050)),b._compatibilitySetUp(),"ontouchstart"in window&&"running"!=b.context.state&&(b._unlock(),document.addEventListener("mousedown",b._unlock,!0),document.addEventListener("touchend",b._unlock,!0)),b._capabilities={panning:!0,volume:!0,tracks:-1};for(var c=createjs.Sound.SUPPORTED_EXTENSIONS,d=createjs.Sound.EXTENSION_MAP,e=0,f=c.length;f>e;e++){var g=c[e],h=d[g]||g;b._capabilities[g]="no"!=a.canPlayType("audio/"+g)&&""!=a.canPlayType("audio/"+g)||"no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)}b.context.destination.numberOfChannels<2&&(b._capabilities.panning=!1)}},b._compatibilitySetUp=function(){if(b._panningModel="equalpower",!b.context.createGain){b.context.createGain=b.context.createGainNode;var a=b.context.createBufferSource();a.__proto__.start=a.__proto__.noteGrainOn,a.__proto__.stop=a.__proto__.noteOff,b._panningModel=0}},b._unlock=function(){b._unlocked||(b.playEmptySound(),"running"==b.context.state&&(document.removeEventListener("mousedown",b._unlock,!0),document.removeEventListener("touchend",b._unlock,!0),b._unlocked=!0))},a.toString=function(){return"[WebAudioPlugin]"},a._addPropsToClasses=function(){var a=this._soundInstanceClass;a.context=this.context,a._scratchBuffer=b._scratchBuffer,a.destinationNode=this.gainNode,a._panningModel=this._panningModel,this._loaderClass.context=this.context},a._updateVolume=function(){var a=createjs.Sound._masterMute?0:this._volume;a!=this.gainNode.gain.value&&(this.gainNode.gain.value=a)},createjs.WebAudioPlugin=createjs.promote(WebAudioPlugin,"AbstractPlugin")}(),this.createjs=this.createjs||{},function(){"use strict";function HTMLAudioTagPool(){throw"HTMLAudioTagPool cannot be instantiated"}function a(){this._tags=[]}var b=HTMLAudioTagPool;b._tags={},b._tagPool=new a,b._tagUsed={},b.get=function(a){var c=b._tags[a];return null==c?(c=b._tags[a]=b._tagPool.get(),c.src=a):b._tagUsed[a]?(c=b._tagPool.get(),c.src=a):b._tagUsed[a]=!0,c},b.set=function(a,c){c==b._tags[a]?b._tagUsed[a]=!1:b._tagPool.set(c)},b.remove=function(a){var c=b._tags[a];return null==c?!1:(b._tagPool.set(c),delete b._tags[a],delete b._tagUsed[a],!0)},b.getDuration=function(a){var c=b._tags[a];return null!=c&&c.duration?1e3*c.duration:0},createjs.HTMLAudioTagPool=HTMLAudioTagPool;var c=a.prototype;c.constructor=a,c.get=function(){var a;return a=0==this._tags.length?this._createTag():this._tags.pop(),null==a.parentNode&&document.body.appendChild(a),a},c.set=function(a){var b=createjs.indexOf(this._tags,a);-1==b&&(this._tags.src=null,this._tags.push(a))},c.toString=function(){return"[TagPool]"},c._createTag=function(){var a=document.createElement("audio");return a.autoplay=!1,a.preload="none",a}}(),this.createjs=this.createjs||{},function(){"use strict";function HTMLAudioSoundInstance(a,b,c,d){this.AbstractSoundInstance_constructor(a,b,c,d),this._audioSpriteStopTime=null,this._delayTimeoutId=null,this._endedHandler=createjs.proxy(this._handleSoundComplete,this),this._readyHandler=createjs.proxy(this._handleTagReady,this),this._stalledHandler=createjs.proxy(this._playFailed,this),this._audioSpriteEndHandler=createjs.proxy(this._handleAudioSpriteLoop,this),this._loopHandler=createjs.proxy(this._handleSoundComplete,this),c?this._audioSpriteStopTime=.001*(b+c):this._duration=createjs.HTMLAudioTagPool.getDuration(this.src)}var a=createjs.extend(HTMLAudioSoundInstance,createjs.AbstractSoundInstance);a.setMasterVolume=function(){this._updateVolume()},a.setMasterMute=function(){this._updateVolume()},a.toString=function(){return"[HTMLAudioSoundInstance]"},a._removeLooping=function(){null!=this._playbackResource&&(this._playbackResource.loop=!1,this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},a._addLooping=function(){null==this._playbackResource||this._audioSpriteStopTime||(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.loop=!0)},a._handleCleanUp=function(){var a=this._playbackResource;if(null!=a){a.pause(),a.loop=!1,a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1);try{a.currentTime=this._startTime}catch(b){}createjs.HTMLAudioTagPool.set(this.src,a),this._playbackResource=null}},a._beginPlaying=function(a){return this._playbackResource=createjs.HTMLAudioTagPool.get(this.src),this.AbstractSoundInstance__beginPlaying(a)},a._handleSoundReady=function(){if(4!==this._playbackResource.readyState){var a=this._playbackResource;return a.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),a.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),a.preload="auto",void a.load()}this._updateVolume(),this._playbackResource.currentTime=.001*(this._startTime+this._position),this._audioSpriteStopTime?this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1):(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),0!=this._loop&&(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.loop=!0)),this._playbackResource.play()},a._handleTagReady=function(){this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),this._handleSoundReady()},a._pause=function(){this._playbackResource.pause()},a._resume=function(){this._playbackResource.play()},a._updateVolume=function(){if(null!=this._playbackResource){var a=this._muted||createjs.Sound._masterMute?0:this._volume*createjs.Sound._masterVolume;a!=this._playbackResource.volume&&(this._playbackResource.volume=a)}},a._calculateCurrentPosition=function(){return 1e3*this._playbackResource.currentTime-this._startTime},a._updatePosition=function(){this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._handleSetPositionSeek,!1);try{this._playbackResource.currentTime=.001*(this._position+this._startTime)}catch(a){this._handleSetPositionSeek(null)}},a._handleSetPositionSeek=function(){null!=this._playbackResource&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._handleSetPositionSeek,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},a._handleAudioSpriteLoop=function(){this._playbackResource.currentTime<=this._audioSpriteStopTime||(this._playbackResource.pause(),0==this._loop?this._handleSoundComplete(null):(this._position=0,this._loop--,this._playbackResource.currentTime=.001*this._startTime,this._paused||this._playbackResource.play(),this._sendEvent("loop")))},a._handleLoop=function(){0==this._loop&&(this._playbackResource.loop=!1,this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},a._updateStartTime=function(){this._audioSpriteStopTime=.001*(this._startTime+this._duration),this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1))},a._updateDuration=function(){this._audioSpriteStopTime=.001*(this._startTime+this._duration),this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1))},a._setDurationFromSource=function(){this._duration=createjs.HTMLAudioTagPool.getDuration(this.src),this._playbackResource=null},createjs.HTMLAudioSoundInstance=createjs.promote(HTMLAudioSoundInstance,"AbstractSoundInstance")}(),this.createjs=this.createjs||{},function(){"use strict";function HTMLAudioPlugin(){this.AbstractPlugin_constructor(),this.defaultNumChannels=2,this._capabilities=b._capabilities,this._loaderClass=createjs.SoundLoader,this._soundInstanceClass=createjs.HTMLAudioSoundInstance}var a=createjs.extend(HTMLAudioPlugin,createjs.AbstractPlugin),b=HTMLAudioPlugin;b.MAX_INSTANCES=30,b._AUDIO_READY="canplaythrough",b._AUDIO_ENDED="ended",b._AUDIO_SEEKED="seeked",b._AUDIO_STALLED="stalled",b._TIME_UPDATE="timeupdate",b._capabilities=null,b.isSupported=function(){return b._generateCapabilities(),null!=b._capabilities},b._generateCapabilities=function(){if(null==b._capabilities){var a=document.createElement("audio");if(null==a.canPlayType)return null;b._capabilities={panning:!1,volume:!0,tracks:-1};for(var c=createjs.Sound.SUPPORTED_EXTENSIONS,d=createjs.Sound.EXTENSION_MAP,e=0,f=c.length;f>e;e++){var g=c[e],h=d[g]||g;b._capabilities[g]="no"!=a.canPlayType("audio/"+g)&&""!=a.canPlayType("audio/"+g)||"no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)}}},a.register=function(a){var b=createjs.HTMLAudioTagPool.get(a.src),c=this.AbstractPlugin_register(a);return c.setTag(b),c},a.removeSound=function(a){this.AbstractPlugin_removeSound(a),createjs.HTMLAudioTagPool.remove(a)},a.create=function(a,b,c){var d=this.AbstractPlugin_create(a,b,c);return d.setPlaybackResource(null),d},a.toString=function(){return"[HTMLAudioPlugin]"},a.setVolume=a.getVolume=a.setMute=null,createjs.HTMLAudioPlugin=createjs.promote(HTMLAudioPlugin,"AbstractPlugin")}();

H5P.SoundJS = this.createjs.Sound;

this.createjs = old || this.createjs;
;
/*! odometer 0.4.6 */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G=[].slice;q='<span class="odometer-value"></span>',n='<span class="odometer-ribbon"><span class="odometer-ribbon-inner">'+q+"</span></span>",d='<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">'+n+"</span></span>",g='<span class="odometer-formatting-mark"></span>',c="(,ddd).dd",h=/^\(?([^)]*)\)?(?:(.)(d+))?$/,i=30,f=2e3,a=20,j=2,e=.5,k=1e3/i,b=1e3/a,o="transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",y=document.createElement("div").style,p=null!=y.transition||null!=y.webkitTransition||null!=y.mozTransition||null!=y.oTransition,w=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,l=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,s=function(a){var b;return b=document.createElement("div"),b.innerHTML=a,b.children[0]},v=function(a,b){return a.className=a.className.replace(new RegExp("(^| )"+b.split(" ").join("|")+"( |$)","gi")," ")},r=function(a,b){return v(a,b),a.className+=" "+b},z=function(a,b){var c;return null!=document.createEvent?(c=document.createEvent("HTMLEvents"),c.initEvent(b,!0,!0),a.dispatchEvent(c)):void 0},u=function(){var a,b;return null!=(a=null!=(b=window.performance)?"function"==typeof b.now?b.now():void 0:void 0)?a:+new Date},x=function(a,b){return null==b&&(b=0),b?(a*=Math.pow(10,b),a+=.5,a=Math.floor(a),a/=Math.pow(10,b)):Math.round(a)},A=function(a){return 0>a?Math.ceil(a):Math.floor(a)},t=function(a){return a-x(a)},C=!1,(B=function(){var a,b,c,d,e;if(!C&&null!=window.jQuery){for(C=!0,d=["html","text"],e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(function(a){var b;return b=window.jQuery.fn[a],window.jQuery.fn[a]=function(a){var c;return null==a||null==(null!=(c=this[0])?c.odometer:void 0)?b.apply(this,arguments):this[0].odometer.update(a)}}(a));return e}})(),setTimeout(B,0),m=function(){function a(b){var c,d,e,g,h,i,l,m,n,o,p=this;if(this.options=b,this.el=this.options.el,null!=this.el.odometer)return this.el.odometer;this.el.odometer=this,m=a.options;for(d in m)g=m[d],null==this.options[d]&&(this.options[d]=g);null==(h=this.options).duration&&(h.duration=f),this.MAX_VALUES=this.options.duration/k/j|0,this.resetFormat(),this.value=this.cleanValue(null!=(n=this.options.value)?n:""),this.renderInside(),this.render();try{for(o=["innerHTML","innerText","textContent"],i=0,l=o.length;l>i;i++)e=o[i],null!=this.el[e]&&!function(a){return Object.defineProperty(p.el,a,{get:function(){var b;return"innerHTML"===a?p.inside.outerHTML:null!=(b=p.inside.innerText)?b:p.inside.textContent},set:function(a){return p.update(a)}})}(e)}catch(q){c=q,this.watchForMutations()}}return a.prototype.renderInside=function(){return this.inside=document.createElement("div"),this.inside.className="odometer-inside",this.el.innerHTML="",this.el.appendChild(this.inside)},a.prototype.watchForMutations=function(){var a,b=this;if(null!=l)try{return null==this.observer&&(this.observer=new l(function(){var a;return a=b.el.innerText,b.renderInside(),b.render(b.value),b.update(a)})),this.watchMutations=!0,this.startWatchingMutations()}catch(c){a=c}},a.prototype.startWatchingMutations=function(){return this.watchMutations?this.observer.observe(this.el,{childList:!0}):void 0},a.prototype.stopWatchingMutations=function(){var a;return null!=(a=this.observer)?a.disconnect():void 0},a.prototype.cleanValue=function(a){var b;return"string"==typeof a&&(a=a.replace(null!=(b=this.format.radix)?b:".","<radix>"),a=a.replace(/[.,]/g,""),a=a.replace("<radix>","."),a=parseFloat(a,10)||0),x(a,this.format.precision)},a.prototype.bindTransitionEnd=function(){var a,b,c,d,e,f,g=this;if(!this.transitionEndBound){for(this.transitionEndBound=!0,b=!1,e=o.split(" "),f=[],c=0,d=e.length;d>c;c++)a=e[c],f.push(this.el.addEventListener(a,function(){return b?!0:(b=!0,setTimeout(function(){return g.render(),b=!1,z(g.el,"odometerdone")},0),!0)},!1));return f}},a.prototype.resetFormat=function(){var a,b,d,e,f,g,i,j;if(a=null!=(i=this.options.format)?i:c,a||(a="d"),d=h.exec(a),!d)throw new Error("Odometer: Unparsable digit format");return j=d.slice(1,4),g=j[0],f=j[1],b=j[2],e=(null!=b?b.length:void 0)||0,this.format={repeating:g,radix:f,precision:e}},a.prototype.render=function(a){var b,c,d,e,f,g,h,i,j,k,l,m;for(null==a&&(a=this.value),this.stopWatchingMutations(),this.resetFormat(),this.inside.innerHTML="",g=this.options.theme,b=this.el.className.split(" "),f=[],i=0,k=b.length;k>i;i++)c=b[i],c.length&&((e=/^odometer-theme-(.+)$/.exec(c))?g=e[1]:/^odometer(-|$)/.test(c)||f.push(c));for(f.push("odometer"),p||f.push("odometer-no-transitions"),f.push(g?"odometer-theme-"+g:"odometer-auto-theme"),this.el.className=f.join(" "),this.ribbons={},this.digits=[],h=!this.format.precision||!t(a)||!1,m=a.toString().split("").reverse(),j=0,l=m.length;l>j;j++)d=m[j],"."===d&&(h=!0),this.addDigit(d,h);return this.startWatchingMutations()},a.prototype.update=function(a){var b,c=this;return a=this.cleanValue(a),(b=a-this.value)?(v(this.el,"odometer-animating-up odometer-animating-down odometer-animating"),b>0?r(this.el,"odometer-animating-up"):r(this.el,"odometer-animating-down"),this.stopWatchingMutations(),this.animate(a),this.startWatchingMutations(),setTimeout(function(){return c.el.offsetHeight,r(c.el,"odometer-animating")},0),this.value=a):void 0},a.prototype.renderDigit=function(){return s(d)},a.prototype.insertDigit=function(a,b){return null!=b?this.inside.insertBefore(a,b):this.inside.children.length?this.inside.insertBefore(a,this.inside.children[0]):this.inside.appendChild(a)},a.prototype.addSpacer=function(a,b,c){var d;return d=s(g),d.innerHTML=a,c&&r(d,c),this.insertDigit(d,b)},a.prototype.addDigit=function(a,b){var c,d,e,f;if(null==b&&(b=!0),"-"===a)return this.addSpacer(a,null,"odometer-negation-mark");if("."===a)return this.addSpacer(null!=(f=this.format.radix)?f:".",null,"odometer-radix-mark");if(b)for(e=!1;;){if(!this.format.repeating.length){if(e)throw new Error("Bad odometer format without digits");this.resetFormat(),e=!0}if(c=this.format.repeating[this.format.repeating.length-1],this.format.repeating=this.format.repeating.substring(0,this.format.repeating.length-1),"d"===c)break;this.addSpacer(c)}return d=this.renderDigit(),d.querySelector(".odometer-value").innerHTML=a,this.digits.push(d),this.insertDigit(d)},a.prototype.animate=function(a){return p&&"count"!==this.options.animation?this.animateSlide(a):this.animateCount(a)},a.prototype.animateCount=function(a){var c,d,e,f,g,h=this;if(d=+a-this.value)return f=e=u(),c=this.value,(g=function(){var i,j,k;return u()-f>h.options.duration?(h.value=a,h.render(),void z(h.el,"odometerdone")):(i=u()-e,i>b&&(e=u(),k=i/h.options.duration,j=d*k,c+=j,h.render(Math.round(c))),null!=w?w(g):setTimeout(g,b))})()},a.prototype.getDigitCount=function(){var a,b,c,d,e,f;for(d=1<=arguments.length?G.call(arguments,0):[],a=e=0,f=d.length;f>e;a=++e)c=d[a],d[a]=Math.abs(c);return b=Math.max.apply(Math,d),Math.ceil(Math.log(b+1)/Math.log(10))},a.prototype.getFractionalDigitCount=function(){var a,b,c,d,e,f,g;for(e=1<=arguments.length?G.call(arguments,0):[],b=/^\-?\d*\.(\d*?)0*$/,a=f=0,g=e.length;g>f;a=++f)d=e[a],e[a]=d.toString(),c=b.exec(e[a]),e[a]=null==c?0:c[1].length;return Math.max.apply(Math,e)},a.prototype.resetDigits=function(){return this.digits=[],this.ribbons=[],this.inside.innerHTML="",this.resetFormat()},a.prototype.animateSlide=function(a){var b,c,d,f,g,h,i,j,k,l,m,n,o,p,q,s,t,u,v,w,x,y,z,B,C,D,E;if(s=this.value,j=this.getFractionalDigitCount(s,a),j&&(a*=Math.pow(10,j),s*=Math.pow(10,j)),d=a-s){for(this.bindTransitionEnd(),f=this.getDigitCount(s,a),g=[],b=0,m=v=0;f>=0?f>v:v>f;m=f>=0?++v:--v){if(t=A(s/Math.pow(10,f-m-1)),i=A(a/Math.pow(10,f-m-1)),h=i-t,Math.abs(h)>this.MAX_VALUES){for(l=[],n=h/(this.MAX_VALUES+this.MAX_VALUES*b*e),c=t;h>0&&i>c||0>h&&c>i;)l.push(Math.round(c)),c+=n;l[l.length-1]!==i&&l.push(i),b++}else l=function(){E=[];for(var a=t;i>=t?i>=a:a>=i;i>=t?a++:a--)E.push(a);return E}.apply(this);for(m=w=0,y=l.length;y>w;m=++w)k=l[m],l[m]=Math.abs(k%10);g.push(l)}for(this.resetDigits(),D=g.reverse(),m=x=0,z=D.length;z>x;m=++x)for(l=D[m],this.digits[m]||this.addDigit(" ",m>=j),null==(u=this.ribbons)[m]&&(u[m]=this.digits[m].querySelector(".odometer-ribbon-inner")),this.ribbons[m].innerHTML="",0>d&&(l=l.reverse()),o=C=0,B=l.length;B>C;o=++C)k=l[o],q=document.createElement("div"),q.className="odometer-value",q.innerHTML=k,this.ribbons[m].appendChild(q),o===l.length-1&&r(q,"odometer-last-value"),0===o&&r(q,"odometer-first-value");return 0>t&&this.addDigit("-"),p=this.inside.querySelector(".odometer-radix-mark"),null!=p&&p.parent.removeChild(p),j?this.addSpacer(this.format.radix,this.digits[j-1],"odometer-radix-mark"):void 0}},a}(),m.options=null!=(E=window.odometerOptions)?E:{},setTimeout(function(){var a,b,c,d,e;if(window.odometerOptions){d=window.odometerOptions,e=[];for(a in d)b=d[a],e.push(null!=(c=m.options)[a]?(c=m.options)[a]:c[a]=b);return e}},0),m.init=function(){var a,b,c,d,e,f;if(null!=document.querySelectorAll){for(b=document.querySelectorAll(m.options.selector||".odometer"),f=[],c=0,d=b.length;d>c;c++)a=b[c],f.push(a.odometer=new m({el:a,value:null!=(e=a.innerText)?e:a.textContent}));return f}},null!=(null!=(F=document.documentElement)?F.doScroll:void 0)&&null!=document.createEventObject?(D=document.onreadystatechange,document.onreadystatechange=function(){return"complete"===document.readyState&&m.options.auto!==!1&&m.init(),null!=D?D.apply(this,arguments):void 0}):document.addEventListener("DOMContentLoaded",function(){return m.options.auto!==!1?m.init():void 0},!1),"function"==typeof define&&define.amd?define(["jquery"],function(){return m}):typeof exports===!1?module.exports=m:window.Odometer=m}).call(this);;
if (!Math.sign) {
  Math.sign = function(x) {
    // If x is NaN, the result is NaN.
    // If x is -0, the result is -0.
    // If x is +0, the result is +0.
    // If x is negative and not -0, the result is -1.
    // If x is positive and not +0, the result is +1.
    return ((x > 0) - (x < 0)) || +x;
    // A more aesthetic pseudo-representation:
    //
    // ( (x > 0) ? 1 : 0 )  // if x is positive, then positive one
    //          +           // else (because you can't be both - and +)
    // ( (x < 0) ? -1 : 0 ) // if x is negative, then negative one
    //         ||           // if x is 0, -0, or NaN, or not a number,
    //         +x           // then the result will be x, (or) if x is
    //                      // not a number, then x converts to number
  };
}
(function(e){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=e()}else if(typeof define==="function"&&define.amd){define([],e)}else{var t;if(typeof window!=="undefined"){t=window}else if(typeof global!=="undefined"){t=global}else if(typeof self!=="undefined"){t=self}else{t=this}t.algebra=e()}})(function(){var e,t,r;return function n(e,t,r){function i(o,a){if(!t[o]){if(!e[o]){var u=typeof require=="function"&&require;if(!a&&u)return u(o,!0);if(s)return s(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=t[o]={exports:{}};e[o][0].call(l.exports,function(t){var r=e[o][1][t];return i(r?r:t)},l,l.exports,n,e,t,r)}return t[o].exports}var s=typeof require=="function"&&require;for(var o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,r){var n=e("./src/fractions");var i=e("./src/expressions").Expression;var s=e("./src/equations");var o=e("./src/parser");var a=function(e){var t=new o;var r=t.parse(e);return r};var u=function(e){if(e instanceof n||e instanceof i||e instanceof s){return e.toTex()}else if(e instanceof Array){return e.map(function(e){if(e instanceof n){return e.toTex()}else{return e.toString()}}).join()}else{return e.toString()}};t.exports={Fraction:n,Expression:i,Equation:s,parse:a,toTex:u}},{"./src/equations":2,"./src/expressions":3,"./src/fractions":4,"./src/parser":7}],2:[function(e,t,r){var n=e("./expressions").Expression;var i=e("./expressions").Variable;var s=e("./expressions").Term;var o=e("./fractions");var a=e("./helper").isInt;var u=function(e,t){if(e instanceof n){this.lhs=e;if(t instanceof n){this.rhs=t}else if(t instanceof o||a(t)){this.rhs=new n(t)}else{throw new TypeError("Invalid Argument ("+t.toString()+"): Right-hand side must be of type Expression, Fraction or Integer.")}}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Left-hand side must be of type Expression.")}};u.prototype.solveFor=function(e){if(!this.lhs._hasVariable(e)&&!this.rhs._hasVariable(e)){throw new TypeError("Invalid Argument ("+e.toString()+"): Variable does not exist in the equation.")}if(this._isLinear()||this._variableCanBeIsolated(e)){var t=new s(new i(e));var r=new n;var a=new n;for(var u=0;u<this.rhs.terms.length;u++){var f=this.rhs.terms[u];if(f.canBeCombinedWith(t)){r=r.subtract(f)}else{a=a.add(f)}}for(var u=0;u<this.lhs.terms.length;u++){var f=this.lhs.terms[u];if(f.canBeCombinedWith(t)){r=r.add(f)}else{a=a.subtract(f)}}a=a.subtract(this.lhs.constant());a=a.add(this.rhs.constant());if(r.terms.length===0){if(r.constant().equalTo(a.constant())){return new o(1,1)}else{throw new EvalError("No Solution")}}a=a.divide(r.terms[0].coefficient());if(a.terms.length===0){return a.constant().reduce()}a._sort();return a}else{var r=this.lhs.copy();r=r.subtract(this.rhs);if(r.terms.length===0){if(r.constant().valueOf()===0){return[new o(1,1)]}else{throw new EvalError("No Solution")}}else if(this._isQuadratic(e)){var l=r._quadraticCoefficients();var c=l.a;var p=l.b;var h=l.c;var v=p.pow(2).subtract(c.multiply(h).multiply(4));if(v.valueOf()>=0){if(v.valueOf()===0){return[p.multiply(-1).divide(c.multiply(2)).reduce()]}else{var m;if(v._squareRootIsRational()){m=v.pow(.5);var d=p.multiply(-1).subtract(m).divide(c.multiply(2));var y=p.multiply(-1).add(m).divide(c.multiply(2));return[d.reduce(),y.reduce()]}else{m=Math.sqrt(v.valueOf());c=c.valueOf();p=p.valueOf();var d=(-p-m)/(2*c);var y=(-p+m)/(2*c);return[d,y]}}}else{return[]}}else if(this._isCubic(e)){var l=r._cubicCoefficients();var c=l.a;var p=l.b;var h=l.c;var g=l.d;var b=c.multiply(p).multiply(h).multiply(g).multiply(18);b=b.subtract(p.pow(3).multiply(g).multiply(4));b=b.add(p.pow(2).multiply(h.pow(2)));b=b.subtract(c.multiply(h.pow(3)).multiply(4));b=b.subtract(c.pow(2).multiply(g.pow(2)).multiply(27));var w=p.pow(2).subtract(c.multiply(h).multiply(3));if(b.valueOf()===0){if(w.valueOf()===0){var d=p.multiply(-1).divide(c.multiply(3));return[d.reduce()]}else{var d=c.multiply(p).multiply(h).multiply(4);d=d.subtract(c.pow(2).multiply(g).multiply(9));d=d.subtract(p.pow(3));d=d.divide(c.multiply(w));var y=c.multiply(g).multiply(9).subtract(p.multiply(h)).divide(w.multiply(2));return[d.reduce(),y.reduce()]}}else{var _=(3*(h/c)-Math.pow(p,2)/Math.pow(c,2))/3;var T=2*Math.pow(p,3)/Math.pow(c,3);T=T-9*p*h/Math.pow(c,2);T=T+27*g/c;T=T/27;var E=Math.pow(T,2)/4+Math.pow(_,3)/27;if(E>0){var x=-(T/2)+Math.sqrt(E);var S=Math.cbrt(x);var I=-(T/2)-Math.sqrt(E);var M=Math.cbrt(I);var d=S+M-p/(3*c);if(d<0){var R=Math.floor(d);if(d-R<1e-15)d=R}else if(d>0){var R=Math.ceil(d);if(R-d<1e-15)d=R}return[d]}else{var u=Math.sqrt(Math.pow(T,2)/4-E);var A=Math.cbrt(u);var O=Math.acos(-(T/(2*u)));var D=-A;var k=Math.cos(O/3);var P=Math.sqrt(3)*Math.sin(O/3);var V=-(p/(3*c));var d=2*A*Math.cos(O/3)-p/(3*c);var y=D*(k+P)+V;var C=D*(k-P)+V;if(d<0){var R=Math.floor(d);if(d-R<1e-15)d=R}else if(d>0){var R=Math.ceil(d);if(R-d<1e-15)d=R}if(y<0){var F=Math.floor(y);if(y-F<1e-15)y=F}else if(y>0){var F=Math.ceil(y);if(F-y<1e-15)y=F}if(d<0){var q=Math.floor(C);if(C-q<1e-15)C=q}else if(C>0){var q=Math.ceil(C);if(q-C<1e-15)C=q}var N=[d,y,C];N.sort(function(e,t){return e-t});return[N[0],N[1],N[2]]}}}}};u.prototype.eval=function(e){return new u(this.lhs.eval(e),this.rhs.eval(e))};u.prototype.toString=function(){return this.lhs.toString()+" = "+this.rhs.toString()};u.prototype.toTex=function(){return this.lhs.toTex()+" = "+this.rhs.toTex()};u.prototype._maxDegree=function(){var e=this.lhs._maxDegree();var t=this.rhs._maxDegree();return Math.max(e,t)};u.prototype._maxDegreeOfVariable=function(e){return Math.max(this.lhs._maxDegreeOfVariable(e),this.rhs._maxDegreeOfVariable(e))};u.prototype._variableCanBeIsolated=function(e){return this._maxDegreeOfVariable(e)===1&&this._noCrossProductsWithVariable(e)};u.prototype._noCrossProductsWithVariable=function(e){return this.lhs._noCrossProductsWithVariable(e)&&this.rhs._noCrossProductsWithVariable(e)};u.prototype._noCrossProducts=function(){return this.lhs._noCrossProducts()&&this.rhs._noCrossProducts()};u.prototype._onlyHasVariable=function(e){return this.lhs._onlyHasVariable(e)&&this.rhs._onlyHasVariable(e)};u.prototype._isLinear=function(){return this._maxDegree()===1&&this._noCrossProducts()};u.prototype._isQuadratic=function(e){return this._maxDegree()===2&&this._onlyHasVariable(e)};u.prototype._isCubic=function(e){return this._maxDegree()===3&&this._onlyHasVariable(e)};t.exports=u},{"./expressions":3,"./fractions":4,"./helper":5}],3:[function(e,t,r){var n=e("./fractions");var i=e("./helper").isInt;var s=e("./helper").GREEK_LETTERS;var o=function(e){this.constants=[];if(typeof e==="string"){var t=new a(e);var r=new Term(t);this.terms=[r]}else if(i(e)){this.constants=[new n(e,1)];this.terms=[]}else if(e instanceof n){this.constants=[e];this.terms=[]}else if(e instanceof Term){this.terms=[e]}else if(typeof e==="undefined"){this.terms=[]}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Argument must be of type String, Integer, Fraction or Term.")}};o.prototype.constant=function(){return this.constants.reduce(function(e,t){return e.add(t)},new n(0,1))};o.prototype.simplify=function(){var e=this.copy();e.terms=e.terms.map(function(e){return e.simplify()});e._sort();e._combineLikeTerms();e._moveTermsWithDegreeZeroToConstants();e._removeTermsWithCoefficientZero();e.constants=e.constant().valueOf()===0?[]:[e.constant()];return e};o.prototype.copy=function(){var e=new o;e.constants=this.constants.map(function(e){return e.copy()});e.terms=this.terms.map(function(e){return e.copy()});return e};o.prototype.add=function(e,t){var r=this.copy();if(typeof e==="string"||e instanceof Term||i(e)||e instanceof n){var s=new o(e);return r.add(s,t)}else if(e instanceof o){var a=e.copy().terms;r.terms=r.terms.concat(a);r.constants=r.constants.concat(e.constants);r._sort()}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Summand must be of type String, Expression, Term, Fraction or Integer.")}return t||t===undefined?r.simplify():r};o.prototype.subtract=function(e,t){var r=e instanceof o?e.multiply(-1):new o(e).multiply(-1);return this.add(r,t)};o.prototype.multiply=function(e,t){var r=this.copy();if(typeof e==="string"||e instanceof Term||i(e)||e instanceof n){var s=new o(e);return r.multiply(s,t)}else if(e instanceof o){var a=e.copy();var u=[];for(var f=0;f<r.terms.length;f++){var l=r.terms[f];for(var c=0;c<a.terms.length;c++){var p=a.terms[c];u.push(l.multiply(p,t))}for(var c=0;c<a.constants.length;c++){u.push(l.multiply(a.constants[c],t))}}for(var f=0;f<a.terms.length;f++){var p=a.terms[f];for(var c=0;c<r.constants.length;c++){u.push(p.multiply(r.constants[c],t))}}var h=[];for(var f=0;f<r.constants.length;f++){var v=r.constants[f];for(var c=0;c<a.constants.length;c++){var m=a.constants[c];var d=new Term;d=d.multiply(m,false);d=d.multiply(v,false);u.push(d)}}r.constants=h;r.terms=u;r._sort()}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Multiplicand must be of type String, Expression, Term, Fraction or Integer.")}return t||t===undefined?r.simplify():r};o.prototype.divide=function(e,t){if(e instanceof n||i(e)){if(e.valueOf()===0){throw new EvalError("Divide By Zero")}var r=this.copy();for(var s=0;s<r.terms.length;s++){var o=r.terms[s];for(var a=0;a<o.coefficients.length;a++){o.coefficients[a]=o.coefficients[a].divide(e,t)}}r.constants=r.constants.map(function(r){return r.divide(e,t)});return r}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Divisor must be of type Fraction or Integer.")}};o.prototype.pow=function(e,t){if(i(e)){var r=this.copy();if(e===0){return(new o).add(1)}else{for(var n=1;n<e;n++){r=r.multiply(this,t)}r._sort()}return t||t===undefined?r.simplify():r}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Exponent must be of type Integer.")}};o.prototype.eval=function(e,t){var r=new o;r.constants=t?[this.constant()]:this.constants.slice();r=this.terms.reduce(function(r,n){return r.add(n.eval(e,t),t)},r);return r};o.prototype.summation=function(e,t,r,n){var i=this.copy();var s=new o;for(var a=t;a<r+1;a++){var u={};u[e]=a;s=s.add(i.eval(u,n),n)}return s};o.prototype.toString=function(){var e="";for(var t=0;t<this.terms.length;t++){var r=this.terms[t];e+=(r.coefficients[0].valueOf()<0?" - ":" + ")+r.toString()}for(var t=0;t<this.constants.length;t++){var n=this.constants[t];e+=(n.valueOf()<0?" - ":" + ")+n.abs().toString()}if(e.substring(0,3)===" - "){return"-"+e.substring(3,e.length)}else if(e.substring(0,3)===" + "){return e.substring(3,e.length)}else{return"0"}};o.prototype.toTex=function(e){var t="";for(var r=0;r<this.terms.length;r++){var n=this.terms[r];t+=(n.coefficients[0].valueOf()<0?" - ":" + ")+n.toTex(e)}for(var r=0;r<this.constants.length;r++){var i=this.constants[r];t+=(i.valueOf()<0?" - ":" + ")+i.abs().toTex()}if(t.substring(0,3)===" - "){return"-"+t.substring(3,t.length)}else if(t.substring(0,3)===" + "){return t.substring(3,t.length)}else{return"0"}};o.prototype._removeTermsWithCoefficientZero=function(){this.terms=this.terms.filter(function(e){return e.coefficient().reduce().numer!==0});return this};o.prototype._combineLikeTerms=function(){function e(e,t){for(var r=0;r<t.length;r++){if(e.canBeCombinedWith(t[r])){return true}}return false}var t=[];var r=[];for(var n=0;n<this.terms.length;n++){var i=this.terms[n];if(e(i,r)){continue}else{for(var s=n+1;s<this.terms.length;s++){var o=this.terms[s];if(i.canBeCombinedWith(o)){i=i.add(o)}}t.push(i);r.push(i)}}this.terms=t;return this};o.prototype._moveTermsWithDegreeZeroToConstants=function(){var e=[];var t=new n(0,1);for(var r=0;r<this.terms.length;r++){var i=this.terms[r];if(i.variables.length===0){t=t.add(i.coefficient())}else{e.push(i)}}this.constants.push(t);this.terms=e;return this};o.prototype._sort=function(){function e(e,t){var r=e.maxDegree();var n=t.maxDegree();if(r===n){var i=e.variables.length;var s=t.variables.length;return s-i}else{return n-r}}this.terms=this.terms.sort(e);return this};o.prototype._hasVariable=function(e){for(var t=0;t<this.terms.length;t++){if(this.terms[t].hasVariable(e)){return true}}return false};o.prototype._onlyHasVariable=function(e){for(var t=0;t<this.terms.length;t++){if(!this.terms[t].onlyHasVariable(e)){return false}}return true};o.prototype._noCrossProductsWithVariable=function(e){for(var t=0;t<this.terms.length;t++){var r=this.terms[t];if(r.hasVariable(e)&&!r.onlyHasVariable(e)){return false}}return true};o.prototype._noCrossProducts=function(){for(var e=0;e<this.terms.length;e++){var t=this.terms[e];if(t.variables.length>1){return false}}return true};o.prototype._maxDegree=function(){return this.terms.reduce(function(e,t){return Math.max(e,t.maxDegree())},1)};o.prototype._maxDegreeOfVariable=function(e){return this.terms.reduce(function(t,r){return Math.max(t,r.maxDegreeOfVariable(e))},1)};o.prototype._quadraticCoefficients=function(){var e;var t=new n(0,1);for(var r=0;r<this.terms.length;r++){var i=this.terms[r];e=i.maxDegree()===2?i.coefficient().copy():e;t=i.maxDegree()===1?i.coefficient().copy():t}var s=this.constant();return{a:e,b:t,c:s}};o.prototype._cubicCoefficients=function(){var e;var t=new n(0,1);var r=new n(0,1);for(var i=0;i<this.terms.length;i++){var s=this.terms[i];e=s.maxDegree()===3?s.coefficient().copy():e;t=s.maxDegree()===2?s.coefficient().copy():t;r=s.maxDegree()===1?s.coefficient().copy():r}var o=this.constant();return{a:e,b:t,c:r,d:o}};Term=function(e){if(e instanceof a){this.variables=[e.copy()]}else if(typeof e==="undefined"){this.variables=[]}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Term initializer must be of type Variable.")}this.coefficients=[new n(1,1)]};Term.prototype.coefficient=function(){return this.coefficients.reduce(function(e,t){return e.multiply(t)},new n(1,1))};Term.prototype.simplify=function(){var e=this.copy();e.coefficients=[this.coefficient()];e.combineVars();return e.sort()};Term.prototype.combineVars=function(){var e={};for(var t=0;t<this.variables.length;t++){var r=this.variables[t];if(r.variable in e){e[r.variable]+=r.degree}else{e[r.variable]=r.degree}}var n=[];for(var i in e){var s=new a(i);s.degree=e[i];n.push(s)}this.variables=n;return this};Term.prototype.copy=function(){var e=new Term;e.coefficients=this.coefficients.map(function(e){return e.copy()});e.variables=this.variables.map(function(e){return e.copy()});return e};Term.prototype.add=function(e){if(e instanceof Term&&this.canBeCombinedWith(e)){var t=this.copy();t.coefficients=[t.coefficient().add(e.coefficient())];return t}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Summand must be of type String, Expression, Term, Fraction or Integer.")}};Term.prototype.subtract=function(e){if(e instanceof Term&&this.canBeCombinedWith(e)){var t=this.copy();t.coefficients=[t.coefficient().subtract(e.coefficient())];return t}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Subtrahend must be of type String, Expression, Term, Fraction or Integer.")}};Term.prototype.multiply=function(e,t){var r=this.copy();if(e instanceof Term){r.variables=r.variables.concat(e.variables);r.coefficients=e.coefficients.concat(r.coefficients)}else if(i(e)||e instanceof n){var s=i(e)?new n(e,1):e;if(r.variables.length===0){r.coefficients.push(s)}else{r.coefficients.unshift(s)}}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Multiplicand must be of type String, Expression, Term, Fraction or Integer.")}return t||t===undefined?r.simplify():r};Term.prototype.divide=function(e,t){if(i(e)||e instanceof n){var r=this.copy();r.coefficients=r.coefficients.map(function(r){return r.divide(e,t)});return r}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Argument must be of type Fraction or Integer.")}};Term.prototype.eval=function(e,t){var r=this.copy();var s=Object.keys(e);var a=r.coefficients.reduce(function(e,r){return e.multiply(r,t)},new o(1));for(var u=0;u<r.variables.length;u++){var f=r.variables[u];var l;if(f.variable in e){var c=e[f.variable];if(c instanceof n||c instanceof o){l=c.pow(f.degree)}else if(i(c)){l=Math.pow(c,f.degree)}else{throw new TypeError("Invalid Argument ("+c+"): Can only evaluate Expressions or Fractions.")}}else{l=new o(f.variable).pow(f.degree)}a=a.multiply(l,t)}return a};Term.prototype.hasVariable=function(e){for(var t=0;t<this.variables.length;t++){if(this.variables[t].variable===e){return true}}return false};Term.prototype.maxDegree=function(){return this.variables.reduce(function(e,t){return Math.max(e,t.degree)},1)};Term.prototype.maxDegreeOfVariable=function(e){return this.variables.reduce(function(t,r){return r.variable===e?Math.max(t,r.degree):t},1)};Term.prototype.canBeCombinedWith=function(e){var t=this.variables;var r=e.variables;if(t.length!=r.length){return false}var n=0;for(var i=0;i<t.length;i++){for(var s=0;s<r.length;s++){if(t[i].variable===r[s].variable&&t[i].degree===r[s].degree){n+=1}}}return n===t.length};Term.prototype.onlyHasVariable=function(e){for(var t=0;t<this.variables.length;t++){if(this.variables[t].variable!=e){return false}}return true};Term.prototype.sort=function(){function e(e,t){return t.degree-e.degree}this.variables=this.variables.sort(e);return this};Term.prototype.toString=function(){var e="";for(var t=0;t<this.coefficients.length;t++){var r=this.coefficients[t];if(r.abs().numer!==1||r.abs().denom!==1){e+=" * "+r.toString()}}e=this.variables.reduce(function(e,t){return e.concat(t.toString())},e);e=e.substring(0,3)===" * "?e.substring(3,e.length):e;e=e.substring(0,1)==="-"?e.substring(1,e.length):e;return e};Term.prototype.toTex=function(e){var e=e===undefined?{}:e;e.multiplication=!("multiplication"in e)?"cdot":e.multiplication;var t=" \\"+e.multiplication+" ";var r="";for(var n=0;n<this.coefficients.length;n++){var i=this.coefficients[n];if(i.abs().numer!==1||i.abs().denom!==1){r+=t+i.toTex()}}r=this.variables.reduce(function(e,t){return e.concat(t.toTex())},r);r=r.substring(0,t.length)===t?r.substring(t.length,r.length):r;r=r.substring(0,1)==="-"?r.substring(1,r.length):r;r=r.substring(0,7)==="\\frac{-"?"\\frac{"+r.substring(7,r.length):r;return r};var a=function(e){if(typeof e==="string"){this.variable=e;this.degree=1}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Variable initalizer must be of type String.")}};a.prototype.copy=function(){var e=new a(this.variable);e.degree=this.degree;return e};a.prototype.toString=function(){var e=this.degree;var t=this.variable;if(e===0){return""}else if(e===1){return t}else{return t+"^"+e}};a.prototype.toTex=function(){var e=this.degree;var t=this.variable;if(s.indexOf(t)>-1){t="\\"+t}if(e===0){return""}else if(e===1){return t}else{return t+"^{"+e+"}"}};t.exports={Expression:o,Term:Term,Variable:a}},{"./fractions":4,"./helper":5}],4:[function(e,t,r){var n=e("./helper").isInt;var i=e("./helper").gcd;var s=e("./helper").lcm;var o=function(e,t){if(t===0){throw new EvalError("Divide By Zero")}else if(n(e)&&n(t)){this.numer=e;this.denom=t}else{throw new TypeError("Invalid Argument ("+e.toString()+","+t.toString()+"): Divisor and dividend must be of type Integer.")}};o.prototype.copy=function(){return new o(this.numer,this.denom)};o.prototype.reduce=function(){var e=this.copy();var t=i(e.numer,e.denom);e.numer=e.numer/t;e.denom=e.denom/t;if(Math.sign(e.denom)==-1&&Math.sign(e.numer)==1){e.numer*=-1;e.denom*=-1}return e};o.prototype.equalTo=function(e){if(e instanceof o){var t=this.reduce();var r=e.reduce();return t.numer===r.numer&&t.denom===r.denom}else{return false}};o.prototype.add=function(e,t){t=t===undefined?true:t;var r,i;if(e instanceof o){r=e.numer;i=e.denom}else if(n(e)){r=e;i=1}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Summand must be of type Fraction or Integer.")}var a=this.copy();if(this.denom==i){a.numer+=r}else{var u=s(a.denom,i);var f=u/a.denom;var l=u/i;a.numer*=f;a.denom*=f;r*=l;a.numer+=r}return t?a.reduce():a};o.prototype.subtract=function(e,t){t=t===undefined?true:t;var r=this.copy();if(e instanceof o){return r.add(new o(-e.numer,e.denom),t)}else if(n(e)){return r.add(new o(-e,1),t)}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Subtrahend must be of type Fraction or Integer.")}};o.prototype.multiply=function(e,t){t=t===undefined?true:t;var r,i;if(e instanceof o){r=e.numer;i=e.denom}else if(n(e)&&e){r=e;i=1}else if(e===0){r=0;i=1}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Multiplicand must be of type Fraction or Integer.")}var s=this.copy();s.numer*=r;s.denom*=i;return t?s.reduce():s};o.prototype.divide=function(e,t){t=t===undefined?true:t;if(e.valueOf()===0){throw new EvalError("Divide By Zero")}var r=this.copy();if(e instanceof o){return r.multiply(new o(e.denom,e.numer),t)}else if(n(e)){return r.multiply(new o(1,e),t)}else{throw new TypeError("Invalid Argument ("+e.toString()+"): Divisor must be of type Fraction or Integer.")}};o.prototype.pow=function(e,t){t=t===undefined?true:t;var r=this.copy();r.numer=Math.pow(r.numer,e);r.denom=Math.pow(r.denom,e);return t?r.reduce():r};o.prototype.abs=function(){var e=this.copy();e.numer=Math.abs(e.numer);e.denom=Math.abs(e.denom);return e};o.prototype.valueOf=function(){return this.numer/this.denom};o.prototype.toString=function(){if(this.numer===0){return"0"}else if(this.denom===1){return this.numer.toString()}else if(this.denom===-1){return(-this.numer).toString()}else{return this.numer+"/"+this.denom}};o.prototype.toTex=function(){if(this.numer===0){return"0"}else if(this.denom===1){return this.numer.toString()}else if(this.denom===-1){return(-this.numer).toString()}else{return"\\frac{"+this.numer+"}{"+this.denom+"}"}};o.prototype._squareRootIsRational=function(){if(this.valueOf()===0){return true}var e=Math.sqrt(this.numer);var t=Math.sqrt(this.denom);return n(e)&&n(t)};o.prototype._cubeRootIsRational=function(){if(this.valueOf()===0){return true}var e=Math.cbrt(this.numer);var t=Math.cbrt(this.denom);return n(e)&&n(t)};t.exports=o},{"./helper":5}],5:[function(e,t,r){function n(e,t){while(t){var r=e;e=t;t=r%t}return e}function i(e,t){return e*t/n(e,t)}function s(e){return typeof e=="number"&&e%1===0}function o(e,t){t=typeof t==="undefined"?2:t;var r=Math.pow(10,t);return Math.round(parseFloat(e)*r)/r}var a=["alpha","beta","gamma","Gamma","delta","Delta","epsilon","varepsilon","zeta","eta","theta","vartheta","Theta","iota","kappa","lambda","Lambda","mu","nu","xi","Xi","pi","Pi","rho","varrho","sigma","Sigma","tau","upsilon","Upsilon","phi","varphi","Phi","chi","psi","Psi","omega","Omega"];r.gcd=n;r.lcm=i;r.isInt=s;r.round=o;r.GREEK_LETTERS=a},{}],6:[function(e,t,r){"use strict";var n=function(){this.pos=0;this.buf=null;this.buflen=0;this.optable={"+":"PLUS","-":"MINUS","*":"MULTIPLY","/":"DIVIDE","^":"POWER","(":"L_PAREN",")":"R_PAREN","=":"EQUALS"}};n.prototype.input=function(e){this.pos=0;this.buf=e;this.buflen=e.length};n.prototype.token=function(){this._skipnontokens();if(this.pos>=this.buflen){return null}var e=this.buf.charAt(this.pos);var t=this.optable[e];if(t!==undefined){if(t==="L_PAREN"||t==="R_PAREN"){return{type:"PAREN",value:t,pos:this.pos++}}else{return{type:"OPERATOR",value:t,pos:this.pos++}}}else{if(n._isalpha(e)){return this._process_identifier()}else if(n._isdigit(e)){return this._process_number()}else{throw new SyntaxError("Token error at character "+e+" at position "+this.pos)}}};n._isdigit=function(e){return e>="0"&&e<="9"};n._isalpha=function(e){return e>="a"&&e<="z"||e>="A"&&e<="Z"};n._isalphanum=function(e){return e>="a"&&e<="z"||e>="A"&&e<="Z"||e>="0"&&e<="9"};n.prototype._process_digits=function(e){var t=e;while(t<this.buflen&&n._isdigit(this.buf.charAt(t))){t++}return t};n.prototype._process_number=function(){var e=this._process_digits(this.pos);if(this.buf.charAt(e)==="."){e=this._process_digits(e+1)}if(this.buf.charAt(e-1)==="."){throw new SyntaxError("Decimal point without decimal digits at position "+(e-1))}var t={type:"NUMBER",value:this.buf.substring(this.pos,e),pos:this.pos};this.pos=e;return t};n.prototype._process_identifier=function(){var e=this.pos+1;while(e<this.buflen&&n._isalphanum(this.buf.charAt(e))){e++}var t={type:"IDENTIFIER",value:this.buf.substring(this.pos,e),pos:this.pos};this.pos=e;return t};n.prototype._skipnontokens=function(){while(this.pos<this.buflen){var e=this.buf.charAt(this.pos);if(e==" "||e=="	"||e=="\r"||e=="\n"){this.pos++}else{break}}};t.exports=n},{}],7:[function(e,t,r){"use strict";var n=e("./lexer"),i=e("./expressions").Expression,s=e("./fractions"),o=e("./equations");var a=function(){this.lexer=new n;this.current_token=null};a.prototype.update=function(){this.current_token=this.lexer.token()};a.prototype.match=function(e){if(this.current_token===null)return e==="epsilon";switch(e){case"plus":return this.current_token.type==="OPERATOR"&&this.current_token.value==="PLUS";case"minus":return this.current_token.type==="OPERATOR"&&this.current_token.value==="MINUS";case"multiply":return this.current_token.type==="OPERATOR"&&this.current_token.value==="MULTIPLY";case"power":return this.current_token.type==="OPERATOR"&&this.current_token.value==="POWER";case"divide":return this.current_token.type==="OPERATOR"&&this.current_token.value==="DIVIDE";case"equal":return this.current_token.type==="OPERATOR"&&this.current_token.value==="EQUALS";case"lparen":return this.current_token.type==="PAREN"&&this.current_token.value==="L_PAREN";case"rparen":return this.current_token.type==="PAREN"&&this.current_token.value==="R_PAREN";case"num":return this.current_token.type==="NUMBER";case"id":return this.current_token.type==="IDENTIFIER";default:return false}};a.prototype.parse=function(e){this.lexer.input(e);this.update();return this.parseEqn()};a.prototype.parseEqn=function(){var e=this.parseExpr();if(this.match("equal")){this.update();var t=this.parseExpr();return new o(e,t)}else if(this.match("epsilon")){return e}else{throw new SyntaxError("Unbalanced Parenthesis")}};a.prototype.parseExpr=function(){var e=this.parseTerm();return this.parseExprRest(e)};a.prototype.parseExprRest=function(e){if(this.match("plus")){this.update();var t=this.parseTerm();if(e===undefined||t===undefined)throw new SyntaxError("Missing operand");return this.parseExprRest(e.add(t))}else if(this.match("minus")){this.update();var r=this.parseTerm();if(e===undefined){return this.parseExprRest(r.multiply(-1))}else{return this.parseExprRest(e.subtract(r))}}else{return e}};a.prototype.parseTerm=function(){var e=this.parseFactor();return this.parseTermRest(e)};a.prototype.parseTermRest=function(e){if(this.match("multiply")){this.update();var t=this.parseFactor();return e.multiply(this.parseTermRest(t))}else if(this.match("power")){this.update();var r=this.parseFactor();return this.parseTermRest(e.pow(parseInt(r.toString())))}else if(this.match("divide")){this.update();var n=this.parseFactor();return this.parseTermRest(e.divide(this.convertToFraction(n)))}else if(this.match("epsilon")){return e}else{var i=this.parseFactor();if(i===undefined){return e}else{return e.multiply(this.parseTermRest(i))}}};a.prototype.convertToFraction=function(e){if(e.terms.length>0){throw new TypeError("Invalid Argument ("+e.toString()+"): Divisor must be of type Integer or Fraction.")}else{var t=e.constants[0];return new s(t.numer,t.denom)}};a.prototype.parseFactor=function(){if(this.match("num")){var e=this.parseNumber();this.update();return e}else if(this.match("id")){var t=new i(this.current_token.value);this.update();return t}else if(this.match("lparen")){this.update();var r=this.parseExpr();if(this.match("rparen")){this.update();return r}else{throw new SyntaxError("Unbalanced Parenthesis")}}else{return undefined}};a.prototype.parseNumber=function(){if(parseInt(this.current_token.value)==this.current_token.value){return new i(parseInt(this.current_token.value))}else{var e=this.current_token.value.split(".");var t=e[1].length;var r=Math.pow(10,t);var n=parseFloat(this.current_token.value);return new i(parseInt(n*r)).divide(r)}};t.exports=a},{"./equations":2,"./expressions":3,"./fractions":4,"./lexer":6}]},{},[1])(1)});
;
var H5P = H5P || {};

/**
 * Defines the H5P.ArithmeticQuiz class
 */
H5P.ArithmeticQuiz = (function ($) {

  /**
   * Creates a new ArithmeticQuiz instance
   *
   * @class
   * @augments H5P.EventDispatcher
   * @namespace H5P
   * @param {Object} options
   * @param {number} id
   */
  function ArithmeticQuiz(options, id) {
    // Add viewport meta to iframe
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');

    var self = this;
    // Extend defaults with provided options
    self.options = $.extend(true, {}, {
      intro: '',
      quizType: 'arithmetic',
      arithmeticType: 'addition',
      equationType: undefined,
      useFractions: undefined,
      maxQuestions: undefined,
      UI: {
        score: 'Score @score',
        scoreInPercent: '(@percent% correct)',
        time: 'Time: @time',
        resultPageHeader: 'Finished!',
        retryButton: 'Retry',
        startButton: 'Start',
        go: 'GO!',
        correctText: 'Correct',
        incorrectText: 'Incorrect. Correct answer was :num',
        durationLabel: 'Duration in hours, minutes and seconds.',
        humanizedQuestion: 'What does :arithmetic equal?',
        humanizedEquation: 'For the equation :equation, what does :item equal?',
        humanizedVariable: 'What does :item equal?',
        plusOperator: 'plus',
        minusOperator: 'minus',
        multiplicationOperator: 'times',
        divisionOperator: 'divided by',
        equalitySign: 'equal',
        slideOfTotal: 'Slide :num of :total'
      }
    }, options);
    self.currentWidth = 0;

    self.gamePage = new H5P.ArithmeticQuiz.GamePage(self.options.quizType, self.options, id);
    
    self.gamePage.on('last-slide', function (e) {
      self.triggerXAPIScored(e.data.score, e.data.numQuestions, 'answered');
    });

    self.gamePage.on('started-quiz', function () {
      self.setActivityStarted();
    });

    self.gamePage.on('alternative-chosen', function () {
      self.triggerXAPI('interacted');
    });

    self.introPage = new H5P.ArithmeticQuiz.IntroPage(self.options.intro, self.options.UI);
    self.introPage.on('start-game', function() {
      self.introPage.remove();
      self.gamePage.startCountdown();
    });

    self.on('resize', function () {
      // Set size based on gamePage
      var height = self.gamePage.getMaxHeight() + 'px';
      this.$container.css({height: height});
      // Need to set height in pixels because of FF-bug
      $('.h5p-baq-countdown').css({height: height});
      $('.h5p-baq-result-page').css({height: height});
    });


    /**
     * Attach function called by H5P framework to insert H5P content into page
     *
     * @param {H5P.jQuery} $container
     */
    self.attach = function ($container) {
      if (self.isRoot()) {
        self.setActivityStarted();
      }

      if (this.$container === undefined) {
        this.$container = $container;
        this.addFont();
        this.$container.addClass('h5p-baq');
        this.introPage.appendTo($container);

        // Set gamePage xAPI parameters and append it.
        self.gamePage.contentId = id;
        self.gamePage.libraryInfo = self.libraryInfo;
        self.gamePage.appendTo(self.$container);

        self.trigger('resize');

        setTimeout(function () {
          H5P.ArithmeticQuiz.SoundEffects.setup(self.getLibraryFilePath(''));
        }, 1);
      }
    };

    /**
     * Adds fonts from google
     */
    self.addFont = function () {
      window.WebFontConfig = {
        google: { families: [ 'Lato::latin' ] }
      };

      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    };
  }

  /**
   * Replaces placeholders in translatables texts
   *
   * @static
   * @param  {String} text description
   * @param  {Object} vars description
   * @return {String}      description
   */
  ArithmeticQuiz.tReplace = function (text, vars) {
    for (var placeholder in vars) {
      text = text.replace('@'+placeholder, vars[placeholder]);
    }
    return text;
  };

  return ArithmeticQuiz;
})(H5P.jQuery);

/**
 * Enum defining the different arithmetic types
 * @readonly
 * @enum {string}
 */
H5P.ArithmeticQuiz.ArithmeticType = {
  ADDITION: 'addition',
  SUBTRACTION: 'subtraction',
  MULTIPLICATION: 'multiplication',
  DIVISION: 'division'
};

/**
 * Enum defining the different equation types
 * @readonly
 * @enum {string}
 */
H5P.ArithmeticQuiz.EquationType = {
  BASIC: 'basic',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

/**
 * Enum defining the different quiz types
 * @readonly
 * @enum {string}
 */
H5P.ArithmeticQuiz.QuizType = {
  ARITHMETIC: 'arithmetic',
  LINEAREQUATION: 'linearEquation'
};;
H5P.ArithmeticQuiz.SoundEffects = (function () {
  var SoundEffects = {
    types: [
      'positive-short',
      'negative-short'
    ],
    sounds: [],
    muted: false
  };

  /**
   * Setup defined sounds
   *
   * @return {boolean} True if setup was successfull, otherwise false
   */
  SoundEffects.setup = function (libraryPath) {
    if (!H5P.SoundJS.initializeDefaultPlugins()) {
      return false;
    }

    H5P.SoundJS.alternateExtensions = ['mp3'];
    for (var i = 0; i < SoundEffects.types.length; i++) {
      var type = SoundEffects.types[i];
      H5P.SoundJS.registerSound(libraryPath + 'sounds/' + type + '.ogg', type);
    }

    return true;
  };

  /**
   * Play a sound
   *
   * @param  {string} type  Name of the sound as defined in [SoundEffects.types]{@link H5P.SoundEffects.SoundEffects#types}
   * @param  {number} delay Delay in milliseconds
   */
  SoundEffects.play = function (type, delay) {
    if (SoundEffects.muted === false) {
      H5P.SoundJS.play(type, H5P.SoundJS.INTERRUPT_NONE, (delay || 0));
    }
  };

  /**
   * Mute. Subsequent invocations of SoundEffects.play() will not make any sounds beeing played.
   */
  SoundEffects.mute = function () {
    SoundEffects.muted = true;
  };

  /**
   * Unmute
   */
  SoundEffects.unmute = function () {
    SoundEffects.muted = false;
  };

  return SoundEffects;
})();
;
/**
 * Defines the H5P.ArithmeticQuiz.CountdownWidget class
 */
H5P.ArithmeticQuiz.CountdownWidget = (function ($) {

  /**
   * A count down widget
   *
   * @class
   * @augments H5P.EventDispatcher
   * @namespace H5P.ArithmeticQuiz
   * @fires H5P.Event
   *
   * @param {number} seconds Number of seconds to count down
   * @param {Object} t Translations
   */
  function CountdownWidget(seconds, t) {
    H5P.EventDispatcher.call(this);
    var originalSeconds = seconds;

    this.$countdownWidget = $('<div>', {
      'class': 'h5p-baq-countdown',
      'aria-hidden': true
    }).append($('<div>', {
      'class': 'h5p-baq-countdown-inner',
    }).append($('<span>', {
      'class': 'h5p-baq-countdown-text',
      text: seconds,
      'aria-live': 'polite'
    }), $('<span>', {
      'class': 'h5p-baq-countdown-bg'
    })));

    this.$countdownText = this.$countdownWidget.find('.h5p-baq-countdown-text');

    /**
     * Returns reference to DOM object
     *
     * @return {H5P.jQuery}
     */
    this.create = function () {
      return this.$countdownWidget;
    };


    /**
     * Start countdown
     */
    this.start = function () {
      var self = this;
      this.$countdownWidget.attr('aria-hidden', false);

      if (!self.$countdownWidget.find('.h5p-baq-countdown-bg').hasClass('fuel')) {
        setTimeout(function(){
          self.$countdownWidget.find('.h5p-baq-countdown-bg').addClass('fuel');
        },1);
      }

      if (seconds <= 0) {
        self.$countdownWidget.attr('aria-hidden', true);
        self.trigger('ignition');
        return;
      }

      self.decrement();

      setTimeout(function(){
        self.start();
      }, 1000);
    };


    /**
     * Restart the countdown
     */
    this.restart = function () {
      var self = this;
      seconds = originalSeconds+1;
      self.decrement();
      self.$countdownWidget.find('.h5p-baq-countdown-bg').removeClass('fuel');
      setTimeout(function () {
        self.start();
      }, 600);
    };


    /**
     * Decrement counter
     */
    this.decrement = function () {
      seconds--;
      this.$countdownText.html(seconds === 0 ? t.go : seconds);
    };
  }
  CountdownWidget.prototype = Object.create(H5P.EventDispatcher.prototype);
  CountdownWidget.prototype.constructor = CountdownWidget;

  return CountdownWidget;

})(H5P.jQuery);
;
H5P.ArithmeticQuiz.TimerWidget = (function ($) {

  /**
   * Creates a TimerWidget instance
   *
   * @class
   * @namespace H5P.ArithmeticQuiz
   *
   * @param  {type} t Translation object
   */
  function TimerWidget(t) {
    var totalTime = 0;
    var isRunning = false;
    var timer;
    var startTime = 0;
    var incrementingAria = true;

    var $timer = $('<time>', {
      'aria-label': t.durationLabel,
      'class': 'timer',
      role: 'timer',
      'aria-hidden': true,
      text: H5P.ArithmeticQuiz.tReplace(t.time, {time: '00:00'})
    });

    /**
     * Create an aria timer that will not update when it has been focus by a readspeaker
     *
     * Technical note: This is needed because when a readspeaker is on top of an element and that element changes
     * the focus will be moved back to the previous element. When this happens every second like
     * here it makes it impossible to move forward in the task whenever the timer is updated.
     * Therefore we do not update the readable element when it is focused.
     */
    var $ariaTimer = $('<time>', {
      'aria-label': t.durationLabel,
      'class': 'timer aria-timer',
      role: 'timer',
      tabindex: '-1',
      text: H5P.ArithmeticQuiz.tReplace(t.time, {time: '0'})
    });

    $ariaTimer.on('focus', function () {
      incrementingAria = false;
    });

    $ariaTimer.on('blur', function () {
      incrementingAria = true;
    });

    /**
     * Humanize time
     *
     * @private
     * @param  {number} seconds Number of seconds to humanize
     * @param  {string} [separator] Separator used between the different time units
     * @return {string} The humanized time
     */
    var humanizeTime = function (seconds, separator) {
      separator = separator || ':';
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);

      minutes = minutes % 60;
      seconds = Math.floor(seconds % 60);

      var time = '';

      if (hours !== 0) {
        time += hours + separator;

        if (minutes < 10) {
          time += '0';
        }
      }

      if (minutes < 10) {
        time += '0';
      }

      time += minutes + separator;

      if (seconds < 10) {
        time += '0';
      }

      time += seconds;

      return time;
    };


    /**
     * Calculate running time
     *
     * @private
     * @return {number} Running time in seconds
     */
    var getTime = function () {
      return totalTime + (isRunning ? new Date().getTime() - startTime : 0);
    };


    /**
     * Update UI
     *
     * @private
     */
    var update = function () {
      $timer.text(H5P.ArithmeticQuiz.tReplace(t.time, {time: humanizeTime(getTime()/1000)}));

      if (incrementingAria) {
        $ariaTimer.text(H5P.ArithmeticQuiz.tReplace(t.time, {time: humanizeTime(getTime()/1000, ', ')}));
      }

      timer = setTimeout(function(){
        update();
      }, 1000);
    };


    /**
     * Append me to something
     *
     * @param  {H5P.jQuery} $container
     */
    this.appendTo = function ($container) {
      $timer.appendTo($container);
      $ariaTimer.appendTo($container);
    };


    /**
     * Start the timer
     */
    this.start = function () {
      isRunning = true;
      clearTimeout(timer);
      startTime = new Date().getTime();
      update();
    };


    /**
     * Pause the timer
     *
     * @return {string} The humanized time
     */
    this.pause = function () {
      isRunning = false;
      totalTime += new Date().getTime() - startTime;
      clearTimeout(timer);
      update();

      return humanizeTime(getTime()/1000);
    };


    /**
     * Reset timer
     */
    this.reset = function () {
      clearTimeout(timer);
      isRunning = false;
      totalTime = 0;
      startTime = 0;
      update();
    };


    /**
     * Restart timer
     */
    this.restart = function () {
      this.reset();
      this.start();
    };
  }

  return TimerWidget;

})(H5P.jQuery);
;
H5P.ArithmeticQuiz.IntroPage = (function ($, UI) {
  /**
   * Creates an IntroPage instance
   *
   * @class
   * @namespace H5P.ArithmeticQuiz
   * @augments H5P.EventDispatcher
   *
   * @param  {string} text Introduction text
   * @param  {Object} t Translation object
   * @fires H5P.Event
   */
  function IntroPage(text, t) {
    H5P.EventDispatcher.call(this);
    var self = this;

    this.$introPage = $('<div>', {
      'class': 'h5p-baq-intro-page'
    });

    var $innerWrapper = $('<div>', {
      'class': 'h5p-baq-intro-page-inner'
    });

    $innerWrapper.append($('<div>', {
      'class': 'h5p-baq-intro-page-title'
    }).append($('<span>', {
      html: text
    })));

    // Create and add the start button:
    UI.createButton({
      text: t.startButton,
      'class': 'mq-control-button',
      click: function () {
        self.trigger('start-game');
      }
    }).appendTo($innerWrapper);

    $innerWrapper.appendTo(this.$introPage);

    /**
     * Append Intropage to a container
     *
     * @param  {H5P.jQuery} $container
     */
    self.appendTo = function ($container) {
      this.$introPage.appendTo($container);
    };


    /**
     * Remove me from DOM
     */
    self.remove = function () {
      this.$introPage.remove();
    };
  }

  IntroPage.prototype = Object.create(H5P.EventDispatcher.prototype);
  IntroPage.prototype.constructor = IntroPage;

  return IntroPage;

})(H5P.jQuery, H5P.JoubelUI);
;
/**
 * Defines the H5P.ArithmeticQuiz.EquationsGenerator class
 */
H5P.ArithmeticQuiz.EquationsGenerator = (function (EquationType) {
  var unknown = ["x", "y", "z", "a", "b"];
  var Fraction = algebra.Fraction;
  var Expression = algebra.Expression;
  var Equation = algebra.Equation;

  // Helper functions for creating wrong alternatives
  function add (question, param) {
    return question.correct + param;
  }
  function subtract (question, param) {
    return question.correct - param;
  }

  function randomNum (min, max) {
    min = min || 1;
    max = max || 7;

    // Creates random number between min and max:
    var num = Math.floor(Math.random()*(max-min+1)+min);
    if (num === 0) {
      num = randomNum(min, max);
    }
    return num;
  }
  function multiply (question, param) {
    if (Math.random() > 0.5) {
      return (question.x+param) * question.y;
    }
    else {
      return (question.y+param) * question.x;
    }
  }
  function divide (question, param) {
    if (Math.random() > 0.5) {
      return Math.floor((question.x + param) / question.y);
    }
    else {
      return Math.floor(question.x / (question.y + param));
    }
  }

  //
  /**
   * Do a random operation on equation expression
   * @method randomOperation
   * @param  {operations}  array of operations to choose from randomly
   * @param  {expr}  algebra.js expression
   * @param  {useFractions}  use fractions as number
   */
  function randomOperation(operations, expr, useFractions) {
    // get a random operation
    var operation = operations[Math.floor(Math.random() * operations.length)];
    var number = randomNum(1, 7);
    switch (operation) {
      case "/":
        if (number > 0) {
          expr = expr.divide(number);
        }
        break;
      case "*":
        expr = expr.multiply(number);
        break;
      case "+":
        if (useFractions === true) {
          number = new Fraction(randomNum(1, 7), randomNum(3, 7));
        }
        expr = expr.add(number);
        break;
      case "-":
        if (useFractions === true) {
          number = new Fraction(randomNum(1, 7), randomNum(3, 7));
        }
        expr = expr.subtract(number);
        break;
    }
    return expr;
  }

  /**
   * Generates equation type for a question
   * @method generateEquation
   * @param  {item}  variable name of expression
   * @param  {expr}  algebra.js expression
   * @param  {equationType}  type of equation (basic, intermediate, advanced)
   * @param  {useFractions}  use fractions as number
   */
  function generateEquation(item, type, equationType, useFractions) {
    var equation = undefined;
    var solution = undefined;
    var number1 = undefined;
    var operations = undefined;

    number1 = randomNum();

    if (useFractions === true) {
      number1 = new Fraction(randomNum(), randomNum(3, 7));
    }

    var expression1 = new Expression(item);
    var expression2 = new Expression(item);

    switch (equationType) {
      case EquationType.BASIC:
        // [ 3x = 12 ]
        expression1 = expression1.multiply(randomNum(2, 4));
        equation = new Equation(expression1, number1);
        break;
      case EquationType.INTERMEDIATE:
        // [ 4x - 3 = 13 ]
        operations = ["+", "-"];
        expression1 = randomOperation(operations, expression1, useFractions);
        expression1 = expression1.multiply(randomNum(2, 3));
        equation = new Equation(expression1, number1);
        break;
      case EquationType.ADVANCED:
        // [ 5x + 3 = 3x + 15 ]
        operations = ["+", "-"];
        // expression1 = expression1.multiply(item); // Quadratic equations ..
        expression1 = randomOperation(operations, expression1, useFractions);
        expression2 = randomOperation(operations, expression2, useFractions);
        expression1 = expression1.multiply(randomNum(2, 3));
        expression2 = expression2.multiply(randomNum(2, 3));
        expression1 = expression1.simplify();
        expression2 = expression2.simplify();
        equation = new Equation(expression1, expression2);
        break;
    }
    try {
      solution = equation.solveFor(item);
    } catch(err) {
      equation = generateEquation(item, type, equationType, useFractions);
      solution = equation.solveFor(item);
    }
    if ( (solution.toString() === "0") || (solution.toString() === "1") || solution.toString().length > 4) {
      // Rebuild
      equation = generateEquation(item, type, equationType, useFractions);
    }

    return equation;
  }

  /**
   * Equation Questions generator classes
   * @method EquationsGenerator
   * @constructor
   * @param  {H5P.ArithmeticQuiz.ArithmeticType}   type
   * @param  {H5P.ArithmeticQuiz.EquationType}   equationType
   * @param  {number}           maxQuestions
   * @param  {boolean}          use fractions in equations
   */
  function EquationsGenerator(type, equationType, maxQuestions, useFractions) {
    var self = this;
    var questions = [];
    var i, j;

    /**
     * Generates alternative for a question
     * @method generateAlternatives
     * @param  {Object}             question
     * @param  {H5P.ArithmeticQuiz.EquationType}   equation type
     * @param  {boolean}          use fractions in equations
     */
    function generateAlternatives(question, equationType, useFractions) {
      question.alternatives = [];
      var equation = undefined;
      // Generate 5 wrong ones:
      while (question.alternatives.length !== 5) {
        equation = generateEquation(question.variable, question.type, equationType, useFractions);
        var solution = equation.solveFor(question.variable).toString();

        // check if alternative is present already and is not the correct one
        if (solution !== question.correct && question.alternatives.indexOf(solution) === -1) {
          question.alternatives.push(solution);
        }
      }

      // Add correct one
      question.alternatives.push(question.correct);

      // Shuffle alternatives:
      question.alternatives = H5P.shuffleArray(question.alternatives);
    }

    // Generate equations
    for (i=50; i>=0; i--) {
      for (j=i; j>=0; j--) {
        var item = unknown[Math.floor(Math.random()*unknown.length)];
        var equation = generateEquation(item, type, equationType, useFractions);
        var solution = equation.solveFor(item);
        questions.push({
          variable: item,
          expression: equation.toString(),
          correct: solution.toString(),
          textual: equation.toString(),
        });
      }
    }

    // Let's shuffle
    questions = H5P.shuffleArray(questions);

    if (questions.length > maxQuestions) {
      questions = questions.slice(0, maxQuestions);
    }

    // Create alternatives
    for (i = 0; i < questions.length; i++) {
      generateAlternatives(questions[i], equationType, useFractions);
    }

    /**
     * Returns the questions including alternatives and textual representation
     * @public
     * @return {array}
     */
    self.get = function () {
      return questions;
    };

  }

  EquationsGenerator.prototype.readableQuestion = function (translations, readableSigns, question) {
    return translations.humanizedEquation
      .replace(':equation', readableSigns)
      .replace(':item', question.variable);
  };

  EquationsGenerator.prototype.readableText = function (question) {
    return question.textual;
  };

  return EquationsGenerator;
}(H5P.ArithmeticQuiz.EquationType));
;
/**
 * Defines the H5P.ArithmeticQuiz.ArithmeticGenerator class
 */
H5P.ArithmeticQuiz.ArithmeticGenerator = (function (ArithmeticType) {

  // Helper functions for creating wrong alternatives
  function add (question, param) {
    return question.correct + param;
  }
  function subtract (question, param) {
    return question.correct - param;
  }
  function randomInt (question) {
    // Creates random number between correct-10 and correct+10:
    return (question.correct - 10) + Math.floor(Math.random() * 20);
  }
  function multiply (question, param) {
    if (Math.random() > 0.5) {
      return (question.x+param) * question.y;
    }
    else {
      return (question.y+param) * question.x;
    }
  }
  function divide (question, param) {
    if (Math.random() > 0.5) {
      return Math.floor((question.x + param) / question.y);
    }
    else {
      return Math.floor(question.x / (question.y + param));
    }
  }

  /**
   * The alternative generator setup for the different arithmetic types
   * @type {Object}
   */
  var alternativesSetup = {};
  alternativesSetup[ArithmeticType.SUBTRACTION] = alternativesSetup[ArithmeticType.ADDITION] = [
    { weight: 0.15, type: add, param: 10 },
    { weight: 0.15, type: subtract, param: 10 },
    { weight: 0.15, type: add, param: 1 },
    { weight: 0.15, type: subtract, param: 1 },
    { weight: 0.15, type: add, param: 2 },
    { weight: 0.15, type: subtract, param: 2 },
    { weight: 0.10, type: randomInt }
  ];
  alternativesSetup[ArithmeticType.MULTIPLICATION] = [
    { weight: 0.15, type: add, param: 10 },
    { weight: 0.15, type: subtract, param: 10 },
    { weight: 0.15, type: add, param: 1 },
    { weight: 0.15, type: subtract, param: 1 },
    { weight: 0.15, type: multiply, param: 1 },
    { weight: 0.15, type: multiply, param: -1 },
    { weight: 0.10, type: randomInt }
  ];
  alternativesSetup[ArithmeticType.DIVISION] = [
    { weight: 0.15, type: add, param: 10 },
    { weight: 0.15, type: subtract, param: 10 },
    { weight: 0.15, type: add, param: 1 },
    { weight: 0.15, type: subtract, param: 1 },
    { weight: 0.15, type: divide, param: 1 },
    { weight: 0.15, type: divide, param: -1 },
    { weight: 0.10, type: randomInt }
  ];

  /**
   * Utility function that picks a alternative setup based on the weight
   * @method getRandomWeightedAlternativeSetup
   * @param  {H5P.ArithmeticQuiz.ArithmeticType} type
   * @return {Object}
   */
  function getRandomWeightedAlternativeSetup (type) {
    var setups = alternativesSetup[type];

    var i;
    var sum = 0;
    var r = Math.random();
    for (i in setups) {
      sum += setups[i].weight;
      if (r <= sum) {
        return setups[i];
      }
    }

    return setups[0];
  }

  /**
   * Arithmetic Questions generator classes
   * @method ArithmeticGenerator
   * @constructor
   * @param  {H5P.ArithmeticQuiz.ArithmeticType}   type
   * @param  {number}           maxQuestions
   */
  function ArithmeticGenerator(type, maxQuestions) {
    var self = this;
    var questions = [];
    var i, j;

    /**
     * Generates alternative for a question
     * @method generateAlternatives
     * @param  {Object}             question
     */
    function generateAlternatives(question) {
      question.alternatives = [];

      // Generate 5 wrong ones:
      while (question.alternatives.length !== 5) {
        var setup = getRandomWeightedAlternativeSetup(type);
        var alternative = setup.type(question, setup.param);
        // check if alternative is present allready and is not the correct one and is not negative number
        if (alternative !== question.correct && question.alternatives.indexOf(alternative) === -1 && alternative >= 0 && alternative <= 100) {
          question.alternatives.push(alternative);
        }
      }

      // Add correct one
      question.alternatives.push(question.correct);

      // Shuffle alternatives:
      question.alternatives = H5P.shuffleArray(question.alternatives);
    }

    /**
     * Creates textual representation for question
     * @method createTextualQuestion
     * @param  {Object}              question Question Object
     * @return {string}
     */
    function createTextualQuestion(question) {
      switch (type) {
        case ArithmeticType.ADDITION:
          return question.x + " + " + question.y;
        case ArithmeticType.SUBTRACTION:
          return question.x + " − " + question.y;
        case ArithmeticType.MULTIPLICATION:
          return question.x + " × " + question.y;
        case ArithmeticType.DIVISION:
          return question.x + " ÷ " + question.y;
        default:
          return '';
      }
    }

    // Generate questions
    switch (type) {
      case ArithmeticType.DIVISION:
      case ArithmeticType.MULTIPLICATION:
        for (i=1; i<10; i++) {
          for (j=1; j<10; j++) {
            questions.push({
              x:  type === ArithmeticType.DIVISION ? i * j : i,
              y: j,
              correct: type === ArithmeticType.DIVISION ? (i * j) / j : i * j
            });
          }
        }
        break;
      case ArithmeticType.ADDITION:
      case ArithmeticType.SUBTRACTION:
        for (i=100; i>=0; i--) {
          for (j=i; j>=0; j--) {
            questions.push({
              x: type === ArithmeticType.ADDITION ? i - j : i,
              y: j,
              correct: type === ArithmeticType.ADDITION ? i : i - j
            });
          }
        }
        break;
    }
    // Let's shuffle
    questions = H5P.shuffleArray(questions);

    if (questions.length > maxQuestions) {
      questions = questions.slice(0, maxQuestions);
    }

    // Create alternatives
    for (i = 0; i < questions.length; i++) {
      generateAlternatives(questions[i]);
      questions[i].textual = createTextualQuestion(questions[i]);
    }

    /**
     * Returns the questions including alternatives and textual representation
     * @public
     * @return {array}
     */
    self.get = function () {
      return questions;
    };
    
  }

  ArithmeticGenerator.prototype.readableQuestion = function (translations, readableSigns, question) {
    return translations.humanizedQuestion
      .replace(':arithmetic', readableSigns);
  };

  ArithmeticGenerator.prototype.readableText = function (question) {
    return question.textual + ' = ?';    
  };
    
  return ArithmeticGenerator;
}(H5P.ArithmeticQuiz.ArithmeticType));
;
/**
 * Defines the H5P.ArithmeticQuiz.GamePage class
 */
H5P.ArithmeticQuiz.GamePage = (function ($, UI, QuizType) {

  /**
   * Creates a new GamePage instance
   *
   * @class
   * @augments H5P.EventDispatcher
   * @namespace H5P
   * @param  {quizType} quizType
   * @param  {Object} t Object containing all options
   * @param {number} id Unique id to identify this quiz
   * @fires H5P.XAPIEvent
   */
  function GamePage(quizType, options, id) {
    H5P.EventDispatcher.call(this);
    var self = this;
    self.quizType = quizType;
    self.id = id;
    self.translations = options.UI;
    self.arithmeticType = options.arithmeticType;
    self.equationType = options.equationType;
    self.useFractions = options.useFractions;
    self.maxQuestions = options.maxQuestions;
    self.sliding = false;

    self.$gamepage = $('<div>', {
      'class': 'h5p-baq-game counting-down'
    });

    if (self.quizType === H5P.ArithmeticQuiz.QuizType.ARITHMETIC) {
      self.questionsGenerator = new H5P.ArithmeticQuiz.ArithmeticGenerator(self.arithmeticType, self.maxQuestions);
    } else {
      self.questionsGenerator = new H5P.ArithmeticQuiz.EquationsGenerator(self.arithmeticType, self.equationType, self.maxQuestions, self.useFractions);
    }
    self.score = 0;
    self.scoreWidget = new ScoreWidget(self.translations);
    self.scoreWidget.appendTo(self.$gamepage);

    self.timer = new H5P.ArithmeticQuiz.TimerWidget(self.translations);
    self.timer.appendTo(self.$gamepage);

    self.slider = UI.createSlider();

    self.countdownWidget = new H5P.ArithmeticQuiz.CountdownWidget(4, self.translations);
    self.slider.addSlide(self.countdownWidget.create());
    self.countdownWidget.on('ignition', function () {
      self.$gamepage.removeClass('counting-down');
      self.progressbar.setProgress(0);
      self.slider.next();
      self.timer.start();
      self.trigger('started-quiz');
    });

    // Shuffle quizzes:
    self.quizzes = self.questionsGenerator.get();

    var numQuestions = self.quizzes.length;
    for (var i = 0; i < numQuestions; i++) {
      self.slider.addSlide(self.createSlide(self.quizzes[i], i));
    }

    // Create progressbar
    self.progressbar = UI.createProgressbar(numQuestions, {
      progressText: self.translations.slideOfTotal
    });
    self.progressbar.appendTo(self.$gamepage);

    // Add result page:
    self.resultPage = new H5P.ArithmeticQuiz.ResultPage(numQuestions, self.translations);
    self.slider.addSlide(self.resultPage.create());

    self.resultPage.on('retry', function () {
      self.reset();
      self.slider.first();
    });

    self.slider.on('last-slide', function () {
      self.resultPage.update(self.score, self.timer.pause());
      self.$gamepage.addClass('result-page');
      self.trigger('last-slide', {
        score: self.score,
        numQuestions: numQuestions
      });
    });

    self.slider.on('first-slide', function () {
      self.$gamepage.removeClass('result-page');
    });

    self.slider.on('move', function () {
      self.progressbar.next();
    });

    self.slider.on('moved', function () {
      self.sliding = false;
      // Set focus
      var $button = self.$gamepage.find('.current .h5p-joubelui-button')[0];
      if ($button) {
        $button.focus();
      }
    });

    self.slider.attach(self.$gamepage);
  }
  GamePage.prototype = Object.create(H5P.EventDispatcher.prototype);
  GamePage.prototype.constructor = GamePage;

  /**
   * Starts the countdown
   */
  GamePage.prototype.startCountdown = function () {
    this.countdownWidget.start();
  };

  /**
   * Calculate maximum height
   * @method getMaxHeight
   * @return {number}
   */
  GamePage.prototype.getMaxHeight = function () {
    var $slide = $('.question-page', this.$gamepage).first();
    $slide.css({
      display: 'block',
      width: $('.h5p-container').width() + 'px'
    });
    var height = $slide.height();
    $slide.css({
      display: '',
      width: '100%'
    });

    return height;
  };

  /**
   * Resets quiz
   */
  GamePage.prototype.reset = function () {
    this.score = 0;
    this.scoreWidget.update(0);
    this.timer.reset();
    this.$gamepage.find('.reveal-wrong').removeClass('reveal-wrong');
    this.$gamepage.find('.reveal-correct').removeClass('reveal-correct');
    this.$gamepage.find('.h5p-baq-alternatives .h5p-joubelui-button')
      .attr('aria-checked', 'false');
    this.$gamepage.addClass('counting-down');
    this.countdownWidget.restart();
    this.$gamepage.find('.h5p-joubelui-button:first-child, .h5p-joubelui-button:last-child').attr('tabindex', 0);
  };

  GamePage.prototype.makeSignsReadable = function (questionTextual) {
    var self = this;
    questionTextual = String(questionTextual);
    return questionTextual
        .replaceAll('\\+', self.translations.plusOperator)
        .replaceAll('−', self.translations.minusOperator)
        .replaceAll('-', self.translations.minusOperator)
        .replaceAll('×', self.translations.multiplicationOperator)
        .replaceAll('/', ' ' + self.translations.divisionOperator + ' ')
        .replaceAll('÷', self.translations.divisionOperator)
        .replaceAll('=', self.translations.equalitySign);
  };

  /**
   * Creates a question slide
   *
   * @param  {Object} question
   * @param  {string} question.q The question
   * @param  {number} question.correct The correct answer
   * @param  {number} i Index of question
   * @return {H5P.jQuery} The jquery dom element generated
   */
  GamePage.prototype.createSlide = function (question, i) {
    var self = this;
    var readableSigns = undefined;
    var readableQuestion = undefined;
    var readableText = undefined;
    var $slide = $('<div>', {
      'class': 'question-page'
    });

    // Make equations readable, e.g. plus signs are not read by ChromeVox.
    readableSigns = self.makeSignsReadable(question.textual);
    readableQuestion = self.questionsGenerator.readableQuestion(self.translations, readableSigns, question);
    readableText = self.questionsGenerator.readableText(question);

    var questionId = 'arithmetic-quiz-' + self.id + '-question-' + i;

    $('<div>', {
      'class': 'question',
      'text': readableText,
      'aria-label': readableQuestion,
      'id': questionId
    }).appendTo($slide);

    if (question.expression !== undefined) {
      var readableVariable = self.translations.humanizedVariable
          .replace(':item', question.variable);
      $('<div>', {
        'class': 'question',
        'text': question.variable + ' = ?',
        'aria-label': readableVariable,
        'id': questionId
      }).appendTo($slide);
    }

    var $alternatives = $('<ul>', {
      'class': 'h5p-baq-alternatives',
      'role': 'radiogroup',
      'aria-labelledby': questionId
    });

    // Index of the currently focused option.
    var focusedOption;

    /**
     * Handles focusing one of the options, making the rest non-tabbable.
     * @private
     */
    var handleFocus = function () {
      // Go through all alternatives
      for (var i = 0; i < alternatives.length; i++) {
        if (alternatives[i] === this) {
          // Keep track of currently focused option
          focusedOption = i;
          alternatives[i].tabbable();
        }
        else {
          // Remove from tab
          alternatives[i].notTabbable();
        }
      }
    };

    /**
     * Handles moving the focus from the current option to the previous option.
     * @private
     */
    var handlePreviousOption = function () {
      if (focusedOption !== 0) {
        alternatives[focusedOption - 1].focus();
      }
    };

    /**
     * Handles moving the focus from the current option to the next option.
     * @private
     */
    var handleNextOption = function () {
      if (focusedOption !== alternatives.length - 1) {
        alternatives[focusedOption + 1].focus();
      }
    };

    var alternatives = [];
    var readableAlternative = undefined;
    for (var k = 0; k < question.alternatives.length; k++) {
      readableAlternative = self.makeSignsReadable(question.alternatives[k]);
      alternatives.push(new Alternative(question.alternatives[k], readableAlternative, question.alternatives[k]===question.correct, self.translations));
    }

    alternatives.forEach(function (alternative, index) {
      if (index === 0 || index === alternatives.length - 1) {
        alternative.tabbable();
      }
      alternative.on('focus', handleFocus);
      alternative.on('previousOption', handlePreviousOption);
      alternative.on('nextOption', handleNextOption);
      alternative.appendTo($alternatives);
      alternative.on('answered', function () {

        // Ignore clicks if in the middle of something else:
        if (self.sliding) {
          return;
        }
        self.sliding = true;

        self.trigger('alternative-chosen');

        // Can't play it after the transition end is received, since this is not
        // accepted on iPad. Therefore we are playing it here with a delay instead
        H5P.ArithmeticQuiz.SoundEffects.play(alternative.correct ? 'positive-short' : 'negative-short', 300);

        if (alternative.correct) {
          self.score++;
          self.scoreWidget.update(self.score);
        }

        alternatives.forEach(function (alt) {
          if (alt.correct && alternative !== alt) {
            alternative.announce(self.translations.incorrectText.replace(':num', alt.readableResult));
          }
          alt.reveal();
        });

        setTimeout(function(){
          self.slider.next();
        }, 3500);
      });
    });

    $alternatives.appendTo($slide);
    return $slide;
  };


  /**
   * Append game page to container
   *
   * @param  {H5P.jQuery} $container
   */
  GamePage.prototype.appendTo = function ($container) {
    this.$gamepage.appendTo($container);
  };

  String.prototype.replaceAll = function(target, replacement) {
      //var target = this;
      return this.split(target).join(replacement);
      //return target.replace(new RegExp(search, 'g'), replacement);
  };

  /**
   * Creates a ScoreWidget instance
   *
   * @class
   * @private
   * @param  {Object} t Translation object
   */
  function ScoreWidget(t) {
    var self = this;

    var $score = $('<span>', {
      'class': 'h5p-baq-score-widget-number',
      html: 0
    });

    this.$scoreWidget = $('<div>', {
      'class': 'h5p-baq-score-widget',
      'aria-live': 'polite',
      'aria-atomic': true,
      html: t.score + ' '
    }).append($score);

    this.scoreElement = $score.get(0);

    this.appendTo = function ($container) {
      this.$scoreWidget.appendTo($container);

      new Odometer({
        el: this.scoreElement
      });
    };

    this.update = function (score) {
      // Need this aria-busy to make sure readspeaker is not reading
      // both old and new score
      this.$scoreWidget.attr('aria-busy', true);
      this.scoreElement.innerHTML = score;
      // timeout has to be long enough that odometer has time to transition
      setTimeout(function () {
        self.$scoreWidget.attr('aria-busy', false);
      }, 500);
    };
  }


  /**
   * Creates an Alternative button instance
   *
   * @class
   * @private
   * @augments H5P.EventDispatcher
   * @fires H5P.Event
   * @param {number} number Number on button
   * @param {boolean} correct Correct or not
   * @param {Object} t Translations
   */
  function Alternative(number, readableResult, correct, t) {
    H5P.EventDispatcher.call(this);
    var self = this;

    self.number = number;
    self.readableResult = readableResult;
    self.correct = correct;

    var answer = function (event) {
      if (self.correct) {
        self.announce(t.correctText);
      }
      self.$button.attr('aria-checked', 'true');
      self.trigger('answered');
      setTimeout(self.dropLive, 500);
      event.preventDefault();
    };

    // Create radio button and set up event listeners
    this.$button = $('<li>', {
      'class': 'h5p-joubelui-button',
      'role': 'radio',
      'tabindex': -1,
      'text': number,
      'aria-checked': 'false',
      'on': {
        'keydown': function (event) {
          if (self.$button.is('.reveal-correct, .reveal-wrong')) {
            return;
          }
          switch (event.which) {
            case 13: // Enter
            case 32: // Space
              // Answer question
              answer(event);
              break;

            case 37: // Left Arrow
            case 38: // Up Arrow
              // Go to previous Option
              self.trigger('previousOption');
              event.preventDefault();
              break;

            case 39: // Right Arrow
            case 40: // Down Arrow
              // Go to next Option
              self.trigger('nextOption');
              event.preventDefault();
              break;
          }
        },
        'focus': function () {
          if (self.$button.is('.reveal-correct, reveal-wrong')) {
            return;
          }
          self.trigger('focus');
        },
        'click': function (event) {
          if (self.$button.is('.reveal-correct, reveal-wrong')) {
            return;
          }
          // Answer question
          answer(event);
        }
      }
    });

    /**
     * Move focus to this option.
     */
    self.focus = function () {
      self.$button.focus();
    };

    /**
     * Makes it possible to tab your way to this option.
     */
    self.tabbable = function () {
      self.$button.attr('tabindex', 0);
    };

    /**
     * Make sure it's NOT possible to tab your way to this option.
     */
    self.notTabbable = function () {
      self.$button.attr('tabindex', -1);
    };

    this.dropLive = function() {
      if (self.$liveRegion) {
        var node = self.$liveRegion[0];
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
    };

    this.announce = function (text) {
      self.$liveRegion = $('<div>', {
        'class': 'h5p-baq-live-feedback',
        'aria-live': 'assertive',
        'width': '1px',
        'height': '1px',
      }).appendTo(document.body.lastChild);

      // Readspeaker needs a small delay after creating the aria live field
      // in order to pick up the change
      setTimeout(function () {
        self.$liveRegion.text(text);
      }, 100);
    };


    this.reveal = function () {
      this.$button.addClass(this.correct ? 'reveal-correct' : 'reveal-wrong')
          .attr('tabindex', -1);
    };

    this.appendTo = function ($container) {
      this.$button.appendTo($container);
      return this;
    };
  }
  Alternative.prototype = Object.create(H5P.EventDispatcher.prototype);
  Alternative.prototype.constructor = Alternative;

  return GamePage;
})(H5P.jQuery, H5P.JoubelUI, H5P.ArithmeticQuiz.QuizType);
;
H5P.ArithmeticQuiz.ResultPage = (function ($, UI) {
  /**
   * Creates a ResultPage instance
   *
   * @class
   * @namespace H5P.ArithmeticQuiz
   * @augments H5P.EventDispatcher
   *
   * @param  {number} maxScore Max score
   * @param  {Object} t Translation objects
   * @fires H5P.Event
   */
  function ResultPage(maxScore, t){
    H5P.EventDispatcher.call(this);
    var self = this;

    this.$resultPage = $('<div>', {
      'class': 'h5p-baq-result-page'
    });

    this.$feedbackContainer = $('<div>', {
      'class': 'h5p-baq-result-page-feedback'
    }).appendTo(this.$resultPage);

    this.$scoreStatus = $('<div>', {
      'class': 'h5p-baq-result-page-score-status',
      'aria-live': 'assertive'
    }).appendTo(this.$feedbackContainer);

    this.$scoreStatus.append($('<div>', {
      'class': 'h5p-baq-result-page-header',
      'html': t.resultPageHeader
    }));

    this.maxScore = maxScore;
    this.scoreBar = UI.createScoreBar(maxScore);
    this.scoreBar.appendTo(this.$scoreStatus);

    this.$ariaScoreBar = $('<div>', {
      'class': 'hidden-but-read',
      appendTo: this.$scoreStatus,
    });

    this.$time = $('<div>', {
      'class': 'h5p-baq-result-page-time',
      'aria-hidden': true,
    }).appendTo(this.$scoreStatus);

    /**
     * Note: Wee need a separate assistive technology field for time beecause
     * some readers are not able to interpret the duration format of <time>
     */
    this.$ariaTime = $('<div>', {
      'class': 'hidden-but-read',
    }).appendTo(this.$scoreStatus);

    UI.createButton({
      text: t.retryButton,
      'class': 'mq-control-button',
      click: function () {
        self.trigger('retry');
        self.update(0, '00:00');
        self.scoreBar.reset();
      }
    }).appendTo(this.$feedbackContainer);

    this.$resultAnnouncer = $('<div>', {
      'class': 'h5p-baq-live-feedback',
      'aria-live': 'assertive',
    }).appendTo(this.$resultPage);

    /**
     * Creates result page
     *
     * @return {H5P.jQuery}
     */
    this.create = function () {
      return this.$resultPage;
    };

    /**
     * Get score as a string
     * @param {Number} score Current score
     * @return {String} Score string
     */
    this.getReadableScore = function (score) {
      return t.score + ' ' + score + '/' + this.maxScore;
    };

    /**
     * Get readable time
     * @param {String} time Current time in the format: "minutes:seconds"
     * @returns {*|void|string|null}
     */
    this.getReadableTime = function (time) {
      return t.time.replace('@time', time.replace(':', ', '));
    };

    /**
     * Announce result page info
     * @param {Number} score Current score
     * @param {String} time Current time in the format: "minutes:seconds"
     */
    this.announce = function (score, time) {
      let text = t.resultPageHeader + ' ';
      text +=  this.getReadableScore(score) + '. ';
      text += this.getReadableTime(time);

      // Readspeaker needs a small delay after creating the aria live field
      // in order to pick up the change
      setTimeout(function () {
        self.$resultAnnouncer.text(text);
      }, 100);
    };

    /**
     * Updates result page
     *
     * @param  {number} score
     * @param  {string} time
     */
    this.update = function (score, time) {
      let minutes = parseInt(time.split(':')[0], 10);
      let seconds = parseInt(time.split(':')[1], 10);
      const dateTime = 'PT' + minutes + 'M' + seconds + 'S';
      const timeHtml = '<time datetime="' + dateTime + '">' + time + '</time>';
      this.$time.html(H5P.ArithmeticQuiz.tReplace(t.time, {time: timeHtml}));
      this.$ariaTime.html(this.getReadableTime(time));
      this.scoreBar.setScore(score);
      this.$ariaScoreBar.text(this.getReadableScore(score));

      this.announce(score, time);
    };
  }
  ResultPage.prototype = Object.create(H5P.EventDispatcher.prototype);
  ResultPage.prototype.constructor = ResultPage;

  return ResultPage;

})(H5P.jQuery, H5P.JoubelUI);
;
