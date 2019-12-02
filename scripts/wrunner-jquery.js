!function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=22)}({0:function(e,t,i){"use strict";function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.limits={minLimit:0,maxLimit:100,valuesCount:100},this.values={singleValue:50,rangeValueMin:20,rangeValueMax:80},this.type={value:"single",constants:{singleValue:"single",rangeValue:"range"}},this.valueNotesMode={value:"separate",constants:{separateValue:"separate",commonValue:"common"}},this.theme={value:"default",className:"theme",oldValue:null},this.direction={value:"horizontal",className:"direction",oldValue:null,constants:{horizontalValue:"horizontal",verticalValue:"vertical"}},this.roots=document.body,this.scaleDivisionsCount=5,this.valueNotesDisplay=!0,this.step=1}var t,i,s;return t=e,(i=[{key:"getOptionsPresets",value:function(){return{type:this.type.value,limits:{minLimit:this.limits.minLimit,maxLimit:this.limits.maxLimit},step:this.step,singleValue:this.singleValue,rangeValue:{minValue:this.values.rangeValueMin,maxValue:this.values.rangeValueMax},roots:this.roots,theme:this.theme.value,direction:this.direction.value,scaleDivisionsCount:this.scaleDivisionsCount,valueNotesDisplay:this.valueNotesDisplay}}}])&&n(t.prototype,i),s&&n(t,s),e}();var a=function(){var e=[];return{addHandler:function(t){if("function"==typeof t){for(var i=0;i<e.length;i+=1)if(e[i]===t)return;e.push(t)}},removeHandler:function(t){for(var i=0;i<e.length;i+=1)if(e[i]===t)return void e.splice(i,1)},trigger:function(t){for(var i=e.slice(0),n=0;n<i.length;n+=1)i[n](t)}}};function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function u(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),n.forEach((function(t){r(e,t,i[t])}))}return e}function r(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function d(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var h=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,n;return t=e,(i=[{key:"isNumber",value:function(e){return!("number"!=typeof e&&"string"!=typeof e||!isFinite(+e))}},{key:"isObject",value:function(e){return"object"===o(e)&&null!==e}},{key:"toNumber",value:function(e){return!!this.isNumber(e)&&+e}},{key:"isDOMEl",value:function(e){return!(!this.isObject(e)||e.constructor===Object||!this.isNumber(e.nodeType)||1!=+e.nodeType)}}])&&l(t.prototype,i),n&&l(t,n),e}()),c=a,v=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var t=new s;this.limits=t.limits,this.values=t.values,this.type=t.type,this.step=t.step,this.roots=t.roots,this.scaleDivisionsCount=t.divisionsCount,this.valueNotesDisplay=t.valueNotesDisplay,this.valueNotesMode=t.valueNotesMode,this.theme=t.theme,this.direction=t.direction,this.addEvents()}var t,i,n;return t=e,(i=[{key:"addEvents",value:function(){this.valueUpdateEvent=c(),this.limitsUpdateEvent=c(),this.stepUpdateEvent=c(),this.percentageUpdateEvent=c(),this.typeUpdateEvent=c(),this.rootsUpdateEvent=c(),this.themeUpdateEvent=c(),this.directionUpdateEvent=c(),this.valueNotesDisplayUpdateEvent=c(),this.scaleDivisionsCountUpdateEvent=c()}},{key:"recalculateValue",value:function(){var e=this.type.value===this.type.constants.singleValue;e&&this.setSingleValue(null),e||this.setRangeValues(null)}},{key:"cutToLimits",value:function(e){return e<this.limits.minLimit?this.limits.minLimit:e>this.limits.maxLimit?this.limits.maxLimit:e}},{key:"calcStepped",value:function(e){return Math.round(e/this.step)*this.step}},{key:"setType",value:function(e){Object.values(this.type.constants).includes(e)&&(this.type.value=e,this.typeUpdateEvent.trigger({value:this.type.value,constants:u({},this.type.constants)}))}},{key:"setLimits",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=h.isNumber(e.minLimit)?+e.minLimit:this.limits.minLimit,i=h.isNumber(e.maxLimit)?+e.maxLimit:this.limits.maxLimit;if(t===i&&(i+=1),t>i){var n=[i,t];t=n[0],i=n[1]}this.limits.minLimit=t,this.limits.maxLimit=i,this.limits.valuesCount=this.limits.maxLimit-this.limits.minLimit,this.limitsUpdateEvent.trigger(u({},this.limits))}},{key:"setStep",value:function(e){!h.isNumber(e)||+e<1||(this.step=+e,this.stepUpdateEvent.trigger(this.step))}},{key:"setSingleValue",value:function(e){var t=h.isNumber(e)?+e:this.values.singleValue;this.values.singleValue=this.cutToLimits(this.calcStepped(t)),this.valueUpdateEvent.trigger(u({},this.values))}},{key:"setRangeValues",value:function(e){var t=h.isObject(e)?e:{},i=h.isNumber(t.minValue)?+t.minValue:this.values.rangeValueMin,n=h.isNumber(t.maxValue)?+t.maxValue:this.values.rangeValueMax;if(i===n&&(n+=this.step),i>n){var s=[n,i];i=s[0],n=s[1]}this.values.rangeValueMin=this.cutToLimits(this.calcStepped(i)),this.values.rangeValueMax=this.cutToLimits(this.calcStepped(n)),this.valueUpdateEvent.trigger(u({},this.values))}},{key:"setNearestValue",value:function(e,t){if(h.isNumber(e)){var i=this.type.value===this.type.constants.singleValue,n=!1===t?Math.round(+e):Math.round(this.limits.minLimit+ +e/100*this.limits.valuesCount);i&&this.setSingleValue(n),i||(n<(this.values.rangeValueMin+this.values.rangeValueMax)/2?this.setRangeValues({minValue:n}):this.setRangeValues({maxValue:n}))}}},{key:"setRoots",value:function(e){h.isDOMEl(e)&&(this.roots=e,this.rootsUpdateEvent.trigger(this.roots))}},{key:"setTheme",value:function(e){"string"==typeof e&&(this.theme.oldValue=this.theme.value,this.theme.value=e,this.themeUpdateEvent.trigger(this.theme.value))}},{key:"setDirection",value:function(e){Object.values(this.direction.constants).includes(e)&&(this.direction.oldValue=this.direction.value,this.direction.value=e,this.directionUpdateEvent.trigger({value:this.direction.value,constants:u({},this.direction.constants)}))}},{key:"setValueNotesDisplay",value:function(e){"boolean"==typeof e&&(this.valueNotesDisplay=e,this.valueNotesDisplayUpdateEvent.trigger(this.valueNotesDisplay))}},{key:"setValueNotesMode",value:function(e){Object.values(this.valueNotesMode.constants).includes(e)&&(this.valueNotesMode.value=e)}},{key:"setScaleDivisionsCount",value:function(e){!h.isNumber(e)||e<0||(this.scaleDivisionsCount=1!==Math.round(+e)?Math.round(+e):Math.round(+e)+1,this.scaleDivisionsCountUpdateEvent.trigger(this.scaleDivisionsCount))}},{key:"getType",value:function(){return{value:this.type.value,constants:u({},this.type.constants)}}},{key:"getLimits",value:function(){return u({},this.limits)}},{key:"getValues",value:function(){return u({},this.values)}},{key:"getStep",value:function(){return this.step}},{key:"getRoots",value:function(){return this.roots}},{key:"getTheme",value:function(){return this.theme.value}},{key:"getDirection",value:function(){return{value:this.direction.value,constants:u({},this.direction.constants)}}},{key:"getValueNotesDisplay",value:function(){return this.valueNotesDisplay}},{key:"getValueNotesMode",value:function(){return{value:this.valueNotesMode.value,constants:u({},this.valueNotesMode.constants)}}},{key:"getScaleDivisionsCount",value:function(){return this.scaleDivisionsCount}}])&&d(t.prototype,i),n&&d(t,n),e}();function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=[],n=!0,s=!1,a=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(i.push(o.value),!t||i.length!==t);n=!0);}catch(e){s=!0,a=e}finally{try{n||null==l.return||l.return()}finally{if(s)throw a}}return i}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var y=a,g=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.handlersList=[],this.valueNotesList=[],this.scaleDivisionsList=[],this.init(),this.addEvents(),this.addListenners()}var t,i,n;return t=e,(i=[{key:"init",value:function(){var e=this;this.mainNode=document.createElement("div"),this.outer=document.createElement("div"),this.path=document.createElement("div"),this.pathPassed=document.createElement("div"),this.scaleDivisionsBlock=document.createElement("div"),this.mainNode.classList.add("wrunner"),this.outer.classList.add("wrunner__outer"),this.path.classList.add("wrunner__path"),this.pathPassed.classList.add("wrunner__path-passed"),this.scaleDivisionsBlock.classList.add("wrunner__scaleDivisionsBlock"),this.path.appendChild(this.pathPassed),this.outer.appendChild(this.path),this.outer.appendChild(this.scaleDivisionsBlock),window.requestAnimationFrame((function(){e.mainNode.appendChild(e.outer)}))}},{key:"addEvents",value:function(){this.UIActionMouseDown=y(),this.UIValueAction=y(),this.valueNoteModeUpdateEvent=y(),this.windowResizeEvent=y()}},{key:"addListenners",value:function(){this.path.addEventListener("mousedown",this.UIActionMouseDown.trigger),window.addEventListener("resize",this.windowResizeEvent.trigger)}},{key:"handlerMouseDownAction",value:function(e,t){if(0===e.button){var i=!1,n=function(e){var i=t.value===t.constants.horizontalValue,n=this.path[i?"offsetWidth":"offsetHeight"],s=this.path.getBoundingClientRect()[i?"left":"top"],a=e[i?"clientX":"clientY"];if(!(a<s-10||a>s+n+10)){var o=(a-s)/n*100;this.UIValueAction.trigger(i?o:100-o)}}.bind(this),s=function(e){var t=e.target;document.body.removeEventListener("mousemove",n),i||t!==this.handle&&t!==this.handleMin&&t!==this.handleMax&&n(e)}.bind(this);document.body.addEventListener("mousemove",(function(){i=!0}),{once:!0}),document.body.addEventListener("mousemove",n),document.body.addEventListener("mouseup",s,{once:!0})}}},{key:"updateDOM",value:function(e){var t=this;function i(e){var t=document.createElement("div");return e.forEach((function(e){t.classList.add(e)})),t}this.handlersList.concat(this.valueNotesList).forEach((function(e){e.remove()})),this.handlersList.length=0,this.valueNotesList.length=0,e.value===e.constants.singleValue&&(this.handlersList.push(i(["wrunner__handle","wrunner__handle_type_single"])),this.valueNotesList.push(i(["wrunner__value-note","wrunner__value-note_type_single"]))),e.value===e.constants.rangeValue&&(this.handlersList.push(i(["wrunner__handle","wrunner__handle_type_min"])),this.handlersList.push(i(["wrunner__handle","wrunner__handle_type_max"])),this.valueNotesList.push(i(["wrunner__value-note","wrunner__value-note_type_min"])),this.valueNotesList.push(i(["wrunner__value-note","wrunner__value-note_type_common"])),this.valueNotesList.push(i(["wrunner__value-note","wrunner__value-note_type_max"]))),window.requestAnimationFrame((function(){t.handlersList.forEach((function(e){t.path.appendChild(e)})),t.valueNotesList.forEach((function(e){t.outer.appendChild(e)}))}))}},{key:"append",value:function(e){e.appendChild(this.mainNode)}},{key:"applyStyles",value:function(e){var t=[this.mainNode,this.outer,this.path,this.pathPassed,this.scaleDivisionsBlock].concat(this.scaleDivisionsList,this.handlersList,this.valueNotesList);window.requestAnimationFrame((function(){t.forEach((function(t){Object.keys(e).forEach((function(i){var n=t.classList[0],s=e[i],a=s.oldValue,o=s.value;a&&t.classList.remove("".concat(n,"_").concat(e[i].className,"_").concat(a)),t.classList.add("".concat(n,"_").concat(e[i].className,"_").concat(o))}))}))}))}},{key:"drawValue",value:function(e,t,i,n,s){this.setPathPosition(t,e,i,n),this.setHandlersPosition(t,e,i),this.setValueNotesPosition(t,e,i,s)}},{key:"setPathPosition",value:function(e,t,i,n){var s=this,a=e.minLimit,o=e.maxLimit,l=e.valuesCount,u=t.singleValue,r=t.rangeValueMin,d=t.rangeValueMax,h=i.value===i.constants.horizontalValue,c=n.value===n.constants.singleValue,v=h?"left":"top",m=h?"width":"height";window.requestAnimationFrame((function(){var e;s.pathPassed.style.cssText="",c&&(e=h?0:100-(u-a)/l*100),c||(e=h?(r-a)/l*100:(o-d)/l*100);var t=c?(u-a)/l*100:(d-r)/l*100;s.pathPassed.style[m]="".concat(t,"%"),s.pathPassed.style[v]="".concat(e,"%")}))}},{key:"setHandlersPosition",value:function(e,t,i){var n=this,s=e.minLimit,a=e.valuesCount,o=t.singleValue,l=t.rangeValueMin,u=t.rangeValueMax,r=i.value===i.constants.horizontalValue,d=r?"left":"top";function h(e,t){var i=e;i.style.cssText="";var n=r?(t-s)/a*100:100-(t-s)/a*100;i.style[d]="".concat(n,"%")}window.requestAnimationFrame((function(){1===n.handlersList.length&&h(n.handlersList[0],o),2===n.handlersList.length&&(h(n.handlersList[0],l),h(n.handlersList[1],u))}))}},{key:"setValueNotesPosition",value:function(e,t,i,n){var s=this,a=e.minLimit,o=e.valuesCount,l=t.singleValue,u=t.rangeValueMin,r=t.rangeValueMax,d=i.value===i.constants.horizontalValue,h=d?"offsetWidth":"offsetHeight",c=d?"left":"top",v=function(e,t,i){var n=this.path[h],s=e,l=(t-a)/o;s.style.cssText="",s.innerHTML="object"===p(i)?"".concat(i[0]).concat(d?" - ":"<br>|<br>").concat(i[1]):i;var u=d?(l*n-s[h]/2)/n*100:100-(l*n+s[h]/2)/n*100;s.style[c]="".concat(u,"%")}.bind(this);window.requestAnimationFrame((function(){1===s.valueNotesList.length&&v(s.valueNotesList[0],l,l),3===s.valueNotesList.length&&(v(s.valueNotesList[0],u,u),v(s.valueNotesList[1],(u+r)/2,[u,r]),v(s.valueNotesList[2],r,r),s.checkValueNotesMode({minLimit:a,valuesCount:o},{rangeValueMin:u,rangeValueMax:r},i,n))}))}},{key:"checkValueNotesMode",value:function(e,t,i,n){var s=e.minLimit,a=e.valuesCount,o=t.rangeValueMin,l=t.rangeValueMax;if(!(this.valueNotesList.length<3)){var u=i.value===i.constants.horizontalValue?"offsetWidth":"offsetHeight",r=m(this.valueNotesList,3),d=r[0],h=r[2],c=(d[u]+h[u])/2,v=function(e,t){return(t-s)/a*this.path[u]+e[u]/2}.bind(this);v(h,l)-v(d,o)>=c?n.value!==n.constants.separateValue&&this.valueNoteModeUpdateEvent.trigger(n.constants.separateValue):n.value!==n.constants.commonValue&&this.valueNoteModeUpdateEvent.trigger(n.constants.commonValue)}}},{key:"applyValueNotesDisplay",value:function(e,t){var i=this;function n(e,t){var i=e.classList[0];e.classList[t?"add":"remove"]("".concat(i,"_display_visible")),e.classList[t?"remove":"add"]("".concat(i,"_display_hidden"))}window.requestAnimationFrame((function(){if(e){if(1===i.valueNotesList.length&&n(i.valueNotesList[0],!0),3===i.valueNotesList.length){var s=[!0,!1,!0],a=t.value===t.constants.separateValue;i.valueNotesList.forEach((function(e,t){n(e,a?s[t]:!s[t])}))}}else i.valueNotesList.forEach((function(e){n(e,!1)}))}))}},{key:"generateScaleDivisions",value:function(e){for(this.scaleDivisionsBlock.innerHTML="",this.scaleDivisionsList.length=0;this.scaleDivisionsList.length<e;){var t=document.createElement("div");t.classList.add("wrunner__scaleDivision"),this.scaleDivisionsList.push(t),this.scaleDivisionsBlock.appendChild(t)}}}])&&f(t.prototype,i),n&&f(t,n),e}();function b(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function V(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var w=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var i=t.userOptions,n=t.model,a=t.view,o=function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),n.forEach((function(t){b(e,t,i[t])}))}return e}({},(new s).getOptionsPresets(),i);this.model=n,this.view=a,this.applyDefaultEvents(),this.applyUserEvents(o),this.applyUserOptions(o)}var t,i,n;return t=e,(i=[{key:"getPublicMethods",value:function(){return{setType:this.model.setType.bind(this.model),setLimits:this.model.setLimits.bind(this.model),setStep:this.model.setStep.bind(this.model),setSingleValue:this.model.setSingleValue.bind(this.model),setRangeValues:this.model.setRangeValues.bind(this.model),setNearestValue:this.model.setNearestValue.bind(this.model),setRoots:this.model.setRoots.bind(this.model),setTheme:this.model.setTheme.bind(this.model),setDirection:this.model.setDirection.bind(this.model),setValueNotesDisplay:this.model.setValueNotesDisplay.bind(this.model),setScaleDivisionsCount:this.model.setScaleDivisionsCount.bind(this.model),getType:this.model.getType.bind(this.model),getLimits:this.model.getLimits.bind(this.model),getStep:this.model.getStep.bind(this.model),getValues:this.model.getValues.bind(this.model),getRoots:this.model.getRoots.bind(this.model),getTheme:this.model.getTheme.bind(this.model),getDirection:this.model.getDirection.bind(this.model),getValueNotesDisplay:this.model.getValueNotesDisplay.bind(this.model),getScaleDivisionsCount:this.model.getScaleDivisionsCount.bind(this.model),onThemeUpdate:this.model.themeUpdateEvent.addHandler,onDirectionUpdate:this.model.directionUpdateEvent.addHandler,onValueNotesDisplayUpdate:this.model.valueNotesDisplayUpdateEvent.addHandler,onRootsUpdate:this.model.rootsUpdateEvent.addHandler,onScaleDivisionsCountUpdate:this.model.scaleDivisionsCountUpdateEvent.addHandler,onValueUpdate:this.model.valueUpdateEvent.addHandler,onStepUpdate:this.model.stepUpdateEvent.addHandler,onLimitsUpdate:this.model.limitsUpdateEvent.addHandler,onTypeUpdate:this.model.typeUpdateEvent.addHandler}}},{key:"typeUpdateEventHandler",value:function(){this.view.updateDOM(this.model.getType()),this.view.applyStyles([this.model.theme,this.model.direction]),this.view.applyValueNotesDisplay(this.model.getValueNotesDisplay(),this.model.getValueNotesMode()),this.model.recalculateValue()}},{key:"limitsUpdateEventHandler",value:function(){this.model.recalculateValue()}},{key:"stepUpdateEventHandler",value:function(){this.model.recalculateValue()}},{key:"valueUpdateEventHandler",value:function(){this.view.drawValue(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"rootsUpdateEventHandler",value:function(){this.view.append(this.model.roots),this.view.drawValue(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"themeUpdateEventHandler",value:function(){this.view.applyStyles([this.model.theme,this.model.direction]),this.view.drawValue(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"directionUpdateEventHandler",value:function(){this.view.applyStyles([this.model.theme,this.model.direction]),this.view.drawValue(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"valueNotesDisplayUpdateEventHandler",value:function(){this.view.applyValueNotesDisplay(this.model.getValueNotesDisplay(),this.model.getValueNotesMode()),this.view.drawValue(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"scaleDivisionsCountUpdateEventHandler",value:function(){this.view.generateScaleDivisions(this.model.getScaleDivisionsCount()),this.view.applyStyles([this.model.theme,this.model.direction])}},{key:"windowResizeEventHandler",value:function(){this.view.drawValue(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"UIActionMouseDownHandler",value:function(e){this.view.handlerMouseDownAction(e,this.model.getDirection())}},{key:"UIValueActionHandler",value:function(e){this.model.setNearestValue(e)}},{key:"valueNoteModeUpdateEventHandler",value:function(e){this.model.setValueNotesMode(e),this.view.applyValueNotesDisplay(this.model.getValueNotesDisplay(),this.model.getValueNotesMode())}},{key:"applyDefaultEvents",value:function(){this.model.typeUpdateEvent.addHandler(this.typeUpdateEventHandler.bind(this)),this.model.limitsUpdateEvent.addHandler(this.limitsUpdateEventHandler.bind(this)),this.model.stepUpdateEvent.addHandler(this.stepUpdateEventHandler.bind(this)),this.model.valueUpdateEvent.addHandler(this.valueUpdateEventHandler.bind(this)),this.model.rootsUpdateEvent.addHandler(this.rootsUpdateEventHandler.bind(this)),this.model.themeUpdateEvent.addHandler(this.themeUpdateEventHandler.bind(this)),this.model.directionUpdateEvent.addHandler(this.directionUpdateEventHandler.bind(this)),this.model.valueNotesDisplayUpdateEvent.addHandler(this.valueNotesDisplayUpdateEventHandler.bind(this)),this.model.scaleDivisionsCountUpdateEvent.addHandler(this.scaleDivisionsCountUpdateEventHandler.bind(this)),this.view.valueNoteModeUpdateEvent.addHandler(this.valueNoteModeUpdateEventHandler.bind(this)),this.view.windowResizeEvent.addHandler(this.windowResizeEventHandler.bind(this)),this.view.UIActionMouseDown.addHandler(this.UIActionMouseDownHandler.bind(this)),this.view.UIValueAction.addHandler(this.UIValueActionHandler.bind(this))}},{key:"applyUserEvents",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.onTypeUpdate,i=e.onLimitsUpdate,n=e.onStepUpdate,s=e.onValueUpdate,a=e.onRootsUpdate,o=e.onThemeUpdate,l=e.onDirectionUpdate,u=e.onScaleDivisionsCountUpdate,r=e.onValueNotesDisplayUpdate;this.model.typeUpdateEvent.addHandler(t),this.model.limitsUpdateEvent.addHandler(i),this.model.stepUpdateEvent.addHandler(n),this.model.valueUpdateEvent.addHandler(s),this.model.rootsUpdateEvent.addHandler(a),this.model.themeUpdateEvent.addHandler(o),this.model.directionUpdateEvent.addHandler(l),this.model.scaleDivisionsCountUpdateEvent.addHandler(u),this.model.valueNotesDisplayUpdateEvent.addHandler(r)}},{key:"applyUserOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.type,i=e.limits,n=e.step,s=e.singleValue,a=e.rangeValues,o=e.roots,l=e.theme,u=e.direction,r=e.scaleDivisionsCount,d=e.valueNotesDisplay;this.model.setRoots(o),this.model.setValueNotesDisplay(d),this.model.setScaleDivisionsCount(r),this.model.setTheme(l),this.model.setDirection(u),this.model.setLimits(i),this.model.setStep(n),this.model.setType(t),this.model.setSingleValue(s),this.model.setRangeValues(a)}}])&&V(t.prototype,i),n&&V(t,n),e}();t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new v,i=new g;return new w({model:t,view:i,userOptions:e}).getPublicMethods()}},22:function(e,t,i){"use strict";i.r(t);var n=i(0);function s(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),n.forEach((function(t){a(e,t,i[t])}))}return e}function a(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}!function(e){e.fn.wRunner=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n.a)(s({},e,{roots:this[0]}))}}($)}});