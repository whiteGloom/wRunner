!function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=92)}({1:function(e,t,i){"use strict";t.a=function(){var e=[];return{addHandler:function(t){if("function"==typeof t){for(var i=0;i<e.length;i++)if(e[i]===t)return void console.log("The handler already in the list");e.push(t)}else console.log("The handler must be a function")},removeHandler:function(t){for(var i=0;i<e.length;i++)if(e[i]===t)return void e.splice(i,1);console.log("could not find observer in list of observers")},trigger:function(t){for(var i=e.slice(0),s=0;s<i.length;s++)i[s](t)}}}},2:function(e,t,i){"use strict";function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n=new function(){this.isNumber=function(e){return!!(("number"==typeof e||"string"==typeof e)&isFinite(e))},this.toNumber=function(e){return!!this.isNumber(e)&&+e},this.isDOMEl=function(e){return!(!this.isObject(e)||e.constructor===Object||!this.isNumber(e.nodeType)||1!=+e.nodeType)},this.isObject=function(e){return"object"===s(e)&&null!==e},this.isArray=function(e){return!(!this.isObject(e)||e.constructor!==Array)}};t.a=n},92:function(e,t,i){"use strict";i.r(t);var s=i(1),n=i(2);function a(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var o=n.a,l=s.a,u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.minLimit=0,this.maxLimit=100,this.valuesCount=this.maxLimit-this.minLimit,this.singleValue=50,this.rangeValueMin=20,this.rangeValueMax=80,this.singleSelected=(this.singleValue-this.minLimit)/this.valuesCount*100,this.rangeSelected=(this.rangeValueMax-this.rangeValueMin)/this.valuesCount*100,this.step=1,this.type="single",this.typeConstants={singleValue:"single",rangeValue:"range"},this._addEvents()}var t,i,s;return t=e,(i=[{key:"recalculateValue",value:function(){return this.type===this.typeConstants.singleValue?this.setSingleValue(null,!0):this.type===this.typeConstants.rangeValue?this.setRangeValue(null,!0):void 0}},{key:"setAValueTo",value:function(e,t,i){var s=Math.round(+e/this.step)*this.step;s<this.minLimit?(this[t]=this.minLimit,i||console.log("The value was equated to the minimum, because it is less than the minimum value.")):s>this.maxLimit?(this[t]=this.maxLimit,i||console.log("The value was equated to the maximum, because it is more than the maximum value.")):this[t]=s}},{key:"setType",value:function(e){for(var t in this.typeConstants)if(e===this.typeConstants[t])return this.type=e,this.typeUpdateEvent.trigger({type:this.type,typeConstants:Object.assign({},this.typeConstants)}),{type:this.type,typeConstants:Object.assign({},this.typeConstants)}}},{key:"setLimits",value:function(e,t){o.isObject(e)||(e={});var i=o.isNumber(e.minLimit)?+e.minLimit:this.minLimit,s=o.isNumber(e.maxLimit)?+e.maxLimit:this.maxLimit;return i<s&&(this.minLimit=i,this.maxLimit=s),i===s&&(this.minLimit=i,this.maxLimit=s+1,t||console.log("Maximum limit was increased by 1, because the minimum limit is equal to the maximum limit.")),i>s&&(this.minLimit=s,this.maxLimit=i,t||console.log("Limits was reversed, because the maximum limit is less than the minimum limit.")),this.valuesCount=this.maxLimit-this.minLimit,this.limitsUpdateEvent.trigger({minLimit:this.minLimit,maxLimit:this.maxLimit,valuesCount:this.valuesCount}),{minLimit:this.minLimit,maxLimit:this.maxLimit,valuesCount:this.valuesCount}}},{key:"setStep",value:function(e){if(o.isNumber(e)&&!(+e<=0))return this.step=+e,this.stepUpdateEvent.trigger(this.step),this.step}},{key:"setSingleValue",value:function(e,t){return e=o.isNumber(e)?+e:this.singleValue,this.setAValueTo(e,"singleValue",t),this.singleSelected=(this.singleValue-this.minLimit)/this.valuesCount*100,this.valueUpdateEvent.trigger({value:this.singleValue,selected:this.singleSelected}),{value:this.singleValue,selected:this.singleSelected}}},{key:"setRangeValue",value:function(e,t){o.isObject(e)||(e={});var i=o.isNumber(e.minValue)?+e.minValue:this.rangeValueMin,s=o.isNumber(e.maxValue)?+e.maxValue:this.rangeValueMax;if(i===s&&(s+=this.step,t||console.log("The maximum value was increased by step size, because minimum value is equal to maximum value.")),i>s){var n=s;s=i,i=n,t||console.log("The values was reversed, because maximum value is less than minimum value.")}return this.setAValueTo(i,"rangeValueMin",t),this.setAValueTo(s,"rangeValueMax",t),this.rangeSelected=(this.rangeValueMax-this.rangeValueMin)/this.valuesCount*100,this.valueUpdateEvent.trigger({minValue:this.rangeValueMin,maxValue:this.rangeValueMax,selected:this.rangeSelected}),{minValue:this.rangeValueMin,maxValue:this.rangeValueMax,selected:this.rangeSelected}}},{key:"setNearestValue",value:function(e,t,i){if(o.isNumber(e)){e=!1===t?Math.round(+e):Math.round(this.valuesCount*+e/100+this.minLimit);return this.type===this.typeConstants.singleValue?this.setSingleValue(e,i):this.type===this.typeConstants.rangeValue?e<(this.rangeValueMin+this.rangeValueMax)/2?this.setRangeValue({minValue:+e},!0):this.setRangeValue({maxValue:+e},!0):void 0}}},{key:"getType",value:function(){return{type:this.type,typeConstants:Object.assign({},this.typeConstants)}}},{key:"getLimits",value:function(){return{minLimit:this.minLimit,maxLimit:this.maxLimit,valuesCount:this.valuesCount}}},{key:"getStep",value:function(){return this.step}},{key:"getValue",value:function(){return this.type===this.typeConstants.singleValue?{value:this.singleValue,selected:this.singleSelected}:this.type===this.typeConstants.rangeValue?{minValue:this.rangeValueMin,maxValue:this.rangeValueMax,selected:this.rangeSelected}:void 0}},{key:"_addEvents",value:function(){this.valueUpdateEvent=l(),this.limitsUpdateEvent=l(),this.stepUpdateEvent=l(),this.percentageUpdateEvent=l(),this.typeUpdateEvent=l()}}])&&a(t.prototype,i),s&&a(t,s),e}();function h(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var d=s.a,r=n.a,v=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.roots=document.body,this.divisionsCount=5,this.valueNoteDisplay=!0,this.theme={value:"default",className:"theme",oldValue:null},this.direction={value:"horizontal",className:"direction",oldValue:null},this.directionConstants={horizontalValue:"horizontal",verticalValue:"vertical"},(this.base=document.createElement("div")).classList.add("wrunner"),(this.outer=document.createElement("div")).classList.add("wrunner__outer"),(this.path=document.createElement("div")).classList.add("wrunner__path"),(this.pathPassed=document.createElement("div")).classList.add("wrunner__pathPassed"),(this.handle=document.createElement("div")).classList.add("wrunner__handle"),(this.handleMin=document.createElement("div")).classList.add("wrunner__handle"),(this.handleMax=document.createElement("div")).classList.add("wrunner__handle"),(this.valueNote=document.createElement("div")).classList.add("wrunner__valueNote"),(this.valueNoteMin=document.createElement("div")).classList.add("wrunner__valueNote"),(this.valueNoteMax=document.createElement("div")).classList.add("wrunner__valueNote"),(this.divisions=document.createElement("div")).classList.add("wrunner__divisions"),this.divisionsList=[],this._buildBaseDOM(),this._addEvents(),this._addListenners()}var t,i,s;return t=e,(i=[{key:"updateDOM",value:function(e){e.type===e.typeConstants.singleValue&&(this.handleMin.remove(),this.handleMax.remove(),this.valueNoteMin.remove(),this.valueNoteMax.remove(),this.path.appendChild(this.handle),this.outer.appendChild(this.valueNote)),e.type===e.typeConstants.rangeValue&&(this.handle.remove(),this.valueNote.remove(),this.path.appendChild(this.handleMin),this.path.appendChild(this.handleMax),this.outer.appendChild(this.valueNoteMin),this.outer.appendChild(this.valueNoteMax))}},{key:"append",value:function(){return this.roots.appendChild(this.base),this.roots}},{key:"applyStyles",value:function(){for(var e=[this.theme,this.direction],t=[this.base,this.outer,this.path,this.pathPassed,this.divisions,this.handle,this.handleMin,this.handleMax,this.valueNote,this.valueNoteMin,this.valueNoteMax].concat(this.divisionsList),i=0;i<t.length;i++){var s=t[i];for(var n in e){var a=t[i].classList[0],o=e[n].oldValue,l=e[n].value;o&&s.classList.remove(a+"_"+e[n].className+"_"+o),s.classList.add(a+"_"+e[n].className+"_"+l)}}}},{key:"drawValue",value:function(e,t,i){for(var s,n,a=e.selected,o=this.direction.value,l=this.directionConstants,u=i.type,h=i.typeConstants,d=[this.pathPassed,this.handle,this.handleMin,this.handleMax,this.valueNote,this.valueNoteMin,this.valueNoteMax],r=0;r<d.length;r++)d[r].style.cssText="";u===h.singleValue&&(this.valueNote.innerHTML=e.value,o===l.horizontalValue&&(this.pathPassed.style.width=a+"%",this.handle.style.left=a+"%",s=this.path.offsetWidth,n=this.valueNote.offsetWidth,this.valueNote.style.left=(s*a/100-n/2)/s*100+"%"),o===l.verticalValue&&(this.pathPassed.style.height=a+"%",this.handle.style.top=100-a+"%",s=this.path.offsetHeight,n=this.valueNote.offsetHeight,this.valueNote.style.top=100-(s*a/100+n/2)/s*100+"%"));if(u===h.rangeValue){var v,p,m=(e.minValue-t.minLimit)/t.valuesCount*100;this.valueNoteMin.innerHTML=e.minValue,this.valueNoteMax.innerHTML=e.maxValue,o===l.horizontalValue&&(this.pathPassed.style.width=a+"%",this.pathPassed.style.left=m+"%",this.handleMin.style.left=m+"%",this.handleMax.style.left=m+a+"%",s=this.path.offsetWidth,v=this.valueNoteMin.offsetWidth,p=this.valueNoteMax.offsetWidth,this.valueNoteMin.style.left=(s*m/100-v/2)/s*100+"%",this.valueNoteMax.style.left=(s*(m+a)/100-p/2)/s*100+"%"),o===l.verticalValue&&(this.pathPassed.style.height=a+"%",this.pathPassed.style.top=100-a-m+"%",this.handleMax.style.top=100-m-a+"%",this.handleMin.style.top=100-m+"%",s=this.path.offsetHeight,v=this.valueNoteMin.offsetHeight,p=this.valueNoteMax.offsetHeight,this.valueNoteMin.style.top=100-(s*m/100+v/2)/s*100+"%",this.valueNoteMax.style.top=100-(s*(m+a)/100+p/2)/s*100+"%")}}},{key:"applyValueNoteDisplay",value:function(){for(var e=[this.valueNote,this.valueNoteMin,this.valueNoteMax],t=0;t<e.length;t++){var i=e[t].classList[0];e[t].classList.remove(i+"_display_"+(this.valueNoteDisplay?"hidden":"visible")),e[t].classList.add(i+"_display_"+(this.valueNoteDisplay?"visible":"hidden"))}}},{key:"generateDivisions",value:function(){this.divisions.innerHTML="",this.divisionsList.length=0;for(var e=this.divisionsCount;e>0;e--){var t=document.createElement("div");t.classList.add("wrunner__division"),this.divisionsList.push(t),this.divisions.appendChild(t)}}},{key:"setRoots",value:function(e){if(r.isDOMEl(e))return this.roots=e,this.rootsUpdateEvent.trigger(this.roots),this.roots}},{key:"setDivisionsCount",value:function(e,t){if(r.isNumber(e)&&!(e<0))return 1===(e=Math.round(+e))&&(e++,t||console.log("Count was increased by one, cause it may not be equal to one.")),this.divisionsCount=+e,this.divisionsCountUpdateEvent.trigger(this.divisionsCount),this.divisionsCount}},{key:"setTheme",value:function(e){if("string"==typeof e)return this.theme.oldValue=this.theme.value,this.theme.value=e,this.themeUpdateEvent.trigger(this.theme.value),this.theme.value}},{key:"setDirection",value:function(e){if("string"==typeof e)for(var t in this.directionConstants)if(e===this.directionConstants[t])return this.direction.oldValue=this.direction.value,this.direction.value=e,this.directionUpdateEvent.trigger({value:this.direction.value,constants:Object.assign({},this.directionConstants)}),{value:this.direction.value,constants:Object.assign({},this.directionConstants)}}},{key:"setValueNoteDisplay",value:function(e){if("boolean"==typeof e)return this.valueNoteDisplay=e,this.valueNoteDisplayUpdateEvent.trigger(this.valueNoteDisplay),this.valueNoteDisplay}},{key:"getRoots",value:function(){return this.roots}},{key:"getTheme",value:function(){return this.theme.value}},{key:"getDirection",value:function(){return{value:this.direction.value,constants:Object.assign({},this.directionConstants)}}},{key:"getValueNoteDisplay",value:function(){return this.valueNoteDisplay}},{key:"getDivisionsCount",value:function(){return this.divisionsCount}},{key:"_buildBaseDOM",value:function(){this.base.appendChild(this.outer),this.outer.appendChild(this.path),this.path.appendChild(this.pathPassed),this.outer.appendChild(this.divisions)}},{key:"_addEvents",value:function(){this.UIMouseActionEvent=d(),this.rootsUpdateEvent=d(),this.themeUpdateEvent=d(),this.directionUpdateEvent=d(),this.valueNoteDisplayUpdateEvent=d(),this.divisionsCountUpdateEvent=d()}},{key:"_addListenners",value:function(){this.path.addEventListener("mousedown",this._mouseActionHandler.bind(this))}},{key:"_mouseActionHandler",value:function(e){var t=!1,i=function(e){var t,i,s,n,a=this.direction.value,o=this.directionConstants;a===o.horizontalValue&&(t=this.path.offsetWidth,i=this.path.getBoundingClientRect().left,n=e.clientX);a===o.verticalValue&&(t=this.path.offsetHeight,i=this.path.getBoundingClientRect().top,n=e.clientY);if(s=i+t,n<i-10||n>s+10)return;a===o.horizontalValue&&this.UIMouseActionEvent.trigger((n-i)/t*100);a===o.verticalValue&&this.UIMouseActionEvent.trigger(100-(n-i)/t*100)}.bind(this),s=function(e){var s=e.target;if(document.body.removeEventListener("mousemove",i),t)return;if(s===this.handle||s===this.handleMin||s===this.handleMax)return;i(e)}.bind(this);document.body.addEventListener("mousemove",function(){return t=!0},{once:!0}),document.body.addEventListener("mousemove",i),document.body.addEventListener("mouseup",s,{once:!0})}}])&&h(t.prototype,i),s&&h(t,s),e}();function p(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var m=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=t||{},this.model=t.model,this.view=t.view,this._applyDefaultEvents(),this._applyUserEvents(t.userOptions),this._applyUserOptions(t.userOptions),this._initInstance(),this._triggerEvents()}var t,i,s;return t=e,(i=[{key:"_applyDefaultEvents",value:function(){this.model.typeUpdateEvent.addHandler(function(e){this.view.updateDOM(this.model.getType()),this.model.recalculateValue()}.bind(this)),this.model.limitsUpdateEvent.addHandler(function(e){this.model.recalculateValue()}.bind(this)),this.model.stepUpdateEvent.addHandler(function(e){this.model.recalculateValue()}.bind(this)),this.model.valueUpdateEvent.addHandler(function(e){this.view.drawValue(this.model.getValue(),this.model.getLimits(),this.model.getType())}.bind(this)),this.view.rootsUpdateEvent.addHandler(function(e){this.view.append(),this.view.drawValue(this.model.getValue(),this.model.getLimits(),this.model.getType())}.bind(this)),this.view.UIMouseActionEvent.addHandler(function(e){this.model.setNearestValue(e,!0,!0)}.bind(this)),this.view.themeUpdateEvent.addHandler(function(e){this.view.applyStyles(),this.view.drawValue(this.model.getValue(),this.model.getLimits(),this.model.getType())}.bind(this)),this.view.directionUpdateEvent.addHandler(function(e){this.view.applyStyles(),this.view.drawValue(this.model.getValue(),this.model.getLimits(),this.model.getType())}.bind(this)),this.view.valueNoteDisplayUpdateEvent.addHandler(function(e){this.view.applyValueNoteDisplay(),this.view.drawValue(this.model.getValue(),this.model.getLimits(),this.model.getType())}.bind(this)),this.view.divisionsCountUpdateEvent.addHandler(function(e){this.view.generateDivisions(),this.view.applyStyles()}.bind(this))}},{key:"_initInstance",value:function(){this.view.updateDOM(this.model.getType()),this.view.generateDivisions(),this.view.applyValueNoteDisplay(),this.view.applyStyles(),this.view.append()}},{key:"_applyUserEvents",value:function(e){void 0!==(e=e||{}).onTypeUpdate&&this.onTypeUpdate(e.onTypeUpdate),void 0!==e.onLimitsUpdate&&this.onLimitsUpdate(e.onLimitsUpdate),void 0!==e.onStepUpdate&&this.onStepUpdate(e.onStepUpdate),void 0!==e.onValueUpdate&&this.onValueUpdate(e.onValueUpdate),void 0!==e.onRootsUpdate&&this.onRootsUpdate(e.onRootsUpdate),void 0!==e.onThemeUpdate&&this.onThemeUpdate(e.onThemeUpdate),void 0!==e.onDirectionUpdate&&this.onDirectionUpdate(e.onDirectionUpdate),void 0!==e.onDivisionsCountUpdate&&this.onDivisionsCountUpdate(e.onDivisionsCountUpdate),void 0!==e.onValueNoteDisplayUpdate&&this.onValueNoteDisplayUpdate(e.onValueNoteDisplayUpdate)}},{key:"_applyUserOptions",value:function(e){void 0!==(e=e||{}).type&&this.model.setType(e.type),void 0!==e.limits&&this.model.setLimits(e.limits),void 0!==e.step&&this.model.setStep(e.step),void 0!==e.singleValue&&this.model.setSingleValue(e.singleValue),void 0!==e.rangeValue&&this.model.setRangeValue(e.rangeValue),void 0!==e.roots&&this.view.setRoots(e.roots),void 0!==e.theme&&this.view.setTheme(e.theme),void 0!==e.direction&&this.view.setDirection(e.direction),void 0!==e.divisionsCount&&this.view.setDivisionsCount(e.divisionsCount),void 0!==e.valueNoteDisplay&&this.view.setValueNoteDisplay(e.valueNoteDisplay)}},{key:"_triggerEvents",value:function(){this.model.type==this.model.typeConstants.singleValue&&this.model.valueUpdateEvent.trigger({value:this.model.singleValue,selected:this.model.singleSelected}),this.model.type==this.model.typeConstants.rangeValue&&this.model.valueUpdateEvent.trigger({minValue:this.model.rangeMinValue,maxValue:this.model.rangeMaxValue,selected:this.model.rangeSelected}),this.model.typeUpdateEvent.trigger({type:this.model.type,typeConstants:Object.assign({},this.model.typeConstants)}),this.model.stepUpdateEvent.trigger(this.model.step),this.model.limitsUpdateEvent.trigger({minLimit:this.model.minLimit,maxLimit:this.model.maxLimit,valuesCount:this.model.valuesCount}),this.view.themeUpdateEvent.trigger(this.view.theme.value),this.view.directionUpdateEvent.trigger({value:this.view.direction.value,constants:Object.assign({},this.view.directionConstants)}),this.view.valueNoteDisplayUpdateEvent.trigger(this.view.valueNoteDisplay),this.view.rootsUpdateEvent.trigger(this.view.roots),this.view.divisionsCountUpdateEvent.trigger(this.view.divisionsCount)}},{key:"onValueUpdate",value:function(e){this.model.valueUpdateEvent.addHandler(e)}},{key:"onStepUpdate",value:function(e){this.model.stepUpdateEvent.addHandler(e)}},{key:"onLimitsUpdate",value:function(e){this.model.limitsUpdateEvent.addHandler(e)}},{key:"onTypeUpdate",value:function(e){this.model.typeUpdateEvent.addHandler(e)}},{key:"onThemeUpdate",value:function(e){this.view.themeUpdateEvent.addHandler(e)}},{key:"onDirectionUpdate",value:function(e){this.view.directionUpdateEvent.addHandler(e)}},{key:"onValueNoteDisplayUpdate",value:function(e){this.view.valueNoteDisplayUpdateEvent.addHandler(e)}},{key:"onRootsUpdate",value:function(e){this.view.rootsUpdateEvent.addHandler(e)}},{key:"onDivisionsCountUpdate",value:function(e){this.view.divisionsCountUpdateEvent.addHandler(e)}}])&&p(t.prototype,i),s&&p(t,s),e}();function c(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}window.wRunner=function(e){e=e||{};var t=new function(){this.Model=u,this.View=v,this.Presenter=m};return function(){var i=new t.Model,s=new t.View,n=new t.Presenter({model:i,view:s,userOptions:e}),a={setType:i.setType.bind(i),setLimits:i.setLimits.bind(i),setStep:i.setStep.bind(i),setSingleValue:i.setSingleValue.bind(i),setRangeValue:i.setRangeValue.bind(i),setNearestValue:i.setNearestValue.bind(i),setRoots:s.setRoots.bind(s),setTheme:s.setTheme.bind(s),setDirection:s.setDirection.bind(s),setValueNoteDisplay:s.setValueNoteDisplay.bind(s),setDivisionsCount:s.setDivisionsCount.bind(s)},o={getType:i.getType.bind(i),getLimits:i.getLimits.bind(i),getStep:i.getStep.bind(i),getValue:i.getValue.bind(i),getRoots:s.getRoots.bind(s),getTheme:s.getTheme.bind(s),getDirection:s.getDirection.bind(s),getValueNoteDisplay:s.getValueNoteDisplay.bind(s),getDivisionsCount:s.getDivisionsCount.bind(s)},l={onTypeUpdate:n.onTypeUpdate.bind(n),onLimitsUpdate:n.onLimitsUpdate.bind(n),onStepUpdate:n.onStepUpdate.bind(n),onValueUpdate:n.onValueUpdate.bind(n),onRootsUpdate:n.onRootsUpdate.bind(n),onThemeUpdate:n.onThemeUpdate.bind(n),onDirectionUpdate:n.onDirectionUpdate.bind(n),onDivisionsCountUpdate:n.onDivisionsCountUpdate.bind(n),onValueNoteDisplayUpdate:n.onValueNoteDisplayUpdate.bind(n)};return function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},s=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(i).filter(function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable}))),s.forEach(function(t){c(e,t,i[t])})}return e}({},a,o,l)}()}}});