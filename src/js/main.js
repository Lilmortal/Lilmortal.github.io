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
		var SLIDE_DURATION = 2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzI0MjA5YjZlOTI2MjQ2OTgzOWUiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bnBhbmVsLmpzIiwid2VicGFjazovLy8uL2pzL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQSxFQUFDLFlBQVc7QUFDWDtBQUNBOztBQUVBLE1BQU0sU0FBUyxvQkFBUSxDQUFSLENBQWY7O0FBRUEsTUFBTSxjQUFjLElBQUksTUFBSixDQUFXLGFBQVgsQ0FBcEI7QUFDQSxjQUFZLFNBQVo7O0FBRUEsTUFBTSxhQUFhLElBQUksTUFBSixDQUFXLFlBQVgsQ0FBbkI7QUFDQSxhQUFXLFFBQVg7O0FBRUEsTUFBTSxlQUFlLElBQUksTUFBSixDQUFXLGNBQVgsQ0FBckI7QUFDQSxlQUFhLE1BQWI7QUFDQSxFQWRELEk7Ozs7Ozs7O0FDQUE7Ozs7QUFJQSxRQUFPLE9BQVAsR0FBa0IsWUFBVztBQUM1Qjs7QUFFQSxNQUFNLG1CQUFtQixDQUF6QjtBQUNBLE1BQU0saUJBQWlCLG9CQUFRLENBQVIsQ0FBdkI7QUFDQSxNQUFNLFNBQVMsb0JBQVEsQ0FBUixDQUFmO0FBQ0EsTUFBTSxTQUFTLG9CQUFRLENBQVIsQ0FBZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sa0JBQWtCLFNBQVMsY0FB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O0FBQzlCLFFBQUksT0FBTyxXQUFQLENBQW1CLE1BQW5CLEVBQTJCLENBQTNCLElBQWdDLFlBQXBDLEVBQWtEO0FBQ3BELFlBQU8sUUFBUCxDQUFnQixXQUFoQixFQUE2QixrQkFBN0I7QUFDQSxtQkFBYyxLQUFkO0FBQ0c7QUFDRCxJQUxPLEVBS0wsSUFMSyxDQUFSO0FBTUgsR0FoQkQ7O0FBa0JBOzs7QUFHQSxTQUFPLFNBQVAsQ0FBaUIsV0FBakIsR0FBK0IsWUFBVztBQUN6QyxVQUFPLFdBQVAsQ0FBbUIsS0FBSyxNQUF4QjtBQUNBLFFBQUssS0FBTDtBQUNBLFVBQU8sYUFBUCxDQUFxQixNQUFyQixFQUE2QixZQUFXO0FBQ3ZDLFdBQU8sV0FBUCxDQUFtQixjQUFuQjtBQUNBLElBRkQ7QUFHQSxHQU5EOztBQVFBLFNBQU8sTUFBUDtBQUNBLEVBdERnQixFQUFqQixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGMyNDIwOWI2ZTkyNjI0Njk4MzllXG4gKiovIiwiKGZ1bmN0aW9uKCkge1xyXG5cdC8vVE9ETyAtIFwidXNlIHN0cmljdFwiIGJldHRlciBpbiB0aGlzIElJRkUgb3Igb3V0c2lkZT9cclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQnV0dG9uID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2J1dHRvbi5qcycpO1xyXG5cclxuXHRjb25zdCBzdGFydEJ1dHRvbiA9IG5ldyBCdXR0b24oJ3N0YXJ0QnV0dG9uJyk7XHJcblx0c3RhcnRCdXR0b24uaW5pdFN0YXJ0KCk7XHJcblxyXG5cdGNvbnN0IGZhaWxCdXR0b24gPSBuZXcgQnV0dG9uKCdmYWlsQnV0dG9uJyk7XHJcblx0ZmFpbEJ1dHRvbi5pbml0RmFpbCgpO1xyXG5cclxuXHRjb25zdCBzdWJtaXRCdXR0b24gPSBuZXcgQnV0dG9uKCdzdWJtaXRCdXR0b24nKTtcclxuXHRzdWJtaXRCdXR0b24uc3VibWl0KCk7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbml0LmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgYSBnZW5lcmljIGJ1dHRvbiwgd2hpY2ggaGFzIGEgbXVsdGl0dWRlIG9mIGdlbmVyaWMgdG8gc3BlY2lmaWMgZnVuY3Rpb25zIGZvciBhbGwgcG9zc2libGUgc2NlbmFyaW9zLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gQnV0dG9uXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQ09VTlRET1dOX05VTUJFUiA9IDM7XHJcblx0Y29uc3QgQ291bnRkb3duUGFuZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvdW50ZG93bnBhbmVsLmpzJyk7XHJcblx0Y29uc3QgU2xpZGVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zbGlkZXIuanMnKTtcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHQvL1RPRE8gLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIGlzIGJldHRlciBvciBuYWg/IEhlYXJkIHBlcmZvcm1hbmNlIGlzIHdvcnNlIGJ1dCBob3cgYmFkIGlzIGl0PyB3aHkgcXVlcnlzZWxlY3RvciBvdmVyIGdldGVsZW1lbnQ/XHJcblx0Ly8gVEhJUyBJUyBUT08gU0hJVCwgSVRTIFRPTyBERVBFTkRFTlQgT04gSEFSRCBDT0RFRCBWQVJJQUJMRVM7IENBTiBBTkdVTEFSIDIgREVQRU5ERU5DWSBJTkpFQ1RJT04gSEVMUCBPUiBPVEhFUiBXQVkgVkFOSUxMQSBKUyBDQU4gSEVMUD8gSSBLTk9XXHJcblx0Ly8gUkVBQ1QgQ0FOIFdJVEggSVRTIENPTVBPTkVOVCBCQVNFRCBMSUJSQVJZOyBXSEFUIEFCT1VUIEVNQkVSPyBXSFkgQVJFIFBFT1BMRSBESVRDSElORyBFTUJFUj8gVE9PIE9MRD8gS05PQ0tPVVQgTVZWTSBIRUxQUz8/XHJcblx0Y29uc3Qgc3VibWl0VGV4dGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdFRleHRmaWVsZCcpO1xyXG5cdGNvbnN0IGZhaWxCYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbEJhY2tncm91bmQnKVswXTtcclxuXHRjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXTtcclxuXHRjb25zdCBpbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlJyk7XHJcblx0Y29uc3QgaW5zdHJ1Y3Rpb25QYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2luc3RydWN0aW9uUGFuZWwnKVswXTtcclxuXHRjb25zdCBhZGRQb2ludHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRQb2ludHMnKVswXTtcclxuXHRjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd3JhcHBlcicpWzBdO1xyXG5cdGNvbnN0IHNsaWRlclBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyUGFuZWwnKVswXTtcclxuXHJcblx0ZnVuY3Rpb24gQnV0dG9uKGlkKSB7XHJcblx0XHR0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdHRoaXMuY291bnRkb3duUGFuZWwgPSBuZXcgQ291bnRkb3duUGFuZWwoJ2NvdW50ZG93blBhbmVsJyk7XHJcblx0XHR0aGlzLnNsaWRlciA9IG5ldyBTbGlkZXIoJ3NsaWRlclBhbmVsJyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBjbGlja2VkLCBzdGFydCB0aGUgY291bnRkb3duIHBhbmVsLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IENvdW50ZG93biBudW1iZXJcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgY291bnRkb3duIG51bWJlciByZWFjaGVzIDAuXHJcblx0ICogQHJldHVybiB7W3R5cGVdfVxyXG5cdCAqL1xyXG5cdC8vIFRISVMgUFJPVE9UWVBFIE9SIE1PRFVMRSBQQVRURVJOIElTIEJFVFRFUj8/PyBXSEFUIEFCT1VUIFBVQi9TVUIgSU1QTEVNRU5UQVRJT04/XHJcblx0Ly8gSUYgSEFWRSBUSU1FLCBTRUUgSUYgRVM2IEFSUk9XIEZVTkNUSU9OIElTIE1PUkUgUkVBREFCTEUgT1IgTk9UXHJcblx0Ly8gQU5EIEFMTCBUSElTIE1FVEhPRFMuLi5NQVlCRSBTRVBFUkFURSBJVCBJTlRPIERJRkZFUkVOVCBDT01QT05FTlRTP1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuc3RhcnRDb3VudGRvd25Gb3JTbGlkZXIgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIsIGNhbGxiYWNrKSB7XHJcblx0XHQvLyBJcyB1c2luZyBzZWxmIG9rYXk/IENhdXNlIHRoZXJlcyB3aW5kb3cuc2VsZi4uLmJ1dCB3aWxsIEkgZXZlciB1c2UgdGhhdD8/P1xyXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XHJcblx0XHR0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjYWxsYmFjaygpO1xyXG5cdFx0XHRIZWxwZXIudG9nZ2xlQ2xhc3Mod3JhcHBlciwgJ2dyYXlzY2FsZUJhY2tncm91bmRBbmltYXRpb24nKTtcclxuXHRcdFx0c2VsZi5jb3VudGRvd25QYW5lbC5zdGFydENvdW50ZG93blRpbWVyKGNvdW50ZG93bk51bWJlciwgc2VsZi5zbGlkZXIuc3RhcnRTbGlkZXIuYmluZChzZWxmLnNsaWRlcikpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGNsaWNrZWQsIGNoZWNrIGlmIHRoZSB1c2VyIGlucHV0IGlzIHZhbGlkOyBpZiBpdCBpcyB2YWxpZCwgaXQgd2lsbCByZW1vdmUgYW4gaW1hZ2UgYW5kIGFkZCBzb21lIHBvaW50cywgZWxzZSBkaXNwbGF5IGEgZmFpbCBhbmltYXRpb24uXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCBpbWFnZUl0ZXJhdGlvbiA9IDA7XHJcblx0XHR0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdCAgXHRcdGlmICghSGVscGVyLnZhbGlkYXRlSWZVc2VySW5wdXRJc1ZhbGlkKHNlbGYuc3VibWl0VGV4dGZpZWxkKSkge1xyXG5cdCAgXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGltYWdlW2ltYWdlSXRlcmF0aW9uXSk7XHJcblx0ICBcdFx0XHRpbWFnZUl0ZXJhdGlvbisrO1xyXG5cdCAgXHRcdFx0YWRkUG9pbnRzLmlubmVySFRNTCA9IFwiKzIwMFwiO1xyXG5cdCAgXHRcdFx0SGVscGVyLnRvZ2dsZUNsYXNzKGFkZFBvaW50cywgJ2FkZFBvaW50c0FuaW1hdGlvbicpO1xyXG5cdCAgXHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0b3IgZm9yIHdoZW4gdGhlIHN0YXJ0IGJ1dHRvbiBpcyBjbGlja2VkLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IGNvdW50ZG93biBudW1iZXIuXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5pbml0U3RhcnQgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdGNvbnN0IGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdEhlbHBlci5oaWRlRWxlbWVudChpbnN0cnVjdGlvblBhbmVsKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc3RhcnRDb3VudGRvd25Gb3JTbGlkZXIoQ09VTlRET1dOX05VTUJFUiwgY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0b3IgZm9yIHdoZW4gdGhlIGZhaWwgYnV0dG9uIGlzIGNsaWNrZWQuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gY291bnRkb3duIG51bWJlci5cclxuXHQgKi9cclxuXHRCdXR0b24ucHJvdG90eXBlLmluaXRGYWlsID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyKSB7XHJcblx0XHRjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoZmFpbEJhY2tncm91bmQsIHNsaWRlclBhbmVsKTtcclxuXHRcdFx0Ly8gcmVzZXQgdGhlIGltYWdlc1xyXG5cdFx0XHRpbWFnZXMuc3R5bGUubWFyZ2luTGVmdCA9ICcxMDAlJztcclxuICBcdFx0XHRpbWFnZXMuc3R5bGUudHJhbnNpdGlvbiA9ICcwcyc7XHJcbiAgXHRcdCAgXHRmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgXHRcdFx0XHRpbWFnZVtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICBcdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBCdXR0b247XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBjb3VudGRvd24gcGFuZWw7IGl0IHdpbGwgY291bnRkb3duIHVudGlsIGl0IHJlYWNoZXMgMCBiZWZvcmUgaXQgZGlzcGxheXMgdGhlIHNsaWRlciBwYW5lbC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGNvbnN0IEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci5qcycpO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGNvdW50ZG93blBhbmVsKGlkKSB7XHJcblx0XHR0aGlzLmNvdW50ZG93blBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3RhcnQgdGhlIGNvdW50ZG93bjsgaXQgd2lsbCBjb3VudGRvd24gdGhlIG51bWJlciBkaXNwbGF5ZWQgb24gdGhlIHNjcmVlbiB1bnRpbCBpdCByZWFjaGVzIDAsIHdoaWNoIGJ5IHRoZW4gaXQgd2lsbCBkaXNwbGF5IHRoZSBzbGlkZXIgcGFuZWwuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gdGhlIGNvdW50ZG93biBudW1iZXIsIGUuZy4gaWYgMywgaXQgd2lsbCBzdGFydCB0aGUgY291bnRkb3duIGZyb20gMy5cclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgb25jZSB0aGUgY291bnRkb3duIHJlYWNoZXMgMC5cclxuXHQgKi9cclxuXHRjb3VudGRvd25QYW5lbC5wcm90b3R5cGUuc3RhcnRDb3VudGRvd25UaW1lciA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlciwgY2FsbGJhY2spIHtcclxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cdFx0SGVscGVyLnNob3dFbGVtZW50KHRoaXMuY291bnRkb3duUGFuZWwpO1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0Y29uc3QgY291bnREb3duVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgXHRcdGlmIChjb3VudGRvd25OdW1iZXIgPT09IDApIHtcclxuICAgICAgICBcdFx0Y2xlYXJJbnRlcnZhbChjb3VudERvd25UaW1lcik7XHJcbiAgICAgICAgXHRcdEhlbHBlci5oaWRlRWxlbWVudChzZWxmLmNvdW50ZG93blBhbmVsKTtcclxuICAgICAgICBcdFx0Y2FsbGJhY2soKTtcclxuICAgICAgICBcdH1cclxuICAgICAgICBcdHNlbGYuY291bnRkb3duUGFuZWwuaW5uZXJIVE1MID0gY291bnRkb3duTnVtYmVyLS07XHJcbiAgICBcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGNvdW50ZG93blBhbmVsO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9jb3VudGRvd25wYW5lbC5qc1xuICoqLyIsIi8vIGlzIGl0IHJlYWxseSB0aGUgYmVzdCB3YXk/Pz8gbG9vayB1cCBDb21tb25KUy9BTUQvRVM2IGltcG9ydC9leHBvcnQgKDwtLSBJIGd1ZXNzIHRoaXMgaXMgT0sgc28gZmFyKVxyXG4vLyBXaGF0IGFib3V0IGluc3RlYWQgb2YgSGVscGVyLm1ldGhvZCgpLCB1c2UgT2JqZWN0LmNyZWF0ZT8gRG9lcyB0aGlzIGhlbHA/XHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdHZhciBJU19OVU1FUklDID0gbmV3IFJlZ0V4cCgvXlxcZCskLyk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpbmQgd2hpY2ggQ1NTIHRyYW5zaXRpb24gZXZlbnRzIGVuZC5cclxuXHQgKiBodHRwczovL2pvbnN1aC5jb20vYmxvZy9kZXRlY3QtdGhlLWVuZC1vZi1jc3MtYW5pbWF0aW9ucy1hbmQtdHJhbnNpdGlvbnMtd2l0aC1qYXZhc2NyaXB0L1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdoaWNoVHJhbnNpdGlvbkV2ZW50KCl7XHJcblx0ICB2YXIgdCxcclxuXHQgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKTtcclxuXHJcblx0ICB2YXIgdHJhbnNpdGlvbnMgPSB7XHJcblx0ICAgIFwidHJhbnNpdGlvblwiICAgICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJPVHJhbnNpdGlvblwiICAgICA6IFwib1RyYW5zaXRpb25FbmRcIixcclxuXHQgICAgXCJNb3pUcmFuc2l0aW9uXCIgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG5cdCAgICBcIldlYmtpdFRyYW5zaXRpb25cIjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJcclxuXHQgIH1cclxuXHJcblx0ICBmb3IgKHQgaW4gdHJhbnNpdGlvbnMpe1xyXG5cdCAgICBpZiAoZWwuc3R5bGVbdF0gIT09IHVuZGVmaW5lZCl7XHJcblx0ICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG5cdCAgICB9XHJcblx0ICB9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZWwgLSBUaGUgZWxlbWVudCB0aGF0IHdlIHdhbnQgdG8gZmluZCB0aGUgY3VycmVudCBwb3NpdGlvbiBpcyByZWxhdGl2ZSB0byB0aGUgd2luZG93LlxyXG5cdCAqIGh0dHBzOi8vd3d3LmtpcnVwYS5jb20vaHRtbDUvZ2V0X2VsZW1lbnRfcG9zaXRpb25fdXNpbmdfamF2YXNjcmlwdC5odG1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBnZXRQb3NpdGlvbihlbCkge1xyXG5cdFx0dmFyIHhQb3MgPSAwO1xyXG5cdFx0dmFyIHlQb3MgPSAwO1xyXG5cclxuXHRcdHdoaWxlIChlbCkge1xyXG5cdFx0XHRpZiAoZWwudGFnTmFtZSA9PSBcIkJPRFlcIikge1xyXG5cdFx0XHRcdC8vIGRlYWwgd2l0aCBicm93c2VyIHF1aXJrcyB3aXRoIGJvZHkvd2luZG93L2RvY3VtZW50IGFuZCBwYWdlIHNjcm9sbFxyXG5cdFx0XHRcdHZhciB4U2Nyb2xsID0gZWwuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuXHRcdFx0XHR2YXIgeVNjcm9sbCA9IGVsLnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHR4UG9zICs9IChlbC5vZmZzZXRMZWZ0IC0geFNjcm9sbCArIGVsLmNsaWVudExlZnQpO1xyXG5cdFx0XHRcdHlQb3MgKz0gKGVsLm9mZnNldFRvcCAtIHlTY3JvbGwgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIGZvciBhbGwgb3RoZXIgbm9uLUJPRFkgZWxlbWVudHNcclxuXHRcdFx0XHR4UG9zICs9IChlbC5vZmZzZXRMZWZ0IC0gZWwuc2Nyb2xsTGVmdCArIGVsLmNsaWVudExlZnQpO1xyXG5cdFx0XHRcdHlQb3MgKz0gKGVsLm9mZnNldFRvcCAtIGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudFRvcCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogeFBvcyxcclxuXHRcdFx0eTogeVBvc1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmQgdGhlIGZvY3VzZWQgZWxlbWVudDsgaXQgd2lsbCBjYWxsIHRoZSBjYWxsYmFjayB3aGVuIHRyYW5zaXRpb24gZW5kcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHRoZSBvYmplY3Qgd2hpY2ggd2lsbCBiZSBiaW5kZWQgYnkgYSB0cmFuc2l0aW9uIGVuZCBsaXN0ZW5lclxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSB0aGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRyYW5zaXRpb24gZW5kXHJcblx0ICovXHJcbiAgXHRmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGVsZW1lbnQsIGNhbGxiYWNrKSB7XHJcblx0ICAgIGNvbnN0IHRyYW5zaXRpb25FdmVudCA9IHdoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcblx0ICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRXZlbnQsIGNhbGxiYWNrKTtcclxuICBcdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzcGxheSB0aGUgZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWxlbWVudCwgZGlzcGxheSkge1xyXG5cdFx0aWYgKHR5cGVvZiBkaXNwbGF5ICE9PSAndW5kZWZpbmVkJyAmJiBkaXNwbGF5ICE9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZSB0aGUgZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSBoaWRkZW4uXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gaGlkZUVsZW1lbnQoZWxlbWVudCkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0YXJndW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBDU1MgY2xhc3MgdG8gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBhZGRlZCBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGEgQ1NTIGNsYXNzIGZyb20gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBzcGVjaWZpZWQgQ1NTIGNsYXNzIHJlbW92ZWQuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdFx0Ly8gd2VpcmQgaGFjayBydWxlIC0gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9yZXN0YXJ0LWNzcy1hbmltYXRpb24vXHJcblx0XHR2b2lkIGVsZW1lbnQub2Zmc2V0V2lkdGg7XHRcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG4gIFx0XHR9XHJcbiAgXHRcdGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZSBpZiB1c2VyIGlucHV0IGlzIGFuIGludGVnZXIgb25seS5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSB0ZXh0ZmllbGQgdGhhdCB3aWxsIGJlIHZhbGlkYXRlZC5cclxuXHQgKi9cclxuICBcdGZ1bmN0aW9uIHZhbGlkYXRlSWZVc2VySW5wdXRJc1ZhbGlkKHRleHRmaWVsZCkge1xyXG5cdFx0aWYgKElTX05VTUVSSUMudGVzdCh0ZXh0ZmllbGQudmFsdWUpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dG9nZ2xlQ2xhc3ModGV4dGZpZWxkLCAnc2hha2VUZXh0ZmllbGRBbmltYXRpb24nKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4gIFx0XHR9XHJcbiAgXHR9XHJcblxyXG4gIFx0cmV0dXJuIHtcclxuICBcdFx0dHJhbnNpdGlvbkVuZCxcclxuICBcdFx0Z2V0UG9zaXRpb24sXHJcbiAgXHRcdHNob3dFbGVtZW50LFxyXG4gIFx0XHRoaWRlRWxlbWVudCxcclxuICBcdFx0YWRkQ2xhc3MsXHJcbiAgXHRcdHJlbW92ZUNsYXNzLFxyXG4gIFx0XHR0b2dnbGVDbGFzcyxcclxuICBcdFx0dmFsaWRhdGVJZlVzZXJJbnB1dElzVmFsaWRcclxuICBcdH1cclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2hlbHBlci5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBzbGlkZXIgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBhZnRlciB0aGUgY291bnRkb3duLiBJdCB3aWxsIGRpc3BsYXkgYW4gZW5kbGVzcyBzdHJlYW0gb2YgZG90YSBpbWFnZXMgdGhhdCBhcmUgcmV0cmlldmVkIHZpYSBEb3RhIEFQSS5cclxuICogSXQgd2lsbCBjb25zdGFudGx5IHRyYW5zaXRpb24gdG8gdGhlIGxlZnQgdW50aWwgaXQgcmVhY2hlcyB0byB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHBhbmVsIHRoYXQgaG9sZHMgdGhlIGltYWdlcywgd2hpY2ggaW4gdGhhdCBjYXNlIHRoZSBnYW1lXHJcbiAqIGxvc2UuIFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Y29uc3QgU0xJREVfRFVSQVRJT04gPSAyO1xyXG5cdGNvbnN0IFdBUk5JTkdfVEhSRVNIT0xEID0gMzA7XHJcblx0Y29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF07XHJcblx0Y29uc3QgaW1hZ2VzUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXNQYW5lbCcpWzBdO1xyXG5cdGNvbnN0IGZhaWxCYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbEJhY2tncm91bmQnKVswXTtcclxuXHJcblx0ZnVuY3Rpb24gc2xpZGVyKHNsaWRlcikge1xyXG5cdFx0dGhpcy5zbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNsaWRlcilbMF07XHJcblx0fVxyXG5cclxuXHRzbGlkZXIucHJvdG90eXBlLmdldEltYWdlcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gVE9ETyAtIEdldCBsaXN0IG9mIGRvdGEgaW1hZ2VzIHVzaW5nIEFKQVgsIGxvb2sgdXAgUHJvbWlzZXMgYW5kIEdlbmVyYXRvcnNcclxuXHRcdC8vIFByb21pc2VzIC0gYXN5Y2hyb25vdXMgY2FsbHMsIGRvIHRoaXMsIHRoZW4gZG8gdGhpc1xyXG5cdFx0Ly8gR2VuZXJhdG9ycyAtIHNvbWV0aGluZyBhYm91dCB3YWl0aW5nIGluZGVmaW5pdGVseSB1bnRpbCBpdCBnZXRzIGl0ICh1c2VzIHRoZSBrZXl3b3JkICd5aWVsZCcpXHJcblx0XHQvLyBBUFBBUkVOVExZIEdFTkVSQVRPUlMgSVMgQSBIQUNLLCBFUzcgJ0FTWU5DJyBLRVlXT1JEIElTIFRIRSBMRUdJVCBXQVkgT1IgU09NRSBTSElUOyBJIFRISU5LPyBcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyYW5zaXRpb24gZWZmZWN0IG9uIHRoZSBpbWFnZXMuXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5zbGlkZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuXHQgICAgY29uc3QgZGVmYXVsdFdpZHRoID0gKHNjcmVlbldpZHRoIC0gaW1hZ2VzUGFuZWwub2Zmc2V0V2lkdGgvIDIpICsgaW1hZ2VzUGFuZWwub2Zmc2V0V2lkdGg7XHJcblx0ICAgIGNvbnN0IHdhcm5pbmdXaWR0aCA9IGRlZmF1bHRXaWR0aCAqIFdBUk5JTkdfVEhSRVNIT0xEIC8gMTAwO1xyXG5cdCAgICBsZXQgdGltZXI7XHJcblxyXG5cdFx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMCc7XHJcblx0ICAgIGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gU0xJREVfRFVSQVRJT04gKyAncyBsaW5lYXInO1xyXG5cdFx0SGVscGVyLnJlbW92ZUNsYXNzKGltYWdlc1BhbmVsLCAnd2FybmluZ0FuaW1hdGlvbicpO1xyXG5cclxuXHQgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHQgICAgXHRpZiAoSGVscGVyLmdldFBvc2l0aW9uKGltYWdlcykueCA8PSB3YXJuaW5nV2lkdGgpIHtcclxuXHRcdFx0XHRIZWxwZXIuYWRkQ2xhc3MoaW1hZ2VzUGFuZWwsICd3YXJuaW5nQW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0ICAgIFx0fVxyXG5cdCAgICB9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0IHRoZSBzbGlkZXIgdHJhbnNpdGlvbiwgZGlzcGxheSB0aGUgZmFpbCBwYW5lbCB3aGVuIHRoZSB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5zdGFydFNsaWRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0SGVscGVyLnNob3dFbGVtZW50KHRoaXMuc2xpZGVyKTtcclxuXHRcdHRoaXMuc2xpZGUoKTtcclxuXHRcdEhlbHBlci50cmFuc2l0aW9uRW5kKGltYWdlcywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdEhlbHBlci5zaG93RWxlbWVudChmYWlsQmFja2dyb3VuZCk7XHJcblx0XHR9KTtcdFx0XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc2xpZGVyO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9zbGlkZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9