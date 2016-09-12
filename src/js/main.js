/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//TODO - "use strict" better here or inside IIFE?
	"use strict";
	
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	
	(function () {
	  var startButton = new Button('startButton');
	  startButton.initStart();
	
	  var failButton = new Button('failButton');
	  failButton.initFail();
	
	  var submitButton = new Button('submitButton');
	  submitButton.submit();
	})();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	// TODO - Any other way other than exposing it to window? Look up CommonJS or AMD or ES6 import/export (can webpack help?)
	// What about instead of Helper.method(), use Object.create? Does this help?
	
	window.Helper = function () {
		var IS_NUMERIC = new RegExp(/^\d+$/);
	
		/**
	  * Find which CSS transition events end.
	  * https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
	  */
		function whichTransitionEvent() {
			var t,
			    el = document.createElement("fakeelement");
	
			var transitions = {
				"transition": "transitionend",
				"OTransition": "oTransitionEnd",
				"MozTransition": "transitionend",
				"WebkitTransition": "webkitTransitionEnd"
			};
	
			for (t in transitions) {
				if (el.style[t] !== undefined) {
					return transitions[t];
				}
			}
		}
	
		/**
	  * @param {Object} el - The element that we want to find the current position is relative to the window.
	  * https://www.kirupa.com/html5/get_element_position_using_javascript.htm
	  */
		function getPosition(el) {
			var xPos = 0;
			var yPos = 0;
	
			while (el) {
				if (el.tagName == "BODY") {
					// deal with browser quirks with body/window/document and page scroll
					var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
					var yScroll = el.scrollTop || document.documentElement.scrollTop;
	
					xPos += el.offsetLeft - xScroll + el.clientLeft;
					yPos += el.offsetTop - yScroll + el.clientTop;
				} else {
					// for all other non-BODY elements
					xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
					yPos += el.offsetTop - el.scrollTop + el.clientTop;
				}
				el = el.offsetParent;
			}
	
			return {
				x: xPos,
				y: yPos
			};
		}
	
		/**
	  * Bind the focused element; it will call the callback when transition ends.
	  * @param  {Object} the object which will be binded by a transition end listener
	  * @param  {Function} the callback that will be called when transition end
	  */
		function transitionEnd(element, callback) {
			var transitionEvent = whichTransitionEvent();
			element.addEventListener(transitionEvent, callback);
		}
	
		/**
	  * Display the element.
	  * @param  {Object} The element that will be displayed.
	  */
		function showElement(element, display) {
			if (typeof display !== 'undefined' && display !== '') {
				element.style.display = display;
			} else {
				element.style.display = 'flex';
			}
		}
	
		/**
	  * Hide the element.
	  * @param  {Object} The element that will be hidden.
	  */
		function hideElement(element) {
			for (var i = 0; i < arguments.length; i++) {
				arguments[i].style.display = 'none';
			}
		}
	
		/**
	  * Add a CSS class to an element.
	  * @param  {Object} The element that will have the added CSS class.
	  * @param  {String} className - The CSS class name
	  */
		function addClass(element, className) {
			element.classList.add(className);
		}
	
		/**
	  * Remove a CSS class from an element.
	  * @param  {Object} The element that will have the specified CSS class removed.
	  * @param  {String} className - The CSS class name
	  */
		function removeClass(element, className) {
			element.classList.remove(className);
			// weird hack rule - https://css-tricks.com/restart-css-animation/
			void element.offsetWidth;
		}
	
		/**
	  * Toggle whether to add or remove CSS class.
	  * @param  {Object} The element that will add or remove the CSS class.
	  * @param  {String} className - The CSS class name
	  */
		function toggleClass(element, className) {
			if (element.classList.contains(className)) {
				removeClass(element, className);
			}
			addClass(element, className);
		}
	
		/**
	  * Validate if user input is an integer only.
	  * @param  {Object} The textfield that will be validated.
	  */
		function validateIfUserInputIsValid(textfield) {
			if (IS_NUMERIC.test(textfield.value)) {
				return true;
			} else {
				toggleClass(textfield, 'shakeTextfieldAnimation');
				return false;
			}
		}
	
		return {
			transitionEnd: transitionEnd,
			getPosition: getPosition,
			showElement: showElement,
			hideElement: hideElement,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass,
			validateIfUserInputIsValid: validateIfUserInputIsValid
		};
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
	 * @param {Object} Button
	 */
	window.Button = function () {
		var COUNTDOWN_NUMBER = 3;
		//TODO - document.querySelector is better or nah? Heard performance is worse but how bad is it? why queryselector over getelement?
		// THIS IS TOO SHIT, ITS TOO DEPENDENT ON HARD CODED VARIABLES; CAN ANGULAR 2 HELP OR OTHER WAY VANILLA JS CAN HELP?
		var submitTextfield = document.getElementById('submitTextfield');
		var failBackground = document.getElementsByClassName('failBackground')[0];
		var images = document.getElementsByClassName('images')[0];
		var image = document.getElementsByClassName('image');
		var instructionPanel = document.getElementsByClassName('instructionPanel')[0];
		var addPoints = document.getElementsByClassName('addPoints')[0];
		var wrapper = document.getElementsByClassName('wrapper')[0];
		var sliderPanel = document.getElementsByClassName('sliderPanel')[0];
	
		function Button(id) {
			this.button = document.getElementById(id);
			this.countdownPanel = new CountdownPanel('countdownPanel');
			this.slider = new Slider('sliderPanel');
		};
	
		/**
	  * When clicked, start the countdown panel.
	  * @param  {Integer} Countdown number
	  * @param  {Function} The function that will be called when the countdown number reaches 0.
	  * @return {[type]}
	  */
		Button.prototype.startCountdownForSlider = function (countdownNumber, callback) {
			var self = this;
			this.button.addEventListener('click', function () {
				callback();
				Helper.toggleClass(wrapper, 'grayscaleBackgroundAnimation');
				self.countdownPanel.startCountdownTimer(countdownNumber, self.slider.startSlider.bind(self.slider));
			});
		};
	
		/**
	  * When clicked, check if the user input is valid; if it is valid, it will remove an image and add some points, else display a fail animation.
	  */
		Button.prototype.submit = function () {
			var imageIteration = 0;
			this.button.addEventListener('click', function () {
				if (!Helper.validateIfUserInputIsValid(self.submitTextfield)) {
					Helper.hideElement(image[imageIteration]);
					imageIteration++;
					addPoints.innerHTML = "+200";
					Helper.toggleClass(addPoints, 'addPointsAnimation');
				}
			});
		};
	
		/**
	  * Constructor for when the start button is clicked.
	  * @param  {Integer} countdown number.
	  */
		Button.prototype.initStart = function (countdownNumber) {
			var callback = function callback() {
				Helper.hideElement(instructionPanel);
			};
			this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
		};
	
		/**
	  * Constructor for when the fail button is clicked.
	  * @param  {Integer} countdown number.
	  */
		Button.prototype.initFail = function (countdownNumber) {
			var callback = function callback() {
				Helper.hideElement(failBackground, sliderPanel);
				// reset the images
				images.style.marginLeft = '100%';
				images.style.transition = '0s';
				for (var i = 0; i < image.length; i++) {
					image[i].style.display = 'block';
				}
				//find out how to remove error border
				//submitTextfield.style.border = '4x solid #3F3835';
			};
			//Helper.showElement(instructionPanel);
			this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
		};
	
		return Button;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
	 */
	
	window.CountdownPanel = function () {
		function countdownPanel(id) {
			this.countdownPanel = document.getElementById(id);
		}
	
		/**
	  * Start the countdown; it will countdown the number displayed on the screen until it reaches 0, which by then it will display the slider panel.
	  * @param  {Integer} the countdown number, e.g. if 3, it will start the countdown from 3.
	  * @param  {Function} The callback that will be called once the countdown reaches 0.
	  */
		countdownPanel.prototype.startCountdownTimer = function (countdownNumber, callback) {
			var self = this;
			Helper.showElement(this.countdownPanel);
			this.countdownPanel.innerHTML = "";
			var countDownTimer = setInterval(function () {
				if (countdownNumber === 0) {
					clearInterval(countDownTimer);
					Helper.hideElement(self.countdownPanel);
					callback();
				}
				self.countdownPanel.innerHTML = countdownNumber--;
			}, 1000);
		};
	
		return countdownPanel;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that were retrieved via Dota API.
	 * It will constantly transition to the left until it reaches the starting position of the panel that holds the images, which in that case the game
	 * lose. 
	 */
	
	window.Slider = function () {
		var SLIDE_DURATION = 10;
		var WARNING_THRESHOLD = 30;
		var images = document.getElementsByClassName('images')[0];
		var imagesPanel = document.getElementsByClassName('imagesPanel')[0];
		var failBackground = document.getElementsByClassName('failBackground')[0];
	
		function slider(slider) {
			this.slider = document.getElementsByClassName(slider)[0];
		}
	
		slider.prototype.getImages = function () {}
		// TODO - Get list of dota images using AJAX, look up Promises and Generators
		// Promises - asychronous calls, do this, then do this
		// Generators - something about waiting indefinitely until it gets it (uses the keyword 'yield')
	
	
		/**
	  * Transition effect on the images.
	  */
		;slider.prototype.slide = function () {
			var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			var defaultWidth = screenWidth - imagesPanel.offsetWidth / 2 + imagesPanel.offsetWidth;
			var warningWidth = defaultWidth * WARNING_THRESHOLD / 100;
			var timer = void 0;
	
			images.style.marginLeft = '0';
			images.style.transition = SLIDE_DURATION + 's linear';
			Helper.removeClass(imagesPanel, 'warningAnimation');
	
			timer = setInterval(function () {
				if (Helper.getPosition(images).x <= warningWidth) {
					Helper.addClass(imagesPanel, 'warningAnimation');
					clearInterval(timer);
				}
			}, 1000);
		};
	
		/**
	  * Start the slider transition, display the fail panel when the transition ends.
	  */
		slider.prototype.startSlider = function () {
			Helper.showElement(this.slider);
			this.slide();
			Helper.transitionEnd(images, function () {
				Helper.showElement(failBackground);
			});
		};
	
		return slider;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDRlMDEzODY4YzAzYmIzNzM2NTkiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9idXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9jb3VudGRvd25wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTs7QUFFQSxxQkFBUSxDQUFSO0FBQ0EscUJBQVEsQ0FBUjtBQUNBLHFCQUFRLENBQVI7QUFDQSxxQkFBUSxDQUFSOztBQUVBLEVBQUMsWUFBVztBQUNWLE9BQU0sY0FBYyxJQUFJLE1BQUosQ0FBVyxhQUFYLENBQXBCO0FBQ0EsZUFBWSxTQUFaOztBQUVBLE9BQU0sYUFBYSxJQUFJLE1BQUosQ0FBVyxZQUFYLENBQW5CO0FBQ0EsY0FBVyxRQUFYOztBQUVBLE9BQU0sZUFBZSxJQUFJLE1BQUosQ0FBVyxjQUFYLENBQXJCO0FBQ0EsZ0JBQWEsTUFBYjtBQUNELEVBVEQsSTs7Ozs7O0FDUkE7O0FBRUE7QUFDQTs7QUFDQSxRQUFPLE1BQVAsR0FBaUIsWUFBVztBQUMzQixNQUFJLGFBQWEsSUFBSSxNQUFKLENBQVcsT0FBWCxDQUFqQjs7QUFFQTs7OztBQUlBLFdBQVMsb0JBQVQsR0FBK0I7QUFDN0IsT0FBSSxDQUFKO0FBQUEsT0FDSSxLQUFLLFNBQVMsYUFBVCxDQUF1QixhQUF2QixD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TUgsR0FoQkQ7O0FBa0JBOzs7QUFHQSxTQUFPLFNBQVAsQ0FBaUIsV0FBakIsR0FBK0IsWUFBVztBQUN6QyxVQUFPLFdBQVAsQ0FBbUIsS0FBSyxNQUF4QjtBQUNBLFFBQUssS0FBTDtBQUNBLFVBQU8sYUFBUCxDQUFxQixNQUFyQixFQUE2QixZQUFXO0FBQ3ZDLFdBQU8sV0FBUCxDQUFtQixjQUFuQjtBQUNBLElBRkQ7QUFHQSxHQU5EOztBQVFBLFNBQU8sTUFBUDtBQUNBLEVBbERlLEVBQWhCLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDRlMDEzODY4YzAzYmIzNzM2NTlcbiAqKi8iLCIvL1RPRE8gLSBcInVzZSBzdHJpY3RcIiBiZXR0ZXIgaGVyZSBvciBpbnNpZGUgSUlGRT9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5yZXF1aXJlKCcuL2hlbHBlci5qcycpO1xyXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvYnV0dG9uLmpzJyk7XHJcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jb3VudGRvd25wYW5lbC5qcycpO1xyXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvc2xpZGVyLmpzJyk7XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBuZXcgQnV0dG9uKCdzdGFydEJ1dHRvbicpO1xyXG4gIHN0YXJ0QnV0dG9uLmluaXRTdGFydCgpO1xyXG5cclxuICBjb25zdCBmYWlsQnV0dG9uID0gbmV3IEJ1dHRvbignZmFpbEJ1dHRvbicpO1xyXG4gIGZhaWxCdXR0b24uaW5pdEZhaWwoKTtcclxuXHJcbiAgY29uc3Qgc3VibWl0QnV0dG9uID0gbmV3IEJ1dHRvbignc3VibWl0QnV0dG9uJyk7XHJcbiAgc3VibWl0QnV0dG9uLnN1Ym1pdCgpO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW5pdC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLy8gVE9ETyAtIEFueSBvdGhlciB3YXkgb3RoZXIgdGhhbiBleHBvc2luZyBpdCB0byB3aW5kb3c/IExvb2sgdXAgQ29tbW9uSlMgb3IgQU1EIG9yIEVTNiBpbXBvcnQvZXhwb3J0IChjYW4gd2VicGFjayBoZWxwPylcclxuLy8gV2hhdCBhYm91dCBpbnN0ZWFkIG9mIEhlbHBlci5tZXRob2QoKSwgdXNlIE9iamVjdC5jcmVhdGU/IERvZXMgdGhpcyBoZWxwP1xyXG53aW5kb3cuSGVscGVyID0gKGZ1bmN0aW9uKCkge1xyXG5cdHZhciBJU19OVU1FUklDID0gbmV3IFJlZ0V4cCgvXlxcZCskLyk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmQgd2hpY2ggQ1NTIHRyYW5zaXRpb24gZXZlbnRzIGVuZC5cclxuXHQgKiBodHRwczovL2pvbnN1aC5jb20vYmxvZy9kZXRlY3QtdGhlLWVuZC1vZi1jc3MtYW5pbWF0aW9ucy1hbmQtdHJhbnNpdGlvbnMtd2l0aC1qYXZhc2NyaXB0L1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdoaWNoVHJhbnNpdGlvbkV2ZW50KCl7XHJcblx0ICB2YXIgdCxcclxuXHQgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKTtcclxuXHJcblx0ICB2YXIgdHJhbnNpdGlvbnMgPSB7XHJcblx0ICAgIFwidHJhbnNpdGlvblwiICAgICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJPVHJhbnNpdGlvblwiICAgICA6IFwib1RyYW5zaXRpb25FbmRcIixcclxuXHQgICAgXCJNb3pUcmFuc2l0aW9uXCIgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG5cdCAgICBcIldlYmtpdFRyYW5zaXRpb25cIjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJcclxuXHQgIH1cclxuXHJcblx0ICBmb3IgKHQgaW4gdHJhbnNpdGlvbnMpe1xyXG5cdCAgICBpZiAoZWwuc3R5bGVbdF0gIT09IHVuZGVmaW5lZCl7XHJcblx0ICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG5cdCAgICB9XHJcblx0ICB9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZWwgLSBUaGUgZWxlbWVudCB0aGF0IHdlIHdhbnQgdG8gZmluZCB0aGUgY3VycmVudCBwb3NpdGlvbiBpcyByZWxhdGl2ZSB0byB0aGUgd2luZG93LlxyXG5cdCAqIGh0dHBzOi8vd3d3LmtpcnVwYS5jb20vaHRtbDUvZ2V0X2VsZW1lbnRfcG9zaXRpb25fdXNpbmdfamF2YXNjcmlwdC5odG1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBnZXRQb3NpdGlvbihlbCkge1xyXG5cdFx0dmFyIHhQb3MgPSAwO1xyXG5cdFx0dmFyIHlQb3MgPSAwO1xyXG5cclxuXHRcdHdoaWxlIChlbCkge1xyXG5cdFx0XHRpZiAoZWwudGFnTmFtZSA9PSBcIkJPRFlcIikge1xyXG5cdFx0XHRcdC8vIGRlYWwgd2l0aCBicm93c2VyIHF1aXJrcyB3aXRoIGJvZHkvd2luZG93L2RvY3VtZW50IGFuZCBwYWdlIHNjcm9sbFxyXG5cdFx0XHRcdHZhciB4U2Nyb2xsID0gZWwuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuXHRcdFx0XHR2YXIgeVNjcm9sbCA9IGVsLnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHR4UG9zICs9IChlbC5vZmZzZXRMZWZ0IC0geFNjcm9sbCArIGVsLmNsaWVudExlZnQpO1xyXG5cdFx0XHRcdHlQb3MgKz0gKGVsLm9mZnNldFRvcCAtIHlTY3JvbGwgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIGZvciBhbGwgb3RoZXIgbm9uLUJPRFkgZWxlbWVudHNcclxuXHRcdFx0XHR4UG9zICs9IChlbC5vZmZzZXRMZWZ0IC0gZWwuc2Nyb2xsTGVmdCArIGVsLmNsaWVudExlZnQpO1xyXG5cdFx0XHRcdHlQb3MgKz0gKGVsLm9mZnNldFRvcCAtIGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudFRvcCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogeFBvcyxcclxuXHRcdFx0eTogeVBvc1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmQgdGhlIGZvY3VzZWQgZWxlbWVudDsgaXQgd2lsbCBjYWxsIHRoZSBjYWxsYmFjayB3aGVuIHRyYW5zaXRpb24gZW5kcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHRoZSBvYmplY3Qgd2hpY2ggd2lsbCBiZSBiaW5kZWQgYnkgYSB0cmFuc2l0aW9uIGVuZCBsaXN0ZW5lclxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSB0aGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRyYW5zaXRpb24gZW5kXHJcblx0ICovXHJcbiAgXHRmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGVsZW1lbnQsIGNhbGxiYWNrKSB7XHJcblx0ICAgIGNvbnN0IHRyYW5zaXRpb25FdmVudCA9IHdoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcblx0ICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRXZlbnQsIGNhbGxiYWNrKTtcclxuICBcdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzcGxheSB0aGUgZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWxlbWVudCwgZGlzcGxheSkge1xyXG5cdFx0aWYgKHR5cGVvZiBkaXNwbGF5ICE9PSAndW5kZWZpbmVkJyAmJiBkaXNwbGF5ICE9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZSB0aGUgZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSBoaWRkZW4uXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gaGlkZUVsZW1lbnQoZWxlbWVudCkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0YXJndW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBDU1MgY2xhc3MgdG8gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBhZGRlZCBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGEgQ1NTIGNsYXNzIGZyb20gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBzcGVjaWZpZWQgQ1NTIGNsYXNzIHJlbW92ZWQuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdFx0Ly8gd2VpcmQgaGFjayBydWxlIC0gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9yZXN0YXJ0LWNzcy1hbmltYXRpb24vXHJcblx0XHR2b2lkIGVsZW1lbnQub2Zmc2V0V2lkdGg7XHRcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG4gIFx0XHR9XHJcbiAgXHRcdGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZSBpZiB1c2VyIGlucHV0IGlzIGFuIGludGVnZXIgb25seS5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSB0ZXh0ZmllbGQgdGhhdCB3aWxsIGJlIHZhbGlkYXRlZC5cclxuXHQgKi9cclxuICBcdGZ1bmN0aW9uIHZhbGlkYXRlSWZVc2VySW5wdXRJc1ZhbGlkKHRleHRmaWVsZCkge1xyXG5cdFx0aWYgKElTX05VTUVSSUMudGVzdCh0ZXh0ZmllbGQudmFsdWUpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dG9nZ2xlQ2xhc3ModGV4dGZpZWxkLCAnc2hha2VUZXh0ZmllbGRBbmltYXRpb24nKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4gIFx0XHR9XHJcbiAgXHR9XHJcblxyXG4gIFx0cmV0dXJuIHtcclxuICBcdFx0dHJhbnNpdGlvbkVuZCxcclxuICBcdFx0Z2V0UG9zaXRpb24sXHJcbiAgXHRcdHNob3dFbGVtZW50LFxyXG4gIFx0XHRoaWRlRWxlbWVudCxcclxuICBcdFx0YWRkQ2xhc3MsXHJcbiAgXHRcdHJlbW92ZUNsYXNzLFxyXG4gIFx0XHR0b2dnbGVDbGFzcyxcclxuICBcdFx0dmFsaWRhdGVJZlVzZXJJbnB1dElzVmFsaWRcclxuICBcdH1cclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2hlbHBlci5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIGEgZ2VuZXJpYyBidXR0b24sIHdoaWNoIGhhcyBhIG11bHRpdHVkZSBvZiBnZW5lcmljIHRvIHNwZWNpZmljIGZ1bmN0aW9ucyBmb3IgYWxsIHBvc3NpYmxlIHNjZW5hcmlvcy5cclxuICogQHBhcmFtIHtPYmplY3R9IEJ1dHRvblxyXG4gKi9cclxud2luZG93LkJ1dHRvbiA9IChmdW5jdGlvbigpIHtcclxuXHRjb25zdCBDT1VOVERPV05fTlVNQkVSID0gMztcclxuXHQvL1RPRE8gLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIGlzIGJldHRlciBvciBuYWg/IEhlYXJkIHBlcmZvcm1hbmNlIGlzIHdvcnNlIGJ1dCBob3cgYmFkIGlzIGl0PyB3aHkgcXVlcnlzZWxlY3RvciBvdmVyIGdldGVsZW1lbnQ/XHJcblx0Ly8gVEhJUyBJUyBUT08gU0hJVCwgSVRTIFRPTyBERVBFTkRFTlQgT04gSEFSRCBDT0RFRCBWQVJJQUJMRVM7IENBTiBBTkdVTEFSIDIgSEVMUCBPUiBPVEhFUiBXQVkgVkFOSUxMQSBKUyBDQU4gSEVMUD9cclxuXHRjb25zdCBzdWJtaXRUZXh0ZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0VGV4dGZpZWxkJyk7XHJcblx0Y29uc3QgZmFpbEJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmYWlsQmFja2dyb3VuZCcpWzBdO1xyXG5cdGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdGNvbnN0IGltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2UnKTtcclxuXHRjb25zdCBpbnN0cnVjdGlvblBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5zdHJ1Y3Rpb25QYW5lbCcpWzBdO1xyXG5cdGNvbnN0IGFkZFBvaW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZFBvaW50cycpWzBdO1xyXG5cdGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3cmFwcGVyJylbMF07XHJcblx0Y29uc3Qgc2xpZGVyUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJQYW5lbCcpWzBdO1xyXG5cclxuXHRmdW5jdGlvbiBCdXR0b24oaWQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbCA9IG5ldyBDb3VudGRvd25QYW5lbCgnY291bnRkb3duUGFuZWwnKTtcclxuXHRcdHRoaXMuc2xpZGVyID0gbmV3IFNsaWRlcignc2xpZGVyUGFuZWwnKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGNsaWNrZWQsIHN0YXJ0IHRoZSBjb3VudGRvd24gcGFuZWwuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gQ291bnRkb3duIG51bWJlclxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBjb3VudGRvd24gbnVtYmVyIHJlYWNoZXMgMC5cclxuXHQgKiBAcmV0dXJuIHtbdHlwZV19XHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5zdGFydENvdW50ZG93bkZvclNsaWRlciA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlciwgY2FsbGJhY2spIHtcclxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cdFx0dGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y2FsbGJhY2soKTtcclxuXHRcdFx0SGVscGVyLnRvZ2dsZUNsYXNzKHdyYXBwZXIsICdncmF5c2NhbGVCYWNrZ3JvdW5kQW5pbWF0aW9uJyk7XHJcblx0XHRcdHNlbGYuY291bnRkb3duUGFuZWwuc3RhcnRDb3VudGRvd25UaW1lcihjb3VudGRvd25OdW1iZXIsIHNlbGYuc2xpZGVyLnN0YXJ0U2xpZGVyLmJpbmQoc2VsZi5zbGlkZXIpKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBjbGlja2VkLCBjaGVjayBpZiB0aGUgdXNlciBpbnB1dCBpcyB2YWxpZDsgaWYgaXQgaXMgdmFsaWQsIGl0IHdpbGwgcmVtb3ZlIGFuIGltYWdlIGFuZCBhZGQgc29tZSBwb2ludHMsIGVsc2UgZGlzcGxheSBhIGZhaWwgYW5pbWF0aW9uLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuc3VibWl0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgaW1hZ2VJdGVyYXRpb24gPSAwO1xyXG5cdFx0dGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHQgIFx0XHRpZiAoIUhlbHBlci52YWxpZGF0ZUlmVXNlcklucHV0SXNWYWxpZChzZWxmLnN1Ym1pdFRleHRmaWVsZCkpIHtcclxuXHQgIFx0XHRcdEhlbHBlci5oaWRlRWxlbWVudChpbWFnZVtpbWFnZUl0ZXJhdGlvbl0pO1xyXG5cdCAgXHRcdFx0aW1hZ2VJdGVyYXRpb24rKztcclxuXHQgIFx0XHRcdGFkZFBvaW50cy5pbm5lckhUTUwgPSBcIisyMDBcIjtcclxuXHQgIFx0XHRcdEhlbHBlci50b2dnbGVDbGFzcyhhZGRQb2ludHMsICdhZGRQb2ludHNBbmltYXRpb24nKTtcclxuXHQgIFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdG9yIGZvciB3aGVuIHRoZSBzdGFydCBidXR0b24gaXMgY2xpY2tlZC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBjb3VudGRvd24gbnVtYmVyLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuaW5pdFN0YXJ0ID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyKSB7XHJcblx0XHRjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoaW5zdHJ1Y3Rpb25QYW5lbCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdG9yIGZvciB3aGVuIHRoZSBmYWlsIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IGNvdW50ZG93biBudW1iZXIuXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5pbml0RmFpbCA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlcikge1xyXG5cdFx0Y29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGZhaWxCYWNrZ3JvdW5kLCBzbGlkZXJQYW5lbCk7XHJcblx0XHRcdC8vIHJlc2V0IHRoZSBpbWFnZXNcclxuXHRcdFx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTAwJSc7XHJcbiAgXHRcdFx0aW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSAnMHMnO1xyXG4gIFx0XHQgIFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZS5sZW5ndGg7IGkrKykge1xyXG4gIFx0XHRcdFx0aW1hZ2VbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgXHRcdFx0fVxyXG4gIFx0XHRcdC8vZmluZCBvdXQgaG93IHRvIHJlbW92ZSBlcnJvciBib3JkZXJcclxuICBcdFx0XHQvL3N1Ym1pdFRleHRmaWVsZC5zdHlsZS5ib3JkZXIgPSAnNHggc29saWQgIzNGMzgzNSc7XHJcblx0XHR9XHJcblx0XHQvL0hlbHBlci5zaG93RWxlbWVudChpbnN0cnVjdGlvblBhbmVsKTtcclxuXHRcdHRoaXMuc3RhcnRDb3VudGRvd25Gb3JTbGlkZXIoQ09VTlRET1dOX05VTUJFUiwgY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIEJ1dHRvbjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvYnV0dG9uLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBjb3VudGRvd24gcGFuZWw7IGl0IHdpbGwgY291bnRkb3duIHVudGlsIGl0IHJlYWNoZXMgMCBiZWZvcmUgaXQgZGlzcGxheXMgdGhlIHNsaWRlciBwYW5lbC5cclxuICovXHJcbndpbmRvdy5Db3VudGRvd25QYW5lbCA9IChmdW5jdGlvbigpIHtcclxuXHRmdW5jdGlvbiBjb3VudGRvd25QYW5lbChpZCkge1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0IHRoZSBjb3VudGRvd247IGl0IHdpbGwgY291bnRkb3duIHRoZSBudW1iZXIgZGlzcGxheWVkIG9uIHRoZSBzY3JlZW4gdW50aWwgaXQgcmVhY2hlcyAwLCB3aGljaCBieSB0aGVuIGl0IHdpbGwgZGlzcGxheSB0aGUgc2xpZGVyIHBhbmVsLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IHRoZSBjb3VudGRvd24gbnVtYmVyLCBlLmcuIGlmIDMsIGl0IHdpbGwgc3RhcnQgdGhlIGNvdW50ZG93biBmcm9tIDMuXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIG9uY2UgdGhlIGNvdW50ZG93biByZWFjaGVzIDAuXHJcblx0ICovXHJcblx0Y291bnRkb3duUGFuZWwucHJvdG90eXBlLnN0YXJ0Q291bnRkb3duVGltZXIgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIsIGNhbGxiYWNrKSB7XHJcblx0XHRjb25zdCBzZWxmID0gdGhpcztcclxuXHRcdEhlbHBlci5zaG93RWxlbWVudCh0aGlzLmNvdW50ZG93blBhbmVsKTtcclxuXHRcdHRoaXMuY291bnRkb3duUGFuZWwuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRcdGNvbnN0IGNvdW50RG93blRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIFx0XHRpZiAoY291bnRkb3duTnVtYmVyID09PSAwKSB7XHJcbiAgICAgICAgXHRcdGNsZWFySW50ZXJ2YWwoY291bnREb3duVGltZXIpO1xyXG4gICAgICAgIFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoc2VsZi5jb3VudGRvd25QYW5lbCk7XHJcbiAgICAgICAgXHRcdGNhbGxiYWNrKCk7XHJcbiAgICAgICAgXHR9XHJcbiAgICAgICAgXHRzZWxmLmNvdW50ZG93blBhbmVsLmlubmVySFRNTCA9IGNvdW50ZG93bk51bWJlci0tO1xyXG4gICAgXHR9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBjb3VudGRvd25QYW5lbDtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvY291bnRkb3ducGFuZWwuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBzbGlkZXIgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBhZnRlciB0aGUgY291bnRkb3duLiBJdCB3aWxsIGRpc3BsYXkgYW4gZW5kbGVzcyBzdHJlYW0gb2YgZG90YSBpbWFnZXMgdGhhdCB3ZXJlIHJldHJpZXZlZCB2aWEgRG90YSBBUEkuXHJcbiAqIEl0IHdpbGwgY29uc3RhbnRseSB0cmFuc2l0aW9uIHRvIHRoZSBsZWZ0IHVudGlsIGl0IHJlYWNoZXMgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIG9mIHRoZSBwYW5lbCB0aGF0IGhvbGRzIHRoZSBpbWFnZXMsIHdoaWNoIGluIHRoYXQgY2FzZSB0aGUgZ2FtZVxyXG4gKiBsb3NlLiBcclxuICovXHJcbndpbmRvdy5TbGlkZXIgPSAoZnVuY3Rpb24oKSB7XHJcblx0Y29uc3QgU0xJREVfRFVSQVRJT04gPSAxMDtcclxuXHRjb25zdCBXQVJOSU5HX1RIUkVTSE9MRCA9IDMwO1xyXG5cdGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdGNvbnN0IGltYWdlc1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzUGFuZWwnKVswXTtcclxuXHRjb25zdCBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxCYWNrZ3JvdW5kJylbMF07XHJcblxyXG5cdGZ1bmN0aW9uIHNsaWRlcihzbGlkZXIpIHtcclxuXHRcdHRoaXMuc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzbGlkZXIpWzBdO1xyXG5cdH1cclxuXHJcblx0c2xpZGVyLnByb3RvdHlwZS5nZXRJbWFnZXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdC8vIFRPRE8gLSBHZXQgbGlzdCBvZiBkb3RhIGltYWdlcyB1c2luZyBBSkFYLCBsb29rIHVwIFByb21pc2VzIGFuZCBHZW5lcmF0b3JzXHJcblx0XHQvLyBQcm9taXNlcyAtIGFzeWNocm9ub3VzIGNhbGxzLCBkbyB0aGlzLCB0aGVuIGRvIHRoaXNcclxuXHRcdC8vIEdlbmVyYXRvcnMgLSBzb21ldGhpbmcgYWJvdXQgd2FpdGluZyBpbmRlZmluaXRlbHkgdW50aWwgaXQgZ2V0cyBpdCAodXNlcyB0aGUga2V5d29yZCAneWllbGQnKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVHJhbnNpdGlvbiBlZmZlY3Qgb24gdGhlIGltYWdlcy5cclxuXHQgKi9cclxuXHRzbGlkZXIucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cdCAgICBjb25zdCBkZWZhdWx0V2lkdGggPSAoc2NyZWVuV2lkdGggLSBpbWFnZXNQYW5lbC5vZmZzZXRXaWR0aC8gMikgKyBpbWFnZXNQYW5lbC5vZmZzZXRXaWR0aDtcclxuXHQgICAgY29uc3Qgd2FybmluZ1dpZHRoID0gZGVmYXVsdFdpZHRoICogV0FSTklOR19USFJFU0hPTEQgLyAxMDA7XHJcblx0ICAgIGxldCB0aW1lcjtcclxuXHJcblx0XHRpbWFnZXMuc3R5bGUubWFyZ2luTGVmdCA9ICcwJztcclxuXHQgICAgaW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSBTTElERV9EVVJBVElPTiArICdzIGxpbmVhcic7XHJcblx0XHRIZWxwZXIucmVtb3ZlQ2xhc3MoaW1hZ2VzUGFuZWwsICd3YXJuaW5nQW5pbWF0aW9uJyk7XHJcblxyXG5cdCAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdCAgICBcdGlmIChIZWxwZXIuZ2V0UG9zaXRpb24oaW1hZ2VzKS54IDw9IHdhcm5pbmdXaWR0aCkge1xyXG5cdFx0XHRcdEhlbHBlci5hZGRDbGFzcyhpbWFnZXNQYW5lbCwgJ3dhcm5pbmdBbmltYXRpb24nKTtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHQgICAgXHR9XHJcblx0ICAgIH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3RhcnQgdGhlIHNsaWRlciB0cmFuc2l0aW9uLCBkaXNwbGF5IHRoZSBmYWlsIHBhbmVsIHdoZW4gdGhlIHRyYW5zaXRpb24gZW5kcy5cclxuXHQgKi9cclxuXHRzbGlkZXIucHJvdG90eXBlLnN0YXJ0U2xpZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRIZWxwZXIuc2hvd0VsZW1lbnQodGhpcy5zbGlkZXIpO1xyXG5cdFx0dGhpcy5zbGlkZSgpO1xyXG5cdFx0SGVscGVyLnRyYW5zaXRpb25FbmQoaW1hZ2VzLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0SGVscGVyLnNob3dFbGVtZW50KGZhaWxCYWNrZ3JvdW5kKTtcclxuXHRcdH0pO1x0XHRcclxuXHR9XHJcblxyXG5cdHJldHVybiBzbGlkZXI7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL3NsaWRlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=