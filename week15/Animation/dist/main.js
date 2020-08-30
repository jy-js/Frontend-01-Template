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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./animation.js":
/*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
/*! exports provided: Timeline, Animation, ColorAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return Timeline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Animation\", function() { return Animation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColorAnimation\", function() { return ColorAnimation; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    var _this = this;\n\n    _classCallCheck(this, Timeline);\n\n    this.animations = [];\n    this.requestId = null;\n    this.state = \"inited\";\n\n    this.tick = function () {\n      var t = Date.now() - _this.startTime;\n\n      var animations = _this.animations.filter(function (animation) {\n        return !animation.finished;\n      });\n\n      var _iterator = _createForOfIteratorHelper(animations),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var animation = _step.value;\n          var object = animation.object,\n              property = animation.property,\n              template = animation.template,\n              start = animation.start,\n              end = animation.end,\n              timingFunction = animation.timingFunction,\n              delay = animation.delay,\n              duration = animation.duration,\n              addTime = animation.addTime;\n          var progression = timingFunction((t - delay - addTime) / duration); // 0-1之间的数\n\n          if (t > duration + delay + addTime) {\n            progression = 1;\n            animation.finished = true;\n          }\n\n          var value = animation.valueFromProgression(progression);\n          object[property] = typeof template === 'function' ? template(value) : value;\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      if (animations.length) {\n        _this.requestId = requestAnimationFrame(_this.tick);\n      }\n    };\n  }\n\n  _createClass(Timeline, [{\n    key: \"pause\",\n    value: function pause() {\n      if (this.state !== \"playing\") {\n        return;\n      }\n\n      this.state = \"paused\";\n      this.pauseTime = Date.now();\n\n      if (this.requestId !== null) {\n        cancelAnimationFrame(this.requestId);\n      }\n    }\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      if (this.state !== \"paused\") {\n        return;\n      }\n\n      this.state = \"playing\";\n      this.startTime += Date.now() - this.pauseTime;\n      this.tick();\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      if (this.state !== \"inited\") {\n        return;\n      }\n\n      this.state = \"playing\";\n      this.startTime = Date.now();\n      this.tick();\n    }\n  }, {\n    key: \"restart\",\n    value: function restart() {\n      if (this.state === \"playing\") {\n        this.pause();\n      }\n\n      this.animations = [];\n      this.requestId = null;\n      this.state = \"playing\";\n      this.startTime = Date.now();\n      this.pauseTime = null;\n      this.tick();\n    }\n  }, {\n    key: \"add\",\n    value: function add(animation, addTime) {\n      this.animations.push(animation);\n      animation.finished = false;\n\n      if (this.state === \"playing\") {\n        animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;\n      } else {\n        animation.addTime = addTime !== void 0 ? addTime : 0;\n      }\n    }\n  }]);\n\n  return Timeline;\n}();\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, template, start, end, duration, delay, timingFunction) {\n    _classCallCheck(this, Animation);\n\n    this.object = object;\n    this.property = property;\n    this.template = template;\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay;\n    this.timingFunction = timingFunction;\n  }\n\n  _createClass(Animation, [{\n    key: \"valueFromProgression\",\n    value: function valueFromProgression(progression) {\n      return this.start + progression * (this.end - this.start);\n    }\n  }]);\n\n  return Animation;\n}();\nvar ColorAnimation = /*#__PURE__*/function () {\n  function ColorAnimation(object, property, start, end, duration, delay, timingFunction, template) {\n    _classCallCheck(this, ColorAnimation);\n\n    this.object = object;\n    this.property = property;\n\n    this.template = template || function (v) {\n      return \"rgba(\".concat(v.r, \",\").concat(v.g, \",\").concat(v.b, \",\").concat(v.a, \")\");\n    };\n\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay;\n    this.timingFunction = timingFunction;\n  }\n\n  _createClass(ColorAnimation, [{\n    key: \"valueFromProgression\",\n    value: function valueFromProgression(progression) {\n      return {\n        r: this.start.r + progression * (this.end.r - this.start.r),\n        g: this.start.g + progression * (this.end.g - this.start.g),\n        b: this.start.b + progression * (this.end.b - this.start.b),\n        a: this.start.a + progression * (this.end.a - this.start.a)\n      };\n    }\n  }]);\n\n  return ColorAnimation;\n}();\n\n//# sourceURL=webpack:///./animation.js?");

/***/ }),

/***/ "./cubicBezier.js":
/*!************************!*\
  !*** ./cubicBezier.js ***!
  \************************/
/*! exports provided: cubicBezier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubicBezier\", function() { return cubicBezier; });\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  var ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,\n  // implicit first and last control points are (0,0) and (1,1).\n\n  var ax = 3 * p1x - 3 * p2x + 1;\n  var bx = 3 * p2x - 6 * p1x;\n  var cx = 3 * p1x;\n  var ay = 3 * p1y - 3 * p2y + 1;\n  var by = 3 * p2y - 6 * p1y;\n  var cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  }\n\n  function sampleCurveY(t) {\n    return ((ay * t + by) * t + cy) * t;\n  } // Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2;\n\n    for (var i = 0; i < 8; i++) {\n      // f(t)-x=0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative;\n    }\n\n    var t1 = 1;\n    /* istanbul ignore next */\n\n    var t0 = 0;\n    /* istanbul ignore next */\n\n    t2 = x;\n    /* istanbul ignore next */\n\n    while (t1 > t0) {\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      if (x2 > 0) {\n        t1 = t2;\n      } else {\n        t0 = t2;\n      }\n\n      t2 = (t1 + t0) / 2;\n    } // Failure\n\n\n    return t2;\n  }\n\n  function solve(x) {\n    return sampleCurveY(solveCurveX(x));\n  }\n\n  return solve;\n}\n\n\n\n//# sourceURL=webpack:///./cubicBezier.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation.js */ \"./animation.js\");\n/* harmony import */ var _cubicBezier_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubicBezier.js */ \"./cubicBezier.js\");\n\n\n\nvar linear = function linear(t) {\n  return t;\n};\n\nvar ease = Object(_cubicBezier_js__WEBPACK_IMPORTED_MODULE_1__[\"cubicBezier\"])(.25, .1, .25, 1);\nvar el = document.getElementById(\"wrapper\");\nvar tl = new _animation_js__WEBPACK_IMPORTED_MODULE_0__[\"Timeline\"]();\ntl.add(new _animation_js__WEBPACK_IMPORTED_MODULE_0__[\"Animation\"](el.style, \"transform\", 0, 200, 5000, 0, linear, function (v) {\n  return \"translateX(\".concat(v, \"px)\");\n}));\ntl.start();\ndocument.getElementById(\"pauseBtn\").addEventListener(\"click\", function () {\n  tl.pause();\n});\ndocument.getElementById(\"resumeBtn\").addEventListener(\"click\", function () {\n  tl.resume();\n});\ndocument.getElementById(\"startBtn\").addEventListener(\"click\", function () {\n  tl.add(new _animation_js__WEBPACK_IMPORTED_MODULE_0__[\"ColorAnimation\"](el.style, \"backgroundColor\", {\n    r: 0,\n    g: 0,\n    b: 0,\n    a: 1\n  }, {\n    r: 255,\n    g: 0,\n    b: 0,\n    a: 1\n  }, 5000, 0, linear));\n});\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });