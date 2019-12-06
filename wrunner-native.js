!function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)}([function(e,t,i){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t,i){var o=i.value;if("function"!=typeof o)throw new TypeError("@boundMethod decorator can only be applied to methods not: ".concat(n(o)));var a=!1;return{configurable:!0,get:function(){if(a||this===e.prototype||this.hasOwnProperty(t)||"function"!=typeof o)return o;var i=o.bind(this);return a=!0,Object.defineProperty(this,t,{configurable:!0,get:function(){return i},set:function(e){o=e,delete this[t]}}),a=!1,i},set:function(e){o=e}}}function a(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.limits={minLimit:0,maxLimit:100,valuesCount:100},this.values={singleValue:50,rangeValueMin:20,rangeValueMax:80},this.type={value:"single",constants:{singleValue:"single",rangeValue:"range"}},this.valueNotesMode={value:"separate",constants:{separateValue:"separate",commonValue:"common"}},this.theme={value:"default",className:"theme",oldValue:null},this.direction={value:"horizontal",className:"direction",oldValue:null,constants:{horizontalValue:"horizontal",verticalValue:"vertical"}},this.roots=document.body,this.scaleDivisionsCount=5,this.valueNotesDisplay=!0,this.step=1}var t,i,n;return t=e,(i=[{key:"getOptionsPresets",value:function(){return{type:this.type.value,limits:{minLimit:this.limits.minLimit,maxLimit:this.limits.maxLimit},step:this.step,singleValue:this.singleValue,rangeValue:{minValue:this.values.rangeValueMin,maxValue:this.values.rangeValueMax},roots:this.roots,theme:this.theme.value,direction:this.direction.value,scaleDivisionsCount:this.scaleDivisionsCount,valueNotesDisplay:this.valueNotesDisplay}}}])&&a(t.prototype,i),n&&a(t,n),e}();var r=function(){var e=[];return{addHandler:function(t){if("function"==typeof t){for(var i=0;i<e.length;i+=1)if(e[i]===t)return;e.push(t)}},removeHandler:function(t){for(var i=0;i<e.length;i+=1)if(e[i]===t)return void e.splice(i,1)},trigger:function(t){for(var i=e.slice(0),n=0;n<i.length;n+=1)i[n](t)}}};function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var p,c=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,n;return t=e,(i=[{key:"isNumber",value:function(e){return!("number"!=typeof e&&"string"!=typeof e||!isFinite(+e))}},{key:"isObject",value:function(e){return"object"===l(e)&&null!==e}},{key:"toNumber",value:function(e){return!!this.isNumber(e)&&+e}},{key:"isDOMEl",value:function(e){return!(!this.isObject(e)||e.constructor===Object||!this.isNumber(e.nodeType)||1!=+e.nodeType)}},{key:"makeEl",value:function(e){var t=document.createElement("div");return e.forEach((function(e){t.classList.add(e)})),t}}])&&u(t.prototype,i),n&&u(t,n),e}());function d(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),n.forEach((function(t){h(e,t,i[t])}))}return e}function h(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function v(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function y(e,t,i,n,o){var a={};return Object.keys(n).forEach((function(e){a[e]=n[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=i.slice().reverse().reduce((function(i,n){return n(e,t,i)||i}),a),o&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(o):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}var m=(y((p=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var t=new s;this.limits=t.limits,this.values=t.values,this.type=t.type,this.step=t.step,this.roots=t.roots,this.scaleDivisionsCount=t.divisionsCount,this.valueNotesDisplay=t.valueNotesDisplay,this.valueNotesMode=t.valueNotesMode,this.theme=t.theme,this.direction=t.direction,this._addEvents()}var t,i,n;return t=e,(i=[{key:"recalculateValue",value:function(){var e=this.type.value===this.type.constants.singleValue;e&&this.setSingleValue(null),e||this.setRangeValues(null)}},{key:"setType",value:function(e){Object.values(this.type.constants).includes(e)&&(this.type.value=e,this.typeUpdateEvent.trigger({value:this.type.value,constants:d({},this.type.constants)}))}},{key:"setLimits",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=c.isNumber(e.minLimit)?+e.minLimit:this.limits.minLimit,i=c.isNumber(e.maxLimit)?+e.maxLimit:this.limits.maxLimit;if(t===i&&(i+=1),t>i){var n=[i,t];t=n[0],i=n[1]}this.limits.minLimit=t,this.limits.maxLimit=i,this.limits.valuesCount=this.limits.maxLimit-this.limits.minLimit,this.limitsUpdateEvent.trigger(d({},this.limits))}},{key:"setStep",value:function(e){!c.isNumber(e)||+e<1||(this.step=+e,this.stepUpdateEvent.trigger(this.step))}},{key:"setSingleValue",value:function(e){var t=c.isNumber(e)?+e:this.values.singleValue;this.values.singleValue=this._cutToLimits(this._calcStepped(t)),this.valueUpdateEvent.trigger(d({},this.values))}},{key:"setRangeValues",value:function(e){var t=c.isObject(e)?e:{},i=c.isNumber(t.minValue)?+t.minValue:this.values.rangeValueMin,n=c.isNumber(t.maxValue)?+t.maxValue:this.values.rangeValueMax;if(i===n&&(n+=this.step),i>n){var o=[n,i];i=o[0],n=o[1]}this.values.rangeValueMin=this._cutToLimits(this._calcStepped(i)),this.values.rangeValueMax=this._cutToLimits(this._calcStepped(n)),this.valueUpdateEvent.trigger(d({},this.values))}},{key:"setNearestValue",value:function(e,t){if(c.isNumber(e)){var i=this.type.value===this.type.constants.singleValue,n=!1===t?Math.round(+e):Math.round(this.limits.minLimit+ +e/100*this.limits.valuesCount);i&&this.setSingleValue(n),i||(n<(this.values.rangeValueMin+this.values.rangeValueMax)/2?this.setRangeValues({minValue:n}):this.setRangeValues({maxValue:n}))}}},{key:"setRoots",value:function(e){c.isDOMEl(e)&&(this.roots=e,this.rootsUpdateEvent.trigger(this.roots))}},{key:"setTheme",value:function(e){"string"==typeof e&&(this.theme.oldValue=this.theme.value,this.theme.value=e,this.themeUpdateEvent.trigger(this.theme.value))}},{key:"setDirection",value:function(e){Object.values(this.direction.constants).includes(e)&&(this.direction.oldValue=this.direction.value,this.direction.value=e,this.directionUpdateEvent.trigger({value:this.direction.value,constants:d({},this.direction.constants)}))}},{key:"setValueNotesDisplay",value:function(e){"boolean"==typeof e&&(this.valueNotesDisplay=e,this.valueNotesDisplayUpdateEvent.trigger(this.valueNotesDisplay))}},{key:"setValueNotesMode",value:function(e){Object.values(this.valueNotesMode.constants).includes(e)&&(this.valueNotesMode.value=e)}},{key:"setScaleDivisionsCount",value:function(e){!c.isNumber(e)||e<0||(this.scaleDivisionsCount=1!==Math.round(+e)?Math.round(+e):Math.round(+e)+1,this.scaleDivisionsCountUpdateEvent.trigger(this.scaleDivisionsCount))}},{key:"getType",value:function(){return{value:this.type.value,constants:d({},this.type.constants)}}},{key:"getLimits",value:function(){return d({},this.limits)}},{key:"getValues",value:function(){return d({},this.values)}},{key:"getStep",value:function(){return this.step}},{key:"getRoots",value:function(){return this.roots}},{key:"getTheme",value:function(){return this.theme.value}},{key:"getDirection",value:function(){return{value:this.direction.value,constants:d({},this.direction.constants)}}},{key:"getValueNotesDisplay",value:function(){return this.valueNotesDisplay}},{key:"getValueNotesMode",value:function(){return{value:this.valueNotesMode.value,constants:d({},this.valueNotesMode.constants)}}},{key:"getScaleDivisionsCount",value:function(){return this.scaleDivisionsCount}},{key:"_addEvents",value:function(){this.valueUpdateEvent=r(),this.limitsUpdateEvent=r(),this.stepUpdateEvent=r(),this.percentageUpdateEvent=r(),this.typeUpdateEvent=r(),this.rootsUpdateEvent=r(),this.themeUpdateEvent=r(),this.directionUpdateEvent=r(),this.valueNotesDisplayUpdateEvent=r(),this.scaleDivisionsCountUpdateEvent=r()}},{key:"_cutToLimits",value:function(e){return e<this.limits.minLimit?this.limits.minLimit:e>this.limits.maxLimit?this.limits.maxLimit:e}},{key:"_calcStepped",value:function(e){return Math.round(e/this.step)*this.step}}])&&v(t.prototype,i),n&&v(t,n),e}()).prototype,"setType",[o],Object.getOwnPropertyDescriptor(p.prototype,"setType"),p.prototype),y(p.prototype,"setLimits",[o],Object.getOwnPropertyDescriptor(p.prototype,"setLimits"),p.prototype),y(p.prototype,"setStep",[o],Object.getOwnPropertyDescriptor(p.prototype,"setStep"),p.prototype),y(p.prototype,"setSingleValue",[o],Object.getOwnPropertyDescriptor(p.prototype,"setSingleValue"),p.prototype),y(p.prototype,"setRangeValues",[o],Object.getOwnPropertyDescriptor(p.prototype,"setRangeValues"),p.prototype),y(p.prototype,"setNearestValue",[o],Object.getOwnPropertyDescriptor(p.prototype,"setNearestValue"),p.prototype),y(p.prototype,"setRoots",[o],Object.getOwnPropertyDescriptor(p.prototype,"setRoots"),p.prototype),y(p.prototype,"setTheme",[o],Object.getOwnPropertyDescriptor(p.prototype,"setTheme"),p.prototype),y(p.prototype,"setDirection",[o],Object.getOwnPropertyDescriptor(p.prototype,"setDirection"),p.prototype),y(p.prototype,"setValueNotesDisplay",[o],Object.getOwnPropertyDescriptor(p.prototype,"setValueNotesDisplay"),p.prototype),y(p.prototype,"setValueNotesMode",[o],Object.getOwnPropertyDescriptor(p.prototype,"setValueNotesMode"),p.prototype),y(p.prototype,"setScaleDivisionsCount",[o],Object.getOwnPropertyDescriptor(p.prototype,"setScaleDivisionsCount"),p.prototype),y(p.prototype,"getType",[o],Object.getOwnPropertyDescriptor(p.prototype,"getType"),p.prototype),y(p.prototype,"getLimits",[o],Object.getOwnPropertyDescriptor(p.prototype,"getLimits"),p.prototype),y(p.prototype,"getValues",[o],Object.getOwnPropertyDescriptor(p.prototype,"getValues"),p.prototype),y(p.prototype,"getStep",[o],Object.getOwnPropertyDescriptor(p.prototype,"getStep"),p.prototype),y(p.prototype,"getRoots",[o],Object.getOwnPropertyDescriptor(p.prototype,"getRoots"),p.prototype),y(p.prototype,"getTheme",[o],Object.getOwnPropertyDescriptor(p.prototype,"getTheme"),p.prototype),y(p.prototype,"getDirection",[o],Object.getOwnPropertyDescriptor(p.prototype,"getDirection"),p.prototype),y(p.prototype,"getValueNotesDisplay",[o],Object.getOwnPropertyDescriptor(p.prototype,"getValueNotesDisplay"),p.prototype),y(p.prototype,"getValueNotesMode",[o],Object.getOwnPropertyDescriptor(p.prototype,"getValueNotesMode"),p.prototype),y(p.prototype,"getScaleDivisionsCount",[o],Object.getOwnPropertyDescriptor(p.prototype,"getScaleDivisionsCount"),p.prototype),p);function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var i=[],n=!0,o=!1,a=void 0;try{for(var s,r=e[Symbol.iterator]();!(n=(s=r.next()).done)&&(i.push(s.value),!t||i.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==r.return||r.return()}finally{if(o)throw a}}return i}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function g(e){return function(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var E=function(){function e(t){var i=t.parent;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=i,this.valueNotesList=[],this._addEvents()}var t,i,n;return t=e,(i=[{key:"updateDOM",value:function(e){var t=this;this.valueNotesList.forEach((function(e){e.remove()})),this.valueNotesList.length=0,e.value===e.constants.singleValue&&this.valueNotesList.push(c.makeEl(["wrunner__value-note","wrunner__value-note_type_single"])),e.value===e.constants.rangeValue&&(this.valueNotesList.push(c.makeEl(["wrunner__value-note","wrunner__value-note_type_min"])),this.valueNotesList.push(c.makeEl(["wrunner__value-note","wrunner__value-note_type_common"])),this.valueNotesList.push(c.makeEl(["wrunner__value-note","wrunner__value-note_type_max"]))),window.requestAnimationFrame((function(){t.valueNotesList.forEach((function(e){t.parent.appendChild(e)}))}))}},{key:"setPosition",value:function(e,t,i,n,o){var a=this,s=e.minLimit,r=e.valuesCount,l=t.singleValue,u=t.rangeValueMin,p=t.rangeValueMax,c=i.value===i.constants.horizontalValue,d=c?"offsetWidth":"offsetHeight",h=c?"left":"top",v=function(e,t,i){var n=o[d],a=e,l=(t-s)/r;a.style.cssText="",a.innerHTML="object"===b(i)?"".concat(i[0]).concat(c?" - ":"<br>|<br>").concat(i[1]):i;var u=c?(l*n-a[d]/2)/n*100:100-(l*n+a[d]/2)/n*100;a.style[h]="".concat(u,"%")};window.requestAnimationFrame((function(){1===a.valueNotesList.length&&v(a.valueNotesList[0],l,l),3===a.valueNotesList.length&&(v(a.valueNotesList[0],u,u),v(a.valueNotesList[1],(u+p)/2,[u,p]),v(a.valueNotesList[2],p,p),a._checkValueNotesMode(e,t,i,n,o))}))}},{key:"applyDisplay",value:function(e,t){var i=this;function n(e,t){var i=e.classList[0];e.classList[t?"add":"remove"]("".concat(i,"_display_visible")),e.classList[t?"remove":"add"]("".concat(i,"_display_hidden"))}window.requestAnimationFrame((function(){if(e){if(1===i.valueNotesList.length&&n(i.valueNotesList[0],!0),3===i.valueNotesList.length){var o=[!0,!1,!0],a=t.value===t.constants.separateValue;i.valueNotesList.forEach((function(e,t){n(e,a?o[t]:!o[t])}))}}else i.valueNotesList.forEach((function(e){n(e,!1)}))}))}},{key:"getElements",value:function(){return g(this.valueNotesList)}},{key:"_addEvents",value:function(){this.valueNoteModeUpdateEvent=r()}},{key:"_checkValueNotesMode",value:function(e,t,i,n,o){if(!(this.valueNotesList.length<3)){var a=e.minLimit,s=e.valuesCount,r=(t.singleValue,t.rangeValueMin),l=t.rangeValueMax,u=f(this.valueNotesList,3),p=u[0],c=u[2],d=i.value===i.constants.horizontalValue?"offsetWidth":"offsetHeight",h=(p[d]+c[d])/2,v=function(e,t){return(t-a)/s*o[d]+e[d]/2};v(c,l)-v(p,r)>=h?n.value!==n.constants.separateValue&&this.valueNoteModeUpdateEvent.trigger(n.constants.separateValue):n.value!==n.constants.commonValue&&this.valueNoteModeUpdateEvent.trigger(n.constants.commonValue)}}}])&&w(t.prototype,i),n&&w(t,n),e}();function D(e){return function(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function _(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var V=function(){function e(t){var i=t.parent;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=i,this.handlersList=[]}var t,i,n;return t=e,(i=[{key:"updateDOM",value:function(e){var t=this;this.handlersList.forEach((function(e){e.remove()})),this.handlersList.length=0,e.value===e.constants.singleValue&&this.handlersList.push(c.makeEl(["wrunner__handle","wrunner__handle_type_single"])),e.value===e.constants.rangeValue&&(this.handlersList.push(c.makeEl(["wrunner__handle","wrunner__handle_type_min"])),this.handlersList.push(c.makeEl(["wrunner__handle","wrunner__handle_type_max"]))),window.requestAnimationFrame((function(){t.handlersList.forEach((function(e){t.parent.appendChild(e)}))}))}},{key:"setPosition",value:function(e,t,i){var n=this,o=e.minLimit,a=e.valuesCount,s=t.singleValue,r=t.rangeValueMin,l=t.rangeValueMax,u=i.value===i.constants.horizontalValue,p=u?"left":"top";function c(e,t){var i=e;i.style.cssText="";var n=u?(t-o)/a*100:100-(t-o)/a*100;i.style[p]="".concat(n,"%")}window.requestAnimationFrame((function(){1===n.handlersList.length&&c(n.handlersList[0],s),2===n.handlersList.length&&(c(n.handlersList[0],r),c(n.handlersList[1],l))}))}},{key:"getElements",value:function(){return D(this.handlersList)}}])&&_(t.prototype,i),n&&_(t,n),e}();function O(e){return function(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function U(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var N=function(){function e(t){var i=t.parent;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=i,this.scaleDivisionsList=[],this._init()}var t,i,n;return t=e,(i=[{key:"generateDivisions",value:function(e){var t=this;for(this.scaleDivisionsList.forEach((function(e){e.remove()})),this.scaleDivisionsList.length=0;this.scaleDivisionsList.length<e;){var i=c.makeEl(["wrunner__scaleDivision"]);this.scaleDivisionsList.push(i)}window.requestAnimationFrame((function(){t.scaleDivisionsList.forEach((function(e){t.scaleDivisionsBlock.appendChild(e)}))}))}},{key:"getElements",value:function(){return[this.scaleDivisionsBlock].concat(O(this.scaleDivisionsList))}},{key:"_init",value:function(){this.scaleDivisionsBlock=c.makeEl(["wrunner__scaleDivisionsBlock"]),this.parent.appendChild(this.scaleDivisionsBlock)}}])&&U(t.prototype,i),n&&U(t,n),e}();function k(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var L,j=function(){function e(t){var i=t.parent;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.parent=i,this._init()}var t,i,n;return t=e,(i=[{key:"setPosition",value:function(e,t,i,n){var o=this,a=e.minLimit,s=e.valuesCount,r=e.maxLimit,l=t.singleValue,u=t.rangeValueMin,p=t.rangeValueMax,c=i.value===i.constants.horizontalValue,d=n.value===n.constants.singleValue,h=c?"left":"top",v=c?"width":"height";window.requestAnimationFrame((function(){var e;o.pathPassed.style.cssText="",d&&(e=c?0:100-(l-a)/s*100),d||(e=c?(u-a)/s*100:(r-p)/s*100);var t=d?(l-a)/s*100:(p-u)/s*100;o.pathPassed.style[v]="".concat(t,"%"),o.pathPassed.style[h]="".concat(e,"%")}))}},{key:"getElements",value:function(){return[this.pathPassed]}},{key:"_init",value:function(){this.pathPassed=c.makeEl(["wrunner__path-passed"]),this.parent.appendChild(this.pathPassed)}}])&&k(t.prototype,i),n&&k(t,n),e}();function P(e){return function(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function H(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function M(e,t,i,n,o){var a={};return Object.keys(n).forEach((function(e){a[e]=n[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=i.slice().reverse().reduce((function(i,n){return n(e,t,i)||i}),a),o&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(o):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}var S,T=(M((L=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._init(),this._addEvents(),this._addListenners()}var t,i,n;return t=e,(i=[{key:"append",value:function(e){e.appendChild(this.mainNode)}},{key:"applyValueNotesDisplay",value:function(){for(var e,t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];(e=this.valueNotes).applyDisplay.apply(e,i.concat([this.path]))}},{key:"generateScaleDivisions",value:function(){var e;(e=this.scale).generateDivisions.apply(e,arguments)}},{key:"updateDOM",value:function(e){this.handlers.updateDOM(e),this.valueNotes.updateDOM(e)}},{key:"setPositions",value:function(e,t,i,n,o){this.pathPassed.setPosition(t,e,i,n),this.handlers.setPosition(t,e,i),this.valueNotes.setPosition(t,e,i,o,this.path)}},{key:"applyStyles",value:function(e){var t=[this.mainNode,this.outer,this.path].concat(P(this.pathPassed.getElements()),P(this.handlers.getElements()),P(this.valueNotes.getElements()),P(this.scale.getElements()));window.requestAnimationFrame((function(){t.forEach((function(t){Object.values(e).forEach((function(e){var i=t.classList[0],n=e.oldValue,o=e.value;n&&t.classList.remove("".concat(i,"_").concat(e.className,"_").concat(n)),t.classList.add("".concat(i,"_").concat(e.className,"_").concat(o))}))}))}))}},{key:"handleMouseDown",value:function(e,t){var i=this;if(0===e.button){var n=!1,o=function(e){var n=t.value===t.constants.horizontalValue,o=i.path.getBoundingClientRect()[n?"left":"top"],a=i.path[n?"offsetWidth":"offsetHeight"],s=e[n?"clientX":"clientY"];if(!(s<o-10||s>o+a+10)){var r=(s-o)/a*100;i.UIValueAction.trigger(n?r:100-r)}},a=function(e){o(e)};document.body.addEventListener("mousemove",(function(){n=!0}),{once:!0}),document.body.addEventListener("mousemove",a),document.body.addEventListener("mouseup",(function(e){var t=e.target;document.body.removeEventListener("mousemove",a),n||i.handlers.getElements().includes(t)||o(e)}),{once:!0})}}},{key:"_init",value:function(){var e=this;this.mainNode=c.makeEl(["wrunner"]),this.outer=c.makeEl(["wrunner__outer"]),this.path=c.makeEl(["wrunner__path"]),this.outer.appendChild(this.path),this.pathPassed=new j({parent:this.path}),this.handlers=new V({parent:this.path}),this.valueNotes=new E({parent:this.outer}),this.scale=new N({parent:this.outer}),window.requestAnimationFrame((function(){e.mainNode.appendChild(e.outer)}))}},{key:"_resize",value:function(e){this.windowResizeEvent.trigger(e)}},{key:"_handleMouseDown",value:function(e){this.UIActionMouseDown.trigger(e)}},{key:"_addEvents",value:function(){this.UIActionMouseDown=r(),this.UIValueAction=r(),this.windowResizeEvent=r(),this.valueNoteModeUpdateEvent=this.valueNotes.valueNoteModeUpdateEvent}},{key:"_addListenners",value:function(){window.addEventListener("resize",this._resize),this.path.addEventListener("mousedown",this._handleMouseDown)}}])&&H(t.prototype,i),n&&H(t,n),e}()).prototype,"_resize",[o],Object.getOwnPropertyDescriptor(L.prototype,"_resize"),L.prototype),M(L.prototype,"_handleMouseDown",[o],Object.getOwnPropertyDescriptor(L.prototype,"_handleMouseDown"),L.prototype),L);function C(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function A(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function z(e,t,i,n,o){var a={};return Object.keys(n).forEach((function(e){a[e]=n[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=i.slice().reverse().reduce((function(i,n){return n(e,t,i)||i}),a),o&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(o):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}var x=(z((S=function(){function e(t){var i=t.userOptions,n=t.model,o=t.modelDefaults,a=t.view;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var s=function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),n.forEach((function(t){C(e,t,i[t])}))}return e}({},o.getOptionsPresets(),i);this.model=n,this.view=a,this._applyDefaultEvents(),this._applyUserEvents(s),this._applyUserOptions(s)}var t,i,n;return t=e,(i=[{key:"getPublicMethods",value:function(){return{setType:this.model.setType,setLimits:this.model.setLimits,setStep:this.model.setStep,setSingleValue:this.model.setSingleValue,setRangeValues:this.model.setRangeValues,setNearestValue:this.model.setNearestValue,setRoots:this.model.setRoots,setTheme:this.model.setTheme,setDirection:this.model.setDirection,setValueNotesDisplay:this.model.setValueNotesDisplay,setScaleDivisionsCount:this.model.setScaleDivisionsCount,getType:this.model.getType,getLimits:this.model.getLimits,getStep:this.model.getStep,getValues:this.model.getValues,getRoots:this.model.getRoots,getTheme:this.model.getTheme,getDirection:this.model.getDirection,getValueNotesDisplay:this.model.getValueNotesDisplay,getScaleDivisionsCount:this.model.getScaleDivisionsCount,onThemeUpdate:this.model.themeUpdateEvent.addHandler,onDirectionUpdate:this.model.directionUpdateEvent.addHandler,onValueNotesDisplayUpdate:this.model.valueNotesDisplayUpdateEvent.addHandler,onRootsUpdate:this.model.rootsUpdateEvent.addHandler,onScaleDivisionsCountUpdate:this.model.scaleDivisionsCountUpdateEvent.addHandler,onValueUpdate:this.model.valueUpdateEvent.addHandler,onStepUpdate:this.model.stepUpdateEvent.addHandler,onLimitsUpdate:this.model.limitsUpdateEvent.addHandler,onTypeUpdate:this.model.typeUpdateEvent.addHandler}}},{key:"_typeUpdateEventHandler",value:function(){this.view.updateDOM(this.model.getType()),this.view.applyStyles([this.model.theme,this.model.direction]),this.view.applyValueNotesDisplay(this.model.getValueNotesDisplay(),this.model.getValueNotesMode()),this.model.recalculateValue()}},{key:"_limitsUpdateEventHandler",value:function(){this.model.recalculateValue()}},{key:"_stepUpdateEventHandler",value:function(){this.model.recalculateValue()}},{key:"_valueUpdateEventHandler",value:function(){this.view.setPositions(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"_rootsUpdateEventHandler",value:function(){this.view.append(this.model.roots),this.view.setPositions(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"_themeUpdateEventHandler",value:function(){this.view.applyStyles([this.model.theme,this.model.direction]),this.view.setPositions(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"_directionUpdateEventHandler",value:function(){this.view.applyStyles([this.model.theme,this.model.direction]),this.view.setPositions(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"_valueNotesDisplayUpdateEventHandler",value:function(){this.view.applyValueNotesDisplay(this.model.getValueNotesDisplay(),this.model.getValueNotesMode()),this.view.setPositions(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"_scaleDivisionsCountUpdateEventHandler",value:function(){this.view.generateScaleDivisions(this.model.getScaleDivisionsCount()),this.view.applyStyles([this.model.theme,this.model.direction])}},{key:"_windowResizeEventHandler",value:function(){this.view.setPositions(this.model.getValues(),this.model.getLimits(),this.model.getDirection(),this.model.getType(),this.model.getValueNotesMode())}},{key:"_UIActionMouseDownHandler",value:function(e){this.view.handleMouseDown(e,this.model.getDirection())}},{key:"_UIValueActionHandler",value:function(e){this.model.setNearestValue(e)}},{key:"_valueNoteModeUpdateEventHandler",value:function(e){this.model.setValueNotesMode(e),this.view.applyValueNotesDisplay(this.model.getValueNotesDisplay(),this.model.getValueNotesMode())}},{key:"_applyDefaultEvents",value:function(){this.model.typeUpdateEvent.addHandler(this._typeUpdateEventHandler),this.model.limitsUpdateEvent.addHandler(this._limitsUpdateEventHandler),this.model.stepUpdateEvent.addHandler(this._stepUpdateEventHandler),this.model.valueUpdateEvent.addHandler(this._valueUpdateEventHandler),this.model.rootsUpdateEvent.addHandler(this._rootsUpdateEventHandler),this.model.themeUpdateEvent.addHandler(this._themeUpdateEventHandler),this.model.directionUpdateEvent.addHandler(this._directionUpdateEventHandler),this.model.valueNotesDisplayUpdateEvent.addHandler(this._valueNotesDisplayUpdateEventHandler),this.model.scaleDivisionsCountUpdateEvent.addHandler(this._scaleDivisionsCountUpdateEventHandler),this.view.valueNoteModeUpdateEvent.addHandler(this._valueNoteModeUpdateEventHandler),this.view.windowResizeEvent.addHandler(this._windowResizeEventHandler),this.view.UIActionMouseDown.addHandler(this._UIActionMouseDownHandler),this.view.UIValueAction.addHandler(this._UIValueActionHandler)}},{key:"_applyUserEvents",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.onTypeUpdate,i=e.onLimitsUpdate,n=e.onStepUpdate,o=e.onValueUpdate,a=e.onRootsUpdate,s=e.onThemeUpdate,r=e.onDirectionUpdate,l=e.onScaleDivisionsCountUpdate,u=e.onValueNotesDisplayUpdate;this.model.typeUpdateEvent.addHandler(t),this.model.limitsUpdateEvent.addHandler(i),this.model.stepUpdateEvent.addHandler(n),this.model.valueUpdateEvent.addHandler(o),this.model.rootsUpdateEvent.addHandler(a),this.model.themeUpdateEvent.addHandler(s),this.model.directionUpdateEvent.addHandler(r),this.model.scaleDivisionsCountUpdateEvent.addHandler(l),this.model.valueNotesDisplayUpdateEvent.addHandler(u)}},{key:"_applyUserOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.type,i=e.limits,n=e.step,o=e.singleValue,a=e.rangeValues,s=e.roots,r=e.theme,l=e.direction,u=e.scaleDivisionsCount,p=e.valueNotesDisplay;this.model.setRoots(s),this.model.setValueNotesDisplay(p),this.model.setScaleDivisionsCount(u),this.model.setTheme(r),this.model.setDirection(l),this.model.setLimits(i),this.model.setStep(n),this.model.setType(t),this.model.setSingleValue(o),this.model.setRangeValues(a)}}])&&A(t.prototype,i),n&&A(t,n),e}()).prototype,"_typeUpdateEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_typeUpdateEventHandler"),S.prototype),z(S.prototype,"_limitsUpdateEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_limitsUpdateEventHandler"),S.prototype),z(S.prototype,"_stepUpdateEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_stepUpdateEventHandler"),S.prototype),z(S.prototype,"_valueUpdateEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_valueUpdateEventHandler"),S.prototype),z(S.prototype,"_rootsUpdateEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_rootsUpdateEventHandler"),S.prototype),z(S.prototype,"_themeUpdateEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_themeUpdateEventHandler"),S.prototype),z(S.prototype,"_directionUpdateEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_directionUpdateEventHandler"),S.prototype),z(S.prototype,"_valueNotesDisplayUpdateEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_valueNotesDisplayUpdateEventHandler"),S.prototype),z(S.prototype,"_scaleDivisionsCountUpdateEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_scaleDivisionsCountUpdateEventHandler"),S.prototype),z(S.prototype,"_windowResizeEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_windowResizeEventHandler"),S.prototype),z(S.prototype,"_UIActionMouseDownHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_UIActionMouseDownHandler"),S.prototype),z(S.prototype,"_UIValueActionHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_UIValueActionHandler"),S.prototype),z(S.prototype,"_valueNoteModeUpdateEventHandler",[o],Object.getOwnPropertyDescriptor(S.prototype,"_valueNoteModeUpdateEventHandler"),S.prototype),S);t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new m,i=new s,n=new T;return new x({model:t,modelDefaults:i,view:n,userOptions:e}).getPublicMethods()}},function(e,t,i){"use strict";i.r(t);var n=i(0);window.wRunner=n.a}]);