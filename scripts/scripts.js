!function(e){function t(t){for(var o,l,s=t[0],a=t[1],u=t[2],p=0,f=[];p<s.length;p++)l=s[p],r[l]&&f.push(r[l][0]),r[l]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);for(c&&c(t);f.length;)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,s=1;s<n.length;s++){var a=n[s];0!==r[a]&&(o=!1)}o&&(i.splice(t--,1),e=l(l.s=n[0]))}return e}var o={},r={1:0},i=[];function l(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=o,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(n,o,function(t){return e[t]}.bind(null,o));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var s=window.webpackJsonp=window.webpackJsonp||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var c=a;i.push([3,0]),n()}([,,,function(e,t,n){n(4),window.$=n(5),window.jQuery=window.$},function(e,t){function n(e,t,r){return(n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var i=new(Function.bind.apply(e,r));return n&&o(i,n.prototype),i}).apply(null,arguments)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){i(e,t,n[t])})}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var s=function(){function e(t,n,o,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.userOptions=n,this.sliderType=o,this.parent=r,this.index=t,this._findControllers(),this._makeSlider(),this._addControllerLogics()}var t,n,o;return t=e,(n=[{key:"_makeSlider",value:function(){"native"===this.sliderType?this.slider=window.wRunner(r({},this._getDefaultOptions(),this.userOptions,{roots:this.parent})):this.slider=$(this.parent).wRunner(r({},this._getDefaultOptions(),this.userOptions))}},{key:"_execute",value:function(e,t){"native"===this.sliderType?this.slider[e](t):$(this.parent).wRunner(e,t)}},{key:"_findControllers",value:function(){this.$controllersHolders=$(".js-sample").eq(this.index).find(".js-sample__parameter-value"),this.$stepController=this.$controllersHolders.eq(0).find("input"),this.$minLimitController=this.$controllersHolders.eq(1).find("input"),this.$maxLimitController=this.$controllersHolders.eq(2).find("input"),this.$typeControllers=[this.$controllersHolders.eq(3).find("input").eq(0),this.$controllersHolders.eq(3).find("input").eq(1)],this.$valueController=this.$controllersHolders.eq(4).find("input"),this.$minValueController=this.$controllersHolders.eq(5).find("input"),this.$maxValueController=this.$controllersHolders.eq(6).find("input"),this.$rootsController=this.$controllersHolders.eq(7).find("input"),this.$directionControllers=[this.$controllersHolders.eq(8).find("input").eq(0),this.$controllersHolders.eq(8).find("input").eq(1)],this.$valueNotesDisplayController=this.$controllersHolders.eq(9).find("input"),this.$scaleDivisionsCountController=this.$controllersHolders.eq(10).find("input")}},{key:"_addControllerLogics",value:function(){var e=this,t=function(e){var t=$(e.target);"Escape"===e.key&&(t.val(e.data.snapshot),t.blur())},n=function(n,o){n.on("focus",function(){var r=n.val();n.on("keydown",{snapshot:r},t),n.on("blur",function(){n.off("keydown",{snapshot:r},t),e._execute(o.method,o.action?o.action(n.val()):n.val())})})};this.$typeControllers[0].on("input",function(){e._execute("setType",e.$typeControllers[0].val())}),this.$typeControllers[1].on("input",function(){e._execute("setType",e.$typeControllers[1].val())}),this.$directionControllers[0].on("input",function(){e._execute("setDirection",e.$directionControllers[0].val())}),this.$directionControllers[1].on("input",function(){e._execute("setDirection",e.$directionControllers[1].val())}),this.$valueNotesDisplayController.on("input",function(){e._execute("setValueNotesDisplay",e.$valueNotesDisplayController[0].checked)}),n(this.$stepController,{method:"setStep"}),n(this.$minLimitController,{method:"setLimits",action:function(e){return{minLimit:e}}}),n(this.$maxLimitController,{method:"setLimits",action:function(e){return{maxLimit:e}}}),n(this.$valueController,{method:"setSingleValue"}),n(this.$minValueController,{method:"setRangeValues",action:function(e){return{minValue:e}}}),n(this.$maxValueController,{method:"setRangeValues",action:function(e){return{maxValue:e}}}),n(this.$scaleDivisionsCountController,{method:"setScaleDivisionsCount"})}},{key:"_getDefaultOptions",value:function(){var e=this;return{onStepUpdate:function(t){e.$stepController.val(t)},onLimitsUpdate:function(t){e.$minLimitController.val(t.minLimit),e.$maxLimitController.val(t.maxLimit)},onTypeUpdate:function(t){t.value===e.$typeControllers[0].val()&&(e.$typeControllers[0][0].checked=!0,e.$minValueController.parent().parent().css("visibility","hidden"),e.$maxValueController.parent().parent().css("visibility","hidden"),e.$valueController.parent().parent().css("visibility","visible")),t.value===e.$typeControllers[1].val()&&(e.$typeControllers[1][0].checked=!0,e.$valueController.parent().parent().css("visibility","hidden"),e.$minValueController.parent().parent().css("visibility","visible"),e.$maxValueController.parent().parent().css("visibility","visible"))},onValueUpdate:function(t){e.$valueController.val(t.singleValue),e.$minValueController.val(t.rangeValueMin),e.$maxValueController.val(t.rangeValueMax)},onRootsUpdate:function(t){for(var n=$(t),o="",r=0;r<n[0].classList.length;r+=1)o+=".".concat(n[0].classList[r]);e.$rootsController.val(o)},onDirectionUpdate:function(t){t.value===e.$directionControllers[0].val()&&(e.$directionControllers[0][0].checked=!0),t.value===e.$directionControllers[1].val()&&(e.$directionControllers[1][0].checked=!0)},onValueNotesDisplayUpdate:function(t){e.$valueNotesDisplayController[0].checked=t},onScaleDivisionsCountUpdate:function(t){e.$scaleDivisionsCountController.val(t)}}}}])&&l(t.prototype,n),o&&l(t,o),e}();function a(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return n(s,t)}document.addEventListener("DOMContentLoaded",function(){a(0,{},"native",document.getElementById("sample0")),a(1,{direction:"vertical",step:5,type:"range"},"native",document.getElementById("sample1")),a(2,{scaleDivisionsCount:16,direction:"vertical",step:5,type:"range"},"jquery",document.getElementById("sample2")),a(3,{valueNotesDisplay:!1,scaleDivisionsCount:0},"jquery",document.getElementById("sample3"))})}]);