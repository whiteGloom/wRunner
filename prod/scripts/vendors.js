(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors"],{

/***/ "./dev/vendors/wrunner.js":
/*!********************************!*\
  !*** ./dev/vendors/wrunner.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var wRunner = {};
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
  this.minValue = 0;
  this.maxValue = 100;
  this.valuesCount = this.maxValue - this.minValue;
  this.value = 50;
  this.progress = (this.value - this.minValue) / this.valuesCount * 100;
  this.step = 1;
  this.valueByProgressCalculatedEvent = wRunner.makeEvent();
  this.valueUpdatedEvent = wRunner.makeEvent();
  this.rangeUpdatedEvent = wRunner.makeEvent();
};

wRunner.Model.prototype = {
  setRange: function setRange(min, max, auto) {
    // If any argument does not fit, it will take a current value.
    var min = wRunner.helper.isNumber(min) ? +min : this.minValue,
        max = wRunner.helper.isNumber(max) ? +max : this.maxValue; // If minValue < maxValue, it will reverse them.

    if (min <= max) {
      this.minValue = min;
      this.maxValue = max;
    } else {
      this.minValue = max;
      this.maxValue = min;
      if (!auto) console.log('Values have been reversed, because the minimum value is less than the maximum value.');
    } // Update count of values.


    this.valuesCount = this.maxValue - this.minValue;
    this.rangeUpdatedEvent.trigger({
      minValue: this.minValue,
      maxValue: this.maxValue,
      valuesCount: this.valuesCount
    });
    return {
      minValue: this.minValue,
      maxValue: this.maxValue,
      valuesCount: this.valuesCount
    };
  },
  getRange: function getRange() {
    return {
      minValue: this.minValue,
      maxValue: this.maxValue,
      valuesCount: this.valuesCount
    };
  },
  setValue: function setValue(newValue, auto) {
    var newValue = wRunner.helper.isNumber(newValue) ? +newValue : this.value;
    var steppedValue = this.value - Math.round((this.value - newValue) / this.step) * this.step;

    if (steppedValue < this.minValue) {
      this.value = this.minValue;
      if (!auto) console.log('The value was equated to the minimum, because it is less than the minimum value.');
    } else if (steppedValue > this.maxValue) {
      this.value = this.maxValue;
      if (!auto) console.log('The value was equated to the maximum, because it is more than the maximum value.');
    } else {
      this.value = +steppedValue;
    }

    ;
    this.progress = (this.value - this.minValue) / this.valuesCount * 100;
    this.valueUpdatedEvent.trigger({
      value: this.value,
      progress: this.progress
    });
    return {
      value: this.value,
      progress: this.progress
    };
  },
  getValue: function getValue() {
    return {
      value: this.value,
      progress: this.progress
    };
  },
  setStep: function setStep(newStep) {
    if (!wRunner.helper.isNumber(newStep) || newStep <= 0) return;
    this.step = +newStep;
    return this.step;
  },
  getStep: function getStep() {
    return this.step;
  },
  // Function that calculating new value by click or drag;
  calculateValueByProgress: function calculateValueByProgress(progress) {
    if (!wRunner.helper.isNumber(progress)) return;
    var value = Math.round(this.valuesCount * +progress / 100 + this.minValue);
    this.valueByProgressCalculatedEvent.trigger(value);
  }
}; //VIEW

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
  }; // Lists of els

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
  this.stableElsList.push(this.pathPassed); // Path handle

  this.handle = document.createElement('div');
  this.stableElsList.push(this.handle); // Path value

  this.valueNote = document.createElement('div');
  this.stableElsList.push(this.valueNote); // Division's container

  this.divisions = document.createElement('div');
  this.stableElsList.push(this.divisions); // EVENTS

  this.mouseDownEvent = wRunner.makeEvent();
  this.draggEvent = wRunner.makeEvent();
  this.clickEvent = wRunner.makeEvent();
  this.calculatedValueToUpdateEvent = wRunner.makeEvent(); // Listenners

  this.path.addEventListener('mousedown', function (event) {
    this.mouseDownEvent.trigger(event);
  }.bind(this)); // FUNCTIONS

  this.mouseDown = function (event) {
    var dragged = false,
        draggBind = dragg.bind(this); // The handler that indicates that the handle has been dragged.

    document.body.addEventListener('mousemove', function () {
      return dragged = true;
    }, {
      once: true
    });
    document.body.addEventListener('mousemove', draggBind); // The handler that called after click's end.

    document.body.addEventListener('mouseup', function (upEvent) {
      // Removing bind.
      document.body.removeEventListener('mousemove', draggBind);
      if (dragged) return;
      click.call(this, upEvent);
    }.bind(this), {
      once: true
    });
  }; // Function that called if user has changed the value by dragging.


  var dragg = function dragg(event) {
    var scale, min, max, pos;

    if (this.styles.direction.value == 'horizontal') {
      scale = this.path.offsetWidth;
      min = this.path.getBoundingClientRect().left;
      max = min + scale;
      pos = event.clientX;
    } // If the dragg is out of slider's range, the function stops.


    if (pos < min - 10 || pos > max + 10) return;
    this.calculatedValueToUpdateEvent.trigger((pos - min) / scale * 100);
    this.draggEvent.trigger(event);
  }; // Function that called if user has changed the value by clicking.


  var click = function click(event) {
    if (event.target == this.handle) return;
    var pos, scale;

    if (this.styles.direction.value == 'horizontal') {
      pos = event.layerX;
      scale = this.path.offsetWidth;
    }

    this.calculatedValueToUpdateEvent.trigger(pos / scale * 100);
    this.clickEvent.trigger(event);
  };
};

wRunner.View.prototype = {
  generateDOM: function generateDOM() {
    // Base
    this.base.classList.add('wrunner'); // Outer

    this.outer.classList.add('wrunner__outer'); // Path

    this.path.classList.add('wrunner__path'); // Passed path

    this.pathPassed.classList.add('wrunner__pathPassed'); // Path handle

    this.handle.classList.add('wrunner__handle'); // Path value

    this.valueNote.classList.add('wrunner__valueNote'); // Division's container

    this.divisions.classList.add('wrunner__divisions'); // Default tree of stable elements

    this.base.appendChild(this.outer);
    this.outer.appendChild(this.path);
    this.path.appendChild(this.pathPassed);
    this.path.appendChild(this.handle);
    this.outer.appendChild(this.valueNote);
    this.outer.appendChild(this.divisions);
  },
  append: function append() {
    this.roots.appendChild(this.base);
    return this.roots;
  },
  setRoots: function setRoots(roots) {
    if (!wRunner.helper.isDomEl(roots)) return;
    this.roots = roots;
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
    if (wRunner.helper.isNumber(count) && count >= 0) {
      if (count == 1) {
        count++;
        if (!auto) console.log('Count was increased by one, cause it may not be equal to one.');
      }

      ;
      this.divisionsCount = +count;
      return this.divisionsCount;
    }

    return undefined;
  },
  drawValue: function drawValue(value, progress) {
    // Passed path
    this.pathPassed.style.width = progress + '%'; // Handle

    this.handle.style.left = progress + '%'; // Value

    this.valueNote.innerHTML = value;
    var pathW = this.path.offsetWidth;
    var valueW = this.valueNote.offsetWidth;
    this.valueNote.style.left = (pathW * progress / 100 - valueW / 2) / pathW * 100 + '%';
    return progress;
  },
  setStyles: function setStyles(newStyles) {
    if (!wRunner.helper.isObject(newStyles)) return;
    var changedStyles = {};

    for (prop in newStyles) {
      if (!(prop in this.styles)) continue;
      var mutable = this.styles[prop];
      var wasChanged = false;

      if (newStyles[prop].value !== undefined) {
        mutable.oldValue = mutable.value;
        mutable.value = newStyles[prop].value;
        wasChanged = true;
      }

      if (typeof newStyles[prop].sign == 'string') {
        mutable.sign = newStyles[prop].sign;
        wasChanged = true;
      }

      if (wasChanged) changedStyles[prop] = mutable;
    }

    return changedStyles;
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

    return styles;
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

    return styles;
  },
  removeStyles: function removeStyles(list) {
    if (!wRunner.helper.isArray(list)) return;

    for (var i = 0; i < list.length; i++) {
      delete this.styles[list[i]];
    }

    return this.styles;
  },
  setValueNoteDisplay: function setValueNoteDisplay(value) {
    if (typeof value !== 'boolean') return;
    this.valueNoteDisplay = value;
    var mark = this.valueNote.classList[0];
    this.valueNote.classList.remove(mark + '_display_' + (!this.valueNoteDisplay ? 'visible' : 'hidden'));
    this.valueNote.classList.add(mark + '_display_' + (this.valueNoteDisplay ? 'visible' : 'hidden'));
    return this.valueNoteDisplay;
  },
  getValueNoteDisplay: function getValueNoteDisplay() {
    return this.valueNoteDisplay;
  }
}; // PRESENTER

wRunner.Presenter = function (options) {
  var options = options ? options : {};
  this.model = options.model;
  this.view = options.view;
  this.model.valueByProgressCalculatedEvent.addHandler(function (value) {
    this.model.setValue(value, true);
  }.bind(this));
  this.view.mouseDownEvent.addHandler(function (event) {
    this.view.mouseDown(event);
  }.bind(this));
  this.view.calculatedValueToUpdateEvent.addHandler(function (event) {
    this.model.calculateValueByProgress(event);
  }.bind(this));
  this.model.valueUpdatedEvent.addHandler(function (data) {
    this.view.drawValue(data.value, data.progress);
  }.bind(this));
  this.model.rangeUpdatedEvent.addHandler(function (data) {
    this.model.setValue(null, true);
  }.bind(this));
};

wRunner.Presenter.prototype = {
  create: function create(options) {
    var options = options ? options : {};
  },
  draw: function draw(options) {
    options = options ? options : {};
    this.view.append();
    this.view.generateDivisions();
    this.view.applyStyles();
    this.view.setValueNoteDisplay();
    this.view.drawValue(this.model.value, this.model.progress);
  },
  appendTo: function appendTo(roots) {
    this.view.setRoots(roots);
    this.view.append();
  },
  setStyles: function setStyles(styles) {
    this.view.setStyles(styles);
    this.view.applyStyles();
  },
  addStyles: function addStyles(addedStyles) {
    this.view.addStyles(addedStyles);
    this.view.applyStyles();
  },
  removeStyles: function removeStyles(list) {
    for (var i = 0; i < list.length; i++) {
      this.view.setStyles(_defineProperty({}, list[i], {
        value: null
      }));
    }

    this.view.applyStyles();
    this.view.removeStyles(list);
  },
  setValue: function setValue(value, auto) {
    this.model.setValue(value, auto);
    this.view.drawValue(this.model.value, this.model.progress);
  },
  setRange: function setRange(min, max, auto) {
    this.model.setRange(min, max, auto);
    this.view.drawValue(this.model.value, this.model.progress);
  },
  setDivisionsCount: function setDivisionsCount(count) {
    this.view.setDivisionsCount(count);
  },
  setStep: function setStep(newStep) {
    this.model.setStep(newStep);
  },
  setValueNoteDisplay: function setValueNoteDisplay(value) {
    this.view.setValueNoteDisplay(value);
    this.view.drawValue(this.model.value, this.model.progress);
  }
}; // EXPORT

module.exports = wRunner; //init
//draw
//change
//wrunner

/***/ })

}]);