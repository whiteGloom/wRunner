!function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=91)}({1:function(e,t,i){"use strict";t.a=function(){var e=[];return{addHandler:function(t){if("function"==typeof t){for(var i=0;i<e.length;i++)if(e[i]===t)return void console.log("The handler already in the list");e.push(t)}else console.log("The handler must be a function")},removeHandler:function(t){for(var i=0;i<e.length;i++)if(e[i]===t)return void e.splice(i,1);console.log("could not find observer in list of observers")},trigger:function(t){for(var i=e.slice(0),s=0;s<i.length;s++)i[s](t)}}}},2:function(e,t,i){"use strict";function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n=new function(){this.isNumber=function(e){return!!(("number"==typeof e||"string"==typeof e)&isFinite(e))},this.toNumber=function(e){return!!this.isNumber(e)&&+e},this.isDOMEl=function(e){return!(!this.isObject(e)||e.constructor===Object||!this.isNumber(e.nodeType)||1!=+e.nodeType)},this.isObject=function(e){return"object"===s(e)&&null!==e},this.isArray=function(e){return!(!this.isObject(e)||e.constructor!==Array)}};t.a=n},91:function(e,t,i){"use strict";i.r(t);var s=i(1),n=i(2);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var l=n.a,u=s.a,h=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.minLimit=0,this.maxLimit=100,this.valuesCount=this.maxLimit-this.minLimit,this.singleValue=50,this.rangeValueMin=20,this.rangeValueMax=80,this.singleSelected=(this.singleValue-this.minLimit)/this.valuesCount*100,this.rangeSelected=(this.rangeValueMax-this.rangeValueMin)/this.valuesCount*100,this.step=1,this.type="single",this.typeConstants={singleValue:"single",rangeValue:"range"},this.addEvents()}var t,i,s;return t=e,(i=[{key:"addEvents",value:function(){this.valueUpdateEvent=u(),this.limitsUpdateEvent=u(),this.stepUpdateEvent=u(),this.percentageUpdateEvent=u(),this.typeUpdateEvent=u()}},{key:"setLimits",value:function(e,t){e=e||{};var i=l.isNumber(e.minLimit)?+e.minLimit:this.minLimit,s=l.isNumber(e.maxLimit)?+e.maxLimit:this.maxLimit;return i<s&&(this.minLimit=i,this.maxLimit=s),i===s&&(this.minLimit=i,this.maxLimit=s+1,t||console.log("Maximum limit was increased by 1, because the minimum limit is equal to the maximum limit.")),i>s&&(this.minLimit=s,this.maxLimit=i,t||console.log("Limits was reversed, because the maximum limit is less than the minimum limit.")),this.valuesCount=this.maxLimit-this.minLimit,this.limitsUpdateEvent.trigger({minLimit:this.minLimit,maxLimit:this.maxLimit,valuesCount:this.valuesCount}),{minLimit:this.minLimit,maxLimit:this.maxLimit,valuesCount:this.valuesCount}}},{key:"getLimits",value:function(){return{minLimit:this.minLimit,maxLimit:this.maxLimit,valuesCount:this.valuesCount}}},{key:"setSingleValue",value:function(e,t){return e=l.isNumber(e)?+e:this.singleValue,this.setAValueTo(e,"singleValue",t),this.singleSelected=(this.singleValue-this.minLimit)/this.valuesCount*100,this.valueUpdateEvent.trigger({value:this.singleValue,selected:this.singleSelected}),{value:this.singleValue,selected:this.singleSelected}}},{key:"setRangeValue",value:function(e,t){var i,s;if("object"!==a(e)||null==e?(i=this.rangeValueMin,s=this.rangeValueMax):(i=l.isNumber(e.minValue)?+e.minValue:this.rangeValueMin,s=l.isNumber(e.maxValue)?+e.maxValue:this.rangeValueMax),i===s&&(s+=this.step,t||console.log("The maximum value was increased by step size, because minimum value is equal to maximum value.")),i>s){var n=s;s=i,i=n,t||console.log("The values was reversed, because maximum value is less than minimum value.")}return this.setAValueTo(i,"rangeValueMin",t),this.setAValueTo(s,"rangeValueMax",t),this.rangeSelected=(this.rangeValueMax-this.rangeValueMin)/this.valuesCount*100,this.valueUpdateEvent.trigger({minValue:this.rangeValueMin,maxValue:this.rangeValueMax,selected:this.rangeSelected}),{minValue:this.rangeValueMin,maxValue:this.rangeValueMax,selected:this.rangeSelected}}},{key:"recalculateValue",value:function(){return this.type===this.typeConstants.singleValue?this.setSingleValue(null,!0):this.type===this.typeConstants.rangeValue?this.setRangeValue(null,!0):void 0}},{key:"setNearestValueViaPercents",value:function(e){if(l.isNumber(e)){var t=Math.round(this.valuesCount*+e/100+this.minLimit);return this.type===this.typeConstants.singleValue?this.setSingleValue(t,!0):this.type===this.typeConstants.rangeValue?t<(this.rangeValueMin+this.rangeValueMax)/2?this.setRangeValue({minValue:+t},!0):this.setRangeValue({maxValue:+t},!0):void 0}}},{key:"setAValueTo",value:function(e,t,i){var s=Math.round(+e/this.step)*this.step;s<this.minLimit?(this[t]=this.minLimit,i||console.log("The value was equated to the minimum, because it is less than the minimum value.")):s>this.maxLimit?(this[t]=this.maxLimit,i||console.log("The value was equated to the maximum, because it is more than the maximum value.")):this[t]=s}},{key:"getValue",value:function(){return this.type==this.typeConstants.singleValue?{value:this.singleValue,selected:this.singleSelected}:this.type==this.typeConstants.rangeValue?{minValue:this.rangeValueMin,maxValue:this.rangeValueMax,selected:this.rangeSelected}:void 0}},{key:"setStep",value:function(e){if(l.isNumber(e)&&!(+e<=0))return this.step=+e,this.stepUpdateEvent.trigger(this.step),this.step}},{key:"getStep",value:function(){return this.step}},{key:"setType",value:function(e){var t=!1;for(var i in this.typeConstants)if(e===this.typeConstants[i]){t=!0;break}if(t)return this.type=e,this.typeUpdateEvent.trigger(this.type),this.type}},{key:"getType",value:function(){return{type:this.type,typeConstants:Object.assign({},this.typeConstants)}}}])&&o(t.prototype,i),s&&o(t,s),e}();function d(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var r=s.a,v=n.a,p=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.roots=document.body,this.divisionsCount=5,this.valueNoteDisplay=!0,this.theme={value:"default",className:"theme",oldValue:null},this.direction={value:"horizontal",className:"direction",oldValue:null},this.directionConstants={horizontalValue:"horizontal",verticalValue:"vertical"},(this.base=document.createElement("div")).classList.add("wrunner"),(this.outer=document.createElement("div")).classList.add("wrunner__outer"),(this.path=document.createElement("div")).classList.add("wrunner__path"),(this.pathPassed=document.createElement("div")).classList.add("wrunner__pathPassed"),(this.handle=document.createElement("div")).classList.add("wrunner__handle"),(this.handleMin=document.createElement("div")).classList.add("wrunner__handle"),(this.handleMax=document.createElement("div")).classList.add("wrunner__handle"),(this.valueNote=document.createElement("div")).classList.add("wrunner__valueNote"),(this.valueNoteMin=document.createElement("div")).classList.add("wrunner__valueNote"),(this.valueNoteMax=document.createElement("div")).classList.add("wrunner__valueNote"),(this.divisions=document.createElement("div")).classList.add("wrunner__divisions"),this.divisionsList=[],this.base.appendChild(this.outer),this.addEvents(),this.addListenners()}var t,i,s;return t=e,(i=[{key:"addEvents",value:function(){this.UIValueActionEvent=r(),this.directionUpdateEvent=r(),this.themeUpdateEvent=r(),this.stylesAppliedEvent=r(),this.valueNoteDisplayUpdateEvent=r(),this.rootsUpdateEvent=r(),this.divisionsCountUpdateEvent=r(),this.valueNoteDisplayAppliedEvent=r()}},{key:"addListenners",value:function(){this.path.addEventListener("mousedown",this.mouseAction.bind(this))}},{key:"updateDOM",value:function(e){this.path.innerHTML="",this.outer.innerHTML="",this.outer.appendChild(this.path),this.path.appendChild(this.pathPassed),this.outer.appendChild(this.divisions),e.type==e.typeConstants.singleValue&&(this.path.appendChild(this.handle),this.outer.appendChild(this.valueNote)),e.type==e.typeConstants.rangeValue&&(this.path.appendChild(this.handleMin),this.path.appendChild(this.handleMax),this.outer.appendChild(this.valueNoteMin),this.outer.appendChild(this.valueNoteMax))}},{key:"mouseAction",value:function(e){var t=!1,i=function(e){var t,i,s,n,a=this.direction.value,o=this.directionConstants;a===o.horizontalValue&&(t=this.path.offsetWidth,i=this.path.getBoundingClientRect().left,n=e.clientX);a===o.verticalValue&&(t=this.path.offsetHeight,i=this.path.getBoundingClientRect().top,n=e.clientY);if(s=i+t,n<i-10||n>s+10)return;a===o.horizontalValue&&this.UIValueActionEvent.trigger((n-i)/t*100);a===o.verticalValue&&this.UIValueActionEvent.trigger(100-(n-i)/t*100)}.bind(this),s=function(e){var s=e.target;if(document.body.removeEventListener("mousemove",i),t)return;if(s==this.handle||s==this.handleMin||s==this.handleMax)return;i(e)}.bind(this);document.body.addEventListener("mousemove",function(){return t=!0},{once:!0}),document.body.addEventListener("mousemove",i),document.body.addEventListener("mouseup",s,{once:!0})}},{key:"append",value:function(){return this.roots.appendChild(this.base),this.roots}},{key:"setRoots",value:function(e){if(v.isDOMEl(e))return this.roots=e,this.rootsUpdateEvent.trigger(this.roots),this.roots}},{key:"getRoots",value:function(){return this.roots}},{key:"setDivisionsCount",value:function(e,t){if(v.isNumber(e)&&!(e<0))return 1==(e=Math.round(+e))&&(e++,t||console.log("Count was increased by one, cause it may not be equal to one.")),this.divisionsCount=+e,this.divisionsCountUpdateEvent.trigger(this.divisionsCount),this.divisionsCount}},{key:"generateDivisions",value:function(){this.divisions.innerHTML="",this.divisionsList.length=0;for(var e=this.divisionsCount;e>0;e--){var t=document.createElement("div");t.classList.add("wrunner__division"),this.divisionsList.push(t),this.divisions.appendChild(t)}return this.divisionsList}},{key:"getDivisionsCount",value:function(){return this.divisionsCount}},{key:"drawValue",value:function(e,t,i){for(var s,n,a,o,l=e.selected,u=this.direction.value,h=this.directionConstants,d=i.type,r=i.typeConstants,v=[this.pathPassed,this.handle,this.handleMin,this.handleMax,this.valueNote,this.valueNoteMin,this.valueNoteMax],p=0;p<v.length;p++)v[p].style.cssText="";if(d==r.singleValue&&(this.valueNote.innerHTML=e.value,u==h.horizontalValue&&(this.pathPassed.style.width=l+"%",this.handle.style.left=l+"%",s=this.path.offsetWidth,n=this.valueNote.offsetWidth,this.valueNote.style.left=(s*l/100-n/2)/s*100+"%"),u==h.verticalValue&&(this.pathPassed.style.height=l+"%",this.handle.style.top=100-l+"%",s=this.path.offsetHeight,n=this.valueNote.offsetHeight,this.valueNote.style.top=100-(s*l/100+n/2)/s*100+"%")),d==r.rangeValue){var m=(e.minValue-t.minLimit)/t.valuesCount*100;this.valueNoteMin.innerHTML=e.minValue,this.valueNoteMax.innerHTML=e.maxValue,u==h.horizontalValue&&(this.pathPassed.style.width=l+"%",this.pathPassed.style.left=m+"%",this.handleMin.style.left=m+"%",this.handleMax.style.left=m+l+"%",s=this.path.offsetWidth,a=this.valueNoteMin.offsetWidth,o=this.valueNoteMax.offsetWidth,this.valueNoteMin.style.left=(s*m/100-a/2)/s*100+"%",this.valueNoteMax.style.left=(s*(m+l)/100-o/2)/s*100+"%"),u==h.verticalValue&&(this.pathPassed.style.height=l+"%",this.pathPassed.style.top=100-l-m+"%",this.handleMax.style.top=100-m-l+"%",this.handleMin.style.top=100-m+"%",s=this.path.offsetHeight,a=this.valueNoteMin.offsetHeight,o=this.valueNoteMax.offsetHeight,this.valueNoteMin.style.top=100-(s*m/100+a/2)/s*100+"%",this.valueNoteMax.style.top=100-(s*(m+l)/100+o/2)/s*100+"%")}return e}},{key:"setTheme",value:function(e){if("string"==typeof e)return this.theme.oldValue=this.theme.value,this.theme.value=e,this.themeUpdateEvent.trigger(this.theme.value),this.theme.value}},{key:"getTheme",value:function(){return this.theme.value}},{key:"setDirection",value:function(e){if("string"==typeof e)for(var t in this.directionConstants)if(e===this.directionConstants[t])return this.direction.oldValue=this.direction.value,this.direction.value=e,this.directionUpdateEvent.trigger({value:this.direction.value,constants:this.directionConstants}),{value:this.direction.value,constants:this.directionConstants}}},{key:"getDirection",value:function(){return{value:this.direction.value,constants:this.directionConstants}}},{key:"applyStyles",value:function(){for(var e=[this.theme,this.direction],t=[this.base,this.outer,this.path,this.pathPassed,this.divisions,this.handle,this.handleMin,this.handleMax,this.valueNote,this.valueNoteMin,this.valueNoteMax].concat(this.divisionsList),i=0;i<t.length;i++){var s=t[i];for(var n in e){var a=t[i].classList[0],o=e[n].oldValue,l=e[n].value;o&&s.classList.remove(a+"_"+e[n].className+"_"+o),l&&s.classList.add(a+"_"+e[n].className+"_"+l)}}return this.stylesAppliedEvent.trigger(Object.assign({},this.styles)),Object.assign({},this.styles)}},{key:"setValueNoteDisplay",value:function(e){if("boolean"==typeof e)return this.valueNoteDisplay=e,this.valueNoteDisplayUpdateEvent.trigger(this.valueNoteDisplay),this.valueNoteDisplay}},{key:"applyValueNoteDisplay",value:function(){for(var e=this.valueNote.classList[0],t=[this.valueNote,this.valueNoteMin,this.valueNoteMax],i=t.length-1;i>=0;i--)t[i].classList.remove(e+"_display_"+(this.valueNoteDisplay?"hidden":"visible")),t[i].classList.add(e+"_display_"+(this.valueNoteDisplay?"visible":"hidden"));return this.valueNoteDisplayAppliedEvent.trigger(this.valueNoteDisplay),this.valueNoteDisplay}},{key:"getValueNoteDisplay",value:function(){return this.valueNoteDisplay}}])&&d(t.prototype,i),s&&d(t,s),e}();function m(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),t=t||{},this.model=t.model,this.view=t.view,this.addDefaultEvents(),this.applyUserEvents(t.userOptions),this.applyUserOptions(t.userOptions),this.initInstance(),this.triggerEvents()}var t,i,s;return t=e,(i=[{key:"addDefaultEvents",value:function(){this.model.stepUpdateEvent.addHandler(function(e){this.model.recalculateValue()}.bind(this)),this.model.valueUpdateEvent.addHandler(function(e){this.view.drawValue(this.model.getValue(),this.model.getLimits(),this.model.getType())}.bind(this)),this.model.limitsUpdateEvent.addHandler(function(e){this.model.recalculateValue()}.bind(this)),this.model.typeUpdateEvent.addHandler(function(e){this.view.updateDOM(this.model.getType()),this.model.recalculateValue()}.bind(this)),this.view.UIValueActionEvent.addHandler(function(e){this.model.setNearestValueViaPercents(e,!0)}.bind(this)),this.view.themeUpdateEvent.addHandler(function(e){this.view.applyStyles(),this.view.drawValue(this.model.getValue(),this.model.getLimits(),this.model.getType())}.bind(this)),this.view.directionUpdateEvent.addHandler(function(e){this.view.applyStyles(),this.view.drawValue(this.model.getValue(),this.model.getLimits(),this.model.getType())}.bind(this)),this.view.valueNoteDisplayUpdateEvent.addHandler(function(e){this.view.applyValueNoteDisplay(),this.view.drawValue(this.model.getValue(),this.model.getLimits(),this.model.getType())}.bind(this)),this.view.rootsUpdateEvent.addHandler(function(e){this.view.append()}.bind(this)),this.view.divisionsCountUpdateEvent.addHandler(function(e){this.view.generateDivisions(),this.view.applyStyles()}.bind(this))}},{key:"initInstance",value:function(){this.view.updateDOM(this.model.getType()),this.view.generateDivisions(),this.view.append(),this.view.applyValueNoteDisplay(),this.view.applyStyles(),this.view.drawValue(this.model.getValue(),this.model.getLimits(),this.model.getType())}},{key:"applyUserOptions",value:function(e){void 0!==(e=e||{}).step&&this.model.setStep(e.step),void 0!==e.type&&this.model.setType(e.type),void 0!==e.limits&&this.model.setLimits(e.limits),void 0!==e.singleValue&&this.model.setSingleValue(e.singleValue),void 0!==e.rangeValue&&this.model.setRangeValue(e.rangeValue),void 0!==e.roots&&this.view.setRoots(e.roots),void 0!==e.divisionsCount&&this.view.setDivisionsCount(e.divisionsCount),void 0!==e.valueNoteDisplay&&this.view.setValueNoteDisplay(e.valueNoteDisplay),void 0!==e.theme&&this.view.setTheme(e.theme),void 0!==e.direction&&this.view.setDirection(e.direction)}},{key:"applyUserEvents",value:function(e){void 0!==(e=e||{}).onStepUpdate&&this.onStepUpdate(e.onStepUpdate),void 0!==e.onTypeUpdate&&this.onTypeUpdate(e.onTypeUpdate),void 0!==e.onLimitsUpdate&&this.onLimitsUpdate(e.onLimitsUpdate),void 0!==e.onValueUpdate&&this.onValueUpdate(e.onValueUpdate),void 0!==e.onRootsUpdate&&this.onRootsUpdate(e.onRootsUpdate),void 0!==e.onDivisionsCountUpdate&&this.onDivisionsCountUpdate(e.onDivisionsCountUpdate),void 0!==e.onValueNoteDisplayUpdate&&this.onValueNoteDisplayUpdate(e.onValueNoteDisplayUpdate),void 0!==e.onThemeUpdate&&this.onThemeUpdate(e.onThemeUpdate),void 0!==e.onDirectionUpdate&&this.onDirectionUpdate(e.onDirectionUpdate)}},{key:"triggerEvents",value:function(){this.model.type==this.model.typeConstants.singleValue&&this.model.valueUpdateEvent.trigger({value:this.model.singleValue,selected:this.model.singleSelected}),this.model.type==this.model.typeConstants.rangeValue&&this.model.valueUpdateEvent.trigger({minValue:this.model.rangeMinValue,maxValue:this.model.rangeMaxValue,selected:this.model.rangeSelected}),this.model.typeUpdateEvent.trigger(this.model.type),this.model.stepUpdateEvent.trigger(this.model.step),this.model.limitsUpdateEvent.trigger({minLimit:this.model.minLimit,maxLimit:this.model.maxLimit,valuesCount:this.model.valuesCount}),this.view.themeUpdateEvent.trigger(Object.assign({},this.view.theme)),this.view.directionUpdateEvent.trigger(Object.assign({},this.view.direction)),this.view.valueNoteDisplayUpdateEvent.trigger(this.view.valueNoteDisplay),this.view.rootsUpdateEvent.trigger(this.view.roots),this.view.divisionsCountUpdateEvent.trigger(this.view.divisionsCount)}},{key:"onValueUpdate",value:function(e){this.model.valueUpdateEvent.addHandler(e)}},{key:"onStepUpdate",value:function(e){this.model.stepUpdateEvent.addHandler(e)}},{key:"onLimitsUpdate",value:function(e){this.model.limitsUpdateEvent.addHandler(e)}},{key:"onTypeUpdate",value:function(e){this.model.typeUpdateEvent.addHandler(e)}},{key:"onThemeUpdate",value:function(e){this.view.themeUpdateEvent.addHandler(e)}},{key:"onDirectionUpdate",value:function(e){this.view.directionUpdateEvent.addHandler(e)}},{key:"onValueNoteDisplayUpdate",value:function(e){this.view.valueNoteDisplayUpdateEvent.addHandler(e)}},{key:"onRootsUpdate",value:function(e){this.view.rootsUpdateEvent.addHandler(e)}},{key:"onDivisionsCountUpdate",value:function(e){this.view.divisionsCountUpdateEvent.addHandler(e)}}])&&m(t.prototype,i),s&&m(t,s),e}();window.wRunner=function(e){e=e||{};var t=new function(){this.Model=h,this.View=p,this.Presenter=c};return function(){var i=new t.Model,s=new t.View,n=new t.Presenter({model:i,view:s,userOptions:e});return{setType:i.setType.bind(i),setLimits:i.setLimits.bind(i),setSingleValue:i.setSingleValue.bind(i),setRangeValue:i.setRangeValue.bind(i),setNearestValueViaPercents:i.setNearestValueViaPercents.bind(i),setStep:i.setStep.bind(i),getType:i.getType.bind(i),getLimits:i.getLimits.bind(i),getValue:i.getValue.bind(i),getStep:i.getStep.bind(i),setRoots:s.setRoots.bind(s),setTheme:s.setTheme.bind(s),setDirection:s.setDirection.bind(s),setValueNoteDisplay:s.setValueNoteDisplay.bind(s),setDivisionsCount:s.setDivisionsCount.bind(s),getRoots:s.getRoots.bind(s),getTheme:s.getTheme.bind(s),getDirection:s.getDirection.bind(s),getValueNoteDisplay:s.getValueNoteDisplay.bind(s),getDivisionsCount:s.getDivisionsCount.bind(s),onStepUpdate:n.onStepUpdate.bind(n),onTypeUpdate:n.onTypeUpdate.bind(n),onLimitsUpdate:n.onLimitsUpdate.bind(n),onValueUpdate:n.onValueUpdate.bind(n),onRootsUpdate:n.onRootsUpdate.bind(n),onDivisionsCountUpdate:n.onDivisionsCountUpdate.bind(n),onValueNoteDisplayUpdate:n.onValueNoteDisplayUpdate.bind(n),onThemeUpdate:n.onThemeUpdate.bind(n),onDirectionUpdate:n.onDirectionUpdate.bind(n)}}()}}});