(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors"],{

/***/ "./dev/vendors/wrunner.js":
/*!********************************!*\
  !*** ./dev/vendors/wrunner.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var wRunner = function wRunner() {
  this.structure = function () {
    this.model = function () {};

    this.view = function () {};

    this.presenter = function (model, view) {};
  };
};

wRunner.helper = {
  isNumber: function isNumber(value, exceps) {
    var exceps = exceps ? exceps : [];

    for (var i = 0; i < exceps.length; i++) {
      if (_typeof(value) === exceps[i]) return true;
    }

    ;
    if (typeof value === 'number' && !Number.isNaN(+value) || typeof value === 'string' && typeof +value === 'number' && !Number.isNaN(+value)) return true;
    return false;
  },
  toNumber: function toNumber(value) {
    if (typeof value === 'number' && !Number.isNaN(+value) || typeof value === 'string' && typeof +value === 'number' && !Number.isNaN(+value)) return +value;
    return false;
  },
  isDomEl: function isDomEl(el) {
    if (_typeof(el) !== 'object' || Number.isNaN(el) || el === null) return false;
    return 'ownerDocument' in el ? true : false;
  },
  isObject: function isObject(el) {
    if (_typeof(el) === 'object' && el !== null && !Number.isNaN(el)) return true;
    return false;
  },
  isArray: function isArray(el) {
    if (_typeof(el) === 'object' && el !== null && !Number.isNaN(el) && el.length) return true;
    return false;
  }
}; // Observer

wRunner.makeEvent = function () {
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
}; // MODEL


wRunner.Model = function () {
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
  this.typeConsts = {
    singleValue: 'single',
    rangeValue: 'range'
  };
  this.valueByProgressCalculatedEvent = wRunner.makeEvent();
  this.valueChangedEvent = wRunner.makeEvent();
  this.rangeChangedEvent = wRunner.makeEvent();
  this.stepChangedEvent = wRunner.makeEvent();
  this.percentageChangedEvent = wRunner.makeEvent();
  this.typeChangedEvent = wRunner.makeEvent();
};

wRunner.Model.prototype = {
  setRange: function setRange(min, max, auto) {
    // If any argument does not fit, it will take a current value.
    var min = wRunner.helper.isNumber(min) ? +min : this.minLimit,
        max = wRunner.helper.isNumber(max) ? +max : this.maxLimit; // If minLimit > maxLimit, it will reverse them.

    if (min <= max) {
      this.minLimit = min;
      this.maxLimit = max;
    } else {
      this.minLimit = max;
      this.maxLimit = min;
      if (!auto) console.log('Values have been reversed, because the minimum value is less than the maximum value.');
    } // Update count of values.


    this.valuesCount = this.maxLimit - this.minLimit;
    this.rangeChangedEvent.trigger({
      minLimit: this.rangeMinValue,
      maxLimit: this.maxLimit,
      valuesCount: this.valuesCount
    });
    return {
      minLimit: this.minLimit,
      maxLimit: this.maxLimit,
      valuesCount: this.valuesCount
    };
  },
  getRange: function getRange() {
    return {
      minLimit: this.minLimit,
      maxLimit: this.maxLimit,
      valuesCount: this.valuesCount
    };
  },
  setValue: function setValue(newValue, auto) {
    var set = setTo.bind(this);

    if (this.type == this.typeConsts.singleValue) {
      var val = wRunner.helper.isNumber(newValue) ? +newValue : this.singleValue;
      set(val, 'singleValue'); // Update selected

      this.singleSelected = (this.singleValue - this.minLimit) / this.valuesCount * 100; // Returns

      this.valueChangedEvent.trigger({
        value: this.singleValue,
        selected: this.singleSelected
      });
      return {
        value: this.singleValue,
        selected: this.singleSelected
      };
    }

    if (this.type == this.typeConsts.rangeValue) {
      // If new value is a object
      if (wRunner.helper.isObject(newValue)) {
        var min = wRunner.helper.isNumber(newValue.minValue) ? +newValue.minValue : this.rangeMinValue;
        var max = wRunner.helper.isNumber(newValue.maxValue) ? +newValue.maxValue : this.rangeMaxValue;

        if (min > max) {
          var clone = max;
          max = min;
          min = clone;
        }

        set(min, 'rangeMinValue');
        set(max, 'rangeMaxValue');
      } // If new value is a number


      if (wRunner.helper.isNumber(newValue)) {
        // Choosing a value to set 
        if (newValue < (this.rangeMaxValue + this.rangeMinValue) / 2) {
          set(+newValue, 'rangeMinValue');
        } else {
          set(+newValue, 'rangeMaxValue');
        }
      } // Update selected


      this.rangeSelected = (this.rangeMaxValue - this.rangeMinValue) / this.valuesCount * 100; // Returns

      this.valueChangedEvent.trigger({
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
    if (this.type == this.typeConsts.singleValue) {
      return {
        value: this.singleValue,
        selected: this.singleSelected
      };
    }

    if (this.type == this.typeConsts.rangeValue) {
      return {
        minValue: this.rangeMinValue,
        maxValue: this.rangeMaxValue,
        selected: this.rangeSelected
      };
    }
  },
  setStep: function setStep(newStep) {
    if (!wRunner.helper.isNumber(newStep) || newStep <= 0) return;
    this.step = +newStep;
    this.stepChangedEvent.trigger(this.step);
    return this.step;
  },
  getStep: function getStep() {
    return this.step;
  },
  // Function that calculating new value by click or drag.
  setValueByProgress: function setValueByProgress(progress) {
    if (!wRunner.helper.isNumber(progress)) return;
    var value = Math.round(this.valuesCount * +progress / 100 + this.minLimit);
    this.valueByProgressCalculatedEvent.trigger(value);
    return value;
  },
  setType: function setType(type) {
    if (type !== this.typeConsts.singleValue && type !== this.typeConsts.rangeValue) return;
    this.type = type;
    this.typeChangedEvent.trigger(this.type);
    return this.type;
  },
  getType: function getType() {
    return {
      type: this.type,
      typeConsts: this.typeConsts
    };
  },
  getValuesCount: function getValuesCount() {
    return this.valuesCount;
  }
}; // VIEW

wRunner.View = function () {
  // Defaults
  this.roots = document.body;
  this.divisionsCount = 5;
  this.valueNoteDisplay = true;
  this.styles = {
    theme: {
      value: 'default',
      sign: 'theme',
      oldValue: null
    },
    direction: {
      value: 'horizontal',
      sign: 'direction',
      oldValue: null
    }
  };
  this.stylesConsts = {
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

  this.mouseDownEvent = wRunner.makeEvent();
  this.draggEvent = wRunner.makeEvent();
  this.clickEvent = wRunner.makeEvent();
  this.calculatedValueToUpdateEvent = wRunner.makeEvent();
  this.stylesChangedEvent = wRunner.makeEvent();
  this.stylesAppliedEvent = wRunner.makeEvent();
  this.valueNoteDisplayChangedEvent = wRunner.makeEvent();
  this.rootsChangedEvent = wRunner.makeEvent();
  this.divisionsCountChangedEvent = wRunner.makeEvent();
  this.valueNoteDisplayAppliedEvent = wRunner.makeEvent();
  this.baseDOMGeneratedEvent = wRunner.makeEvent();
  this.DOMUpdatedEvent = wRunner.makeEvent(); // Listenners

  this.path.addEventListener('mousedown', function (event) {
    this.mouseDownEvent.trigger(event);
  }.bind(this));
};

wRunner.View.prototype = {
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

    if (type.type == type.typeConsts.singleValue) {
      this.path.appendChild(this.handle);
      this.outer.appendChild(this.valueNote);
    }

    if (type.type == type.typeConsts.rangeValue) {
      this.path.appendChild(this.handleMin);
      this.path.appendChild(this.handleMax);
      this.outer.appendChild(this.valueMinNote);
      this.outer.appendChild(this.valueMaxNote);
    }

    this.DOMUpdatedEvent.trigger();
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

      if (dir == this.stylesConsts.direction.horizontalValue) {
        scale = this.path.offsetWidth;
        min = this.path.getBoundingClientRect().left;
        pos = event.clientX;
      }

      if (dir == this.stylesConsts.direction.verticalValue) {
        scale = this.path.offsetHeight;
        min = this.path.getBoundingClientRect().top;
        pos = event.clientY;
      }

      max = min + scale; // If the dragg is out of slider's range, the function stops.

      if (pos < min - 10 || pos > max + 10) return;

      if (dir == this.stylesConsts.direction.horizontalValue) {
        this.calculatedValueToUpdateEvent.trigger((pos - min) / scale * 100);
      }

      if (dir == this.stylesConsts.direction.verticalValue) {
        this.calculatedValueToUpdateEvent.trigger(100 - (pos - min) / scale * 100);
      }
    }

    ;
  },
  append: function append() {
    this.roots.appendChild(this.base);
    return this.roots;
  },
  setRoots: function setRoots(roots) {
    if (!wRunner.helper.isDomEl(roots)) return;
    this.roots = roots;
    this.rootsChangedEvent.trigger();
    return this.roots;
  },
  getRoots: function getRoots() {
    return this.roots;
  },
  generateDivisions: function generateDivisions() {
    this.divisions.innerHTML = '';
    this.divisionsList.length = 0;

    for (var i = this.divisionsCount; i > 0; i--) {
      var a = document.createElement('div');
      a.classList.add('wrunner__division');
      this.divisionsList.push(a);
      this.divisions.appendChild(a);
    }

    this.els = this.divisionsList.concat(this.stableElsList);
    return this.divisionsList;
  },
  setDivisionsCount: function setDivisionsCount(count, auto) {
    if (!wRunner.helper.isNumber(count) || count < 0) return;

    if (count == 1) {
      count++;
      if (!auto) console.log('Count was increased by one, cause it may not be equal to one.');
    }

    ;
    this.divisionsCount = +count;
    this.divisionsCountChangedEvent.trigger(this.divisionsCount);
    return this.divisionsCount;
  },
  drawValue: function drawValue(value, limits, currentType) {
    var pathScale, valueNoteScale;
    var selected = value.selected;
    var dir = this.styles.direction.value,
        dirConsts = this.stylesConsts.direction;
    var type = currentType.type,
        typeConsts = currentType.typeConsts;
    this.pathPassed.style.cssText = "";
    this.handle.style.cssText = "";
    this.handleMin.style.cssText = "";
    this.handleMax.style.cssText = "";
    this.valueNote.style.cssText = "";
    this.valueMinNote.style.cssText = "";
    this.valueMaxNote.style.cssText = ""; // Value Note

    this.valueNote.innerHTML = value.value;
    this.valueMinNote.innerHTML = value.minValue;
    this.valueMaxNote.innerHTML = value.maxValue;

    if (type == typeConsts.singleValue) {
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

    if (type == typeConsts.rangeValue) {
      var start = (value.minValue - limits.minLimit) / limits.valuesCount * 100;

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
    if (!wRunner.helper.isObject(newStyles)) return;
    var changedStyles = {};

    for (prop in newStyles) {
      if (!(prop in this.styles)) continue;
      var mutable = this.styles[prop];
      var wasChanged = false;

      if (newStyles[prop].value !== undefined) {
        if (this.stylesConsts[prop]) {
          for (var defs in this.stylesConsts[prop]) {
            if (newStyles[prop].value == this.stylesConsts[prop][defs]) {
              mutable.oldValue = mutable.value;
              mutable.value = newStyles[prop].value;
              wasChanged = true;
              break;
            }
          }
        }
      }

      if (typeof newStyles[prop].sign == 'string') {
        mutable.sign = newStyles[prop].sign;
        wasChanged = true;
      }

      if (wasChanged) changedStyles[prop] = mutable;
    }

    this.stylesChangedEvent.trigger(this.styles);
    return this.styles;
  },
  applyStyles: function applyStyles() {
    var styles = this.styles;

    for (var i = this.els.length - 1; i >= 0; i--) {
      var el = this.els[i];

      for (prop in styles) {
        var mark = this.els[i].classList[0],
            oldValue = styles[prop].oldValue,
            value = styles[prop].value;
        if (oldValue) el.classList.remove(mark + '_' + styles[prop].sign + '_' + oldValue);
        if (value) el.classList.add(mark + '_' + styles[prop].sign + '_' + value);
      }
    }

    this.stylesAppliedEvent.trigger(this.styles);
    return this.styles;
  },
  addStyles: function addStyles(addedStyles) {
    if (!wRunner.helper.isObject(addedStyles)) return;
    var styles = this.styles;

    for (prop in addedStyles) {
      if (!addedStyles[prop].value) continue;
      styles[prop] = {};
      styles[prop].value = addedStyles[prop].value;
      styles[prop].oldValue = null;

      if (!addedStyles[prop].sign) {
        styles[prop].sign = prop;
      } else {
        styles[prop].sign = addedStyles[prop].sign;
      }
    }

    this.stylesChangedEvent.trigger(this.styles);
    return this.styles;
  },
  removeStyles: function removeStyles(list) {
    if (!wRunner.helper.isArray(list)) return;

    for (var i = 0; i < list.length; i++) {
      delete this.styles[list[i]];
    }

    this.stylesChangedEvent.trigger(this.styles);
    return this.styles;
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
    this.valueNoteDisplayChangedEvent.trigger(this.valueNoteDisplay);
    return this.valueNoteDisplay;
  },
  getValueNoteDisplay: function getValueNoteDisplay() {
    return this.valueNoteDisplay;
  }
}; // PRESENTER

wRunner.Presenter = function (options) {
  var options = options ? options : {};
  this.model = options.model;
  this.view = options.view; // Model events

  this.model.stepChangedEvent.addHandler(function (data) {
    this.model.setValue(null, true);
  }.bind(this));
  this.model.valueByProgressCalculatedEvent.addHandler(function (data) {
    this.model.setValue(data, true);
  }.bind(this));
  this.model.valueChangedEvent.addHandler(function (data) {
    this.view.drawValue(this.model.getValue(), this.model.getRange(), this.model.getType());
  }.bind(this));
  this.model.rangeChangedEvent.addHandler(function (data) {
    this.model.setValue(null, true);
  }.bind(this));
  this.model.typeChangedEvent.addHandler(function (data) {
    this.view.updateDOM(this.model.getType());
  }.bind(this)); // View events

  this.view.baseDOMGeneratedEvent.addHandler(function (data) {
    this.view.updateDOM(this.model.getType());
  }.bind(this));
  this.view.DOMUpdatedEvent.addHandler(function (data) {
    this.view.drawValue(this.model.getValue(), this.model.getRange(), this.model.getType());
  }.bind(this));
  this.view.mouseDownEvent.addHandler(function (data) {
    this.view.action(data);
  }.bind(this));
  this.view.calculatedValueToUpdateEvent.addHandler(function (data) {
    this.model.setValueByProgress(data, true);
  }.bind(this));
  this.view.stylesChangedEvent.addHandler(function (data) {
    this.view.applyStyles();
    this.view.drawValue(this.model.getValue(), this.model.getRange(), this.model.getType());
  }.bind(this));
  this.view.valueNoteDisplayChangedEvent.addHandler(function (data) {
    this.view.applyValueNoteDisplay();
    this.view.drawValue(this.model.getValue(), this.model.getRange(), this.model.getType());
  }.bind(this));
  this.view.rootsChangedEvent.addHandler(function (data) {
    this.view.append();
  }.bind(this));
  this.view.divisionsCountChangedEvent.addHandler(function (data) {
    this.view.generateDivisions();
  }.bind(this));
};

wRunner.Presenter.prototype = {
  draw: function draw(options) {
    options = options ? options : {};
    this.view.append();
    this.view.generateDivisions();
    this.view.applyStyles();
    this.view.applyValueNoteDisplay();
    this.view.drawValue(this.model.getValue(), this.model.getRange(), this.model.getType());
  },
  removeStyles: function removeStyles(list) {
    for (var i = 0; i < list.length; i++) {
      this.view.setStyles(_defineProperty({}, list[i], {
        value: null
      }));
    }

    this.view.applyStyles();
    this.view.removeStyles(list);
  }
}; // EXPORT

module.exports = wRunner;

/***/ })

}]);