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
/******/ 	return __webpack_require__(__webpack_require__.s = "./dev/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/index.js":
/*!**********************!*\
  !*** ./dev/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	Рабочий файл, в котором указываются подключаемые файлы и т.д..

	Примеры подключения:
	import "./scripts.js"	- Поключение файлов JS

	-whiteGloom
*/
wRunner = __webpack_require__(/*! wrunner */ "./dev/vendors/wrunner.js");

__webpack_require__(/*! ./scripts/scripts.js */ "./dev/scripts/scripts.js");

/***/ }),

/***/ "./dev/scripts/scripts.js":
/*!********************************!*\
  !*** ./dev/scripts/scripts.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener("DOMContentLoaded", test);

function test() {
  var wrModel = new wRunner.model();
  var wrView = new wRunner.view();
  var wrPresenter = new wRunner.presenter({
    model: wrModel,
    view: wrView
  });
  wrPresenter.draw(); // Для проверок.

  setTimeout(function () {
    console.log('Проверка произведена. (3 sec)');
  }, 3000);
}

/***/ }),

/***/ "./dev/vendors/wrunner.js":
/*!********************************!*\
  !*** ./dev/vendors/wrunner.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var wRunner = {}; // MODEL

wRunner.model = function () {
  // -Defaults-
  this.minValue = 0;
  this.maxValue = 100;
  this.valuesCount = 100;
  this.value = 50;
  this.progress = 50;
};

wRunner.model.prototype = {
  setRange: function setRange(min, max) {
    var min = min != undefined ? min : this.minValue,
        max = max != undefined ? max : this.maxValue;

    if (min <= max) {
      this.minValue = min;
      this.maxValue = max;
    }

    if (min > max) {
      this.minValue = max;
      this.maxValue = min;
      console.log('Values have been reversed, because the minimum value is less than the maximum value.');
    }

    this.valuesCount = this.maxValue - this.minValue;
  },
  setValue: function setValue(value) {
    if (value < this.minValue) {
      this.value = this.minValue;
      console.log('The value was equated to the minimum, because it is less than the minimum value.');
    } else if (value > this.maxValue) {
      this.value = this.maxValue;
      console.log('The value was equated to the maximum, because it is more than the maximum value.');
    } else {
      this.value = value;
    }

    ;
    this.progress = (this.value - this.minValue) / this.valuesCount * 100;
  }
}; //VIEW

wRunner.view = function () {
  // -Defaults-
  this.roots = document.body;
  this.divisionsCount = 5;
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
    } // -Lists of els-

  };
  this.stableElsList = [];
  this.divisionsList = [];
  this.els = []; // -Generating stable elements-
  // --Base--

  this.base = document.createElement('div');
  this.base.classList.add('wrunner'); // --Outer--

  this.outer = document.createElement('div');
  this.outer.classList.add('wrunner__outer');
  this.stableElsList.push(this.outer); // --Path--

  this.path = document.createElement('div');
  this.path.classList.add('wrunner__path');
  this.stableElsList.push(this.path); // --Passed path--

  this.pathPassed = document.createElement('div');
  this.pathPassed.classList.add('wrunner__pathPassed');
  this.stableElsList.push(this.pathPassed); // --Path handle--

  this.handle = document.createElement('div');
  this.handle.classList.add('wrunner__handle');
  this.stableElsList.push(this.handle); // --Path value--

  this.value = document.createElement('div');
  this.value.classList.add('wrunner__value');
  this.stableElsList.push(this.value); // --Division's container--

  this.divisions = document.createElement('div');
  this.divisions.classList.add('wrunner__divisions');
  this.stableElsList.push(this.divisions); // -Default tree of stable elements-

  this.base.appendChild(this.outer);
  this.outer.appendChild(this.path);
  this.path.appendChild(this.pathPassed);
  this.outer.appendChild(this.handle);
  this.outer.appendChild(this.value);
  this.outer.appendChild(this.divisions);
};

wRunner.view.prototype = {
  append: function append() {
    this.roots.appendChild(this.base);
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
  },
  drawValue: function drawValue(options) {
    var options = options ? options : {};
    var value = options.value,
        progr = options.progress; // -Passed path-

    this.pathPassed.style.width = progr + '%'; // -Handle-

    this.handle.style.left = progr + '%'; // -Value-

    this.value.innerHTML = value;
    var pathW = this.path.offsetWidth;
    var valueW = this.value.offsetWidth;
    this.value.style.left = (pathW * progr / 100 - valueW / 2) / pathW * 100 + '%';
  },
  setStyles: function setStyles(newStyles) {
    for (prop in newStyles) {
      var it = this.styles[prop];

      if (newStyles[prop].value !== undefined) {
        it.oldValue = it.value;
        it.value = newStyles[prop].value;
      }

      if (newStyles[prop].sign) it.sign = newStyles[prop].sign;
    }
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
  },
  addStyles: function addStyles(addedStyles) {
    var styles = this.styles;

    for (prop in addedStyles) {
      styles[prop] = addedStyles[prop];
      styles[prop].oldValue = null;
      if (!addedStyles[prop].sign) styles[prop].sign = prop;
    }
  },
  removeStyles: function removeStyles(list) {
    for (var i = 0; i < list.length; i++) {
      delete this.styles[list[i]];
    }
  },
  setDivisionsCount: function setDivisionsCount(count) {
    if (count >= 0) this.divisionsCount = count;
  }
}; // PRESENTER

wRunner.presenter = function (options) {
  var options = options ? options : {};
  this.model = options.model;
  this.view = options.view;
};

wRunner.presenter.prototype = {
  create: function create(options) {
    var options = options ? options : {};
  },
  draw: function draw(options) {
    options = options ? options : {};
    this.view.append();
    this.view.generateDivisions();
    this.view.applyStyles();
    this.view.drawValue({
      progress: this.model.progress,
      value: this.model.value
    });
  },
  appendTo: function appendTo(roots) {
    this.view.roots = roots;
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
  setValue: function setValue(value) {
    this.model.setValue(value);
    this.view.drawValue({
      value: this.model.value,
      progress: this.model.progress
    });
  },
  setValues: function setValues(options) {
    var options = options ? options : {};
    if (options.minValue || options.maxValue) this.model.setRange(options.minValue, options.maxValue);
    if (options.value) this.model.setValue(options.value);
    this.view.drawValue({
      value: this.model.value,
      progress: this.model.progress
    });
  },
  setDivisionsCount: function setDivisionsCount(count) {
    this.view.setDivisionsCount(count);
  }
}; // EXPORT

module.exports = wRunner; //init
//draw
//change
//wrunner

/***/ })

/******/ });