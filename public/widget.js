(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var react = {exports: {}};

	var react_production_min = {};

	/**
	 * @license React
	 * react.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var l$1=Symbol.for("react.element"),n$1=Symbol.for("react.portal"),p$2=Symbol.for("react.fragment"),q$1=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v$1=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z$1=Symbol.iterator;function A$1(a){if(null===a||"object"!==typeof a)return null;a=z$1&&a[z$1]||a["@@iterator"];return "function"===typeof a?a:null}
	var B$1={isMounted:function(){return  false},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C$1=Object.assign,D$1={};function E$1(a,b,e){this.props=a;this.context=b;this.refs=D$1;this.updater=e||B$1;}E$1.prototype.isReactComponent={};
	E$1.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState");};E$1.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F(){}F.prototype=E$1.prototype;function G$1(a,b,e){this.props=a;this.context=b;this.refs=D$1;this.updater=e||B$1;}var H$1=G$1.prototype=new F;
	H$1.constructor=G$1;C$1(H$1,E$1.prototype);H$1.isPureReactComponent=true;var I$1=Array.isArray,J=Object.prototype.hasOwnProperty,K$1={current:null},L$1={key:true,ref:true,__self:true,__source:true};
	function M$1(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L$1.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f;}if(a&&a.defaultProps)for(d in g=a.defaultProps,g) void 0===c[d]&&(c[d]=g[d]);return {$$typeof:l$1,type:a,key:k,ref:h,props:c,_owner:K$1.current}}
	function N$1(a,b){return {$$typeof:l$1,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O$1(a){return "object"===typeof a&&null!==a&&a.$$typeof===l$1}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var P$1=/\/+/g;function Q$1(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
	function R$1(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=false;if(null===a)h=true;else switch(k){case "string":case "number":h=true;break;case "object":switch(a.$$typeof){case l$1:case n$1:h=true;}}if(h)return h=a,c=c(h),a=""===d?"."+Q$1(h,0):d,I$1(c)?(e="",null!=a&&(e=a.replace(P$1,"$&/")+"/"),R$1(c,b,e,"",function(a){return a})):null!=c&&(O$1(c)&&(c=N$1(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P$1,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I$1(a))for(var g=0;g<a.length;g++){k=
	a[g];var f=d+Q$1(k,g);h+=R$1(k,b,e,f,c);}else if(f=A$1(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q$1(k,g++),h+=R$1(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
	function S$1(a,b,e){if(null==a)return a;var d=[],c=0;R$1(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T$1(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b;},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b;});-1===a._status&&(a._status=0,a._result=b);}if(1===a._status)return a._result.default;throw a._result;}
	var U$1={current:null},V$1={transition:null},W$1={ReactCurrentDispatcher:U$1,ReactCurrentBatchConfig:V$1,ReactCurrentOwner:K$1};function X$1(){throw Error("act(...) is not supported in production builds of React.");}
	react_production_min.Children={map:S$1,forEach:function(a,b,e){S$1(a,function(){b.apply(this,arguments);},e);},count:function(a){var b=0;S$1(a,function(){b++;});return b},toArray:function(a){return S$1(a,function(a){return a})||[]},only:function(a){if(!O$1(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};react_production_min.Component=E$1;react_production_min.Fragment=p$2;react_production_min.Profiler=r;react_production_min.PureComponent=G$1;react_production_min.StrictMode=q$1;react_production_min.Suspense=w;
	react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W$1;react_production_min.act=X$1;
	react_production_min.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C$1({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){ void 0!==b.ref&&(k=b.ref,h=K$1.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L$1.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
	for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g;}return {$$typeof:l$1,type:a.type,key:c,ref:k,props:d,_owner:h}};react_production_min.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};react_production_min.createElement=M$1;react_production_min.createFactory=function(a){var b=M$1.bind(null,a);b.type=a;return b};react_production_min.createRef=function(){return {current:null}};
	react_production_min.forwardRef=function(a){return {$$typeof:v$1,render:a}};react_production_min.isValidElement=O$1;react_production_min.lazy=function(a){return {$$typeof:y,_payload:{_status:-1,_result:a},_init:T$1}};react_production_min.memo=function(a,b){return {$$typeof:x,type:a,compare:void 0===b?null:b}};react_production_min.startTransition=function(a){var b=V$1.transition;V$1.transition={};try{a();}finally{V$1.transition=b;}};react_production_min.unstable_act=X$1;react_production_min.useCallback=function(a,b){return U$1.current.useCallback(a,b)};react_production_min.useContext=function(a){return U$1.current.useContext(a)};
	react_production_min.useDebugValue=function(){};react_production_min.useDeferredValue=function(a){return U$1.current.useDeferredValue(a)};react_production_min.useEffect=function(a,b){return U$1.current.useEffect(a,b)};react_production_min.useId=function(){return U$1.current.useId()};react_production_min.useImperativeHandle=function(a,b,e){return U$1.current.useImperativeHandle(a,b,e)};react_production_min.useInsertionEffect=function(a,b){return U$1.current.useInsertionEffect(a,b)};react_production_min.useLayoutEffect=function(a,b){return U$1.current.useLayoutEffect(a,b)};
	react_production_min.useMemo=function(a,b){return U$1.current.useMemo(a,b)};react_production_min.useReducer=function(a,b,e){return U$1.current.useReducer(a,b,e)};react_production_min.useRef=function(a){return U$1.current.useRef(a)};react_production_min.useState=function(a){return U$1.current.useState(a)};react_production_min.useSyncExternalStore=function(a,b,e){return U$1.current.useSyncExternalStore(a,b,e)};react_production_min.useTransition=function(){return U$1.current.useTransition()};react_production_min.version="18.3.1";

	{
	  react.exports = react_production_min;
	}

	var reactExports = react.exports;
	var React = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

	var client = {};

	var reactDom = {exports: {}};

	var reactDom_production_min = {};

	var scheduler = {exports: {}};

	var scheduler_production_min = {};

	/**
	 * @license React
	 * scheduler.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	(function (exports$1) {
	function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
		function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports$1.unstable_now=function(){return l.now()};}else {var p=Date,q=p.now();exports$1.unstable_now=function(){return p.now()-q};}var r=[],t=[],u=1,v=null,y=3,z=false,A=false,B=false,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
		"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t);}}function H(a){B=false;G(a);if(!A)if(null!==h(r))A=true,I(J);else {var b=h(t);null!==b&&K(H,b.startTime-a);}}
		function J(a,b){A=false;B&&(B=false,E(L),L=-1);z=true;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports$1.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b);}else k(r);v=h(r);}if(null!==v)var w=!0;else {var m=h(t);null!==m&&K(H,m.startTime-b);w=!1;}return w}finally{v=null,y=c,z=false;}}var N=false,O=null,L=-1,P=5,Q=-1;
		function M(){return exports$1.unstable_now()-Q<P?false:true}function R(){if(null!==O){var a=exports$1.unstable_now();Q=a;var b=true;try{b=O(!0,a);}finally{b?S():(N=false,O=null);}}else N=false;}var S;if("function"===typeof F)S=function(){F(R);};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null);};}else S=function(){D(R,0);};function I(a){O=a;N||(N=true,S());}function K(a,b){L=D(function(){a(exports$1.unstable_now());},b);}
		exports$1.unstable_IdlePriority=5;exports$1.unstable_ImmediatePriority=1;exports$1.unstable_LowPriority=4;exports$1.unstable_NormalPriority=3;exports$1.unstable_Profiling=null;exports$1.unstable_UserBlockingPriority=2;exports$1.unstable_cancelCallback=function(a){a.callback=null;};exports$1.unstable_continueExecution=function(){A||z||(A=true,I(J));};
		exports$1.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5;};exports$1.unstable_getCurrentPriorityLevel=function(){return y};exports$1.unstable_getFirstCallbackNode=function(){return h(r)};exports$1.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y;}var c=y;y=b;try{return a()}finally{y=c;}};exports$1.unstable_pauseExecution=function(){};
		exports$1.unstable_requestPaint=function(){};exports$1.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var c=y;y=a;try{return b()}finally{y=c;}};
		exports$1.unstable_scheduleCallback=function(a,b,c){var d=exports$1.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3;}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=true,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=true,I(J)));return a};
		exports$1.unstable_shouldYield=M;exports$1.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c;}}}; 
	} (scheduler_production_min));

	{
	  scheduler.exports = scheduler_production_min;
	}

	var schedulerExports = scheduler.exports;

	/**
	 * @license React
	 * react-dom.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var aa=reactExports,ca=schedulerExports;function p$1(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(a,b){ha(a,b);ha(a+"Capture",b);}
	function ha(a,b){ea[a]=b;for(a=0;a<b.length;a++)da.add(b[a]);}
	var ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la=
	{},ma={};function oa(a){if(ja.call(ma,a))return  true;if(ja.call(la,a))return  false;if(ka.test(a))return ma[a]=true;la[a]=true;return  false}function pa(a,b,c,d){if(null!==c&&0===c.type)return  false;switch(typeof b){case "function":case "symbol":return  true;case "boolean":if(d)return  false;if(null!==c)return !c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return "data-"!==a&&"aria-"!==a;default:return  false}}
	function qa(a,b,c,d){if(null===b||"undefined"===typeof b||pa(a,b,c,d))return  true;if(d)return  false;if(null!==c)switch(c.type){case 3:return !b;case 4:return  false===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return  false}function v(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g;}var z={};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){z[a]=new v(a,0,false,a,null,false,false);});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];z[b]=new v(b,1,false,a[1],null,false,false);});["contentEditable","draggable","spellCheck","value"].forEach(function(a){z[a]=new v(a,2,false,a.toLowerCase(),null,false,false);});
	["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){z[a]=new v(a,2,false,a,null,false,false);});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){z[a]=new v(a,3,false,a.toLowerCase(),null,false,false);});
	["checked","multiple","muted","selected"].forEach(function(a){z[a]=new v(a,3,true,a,null,false,false);});["capture","download"].forEach(function(a){z[a]=new v(a,4,false,a,null,false,false);});["cols","rows","size","span"].forEach(function(a){z[a]=new v(a,6,false,a,null,false,false);});["rowSpan","start"].forEach(function(a){z[a]=new v(a,5,false,a.toLowerCase(),null,false,false);});var ra=/[\-:]([a-z])/g;function sa(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ra,
	sa);z[b]=new v(b,1,false,a,null,false,false);});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,false,a,"http://www.w3.org/1999/xlink",false,false);});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,false,a,"http://www.w3.org/XML/1998/namespace",false,false);});["tabIndex","crossOrigin"].forEach(function(a){z[a]=new v(a,1,false,a.toLowerCase(),null,false,false);});
	z.xlinkHref=new v("xlinkHref",1,false,"xlink:href","http://www.w3.org/1999/xlink",true,false);["src","href","action","formAction"].forEach(function(a){z[a]=new v(a,1,false,a.toLowerCase(),null,true,true);});
	function ta(a,b,c,d){var e=z.hasOwnProperty(b)?z[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])qa(b,c,e,d)&&(c=null),d||null===e?oa(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?false:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&true===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)));}
	var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy");var Ia=Symbol.for("react.offscreen");var Ja=Symbol.iterator;function Ka(a){if(null===a||"object"!==typeof a)return null;a=Ja&&a[Ja]||a["@@iterator"];return "function"===typeof a?a:null}var A=Object.assign,La;function Ma(a){if(void 0===La)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);La=b&&b[1]||"";}return "\n"+La+a}var Na=false;
	function Oa(a,b){if(!a||Na)return "";Na=true;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[]);}catch(l){var d=l;}Reflect.construct(a,[],b);}else {try{b.call();}catch(l){d=l;}a.call(b.prototype);}else {try{throw Error();}catch(l){d=l;}a();}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
	f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{Na=false,Error.prepareStackTrace=c;}return (a=a?a.displayName||a.name:"")?Ma(a):""}
	function Pa(a){switch(a.tag){case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a=Oa(a.type,false),a;case 11:return a=Oa(a.type.render,false),a;case 1:return a=Oa(a.type,true),a;default:return ""}}
	function Qa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ya:return "Fragment";case wa:return "Portal";case Aa:return "Profiler";case za:return "StrictMode";case Ea:return "Suspense";case Fa:return "SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ca:return (a.displayName||"Context")+".Consumer";case Ba:return (a._context.displayName||"Context")+".Provider";case Da:var b=a.render;a=a.displayName;a||(a=b.displayName||
	b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Ga:return b=a.displayName||null,null!==b?b:Qa(a.type)||"Memo";case Ha:b=a._payload;a=a._init;try{return Qa(a(b))}catch(c){}}return null}
	function Ra(a){var b=a.type;switch(a.tag){case 24:return "Cache";case 9:return (b.displayName||"Context")+".Consumer";case 10:return (b._context.displayName||"Context")+".Provider";case 18:return "DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return "Fragment";case 5:return b;case 4:return "Portal";case 3:return "Root";case 6:return "Text";case 16:return Qa(b);case 8:return b===za?"StrictMode":"Mode";case 22:return "Offscreen";
	case 12:return "Profiler";case 21:return "Scope";case 13:return "Suspense";case 19:return "SuspenseList";case 25:return "TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return ""}}
	function Ta(a){var b=a.type;return (a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
	function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:true,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a);}});Object.defineProperty(a,b,{enumerable:c.enumerable});return {getValue:function(){return d},setValue:function(a){d=""+a;},stopTracking:function(){a._valueTracker=
	null;delete a[b];}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a));}function Wa(a){if(!a)return  false;var b=a._valueTracker;if(!b)return  true;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),true):false}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
	function Ya(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value};}function ab(a,b){b=b.checked;null!=b&&ta(a,"checked",b,false);}
	function bb(a,b){ab(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c;}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?cb(a,b.type,c):b.hasOwnProperty("defaultValue")&&cb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked);}
	function db(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b;}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c);}
	function cb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c);}var eb=Array.isArray;
	function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=true;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=true);}else {c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=true;d&&(a[e].defaultSelected=true);return}null!==b||a[e].disabled||(b=a[e]);}null!==b&&(b.selected=true);}}
	function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(p$1(91));return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(p$1(92));if(eb(c)){if(1<c.length)throw Error(p$1(93));c=c[0];}b=c;}null==b&&(b="");c=b;}a._wrapperState={initialValue:Sa(c)};}
	function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d);}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b);}function kb(a){switch(a){case "svg":return "http://www.w3.org/2000/svg";case "math":return "http://www.w3.org/1998/Math/MathML";default:return "http://www.w3.org/1999/xhtml"}}
	function lb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?kb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
	var mb,nb=function(a){return "undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)});}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else {mb=mb||document.createElement("div");mb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=mb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild);}});
	function ob(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b;}
	var pb={animationIterationCount:true,aspectRatio:true,borderImageOutset:true,borderImageSlice:true,borderImageWidth:true,boxFlex:true,boxFlexGroup:true,boxOrdinalGroup:true,columnCount:true,columns:true,flex:true,flexGrow:true,flexPositive:true,flexShrink:true,flexNegative:true,flexOrder:true,gridArea:true,gridRow:true,gridRowEnd:true,gridRowSpan:true,gridRowStart:true,gridColumn:true,gridColumnEnd:true,gridColumnSpan:true,gridColumnStart:true,fontWeight:true,lineClamp:true,lineHeight:true,opacity:true,order:true,orphans:true,tabSize:true,widows:true,zIndex:true,
	zoom:true,fillOpacity:true,floodOpacity:true,stopOpacity:true,strokeDasharray:true,strokeDashoffset:true,strokeMiterlimit:true,strokeOpacity:true,strokeWidth:true},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(a){qb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pb[b]=pb[a];});});function rb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pb.hasOwnProperty(a)&&pb[a]?(""+b).trim():b+"px"}
	function sb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e;}}var tb=A({menuitem:true},{area:true,base:true,br:true,col:true,embed:true,hr:true,img:true,input:true,keygen:true,link:true,meta:true,param:true,source:true,track:true,wbr:true});
	function ub(a,b){if(b){if(tb[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(p$1(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(p$1(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(p$1(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(p$1(62));}}
	function vb(a,b){if(-1===a.indexOf("-"))return "string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return  false;default:return  true}}var wb=null;function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
	function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(p$1(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b));}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a;}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a]);}}function Gb(a,b){return a(b)}function Hb(){}var Ib=false;function Jb(a,b,c){if(Ib)return a(b,c);Ib=true;try{return Gb(a,b,c)}finally{if(Ib=false,null!==zb||null!==Ab)Hb(),Fb();}}
	function Kb(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=false;}if(a)return null;if(c&&"function"!==
	typeof c)throw Error(p$1(231,b,typeof c));return c}var Lb=false;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0;}});window.addEventListener("test",Mb,Mb);window.removeEventListener("test",Mb,Mb);}catch(a){Lb=false;}function Nb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l);}catch(m){this.onError(m);}}var Ob=false,Pb=null,Qb=false,Rb=null,Sb={onError:function(a){Ob=true;Pb=a;}};function Tb(a,b,c,d,e,f,g,h,k){Ob=false;Pb=null;Nb.apply(Sb,arguments);}
	function Ub(a,b,c,d,e,f,g,h,k){Tb.apply(this,arguments);if(Ob){if(Ob){var l=Pb;Ob=false;Pb=null;}else throw Error(p$1(198));Qb||(Qb=true,Rb=l);}}function Vb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else {a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function Wb(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Xb(a){if(Vb(a)!==a)throw Error(p$1(188));}
	function Yb(a){var b=a.alternate;if(!b){b=Vb(a);if(null===b)throw Error(p$1(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Xb(e),a;if(f===d)return Xb(e),b;f=f.sibling;}throw Error(p$1(188));}if(c.return!==d.return)c=e,d=f;else {for(var g=false,h=e.child;h;){if(h===c){g=true;c=e;d=f;break}if(h===d){g=true;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===
	c){g=true;c=f;d=e;break}if(h===d){g=true;d=f;c=e;break}h=h.sibling;}if(!g)throw Error(p$1(189));}}if(c.alternate!==d)throw Error(p$1(190));}if(3!==c.tag)throw Error(p$1(188));return c.stateNode.current===c?a:b}function Zb(a){a=Yb(a);return null!==a?$b(a):null}function $b(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=$b(a);if(null!==b)return b;a=a.sibling;}return null}
	var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(a){if(lc&&"function"===typeof lc.onCommitFiberRoot)try{lc.onCommitFiberRoot(kc,a,void 0,128===(a.current.flags&128));}catch(b){}}
	var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(a){a>>>=0;return 0===a?32:31-(pc(a)/qc|0)|0}var rc=64,sc=4194304;
	function tc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
	default:return a}}function uc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=tc(h):(f&=g,0!==f&&(d=tc(f)));}else g=c&~e,0!==g?d=tc(g):0!==f&&(d=tc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-oc(b),e=1<<c,d|=a[c],b&=~e;return d}
	function vc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return  -1;case 134217728:case 268435456:case 536870912:case 1073741824:return  -1;default:return  -1}}
	function wc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-oc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=vc(h,b);}else k<=b&&(a.expiredLanes|=h);f&=~h;}}function xc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function yc(){var a=rc;rc<<=1;0===(rc&4194240)&&(rc=64);return a}function zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
	function Ac(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-oc(b);a[b]=c;}function Bc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-oc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f;}}
	function Cc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-oc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e;}}var C=0;function Dc(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=false,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function Sc(a,b){switch(a){case "focusin":case "focusout":Lc=null;break;case "dragenter":case "dragleave":Mc=null;break;case "mouseover":case "mouseout":Nc=null;break;case "pointerover":case "pointerout":Oc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc.delete(b.pointerId);}}
	function Tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,nativeEvent:f,targetContainers:[e]},null!==b&&(b=Cb(b),null!==b&&Fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
	function Uc(a,b,c,d,e){switch(b){case "focusin":return Lc=Tc(Lc,a,b,c,d,e),true;case "dragenter":return Mc=Tc(Mc,a,b,c,d,e),true;case "mouseover":return Nc=Tc(Nc,a,b,c,d,e),true;case "pointerover":var f=e.pointerId;Oc.set(f,Tc(Oc.get(f)||null,a,b,c,d,e));return  true;case "gotpointercapture":return f=e.pointerId,Pc.set(f,Tc(Pc.get(f)||null,a,b,c,d,e)),true}return  false}
	function Vc(a){var b=Wc(a.target);if(null!==b){var c=Vb(b);if(null!==c)if(b=c.tag,13===b){if(b=Wb(c),null!==b){a.blockedOn=b;Ic(a.priority,function(){Gc(c);});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null;}
	function Xc(a){if(null!==a.blockedOn)return  false;for(var b=a.targetContainers;0<b.length;){var c=Yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;var d=new c.constructor(c.type,c);wb=d;c.target.dispatchEvent(d);wb=null;}else return b=Cb(c),null!==b&&Fc(b),a.blockedOn=c,false;b.shift();}return  true}function Zc(a,b,c){Xc(a)&&c.delete(b);}function $c(){Jc=false;null!==Lc&&Xc(Lc)&&(Lc=null);null!==Mc&&Xc(Mc)&&(Mc=null);null!==Nc&&Xc(Nc)&&(Nc=null);Oc.forEach(Zc);Pc.forEach(Zc);}
	function ad(a,b){a.blockedOn===b&&(a.blockedOn=null,Jc||(Jc=true,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)));}
	function bd(a){function b(b){return ad(b,a)}if(0<Kc.length){ad(Kc[0],a);for(var c=1;c<Kc.length;c++){var d=Kc[c];d.blockedOn===a&&(d.blockedOn=null);}}null!==Lc&&ad(Lc,a);null!==Mc&&ad(Mc,a);null!==Nc&&ad(Nc,a);Oc.forEach(b);Pc.forEach(b);for(c=0;c<Qc.length;c++)d=Qc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Qc.length&&(c=Qc[0],null===c.blockedOn);)Vc(c),null===c.blockedOn&&Qc.shift();}var cd=ua.ReactCurrentBatchConfig,dd=true;
	function ed(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=1,fd(a,b,c,d);}finally{C=e,cd.transition=f;}}function gd(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=4,fd(a,b,c,d);}finally{C=e,cd.transition=f;}}
	function fd(a,b,c,d){if(dd){var e=Yc(a,b,c,d);if(null===e)hd(a,b,d,id,c),Sc(a,d);else if(Uc(e,a,b,c,d))d.stopPropagation();else if(Sc(a,d),b&4&&-1<Rc.indexOf(a)){for(;null!==e;){var f=Cb(e);null!==f&&Ec(f);f=Yc(a,b,c,d);null===f&&hd(a,b,d,id,c);if(f===e)break;e=f;}null!==e&&d.stopPropagation();}else hd(a,b,d,null,c);}}var id=null;
	function Yc(a,b,c,d){id=null;a=xb(d);a=Wc(a);if(null!==a)if(b=Vb(a),null===b)a=null;else if(c=b.tag,13===c){a=Wb(b);if(null!==a)return a;a=null;}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===b.tag?b.stateNode.containerInfo:null;a=null;}else b!==a&&(a=null);id=a;return null}
	function jd(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
	case "message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}
	function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return  true}function qd(){return  false}
	function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:false===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}A(b.prototype,{preventDefault:function(){this.defaultPrevented=true;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
	(a.returnValue=false),this.isDefaultPrevented=pd);},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=true),this.isPropagationStopped=pd);},persist:function(){},isPersistent:pd});return b}
	var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
	a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return "movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(a){return "clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
	Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
	119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:false}function zd(){return Pd}
	var Qd=A({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return "keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return "keypress"===a.type?od(a):0},keyCode:function(a){return "keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return "keypress"===
	a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(a){return "deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
	deltaY:function(a){return "deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=false;
	function ge(a,b){switch(a){case "keyup":return  -1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return  true;default:return  false}}function he(a){a=a.detail;return "object"===typeof a&&"data"in a?a.data:null}var ie=false;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=true;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
	function ke(a,b){if(ie)return "compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=false,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
	var le={color:true,date:true,datetime:true,"datetime-local":true,email:true,month:true,number:true,password:true,range:true,search:true,tel:true,text:true,time:true,url:true,week:true};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return "input"===b?!!le[a.type]:"textarea"===b?true:false}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}));}var pe=null,qe=null;function re(a){se(a,0);}function te(a){var b=ue(a);if(Wa(b))return a}
	function ve(a,b){if("change"===a)return b}var we=false;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput;}xe=ye;}else xe=false;we=xe&&(!document.documentMode||9<document.documentMode);}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null);}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));Jb(re,b);}}
	function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae();}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge;
	function Ie(a,b){if(He(a,b))return  true;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return  false;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return  false;for(d=0;d<c.length;d++){var e=c[d];if(!ja.call(b,e)||!He(a[e],b[e]))return  false}return  true}function Je(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
	function Ke(a,b){var c=Je(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return {node:c,offset:b-a};a=d;}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode;}c=void 0;}c=Je(c);}}function Le(a,b){return a&&b?a===b?true:a&&3===a.nodeType?false:b&&3===b.nodeType?Le(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):false:false}
	function Me(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href;}catch(d){c=false;}if(c)a=b.contentWindow;else break;b=Xa(a.document);}return b}function Ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
	function Oe(a){var b=Me(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Le(c.ownerDocument.documentElement,c)){if(null!==d&&Ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ke(c,f);var g=Ke(c,
	d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)));}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top;}}
	var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=false;
	function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Ne(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Ie(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)));}
	function Ve(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};
	ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(a){if(Xe[a])return Xe[a];if(!We[a])return a;var b=We[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Ye)return Xe[a]=b[c];return a}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	function ff(a,b){df.set(a,b);fa(b,[a]);}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf);}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);
	ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
	fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
	function nf(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Ub(d,b,void 0,a);a.currentTarget=null;}
	function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k;}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k;}}}if(Qb)throw a=Rb,Qb=false,Rb=null,a;}
	function D(a,b){var c=b[of];void 0===c&&(c=b[of]=new Set);var d=a+"__bubble";c.has(d)||(pf(b,a,2,false),c.add(d));}function qf(a,b,c){var d=0;b&&(d|=4);pf(c,a,d,b);}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(a){if(!a[rf]){a[rf]=true;da.forEach(function(b){"selectionchange"!==b&&(mf.has(b)||qf(b,false,a),qf(b,true,a));});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[rf]||(b[rf]=true,qf("selectionchange",false,b));}}
	function pf(a,b,c,d){switch(jd(b)){case 1:var e=ed;break;case 4:e=gd;break;default:e=fd;}c=e.bind(null,b,c,a);e=void 0;!Lb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=true);d?void 0!==e?a.addEventListener(b,c,{capture:true,passive:e}):a.addEventListener(b,c,true):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,false);}
	function hd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return;}for(;null!==h;){g=Wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode;}}d=d.return;}Jb(function(){var d=f,e=xb(c),g=[];
	a:{var h=df.get(a);if(void 0!==h){var k=td,n=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":n="focus";k=Fd;break;case "focusout":n="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
	Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case $e:case af:case bf:k=Hd;break;case cf:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td;}var t=0!==(b&4),J=!t&&"scroll"===a,x=t?null!==h?h+"Capture":null:h;t=[];for(var w=d,u;null!==
	w;){u=w;var F=u.stateNode;5===u.tag&&null!==F&&(u=F,null!==x&&(F=Kb(w,x),null!=F&&t.push(tf(w,F,u))));if(J)break;w=w.return;}0<t.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:t}));}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&c!==wb&&(n=c.relatedTarget||c.fromElement)&&(Wc(n)||n[uf]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?Wc(n):null,null!==
	n&&(J=Vb(n),n!==J||5!==n.tag&&6!==n.tag))n=null;}else k=null,n=d;if(k!==n){t=Bd;F="onMouseLeave";x="onMouseEnter";w="mouse";if("pointerout"===a||"pointerover"===a)t=Td,F="onPointerLeave",x="onPointerEnter",w="pointer";J=null==k?h:ue(k);u=null==n?h:ue(n);h=new t(F,w+"leave",k,c,e);h.target=J;h.relatedTarget=u;F=null;Wc(e)===d&&(t=new t(x,w+"enter",n,c,e),t.target=u,t.relatedTarget=J,F=t);J=F;if(k&&n)b:{t=k;x=n;w=0;for(u=t;u;u=vf(u))w++;u=0;for(F=x;F;F=vf(F))u++;for(;0<w-u;)t=vf(t),w--;for(;0<u-w;)x=
	vf(x),u--;for(;w--;){if(t===x||null!==x&&t===x.alternate)break b;t=vf(t);x=vf(x);}t=null;}else t=null;null!==k&&wf(g,h,k,t,false);null!==n&&null!==J&&wf(g,J,n,t,true);}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var na=ve;else if(me(h))if(we)na=Fe;else {na=De;var xa=Ce;}else (k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(na=Ee);if(na&&(na=na(a,d))){ne(g,na,c,e);break a}xa&&xa(a,h,d);"focusout"===a&&(xa=h._wrapperState)&&
	xa.controlled&&"number"===h.type&&cb(h,"number",h.value);}xa=d?ue(d):window;switch(a){case "focusin":if(me(xa)||"true"===xa.contentEditable)Qe=xa,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=true;break;case "contextmenu":case "mouseup":case "dragend":Te=false;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e);}var $a;if(ae)b:{switch(a){case "compositionstart":var ba="onCompositionStart";break b;case "compositionend":ba="onCompositionEnd";
	break b;case "compositionupdate":ba="onCompositionUpdate";break b}ba=void 0;}else ie?ge(a,c)&&(ba="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(ba="onCompositionStart");ba&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==ba?"onCompositionEnd"===ba&&ie&&($a=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=true)),xa=oe(d,ba),0<xa.length&&(ba=new Ld(ba,a,null,c,e),g.push({event:ba,listeners:xa}),$a?ba.data=$a:($a=he(c),null!==$a&&(ba.data=$a))));if($a=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),
	0<d.length&&(e=new Ld("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=$a);}se(g,b);});}function tf(a,b,c){return {instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Kb(a,c),null!=f&&d.unshift(tf(a,f,e)),f=Kb(a,b),null!=f&&d.push(tf(a,f,e)));a=a.return;}return d}function vf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
	function wf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Kb(c,f),null!=k&&g.unshift(tf(c,k,h))):e||(k=Kb(c,f),null!=k&&g.push(tf(c,k,h))));c=c.return;}0!==g.length&&a.push({event:b,listeners:g});}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(a){return ("string"===typeof a?a:""+a).replace(xf,"\n").replace(yf,"")}function Af(a,b,c){b=zf(b);if(zf(a)!==b&&c)throw Error(p$1(425));}function Bf(){}
	var Cf=null,Df=null;function Ef(a,b){return "textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
	var Ff="function"===typeof setTimeout?setTimeout:void 0,Gf="function"===typeof clearTimeout?clearTimeout:void 0,Hf="function"===typeof Promise?Promise:void 0,Jf="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Hf?function(a){return Hf.resolve(null).then(a).catch(If)}:Ff;function If(a){setTimeout(function(){throw a;});}
	function Kf(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=e.data,"/$"===c){if(0===d){a.removeChild(e);bd(b);return}d--;}else "$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e;}while(c);bd(b);}function Lf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}
	function Mf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--;}else "/$"===c&&b++;}a=a.previousSibling;}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;
	function Wc(a){var b=a[Of];if(b)return b;for(var c=a.parentNode;c;){if(b=c[uf]||c[Of]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Mf(a);null!==a;){if(c=a[Of])return c;a=Mf(a);}return b}a=c;c=a.parentNode;}return null}function Cb(a){a=a[Of]||a[uf];return !a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(p$1(33));}function Db(a){return a[Pf]||null}var Sf=[],Tf=-1;function Uf(a){return {current:a}}
	function E(a){0>Tf||(a.current=Sf[Tf],Sf[Tf]=null,Tf--);}function G(a,b){Tf++;Sf[Tf]=a.current;a.current=b;}var Vf={},H=Uf(Vf),Wf=Uf(false),Xf=Vf;function Yf(a,b){var c=a.type.contextTypes;if(!c)return Vf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
	function Zf(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $f(){E(Wf);E(H);}function ag(a,b,c){if(H.current!==Vf)throw Error(p$1(168));G(H,b);G(Wf,c);}function bg(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(p$1(108,Ra(a)||"Unknown",e));return A({},c,d)}
	function cg(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Vf;Xf=H.current;G(H,a);G(Wf,Wf.current);return  true}function dg(a,b,c){var d=a.stateNode;if(!d)throw Error(p$1(169));c?(a=bg(a,b,Xf),d.__reactInternalMemoizedMergedChildContext=a,E(Wf),E(H),G(H,a)):E(Wf);G(Wf,c);}var eg=null,fg=false,gg=false;function hg(a){null===eg?eg=[a]:eg.push(a);}function ig(a){fg=true;hg(a);}
	function jg(){if(!gg&&null!==eg){gg=true;var a=0,b=C;try{var c=eg;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}eg=null;fg=!1;}catch(e){throw null!==eg&&(eg=eg.slice(a+1)),ac(fc,jg),e;}finally{C=b,gg=false;}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(a,b){kg[lg++]=ng;kg[lg++]=mg;mg=a;ng=b;}
	function ug(a,b,c){og[pg++]=rg;og[pg++]=sg;og[pg++]=qg;qg=a;var d=rg;a=sg;var e=32-oc(d)-1;d&=~(1<<e);c+=1;var f=32-oc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;rg=1<<32-oc(b)+e|c<<e|d;sg=f+a;}else rg=1<<f|c<<e|d,sg=a;}function vg(a){null!==a.return&&(tg(a,1),ug(a,1,0));}function wg(a){for(;a===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;a===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null;}var xg=null,yg=null,I=false,zg=null;
	function Ag(a,b){var c=Bg(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c);}
	function Cg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,xg=a,yg=Lf(b.firstChild),true):false;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,xg=a,yg=null,true):false;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==qg?{id:rg,overflow:sg}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=Bg(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,xg=a,yg=
	null,true):false;default:return  false}}function Dg(a){return 0!==(a.mode&1)&&0===(a.flags&128)}function Eg(a){if(I){var b=yg;if(b){var c=b;if(!Cg(a,b)){if(Dg(a))throw Error(p$1(418));b=Lf(c.nextSibling);var d=xg;b&&Cg(a,b)?Ag(d,c):(a.flags=a.flags&-4097|2,I=false,xg=a);}}else {if(Dg(a))throw Error(p$1(418));a.flags=a.flags&-4097|2;I=false;xg=a;}}}function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;xg=a;}
	function Gg(a){if(a!==xg)return  false;if(!I)return Fg(a),I=true,false;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Ef(a.type,a.memoizedProps));if(b&&(b=yg)){if(Dg(a))throw Hg(),Error(p$1(418));for(;b;)Ag(a,b),b=Lf(b.nextSibling);}Fg(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(p$1(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){yg=Lf(a.nextSibling);break a}b--;}else "$"!==c&&"$!"!==c&&"$?"!==c||b++;}a=a.nextSibling;}yg=
	null;}}else yg=xg?Lf(a.stateNode.nextSibling):null;return  true}function Hg(){for(var a=yg;a;)a=Lf(a.nextSibling);}function Ig(){yg=xg=null;I=false;}function Jg(a){null===zg?zg=[a]:zg.push(a);}var Kg=ua.ReactCurrentBatchConfig;
	function Lg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(p$1(309));var d=c.stateNode;}if(!d)throw Error(p$1(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a;};b._stringRef=f;return b}if("string"!==typeof a)throw Error(p$1(284));if(!c._owner)throw Error(p$1(290,a));}return a}
	function Mg(a,b){a=Object.prototype.toString.call(b);throw Error(p$1(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ng(a){var b=a._init;return b(a._payload)}
	function Og(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c);}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Pg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
	null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Qg(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ya)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ha&&Ng(f)===b.type))return d=e(b,c.props),d.ref=Lg(a,b,c),d.return=a,d;d=Rg(c.type,c.key,c.props,null,a.mode,d);d.ref=Lg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
	b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=Sg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Tg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function q(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=Qg(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case va:return c=Rg(b.type,b.key,b.props,null,a.mode,c),
	c.ref=Lg(a,null,b),c.return=a,c;case wa:return b=Sg(b,a.mode,c),b.return=a,b;case Ha:var d=b._init;return q(a,d(b._payload),c)}if(eb(b)||Ka(b))return b=Tg(b,a.mode,c,null),b.return=a,b;Mg(a,b);}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case va:return c.key===e?k(a,b,c,d):null;case wa:return c.key===e?l(a,b,c,d):null;case Ha:return e=c._init,r(a,
	b,e(c._payload),d)}if(eb(c)||Ka(c))return null!==e?null:m(a,b,c,d,null);Mg(a,c);}return null}function y(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case va:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case wa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case Ha:var f=d._init;return y(a,b,c,f(d._payload),e)}if(eb(d)||Ka(d))return a=a.get(c)||null,m(b,a,d,e,null);Mg(b,d);}return null}
	function n(e,g,h,k){for(var l=null,m=null,u=g,w=g=0,x=null;null!==u&&w<h.length;w++){u.index>w?(x=u,u=null):x=u.sibling;var n=r(e,u,h[w],k);if(null===n){null===u&&(u=x);break}a&&u&&null===n.alternate&&b(e,u);g=f(n,g,w);null===m?l=n:m.sibling=n;m=n;u=x;}if(w===h.length)return c(e,u),I&&tg(e,w),l;if(null===u){for(;w<h.length;w++)u=q(e,h[w],k),null!==u&&(g=f(u,g,w),null===m?l=u:m.sibling=u,m=u);I&&tg(e,w);return l}for(u=d(e,u);w<h.length;w++)x=y(u,e,w,h[w],k),null!==x&&(a&&null!==x.alternate&&u.delete(null===
	x.key?w:x.key),g=f(x,g,w),null===m?l=x:m.sibling=x,m=x);a&&u.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function t(e,g,h,k){var l=Ka(h);if("function"!==typeof l)throw Error(p$1(150));h=l.call(h);if(null==h)throw Error(p$1(151));for(var u=l=null,m=g,w=g=0,x=null,n=h.next();null!==m&&!n.done;w++,n=h.next()){m.index>w?(x=m,m=null):x=m.sibling;var t=r(e,m,n.value,k);if(null===t){null===m&&(m=x);break}a&&m&&null===t.alternate&&b(e,m);g=f(t,g,w);null===u?l=t:u.sibling=t;u=t;m=x;}if(n.done)return c(e,
	m),I&&tg(e,w),l;if(null===m){for(;!n.done;w++,n=h.next())n=q(e,n.value,k),null!==n&&(g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);I&&tg(e,w);return l}for(m=d(e,m);!n.done;w++,n=h.next())n=y(m,e,w,n.value,k),null!==n&&(a&&null!==n.alternate&&m.delete(null===n.key?w:n.key),g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);a&&m.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function J(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ya&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case va:a:{for(var k=
	f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ya){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ha&&Ng(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=Lg(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling;}f.type===ya?(d=Tg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Rg(f.type,f.key,f.props,null,a.mode,h),h.ref=Lg(a,d,f),h.return=a,a=h);}return g(a);case wa:a:{for(l=f.key;null!==
	d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else {c(a,d);break}else b(a,d);d=d.sibling;}d=Sg(f,a.mode,h);d.return=a;a=d;}return g(a);case Ha:return l=f._init,J(a,d,l(f._payload),h)}if(eb(f))return n(a,d,f,h);if(Ka(f))return t(a,d,f,h);Mg(a,f);}return "string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
	(c(a,d),d=Qg(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return J}var Ug=Og(true),Vg=Og(false),Wg=Uf(null),Xg=null,Yg=null,Zg=null;function $g(){Zg=Yg=Xg=null;}function ah(a){var b=Wg.current;E(Wg);a._currentValue=b;}function bh(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return;}}
	function ch(a,b){Xg=a;Zg=Yg=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(dh=true),a.firstContext=null);}function eh(a){var b=a._currentValue;if(Zg!==a)if(a={context:a,memoizedValue:b,next:null},null===Yg){if(null===Xg)throw Error(p$1(308));Yg=a;Xg.dependencies={lanes:0,firstContext:a};}else Yg=Yg.next=a;return b}var fh=null;function gh(a){null===fh?fh=[a]:fh.push(a);}
	function hh(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,gh(b)):(c.next=e.next,e.next=c);b.interleaved=c;return ih(a,d)}function ih(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var jh=false;function kh(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null};}
	function lh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects});}function mh(a,b){return {eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
	function nh(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(K&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return ih(a,c)}e=d.interleaved;null===e?(b.next=b,gh(d)):(b.next=e.next,e.next=b);d.interleaved=b;return ih(a,c)}function oh(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c);}}
	function ph(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next;}while(null!==c);null===f?e=f=b:f=f.next=b;}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
	b;c.lastBaseUpdate=b;}
	function qh(a,b,c,d){var e=a.updateQueue;jh=false;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k));}if(null!==f){var q=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,y=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:y,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
	next:null});a:{var n=a,t=h;r=b;y=c;switch(t.tag){case 1:n=t.payload;if("function"===typeof n){q=n.call(y,q,r);break a}q=n;break a;case 3:n.flags=n.flags&-65537|128;case 0:n=t.payload;r="function"===typeof n?n.call(y,q,r):n;if(null===r||void 0===r)break a;q=A({},q,r);break a;case 2:jh=true;}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h));}else y={eventTime:y,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=y,k=q):m=m.next=y,g|=r;
	h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null;}while(1);null===m&&(k=q);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);rh|=g;a.lanes=g;a.memoizedState=q;}}
	function sh(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(p$1(191,e));e.call(d);}}}var th={},uh=Uf(th),vh=Uf(th),wh=Uf(th);function xh(a){if(a===th)throw Error(p$1(174));return a}
	function yh(a,b){G(wh,b);G(vh,a);G(uh,th);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:lb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=lb(b,a);}E(uh);G(uh,b);}function zh(){E(uh);E(vh);E(wh);}function Ah(a){xh(wh.current);var b=xh(uh.current);var c=lb(b,a.type);b!==c&&(G(vh,a),G(uh,c));}function Bh(a){vh.current===a&&(E(uh),E(vh));}var L=Uf(0);
	function Ch(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}return null}var Dh=[];
	function Eh(){for(var a=0;a<Dh.length;a++)Dh[a]._workInProgressVersionPrimary=null;Dh.length=0;}var Fh=ua.ReactCurrentDispatcher,Gh=ua.ReactCurrentBatchConfig,Hh=0,M=null,N=null,O=null,Ih=false,Jh=false,Kh=0,Lh=0;function P(){throw Error(p$1(321));}function Mh(a,b){if(null===b)return  false;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return  false;return  true}
	function Nh(a,b,c,d,e,f){Hh=f;M=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Fh.current=null===a||null===a.memoizedState?Oh:Ph;a=c(d,e);if(Jh){f=0;do{Jh=false;Kh=0;if(25<=f)throw Error(p$1(301));f+=1;O=N=null;b.updateQueue=null;Fh.current=Qh;a=c(d,e);}while(Jh)}Fh.current=Rh;b=null!==N&&null!==N.next;Hh=0;O=N=M=null;Ih=false;if(b)throw Error(p$1(300));return a}function Sh(){var a=0!==Kh;Kh=0;return a}
	function Th(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===O?M.memoizedState=O=a:O=O.next=a;return O}function Uh(){if(null===N){var a=M.alternate;a=null!==a?a.memoizedState:null;}else a=N.next;var b=null===O?M.memoizedState:O.next;if(null!==b)O=b,N=a;else {if(null===a)throw Error(p$1(310));N=a;a={memoizedState:N.memoizedState,baseState:N.baseState,baseQueue:N.baseQueue,queue:N.queue,next:null};null===O?M.memoizedState=O=a:O=O.next=a;}return O}
	function Vh(a,b){return "function"===typeof b?b(a):b}
	function Wh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p$1(311));c.lastRenderedReducer=a;var d=N,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g;}d.baseQueue=e=f;c.pending=null;}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Hh&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else {var q={lane:m,action:l.action,hasEagerState:l.hasEagerState,
	eagerState:l.eagerState,next:null};null===k?(h=k=q,g=d):k=k.next=q;M.lanes|=m;rh|=m;}l=l.next;}while(null!==l&&l!==f);null===k?g=d:k.next=h;He(d,b.memoizedState)||(dh=true);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d;}a=c.interleaved;if(null!==a){e=a;do f=e.lane,M.lanes|=f,rh|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return [b.memoizedState,c.dispatch]}
	function Xh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p$1(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(dh=true);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f;}return [f,d]}function Yh(){}
	function Zh(a,b){var c=M,d=Uh(),e=b(),f=!He(d.memoizedState,e);f&&(d.memoizedState=e,dh=true);d=d.queue;$h(ai.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==O&&O.memoizedState.tag&1){c.flags|=2048;bi(9,ci.bind(null,c,d,e,b),void 0,null);if(null===Q)throw Error(p$1(349));0!==(Hh&30)||di(c,b,e);}return e}function di(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a));}
	function ci(a,b,c,d){b.value=c;b.getSnapshot=d;ei(b)&&fi(a);}function ai(a,b,c){return c(function(){ei(b)&&fi(a);})}function ei(a){var b=a.getSnapshot;a=a.value;try{var c=b();return !He(a,c)}catch(d){return  true}}function fi(a){var b=ih(a,1);null!==b&&gi(b,a,1,-1);}
	function hi(a){var b=Th();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vh,lastRenderedState:a};b.queue=a;a=a.dispatch=ii.bind(null,M,a);return [b.memoizedState,a]}
	function bi(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function ji(){return Uh().memoizedState}function ki(a,b,c,d){var e=Th();M.flags|=a;e.memoizedState=bi(1|b,c,void 0,void 0===d?null:d);}
	function li(a,b,c,d){var e=Uh();d=void 0===d?null:d;var f=void 0;if(null!==N){var g=N.memoizedState;f=g.destroy;if(null!==d&&Mh(d,g.deps)){e.memoizedState=bi(b,c,f,d);return}}M.flags|=a;e.memoizedState=bi(1|b,c,f,d);}function mi(a,b){return ki(8390656,8,a,b)}function $h(a,b){return li(2048,8,a,b)}function ni(a,b){return li(4,2,a,b)}function oi(a,b){return li(4,4,a,b)}
	function pi(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null);};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null;}}function qi(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return li(4,4,pi.bind(null,b,a),c)}function ri(){}function si(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
	function ti(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function ui(a,b,c){if(0===(Hh&21))return a.baseState&&(a.baseState=false,dh=true),a.memoizedState=c;He(c,b)||(c=yc(),M.lanes|=c,rh|=c,a.baseState=true);return b}function vi(a,b){var c=C;C=0!==c&&4>c?c:4;a(true);var d=Gh.transition;Gh.transition={};try{a(!1),b();}finally{C=c,Gh.transition=d;}}function wi(){return Uh().memoizedState}
	function xi(a,b,c){var d=yi(a);c={lane:d,action:c,hasEagerState:false,eagerState:null,next:null};if(zi(a))Ai(b,c);else if(c=hh(a,b,c,d),null!==c){var e=R();gi(c,a,d,e);Bi(c,b,d);}}
	function ii(a,b,c){var d=yi(a),e={lane:d,action:c,hasEagerState:false,eagerState:null,next:null};if(zi(a))Ai(b,e);else {var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(He(h,g)){var k=b.interleaved;null===k?(e.next=e,gh(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=hh(a,b,e,d);null!==c&&(e=R(),gi(c,a,d,e),Bi(c,b,d));}}
	function zi(a){var b=a.alternate;return a===M||null!==b&&b===M}function Ai(a,b){Jh=Ih=true;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b;}function Bi(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c);}}
	var Rh={readContext:eh,useCallback:P,useContext:P,useEffect:P,useImperativeHandle:P,useInsertionEffect:P,useLayoutEffect:P,useMemo:P,useReducer:P,useRef:P,useState:P,useDebugValue:P,useDeferredValue:P,useTransition:P,useMutableSource:P,useSyncExternalStore:P,useId:P,unstable_isNewReconciler:false},Oh={readContext:eh,useCallback:function(a,b){Th().memoizedState=[a,void 0===b?null:b];return a},useContext:eh,useEffect:mi,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ki(4194308,
	4,pi.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ki(4194308,4,a,b)},useInsertionEffect:function(a,b){return ki(4,2,a,b)},useMemo:function(a,b){var c=Th();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Th();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=xi.bind(null,M,a);return [d.memoizedState,a]},useRef:function(a){var b=
	Th();a={current:a};return b.memoizedState=a},useState:hi,useDebugValue:ri,useDeferredValue:function(a){return Th().memoizedState=a},useTransition:function(){var a=hi(false),b=a[0];a=vi.bind(null,a[1]);Th().memoizedState=a;return [b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=M,e=Th();if(I){if(void 0===c)throw Error(p$1(407));c=c();}else {c=b();if(null===Q)throw Error(p$1(349));0!==(Hh&30)||di(d,b,c);}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;mi(ai.bind(null,d,
	f,a),[a]);d.flags|=2048;bi(9,ci.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Th(),b=Q.identifierPrefix;if(I){var c=sg;var d=rg;c=(d&~(1<<32-oc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Kh++;0<c&&(b+="H"+c.toString(32));b+=":";}else c=Lh++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:false},Ph={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Wh,useRef:ji,useState:function(){return Wh(Vh)},
	useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return ui(b,N.memoizedState,a)},useTransition:function(){var a=Wh(Vh)[0],b=Uh().memoizedState;return [a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:false},Qh={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Xh,useRef:ji,useState:function(){return Xh(Vh)},useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return null===
	N?b.memoizedState=a:ui(b,N.memoizedState,a)},useTransition:function(){var a=Xh(Vh)[0],b=Uh().memoizedState;return [a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:false};function Ci(a,b){if(a&&a.defaultProps){b=A({},b);a=a.defaultProps;for(var c in a) void 0===b[c]&&(b[c]=a[c]);return b}return b}function Di(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:A({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c);}
	var Ei={isMounted:function(a){return (a=a._reactInternals)?Vb(a)===a:false},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e));},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e));},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=R(),d=
	yi(a),e=mh(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=nh(a,e,d);null!==b&&(gi(b,a,d,c),oh(b,a,d));}};function Fi(a,b,c,d,e,f,g){a=a.stateNode;return "function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Ie(c,d)||!Ie(e,f):true}
	function Gi(a,b,c){var d=false,e=Vf;var f=b.contextType;"object"===typeof f&&null!==f?f=eh(f):(e=Zf(b)?Xf:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Yf(a,e):Vf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Ei;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
	function Hi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Ei.enqueueReplaceState(b,b.state,null);}
	function Ii(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};kh(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=eh(f):(f=Zf(b)?Xf:H.current,e.context=Yf(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Di(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
	"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Ei.enqueueReplaceState(e,e.state,null),qh(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308);}function Ji(a,b){try{var c="",d=b;do c+=Pa(d),d=d.return;while(d);var e=c;}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack;}return {value:a,source:b,stack:e,digest:null}}
	function Ki(a,b,c){return {value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function Li(a,b){try{console.error(b.value);}catch(c){setTimeout(function(){throw c;});}}var Mi="function"===typeof WeakMap?WeakMap:Map;function Ni(a,b,c){c=mh(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Oi||(Oi=true,Pi=d);Li(a,b);};return c}
	function Qi(a,b,c){c=mh(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Li(a,b);};}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Li(a,b);"function"!==typeof d&&(null===Ri?Ri=new Set([this]):Ri.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""});});return c}
	function Si(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new Mi;var e=new Set;d.set(b,e);}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Ti.bind(null,a,b,c),b.then(a,a));}function Ui(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?true:false:true;if(b)return a;a=a.return;}while(null!==a);return null}
	function Vi(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=mh(-1,1),b.tag=2,nh(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Wi=ua.ReactCurrentOwner,dh=false;function Xi(a,b,c,d){b.child=null===a?Vg(b,null,c,d):Ug(b,a.child,c,d);}
	function Yi(a,b,c,d,e){c=c.render;var f=b.ref;ch(b,e);d=Nh(a,b,c,d,f,e);c=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&c&&vg(b);b.flags|=1;Xi(a,b,d,e);return b.child}
	function $i(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!aj(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,bj(a,b,f,d,e);a=Rg(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Ie;if(c(g,d)&&a.ref===b.ref)return Zi(a,b,e)}b.flags|=1;a=Pg(f,d);a.ref=b.ref;a.return=b;return b.child=a}
	function bj(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Ie(f,d)&&a.ref===b.ref)if(dh=false,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(dh=true);else return b.lanes=a.lanes,Zi(a,b,e)}return cj(a,b,c,d,e)}
	function dj(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(ej,fj),fj|=c;else {if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,G(ej,fj),fj|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;G(ej,fj);fj|=d;}else null!==
	f?(d=f.baseLanes|c,b.memoizedState=null):d=c,G(ej,fj),fj|=d;Xi(a,b,e,c);return b.child}function gj(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152;}function cj(a,b,c,d,e){var f=Zf(c)?Xf:H.current;f=Yf(b,f);ch(b,e);c=Nh(a,b,c,d,f,e);d=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&d&&vg(b);b.flags|=1;Xi(a,b,c,e);return b.child}
	function hj(a,b,c,d,e){if(Zf(c)){var f=true;cg(b);}else f=false;ch(b,e);if(null===b.stateNode)ij(a,b),Gi(b,c,d),Ii(b,c,d,e),d=true;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=eh(l):(l=Zf(c)?Xf:H.current,l=Yf(b,l));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||
	(h!==d||k!==l)&&Hi(b,g,d,l);jh=false;var r=b.memoizedState;g.state=r;qh(b,d,g,e);k=b.memoizedState;h!==d||r!==k||Wf.current||jh?("function"===typeof m&&(Di(b,c,m,d),k=b.memoizedState),(h=jh||Fi(b,c,h,d,r,k,l))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
	("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=false);}else {g=b.stateNode;lh(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Ci(b.type,h);g.props=l;q=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=eh(k):(k=Zf(c)?Xf:H.current,k=Yf(b,k));var y=c.getDerivedStateFromProps;(m="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
	"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==q||r!==k)&&Hi(b,g,d,k);jh=false;r=b.memoizedState;g.state=r;qh(b,d,g,e);var n=b.memoizedState;h!==q||r!==n||Wf.current||jh?("function"===typeof y&&(Di(b,c,y,d),n=b.memoizedState),(l=jh||Fi(b,c,l,d,r,n,k)||false)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,n,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
	g.UNSAFE_componentWillUpdate(d,n,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=n),g.props=d,g.state=n,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===
	a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=false);}return jj(a,b,c,d,f,e)}
	function jj(a,b,c,d,e,f){gj(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&dg(b,c,false),Zi(a,b,f);d=b.stateNode;Wi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Ug(b,a.child,null,f),b.child=Ug(b,null,h,f)):Xi(a,b,h,f);b.memoizedState=d.state;e&&dg(b,c,true);return b.child}function kj(a){var b=a.stateNode;b.pendingContext?ag(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ag(a,b.context,false);yh(a,b.containerInfo);}
	function lj(a,b,c,d,e){Ig();Jg(e);b.flags|=256;Xi(a,b,c,d);return b.child}var mj={dehydrated:null,treeContext:null,retryLane:0};function nj(a){return {baseLanes:a,cachePool:null,transitions:null}}
	function oj(a,b,c){var d=b.pendingProps,e=L.current,f=false,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?false:0!==(e&2));if(h)f=true,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;G(L,e&1);if(null===a){Eg(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=
	g):f=pj(g,d,0,null),a=Tg(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=nj(c),b.memoizedState=mj,a):qj(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return rj(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=Pg(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=Pg(h,f):(f=Tg(f,g,c,null),f.flags|=2);f.return=
	b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?nj(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=mj;return d}f=a.child;a=f.sibling;d=Pg(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
	function qj(a,b){b=pj({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function sj(a,b,c,d){null!==d&&Jg(d);Ug(b,a.child,null,c);a=qj(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
	function rj(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Ki(Error(p$1(422))),sj(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=pj({mode:"visible",children:d.children},e,0,null);f=Tg(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Ug(b,a.child,null,g);b.child.memoizedState=nj(g);b.memoizedState=mj;return f}if(0===(b.mode&1))return sj(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;
	if(d)var h=d.dgst;d=h;f=Error(p$1(419));d=Ki(f,d,void 0);return sj(a,b,g,d)}h=0!==(g&a.childLanes);if(dh||h){d=Q;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0;}e=0!==(e&(d.suspendedLanes|g))?0:e;
	0!==e&&e!==f.retryLane&&(f.retryLane=e,ih(a,e),gi(d,a,e,-1));}tj();d=Ki(Error(p$1(421)));return sj(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=uj.bind(null,a),e._reactRetry=b,null;a=f.treeContext;yg=Lf(e.nextSibling);xg=b;I=true;zg=null;null!==a&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=a.id,sg=a.overflow,qg=b);b=qj(b,d.children);b.flags|=4096;return b}function vj(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);bh(a.return,b,c);}
	function wj(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e);}
	function xj(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Xi(a,b,d.children,c);d=L.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else {if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&vj(a,c,b);else if(19===a.tag)vj(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return;}a.sibling.return=a.return;a=a.sibling;}d&=1;}G(L,d);if(0===(b.mode&1))b.memoizedState=
	null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Ch(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);wj(b,false,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Ch(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a;}wj(b,true,c,null,f);break;case "together":wj(b,false,null,null,void 0);break;default:b.memoizedState=null;}return b.child}
	function ij(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);}function Zi(a,b,c){null!==a&&(b.dependencies=a.dependencies);rh|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(p$1(153));if(null!==b.child){a=b.child;c=Pg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Pg(a,a.pendingProps),c.return=b;c.sibling=null;}return b.child}
	function yj(a,b,c){switch(b.tag){case 3:kj(b);Ig();break;case 5:Ah(b);break;case 1:Zf(b.type)&&cg(b);break;case 4:yh(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;G(Wg,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return G(L,L.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return oj(a,b,c);G(L,L.current&1);a=Zi(a,b,c);return null!==a?a.sibling:null}G(L,L.current&1);break;case 19:d=0!==(c&
	b.childLanes);if(0!==(a.flags&128)){if(d)return xj(a,b,c);b.flags|=128;}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);G(L,L.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,dj(a,b,c)}return Zi(a,b,c)}var zj,Aj,Bj,Cj;
	zj=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}};Aj=function(){};
	Bj=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;xh(uh.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "select":e=A({},e,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=Bf);}ub(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&
	(c||(c={}),c[g]="");}else "dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ea.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||(c={}),c[g]=k[g]);}else c||(f||(f=[]),f.push(l,
	c)),c=k;else "dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ea.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&D("scroll",a),f||h===k||(f=[])):(f=f||[]).push(l,k));}c&&(f=f||[]).push("style",c);var l=f;if(b.updateQueue=l)b.flags|=4;}};Cj=function(a,b,c,d){c!==d&&(b.flags|=4);};
	function Dj(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null;}}
	function S(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
	function Ej(a,b,c){var d=b.pendingProps;wg(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b),null;case 1:return Zf(b.type)&&$f(),S(b),null;case 3:d=b.stateNode;zh();E(Wf);E(H);Eh();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==zg&&(Fj(zg),zg=null));Aj(a,b);S(b);return null;case 5:Bh(b);var e=xh(wh.current);
	c=b.type;if(null!==a&&null!=b.stateNode)Bj(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else {if(!d){if(null===b.stateNode)throw Error(p$1(166));S(b);return null}a=xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Of]=b;d[Pf]=f;a=0!==(b.mode&1);switch(c){case "dialog":D("cancel",d);D("close",d);break;case "iframe":case "object":case "embed":D("load",d);break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],d);break;case "source":D("error",d);break;case "img":case "image":case "link":D("error",
	d);D("load",d);break;case "details":D("toggle",d);break;case "input":Za(d,f);D("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};D("invalid",d);break;case "textarea":hb(d,f),D("invalid",d);}ub(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(true!==f.suppressHydrationWarning&&Af(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(true!==f.suppressHydrationWarning&&Af(d.textContent,
	h,a),e=["children",""+h]):ea.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&D("scroll",d);}switch(c){case "input":Va(d);db(d,f,true);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=Bf);}d=e;b.updateQueue=d;null!==d&&(b.flags|=4);}else {g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===a&&(a=kb(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):
	"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=true:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Of]=b;a[Pf]=d;zj(a,b,false,false);b.stateNode=a;a:{g=vb(c,d);switch(c){case "dialog":D("cancel",a);D("close",a);e=d;break;case "iframe":case "object":case "embed":D("load",a);e=d;break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],a);e=d;break;case "source":D("error",a);e=d;break;case "img":case "image":case "link":D("error",
	a);D("load",a);e=d;break;case "details":D("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);D("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=A({},d,{value:void 0});D("invalid",a);break;case "textarea":hb(a,d);e=gb(a,d);D("invalid",a);break;default:e=d;}ub(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?sb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&nb(a,k)):"children"===f?"string"===typeof k?("textarea"!==
	c||""!==k)&&ob(a,k):"number"===typeof k&&ob(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ea.hasOwnProperty(f)?null!=k&&"onScroll"===f&&D("scroll",a):null!=k&&ta(a,f,k,g));}switch(c){case "input":Va(a);db(a,d,false);break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,false):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,
	true);break;default:"function"===typeof e.onClick&&(a.onclick=Bf);}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=true;break a;default:d=false;}}d&&(b.flags|=4);}null!==b.ref&&(b.flags|=512,b.flags|=2097152);}S(b);return null;case 6:if(a&&null!=b.stateNode)Cj(a,b,a.memoizedProps,d);else {if("string"!==typeof d&&null===b.stateNode)throw Error(p$1(166));c=xh(wh.current);xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.memoizedProps;d[Of]=b;if(f=d.nodeValue!==c)if(a=
	xg,null!==a)switch(a.tag){case 3:Af(d.nodeValue,c,0!==(a.mode&1));break;case 5:true!==a.memoizedProps.suppressHydrationWarning&&Af(d.nodeValue,c,0!==(a.mode&1));}f&&(b.flags|=4);}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Of]=b,b.stateNode=d;}S(b);return null;case 13:E(L);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(I&&null!==yg&&0!==(b.mode&1)&&0===(b.flags&128))Hg(),Ig(),b.flags|=98560,f=false;else if(f=Gg(b),null!==d&&null!==d.dehydrated){if(null===
	a){if(!f)throw Error(p$1(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(p$1(317));f[Of]=b;}else Ig(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;S(b);f=false;}else null!==zg&&(Fj(zg),zg=null),f=true;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(L.current&1)?0===T&&(T=3):tj()));null!==b.updateQueue&&(b.flags|=4);S(b);return null;case 4:return zh(),
	Aj(a,b),null===a&&sf(b.stateNode.containerInfo),S(b),null;case 10:return ah(b.type._context),S(b),null;case 17:return Zf(b.type)&&$f(),S(b),null;case 19:E(L);f=b.memoizedState;if(null===f)return S(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dj(f,false);else {if(0!==T||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=Ch(a);if(null!==g){b.flags|=128;Dj(f,false);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,
	g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;G(L,L.current&1|2);return b.child}a=
	a.sibling;}null!==f.tail&&B()>Gj&&(b.flags|=128,d=true,Dj(f,false),b.lanes=4194304);}else {if(!d)if(a=Ch(g),null!==a){if(b.flags|=128,d=true,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dj(f,true),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!I)return S(b),null}else 2*B()-f.renderingStartTime>Gj&&1073741824!==c&&(b.flags|=128,d=true,Dj(f,false),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g);}if(null!==f.tail)return b=f.tail,f.rendering=
	b,f.tail=b.sibling,f.renderingStartTime=B(),b.sibling=null,c=L.current,G(L,d?c&1|2:c&1),b;S(b);return null;case 22:case 23:return Hj(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(fj&1073741824)&&(S(b),b.subtreeFlags&6&&(b.flags|=8192)):S(b),null;case 24:return null;case 25:return null}throw Error(p$1(156,b.tag));}
	function Ij(a,b){wg(b);switch(b.tag){case 1:return Zf(b.type)&&$f(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return zh(),E(Wf),E(H),Eh(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Bh(b),null;case 13:E(L);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(p$1(340));Ig();}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return E(L),null;case 4:return zh(),null;case 10:return ah(b.type._context),null;case 22:case 23:return Hj(),
	null;case 24:return null;default:return null}}var Jj=false,U=false,Kj="function"===typeof WeakSet?WeakSet:Set,V=null;function Lj(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null);}catch(d){W(a,b,d);}else c.current=null;}function Mj(a,b,c){try{c();}catch(d){W(a,b,d);}}var Nj=false;
	function Oj(a,b){Cf=dd;a=Me();if(Ne(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType;}catch(F){c=null;break a}var g=0,h=-1,k=-1,l=0,m=0,q=a,r=null;b:for(;;){for(var y;;){q!==c||0!==e&&3!==q.nodeType||(h=g+e);q!==f||0!==d&&3!==q.nodeType||(k=g+d);3===q.nodeType&&(g+=
	q.nodeValue.length);if(null===(y=q.firstChild))break;r=q;q=y;}for(;;){if(q===a)break b;r===c&&++l===e&&(h=g);r===f&&++m===d&&(k=g);if(null!==(y=q.nextSibling))break;q=r;r=q.parentNode;}q=y;}c=-1===h||-1===k?null:{start:h,end:k};}else c=null;}c=c||{start:0,end:0};}else c=null;Df={focusedElem:a,selectionRange:c};dd=false;for(V=b;null!==V;)if(b=V,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,V=a;else for(;null!==V;){b=V;try{var n=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;
	case 1:if(null!==n){var t=n.memoizedProps,J=n.memoizedState,x=b.stateNode,w=x.getSnapshotBeforeUpdate(b.elementType===b.type?t:Ci(b.type,t),J);x.__reactInternalSnapshotBeforeUpdate=w;}break;case 3:var u=b.stateNode.containerInfo;1===u.nodeType?u.textContent="":9===u.nodeType&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p$1(163));}}catch(F){W(b,b.return,F);}a=b.sibling;if(null!==a){a.return=b.return;V=a;break}V=b.return;}n=Nj;Nj=false;return n}
	function Pj(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Mj(b,c,f);}e=e.next;}while(e!==d)}}function Qj(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d();}c=c.next;}while(c!==b)}}function Rj(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c;}"function"===typeof b?b(a):b.current=a;}}
	function Sj(a){var b=a.alternate;null!==b&&(a.alternate=null,Sj(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Of],delete b[Pf],delete b[of],delete b[Qf],delete b[Rf]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null;}function Tj(a){return 5===a.tag||3===a.tag||4===a.tag}
	function Uj(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Tj(a.return))return null;a=a.return;}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child;}if(!(a.flags&2))return a.stateNode}}
	function Vj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=Bf));else if(4!==d&&(a=a.child,null!==a))for(Vj(a,b,c),a=a.sibling;null!==a;)Vj(a,b,c),a=a.sibling;}
	function Wj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Wj(a,b,c),a=a.sibling;null!==a;)Wj(a,b,c),a=a.sibling;}var X=null,Xj=false;function Yj(a,b,c){for(c=c.child;null!==c;)Zj(a,b,c),c=c.sibling;}
	function Zj(a,b,c){if(lc&&"function"===typeof lc.onCommitFiberUnmount)try{lc.onCommitFiberUnmount(kc,c);}catch(h){}switch(c.tag){case 5:U||Lj(c,b);case 6:var d=X,e=Xj;X=null;Yj(a,b,c);X=d;Xj=e;null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):X.removeChild(c.stateNode));break;case 18:null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?Kf(a.parentNode,c):1===a.nodeType&&Kf(a,c),bd(a)):Kf(X,c.stateNode));break;case 4:d=X;e=Xj;X=c.stateNode.containerInfo;Xj=true;
	Yj(a,b,c);X=d;Xj=e;break;case 0:case 11:case 14:case 15:if(!U&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Mj(c,b,g):0!==(f&4)&&Mj(c,b,g));e=e.next;}while(e!==d)}Yj(a,b,c);break;case 1:if(!U&&(Lj(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount();}catch(h){W(c,b,h);}Yj(a,b,c);break;case 21:Yj(a,b,c);break;case 22:c.mode&1?(U=(d=U)||null!==
	c.memoizedState,Yj(a,b,c),U=d):Yj(a,b,c);break;default:Yj(a,b,c);}}function ak(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Kj);b.forEach(function(b){var d=bk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d));});}}
	function ck(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:X=h.stateNode;Xj=!1;break a;case 3:X=h.stateNode.containerInfo;Xj=!0;break a;case 4:X=h.stateNode.containerInfo;Xj=!0;break a}h=h.return;}if(null===X)throw Error(p$1(160));Zj(f,g,e);X=null;Xj=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null;}catch(l){W(e,b,l);}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)dk(b,a),b=b.sibling;}
	function dk(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:ck(b,a);ek(a);if(d&4){try{Pj(3,a,a.return),Qj(3,a);}catch(t){W(a,a.return,t);}try{Pj(5,a,a.return);}catch(t){W(a,a.return,t);}}break;case 1:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);break;case 5:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);if(a.flags&32){var e=a.stateNode;try{ob(e,"");}catch(t){W(a,a.return,t);}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==c?c.memoizedProps:f,h=a.type,k=a.updateQueue;
	a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&ab(e,f);vb(h,g);var l=vb(h,f);for(g=0;g<k.length;g+=2){var m=k[g],q=k[g+1];"style"===m?sb(e,q):"dangerouslySetInnerHTML"===m?nb(e,q):"children"===m?ob(e,q):ta(e,m,q,l);}switch(h){case "input":bb(e,f);break;case "textarea":ib(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var y=f.value;null!=y?fb(e,!!f.multiple,y,!1):r!==!!f.multiple&&(null!=f.defaultValue?fb(e,!!f.multiple,
	f.defaultValue,!0):fb(e,!!f.multiple,f.multiple?[]:"",!1));}e[Pf]=f;}catch(t){W(a,a.return,t);}}break;case 6:ck(b,a);ek(a);if(d&4){if(null===a.stateNode)throw Error(p$1(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f;}catch(t){W(a,a.return,t);}}break;case 3:ck(b,a);ek(a);if(d&4&&null!==c&&c.memoizedState.isDehydrated)try{bd(b.containerInfo);}catch(t){W(a,a.return,t);}break;case 4:ck(b,a);ek(a);break;case 13:ck(b,a);ek(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||
	null!==e.alternate&&null!==e.alternate.memoizedState||(fk=B()));d&4&&ak(a);break;case 22:m=null!==c&&null!==c.memoizedState;a.mode&1?(U=(l=U)||m,ck(b,a),U=l):ck(b,a);ek(a);if(d&8192){l=null!==a.memoizedState;if((a.stateNode.isHidden=l)&&!m&&0!==(a.mode&1))for(V=a,m=a.child;null!==m;){for(q=V=m;null!==V;){r=V;y=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Pj(4,r,r.return);break;case 1:Lj(r,r.return);var n=r.stateNode;if("function"===typeof n.componentWillUnmount){d=r;c=r.return;try{b=d,n.props=
	b.memoizedProps,n.state=b.memoizedState,n.componentWillUnmount();}catch(t){W(d,c,t);}}break;case 5:Lj(r,r.return);break;case 22:if(null!==r.memoizedState){gk(q);continue}}null!==y?(y.return=r,V=y):gk(q);}m=m.sibling;}a:for(m=null,q=a;;){if(5===q.tag){if(null===m){m=q;try{e=q.stateNode,l?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=q.stateNode,k=q.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=
	rb("display",g));}catch(t){W(a,a.return,t);}}}else if(6===q.tag){if(null===m)try{q.stateNode.nodeValue=l?"":q.memoizedProps;}catch(t){W(a,a.return,t);}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===a)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===a)break a;for(;null===q.sibling;){if(null===q.return||q.return===a)break a;m===q&&(m=null);q=q.return;}m===q&&(m=null);q.sibling.return=q.return;q=q.sibling;}}break;case 19:ck(b,a);ek(a);d&4&&ak(a);break;case 21:break;default:ck(b,
	a),ek(a);}}function ek(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Tj(c)){var d=c;break a}c=c.return;}throw Error(p$1(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(ob(e,""),d.flags&=-33);var f=Uj(a);Wj(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Uj(a);Vj(a,h,g);break;default:throw Error(p$1(161));}}catch(k){W(a,a.return,k);}a.flags&=-3;}b&4096&&(a.flags&=-4097);}function hk(a,b,c){V=a;ik(a);}
	function ik(a,b,c){for(var d=0!==(a.mode&1);null!==V;){var e=V,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jj;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||U;h=Jj;var l=U;Jj=g;if((U=k)&&!l)for(V=e;null!==V;)g=V,k=g.child,22===g.tag&&null!==g.memoizedState?jk(e):null!==k?(k.return=g,V=k):jk(e);for(;null!==f;)V=f,ik(f),f=f.sibling;V=e;Jj=h;U=l;}kk(a);}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,V=f):kk(a);}}
	function kk(a){for(;null!==V;){var b=V;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:U||Qj(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!U)if(null===c)d.componentDidMount();else {var e=b.elementType===b.type?c.memoizedProps:Ci(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate);}var f=b.updateQueue;null!==f&&sh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
	b.child.stateNode;break;case 1:c=b.child.stateNode;}sh(b,g,c);}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&c.focus();break;case "img":k.src&&(c.src=k.src);}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var l=b.alternate;if(null!==l){var m=l.memoizedState;if(null!==m){var q=m.dehydrated;null!==q&&bd(q);}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
	default:throw Error(p$1(163));}U||b.flags&512&&Rj(b);}catch(r){W(b,b.return,r);}}if(b===a){V=null;break}c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return;}}function gk(a){for(;null!==V;){var b=V;if(b===a){V=null;break}var c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return;}}
	function jk(a){for(;null!==V;){var b=V;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Qj(4,b);}catch(k){W(b,c,k);}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount();}catch(k){W(b,e,k);}}var f=b.return;try{Rj(b);}catch(k){W(b,f,k);}break;case 5:var g=b.return;try{Rj(b);}catch(k){W(b,g,k);}}}catch(k){W(b,b.return,k);}if(b===a){V=null;break}var h=b.sibling;if(null!==h){h.return=b.return;V=h;break}V=b.return;}}
	var lk=Math.ceil,mk=ua.ReactCurrentDispatcher,nk=ua.ReactCurrentOwner,ok=ua.ReactCurrentBatchConfig,K=0,Q=null,Y=null,Z=0,fj=0,ej=Uf(0),T=0,pk=null,rh=0,qk=0,rk=0,sk=null,tk=null,fk=0,Gj=Infinity,uk=null,Oi=false,Pi=null,Ri=null,vk=false,wk=null,xk=0,yk=0,zk=null,Ak=-1,Bk=0;function R(){return 0!==(K&6)?B():-1!==Ak?Ak:Ak=B()}
	function yi(a){if(0===(a.mode&1))return 1;if(0!==(K&2)&&0!==Z)return Z&-Z;if(null!==Kg.transition)return 0===Bk&&(Bk=yc()),Bk;a=C;if(0!==a)return a;a=window.event;a=void 0===a?16:jd(a.type);return a}function gi(a,b,c,d){if(50<yk)throw yk=0,zk=null,Error(p$1(185));Ac(a,c,d);if(0===(K&2)||a!==Q)a===Q&&(0===(K&2)&&(qk|=c),4===T&&Ck(a,Z)),Dk(a,d),1===c&&0===K&&0===(b.mode&1)&&(Gj=B()+500,fg&&jg());}
	function Dk(a,b){var c=a.callbackNode;wc(a,b);var d=uc(a,a===Q?Z:0);if(0===d)null!==c&&bc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&bc(c);if(1===b)0===a.tag?ig(Ek.bind(null,a)):hg(Ek.bind(null,a)),Jf(function(){0===(K&6)&&jg();}),c=null;else {switch(Dc(d)){case 1:c=fc;break;case 4:c=gc;break;case 16:c=hc;break;case 536870912:c=jc;break;default:c=hc;}c=Fk(c,Gk.bind(null,a));}a.callbackPriority=b;a.callbackNode=c;}}
	function Gk(a,b){Ak=-1;Bk=0;if(0!==(K&6))throw Error(p$1(327));var c=a.callbackNode;if(Hk()&&a.callbackNode!==c)return null;var d=uc(a,a===Q?Z:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Ik(a,d);else {b=d;var e=K;K|=2;var f=Jk();if(Q!==a||Z!==b)uk=null,Gj=B()+500,Kk(a,b);do try{Lk();break}catch(h){Mk(a,h);}while(1);$g();mk.current=f;K=e;null!==Y?b=0:(Q=null,Z=0,b=T);}if(0!==b){2===b&&(e=xc(a),0!==e&&(d=e,b=Nk(a,e)));if(1===b)throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;if(6===b)Ck(a,d);
	else {e=a.current.alternate;if(0===(d&30)&&!Ok(e)&&(b=Ik(a,d),2===b&&(f=xc(a),0!==f&&(d=f,b=Nk(a,f))),1===b))throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(p$1(345));case 2:Pk(a,tk,uk);break;case 3:Ck(a,d);if((d&130023424)===d&&(b=fk+500-B(),10<b)){if(0!==uc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){R();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),b);break}Pk(a,tk,uk);break;case 4:Ck(a,d);if((d&4194240)===
	d)break;b=a.eventTimes;for(e=-1;0<d;){var g=31-oc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f;}d=e;d=B()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*lk(d/1960))-d;if(10<d){a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),d);break}Pk(a,tk,uk);break;case 5:Pk(a,tk,uk);break;default:throw Error(p$1(329));}}}Dk(a,B());return a.callbackNode===c?Gk.bind(null,a):null}
	function Nk(a,b){var c=sk;a.current.memoizedState.isDehydrated&&(Kk(a,b).flags|=256);a=Ik(a,b);2!==a&&(b=tk,tk=c,null!==b&&Fj(b));return a}function Fj(a){null===tk?tk=a:tk.push.apply(tk,a);}
	function Ok(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!He(f(),e))return !1}catch(g){return  false}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else {if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return  true;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return  true}
	function Ck(a,b){b&=~rk;b&=~qk;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-oc(b),d=1<<c;a[c]=-1;b&=~d;}}function Ek(a){if(0!==(K&6))throw Error(p$1(327));Hk();var b=uc(a,0);if(0===(b&1))return Dk(a,B()),null;var c=Ik(a,b);if(0!==a.tag&&2===c){var d=xc(a);0!==d&&(b=d,c=Nk(a,d));}if(1===c)throw c=pk,Kk(a,0),Ck(a,b),Dk(a,B()),c;if(6===c)throw Error(p$1(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Pk(a,tk,uk);Dk(a,B());return null}
	function Qk(a,b){var c=K;K|=1;try{return a(b)}finally{K=c,0===K&&(Gj=B()+500,fg&&jg());}}function Rk(a){null!==wk&&0===wk.tag&&0===(K&6)&&Hk();var b=K;K|=1;var c=ok.transition,d=C;try{if(ok.transition=null,C=1,a)return a()}finally{C=d,ok.transition=c,K=b,0===(K&6)&&jg();}}function Hj(){fj=ej.current;E(ej);}
	function Kk(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Gf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;wg(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$f();break;case 3:zh();E(Wf);E(H);Eh();break;case 5:Bh(d);break;case 4:zh();break;case 13:E(L);break;case 19:E(L);break;case 10:ah(d.type._context);break;case 22:case 23:Hj();}c=c.return;}Q=a;Y=a=Pg(a.current,null);Z=fj=b;T=0;pk=null;rk=qk=rh=0;tk=sk=null;if(null!==fh){for(b=
	0;b<fh.length;b++)if(c=fh[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g;}c.pending=d;}fh=null;}return a}
	function Mk(a,b){do{var c=Y;try{$g();Fh.current=Rh;if(Ih){for(var d=M.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next;}Ih=!1;}Hh=0;O=N=M=null;Jh=!1;Kh=0;nk.current=null;if(null===c||null===c.return){T=1;pk=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Z;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,q=m.tag;if(0===(m.mode&1)&&(0===q||11===q||15===q)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
	m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null);}var y=Ui(g);if(null!==y){y.flags&=-257;Vi(y,g,h,f,b);y.mode&1&&Si(f,l,b);b=y;k=l;var n=b.updateQueue;if(null===n){var t=new Set;t.add(k);b.updateQueue=t;}else n.add(k);break a}else {if(0===(b&1)){Si(f,l,b);tj();break a}k=Error(p$1(426));}}else if(I&&h.mode&1){var J=Ui(g);if(null!==J){0===(J.flags&65536)&&(J.flags|=256);Vi(J,g,h,f,b);Jg(Ji(k,h));break a}}f=k=Ji(k,h);4!==T&&(T=2);null===sk?sk=[f]:sk.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;
	b&=-b;f.lanes|=b;var x=Ni(f,k,b);ph(f,x);break a;case 1:h=k;var w=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Ri||!Ri.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var F=Qi(f,h,b);ph(f,F);break a}}f=f.return;}while(null!==f)}Sk(c);}catch(na){b=na;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}function Jk(){var a=mk.current;mk.current=Rh;return null===a?Rh:a}
	function tj(){if(0===T||3===T||2===T)T=4;null===Q||0===(rh&268435455)&&0===(qk&268435455)||Ck(Q,Z);}function Ik(a,b){var c=K;K|=2;var d=Jk();if(Q!==a||Z!==b)uk=null,Kk(a,b);do try{Tk();break}catch(e){Mk(a,e);}while(1);$g();K=c;mk.current=d;if(null!==Y)throw Error(p$1(261));Q=null;Z=0;return T}function Tk(){for(;null!==Y;)Uk(Y);}function Lk(){for(;null!==Y&&!cc();)Uk(Y);}function Uk(a){var b=Vk(a.alternate,a,fj);a.memoizedProps=a.pendingProps;null===b?Sk(a):Y=b;nk.current=null;}
	function Sk(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Ej(c,b,fj),null!==c){Y=c;return}}else {c=Ij(c,b);if(null!==c){c.flags&=32767;Y=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else {T=6;Y=null;return}}b=b.sibling;if(null!==b){Y=b;return}Y=b=a;}while(null!==b);0===T&&(T=5);}function Pk(a,b,c){var d=C,e=ok.transition;try{ok.transition=null,C=1,Wk(a,b,c,d);}finally{ok.transition=e,C=d;}return null}
	function Wk(a,b,c,d){do Hk();while(null!==wk);if(0!==(K&6))throw Error(p$1(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(p$1(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Bc(a,f);a===Q&&(Y=Q=null,Z=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||vk||(vk=true,Fk(hc,function(){Hk();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ok.transition;ok.transition=null;
	var g=C;C=1;var h=K;K|=4;nk.current=null;Oj(a,c);dk(c,a);Oe(Df);dd=!!Cf;Df=Cf=null;a.current=c;hk(c);dc();K=h;C=g;ok.transition=f;}else a.current=c;vk&&(vk=false,wk=a,xk=e);f=a.pendingLanes;0===f&&(Ri=null);mc(c.stateNode);Dk(a,B());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Oi)throw Oi=false,a=Pi,Pi=null,a;0!==(xk&1)&&0!==a.tag&&Hk();f=a.pendingLanes;0!==(f&1)?a===zk?yk++:(yk=0,zk=a):yk=0;jg();return null}
	function Hk(){if(null!==wk){var a=Dc(xk),b=ok.transition,c=C;try{ok.transition=null;C=16>a?16:a;if(null===wk)var d=!1;else {a=wk;wk=null;xk=0;if(0!==(K&6))throw Error(p$1(331));var e=K;K|=4;for(V=a.current;null!==V;){var f=V,g=f.child;if(0!==(V.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(V=l;null!==V;){var m=V;switch(m.tag){case 0:case 11:case 15:Pj(8,m,f);}var q=m.child;if(null!==q)q.return=m,V=q;else for(;null!==V;){m=V;var r=m.sibling,y=m.return;Sj(m);if(m===
	l){V=null;break}if(null!==r){r.return=y;V=r;break}V=y;}}}var n=f.alternate;if(null!==n){var t=n.child;if(null!==t){n.child=null;do{var J=t.sibling;t.sibling=null;t=J;}while(null!==t)}}V=f;}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,V=g;else b:for(;null!==V;){f=V;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Pj(9,f,f.return);}var x=f.sibling;if(null!==x){x.return=f.return;V=x;break b}V=f.return;}}var w=a.current;for(V=w;null!==V;){g=V;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
	u)u.return=g,V=u;else b:for(g=w;null!==V;){h=V;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Qj(9,h);}}catch(na){W(h,h.return,na);}if(h===g){V=null;break b}var F=h.sibling;if(null!==F){F.return=h.return;V=F;break b}V=h.return;}}K=e;jg();if(lc&&"function"===typeof lc.onPostCommitFiberRoot)try{lc.onPostCommitFiberRoot(kc,a);}catch(na){}d=!0;}return d}finally{C=c,ok.transition=b;}}return  false}function Xk(a,b,c){b=Ji(c,b);b=Ni(a,b,1);a=nh(a,b,1);b=R();null!==a&&(Ac(a,1,b),Dk(a,b));}
	function W(a,b,c){if(3===a.tag)Xk(a,a,c);else for(;null!==b;){if(3===b.tag){Xk(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ri||!Ri.has(d))){a=Ji(c,a);a=Qi(b,a,1);b=nh(b,a,1);a=R();null!==b&&(Ac(b,1,a),Dk(b,a));break}}b=b.return;}}
	function Ti(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=R();a.pingedLanes|=a.suspendedLanes&c;Q===a&&(Z&c)===c&&(4===T||3===T&&(Z&130023424)===Z&&500>B()-fk?Kk(a,0):rk|=c);Dk(a,b);}function Yk(a,b){0===b&&(0===(a.mode&1)?b=1:(b=sc,sc<<=1,0===(sc&130023424)&&(sc=4194304)));var c=R();a=ih(a,b);null!==a&&(Ac(a,b,c),Dk(a,c));}function uj(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Yk(a,c);}
	function bk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(p$1(314));}null!==d&&d.delete(b);Yk(a,c);}var Vk;
	Vk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||Wf.current)dh=true;else {if(0===(a.lanes&c)&&0===(b.flags&128))return dh=false,yj(a,b,c);dh=0!==(a.flags&131072)?true:false;}else dh=false,I&&0!==(b.flags&1048576)&&ug(b,ng,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;ij(a,b);a=b.pendingProps;var e=Yf(b,H.current);ch(b,c);e=Nh(null,b,d,a,e,c);var f=Sh();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=
	null,Zf(d)?(f=true,cg(b)):f=false,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,kh(b),e.updater=Ei,b.stateNode=e,e._reactInternals=b,Ii(b,d,a,c),b=jj(null,b,d,true,f,c)):(b.tag=0,I&&f&&vg(b),Xi(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{ij(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Zk(d);a=Ci(d,a);switch(e){case 0:b=cj(null,b,d,a,c);break a;case 1:b=hj(null,b,d,a,c);break a;case 11:b=Yi(null,b,d,a,c);break a;case 14:b=$i(null,b,d,Ci(d.type,a),c);break a}throw Error(p$1(306,
	d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),cj(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),hj(a,b,d,e,c);case 3:a:{kj(b);if(null===a)throw Error(p$1(387));d=b.pendingProps;f=b.memoizedState;e=f.element;lh(a,b);qh(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:false,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
	f,b.memoizedState=f,b.flags&256){e=Ji(Error(p$1(423)),b);b=lj(a,b,d,c,e);break a}else if(d!==e){e=Ji(Error(p$1(424)),b);b=lj(a,b,d,c,e);break a}else for(yg=Lf(b.stateNode.containerInfo.firstChild),xg=b,I=true,zg=null,c=Vg(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else {Ig();if(d===e){b=Zi(a,b,c);break a}Xi(a,b,d,c);}b=b.child;}return b;case 5:return Ah(b),null===a&&Eg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ef(d,e)?g=null:null!==f&&Ef(d,f)&&(b.flags|=32),
	gj(a,b),Xi(a,b,g,c),b.child;case 6:return null===a&&Eg(b),null;case 13:return oj(a,b,c);case 4:return yh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Ug(b,null,d,c):Xi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),Yi(a,b,d,e,c);case 7:return Xi(a,b,b.pendingProps,c),b.child;case 8:return Xi(a,b,b.pendingProps.children,c),b.child;case 12:return Xi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
	g=e.value;G(Wg,d._currentValue);d._currentValue=g;if(null!==f)if(He(f.value,g)){if(f.children===e.children&&!Wf.current){b=Zi(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=mh(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k;}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);bh(f.return,
	c,b);h.lanes|=c;break}k=k.next;}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(p$1(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);bh(g,c,b);g=f.sibling;}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return;}f=g;}Xi(a,b,e.children,c);b=b.child;}return b;case 9:return e=b.type,d=b.pendingProps.children,ch(b,c),e=eh(e),d=d(e),b.flags|=1,Xi(a,b,d,c),
	b.child;case 14:return d=b.type,e=Ci(d,b.pendingProps),e=Ci(d.type,e),$i(a,b,d,e,c);case 15:return bj(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),ij(a,b),b.tag=1,Zf(d)?(a=true,cg(b)):a=false,ch(b,c),Gi(b,d,e),Ii(b,d,e,c),jj(null,b,d,true,a,c);case 19:return xj(a,b,c);case 22:return dj(a,b,c)}throw Error(p$1(156,b.tag));};function Fk(a,b){return ac(a,b)}
	function $k(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null;}function Bg(a,b,c,d){return new $k(a,b,c,d)}function aj(a){a=a.prototype;return !(!a||!a.isReactComponent)}
	function Zk(a){if("function"===typeof a)return aj(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Da)return 11;if(a===Ga)return 14}return 2}
	function Pg(a,b){var c=a.alternate;null===c?(c=Bg(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
	c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
	function Rg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)aj(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ya:return Tg(c.children,e,f,b);case za:g=8;e|=8;break;case Aa:return a=Bg(12,c,b,e|2),a.elementType=Aa,a.lanes=f,a;case Ea:return a=Bg(13,c,b,e),a.elementType=Ea,a.lanes=f,a;case Fa:return a=Bg(19,c,b,e),a.elementType=Fa,a.lanes=f,a;case Ia:return pj(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case Ba:g=10;break a;case Ca:g=9;break a;case Da:g=11;
	break a;case Ga:g=14;break a;case Ha:g=16;d=null;break a}throw Error(p$1(130,null==a?a:typeof a,""));}b=Bg(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Tg(a,b,c,d){a=Bg(7,a,d,b);a.lanes=c;return a}function pj(a,b,c,d){a=Bg(22,a,d,b);a.elementType=Ia;a.lanes=c;a.stateNode={isHidden:false};return a}function Qg(a,b,c){a=Bg(6,a,null,b);a.lanes=c;return a}
	function Sg(a,b,c){b=Bg(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
	function al(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=zc(0);this.expirationTimes=zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=zc(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=
	null;}function bl(a,b,c,d,e,f,g,h,k){a=new al(a,b,c,h,k);1===b?(b=1,true===f&&(b|=8)):b=0;f=Bg(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};kh(f);return a}function cl(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:wa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
	function dl(a){if(!a)return Vf;a=a._reactInternals;a:{if(Vb(a)!==a||1!==a.tag)throw Error(p$1(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(Zf(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return;}while(null!==b);throw Error(p$1(171));}if(1===a.tag){var c=a.type;if(Zf(c))return bg(a,c,b)}return b}
	function el(a,b,c,d,e,f,g,h,k){a=bl(c,d,true,a,e,f,g,h,k);a.context=dl(null);c=a.current;d=R();e=yi(c);f=mh(d,e);f.callback=void 0!==b&&null!==b?b:null;nh(c,f,e);a.current.lanes=e;Ac(a,e,d);Dk(a,d);return a}function fl(a,b,c,d){var e=b.current,f=R(),g=yi(e);c=dl(c);null===b.context?b.context=c:b.pendingContext=c;b=mh(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=nh(e,b,g);null!==a&&(gi(a,e,g,f),oh(a,e,g));return g}
	function gl(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function hl(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b;}}function il(a,b){hl(a,b);(a=a.alternate)&&hl(a,b);}function jl(){return null}var kl="function"===typeof reportError?reportError:function(a){console.error(a);};function ll(a){this._internalRoot=a;}
	ml.prototype.render=ll.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(p$1(409));fl(a,b,null,null);};ml.prototype.unmount=ll.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;Rk(function(){fl(null,a,null,null);});b[uf]=null;}};function ml(a){this._internalRoot=a;}
	ml.prototype.unstable_scheduleHydration=function(a){if(a){var b=Hc();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Qc.length&&0!==b&&b<Qc[c].priority;c++);Qc.splice(c,0,a);0===c&&Vc(a);}};function nl(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType)}function ol(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function pl(){}
	function ql(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=gl(g);f.call(a);};}var g=el(b,d,a,0,null,false,false,"",pl);a._reactRootContainer=g;a[uf]=g.current;sf(8===a.nodeType?a.parentNode:a);Rk();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=gl(k);h.call(a);};}var k=bl(a,0,false,null,null,false,false,"",pl);a._reactRootContainer=k;a[uf]=k.current;sf(8===a.nodeType?a.parentNode:a);Rk(function(){fl(b,k,c,d);});return k}
	function rl(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=gl(g);h.call(a);};}fl(b,g,a,e);}else g=ql(c,b,a,e,d);return gl(g)}Ec=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=tc(b.pendingLanes);0!==c&&(Cc(b,c|1),Dk(b,B()),0===(K&6)&&(Gj=B()+500,jg()));}break;case 13:Rk(function(){var b=ih(a,1);if(null!==b){var c=R();gi(b,a,1,c);}}),il(a,1);}};
	Fc=function(a){if(13===a.tag){var b=ih(a,134217728);if(null!==b){var c=R();gi(b,a,134217728,c);}il(a,134217728);}};Gc=function(a){if(13===a.tag){var b=yi(a),c=ih(a,b);if(null!==c){var d=R();gi(c,a,b,d);}il(a,b);}};Hc=function(){return C};Ic=function(a,b){var c=C;try{return C=a,b()}finally{C=c;}};
	yb=function(a,b,c){switch(b){case "input":bb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(p$1(90));Wa(d);bb(d,e);}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,false);}};Gb=Qk;Hb=Rk;
	var sl={usingClientEntryPoint:false,Events:[Cb,ue,Db,Eb,Fb,Qk]},tl={findFiberByHostInstance:Wc,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"};
	var ul={bundleType:tl.bundleType,version:tl.version,rendererPackageName:tl.rendererPackageName,rendererConfig:tl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=Zb(a);return null===a?null:a.stateNode},findFiberByHostInstance:tl.findFiberByHostInstance||
	jl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vl.isDisabled&&vl.supportsFiber)try{kc=vl.inject(ul),lc=vl;}catch(a){}}reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sl;
	reactDom_production_min.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!nl(b))throw Error(p$1(200));return cl(a,b,null,c)};reactDom_production_min.createRoot=function(a,b){if(!nl(a))throw Error(p$1(299));var c=false,d="",e=kl;null!==b&&void 0!==b&&(true===b.unstable_strictMode&&(c=true),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=bl(a,1,false,null,null,c,false,d,e);a[uf]=b.current;sf(8===a.nodeType?a.parentNode:a);return new ll(b)};
	reactDom_production_min.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(p$1(188));a=Object.keys(a).join(",");throw Error(p$1(268,a));}a=Zb(b);a=null===a?null:a.stateNode;return a};reactDom_production_min.flushSync=function(a){return Rk(a)};reactDom_production_min.hydrate=function(a,b,c){if(!ol(b))throw Error(p$1(200));return rl(null,a,b,true,c)};
	reactDom_production_min.hydrateRoot=function(a,b,c){if(!nl(a))throw Error(p$1(405));var d=null!=c&&c.hydratedSources||null,e=false,f="",g=kl;null!==c&&void 0!==c&&(true===c.unstable_strictMode&&(e=true),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=el(b,null,a,1,null!=c?c:null,e,false,f,g);a[uf]=b.current;sf(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,
	e);return new ml(b)};reactDom_production_min.render=function(a,b,c){if(!ol(b))throw Error(p$1(200));return rl(null,a,b,false,c)};reactDom_production_min.unmountComponentAtNode=function(a){if(!ol(a))throw Error(p$1(40));return a._reactRootContainer?(Rk(function(){rl(null,null,a,!1,function(){a._reactRootContainer=null;a[uf]=null;});}),true):false};reactDom_production_min.unstable_batchedUpdates=Qk;
	reactDom_production_min.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!ol(c))throw Error(p$1(200));if(null==a||void 0===a._reactInternals)throw Error(p$1(38));return rl(a,b,c,false,d)};reactDom_production_min.version="18.3.1-next-f1338f8080-20240426";

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
	  ) {
	    return;
	  }
	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}

	{
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  reactDom.exports = reactDom_production_min;
	}

	var reactDomExports = reactDom.exports;

	var m$1 = reactDomExports;
	{
	  client.createRoot = m$1.createRoot;
	  client.hydrateRoot = m$1.hydrateRoot;
	}

	var jsxRuntime = {exports: {}};

	var reactJsxRuntime_production_min = {};

	/**
	 * @license React
	 * react-jsx-runtime.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

	{
	  jsxRuntime.exports = reactJsxRuntime_production_min;
	}

	var jsxRuntimeExports = jsxRuntime.exports;

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */

	const mergeClasses = (...classes) => classes.filter((className, index, array) => {
	  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
	}).join(" ").trim();

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */

	const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */

	const toCamelCase = (string) => string.replace(
	  /^([A-Z])|[\s-_]+(\w)/g,
	  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
	);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const toPascalCase = (string) => {
	  const camelCase = toCamelCase(string);
	  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
	};

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */

	var defaultAttributes = {
	  xmlns: "http://www.w3.org/2000/svg",
	  width: 24,
	  height: 24,
	  viewBox: "0 0 24 24",
	  fill: "none",
	  stroke: "currentColor",
	  strokeWidth: 2,
	  strokeLinecap: "round",
	  strokeLinejoin: "round"
	};

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */

	const hasA11yProp = (props) => {
	  for (const prop in props) {
	    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
	      return true;
	    }
	  }
	  return false;
	};

	const LucideContext = reactExports.createContext({});
	const useLucideContext = () => reactExports.useContext(LucideContext);

	const Icon = reactExports.forwardRef(
	  ({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
	    const {
	      size: contextSize = 24,
	      strokeWidth: contextStrokeWidth = 2,
	      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
	      color: contextColor = "currentColor",
	      className: contextClass = ""
	    } = useLucideContext() ?? {};
	    const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
	    return reactExports.createElement(
	      "svg",
	      {
	        ref,
	        ...defaultAttributes,
	        width: size ?? contextSize ?? defaultAttributes.width,
	        height: size ?? contextSize ?? defaultAttributes.height,
	        stroke: color ?? contextColor,
	        strokeWidth: calculatedStrokeWidth,
	        className: mergeClasses("lucide", contextClass, className),
	        ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
	        ...rest
	      },
	      [
	        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
	        ...Array.isArray(children) ? children : [children]
	      ]
	    );
	  }
	);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const createLucideIcon = (iconName, iconNode) => {
	  const Component = reactExports.forwardRef(
	    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
	      ref,
	      iconNode,
	      className: mergeClasses(
	        `lucide-${toKebabCase(toPascalCase(iconName))}`,
	        `lucide-${iconName}`,
	        className
	      ),
	      ...props
	    })
	  );
	  Component.displayName = toPascalCase(iconName);
	  return Component;
	};

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$n = [
	  ["path", { d: "M5 12h14", key: "1ays0h" }],
	  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
	];
	const ArrowRight = createLucideIcon("arrow-right", __iconNode$n);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$m = [
	  [
	    "path",
	    {
	      d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
	      key: "18u6gg"
	    }
	  ],
	  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
	];
	const Camera = createLucideIcon("camera", __iconNode$m);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$l = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
	const Check = createLucideIcon("check", __iconNode$l);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$k = [
	  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
	  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
	  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
	];
	const ExternalLink = createLucideIcon("external-link", __iconNode$k);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$j = [
	  [
	    "path",
	    {
	      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	      key: "1oefj6"
	    }
	  ],
	  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
	  ["path", { d: "M12 18v-6", key: "17g6i2" }],
	  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
	];
	const FileDown = createLucideIcon("file-down", __iconNode$j);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$i = [
	  [
	    "path",
	    {
	      d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
	      key: "3pnvol"
	    }
	  ],
	  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
	  ["path", { d: "M12 10v12", key: "6ubwww" }],
	  ["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z", key: "9hd38g" }],
	  ["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z", key: "ufn41s" }]
	];
	const Flower2 = createLucideIcon("flower-2", __iconNode$i);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$h = [
	  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
	  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
	  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
	];
	const Image = createLucideIcon("image", __iconNode$h);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$g = [
	  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
	  ["path", { d: "M12 16v-4", key: "1dtifu" }],
	  ["path", { d: "M12 8h.01", key: "e9boi3" }]
	];
	const Info = createLucideIcon("info", __iconNode$g);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$f = [
	  ["path", { d: "M12 12v6", key: "3ahymv" }],
	  [
	    "path",
	    {
	      d: "M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z",
	      key: "1l7kg2"
	    }
	  ],
	  [
	    "path",
	    { d: "M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z", key: "1mmzpi" }
	  ]
	];
	const Lamp = createLucideIcon("lamp", __iconNode$f);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$e = [
	  [
	    "path",
	    {
	      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
	      key: "zw3jo"
	    }
	  ],
	  [
	    "path",
	    {
	      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
	      key: "1wduqc"
	    }
	  ],
	  [
	    "path",
	    {
	      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
	      key: "kqbvx6"
	    }
	  ]
	];
	const Layers = createLucideIcon("layers", __iconNode$e);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$d = [
	  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
	  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
	  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
	];
	const Link2 = createLucideIcon("link-2", __iconNode$d);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$c = [
	  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
	  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
	  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
	  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
	];
	const Maximize2 = createLucideIcon("maximize-2", __iconNode$c);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$b = [
	  [
	    "path",
	    {
	      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	      key: "1sd12s"
	    }
	  ]
	];
	const MessageCircle = createLucideIcon("message-circle", __iconNode$b);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$a = [
	  ["path", { d: "M14 14a2 2 0 0 0 2-2V8h-2", key: "1r06pg" }],
	  [
	    "path",
	    {
	      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	      key: "18887p"
	    }
	  ],
	  ["path", { d: "M8 14a2 2 0 0 0 2-2V8H8", key: "1jzu5j" }]
	];
	const MessageSquareQuote = createLucideIcon("message-square-quote", __iconNode$a);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$9 = [
	  [
	    "path",
	    {
	      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
	      key: "e79jfc"
	    }
	  ],
	  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
	  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
	  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
	  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
	];
	const Palette = createLucideIcon("palette", __iconNode$9);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$8 = [
	  [
	    "path",
	    {
	      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	      key: "1a8usu"
	    }
	  ],
	  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
	];
	const Pencil = createLucideIcon("pencil", __iconNode$8);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$7 = [
	  ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
	  ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13", key: "6uklza" }]
	];
	const Redo2 = createLucideIcon("redo-2", __iconNode$7);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$6 = [
	  [
	    "path",
	    {
	      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
	      key: "icamh8"
	    }
	  ],
	  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
	  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
	  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
	  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
	];
	const Ruler = createLucideIcon("ruler", __iconNode$6);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$5 = [
	  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
	  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
	  [
	    "path",
	    {
	      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
	      key: "o988cm"
	    }
	  ]
	];
	const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$5);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$4 = [
	  ["path", { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3", key: "1dgpiv" }],
	  [
	    "path",
	    {
	      d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
	      key: "xacw8m"
	    }
	  ],
	  ["path", { d: "M4 18v2", key: "jwo5n2" }],
	  ["path", { d: "M20 18v2", key: "1ar1qi" }],
	  ["path", { d: "M12 4v9", key: "oqhhn3" }]
	];
	const Sofa = createLucideIcon("sofa", __iconNode$4);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$3 = [
	  [
	    "path",
	    {
	      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
	      key: "1s2grr"
	    }
	  ],
	  ["path", { d: "M20 2v4", key: "1rf3ol" }],
	  ["path", { d: "M22 4h-4", key: "gwowj6" }],
	  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
	];
	const Sparkles = createLucideIcon("sparkles", __iconNode$3);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$2 = [
	  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
	  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
	];
	const Undo2 = createLucideIcon("undo-2", __iconNode$2);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode$1 = [
	  ["path", { d: "M12 3v12", key: "1x0j5s" }],
	  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
	  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
	];
	const Upload = createLucideIcon("upload", __iconNode$1);

	/**
	 * @license lucide-react v1.8.0 - ISC
	 *
	 * This source code is licensed under the ISC license.
	 * See the LICENSE file in the root directory of this source tree.
	 */


	const __iconNode = [
	  ["path", { d: "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11", key: "pb2vm6" }],
	  [
	    "path",
	    {
	      d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z",
	      key: "doq5xv"
	    }
	  ],
	  ["path", { d: "M6 13h12", key: "yf64js" }],
	  ["path", { d: "M6 17h12", key: "1jwigz" }]
	];
	const Warehouse = createLucideIcon("warehouse", __iconNode);

	const DEFAULT_WIDGET_TITLE = 'ModlyAI';
	const DEFAULT_PRIMARY_COLOR = '#3B82F6';
	const DEFAULT_WELCOME_MESSAGE = "Hello! I'm your furniture assistant. I can help you choose the right products, plan your room, or customize items from this store's catalog.";
	const DEFAULT_ENABLED_ACTIONS = {
	    viewInCatalog: true,
	    customize: true,
	    requestQuote: true,
	};
	function hasText(value) {
	    return typeof value === 'string' && value.trim().length > 0;
	}
	const defaultConfig = {
	    storeName: '',
	    storeUrl: '',
	    supportEmail: '',
	    widgetTitle: DEFAULT_WIDGET_TITLE,
	    primaryColor: DEFAULT_PRIMARY_COLOR,
	    welcomeMessage: DEFAULT_WELCOME_MESSAGE,
	    enabledActions: DEFAULT_ENABLED_ACTIONS,
	    quoteEmail: '',
	    apiEndpoints: {
	        roomAnalyze: '/api/rooms/analyze',
	        furnitureCustomize: '/api/furniture/customize',
	        chat: '/api/widget/chat',
	        catalog: '/api/catalog/items',
	        recommendationsMatch: '/api/recommendations/match',
	        cartAdd: '/api/cart/add',
	        quoteRequest: '/api/quotes/request',
	    },
	    features: {
	        roomPlanner: true,
	        customizer: true,
	    },
	    storageKey: 'modly-customized-furniture',
	};
	function mergeConfig(userConfig = {}) {
	    const widgetTitle = hasText(userConfig.widgetTitle)
	        ? userConfig.widgetTitle.trim()
	        : hasText(userConfig.theme?.buttonText)
	            ? userConfig.theme.buttonText.trim()
	            : DEFAULT_WIDGET_TITLE;
	    const primaryColor = hasText(userConfig.primaryColor)
	        ? userConfig.primaryColor.trim()
	        : hasText(userConfig.theme?.primaryColor)
	            ? userConfig.theme.primaryColor.trim()
	            : DEFAULT_PRIMARY_COLOR;
	    const welcomeMessage = hasText(userConfig.welcomeMessage)
	        ? userConfig.welcomeMessage.trim()
	        : DEFAULT_WELCOME_MESSAGE;
	    return {
	        ...defaultConfig,
	        ...userConfig,
	        storeId: userConfig.storeId,
	        widgetTitle,
	        primaryColor,
	        welcomeMessage,
	        enabledActions: {
	            ...DEFAULT_ENABLED_ACTIONS,
	            ...userConfig.enabledActions,
	        },
	        apiEndpoints: {
	            ...defaultConfig.apiEndpoints,
	            ...userConfig.apiEndpoints,
	        },
	        theme: {
	            ...userConfig.theme,
	            primaryColor,
	            buttonText: widgetTitle,
	        },
	        features: {
	            ...defaultConfig.features,
	            ...userConfig.features,
	        },
	    };
	}
	function getWidgetTitle(config = {}) {
	    return hasText(config.widgetTitle)
	        ? config.widgetTitle.trim()
	        : hasText(config.theme?.buttonText)
	            ? config.theme.buttonText.trim()
	            : DEFAULT_WIDGET_TITLE;
	}
	function getPrimaryColor(config = {}) {
	    return hasText(config.primaryColor)
	        ? config.primaryColor.trim()
	        : hasText(config.theme?.primaryColor)
	            ? config.theme.primaryColor.trim()
	            : DEFAULT_PRIMARY_COLOR;
	}
	function isDarkColor(color) {
	    if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
	        return false;
	    }
	    const rgbMatch = color.match(/\d+/g);
	    if (rgbMatch && rgbMatch.length >= 3) {
	        const r = parseInt(rgbMatch[0], 10);
	        const g = parseInt(rgbMatch[1], 10);
	        const b = parseInt(rgbMatch[2], 10);
	        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	        return luminance < 0.5;
	    }
	    if (color.startsWith('#')) {
	        const hex = color.length === 4
	            ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
	            : color;
	        if (hex.length >= 7) {
	            const r = parseInt(hex.slice(1, 3), 16);
	            const g = parseInt(hex.slice(3, 5), 16);
	            const b = parseInt(hex.slice(5, 7), 16);
	            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	            return luminance < 0.5;
	        }
	    }
	    const darkColors = ['black', 'navy', 'darkblue', 'dark', 'darkslategray', 'darkslategrey'];
	    return darkColors.includes(color.toLowerCase());
	}
	function getReadableTextColor(backgroundColor) {
	    return isDarkColor(backgroundColor) ? '#ffffff' : '#111827';
	}
	function getWelcomeMessage(config = {}) {
	    return hasText(config.welcomeMessage) ? config.welcomeMessage.trim() : DEFAULT_WELCOME_MESSAGE;
	}
	function getEnabledActions(config = {}) {
	    return {
	        viewInCatalog: typeof config.enabledActions?.viewInCatalog === 'boolean'
	            ? config.enabledActions.viewInCatalog
	            : DEFAULT_ENABLED_ACTIONS.viewInCatalog,
	        customize: typeof config.enabledActions?.customize === 'boolean'
	            ? config.enabledActions.customize
	            : DEFAULT_ENABLED_ACTIONS.customize,
	        requestQuote: typeof config.enabledActions?.requestQuote === 'boolean'
	            ? config.enabledActions.requestQuote
	            : DEFAULT_ENABLED_ACTIONS.requestQuote,
	    };
	}
	function getApiBaseUrlFromConfigUrl(configUrl) {
	    if (!configUrl)
	        return undefined;
	    try {
	        const url = new URL(configUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
	        return url.origin;
	    }
	    catch (error) {
	        return undefined;
	    }
	}
	function isLocalhostUrl(value) {
	    if (!value)
	        return false;
	    try {
	        const url = new URL(value);
	        return ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
	    }
	    catch (error) {
	        return false;
	    }
	}
	// NEW: Fetch config from server
	async function fetchRemoteConfig(configUrl, widgetId, storeId) {
	    const apiBaseUrl = getApiBaseUrlFromConfigUrl(configUrl);
	    try {
	        const url = new URL(configUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
	        if (storeId) {
	            url.searchParams.set('storeId', storeId);
	        }
	        if (widgetId) {
	            url.searchParams.set('widgetId', widgetId);
	        }
	        if (typeof window !== 'undefined' && window.location.hostname) {
	            url.searchParams.set('domain', window.location.hostname);
	        }
	        const response = await fetch(url);
	        if (!response.ok) {
	            throw new Error(`Failed to fetch config: ${response.statusText}`);
	        }
	        const remoteConfig = await response.json();
	        const remoteApiBaseUrl = hasText(remoteConfig?.apiBaseUrl) && !isLocalhostUrl(remoteConfig.apiBaseUrl)
	            ? remoteConfig.apiBaseUrl.trim()
	            : undefined;
	        return {
	            ...remoteConfig,
	            apiBaseUrl: apiBaseUrl || remoteApiBaseUrl,
	        };
	    }
	    catch (error) {
	        console.warn('Failed to fetch remote config, using defaults:', error);
	        return apiBaseUrl ? { apiBaseUrl } : {};
	    }
	}

	const FALLBACK_COLOR_HEX = ['#9CA3AF', '#1F2937', '#D4B896', '#D4C5B9', '#6B7280', '#C2410C'];
	const COLOR_HEX_BY_NAME = {
	    beige: '#F5F0E8',
	    gray: '#9CA3AF',
	    grey: '#9CA3AF',
	    charcoal: '#374151',
	    white: '#FFFFFF',
	    black: '#111827',
	    brown: '#92400E',
	    navy_blue: '#1E3A5F',
	    navy: '#1E3A5F',
	    forest_green: '#166534',
	    sage: '#84A98C',
	    sage_green: '#84A98C',
	    emerald: '#065F46',
	    midnight_blue: '#1E3A8A',
	    burgundy: '#7F1D1D',
	    cream: '#FEFCE8',
	    gold: '#D97706',
	    walnut: '#7C3D12',
	    oak: '#A16207',
	    natural: '#D4B896',
	    caramel: '#B45309',
	    cognac: '#9A3412',
	    rustic_brown: '#78350F',
	    dark_walnut: '#431407',
	    gray_wash: '#D1D5DB',
	    smoked: '#6B7280',
	    dusty_rose: '#FDA4AF',
	    blush_pink: '#FBCFE8',
	    clear: '#E0F2FE',
	    white_oak: '#FEF9C3',
	    pebble: '#C4B8AE',
	    slate: '#475569',
	    sand: '#D4C5B9',
	    oat: '#D8CCB8',
	    mist: '#CBD5E1',
	    warm_oak: '#A16207',
	    warmoak: '#A16207',
	    blue: '#3B82F6',
	    green: '#10B981',
	    terracotta: '#C2410C',
	    graphite: '#4B5563',
	    chrome: '#9CA3AF',
	    brass: '#B45309',
	};
	const getColorHex = (colorName) => {
	    const normalized = colorName.toLowerCase().replace(/\s+/g, '_');
	    return COLOR_HEX_BY_NAME[normalized] ?? '#E5E7EB';
	};
	const getMaterialDescription = (material) => {
	    const descriptions = {
	        Fabric: 'Soft and breathable, easy to maintain',
	        Velvet: 'Luxurious feel, rich appearance',
	        Leather: 'Durable and easy to clean, ages beautifully',
	        Linen: 'Natural fiber, cool and textured',
	        Bouclé: 'Cozy looped texture, on-trend',
	        Boucle: 'Cozy looped texture, on-trend',
	        Marble: 'Premium natural stone, unique patterns',
	        'Tempered Glass': 'Modern and sleek, easy to clean',
	        'Solid Wood': 'Long lasting, natural grain beauty',
	        MDF: 'Smooth finish, affordable and sturdy',
	        Metal: 'Industrial look, very durable',
	        Rattan: 'Natural and lightweight, boho aesthetic',
	        Wicker: 'Woven natural material, casual style',
	        'Reclaimed Wood': 'Eco-friendly, unique character',
	        Microfiber: 'Stain resistant, soft to touch',
	        'Performance Fabric': 'Kid and pet friendly, highly durable',
	        'Full Grain Leather': 'Top quality leather, develops patina',
	        'PU Leather': 'Vegan leather, easy to wipe clean',
	        Acrylic: 'Clear modern material, lightweight',
	        Bamboo: 'Sustainable, strong natural material',
	        'Engineered Wood': 'Consistent quality, moisture resistant',
	        Upholstered: 'Padded and fabric wrapped, comfortable',
	    };
	    return descriptions[material] || 'Premium quality material';
	};
	const productMaterialOptions = (materials) => {
	    const uniqueMaterials = Array.from(new Set(materials.filter(Boolean)));
	    if (uniqueMaterials.length === 0) {
	        return [
	            {
	                id: 'standard_material',
	                name: 'Standard Material',
	                priceDelta: 0,
	                description: 'Factory-standard finish for this product.',
	            },
	        ];
	    }
	    return uniqueMaterials.map((material, index) => ({
	        id: material
	            .toLowerCase()
	            .replace(/[^a-z0-9]+/g, '_')
	            .replace(/^_+|_+$/g, ''),
	        name: material,
	        priceDelta: 0,
	        description: getMaterialDescription(material),
	    }));
	};
	const resolveColorHex = (colorName, index) => {
	    const hex = getColorHex(colorName);
	    return hex === '#E5E7EB' ? FALLBACK_COLOR_HEX[index % FALLBACK_COLOR_HEX.length] : hex;
	};
	const metersToInches = (value) => Number((value / 0.0254).toFixed(1));
	const inchesToMeters = (value) => Number((value * 0.0254).toFixed(3));
	const twentyPercentRange = (base, minimum) => {
	    const min = Math.max(minimum, Math.round(base * 0.8));
	    const max = Math.max(min + 1, Math.round(base * 1.2));
	    return [min, max];
	};
	const normalizeProductType = (category) => {
	    const value = category.toLowerCase();
	    if (value.endsWith('ies')) {
	        return `${value.slice(0, -3)}y`;
	    }
	    if (value.endsWith('s')) {
	        return value.slice(0, -1);
	    }
	    return value;
	};
	const normalizeStringList$1 = (value) => {
	    const entries = Array.isArray(value)
	        ? value
	        : typeof value === 'string'
	            ? value.split(/[|,]/)
	            : [];
	    return Array.from(new Set(entries
	        .map((entry) => String(entry ?? '').trim())
	        .filter(Boolean)));
	};
	const getOptionName = (value) => typeof value === 'string' ? value : value.name;
	const getOptionPrice = (value) => typeof value === 'string' ? undefined : value.price;
	const normalizeCustomizationOptionValues = (value) => {
	    if (Array.isArray(value)) {
	        const options = value
	            .map((entry) => {
	            if (typeof entry === 'string')
	                return entry.trim();
	            if (!entry || typeof entry !== 'object')
	                return null;
	            const option = entry;
	            const name = String(option.name ?? '').trim();
	            if (!name)
	                return null;
	            const price = typeof option.price === 'number' && Number.isFinite(option.price)
	                ? option.price
	                : typeof option.price === 'string' && option.price.trim() && Number.isFinite(Number(option.price))
	                    ? Number(option.price)
	                    : undefined;
	            return price === undefined ? { name } : { name, price };
	        })
	            .filter(Boolean);
	        const seen = new Set();
	        return options.filter((option) => {
	            const name = getOptionName(option).toLowerCase();
	            if (seen.has(name))
	                return false;
	            seen.add(name);
	            return true;
	        });
	    }
	    return normalizeStringList$1(value);
	};
	const normalizeCustomizationOptions = (value) => {
	    if (!value || typeof value !== 'object' || Array.isArray(value)) {
	        return undefined;
	    }
	    const options = value;
	    const colors = normalizeCustomizationOptionValues(options.colors);
	    const materials = normalizeCustomizationOptionValues(options.materials);
	    return {
	        ...options,
	        ...(colors.length > 0 ? { colors } : {}),
	        ...(materials.length > 0 ? { materials } : {}),
	    };
	};
	const dimensionsFromInches = (lengthIn, widthIn, heightIn) => ({
	    length: inchesToMeters(lengthIn),
	    width: inchesToMeters(widthIn),
	    height: inchesToMeters(heightIn),
	    unit: 'm',
	});
	const products = [
	    {
	        id: 'demo-sofa-002',
	        name: 'Modular Corner Sofa',
	        category: 'Sofas',
	        basePrice: 1099,
	        dimensions: {
	            length: 1.55,
	            width: 2.4,
	            height: 0.84,
	            unit: 'm',
	        },
	        materials: ['Polyester', 'Engineered wood'],
	        colors: [
	            { name: 'Pebble', hex: '#C4B8AE', available: true },
	            { name: 'Slate', hex: '#475569', available: true },
	        ],
	        images: {
	            front: '/products/modular-corner-sofa-front.jpg',
	            side: '/products/modular-corner-sofa-side.jpg',
	            angle: '/products/modular-corner-sofa-angle.jpg',
	            thumbnail: '/products/modular-corner-sofa-thumb.jpg',
	        },
	        tags: ['Sectional', 'Family', 'Modern'],
	        customizer: {
	            type: 'sofa',
	            thumbnailLabel: 'Sectional',
	            defaultWidthIn: 94.5,
	            defaultDepthIn: 61,
	            widthRangeIn: [84, 108],
	            depthRangeIn: [54, 72],
	            materialOptions: productMaterialOptions(['Polyester', 'Engineered wood']),
	        },
	    },
	    {
	        id: 'demo-chair-003',
	        name: 'Woven Accent Lounge Chair',
	        category: 'Chairs',
	        basePrice: 199,
	        dimensions: {
	            length: 0.76,
	            width: 0.72,
	            height: 0.78,
	            unit: 'm',
	        },
	        materials: ['Rattan', 'Steel'],
	        colors: [
	            { name: 'Natural', hex: '#D4B896', available: true },
	            { name: 'Black', hex: '#1A1A1A', available: true },
	        ],
	        images: {
	            front: '/products/woven-chair-front.jpg',
	            side: '/products/woven-chair-side.jpg',
	            angle: '/products/woven-chair-angle.jpg',
	            thumbnail: '/products/woven-chair-thumb.jpg',
	        },
	        tags: ['Lounge', 'Boho', 'Lightweight'],
	        customizer: {
	            type: 'chair',
	            thumbnailLabel: 'Lounge Chair',
	            defaultWidthIn: 28.3,
	            defaultDepthIn: 29.9,
	            widthRangeIn: [24, 36],
	            depthRangeIn: [24, 38],
	            materialOptions: productMaterialOptions(['Rattan', 'Steel']),
	        },
	    },
	    {
	        id: 'demo-table-003',
	        name: 'Low Profile Coffee Table',
	        category: 'Tables',
	        basePrice: 219,
	        dimensions: {
	            length: 0.6,
	            width: 1.2,
	            height: 0.42,
	            unit: 'm',
	        },
	        materials: ['Engineered wood'],
	        colors: [
	            { name: 'Sand', hex: '#D4C5B9', available: true },
	            { name: 'Graphite', hex: '#4B5563', available: true },
	            { name: 'White', hex: '#F9FAFB', available: true },
	        ],
	        images: {
	            front: '/products/low-profile-coffee-table-front.jpg',
	            side: '/products/low-profile-coffee-table-side.jpg',
	            angle: '/products/low-profile-coffee-table-angle.jpg',
	            thumbnail: '/products/low-profile-coffee-table-thumb.jpg',
	        },
	        tags: ['Living room', 'Storage', 'Minimal'],
	        customizer: {
	            type: 'table',
	            thumbnailLabel: 'Coffee Table',
	            defaultWidthIn: 47.2,
	            defaultDepthIn: 23.6,
	            widthRangeIn: [40, 56],
	            depthRangeIn: [20, 32],
	            materialOptions: productMaterialOptions(['Engineered wood']),
	        },
	    },
	    {
	        id: 'custom-sofa',
	        name: 'Custom Sofa',
	        category: 'Sofas',
	        basePrice: 899,
	        dimensions: {
	            length: 0.9,
	            width: 2.2,
	            height: 0.85,
	            unit: 'm',
	        },
	        materials: ['Premium Fabric', 'Oak Wood Legs', 'Leather'],
	        colors: [
	            { name: 'Beige', hex: '#D4C5B9', available: true },
	            { name: 'Navy', hex: '#1E293B', available: true },
	            { name: 'Gray', hex: '#6B7280', available: true },
	        ],
	        images: {
	            front: '/products/custom-sofa-front.jpg',
	            side: '/products/custom-sofa-side.jpg',
	            angle: '/products/custom-sofa-angle.jpg',
	            thumbnail: '/products/custom-sofa-thumb.jpg',
	        },
	        tags: ['Custom', 'Configurable'],
	        customizer: {
	            type: 'sofa',
	            thumbnailLabel: 'Custom Sofa',
	            defaultWidthIn: 86.6,
	            defaultDepthIn: 35.4,
	            widthRangeIn: [72, 100],
	            depthRangeIn: [30, 44],
	            materialOptions: productMaterialOptions(['Premium Fabric', 'Leather', 'Oak Wood Legs']),
	        },
	    },
	];
	function getProductById(id) {
	    return products.find((product) => product.id === id);
	}
	function productFromFurnitureItem(item) {
	    const existing = getProductById(item.id);
	    if (existing) {
	        return existing;
	    }
	    const rawItem = item;
	    const customizationOptions = normalizeCustomizationOptions(item.customizationOptions);
	    const explicitMaterials = normalizeCustomizationOptionValues(customizationOptions?.materials).map(getOptionName);
	    const explicitColors = normalizeCustomizationOptionValues(customizationOptions?.colors).map(getOptionName);
	    const rawMaterials = Array.isArray(rawItem.materials) || typeof rawItem.materials === 'string'
	        ? normalizeStringList$1(rawItem.materials)
	        : [];
	    const rawColors = Array.isArray(rawItem.colors) || typeof rawItem.colors === 'string'
	        ? normalizeStringList$1(rawItem.colors)
	        : [];
	    const baseMaterials = Array.from(new Set([
	        ...explicitMaterials,
	        ...rawMaterials,
	        ...(!Array.isArray(rawItem.materials) && typeof rawItem.materials !== 'string'
	            ? [
	                rawItem.materials.primary,
	                rawItem.materials.secondary,
	                rawItem.materials.upholstery,
	                rawItem.materials.legs,
	            ]
	            : []),
	    ].filter((value) => Boolean(value))));
	    const baseColors = Array.from(new Set([
	        ...explicitColors,
	        ...rawColors,
	        ...(!Array.isArray(rawItem.colors) && typeof rawItem.colors !== 'string'
	            ? [rawItem.colors.main, rawItem.colors.accent]
	            : []),
	    ].filter((value) => Boolean(value))));
	    const widthIn = Math.max(18, Math.round(metersToInches(item.dimensions.width || 0.9)));
	    const depthIn = Math.max(18, Math.round(metersToInches(item.dimensions.depth || item.dimensions.length || 0.9)));
	    return {
	        id: item.id,
	        name: item.name,
	        category: item.category,
	        basePrice: item.priceRange?.min ?? 0,
	        length: rawItem.length ?? metersToInches(item.dimensions.length || item.dimensions.depth || 0),
	        width: rawItem.width ?? metersToInches(item.dimensions.width || 0),
	        height: rawItem.height ?? metersToInches(item.dimensions.height || 0),
	        source: item.source,
	        productUrl: item.productUrl || item.url,
	        imageUrl: item.images[0],
	        image: item.images[0],
	        thumbnail: item.images[0],
	        externalId: item.externalId,
	        shopifyProductId: item.shopifyProductId,
	        storeId: item.storeId,
	        status: item.status,
	        customizationOptions,
	        dimensions: {
	            length: item.dimensions.length || item.dimensions.depth || 0,
	            width: item.dimensions.width || 0,
	            height: item.dimensions.height || 0,
	            unit: 'm',
	        },
	        materials: baseMaterials.length > 0 ? baseMaterials : ['Custom'],
	        colors: baseColors.length > 0
	            ? baseColors.map((color, index) => ({
	                name: color,
	                hex: resolveColorHex(color, index),
	                available: true,
	            }))
	            : [{ name: 'Custom', hex: FALLBACK_COLOR_HEX[0], available: true }],
	        images: {
	            front: item.images[0] ?? '',
	            side: item.images[1] ?? item.images[0] ?? '',
	            angle: item.images[2] ?? item.images[0] ?? '',
	            thumbnail: item.images[0] ?? '',
	        },
	        tags: item.styleTags ?? [],
	        customizer: {
	            type: normalizeProductType(item.subCategory || item.category),
	            thumbnailLabel: item.subCategory || item.category,
	            defaultWidthIn: widthIn,
	            defaultDepthIn: depthIn,
	            widthRangeIn: twentyPercentRange(widthIn, 18),
	            depthRangeIn: twentyPercentRange(depthIn, 18),
	            materialOptions: productMaterialOptions(baseMaterials),
	        },
	    };
	}
	function productFromCatalogProduct(product, index = 0) {
	    const existing = product?.id ? getProductById(String(product.id)) : undefined;
	    if (existing) {
	        return existing;
	    }
	    const name = String(product?.title ?? product?.name ?? `Product ${index + 1}`);
	    const materials = normalizeStringList$1(product?.materials);
	    const colorNames = normalizeStringList$1(product?.colors);
	    const lengthIn = Number(product?.length) || 0;
	    const widthIn = Number(product?.width) || 0;
	    const heightIn = Number(product?.height) || 0;
	    const image = String(product?.imageUrl ?? product?.image ?? product?.images?.[0] ?? '');
	    const price = Number(product?.price ?? product?.priceRange?.min ?? 0) || 0;
	    const customizationOptions = normalizeCustomizationOptions(product?.customizationOptions);
	    return {
	        id: String(product?.id ?? `catalog-product-${index + 1}`),
	        name,
	        category: String(product?.category ?? 'Furniture'),
	        basePrice: price,
	        length: lengthIn,
	        width: widthIn,
	        height: heightIn,
	        source: product?.source ? String(product.source) : undefined,
	        productUrl: product?.productUrl ? String(product.productUrl) : product?.url ? String(product.url) : undefined,
	        imageUrl: image,
	        image,
	        thumbnail: String(product?.thumbnail ?? image),
	        externalId: product?.externalId ? String(product.externalId) : undefined,
	        shopifyProductId: product?.shopifyProductId ? String(product.shopifyProductId) : undefined,
	        storeId: product?.storeId ? String(product.storeId) : undefined,
	        status: product?.status ? String(product.status) : undefined,
	        customizationOptions,
	        dimensions: dimensionsFromInches(lengthIn, widthIn, heightIn),
	        materials: materials.length > 0 ? materials : ['Custom'],
	        colors: colorNames.length > 0
	            ? colorNames.map((color, colorIndex) => ({
	                name: color,
	                hex: resolveColorHex(color, colorIndex),
	                available: true,
	            }))
	            : [{ name: 'Custom', hex: FALLBACK_COLOR_HEX[0], available: true }],
	        images: {
	            front: image,
	            side: image,
	            angle: image,
	            thumbnail: image,
	        },
	        tags: Array.isArray(product?.tags) ? product.tags : [],
	        customizer: {
	            type: normalizeProductType(String(product?.category ?? 'Furniture')),
	            thumbnailLabel: String(product?.category ?? 'Furniture'),
	            defaultWidthIn: Math.max(18, Math.round(widthIn || 36)),
	            defaultDepthIn: Math.max(18, Math.round(lengthIn || 36)),
	            widthRangeIn: twentyPercentRange(Math.max(18, Math.round(widthIn || 36)), 18),
	            depthRangeIn: twentyPercentRange(Math.max(18, Math.round(lengthIn || 36)), 18),
	            materialOptions: productMaterialOptions(materials),
	        },
	    };
	}

	const SESSION_STORAGE_KEY = 'modlyai_session_id';
	function createFallbackId() {
	    return `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
	}
	function getWidgetSessionId() {
	    if (typeof window === 'undefined')
	        return createFallbackId();
	    try {
	        const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
	        if (existing)
	            return existing;
	        const next = typeof window.crypto?.randomUUID === 'function'
	            ? window.crypto.randomUUID()
	            : createFallbackId();
	        window.sessionStorage.setItem(SESSION_STORAGE_KEY, next);
	        return next;
	    }
	    catch {
	        return createFallbackId();
	    }
	}
	function getAnalyticsEndpoint(apiBaseUrl) {
	    const path = '/api/analytics/events';
	    if (!apiBaseUrl)
	        return path;
	    try {
	        return new URL(path, apiBaseUrl).toString();
	    }
	    catch {
	        return path;
	    }
	}
	function shouldWarnInDevelopment() {
	    if (typeof window === 'undefined')
	        return false;
	    return ['localhost', '127.0.0.1'].includes(window.location.hostname);
	}
	function trackWidgetEvent({ storeId, widgetId, sessionId, type, productId, productName, metadata, apiBaseUrl, }) {
	    if (!storeId || typeof window === 'undefined')
	        return;
	    const payload = {
	        storeId,
	        widgetId,
	        sessionId: sessionId || getWidgetSessionId(),
	        type,
	        productId,
	        productName,
	        metadata,
	    };
	    window.setTimeout(() => {
	        try {
	            void fetch(getAnalyticsEndpoint(apiBaseUrl), {
	                method: 'POST',
	                headers: {
	                    'Content-Type': 'application/json',
	                },
	                body: JSON.stringify(payload),
	                keepalive: true,
	            }).catch((error) => {
	                if (shouldWarnInDevelopment()) {
	                    console.warn('ModlyAI analytics event failed:', error);
	                }
	            });
	        }
	        catch (error) {
	            if (shouldWarnInDevelopment()) {
	                console.warn('ModlyAI analytics event failed:', error);
	            }
	        }
	    }, 0);
	}

	const TRIAL_EXPIRED_WIDGET_MESSAGE = "This store's ModlyAI trial has ended. Please contact the store owner.";
	const normalizeStringList = (value) => {
	    const entries = Array.isArray(value)
	        ? value
	        : typeof value === 'string'
	            ? value.split(/[|,]/)
	            : [];
	    const normalized = Array.from(new Set(entries.map((entry) => String(entry ?? '').trim()).filter(Boolean)));
	    return normalized.length > 0 ? normalized : undefined;
	};
	class ApiClient {
	    constructor(config) {
	        this.config = config;
	    }
	    isAbsoluteUrl(path) {
	        return /^https?:\/\//i.test(path);
	    }
	    getBaseUrl() {
	        if (this.config.apiBaseUrl) {
	            return this.config.apiBaseUrl.replace(/\/$/, '');
	        }
	        if (this.config.configUrl) {
	            try {
	                return new URL(this.config.configUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost').origin;
	            }
	            catch (error) {
	                // Fall through to the window origin fallback below.
	            }
	        }
	        return typeof window !== 'undefined' ? window.location.origin : '';
	    }
	    getEndpoint(path) {
	        if (this.isAbsoluteUrl(path)) {
	            return path;
	        }
	        const baseUrl = this.getBaseUrl();
	        return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
	    }
	    withStoreQuery(url) {
	        const parsed = new URL(url, this.getBaseUrl() || 'http://localhost');
	        if (this.config.storeId) {
	            parsed.searchParams.set('storeId', String(this.config.storeId));
	        }
	        if (this.config.widgetId) {
	            parsed.searchParams.set('widgetId', String(this.config.widgetId));
	        }
	        if (this.config.apiKey) {
	            parsed.searchParams.set('apiKey', this.config.apiKey);
	        }
	        else if (this.config.publicApiKey) {
	            parsed.searchParams.set('apiKey', this.config.publicApiKey);
	        }
	        if (this.config.storeDomain) {
	            parsed.searchParams.set('domain', this.config.storeDomain);
	        }
	        return parsed.toString();
	    }
	    withStorePayload(payload) {
	        return {
	            ...payload,
	            ...(this.config.storeId ? { storeId: this.config.storeId } : {}),
	            ...(this.config.widgetId ? { widgetId: this.config.widgetId } : {}),
	            ...(this.config.apiKey ? { apiKey: this.config.apiKey } : {}),
	            ...(this.config.publicApiKey ? { publicApiKey: this.config.publicApiKey } : {}),
	            ...(this.config.storeDomain ? { storeDomain: this.config.storeDomain } : {}),
	        };
	    }
	    normalizeCatalogProductForChat(product, index) {
	        const title = String(product?.title ?? product?.name ?? '').trim();
	        if (!title)
	            return null;
	        const dimensions = typeof product?.dimensions === 'string'
	            ? product.dimensions
	            : product?.dimensions
	                ? [
	                    product.dimensions.length !== undefined ? `${product.dimensions.length} in L` : null,
	                    product.dimensions.width !== undefined ? `${product.dimensions.width} in W` : null,
	                    product.dimensions.height !== undefined ? `${product.dimensions.height} in H` : null,
	                ].filter(Boolean).join(' x ')
	                : undefined;
	        return {
	            id: String(product?.id ?? `catalog-product-${index + 1}`),
	            title,
	            name: title,
	            category: product?.category ? String(product.category) : undefined,
	            description: product?.description ? String(product.description) : undefined,
	            price: product?.price ?? product?.priceRange?.min,
	            sku: product?.sku ? String(product.sku) : undefined,
	            dimensions: dimensions || undefined,
	            image: product?.image ?? product?.imageUrl ?? product?.images?.[0],
	            imageUrl: product?.imageUrl ?? product?.image ?? product?.images?.[0],
	            tags: Array.isArray(product?.tags)
	                ? product.tags
	                : Array.isArray(product?.styleTags)
	                    ? product.styleTags
	                    : undefined,
	            source: product?.source ? String(product.source) : undefined,
	            length: product?.length ?? product?.dimensions?.length,
	            width: product?.width ?? product?.dimensions?.width,
	            height: product?.height ?? product?.dimensions?.height,
	            colors: normalizeStringList(product?.colors),
	            materials: normalizeStringList(product?.materials),
	            productUrl: product?.productUrl ? String(product.productUrl) : product?.url ? String(product.url) : undefined,
	            url: product?.url ? String(product.url) : product?.productUrl ? String(product.productUrl) : undefined,
	            handle: product?.handle ? String(product.handle) : undefined,
	            externalId: product?.externalId ? String(product.externalId) : undefined,
	            shopifyProductId: product?.shopifyProductId ? String(product.shopifyProductId) : undefined,
	            storeId: product?.storeId ? String(product.storeId) : undefined,
	            status: product?.status ? String(product.status) : undefined,
	            customizationOptions: product?.customizationOptions,
	        };
	    }
	    async getCatalogForChat() {
	        try {
	            const catalogResponse = await this.getCatalog();
	            const source = catalogResponse.catalog?.source ?? catalogResponse.meta?.catalogSource ?? catalogResponse.meta?.source;
	            const rawProducts = Array.isArray(catalogResponse.catalog?.products)
	                ? catalogResponse.catalog.products
	                : Array.isArray(catalogResponse.items)
	                    ? catalogResponse.items
	                    : [];
	            const products = rawProducts
	                .map((product, index) => this.normalizeCatalogProductForChat(product, index))
	                .filter(Boolean);
	            return {
	                source: products.length > 0 ? 'instantdb' : (source ?? 'none'),
	                products,
	            };
	        }
	        catch (error) {
	            console.warn('Failed to load catalog before chat request:', error);
	            return {
	                source: 'none',
	                products: [],
	            };
	        }
	    }
	    normalizeChatResponse(data) {
	        if (data?.message && typeof data.message === 'object') {
	            return data;
	        }
	        const content = typeof data?.reply === 'string' ? data.reply :
	            typeof data?.message === 'string' ? data.message :
	                typeof data?.content === 'string' ? data.content :
	                    typeof data?.text === 'string' ? data.text :
	                        '';
	        if (!content.trim()) {
	            throw new Error('Chat response did not include a readable assistant message.');
	        }
	        const message = {
	            id: `msg-assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
	            role: 'assistant',
	            type: 'text',
	            content,
	            timestamp: Date.now(),
	        };
	        return {
	            message,
	            updatedPreferences: data?.updatedPreferences,
	            shouldTriggerAction: data?.shouldTriggerAction,
	        };
	    }
	    createTextChatResponse(content) {
	        return {
	            message: {
	                id: `msg-assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
	                role: 'assistant',
	                type: 'text',
	                content,
	                timestamp: Date.now(),
	            },
	        };
	    }
	    async readErrorResponse(response) {
	        try {
	            return await response.json();
	        }
	        catch (e) {
	            return null;
	        }
	    }
	    getFriendlyApiError(response, data, fallback) {
	        if (response.status === 402 && data?.error === 'trial_expired') {
	            return TRIAL_EXPIRED_WIDGET_MESSAGE;
	        }
	        if ((response.status === 402 || response.status === 403) && data?.error === 'usage_limit_reached') {
	            return data?.message || 'You have reached this store\'s plan limit. Please contact the store owner.';
	        }
	        return data?.message || data?.error || fallback;
	    }
	    async analyzeRoom(photos, dimensions, preferences) {
	        const endpoint = this.config.apiEndpoints?.roomAnalyze || '/api/rooms/analyze';
	        const url = this.withStoreQuery(this.getEndpoint(endpoint));
	        const formData = new FormData();
	        photos.forEach((photo) => {
	            formData.append('photos', photo);
	        });
	        formData.append('dimensions', JSON.stringify(dimensions));
	        if (this.config.storeId) {
	            formData.append('storeId', this.config.storeId);
	        }
	        if (this.config.widgetId) {
	            formData.append('widgetId', this.config.widgetId);
	        }
	        if (this.config.apiKey) {
	            formData.append('apiKey', this.config.apiKey);
	        }
	        if (this.config.storeDomain) {
	            formData.append('storeDomain', this.config.storeDomain);
	        }
	        if (preferences) {
	            formData.append('preferences', JSON.stringify(preferences));
	        }
	        const response = await fetch(url, {
	            method: 'POST',
	            body: formData,
	        });
	        if (!response.ok) {
	            const errorData = await this.readErrorResponse(response);
	            const error = new Error(this.getFriendlyApiError(response, errorData, `Failed to analyze room: ${response.statusText}`));
	            this.config.onError?.(error);
	            throw error;
	        }
	        const data = await response.json();
	        this.config.onRoomAnalyzed?.(data);
	        return data;
	    }
	    async customizeFurniture(config) {
	        const endpoint = this.config.apiEndpoints?.furnitureCustomize || '/api/furniture/customize';
	        const url = this.getEndpoint(endpoint);
	        const response = await fetch(url, {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json',
	            },
	            body: JSON.stringify(this.withStorePayload(config)),
	        });
	        if (!response.ok) {
	            const errorData = await this.readErrorResponse(response);
	            const error = new Error(this.getFriendlyApiError(response, errorData, `Failed to customize furniture: ${response.statusText}`));
	            this.config.onError?.(error);
	            throw error;
	        }
	        const data = await response.json();
	        this.config.onFurnitureCustomized?.(data);
	        return data;
	    }
	    async chat(request) {
	        const endpoint = this.config.apiEndpoints?.chat || '/api/widget/chat';
	        const url = this.withStoreQuery(this.getEndpoint(endpoint));
	        const catalog = request.catalog ?? await this.getCatalogForChat();
	        const payload = this.withStorePayload({
	            ...request,
	            history: request.history ?? request.conversationHistory,
	            catalog,
	        });
	        try {
	            const response = await fetch(url, {
	                method: 'POST',
	                headers: {
	                    'Content-Type': 'application/json',
	                },
	                body: JSON.stringify(payload),
	            });
	            if (!response.ok) {
	                let errorMessage = `Failed to get chat response: ${response.statusText}`;
	                const errorData = await this.readErrorResponse(response);
	                console.warn('ModlyAI chat error response:', errorData);
	                if (response.status === 402 && errorData?.error === 'trial_expired') {
	                    return this.createTextChatResponse(TRIAL_EXPIRED_WIDGET_MESSAGE);
	                }
	                errorMessage = this.getFriendlyApiError(response, errorData, errorMessage);
	                const error = new Error(errorMessage);
	                this.config.onError?.(error);
	                throw error;
	            }
	            const data = await response.json();
	            return this.normalizeChatResponse(data);
	        }
	        catch (error) {
	            console.error('Chat request failed:', error);
	            // Re-throw with more context if it's a network error
	            if (error instanceof TypeError && error.message.includes('fetch')) {
	                const networkError = new Error("Sorry, I couldn't reach ModlyAI right now. Please try again.");
	                this.config.onError?.(networkError);
	                throw networkError;
	            }
	            throw error;
	        }
	    }
	    async getCatalog() {
	        const endpoint = this.config.apiEndpoints?.catalog || '/api/catalog/items';
	        const url = this.withStoreQuery(this.getEndpoint(endpoint));
	        const response = await fetch(url, {
	            method: 'GET',
	        });
	        if (!response.ok) {
	            const error = new Error(`Failed to fetch catalog: ${response.statusText}`);
	            this.config.onError?.(error);
	            throw error;
	        }
	        const data = await response.json();
	        return Array.isArray(data) ? { items: data } : data;
	    }
	    async submitQuoteRequest(quoteRequest) {
	        const endpoint = this.config.apiEndpoints?.quoteRequest || '/api/quotes/request';
	        const url = this.getEndpoint(endpoint);
	        const payload = {
	            ...quoteRequest,
	            sessionId: quoteRequest.sessionId || getWidgetSessionId(),
	            ...(this.config.quoteEmail ? { quoteEmail: this.config.quoteEmail } : {}),
	            ...(this.config.supportEmail ? { supportEmail: this.config.supportEmail } : {}),
	        };
	        const response = await fetch(url, {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json',
	            },
	            body: JSON.stringify(this.withStorePayload(payload)),
	        });
	        if (!response.ok) {
	            let errorMessage = `Failed to submit quote request: ${response.statusText}`;
	            try {
	                const errorData = await response.json();
	                console.warn('ModlyAI quote request error response:', errorData);
	                if (errorData?.reason === 'validation_failed') {
	                    errorMessage = errorData.message || 'Please check your contact details and try again.';
	                }
	                else if (errorData?.reason === 'missing_destination') {
	                    errorMessage = errorData.message || 'Quote delivery is not configured for this store.';
	                }
	                else if (errorData?.reason === 'instantdb_save_failed') {
	                    errorMessage = errorData.message || 'We could not save the quote request. Please try again.';
	                }
	                else if (errorData?.reason === 'email_send_failed') {
	                    errorMessage = errorData.message || 'We could not deliver the quote request email. Please try again.';
	                }
	                else if (errorData?.error) {
	                    errorMessage = errorData.message || errorData.error;
	                }
	            }
	            catch (e) {
	                // If the error response is not JSON, keep the status text fallback.
	            }
	            const error = new Error(errorMessage);
	            this.config.onError?.(error);
	            throw error;
	        }
	        return await response.json();
	    }
	    async getRecommendations(request) {
	        const endpoint = this.config.apiEndpoints?.recommendationsMatch || '/api/recommendations/match';
	        const url = this.getEndpoint(endpoint);
	        const response = await fetch(url, {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json',
	            },
	            body: JSON.stringify(this.withStorePayload(request)),
	        });
	        if (!response.ok) {
	            const errorData = await this.readErrorResponse(response);
	            const error = new Error(this.getFriendlyApiError(response, errorData, `Failed to get recommendations: ${response.statusText}`));
	            this.config.onError?.(error);
	            throw error;
	        }
	        return await response.json();
	    }
	    async addToCart(item) {
	        const endpoint = this.config.apiEndpoints?.cartAdd || '/api/cart/add';
	        const url = this.getEndpoint(endpoint);
	        const response = await fetch(url, {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json',
	            },
	            body: JSON.stringify(this.withStorePayload(item)),
	        });
	        if (!response.ok) {
	            const error = new Error(`Failed to add to cart: ${response.statusText}`);
	            this.config.onError?.(error);
	            throw error;
	        }
	        return await response.json();
	    }
	}

	class Storage {
	    constructor(key = 'modly-customized-furniture') {
	        this.key = key;
	    }
	    saveCustomizedFurniture(item) {
	        const items = this.getCustomizedFurniture();
	        const newItem = {
	            ...item,
	            id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
	            savedAt: new Date().toISOString(),
	        };
	        items.push(newItem);
	        try {
	            if (typeof window !== 'undefined') {
	                localStorage.setItem(this.key, JSON.stringify(items));
	            }
	            return newItem;
	        }
	        catch (error) {
	            console.error('Failed to save customized furniture:', error);
	            throw error;
	        }
	    }
	    getCustomizedFurniture() {
	        if (typeof window === 'undefined') {
	            return [];
	        }
	        try {
	            const stored = localStorage.getItem(this.key);
	            if (!stored) {
	                return [];
	            }
	            return JSON.parse(stored);
	        }
	        catch (error) {
	            console.error('Failed to load customized furniture:', error);
	            return [];
	        }
	    }
	    removeCustomizedFurniture(id) {
	        const items = this.getCustomizedFurniture();
	        const filtered = items.filter(item => item.id !== id);
	        try {
	            if (typeof window !== 'undefined') {
	                localStorage.setItem(this.key, JSON.stringify(filtered));
	            }
	            return true;
	        }
	        catch (error) {
	            console.error('Failed to remove customized furniture:', error);
	            return false;
	        }
	    }
	    clearCustomizedFurniture() {
	        try {
	            if (typeof window !== 'undefined') {
	                localStorage.removeItem(this.key);
	            }
	            return true;
	        }
	        catch (error) {
	            console.error('Failed to clear customized furniture:', error);
	            return false;
	        }
	    }
	}

	const WidgetContext = reactExports.createContext(null);
	function WidgetProvider({ children, apiClient, storage, config }) {
	    return (jsxRuntimeExports.jsx(WidgetContext.Provider, { value: { apiClient, storage, config }, children: children }));
	}
	function useWidgetContext() {
	    const context = reactExports.useContext(WidgetContext);
	    if (!context) {
	        throw new Error('useWidgetContext must be used within WidgetProvider');
	    }
	    return context;
	}

	const formatCurrency$3 = (value, prefix = '') => typeof value === 'number' && Number.isFinite(value)
	    ? `${prefix}$${value.toLocaleString()}`
	    : undefined;
	const formatChoiceName = (value) => typeof value === 'string' ? value : value?.name;
	const formatDimension$1 = (value) => typeof value === 'number' && Number.isFinite(value) ? `${value.toFixed(2)} m` : undefined;
	const uniqueByName = (values) => {
	    const seen = new Set();
	    return values.filter((value) => {
	        const key = value.name.trim().toLowerCase();
	        if (!key || seen.has(key))
	            return false;
	        seen.add(key);
	        return true;
	    });
	};
	function CustomizedFurnitureList({ items, onItemRemoved, onNavigateToCustomizer, onRequestQuote, }) {
	    const { storage } = useWidgetContext();
	    const [removingId, setRemovingId] = reactExports.useState(null);
	    const [imageErrors, setImageErrors] = reactExports.useState(() => new Set());
	    const handleRemove = async (id) => {
	        if (!confirm('Are you sure you want to remove this customized furniture item?')) {
	            return;
	        }
	        setRemovingId(id);
	        try {
	            storage.removeCustomizedFurniture(id);
	            onItemRemoved?.();
	        }
	        catch (error) {
	            console.error('Failed to remove item:', error);
	        }
	        finally {
	            setRemovingId(null);
	        }
	    };
	    const handleNavigateToCustomizer = () => {
	        if (onNavigateToCustomizer) {
	            onNavigateToCustomizer();
	            return;
	        }
	        window.dispatchEvent(new CustomEvent('modly:navigate-to-customizer'));
	    };
	    if (items.length === 0) {
	        return (jsxRuntimeExports.jsxs("div", { className: "text-center py-12 relative", children: [jsxRuntimeExports.jsx("div", { className: "mb-4", children: jsxRuntimeExports.jsx("svg", { className: "w-16 h-16 mx-auto text-text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }) }) }), jsxRuntimeExports.jsx("p", { className: "text-lg text-text-primary mb-2", children: "No customized furniture yet" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-text-muted mb-4", children: "Customize furniture in the Customizer to see your creations here" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleNavigateToCustomizer, className: "px-6 py-3 bg-earth-forest text-white rounded-xl font-semibold hover:bg-earth-forest/90 transition-all duration-300 cursor-pointer relative z-10", children: "Go to Customizer" })] }));
	    }
	    return (jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-950", children: "My Customized Furniture" }), jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-gray-500", children: [items.length, " saved custom design", items.length === 1 ? '' : 's'] })] }), jsxRuntimeExports.jsx("div", { className: ['grid grid-cols-1 gap-5', items.length === 1 ? 'mx-auto max-w-md' : 'sm:grid-cols-2 xl:grid-cols-3'].join(' '), children: items.map((item) => {
	                    const imageUrl = item.imageUrl?.trim();
	                    const canShowImage = Boolean(imageUrl && !imageErrors.has(item.id));
	                    const productName = item.productName || item.name;
	                    const category = item.category || item.baseItemType;
	                    const selectedColor = formatChoiceName(item.selectedColor) || item.colorScheme.primary;
	                    const selectedMaterial = formatChoiceName(item.selectedMaterial) || item.materials.primary;
	                    const addOns = uniqueByName(item.selectedAddOns ??
	                        item.ornamentDetails?.map((name) => ({ name })) ??
	                        []);
	                    const shopifyOptions = (item.selectedShopifyOptions ?? []).filter((option) => option.name.trim() && option.value.trim());
	                    const dimensionRows = [
	                        ['Length', formatDimension$1(item.dimensions.length)],
	                        ['Width', formatDimension$1(item.dimensions.width)],
	                        ['Height', formatDimension$1(item.dimensions.height)],
	                    ].filter((row) => Boolean(row[1]));
	                    const basePrice = formatCurrency$3(item.basePrice ?? item.price);
	                    const customizationPrice = formatCurrency$3(item.customizationPrice, '+');
	                    const estimatedTotal = formatCurrency$3(item.estimatedTotal);
	                    return (jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)]", children: [jsxRuntimeExports.jsxs("div", { className: "relative p-3 pb-0", children: [jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 bg-gray-50", children: canShowImage ? (jsxRuntimeExports.jsx("img", { src: imageUrl, alt: productName, className: "h-full w-full object-cover", onError: () => setImageErrors((prev) => {
	                                                const next = new Set(prev);
	                                                next.add(item.id);
	                                                return next;
	                                            }) })) : (jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-stone-100 text-gray-300", children: jsxRuntimeExports.jsx("svg", { className: "h-12 w-12", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) })) }), jsxRuntimeExports.jsx("span", { className: "absolute right-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200", children: "Custom" })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-5", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold leading-tight text-gray-950", children: productName }), jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500", children: [category && jsxRuntimeExports.jsx("span", { className: "capitalize", children: category }), category && jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "/" }), jsxRuntimeExports.jsxs("span", { children: ["Saved ", new Date(item.savedAt).toLocaleDateString()] })] })] }), dimensionRows.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gray-200 bg-gray-50 p-3", children: [jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase text-gray-500", children: "Dimensions" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: dimensionRows.map(([label, value]) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gray-500", children: label }), jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-950", children: value })] }, label))) })] })), (selectedColor || selectedMaterial || addOns.length > 0) && (jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [selectedColor && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase text-gray-500", children: "Color" }), jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900", children: selectedColor })] })), selectedMaterial && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase text-gray-500", children: "Material" }), jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-medium text-stone-900", children: selectedMaterial })] })), addOns.length > 0 && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase text-gray-500", children: "Add-ons" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: addOns.map((addOn) => (jsxRuntimeExports.jsx("span", { className: "rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900", children: addOn.name }, addOn.name))) })] }))] })), shopifyOptions.length > 0 && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase text-gray-500", children: "Options" }), jsxRuntimeExports.jsx("div", { className: "space-y-2 rounded-xl border border-gray-200 p-3", children: shopifyOptions.map((option) => (jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 text-sm", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: option.name }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: option.value })] }, `${option.name}-${option.value}`))) })] })), (basePrice || customizationPrice || estimatedTotal || item.pricingMode === 'quote_required') && (jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm", children: [basePrice && (jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Base price" }), jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-950", children: basePrice })] })), customizationPrice && (jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Customizations" }), jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-950", children: customizationPrice })] })), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-t border-gray-200 pt-2", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-700", children: "Estimated total" }), jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-950", children: item.pricingMode === 'quote_required' ? 'Quote required' : estimatedTotal ?? 'Quote required' })] })] })), item.customerRequestText?.trim() && (jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-amber-200 bg-amber-50 p-3", children: [jsxRuntimeExports.jsx("p", { className: "mb-1 text-xs font-semibold uppercase text-amber-800", children: "Request" }), jsxRuntimeExports.jsx("p", { className: "line-clamp-3 text-sm text-amber-950", children: item.customerRequestText })] })), jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-t border-gray-100 pt-4", children: [onRequestQuote && (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onRequestQuote(item), className: "w-full rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800", children: "Request Quote" })), jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [item.productUrl && (jsxRuntimeExports.jsx("a", { href: item.productUrl, target: "_blank", rel: "noreferrer", className: "flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50", children: "View in Catalog" })), jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleRemove(item.id), disabled: removingId === item.id, className: "flex-1 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50", children: removingId === item.id ? 'Removing...' : 'Remove' })] })] })] })] }, item.id));
	                }) })] }));
	}

	/**
	 * Extracts color palette from the parent website by analyzing computed styles
	 * of the body and root elements
	 */
	function useWebsiteColors() {
	    const [colors, setColors] = reactExports.useState({
	        primary: '#3D543F', // Default fallback
	        secondary: '#8DA38E',
	        background: '#FFFFFF',
	        text: '#1A1C19',
	        accent: '#8DA38E',
	        border: '#E5E7EB',
	    });
	    reactExports.useEffect(() => {
	        const extractColors = () => {
	            try {
	                // Try to get parent document (if in iframe), fallback to current document
	                let doc;
	                let body;
	                let root;
	                try {
	                    // Check if we can access parent document (for iframe scenarios)
	                    if (window.parent && window.parent !== window && window.parent.document) {
	                        doc = window.parent.document;
	                    }
	                    else {
	                        doc = document;
	                    }
	                    body = doc.body;
	                    root = doc.documentElement;
	                }
	                catch (e) {
	                    // CORS or security restriction - use current document
	                    doc = document;
	                    body = doc.body;
	                    root = doc.documentElement;
	                }
	                // Helper to get computed color value from CSS variables or computed styles
	                const getComputedColor = (element, property, fallback) => {
	                    try {
	                        const computed = window.getComputedStyle(element);
	                        // Try CSS custom properties first
	                        const cssVar = computed.getPropertyValue(`--${property}`).trim();
	                        if (cssVar)
	                            return cssVar;
	                        // Try direct property
	                        const direct = computed.getPropertyValue(property).trim();
	                        if (direct)
	                            return direct;
	                        return fallback || '';
	                    }
	                    catch (e) {
	                        return fallback || '';
	                    }
	                };
	                // Helper to convert any color format to hex
	                const toHex = (color) => {
	                    if (!color || color.trim() === '')
	                        return '';
	                    // Already hex
	                    if (color.startsWith('#')) {
	                        return color.length === 4
	                            ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
	                            : color;
	                    }
	                    // Handle rgb/rgba
	                    const rgbMatch = color.match(/\d+/g);
	                    if (rgbMatch && rgbMatch.length >= 3) {
	                        const r = parseInt(rgbMatch[0]).toString(16).padStart(2, '0');
	                        const g = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
	                        const b = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
	                        return `#${r}${g}${b}`;
	                    }
	                    // Handle named colors (basic set)
	                    const namedColors = {
	                        'white': '#FFFFFF',
	                        'black': '#000000',
	                        'red': '#FF0000',
	                        'green': '#008000',
	                        'blue': '#0000FF',
	                        'yellow': '#FFFF00',
	                        'orange': '#FFA500',
	                        'purple': '#800080',
	                        'pink': '#FFC0CB',
	                        'gray': '#808080',
	                        'grey': '#808080',
	                    };
	                    const lowerColor = color.toLowerCase().trim();
	                    if (namedColors[lowerColor]) {
	                        return namedColors[lowerColor];
	                    }
	                    return color;
	                };
	                // Try to extract primary color from links and buttons (common UI elements)
	                const getElementColor = (selector, property = 'color') => {
	                    try {
	                        const element = doc.querySelector(selector);
	                        if (element) {
	                            const computed = window.getComputedStyle(element);
	                            return computed.getPropertyValue(property).trim();
	                        }
	                    }
	                    catch (e) {
	                        // Ignore errors
	                    }
	                    return '';
	                };
	                // Extract primary color - try multiple sources
	                const primary = getComputedColor(root, 'primary-color') ||
	                    getComputedColor(root, 'color-primary') ||
	                    getComputedColor(root, 'brand-color') ||
	                    getComputedColor(root, 'theme-color') ||
	                    getElementColor('a', 'color') || // Try link color
	                    getElementColor('button', 'background-color') || // Try button background
	                    getElementColor('[class*="primary"]', 'background-color') || // Try elements with "primary" in class
	                    getComputedColor(body, 'color') ||
	                    '#3D543F';
	                // Extract background color
	                const background = getComputedColor(root, 'background-color') ||
	                    getComputedColor(root, 'bg-color') ||
	                    getComputedColor(body, 'background-color') ||
	                    '#FFFFFF';
	                // Extract text color
	                const text = getComputedColor(root, 'text-color') ||
	                    getComputedColor(root, 'color-text') ||
	                    getComputedColor(body, 'color') ||
	                    '#1A1C19';
	                // Extract accent color
	                const accent = getComputedColor(root, 'accent-color') ||
	                    getComputedColor(root, 'color-accent') ||
	                    getComputedColor(root, 'secondary-color') ||
	                    primary;
	                // Extract secondary color
	                const secondary = getComputedColor(root, 'secondary-color') ||
	                    getComputedColor(root, 'color-secondary') ||
	                    accent;
	                // Extract border color
	                const border = getComputedColor(root, 'border-color') ||
	                    getComputedColor(root, 'color-border') ||
	                    getComputedColor(body, 'border-color') ||
	                    '#E5E7EB';
	                return {
	                    primary: toHex(primary) || '#3D543F',
	                    secondary: toHex(secondary) || '#8DA38E',
	                    background: toHex(background) || '#FFFFFF',
	                    text: toHex(text) || '#1A1C19',
	                    accent: toHex(accent) || '#8DA38E',
	                    border: toHex(border) || '#E5E7EB',
	                };
	            }
	            catch (error) {
	                console.warn('Failed to extract website colors:', error);
	                // Return defaults
	                return {
	                    primary: '#3D543F',
	                    secondary: '#8DA38E',
	                    background: '#FFFFFF',
	                    text: '#1A1C19',
	                    accent: '#8DA38E',
	                    border: '#E5E7EB',
	                };
	            }
	        };
	        // Extract colors on mount and when window resizes (in case styles change)
	        setColors(extractColors());
	        const handleResize = () => {
	            setColors(extractColors());
	        };
	        window.addEventListener('resize', handleResize);
	        // Also try to observe style changes if MutationObserver is available
	        let observer = null;
	        try {
	            const doc = window.parent?.document || document;
	            observer = new MutationObserver(() => {
	                setColors(extractColors());
	            });
	            observer.observe(doc.documentElement, {
	                attributes: true,
	                attributeFilter: ['style', 'class'],
	            });
	        }
	        catch (e) {
	            // MutationObserver not supported or failed
	        }
	        return () => {
	            window.removeEventListener('resize', handleResize);
	            if (observer) {
	                observer.disconnect();
	            }
	        };
	    }, []);
	    return colors;
	}

	const formatCurrency$2 = (value) => typeof value === 'number' && Number.isFinite(value) ? `$${value.toLocaleString()}` : undefined;
	const formatDimension = (value) => typeof value === 'number' && Number.isFinite(value) ? `${value.toFixed(3).replace(/\.?0+$/, '')}m` : undefined;
	const formatFitScore$1 = (value) => {
	    if (typeof value !== 'number' || !Number.isFinite(value))
	        return undefined;
	    return `${Math.round(value <= 1 ? value * 100 : value)}%`;
	};
	const getEstimatedTotalLabel = (displayItem) => {
	    if (displayItem.pricingMode === 'quote_required')
	        return 'Quote required';
	    return (formatCurrency$2(displayItem.estimatedTotal) ||
	        formatCurrency$2(displayItem.basePrice) ||
	        formatCurrency$2(displayItem.price) ||
	        'Quote required');
	};
	const uniqueValues = (values) => Array.from(new Set(values.map((value) => value?.trim()).filter((value) => Boolean(value))));
	function FinalizeQuoteModal({ isOpen, onClose, onProceed, item, recommendation, roomDimensions, roomAnalysis, }) {
	    const websiteColors = useWebsiteColors();
	    const [inlineError, setInlineError] = reactExports.useState(null);
	    if (!isOpen)
	        return null;
	    const displayItem = item || (recommendation ? {
	        name: recommendation.item.name,
	        category: recommendation.item.category,
	        imageUrl: recommendation.item.images?.find((image) => image?.trim()),
	        dimensions: recommendation.item.dimensions,
	        materials: recommendation.item.materials,
	        colorScheme: {
	            primary: recommendation.item.colors.main,
	            secondary: recommendation.item.colors.accent,
	            accent: undefined,
	        },
	        aiNotes: recommendation.reasoning,
	        placement: recommendation.placement,
	        price: recommendation.item.priceRange?.min ?? recommendation.item.price,
	        estimatedTotal: recommendation.item.priceRange?.min ?? recommendation.item.price,
	        pricingMode: (recommendation.item.priceRange?.min ?? recommendation.item.price) ? 'estimated' : 'quote_required',
	        matchScore: recommendation.matchScore,
	    } : null);
	    const fitScore = formatFitScore$1(recommendation?.matchScore);
	    const estimatedTotal = displayItem ? getEstimatedTotalLabel(displayItem) : 'Quote required';
	    const materialChips = displayItem
	        ? uniqueValues([
	            displayItem.materials?.primary,
	            displayItem.materials?.secondary,
	            displayItem.materials?.upholstery,
	            displayItem.materials?.legs,
	        ])
	        : [];
	    const roomColorChips = uniqueValues([
	        displayItem?.colorScheme?.primary ? `Primary: ${displayItem.colorScheme.primary}` : undefined,
	        displayItem?.colorScheme?.secondary ? `Secondary: ${displayItem.colorScheme.secondary}` : undefined,
	        displayItem?.colorScheme?.accent ? `Accent: ${displayItem.colorScheme.accent}` : undefined,
	        ...(roomAnalysis?.dominantColors?.slice(0, 3).map((color) => `Room: ${color}`) ?? []),
	    ]);
	    const placementText = recommendation?.placement?.reasoning || recommendation?.placement?.position;
	    const hasProduct = Boolean(displayItem);
	    const handleProceed = () => {
	        if (!hasProduct) {
	            setInlineError('Select a product before requesting a quote.');
	            return;
	        }
	        setInlineError(null);
	        onProceed();
	    };
	    return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4 backdrop-blur-sm", children: jsxRuntimeExports.jsxs("div", { className: "flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-[#fffaf4] shadow-[0_28px_80px_rgba(15,23,42,0.22)]", children: [jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 border-b border-stone-200 bg-[#fffaf4]/95 px-6 py-5 backdrop-blur", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-950", children: "Request quote" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-6 text-gray-600", children: "Review this room recommendation before sending it to the store." })] }), jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-gray-500 transition hover:bg-stone-50 hover:text-gray-900", "aria-label": "Close quote review", children: jsxRuntimeExports.jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }) }), jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto px-6 py-6", children: [!displayItem ? (jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700", children: "Select a product before requesting a quote." })) : (jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-stone-200 bg-white p-4 shadow-sm", children: jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [jsxRuntimeExports.jsx("div", { className: "h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-stone-100", children: displayItem.imageUrl ? (jsxRuntimeExports.jsx("img", { src: displayItem.imageUrl, alt: displayItem.name, className: "h-full w-full object-cover" })) : (jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-stone-400", children: jsxRuntimeExports.jsx("svg", { className: "h-8 w-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.8, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M4 6h16v12H4z" }) }) })) }), jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-gray-500", children: displayItem.category || roomDimensions?.roomType || 'Room recommendation' }), jsxRuntimeExports.jsx("h3", { className: "mt-1 text-xl font-bold leading-tight text-gray-950", children: displayItem.name }), jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [fitScore && (jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700", children: ["Room fit score: ", fitScore] })), jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-900", children: ["Estimated total: ", estimatedTotal] })] })] })] }) }), jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-gray-950", children: "Room fit summary" }), jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-4 text-sm", children: [recommendation?.reasoning && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: "Why it fits" }), jsxRuntimeExports.jsx("p", { className: "mt-1 leading-6 text-gray-700", children: recommendation.reasoning })] })), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: "Dimensions" }), jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-3 gap-2", children: [
	                                                                ['Length', formatDimension(displayItem.dimensions.length)],
	                                                                ['Width', formatDimension(displayItem.dimensions.width)],
	                                                                ['Height', formatDimension(displayItem.dimensions.height)],
	                                                            ].map(([label, value]) => (jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-stone-50 px-3 py-2", children: [jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: label }), jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-semibold text-gray-950", children: value || 'N/A' })] }, label))) })] }), placementText && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: "Placement" }), jsxRuntimeExports.jsx("p", { className: "mt-1 leading-6 text-gray-700", children: placementText })] }))] })] }), (materialChips.length > 0 || roomColorChips.length > 0) && (jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-gray-950", children: "Materials and colors" }), materialChips.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-gray-500", children: "Materials" }), jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: materialChips.map((material) => (jsxRuntimeExports.jsx("span", { className: "rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-medium text-gray-800", children: material }, material))) })] })), roomColorChips.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-gray-500", children: "Color scheme" }), jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: roomColorChips.map((color) => (jsxRuntimeExports.jsx("span", { className: "rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-950", children: color }, color))) })] }))] })), displayItem.aiNotes && (jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-indigo-950", children: "AI recommendation note" }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-gray-800", children: displayItem.aiNotes })] }))] })), inlineError && (jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700", children: inlineError }))] }), jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 flex flex-col-reverse gap-3 border-t border-stone-200 bg-[#fffaf4]/95 px-6 py-4 backdrop-blur sm:flex-row sm:justify-end", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50", children: "Back" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleProceed, className: "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-105", style: {
	                                backgroundImage: `linear-gradient(135deg, ${websiteColors.primary}, #7c3aed)`,
	                            }, children: "Continue to quote form" })] })] }) }));
	}

	const getCustomizationChoiceName = (value) => typeof value === 'string' ? value : value?.name;
	const formatCurrency$1 = (value) => typeof value === 'number' && Number.isFinite(value) ? `$${value.toLocaleString()}` : undefined;
	const formatChoice = (value) => {
	    const name = getCustomizationChoiceName(value);
	    if (!name)
	        return undefined;
	    const price = typeof value === 'object' ? value.price : undefined;
	    return price ? `${name} (+${formatCurrency$1(price)})` : name;
	};
	const formatDimensions$1 = (dimensions) => {
	    if (!dimensions)
	        return undefined;
	    const unit = dimensions.unit || 'm';
	    const rows = [
	        dimensions.length !== undefined ? `Length: ${dimensions.length} ${unit}` : undefined,
	        dimensions.width !== undefined ? `Width: ${dimensions.width} ${unit}` : undefined,
	        dimensions.height !== undefined ? `Height: ${dimensions.height} ${unit}` : undefined,
	    ].filter(Boolean);
	    return rows.length > 0 ? rows.join(' / ') : undefined;
	};
	const formatFitScore = (value) => {
	    if (typeof value !== 'number' || !Number.isFinite(value))
	        return undefined;
	    return `${Math.round(value <= 1 ? value * 100 : value)}%`;
	};
	const getFitScoreNumber = (value) => {
	    if (typeof value !== 'number' || !Number.isFinite(value))
	        return undefined;
	    return Math.round(value <= 1 ? value * 100 : value);
	};
	const getRoomTypeLabel = (value) => {
	    if (!value)
	        return undefined;
	    return value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
	};
	const emptyForm = {
	    name: '',
	    email: '',
	    phone: '',
	    notes: '',
	};
	function QuoteRequestForm({ isOpen, onClose, onSubmit, item, recommendation, storeId, widgetId, roomDimensions, roomAnalysis, }) {
	    const websiteColors = useWebsiteColors();
	    const [formData, setFormData] = reactExports.useState(emptyForm);
	    const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
	    const [error, setError] = reactExports.useState(null);
	    const [success, setSuccess] = reactExports.useState(null);
	    reactExports.useEffect(() => {
	        if (!isOpen) {
	            setFormData(emptyForm);
	            setError(null);
	            setSuccess(null);
	            setIsSubmitting(false);
	        }
	    }, [isOpen]);
	    reactExports.useEffect(() => {
	        if (!isOpen || !item?.customerRequestText?.trim())
	            return;
	        setFormData((prev) => (prev.notes.trim() ? prev : { ...prev, notes: item.customerRequestText?.trim() ?? '' }));
	    }, [isOpen, item?.customerRequestText, item?.id]);
	    if (!isOpen)
	        return null;
	    const displayItem = item || (recommendation ? {
	        productId: recommendation.item.id,
	        name: recommendation.item.name,
	        category: recommendation.item.category,
	        imageUrl: recommendation.item.images?.find((image) => image?.trim()),
	        source: recommendation.item.source,
	        productUrl: recommendation.item.productUrl || recommendation.item.url,
	        price: recommendation.item.priceRange?.min ?? recommendation.item.price,
	        basePrice: recommendation.item.priceRange?.min ?? recommendation.item.price,
	        estimatedTotal: recommendation.item.priceRange?.min ?? recommendation.item.price,
	        pricingMode: (recommendation.item.priceRange?.min ?? recommendation.item.price) ? 'estimated' : 'quote_required',
	        externalId: recommendation.item.externalId,
	        shopifyProductId: recommendation.item.shopifyProductId,
	        storeId: recommendation.item.storeId || storeId,
	        widgetId,
	        dimensions: recommendation.item.dimensions,
	        materials: recommendation.item.materials,
	        colorScheme: {
	            primary: recommendation.item.colors.main,
	            secondary: recommendation.item.colors.accent,
	        },
	        aiNotes: recommendation.reasoning,
	        placement: recommendation.placement,
	        fitScore: getFitScoreNumber(recommendation.matchScore),
	        roomAnalysis: {
	            roomType: roomDimensions?.roomType,
	            detectedStyle: roomAnalysis?.detectedStyle,
	            dominantColors: roomAnalysis?.dominantColors,
	            freeSpaceDescription: roomAnalysis?.freeSpace?.description,
	            whyItFits: recommendation.reasoning,
	        },
	        roomDetails: roomDimensions ?? undefined,
	        placementNote: recommendation.placement?.reasoning,
	    } : null);
	    if (!displayItem)
	        return null;
	    const isRoomRecommendation = Boolean(recommendation && !item);
	    const productName = 'productName' in displayItem && displayItem.productName
	        ? displayItem.productName
	        : displayItem.name;
	    const selectedColor = 'selectedColor' in displayItem
	        ? formatChoice(displayItem.selectedColor)
	        : displayItem.colorScheme.primary;
	    const selectedMaterial = 'selectedMaterial' in displayItem
	        ? formatChoice(displayItem.selectedMaterial)
	        : displayItem.materials.primary;
	    const selectedDimensions = 'selectedDimensions' in displayItem && displayItem.selectedDimensions
	        ? formatDimensions$1(displayItem.selectedDimensions)
	        : formatDimensions$1(displayItem.dimensions);
	    const selectedAddOns = 'selectedAddOns' in displayItem
	        ? displayItem.selectedAddOns?.map((addOn) => addOn.price ? `${addOn.name} (+${formatCurrency$1(addOn.price)})` : addOn.name)
	        : undefined;
	    const selectedShopifyOptions = 'selectedShopifyOptions' in displayItem
	        ? displayItem.selectedShopifyOptions?.map((option) => option.price
	            ? `${option.name}: ${option.value} (+${formatCurrency$1(option.price)})`
	            : `${option.name}: ${option.value}`)
	        : undefined;
	    const estimatedTotal = 'pricingMode' in displayItem && displayItem.pricingMode === 'quote_required'
	        ? 'Quote required'
	        : 'estimatedTotal' in displayItem
	            ? formatCurrency$1(displayItem.estimatedTotal)
	            : formatCurrency$1(displayItem.price);
	    const customerRequestText = 'customerRequestText' in displayItem ? displayItem.customerRequestText : undefined;
	    const fitScore = isRoomRecommendation ? formatFitScore(recommendation?.matchScore) : undefined;
	    const roomTypeLabel = getRoomTypeLabel(roomDimensions?.roomType);
	    const whyItFits = isRoomRecommendation ? recommendation?.reasoning : undefined;
	    const placementNote = isRoomRecommendation ? recommendation?.placement?.reasoning : undefined;
	    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	    const isNameValid = formData.name.trim().length > 0;
	    const isEmailValid = emailRegex.test(formData.email.trim());
	    const canSubmit = isNameValid && isEmailValid && !isSubmitting;
	    const successWarning = success?.emailWarning ||
	        success?.warnings?.[0] ||
	        (success?.emailSkipped ? 'Quote saved. Email delivery may not be configured.' : undefined);
	    const handleClose = () => {
	        setFormData(emptyForm);
	        setError(null);
	        setSuccess(null);
	        setIsSubmitting(false);
	        onClose();
	    };
	    const handleSubmit = async (e) => {
	        e.preventDefault();
	        if (isSubmitting)
	            return;
	        setError(null);
	        if (!isNameValid) {
	            setError('Name is required.');
	            return;
	        }
	        if (!formData.email.trim()) {
	            setError('Email is required.');
	            return;
	        }
	        if (!isEmailValid) {
	            setError('Please enter a valid email address.');
	            return;
	        }
	        setIsSubmitting(true);
	        try {
	            const customization = 'selectedColor' in displayItem || 'selectedMaterial' in displayItem
	                ? {
	                    selectedColor: 'selectedColor' in displayItem ? displayItem.selectedColor : undefined,
	                    selectedMaterial: 'selectedMaterial' in displayItem ? displayItem.selectedMaterial : undefined,
	                    selectedShopifyOptions: 'selectedShopifyOptions' in displayItem ? displayItem.selectedShopifyOptions : undefined,
	                    selectedDimensions: 'selectedDimensions' in displayItem ? displayItem.selectedDimensions : undefined,
	                    dimensionPriceAdjustments: 'dimensionPriceAdjustments' in displayItem ? displayItem.dimensionPriceAdjustments : undefined,
	                    selectedAddOns: 'selectedAddOns' in displayItem ? displayItem.selectedAddOns : undefined,
	                    customizationPrice: 'customizationPrice' in displayItem ? displayItem.customizationPrice : undefined,
	                    estimatedTotal: 'estimatedTotal' in displayItem ? displayItem.estimatedTotal : undefined,
	                    pricingMode: 'pricingMode' in displayItem ? displayItem.pricingMode : undefined,
	                    customerRequestText: 'customerRequestText' in displayItem ? displayItem.customerRequestText : undefined,
	                }
	                : undefined;
	            const quoteRequest = {
	                storeId: displayItem.storeId || storeId,
	                widgetId: ('widgetId' in displayItem ? displayItem.widgetId : undefined) || widgetId,
	                source: isRoomRecommendation ? 'room_analysis_recommendation' : 'customized_furniture',
	                customer: {
	                    name: formData.name.trim(),
	                    email: formData.email.trim(),
	                    phone: formData.phone.trim() || undefined,
	                    message: formData.notes.trim() || undefined,
	                },
	                item: {
	                    productId: 'productId' in displayItem ? displayItem.productId : undefined,
	                    productName,
	                    category: 'category' in displayItem ? displayItem.category : undefined,
	                    productUrl: displayItem.productUrl,
	                    imageUrl: 'imageUrl' in displayItem ? displayItem.imageUrl : undefined,
	                    basePrice: 'basePrice' in displayItem ? displayItem.basePrice : displayItem.price,
	                    customizationPrice: 'customizationPrice' in displayItem ? displayItem.customizationPrice : undefined,
	                    estimatedTotal: 'estimatedTotal' in displayItem ? displayItem.estimatedTotal : displayItem.price,
	                    pricingMode: 'pricingMode' in displayItem ? displayItem.pricingMode : undefined,
	                    savedAt: 'savedAt' in displayItem ? displayItem.savedAt : undefined,
	                    name: productName,
	                    dimensions: {
	                        length: displayItem.dimensions.length,
	                        width: displayItem.dimensions.width,
	                        height: displayItem.dimensions.height,
	                    },
	                    materials: displayItem.materials,
	                    colorScheme: displayItem.colorScheme,
	                    price: displayItem.price,
	                    externalId: displayItem.externalId,
	                    shopifyProductId: displayItem.shopifyProductId,
	                    storeId: displayItem.storeId,
	                    widgetId: 'widgetId' in displayItem ? displayItem.widgetId : undefined,
	                    source: displayItem.source,
	                    aiNotes: displayItem.aiNotes,
	                    selectedColor: 'selectedColor' in displayItem
	                        ? displayItem.selectedColor
	                        : displayItem.colorScheme.primary,
	                    selectedColorPrice: 'selectedColorPrice' in displayItem ? displayItem.selectedColorPrice : undefined,
	                    selectedMaterial: 'selectedMaterial' in displayItem
	                        ? displayItem.selectedMaterial
	                        : displayItem.materials.primary,
	                    selectedMaterialPrice: 'selectedMaterialPrice' in displayItem ? displayItem.selectedMaterialPrice : undefined,
	                    selectedShopifyOptions: 'selectedShopifyOptions' in displayItem ? displayItem.selectedShopifyOptions : undefined,
	                    selectedDimensions: 'selectedDimensions' in displayItem ? displayItem.selectedDimensions : undefined,
	                    dimensionPriceAdjustments: 'dimensionPriceAdjustments' in displayItem ? displayItem.dimensionPriceAdjustments : undefined,
	                    selectedAddOns: 'selectedAddOns' in displayItem ? displayItem.selectedAddOns : undefined,
	                    customerRequestText: 'customerRequestText' in displayItem
	                        ? displayItem.customerRequestText
	                        : formData.notes.trim() || undefined,
	                    placement: 'placement' in displayItem && displayItem.placement ? {
	                        wall: displayItem.placement.wall,
	                        position: displayItem.placement.position,
	                        coordinates: displayItem.placement.coordinates,
	                        reasoning: displayItem.placement.reasoning,
	                    } : undefined,
	                    fitScore: 'fitScore' in displayItem ? displayItem.fitScore : undefined,
	                    placementNote: 'placementNote' in displayItem ? displayItem.placementNote : undefined,
	                    roomAnalysis: 'roomAnalysis' in displayItem ? displayItem.roomAnalysis : undefined,
	                    roomDetails: 'roomDetails' in displayItem ? displayItem.roomDetails : undefined,
	                },
	                customization: isRoomRecommendation ? undefined : customization,
	            };
	            const result = await onSubmit(quoteRequest);
	            setSuccess(result || { success: true });
	        }
	        catch (err) {
	            setError(err instanceof Error ? err.message : 'Failed to submit quote request.');
	        }
	        finally {
	            setIsSubmitting(false);
	        }
	    };
	    const handleChange = (e) => {
	        const { name, value } = e.target;
	        setFormData(prev => ({
	            ...prev,
	            [name]: value,
	        }));
	    };
	    return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4 backdrop-blur-sm", children: jsxRuntimeExports.jsxs("div", { className: "flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-[#fffaf4] shadow-[0_28px_80px_rgba(15,23,42,0.22)]", children: [jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 border-b border-stone-200 bg-[#fffaf4]/95 px-6 py-5 backdrop-blur", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-950", children: "Request quote" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-600", children: isRoomRecommendation
	                                            ? 'Send this room recommendation to the store.'
	                                            : 'Send this customized furniture request to the store.' })] }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleClose, className: "flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-gray-500 transition hover:bg-stone-50 hover:text-gray-900", "aria-label": "Close quote request", children: jsxRuntimeExports.jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }) }), success ? (jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto px-6 py-6", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900", children: [jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm", children: jsxRuntimeExports.jsx("svg", { className: "h-7 w-7", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-emerald-950", children: "Quote request sent" }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-emerald-800", children: "Quote request sent. The store will follow up with pricing and next steps." })] }), jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-gray-500", children: "Request summary" }), jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3 text-sm", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Product" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: productName })] }), estimatedTotal && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4 border-t border-stone-100 pt-3", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Estimated total" }), jsxRuntimeExports.jsx("span", { className: "text-right font-bold text-gray-950", children: estimatedTotal })] }))] })] }), successWarning && (jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900", children: successWarning })), jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: jsxRuntimeExports.jsx("button", { type: "button", onClick: handleClose, className: "rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-105", style: {
	                                    backgroundImage: `linear-gradient(135deg, ${websiteColors.primary}, #7c3aed)`,
	                                }, children: "Continue Browsing" }) })] })) : (jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex min-h-0 flex-1 flex-col", children: [jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto px-6 py-6", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-start justify-between gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-gray-500", children: isRoomRecommendation ? 'Room recommendation' : 'Customization summary' }), jsxRuntimeExports.jsx("h3", { className: "mt-1 text-lg font-bold leading-tight text-gray-950", children: productName }), isRoomRecommendation && (jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-semibold text-gray-600", children: "Request quote for room recommendation" }))] }), estimatedTotal && (jsxRuntimeExports.jsx("div", { className: "rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-900", children: estimatedTotal }))] }), jsxRuntimeExports.jsx("div", { className: "space-y-3 text-sm", children: isRoomRecommendation ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [roomTypeLabel && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Room type" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: roomTypeLabel })] })), fitScore && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Fit score" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: fitScore })] })), whyItFits && (jsxRuntimeExports.jsxs("div", { className: "border-t border-stone-100 pt-3", children: [jsxRuntimeExports.jsx("span", { className: "block text-gray-500", children: "Why it fits" }), jsxRuntimeExports.jsx("p", { className: "mt-1 leading-6 text-gray-800", children: whyItFits })] })), placementNote && (jsxRuntimeExports.jsxs("div", { className: "border-t border-stone-100 pt-3", children: [jsxRuntimeExports.jsx("span", { className: "block text-gray-500", children: "Placement note" }), jsxRuntimeExports.jsx("p", { className: "mt-1 leading-6 text-gray-800", children: placementNote })] })), estimatedTotal && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4 border-t border-stone-100 pt-3", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Estimated total" }), jsxRuntimeExports.jsx("span", { className: "text-right font-bold text-gray-950", children: estimatedTotal })] }))] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [selectedColor && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Color" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: selectedColor })] })), selectedMaterial && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Material" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: selectedMaterial })] })), selectedDimensions && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Dimensions" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: selectedDimensions })] })), selectedShopifyOptions && selectedShopifyOptions.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Options" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: selectedShopifyOptions.join(', ') })] })), selectedAddOns && selectedAddOns.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Add-ons" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: selectedAddOns.join(', ') })] })), customerRequestText?.trim() && (jsxRuntimeExports.jsxs("div", { className: "border-t border-stone-100 pt-3", children: [jsxRuntimeExports.jsx("span", { className: "block text-gray-500", children: "Customizer request" }), jsxRuntimeExports.jsx("p", { className: "mt-1 rounded-xl bg-amber-50 p-3 text-gray-800", children: customerRequestText })] }))] })) })] }), error && (jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700", children: error })), jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { htmlFor: "quote-name", className: "block text-sm font-semibold text-gray-800", children: ["Name ", jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "text", id: "quote-name", name: "name", value: formData.name, onChange: handleChange, required: true, className: "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100", placeholder: "Your name", disabled: isSubmitting })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { htmlFor: "quote-email", className: "block text-sm font-semibold text-gray-800", children: ["Email ", jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "email", id: "quote-email", name: "email", value: formData.email, onChange: handleChange, required: true, className: "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100", placeholder: "you@example.com", disabled: isSubmitting })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [jsxRuntimeExports.jsxs("label", { htmlFor: "quote-phone", className: "block text-sm font-semibold text-gray-800", children: ["Phone ", jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-400", children: "(optional)" })] }), jsxRuntimeExports.jsx("input", { type: "tel", id: "quote-phone", name: "phone", value: formData.phone, onChange: handleChange, className: "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100", placeholder: "+1 (555) 123-4567", disabled: isSubmitting })] }), jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [jsxRuntimeExports.jsxs("label", { htmlFor: "quote-notes", className: "block text-sm font-semibold text-gray-800", children: ["Message / notes ", jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-400", children: "(optional)" })] }), jsxRuntimeExports.jsx("textarea", { id: "quote-notes", name: "notes", value: formData.notes, onChange: handleChange, rows: 4, className: "mt-2 w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100", placeholder: "Any special requests or questions...", disabled: isSubmitting })] })] }), jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 flex flex-col-reverse gap-3 border-t border-stone-200 bg-[#fffaf4]/95 px-6 py-4 backdrop-blur sm:flex-row sm:justify-end", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: handleClose, disabled: isSubmitting, className: "rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50", children: "Cancel" }), jsxRuntimeExports.jsx("button", { type: "submit", disabled: !canSubmit, className: "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50", style: {
	                                        backgroundImage: `linear-gradient(135deg, ${websiteColors.primary}, #7c3aed)`,
	                                    }, children: isSubmitting ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("svg", { className: "h-5 w-5 animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), jsxRuntimeExports.jsx("span", { children: "Submitting..." })] })) : ('Submit Quote Request') })] })] }))] }) }));
	}

	const PLACEHOLDER_HOSTS = new Set([
	    'yourstore.com',
	    'www.yourstore.com',
	    'example.com',
	    'www.example.com',
	    'example.org',
	    'www.example.org',
	    'example.net',
	    'www.example.net',
	    'test.com',
	    'www.test.com',
	    'demo.com',
	    'www.demo.com',
	    'placeholder.com',
	    'www.placeholder.com',
	]);
	const LOCAL_HOSTS = new Set([
	    'localhost',
	    '127.0.0.1',
	    '0.0.0.0',
	    '::1',
	]);
	function parseProductUrl(url) {
	    const trimmed = url.trim();
	    if (!trimmed)
	        return null;
	    try {
	        return new URL(trimmed);
	    }
	    catch {
	        try {
	            return new URL(`https://${trimmed}`);
	        }
	        catch {
	            return null;
	        }
	    }
	}
	function isRealProductUrl(url) {
	    if (!url)
	        return false;
	    const parsed = parseProductUrl(url);
	    if (!parsed)
	        return false;
	    if (!['http:', 'https:'].includes(parsed.protocol))
	        return false;
	    const hostname = parsed.hostname.toLowerCase();
	    if (!hostname || LOCAL_HOSTS.has(hostname) || PLACEHOLDER_HOSTS.has(hostname))
	        return false;
	    if (hostname.endsWith('.yourstore.com'))
	        return false;
	    if (hostname.endsWith('.example.com') || hostname.endsWith('.example.org') || hostname.endsWith('.example.net')) {
	        return false;
	    }
	    if (hostname.endsWith('.localhost'))
	        return false;
	    if (hostname.endsWith('.test') || hostname.endsWith('.example') || hostname.endsWith('.invalid'))
	        return false;
	    const fullUrl = parsed.href.toLowerCase();
	    return ![
	        'yourstore',
	        'example',
	        'placeholder',
	        'demo-only',
	        'fake-store',
	        'test-store',
	    ].some((marker) => fullUrl.includes(marker));
	}
	function getRealProductUrl(product) {
	    const productUrl = product.productUrl?.trim();
	    if (isRealProductUrl(productUrl))
	        return productUrl;
	    const url = product.url?.trim();
	    if (isRealProductUrl(url))
	        return url;
	    return undefined;
	}

	function getProductCatalogUrl$1(item) {
	    return getRealProductUrl(item);
	}
	function getProductImageUrl$1(item) {
	    return item.images?.find((image) => image?.trim()) ?? undefined;
	}
	function getPriceLabel(item) {
	    if (typeof item.price === 'number') {
	        return `$${item.price.toLocaleString()}`;
	    }
	    if (!item.priceRange)
	        return 'Price on request';
	    const min = item.priceRange.min;
	    const max = item.priceRange.max;
	    if (max && max !== min) {
	        return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
	    }
	    return `$${min.toLocaleString()}`;
	}
	function getDimensionLabel(item) {
	    const { length, width, height } = item.dimensions;
	    if (!length || !width || !height)
	        return null;
	    return `${length}m L x ${width}m W x ${height}m H`;
	}
	function RecommendationsList({ recommendations, onCustomize, onFinalize, enabledActions, primaryColor, analyticsContext }) {
	    const actions = enabledActions ?? { viewInCatalog: true, customize: true, requestQuote: true };
	    const primaryTextColor = primaryColor ? getReadableTextColor(primaryColor) : undefined;
	    if (recommendations.length === 0) {
	        return (jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-500", children: jsxRuntimeExports.jsx("p", { className: "text-lg", children: "No recommendations available yet." }) }));
	    }
	    return (jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-950", children: "Matching catalog products" }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-gray-600", children: "Suggestions are based on the uploaded room photo, your preferences, and available catalog data." })] }), jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: recommendations.map((rec, index) => {
	                    const catalogUrl = getProductCatalogUrl$1(rec.item);
	                    const imageUrl = getProductImageUrl$1(rec.item);
	                    const dimensionLabel = getDimensionLabel(rec.item);
	                    const priceLabel = getPriceLabel(rec.item);
	                    const handleViewInCatalogClick = (event) => {
	                        event.preventDefault();
	                        event.stopPropagation();
	                        if (!catalogUrl || typeof window === 'undefined')
	                            return;
	                        trackWidgetEvent({
	                            ...analyticsContext,
	                            type: 'view_in_catalog_clicked',
	                            productId: rec.item.id,
	                            productName: rec.item.name,
	                            metadata: {
	                                source: 'room_planner',
	                                category: rec.item.category,
	                                productUrl: catalogUrl,
	                            },
	                        });
	                        window.open(catalogUrl, '_blank', 'noopener,noreferrer');
	                    };
	                    return (jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md", children: [jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-stone-100", children: imageUrl ? (jsxRuntimeExports.jsx("img", { src: imageUrl, alt: rec.item.name, className: "h-full w-full object-cover" })) : (jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-stone-100 to-stone-50 text-stone-400", children: jsxRuntimeExports.jsx(Image, { className: "h-10 w-10" }) })) }), jsxRuntimeExports.jsxs("div", { className: "p-5", children: [jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-start justify-between gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold leading-tight text-gray-950", children: rec.item.name }), jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-gray-500", children: [rec.item.category, " ", rec.item.subCategory && `- ${rec.item.subCategory}`] })] }), rec.matchScore && (jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-sm px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium", children: [Math.round(rec.matchScore * 100), "% match"] }))] }), jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-gray-900", children: priceLabel }), dimensionLabel && (jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-gray-600", children: [jsxRuntimeExports.jsx(Ruler, { className: "h-3.5 w-3.5" }), dimensionLabel] }))] }), rec.item.styleTags && rec.item.styleTags.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mb-4 flex flex-wrap gap-2", children: rec.item.styleTags.map((tag, i) => (jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium", children: tag }, i))) })), rec.placement && (jsxRuntimeExports.jsxs("div", { className: "mb-4 rounded-xl border border-stone-200 bg-stone-50 p-3", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold mb-2 text-gray-800", children: "Placement notes" }), rec.placement.coordinates && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-gray-800", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Position: " }), "(", rec.placement.coordinates.x.toFixed(2), "m, ", rec.placement.coordinates.y.toFixed(2), "m)", jsxRuntimeExports.jsx("span", { className: "ml-2 text-gray-500", children: "from southwest corner" })] })), rec.placement.distanceFromWalls && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs space-y-1 text-gray-800", children: [jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1", children: "Distance from walls:" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1", children: [rec.placement.distanceFromWalls.north !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["North: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.north.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.south !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["South: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.south.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.east !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["East: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.east.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.west !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["West: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.west.toFixed(2), "m"] })] }))] })] })), rec.placement.rotation !== undefined && rec.placement.rotation !== 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-gray-800", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Rotation: " }), rec.placement.rotation, " deg"] })), (rec.placement.wall || rec.placement.position) && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-gray-800", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Location: " }), rec.placement.position || (rec.placement.wall ? `Against ${rec.placement.wall} wall` : 'Centered')] })), jsxRuntimeExports.jsx("p", { className: "text-sm mt-2 pt-2 border-t border-gray-200 text-gray-800", children: rec.placement.reasoning })] })), jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-blue-100 bg-blue-50/70 p-3", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold mb-1 text-blue-950", children: "Why it fits" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-800", children: rec.reasoning })] }), jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 border-t border-stone-200 pt-4", children: [actions.customize && onCustomize && (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onCustomize(rec.item), className: "w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2", style: primaryColor ? { borderColor: primaryColor, color: primaryColor } : undefined, children: [jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }), "Customize this"] })), actions.viewInCatalog && catalogUrl ? (jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleViewInCatalogClick, className: "w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }), "View in Catalog"] })) : actions.viewInCatalog ? (jsxRuntimeExports.jsx("button", { type: "button", disabled: true, className: "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-gray-200 bg-gray-50 text-gray-400 flex items-center justify-center gap-2 cursor-not-allowed", children: "Catalog link unavailable" })) : null, actions.requestQuote && onFinalize && (jsxRuntimeExports.jsxs("button", { type: "button", onClick: (event) => {
	                                                    event.preventDefault();
	                                                    event.stopPropagation();
	                                                    onFinalize(rec);
	                                                }, className: "w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 text-white flex items-center justify-center gap-2", style: {
	                                                    backgroundColor: primaryColor || '#10B981',
	                                                    color: primaryColor ? primaryTextColor : '#ffffff',
	                                                }, children: [jsxRuntimeExports.jsx(MessageSquareQuote, { className: "h-4 w-4" }), "Request Quote"] }))] })] })] }, rec.item.id || index));
	                }) })] }));
	}

	const STORAGE_KEY$1 = 'modly-room-planner-state';
	const FEET_PER_METER = 3.28084;
	const styleOptions = [
	    { id: 'modern', label: 'Modern', Icon: Sparkles, tone: 'from-slate-50 to-white' },
	    { id: 'scandi', label: 'Scandi', Icon: Lamp, tone: 'from-stone-50 to-white' },
	    { id: 'industrial', label: 'Industrial', Icon: Warehouse, tone: 'from-zinc-50 to-white' },
	    { id: 'boho', label: 'Boho', Icon: Flower2, tone: 'from-amber-50 to-white' },
	];
	const roomSizePresets = [
	    { id: 'small', label: 'Small', dimensions: { length: 3.2, width: 3, height: 2.4 } },
	    { id: 'medium', label: 'Medium', dimensions: { length: 4.6, width: 3.8, height: 2.6 } },
	    { id: 'large', label: 'Large', dimensions: { length: 6.2, width: 4.8, height: 2.8 } },
	];
	const trustItems = [
	    'Room size and layout',
	    'Preferred style',
	    'Budget range',
	    'Product dimensions',
	    'Catalog availability',
	];
	async function base64ToFile(base64, filename) {
	    const response = await fetch(base64);
	    const blob = await response.blob();
	    return new File([blob], filename, { type: blob.type });
	}
	function formatDimensionForUnit(valueMeters, unitSystem) {
	    if (!valueMeters || valueMeters <= 0)
	        return '';
	    const value = unitSystem === 'meters' ? valueMeters : valueMeters * FEET_PER_METER;
	    return value.toFixed(1).replace(/\.0$/, '');
	}
	function parseDimensionToMeters(value, unitSystem) {
	    const numericValue = Number(value);
	    if (!numericValue || numericValue <= 0)
	        return 0;
	    return unitSystem === 'meters' ? numericValue : numericValue / FEET_PER_METER;
	}
	function FurnitureRoomPlannerWidget({ config = {}, onCustomizeItem, onNavigateToCustomizer, }) {
	    const mergedConfig = reactExports.useMemo(() => mergeConfig(config), [config]);
	    const apiClient = reactExports.useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
	    const storage = reactExports.useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
	    const enabledActions = reactExports.useMemo(() => getEnabledActions(mergedConfig), [mergedConfig]);
	    const analyticsContext = reactExports.useMemo(() => ({
	        apiBaseUrl: mergedConfig.apiBaseUrl,
	        storeId: mergedConfig.storeId || mergedConfig.widgetId,
	        widgetId: mergedConfig.widgetId,
	    }), [mergedConfig.apiBaseUrl, mergedConfig.storeId, mergedConfig.widgetId]);
	    const primaryColor = getPrimaryColor(mergedConfig);
	    const [recommendations, setRecommendations] = reactExports.useState(null);
	    const [isLoading, setIsLoading] = reactExports.useState(false);
	    const [error, setError] = reactExports.useState(null);
	    const [shareMessage, setShareMessage] = reactExports.useState(null);
	    const [resultsScrollRequest, setResultsScrollRequest] = reactExports.useState(0);
	    const [uploadedPhotos, setUploadedPhotos] = reactExports.useState([]);
	    const [customizedFurniture, setCustomizedFurniture] = reactExports.useState([]);
	    const [savedDimensions, setSavedDimensions] = reactExports.useState(undefined);
	    const [savedPreferences, setSavedPreferences] = reactExports.useState(undefined);
	    const [roomType, setRoomType] = reactExports.useState('living');
	    const [unitSystem, setUnitSystem] = reactExports.useState('meters');
	    const [lengthValue, setLengthValue] = reactExports.useState('');
	    const [widthValue, setWidthValue] = reactExports.useState('');
	    const [heightValue, setHeightValue] = reactExports.useState('2.4');
	    const [colorInput, setColorInput] = reactExports.useState('');
	    const [budgetMin, setBudgetMin] = reactExports.useState('');
	    const [budgetMax, setBudgetMax] = reactExports.useState('');
	    const [selectedStyles, setSelectedStyles] = reactExports.useState(['modern']);
	    const [showFinalizeModal, setShowFinalizeModal] = reactExports.useState(false);
	    const [showQuoteForm, setShowQuoteForm] = reactExports.useState(false);
	    const [quoteSuccess, setQuoteSuccess] = reactExports.useState(false);
	    const [selectedRecommendation, setSelectedRecommendation] = reactExports.useState(null);
	    const [selectedCustomizedItem, setSelectedCustomizedItem] = reactExports.useState(null);
	    const fileInputRef = reactExports.useRef(null);
	    const resultsRef = reactExports.useRef(null);
	    const lastScrolledRequestRef = reactExports.useRef(0);
	    reactExports.useEffect(() => {
	        trackWidgetEvent({
	            ...analyticsContext,
	            type: 'room_planner_opened',
	        });
	    }, [analyticsContext]);
	    reactExports.useEffect(() => {
	        try {
	            if (typeof window !== 'undefined') {
	                const saved = sessionStorage.getItem(STORAGE_KEY$1);
	                if (saved) {
	                    const state = JSON.parse(saved);
	                    if (state.uploadedPhotos?.length) {
	                        setUploadedPhotos(state.uploadedPhotos);
	                    }
	                    if (state.recommendations) {
	                        setRecommendations(state.recommendations);
	                    }
	                    if (state.lastDimensions) {
	                        setSavedDimensions(state.lastDimensions);
	                        setRoomType(state.lastDimensions.roomType);
	                        setLengthValue(formatDimensionForUnit(state.lastDimensions.length, 'meters'));
	                        setWidthValue(formatDimensionForUnit(state.lastDimensions.width, 'meters'));
	                        setHeightValue(formatDimensionForUnit(state.lastDimensions.height, 'meters'));
	                    }
	                    if (state.lastPreferences) {
	                        setSavedPreferences(state.lastPreferences);
	                        setSelectedStyles(state.lastPreferences.style?.length ? state.lastPreferences.style : ['modern']);
	                        setColorInput(state.lastPreferences.colors?.join(', ') || '');
	                        setBudgetMin(state.lastPreferences.budget?.min ? String(state.lastPreferences.budget.min) : '');
	                        setBudgetMax(state.lastPreferences.budget?.max ? String(state.lastPreferences.budget.max) : '');
	                    }
	                }
	            }
	        }
	        catch (e) {
	            console.warn('Failed to load persisted room planner state:', e);
	        }
	    }, []);
	    reactExports.useEffect(() => {
	        try {
	            if (typeof window !== 'undefined') {
	                const state = {
	                    uploadedPhotos,
	                    recommendations,
	                    lastDimensions: savedDimensions,
	                    lastPreferences: savedPreferences,
	                };
	                sessionStorage.setItem(STORAGE_KEY$1, JSON.stringify(state));
	            }
	        }
	        catch (e) {
	            console.warn('Failed to save room planner state:', e);
	        }
	    }, [uploadedPhotos, recommendations, savedDimensions, savedPreferences]);
	    reactExports.useEffect(() => {
	        const items = storage.getCustomizedFurniture();
	        setCustomizedFurniture(items);
	    }, [storage]);
	    reactExports.useEffect(() => {
	        if (resultsScrollRequest === 0 ||
	            lastScrolledRequestRef.current === resultsScrollRequest ||
	            !recommendations ||
	            isLoading) {
	            return;
	        }
	        const timer = window.setTimeout(() => {
	            resultsRef.current?.scrollIntoView({
	                behavior: 'smooth',
	                block: 'start',
	            });
	            lastScrolledRequestRef.current = resultsScrollRequest;
	        }, 100);
	        return () => window.clearTimeout(timer);
	    }, [isLoading, recommendations, resultsScrollRequest]);
	    const handleItemRemoved = () => {
	        const items = storage.getCustomizedFurniture();
	        setCustomizedFurniture(items);
	    };
	    const handleCustomize = (item) => {
	        if (!onCustomizeItem) {
	            trackWidgetEvent({
	                ...analyticsContext,
	                type: 'customize_clicked',
	                productId: item.id,
	                productName: item.name,
	                metadata: {
	                    source: 'room_planner',
	                    category: item.category,
	                },
	            });
	        }
	        if (typeof window !== 'undefined') {
	            sessionStorage.setItem('modly-customize-item', JSON.stringify(item));
	        }
	        if (onCustomizeItem) {
	            onCustomizeItem(item);
	        }
	        else if (typeof window !== 'undefined') {
	            window.dispatchEvent(new CustomEvent('modly:customize-item', { detail: item }));
	        }
	    };
	    const handleNavigateToCustomizer = () => {
	        if (onNavigateToCustomizer) {
	            onNavigateToCustomizer();
	        }
	        else {
	            window.dispatchEvent(new CustomEvent('modly:navigate-to-customizer'));
	        }
	    };
	    const handlePhotosChange = async (photos) => {
	        const photoPromises = photos.map((photo) => new Promise((resolve) => {
	            const reader = new FileReader();
	            reader.onloadend = () => resolve(reader.result);
	            reader.readAsDataURL(photo);
	        }));
	        const base64Photos = await Promise.all(photoPromises);
	        setUploadedPhotos(base64Photos);
	        setError(null);
	        setShareMessage(null);
	    };
	    const handleUpload = async (photos, dimensions, preferences) => {
	        setIsLoading(true);
	        setError(null);
	        try {
	            const data = await apiClient.analyzeRoom(photos, dimensions, preferences);
	            setRecommendations(data);
	            setSavedDimensions(dimensions);
	            setSavedPreferences(preferences);
	            setResultsScrollRequest((request) => request + 1);
	            trackWidgetEvent({
	                ...analyticsContext,
	                type: 'room_analyzed',
	                metadata: {
	                    roomType: dimensions.roomType,
	                    budgetMin: preferences?.budget?.min,
	                    budgetMax: preferences?.budget?.max,
	                    recommendationCount: data.recommendations?.length ?? 0,
	                },
	            });
	            data.recommendations?.forEach((rec) => {
	                trackWidgetEvent({
	                    ...analyticsContext,
	                    type: 'product_recommended',
	                    productId: rec.item.id,
	                    productName: rec.item.name,
	                    metadata: {
	                        category: rec.item.category,
	                        price: rec.item.priceRange?.min ?? rec.item.price,
	                        recommendationSource: 'room_planner',
	                    },
	                });
	            });
	        }
	        catch (err) {
	            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
	            setError(errorMessage);
	            mergedConfig.onError?.(err instanceof Error ? err : new Error(errorMessage));
	        }
	        finally {
	            setIsLoading(false);
	        }
	    };
	    const handleFinalizeRecommendation = (recommendation) => {
	        if (!enabledActions.requestQuote)
	            return;
	        setSelectedCustomizedItem(null);
	        setSelectedRecommendation(recommendation);
	        setShowFinalizeModal(true);
	    };
	    const handleRequestQuoteForCustomizedItem = (item) => {
	        if (!enabledActions.requestQuote)
	            return;
	        trackWidgetEvent({
	            ...analyticsContext,
	            type: 'quote_started',
	            productId: item.productId,
	            productName: item.productName || item.name,
	            metadata: {
	                source: 'room_planner_saved_configuration',
	                quoteType: 'customized_furniture',
	                estimatedTotal: item.estimatedTotal,
	                pricingMode: item.pricingMode,
	            },
	        });
	        setSelectedRecommendation(null);
	        setSelectedCustomizedItem(item);
	        setShowQuoteForm(true);
	    };
	    const handleProceedToQuote = () => {
	        if (!enabledActions.requestQuote)
	            return;
	        const item = selectedCustomizedItem || selectedRecommendation?.item;
	        trackWidgetEvent({
	            ...analyticsContext,
	            type: 'quote_started',
	            productId: selectedCustomizedItem?.productId || selectedRecommendation?.item.id,
	            productName: selectedCustomizedItem?.productName || item?.name,
	            metadata: {
	                source: selectedRecommendation ? 'room_planner_recommendation' : 'room_planner_saved_configuration',
	                quoteType: selectedRecommendation ? 'room_analysis_recommendation' : 'customized_furniture',
	                estimatedTotal: selectedCustomizedItem?.estimatedTotal ||
	                    selectedRecommendation?.item.priceRange?.min ||
	                    selectedRecommendation?.item.price,
	                pricingMode: selectedCustomizedItem?.pricingMode,
	            },
	        });
	        setShowFinalizeModal(false);
	        setShowQuoteForm(true);
	    };
	    const handleQuoteSubmit = async (quoteRequest) => {
	        try {
	            const response = await apiClient.submitQuoteRequest(quoteRequest);
	            setQuoteSuccess(true);
	            setTimeout(() => {
	                setQuoteSuccess(false);
	            }, 5000);
	            return response;
	        }
	        catch (err) {
	            throw err;
	        }
	    };
	    const handleExportPdf = () => {
	        trackWidgetEvent({
	            ...analyticsContext,
	            type: 'pdf_exported',
	            metadata: {
	                source: 'room_planner',
	                recommendationCount: recommendations?.recommendations?.length ?? 0,
	            },
	        });
	        if (typeof window !== 'undefined')
	            window.print();
	    };
	    const buildShareText = () => {
	        const dimText = savedDimensions
	            ? `L ${savedDimensions.length.toFixed(1)}m x W ${savedDimensions.width.toFixed(1)}m x H ${savedDimensions.height.toFixed(1)}m`
	            : 'Dimensions: (not provided)';
	        const items = recommendations?.recommendations?.slice(0, 5).map((r) => r.item.name).join(', ') ||
	            'No matches yet';
	        return `Room Planner results\n${dimText}\nTop matches: ${items}`;
	    };
	    const handleShare = async () => {
	        try {
	            const text = buildShareText();
	            const nav = navigator;
	            if (typeof nav.share === 'function') {
	                await nav.share({ title: 'Room Planner', text });
	                setShareMessage('Shared successfully.');
	                return;
	            }
	            await navigator.clipboard.writeText(text);
	            setShareMessage('Copied share summary to clipboard.');
	        }
	        catch (e) {
	            console.warn('Share failed:', e);
	            setShareMessage('Could not share automatically. Please copy the details manually.');
	        }
	    };
	    const handleFileChange = async (e) => {
	        if (!e.target.files)
	            return;
	        await handlePhotosChange(Array.from(e.target.files));
	    };
	    const handleDrop = async (e) => {
	        e.preventDefault();
	        e.stopPropagation();
	        if (e.dataTransfer.files?.length) {
	            await handlePhotosChange(Array.from(e.dataTransfer.files));
	        }
	    };
	    const handleUnitToggle = () => {
	        const nextUnitSystem = unitSystem === 'meters' ? 'feet' : 'meters';
	        const lengthMeters = parseDimensionToMeters(lengthValue, unitSystem);
	        const widthMeters = parseDimensionToMeters(widthValue, unitSystem);
	        const heightMeters = parseDimensionToMeters(heightValue, unitSystem);
	        setUnitSystem(nextUnitSystem);
	        setLengthValue(formatDimensionForUnit(lengthMeters, nextUnitSystem));
	        setWidthValue(formatDimensionForUnit(widthMeters, nextUnitSystem));
	        setHeightValue(formatDimensionForUnit(heightMeters, nextUnitSystem));
	    };
	    const applyRoomPreset = (preset) => {
	        setLengthValue(formatDimensionForUnit(preset.dimensions.length, unitSystem));
	        setWidthValue(formatDimensionForUnit(preset.dimensions.width, unitSystem));
	        setHeightValue(formatDimensionForUnit(preset.dimensions.height, unitSystem));
	    };
	    const toggleStyle = (style) => {
	        setSelectedStyles((currentStyles) => currentStyles.includes(style)
	            ? currentStyles.filter((currentStyle) => currentStyle !== style)
	            : [...currentStyles, style]);
	    };
	    const handleAnalyze = async () => {
	        setError(null);
	        setShareMessage(null);
	        if (uploadedPhotos.length === 0) {
	            setError('Please upload a room photo first.');
	            return;
	        }
	        const dimensions = {
	            roomType,
	            length: parseDimensionToMeters(lengthValue, unitSystem),
	            width: parseDimensionToMeters(widthValue, unitSystem),
	            height: parseDimensionToMeters(heightValue, unitSystem),
	        };
	        if (dimensions.length <= 0 || dimensions.width <= 0 || dimensions.height <= 0) {
	            setError('Please provide valid room dimensions.');
	            return;
	        }
	        const preferences = {
	            style: selectedStyles,
	            colors: colorInput
	                .split(',')
	                .map((value) => value.trim())
	                .filter(Boolean),
	            budget: {
	                min: budgetMin ? Number(budgetMin) : undefined,
	                max: budgetMax ? Number(budgetMax) : undefined,
	            },
	        };
	        setSavedDimensions(dimensions);
	        setSavedPreferences(preferences);
	        const files = await Promise.all(uploadedPhotos.map((photo, index) => base64ToFile(photo, `room-photo-${index + 1}.png`)));
	        await handleUpload(files, dimensions, preferences);
	    };
	    return (jsxRuntimeExports.jsxs(WidgetProvider, { apiClient: apiClient, storage: storage, config: mergedConfig, children: [jsxRuntimeExports.jsxs("div", { className: "furniture-widget-room-planner min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]", children: [jsxRuntimeExports.jsx("style", { children: `
          @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        ` }), jsxRuntimeExports.jsx("section", { className: "py-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4", children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "AI-Powered Room Analysis" })] }), jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold mb-4", children: "Room Planner" }), jsxRuntimeExports.jsx("p", { className: "text-xl text-blue-100 mb-8", children: "Upload a photo of your room and get catalog-based furniture and customization suggestions based on your space and style." }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Room photo upload" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Catalog-based product suggestions" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Style-aware recommendations" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Placement guidance" })] })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-12 bg-gray-50", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-[28px] border border-gray-200 bg-white p-5 shadow-xl md:p-6", children: [recommendations && (jsxRuntimeExports.jsx("div", { className: "mb-4 flex justify-end", children: jsxRuntimeExports.jsx("div", { className: "inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700", children: "Suggested analysis" }) })), jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", multiple: true, onChange: handleFileChange, className: "hidden" }), jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-5 lg:grid-cols-2", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-[#fffdf9] p-5 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-950", children: "Upload a room photo" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-6 text-gray-600", children: "ModlyAI compares your room, style, and budget with products in this store's catalog." })] }), uploadedPhotos.length > 0 && (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setUploadedPhotos([]), className: "shrink-0 rounded-full border border-stone-200 px-3 py-1 text-sm font-medium text-gray-500 transition hover:border-stone-300 hover:text-gray-900", children: "Remove" }))] }), jsxRuntimeExports.jsx("div", { role: "button", tabIndex: 0, onClick: () => fileInputRef.current?.click(), onKeyDown: (e) => {
	                                                                if (e.key === 'Enter' || e.key === ' ')
	                                                                    fileInputRef.current?.click();
	                                                            }, onDragOver: (e) => {
	                                                                e.preventDefault();
	                                                                e.stopPropagation();
	                                                            }, onDrop: handleDrop, className: "mt-5 flex aspect-video w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-white px-6 text-center outline-none transition-colors hover:border-blue-500 hover:bg-blue-50/40 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", children: jsxRuntimeExports.jsxs("div", { className: "flex max-w-sm flex-col items-center gap-4", children: [jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 shadow-inner", children: jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 text-blue-600" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-900", children: uploadedPhotos.length > 0
	                                                                                    ? `${uploadedPhotos.length} photo${uploadedPhotos.length > 1 ? 's' : ''} ready`
	                                                                                    : 'Drag your photo here' }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "JPG or PNG. For best results, use a clear photo with good lighting." })] }), jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => {
	                                                                            e.stopPropagation();
	                                                                            fileInputRef.current?.click();
	                                                                        }, className: "rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700", style: { backgroundColor: primaryColor }, children: "Choose Room Photo" })] }) }), jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-gray-500", children: "Use room details and catalog data to improve recommendations." })] }), jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-950", children: "Room preview" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500", children: uploadedPhotos[0] ? 'Photo loaded' : 'Awaiting upload' })] }), jsxRuntimeExports.jsx("div", { className: "flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-stone-50", children: uploadedPhotos[0] ? (jsxRuntimeExports.jsx("img", { src: uploadedPhotos[0], alt: "Uploaded room preview", className: "aspect-video w-full rounded-xl object-cover" })) : (jsxRuntimeExports.jsxs("div", { className: "px-6 text-center text-gray-500", children: [jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm", children: jsxRuntimeExports.jsx(Camera, { className: "h-7 w-7 text-blue-500" }) }), jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-800", children: "Your uploaded room photo will appear here." }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs leading-5 text-gray-500", children: "Tip: Take the photo from a corner or doorway to capture more of the room." })] })) })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:col-span-4", children: [jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start gap-3", children: [jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600", children: jsxRuntimeExports.jsx(Ruler, { className: "h-5 w-5" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-950", children: "Room Details" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Optional, but improves fit recommendations." })] })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Room Type" }), jsxRuntimeExports.jsxs("select", { value: roomType, onChange: (e) => setRoomType(e.target.value), className: "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", children: [jsxRuntimeExports.jsx("option", { value: "living", children: "Living Room" }), jsxRuntimeExports.jsx("option", { value: "bedroom", children: "Bedroom" }), jsxRuntimeExports.jsx("option", { value: "dining", children: "Dining Room" }), jsxRuntimeExports.jsx("option", { value: "office", children: "Office" }), jsxRuntimeExports.jsx("option", { value: "kitchen", children: "Kitchen" }), jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-gray-700", children: "Room Dimensions" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Meters" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleUnitToggle, className: `relative inline-flex h-6 w-11 items-center rounded-full transition ${unitSystem === 'feet' ? 'bg-blue-600' : 'bg-stone-200'}`, "aria-label": "Toggle meters or feet", children: jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition ${unitSystem === 'feet' ? 'translate-x-6' : 'translate-x-1'}` }) }), jsxRuntimeExports.jsx("span", { children: "Feet" })] })] }), jsxRuntimeExports.jsx("div", { className: "mb-3 grid grid-cols-3 gap-2", children: roomSizePresets.map((preset) => (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => applyRoomPreset(preset), className: "rounded-full border border-stone-300 bg-stone-50 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800", children: preset.label }, preset.id))) }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Length" }), jsxRuntimeExports.jsx("input", { type: "number", placeholder: unitSystem === 'meters' ? '4.6' : '15.1', value: lengthValue, onChange: (e) => setLengthValue(e.target.value), className: "w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Width" }), jsxRuntimeExports.jsx("input", { type: "number", placeholder: unitSystem === 'meters' ? '3.8' : '12.5', value: widthValue, onChange: (e) => setWidthValue(e.target.value), className: "w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Ceiling Height" }), jsxRuntimeExports.jsx("input", { type: "number", placeholder: unitSystem === 'meters' ? '2.6' : '8.5', value: heightValue, onChange: (e) => setHeightValue(e.target.value), className: "w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] })] })] }), jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:col-span-4", children: [jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start gap-3", children: [jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700", children: jsxRuntimeExports.jsx(Sofa, { className: "h-5 w-5" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-950", children: "Preferences" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Guide matches toward the showroom look you want." })] })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "Preferred Styles" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: styleOptions.map((styleOption) => {
	                                                                                const isSelected = selectedStyles.includes(styleOption.id);
	                                                                                const StyleIcon = styleOption.Icon;
	                                                                                return (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleStyle(styleOption.id), className: [
	                                                                                        `rounded-xl border bg-gradient-to-br ${styleOption.tone} p-3 text-left transition`,
	                                                                                        isSelected
	                                                                                            ? 'border-blue-500 shadow-sm ring-2 ring-blue-100'
	                                                                                            : 'border-stone-200 hover:border-stone-300 hover:shadow-sm',
	                                                                                    ].join(' '), children: [jsxRuntimeExports.jsx("span", { className: [
	                                                                                                'mb-3 flex h-10 w-10 items-center justify-center rounded-lg border',
	                                                                                                isSelected
	                                                                                                    ? 'border-blue-200 bg-blue-50 text-blue-700'
	                                                                                                    : 'border-stone-200 bg-white text-gray-600',
	                                                                                            ].join(' '), children: jsxRuntimeExports.jsx(StyleIcon, { className: "h-5 w-5" }) }), jsxRuntimeExports.jsx("span", { className: [
	                                                                                                'block text-sm font-semibold',
	                                                                                                isSelected ? 'text-blue-950' : 'text-gray-800',
	                                                                                            ].join(' '), children: styleOption.label })] }, styleOption.id));
	                                                                            }) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Preferred Colors" }), jsxRuntimeExports.jsx("input", { type: "text", value: colorInput, onChange: (e) => setColorInput(e.target.value), placeholder: "e.g., Beige, Forest Green, Terracotta", className: "w-full rounded-lg border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Comma-separated" })] })] })] }), jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:col-span-4", children: [jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start gap-3", children: [jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700", children: jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-950", children: "Budget & Actions" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Recommendations stay grounded in your imported catalog." })] })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Budget Min ($)" }), jsxRuntimeExports.jsx("input", { type: "number", value: budgetMin, onChange: (e) => setBudgetMin(e.target.value), placeholder: "500", className: "w-full rounded-lg border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Budget Max ($)" }), jsxRuntimeExports.jsx("input", { type: "number", value: budgetMax, onChange: (e) => setBudgetMax(e.target.value), placeholder: "2000", className: "w-full rounded-lg border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] }), jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-4 text-sm text-blue-950", children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "What ModlyAI checks" }), jsxRuntimeExports.jsx("div", { className: "mt-3 grid gap-2", children: trustItems.map((item) => (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-blue-900", children: [jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 shrink-0 text-blue-600" }), jsxRuntimeExports.jsx("span", { children: item })] }, item))) })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: handleAnalyze, disabled: isLoading, className: "flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50", style: { backgroundColor: primaryColor }, children: isLoading ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "h-5 w-5 rounded-full border-2 border-white/50 border-t-white animate-spin" }), "Finding matches..."] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }), "Find matching catalog products"] })) }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: handleExportPdf, className: "min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50", children: "Export PDF" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleShare, className: "min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50", children: "Share" })] })] })] })] })] }), shareMessage && (jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900", children: shareMessage })), error && (jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700", children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Error" }), jsxRuntimeExports.jsx("p", { className: "text-sm", children: error })] })), jsxRuntimeExports.jsxs("div", { className: "print-only hidden mt-6 text-left", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Room Planner Share Summary" }), jsxRuntimeExports.jsx("pre", { className: "mt-2 whitespace-pre-wrap text-sm text-gray-700", children: buildShareText() })] })] }), jsxRuntimeExports.jsx("div", { className: "mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200", children: jsxRuntimeExports.jsx(CustomizedFurnitureList, { items: customizedFurniture, onItemRemoved: handleItemRemoved, onNavigateToCustomizer: handleNavigateToCustomizer, onRequestQuote: enabledActions.requestQuote ? handleRequestQuoteForCustomizedItem : undefined }) }), recommendations && (jsxRuntimeExports.jsxs("div", { ref: resultsRef, className: "mt-8 scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all md:p-8", children: [recommendations.roomAnalysis && (jsxRuntimeExports.jsxs("div", { className: "mb-8 rounded-xl border border-blue-100 bg-blue-50/80 p-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-gray-950", children: "Room analysis" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-blue-900/70", children: "Use room details and catalog data to improve recommendations." })] }), jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full", children: "Success" })] }), jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Observed style cues" }), jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-900", children: recommendations.roomAnalysis.detectedStyle })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Color cues" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-1", children: recommendations.roomAnalysis.dominantColors.map((color, i) => (jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white border border-blue-200 rounded-full text-sm text-gray-900", children: color }, i))) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Layout notes" }), jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-900", children: recommendations.roomAnalysis.freeSpace.description })] })] })] })), jsxRuntimeExports.jsx(RecommendationsList, { recommendations: recommendations.recommendations, onCustomize: enabledActions.customize ? handleCustomize : undefined, onFinalize: enabledActions.requestQuote ? handleFinalizeRecommendation : undefined, enabledActions: enabledActions, primaryColor: primaryColor, analyticsContext: analyticsContext }), enabledActions.requestQuote && recommendations.recommendations && recommendations.recommendations.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-6 border-t border-gray-200 text-center", children: [jsxRuntimeExports.jsx("p", { className: "text-gray-700 mb-4 font-medium", children: "Ready to convert this into a quote?" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: recommendations.recommendations.slice(0, 3).map((rec, idx) => (jsxRuntimeExports.jsxs("button", { type: "button", onClick: (event) => {
	                                                            event.preventDefault();
	                                                            event.stopPropagation();
	                                                            handleFinalizeRecommendation(rec);
	                                                        }, className: "w-full px-4 py-3 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2", style: { backgroundColor: primaryColor }, children: [jsxRuntimeExports.jsxs("span", { className: "text-center leading-snug", children: ["Request Quote for ", rec.item.name] }), jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 flex-shrink-0" })] }, rec.item.id || idx))) })] }))] }))] }) })] }), jsxRuntimeExports.jsx(FinalizeQuoteModal, { isOpen: enabledActions.requestQuote && showFinalizeModal, onClose: () => {
	                    setShowFinalizeModal(false);
	                    setSelectedRecommendation(null);
	                    setSelectedCustomizedItem(null);
	                }, onProceed: handleProceedToQuote, item: selectedCustomizedItem, recommendation: selectedRecommendation, roomDimensions: savedDimensions, roomAnalysis: recommendations?.roomAnalysis }), jsxRuntimeExports.jsx(QuoteRequestForm, { isOpen: enabledActions.requestQuote && showQuoteForm, onClose: () => {
	                    setShowQuoteForm(false);
	                    setSelectedRecommendation(null);
	                    setSelectedCustomizedItem(null);
	                }, item: selectedCustomizedItem, onSubmit: handleQuoteSubmit, recommendation: selectedRecommendation, storeId: mergedConfig.storeId, widgetId: mergedConfig.widgetId, roomDimensions: savedDimensions, roomAnalysis: recommendations?.roomAnalysis }), quoteSuccess && (jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50", children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6" }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Quote Request Submitted!" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90", children: "Quote request sent. The store will follow up with pricing and next steps." })] })] }))] }));
	}

	const PAGE_WIDTH = 612;
	const PAGE_HEIGHT = 792;
	const MARGIN = 42;
	const FOOTER_TOP = 58;
	const CONTENT_BOTTOM = 86;
	const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
	const BLUE = [38 / 255, 99 / 255, 235 / 255];
	const PURPLE = [124 / 255, 58 / 255, 237 / 255];
	const DARK = [17 / 255, 24 / 255, 39 / 255];
	const MUTED = [107 / 255, 114 / 255, 128 / 255];
	const BORDER = [229 / 255, 231 / 255, 235 / 255];
	const SOFT = [249 / 255, 250 / 255, 251 / 255];
	const formatCurrency = (value) => typeof value === 'number' && Number.isFinite(value)
	    ? new Intl.NumberFormat('en-US', {
	        style: 'currency',
	        currency: 'USD',
	        minimumFractionDigits: 2,
	        maximumFractionDigits: 2,
	    }).format(value)
	    : undefined;
	const formatPriceModifier = (value) => {
	    if (typeof value !== 'number' || !Number.isFinite(value))
	        return undefined;
	    const formatted = formatCurrency(Math.abs(value));
	    if (!formatted)
	        return undefined;
	    return value < 0 ? `-${formatted}` : `+${formatted}`;
	};
	const formatDimensions = (dimensions) => {
	    if (!dimensions)
	        return [];
	    const unit = dimensions.unit || 'in';
	    return [
	        dimensions.length !== undefined ? { label: 'Length', value: `${dimensions.length} ${unit}` } : undefined,
	        dimensions.width !== undefined ? { label: 'Width', value: `${dimensions.width} ${unit}` } : undefined,
	        dimensions.height !== undefined ? { label: 'Height', value: `${dimensions.height} ${unit}` } : undefined,
	    ].filter((row) => Boolean(row));
	};
	const formatDimensionPricing = (adjustments) => {
	    if (!adjustments)
	        return [];
	    return [
	        ['Width adjustment', adjustments.width],
	        ['Length adjustment', adjustments.length],
	        ['Height adjustment', adjustments.height],
	    ]
	        .map(([label, amount]) => {
	        const value = formatPriceModifier(amount);
	        return value && amount !== 0 ? { label, value } : undefined;
	    })
	        .filter((row) => Boolean(row));
	};
	const calculateCustomizationTotal = (lineItems) => lineItems.reduce((sum, lineItem) => sum + (Number.isFinite(lineItem.amount) ? lineItem.amount : 0), 0);
	const sanitizePdfText = (value) => String(value ?? '')
	    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ' ')
	    .replace(/\s+/g, ' ')
	    .trim();
	const escapePdfText = (value) => sanitizePdfText(value)
	    .replace(/\\/g, '\\\\')
	    .replace(/\(/g, '\\(')
	    .replace(/\)/g, '\\)');
	const rgb = ([r, g, b]) => `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)}`;
	const drawRect = (x, y, width, height, fill, stroke) => {
	    if (fill && stroke)
	        return `q ${rgb(fill)} rg ${rgb(stroke)} RG ${x} ${y} ${width} ${height} re B Q`;
	    if (fill)
	        return `q ${rgb(fill)} rg ${x} ${y} ${width} ${height} re f Q`;
	    if (stroke)
	        return `q ${rgb(stroke)} RG ${x} ${y} ${width} ${height} re S Q`;
	    return '';
	};
	const drawLine = (x1, y1, x2, y2, color) => `q ${rgb(color)} RG 0.8 w ${x1} ${y1} m ${x2} ${y2} l S Q`;
	const textWidth = (text, size) => sanitizePdfText(text).length * size * 0.52;
	const wrapText = (text, width, size) => {
	    const words = sanitizePdfText(text).split(' ').filter(Boolean);
	    const lines = [];
	    let current = '';
	    words.forEach((word) => {
	        const next = current ? `${current} ${word}` : word;
	        if (textWidth(next, size) <= width) {
	            current = next;
	            return;
	        }
	        if (current)
	            lines.push(current);
	        current = word;
	    });
	    if (current)
	        lines.push(current);
	    return lines.length > 0 ? lines : [''];
	};
	class PdfLayout {
	    constructor(footerMeta) {
	        this.footerMeta = footerMeta;
	        this.pages = [[]];
	        this.y = PAGE_HEIGHT - MARGIN;
	    }
	    get page() {
	        return this.pages[this.pages.length - 1];
	    }
	    add(command) {
	        if (command)
	            this.page.push(command);
	    }
	    addPage() {
	        this.pages.push([]);
	        this.y = PAGE_HEIGHT - 86;
	        this.addText('Customized Furniture Quote', MARGIN, PAGE_HEIGHT - 48, 14, 'F2', DARK);
	        this.add(drawLine(MARGIN, PAGE_HEIGHT - 62, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 62, BORDER));
	    }
	    ensureSpace(height) {
	        if (this.y - height < CONTENT_BOTTOM) {
	            this.addPage();
	        }
	    }
	    addText(text, x, y, size = 10, font = 'F1', color = DARK) {
	        this.add(`BT /${font} ${size} Tf ${rgb(color)} rg ${x} ${y} Td (${escapePdfText(text)}) Tj ET`);
	    }
	    addRightText(text, rightX, y, size = 10, font = 'F1', color = DARK) {
	        this.addText(text, rightX - textWidth(text, size), y, size, font, color);
	    }
	    addWrappedText(text, x, y, width, size = 10, font = 'F1', color = DARK) {
	        const lines = wrapText(text, width, size);
	        lines.forEach((line, index) => this.addText(line, x, y - index * (size + 4), size, font, color));
	        return y - lines.length * (size + 4);
	    }
	    drawHeader(brandName, generatedAt, referenceId) {
	        this.add(drawRect(0, PAGE_HEIGHT - 82, PAGE_WIDTH, 82, [0.98, 0.98, 1]));
	        this.add(drawRect(0, PAGE_HEIGHT - 82, 8, 82, BLUE));
	        this.add(drawRect(8, PAGE_HEIGHT - 82, 4, 82, PURPLE));
	        this.addText(brandName || 'ModlyAI', MARGIN, PAGE_HEIGHT - 42, 18, 'F2', DARK);
	        this.addText('Generated by ModlyAI', MARGIN, PAGE_HEIGHT - 60, 9, 'F1', MUTED);
	        this.addRightText('Customized Furniture Quote', PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 42, 16, 'F2', DARK);
	        this.addRightText(`Generated: ${generatedAt.toLocaleString()}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 60, 9, 'F1', MUTED);
	        if (referenceId) {
	            this.addRightText(`Reference: ${referenceId}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 74, 8, 'F1', MUTED);
	        }
	        this.add(drawLine(MARGIN, PAGE_HEIGHT - 92, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 92, BORDER));
	        this.y = PAGE_HEIGHT - 118;
	    }
	    drawCard(title, height, drawContent) {
	        this.ensureSpace(height + 14);
	        const top = this.y;
	        this.add(drawRect(MARGIN, top - height, CONTENT_WIDTH, height, [1, 1, 1], BORDER));
	        this.addText(title, MARGIN + 16, top - 24, 12, 'F2', DARK);
	        this.add(drawLine(MARGIN + 16, top - 34, PAGE_WIDTH - MARGIN - 16, top - 34, BORDER));
	        drawContent(top - 52);
	        this.y = top - height - 14;
	    }
	    drawRows(rows, x, y, labelWidth = 122, valueWidth = 310) {
	        let cursor = y;
	        rows.forEach((row) => {
	            this.addText(row.label, x, cursor, 9, 'F1', MUTED);
	            cursor = this.addWrappedText(row.value, x + labelWidth, cursor, valueWidth, 9, 'F1', DARK) - 4;
	        });
	        return cursor;
	    }
	    drawFooter() {
	        this.pages.forEach((page) => {
	            page.push(drawLine(MARGIN, FOOTER_TOP, PAGE_WIDTH - MARGIN, FOOTER_TOP, BORDER));
	            page.push(`BT /F2 8 Tf ${rgb(MUTED)} rg ${MARGIN} ${FOOTER_TOP - 16} Td (Generated by ModlyAI) Tj ET`);
	            page.push(`BT /F1 8 Tf ${rgb(MUTED)} rg ${MARGIN} ${FOOTER_TOP - 29} Td (Final pricing, availability, and delivery are subject to merchant confirmation.) Tj ET`);
	            if (this.footerMeta) {
	                page.push(`BT /F1 7 Tf ${rgb(MUTED)} rg ${MARGIN} ${FOOTER_TOP - 42} Td (${escapePdfText(this.footerMeta)}) Tj ET`);
	            }
	        });
	    }
	    toBlob() {
	        this.drawFooter();
	        const pageObjects = [];
	        const contentObjects = [];
	        const firstPageObject = 3;
	        const firstContentObject = firstPageObject + this.pages.length;
	        this.pages.forEach((commands, index) => {
	            const pageObjectId = firstPageObject + index;
	            const contentObjectId = firstContentObject + index;
	            pageObjects.push(`${pageObjectId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${firstContentObject + this.pages.length} 0 R /F2 ${firstContentObject + this.pages.length + 1} 0 R >> >> /Contents ${contentObjectId} 0 R >>\nendobj\n`);
	            const content = `${commands.join('\n')}\n`;
	            contentObjects.push(`${contentObjectId} 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`);
	        });
	        const fontStart = firstContentObject + this.pages.length;
	        const objects = [
	            `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`,
	            `2 0 obj\n<< /Type /Pages /Kids [${this.pages.map((_, index) => `${firstPageObject + index} 0 R`).join(' ')}] /Count ${this.pages.length} >>\nendobj\n`,
	            ...pageObjects,
	            ...contentObjects,
	            `${fontStart} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`,
	            `${fontStart + 1} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`,
	        ];
	        let pdf = '%PDF-1.4\n';
	        const offsets = [0];
	        objects.forEach((object) => {
	            offsets.push(pdf.length);
	            pdf += object;
	        });
	        const xrefOffset = pdf.length;
	        pdf += `xref\n0 ${objects.length + 1}\n`;
	        pdf += '0000000000 65535 f \n';
	        offsets.slice(1).forEach((offset) => {
	            pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
	        });
	        pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
	        return new Blob([pdf], { type: 'application/pdf' });
	    }
	}
	const choiceValue = (choice) => {
	    const price = formatPriceModifier(choice.price);
	    return price ? `${choice.value} (${price})` : choice.value;
	};
	const estimateRowsHeight = (rows, width = 310, size = 9) => rows.reduce((total, row) => total + wrapText(row.value, width, size).length * (size + 4) + 4, 0);
	function generateCustomizationPdf(input) {
	    const technicalMeta = [input.storeId ? `Store: ${input.storeId}` : '', input.widgetId ? `Widget: ${input.widgetId}` : '']
	        .filter(Boolean)
	        .join(' / ');
	    const pdf = new PdfLayout(technicalMeta || undefined);
	    const referenceId = input.referenceId ?? `MOD-${input.generatedAt.getTime().toString(36).toUpperCase()}`;
	    const basePrice = formatCurrency(input.product.basePrice ?? input.pricing.basePrice);
	    const estimatedTotal = input.pricing.quoteRequired
	        ? 'Quote required'
	        : formatCurrency(input.product.estimatedTotal ?? input.pricing.estimatedTotal);
	    const productRows = [
	        { label: 'Product', value: input.product.name },
	        input.product.category ? { label: 'Category', value: input.product.category } : undefined,
	        input.product.productUrl ? { label: 'Product URL', value: input.product.productUrl } : undefined,
	        basePrice ? { label: 'Base price', value: basePrice } : undefined,
	        { label: 'Pricing mode', value: input.product.pricingMode === 'quote_required' ? 'Quote required' : 'Estimated' },
	        estimatedTotal ? { label: 'Estimated total', value: estimatedTotal } : undefined,
	    ].filter((row) => Boolean(row));
	    const dimensionRows = formatDimensions(input.selectedCustomizations.dimensions);
	    const dimensionPricingRows = formatDimensionPricing(input.selectedCustomizations.dimensionPriceAdjustments);
	    const selectedRows = [
	        input.selectedCustomizations.color
	            ? { label: 'Color', value: choiceValue(input.selectedCustomizations.color) }
	            : undefined,
	        input.selectedCustomizations.material
	            ? { label: 'Material', value: choiceValue(input.selectedCustomizations.material) }
	            : undefined,
	        ...(input.selectedCustomizations.shopifyOptions ?? []).map((option) => ({
	            label: option.label,
	            value: choiceValue(option),
	        })),
	        ...dimensionRows,
	        ...dimensionPricingRows,
	        ...(input.selectedCustomizations.addOns ?? []).map((addOn) => ({
	            label: 'Add-on',
	            value: choiceValue(addOn),
	        })),
	    ].filter((row) => Boolean(row));
	    const pricingRows = [
	        basePrice ? { label: 'Base price', value: basePrice } : undefined,
	        ...input.pricing.lineItems
	            .filter((lineItem) => lineItem.amount !== 0)
	            .map((lineItem) => ({ label: lineItem.label, value: formatPriceModifier(lineItem.amount) ?? '' })),
	        {
	            label: 'Customization total',
	            value: formatPriceModifier(input.pricing.customizationTotal ?? calculateCustomizationTotal(input.pricing.lineItems)) ?? '+$0.00',
	        },
	        {
	            label: 'Estimated total',
	            value: input.pricing.quoteRequired ? 'Quote required' : estimatedTotal ?? 'Quote required',
	        },
	    ].filter((row) => Boolean(row));
	    pdf.drawHeader(input.brandName, input.generatedAt, referenceId);
	    pdf.drawCard('Product Summary', Math.max(150, 58 + estimateRowsHeight(productRows, 230)), (topY) => {
	        pdf.drawRows(productRows, MARGIN + 16, topY, 104, 238);
	        if (input.product.imageUrl) {
	            const imageX = PAGE_WIDTH - MARGIN - 154;
	            pdf.add(drawRect(imageX, topY - 86, 138, 86, SOFT, BORDER));
	            pdf.addText('Product image available', imageX + 16, topY - 36, 10, 'F2', DARK);
	            pdf.addWrappedText('See product URL or catalog for the original image.', imageX + 16, topY - 54, 106, 8, 'F1', MUTED);
	        }
	    });
	    if (selectedRows.length > 0) {
	        pdf.drawCard('Selected Customizations', Math.max(112, 58 + estimateRowsHeight(selectedRows, 340)), (topY) => {
	            pdf.drawRows(selectedRows, MARGIN + 16, topY, 130, 340);
	        });
	    }
	    pdf.drawCard('Pricing Breakdown', Math.max(128, 62 + estimateRowsHeight(pricingRows, 220)), (topY) => {
	        let cursor = topY;
	        pricingRows.forEach((row, index) => {
	            const isTotal = row.label === 'Estimated total';
	            if (isTotal) {
	                pdf.add(drawLine(MARGIN + 16, cursor + 9, PAGE_WIDTH - MARGIN - 16, cursor + 9, BORDER));
	            }
	            pdf.addText(row.label, MARGIN + 16, cursor, 10, isTotal ? 'F2' : 'F1', isTotal ? DARK : MUTED);
	            pdf.addRightText(row.value, PAGE_WIDTH - MARGIN - 18, cursor, 10, isTotal ? 'F2' : 'F1', isTotal ? DARK : DARK);
	            cursor -= index === pricingRows.length - 2 ? 22 : 17;
	        });
	    });
	    const notes = input.selectedCustomizations.customerRequestText?.trim();
	    if (notes) {
	        const noteLines = wrapText(notes, CONTENT_WIDTH - 32, 10);
	        pdf.drawCard('Customer Request', Math.max(92, 58 + noteLines.length * 15), (topY) => {
	            pdf.addWrappedText(notes, MARGIN + 16, topY, CONTENT_WIDTH - 32, 10, 'F1', DARK);
	        });
	    }
	    return pdf.toBlob();
	}
	const createCustomizationPdfFilename = (productName, generatedAt = new Date()) => {
	    const slug = productName
	        .toLowerCase()
	        .replace(/[^a-z0-9]+/g, '-')
	        .replace(/^-+|-+$/g, '')
	        .slice(0, 64);
	    const date = generatedAt.toISOString().slice(0, 10);
	    return `modlyai-customized-furniture-${slug || date}.pdf`;
	};

	const ROOM_PLANNER_STORAGE_KEY = 'modly-room-planner-state';
	const CUSTOMIZER_SUGGESTION_LIMIT = 3;
	const SHORT_REASON_MAX_LENGTH = 120;
	const isDemoProduct$1 = (product) => Boolean(product && !product.source);
	const normalizeDisplayOptions$1 = (value) => normalizeCustomizationOptionValues(value).map((option) => ({
	    name: getOptionName(option),
	    price: getOptionPrice(option),
	}));
	const formatModifierLabel = (price, includedLabel = 'Included') => {
	    if (typeof price !== 'number')
	        return null;
	    if (price <= 0)
	        return includedLabel;
	    return `+$${price.toLocaleString()}`;
	};
	const getShortReason = (reason) => {
	    const normalized = (reason || 'Recommended by Room Planner.').replace(/\s+/g, ' ').trim();
	    const firstSentence = normalized.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() || normalized;
	    return firstSentence.length > SHORT_REASON_MAX_LENGTH
	        ? `${firstSentence.slice(0, SHORT_REASON_MAX_LENGTH - 3).trim()}...`
	        : firstSentence;
	};
	const hasDimensionRange$1 = (dimension) => dimension?.min !== undefined || dimension?.max !== undefined;
	const readFlatDimension = (value) => {
	    if (typeof value === 'number' && Number.isFinite(value) && value > 0)
	        return value;
	    if (typeof value === 'string' && value.trim()) {
	        const parsed = Number(value);
	        if (Number.isFinite(parsed) && parsed > 0)
	            return parsed;
	    }
	    return undefined;
	};
	const toDimensionRange = (dimension, fallbackDefault, fallbackRange, allowFallback = false) => {
	    const min = dimension?.min ?? (allowFallback ? fallbackRange?.[0] : undefined);
	    const max = dimension?.max ?? (allowFallback ? fallbackRange?.[1] : undefined);
	    const defaultValue = dimension?.default ?? (allowFallback ? fallbackDefault : undefined);
	    if (min === undefined && max === undefined && defaultValue === undefined)
	        return null;
	    const resolvedDefault = defaultValue ?? min ?? max ?? fallbackDefault;
	    return {
	        min: min ?? resolvedDefault,
	        max: max ?? resolvedDefault,
	        default: resolvedDefault,
	        unit: dimension?.unit ?? 'in',
	    };
	};
	const getProductCustomization = (product) => {
	    if (!product) {
	        return {
	            colors: [],
	            materials: [],
	            dimensions: {},
	            dimensionSummary: {},
	            addOns: [],
	            optionLabels: [],
	            hasOptions: false,
	        };
	    }
	    const explicit = product.customizationOptions;
	    const allowDemoFallback = isDemoProduct$1(product);
	    const explicitColorOptions = normalizeDisplayOptions$1(explicit?.colors);
	    const explicitMaterialOptions = normalizeDisplayOptions$1(explicit?.materials);
	    const explicitColorNames = explicitColorOptions.map((option) => option.name);
	    const explicitMaterialNames = explicitMaterialOptions.map((option) => option.name);
	    const productColorNames = product.colors
	        .map((color) => color.name)
	        .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
	    const productMaterialNames = product.materials
	        .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
	    const colorNames = explicitColorNames.length > 0 ? explicitColorNames : productColorNames;
	    const materialNames = explicitMaterialNames.length > 0 ? explicitMaterialNames : productMaterialNames;
	    const colors = colorNames
	        .map((name, index) => {
	        const existing = product.colors.find((color) => color.name.toLowerCase() === name.toLowerCase());
	        const pricedOption = explicitColorOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
	        return {
	            ...(existing ?? { name, hex: product.colors[index]?.hex ?? '#E5E7EB', available: true }),
	            price: pricedOption?.price,
	        };
	    })
	        .filter((color) => color.available);
	    const materials = materialNames.map((name, index) => {
	        const existing = product.customizer.materialOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
	        const pricedOption = explicitMaterialOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
	        return existing
	            ? { ...existing, priceDelta: explicitMaterialOptions.length > 0 ? pricedOption?.price : existing.priceDelta }
	            : {
	                id: name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || `material_${index}`,
	                name,
	                priceDelta: pricedOption?.price ?? 0,
	                description: getMaterialDescription(name),
	            };
	    });
	    const dimensions = {
	        width: toDimensionRange(hasDimensionRange$1(explicit?.dimensions?.width) ? explicit?.dimensions?.width : undefined, product.customizer.defaultWidthIn, product.customizer.widthRangeIn, allowDemoFallback),
	        length: toDimensionRange(hasDimensionRange$1(explicit?.dimensions?.length) ? explicit?.dimensions?.length : undefined, product.customizer.defaultDepthIn, product.customizer.depthRangeIn, allowDemoFallback),
	        height: toDimensionRange(hasDimensionRange$1(explicit?.dimensions?.height) ? explicit?.dimensions?.height : undefined, product.dimensions.height, undefined, false),
	    };
	    const dimensionSummary = {
	        width: !dimensions.width && readFlatDimension(product.width)
	            ? { value: readFlatDimension(product.width), unit: 'in' }
	            : undefined,
	        length: !dimensions.length && readFlatDimension(product.length)
	            ? { value: readFlatDimension(product.length), unit: 'in' }
	            : undefined,
	        height: !dimensions.height && readFlatDimension(product.height)
	            ? { value: readFlatDimension(product.height), unit: 'in' }
	            : undefined,
	    };
	    const addOns = explicit?.addOns ??
	        (allowDemoFallback
	            ? [
	                { name: 'Throw Pillows (2)', price: 60 },
	                { name: 'Ottoman', price: 350 },
	            ]
	            : []);
	    const optionLabels = (explicit?.shopifyOptions ?? explicit?.optionLabels ?? []).map((option) => ({
	        name: option.name,
	        values: normalizeDisplayOptions$1(option.values),
	    }));
	    return {
	        colors,
	        materials,
	        dimensions,
	        dimensionSummary,
	        addOns,
	        optionLabels,
	        hasOptions: colors.length > 0 ||
	            materials.length > 0 ||
	            Boolean(dimensions.width || dimensions.length || dimensions.height) ||
	            Boolean(dimensionSummary.width || dimensionSummary.length || dimensionSummary.height) ||
	            addOns.length > 0 ||
	            optionLabels.length > 0,
	    };
	};
	function FurnitureCustomizerPanel({ products, draft, setDraft, isApplying, validationErrors, price, onApply, onUndo, onRedo, canUndo, canRedo, onSaveConfig, onShareLink, onExportPdf, onViewFullRoomAnalysis, }) {
	    const selectedProduct = reactExports.useMemo(() => products.find((p) => p.id === draft.productId) ?? products[0], [draft.productId, products]);
	    const customization = reactExports.useMemo(() => getProductCustomization(selectedProduct), [selectedProduct]);
	    reactExports.useEffect(() => {
	        {
	            return;
	        }
	    }, [customization, selectedProduct]);
	    const materialOptions = customization.materials;
	    const colorSwatches = customization.colors;
	    const baseDimensions = {
	        width: customization.dimensions.width?.default ?? selectedProduct?.customizer.defaultWidthIn ?? 36,
	        length: customization.dimensions.length?.default ?? selectedProduct?.customizer.defaultDepthIn ?? 60,
	        height: customization.dimensions.height?.default ?? selectedProduct?.dimensions.height ?? 30,
	    };
	    const widthMin = customization.dimensions.width?.min ?? baseDimensions.width;
	    const widthMax = customization.dimensions.width?.max ?? baseDimensions.width;
	    const lengthMin = customization.dimensions.length?.min ?? baseDimensions.length;
	    const lengthMax = customization.dimensions.length?.max ?? baseDimensions.length;
	    const heightMin = customization.dimensions.height?.min ?? baseDimensions.height;
	    const heightMax = customization.dimensions.height?.max ?? baseDimensions.height;
	    const [additionalDetails, setAdditionalDetails] = reactExports.useState('');
	    const [charCount, setCharCount] = reactExports.useState(0);
	    const [roomPlannerPhoto, setRoomPlannerPhoto] = reactExports.useState(null);
	    const [roomPlannerRecommendations, setRoomPlannerRecommendations] = reactExports.useState(null);
	    const [aiSuggestions, setAiSuggestions] = reactExports.useState(null);
	    const [analyzing, setAnalyzing] = reactExports.useState(false);
	    const roomPlannerSuggestions = reactExports.useMemo(() => {
	        if (!roomPlannerRecommendations)
	            return null;
	        const topRecommendation = roomPlannerRecommendations.recommendations?.[0];
	        return {
	            fitScore: topRecommendation?.matchScore ?? 0,
	            fitReason: topRecommendation?.reasoning ||
	                roomPlannerRecommendations.roomAnalysis?.freeSpace?.description ||
	                'Room Planner analysis is ready for this space.',
	            roomStyle: roomPlannerRecommendations.roomAnalysis?.detectedStyle || 'Unknown',
	            dominantColors: roomPlannerRecommendations.roomAnalysis?.dominantColors || [],
	            recommendations: roomPlannerRecommendations.recommendations?.map((rec) => ({
	                type: rec.item.category || 'recommendation',
	                suggestion: rec.item.name,
	                reason: rec.reasoning || rec.placement?.reasoning || 'Recommended by Room Planner.',
	            })) || [],
	            warning: roomPlannerPhoto
	                ? undefined
	                : 'Room Planner analysis was found, but the uploaded photo is not available.',
	        };
	    }, [roomPlannerPhoto, roomPlannerRecommendations]);
	    reactExports.useEffect(() => {
	        const loadRoomPlannerState = () => {
	            if (typeof window === 'undefined')
	                return;
	            try {
	                const saved = sessionStorage.getItem(ROOM_PLANNER_STORAGE_KEY);
	                if (!saved) {
	                    setRoomPlannerPhoto(null);
	                    setRoomPlannerRecommendations(null);
	                    return;
	                }
	                const state = JSON.parse(saved);
	                setRoomPlannerPhoto(state.uploadedPhotos?.[0] || null);
	                setRoomPlannerRecommendations(state.recommendations || null);
	            }
	            catch (error) {
	                console.warn('Failed to load Room Planner state for customizer:', error);
	            }
	        };
	        loadRoomPlannerState();
	        window.addEventListener('focus', loadRoomPlannerState);
	        return () => {
	            window.removeEventListener('focus', loadRoomPlannerState);
	        };
	    }, []);
	    reactExports.useEffect(() => {
	        setAiSuggestions(roomPlannerSuggestions);
	    }, [roomPlannerSuggestions]);
	    const getRoomPlannerImagePayload = () => {
	        if (!roomPlannerPhoto)
	            return null;
	        const match = roomPlannerPhoto.match(/^data:(.*?);base64,(.*)$/);
	        if (!match)
	            return null;
	        return {
	            imageType: match[1] || 'image/jpeg',
	            imageBase64: match[2] || '',
	        };
	    };
	    const analyzeRoom = async (base64, imageType) => {
	        setAnalyzing(true);
	        setAiSuggestions(null);
	        try {
	            const res = await fetch('/api/ai/suggestions', {
	                method: 'POST',
	                headers: { 'Content-Type': 'application/json' },
	                body: JSON.stringify({
	                    imageBase64: base64,
	                    imageType,
	                    productName: selectedProduct?.name || 'furniture piece',
	                    productCategory: selectedProduct?.category || 'furniture',
	                    colors: selectedProduct?.colors?.map((c) => c.name) || [],
	                    materials: selectedProduct?.materials || [],
	                    additionalDetails: additionalDetails || null,
	                })
	            });
	            const data = await res.json();
	            if (data.success)
	                setAiSuggestions(data.suggestions);
	        }
	        catch (error) {
	            console.error('Analysis error:', error);
	        }
	        finally {
	            setAnalyzing(false);
	        }
	    };
	    const handleAnalyzeWithRoomPlannerPhoto = () => {
	        const payload = getRoomPlannerImagePayload();
	        if (!payload)
	            return;
	        analyzeRoom(payload.imageBase64, payload.imageType);
	    };
	    const compactSuggestions = reactExports.useMemo(() => (aiSuggestions?.recommendations ?? []).slice(0, CUSTOMIZER_SUGGESTION_LIMIT), [aiSuggestions]);
	    const hasMoreSuggestions = (aiSuggestions?.recommendations?.length ?? 0) > CUSTOMIZER_SUGGESTION_LIMIT;
	    const handleViewFullRoomAnalysis = () => {
	        if (onViewFullRoomAnalysis) {
	            onViewFullRoomAnalysis();
	            return;
	        }
	        if (typeof window !== 'undefined') {
	            window.dispatchEvent(new CustomEvent('modly:navigate-to-room-planner'));
	        }
	    };
	    return (jsxRuntimeExports.jsx("section", { className: "py-12 bg-gray-50", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "grid items-start gap-6 lg:grid-cols-12", children: [jsxRuntimeExports.jsx("div", { className: "self-start lg:col-span-3", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-lg sticky top-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Select Product" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "B2B-ready configs with instant pricing" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onUndo, disabled: !canUndo || isApplying, className: "p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed", title: "Undo", children: jsxRuntimeExports.jsx(Undo2, { className: "w-4 h-4 text-gray-600" }) }), jsxRuntimeExports.jsx("button", { type: "button", onClick: onRedo, disabled: !canRedo || isApplying, className: "p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed", title: "Redo", children: jsxRuntimeExports.jsx(Redo2, { className: "w-4 h-4 text-gray-600" }) })] })] }), jsxRuntimeExports.jsx("select", { value: draft.productId, onChange: (e) => {
	                                        const nextProduct = products.find((product) => product.id === e.target.value);
	                                        if (!nextProduct) {
	                                            return;
	                                        }
	                                        setDraft({
	                                            ...draft,
	                                            productId: nextProduct.id,
	                                            fabricColor: getProductCustomization(nextProduct).colors[0]?.hex ?? draft.fabricColor,
	                                            selectedColor: getProductCustomization(nextProduct).colors[0]?.name,
	                                            materialId: getProductCustomization(nextProduct).materials[0]?.id ?? draft.materialId,
	                                            selectedMaterial: getProductCustomization(nextProduct).materials[0]?.name,
	                                            widthIn: getProductCustomization(nextProduct).dimensions.width?.default ??
	                                                nextProduct.customizer.defaultWidthIn,
	                                            depthIn: getProductCustomization(nextProduct).dimensions.length?.default ??
	                                                nextProduct.customizer.defaultDepthIn,
	                                            heightIn: getProductCustomization(nextProduct).dimensions.height?.default,
	                                            selectedAddOns: [],
	                                        });
	                                    }, disabled: isApplying, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6 disabled:opacity-60", children: products.map((p) => (jsxRuntimeExports.jsx("option", { value: p.id, children: p.name }, p.id))) }), jsxRuntimeExports.jsxs("div", { className: "aspect-square bg-purple-50 rounded-lg mb-6 flex flex-col items-center justify-center border border-purple-200 text-center px-4", children: [jsxRuntimeExports.jsx(Layers, { className: "w-12 h-12 text-purple-400 mb-2" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-purple-600 font-medium", children: selectedProduct?.customizer.thumbnailLabel ?? 'Sectional' }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Instantly updates with your selections" })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm border-t border-gray-200 pt-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Base Price:" }), jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900", children: price.base > 0 ? `$${price.base.toLocaleString()}` : 'Quote required' })] }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Base Size:" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [selectedProduct?.dimensions.width, selectedProduct?.dimensions.unit, " W"] })] }), jsxRuntimeExports.jsxs("div", { className: "text-gray-600", children: [jsxRuntimeExports.jsx("span", { className: "block mb-1", children: "Materials:" }), jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900", children: selectedProduct?.materials.join(', ') || 'Custom' })] }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Customizations:" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-purple-600", children: ["+$", price.customizations.toLocaleString()] })] }), jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 pt-3 flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-900", children: "Total:" }), jsxRuntimeExports.jsx("span", { className: "font-bold text-lg text-gray-900", children: price.quoteRequired ? 'Quote required' : `$${price.total.toLocaleString()}` })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-3 gap-2", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onSaveConfig, disabled: isApplying, className: "px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50", children: "Save" }), jsxRuntimeExports.jsxs("button", { type: "button", onClick: onShareLink, disabled: isApplying, className: "px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 inline-flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4" }), "Share"] }), jsxRuntimeExports.jsxs("button", { type: "button", onClick: onExportPdf, disabled: isApplying, className: "px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 inline-flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx(FileDown, { className: "w-4 h-4" }), "PDF"] })] })] }) }), jsxRuntimeExports.jsx("div", { className: "self-start lg:col-span-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-lg", children: [jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-gray-900 mb-6 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Palette, { className: "w-5 h-5 text-purple-600" }), "Customization Options"] }), jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-900 mb-3", children: "Color" }), colorSwatches.length > 0 ? (jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: colorSwatches.map((color) => {
	                                                const isSelected = draft.fabricColor.toLowerCase() === color.hex.toLowerCase();
	                                                return (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDraft({ ...draft, fabricColor: color.hex, selectedColor: color.name }), disabled: isApplying, className: [
	                                                        'flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm transition-all',
	                                                        isSelected
	                                                            ? 'border-blue-500 bg-blue-50'
	                                                            : 'border-gray-200 hover:border-gray-300',
	                                                        isApplying ? 'opacity-60 cursor-not-allowed' : '',
	                                                    ].join(' '), "aria-label": `Select color ${color.name}`, title: color.name, children: [jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border border-gray-200", style: { backgroundColor: color.hex } }), jsxRuntimeExports.jsx("span", { children: color.name }), formatModifierLabel(color.price) && (jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-gray-500", children: formatModifierLabel(color.price) }))] }, color.name));
	                                            }) })) : (jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No colors available for this product" }))] }), jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-900 mb-3", children: "Material" }), materialOptions.length > 0 ? (jsxRuntimeExports.jsx("div", { className: "space-y-2", children: materialOptions.map((m) => {
	                                                const isSelected = draft.materialId === m.id;
	                                                return (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDraft({ ...draft, materialId: m.id, selectedMaterial: m.name }), disabled: isApplying, className: [
	                                                        'w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm transition-all text-left',
	                                                        isSelected
	                                                            ? 'border-purple-500 bg-purple-50'
	                                                            : 'border-gray-200 hover:border-gray-300',
	                                                        isApplying ? 'opacity-60 cursor-not-allowed' : '',
	                                                    ].join(' '), children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: m.name }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: m.description || getMaterialDescription(m.name) })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [formatModifierLabel(m.priceDelta) && (jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-gray-500", children: formatModifierLabel(m.priceDelta) })), isSelected && jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-purple-500" })] })] }, m.id));
	                                            }) })) : (jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No materials available for this product" }))] }), (customization.dimensions.width || customization.dimensions.length || customization.dimensions.height) && (jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4 text-purple-600" }), "Dimensions"] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [customization.dimensions.width && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Width" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [draft.widthIn, " ", customization.dimensions.width.unit] })] }), jsxRuntimeExports.jsx("input", { type: "range", min: widthMin, max: widthMax, value: draft.widthIn, onChange: (e) => setDraft({ ...draft, widthIn: Number(e.target.value) }), disabled: isApplying, className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [jsxRuntimeExports.jsxs("span", { children: [widthMin, customization.dimensions.width.unit] }), jsxRuntimeExports.jsxs("span", { children: [widthMax, customization.dimensions.width.unit] })] }), typeof customization.dimensions.width.pricePerExtraUnit === 'number' && (jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-gray-500", children: ["+$", customization.dimensions.width.pricePerExtraUnit.toLocaleString(), " per extra ", customization.dimensions.width.unit] }))] })), customization.dimensions.length && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Length" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [draft.depthIn, " ", customization.dimensions.length.unit] })] }), jsxRuntimeExports.jsx("input", { type: "range", min: lengthMin, max: lengthMax, value: draft.depthIn, onChange: (e) => setDraft({ ...draft, depthIn: Number(e.target.value) }), disabled: isApplying, className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [jsxRuntimeExports.jsxs("span", { children: [lengthMin, customization.dimensions.length.unit] }), jsxRuntimeExports.jsxs("span", { children: [lengthMax, customization.dimensions.length.unit] })] }), typeof customization.dimensions.length.pricePerExtraUnit === 'number' && (jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-gray-500", children: ["+$", customization.dimensions.length.pricePerExtraUnit.toLocaleString(), " per extra ", customization.dimensions.length.unit] }))] })), customization.dimensions.height && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Height" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [draft.heightIn ?? baseDimensions.height, " ", customization.dimensions.height.unit] })] }), jsxRuntimeExports.jsx("input", { type: "range", min: heightMin, max: heightMax, value: draft.heightIn ?? baseDimensions.height, onChange: (e) => setDraft({ ...draft, heightIn: Number(e.target.value) }), disabled: isApplying, className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [jsxRuntimeExports.jsxs("span", { children: [heightMin, customization.dimensions.height.unit] }), jsxRuntimeExports.jsxs("span", { children: [heightMax, customization.dimensions.height.unit] })] }), typeof customization.dimensions.height.pricePerExtraUnit === 'number' && (jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-gray-500", children: ["+$", customization.dimensions.height.pricePerExtraUnit.toLocaleString(), " per extra ", customization.dimensions.height.unit] }))] }))] }), validationErrors && validationErrors.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm", children: [jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1", children: "Adjustments need review" }), jsxRuntimeExports.jsx("ul", { className: "list-disc pl-5 space-y-1", children: validationErrors.map((e, i) => (jsxRuntimeExports.jsx("li", { children: e }, i))) })] }))] })), !(customization.dimensions.width || customization.dimensions.length || customization.dimensions.height) &&
	                                    (customization.dimensionSummary.width ||
	                                        customization.dimensionSummary.length ||
	                                        customization.dimensionSummary.height) && (jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4 text-purple-600" }), "Dimensions"] }), jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm", children: [customization.dimensionSummary.width && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Width" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [customization.dimensionSummary.width.value, " ", customization.dimensionSummary.width.unit] })] })), customization.dimensionSummary.length && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Length" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [customization.dimensionSummary.length.value, " ", customization.dimensionSummary.length.unit] })] })), customization.dimensionSummary.height && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Height" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [customization.dimensionSummary.height.value, " ", customization.dimensionSummary.height.unit] })] }))] })] })), customization.optionLabels.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mb-6 space-y-3", children: customization.optionLabels.map((option) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: option.name }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: option.values.map((value) => (jsxRuntimeExports.jsxs("span", { className: "px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700", children: [value.name, formatModifierLabel(value.price, '') && (jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs font-semibold text-gray-500", children: formatModifierLabel(value.price, '') }))] }, value.name))) })] }, option.name))) })), customization.addOns.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-purple-600" }), "Add-ons"] }), jsxRuntimeExports.jsx("div", { className: "space-y-2", children: customization.addOns.map((addOn) => {
	                                                const selectedAddOns = draft.selectedAddOns ?? [];
	                                                const isChecked = selectedAddOns.includes(addOn.name);
	                                                return (jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition", children: [jsxRuntimeExports.jsx("input", { type: "checkbox", checked: isChecked, onChange: (e) => {
	                                                                const nextSelectedAddOns = e.target.checked
	                                                                    ? [...selectedAddOns, addOn.name]
	                                                                    : selectedAddOns.filter((name) => name !== addOn.name);
	                                                                setDraft({ ...draft, selectedAddOns: nextSelectedAddOns });
	                                                            }, disabled: isApplying, className: "w-4 h-4 text-purple-600 rounded accent-purple-600" }), jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-gray-900", children: addOn.name }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: typeof addOn.price === 'number' ? `+$${addOn.price.toLocaleString()}` : 'Quote' })] }, addOn.name));
	                                            }) })] })), !customization.hasOptions && (jsxRuntimeExports.jsx("div", { className: "mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900", children: "This product does not have predefined customization options. Tell us what you want and we'll send it as a quote request." })), jsxRuntimeExports.jsxs("button", { type: "button", onClick: onApply, disabled: isApplying || (validationErrors?.length ?? 0) > 0, className: "w-full py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed", children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }), isApplying ? 'Applying...' : 'Apply Customizations'] })] }) }), jsxRuntimeExports.jsx("div", { className: "self-start lg:col-span-5", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-lg sticky top-6", children: [jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5 mb-4", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: "Tell Us What You Want" }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-3", children: "Describe exactly what you need - AI will tailor suggestions to your specific request" }), jsxRuntimeExports.jsx("textarea", { value: additionalDetails, onChange: (e) => {
	                                                setAdditionalDetails(e.target.value);
	                                                setCharCount(e.target.value.length);
	                                                setDraft({ ...draft, customerRequestText: e.target.value });
	                                            }, maxLength: 500, rows: 5, placeholder: `Examples:
- I want something that matches my grey walls
- Need storage space underneath
- Looking for pet-friendly fabric
- Want it to feel cozy but modern
- Must fit through a 32 inch doorway`, className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [charCount, "/500 characters"] }), additionalDetails && (jsxRuntimeExports.jsx("button", { onClick: () => {
	                                                        setAdditionalDetails('');
	                                                        setCharCount(0);
	                                                        setDraft({ ...draft, customerRequestText: '' });
	                                                    }, className: "text-xs text-gray-400 hover:text-gray-600", children: "Clear" }))] }), jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mb-2", children: "Quick adds:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
	                                                        'Pet-friendly fabric',
	                                                        'Easy to clean',
	                                                        'Extra storage',
	                                                        'Child-safe',
	                                                        'Matches grey walls',
	                                                        'Cozy and warm feel',
	                                                        'Minimalist style',
	                                                        'Must fit small space',
	                                                    ].map((chip) => (jsxRuntimeExports.jsxs("button", { onClick: () => {
	                                                            const newText = additionalDetails
	                                                                ? `${additionalDetails}, ${chip.toLowerCase()}`
	                                                                : chip;
	                                                            setAdditionalDetails(newText);
	                                                            setCharCount(newText.length);
	                                                            setDraft({ ...draft, customerRequestText: newText });
	                                                        }, className: "text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 px-3 py-1 rounded-full transition-colors", children: ["+ ", chip] }, chip))) })] })] }), roomPlannerPhoto && (jsxRuntimeExports.jsx("button", { onClick: handleAnalyzeWithRoomPlannerPhoto, disabled: analyzing, className: "w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 mb-4", children: analyzing ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }), "Analyzing your room..."] })) : ('✨ Get AI Suggestions') })), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-4 max-h-[380px] overflow-y-auto", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "AI Suggestions" }), !roomPlannerPhoto && !analyzing && (jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [jsxRuntimeExports.jsx("p", { className: "text-3xl mb-2", children: "\uD83C\uDFE0" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Use Room Planner first to upload a room photo and get personalized suggestions" })] })), analyzing && (jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-8 gap-3", children: [jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Analyzing your room and requirements..." })] })), aiSuggestions && !analyzing && (jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 rounded-lg p-3", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-blue-900", children: "Room Fit Score" }), jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-blue-600", children: [aiSuggestions.fitScore, "%"] })] }), jsxRuntimeExports.jsx("div", { className: "w-full bg-blue-200 rounded-full h-2", children: jsxRuntimeExports.jsx("div", { className: "bg-blue-600 h-2 rounded-full transition-all", style: { width: `${aiSuggestions.fitScore}%` } }) }), jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-700 mt-2", children: getShortReason(aiSuggestions.fitReason) })] }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: "Room style detected:" }), jsxRuntimeExports.jsx("span", { className: "text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full", children: aiSuggestions.roomStyle })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1.5", children: "Room colors:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: aiSuggestions.dominantColors?.map((color, i) => (jsxRuntimeExports.jsx("span", { className: "text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full", children: color }, i))) })] }), jsxRuntimeExports.jsx("div", { className: "space-y-2", children: compactSuggestions.map((rec, i) => (jsxRuntimeExports.jsxs("div", { className: "border border-gray-100 rounded-lg p-2.5", children: [jsxRuntimeExports.jsx("span", { className: `text-xs font-medium px-2 py-0.5 rounded-full ${rec.type === 'color'
                                                                    ? 'bg-purple-100 text-purple-700'
                                                                    : rec.type === 'material'
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : rec.type === 'customization'
                                                                            ? 'bg-blue-100 text-blue-700'
                                                                            : 'bg-orange-100 text-orange-700'}`, children: rec.type }), jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-900 mt-1.5", children: rec.suggestion }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: getShortReason(rec.reason) })] }, i))) }), hasMoreSuggestions && (jsxRuntimeExports.jsx("button", { type: "button", onClick: handleViewFullRoomAnalysis, className: "w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100", children: "View full room analysis" })), aiSuggestions.warning && (jsxRuntimeExports.jsx("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-2.5", children: jsxRuntimeExports.jsxs("p", { className: "text-xs text-yellow-800", children: ["\u26A0\uFE0F ", aiSuggestions.warning] }) })), roomPlannerPhoto && (jsxRuntimeExports.jsx("button", { onClick: handleAnalyzeWithRoomPlannerPhoto, className: "w-full text-sm text-blue-600 hover:underline text-center mt-2", children: "Re-analyze with updated details" }))] }))] })] }) })] }) }) }));
	}

	const createDraftForProduct = (product) => ({
	    productId: product.id,
	    fabricColor: getCustomizationForProduct(product).colors[0]?.hex ?? '#9CA3AF',
	    selectedColor: getCustomizationForProduct(product).colors[0]?.name,
	    materialId: getCustomizationForProduct(product).materials[0]?.id ?? 'standard_material',
	    selectedMaterial: getCustomizationForProduct(product).materials[0]?.name,
	    widthIn: getCustomizationForProduct(product).dimensions.width?.default ?? product.customizer.defaultWidthIn,
	    depthIn: getCustomizationForProduct(product).dimensions.length?.default ?? product.customizer.defaultDepthIn,
	    heightIn: getCustomizationForProduct(product).dimensions.height?.default,
	    addons: { throwPillows: false, ottoman: false },
	    selectedAddOns: [],
	    rotationDeg: 0,
	    zoom: 1,
	    roomContext: { lengthFt: 12.5, widthFt: 15.2 },
	});
	const isDemoProduct = (product) => !product.source;
	const normalizeDisplayOptions = (value) => normalizeCustomizationOptionValues(value).map((option) => ({
	    name: getOptionName(option),
	    price: getOptionPrice(option),
	}));
	const hasDimensionRange = (dimension) => dimension?.min !== undefined || dimension?.max !== undefined;
	const getCustomizationForProduct = (product) => {
	    const explicit = product.customizationOptions;
	    const allowDemoFallback = isDemoProduct(product);
	    const pricedColors = normalizeDisplayOptions(explicit?.colors);
	    const pricedMaterials = normalizeDisplayOptions(explicit?.materials);
	    const colorNames = pricedColors.map((option) => option.name);
	    const materialNames = pricedMaterials.map((option) => option.name);
	    const productColorNames = product.colors
	        .map((color) => color.name)
	        .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
	    const productMaterialNames = product.materials
	        .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
	    const colors = (colorNames.length > 0 ? colorNames : productColorNames)
	        .map((name, index) => {
	        const existing = product.colors.find((color) => color.name.toLowerCase() === name.toLowerCase());
	        const pricedColor = pricedColors.find((option) => option.name.toLowerCase() === name.toLowerCase());
	        return {
	            ...(existing ?? { name, hex: product.colors[index]?.hex ?? '#E5E7EB', available: true }),
	            price: pricedColor?.price,
	        };
	    })
	        .filter((color) => color.available);
	    const materials = (materialNames.length > 0 ? materialNames : productMaterialNames).map((name, index) => {
	        const existing = product.customizer.materialOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
	        const pricedMaterial = pricedMaterials.find((option) => option.name.toLowerCase() === name.toLowerCase());
	        return existing
	            ? { ...existing, priceDelta: pricedMaterials.length > 0 ? pricedMaterial?.price : existing.priceDelta }
	            : {
	                id: name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || `material_${index}`,
	                name,
	                priceDelta: pricedMaterial?.price ?? 0,
	                description: getMaterialDescription(name),
	            };
	    });
	    return {
	        colors,
	        materials,
	        dimensions: {
	            width: hasDimensionRange(explicit?.dimensions?.width)
	                ? explicit?.dimensions?.width
	                : (allowDemoFallback ? { default: product.customizer.defaultWidthIn, unit: 'in' } : undefined),
	            length: hasDimensionRange(explicit?.dimensions?.length)
	                ? explicit?.dimensions?.length
	                : (allowDemoFallback ? { default: product.customizer.defaultDepthIn, unit: 'in' } : undefined),
	            height: hasDimensionRange(explicit?.dimensions?.height) ? explicit?.dimensions?.height : undefined,
	        },
	        addOns: explicit?.addOns ??
	            (allowDemoFallback
	                ? [
	                    { name: 'Throw Pillows (2)', price: 60 },
	                    { name: 'Ottoman', price: 350 },
	                ]
	                : []),
	        shopifyOptions: explicit?.shopifyOptions ?? explicit?.optionLabels ?? [],
	    };
	};
	const getColorName = (product, hex) => product.colors.find((color) => color.hex.toLowerCase() === hex.toLowerCase())?.name ?? hex;
	const getMaterialOption = (product, materialId) => product.customizer.materialOptions.find((option) => option.id === materialId) ??
	    product.customizer.materialOptions[0];
	const getSelectedColorOption = (product, draft) => getCustomizationForProduct(product).colors.find((color) => draft.selectedColor
	    ? color.name.toLowerCase() === draft.selectedColor.toLowerCase()
	    : color.hex.toLowerCase() === draft.fabricColor.toLowerCase());
	const getProductImageUrl = (product) => {
	    const candidate = product.imageUrl ||
	        product.image ||
	        product.thumbnail ||
	        product.images.front ||
	        product.images.thumbnail ||
	        product.images.angle ||
	        product.images.side;
	    return candidate?.trim() || undefined;
	};
	const getSelectedShopifyOptions = (product) => {
	    const customization = getCustomizationForProduct(product);
	    const selectedOptions = [];
	    customization.shopifyOptions.forEach((option) => {
	        const values = normalizeCustomizationOptionValues(option.values);
	        if (values.length !== 1)
	            return;
	        const value = values[0];
	        const price = getOptionPrice(value);
	        selectedOptions.push({
	            name: option.name,
	            value: getOptionName(value),
	            ...(price !== undefined ? { price } : {}),
	        });
	    });
	    return selectedOptions;
	};
	const calculateDimensionAdjustment = (selected, dimension) => {
	    if (!dimension || selected === undefined)
	        return { amount: 0, quoteRequired: false };
	    if (selected <= (dimension.default ?? selected))
	        return { amount: 0, quoteRequired: false };
	    if (typeof dimension.pricePerExtraUnit !== 'number')
	        return { amount: 0, quoteRequired: true };
	    return {
	        amount: Number(((selected - (dimension.default ?? selected)) * dimension.pricePerExtraUnit).toFixed(2)),
	        quoteRequired: false,
	    };
	};
	function FurnitureCustomizerWidget({ config = {}, onNavigateToRoomPlanner, selectedProduct: sharedSelectedProduct, onSelectedProductChange, }) {
	    const mergedConfig = reactExports.useMemo(() => mergeConfig(config), [config]);
	    const apiClient = reactExports.useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
	    const storage = reactExports.useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
	    const enabledActions = reactExports.useMemo(() => getEnabledActions(mergedConfig), [mergedConfig]);
	    const analyticsContext = reactExports.useMemo(() => ({
	        apiBaseUrl: mergedConfig.apiBaseUrl,
	        storeId: mergedConfig.storeId || mergedConfig.widgetId,
	        widgetId: mergedConfig.widgetId,
	    }), [mergedConfig.apiBaseUrl, mergedConfig.storeId, mergedConfig.widgetId]);
	    const primaryColor = getPrimaryColor(mergedConfig);
	    const [catalogProducts, setCatalogProducts] = reactExports.useState([]);
	    const availableProducts = reactExports.useMemo(() => {
	        const baseProducts = catalogProducts.length > 0 ? catalogProducts : products;
	        if (!sharedSelectedProduct) {
	            return baseProducts;
	        }
	        const existing = baseProducts.find((product) => product.id === sharedSelectedProduct.id);
	        return existing ? baseProducts : [sharedSelectedProduct, ...baseProducts];
	    }, [catalogProducts, sharedSelectedProduct]);
	    const defaultProduct = reactExports.useMemo(() => sharedSelectedProduct ?? availableProducts[0] ?? products[0], [availableProducts, sharedSelectedProduct]);
	    const [, setCustomizedItem] = reactExports.useState(null);
	    const [savedItem, setSavedItem] = reactExports.useState(null);
	    const [isLoading, setIsLoading] = reactExports.useState(false);
	    const [error, setError] = reactExports.useState(null);
	    const [saveNotification, setSaveNotification] = reactExports.useState(null);
	    const [lastConfig, setLastConfig] = reactExports.useState(null);
	    const [baseProduct, setBaseProduct] = reactExports.useState(defaultProduct);
	    const [draft, setDraft] = reactExports.useState(() => createDraftForProduct(defaultProduct));
	    const [history, setHistory] = reactExports.useState(() => [createDraftForProduct(defaultProduct)]);
	    const [historyIndex, setHistoryIndex] = reactExports.useState(0);
	    const [showFinalizeModal, setShowFinalizeModal] = reactExports.useState(false);
	    const [showQuoteForm, setShowQuoteForm] = reactExports.useState(false);
	    const [quoteSuccess, setQuoteSuccess] = reactExports.useState(false);
	    const canUndo = historyIndex > 0;
	    const canRedo = historyIndex < history.length - 1;
	    const setDraftWithHistory = reactExports.useCallback((next) => {
	        setDraft(next);
	        setSavedItem(null);
	        setCustomizedItem(null);
	        setLastConfig(null);
	        setHistory((prev) => {
	            const sliced = prev.slice(0, historyIndex + 1);
	            const nextHistory = [...sliced, next];
	            return nextHistory.length > 60 ? nextHistory.slice(nextHistory.length - 60) : nextHistory;
	        });
	        setHistoryIndex((prev) => Math.min(prev + 1, 59));
	    }, [historyIndex]);
	    const applySelectedProduct = reactExports.useCallback((product, clearSessionStorage = false) => {
	        const nextDraft = createDraftForProduct(product);
	        setBaseProduct(product);
	        setDraft(nextDraft);
	        setHistory([nextDraft]);
	        setHistoryIndex(0);
	        setCustomizedItem(null);
	        setSavedItem(null);
	        setError(null);
	        setSaveNotification(null);
	        setLastConfig(null);
	        onSelectedProductChange?.(product);
	        if (clearSessionStorage && typeof window !== 'undefined') {
	            sessionStorage.removeItem('modly-customize-item');
	        }
	    }, [onSelectedProductChange]);
	    reactExports.useEffect(() => {
	        let cancelled = false;
	        const loadCatalogProducts = async () => {
	            try {
	                const response = await apiClient.getCatalog();
	                if (cancelled) {
	                    return;
	                }
	                const catalogItems = Array.isArray(response.catalog?.products) ? response.catalog.products : [];
	                const nextProducts = catalogItems.length > 0
	                    ? catalogItems.map((product, index) => productFromCatalogProduct(product, index))
	                    : Array.isArray(response.items)
	                        ? response.items.map((item) => productFromFurnitureItem(item))
	                        : [];
	                setCatalogProducts(nextProducts.filter(Boolean));
	            }
	            catch (catalogError) {
	                if (!cancelled) {
	                    console.warn('Failed to load catalog products for customizer:', catalogError);
	                    setCatalogProducts([]);
	                }
	            }
	        };
	        loadCatalogProducts();
	        return () => {
	            cancelled = true;
	        };
	    }, [apiClient]);
	    reactExports.useEffect(() => {
	        if (defaultProduct.id !== baseProduct.id) {
	            applySelectedProduct(defaultProduct);
	        }
	    }, [applySelectedProduct, baseProduct.id, defaultProduct]);
	    reactExports.useEffect(() => {
	        const loadFromSessionStorage = () => {
	            if (typeof window === 'undefined') {
	                return;
	            }
	            const stored = sessionStorage.getItem('modly-customize-item');
	            if (!stored) {
	                return;
	            }
	            try {
	                const item = JSON.parse(stored);
	                const product = productFromFurnitureItem(item);
	                if (product.id !== baseProduct.id) {
	                    applySelectedProduct(product, true);
	                }
	                else {
	                    sessionStorage.removeItem('modly-customize-item');
	                }
	            }
	            catch (sessionError) {
	                console.warn('Failed to parse selected catalog item:', sessionError);
	            }
	        };
	        loadFromSessionStorage();
	        window.addEventListener('focus', loadFromSessionStorage);
	        return () => {
	            window.removeEventListener('focus', loadFromSessionStorage);
	        };
	    }, [applySelectedProduct, baseProduct.id]);
	    const handleUndo = reactExports.useCallback(() => {
	        setSavedItem(null);
	        setCustomizedItem(null);
	        setLastConfig(null);
	        setHistoryIndex((idx) => {
	            const nextIdx = Math.max(0, idx - 1);
	            setDraft(history[nextIdx] ?? createDraftForProduct(baseProduct));
	            return nextIdx;
	        });
	    }, [baseProduct, history]);
	    const handleRedo = reactExports.useCallback(() => {
	        setSavedItem(null);
	        setCustomizedItem(null);
	        setLastConfig(null);
	        setHistoryIndex((idx) => {
	            const nextIdx = Math.min(history.length - 1, idx + 1);
	            setDraft(history[nextIdx] ?? createDraftForProduct(baseProduct));
	            return nextIdx;
	        });
	    }, [baseProduct, history]);
	    const selectedProduct = reactExports.useMemo(() => availableProducts.find((product) => product.id === draft.productId) ?? baseProduct, [availableProducts, baseProduct, draft.productId]);
	    reactExports.useEffect(() => {
	        if (selectedProduct.id !== baseProduct.id) {
	            setBaseProduct(selectedProduct);
	            onSelectedProductChange?.(selectedProduct);
	        }
	    }, [baseProduct.id, onSelectedProductChange, selectedProduct]);
	    const validationErrors = reactExports.useMemo(() => {
	        const errs = [];
	        const customization = getCustomizationForProduct(selectedProduct);
	        const widthRange = [
	            customization.dimensions.width?.min ?? selectedProduct.customizer.widthRangeIn[0],
	            customization.dimensions.width?.max ?? selectedProduct.customizer.widthRangeIn[1],
	        ];
	        const depthRange = [
	            customization.dimensions.length?.min ?? selectedProduct.customizer.depthRangeIn[0],
	            customization.dimensions.length?.max ?? selectedProduct.customizer.depthRangeIn[1],
	        ];
	        if (customization.dimensions.width && (draft.widthIn < widthRange[0] || draft.widthIn > widthRange[1])) {
	            errs.push(`Width must be between ${widthRange[0]} and ${widthRange[1]} inches.`);
	        }
	        if (customization.dimensions.length && (draft.depthIn < depthRange[0] || draft.depthIn > depthRange[1])) {
	            errs.push(`Depth must be between ${depthRange[0]} and ${depthRange[1]} inches.`);
	        }
	        if (draft.zoom < 0.8 || draft.zoom > 1.4) {
	            errs.push('Zoom must be between 0.8x and 1.4x.');
	        }
	        return errs;
	    }, [draft.depthIn, draft.widthIn, draft.zoom, selectedProduct]);
	    const price = reactExports.useMemo(() => {
	        const customization = getCustomizationForProduct(selectedProduct);
	        const selectedColor = getSelectedColorOption(selectedProduct, draft);
	        const selectedMaterial = customization.materials.find((material) => draft.selectedMaterial
	            ? material.name.toLowerCase() === draft.selectedMaterial.toLowerCase()
	            : material.id === draft.materialId);
	        const selectedAddOns = draft.selectedAddOns ?? [];
	        const selectedAddOnDetails = customization.addOns.filter((addOn) => selectedAddOns.includes(addOn.name));
	        const colorPrice = selectedColor?.price;
	        const materialPrice = selectedMaterial?.priceDelta;
	        const widthAdjustment = calculateDimensionAdjustment(draft.widthIn, customization.dimensions.width);
	        const lengthAdjustment = calculateDimensionAdjustment(draft.depthIn, customization.dimensions.length);
	        const heightAdjustment = calculateDimensionAdjustment(draft.heightIn, customization.dimensions.height);
	        const hasUnpricedAddOn = selectedAddOnDetails.some((addOn) => typeof addOn.price !== 'number');
	        const selectedPricedColorIsUnknown = selectedColor !== undefined && typeof selectedColor.price !== 'number';
	        const selectedPricedMaterialIsUnknown = selectedMaterial !== undefined && typeof selectedMaterial.priceDelta !== 'number';
	        const addonsUpcharge = selectedAddOnDetails.reduce((sum, addOn) => sum + (typeof addOn.price === 'number' ? addOn.price : 0), 0);
	        const dimensionsUpcharge = widthAdjustment.amount + lengthAdjustment.amount + heightAdjustment.amount;
	        const dimensionAdjustments = {
	            width: widthAdjustment.amount,
	            length: lengthAdjustment.amount,
	            height: heightAdjustment.amount,
	            total: dimensionsUpcharge,
	        };
	        const customizations = (typeof colorPrice === 'number' ? colorPrice : 0) +
	            (typeof materialPrice === 'number' ? materialPrice : 0) +
	            dimensionsUpcharge +
	            addonsUpcharge;
	        const total = selectedProduct.basePrice + customizations;
	        const lineItems = [
	            { label: 'Color', amount: typeof colorPrice === 'number' ? colorPrice : 0 },
	            { label: 'Material', amount: typeof materialPrice === 'number' ? materialPrice : 0 },
	            { label: 'Dimensions', amount: dimensionsUpcharge },
	            { label: 'Add-ons', amount: addonsUpcharge },
	        ].filter((lineItem) => lineItem.amount !== 0);
	        return {
	            base: selectedProduct.basePrice,
	            customizations,
	            total,
	            quoteRequired: selectedProduct.basePrice <= 0 ||
	                selectedPricedColorIsUnknown ||
	                selectedPricedMaterialIsUnknown ||
	                widthAdjustment.quoteRequired ||
	                lengthAdjustment.quoteRequired ||
	                heightAdjustment.quoteRequired ||
	                hasUnpricedAddOn,
	            dimensionAdjustments,
	            lineItems,
	        };
	    }, [
	        draft.depthIn,
	        draft.fabricColor,
	        draft.heightIn,
	        draft.materialId,
	        draft.selectedAddOns,
	        draft.selectedColor,
	        draft.selectedMaterial,
	        draft.widthIn,
	        selectedProduct,
	    ]);
	    const configStorageKey = reactExports.useMemo(() => `${mergedConfig.storageKey}:customizer-configs`, [mergedConfig.storageKey]);
	    const saveDraftConfig = reactExports.useCallback(() => {
	        try {
	            if (typeof window === 'undefined')
	                return;
	            const existingRaw = localStorage.getItem(configStorageKey);
	            const existing = existingRaw
	                ? JSON.parse(existingRaw)
	                : [];
	            const materialName = getMaterialOption(selectedProduct, draft.materialId)?.name ?? 'Custom';
	            const entry = {
	                id: `cfg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
	                savedAt: new Date().toISOString(),
	                productId: selectedProduct.id,
	                name: `${selectedProduct.name} · ${materialName}`,
	                draft,
	                price: price.total,
	            };
	            localStorage.setItem(configStorageKey, JSON.stringify([entry, ...existing].slice(0, 25)));
	            trackWidgetEvent({
	                ...analyticsContext,
	                type: 'configuration_saved',
	                productId: selectedProduct.id,
	                productName: selectedProduct.name,
	                metadata: {
	                    source: 'customizer',
	                    category: selectedProduct.category,
	                    estimatedTotal: price.quoteRequired ? undefined : price.total,
	                    pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
	                },
	            });
	            setSaveNotification('Configuration saved!');
	            setTimeout(() => setSaveNotification(null), 2500);
	        }
	        catch (saveError) {
	            console.error('Failed to save configuration:', saveError);
	            setError('Failed to save configuration.');
	        }
	    }, [analyticsContext, configStorageKey, draft, price, selectedProduct]);
	    const encodeSharePayload = reactExports.useCallback((payload) => {
	        const json = JSON.stringify(payload);
	        const b64 = typeof window !== 'undefined' ? window.btoa(unescape(encodeURIComponent(json))) : '';
	        return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
	    }, []);
	    const shareLink = reactExports.useMemo(() => {
	        if (typeof window === 'undefined')
	            return '';
	        const url = new URL(window.location.href);
	        url.searchParams.set('modlyConfig', encodeSharePayload({ v: 1, productId: selectedProduct.id, draft, total: price.total }));
	        return url.toString();
	    }, [draft, encodeSharePayload, price.total, selectedProduct.id]);
	    const copyShareLink = reactExports.useCallback(async () => {
	        try {
	            if (typeof window === 'undefined')
	                return;
	            if (navigator.clipboard?.writeText) {
	                await navigator.clipboard.writeText(shareLink);
	            }
	            else {
	                const textarea = document.createElement('textarea');
	                textarea.value = shareLink;
	                document.body.appendChild(textarea);
	                textarea.select();
	                document.execCommand('copy');
	                textarea.remove();
	            }
	            setSaveNotification('Share link copied to clipboard!');
	            setTimeout(() => setSaveNotification(null), 2500);
	        }
	        catch (copyError) {
	            console.error('Failed to copy share link:', copyError);
	            setError('Failed to copy share link.');
	        }
	    }, [shareLink]);
	    const exportAsPdf = reactExports.useCallback(() => {
	        if (typeof window === 'undefined')
	            return;
	        try {
	            const customization = getCustomizationForProduct(selectedProduct);
	            const selectedColor = getSelectedColorOption(selectedProduct, draft);
	            const selectedMaterial = customization.materials.find((material) => draft.selectedMaterial
	                ? material.name.toLowerCase() === draft.selectedMaterial.toLowerCase()
	                : material.id === draft.materialId);
	            const selectedColorName = draft.selectedColor ??
	                (customization.colors.length > 0
	                    ? getColorName(selectedProduct, draft.fabricColor)
	                    : undefined);
	            const selectedMaterialName = draft.selectedMaterial ??
	                (customization.materials.length > 0
	                    ? getMaterialOption(selectedProduct, draft.materialId)?.name
	                    : undefined);
	            const selectedAddOns = customization.addOns.filter((addOn) => (draft.selectedAddOns ?? []).includes(addOn.name));
	            const generatedAt = new Date();
	            const blob = generateCustomizationPdf({
	                brandName: mergedConfig.widgetTitle || mergedConfig.storeName || 'ModlyAI',
	                generatedAt,
	                referenceId: savedItem?.id,
	                storeId: selectedProduct.storeId ?? mergedConfig.storeId,
	                widgetId: mergedConfig.widgetId,
	                product: {
	                    name: selectedProduct.name,
	                    category: selectedProduct.category,
	                    productUrl: selectedProduct.productUrl,
	                    imageUrl: getProductImageUrl(selectedProduct),
	                    basePrice: selectedProduct.basePrice,
	                    pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
	                    estimatedTotal: price.quoteRequired ? undefined : price.total,
	                },
	                selectedCustomizations: {
	                    color: selectedColorName
	                        ? { label: 'Color', value: selectedColorName, price: selectedColor?.price }
	                        : undefined,
	                    material: selectedMaterialName
	                        ? { label: 'Material', value: selectedMaterialName, price: selectedMaterial?.priceDelta }
	                        : undefined,
	                    shopifyOptions: getSelectedShopifyOptions(selectedProduct).map((option) => ({
	                        label: option.name,
	                        value: option.value,
	                        price: option.price,
	                    })),
	                    dimensions: {
	                        length: draft.depthIn,
	                        width: draft.widthIn,
	                        height: draft.heightIn,
	                        unit: customization.dimensions.width?.unit ?? customization.dimensions.length?.unit ?? 'in',
	                    },
	                    dimensionPriceAdjustments: price.dimensionAdjustments,
	                    addOns: selectedAddOns.map((addOn) => ({
	                        label: 'Add-on',
	                        value: addOn.name,
	                        price: addOn.price,
	                    })),
	                    customerRequestText: draft.customerRequestText,
	                },
	                pricing: {
	                    basePrice: price.base,
	                    lineItems: price.lineItems.map((lineItem) => ({
	                        label: lineItem.label === 'Dimensions' ? 'Dimension adjustment' : lineItem.label,
	                        amount: lineItem.amount,
	                    })),
	                    customizationTotal: price.customizations,
	                    estimatedTotal: price.quoteRequired ? undefined : price.total,
	                    quoteRequired: price.quoteRequired,
	                },
	            });
	            const blobUrl = URL.createObjectURL(blob);
	            const link = document.createElement('a');
	            link.href = blobUrl;
	            link.download = createCustomizationPdfFilename(selectedProduct.name, generatedAt);
	            document.body.appendChild(link);
	            link.click();
	            link.remove();
	            window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
	            setError(null);
	            trackWidgetEvent({
	                ...analyticsContext,
	                type: 'pdf_exported',
	                productId: selectedProduct.id,
	                productName: selectedProduct.name,
	                metadata: {
	                    source: 'customizer',
	                    category: selectedProduct.category,
	                    estimatedTotal: price.quoteRequired ? undefined : price.total,
	                    pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
	                },
	            });
	            setSaveNotification('Export started.');
	            setTimeout(() => setSaveNotification(null), 2500);
	        }
	        catch (exportError) {
	            console.error('Failed to export customization:', exportError);
	            setError('Could not export your customization. Please try again.');
	        }
	    }, [analyticsContext, draft, mergedConfig, price, savedItem?.id, selectedProduct]);
	    const handleNavigateToRoomPlanner = () => {
	        if (onNavigateToRoomPlanner) {
	            onNavigateToRoomPlanner();
	        }
	        else {
	            window.dispatchEvent(new CustomEvent('modly:navigate-to-room-planner'));
	        }
	    };
	    const buildCustomizationConfig = reactExports.useCallback(() => {
	        const customization = getCustomizationForProduct(selectedProduct);
	        const currentMaterial = customization.materials.length > 0
	            ? getMaterialOption(selectedProduct, draft.materialId)
	            : undefined;
	        const baseWidth = customization.dimensions.width?.default ?? selectedProduct.customizer.defaultWidthIn;
	        const baseLength = customization.dimensions.length?.default ?? selectedProduct.customizer.defaultDepthIn;
	        const baseHeight = customization.dimensions.height?.default ?? selectedProduct.dimensions.height;
	        const widthDeltaIn = draft.widthIn - baseWidth;
	        const depthDeltaIn = draft.depthIn - baseLength;
	        const heightDeltaIn = (draft.heightIn ?? baseHeight) - baseHeight;
	        const inchToMeters = 0.0254;
	        const selectedAddOns = customization.addOns.filter((addOn) => (draft.selectedAddOns ?? []).includes(addOn.name));
	        const ornamentDetails = selectedAddOns.map((addOn) => addOn.name);
	        return {
	            baseItemId: selectedProduct.id,
	            baseItemType: selectedProduct.customizer.type,
	            baseItemName: selectedProduct.name,
	            source: selectedProduct.source,
	            productUrl: selectedProduct.productUrl,
	            price: selectedProduct.basePrice,
	            externalId: selectedProduct.externalId,
	            shopifyProductId: selectedProduct.shopifyProductId,
	            storeId: selectedProduct.storeId,
	            colorScheme: {
	                primary: draft.fabricColor,
	                secondary: selectedProduct.colors[1]?.hex,
	            },
	            materialOverrides: {
	                ...(currentMaterial?.name ? { primary: currentMaterial.name, upholstery: currentMaterial.name } : {}),
	                ...(selectedProduct.materials[1] ? { legs: selectedProduct.materials[1] } : {}),
	            },
	            ornamentDetails,
	            dimensionAdjustments: {
	                width: Number((widthDeltaIn * inchToMeters).toFixed(3)),
	                length: Number((depthDeltaIn * inchToMeters).toFixed(3)),
	                height: Number((heightDeltaIn * inchToMeters).toFixed(3)),
	            },
	            aiNotes: `Configurator snapshot · ${selectedProduct.name} · Total $${price.total.toLocaleString()}`,
	        };
	    }, [draft.depthIn, draft.fabricColor, draft.heightIn, draft.materialId, draft.selectedAddOns, draft.widthIn, price.total, selectedProduct]);
	    const buildCustomizedFurniturePayload = reactExports.useCallback((customizedData) => {
	        const customization = getCustomizationForProduct(selectedProduct);
	        const selectedColor = getSelectedColorOption(selectedProduct, draft);
	        const selectedMaterial = customization.materials.find((material) => draft.selectedMaterial
	            ? material.name.toLowerCase() === draft.selectedMaterial.toLowerCase()
	            : material.id === draft.materialId);
	        const selectedAddOns = customization.addOns.filter((addOn) => (draft.selectedAddOns ?? []).includes(addOn.name));
	        const selectedColorName = draft.selectedColor ??
	            (customization.colors.length > 0
	                ? getColorName(selectedProduct, draft.fabricColor)
	                : undefined);
	        const selectedMaterialName = draft.selectedMaterial ??
	            (customization.materials.length > 0
	                ? getMaterialOption(selectedProduct, draft.materialId)?.name
	                : undefined);
	        const selectedShopifyOptions = getSelectedShopifyOptions(selectedProduct);
	        const baseWidth = customization.dimensions.width?.default ?? selectedProduct.customizer.defaultWidthIn;
	        const baseLength = customization.dimensions.length?.default ?? selectedProduct.customizer.defaultDepthIn;
	        const baseHeight = customization.dimensions.height?.default ?? selectedProduct.dimensions.height;
	        const inchToMeters = 0.0254;
	        const dimensionAdjustments = customizedData?.dimensionAdjustments ?? {
	            width: Number(((draft.widthIn - baseWidth) * inchToMeters).toFixed(3)),
	            length: Number(((draft.depthIn - baseLength) * inchToMeters).toFixed(3)),
	            height: Number((((draft.heightIn ?? baseHeight) - baseHeight) * inchToMeters).toFixed(3)),
	        };
	        const dimensions = customizedData?.dimensions ?? {
	            length: Number((selectedProduct.dimensions.length + (dimensionAdjustments.length ?? 0)).toFixed(3)),
	            width: Number((selectedProduct.dimensions.width + (dimensionAdjustments.width ?? 0)).toFixed(3)),
	            height: Number((selectedProduct.dimensions.height + (dimensionAdjustments.height ?? 0)).toFixed(3)),
	        };
	        return {
	            productId: selectedProduct.id,
	            productName: selectedProduct.name,
	            category: selectedProduct.category,
	            imageUrl: getProductImageUrl(selectedProduct),
	            source: selectedProduct.source,
	            productUrl: selectedProduct.productUrl,
	            price: selectedProduct.basePrice,
	            basePrice: selectedProduct.basePrice,
	            externalId: selectedProduct.externalId,
	            shopifyProductId: selectedProduct.shopifyProductId,
	            storeId: selectedProduct.storeId ?? mergedConfig.storeId,
	            widgetId: mergedConfig.widgetId,
	            name: selectedProduct.name,
	            baseItemType: selectedProduct.category,
	            dimensions,
	            colorScheme: {
	                primary: selectedColorName ?? getColorName(selectedProduct, draft.fabricColor),
	                secondary: selectedProduct.colors[1]?.name,
	            },
	            materials: selectedMaterialName ? { primary: selectedMaterialName } : {},
	            ornamentDetails: customizedData?.ornamentDetails ?? selectedAddOns.map((addOn) => addOn.name),
	            aiNotes: customizedData?.aiNotes ??
	                `Configurator snapshot - ${selectedProduct.name} - ${price.quoteRequired ? 'Quote required' : `$${price.total.toLocaleString()}`}`,
	            dimensionChanges: dimensionAdjustments,
	            selectedColor: selectedColorName
	                ? { name: selectedColorName, price: selectedColor?.price }
	                : undefined,
	            selectedColorPrice: selectedColor?.price,
	            selectedMaterial: selectedMaterialName
	                ? { name: selectedMaterialName, price: selectedMaterial?.priceDelta }
	                : undefined,
	            selectedMaterialPrice: selectedMaterial?.priceDelta,
	            selectedShopifyOptions,
	            selectedDimensions: {
	                width: draft.widthIn,
	                length: draft.depthIn,
	                height: draft.heightIn,
	                unit: customization.dimensions.width?.unit ?? customization.dimensions.length?.unit ?? 'in',
	            },
	            dimensionPriceAdjustments: price.dimensionAdjustments,
	            selectedAddOns,
	            customerRequestText: draft.customerRequestText,
	            customizationPrice: price.customizations,
	            estimatedTotal: price.quoteRequired ? undefined : price.total,
	            pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
	        };
	    }, [draft, mergedConfig.storeId, mergedConfig.widgetId, price, selectedProduct]);
	    const saveCustomizedFurnitureForCurrentDraft = reactExports.useCallback((customizedData) => {
	        const saved = storage.saveCustomizedFurniture(buildCustomizedFurniturePayload(customizedData));
	        setSavedItem(saved);
	        return saved;
	    }, [buildCustomizedFurniturePayload, storage]);
	    const handleCustomize = reactExports.useCallback(async (customizationConfig) => {
	        if (!selectedProduct?.id) {
	            setError('Please select a product first.');
	            return;
	        }
	        setIsLoading(true);
	        setError(null);
	        setSaveNotification(null);
	        setLastConfig(customizationConfig);
	        const immediatePreview = {
	            name: selectedProduct.name,
	            colorScheme: customizationConfig.colorScheme,
	            materials: {
	                primary: customizationConfig.materialOverrides.primary,
	                legs: customizationConfig.materialOverrides.legs,
	                upholstery: customizationConfig.materialOverrides.upholstery,
	            },
	            ornamentDetails: customizationConfig.ornamentDetails || [],
	            dimensionAdjustments: customizationConfig.dimensionAdjustments,
	            aiNotes: 'Processing AI customization...',
	        };
	        setCustomizedItem(immediatePreview);
	        try {
	            const data = await apiClient.customizeFurniture(customizationConfig);
	            const mergedDimensions = data.dimensions || {
	                length: Number((selectedProduct.dimensions.length +
	                    (customizationConfig.dimensionAdjustments?.length ?? 0)).toFixed(3)),
	                width: Number((selectedProduct.dimensions.width +
	                    (customizationConfig.dimensionAdjustments?.width ?? 0)).toFixed(3)),
	                height: Number((selectedProduct.dimensions.height +
	                    (customizationConfig.dimensionAdjustments?.height ?? 0)).toFixed(3)),
	            };
	            const mergedData = {
	                ...immediatePreview,
	                ...data,
	                name: selectedProduct.name,
	                dimensions: mergedDimensions,
	                colorScheme: data.colorScheme || customizationConfig.colorScheme,
	                materials: data.materials || {
	                    primary: customizationConfig.materialOverrides.primary,
	                    legs: customizationConfig.materialOverrides.legs,
	                    upholstery: customizationConfig.materialOverrides.upholstery,
	                },
	                ornamentDetails: data.ornamentDetails || customizationConfig.ornamentDetails,
	                dimensionAdjustments: data.dimensionAdjustments || customizationConfig.dimensionAdjustments,
	            };
	            setCustomizedItem(mergedData);
	            try {
	                saveCustomizedFurnitureForCurrentDraft(mergedData);
	                setSaveNotification('Customized furniture saved automatically!');
	                setTimeout(() => setSaveNotification(null), 3000);
	            }
	            catch (saveError) {
	                console.error('Failed to auto-save:', saveError);
	            }
	        }
	        catch (customizeError) {
	            const errorMessage = customizeError instanceof Error ? customizeError.message : 'An error occurred';
	            setError(errorMessage);
	            mergedConfig.onError?.(customizeError instanceof Error ? customizeError : new Error(errorMessage));
	        }
	        finally {
	            setIsLoading(false);
	        }
	    }, [
	        apiClient,
	        mergedConfig,
	        saveCustomizedFurnitureForCurrentDraft,
	        selectedProduct,
	    ]);
	    const handleApply = reactExports.useCallback(() => {
	        setError(null);
	        if (validationErrors.length > 0) {
	            setError(validationErrors[0] ?? 'Please review your customizations.');
	            return;
	        }
	        handleCustomize(buildCustomizationConfig());
	    }, [buildCustomizationConfig, handleCustomize, validationErrors]);
	    const handleFinalize = () => {
	        if (!enabledActions.requestQuote)
	            return;
	        setError(null);
	        setSaveNotification(null);
	        if (!selectedProduct?.id) {
	            setError('Please customize an item first before requesting a quote.');
	            return;
	        }
	        if (validationErrors.length > 0) {
	            setError(validationErrors[0] ?? 'Please review your customizations.');
	            return;
	        }
	        try {
	            if (!savedItem) {
	                saveCustomizedFurnitureForCurrentDraft();
	            }
	            trackWidgetEvent({
	                ...analyticsContext,
	                type: 'quote_started',
	                productId: selectedProduct.id,
	                productName: selectedProduct.name,
	                metadata: {
	                    source: 'customizer',
	                    quoteType: 'customized_furniture',
	                    estimatedTotal: price.quoteRequired ? undefined : price.total,
	                    pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
	                },
	            });
	            setShowFinalizeModal(false);
	            setShowQuoteForm(true);
	        }
	        catch (saveError) {
	            console.error('Failed to save customization before quote:', saveError);
	            setError('Could not prepare your customization for quote. Please try again.');
	        }
	    };
	    const handleProceedToQuote = () => {
	        if (!enabledActions.requestQuote)
	            return;
	        trackWidgetEvent({
	            ...analyticsContext,
	            type: 'quote_started',
	            productId: selectedProduct.id,
	            productName: selectedProduct.name,
	            metadata: {
	                source: 'customizer',
	                quoteType: 'customized_furniture',
	                estimatedTotal: price.quoteRequired ? undefined : price.total,
	                pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
	            },
	        });
	        setShowFinalizeModal(false);
	        setShowQuoteForm(true);
	    };
	    const handleQuoteSubmit = async (quoteRequest) => {
	        try {
	            const response = await apiClient.submitQuoteRequest(quoteRequest);
	            setQuoteSuccess(true);
	            setSaveNotification('Quote request sent. The store will follow up with pricing and next steps.');
	            setTimeout(() => {
	                setQuoteSuccess(false);
	                setSaveNotification(null);
	            }, 5000);
	            return response;
	        }
	        catch (quoteError) {
	            throw quoteError;
	        }
	    };
	    return (jsxRuntimeExports.jsxs(WidgetProvider, { apiClient: apiClient, storage: storage, config: mergedConfig, children: [jsxRuntimeExports.jsxs("div", { className: "furniture-widget-customizer min-h-screen bg-white", children: [jsxRuntimeExports.jsx("section", { className: "py-12 bg-gradient-to-br from-purple-600 to-purple-800 text-white", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4", children: [jsxRuntimeExports.jsx(Palette, { className: "w-4 h-4" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "AI-Powered Customization" })] }), jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold mb-4", children: "Furniture Customizer" }), jsxRuntimeExports.jsx("p", { className: "text-xl text-purple-100 mb-8", children: "Customize furniture colors, materials, and dimensions with AI assistance. See changes in real-time and get instant feasibility feedback." }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Real-time preview" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Factory-approved options" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Instant pricing" })] })] })] }) }) }), jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [saveNotification && (jsxRuntimeExports.jsxs("div", { className: "mt-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5" }), jsxRuntimeExports.jsx("span", { className: "font-medium", children: saveNotification })] })), error && (jsxRuntimeExports.jsx("div", { className: "mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 mt-0.5" }), jsxRuntimeExports.jsx("div", { children: error })] }) }))] }), jsxRuntimeExports.jsx(FurnitureCustomizerPanel, { products: availableProducts, draft: draft, setDraft: setDraftWithHistory, isApplying: isLoading, validationErrors: validationErrors, price: price, onApply: handleApply, onUndo: handleUndo, onRedo: handleRedo, canUndo: canUndo, canRedo: canRedo, onSaveConfig: saveDraftConfig, onShareLink: copyShareLink, onExportPdf: exportAsPdf, onViewFullRoomAnalysis: handleNavigateToRoomPlanner }), jsxRuntimeExports.jsx("section", { className: "py-8 bg-stone-50/70 border-t border-stone-200", children: jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-[#fffaf4] p-5 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-950", children: "Love Your Custom Design?" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Save, share, export, or send this configuration to the store." })] }), jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-gray-900", children: ["Estimated total: ", price.quoteRequired ? 'Quote required' : `$${price.total.toLocaleString()}`] })] }), jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5", children: [enabledActions.requestQuote && (jsxRuntimeExports.jsx("button", { type: "button", onClick: handleFinalize, className: "min-h-12 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 sm:col-span-2 lg:col-span-1", style: { backgroundColor: primaryColor }, children: "Add to Quote" })), jsxRuntimeExports.jsx("button", { type: "button", onClick: saveDraftConfig, className: "min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50", children: "Save Configuration" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: copyShareLink, className: "min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50", children: "Share Design" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: exportAsPdf, className: "min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50", children: "Export PDF" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleNavigateToRoomPlanner, className: "min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50", children: "View in Room Planner" })] })] }) }) })] }), jsxRuntimeExports.jsx(FinalizeQuoteModal, { isOpen: enabledActions.requestQuote && showFinalizeModal, onClose: () => setShowFinalizeModal(false), onProceed: handleProceedToQuote, item: savedItem }), jsxRuntimeExports.jsx(QuoteRequestForm, { isOpen: enabledActions.requestQuote && showQuoteForm, onClose: () => setShowQuoteForm(false), onSubmit: handleQuoteSubmit, item: savedItem }), quoteSuccess && (jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-slide-up", children: [jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Quote Request Submitted!" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90", children: "We'll contact you soon with details." })] })] }))] }));
	}

	function MessageBubble({ message, onCustomizeItem, onAddToRoomPlanner, onViewInCatalog, enabledActions, primaryColor, analyticsContext }) {
	    const isUser = message.role === 'user';
	    const isThinking = message.type === 'thinking';
	    const actions = enabledActions ?? { viewInCatalog: true, customize: true, requestQuote: true };
	    return (jsxRuntimeExports.jsx("div", { className: `flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`, children: jsxRuntimeExports.jsx("div", { className: `max-w-[80%] rounded-2xl px-4 py-3 ${isUser
                ? 'bg-blue-500 text-white'
                : isThinking
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-gray-50 text-gray-900 border border-gray-200'}`, children: isThinking ? (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0ms' } }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '150ms' } }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '300ms' } })] }), jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Thinking..." })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap text-sm leading-relaxed", children: message.content }), message.metadata?.recommendations && message.metadata?.recommendations.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: message.metadata?.recommendations.map((rec, index) => (jsxRuntimeExports.jsx(RecommendationCard, { recommendation: rec, onCustomize: onCustomizeItem, onAddToRoomPlanner: onAddToRoomPlanner, onViewInCatalog: onViewInCatalog, enabledActions: actions, primaryColor: primaryColor, analyticsContext: analyticsContext }, rec.item.id || index))) })), message.metadata?.action && (jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-gray-200", children: jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [message.metadata?.action?.type === 'open_room_planner' && 'Ready to analyze your room', message.metadata?.action?.type === 'open_customizer' && 'Ready to customize', message.metadata?.action?.type === 'show_catalog' && 'Ready to browse catalog'] }) }))] })) }) }));
	}
	function getProductCatalogUrl(item) {
	    return getRealProductUrl(item);
	}
	function RecommendationCard({ recommendation, onCustomize, onAddToRoomPlanner, onViewInCatalog, enabledActions, primaryColor, analyticsContext, }) {
	    const item = recommendation.item;
	    const catalogUrl = getProductCatalogUrl(item);
	    const primaryTextColor = primaryColor ? getReadableTextColor(primaryColor) : undefined;
	    const handleViewInCatalogClick = (event) => {
	        event.preventDefault();
	        event.stopPropagation();
	        if (!catalogUrl || typeof window === 'undefined')
	            return;
	        if (onViewInCatalog) {
	            onViewInCatalog(item);
	            return;
	        }
	        trackWidgetEvent({
	            ...analyticsContext,
	            type: 'view_in_catalog_clicked',
	            productId: item.id,
	            productName: item.name,
	            metadata: {
	                category: item.category,
	                productUrl: catalogUrl,
	            },
	        });
	        window.open(catalogUrl, '_blank', 'noopener,noreferrer');
	    };
	    return (jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-3 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-gray-900", children: item.name }), recommendation.matchScore && (jsxRuntimeExports.jsxs("span", { className: "text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded", children: [Math.round(recommendation.matchScore * 100), "% match"] }))] }), jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-600 mb-2", children: [item.category, item.subCategory ? ` • ${item.subCategory}` : ''] }), item.priceRange && (jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-gray-900 mb-2", children: ["$", item.priceRange.min?.toLocaleString(), item.priceRange.max && item.priceRange.max !== item.priceRange.min
	                        ? ` - $${item.priceRange.max.toLocaleString()}`
	                        : ''] })), recommendation.reasoning && (jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2", children: recommendation.reasoning })), jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [enabledActions.viewInCatalog && catalogUrl ? (jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleViewInCatalogClick, className: "flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 border border-gray-300", children: [jsxRuntimeExports.jsxs("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }), jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })] }), "View in Catalog"] })) : enabledActions.viewInCatalog ? (jsxRuntimeExports.jsx("button", { type: "button", disabled: true, className: "flex-1 py-1.5 px-3 bg-gray-100 text-gray-400 text-xs rounded cursor-not-allowed flex items-center justify-center gap-1 border border-gray-300", children: "Catalog link unavailable" })) : null, enabledActions.customize && onCustomize && (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onCustomize(item), className: "flex-1 py-1.5 px-3 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1", style: primaryColor ? { backgroundColor: primaryColor, color: primaryTextColor } : undefined, children: [jsxRuntimeExports.jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }), "Customize this"] }))] })] }));
	}

	function ConversationInterface({ aiService, onCustomizeItem, onAddToRoomPlanner, onOpenRoomPlanner, onOpenCustomizer, onShowCatalog, onViewInCatalog, enabledActions, primaryColor, analyticsContext, }) {
	    const [input, setInput] = reactExports.useState('');
	    const [isLoading, setIsLoading] = reactExports.useState(false);
	    const [messages, setMessages] = reactExports.useState([]);
	    const messagesEndRef = reactExports.useRef(null);
	    const inputRef = reactExports.useRef(null);
	    const fallbackMessage = "Sorry, I couldn't reach ModlyAI right now. Please try again.";
	    const primaryTextColor = primaryColor ? getReadableTextColor(primaryColor) : undefined;
	    // Load messages from AI service
	    reactExports.useEffect(() => {
	        setMessages(aiService.getMessages());
	    }, [aiService]);
	    // Scroll to bottom when messages change
	    reactExports.useEffect(() => {
	        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	    }, [messages]);
	    const handleSend = async () => {
	        if (!input.trim() || isLoading)
	            return;
	        const userMessage = input.trim();
	        const hasExistingUserMessage = messages.some((message) => message.role === 'user');
	        setInput('');
	        setIsLoading(true);
	        if (!hasExistingUserMessage) {
	            trackWidgetEvent({
	                ...analyticsContext,
	                type: 'chat_started',
	            });
	        }
	        trackWidgetEvent({
	            ...analyticsContext,
	            type: 'message_sent',
	            metadata: {
	                messageLength: userMessage.length,
	            },
	        });
	        // Add user message immediately
	        const userMsg = {
	            id: `msg-user-${Date.now()}`,
	            role: 'user',
	            type: 'text',
	            content: userMessage,
	            timestamp: Date.now(),
	        };
	        setMessages((prev) => [...prev, userMsg]);
	        // Add thinking indicator
	        const thinkingMsg = {
	            id: `msg-thinking-${Date.now()}`,
	            role: 'assistant',
	            type: 'thinking',
	            content: 'Thinking...',
	            timestamp: Date.now(),
	        };
	        setMessages((prev) => [...prev, thinkingMsg]);
	        try {
	            const response = await aiService.sendMessage(userMessage);
	            // Remove thinking message and add actual response
	            setMessages((prev) => {
	                const withoutThinking = prev.filter((m) => m.type !== 'thinking');
	                return [...withoutThinking, response.message];
	            });
	            response.message.metadata?.recommendations?.forEach((rec) => {
	                trackWidgetEvent({
	                    ...analyticsContext,
	                    type: 'product_recommended',
	                    productId: rec.item.id,
	                    productName: rec.item.name,
	                    metadata: {
	                        category: rec.item.category,
	                        price: rec.item.priceRange?.min ?? rec.item.price,
	                        recommendationSource: 'chat',
	                    },
	                });
	            });
	            // Handle actions
	            if (response.message.metadata?.action) {
	                const actionType = response.message.metadata?.action?.type;
	                setTimeout(() => {
	                    switch (actionType) {
	                        case 'open_room_planner':
	                            onOpenRoomPlanner?.();
	                            break;
	                        case 'open_customizer':
	                            onOpenCustomizer?.();
	                            break;
	                        case 'show_catalog':
	                            onShowCatalog?.();
	                            break;
	                        case 'customize_item':
	                            if (response.message.metadata?.action?.data) {
	                                onCustomizeItem?.(response.message.metadata?.action?.data);
	                            }
	                            break;
	                    }
	                }, 500);
	            }
	        }
	        catch (error) {
	            console.error('Error sending message:', error);
	            const errorMsg = {
	                id: `msg-error-${Date.now()}`,
	                role: 'assistant',
	                type: 'text',
	                content: fallbackMessage,
	                timestamp: Date.now(),
	            };
	            setMessages((prev) => [...prev.filter((m) => m.type !== 'thinking'), errorMsg]);
	        }
	        finally {
	            setIsLoading(false);
	            inputRef.current?.focus();
	        }
	    };
	    const handleKeyPress = (e) => {
	        if (e.key === 'Enter' && !e.shiftKey) {
	            e.preventDefault();
	            handleSend();
	        }
	    };
	    return (jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-white", children: [jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-2", children: [messages.length === 0 ? (jsxRuntimeExports.jsx("div", { className: "text-center text-gray-500 py-8", children: jsxRuntimeExports.jsx("p", { children: "Start a conversation to get help with your furniture needs." }) })) : (messages.map((message) => (jsxRuntimeExports.jsx(MessageBubble, { message: message, onCustomizeItem: onCustomizeItem, onAddToRoomPlanner: onAddToRoomPlanner, onViewInCatalog: onViewInCatalog, enabledActions: enabledActions, primaryColor: primaryColor, analyticsContext: analyticsContext }, message.id)))), jsxRuntimeExports.jsx("div", { ref: messagesEndRef })] }), jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 p-4 bg-gray-50", children: [jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("textarea", { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyPress, placeholder: "Type your message...", className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none", rows: 1, style: { minHeight: '40px', maxHeight: '120px' }, disabled: isLoading }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSend, disabled: !input.trim() || isLoading, className: "px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium", style: primaryColor ? { backgroundColor: primaryColor, color: primaryTextColor } : undefined, children: isLoading ? (jsxRuntimeExports.jsxs("svg", { className: "animate-spin h-5 w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })) : ('Send') })] }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-2 text-center", children: "Press Enter to send, Shift+Enter for new line" })] })] }));
	}

	/**
	 * Generates a spec sheet from a customization configuration
	 */
	function generateSpecSheet(config, additionalData) {
	    const specId = `SPEC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
	    const generatedAt = new Date().toISOString();
	    // Build customizations list
	    const customizations = [];
	    if (config.dimensionAdjustments) {
	        if (config.dimensionAdjustments.length) {
	            customizations.push(`Length adjustment: ${config.dimensionAdjustments.length > 0 ? '+' : ''}${config.dimensionAdjustments.length}m`);
	        }
	        if (config.dimensionAdjustments.width) {
	            customizations.push(`Width adjustment: ${config.dimensionAdjustments.width > 0 ? '+' : ''}${config.dimensionAdjustments.width}m`);
	        }
	        if (config.dimensionAdjustments.height) {
	            customizations.push(`Height adjustment: ${config.dimensionAdjustments.height > 0 ? '+' : ''}${config.dimensionAdjustments.height}m`);
	        }
	    }
	    if (config.ornamentDetails && config.ornamentDetails.length > 0) {
	        customizations.push(...config.ornamentDetails.map(detail => `Ornament: ${detail}`));
	    }
	    if (config.aiNotes) {
	        customizations.push(`AI Notes: ${config.aiNotes}`);
	    }
	    return {
	        specId,
	        generatedAt,
	        product: {
	            name: config.baseItemName || config.baseItemType || 'Custom Furniture',
	            baseItemId: config.baseItemId,
	            category: config.baseItemType || 'furniture',
	        },
	        configuration: {
	            dimensions: config.dimensionAdjustments,
	            materials: {
	                ...config.materialOverrides,
	            },
	            colors: config.colorScheme,
	            customizations,
	        },
	        pricing: {
	            estimatedCost: additionalData?.estimatedCost,
	            requiresQuote: additionalData?.requiresQuote ?? true,
	        },
	        customerNotes: additionalData?.customerNotes,
	    };
	}
	/**
	 * Generates HTML representation of a spec sheet (for printing/download)
	 */
	function generateSpecSheetHTML(specSheet) {
	    const formatDate = (isoString) => {
	        return new Date(isoString).toLocaleString('en-US', {
	            year: 'numeric',
	            month: 'long',
	            day: 'numeric',
	            hour: '2-digit',
	            minute: '2-digit',
	        });
	    };
	    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Specification Sheet - ${specSheet.specId}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .header {
      border-bottom: 3px solid #2c3e50;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .header h1 {
      color: #2c3e50;
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    .spec-id {
      color: #7f8c8d;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    
    .meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      padding: 15px;
      background: #ecf0f1;
      border-radius: 5px;
    }
    
    .meta-item {
      flex: 1;
    }
    
    .meta-label {
      font-size: 12px;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    
    .meta-value {
      font-size: 14px;
      color: #2c3e50;
      font-weight: 600;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      color: #2c3e50;
      font-size: 18px;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #ecf0f1;
    }
    
    .field {
      margin-bottom: 12px;
      padding-left: 10px;
    }
    
    .field-label {
      font-size: 12px;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }
    
    .field-value {
      font-size: 15px;
      color: #2c3e50;
      font-weight: 500;
    }
    
    .color-swatch {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 3px;
      border: 1px solid #ddd;
      vertical-align: middle;
      margin-right: 8px;
    }
    
    .customization-list {
      list-style: none;
      padding-left: 10px;
    }
    
    .customization-list li {
      padding: 8px 0;
      border-bottom: 1px solid #ecf0f1;
      font-size: 14px;
    }
    
    .customization-list li:last-child {
      border-bottom: none;
    }
    
    .customization-list li::before {
      content: "→";
      color: #3498db;
      margin-right: 10px;
      font-weight: bold;
    }
    
    .pricing {
      background: #e8f5e9;
      padding: 20px;
      border-radius: 5px;
      border-left: 4px solid #4caf50;
    }
    
    .pricing-label {
      font-size: 14px;
      color: #2e7d32;
      margin-bottom: 5px;
    }
    
    .pricing-value {
      font-size: 24px;
      color: #1b5e20;
      font-weight: 700;
    }
    
    .requires-quote {
      background: #fff3e0;
      border-left-color: #ff9800;
    }
    
    .requires-quote .pricing-label {
      color: #e65100;
    }
    
    .requires-quote .pricing-value {
      color: #bf360c;
    }
    
    .notes {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      font-style: italic;
      color: #555;
      font-size: 14px;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #ecf0f1;
      text-align: center;
      color: #95a5a6;
      font-size: 12px;
    }
    
    @media print {
      body {
        padding: 20px;
      }
      
      .header {
        page-break-after: avoid;
      }
      
      .section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Product Specification Sheet</h1>
    <div class="spec-id">Spec ID: ${specSheet.specId}</div>
  </div>
  
  <div class="meta">
    <div class="meta-item">
      <div class="meta-label">Product Name</div>
      <div class="meta-value">${specSheet.product.name}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Category</div>
      <div class="meta-value">${specSheet.product.category}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Generated</div>
      <div class="meta-value">${formatDate(specSheet.generatedAt)}</div>
    </div>
  </div>
  
  ${specSheet.product.baseItemId ? `
  <div class="section">
    <div class="section-title">Base Product</div>
    <div class="field">
      <div class="field-label">Base Item ID</div>
      <div class="field-value">${specSheet.product.baseItemId}</div>
    </div>
  </div>
  ` : ''}
  
  ${specSheet.configuration.dimensions && Object.keys(specSheet.configuration.dimensions).length > 0 ? `
  <div class="section">
    <div class="section-title">Dimensions</div>
    ${specSheet.configuration.dimensions.length ? `
    <div class="field">
      <div class="field-label">Length</div>
      <div class="field-value">${specSheet.configuration.dimensions.length}m</div>
    </div>
    ` : ''}
    ${specSheet.configuration.dimensions.width ? `
    <div class="field">
      <div class="field-label">Width</div>
      <div class="field-value">${specSheet.configuration.dimensions.width}m</div>
    </div>
    ` : ''}
    ${specSheet.configuration.dimensions.height ? `
    <div class="field">
      <div class="field-label">Height</div>
      <div class="field-value">${specSheet.configuration.dimensions.height}m</div>
    </div>
    ` : ''}
  </div>
  ` : ''}
  
  <div class="section">
    <div class="section-title">Materials</div>
    ${Object.entries(specSheet.configuration.materials)
        .filter(([key, value]) => value)
        .map(([key, value]) => `
    <div class="field">
      <div class="field-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
      <div class="field-value">${value}</div>
    </div>
    `).join('')}
  </div>
  
  <div class="section">
    <div class="section-title">Color Scheme</div>
    <div class="field">
      <div class="field-label">Primary Color</div>
      <div class="field-value">${specSheet.configuration.colors.primary}</div>
    </div>
    ${specSheet.configuration.colors.secondary ? `
    <div class="field">
      <div class="field-label">Secondary Color</div>
      <div class="field-value">${specSheet.configuration.colors.secondary}</div>
    </div>
    ` : ''}
    ${specSheet.configuration.colors.accent ? `
    <div class="field">
      <div class="field-label">Accent Color</div>
      <div class="field-value">${specSheet.configuration.colors.accent}</div>
    </div>
    ` : ''}
  </div>
  
  ${specSheet.configuration.customizations.length > 0 ? `
  <div class="section">
    <div class="section-title">Customizations</div>
    <ul class="customization-list">
      ${specSheet.configuration.customizations.map(custom => `
      <li>${custom}</li>
      `).join('')}
    </ul>
  </div>
  ` : ''}
  
  <div class="section">
    <div class="section-title">Pricing</div>
    <div class="pricing ${specSheet.pricing.requiresQuote ? 'requires-quote' : ''}">
      <div class="pricing-label">
        ${specSheet.pricing.requiresQuote ? 'Quote Required' : 'Estimated Cost'}
      </div>
      <div class="pricing-value">
        ${specSheet.pricing.estimatedCost
        ? `$${specSheet.pricing.estimatedCost.toLocaleString()}`
        : 'Contact for Pricing'}
      </div>
    </div>
  </div>
  
  ${specSheet.customerNotes ? `
  <div class="section">
    <div class="section-title">Customer Notes</div>
    <div class="notes">
      ${specSheet.customerNotes}
    </div>
  </div>
  ` : ''}
  
  <div class="footer">
    This specification sheet was generated automatically. Please contact us for any questions or modifications.
  </div>
</body>
</html>
  `.trim();
	}
	/**
	 * Opens spec sheet HTML in a new window for printing
	 */
	function printSpecSheet(specSheet) {
	    const html = generateSpecSheetHTML(specSheet);
	    const printWindow = window.open('', '_blank');
	    if (printWindow) {
	        printWindow.document.write(html);
	        printWindow.document.close();
	        // Wait for content to load, then trigger print
	        printWindow.onload = () => {
	            setTimeout(() => {
	                printWindow.print();
	            }, 250);
	        };
	    }
	    else {
	        console.error('Failed to open print window. Please check your popup blocker settings.');
	    }
	}

	// Default validation rules
	const defaultRules = [
	    // Dimension constraints
	    {
	        field: 'dimensionAdjustments.length',
	        validate: (value, config) => {
	            if (!value)
	                return null;
	            if (value < -2 || value > 3) {
	                return {
	                    field: 'dimensionAdjustments.length',
	                    message: 'Length adjustment must be between -2m and +3m',
	                    severity: 'error',
	                };
	            }
	            return null;
	        },
	    },
	    {
	        field: 'dimensionAdjustments.width',
	        validate: (value, config) => {
	            if (!value)
	                return null;
	            if (value < -1.5 || value > 2) {
	                return {
	                    field: 'dimensionAdjustments.width',
	                    message: 'Width adjustment must be between -1.5m and +2m',
	                    severity: 'error',
	                };
	            }
	            return null;
	        },
	    },
	    {
	        field: 'dimensionAdjustments.height',
	        validate: (value, config) => {
	            if (!value)
	                return null;
	            if (value < -0.5 || value > 1.5) {
	                return {
	                    field: 'dimensionAdjustments.height',
	                    message: 'Height adjustment must be between -0.5m and +1.5m',
	                    severity: 'error',
	                };
	            }
	            return null;
	        },
	    },
	    // Color scheme validation
	    {
	        field: 'colorScheme.primary',
	        validate: (value, config) => {
	            if (!value || value.trim() === '') {
	                return {
	                    field: 'colorScheme.primary',
	                    message: 'Primary color is required',
	                    severity: 'error',
	                };
	            }
	            return null;
	        },
	    },
	    // Material compatibility
	    {
	        field: 'materialOverrides',
	        validate: (value, config) => {
	            if (!value)
	                return null;
	            // Check for incompatible material combinations
	            const primary = value.primary?.toLowerCase();
	            const legs = value.legs?.toLowerCase();
	            if (primary?.includes('glass') && legs?.includes('wood')) {
	                return {
	                    field: 'materialOverrides',
	                    message: 'Glass primary material may not pair well with wooden legs. Consider metal legs for better structural support.',
	                    severity: 'warning',
	                };
	            }
	            if (primary?.includes('marble') && !legs?.includes('metal')) {
	                return {
	                    field: 'materialOverrides',
	                    message: 'Marble surfaces require metal legs for proper support',
	                    severity: 'error',
	                };
	            }
	            return null;
	        },
	    },
	    // Ornament validation
	    {
	        field: 'ornamentDetails',
	        validate: (value, config) => {
	            if (!value || !Array.isArray(value))
	                return null;
	            if (value.length > 10) {
	                return {
	                    field: 'ornamentDetails',
	                    message: 'Too many ornament details (maximum 10)',
	                    severity: 'error',
	                };
	            }
	            if (value.length > 5) {
	                return {
	                    field: 'ornamentDetails',
	                    message: 'Consider reducing the number of ornaments for a cleaner look',
	                    severity: 'warning',
	                };
	            }
	            return null;
	        },
	    },
	];
	/**
	 * Validates a configuration against a set of rules
	 */
	function validateConfiguration(config, customRules = []) {
	    const rules = [...defaultRules, ...customRules];
	    const errors = [];
	    const warnings = [];
	    for (const rule of rules) {
	        const fieldParts = rule.field.split('.');
	        let value = config;
	        // Navigate to nested field
	        for (const part of fieldParts) {
	            if (value && typeof value === 'object') {
	                value = value[part];
	            }
	            else {
	                value = undefined;
	                break;
	            }
	        }
	        const error = rule.validate(value, config);
	        if (error) {
	            if (error.severity === 'error') {
	                errors.push(error);
	            }
	            else {
	                warnings.push(error);
	            }
	        }
	    }
	    return {
	        valid: errors.length === 0,
	        errors,
	        warnings,
	    };
	}

	function SpecSheetPreview({ specSheet, onClose }) {
	    const handlePrint = () => {
	        printSpecSheet(specSheet);
	    };
	    const formatDate = (isoString) => {
	        return new Date(isoString).toLocaleDateString('en-US', {
	            year: 'numeric',
	            month: 'long',
	            day: 'numeric',
	        });
	    };
	    return (jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg max-w-2xl mx-auto", children: [jsxRuntimeExports.jsxs("div", { className: "border-b border-gray-200 p-4 flex items-center justify-between", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Specification Sheet" }), jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mt-1", children: ["Spec ID: ", specSheet.specId] })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsxs("button", { onClick: handlePrint, className: "px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" }) }), "Print"] }), onClose && (jsxRuntimeExports.jsx("button", { onClick: onClose, className: "px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700", children: "\u2715" }))] })] }), jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-h-[600px] overflow-y-auto", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Product" }), jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded p-3 space-y-1", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Name:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.product.name })] }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Category:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.product.category })] }), specSheet.product.baseItemId && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Base Item ID:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.product.baseItemId })] })), jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Generated:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: formatDate(specSheet.generatedAt) })] })] })] }), specSheet.configuration.dimensions &&
	                        Object.keys(specSheet.configuration.dimensions).length > 0 && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Dimensions" }), jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded p-3 space-y-1", children: [specSheet.configuration.dimensions.length && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Length:" }), jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-gray-900", children: [specSheet.configuration.dimensions.length, "m"] })] })), specSheet.configuration.dimensions.width && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Width:" }), jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-gray-900", children: [specSheet.configuration.dimensions.width, "m"] })] })), specSheet.configuration.dimensions.height && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Height:" }), jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-gray-900", children: [specSheet.configuration.dimensions.height, "m"] })] }))] })] })), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Materials" }), jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded p-3 space-y-1", children: Object.entries(specSheet.configuration.materials)
	                                    .filter(([key, value]) => value)
	                                    .map(([key, value]) => (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-600 capitalize", children: [key, ":"] }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: value })] }, key))) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Color Scheme" }), jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded p-3 space-y-1", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Primary:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.configuration.colors.primary })] }), specSheet.configuration.colors.secondary && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Secondary:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.configuration.colors.secondary })] })), specSheet.configuration.colors.accent && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Accent:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.configuration.colors.accent })] }))] })] }), specSheet.configuration.customizations.length > 0 && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Customizations" }), jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded p-3", children: jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: specSheet.configuration.customizations.map((custom, index) => (jsxRuntimeExports.jsxs("li", { className: "text-sm text-gray-700 flex items-start", children: [jsxRuntimeExports.jsx("span", { className: "text-blue-500 mr-2", children: "\u2192" }), jsxRuntimeExports.jsx("span", { children: custom })] }, index))) }) })] })), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Pricing" }), jsxRuntimeExports.jsx("div", { className: `rounded p-3 ${specSheet.pricing.requiresQuote
                                    ? 'bg-orange-50 border border-orange-200'
                                    : 'bg-green-50 border border-green-200'}`, children: jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700", children: specSheet.pricing.requiresQuote ? 'Quote Required' : 'Estimated Cost' }), jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-gray-900", children: specSheet.pricing.estimatedCost
	                                                ? `$${specSheet.pricing.estimatedCost.toLocaleString()}`
	                                                : 'Contact for Pricing' })] }) })] }), specSheet.customerNotes && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Customer Notes" }), jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded p-3", children: jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 italic", children: specSheet.customerNotes }) })] }))] })] }));
	}

	function SubmitFlowModal({ config, product, apiClient, onSuccess, onClose, }) {
	    const [step, setStep] = reactExports.useState('validate');
	    const [flowType, setFlowType] = reactExports.useState('quote');
	    const [validation, setValidation] = reactExports.useState(null);
	    const [specSheet, setSpecSheet] = reactExports.useState(null);
	    const [error, setError] = reactExports.useState(null);
	    // Form fields for quote request
	    const [customerName, setCustomerName] = reactExports.useState('');
	    const [customerEmail, setCustomerEmail] = reactExports.useState('');
	    const [customerPhone, setCustomerPhone] = reactExports.useState('');
	    const [customerNotes, setCustomerNotes] = reactExports.useState('');
	    reactExports.useEffect(() => {
	        // Validate configuration
	        const validationResult = validateConfiguration(config);
	        setValidation(validationResult);
	        // Determine flow type based on product pricing
	        const requiresQuote = !product?.priceRange || product.stockStatus === 'custom_order' || product.source === 'shopify';
	        setFlowType(requiresQuote ? 'quote' : 'cart');
	        // Generate spec sheet
	        const sheet = generateSpecSheet(config, {
	            estimatedCost: product?.priceRange?.min,
	            requiresQuote,
	        });
	        setSpecSheet(sheet);
	        // Move to preview if validation passes
	        if (validationResult.valid) {
	            setStep('preview');
	        }
	    }, [config, product]);
	    const handleContinue = () => {
	        if (!validation?.valid) {
	            return;
	        }
	        if (flowType === 'cart') {
	            handleAddToCart();
	        }
	        else {
	            const widgetConfig = apiClient['config'];
	            trackWidgetEvent({
	                apiBaseUrl: widgetConfig.apiBaseUrl,
	                storeId: widgetConfig.storeId || widgetConfig.widgetId || config.storeId || product?.storeId,
	                widgetId: widgetConfig.widgetId,
	                type: 'quote_started',
	                productId: product?.id || config.baseItemId,
	                productName: product?.name || config.baseItemName,
	                metadata: {
	                    source: 'customizer_submit_flow',
	                    quoteType: 'customized_furniture',
	                },
	            });
	            setStep('form');
	        }
	    };
	    const handleAddToCart = async () => {
	        if (!product || !specSheet)
	            return;
	        setStep('submitting');
	        setError(null);
	        try {
	            // Call API to add to cart
	            const response = await fetch(`${apiClient['config'].apiBaseUrl || window.location.origin}/api/cart/add`, {
	                method: 'POST',
	                headers: {
	                    'Content-Type': 'application/json',
	                },
	                body: JSON.stringify({
	                    productId: product.id,
	                    configuration: config,
	                    specSheet,
	                    quantity: 1,
	                }),
	            });
	            if (!response.ok) {
	                throw new Error('Failed to add to cart');
	            }
	            const data = await response.json();
	            setStep('success');
	            setTimeout(() => {
	                onSuccess({ type: 'cart', id: data.cartItemId });
	            }, 1500);
	        }
	        catch (err) {
	            setError(err instanceof Error ? err.message : 'Failed to add to cart');
	            setStep('preview');
	        }
	    };
	    const handleSubmitQuote = async () => {
	        if (!customerName || !customerEmail || !specSheet) {
	            setError('Please fill in all required fields');
	            return;
	        }
	        // Basic email validation
	        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	        if (!emailRegex.test(customerEmail)) {
	            setError('Please enter a valid email address');
	            return;
	        }
	        setStep('submitting');
	        setError(null);
	        try {
	            const response = await apiClient.submitQuoteRequest({
	                name: customerName,
	                email: customerEmail,
	                phone: customerPhone || undefined,
	                notes: customerNotes || undefined,
	                item: {
	                    name: config.baseItemName || config.baseItemType || 'Custom Furniture',
	                    dimensions: config.dimensionAdjustments || {},
	                    materials: config.materialOverrides,
	                    colorScheme: config.colorScheme,
	                    productUrl: config.productUrl || product?.productUrl || product?.url,
	                    price: config.price ?? product?.priceRange?.min ?? product?.price,
	                    externalId: config.externalId || product?.externalId,
	                    shopifyProductId: config.shopifyProductId || product?.shopifyProductId,
	                    storeId: config.storeId || product?.storeId,
	                    source: config.source || product?.source,
	                    aiNotes: config.aiNotes,
	                },
	                specSheet,
	            });
	            setStep('success');
	            setTimeout(() => {
	                onSuccess({ type: 'quote', id: response.quoteId });
	            }, 1500);
	        }
	        catch (err) {
	            setError(err instanceof Error ? err.message : 'Failed to submit quote request');
	            setStep('form');
	        }
	    };
	    if (step === 'validate' && validation && !validation.valid) {
	        return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg max-w-md w-full p-6", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Configuration Issues" }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [validation.errors.map((error, index) => (jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded p-3", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-red-900", children: error.field }), jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700", children: error.message })] }, index))), validation.warnings.map((warning, index) => (jsxRuntimeExports.jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded p-3", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-yellow-900", children: warning.field }), jsxRuntimeExports.jsx("p", { className: "text-sm text-yellow-700", children: warning.message })] }, index)))] }), jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors", children: "Go Back & Fix" }) })] }) }));
	    }
	    if (step === 'preview' && specSheet) {
	        return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col", children: [jsxRuntimeExports.jsx(SpecSheetPreview, { specSheet: specSheet, onClose: onClose }), validation && validation.warnings.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 bg-yellow-50 border-t border-yellow-200", children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-yellow-800 font-medium mb-1", children: "\u26A0\uFE0F Warnings:" }), validation.warnings.map((warning, index) => (jsxRuntimeExports.jsxs("p", { className: "text-xs text-yellow-700", children: ["\u2022 ", warning.message] }, index)))] })), error && (jsxRuntimeExports.jsx("div", { className: "px-6 py-3 bg-red-50 border-t border-red-200", children: jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700", children: error }) })), jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 p-4 flex gap-3", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors", children: "Cancel" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleContinue, className: "flex-1 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors", children: flowType === 'cart' ? 'Add to Cart' : 'Request Quote' })] })] }) }));
	    }
	    if (step === 'form') {
	        return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg max-w-md w-full p-6", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Request a Quote" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-6", children: "Fill in your details and we'll get back to you with a personalized quote." }), error && (jsxRuntimeExports.jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 text-sm", children: error })), jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Name ", jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "text", value: customerName, onChange: (e) => setCustomerName(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Your full name" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Email ", jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "email", value: customerEmail, onChange: (e) => setCustomerEmail(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "your.email@example.com" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone" }), jsxRuntimeExports.jsx("input", { type: "tel", value: customerPhone, onChange: (e) => setCustomerPhone(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Optional" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Additional Notes" }), jsxRuntimeExports.jsx("textarea", { value: customerNotes, onChange: (e) => setCustomerNotes(e.target.value), rows: 3, className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none", placeholder: "Any special requests or questions?" })] })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStep('preview'), className: "px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors", children: "Back" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSubmitQuote, className: "flex-1 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors", children: "Submit Quote Request" })] })] }) }));
	    }
	    if (step === 'submitting') {
	        return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-8 text-center", children: [jsxRuntimeExports.jsx("div", { className: "animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: flowType === 'cart' ? 'Adding to cart...' : 'Submitting quote request...' })] }) }));
	    }
	    if (step === 'success') {
	        return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-8 text-center max-w-md", children: [jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: flowType === 'cart' ? 'Added to Cart!' : 'Quote Request Submitted!' }), jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: flowType === 'cart'
	                            ? 'Your customized product has been added to your cart.'
	                            : 'Quote request sent. The store will follow up with pricing and next steps.' })] }) }));
	    }
	    return null;
	}

	const STORAGE_KEY = 'modly-conversation-state';
	class ConversationStateManager {
	    constructor() {
	        this.state = this.loadState();
	    }
	    loadState() {
	        try {
	            if (typeof window !== 'undefined') {
	                const stored = sessionStorage.getItem(STORAGE_KEY);
	                if (stored) {
	                    return JSON.parse(stored);
	                }
	            }
	        }
	        catch (e) {
	            console.warn('Failed to load conversation state:', e);
	        }
	        return {
	            messages: [],
	            userPreferences: {},
	            context: {},
	        };
	    }
	    saveState() {
	        try {
	            if (typeof window !== 'undefined') {
	                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
	            }
	        }
	        catch (e) {
	            console.warn('Failed to save conversation state:', e);
	        }
	    }
	    getState() {
	        return { ...this.state };
	    }
	    addMessage(message) {
	        this.state.messages.push(message);
	        this.saveState();
	    }
	    getMessages() {
	        return [...this.state.messages];
	    }
	    updateMessages(messages) {
	        this.state.messages = messages;
	        this.saveState();
	    }
	    updateIntent(intent) {
	        this.state.currentIntent = intent;
	        this.saveState();
	    }
	    updatePreferences(preferences) {
	        this.state.userPreferences = {
	            ...this.state.userPreferences,
	            ...preferences,
	        };
	        this.saveState();
	    }
	    updateContext(context) {
	        this.state.context = {
	            ...this.state.context,
	            ...context,
	        };
	        this.saveState();
	    }
	    clearState() {
	        this.state = {
	            messages: [],
	            userPreferences: {},
	            context: {},
	        };
	        this.saveState();
	    }
	    resetConversation() {
	        this.state.messages = [];
	        this.state.currentIntent = undefined;
	        this.saveState();
	    }
	}

	class PageContextExtractor {
	    static extractContext() {
	        const context = {
	            currentUrl: typeof window !== 'undefined' ? window.location.href : undefined,
	            metadata: {},
	        };
	        // Extract data attributes from the page
	        if (typeof document !== 'undefined') {
	            // Check for data attributes on body or html element
	            const body = document.body;
	            const html = document.documentElement;
	            // Extract all data-modly-* attributes
	            [body, html].forEach((element) => {
	                if (element) {
	                    Array.from(element.attributes).forEach((attr) => {
	                        if (attr.name.startsWith(this.DATA_ATTRIBUTE_PREFIX)) {
	                            const key = attr.name.replace(this.DATA_ATTRIBUTE_PREFIX, '');
	                            const value = attr.value;
	                            // Map common attributes
	                            switch (key) {
	                                case 'product-id':
	                                    context.productId = value;
	                                    break;
	                                case 'product-name':
	                                    context.productName = value;
	                                    break;
	                                case 'category':
	                                    context.category = value;
	                                    break;
	                                case 'price':
	                                    context.price = parseFloat(value);
	                                    break;
	                                case 'page-type':
	                                    context.pageType = value;
	                                    break;
	                                default:
	                                    context.metadata[key] = value;
	                            }
	                        }
	                    });
	                }
	            });
	            // Try to infer page type from URL if not set
	            if (!context.pageType && context.currentUrl) {
	                const url = new URL(context.currentUrl);
	                const pathname = url.pathname.toLowerCase();
	                if (pathname.includes('/product/') || pathname.includes('/item/')) {
	                    context.pageType = 'product';
	                }
	                else if (pathname.includes('/catalog/') || pathname.includes('/shop/')) {
	                    context.pageType = 'catalog';
	                }
	                else if (pathname.includes('/category/') || pathname.includes('/collection/')) {
	                    context.pageType = 'category';
	                }
	                else if (pathname === '/' || pathname === '/index') {
	                    context.pageType = 'home';
	                }
	                else {
	                    context.pageType = 'other';
	                }
	            }
	            // Try to extract product info from common selectors if not found via data attributes
	            if (!context.productName && context.pageType === 'product') {
	                const productNameSelectors = [
	                    'h1.product-title',
	                    'h1[data-testid="product-title"]',
	                    '.product-name',
	                    'h1',
	                ];
	                for (const selector of productNameSelectors) {
	                    const element = document.querySelector(selector);
	                    if (element && element.textContent) {
	                        context.productName = element.textContent.trim();
	                        break;
	                    }
	                }
	            }
	        }
	        return context;
	    }
	    static watchForChanges(callback) {
	        if (typeof window === 'undefined') {
	            return () => { };
	        }
	        let lastContext = this.extractContext();
	        callback(lastContext);
	        // Watch for URL changes (SPA navigation)
	        let lastUrl = window.location.href;
	        const checkUrl = () => {
	            if (window.location.href !== lastUrl) {
	                lastUrl = window.location.href;
	                const newContext = this.extractContext();
	                if (JSON.stringify(newContext) !== JSON.stringify(lastContext)) {
	                    lastContext = newContext;
	                    callback(newContext);
	                }
	            }
	        };
	        // Check periodically for URL changes
	        const intervalId = setInterval(checkUrl, 1000);
	        // Watch for attribute changes
	        const observer = new MutationObserver(() => {
	            const newContext = this.extractContext();
	            if (JSON.stringify(newContext) !== JSON.stringify(lastContext)) {
	                lastContext = newContext;
	                callback(newContext);
	            }
	        });
	        observer.observe(document.body, {
	            attributes: true,
	            attributeFilter: Array.from(document.body.attributes)
	                .map(attr => attr.name)
	                .filter(name => name.startsWith(this.DATA_ATTRIBUTE_PREFIX)),
	            subtree: true,
	        });
	        observer.observe(document.documentElement, {
	            attributes: true,
	            attributeFilter: Array.from(document.documentElement.attributes)
	                .map(attr => attr.name)
	                .filter(name => name.startsWith(this.DATA_ATTRIBUTE_PREFIX)),
	        });
	        return () => {
	            clearInterval(intervalId);
	            observer.disconnect();
	        };
	    }
	}
	PageContextExtractor.DATA_ATTRIBUTE_PREFIX = 'data-modly-';

	class AIService {
	    constructor(apiClient, config) {
	        this.fallbackMessage = "Sorry, I couldn't reach ModlyAI right now. Please try again.";
	        this.apiClient = apiClient;
	        this.config = config;
	        this.stateManager = new ConversationStateManager();
	        // Extract initial page context
	        this.pageContext = PageContextExtractor.extractContext();
	        // Watch for context changes
	        this.contextUnwatch = PageContextExtractor.watchForChanges((newContext) => {
	            this.pageContext = newContext;
	            this.stateManager.updateContext({
	                pageType: newContext.pageType,
	                productId: newContext.productId,
	                category: newContext.category,
	                currentPage: newContext.currentUrl,
	            });
	        });
	        this.ensureInitialWelcomeMessage();
	    }
	    ensureInitialWelcomeMessage() {
	        const welcomeText = getWelcomeMessage(this.config);
	        const messages = this.stateManager.getMessages();
	        if (messages.length === 0) {
	            this.addGreeting(welcomeText);
	            return;
	        }
	        const [first, ...rest] = messages;
	        const shouldUpdateWelcome = first.role === 'assistant' &&
	            (first.isWelcome ||
	                first.id.startsWith('msg-greeting-') ||
	                first.content === DEFAULT_WELCOME_MESSAGE);
	        if (shouldUpdateWelcome && first.content !== welcomeText) {
	            const updatedMessages = [
	                {
	                    ...first,
	                    content: welcomeText,
	                    isWelcome: true,
	                },
	                ...rest,
	            ];
	            this.stateManager.updateMessages(updatedMessages);
	            return;
	        }
	    }
	    addGreeting(welcomeText = getWelcomeMessage(this.config)) {
	        const greeting = {
	            id: `msg-greeting-${Date.now()}`,
	            role: 'assistant',
	            type: 'text',
	            content: welcomeText,
	            timestamp: Date.now(),
	            isWelcome: true,
	        };
	        this.stateManager.addMessage(greeting);
	    }
	    async sendMessage(userMessage) {
	        // Add user message to state
	        const userMsg = {
	            id: `msg-user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
	            role: 'user',
	            type: 'text',
	            content: userMessage,
	            timestamp: Date.now(),
	        };
	        this.stateManager.addMessage(userMsg);
	        // Build request
	        const state = this.stateManager.getState();
	        const request = {
	            message: userMessage,
	            conversationHistory: state.messages,
	            context: {
	                pageType: this.pageContext.pageType,
	                productId: this.pageContext.productId,
	                category: this.pageContext.category,
	                currentPage: this.pageContext.currentUrl,
	            },
	            userPreferences: state.userPreferences,
	        };
	        // Call API
	        try {
	            const chatResponse = await this.apiClient.chat(request);
	            // Add assistant response to state
	            this.stateManager.addMessage(chatResponse.message);
	            // Update preferences if provided
	            if (chatResponse.updatedPreferences) {
	                this.stateManager.updatePreferences(chatResponse.updatedPreferences);
	            }
	            // Update intent if we can infer it from the conversation
	            this.updateIntentFromMessage(chatResponse.message);
	            return chatResponse;
	        }
	        catch (error) {
	            console.error('Error sending message:', error);
	            // Add a user-safe error message while keeping the real error in the console.
	            const errorMsg = {
	                id: `msg-error-${Date.now()}`,
	                role: 'assistant',
	                type: 'text',
	                content: this.fallbackMessage,
	                timestamp: Date.now(),
	            };
	            this.stateManager.addMessage(errorMsg);
	            return { message: errorMsg };
	        }
	    }
	    updateIntentFromMessage(message) {
	        const content = message.content.toLowerCase();
	        const metadata = message.metadata;
	        if (metadata?.action) {
	            switch (metadata?.action?.type) {
	                case 'open_room_planner':
	                    this.stateManager.updateIntent('room_planning');
	                    break;
	                case 'open_customizer':
	                    this.stateManager.updateIntent('customization');
	                    break;
	                default:
	                    if (content.includes('browse') || content.includes('catalog')) {
	                        this.stateManager.updateIntent('browsing');
	                    }
	            }
	        }
	        else if (content.includes('room') || content.includes('plan')) {
	            this.stateManager.updateIntent('room_planning');
	        }
	        else if (content.includes('customize') || content.includes('customization')) {
	            this.stateManager.updateIntent('customization');
	        }
	        else if (content.includes('browse') || content.includes('show') || content.includes('catalog')) {
	            this.stateManager.updateIntent('browsing');
	        }
	    }
	    getState() {
	        return this.stateManager.getState();
	    }
	    getMessages() {
	        return this.stateManager.getMessages();
	    }
	    clearConversation() {
	        this.stateManager.resetConversation();
	        this.addGreeting();
	    }
	    updatePreferences(preferences) {
	        this.stateManager.updatePreferences(preferences);
	    }
	    destroy() {
	        if (this.contextUnwatch) {
	            this.contextUnwatch();
	        }
	    }
	}

	function FurnitureAIWidget({ config = {}, defaultTab, widgetTitle }) {
	    const mergedConfig = reactExports.useMemo(() => mergeConfig(config), [config]);
	    const apiClient = reactExports.useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
	    const storage = reactExports.useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
	    const aiService = reactExports.useMemo(() => new AIService(apiClient, mergedConfig), [apiClient, mergedConfig]);
	    const enabledActions = reactExports.useMemo(() => getEnabledActions(mergedConfig), [mergedConfig]);
	    const analyticsContext = reactExports.useMemo(() => ({
	        apiBaseUrl: mergedConfig.apiBaseUrl,
	        storeId: mergedConfig.storeId || mergedConfig.widgetId,
	        widgetId: mergedConfig.widgetId,
	    }), [mergedConfig.apiBaseUrl, mergedConfig.storeId, mergedConfig.widgetId]);
	    const primaryColor = getPrimaryColor(mergedConfig);
	    const displayTitle = widgetTitle ||
	        config.widgetTitle ||
	        config.theme?.buttonText ||
	        DEFAULT_WIDGET_TITLE;
	    const primaryTextColor = getReadableTextColor(primaryColor);
	    const [viewMode, setViewMode] = reactExports.useState('conversation');
	    const [selectedProduct, setSelectedProduct] = reactExports.useState(null);
	    const [saveNotification, setSaveNotification] = reactExports.useState(null);
	    const [selectedCatalogItem, setSelectedCatalogItem] = reactExports.useState(null);
	    const [isCatalogModalOpen, setIsCatalogModalOpen] = reactExports.useState(false);
	    const [showSubmitModal, setShowSubmitModal] = reactExports.useState(false);
	    const [submitConfig, setSubmitConfig] = reactExports.useState(null);
	    reactExports.useEffect(() => {
	        // Handle external events for backward compatibility
	        const handleCustomizeItem = (event) => {
	            if (!enabledActions.customize)
	                return;
	            trackWidgetEvent({
	                ...analyticsContext,
	                type: 'customize_clicked',
	                productId: event.detail.id,
	                productName: event.detail.name,
	                metadata: {
	                    source: 'customize_event',
	                    category: event.detail.category,
	                },
	            });
	            setSelectedProduct(productFromFurnitureItem(event.detail));
	            setViewMode('customizer');
	        };
	        const handleNavigateToRoomPlanner = () => {
	            setViewMode('room-planner');
	        };
	        const handleNavigateToCustomizer = () => {
	            if (!enabledActions.customize)
	                return;
	            setViewMode('customizer');
	        };
	        window.addEventListener('modly:customize-item', handleCustomizeItem);
	        window.addEventListener('modly:navigate-to-room-planner', handleNavigateToRoomPlanner);
	        window.addEventListener('modly:navigate-to-customizer', handleNavigateToCustomizer);
	        return () => {
	            window.removeEventListener('modly:customize-item', handleCustomizeItem);
	            window.removeEventListener('modly:navigate-to-room-planner', handleNavigateToRoomPlanner);
	            window.removeEventListener('modly:navigate-to-customizer', handleNavigateToCustomizer);
	        };
	    }, [analyticsContext, enabledActions.customize]);
	    // Cleanup AI service on unmount
	    reactExports.useEffect(() => {
	        return () => {
	            aiService.destroy();
	        };
	    }, [aiService]);
	    // Convert FurnitureItem to CustomizedFurnitureItem format
	    const convertFurnitureItemToCustomized = (item) => {
	        const product = productFromFurnitureItem(item);
	        return {
	            productId: product.id,
	            productName: product.name,
	            category: product.category || item.category || item.subCategory || 'furniture',
	            imageUrl: item.images?.[0] || product.imageUrl || product.image || product.thumbnail,
	            source: item.source,
	            productUrl: item.productUrl || item.url,
	            price: item.priceRange?.min ?? item.price,
	            externalId: item.externalId,
	            shopifyProductId: item.shopifyProductId,
	            storeId: item.storeId,
	            name: product.name,
	            baseItemType: product.category || item.category || item.subCategory || 'furniture',
	            dimensions: {
	                length: item.dimensions.length,
	                width: item.dimensions.width,
	                height: item.dimensions.height,
	            },
	            colorScheme: {
	                primary: item.colors.main,
	                secondary: item.colors.accent,
	            },
	            materials: {
	                primary: item.materials.primary,
	                secondary: item.materials.secondary,
	                legs: item.materials.legs,
	                upholstery: item.materials.upholstery,
	            },
	            aiNotes: `Recommended from AI conversation: ${item.name}`,
	        };
	    };
	    const handleAddToRoomPlanner = (item) => {
	        try {
	            const customizedItem = convertFurnitureItemToCustomized(item);
	            storage.saveCustomizedFurniture(customizedItem);
	            setSaveNotification(`Added ${item.name} to Room Planner`);
	            setTimeout(() => setSaveNotification(null), 3000);
	        }
	        catch (error) {
	            console.error('Failed to add item to room planner:', error);
	        }
	    };
	    const handleCustomizeItem = (item) => {
	        if (!enabledActions.customize)
	            return;
	        trackWidgetEvent({
	            ...analyticsContext,
	            type: 'customize_clicked',
	            productId: item.id,
	            productName: item.name,
	            metadata: {
	                source: 'chat',
	                category: item.category,
	            },
	        });
	        setSelectedProduct(productFromFurnitureItem(item));
	        setViewMode('customizer');
	    };
	    const handleOpenRoomPlanner = () => {
	        setViewMode('room-planner');
	    };
	    const handleOpenCustomizer = () => {
	        if (!enabledActions.customize)
	            return;
	        trackWidgetEvent({
	            ...analyticsContext,
	            type: 'customize_clicked',
	            metadata: {
	                source: 'navigation',
	            },
	        });
	        setViewMode('customizer');
	    };
	    const handleShowCatalog = () => {
	        // Catalog navigation should not create a follow-up chat request.
	    };
	    const handleViewInCatalog = (item) => {
	        const catalogUrl = getRealProductUrl(item);
	        trackWidgetEvent({
	            ...analyticsContext,
	            type: 'view_in_catalog_clicked',
	            productId: item.id,
	            productName: item.name,
	            metadata: {
	                category: item.category,
	                productUrl: catalogUrl,
	            },
	        });
	        if (catalogUrl && typeof window !== 'undefined') {
	            window.open(catalogUrl, '_blank', 'noopener,noreferrer');
	        }
	    };
	    const handleCloseCatalogModal = () => {
	        setIsCatalogModalOpen(false);
	        setSelectedCatalogItem(null);
	    };
	    const handleCustomizeFromCatalog = () => {
	        if (selectedCatalogItem) {
	            handleCustomizeItem(selectedCatalogItem);
	            handleCloseCatalogModal();
	        }
	    };
	    const handleBackToConversation = () => {
	        setViewMode('conversation');
	    };
	    const handleSubmitSuccess = (data) => {
	        setShowSubmitModal(false);
	        setSubmitConfig(null);
	        setSaveNotification(data.type === 'cart'
	            ? `Added to cart! (ID: ${data.id})`
	            : `Quote request submitted! (ID: ${data.id})`);
	        setTimeout(() => setSaveNotification(null), 5000);
	    };
	    const handleCloseSubmitModal = () => {
	        setShowSubmitModal(false);
	        setSubmitConfig(null);
	    };
	    return (jsxRuntimeExports.jsxs("div", { className: "furniture-widget-ai h-full flex flex-col", children: [jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border-b border-gray-200 px-6 py-4 pr-16 flex items-center justify-between", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: displayTitle === DEFAULT_WIDGET_TITLE ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { children: "Modly" }), jsxRuntimeExports.jsx("span", { style: { color: primaryColor }, children: "AI" })] })) : (jsxRuntimeExports.jsx("span", { children: displayTitle })) }), viewMode === 'conversation' && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: handleOpenRoomPlanner, className: "text-sm px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors", children: "Room Planner" }), enabledActions.customize && (jsxRuntimeExports.jsx("button", { type: "button", onClick: handleOpenCustomizer, className: "text-sm px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors", children: "Customizer" }))] })), viewMode !== 'conversation' && (jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleBackToConversation, className: "text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }), "Back to Chat"] }))] }), jsxRuntimeExports.jsx("div", { className: "flex gap-2" })] }), jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden", children: [viewMode === 'conversation' && (jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [saveNotification && (jsxRuntimeExports.jsx("div", { className: "bg-green-500 text-white px-4 py-2 text-sm text-center flex-shrink-0", children: saveNotification })), jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0", children: jsxRuntimeExports.jsx(ConversationInterface, { aiService: aiService, onCustomizeItem: handleCustomizeItem, onAddToRoomPlanner: handleAddToRoomPlanner, onOpenRoomPlanner: handleOpenRoomPlanner, onOpenCustomizer: handleOpenCustomizer, onShowCatalog: handleShowCatalog, onViewInCatalog: handleViewInCatalog, enabledActions: enabledActions, primaryColor: primaryColor, analyticsContext: analyticsContext }) })] })), viewMode === 'room-planner' && (jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: jsxRuntimeExports.jsx(FurnitureRoomPlannerWidget, { config: mergedConfig, onCustomizeItem: enabledActions.customize ? handleCustomizeItem : undefined, onNavigateToCustomizer: enabledActions.customize ? handleOpenCustomizer : undefined }) })), viewMode === 'customizer' && (jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: enabledActions.customize && (jsxRuntimeExports.jsx(FurnitureCustomizerWidget, { config: mergedConfig, onNavigateToRoomPlanner: handleOpenRoomPlanner, selectedProduct: selectedProduct, onSelectedProductChange: setSelectedProduct })) }))] }), showSubmitModal && submitConfig && (jsxRuntimeExports.jsx(SubmitFlowModal, { config: submitConfig.config, product: submitConfig.product, apiClient: apiClient, onSuccess: handleSubmitSuccess, onClose: handleCloseSubmitModal })), isCatalogModalOpen && selectedCatalogItem && (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: selectedCatalogItem.name }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [selectedCatalogItem.dimensions && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Dimensions" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.dimensions.length, "\" L \u00D7 ", selectedCatalogItem.dimensions.width, "\" W \u00D7 ", selectedCatalogItem.dimensions.height, "\" H"] })] })), selectedCatalogItem.materials && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Materials" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.materials.primary, selectedCatalogItem.materials.secondary && `, ${selectedCatalogItem.materials.secondary}`] })] })), selectedCatalogItem.colors && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Colors" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.colors.main, selectedCatalogItem.colors.accent && ` / ${selectedCatalogItem.colors.accent}`] })] })), jsxRuntimeExports.jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4", children: jsxRuntimeExports.jsxs("p", { className: "text-sm text-blue-900", children: [jsxRuntimeExports.jsx("strong", { children: "Catalog coming soon." }), " You can customize this item instead."] }) })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [enabledActions.customize && (jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCustomizeFromCatalog, className: "flex-1 text-white px-4 py-2 rounded-lg transition-colors font-medium", style: { backgroundColor: primaryColor, color: primaryTextColor }, children: "Customize This" })), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCloseCatalogModal, className: "flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium", children: "Close" })] })] }) }))] }));
	}

	function FurnitureAIWidgetButton({ config = {}, defaultTab = 'room-planner', buttonText, buttonPosition = 'bottom-right', buttonStyle, className = '' }) {
	    const [isOpen, setIsOpen] = reactExports.useState(false);
	    const displayTitle = config.widgetTitle ||
	        config.theme?.buttonText ||
	        buttonText ||
	        DEFAULT_WIDGET_TITLE;
	    const trackOpen = () => {
	        trackWidgetEvent({
	            apiBaseUrl: config.apiBaseUrl,
	            storeId: config.storeId || config.widgetId,
	            widgetId: config.widgetId,
	            type: 'widget_opened',
	            metadata: {
	                source: 'widget_button',
	            },
	        });
	    };
	    reactExports.useEffect(() => {
	        const onOpen = () => {
	            setIsOpen(true);
	            trackOpen();
	        };
	        window.addEventListener('modly:open-widget', onOpen);
	        return () => window.removeEventListener('modly:open-widget', onOpen);
	    }, [config.apiBaseUrl, config.storeId, config.widgetId]);
	    reactExports.useEffect(() => {
	        const handleEscape = (e) => {
	            if (e.key === 'Escape' && isOpen) {
	                setIsOpen(false);
	            }
	        };
	        document.addEventListener('keydown', handleEscape);
	        return () => document.removeEventListener('keydown', handleEscape);
	    }, [isOpen]);
	    reactExports.useEffect(() => {
	        if (isOpen) {
	            document.body.style.overflow = 'hidden';
	        }
	        else {
	            document.body.style.overflow = 'unset';
	        }
	        return () => {
	            document.body.style.overflow = 'unset';
	        };
	    }, [isOpen]);
	    const positionClasses = {
	        'bottom-right': 'bottom-6 right-6',
	        'bottom-left': 'bottom-6 left-6',
	        'top-right': 'top-6 right-6',
	        'top-left': 'top-6 left-6',
	    };
	    const finalButtonStyle = reactExports.useMemo(() => {
	        const primaryColor = getPrimaryColor(config);
	        const textColor = getReadableTextColor(primaryColor);
	        const isDarkPrimary = isDarkColor(primaryColor);
	        const baseStyle = {
	            height: '44px',
	            minWidth: '112px',
	            padding: '0 18px',
	            background: isDarkPrimary
	                ? `linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 48%, rgba(0,0,0,0.10) 100%), ${primaryColor}`
	                : `linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.10) 45%, rgba(17,24,39,0.06) 100%), ${primaryColor}`,
	            border: isDarkPrimary
	                ? '1px solid rgba(255, 255, 255, 0.20)'
	                : '1px solid rgba(17, 24, 39, 0.14)',
	            color: textColor,
	            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
	            ...buttonStyle
	        };
	        return baseStyle;
	    }, [config, buttonStyle]);
	    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("button", { onClick: () => {
	                    setIsOpen(true);
	                    trackOpen();
	                }, style: finalButtonStyle, className: `modly-widget-button fixed ${positionClasses[buttonPosition]} z-50 cursor-pointer rounded-full inline-flex items-center justify-center gap-2 transition-all duration-200 ease-out ${className}`, onMouseEnter: (e) => {
	                    e.currentTarget.style.transform = 'translateY(-2px)';
	                    e.currentTarget.style.filter = 'brightness(1.04)';
	                    e.currentTarget.style.boxShadow = '0 14px 30px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.24)';
	                }, onMouseLeave: (e) => {
	                    e.currentTarget.style.transform = 'translateY(0)';
	                    e.currentTarget.style.filter = 'brightness(1)';
	                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.20)';
	                }, onFocus: (e) => {
	                    e.currentTarget.style.outline = '2px solid rgba(99, 102, 241, 0.5)';
	                    e.currentTarget.style.outlineOffset = '2px';
	                }, onBlur: (e) => {
	                    e.currentTarget.style.outline = 'none';
	                }, "aria-label": `Open ${displayTitle} widget`, children: [jsxRuntimeExports.jsx(MessageCircle, { "aria-hidden": "true", className: "h-4 w-4 shrink-0", strokeWidth: 2 }), jsxRuntimeExports.jsx("span", { className: "text-[14.5px] font-semibold", style: {
	                            letterSpacing: '0',
	                            lineHeight: 1,
	                            fontWeight: 600,
	                            whiteSpace: 'nowrap'
	                        }, children: displayTitle })] }), isOpen && (jsxRuntimeExports.jsx("div", { className: "modly-widget-modal-backdrop fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4", onClick: (e) => {
	                    if (e.target === e.currentTarget) {
	                        setIsOpen(false);
	                    }
	                }, children: jsxRuntimeExports.jsxs("div", { className: "modly-widget-modal-panel bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col relative", children: [jsxRuntimeExports.jsx("button", { onClick: () => setIsOpen(false), className: "modly-widget-modal-close absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors", "aria-label": "Close modal", children: jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }), jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: jsxRuntimeExports.jsx(FurnitureAIWidget, { config: config, defaultTab: defaultTab, widgetTitle: displayTitle }) })] }) }))] }));
	}

	var css_248z = "/*! tailwindcss v4.1.18 | MIT License | https://tailwindcss.com */\n@layer properties;\n@layer theme, base, components, utilities;\n@layer theme {\n  :root, :host {\n    --font-sans: ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\",\n      \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\",\n      \"Courier New\", monospace;\n    --color-red-50: oklch(97.1% 0.013 17.38);\n    --color-red-200: oklch(88.5% 0.062 18.334);\n    --color-red-400: oklch(70.4% 0.191 22.216);\n    --color-red-500: oklch(63.7% 0.237 25.331);\n    --color-red-600: oklch(57.7% 0.245 27.325);\n    --color-red-700: oklch(50.5% 0.213 27.518);\n    --color-red-900: oklch(39.6% 0.141 25.723);\n    --color-orange-50: oklch(98% 0.016 73.684);\n    --color-orange-100: oklch(95.4% 0.038 75.164);\n    --color-orange-200: oklch(90.1% 0.076 70.697);\n    --color-orange-700: oklch(55.3% 0.195 38.402);\n    --color-amber-50: oklch(98.7% 0.022 95.277);\n    --color-amber-200: oklch(92.4% 0.12 95.746);\n    --color-amber-700: oklch(55.5% 0.163 48.998);\n    --color-amber-800: oklch(47.3% 0.137 46.201);\n    --color-amber-900: oklch(41.4% 0.112 45.904);\n    --color-amber-950: oklch(27.9% 0.077 45.635);\n    --color-yellow-50: oklch(98.7% 0.026 102.212);\n    --color-yellow-200: oklch(94.5% 0.129 101.54);\n    --color-yellow-700: oklch(55.4% 0.135 66.442);\n    --color-yellow-800: oklch(47.6% 0.114 61.907);\n    --color-yellow-900: oklch(42.1% 0.095 57.708);\n    --color-green-50: oklch(98.2% 0.018 155.826);\n    --color-green-100: oklch(96.2% 0.044 156.743);\n    --color-green-200: oklch(92.5% 0.084 155.995);\n    --color-green-300: oklch(87.1% 0.15 154.449);\n    --color-green-500: oklch(72.3% 0.219 149.579);\n    --color-green-700: oklch(52.7% 0.154 150.069);\n    --color-emerald-50: oklch(97.9% 0.021 166.113);\n    --color-emerald-100: oklch(95% 0.052 163.051);\n    --color-emerald-200: oklch(90.5% 0.093 164.15);\n    --color-emerald-500: oklch(69.6% 0.17 162.48);\n    --color-emerald-600: oklch(59.6% 0.145 163.225);\n    --color-emerald-700: oklch(50.8% 0.118 165.612);\n    --color-emerald-800: oklch(43.2% 0.095 166.913);\n    --color-emerald-900: oklch(37.8% 0.077 168.94);\n    --color-emerald-950: oklch(26.2% 0.051 172.552);\n    --color-blue-50: oklch(97% 0.014 254.604);\n    --color-blue-100: oklch(93.2% 0.032 255.585);\n    --color-blue-200: oklch(88.2% 0.059 254.128);\n    --color-blue-300: oklch(80.9% 0.105 251.813);\n    --color-blue-400: oklch(70.7% 0.165 254.624);\n    --color-blue-500: oklch(62.3% 0.214 259.815);\n    --color-blue-600: oklch(54.6% 0.245 262.881);\n    --color-blue-700: oklch(48.8% 0.243 264.376);\n    --color-blue-800: oklch(42.4% 0.199 265.638);\n    --color-blue-900: oklch(37.9% 0.146 265.522);\n    --color-blue-950: oklch(28.2% 0.091 267.935);\n    --color-indigo-50: oklch(96.2% 0.018 272.314);\n    --color-indigo-100: oklch(93% 0.034 272.788);\n    --color-indigo-950: oklch(25.7% 0.09 281.288);\n    --color-purple-50: oklch(97.7% 0.014 308.299);\n    --color-purple-100: oklch(94.6% 0.033 307.174);\n    --color-purple-200: oklch(90.2% 0.063 306.703);\n    --color-purple-400: oklch(71.4% 0.203 305.504);\n    --color-purple-500: oklch(62.7% 0.265 303.9);\n    --color-purple-600: oklch(55.8% 0.288 302.321);\n    --color-purple-700: oklch(49.6% 0.265 301.924);\n    --color-purple-800: oklch(43.8% 0.218 303.724);\n    --color-slate-50: oklch(98.4% 0.003 247.858);\n    --color-gray-50: oklch(98.5% 0.002 247.839);\n    --color-gray-100: oklch(96.7% 0.003 264.542);\n    --color-gray-200: oklch(92.8% 0.006 264.531);\n    --color-gray-300: oklch(87.2% 0.01 258.338);\n    --color-gray-400: oklch(70.7% 0.022 261.325);\n    --color-gray-500: oklch(55.1% 0.027 264.364);\n    --color-gray-600: oklch(44.6% 0.03 256.802);\n    --color-gray-700: oklch(37.3% 0.034 259.733);\n    --color-gray-800: oklch(27.8% 0.033 256.848);\n    --color-gray-900: oklch(21% 0.034 264.665);\n    --color-gray-950: oklch(13% 0.028 261.692);\n    --color-zinc-50: oklch(98.5% 0 0);\n    --color-zinc-900: oklch(21% 0.006 285.885);\n    --color-stone-50: oklch(98.5% 0.001 106.423);\n    --color-stone-100: oklch(97% 0.001 106.424);\n    --color-stone-200: oklch(92.3% 0.003 48.717);\n    --color-stone-300: oklch(86.9% 0.005 56.366);\n    --color-stone-400: oklch(70.9% 0.01 56.259);\n    --color-stone-900: oklch(21.6% 0.006 56.043);\n    --color-black: #000;\n    --color-white: #fff;\n    --spacing: 0.25rem;\n    --container-sm: 24rem;\n    --container-md: 28rem;\n    --container-lg: 32rem;\n    --container-2xl: 42rem;\n    --container-3xl: 48rem;\n    --container-5xl: 64rem;\n    --container-6xl: 72rem;\n    --container-7xl: 80rem;\n    --text-xs: 0.75rem;\n    --text-xs--line-height: calc(1 / 0.75);\n    --text-sm: 0.875rem;\n    --text-sm--line-height: calc(1.25 / 0.875);\n    --text-base: 1rem;\n    --text-base--line-height: calc(1.5 / 1);\n    --text-lg: 1.125rem;\n    --text-lg--line-height: calc(1.75 / 1.125);\n    --text-xl: 1.25rem;\n    --text-xl--line-height: calc(1.75 / 1.25);\n    --text-2xl: 1.5rem;\n    --text-2xl--line-height: calc(2 / 1.5);\n    --text-3xl: 1.875rem;\n    --text-3xl--line-height: calc(2.25 / 1.875);\n    --text-4xl: 2.25rem;\n    --text-4xl--line-height: calc(2.5 / 2.25);\n    --text-5xl: 3rem;\n    --text-5xl--line-height: 1;\n    --font-weight-medium: 500;\n    --font-weight-semibold: 600;\n    --font-weight-bold: 700;\n    --leading-tight: 1.25;\n    --leading-snug: 1.375;\n    --leading-relaxed: 1.625;\n    --radius-lg: 0.5rem;\n    --radius-xl: 0.75rem;\n    --radius-2xl: 1rem;\n    --radius-3xl: 1.5rem;\n    --ease-out: cubic-bezier(0, 0, 0.2, 1);\n    --animate-spin: spin 1s linear infinite;\n    --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n    --animate-bounce: bounce 1s infinite;\n    --blur-sm: 8px;\n    --aspect-video: 16 / 9;\n    --default-transition-duration: 150ms;\n    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    --default-font-family: var(--font-sans);\n    --default-mono-font-family: var(--font-mono);\n    --color-earth-border: #3a3f38;\n    --color-earth-sage: #8da38e;\n    --color-earth-forest: #3d543f;\n    --color-text-primary: #e3e5e2;\n    --color-text-muted: #7a8079;\n  }\n}\n@layer base {\n  *, ::after, ::before, ::backdrop, ::file-selector-button {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0 solid;\n  }\n  html, :host {\n    line-height: 1.5;\n    -webkit-text-size-adjust: 100%;\n    -moz-tab-size: 4;\n      -o-tab-size: 4;\n         tab-size: 4;\n    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");\n    font-feature-settings: var(--default-font-feature-settings, normal);\n    font-variation-settings: var(--default-font-variation-settings, normal);\n    -webkit-tap-highlight-color: transparent;\n  }\n  hr {\n    height: 0;\n    color: inherit;\n    border-top-width: 1px;\n  }\n  abbr:where([title]) {\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n  }\n  h1, h2, h3, h4, h5, h6 {\n    font-size: inherit;\n    font-weight: inherit;\n  }\n  a {\n    color: inherit;\n    -webkit-text-decoration: inherit;\n    text-decoration: inherit;\n  }\n  b, strong {\n    font-weight: bolder;\n  }\n  code, kbd, samp, pre {\n    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);\n    font-feature-settings: var(--default-mono-font-feature-settings, normal);\n    font-variation-settings: var(--default-mono-font-variation-settings, normal);\n    font-size: 1em;\n  }\n  small {\n    font-size: 80%;\n  }\n  sub, sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n  sub {\n    bottom: -0.25em;\n  }\n  sup {\n    top: -0.5em;\n  }\n  table {\n    text-indent: 0;\n    border-color: inherit;\n    border-collapse: collapse;\n  }\n  :-moz-focusring {\n    outline: auto;\n  }\n  progress {\n    vertical-align: baseline;\n  }\n  summary {\n    display: list-item;\n  }\n  ol, ul, menu {\n    list-style: none;\n  }\n  img, svg, video, canvas, audio, iframe, embed, object {\n    display: block;\n    vertical-align: middle;\n  }\n  img, video {\n    max-width: 100%;\n    height: auto;\n  }\n  button, input, select, optgroup, textarea, ::file-selector-button {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    border-radius: 0;\n    background-color: transparent;\n    opacity: 1;\n  }\n  :where(select:is([multiple], [size])) optgroup {\n    font-weight: bolder;\n  }\n  :where(select:is([multiple], [size])) optgroup option {\n    padding-inline-start: 20px;\n  }\n  ::file-selector-button {\n    margin-inline-end: 4px;\n  }\n  ::-moz-placeholder {\n    opacity: 1;\n  }\n  ::placeholder {\n    opacity: 1;\n  }\n  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {\n    ::-moz-placeholder {\n      color: currentcolor;\n      @supports (color: color-mix(in lab, red, red)) {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n    ::placeholder {\n      color: currentcolor;\n      @supports (color: color-mix(in lab, red, red)) {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n  }\n  textarea {\n    resize: vertical;\n  }\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  ::-webkit-date-and-time-value {\n    min-height: 1lh;\n    text-align: inherit;\n  }\n  ::-webkit-datetime-edit {\n    display: inline-flex;\n  }\n  ::-webkit-datetime-edit-fields-wrapper {\n    padding: 0;\n  }\n  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {\n    padding-block: 0;\n  }\n  ::-webkit-calendar-picker-indicator {\n    line-height: 1;\n  }\n  :-moz-ui-invalid {\n    box-shadow: none;\n  }\n  button, input:where([type=\"button\"], [type=\"reset\"], [type=\"submit\"]), ::file-selector-button {\n    -webkit-appearance: button;\n       -moz-appearance: button;\n            appearance: button;\n  }\n  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {\n    height: auto;\n  }\n  [hidden]:where(:not([hidden=\"until-found\"])) {\n    display: none !important;\n  }\n}\n@layer utilities {\n  .pointer-events-none {\n    pointer-events: none;\n  }\n  .invisible {\n    visibility: hidden;\n  }\n  .absolute {\n    position: absolute;\n  }\n  .fixed {\n    position: fixed;\n  }\n  .relative {\n    position: relative;\n  }\n  .static {\n    position: static;\n  }\n  .sticky {\n    position: sticky;\n  }\n  .inset-0 {\n    inset: calc(var(--spacing) * 0);\n  }\n  .-top-2 {\n    top: calc(var(--spacing) * -2);\n  }\n  .top-0 {\n    top: calc(var(--spacing) * 0);\n  }\n  .top-1 {\n    top: calc(var(--spacing) * 1);\n  }\n  .top-1\\/2 {\n    top: calc(1/2 * 100%);\n  }\n  .top-1\\/3 {\n    top: calc(1/3 * 100%);\n  }\n  .top-1\\/4 {\n    top: calc(1/4 * 100%);\n  }\n  .top-4 {\n    top: calc(var(--spacing) * 4);\n  }\n  .top-5 {\n    top: calc(var(--spacing) * 5);\n  }\n  .top-6 {\n    top: calc(var(--spacing) * 6);\n  }\n  .-right-2 {\n    right: calc(var(--spacing) * -2);\n  }\n  .right-1\\/4 {\n    right: calc(1/4 * 100%);\n  }\n  .right-3 {\n    right: calc(var(--spacing) * 3);\n  }\n  .right-4 {\n    right: calc(var(--spacing) * 4);\n  }\n  .right-5 {\n    right: calc(var(--spacing) * 5);\n  }\n  .right-6 {\n    right: calc(var(--spacing) * 6);\n  }\n  .bottom-0 {\n    bottom: calc(var(--spacing) * 0);\n  }\n  .bottom-6 {\n    bottom: calc(var(--spacing) * 6);\n  }\n  .bottom-full {\n    bottom: 100%;\n  }\n  .left-1 {\n    left: calc(var(--spacing) * 1);\n  }\n  .left-1\\/2 {\n    left: calc(1/2 * 100%);\n  }\n  .left-1\\/4 {\n    left: calc(1/4 * 100%);\n  }\n  .left-6 {\n    left: calc(var(--spacing) * 6);\n  }\n  .z-10 {\n    z-index: 10;\n  }\n  .z-50 {\n    z-index: 50;\n  }\n  .z-\\[100\\] {\n    z-index: 100;\n  }\n  .container {\n    width: 100%;\n    @media (width >= 40rem) {\n      max-width: 40rem;\n    }\n    @media (width >= 48rem) {\n      max-width: 48rem;\n    }\n    @media (width >= 64rem) {\n      max-width: 64rem;\n    }\n    @media (width >= 80rem) {\n      max-width: 80rem;\n    }\n    @media (width >= 96rem) {\n      max-width: 96rem;\n    }\n  }\n  .mx-auto {\n    margin-inline: auto;\n  }\n  .mt-0\\.5 {\n    margin-top: calc(var(--spacing) * 0.5);\n  }\n  .mt-1 {\n    margin-top: calc(var(--spacing) * 1);\n  }\n  .mt-1\\.5 {\n    margin-top: calc(var(--spacing) * 1.5);\n  }\n  .mt-2 {\n    margin-top: calc(var(--spacing) * 2);\n  }\n  .mt-3 {\n    margin-top: calc(var(--spacing) * 3);\n  }\n  .mt-4 {\n    margin-top: calc(var(--spacing) * 4);\n  }\n  .mt-5 {\n    margin-top: calc(var(--spacing) * 5);\n  }\n  .mt-6 {\n    margin-top: calc(var(--spacing) * 6);\n  }\n  .mt-8 {\n    margin-top: calc(var(--spacing) * 8);\n  }\n  .mr-2 {\n    margin-right: calc(var(--spacing) * 2);\n  }\n  .mb-1 {\n    margin-bottom: calc(var(--spacing) * 1);\n  }\n  .mb-1\\.5 {\n    margin-bottom: calc(var(--spacing) * 1.5);\n  }\n  .mb-2 {\n    margin-bottom: calc(var(--spacing) * 2);\n  }\n  .mb-3 {\n    margin-bottom: calc(var(--spacing) * 3);\n  }\n  .mb-4 {\n    margin-bottom: calc(var(--spacing) * 4);\n  }\n  .mb-5 {\n    margin-bottom: calc(var(--spacing) * 5);\n  }\n  .mb-6 {\n    margin-bottom: calc(var(--spacing) * 6);\n  }\n  .mb-8 {\n    margin-bottom: calc(var(--spacing) * 8);\n  }\n  .mb-12 {\n    margin-bottom: calc(var(--spacing) * 12);\n  }\n  .ml-1 {\n    margin-left: calc(var(--spacing) * 1);\n  }\n  .ml-2 {\n    margin-left: calc(var(--spacing) * 2);\n  }\n  .ml-3 {\n    margin-left: calc(var(--spacing) * 3);\n  }\n  .line-clamp-3 {\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 3;\n  }\n  .block {\n    display: block;\n  }\n  .flex {\n    display: flex;\n  }\n  .grid {\n    display: grid;\n  }\n  .hidden {\n    display: none;\n  }\n  .inline-block {\n    display: inline-block;\n  }\n  .inline-flex {\n    display: inline-flex;\n  }\n  .table {\n    display: table;\n  }\n  .aspect-\\[4\\/3\\] {\n    aspect-ratio: 4/3;\n  }\n  .aspect-square {\n    aspect-ratio: 1 / 1;\n  }\n  .aspect-video {\n    aspect-ratio: var(--aspect-video);\n  }\n  .h-2 {\n    height: calc(var(--spacing) * 2);\n  }\n  .h-3 {\n    height: calc(var(--spacing) * 3);\n  }\n  .h-3\\.5 {\n    height: calc(var(--spacing) * 3.5);\n  }\n  .h-4 {\n    height: calc(var(--spacing) * 4);\n  }\n  .h-5 {\n    height: calc(var(--spacing) * 5);\n  }\n  .h-6 {\n    height: calc(var(--spacing) * 6);\n  }\n  .h-7 {\n    height: calc(var(--spacing) * 7);\n  }\n  .h-8 {\n    height: calc(var(--spacing) * 8);\n  }\n  .h-10 {\n    height: calc(var(--spacing) * 10);\n  }\n  .h-12 {\n    height: calc(var(--spacing) * 12);\n  }\n  .h-14 {\n    height: calc(var(--spacing) * 14);\n  }\n  .h-16 {\n    height: calc(var(--spacing) * 16);\n  }\n  .h-20 {\n    height: calc(var(--spacing) * 20);\n  }\n  .h-24 {\n    height: calc(var(--spacing) * 24);\n  }\n  .h-48 {\n    height: calc(var(--spacing) * 48);\n  }\n  .h-\\[90vh\\] {\n    height: 90vh;\n  }\n  .h-full {\n    height: 100%;\n  }\n  .max-h-60 {\n    max-height: calc(var(--spacing) * 60);\n  }\n  .max-h-\\[90vh\\] {\n    max-height: 90vh;\n  }\n  .max-h-\\[380px\\] {\n    max-height: 380px;\n  }\n  .max-h-\\[600px\\] {\n    max-height: 600px;\n  }\n  .min-h-0 {\n    min-height: calc(var(--spacing) * 0);\n  }\n  .min-h-11 {\n    min-height: calc(var(--spacing) * 11);\n  }\n  .min-h-12 {\n    min-height: calc(var(--spacing) * 12);\n  }\n  .min-h-\\[200px\\] {\n    min-height: 200px;\n  }\n  .min-h-screen {\n    min-height: 100vh;\n  }\n  .w-2 {\n    width: calc(var(--spacing) * 2);\n  }\n  .w-3 {\n    width: calc(var(--spacing) * 3);\n  }\n  .w-3\\.5 {\n    width: calc(var(--spacing) * 3.5);\n  }\n  .w-4 {\n    width: calc(var(--spacing) * 4);\n  }\n  .w-5 {\n    width: calc(var(--spacing) * 5);\n  }\n  .w-6 {\n    width: calc(var(--spacing) * 6);\n  }\n  .w-7 {\n    width: calc(var(--spacing) * 7);\n  }\n  .w-8 {\n    width: calc(var(--spacing) * 8);\n  }\n  .w-10 {\n    width: calc(var(--spacing) * 10);\n  }\n  .w-11 {\n    width: calc(var(--spacing) * 11);\n  }\n  .w-12 {\n    width: calc(var(--spacing) * 12);\n  }\n  .w-14 {\n    width: calc(var(--spacing) * 14);\n  }\n  .w-16 {\n    width: calc(var(--spacing) * 16);\n  }\n  .w-20 {\n    width: calc(var(--spacing) * 20);\n  }\n  .w-24 {\n    width: calc(var(--spacing) * 24);\n  }\n  .w-56 {\n    width: calc(var(--spacing) * 56);\n  }\n  .w-full {\n    width: 100%;\n  }\n  .max-w-2xl {\n    max-width: var(--container-2xl);\n  }\n  .max-w-3xl {\n    max-width: var(--container-3xl);\n  }\n  .max-w-5xl {\n    max-width: var(--container-5xl);\n  }\n  .max-w-6xl {\n    max-width: var(--container-6xl);\n  }\n  .max-w-7xl {\n    max-width: var(--container-7xl);\n  }\n  .max-w-\\[80\\%\\] {\n    max-width: 80%;\n  }\n  .max-w-lg {\n    max-width: var(--container-lg);\n  }\n  .max-w-md {\n    max-width: var(--container-md);\n  }\n  .max-w-sm {\n    max-width: var(--container-sm);\n  }\n  .min-w-0 {\n    min-width: calc(var(--spacing) * 0);\n  }\n  .flex-1 {\n    flex: 1;\n  }\n  .flex-shrink-0 {\n    flex-shrink: 0;\n  }\n  .shrink-0 {\n    flex-shrink: 0;\n  }\n  .-translate-x-1\\/2 {\n    --tw-translate-x: calc(calc(1/2 * 100%) * -1);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  .translate-x-0 {\n    --tw-translate-x: calc(var(--spacing) * 0);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  .translate-x-1 {\n    --tw-translate-x: calc(var(--spacing) * 1);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  .translate-x-6 {\n    --tw-translate-x: calc(var(--spacing) * 6);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  .-translate-y-1\\/2 {\n    --tw-translate-y: calc(calc(1/2 * 100%) * -1);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  .rotate-180 {\n    rotate: 180deg;\n  }\n  .transform {\n    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);\n  }\n  .animate-bounce {\n    animation: var(--animate-bounce);\n  }\n  .animate-pulse {\n    animation: var(--animate-pulse);\n  }\n  .animate-spin {\n    animation: var(--animate-spin);\n  }\n  .cursor-help {\n    cursor: help;\n  }\n  .cursor-not-allowed {\n    cursor: not-allowed;\n  }\n  .cursor-pointer {\n    cursor: pointer;\n  }\n  .resize {\n    resize: both;\n  }\n  .resize-none {\n    resize: none;\n  }\n  .scroll-mt-24 {\n    scroll-margin-top: calc(var(--spacing) * 24);\n  }\n  .list-disc {\n    list-style-type: disc;\n  }\n  .appearance-none {\n    -webkit-appearance: none;\n       -moz-appearance: none;\n            appearance: none;\n  }\n  .grid-cols-1 {\n    grid-template-columns: repeat(1, minmax(0, 1fr));\n  }\n  .grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n  .flex-col {\n    flex-direction: column;\n  }\n  .flex-col-reverse {\n    flex-direction: column-reverse;\n  }\n  .flex-wrap {\n    flex-wrap: wrap;\n  }\n  .items-center {\n    align-items: center;\n  }\n  .items-start {\n    align-items: flex-start;\n  }\n  .justify-between {\n    justify-content: space-between;\n  }\n  .justify-center {\n    justify-content: center;\n  }\n  .justify-end {\n    justify-content: flex-end;\n  }\n  .justify-start {\n    justify-content: flex-start;\n  }\n  .gap-1 {\n    gap: calc(var(--spacing) * 1);\n  }\n  .gap-1\\.5 {\n    gap: calc(var(--spacing) * 1.5);\n  }\n  .gap-2 {\n    gap: calc(var(--spacing) * 2);\n  }\n  .gap-3 {\n    gap: calc(var(--spacing) * 3);\n  }\n  .gap-4 {\n    gap: calc(var(--spacing) * 4);\n  }\n  .gap-5 {\n    gap: calc(var(--spacing) * 5);\n  }\n  .gap-6 {\n    gap: calc(var(--spacing) * 6);\n  }\n  .space-y-1 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 1) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-2 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-3 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-4 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-5 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 5) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 5) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-6 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .gap-x-2 {\n    -moz-column-gap: calc(var(--spacing) * 2);\n         column-gap: calc(var(--spacing) * 2);\n  }\n  .gap-y-1 {\n    row-gap: calc(var(--spacing) * 1);\n  }\n  .self-start {\n    align-self: flex-start;\n  }\n  .overflow-hidden {\n    overflow: hidden;\n  }\n  .overflow-y-auto {\n    overflow-y: auto;\n  }\n  .rounded {\n    border-radius: 0.25rem;\n  }\n  .rounded-2xl {\n    border-radius: var(--radius-2xl);\n  }\n  .rounded-3xl {\n    border-radius: var(--radius-3xl);\n  }\n  .rounded-\\[28px\\] {\n    border-radius: 28px;\n  }\n  .rounded-full {\n    border-radius: calc(infinity * 1px);\n  }\n  .rounded-lg {\n    border-radius: var(--radius-lg);\n  }\n  .rounded-xl {\n    border-radius: var(--radius-xl);\n  }\n  .rounded-t-xl {\n    border-top-left-radius: var(--radius-xl);\n    border-top-right-radius: var(--radius-xl);\n  }\n  .border {\n    border-style: var(--tw-border-style);\n    border-width: 1px;\n  }\n  .border-2 {\n    border-style: var(--tw-border-style);\n    border-width: 2px;\n  }\n  .border-4 {\n    border-style: var(--tw-border-style);\n    border-width: 4px;\n  }\n  .border-t {\n    border-top-style: var(--tw-border-style);\n    border-top-width: 1px;\n  }\n  .border-b {\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 1px;\n  }\n  .border-b-2 {\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 2px;\n  }\n  .border-dashed {\n    --tw-border-style: dashed;\n    border-style: dashed;\n  }\n  .border-amber-200 {\n    border-color: var(--color-amber-200);\n  }\n  .border-blue-100 {\n    border-color: var(--color-blue-100);\n  }\n  .border-blue-200 {\n    border-color: var(--color-blue-200);\n  }\n  .border-blue-500 {\n    border-color: var(--color-blue-500);\n  }\n  .border-blue-500\\/30 {\n    border-color: color-mix(in srgb, oklch(62.3% 0.214 259.815) 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      border-color: color-mix(in oklab, var(--color-blue-500) 30%, transparent);\n    }\n  }\n  .border-blue-600 {\n    border-color: var(--color-blue-600);\n  }\n  .border-earth-border {\n    border-color: var(--color-earth-border);\n  }\n  .border-emerald-100 {\n    border-color: var(--color-emerald-100);\n  }\n  .border-emerald-200 {\n    border-color: var(--color-emerald-200);\n  }\n  .border-emerald-500 {\n    border-color: var(--color-emerald-500);\n  }\n  .border-gray-100 {\n    border-color: var(--color-gray-100);\n  }\n  .border-gray-200 {\n    border-color: var(--color-gray-200);\n  }\n  .border-gray-300 {\n    border-color: var(--color-gray-300);\n  }\n  .border-green-200 {\n    border-color: var(--color-green-200);\n  }\n  .border-indigo-100 {\n    border-color: var(--color-indigo-100);\n  }\n  .border-orange-200 {\n    border-color: var(--color-orange-200);\n  }\n  .border-purple-200 {\n    border-color: var(--color-purple-200);\n  }\n  .border-purple-500 {\n    border-color: var(--color-purple-500);\n  }\n  .border-red-200 {\n    border-color: var(--color-red-200);\n  }\n  .border-red-500\\/30 {\n    border-color: color-mix(in srgb, oklch(63.7% 0.237 25.331) 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      border-color: color-mix(in oklab, var(--color-red-500) 30%, transparent);\n    }\n  }\n  .border-stone-100 {\n    border-color: var(--color-stone-100);\n  }\n  .border-stone-200 {\n    border-color: var(--color-stone-200);\n  }\n  .border-stone-300 {\n    border-color: var(--color-stone-300);\n  }\n  .border-white {\n    border-color: var(--color-white);\n  }\n  .border-white\\/10 {\n    border-color: color-mix(in srgb, #fff 10%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      border-color: color-mix(in oklab, var(--color-white) 10%, transparent);\n    }\n  }\n  .border-white\\/50 {\n    border-color: color-mix(in srgb, #fff 50%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      border-color: color-mix(in oklab, var(--color-white) 50%, transparent);\n    }\n  }\n  .border-yellow-200 {\n    border-color: var(--color-yellow-200);\n  }\n  .border-t-transparent {\n    border-top-color: transparent;\n  }\n  .border-t-white {\n    border-top-color: var(--color-white);\n  }\n  .bg-\\[\\#1A1C19\\] {\n    background-color: #1A1C19;\n  }\n  .bg-\\[\\#2A2D28\\] {\n    background-color: #2A2D28;\n  }\n  .bg-\\[\\#fffaf4\\] {\n    background-color: #fffaf4;\n  }\n  .bg-\\[\\#fffaf4\\]\\/95 {\n    background-color: color-mix(in oklab, #fffaf4 95%, transparent);\n  }\n  .bg-\\[\\#fffdf9\\] {\n    background-color: #fffdf9;\n  }\n  .bg-amber-50 {\n    background-color: var(--color-amber-50);\n  }\n  .bg-black {\n    background-color: var(--color-black);\n  }\n  .bg-black\\/60 {\n    background-color: color-mix(in srgb, #000 60%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-black) 60%, transparent);\n    }\n  }\n  .bg-blue-50 {\n    background-color: var(--color-blue-50);\n  }\n  .bg-blue-50\\/70 {\n    background-color: color-mix(in srgb, oklch(97% 0.014 254.604) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-blue-50) 70%, transparent);\n    }\n  }\n  .bg-blue-50\\/80 {\n    background-color: color-mix(in srgb, oklch(97% 0.014 254.604) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-blue-50) 80%, transparent);\n    }\n  }\n  .bg-blue-100 {\n    background-color: var(--color-blue-100);\n  }\n  .bg-blue-200 {\n    background-color: var(--color-blue-200);\n  }\n  .bg-blue-500 {\n    background-color: var(--color-blue-500);\n  }\n  .bg-blue-500\\/10 {\n    background-color: color-mix(in srgb, oklch(62.3% 0.214 259.815) 10%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-blue-500) 10%, transparent);\n    }\n  }\n  .bg-blue-600 {\n    background-color: var(--color-blue-600);\n  }\n  .bg-blue-600\\/10 {\n    background-color: color-mix(in srgb, oklch(54.6% 0.245 262.881) 10%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-blue-600) 10%, transparent);\n    }\n  }\n  .bg-earth-forest {\n    background-color: var(--color-earth-forest);\n  }\n  .bg-emerald-50 {\n    background-color: var(--color-emerald-50);\n  }\n  .bg-emerald-500\\/15 {\n    background-color: color-mix(in srgb, oklch(69.6% 0.17 162.48) 15%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-emerald-500) 15%, transparent);\n    }\n  }\n  .bg-emerald-600 {\n    background-color: var(--color-emerald-600);\n  }\n  .bg-gray-50 {\n    background-color: var(--color-gray-50);\n  }\n  .bg-gray-100 {\n    background-color: var(--color-gray-100);\n  }\n  .bg-gray-200 {\n    background-color: var(--color-gray-200);\n  }\n  .bg-gray-400 {\n    background-color: var(--color-gray-400);\n  }\n  .bg-gray-950 {\n    background-color: var(--color-gray-950);\n  }\n  .bg-gray-950\\/45 {\n    background-color: color-mix(in srgb, oklch(13% 0.028 261.692) 45%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-gray-950) 45%, transparent);\n    }\n  }\n  .bg-green-50 {\n    background-color: var(--color-green-50);\n  }\n  .bg-green-100 {\n    background-color: var(--color-green-100);\n  }\n  .bg-green-500 {\n    background-color: var(--color-green-500);\n  }\n  .bg-indigo-50\\/70 {\n    background-color: color-mix(in srgb, oklch(96.2% 0.018 272.314) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-indigo-50) 70%, transparent);\n    }\n  }\n  .bg-orange-50 {\n    background-color: var(--color-orange-50);\n  }\n  .bg-orange-100 {\n    background-color: var(--color-orange-100);\n  }\n  .bg-purple-50 {\n    background-color: var(--color-purple-50);\n  }\n  .bg-purple-100 {\n    background-color: var(--color-purple-100);\n  }\n  .bg-purple-500\\/15 {\n    background-color: color-mix(in srgb, oklch(62.7% 0.265 303.9) 15%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-purple-500) 15%, transparent);\n    }\n  }\n  .bg-purple-600 {\n    background-color: var(--color-purple-600);\n  }\n  .bg-red-50 {\n    background-color: var(--color-red-50);\n  }\n  .bg-red-500 {\n    background-color: var(--color-red-500);\n  }\n  .bg-red-500\\/10 {\n    background-color: color-mix(in srgb, oklch(63.7% 0.237 25.331) 10%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-red-500) 10%, transparent);\n    }\n  }\n  .bg-stone-50 {\n    background-color: var(--color-stone-50);\n  }\n  .bg-stone-50\\/70 {\n    background-color: color-mix(in srgb, oklch(98.5% 0.001 106.423) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-stone-50) 70%, transparent);\n    }\n  }\n  .bg-stone-100 {\n    background-color: var(--color-stone-100);\n  }\n  .bg-stone-200 {\n    background-color: var(--color-stone-200);\n  }\n  .bg-white {\n    background-color: var(--color-white);\n  }\n  .bg-white\\/5 {\n    background-color: color-mix(in srgb, #fff 5%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-white) 5%, transparent);\n    }\n  }\n  .bg-white\\/20 {\n    background-color: color-mix(in srgb, #fff 20%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-white) 20%, transparent);\n    }\n  }\n  .bg-white\\/95 {\n    background-color: color-mix(in srgb, #fff 95%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-white) 95%, transparent);\n    }\n  }\n  .bg-yellow-50 {\n    background-color: var(--color-yellow-50);\n  }\n  .bg-zinc-900 {\n    background-color: var(--color-zinc-900);\n  }\n  .bg-gradient-to-br {\n    --tw-gradient-position: to bottom right in oklab;\n    background-image: linear-gradient(var(--tw-gradient-stops));\n  }\n  .bg-\\[linear-gradient\\(180deg\\,\\#f8fbff_0\\%\\,\\#eef4ff_100\\%\\)\\] {\n    background-image: linear-gradient(180deg,#f8fbff 0%,#eef4ff 100%);\n  }\n  .from-amber-50 {\n    --tw-gradient-from: var(--color-amber-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .from-blue-600 {\n    --tw-gradient-from: var(--color-blue-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .from-gray-50 {\n    --tw-gradient-from: var(--color-gray-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .from-purple-600 {\n    --tw-gradient-from: var(--color-purple-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .from-slate-50 {\n    --tw-gradient-from: var(--color-slate-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .from-stone-50 {\n    --tw-gradient-from: var(--color-stone-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .from-stone-100 {\n    --tw-gradient-from: var(--color-stone-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .from-zinc-50 {\n    --tw-gradient-from: var(--color-zinc-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .to-blue-800 {\n    --tw-gradient-to: var(--color-blue-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .to-purple-800 {\n    --tw-gradient-to: var(--color-purple-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .to-stone-50 {\n    --tw-gradient-to: var(--color-stone-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .to-stone-100 {\n    --tw-gradient-to: var(--color-stone-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .to-white {\n    --tw-gradient-to: var(--color-white);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .object-cover {\n    -o-object-fit: cover;\n       object-fit: cover;\n  }\n  .p-2 {\n    padding: calc(var(--spacing) * 2);\n  }\n  .p-2\\.5 {\n    padding: calc(var(--spacing) * 2.5);\n  }\n  .p-3 {\n    padding: calc(var(--spacing) * 3);\n  }\n  .p-4 {\n    padding: calc(var(--spacing) * 4);\n  }\n  .p-5 {\n    padding: calc(var(--spacing) * 5);\n  }\n  .p-6 {\n    padding: calc(var(--spacing) * 6);\n  }\n  .p-8 {\n    padding: calc(var(--spacing) * 8);\n  }\n  .px-2 {\n    padding-inline: calc(var(--spacing) * 2);\n  }\n  .px-3 {\n    padding-inline: calc(var(--spacing) * 3);\n  }\n  .px-4 {\n    padding-inline: calc(var(--spacing) * 4);\n  }\n  .px-5 {\n    padding-inline: calc(var(--spacing) * 5);\n  }\n  .px-6 {\n    padding-inline: calc(var(--spacing) * 6);\n  }\n  .py-0\\.5 {\n    padding-block: calc(var(--spacing) * 0.5);\n  }\n  .py-1 {\n    padding-block: calc(var(--spacing) * 1);\n  }\n  .py-1\\.5 {\n    padding-block: calc(var(--spacing) * 1.5);\n  }\n  .py-2 {\n    padding-block: calc(var(--spacing) * 2);\n  }\n  .py-2\\.5 {\n    padding-block: calc(var(--spacing) * 2.5);\n  }\n  .py-3 {\n    padding-block: calc(var(--spacing) * 3);\n  }\n  .py-4 {\n    padding-block: calc(var(--spacing) * 4);\n  }\n  .py-5 {\n    padding-block: calc(var(--spacing) * 5);\n  }\n  .py-6 {\n    padding-block: calc(var(--spacing) * 6);\n  }\n  .py-8 {\n    padding-block: calc(var(--spacing) * 8);\n  }\n  .py-12 {\n    padding-block: calc(var(--spacing) * 12);\n  }\n  .pt-1 {\n    padding-top: calc(var(--spacing) * 1);\n  }\n  .pt-2 {\n    padding-top: calc(var(--spacing) * 2);\n  }\n  .pt-3 {\n    padding-top: calc(var(--spacing) * 3);\n  }\n  .pt-4 {\n    padding-top: calc(var(--spacing) * 4);\n  }\n  .pt-6 {\n    padding-top: calc(var(--spacing) * 6);\n  }\n  .pr-10 {\n    padding-right: calc(var(--spacing) * 10);\n  }\n  .pr-16 {\n    padding-right: calc(var(--spacing) * 16);\n  }\n  .pb-0 {\n    padding-bottom: calc(var(--spacing) * 0);\n  }\n  .pb-6 {\n    padding-bottom: calc(var(--spacing) * 6);\n  }\n  .pl-5 {\n    padding-left: calc(var(--spacing) * 5);\n  }\n  .text-center {\n    text-align: center;\n  }\n  .text-left {\n    text-align: left;\n  }\n  .text-right {\n    text-align: right;\n  }\n  .text-2xl {\n    font-size: var(--text-2xl);\n    line-height: var(--tw-leading, var(--text-2xl--line-height));\n  }\n  .text-3xl {\n    font-size: var(--text-3xl);\n    line-height: var(--tw-leading, var(--text-3xl--line-height));\n  }\n  .text-4xl {\n    font-size: var(--text-4xl);\n    line-height: var(--tw-leading, var(--text-4xl--line-height));\n  }\n  .text-5xl {\n    font-size: var(--text-5xl);\n    line-height: var(--tw-leading, var(--text-5xl--line-height));\n  }\n  .text-base {\n    font-size: var(--text-base);\n    line-height: var(--tw-leading, var(--text-base--line-height));\n  }\n  .text-lg {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading, var(--text-lg--line-height));\n  }\n  .text-sm {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading, var(--text-sm--line-height));\n  }\n  .text-xl {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading, var(--text-xl--line-height));\n  }\n  .text-xs {\n    font-size: var(--text-xs);\n    line-height: var(--tw-leading, var(--text-xs--line-height));\n  }\n  .text-\\[11px\\] {\n    font-size: 11px;\n  }\n  .text-\\[14\\.5px\\] {\n    font-size: 14.5px;\n  }\n  .leading-5 {\n    --tw-leading: calc(var(--spacing) * 5);\n    line-height: calc(var(--spacing) * 5);\n  }\n  .leading-6 {\n    --tw-leading: calc(var(--spacing) * 6);\n    line-height: calc(var(--spacing) * 6);\n  }\n  .leading-relaxed {\n    --tw-leading: var(--leading-relaxed);\n    line-height: var(--leading-relaxed);\n  }\n  .leading-snug {\n    --tw-leading: var(--leading-snug);\n    line-height: var(--leading-snug);\n  }\n  .leading-tight {\n    --tw-leading: var(--leading-tight);\n    line-height: var(--leading-tight);\n  }\n  .font-bold {\n    --tw-font-weight: var(--font-weight-bold);\n    font-weight: var(--font-weight-bold);\n  }\n  .font-medium {\n    --tw-font-weight: var(--font-weight-medium);\n    font-weight: var(--font-weight-medium);\n  }\n  .font-semibold {\n    --tw-font-weight: var(--font-weight-semibold);\n    font-weight: var(--font-weight-semibold);\n  }\n  .whitespace-nowrap {\n    white-space: nowrap;\n  }\n  .whitespace-pre-wrap {\n    white-space: pre-wrap;\n  }\n  .text-\\[\\#1A1C19\\] {\n    color: #1A1C19;\n  }\n  .text-\\[\\#757575\\] {\n    color: #757575;\n  }\n  .text-amber-700 {\n    color: var(--color-amber-700);\n  }\n  .text-amber-800 {\n    color: var(--color-amber-800);\n  }\n  .text-amber-900 {\n    color: var(--color-amber-900);\n  }\n  .text-amber-950 {\n    color: var(--color-amber-950);\n  }\n  .text-black {\n    color: var(--color-black);\n  }\n  .text-blue-100 {\n    color: var(--color-blue-100);\n  }\n  .text-blue-200 {\n    color: var(--color-blue-200);\n  }\n  .text-blue-200\\/80 {\n    color: color-mix(in srgb, oklch(88.2% 0.059 254.128) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      color: color-mix(in oklab, var(--color-blue-200) 80%, transparent);\n    }\n  }\n  .text-blue-400 {\n    color: var(--color-blue-400);\n  }\n  .text-blue-500 {\n    color: var(--color-blue-500);\n  }\n  .text-blue-600 {\n    color: var(--color-blue-600);\n  }\n  .text-blue-700 {\n    color: var(--color-blue-700);\n  }\n  .text-blue-900 {\n    color: var(--color-blue-900);\n  }\n  .text-blue-900\\/70 {\n    color: color-mix(in srgb, oklch(37.9% 0.146 265.522) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      color: color-mix(in oklab, var(--color-blue-900) 70%, transparent);\n    }\n  }\n  .text-blue-950 {\n    color: var(--color-blue-950);\n  }\n  .text-emerald-200 {\n    color: var(--color-emerald-200);\n  }\n  .text-emerald-600 {\n    color: var(--color-emerald-600);\n  }\n  .text-emerald-700 {\n    color: var(--color-emerald-700);\n  }\n  .text-emerald-800 {\n    color: var(--color-emerald-800);\n  }\n  .text-emerald-900 {\n    color: var(--color-emerald-900);\n  }\n  .text-emerald-950 {\n    color: var(--color-emerald-950);\n  }\n  .text-gray-300 {\n    color: var(--color-gray-300);\n  }\n  .text-gray-400 {\n    color: var(--color-gray-400);\n  }\n  .text-gray-500 {\n    color: var(--color-gray-500);\n  }\n  .text-gray-600 {\n    color: var(--color-gray-600);\n  }\n  .text-gray-700 {\n    color: var(--color-gray-700);\n  }\n  .text-gray-800 {\n    color: var(--color-gray-800);\n  }\n  .text-gray-900 {\n    color: var(--color-gray-900);\n  }\n  .text-gray-950 {\n    color: var(--color-gray-950);\n  }\n  .text-green-300 {\n    color: var(--color-green-300);\n  }\n  .text-green-500 {\n    color: var(--color-green-500);\n  }\n  .text-green-700 {\n    color: var(--color-green-700);\n  }\n  .text-indigo-950 {\n    color: var(--color-indigo-950);\n  }\n  .text-orange-700 {\n    color: var(--color-orange-700);\n  }\n  .text-purple-100 {\n    color: var(--color-purple-100);\n  }\n  .text-purple-200 {\n    color: var(--color-purple-200);\n  }\n  .text-purple-400 {\n    color: var(--color-purple-400);\n  }\n  .text-purple-500 {\n    color: var(--color-purple-500);\n  }\n  .text-purple-600 {\n    color: var(--color-purple-600);\n  }\n  .text-purple-700 {\n    color: var(--color-purple-700);\n  }\n  .text-red-400 {\n    color: var(--color-red-400);\n  }\n  .text-red-500 {\n    color: var(--color-red-500);\n  }\n  .text-red-600 {\n    color: var(--color-red-600);\n  }\n  .text-red-700 {\n    color: var(--color-red-700);\n  }\n  .text-red-900 {\n    color: var(--color-red-900);\n  }\n  .text-stone-400 {\n    color: var(--color-stone-400);\n  }\n  .text-stone-900 {\n    color: var(--color-stone-900);\n  }\n  .text-text-muted {\n    color: var(--color-text-muted);\n  }\n  .text-text-primary {\n    color: var(--color-text-primary);\n  }\n  .text-white {\n    color: var(--color-white);\n  }\n  .text-white\\/40 {\n    color: color-mix(in srgb, #fff 40%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      color: color-mix(in oklab, var(--color-white) 40%, transparent);\n    }\n  }\n  .text-white\\/60 {\n    color: color-mix(in srgb, #fff 60%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      color: color-mix(in oklab, var(--color-white) 60%, transparent);\n    }\n  }\n  .text-white\\/80 {\n    color: color-mix(in srgb, #fff 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      color: color-mix(in oklab, var(--color-white) 80%, transparent);\n    }\n  }\n  .text-white\\/90 {\n    color: color-mix(in srgb, #fff 90%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      color: color-mix(in oklab, var(--color-white) 90%, transparent);\n    }\n  }\n  .text-yellow-700 {\n    color: var(--color-yellow-700);\n  }\n  .text-yellow-800 {\n    color: var(--color-yellow-800);\n  }\n  .text-yellow-900 {\n    color: var(--color-yellow-900);\n  }\n  .capitalize {\n    text-transform: capitalize;\n  }\n  .uppercase {\n    text-transform: uppercase;\n  }\n  .italic {\n    font-style: italic;\n  }\n  .placeholder-gray-400 {\n    &::-moz-placeholder {\n      color: var(--color-gray-400);\n    }\n    &::placeholder {\n      color: var(--color-gray-400);\n    }\n  }\n  .accent-purple-600 {\n    accent-color: var(--color-purple-600);\n  }\n  .opacity-0 {\n    opacity: 0%;\n  }\n  .opacity-25 {\n    opacity: 25%;\n  }\n  .opacity-60 {\n    opacity: 60%;\n  }\n  .opacity-75 {\n    opacity: 75%;\n  }\n  .shadow-2xl {\n    --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-\\[0_18px_45px_rgba\\(15\\,23\\,42\\,0\\.08\\)\\] {\n    --tw-shadow: 0 18px 45px var(--tw-shadow-color, rgba(15,23,42,0.08));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-\\[0_28px_80px_rgba\\(15\\,23\\,42\\,0\\.22\\)\\] {\n    --tw-shadow: 0 28px 80px var(--tw-shadow-color, rgba(15,23,42,0.22));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-inner {\n    --tw-shadow: inset 0 2px 4px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-lg {\n    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-md {\n    --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-sm {\n    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-xl {\n    --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .ring-1 {\n    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .ring-2 {\n    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .ring-4 {\n    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-blue-600\\/20 {\n    --tw-shadow-color: color-mix(in srgb, oklch(54.6% 0.245 262.881) 20%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-blue-600) 20%, transparent) var(--tw-shadow-alpha), transparent);\n    }\n  }\n  .shadow-blue-900\\/20 {\n    --tw-shadow-color: color-mix(in srgb, oklch(37.9% 0.146 265.522) 20%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-blue-900) 20%, transparent) var(--tw-shadow-alpha), transparent);\n    }\n  }\n  .shadow-emerald-500\\/20 {\n    --tw-shadow-color: color-mix(in srgb, oklch(69.6% 0.17 162.48) 20%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-emerald-500) 20%, transparent) var(--tw-shadow-alpha), transparent);\n    }\n  }\n  .shadow-purple-600\\/30 {\n    --tw-shadow-color: color-mix(in srgb, oklch(55.8% 0.288 302.321) 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-purple-600) 30%, transparent) var(--tw-shadow-alpha), transparent);\n    }\n  }\n  .ring-blue-100 {\n    --tw-ring-color: var(--color-blue-100);\n  }\n  .ring-emerald-500\\/30 {\n    --tw-ring-color: color-mix(in srgb, oklch(69.6% 0.17 162.48) 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-ring-color: color-mix(in oklab, var(--color-emerald-500) 30%, transparent);\n    }\n  }\n  .ring-gray-200 {\n    --tw-ring-color: var(--color-gray-200);\n  }\n  .outline {\n    outline-style: var(--tw-outline-style);\n    outline-width: 1px;\n  }\n  .filter {\n    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n  }\n  .backdrop-blur {\n    --tw-backdrop-blur: blur(8px);\n    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  }\n  .backdrop-blur-\\[1px\\] {\n    --tw-backdrop-blur: blur(1px);\n    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  }\n  .backdrop-blur-sm {\n    --tw-backdrop-blur: blur(var(--blur-sm));\n    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  }\n  .transition {\n    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, backdrop-filter, display, content-visibility, overlay, pointer-events;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-all {\n    transition-property: all;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-colors {\n    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-shadow {\n    transition-property: box-shadow;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-transform {\n    transition-property: transform, translate, scale, rotate;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .duration-200 {\n    --tw-duration: 200ms;\n    transition-duration: 200ms;\n  }\n  .duration-300 {\n    --tw-duration: 300ms;\n    transition-duration: 300ms;\n  }\n  .ease-out {\n    --tw-ease: var(--ease-out);\n    transition-timing-function: var(--ease-out);\n  }\n  .outline-none {\n    --tw-outline-style: none;\n    outline-style: none;\n  }\n  .group-hover\\:visible {\n    &:is(:where(.group):hover *) {\n      @media (hover: hover) {\n        visibility: visible;\n      }\n    }\n  }\n  .group-hover\\:border-blue-500 {\n    &:is(:where(.group):hover *) {\n      @media (hover: hover) {\n        border-color: var(--color-blue-500);\n      }\n    }\n  }\n  .group-hover\\:opacity-100 {\n    &:is(:where(.group):hover *) {\n      @media (hover: hover) {\n        opacity: 100%;\n      }\n    }\n  }\n  .placeholder\\:text-\\[\\#757575\\] {\n    &::-moz-placeholder {\n      color: #757575;\n    }\n    &::placeholder {\n      color: #757575;\n    }\n  }\n  .hover\\:border-blue-300 {\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-300);\n      }\n    }\n  }\n  .hover\\:border-blue-500 {\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-500);\n      }\n    }\n  }\n  .hover\\:border-gray-300 {\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-300);\n      }\n    }\n  }\n  .hover\\:border-stone-300 {\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-stone-300);\n      }\n    }\n  }\n  .hover\\:bg-blue-50 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-50);\n      }\n    }\n  }\n  .hover\\:bg-blue-50\\/40 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: color-mix(in srgb, oklch(97% 0.014 254.604) 40%, transparent);\n        @supports (color: color-mix(in lab, red, red)) {\n          background-color: color-mix(in oklab, var(--color-blue-50) 40%, transparent);\n        }\n      }\n    }\n  }\n  .hover\\:bg-blue-50\\/50 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: color-mix(in srgb, oklch(97% 0.014 254.604) 50%, transparent);\n        @supports (color: color-mix(in lab, red, red)) {\n          background-color: color-mix(in oklab, var(--color-blue-50) 50%, transparent);\n        }\n      }\n    }\n  }\n  .hover\\:bg-blue-100 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-100);\n      }\n    }\n  }\n  .hover\\:bg-blue-600 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-600);\n      }\n    }\n  }\n  .hover\\:bg-blue-700 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-700);\n      }\n    }\n  }\n  .hover\\:bg-earth-forest\\/90 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: color-mix(in srgb, #3d543f 90%, transparent);\n        @supports (color: color-mix(in lab, red, red)) {\n          background-color: color-mix(in oklab, var(--color-earth-forest) 90%, transparent);\n        }\n      }\n    }\n  }\n  .hover\\:bg-earth-sage\\/10 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: color-mix(in srgb, #8da38e 10%, transparent);\n        @supports (color: color-mix(in lab, red, red)) {\n          background-color: color-mix(in oklab, var(--color-earth-sage) 10%, transparent);\n        }\n      }\n    }\n  }\n  .hover\\:bg-emerald-700 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-700);\n      }\n    }\n  }\n  .hover\\:bg-gray-50 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-50);\n      }\n    }\n  }\n  .hover\\:bg-gray-100 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-100);\n      }\n    }\n  }\n  .hover\\:bg-gray-200 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-200);\n      }\n    }\n  }\n  .hover\\:bg-gray-300 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-300);\n      }\n    }\n  }\n  .hover\\:bg-gray-800 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-800);\n      }\n    }\n  }\n  .hover\\:bg-purple-700 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-700);\n      }\n    }\n  }\n  .hover\\:bg-red-50 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-50);\n      }\n    }\n  }\n  .hover\\:bg-red-600 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-600);\n      }\n    }\n  }\n  .hover\\:bg-stone-50 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-stone-50);\n      }\n    }\n  }\n  .hover\\:text-blue-600 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-600);\n      }\n    }\n  }\n  .hover\\:text-blue-800 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-800);\n      }\n    }\n  }\n  .hover\\:text-gray-600 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-600);\n      }\n    }\n  }\n  .hover\\:text-gray-700 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-700);\n      }\n    }\n  }\n  .hover\\:text-gray-800 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-800);\n      }\n    }\n  }\n  .hover\\:text-gray-900 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-900);\n      }\n    }\n  }\n  .hover\\:text-white {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-white);\n      }\n    }\n  }\n  .hover\\:underline {\n    &:hover {\n      @media (hover: hover) {\n        text-decoration-line: underline;\n      }\n    }\n  }\n  .hover\\:opacity-90 {\n    &:hover {\n      @media (hover: hover) {\n        opacity: 90%;\n      }\n    }\n  }\n  .hover\\:opacity-95 {\n    &:hover {\n      @media (hover: hover) {\n        opacity: 95%;\n      }\n    }\n  }\n  .hover\\:shadow-\\[0_22px_55px_rgba\\(15\\,23\\,42\\,0\\.12\\)\\] {\n    &:hover {\n      @media (hover: hover) {\n        --tw-shadow: 0 22px 55px var(--tw-shadow-color, rgba(15,23,42,0.12));\n        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n      }\n    }\n  }\n  .hover\\:shadow-lg {\n    &:hover {\n      @media (hover: hover) {\n        --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n      }\n    }\n  }\n  .hover\\:shadow-md {\n    &:hover {\n      @media (hover: hover) {\n        --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n      }\n    }\n  }\n  .hover\\:shadow-sm {\n    &:hover {\n      @media (hover: hover) {\n        --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n      }\n    }\n  }\n  .hover\\:brightness-105 {\n    &:hover {\n      @media (hover: hover) {\n        --tw-brightness: brightness(105%);\n        filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n      }\n    }\n  }\n  .focus\\:border-blue-400 {\n    &:focus {\n      border-color: var(--color-blue-400);\n    }\n  }\n  .focus\\:border-blue-500 {\n    &:focus {\n      border-color: var(--color-blue-500);\n    }\n  }\n  .focus\\:border-earth-sage {\n    &:focus {\n      border-color: var(--color-earth-sage);\n    }\n  }\n  .focus\\:ring-2 {\n    &:focus {\n      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n    }\n  }\n  .focus\\:ring-4 {\n    &:focus {\n      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n    }\n  }\n  .focus\\:ring-blue-100 {\n    &:focus {\n      --tw-ring-color: var(--color-blue-100);\n    }\n  }\n  .focus\\:ring-blue-500 {\n    &:focus {\n      --tw-ring-color: var(--color-blue-500);\n    }\n  }\n  .focus\\:ring-earth-sage {\n    &:focus {\n      --tw-ring-color: var(--color-earth-sage);\n    }\n  }\n  .focus\\:ring-purple-500 {\n    &:focus {\n      --tw-ring-color: var(--color-purple-500);\n    }\n  }\n  .focus\\:ring-offset-2 {\n    &:focus {\n      --tw-ring-offset-width: 2px;\n      --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n    }\n  }\n  .focus\\:outline-none {\n    &:focus {\n      --tw-outline-style: none;\n      outline-style: none;\n    }\n  }\n  .disabled\\:cursor-not-allowed {\n    &:disabled {\n      cursor: not-allowed;\n    }\n  }\n  .disabled\\:opacity-50 {\n    &:disabled {\n      opacity: 50%;\n    }\n  }\n  .disabled\\:opacity-60 {\n    &:disabled {\n      opacity: 60%;\n    }\n  }\n  .sm\\:col-span-2 {\n    @media (width >= 40rem) {\n      grid-column: span 2 / span 2;\n    }\n  }\n  .sm\\:grid-cols-2 {\n    @media (width >= 40rem) {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n  .sm\\:flex-row {\n    @media (width >= 40rem) {\n      flex-direction: row;\n    }\n  }\n  .sm\\:items-end {\n    @media (width >= 40rem) {\n      align-items: flex-end;\n    }\n  }\n  .sm\\:justify-between {\n    @media (width >= 40rem) {\n      justify-content: space-between;\n    }\n  }\n  .sm\\:justify-end {\n    @media (width >= 40rem) {\n      justify-content: flex-end;\n    }\n  }\n  .md\\:col-span-2 {\n    @media (width >= 48rem) {\n      grid-column: span 2 / span 2;\n    }\n  }\n  .md\\:h-24 {\n    @media (width >= 48rem) {\n      height: calc(var(--spacing) * 24);\n    }\n  }\n  .md\\:w-24 {\n    @media (width >= 48rem) {\n      width: calc(var(--spacing) * 24);\n    }\n  }\n  .md\\:grid-cols-2 {\n    @media (width >= 48rem) {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n  .md\\:grid-cols-4 {\n    @media (width >= 48rem) {\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n    }\n  }\n  .md\\:p-6 {\n    @media (width >= 48rem) {\n      padding: calc(var(--spacing) * 6);\n    }\n  }\n  .md\\:p-8 {\n    @media (width >= 48rem) {\n      padding: calc(var(--spacing) * 8);\n    }\n  }\n  .md\\:text-5xl {\n    @media (width >= 48rem) {\n      font-size: var(--text-5xl);\n      line-height: var(--tw-leading, var(--text-5xl--line-height));\n    }\n  }\n  .md\\:text-xl {\n    @media (width >= 48rem) {\n      font-size: var(--text-xl);\n      line-height: var(--tw-leading, var(--text-xl--line-height));\n    }\n  }\n  .lg\\:col-span-1 {\n    @media (width >= 64rem) {\n      grid-column: span 1 / span 1;\n    }\n  }\n  .lg\\:col-span-3 {\n    @media (width >= 64rem) {\n      grid-column: span 3 / span 3;\n    }\n  }\n  .lg\\:col-span-4 {\n    @media (width >= 64rem) {\n      grid-column: span 4 / span 4;\n    }\n  }\n  .lg\\:col-span-5 {\n    @media (width >= 64rem) {\n      grid-column: span 5 / span 5;\n    }\n  }\n  .lg\\:grid-cols-2 {\n    @media (width >= 64rem) {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n  .lg\\:grid-cols-3 {\n    @media (width >= 64rem) {\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n    }\n  }\n  .lg\\:grid-cols-5 {\n    @media (width >= 64rem) {\n      grid-template-columns: repeat(5, minmax(0, 1fr));\n    }\n  }\n  .lg\\:grid-cols-12 {\n    @media (width >= 64rem) {\n      grid-template-columns: repeat(12, minmax(0, 1fr));\n    }\n  }\n  .xl\\:grid-cols-3 {\n    @media (width >= 80rem) {\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n    }\n  }\n}\n:host {\n  all: initial;\n  position: fixed !important;\n  inset: 0 !important;\n  z-index: 2147483000 !important;\n  width: auto !important;\n  height: auto !important;\n  pointer-events: none !important;\n  color-scheme: light;\n}\n.modly-widget-root,\n.modly-widget-root *,\n.modly-widget-root *::before,\n.modly-widget-root *::after {\n  box-sizing: border-box;\n}\n.modly-widget-root {\n  --modly-color-text: #111827;\n  --modly-color-heading: #030712;\n  --modly-color-muted: #4b5563;\n  --modly-color-subtle: #6b7280;\n  --modly-color-surface: #ffffff;\n  --modly-color-soft: #f8fafc;\n  --modly-color-border: #d1d5db;\n  --modly-color-primary: #2563eb;\n  --modly-shadow-card: 0 14px 34px rgba(15, 23, 42, 0.10);\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n  pointer-events: none;\n  color: #111827;\n  font-family: Inter,\n    ui-sans-serif,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    \"Segoe UI\",\n    sans-serif;\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n}\n.modly-widget-root :where(.modly-widget-button, .modly-widget-modal-backdrop, .fixed) {\n  pointer-events: auto;\n}\n.modly-widget-root button,\n.modly-widget-root input,\n.modly-widget-root textarea,\n.modly-widget-root select {\n  font: inherit;\n}\n.modly-widget-root input:not([type=\"range\"]):not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"file\"]),\n.modly-widget-root textarea,\n.modly-widget-root select {\n  background-color: #ffffff !important;\n  border: 1px solid var(--modly-color-border) !important;\n  color: var(--modly-color-text) !important;\n  box-shadow: none;\n}\n.modly-widget-root input::-moz-placeholder, .modly-widget-root textarea::-moz-placeholder {\n  color: #6b7280 !important;\n  opacity: 1 !important;\n}\n.modly-widget-root input::placeholder,\n.modly-widget-root textarea::placeholder {\n  color: #6b7280 !important;\n  opacity: 1 !important;\n}\n.modly-widget-root textarea {\n  resize: vertical;\n}\n.modly-widget-root img,\n.modly-widget-root svg {\n  display: block;\n}\n.modly-widget-root .modly-widget-button {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  isolation: isolate;\n  z-index: 2147483001 !important;\n  border-radius: 9999px !important;\n  color: inherit;\n  text-decoration: none;\n}\n.modly-widget-root .modly-widget-button svg,\n.modly-widget-root .modly-widget-button span {\n  color: inherit;\n}\n.modly-widget-root .modly-widget-modal-backdrop {\n  position: fixed !important;\n  inset: 0 !important;\n  z-index: 2147483002 !important;\n  background: rgba(15, 23, 42, 0.64) !important;\n}\n.modly-widget-root .modly-widget-modal-panel {\n  background: var(--modly-color-surface) !important;\n  color: var(--modly-color-text) !important;\n  border: 1px solid rgba(15, 23, 42, 0.12);\n  border-radius: 16px !important;\n  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.34) !important;\n}\n.modly-widget-root .modly-widget-modal-close {\n  background: #f3f4f6 !important;\n  border: 1px solid #d1d5db !important;\n  color: #374151 !important;\n}\n.modly-widget-root .modly-widget-modal-close:hover {\n  background: #e5e7eb !important;\n  color: #111827 !important;\n}\n.modly-widget-root .furniture-widget-ai,\n.modly-widget-root .furniture-widget-room-planner,\n.modly-widget-root .furniture-widget-customizer {\n  background: #ffffff !important;\n  color: var(--modly-color-text) !important;\n}\n.modly-widget-root .furniture-widget-ai > .bg-gray-50 {\n  background: #f8fafc !important;\n  color: var(--modly-color-text) !important;\n}\n.modly-widget-root :where(.furniture-widget-ai, .furniture-widget-room-planner, .furniture-widget-customizer) :where(h1, h2, h3, h4, h5, h6) {\n  color: var(--modly-color-heading);\n}\n.modly-widget-root :where(.furniture-widget-ai, .furniture-widget-room-planner, .furniture-widget-customizer) :where(p, label, span, li, div) {\n  text-shadow: none;\n}\n.modly-widget-root .furniture-widget-room-planner > section:first-of-type,\n.modly-widget-root .furniture-widget-customizer > section:first-of-type {\n  color: #ffffff !important;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.14);\n}\n.modly-widget-root .furniture-widget-room-planner > section:first-of-type {\n  background: linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%) !important;\n}\n.modly-widget-root .furniture-widget-customizer > section:first-of-type {\n  background: linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%) !important;\n}\n.modly-widget-root .furniture-widget-room-planner > section:first-of-type :where(h1, h2, h3, p, span, div),\n.modly-widget-root .furniture-widget-customizer > section:first-of-type :where(h1, h2, h3, p, span, div) {\n  color: #ffffff !important;\n}\n.modly-widget-root .furniture-widget-room-planner > section:first-of-type [class~=\"text-blue-100\"],\n.modly-widget-root .furniture-widget-customizer > section:first-of-type [class~=\"text-purple-100\"],\n.modly-widget-root [class~=\"text-white/80\"],\n.modly-widget-root [class~=\"text-white/70\"] {\n  color: rgba(255, 255, 255, 0.92) !important;\n}\n.modly-widget-root [class~=\"text-white/60\"] {\n  color: rgba(255, 255, 255, 0.84) !important;\n}\n.modly-widget-root [class~=\"bg-white/20\"] {\n  background-color: rgba(255, 255, 255, 0.18) !important;\n  border: 1px solid rgba(255, 255, 255, 0.28);\n}\n.modly-widget-root .furniture-widget-room-planner > section:not(:first-of-type),\n.modly-widget-root .furniture-widget-customizer section:not(:first-of-type) {\n  background: #f8fafc !important;\n  color: var(--modly-color-text) !important;\n}\n.modly-widget-root :where([class~=\"bg-white\"], [class*=\"bg-[#fff\"], [class~=\"bg-stone-50\"], [class~=\"bg-gray-50\"]) {\n  color: var(--modly-color-text);\n}\n.modly-widget-root :where([class~=\"text-gray-500\"], [class~=\"text-gray-600\"], [class~=\"text-stone-400\"], [class~=\"text-stone-500\"]) {\n  color: var(--modly-color-muted) !important;\n}\n.modly-widget-root :where([class~=\"text-gray-700\"], [class~=\"text-gray-800\"], [class~=\"text-stone-700\"], [class~=\"text-stone-800\"]) {\n  color: #374151 !important;\n}\n.modly-widget-root :where([class~=\"text-gray-900\"], [class~=\"text-gray-950\"], [class~=\"text-stone-900\"], [class~=\"text-blue-950\"]) {\n  color: var(--modly-color-heading) !important;\n}\n.modly-widget-root :where([class~=\"border-gray-200\"], [class~=\"border-stone-200\"]) {\n  border-color: #d8dee8 !important;\n}\n.modly-widget-root :where([class~=\"bg-blue-50/70\"], [class~=\"bg-blue-50/80\"], [class~=\"bg-blue-50\"]) {\n  background-color: #eff6ff !important;\n  color: #172554 !important;\n}\n.modly-widget-root :where([class~=\"bg-amber-50\"], [class~=\"bg-emerald-50\"], [class~=\"bg-green-100\"], [class~=\"bg-purple-50\"], [class~=\"bg-stone-50\"], [class~=\"bg-gray-50\"]) {\n  filter: saturate(1.08);\n}\n.modly-widget-root :where([class~=\"bg-white\"][class*=\"rounded\"], [class*=\"bg-[#fff\"][class*=\"rounded\"]) {\n  background: #ffffff !important;\n  border-color: #d8dee8;\n}\n.modly-widget-root :where([class~=\"shadow-sm\"], [class~=\"shadow-lg\"], [class~=\"shadow-xl\"]) {\n  box-shadow: var(--modly-shadow-card) !important;\n}\n@media (max-width: 640px) {\n  .modly-widget-root .modly-widget-button {\n    bottom: 16px !important;\n    left: 16px !important;\n    right: 16px !important;\n    width: calc(100vw - 32px);\n  }\n  .modly-widget-root .modly-widget-button.top-6 {\n    top: 16px !important;\n    bottom: auto !important;\n  }\n}\n@property --tw-translate-x {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-translate-y {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-translate-z {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-rotate-x {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-rotate-y {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-rotate-z {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-skew-x {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-skew-y {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-space-y-reverse {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-border-style {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: solid;\n}\n@property --tw-gradient-position {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-from {\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-via {\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-to {\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-stops {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-via-stops {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-from-position {\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 0%;\n}\n@property --tw-gradient-via-position {\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 50%;\n}\n@property --tw-gradient-to-position {\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-leading {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-font-weight {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-inset-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-inset-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-inset-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-ring-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ring-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-inset-ring-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-inset-ring-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-ring-inset {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ring-offset-width {\n  syntax: \"<length>\";\n  inherits: false;\n  initial-value: 0px;\n}\n@property --tw-ring-offset-color {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: #fff;\n}\n@property --tw-ring-offset-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-outline-style {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: solid;\n}\n@property --tw-blur {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-brightness {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-contrast {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-grayscale {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-hue-rotate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-invert {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-opacity {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-saturate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-sepia {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-drop-shadow-size {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-blur {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-brightness {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-contrast {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-grayscale {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-hue-rotate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-invert {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-opacity {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-saturate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-sepia {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-duration {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ease {\n  syntax: \"*\";\n  inherits: false;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes pulse {\n  50% {\n    opacity: 0.5;\n  }\n}\n@keyframes bounce {\n  0%, 100% {\n    transform: translateY(-25%);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  50% {\n    transform: none;\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n}\n@layer properties {\n  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {\n    *, ::before, ::after, ::backdrop {\n      --tw-translate-x: 0;\n      --tw-translate-y: 0;\n      --tw-translate-z: 0;\n      --tw-rotate-x: initial;\n      --tw-rotate-y: initial;\n      --tw-rotate-z: initial;\n      --tw-skew-x: initial;\n      --tw-skew-y: initial;\n      --tw-space-y-reverse: 0;\n      --tw-border-style: solid;\n      --tw-gradient-position: initial;\n      --tw-gradient-from: #0000;\n      --tw-gradient-via: #0000;\n      --tw-gradient-to: #0000;\n      --tw-gradient-stops: initial;\n      --tw-gradient-via-stops: initial;\n      --tw-gradient-from-position: 0%;\n      --tw-gradient-via-position: 50%;\n      --tw-gradient-to-position: 100%;\n      --tw-leading: initial;\n      --tw-font-weight: initial;\n      --tw-shadow: 0 0 #0000;\n      --tw-shadow-color: initial;\n      --tw-shadow-alpha: 100%;\n      --tw-inset-shadow: 0 0 #0000;\n      --tw-inset-shadow-color: initial;\n      --tw-inset-shadow-alpha: 100%;\n      --tw-ring-color: initial;\n      --tw-ring-shadow: 0 0 #0000;\n      --tw-inset-ring-color: initial;\n      --tw-inset-ring-shadow: 0 0 #0000;\n      --tw-ring-inset: initial;\n      --tw-ring-offset-width: 0px;\n      --tw-ring-offset-color: #fff;\n      --tw-ring-offset-shadow: 0 0 #0000;\n      --tw-outline-style: solid;\n      --tw-blur: initial;\n      --tw-brightness: initial;\n      --tw-contrast: initial;\n      --tw-grayscale: initial;\n      --tw-hue-rotate: initial;\n      --tw-invert: initial;\n      --tw-opacity: initial;\n      --tw-saturate: initial;\n      --tw-sepia: initial;\n      --tw-drop-shadow: initial;\n      --tw-drop-shadow-color: initial;\n      --tw-drop-shadow-alpha: 100%;\n      --tw-drop-shadow-size: initial;\n      --tw-backdrop-blur: initial;\n      --tw-backdrop-brightness: initial;\n      --tw-backdrop-contrast: initial;\n      --tw-backdrop-grayscale: initial;\n      --tw-backdrop-hue-rotate: initial;\n      --tw-backdrop-invert: initial;\n      --tw-backdrop-opacity: initial;\n      --tw-backdrop-saturate: initial;\n      --tw-backdrop-sepia: initial;\n      --tw-duration: initial;\n      --tw-ease: initial;\n    }\n  }\n}\n";

	let widgetRoot = null;
	let container = null;
	let mountNode = null;
	function injectWidgetStyles(root) {
	    const styleElement = document.createElement('style');
	    styleElement.setAttribute('data-modly-widget-styles', '');
	    styleElement.textContent = css_248z;
	    root.appendChild(styleElement);
	}
	async function initWidget(userConfig) {
	    // Destroy existing widget if any
	    if (widgetRoot) {
	        widgetRoot.unmount();
	        widgetRoot = null;
	    }
	    if (container) {
	        container.remove();
	        container = null;
	    }
	    mountNode = null;
	    // Create container
	    container = document.createElement('div');
	    container.id = 'modly-widget-container';
	    document.body.appendChild(container);
	    const shadowRoot = container.attachShadow({ mode: 'open' });
	    injectWidgetStyles(shadowRoot);
	    mountNode = document.createElement('div');
	    mountNode.className = 'modly-widget-root';
	    shadowRoot.appendChild(mountNode);
	    // Fetch remote config if configUrl is provided
	    let remoteConfig = {};
	    const configUrl = userConfig?.configUrl || ((userConfig?.widgetId || userConfig?.storeId) ? '/api/widget/config' : undefined);
	    const apiBaseUrl = userConfig?.apiBaseUrl || getApiBaseUrlFromConfigUrl(configUrl);
	    if (configUrl) {
	        remoteConfig = await fetchRemoteConfig(configUrl, userConfig?.widgetId, userConfig?.storeId);
	    }
	    // Merge configs (remote > user > defaults)
	    const finalConfig = mergeConfig({
	        ...userConfig,
	        ...(apiBaseUrl ? { apiBaseUrl } : {}),
	        ...remoteConfig,
	    });
	    // Render widget
	    widgetRoot = client.createRoot(mountNode);
	    widgetRoot.render(React.createElement(FurnitureAIWidgetButton, {
	        config: finalConfig,
	        buttonText: getWidgetTitle(finalConfig),
	        buttonPosition: finalConfig.theme?.buttonPosition || 'bottom-right',
	    }));
	}
	function destroyWidget() {
	    if (widgetRoot) {
	        widgetRoot.unmount();
	        widgetRoot = null;
	    }
	    if (container) {
	        container.remove();
	        container = null;
	    }
	    mountNode = null;
	}
	// Expose global API
	window.ModlyWidget = {
	    init: initWidget,
	    destroy: destroyWidget,
	};
	// Auto-initialize if script has data attributes
	if (document.readyState === 'loading') {
	    document.addEventListener('DOMContentLoaded', autoInit);
	}
	else {
	    autoInit();
	}
	function autoInit() {
	    const script = document.querySelector('[data-modly-widget]');
	    if (script) {
	        const storeId = script.dataset.storeId;
	        const widgetId = script.dataset.widgetId;
	        const configUrl = script.dataset.configUrl;
	        if (configUrl || storeId || widgetId) {
	            initWidget({
	                configUrl: configUrl || undefined,
	                storeId: storeId || undefined,
	                widgetId: widgetId || undefined,
	            });
	        }
	    }
	}

}));
//# sourceMappingURL=widget.umd.js.map
