/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"showcase": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/showcase/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/showcase/index.js":
/*!*******************************!*\
  !*** ./src/showcase/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	Рабочий файл, в котором указываются подключаемые файлы и т.д..

	Примеры подключения:
	import "./scripts.js"	- Поключение файлов JS

	-whiteGloom
*/
$ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

__webpack_require__(/*! ./scripts/scripts.js */ "./src/showcase/scripts/scripts.js");

/***/ }),

/***/ "./src/showcase/scripts/scripts.js":
/*!*****************************************!*\
  !*** ./src/showcase/scripts/scripts.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener("DOMContentLoaded", test);

function test() {
  var controllers = [];

  for (var i = 0; i < 4; i++) {
    var data = {};
    data['slider' + i + 'Step'] = document.getElementById('slider' + i + 'Step');
    data['slider' + i + 'MinLimit'] = document.getElementById('slider' + i + 'MinLimit');
    data['slider' + i + 'MaxLimit'] = document.getElementById('slider' + i + 'MaxLimit');
    data['slider' + i + 'Value'] = document.getElementById('slider' + i + 'Value');
    data['slider' + i + 'MinValue'] = document.getElementById('slider' + i + 'MinValue');
    data['slider' + i + 'MaxValue'] = document.getElementById('slider' + i + 'MaxValue');
    data['slider' + i + 'Type'] = document.getElementById('slider' + i + 'Type');
    data['slider' + i + 'DivisionsCount'] = document.getElementById('slider' + i + 'DivisionsCount');
    data['slider' + i + 'ValueNoteDisplay'] = document.getElementById('slider' + i + 'ValueNoteDisplay');
    data['slider' + i + 'Roots'] = document.getElementById('slider' + i + 'Roots');
    data['slider' + i + 'Direction'] = document.getElementById('slider' + i + 'Direction');
    controllers.push(data);
  }

  var sliders = [];

  function makeSlider(index, options, type) {
    var data = Object.assign(options, {
      onStepUpdate: function onStepUpdate(step) {
        controllers[index]['slider' + index + 'Step'].value = step;
      },
      onLimitsUpdate: function onLimitsUpdate(limits) {
        controllers[index]['slider' + index + 'MinLimit'].value = limits.minLimit;
        controllers[index]['slider' + index + 'MaxLimit'].value = limits.maxLimit;
      },
      onValueUpdate: function onValueUpdate(value) {
        if (value.value !== undefined) {
          controllers[index]['slider' + index + 'Value'].value = value.value;
        }

        if (value.minValue && value.minValue !== undefined || value.maxValue && value.maxValue !== undefined) {
          controllers[index]['slider' + index + 'MinValue'].value = value.minValue;
          controllers[index]['slider' + index + 'MaxValue'].value = value.maxValue;
        }
      },
      onTypeUpdate: function onTypeUpdate(type) {
        controllers[index]['slider' + index + 'Type'].value = type;
      },
      onDivisionsCountUpdate: function onDivisionsCountUpdate(count) {
        controllers[index]['slider' + index + 'DivisionsCount'].value = count;
      },
      onValueNoteDisplayUpdate: function onValueNoteDisplayUpdate(value) {
        controllers[index]['slider' + index + 'ValueNoteDisplay'].checked = value;
      },
      onRootsUpdate: function onRootsUpdate(roots) {
        var str = '#' + roots.id;

        for (var i = 0; i < roots.classList.length; i++) {
          str += '.' + roots.classList[i];
        }

        controllers[index]['slider' + index + 'Roots'].value = str;
      },
      onStylesUpdate: function onStylesUpdate(styles) {
        controllers[index]['slider' + index + 'Direction'].value = styles.direction.value;
      }
    });

    if (type == 'native') {
      sliders[index] = wRunner(data);
    } else {
      sliders[index] = $('#exm' + index).wRunner(data);
    }

    controllers[index]['slider' + index + 'Step'].addEventListener('input', function (e) {
      sliders[index].setStep(controllers[index]['slider' + index + 'Step'].value);
    });
    controllers[index]['slider' + index + 'MinLimit'].addEventListener('input', function (e) {
      sliders[index].setLimits({
        minLimit: controllers[index]['slider' + index + 'MinLimit'].value
      });
    });
    controllers[index]['slider' + index + 'MaxLimit'].addEventListener('input', function (e) {
      sliders[index].setLimits({
        maxLimit: controllers[index]['slider' + index + 'MaxLimit'].value
      });
    });
    controllers[index]['slider' + index + 'Value'].addEventListener('input', function (e) {
      sliders[index].setValue(controllers[index]['slider' + index + 'Value'].value);
    });
    controllers[index]['slider' + index + 'MinValue'].addEventListener('input', function (e) {
      sliders[index].setValue({
        minValue: controllers[index]['slider' + index + 'MinValue'].value
      });
    });
    controllers[index]['slider' + index + 'MaxValue'].addEventListener('input', function (e) {
      sliders[index].setValue({
        maxValue: controllers[index]['slider' + index + 'MaxValue'].value
      });
    });
    controllers[index]['slider' + index + 'Type'].addEventListener('input', function (e) {
      sliders[index].setType(controllers[index]['slider' + index + 'Type'].value);
    });
    controllers[index]['slider' + index + 'DivisionsCount'].addEventListener('input', function (e) {
      sliders[index].setDivisionsCount(controllers[index]['slider' + index + 'DivisionsCount'].value);
    });
    controllers[index]['slider' + index + 'ValueNoteDisplay'].addEventListener('input', function (e) {
      sliders[index].setValueNoteDisplay(controllers[index]['slider' + index + 'ValueNoteDisplay'].checked);
    });
    controllers[index]['slider' + index + 'Direction'].addEventListener('input', function (e) {
      sliders[index].setStyles({
        direction: {
          value: controllers[index]['slider' + index + 'Direction'].value
        }
      });
    });
  }

  makeSlider(0, {
    roots: document.getElementById('exm0')
  }, 'native');
  makeSlider(1, {
    roots: document.getElementById('exm1'),
    styles: {
      direction: {
        value: 'vertical'
      }
    },
    step: 5,
    type: 'range'
  }, 'native');
  makeSlider(2, {
    divisionsCount: 16,
    styles: {
      direction: {
        value: 'vertical'
      }
    },
    step: 5,
    type: 'range'
  });
  makeSlider(3, {
    valueNoteDisplay: false,
    divisionsCount: 0
  }); // Для проверок.

  setTimeout(function () {}, 3000);
}

;

/***/ })

/******/ });