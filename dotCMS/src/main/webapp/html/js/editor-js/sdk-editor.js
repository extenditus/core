function i(t){window.parent.postMessage(t,"*")}function p(t){return t.map(n=>{let e=n.getBoundingClientRect(),o=Array.from(n.querySelectorAll('[data-dot-object="contentlet"]'));return{x:e.x,y:e.y,width:e.width,height:e.height,payload:JSON.stringify({container:u(n)}),contentlets:v(e,o)}})}function v(t,n){return n.map(e=>{let o=e.getBoundingClientRect();return{x:0,y:o.y-t.y,width:o.width,height:o.height,payload:JSON.stringify({container:e.dataset?.dotContainer?JSON.parse(e.dataset?.dotContainer):a(e),contentlet:{identifier:e.dataset?.dotIdentifier,title:e.dataset?.dotTitle,inode:e.dataset?.dotInode,contentType:e.dataset?.dotType}})}})}function u(t){return{acceptTypes:t.dataset?.dotAcceptTypes||"",identifier:t.dataset?.dotIdentifier||"",maxContentlets:t.dataset?.maxContentlets||"",uuid:t.dataset?.dotUuid||""}}function a(t){let n=t.closest('[data-dot-object="container"]');return n?u(n):(console.warn("No container found for the contentlet"),null)}function s(t){return t?t?.dataset?.dotObject==="contentlet"||t?.dataset?.dotObject==="container"&&t.children.length===0?t:s(t?.parentElement):null}function f(t){let n=t.querySelectorAll('[data-dot-object="vtl-file"]');return n.length?Array.from(n).map(e=>({inode:e.dataset?.dotInode,name:e.dataset?.dotUrl})):null}var _=()=>window.location.reload(),h={onReload:_};var r=[];function I(){let t=Array.from(document.querySelectorAll('[data-dot-object="container"]')),n=p(t);i({action:"set-bounds",payload:n})}function x(){h?.onReload()}function l(){let t=n=>{switch(n.data){case"ema-request-bounds":{I();break}case"ema-reload-page":{x();break}}if(n.data.name==="scroll-inside-iframe"){let e=n.data.direction==="up"?-120:120;window.scrollBy({left:0,top:e,behavior:"smooth"})}};window.addEventListener("message",t),r.push({type:"listener",event:"message",callback:t})}function d(){let t=n=>{let e=s(n.target);if(!e)return;let{x:o,y,width:L,height:C}=e.getBoundingClientRect(),M=e.dataset?.dotObject==="container",P={identifier:"TEMP_EMPTY_CONTENTLET",title:"TEMP_EMPTY_CONTENTLET",contentType:"TEMP_EMPTY_CONTENTLET_TYPE",inode:"TEMPY_EMPTY_CONTENTLET_INODE",widgetTitle:"TEMP_EMPTY_CONTENTLET",baseType:"TEMP_EMPTY_CONTENTLET",onNumberOfPages:1},b={identifier:e.dataset?.dotIdentifier,title:e.dataset?.dotTitle,inode:e.dataset?.dotInode,contentType:e.dataset?.dotType,baseType:e.dataset?.dotBasetype,widgetTitle:e.dataset?.dotWidgetTitle,onNumberOfPages:e.dataset?.dotOnNumberOfPages},D=f(e),N={container:e.dataset?.dotContainer?JSON.parse(e.dataset?.dotContainer):a(e),contentlet:M?P:b,vtlFiles:D};i({action:"set-contentlet",payload:{x:o,y,width:L,height:C,payload:N}})};document.addEventListener("pointermove",t),r.push({type:"listener",event:"pointermove",callback:t})}function c(){let t=()=>{i({action:"scroll"}),window.lastScrollYPosition=window.scrollY},n=()=>{i({action:"scroll-end"})};window.addEventListener("scroll",t),window.addEventListener("scrollend",n),r.push({type:"listener",event:"scroll",callback:n}),r.push({type:"listener",event:"scroll",callback:t})}function g(){let t=()=>{window.scrollTo(0,window.lastScrollYPosition)};window.addEventListener("load",t),r.push({type:"listener",event:"scroll",callback:t})}function E(){i({action:"ping-editor"})}function T(){return typeof window>"u"?!1:window.parent!==window}function m(){document.querySelectorAll('[data-dot-object="contentlet"]').forEach(n=>{n.clientHeight||n.classList.add("empty-contentlet")})}T()&&(E(),l(),c(),g(),d(),m());
