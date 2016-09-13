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
	
	(function () {
		var Button = __webpack_require__(2);
	
		var startButton = new Button('startButton');
		startButton.initStart();
	
		var failButton = new Button('failButton');
		failButton.initFail();
	
		var submitButton = new Button('submitButton');
		submitButton.submit();
	})();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
	 * @param {Object} Button
	 */
	module.exports = function () {
		var CountdownPanel = __webpack_require__(3);
		var Slider = __webpack_require__(5);
		var Helper = __webpack_require__(4);
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
		// THIS PROTOTYPE OR MODULE PATTERN IS BETTER??? WHAT ABOUT PUB/SUB IMPLEMENTATION?
		// IF HAVE TIME, SEE IF ES6 ARROW FUNCTION IS MORE READABLE OR NOT
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
			console.log(this);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
	 */
	
	module.exports = function () {
		var Helper = __webpack_require__(4);
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
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	// FIND A WAY TO REPLACE THIS WINDOW. 
	// I have to use window because Webpack put this function inside another function, which means it is inaccesible to other functions. Even if it's
	// var Helper = (function() {}) is it really the best way to make all this components global objects??? a.k.a CommonJS/AMD/ES6 import/export
	// What about instead of Helper.method(), use Object.create? Does this help?
	
	module.exports = function () {
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that were retrieved via Dota API.
	 * It will constantly transition to the left until it reaches the starting position of the panel that holds the images, which in that case the game
	 * lose. 
	 */
	
	module.exports = function () {
		var Helper = __webpack_require__(4);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjk1YWFkYmVmM2E3YjY2NjQxYTQiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bnBhbmVsLmpzIiwid2VicGFjazovLy8uL2pzL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTs7QUFFQSxFQUFDLFlBQVc7QUFDWCxNQUFNLFNBQVMsb0JBQVEsQ0FBUixDQUFmOztBQUVBLE1BQU0sY0FBYyxJQUFJLE1BQUosQ0FBVyxhQUFYLENBQXBCO0FBQ0EsY0FBWSxTQUFaOztBQUVBLE1BQU0sYUFBYSxJQUFJLE1BQUosQ0FBVyxZQUFYLENBQW5CO0FBQ0EsYUFBVyxRQUFYOztBQUVBLE1BQU0sZUFBZSxJQUFJLE1BQUosQ0FBVyxjQUFYLENBQXJCO0FBQ0EsZUFBYSxNQUFiO0FBQ0EsRUFYRCxJOzs7Ozs7OztBQ0hBOzs7O0FBSUEsUUFBTyxPQUFQLEdBQWtCLFlBQVc7QUFDNUIsTUFBTSxpQkFBaUIsb0JBQVEsQ0FBUixDQUF2QjtBQUNBLE1BQU0sU0FBUyxvQkFBUSxDQUFSLENBQWY7QUFDQSxNQUFNLFNBQVMsb0JBQVEsQ0FBUixDQUFmO0FBQ0EsTUFBTSxtQkFBbUIsQ0FBekI7QUFDQTtBQUNBO0FBQ0EsTUFBTSxrQkFBa0IsU0FBUyxjQUFULENBQXdCLGlCQUF4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QUVHLFdBQVEsWUFBWSxZQUFXO0FBQzlCLFFBQUksT0FBTyxXQUFQLENBQW1CLE1BQW5CLEVBQTJCLENBQTNCLElBQWdDLFlBQXBDLEVBQWtEO0FBQ3BELFlBQU8sUUFBUCxDQUFnQixXQUFoQixFQUE2QixrQkFBN0I7QUFDQSxtQkFBYyxLQUFkO0FBQ0c7QUFDRCxJQUxPLEVBS0wsSUFMSyxDQUFSO0FBTUgsR0FoQkQ7O0FBa0JBOzs7QUFHQSxTQUFPLFNBQVAsQ0FBaUIsV0FBakIsR0FBK0IsWUFBVztBQUN6QyxVQUFPLFdBQVAsQ0FBbUIsS0FBSyxNQUF4QjtBQUNBLFFBQUssS0FBTDtBQUNBLFVBQU8sYUFBUCxDQUFxQixNQUFyQixFQUE2QixZQUFXO0FBQ3ZDLFdBQU8sV0FBUCxDQUFtQixjQUFuQjtBQUNBLElBRkQ7QUFHQSxHQU5EOztBQVFBLFNBQU8sTUFBUDtBQUNBLEVBbkRnQixFQUFqQixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDY5NWFhZGJlZjNhN2I2NjY0MWE0XG4gKiovIiwiLy9UT0RPIC0gXCJ1c2Ugc3RyaWN0XCIgYmV0dGVyIGhlcmUgb3IgaW5zaWRlIElJRkU/XHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cdGNvbnN0IEJ1dHRvbiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9idXR0b24uanMnKTtcclxuXHJcblx0Y29uc3Qgc3RhcnRCdXR0b24gPSBuZXcgQnV0dG9uKCdzdGFydEJ1dHRvbicpO1xyXG5cdHN0YXJ0QnV0dG9uLmluaXRTdGFydCgpO1xyXG5cclxuXHRjb25zdCBmYWlsQnV0dG9uID0gbmV3IEJ1dHRvbignZmFpbEJ1dHRvbicpO1xyXG5cdGZhaWxCdXR0b24uaW5pdEZhaWwoKTtcclxuXHJcblx0Y29uc3Qgc3VibWl0QnV0dG9uID0gbmV3IEJ1dHRvbignc3VibWl0QnV0dG9uJyk7XHJcblx0c3VibWl0QnV0dG9uLnN1Ym1pdCgpO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW5pdC5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIGEgZ2VuZXJpYyBidXR0b24sIHdoaWNoIGhhcyBhIG11bHRpdHVkZSBvZiBnZW5lcmljIHRvIHNwZWNpZmljIGZ1bmN0aW9ucyBmb3IgYWxsIHBvc3NpYmxlIHNjZW5hcmlvcy5cclxuICogQHBhcmFtIHtPYmplY3R9IEJ1dHRvblxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0Y29uc3QgQ291bnRkb3duUGFuZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvdW50ZG93bnBhbmVsLmpzJyk7XHJcblx0Y29uc3QgU2xpZGVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zbGlkZXIuanMnKTtcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHRjb25zdCBDT1VOVERPV05fTlVNQkVSID0gMztcclxuXHQvL1RPRE8gLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIGlzIGJldHRlciBvciBuYWg/IEhlYXJkIHBlcmZvcm1hbmNlIGlzIHdvcnNlIGJ1dCBob3cgYmFkIGlzIGl0PyB3aHkgcXVlcnlzZWxlY3RvciBvdmVyIGdldGVsZW1lbnQ/XHJcblx0Ly8gVEhJUyBJUyBUT08gU0hJVCwgSVRTIFRPTyBERVBFTkRFTlQgT04gSEFSRCBDT0RFRCBWQVJJQUJMRVM7IENBTiBBTkdVTEFSIDIgSEVMUCBPUiBPVEhFUiBXQVkgVkFOSUxMQSBKUyBDQU4gSEVMUD9cclxuXHRjb25zdCBzdWJtaXRUZXh0ZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0VGV4dGZpZWxkJyk7XHJcblx0Y29uc3QgZmFpbEJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmYWlsQmFja2dyb3VuZCcpWzBdO1xyXG5cdGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdGNvbnN0IGltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2UnKTtcclxuXHRjb25zdCBpbnN0cnVjdGlvblBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5zdHJ1Y3Rpb25QYW5lbCcpWzBdO1xyXG5cdGNvbnN0IGFkZFBvaW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZFBvaW50cycpWzBdO1xyXG5cdGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3cmFwcGVyJylbMF07XHJcblx0Y29uc3Qgc2xpZGVyUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJQYW5lbCcpWzBdO1xyXG5cclxuXHRmdW5jdGlvbiBCdXR0b24oaWQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbCA9IG5ldyBDb3VudGRvd25QYW5lbCgnY291bnRkb3duUGFuZWwnKTtcclxuXHRcdHRoaXMuc2xpZGVyID0gbmV3IFNsaWRlcignc2xpZGVyUGFuZWwnKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGNsaWNrZWQsIHN0YXJ0IHRoZSBjb3VudGRvd24gcGFuZWwuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gQ291bnRkb3duIG51bWJlclxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBjb3VudGRvd24gbnVtYmVyIHJlYWNoZXMgMC5cclxuXHQgKiBAcmV0dXJuIHtbdHlwZV19XHJcblx0ICovXHJcblx0Ly8gVEhJUyBQUk9UT1RZUEUgT1IgTU9EVUxFIFBBVFRFUk4gSVMgQkVUVEVSPz8/IFdIQVQgQUJPVVQgUFVCL1NVQiBJTVBMRU1FTlRBVElPTj9cclxuXHQvLyBJRiBIQVZFIFRJTUUsIFNFRSBJRiBFUzYgQVJST1cgRlVOQ1RJT04gSVMgTU9SRSBSRUFEQUJMRSBPUiBOT1RcclxuXHRCdXR0b24ucHJvdG90eXBlLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyLCBjYWxsYmFjaykge1xyXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XHJcblx0XHR0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjYWxsYmFjaygpO1xyXG5cdFx0XHRIZWxwZXIudG9nZ2xlQ2xhc3Mod3JhcHBlciwgJ2dyYXlzY2FsZUJhY2tncm91bmRBbmltYXRpb24nKTtcclxuXHRcdFx0c2VsZi5jb3VudGRvd25QYW5lbC5zdGFydENvdW50ZG93blRpbWVyKGNvdW50ZG93bk51bWJlciwgc2VsZi5zbGlkZXIuc3RhcnRTbGlkZXIuYmluZChzZWxmLnNsaWRlcikpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGNsaWNrZWQsIGNoZWNrIGlmIHRoZSB1c2VyIGlucHV0IGlzIHZhbGlkOyBpZiBpdCBpcyB2YWxpZCwgaXQgd2lsbCByZW1vdmUgYW4gaW1hZ2UgYW5kIGFkZCBzb21lIHBvaW50cywgZWxzZSBkaXNwbGF5IGEgZmFpbCBhbmltYXRpb24uXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCBpbWFnZUl0ZXJhdGlvbiA9IDA7XHJcblx0XHR0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdCAgXHRcdGlmICghSGVscGVyLnZhbGlkYXRlSWZVc2VySW5wdXRJc1ZhbGlkKHNlbGYuc3VibWl0VGV4dGZpZWxkKSkge1xyXG5cdCAgXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGltYWdlW2ltYWdlSXRlcmF0aW9uXSk7XHJcblx0ICBcdFx0XHRpbWFnZUl0ZXJhdGlvbisrO1xyXG5cdCAgXHRcdFx0YWRkUG9pbnRzLmlubmVySFRNTCA9IFwiKzIwMFwiO1xyXG5cdCAgXHRcdFx0SGVscGVyLnRvZ2dsZUNsYXNzKGFkZFBvaW50cywgJ2FkZFBvaW50c0FuaW1hdGlvbicpO1xyXG5cdCAgXHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0b3IgZm9yIHdoZW4gdGhlIHN0YXJ0IGJ1dHRvbiBpcyBjbGlja2VkLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IGNvdW50ZG93biBudW1iZXIuXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5pbml0U3RhcnQgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMpO1xyXG5cdFx0Y29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGluc3RydWN0aW9uUGFuZWwpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zdGFydENvdW50ZG93bkZvclNsaWRlcihDT1VOVERPV05fTlVNQkVSLCBjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvciBmb3Igd2hlbiB0aGUgZmFpbCBidXR0b24gaXMgY2xpY2tlZC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBjb3VudGRvd24gbnVtYmVyLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuaW5pdEZhaWwgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdGNvbnN0IGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdEhlbHBlci5oaWRlRWxlbWVudChmYWlsQmFja2dyb3VuZCwgc2xpZGVyUGFuZWwpO1xyXG5cdFx0XHQvLyByZXNldCB0aGUgaW1hZ2VzXHJcblx0XHRcdGltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzEwMCUnO1xyXG4gIFx0XHRcdGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gJzBzJztcclxuICBcdFx0ICBcdGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2UubGVuZ3RoOyBpKyspIHtcclxuICBcdFx0XHRcdGltYWdlW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIFx0XHRcdH1cclxuICBcdFx0XHQvL2ZpbmQgb3V0IGhvdyB0byByZW1vdmUgZXJyb3IgYm9yZGVyXHJcbiAgXHRcdFx0Ly9zdWJtaXRUZXh0ZmllbGQuc3R5bGUuYm9yZGVyID0gJzR4IHNvbGlkICMzRjM4MzUnO1xyXG5cdFx0fVxyXG5cdFx0Ly9IZWxwZXIuc2hvd0VsZW1lbnQoaW5zdHJ1Y3Rpb25QYW5lbCk7XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBCdXR0b247XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogVGhpcyBpcyB0aGUgY291bnRkb3duIHBhbmVsOyBpdCB3aWxsIGNvdW50ZG93biB1bnRpbCBpdCByZWFjaGVzIDAgYmVmb3JlIGl0IGRpc3BsYXlzIHRoZSBzbGlkZXIgcGFuZWwuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHRmdW5jdGlvbiBjb3VudGRvd25QYW5lbChpZCkge1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0IHRoZSBjb3VudGRvd247IGl0IHdpbGwgY291bnRkb3duIHRoZSBudW1iZXIgZGlzcGxheWVkIG9uIHRoZSBzY3JlZW4gdW50aWwgaXQgcmVhY2hlcyAwLCB3aGljaCBieSB0aGVuIGl0IHdpbGwgZGlzcGxheSB0aGUgc2xpZGVyIHBhbmVsLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IHRoZSBjb3VudGRvd24gbnVtYmVyLCBlLmcuIGlmIDMsIGl0IHdpbGwgc3RhcnQgdGhlIGNvdW50ZG93biBmcm9tIDMuXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIG9uY2UgdGhlIGNvdW50ZG93biByZWFjaGVzIDAuXHJcblx0ICovXHJcblx0Y291bnRkb3duUGFuZWwucHJvdG90eXBlLnN0YXJ0Q291bnRkb3duVGltZXIgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIsIGNhbGxiYWNrKSB7XHJcblx0XHRjb25zdCBzZWxmID0gdGhpcztcclxuXHRcdEhlbHBlci5zaG93RWxlbWVudCh0aGlzLmNvdW50ZG93blBhbmVsKTtcclxuXHRcdHRoaXMuY291bnRkb3duUGFuZWwuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRcdGNvbnN0IGNvdW50RG93blRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIFx0XHRpZiAoY291bnRkb3duTnVtYmVyID09PSAwKSB7XHJcbiAgICAgICAgXHRcdGNsZWFySW50ZXJ2YWwoY291bnREb3duVGltZXIpO1xyXG4gICAgICAgIFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoc2VsZi5jb3VudGRvd25QYW5lbCk7XHJcbiAgICAgICAgXHRcdGNhbGxiYWNrKCk7XHJcbiAgICAgICAgXHR9XHJcbiAgICAgICAgXHRzZWxmLmNvdW50ZG93blBhbmVsLmlubmVySFRNTCA9IGNvdW50ZG93bk51bWJlci0tO1xyXG4gICAgXHR9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBjb3VudGRvd25QYW5lbDtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvY291bnRkb3ducGFuZWwuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8vIEZJTkQgQSBXQVkgVE8gUkVQTEFDRSBUSElTIFdJTkRPVy4gXHJcbi8vIEkgaGF2ZSB0byB1c2Ugd2luZG93IGJlY2F1c2UgV2VicGFjayBwdXQgdGhpcyBmdW5jdGlvbiBpbnNpZGUgYW5vdGhlciBmdW5jdGlvbiwgd2hpY2ggbWVhbnMgaXQgaXMgaW5hY2Nlc2libGUgdG8gb3RoZXIgZnVuY3Rpb25zLiBFdmVuIGlmIGl0J3NcclxuLy8gdmFyIEhlbHBlciA9IChmdW5jdGlvbigpIHt9KSBpcyBpdCByZWFsbHkgdGhlIGJlc3Qgd2F5IHRvIG1ha2UgYWxsIHRoaXMgY29tcG9uZW50cyBnbG9iYWwgb2JqZWN0cz8/PyBhLmsuYSBDb21tb25KUy9BTUQvRVM2IGltcG9ydC9leHBvcnRcclxuLy8gV2hhdCBhYm91dCBpbnN0ZWFkIG9mIEhlbHBlci5tZXRob2QoKSwgdXNlIE9iamVjdC5jcmVhdGU/IERvZXMgdGhpcyBoZWxwP1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHR2YXIgSVNfTlVNRVJJQyA9IG5ldyBSZWdFeHAoL15cXGQrJC8pO1xyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kIHdoaWNoIENTUyB0cmFuc2l0aW9uIGV2ZW50cyBlbmQuXHJcblx0ICogaHR0cHM6Ly9qb25zdWguY29tL2Jsb2cvZGV0ZWN0LXRoZS1lbmQtb2YtY3NzLWFuaW1hdGlvbnMtYW5kLXRyYW5zaXRpb25zLXdpdGgtamF2YXNjcmlwdC9cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3aGljaFRyYW5zaXRpb25FdmVudCgpe1xyXG5cdCAgdmFyIHQsXHJcblx0ICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XHJcblxyXG5cdCAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG5cdCAgICBcInRyYW5zaXRpb25cIiAgICAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiT1RyYW5zaXRpb25cIiAgICAgOiBcIm9UcmFuc2l0aW9uRW5kXCIsXHJcblx0ICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJXZWJraXRUcmFuc2l0aW9uXCI6IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiXHJcblx0ICB9XHJcblxyXG5cdCAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuXHQgICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpe1xyXG5cdCAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGVsIC0gVGhlIGVsZW1lbnQgdGhhdCB3ZSB3YW50IHRvIGZpbmQgdGhlIGN1cnJlbnQgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cclxuXHQgKiBodHRwczovL3d3dy5raXJ1cGEuY29tL2h0bWw1L2dldF9lbGVtZW50X3Bvc2l0aW9uX3VzaW5nX2phdmFzY3JpcHQuaHRtXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWwpIHtcclxuXHRcdHZhciB4UG9zID0gMDtcclxuXHRcdHZhciB5UG9zID0gMDtcclxuXHJcblx0XHR3aGlsZSAoZWwpIHtcclxuXHRcdFx0aWYgKGVsLnRhZ05hbWUgPT0gXCJCT0RZXCIpIHtcclxuXHRcdFx0XHQvLyBkZWFsIHdpdGggYnJvd3NlciBxdWlya3Mgd2l0aCBib2R5L3dpbmRvdy9kb2N1bWVudCBhbmQgcGFnZSBzY3JvbGxcclxuXHRcdFx0XHR2YXIgeFNjcm9sbCA9IGVsLnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcblx0XHRcdFx0dmFyIHlTY3JvbGwgPSBlbC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIHhTY3JvbGwgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSB5U2Nyb2xsICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBmb3IgYWxsIG90aGVyIG5vbi1CT0RZIGVsZW1lbnRzXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsID0gZWwub2Zmc2V0UGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IHhQb3MsXHJcblx0XHRcdHk6IHlQb3NcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kIHRoZSBmb2N1c2VkIGVsZW1lbnQ7IGl0IHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2hlbiB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgYmUgYmluZGVkIGJ5IGEgdHJhbnNpdGlvbiBlbmQgbGlzdGVuZXJcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gdGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0cmFuc2l0aW9uIGVuZFxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlbGVtZW50LCBjYWxsYmFjaykge1xyXG5cdCAgICBjb25zdCB0cmFuc2l0aW9uRXZlbnQgPSB3aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdCAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkV2ZW50LCBjYWxsYmFjayk7XHJcbiAgXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BsYXkgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnQsIGRpc3BsYXkpIHtcclxuXHRcdGlmICh0eXBlb2YgZGlzcGxheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGlzcGxheSAhPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGUgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgaGlkZGVuLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnQpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGFyZ3VtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIGEgQ1NTIGNsYXNzIHRvIGFuIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgaGF2ZSB0aGUgYWRkZWQgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSBhIENTUyBjbGFzcyBmcm9tIGFuIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgaGF2ZSB0aGUgc3BlY2lmaWVkIENTUyBjbGFzcyByZW1vdmVkLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuXHRcdC8vIHdlaXJkIGhhY2sgcnVsZSAtIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vcmVzdGFydC1jc3MtYW5pbWF0aW9uL1xyXG5cdFx0dm9pZCBlbGVtZW50Lm9mZnNldFdpZHRoO1x0XHRcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZSB3aGV0aGVyIHRvIGFkZCBvciByZW1vdmUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGFkZCBvciByZW1vdmUgdGhlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuICBcdFx0fVxyXG4gIFx0XHRhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVmFsaWRhdGUgaWYgdXNlciBpbnB1dCBpcyBhbiBpbnRlZ2VyIG9ubHkuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgdGV4dGZpZWxkIHRoYXQgd2lsbCBiZSB2YWxpZGF0ZWQuXHJcblx0ICovXHJcbiAgXHRmdW5jdGlvbiB2YWxpZGF0ZUlmVXNlcklucHV0SXNWYWxpZCh0ZXh0ZmllbGQpIHtcclxuXHRcdGlmIChJU19OVU1FUklDLnRlc3QodGV4dGZpZWxkLnZhbHVlKSkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRvZ2dsZUNsYXNzKHRleHRmaWVsZCwgJ3NoYWtlVGV4dGZpZWxkQW5pbWF0aW9uJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuICBcdFx0fVxyXG4gIFx0fVxyXG5cclxuICBcdHJldHVybiB7XHJcbiAgXHRcdHRyYW5zaXRpb25FbmQsXHJcbiAgXHRcdGdldFBvc2l0aW9uLFxyXG4gIFx0XHRzaG93RWxlbWVudCxcclxuICBcdFx0aGlkZUVsZW1lbnQsXHJcbiAgXHRcdGFkZENsYXNzLFxyXG4gIFx0XHRyZW1vdmVDbGFzcyxcclxuICBcdFx0dG9nZ2xlQ2xhc3MsXHJcbiAgXHRcdHZhbGlkYXRlSWZVc2VySW5wdXRJc1ZhbGlkXHJcbiAgXHR9XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9oZWxwZXIuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBzbGlkZXIgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBhZnRlciB0aGUgY291bnRkb3duLiBJdCB3aWxsIGRpc3BsYXkgYW4gZW5kbGVzcyBzdHJlYW0gb2YgZG90YSBpbWFnZXMgdGhhdCB3ZXJlIHJldHJpZXZlZCB2aWEgRG90YSBBUEkuXHJcbiAqIEl0IHdpbGwgY29uc3RhbnRseSB0cmFuc2l0aW9uIHRvIHRoZSBsZWZ0IHVudGlsIGl0IHJlYWNoZXMgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIG9mIHRoZSBwYW5lbCB0aGF0IGhvbGRzIHRoZSBpbWFnZXMsIHdoaWNoIGluIHRoYXQgY2FzZSB0aGUgZ2FtZVxyXG4gKiBsb3NlLiBcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdGNvbnN0IEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci5qcycpO1xyXG5cdGNvbnN0IFNMSURFX0RVUkFUSU9OID0gMTA7XHJcblx0Y29uc3QgV0FSTklOR19USFJFU0hPTEQgPSAzMDtcclxuXHRjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXTtcclxuXHRjb25zdCBpbWFnZXNQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlc1BhbmVsJylbMF07XHJcblx0Y29uc3QgZmFpbEJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmYWlsQmFja2dyb3VuZCcpWzBdO1xyXG5cclxuXHRmdW5jdGlvbiBzbGlkZXIoc2xpZGVyKSB7XHJcblx0XHR0aGlzLnNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2xpZGVyKVswXTtcclxuXHR9XHJcblxyXG5cdHNsaWRlci5wcm90b3R5cGUuZ2V0SW1hZ2VzID0gZnVuY3Rpb24oKSB7XHJcblx0XHQvLyBUT0RPIC0gR2V0IGxpc3Qgb2YgZG90YSBpbWFnZXMgdXNpbmcgQUpBWCwgbG9vayB1cCBQcm9taXNlcyBhbmQgR2VuZXJhdG9yc1xyXG5cdFx0Ly8gUHJvbWlzZXMgLSBhc3ljaHJvbm91cyBjYWxscywgZG8gdGhpcywgdGhlbiBkbyB0aGlzXHJcblx0XHQvLyBHZW5lcmF0b3JzIC0gc29tZXRoaW5nIGFib3V0IHdhaXRpbmcgaW5kZWZpbml0ZWx5IHVudGlsIGl0IGdldHMgaXQgKHVzZXMgdGhlIGtleXdvcmQgJ3lpZWxkJylcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyYW5zaXRpb24gZWZmZWN0IG9uIHRoZSBpbWFnZXMuXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5zbGlkZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuXHQgICAgY29uc3QgZGVmYXVsdFdpZHRoID0gKHNjcmVlbldpZHRoIC0gaW1hZ2VzUGFuZWwub2Zmc2V0V2lkdGgvIDIpICsgaW1hZ2VzUGFuZWwub2Zmc2V0V2lkdGg7XHJcblx0ICAgIGNvbnN0IHdhcm5pbmdXaWR0aCA9IGRlZmF1bHRXaWR0aCAqIFdBUk5JTkdfVEhSRVNIT0xEIC8gMTAwO1xyXG5cdCAgICBsZXQgdGltZXI7XHJcblxyXG5cdFx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMCc7XHJcblx0ICAgIGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gU0xJREVfRFVSQVRJT04gKyAncyBsaW5lYXInO1xyXG5cdFx0SGVscGVyLnJlbW92ZUNsYXNzKGltYWdlc1BhbmVsLCAnd2FybmluZ0FuaW1hdGlvbicpO1xyXG5cclxuXHQgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHQgICAgXHRpZiAoSGVscGVyLmdldFBvc2l0aW9uKGltYWdlcykueCA8PSB3YXJuaW5nV2lkdGgpIHtcclxuXHRcdFx0XHRIZWxwZXIuYWRkQ2xhc3MoaW1hZ2VzUGFuZWwsICd3YXJuaW5nQW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0ICAgIFx0fVxyXG5cdCAgICB9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0IHRoZSBzbGlkZXIgdHJhbnNpdGlvbiwgZGlzcGxheSB0aGUgZmFpbCBwYW5lbCB3aGVuIHRoZSB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5zdGFydFNsaWRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0SGVscGVyLnNob3dFbGVtZW50KHRoaXMuc2xpZGVyKTtcclxuXHRcdHRoaXMuc2xpZGUoKTtcclxuXHRcdEhlbHBlci50cmFuc2l0aW9uRW5kKGltYWdlcywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdEhlbHBlci5zaG93RWxlbWVudChmYWlsQmFja2dyb3VuZCk7XHJcblx0XHR9KTtcdFx0XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc2xpZGVyO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9zbGlkZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9