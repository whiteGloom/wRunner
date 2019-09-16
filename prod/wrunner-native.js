/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/wrunner-native.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/wrunner-native.js":
/*!*******************************!*\
  !*** ./src/wrunner-native.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var wRunner = function wRunner(options) {
  var options = options ? options : {};
  var helper = new function () {
    this.isNumber = function (value, exceps) {
      var exceps = exceps ? exceps : [];

      for (var i = 0; i < exceps.length; i++) {
        if (_typeof(value) === exceps[i]) return true;
      }

      ;
      if (!Number.isNaN(+value) && (typeof value === 'number' && !Number.isNaN(+value) || typeof value === 'string' && typeof +value === 'number')) return true;
      return false;
    }, this.toNumber = function (value) {
      if (typeof value === 'number' && !Number.isNaN(+value) || typeof value === 'string' && typeof +value === 'number' && !Number.isNaN(+value)) return +value;
      return false;
    }, this.isDomEl = function (el) {
      if (_typeof(el) !== 'object' || Number.isNaN(el) || el === null) return false;
      return 'ownerDocument' in el ? true : false;
    }, this.isObject = function (el) {
      if (_typeof(el) === 'object' && el !== null && !Number.isNaN(el)) return true;
      return false;
    }, this.isArray = function (el) {
      if (_typeof(el) === 'object' && el !== null && !Number.isNaN(el) && el.length) return true;
      return false;
    };
  }();
  var structure = new function () {
    // Model
    this.Model = function () {
      // Defaults
      this.minLimit = 0;
      this.maxLimit = 100;
      this.valuesCount = this.maxLimit - this.minLimit;
      this.singleValue = 50;
      this.rangeMinValue = 20;
      this.rangeMaxValue = 80;
      this.singleSelected = (this.singleValue - this.minLimit) / this.valuesCount * 100;
      this.rangeSelected = (this.rangeMaxValue - this.rangeMinValue) / this.valuesCount * 100;
      this.step = 1;
      this.type = 'single';
      this.typeConstants = {
        singleValue: 'single',
        rangeValue: 'range'
      };
      this.valueByProgressUpdateEvent = makeEvent();
      this.valueUpdateEvent = makeEvent();
      this.limitsUpdateEvent = makeEvent();
      this.stepUpdateEvent = makeEvent();
      this.percentageUpdateEvent = makeEvent();
      this.typeUpdateEvent = makeEvent();
    };

    this.Model.prototype = {
      setLimits: function setLimits(newLimits, auto) {
        // If any argument does not fit, it will take a current value.
        var min = helper.isNumber(newLimits.minLimit) ? +newLimits.minLimit : this.minLimit,
            max = helper.isNumber(newLimits.maxLimit) ? +newLimits.maxLimit : this.maxLimit; // If minLimit > maxLimit, it will reverse them.

        if (min <= max) {
          this.minLimit = min;
          this.maxLimit = max;
        } else {
          this.minLimit = max;
          this.maxLimit = min;
          if (!auto) console.log('Values have been reversed, because the minimum value is less than the maximum value.');
        } // Update count of values.


        this.valuesCount = this.maxLimit - this.minLimit;
        this.limitsUpdateEvent.trigger({
          minLimit: this.minLimit,
          maxLimit: this.maxLimit,
          valuesCount: this.valuesCount
        });
        return {
          minLimit: this.minLimit,
          maxLimit: this.maxLimit,
          valuesCount: this.valuesCount
        };
      },
      getLimits: function getLimits() {
        return {
          minLimit: this.minLimit,
          maxLimit: this.maxLimit,
          valuesCount: this.valuesCount
        };
      },
      setValue: function setValue(newValue, auto) {
        var set = setTo.bind(this);

        if (this.type == this.typeConstants.singleValue) {
          var val = helper.isNumber(newValue) ? +newValue : this.singleValue;
          set(val, 'singleValue'); // Update selected

          this.singleSelected = (this.singleValue - this.minLimit) / this.valuesCount * 100; // Returns

          this.valueUpdateEvent.trigger({
            value: this.singleValue,
            selected: this.singleSelected
          });
          return {
            value: this.singleValue,
            selected: this.singleSelected
          };
        }

        if (this.type == this.typeConstants.rangeValue) {
          // If new value is a object
          if (helper.isObject(newValue) || newValue == null) {
            if (newValue == null) {
              var min = this.rangeMinValue;
              var max = this.rangeMaxValue;
            } else {
              var min = helper.isNumber(newValue.minValue) ? +newValue.minValue : this.rangeMinValue;
              var max = helper.isNumber(newValue.maxValue) ? +newValue.maxValue : this.rangeMaxValue;
            }

            if (min > max) {
              var clone = max;
              max = min;
              min = clone;
            }

            set(min, 'rangeMinValue');
            set(max, 'rangeMaxValue');
          } // If new value is a number


          if (helper.isNumber(newValue)) {
            // Choosing a value to set 
            if (newValue < (this.rangeMaxValue + this.rangeMinValue) / 2) {
              set(+newValue, 'rangeMinValue');
            } else {
              set(+newValue, 'rangeMaxValue');
            }
          } // Update selected


          this.rangeSelected = (this.rangeMaxValue - this.rangeMinValue) / this.valuesCount * 100; // Returns

          this.valueUpdateEvent.trigger({
            minValue: this.rangeMinValue,
            maxValue: this.rangeMaxValue,
            selected: this.rangeSelected
          });
          return {
            minValue: this.rangeMinValue,
            maxValue: this.rangeMaxValue,
            selected: this.rangeSelected
          };
        } // Setter


        function setTo(newValue, mutable) {
          var stepped; // Calculating stepped value.

          if (+newValue != this[mutable]) {
            stepped = this[mutable] - Math.round((this[mutable] - +newValue) / this.step) * this.step;
          } else {
            stepped = Math.round(this[mutable] / this.step) * this.step;
          }

          if (stepped < this.minLimit) {
            this[mutable] = this.minLimit;
            if (!auto) console.log('The value was equated to the minimum, because it is less than the minimum value.');
          } else if (stepped > this.maxLimit) {
            this[mutable] = this.maxLimit;
            if (!auto) console.log('The value was equated to the maximum, because it is more than the maximum value.');
          } else {
            this[mutable] = stepped;
          }

          ;
        }
      },
      getValue: function getValue() {
        if (this.type == this.typeConstants.singleValue) {
          return {
            value: this.singleValue,
            selected: this.singleSelected
          };
        }

        if (this.type == this.typeConstants.rangeValue) {
          return {
            minValue: this.rangeMinValue,
            maxValue: this.rangeMaxValue,
            selected: this.rangeSelected
          };
        }
      },
      setStep: function setStep(newStep) {
        if (!helper.isNumber(newStep) || newStep <= 0) return;
        this.step = +newStep;
        this.stepUpdateEvent.trigger(this.step);
        return this.step;
      },
      getStep: function getStep() {
        return this.step;
      },
      // Function that calculating new value by click or drag.
      setValueByProgress: function setValueByProgress(progress) {
        if (!helper.isNumber(progress)) return;
        var value = Math.round(this.valuesCount * +progress / 100 + this.minLimit);
        this.valueByProgressUpdateEvent.trigger(value);
        return value;
      },
      setType: function setType(type) {
        var exist = false;

        for (var constant in this.typeConstants) {
          if (type === this.typeConstants[constant]) {
            exist = true;
            break;
          }
        }

        if (!exist) return;
        this.type = type;
        this.typeUpdateEvent.trigger(this.type);

        if (this.type == this.typeConstants.singleValue) {
          this.valueUpdateEvent.trigger({
            value: this.value,
            selected: this.singleSelected
          });
        }

        if (this.type == this.typeConstants.rangeValue) {
          this.valueUpdateEvent.trigger({
            minValue: this.minValue,
            maxValue: this.maxValue,
            selected: this.rangeSelected
          });
        }

        return this.type;
      },
      getType: function getType() {
        return {
          type: this.type,
          typeConstants: Object.assign({}, this.typeConstants)
        };
      }
    }; // View

    this.View = function () {
      // Defaults
      this.roots = document.body;
      this.divisionsCount = 5;
      this.valueNoteDisplay = true;
      this.styles = {
        theme: {
          value: 'default',
          className: 'theme',
          oldValue: null
        },
        direction: {
          value: 'horizontal',
          className: 'direction',
          oldValue: null
        }
      };
      this.stylesConstants = {
        direction: {
          horizontalValue: 'horizontal',
          verticalValue: 'vertical'
        } // Lists of els

      };
      this.stableElsList = [];
      this.divisionsList = [];
      this.els = []; // Stable elements
      // Base

      this.base = document.createElement('div');
      this.stableElsList.push(this.base); // Outer

      this.outer = document.createElement('div');
      this.stableElsList.push(this.outer); // Path

      this.path = document.createElement('div');
      this.stableElsList.push(this.path); // Passed path

      this.pathPassed = document.createElement('div');
      this.stableElsList.push(this.pathPassed); // Path handles

      this.handle = document.createElement('div');
      this.stableElsList.push(this.handle);
      this.handleMin = document.createElement('div');
      this.stableElsList.push(this.handleMin);
      this.handleMax = document.createElement('div');
      this.stableElsList.push(this.handleMax); // Path values

      this.valueNote = document.createElement('div');
      this.stableElsList.push(this.valueNote);
      this.valueMinNote = document.createElement('div');
      this.stableElsList.push(this.valueMinNote);
      this.valueMaxNote = document.createElement('div');
      this.stableElsList.push(this.valueMaxNote); // Division's container

      this.divisions = document.createElement('div');
      this.stableElsList.push(this.divisions); // EVENTS

      this.mouseDownEvent = makeEvent();
      this.draggEvent = makeEvent();
      this.clickEvent = makeEvent();
      this.UIValueActionEvent = makeEvent();
      this.stylesUpdateEvent = makeEvent();
      this.stylesAppliedEvent = makeEvent();
      this.valueNoteDisplayUpdateEvent = makeEvent();
      this.rootsUpdateEvent = makeEvent();
      this.divisionsCountUpdateEvent = makeEvent();
      this.valueNoteDisplayAppliedEvent = makeEvent();
      this.baseDOMGeneratedEvent = makeEvent();
      this.DOMUpdateEvent = makeEvent(); // Listenners

      this.path.addEventListener('mousedown', function (event) {
        this.mouseDownEvent.trigger(event);
      }.bind(this));
    };

    this.View.prototype = {
      generateBaseDOM: function generateBaseDOM() {
        // Base
        this.base.classList.add('wrunner'); // Outer

        this.outer.classList.add('wrunner__outer'); // Path

        this.path.classList.add('wrunner__path'); // Passed path

        this.pathPassed.classList.add('wrunner__pathPassed'); // Path handles

        this.handle.classList.add('wrunner__handle');
        this.handleMin.classList.add('wrunner__handle');
        this.handleMax.classList.add('wrunner__handle'); // Path values

        this.valueNote.classList.add('wrunner__valueNote');
        this.valueMinNote.classList.add('wrunner__valueNote');
        this.valueMaxNote.classList.add('wrunner__valueNote'); // Division's container

        this.divisions.classList.add('wrunner__divisions');
        this.baseDOMGeneratedEvent.trigger();
      },
      updateDOM: function updateDOM(type) {
        this.path.innerHTML = '';
        this.outer.innerHTML = '';
        this.base.appendChild(this.outer);
        this.outer.appendChild(this.path);
        this.path.appendChild(this.pathPassed);
        this.outer.appendChild(this.divisions);

        if (type.type == type.typeConstants.singleValue) {
          this.path.appendChild(this.handle);
          this.outer.appendChild(this.valueNote);
        }

        if (type.type == type.typeConstants.rangeValue) {
          this.path.appendChild(this.handleMin);
          this.path.appendChild(this.handleMax);
          this.outer.appendChild(this.valueMinNote);
          this.outer.appendChild(this.valueMaxNote);
        }

        this.DOMUpdateEvent.trigger();
      },
      action: function action(event) {
        var dragged = false,
            moveBind = move.bind(this); // The handler that indicates that the handle has been dragged.

        document.body.addEventListener('mousemove', function () {
          return dragged = true;
        }, {
          once: true
        });
        document.body.addEventListener('mousemove', moveBind); // The handler that called after click's end.

        document.body.addEventListener('mouseup', function (upEvent) {
          var targ = upEvent.target; // Removing bind.

          document.body.removeEventListener('mousemove', moveBind); // If handle was dragged, stop the function.

          if (dragged) return;
          if (targ == this.handle || targ == this.handleMin || targ == this.handleMax) return; // Else trigger a click

          hanlder.call(this, upEvent);
          this.clickEvent.trigger();
        }.bind(this), {
          once: true
        }); // Helpers

        function move(eventMove) {
          hanlder.call(this, eventMove);
          this.draggEvent.trigger(event);
        }

        ;

        function hanlder(event) {
          var scale, min, max, pos;
          var dir = this.styles.direction.value;

          if (dir == this.stylesConstants.direction.horizontalValue) {
            scale = this.path.offsetWidth;
            min = this.path.getBoundingClientRect().left;
            pos = event.clientX;
          }

          if (dir == this.stylesConstants.direction.verticalValue) {
            scale = this.path.offsetHeight;
            min = this.path.getBoundingClientRect().top;
            pos = event.clientY;
          }

          max = min + scale; // If the dragg is out of slider's range, the function stops.

          if (pos < min - 10 || pos > max + 10) return;

          if (dir == this.stylesConstants.direction.horizontalValue) {
            this.UIValueActionEvent.trigger((pos - min) / scale * 100);
          }

          if (dir == this.stylesConstants.direction.verticalValue) {
            this.UIValueActionEvent.trigger(100 - (pos - min) / scale * 100);
          }
        }

        ;
      },
      append: function append() {
        this.roots.appendChild(this.base);
        return this.roots;
      },
      setRoots: function setRoots(roots) {
        if (!helper.isDomEl(roots)) return;
        this.roots = roots; //console.log(this.roots)

        this.rootsUpdateEvent.trigger(this.roots);
        return this.roots;
      },
      getRoots: function getRoots() {
        return this.roots;
      },
      generateDivisions: function generateDivisions() {
        this.divisions.innerHTML = '';
        this.divisionsList.length = 0;

        for (var i = this.divisionsCount; i > 0; i--) {
          var instance = document.createElement('div');
          instance.classList.add('wrunner__division');
          this.divisionsList.push(instance);
          this.divisions.appendChild(instance);
        }

        this.els = this.divisionsList.concat(this.stableElsList);
        return this.divisionsList;
      },
      setDivisionsCount: function setDivisionsCount(count, auto) {
        if (!helper.isNumber(count) || count < 0) return;
        var count = Math.round(count);

        if (count == 1) {
          count++;
          if (!auto) console.log('Count was increased by one, cause it may not be equal to one.');
        }

        ;
        this.divisionsCount = +count;
        this.divisionsCountUpdateEvent.trigger(this.divisionsCount);
        return this.divisionsCount;
      },
      getDivisionsCount: function getDivisionsCount() {
        return this.divisionsCount;
      },
      drawValue: function drawValue(value, limits, currentType) {
        var pathScale, valueNoteScale;
        var selected = value.selected;
        var dir = this.styles.direction.value,
            dirConsts = this.stylesConstants.direction;
        var type = currentType.type,
            typeConstants = currentType.typeConstants;
        this.pathPassed.style.cssText = "";
        this.handle.style.cssText = "";
        this.handleMin.style.cssText = "";
        this.handleMax.style.cssText = "";
        this.valueNote.style.cssText = "";
        this.valueMinNote.style.cssText = "";
        this.valueMaxNote.style.cssText = "";

        if (type == typeConstants.singleValue) {
          this.valueNote.innerHTML = value.value;

          if (dir == dirConsts.horizontalValue) {
            // Passed path
            this.pathPassed.style.width = selected + '%'; // Handle

            this.handle.style.left = selected + '%';
            pathScale = this.path.offsetWidth;
            valueNoteScale = this.valueNote.offsetWidth;
            this.valueNote.style.left = (pathScale * selected / 100 - valueNoteScale / 2) / pathScale * 100 + '%';
          }

          if (dir == dirConsts.verticalValue) {
            // Passed path
            this.pathPassed.style.height = selected + '%'; // Handle

            this.handle.style.top = 100 - selected + '%';
            pathScale = this.path.offsetHeight;
            valueNoteScale = this.valueNote.offsetHeight;
            this.valueNote.style.top = 100 - (pathScale * selected / 100 + valueNoteScale / 2) / pathScale * 100 + '%';
          }
        }

        if (type == typeConstants.rangeValue) {
          var start = (value.minValue - limits.minLimit) / limits.valuesCount * 100;
          this.valueMinNote.innerHTML = value.minValue;
          this.valueMaxNote.innerHTML = value.maxValue;

          if (dir == dirConsts.horizontalValue) {
            // Passed path
            this.pathPassed.style.width = selected + '%';
            this.pathPassed.style.left = start + '%'; // Handle

            this.handleMin.style.left = start + '%';
            this.handleMax.style.left = start + selected + '%';
            pathScale = this.path.offsetWidth;
            valueMinNoteScale = this.valueMinNote.offsetWidth;
            valueMaxNoteScale = this.valueMaxNote.offsetWidth;
            this.valueMinNote.style.left = (pathScale * start / 100 - valueMinNoteScale / 2) / pathScale * 100 + '%';
            this.valueMaxNote.style.left = (pathScale * (start + selected) / 100 - valueMaxNoteScale / 2) / pathScale * 100 + '%';
          }

          if (dir == dirConsts.verticalValue) {
            this.pathPassed.style.height = selected + '%';
            this.pathPassed.style.top = 100 - selected - start + '%'; // Handle

            this.handleMax.style.top = 100 - start - selected + '%';
            this.handleMin.style.top = 100 - start + '%';
            pathScale = this.path.offsetHeight;
            valueMinNoteScale = this.valueMinNote.offsetHeight;
            valueMaxNoteScale = this.valueMaxNote.offsetHeight;
            this.valueMinNote.style.top = 100 - (pathScale * start / 100 + valueMinNoteScale / 2) / pathScale * 100 + '%';
            this.valueMaxNote.style.top = 100 - (pathScale * (start + selected) / 100 + valueMaxNoteScale / 2) / pathScale * 100 + '%';
          }
        }

        return value;
      },
      setStyles: function setStyles(newStyles) {
        if (!helper.isObject(newStyles)) return;
        var changed = false;

        for (prop in newStyles) {
          if (!(prop in this.styles)) continue;
          var mutable = this.styles[prop];

          if (newStyles[prop].value !== undefined) {
            if (this.stylesConstants[prop]) {
              for (var defs in this.stylesConstants[prop]) {
                if (newStyles[prop].value == this.stylesConstants[prop][defs]) {
                  mutable.oldValue = mutable.value;
                  mutable.value = newStyles[prop].value;
                  changed = true;
                  break;
                }
              }
            } else {
              mutable.oldValue = mutable.value;
              mutable.value = newStyles[prop].value;
              changed = true;
            }
          }

          if (typeof newStyles[prop].className == 'string') {
            mutable.className = newStyles[prop].className;
            changed = true;
          }
        }

        if (!changed) return;
        this.stylesUpdateEvent.trigger(Object.assign({}, this.styles));
        return Object.assign({}, this.styles);
      },
      applyStyles: function applyStyles() {
        var styles = this.styles;

        for (var i = this.els.length - 1; i >= 0; i--) {
          var el = this.els[i];

          for (prop in styles) {
            var mark = this.els[i].classList[0],
                oldValue = styles[prop].oldValue,
                value = styles[prop].value;
            if (oldValue) el.classList.remove(mark + '_' + styles[prop].className + '_' + oldValue);
            if (value) el.classList.add(mark + '_' + styles[prop].className + '_' + value);
          }
        }

        this.stylesAppliedEvent.trigger(Object.assign({}, this.styles));
        return Object.assign({}, this.styles);
      },
      getStyles: function getStyles() {
        return {
          styles: Object.assign({}, this.styles),
          stylesConstants: Object.assign({}, this.stylesConstants)
        };
      },
      applyValueNoteDisplay: function applyValueNoteDisplay() {
        var mark = this.valueNote.classList[0];
        var els = [this.valueNote, this.valueMinNote, this.valueMaxNote];

        for (var i = els.length - 1; i >= 0; i--) {
          els[i].classList.remove(mark + '_display_' + (!this.valueNoteDisplay ? 'visible' : 'hidden'));
          els[i].classList.add(mark + '_display_' + (this.valueNoteDisplay ? 'visible' : 'hidden'));
        }

        this.valueNoteDisplayAppliedEvent.trigger(this.valueNoteDisplay);
        return this.valueNoteDisplay;
      },
      setValueNoteDisplay: function setValueNoteDisplay(value) {
        if (typeof value !== 'boolean') return;
        this.valueNoteDisplay = value;
        this.valueNoteDisplayUpdateEvent.trigger(this.valueNoteDisplay);
        return this.valueNoteDisplay;
      },
      getValueNoteDisplay: function getValueNoteDisplay() {
        return this.valueNoteDisplay;
      }
    }; // Presenter

    this.Presenter = function (parts) {
      var parts = parts ? parts : {};
      this.model = parts.model;
      this.view = parts.view; // Model events

      this.model.stepUpdateEvent.addHandler(function (data) {
        this.model.setValue(null, true);
      }.bind(this));
      this.model.valueByProgressUpdateEvent.addHandler(function (data) {
        this.model.setValue(data, true);
      }.bind(this));
      this.model.valueUpdateEvent.addHandler(function (data) {
        this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
      }.bind(this));
      this.model.limitsUpdateEvent.addHandler(function (data) {
        this.model.setValue(null, true);
      }.bind(this));
      this.model.typeUpdateEvent.addHandler(function (data) {
        this.view.updateDOM(this.model.getType());
      }.bind(this)); // View events

      this.view.baseDOMGeneratedEvent.addHandler(function (data) {
        this.view.updateDOM(this.model.getType());
      }.bind(this));
      this.view.DOMUpdateEvent.addHandler(function (data) {
        this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
      }.bind(this));
      this.view.mouseDownEvent.addHandler(function (data) {
        this.view.action(data);
      }.bind(this));
      this.view.UIValueActionEvent.addHandler(function (data) {
        this.model.setValueByProgress(data, true);
      }.bind(this));
      this.view.stylesUpdateEvent.addHandler(function (data) {
        this.view.applyStyles();
        this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
      }.bind(this));
      this.view.valueNoteDisplayUpdateEvent.addHandler(function (data) {
        this.view.applyValueNoteDisplay();
        this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
      }.bind(this));
      this.view.rootsUpdateEvent.addHandler(function (data) {
        this.view.append();
      }.bind(this));
      this.view.divisionsCountUpdateEvent.addHandler(function (data) {
        this.view.generateDivisions();
        this.view.applyStyles();
      }.bind(this));
    };

    this.Presenter.prototype = {
      onValueUpdate: function onValueUpdate(handler) {
        this.model.valueUpdateEvent.addHandler(handler);
      },
      onStepUpdate: function onStepUpdate(handler) {
        this.model.stepUpdateEvent.addHandler(handler);
      },
      onLimitsUpdate: function onLimitsUpdate(handler) {
        this.model.limitsUpdateEvent.addHandler(handler);
      },
      onTypeUpdate: function onTypeUpdate(handler) {
        this.model.typeUpdateEvent.addHandler(handler);
      },
      onStylesUpdate: function onStylesUpdate(handler) {
        this.view.stylesUpdateEvent.addHandler(handler);
      },
      onValueNoteDisplayUpdate: function onValueNoteDisplayUpdate(handler) {
        this.view.valueNoteDisplayUpdateEvent.addHandler(handler);
      },
      onRootsUpdate: function onRootsUpdate(handler) {
        this.view.rootsUpdateEvent.addHandler(handler);
      },
      onDivisionsCountUpdate: function onDivisionsCountUpdate(handler) {
        this.view.divisionsCountUpdateEvent.addHandler(handler);
      } // Event handler

    };

    function makeEvent() {
      // List of a handlers that will process a event.
      var handlers = []; // Add a new handler.

      var addHandler = function addHandler(handler) {
        if (typeof handler !== 'function') {
          console.log('The handler must be a function');
          return;
        }

        ;

        for (var i = 0; i < handlers.length; i++) {
          if (handlers[i] === handler) {
            console.log('The handler already in the list');
            return;
          }
        }

        ;
        handlers.push(handler);
      }; // Remove a handler.


      var removeHandler = function removeHandler(handler) {
        for (var i = 0; i < handlers.length; i++) {
          if (handlers[i] === handler) {
            handlers.splice(i, 1);
            return;
          }
        }

        console.log('could not find observer in list of observers');
      }; // Trigger a event and notify handlers.


      var trigger = function trigger(data) {
        var handlersClone = handlers.slice(0);

        for (var i = 0; i < handlersClone.length; i++) {
          handlersClone[i](data);
        }
      }; // Methods of new event.


      return {
        addHandler: addHandler,
        removeHandler: removeHandler,
        trigger: trigger
      };
    }
  }();
  return newInstance();

  function newInstance() {
    var model = new structure.Model(),
        view = new structure.View(),
        presenter = new structure.Presenter({
      model: model,
      view: view
    });
    runInstance();
    applyOptions();
    triggerEvents();
    return {
      setType: model.setType.bind(model),
      setLimits: model.setLimits.bind(model),
      setValue: model.setValue.bind(model),
      setStep: model.setStep.bind(model),
      getType: model.getType.bind(model),
      getLimits: model.getLimits.bind(model),
      getValue: model.getValue.bind(model),
      getStep: model.getStep.bind(model),
      setRoots: view.setRoots.bind(view),
      setStyles: view.setStyles.bind(view),
      setValueNoteDisplay: view.setValueNoteDisplay.bind(view),
      setDivisionsCount: view.setDivisionsCount.bind(view),
      getRoots: view.getRoots.bind(view),
      getStyles: view.getStyles.bind(view),
      getValueNoteDisplay: view.getValueNoteDisplay.bind(view),
      getDivisionsCount: view.getDivisionsCount.bind(view),
      onValueUpdate: presenter.onValueUpdate.bind(presenter),
      onStylesUpdate: presenter.onStylesUpdate.bind(presenter),
      onValueNoteDisplayUpdate: presenter.onValueNoteDisplayUpdate.bind(presenter),
      onRootsUpdate: presenter.onRootsUpdate.bind(presenter),
      onStepUpdate: presenter.onStepUpdate.bind(presenter),
      onLimitsUpdate: presenter.onLimitsUpdate.bind(presenter),
      onTypeUpdate: presenter.onTypeUpdate.bind(presenter),
      onDivisionsCountUpdate: presenter.onDivisionsCountUpdate.bind(presenter)
    };

    function runInstance() {
      // View
      view.generateBaseDOM();
      view.generateDivisions();
      view.append();
      view.applyValueNoteDisplay();
      view.applyStyles();
      view.drawValue(model.getValue(), model.getLimits(), model.getType());
    }

    ;

    function applyOptions() {
      // Model
      if (options.step !== undefined) model.setStep(options.step);
      if (options.type !== undefined) model.setType(options.type);
      if (options.limits !== undefined) model.setLimits(options.limits);
      if (options.value !== undefined) model.setValue(options.value); // View

      if (options.roots !== undefined) view.setRoots(options.roots);
      if (options.divisionsCount !== undefined) view.setDivisionsCount(options.divisionsCount);
      if (options.valueNoteDisplay !== undefined) view.setValueNoteDisplay(options.valueNoteDisplay);
      if (options.styles !== undefined) view.setStyles(options.styles); // Events

      if (options.onStepUpdate !== undefined) presenter.onStepUpdate(options.onStepUpdate);
      if (options.onTypeUpdate !== undefined) presenter.onTypeUpdate(options.onTypeUpdate);
      if (options.onLimitsUpdate !== undefined) presenter.onLimitsUpdate(options.onLimitsUpdate);
      if (options.onValueUpdate !== undefined) presenter.onValueUpdate(options.onValueUpdate);
      if (options.onRootsUpdate !== undefined) presenter.onRootsUpdate(options.onRootsUpdate);
      if (options.onDivisionsCountUpdate !== undefined) presenter.onDivisionsCountUpdate(options.onDivisionsCountUpdate);
      if (options.onValueNoteDisplayUpdate !== undefined) presenter.onValueNoteDisplayUpdate(options.onValueNoteDisplayUpdate);
      if (options.onStylesUpdate !== undefined) presenter.onStylesUpdate(options.onStylesUpdate);
    }

    ;

    function triggerEvents() {
      if (model.type == model.typeConstants.singleValue) {
        model.valueUpdateEvent.trigger({
          value: model.value,
          selected: model.singleSelected
        });
      }

      if (model.type == model.typeConstants.rangeValue) {
        model.valueUpdateEvent.trigger({
          minValue: model.minValue,
          maxValue: model.maxValue,
          selected: model.rangeSelected
        });
      }

      model.typeUpdateEvent.trigger(model.type);
      model.stepUpdateEvent.trigger(model.step);
      ;
      model.limitsUpdateEvent.trigger({
        minLimit: model.minLimit,
        maxLimit: model.maxLimit,
        valuesCount: model.valuesCount
      });
      view.stylesUpdateEvent.trigger(Object.assign({}, view.styles));
      view.valueNoteDisplayUpdateEvent.trigger(view.valueNoteDisplay);
      view.rootsUpdateEvent.trigger(view.roots);
      view.divisionsCountUpdateEvent.trigger(view.divisionsCount);
    }

    ;
  }

  ;
}; // EXPORT


module.exports = wRunner;

/***/ })

/******/ });