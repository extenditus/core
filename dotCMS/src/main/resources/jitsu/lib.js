!function(){"use strict";var e=function(){return(e=Object.assign||function(e){for(var t,i=1,n=arguments.length;i<n;i++)for(var o in t=arguments[i])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function t(e,t){for(var i=0,n=t.length,o=e.length;i<n;i++,o++)e[o]=t[i];return e}var i={DEBUG:{name:"DEBUG",severity:10},INFO:{name:"INFO",severity:100},WARN:{name:"WARN",severity:1e3},ERROR:{name:"ERROR",severity:1e4},NONE:{name:"NONE",severity:1e4}},n=null;function o(){return n||(n=r())}function r(e){var n=window.__eventNLogLevel,o=i.WARN;if(n){var r=i[n.toUpperCase()];r&&r>0&&(o=r)}else e&&(o=e);var s,a,u,c={minLogLevel:o};return Object.values(i).forEach((function(e){var i=e.name,n=e.severity;c[i.toLowerCase()]=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];if(n>=o.severity&&e.length>0){var s=e[0],a=e.splice(1),u="[J-"+i+"] "+s;"DEBUG"===i||"INFO"===i?console.log.apply(console,t([u],a)):"WARN"===i?console.warn.apply(console,t([u],a)):console.error.apply(console,t([u],a))}}})),s="logger",a=c,(u=window).__jitsuDebug||(u.__jitsuDebug={}),u.__jitsuDebug[s]=a,c}var s,a=function(e){return e&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null},u=function(e,t,i,n,o){var r=i===1/0?" expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+i;document.cookie=encodeURIComponent(e)+"="+t+"; path=/;"+r+(n?"; domain="+n:"")+(o?"; secure":"")},c=function(){return Math.random().toString(36).substring(2,7)},p={utm_source:"source",utm_medium:"medium",utm_campaign:"campaign",utm_term:"term",utm_content:"content"},d={gclid:!0,fbclid:!0,dclid:!0},l="__buildVersion__"+"/"+"__buildEnv__"+"@"+"__buildDate__",h=function(){function e(e,t){this.cookieDomain=e,this.cookieName=t}return e.prototype.save=function(e){u(this.cookieName,encodeURIComponent(JSON.stringify(e)),1/0,this.cookieDomain,"http:"!==document.location.protocol)},e.prototype.restore=function(){var e=a(this.cookieName);if(e)try{var t=JSON.parse(decodeURIComponent(e));return"object"!=typeof t?void o().warn("Can't restore value of "+this.cookieName+"@"+this.cookieDomain+", expected to be object, but found "+("object"!=typeof t)+": "+t+". Ignoring"):t}catch(t){return void o().error("Failed to decode JSON from "+e,t)}},e}();var m=function(){function t(){this.anonymousId="",this.userProperties={},this.permanentProperties={globalProps:{},propsPerEvent:{}},this.cookieDomain="",this.trackingHost="",this.idCookieName="",this.randomizeUrl=!1,this.apiKey="",this.initialized=!1,this._3pCookies={}}return t.prototype.id=function(t,i){return this.userProperties=e(e({},this.userProperties),t),o().debug("Jitsu user identified",t),this.userIdPersistence?this.userIdPersistence.save(t):o().warn("Id() is called before initialization"),i?Promise.resolve():this.track("user_identify",{})},t.prototype.rawTrack=function(e){this.sendJson(e)},t.prototype.getAnonymousId=function(){var e=a(this.idCookieName);if(e)return o().debug("Existing user id",e),e;var t=Math.random().toString(36).substring(2,12);return o().debug("New user id",t),u(this.idCookieName,t,1/0,this.cookieDomain,"http:"!==document.location.protocol),t},t.prototype.makeEvent=function(t,i,n){var o;this.restoreId();var r=this.getCtx(),s=e(e({},this.permanentProperties.globalProps),null!==(o=this.permanentProperties.propsPerEvent[t])&&void 0!==o?o:{}),a=e({api_key:this.apiKey,src:i,event_type:t},n);return this.compatMode?e(e(e({},s),{eventn_ctx:r}),a):e(e(e({},s),r),a)},t.prototype._send3p=function(e,t,i){var n="3rdparty";i&&""!==i&&(n=i);var o=this.makeEvent(n,e,{src_payload:t});return this.sendJson(o)},t.prototype.sendJson=function(e){var t,i=this.trackingHost+"/api/v1/event?token="+this.apiKey;this.randomizeUrl&&(i=this.trackingHost+"/api."+c()+"?p_"+c()+"="+this.apiKey);var n=JSON.stringify(e);return(null===(t=this.initialOptions)||void 0===t?void 0:t.use_beacon_api)&&navigator.sendBeacon?function(e,t){o().debug("Sending beacon",t);var i=new Blob([t],{type:"text/plain"});return navigator.sendBeacon(e,i),Promise.resolve()}(i,n):function(e,t){var i=new XMLHttpRequest;return new Promise((function(n,r){i.onerror=function(e){o().error("Failed to send",t,e),r(new Error("Failed to send JSON. See console logs"))},i.onload=function(){200!==i.status&&(o().warn("Failed to send data to "+e+" (#"+i.status+" - "+i.statusText+")",t),r(new Error("Failed to send JSON. Error code: "+i.status+". See logs for details"))),n()},i.open("POST",e),i.setRequestHeader("Content-Type","application/json"),i.send(t),o().debug("sending json",t)}))}(i,n)},t.prototype.getCtx=function(){var t,i,n=new Date;return e({event_id:"",user:e({anonymous_id:this.anonymousId},this.userProperties),ids:this._getIds(),user_agent:navigator.userAgent,utc_time:(t=n.toISOString(),i=t.split(".")[1],i?i.length>=7?t:t.slice(0,-1)+"0".repeat(7-i.length)+"Z":t),local_tz_offset:n.getTimezoneOffset(),referer:document.referrer,url:window.location.href,page_title:document.title,doc_path:document.location.pathname,doc_host:document.location.hostname,doc_search:window.location.search,screen_resolution:screen.width+"x"+screen.height,vp_size:Math.max(document.documentElement.clientWidth||0,window.innerWidth||0)+"x"+Math.max(document.documentElement.clientHeight||0,window.innerHeight||0),user_language:navigator.language,doc_encoding:document.characterSet},function(e){var t={utm:{},click_id:{}};for(var i in e)if(e.hasOwnProperty(i)){var n=e[i],o=p[i];o?t.utm[o]=n:d[i]&&(t.click_id[i]=n)}return t}(function(e){for(var t=e||window.location.search.substring(1),i={},n=("?"===t[0]?t.substr(1):t).split("&"),o=0;o<n.length;o++){var r=n[o].split("=");i[decodeURIComponent(r[0])]=decodeURIComponent(r[1]||"")}return i}()))},t.prototype._getIds=function(){for(var e=function(e){if(void 0===e&&(e=!1),e&&s)return s;for(var t={},i=document.cookie.split(";"),n=0;n<i.length;n++){var o=i[n],r=o.indexOf("=");r>0&&(t[o.substr(n>0?1:0,n>0?r-1:r)]=o.substr(r+1))}return s=t,t}(!1),t={},i=0,n=Object.entries(e);i<n.length;i++){var o=n[i],r=o[0],a=o[1];this._3pCookies[r]&&(t["_"==r.charAt(0)?r.substr(1):r]=a)}return t},t.prototype.track=function(e,t){var i=t||{};o().debug("track event of type",e,i);var n=this.makeEvent(e,this.compatMode?"eventn":"jitsu",t||{});return this.sendJson(n)},t.prototype.init=function(e){var t,s,a,u,c=this;if(e.log_level&&(a=e.log_level,(u=i[a.toLocaleUpperCase()])||(console.warn("Can't find log level with name "+a.toLocaleUpperCase()+", defaulting to INFO"),u=i.INFO),n=r(u)),this.initialOptions=e,o().debug("Initializing Jitsu Tracker tracker",e,l),e.key){if(this.compatMode=void 0!==e.compat_mode&&!!e.compat_mode,this.cookieDomain=e.cookie_domain||location.hostname.replace("www.",""),this.trackingHost=e.tracking_host||"",this.randomizeUrl=e.randomize_url||!1,this.idCookieName=e.cookie_name||"__eventn_id",this.apiKey=e.key,this.userIdPersistence=new h(this.cookieDomain,this.idCookieName+"_usr"),this.propsPersistance=new h(this.cookieDomain,this.idCookieName+"_props"),this.propsPersistance){var p=this.propsPersistance.restore();p&&(this.permanentProperties=p,this.permanentProperties.globalProps=null!==(t=p.globalProps)&&void 0!==t?t:{},this.permanentProperties.propsPerEvent=null!==(s=p.propsPerEvent)&&void 0!==s?s:{}),o().debug("Restored persistent properties",this.permanentProperties)}!1===e.capture_3rd_party_cookies?this._3pCookies={}:(e.capture_3rd_party_cookies||["_ga","_fbp","_ym_uid","ajs_user_id","ajs_anonymous_id"]).forEach((function(e){return c._3pCookies[e]=!0})),e.ga_hook&&o().warn("GA event interceptor isn't supported anymore"),e.segment_hook&&function(e){var t=window;t.analytics||(t.analytics=[]);e.interceptAnalytics(t.analytics)}(this),this.anonymousId=this.getAnonymousId(),this.initialized=!0}else o().error("Can't initialize Jitsu, key property is not set")},t.prototype.interceptAnalytics=function(t){var i=this,n=function(t){var n;try{var r=e({},t.payload);o().debug("Intercepted segment payload",r.obj);var s=t.integrations["Segment.io"];if(s&&s.analytics){var a=s.analytics;"function"==typeof a.user&&a.user()&&"function"==typeof a.user().id&&(r.obj.userId=a.user().id())}(null===(n=null==r?void 0:r.obj)||void 0===n?void 0:n.timestamp)&&(r.obj.sentAt=r.obj.timestamp);var u=t.payload.type();"track"===u&&(u=t.payload.event()),i._send3p("ajs",r,u)}catch(e){o().warn("Failed to send an event",e)}t.next(t.payload)};"function"==typeof t.addSourceMiddleware?(o().debug("Analytics.js is initialized, calling addSourceMiddleware"),t.addSourceMiddleware(n)):(o().debug("Analytics.js is not initialized, pushing addSourceMiddleware to callstack"),t.push(["addSourceMiddleware",n])),t.__en_intercepted=!0},t.prototype.restoreId=function(){if(this.userIdPersistence){var t=this.userIdPersistence.restore();t&&(this.userProperties=e(e({},t),this.userProperties))}},t.prototype.set=function(t,i){var n,o=null==i?void 0:i.eventType,r=void 0===(null==i?void 0:i.persist)||(null==i?void 0:i.persist);if(void 0!==o){var s=null!==(n=this.permanentProperties.propsPerEvent[o])&&void 0!==n?n:{};this.permanentProperties.propsPerEvent[o]=e(e({},s),t)}else this.permanentProperties.globalProps=e(e({},this.permanentProperties.globalProps),t);this.propsPersistance&&r&&this.propsPersistance.save(this.permanentProperties)},t.prototype.unset=function(e,t){var i=null==t?void 0:t.eventType,n=void 0===(null==t?void 0:t.persist)||(null==t?void 0:t.persist);i?this.permanentProperties.propsPerEvent[i]&&delete this.permanentProperties.propsPerEvent[i][e]:delete this.permanentProperties.globalProps[e],this.propsPersistance&&n&&this.propsPersistance.save(this.permanentProperties)},t}();var v=["use_beacon_api","cookie_domain","tracking_host","cookie_name","key","ga_hook","segment_hook","randomize_url","capture_3rd_party_cookies","id_method","log_level","compat_mode"];var g="data-suppress-interception-warning";function f(e){return"\n      ATTENTION! "+e+"-hook set to true along with defer/async attribute! If "+e+" code is inserted right after Jitsu tag,\n      first tracking call might not be intercepted! Consider one of the following:\n       - Inject jitsu tracking code without defer/async attribute\n       - If you're sure that events won't be sent to "+e+" before Jitsu is fully initialized, set "+g+'="true"\n       script attribute\n    '}function _(e,i){o().debug("Processing queue",e);for(var n=0;n<e.length;n+=1){var r=t([],e[n])||[],s=r[0],a=r.slice(1),u=i[s];"function"==typeof u&&u.apply(i,a)}e.length=0}if(window){var y=window,b=function(e){var t=document.currentScript||document.querySelector("script[src*=jsFileName][data-jitsu-api-key]");if(t){var i,n={tracking_host:(i=t.getAttribute("src"),i.replace("/s/lib.js","").replace("/lib.js","")),key:null};v.forEach((function(e){var i="data-"+e.replace("_","-");if(void 0!==t.getAttribute(i)&&null!==t.getAttribute(i)){var o=t.getAttribute(i);"true"===o?o=!0:"false"===o&&(o=!1),n[e]=o}})),e.jitsuClient=function(e){var t=new m;return t.init(e),t}(n),!n.segment_hook||null===t.getAttribute("defer")&&null===t.getAttribute("async")||null!==t.getAttribute(g)||o().warn(f("segment")),!n.ga_hook||null===t.getAttribute("defer")&&null===t.getAttribute("async")||null!==t.getAttribute(g)||o().warn(f("ga"));var r=function(){var t=e.jitsuQ=e.jitsuQ||[];t.push(arguments),_(t,e.jitsuClient)};return e.jitsu=r,"true"!==t.getAttribute("data-init-only")&&"yes"!==t.getAttribute("data-init-only")&&r("track","pageview"),e.jitsuClient}o().warn("Jitsu script is not properly initialized. The definition must contain data-jitsu-api-key as a parameter")}(y);b?(o().debug("Jitsu in-browser tracker has been initialized"),y.jitsu=function(){var e=y.jitsuQ=y.jitsuQ||[];e.push(arguments),_(e,b)},y.jitsuQ&&(o().debug("Initial queue size of "+y.jitsuQ.length+" will be processed"),_(y.jitsuQ,b))):o().error("Jitsu tracker has not been initialized (reason unknown)")}else o().warn("Jitsu tracker called outside browser context. It will be ignored")}();
