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

	'use strict';
	
	(function () {
		//TODO - "use strict" better in this IIFE or outside?
		"use strict";
	
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
		"use strict";
	
		var COUNTDOWN_NUMBER = 3;
		var CountdownPanel = __webpack_require__(3);
		var Slider = __webpack_require__(5);
		var Helper = __webpack_require__(4);
		//TODO - document.querySelector is better or nah? Heard performance is worse but how bad is it? why queryselector over getelement?
		// THIS IS TOO SHIT, ITS TOO DEPENDENT ON HARD CODED VARIABLES; CAN ANGULAR 2 DEPENDENCY INJECTION HELP OR OTHER WAY VANILLA JS CAN HELP? I KNOW
		// REACT CAN WITH ITS COMPONENT BASED LIBRARY; WHAT ABOUT EMBER? WHY ARE PEOPLE DITCHING EMBER? TOO OLD? KNOCKOUT MVVM HELPS??
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
		// AND ALL THIS METHODS...MAYBE SEPERATE IT INTO DIFFERENT COMPONENTS?
		Button.prototype.startCountdownForSlider = function (countdownNumber, callback) {
			// Is using self okay? Cause theres window.self...but will I ever use that???
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
			};
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
		"use strict";
	
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
	
	// is it really the best way??? look up CommonJS/AMD/ES6 import/export (<-- I guess this is OK so far)
	// What about instead of Helper.method(), use Object.create? Does this help?
	// http://requirejs.org/docs/node.html#1
	// By using RequireJS on the server, you can use one format for all your modules, whether they are running server side or in the browser. (hmm...)
	module.exports = function () {
		"use strict";
	
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

	'use strict';
	
	/**
	 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
	 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
	 * lose. 
	 */
	module.exports = function () {
		"use strict";
	
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
		// APPARENTLY GENERATORS IS A HACK, ES7 'ASYNC' KEYWORD IS THE LEGIT WAY OR SOME SHIT; I THINK? 
	
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTI4N2ZjODM1NzU4YjU2MTRiNzQiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bnBhbmVsLmpzIiwid2VicGFjazovLy8uL2pzL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQSxFQUFDLFlBQVc7QUFDWDtBQUNBOztBQUVBLE1BQU0sU0FBUyxvQkFBUSxDQUFSLENBQWY7O0FBRUEsTUFBTSxjQUFjLElBQUksTUFBSixDQUFXLGFBQVgsQ0FBcEI7QUFDQSxjQUFZLFNBQVo7O0FBRUEsTUFBTSxhQUFhLElBQUksTUFBSixDQUFXLFlBQVgsQ0FBbkI7QUFDQSxhQUFXLFFBQVg7O0FBRUEsTUFBTSxlQUFlLElBQUksTUFBSixDQUFXLGNBQVgsQ0FBckI7QUFDQSxlQUFhLE1BQWI7QUFDQSxFQWRELEk7Ozs7Ozs7O0FDQUE7Ozs7QUFJQSxRQUFPLE9BQVAsR0FBa0IsWUFBVztBQUM1Qjs7QUFFQSxNQUFNLG1CQUFtQixDQUF6QjtBQUNBLE1BQU0saUJBQWlCLG9CQUFRLENBQVIsQ0FBdkI7QUFDQSxNQUFNLFNBQVMsb0JBQVEsQ0FBUixDQUFmO0FBQ0EsTUFBTSxTQUFTLG9CQUFRLENBQVIsQ0FBZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sa0JBQWtCLFNBQVMsY0FB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LFlBQVksWUFBVztBQUM5QixRQUFJLE9BQU8sV0FBUCxDQUFtQixNQUFuQixFQUEyQixDQUEzQixJQUFnQyxZQUFwQyxFQUFrRDtBQUNwRCxZQUFPLFFBQVAsQ0FBZ0IsV0FBaEIsRUFBNkIsa0JBQTdCO0FBQ0EsbUJBQWMsS0FBZDtBQUNHO0FBQ0QsSUFMTyxFQUtMLElBTEssQ0FBUjtBQU1ILEdBaEJEOztBQWtCQTs7O0FBR0EsU0FBTyxTQUFQLENBQWlCLFdBQWpCLEdBQStCLFlBQVc7QUFDekMsVUFBTyxXQUFQLENBQW1CLEtBQUssTUFBeEI7QUFDQSxRQUFLLEtBQUw7QUFDQSxVQUFPLGFBQVAsQ0FBcUIsTUFBckIsRUFBNkIsWUFBVztBQUN2QyxXQUFPLFdBQVAsQ0FBbUIsY0FBbkI7QUFDQSxJQUZEO0FBR0EsR0FORDs7QUFRQSxTQUFPLE1BQVA7QUFDQSxFQXREZ0IsRUFBakIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1Mjg3ZmM4MzU3NThiNTYxNGI3NFxuICoqLyIsIihmdW5jdGlvbigpIHtcclxuXHQvL1RPRE8gLSBcInVzZSBzdHJpY3RcIiBiZXR0ZXIgaW4gdGhpcyBJSUZFIG9yIG91dHNpZGU/XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGNvbnN0IEJ1dHRvbiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9idXR0b24uanMnKTtcclxuXHJcblx0Y29uc3Qgc3RhcnRCdXR0b24gPSBuZXcgQnV0dG9uKCdzdGFydEJ1dHRvbicpO1xyXG5cdHN0YXJ0QnV0dG9uLmluaXRTdGFydCgpO1xyXG5cclxuXHRjb25zdCBmYWlsQnV0dG9uID0gbmV3IEJ1dHRvbignZmFpbEJ1dHRvbicpO1xyXG5cdGZhaWxCdXR0b24uaW5pdEZhaWwoKTtcclxuXHJcblx0Y29uc3Qgc3VibWl0QnV0dG9uID0gbmV3IEJ1dHRvbignc3VibWl0QnV0dG9uJyk7XHJcblx0c3VibWl0QnV0dG9uLnN1Ym1pdCgpO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW5pdC5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIGEgZ2VuZXJpYyBidXR0b24sIHdoaWNoIGhhcyBhIG11bHRpdHVkZSBvZiBnZW5lcmljIHRvIHNwZWNpZmljIGZ1bmN0aW9ucyBmb3IgYWxsIHBvc3NpYmxlIHNjZW5hcmlvcy5cclxuICogQHBhcmFtIHtPYmplY3R9IEJ1dHRvblxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGNvbnN0IENPVU5URE9XTl9OVU1CRVIgPSAzO1xyXG5cdGNvbnN0IENvdW50ZG93blBhbmVsID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb3VudGRvd25wYW5lbC5qcycpO1xyXG5cdGNvbnN0IFNsaWRlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc2xpZGVyLmpzJyk7XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Ly9UT0RPIC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBpcyBiZXR0ZXIgb3IgbmFoPyBIZWFyZCBwZXJmb3JtYW5jZSBpcyB3b3JzZSBidXQgaG93IGJhZCBpcyBpdD8gd2h5IHF1ZXJ5c2VsZWN0b3Igb3ZlciBnZXRlbGVtZW50P1xyXG5cdC8vIFRISVMgSVMgVE9PIFNISVQsIElUUyBUT08gREVQRU5ERU5UIE9OIEhBUkQgQ09ERUQgVkFSSUFCTEVTOyBDQU4gQU5HVUxBUiAyIERFUEVOREVOQ1kgSU5KRUNUSU9OIEhFTFAgT1IgT1RIRVIgV0FZIFZBTklMTEEgSlMgQ0FOIEhFTFA/IEkgS05PV1xyXG5cdC8vIFJFQUNUIENBTiBXSVRIIElUUyBDT01QT05FTlQgQkFTRUQgTElCUkFSWTsgV0hBVCBBQk9VVCBFTUJFUj8gV0hZIEFSRSBQRU9QTEUgRElUQ0hJTkcgRU1CRVI/IFRPTyBPTEQ/IEtOT0NLT1VUIE1WVk0gSEVMUFM/P1xyXG5cdGNvbnN0IHN1Ym1pdFRleHRmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRUZXh0ZmllbGQnKTtcclxuXHRjb25zdCBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxCYWNrZ3JvdW5kJylbMF07XHJcblx0Y29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF07XHJcblx0Y29uc3QgaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZScpO1xyXG5cdGNvbnN0IGluc3RydWN0aW9uUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnN0cnVjdGlvblBhbmVsJylbMF07XHJcblx0Y29uc3QgYWRkUG9pbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkUG9pbnRzJylbMF07XHJcblx0Y29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dyYXBwZXInKVswXTtcclxuXHRjb25zdCBzbGlkZXJQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlclBhbmVsJylbMF07XHJcblxyXG5cdGZ1bmN0aW9uIEJ1dHRvbihpZCkge1xyXG5cdFx0dGhpcy5idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0XHR0aGlzLmNvdW50ZG93blBhbmVsID0gbmV3IENvdW50ZG93blBhbmVsKCdjb3VudGRvd25QYW5lbCcpO1xyXG5cdFx0dGhpcy5zbGlkZXIgPSBuZXcgU2xpZGVyKCdzbGlkZXJQYW5lbCcpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gY2xpY2tlZCwgc3RhcnQgdGhlIGNvdW50ZG93biBwYW5lbC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBDb3VudGRvd24gbnVtYmVyXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGNvdW50ZG93biBudW1iZXIgcmVhY2hlcyAwLlxyXG5cdCAqIEByZXR1cm4ge1t0eXBlXX1cclxuXHQgKi9cclxuXHQvLyBUSElTIFBST1RPVFlQRSBPUiBNT0RVTEUgUEFUVEVSTiBJUyBCRVRURVI/Pz8gV0hBVCBBQk9VVCBQVUIvU1VCIElNUExFTUVOVEFUSU9OP1xyXG5cdC8vIElGIEhBVkUgVElNRSwgU0VFIElGIEVTNiBBUlJPVyBGVU5DVElPTiBJUyBNT1JFIFJFQURBQkxFIE9SIE5PVFxyXG5cdC8vIEFORCBBTEwgVEhJUyBNRVRIT0RTLi4uTUFZQkUgU0VQRVJBVEUgSVQgSU5UTyBESUZGRVJFTlQgQ09NUE9ORU5UUz9cclxuXHRCdXR0b24ucHJvdG90eXBlLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyLCBjYWxsYmFjaykge1xyXG5cdFx0Ly8gSXMgdXNpbmcgc2VsZiBva2F5PyBDYXVzZSB0aGVyZXMgd2luZG93LnNlbGYuLi5idXQgd2lsbCBJIGV2ZXIgdXNlIHRoYXQ/Pz9cclxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cdFx0dGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y2FsbGJhY2soKTtcclxuXHRcdFx0SGVscGVyLnRvZ2dsZUNsYXNzKHdyYXBwZXIsICdncmF5c2NhbGVCYWNrZ3JvdW5kQW5pbWF0aW9uJyk7XHJcblx0XHRcdHNlbGYuY291bnRkb3duUGFuZWwuc3RhcnRDb3VudGRvd25UaW1lcihjb3VudGRvd25OdW1iZXIsIHNlbGYuc2xpZGVyLnN0YXJ0U2xpZGVyLmJpbmQoc2VsZi5zbGlkZXIpKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBjbGlja2VkLCBjaGVjayBpZiB0aGUgdXNlciBpbnB1dCBpcyB2YWxpZDsgaWYgaXQgaXMgdmFsaWQsIGl0IHdpbGwgcmVtb3ZlIGFuIGltYWdlIGFuZCBhZGQgc29tZSBwb2ludHMsIGVsc2UgZGlzcGxheSBhIGZhaWwgYW5pbWF0aW9uLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuc3VibWl0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgaW1hZ2VJdGVyYXRpb24gPSAwO1xyXG5cdFx0dGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHQgIFx0XHRpZiAoIUhlbHBlci52YWxpZGF0ZUlmVXNlcklucHV0SXNWYWxpZChzZWxmLnN1Ym1pdFRleHRmaWVsZCkpIHtcclxuXHQgIFx0XHRcdEhlbHBlci5oaWRlRWxlbWVudChpbWFnZVtpbWFnZUl0ZXJhdGlvbl0pO1xyXG5cdCAgXHRcdFx0aW1hZ2VJdGVyYXRpb24rKztcclxuXHQgIFx0XHRcdGFkZFBvaW50cy5pbm5lckhUTUwgPSBcIisyMDBcIjtcclxuXHQgIFx0XHRcdEhlbHBlci50b2dnbGVDbGFzcyhhZGRQb2ludHMsICdhZGRQb2ludHNBbmltYXRpb24nKTtcclxuXHQgIFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdG9yIGZvciB3aGVuIHRoZSBzdGFydCBidXR0b24gaXMgY2xpY2tlZC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBjb3VudGRvd24gbnVtYmVyLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuaW5pdFN0YXJ0ID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyKSB7XHJcblx0XHRjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoaW5zdHJ1Y3Rpb25QYW5lbCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdG9yIGZvciB3aGVuIHRoZSBmYWlsIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IGNvdW50ZG93biBudW1iZXIuXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5pbml0RmFpbCA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlcikge1xyXG5cdFx0Y29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGZhaWxCYWNrZ3JvdW5kLCBzbGlkZXJQYW5lbCk7XHJcblx0XHRcdC8vIHJlc2V0IHRoZSBpbWFnZXNcclxuXHRcdFx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTAwJSc7XHJcbiAgXHRcdFx0aW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSAnMHMnO1xyXG4gIFx0XHQgIFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZS5sZW5ndGg7IGkrKykge1xyXG4gIFx0XHRcdFx0aW1hZ2VbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5zdGFydENvdW50ZG93bkZvclNsaWRlcihDT1VOVERPV05fTlVNQkVSLCBjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gQnV0dG9uO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9idXR0b24uanNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyB0aGUgY291bnRkb3duIHBhbmVsOyBpdCB3aWxsIGNvdW50ZG93biB1bnRpbCBpdCByZWFjaGVzIDAgYmVmb3JlIGl0IGRpc3BsYXlzIHRoZSBzbGlkZXIgcGFuZWwuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHRcclxuXHRmdW5jdGlvbiBjb3VudGRvd25QYW5lbChpZCkge1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0IHRoZSBjb3VudGRvd247IGl0IHdpbGwgY291bnRkb3duIHRoZSBudW1iZXIgZGlzcGxheWVkIG9uIHRoZSBzY3JlZW4gdW50aWwgaXQgcmVhY2hlcyAwLCB3aGljaCBieSB0aGVuIGl0IHdpbGwgZGlzcGxheSB0aGUgc2xpZGVyIHBhbmVsLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IHRoZSBjb3VudGRvd24gbnVtYmVyLCBlLmcuIGlmIDMsIGl0IHdpbGwgc3RhcnQgdGhlIGNvdW50ZG93biBmcm9tIDMuXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIG9uY2UgdGhlIGNvdW50ZG93biByZWFjaGVzIDAuXHJcblx0ICovXHJcblx0Y291bnRkb3duUGFuZWwucHJvdG90eXBlLnN0YXJ0Q291bnRkb3duVGltZXIgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIsIGNhbGxiYWNrKSB7XHJcblx0XHRjb25zdCBzZWxmID0gdGhpcztcclxuXHRcdEhlbHBlci5zaG93RWxlbWVudCh0aGlzLmNvdW50ZG93blBhbmVsKTtcclxuXHRcdHRoaXMuY291bnRkb3duUGFuZWwuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRcdGNvbnN0IGNvdW50RG93blRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIFx0XHRpZiAoY291bnRkb3duTnVtYmVyID09PSAwKSB7XHJcbiAgICAgICAgXHRcdGNsZWFySW50ZXJ2YWwoY291bnREb3duVGltZXIpO1xyXG4gICAgICAgIFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoc2VsZi5jb3VudGRvd25QYW5lbCk7XHJcbiAgICAgICAgXHRcdGNhbGxiYWNrKCk7XHJcbiAgICAgICAgXHR9XHJcbiAgICAgICAgXHRzZWxmLmNvdW50ZG93blBhbmVsLmlubmVySFRNTCA9IGNvdW50ZG93bk51bWJlci0tO1xyXG4gICAgXHR9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBjb3VudGRvd25QYW5lbDtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvY291bnRkb3ducGFuZWwuanNcbiAqKi8iLCIvLyBpcyBpdCByZWFsbHkgdGhlIGJlc3Qgd2F5Pz8/IGxvb2sgdXAgQ29tbW9uSlMvQU1EL0VTNiBpbXBvcnQvZXhwb3J0ICg8LS0gSSBndWVzcyB0aGlzIGlzIE9LIHNvIGZhcilcclxuLy8gV2hhdCBhYm91dCBpbnN0ZWFkIG9mIEhlbHBlci5tZXRob2QoKSwgdXNlIE9iamVjdC5jcmVhdGU/IERvZXMgdGhpcyBoZWxwP1xyXG4vLyBodHRwOi8vcmVxdWlyZWpzLm9yZy9kb2NzL25vZGUuaHRtbCMxXHJcbi8vIEJ5IHVzaW5nIFJlcXVpcmVKUyBvbiB0aGUgc2VydmVyLCB5b3UgY2FuIHVzZSBvbmUgZm9ybWF0IGZvciBhbGwgeW91ciBtb2R1bGVzLCB3aGV0aGVyIHRoZXkgYXJlIHJ1bm5pbmcgc2VydmVyIHNpZGUgb3IgaW4gdGhlIGJyb3dzZXIuIChobW0uLi4pXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdHZhciBJU19OVU1FUklDID0gbmV3IFJlZ0V4cCgvXlxcZCskLyk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmQgd2hpY2ggQ1NTIHRyYW5zaXRpb24gZXZlbnRzIGVuZC5cclxuXHQgKiBodHRwczovL2pvbnN1aC5jb20vYmxvZy9kZXRlY3QtdGhlLWVuZC1vZi1jc3MtYW5pbWF0aW9ucy1hbmQtdHJhbnNpdGlvbnMtd2l0aC1qYXZhc2NyaXB0L1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdoaWNoVHJhbnNpdGlvbkV2ZW50KCl7XHJcblx0ICB2YXIgdCxcclxuXHQgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKTtcclxuXHJcblx0ICB2YXIgdHJhbnNpdGlvbnMgPSB7XHJcblx0ICAgIFwidHJhbnNpdGlvblwiICAgICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJPVHJhbnNpdGlvblwiICAgICA6IFwib1RyYW5zaXRpb25FbmRcIixcclxuXHQgICAgXCJNb3pUcmFuc2l0aW9uXCIgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG5cdCAgICBcIldlYmtpdFRyYW5zaXRpb25cIjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJcclxuXHQgIH1cclxuXHJcblx0ICBmb3IgKHQgaW4gdHJhbnNpdGlvbnMpe1xyXG5cdCAgICBpZiAoZWwuc3R5bGVbdF0gIT09IHVuZGVmaW5lZCl7XHJcblx0ICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG5cdCAgICB9XHJcblx0ICB9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZWwgLSBUaGUgZWxlbWVudCB0aGF0IHdlIHdhbnQgdG8gZmluZCB0aGUgY3VycmVudCBwb3NpdGlvbiBpcyByZWxhdGl2ZSB0byB0aGUgd2luZG93LlxyXG5cdCAqIGh0dHBzOi8vd3d3LmtpcnVwYS5jb20vaHRtbDUvZ2V0X2VsZW1lbnRfcG9zaXRpb25fdXNpbmdfamF2YXNjcmlwdC5odG1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBnZXRQb3NpdGlvbihlbCkge1xyXG5cdFx0dmFyIHhQb3MgPSAwO1xyXG5cdFx0dmFyIHlQb3MgPSAwO1xyXG5cclxuXHRcdHdoaWxlIChlbCkge1xyXG5cdFx0XHRpZiAoZWwudGFnTmFtZSA9PSBcIkJPRFlcIikge1xyXG5cdFx0XHRcdC8vIGRlYWwgd2l0aCBicm93c2VyIHF1aXJrcyB3aXRoIGJvZHkvd2luZG93L2RvY3VtZW50IGFuZCBwYWdlIHNjcm9sbFxyXG5cdFx0XHRcdHZhciB4U2Nyb2xsID0gZWwuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuXHRcdFx0XHR2YXIgeVNjcm9sbCA9IGVsLnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHR4UG9zICs9IChlbC5vZmZzZXRMZWZ0IC0geFNjcm9sbCArIGVsLmNsaWVudExlZnQpO1xyXG5cdFx0XHRcdHlQb3MgKz0gKGVsLm9mZnNldFRvcCAtIHlTY3JvbGwgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIGZvciBhbGwgb3RoZXIgbm9uLUJPRFkgZWxlbWVudHNcclxuXHRcdFx0XHR4UG9zICs9IChlbC5vZmZzZXRMZWZ0IC0gZWwuc2Nyb2xsTGVmdCArIGVsLmNsaWVudExlZnQpO1xyXG5cdFx0XHRcdHlQb3MgKz0gKGVsLm9mZnNldFRvcCAtIGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudFRvcCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogeFBvcyxcclxuXHRcdFx0eTogeVBvc1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmQgdGhlIGZvY3VzZWQgZWxlbWVudDsgaXQgd2lsbCBjYWxsIHRoZSBjYWxsYmFjayB3aGVuIHRyYW5zaXRpb24gZW5kcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHRoZSBvYmplY3Qgd2hpY2ggd2lsbCBiZSBiaW5kZWQgYnkgYSB0cmFuc2l0aW9uIGVuZCBsaXN0ZW5lclxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSB0aGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRyYW5zaXRpb24gZW5kXHJcblx0ICovXHJcbiAgXHRmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGVsZW1lbnQsIGNhbGxiYWNrKSB7XHJcblx0ICAgIGNvbnN0IHRyYW5zaXRpb25FdmVudCA9IHdoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcblx0ICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRXZlbnQsIGNhbGxiYWNrKTtcclxuICBcdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzcGxheSB0aGUgZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWxlbWVudCwgZGlzcGxheSkge1xyXG5cdFx0aWYgKHR5cGVvZiBkaXNwbGF5ICE9PSAndW5kZWZpbmVkJyAmJiBkaXNwbGF5ICE9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZSB0aGUgZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSBoaWRkZW4uXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gaGlkZUVsZW1lbnQoZWxlbWVudCkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0YXJndW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBDU1MgY2xhc3MgdG8gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBhZGRlZCBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGEgQ1NTIGNsYXNzIGZyb20gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBzcGVjaWZpZWQgQ1NTIGNsYXNzIHJlbW92ZWQuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdFx0Ly8gd2VpcmQgaGFjayBydWxlIC0gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9yZXN0YXJ0LWNzcy1hbmltYXRpb24vXHJcblx0XHR2b2lkIGVsZW1lbnQub2Zmc2V0V2lkdGg7XHRcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG4gIFx0XHR9XHJcbiAgXHRcdGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZSBpZiB1c2VyIGlucHV0IGlzIGFuIGludGVnZXIgb25seS5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSB0ZXh0ZmllbGQgdGhhdCB3aWxsIGJlIHZhbGlkYXRlZC5cclxuXHQgKi9cclxuICBcdGZ1bmN0aW9uIHZhbGlkYXRlSWZVc2VySW5wdXRJc1ZhbGlkKHRleHRmaWVsZCkge1xyXG5cdFx0aWYgKElTX05VTUVSSUMudGVzdCh0ZXh0ZmllbGQudmFsdWUpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dG9nZ2xlQ2xhc3ModGV4dGZpZWxkLCAnc2hha2VUZXh0ZmllbGRBbmltYXRpb24nKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4gIFx0XHR9XHJcbiAgXHR9XHJcblxyXG4gIFx0cmV0dXJuIHtcclxuICBcdFx0dHJhbnNpdGlvbkVuZCxcclxuICBcdFx0Z2V0UG9zaXRpb24sXHJcbiAgXHRcdHNob3dFbGVtZW50LFxyXG4gIFx0XHRoaWRlRWxlbWVudCxcclxuICBcdFx0YWRkQ2xhc3MsXHJcbiAgXHRcdHJlbW92ZUNsYXNzLFxyXG4gIFx0XHR0b2dnbGVDbGFzcyxcclxuICBcdFx0dmFsaWRhdGVJZlVzZXJJbnB1dElzVmFsaWRcclxuICBcdH1cclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2hlbHBlci5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBzbGlkZXIgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBhZnRlciB0aGUgY291bnRkb3duLiBJdCB3aWxsIGRpc3BsYXkgYW4gZW5kbGVzcyBzdHJlYW0gb2YgZG90YSBpbWFnZXMgdGhhdCBhcmUgcmV0cmlldmVkIHZpYSBEb3RhIEFQSS5cclxuICogSXQgd2lsbCBjb25zdGFudGx5IHRyYW5zaXRpb24gdG8gdGhlIGxlZnQgdW50aWwgaXQgcmVhY2hlcyB0byB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHBhbmVsIHRoYXQgaG9sZHMgdGhlIGltYWdlcywgd2hpY2ggaW4gdGhhdCBjYXNlIHRoZSBnYW1lXHJcbiAqIGxvc2UuIFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Y29uc3QgU0xJREVfRFVSQVRJT04gPSAxMDtcclxuXHRjb25zdCBXQVJOSU5HX1RIUkVTSE9MRCA9IDMwO1xyXG5cdGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdGNvbnN0IGltYWdlc1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzUGFuZWwnKVswXTtcclxuXHRjb25zdCBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxCYWNrZ3JvdW5kJylbMF07XHJcblxyXG5cdGZ1bmN0aW9uIHNsaWRlcihzbGlkZXIpIHtcclxuXHRcdHRoaXMuc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzbGlkZXIpWzBdO1xyXG5cdH1cclxuXHJcblx0c2xpZGVyLnByb3RvdHlwZS5nZXRJbWFnZXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdC8vIFRPRE8gLSBHZXQgbGlzdCBvZiBkb3RhIGltYWdlcyB1c2luZyBBSkFYLCBsb29rIHVwIFByb21pc2VzIGFuZCBHZW5lcmF0b3JzXHJcblx0XHQvLyBQcm9taXNlcyAtIGFzeWNocm9ub3VzIGNhbGxzLCBkbyB0aGlzLCB0aGVuIGRvIHRoaXNcclxuXHRcdC8vIEdlbmVyYXRvcnMgLSBzb21ldGhpbmcgYWJvdXQgd2FpdGluZyBpbmRlZmluaXRlbHkgdW50aWwgaXQgZ2V0cyBpdCAodXNlcyB0aGUga2V5d29yZCAneWllbGQnKVxyXG5cdFx0Ly8gQVBQQVJFTlRMWSBHRU5FUkFUT1JTIElTIEEgSEFDSywgRVM3ICdBU1lOQycgS0VZV09SRCBJUyBUSEUgTEVHSVQgV0FZIE9SIFNPTUUgU0hJVDsgSSBUSElOSz8gXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUcmFuc2l0aW9uIGVmZmVjdCBvbiB0aGUgaW1hZ2VzLlxyXG5cdCAqL1xyXG5cdHNsaWRlci5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XHJcblx0ICAgIGNvbnN0IGRlZmF1bHRXaWR0aCA9IChzY3JlZW5XaWR0aCAtIGltYWdlc1BhbmVsLm9mZnNldFdpZHRoLyAyKSArIGltYWdlc1BhbmVsLm9mZnNldFdpZHRoO1xyXG5cdCAgICBjb25zdCB3YXJuaW5nV2lkdGggPSBkZWZhdWx0V2lkdGggKiBXQVJOSU5HX1RIUkVTSE9MRCAvIDEwMDtcclxuXHQgICAgbGV0IHRpbWVyO1xyXG5cclxuXHRcdGltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzAnO1xyXG5cdCAgICBpbWFnZXMuc3R5bGUudHJhbnNpdGlvbiA9IFNMSURFX0RVUkFUSU9OICsgJ3MgbGluZWFyJztcclxuXHRcdEhlbHBlci5yZW1vdmVDbGFzcyhpbWFnZXNQYW5lbCwgJ3dhcm5pbmdBbmltYXRpb24nKTtcclxuXHJcblx0ICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0ICAgIFx0aWYgKEhlbHBlci5nZXRQb3NpdGlvbihpbWFnZXMpLnggPD0gd2FybmluZ1dpZHRoKSB7XHJcblx0XHRcdFx0SGVscGVyLmFkZENsYXNzKGltYWdlc1BhbmVsLCAnd2FybmluZ0FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdCAgICBcdH1cclxuXHQgICAgfSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdGFydCB0aGUgc2xpZGVyIHRyYW5zaXRpb24sIGRpc3BsYXkgdGhlIGZhaWwgcGFuZWwgd2hlbiB0aGUgdHJhbnNpdGlvbiBlbmRzLlxyXG5cdCAqL1xyXG5cdHNsaWRlci5wcm90b3R5cGUuc3RhcnRTbGlkZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdEhlbHBlci5zaG93RWxlbWVudCh0aGlzLnNsaWRlcik7XHJcblx0XHR0aGlzLnNsaWRlKCk7XHJcblx0XHRIZWxwZXIudHJhbnNpdGlvbkVuZChpbWFnZXMsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuc2hvd0VsZW1lbnQoZmFpbEJhY2tncm91bmQpO1xyXG5cdFx0fSk7XHRcdFxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHNsaWRlcjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvc2xpZGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==