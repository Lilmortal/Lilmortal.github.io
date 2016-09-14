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
			Helper.showElement(instructionPanel);
			//this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
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
	 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that were retrieved via Dota API.
	 * It will constantly transition to the left until it reaches the starting position of the panel that holds the images, which in that case the game
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTkxZDM4NjBiMjMwY2Q2M2E3ZmMiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bnBhbmVsLmpzIiwid2VicGFjazovLy8uL2pzL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQSxFQUFDLFlBQVc7QUFDWDtBQUNBOztBQUVBLE1BQU0sU0FBUyxvQkFBUSxDQUFSLENBQWY7O0FBRUEsTUFBTSxjQUFjLElBQUksTUFBSixDQUFXLGFBQVgsQ0FBcEI7QUFDQSxjQUFZLFNBQVo7O0FBRUEsTUFBTSxhQUFhLElBQUksTUFBSixDQUFXLFlBQVgsQ0FBbkI7QUFDQSxhQUFXLFFBQVg7O0FBRUEsTUFBTSxlQUFlLElBQUksTUFBSixDQUFXLGNBQVgsQ0FBckI7QUFDQSxlQUFhLE1BQWI7QUFDQSxFQWRELEk7Ozs7Ozs7O0FDQUE7Ozs7QUFJQSxRQUFPLE9BQVAsR0FBa0IsWUFBVztBQUM1Qjs7QUFFQSxNQUFNLG1CQUFtQixDQUF6QjtBQUNBLE1BQU0saUJBQWlCLG9CQUFRLENBQVIsQ0FBdkI7QUFDQSxNQUFNLFNBQVMsb0JBQVEsQ0FBUixDQUFmO0FBQ0EsTUFBTSxTQUFTLG9CQUFRLENBQVIsQ0FBZjtBQUNBO0FBQ0E7QUFDQSxNQUFNLGtCQUFrQixTQUFTLGNBQVQsQ0FB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QUVHLFdBQVEsWUFBWSxZQUFXO0FBQzlCLFFBQUksT0FBTyxXQUFQLENBQW1CLE1BQW5CLEVBQTJCLENBQTNCLElBQWdDLFlBQXBDLEVBQWtEO0FBQ3BELFlBQU8sUUFBUCxDQUFnQixXQUFoQixFQUE2QixrQkFBN0I7QUFDQSxtQkFBYyxLQUFkO0FBQ0c7QUFDRCxJQUxPLEVBS0wsSUFMSyxDQUFSO0FBTUgsR0FoQkQ7O0FBa0JBOzs7QUFHQSxTQUFPLFNBQVAsQ0FBaUIsV0FBakIsR0FBK0IsWUFBVztBQUN6QyxVQUFPLFdBQVAsQ0FBbUIsS0FBSyxNQUF4QjtBQUNBLFFBQUssS0FBTDtBQUNBLFVBQU8sYUFBUCxDQUFxQixNQUFyQixFQUE2QixZQUFXO0FBQ3ZDLFdBQU8sV0FBUCxDQUFtQixjQUFuQjtBQUNBLElBRkQ7QUFHQSxHQU5EOztBQVFBLFNBQU8sTUFBUDtBQUNBLEVBckRnQixFQUFqQixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGE5MWQzODYwYjIzMGNkNjNhN2ZjXG4gKiovIiwiKGZ1bmN0aW9uKCkge1xyXG5cdC8vVE9ETyAtIFwidXNlIHN0cmljdFwiIGJldHRlciBpbiB0aGlzIElJRkUgb3Igb3V0c2lkZT9cclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQnV0dG9uID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2J1dHRvbi5qcycpO1xyXG5cclxuXHRjb25zdCBzdGFydEJ1dHRvbiA9IG5ldyBCdXR0b24oJ3N0YXJ0QnV0dG9uJyk7XHJcblx0c3RhcnRCdXR0b24uaW5pdFN0YXJ0KCk7XHJcblxyXG5cdGNvbnN0IGZhaWxCdXR0b24gPSBuZXcgQnV0dG9uKCdmYWlsQnV0dG9uJyk7XHJcblx0ZmFpbEJ1dHRvbi5pbml0RmFpbCgpO1xyXG5cclxuXHRjb25zdCBzdWJtaXRCdXR0b24gPSBuZXcgQnV0dG9uKCdzdWJtaXRCdXR0b24nKTtcclxuXHRzdWJtaXRCdXR0b24uc3VibWl0KCk7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbml0LmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgYSBnZW5lcmljIGJ1dHRvbiwgd2hpY2ggaGFzIGEgbXVsdGl0dWRlIG9mIGdlbmVyaWMgdG8gc3BlY2lmaWMgZnVuY3Rpb25zIGZvciBhbGwgcG9zc2libGUgc2NlbmFyaW9zLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gQnV0dG9uXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQ09VTlRET1dOX05VTUJFUiA9IDM7XHJcblx0Y29uc3QgQ291bnRkb3duUGFuZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvdW50ZG93bnBhbmVsLmpzJyk7XHJcblx0Y29uc3QgU2xpZGVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zbGlkZXIuanMnKTtcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHQvL1RPRE8gLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIGlzIGJldHRlciBvciBuYWg/IEhlYXJkIHBlcmZvcm1hbmNlIGlzIHdvcnNlIGJ1dCBob3cgYmFkIGlzIGl0PyB3aHkgcXVlcnlzZWxlY3RvciBvdmVyIGdldGVsZW1lbnQ/XHJcblx0Ly8gVEhJUyBJUyBUT08gU0hJVCwgSVRTIFRPTyBERVBFTkRFTlQgT04gSEFSRCBDT0RFRCBWQVJJQUJMRVM7IENBTiBBTkdVTEFSIDIgSEVMUCBPUiBPVEhFUiBXQVkgVkFOSUxMQSBKUyBDQU4gSEVMUD9cclxuXHRjb25zdCBzdWJtaXRUZXh0ZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0VGV4dGZpZWxkJyk7XHJcblx0Y29uc3QgZmFpbEJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmYWlsQmFja2dyb3VuZCcpWzBdO1xyXG5cdGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdGNvbnN0IGltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2UnKTtcclxuXHRjb25zdCBpbnN0cnVjdGlvblBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5zdHJ1Y3Rpb25QYW5lbCcpWzBdO1xyXG5cdGNvbnN0IGFkZFBvaW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZFBvaW50cycpWzBdO1xyXG5cdGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3cmFwcGVyJylbMF07XHJcblx0Y29uc3Qgc2xpZGVyUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJQYW5lbCcpWzBdO1xyXG5cclxuXHRmdW5jdGlvbiBCdXR0b24oaWQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbCA9IG5ldyBDb3VudGRvd25QYW5lbCgnY291bnRkb3duUGFuZWwnKTtcclxuXHRcdHRoaXMuc2xpZGVyID0gbmV3IFNsaWRlcignc2xpZGVyUGFuZWwnKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGNsaWNrZWQsIHN0YXJ0IHRoZSBjb3VudGRvd24gcGFuZWwuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gQ291bnRkb3duIG51bWJlclxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBjb3VudGRvd24gbnVtYmVyIHJlYWNoZXMgMC5cclxuXHQgKiBAcmV0dXJuIHtbdHlwZV19XHJcblx0ICovXHJcblx0Ly8gVEhJUyBQUk9UT1RZUEUgT1IgTU9EVUxFIFBBVFRFUk4gSVMgQkVUVEVSPz8/IFdIQVQgQUJPVVQgUFVCL1NVQiBJTVBMRU1FTlRBVElPTj9cclxuXHQvLyBJRiBIQVZFIFRJTUUsIFNFRSBJRiBFUzYgQVJST1cgRlVOQ1RJT04gSVMgTU9SRSBSRUFEQUJMRSBPUiBOT1RcclxuXHQvLyBBTkQgQUxMIFRISVMgTUVUSE9EUy4uLk1BWUJFIFNFUEVSQVRFIElUIElOVE8gRElGRkVSRU5UIENPTVBPTkVOVFM/XHJcblx0QnV0dG9uLnByb3RvdHlwZS5zdGFydENvdW50ZG93bkZvclNsaWRlciA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlciwgY2FsbGJhY2spIHtcclxuXHRcdC8vIElzIHVzaW5nIHNlbGYgb2theT8gQ2F1c2UgdGhlcmVzIHdpbmRvdy5zZWxmLi4uYnV0IHdpbGwgSSBldmVyIHVzZSB0aGF0Pz8/XHJcblx0XHRjb25zdCBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNhbGxiYWNrKCk7XHJcblx0XHRcdEhlbHBlci50b2dnbGVDbGFzcyh3cmFwcGVyLCAnZ3JheXNjYWxlQmFja2dyb3VuZEFuaW1hdGlvbicpO1xyXG5cdFx0XHRzZWxmLmNvdW50ZG93blBhbmVsLnN0YXJ0Q291bnRkb3duVGltZXIoY291bnRkb3duTnVtYmVyLCBzZWxmLnNsaWRlci5zdGFydFNsaWRlci5iaW5kKHNlbGYuc2xpZGVyKSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gY2xpY2tlZCwgY2hlY2sgaWYgdGhlIHVzZXIgaW5wdXQgaXMgdmFsaWQ7IGlmIGl0IGlzIHZhbGlkLCBpdCB3aWxsIHJlbW92ZSBhbiBpbWFnZSBhbmQgYWRkIHNvbWUgcG9pbnRzLCBlbHNlIGRpc3BsYXkgYSBmYWlsIGFuaW1hdGlvbi5cclxuXHQgKi9cclxuXHRCdXR0b24ucHJvdG90eXBlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IGltYWdlSXRlcmF0aW9uID0gMDtcclxuXHRcdHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0ICBcdFx0aWYgKCFIZWxwZXIudmFsaWRhdGVJZlVzZXJJbnB1dElzVmFsaWQoc2VsZi5zdWJtaXRUZXh0ZmllbGQpKSB7XHJcblx0ICBcdFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoaW1hZ2VbaW1hZ2VJdGVyYXRpb25dKTtcclxuXHQgIFx0XHRcdGltYWdlSXRlcmF0aW9uKys7XHJcblx0ICBcdFx0XHRhZGRQb2ludHMuaW5uZXJIVE1MID0gXCIrMjAwXCI7XHJcblx0ICBcdFx0XHRIZWxwZXIudG9nZ2xlQ2xhc3MoYWRkUG9pbnRzLCAnYWRkUG9pbnRzQW5pbWF0aW9uJyk7XHJcblx0ICBcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvciBmb3Igd2hlbiB0aGUgc3RhcnQgYnV0dG9uIGlzIGNsaWNrZWQuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gY291bnRkb3duIG51bWJlci5cclxuXHQgKi9cclxuXHRCdXR0b24ucHJvdG90eXBlLmluaXRTdGFydCA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlcikge1xyXG5cdFx0Y29uc29sZS5sb2codGhpcyk7XHJcblx0XHRjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoaW5zdHJ1Y3Rpb25QYW5lbCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdG9yIGZvciB3aGVuIHRoZSBmYWlsIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IGNvdW50ZG93biBudW1iZXIuXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5pbml0RmFpbCA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlcikge1xyXG5cdFx0Y29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGZhaWxCYWNrZ3JvdW5kLCBzbGlkZXJQYW5lbCk7XHJcblx0XHRcdC8vIHJlc2V0IHRoZSBpbWFnZXNcclxuXHRcdFx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTAwJSc7XHJcbiAgXHRcdFx0aW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSAnMHMnO1xyXG4gIFx0XHQgIFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZS5sZW5ndGg7IGkrKykge1xyXG4gIFx0XHRcdFx0aW1hZ2VbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgXHRcdFx0fVxyXG4gIFx0XHRcdC8vZmluZCBvdXQgaG93IHRvIHJlbW92ZSBlcnJvciBib3JkZXJcclxuICBcdFx0XHQvL3N1Ym1pdFRleHRmaWVsZC5zdHlsZS5ib3JkZXIgPSAnNHggc29saWQgIzNGMzgzNSc7XHJcblx0XHR9XHJcblx0XHRIZWxwZXIuc2hvd0VsZW1lbnQoaW5zdHJ1Y3Rpb25QYW5lbCk7XHJcblx0XHQvL3RoaXMuc3RhcnRDb3VudGRvd25Gb3JTbGlkZXIoQ09VTlRET1dOX05VTUJFUiwgY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIEJ1dHRvbjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvYnV0dG9uLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGNvdW50ZG93biBwYW5lbDsgaXQgd2lsbCBjb3VudGRvd24gdW50aWwgaXQgcmVhY2hlcyAwIGJlZm9yZSBpdCBkaXNwbGF5cyB0aGUgc2xpZGVyIHBhbmVsLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0XHJcblx0ZnVuY3Rpb24gY291bnRkb3duUGFuZWwoaWQpIHtcclxuXHRcdHRoaXMuY291bnRkb3duUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdGFydCB0aGUgY291bnRkb3duOyBpdCB3aWxsIGNvdW50ZG93biB0aGUgbnVtYmVyIGRpc3BsYXllZCBvbiB0aGUgc2NyZWVuIHVudGlsIGl0IHJlYWNoZXMgMCwgd2hpY2ggYnkgdGhlbiBpdCB3aWxsIGRpc3BsYXkgdGhlIHNsaWRlciBwYW5lbC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSB0aGUgY291bnRkb3duIG51bWJlciwgZS5nLiBpZiAzLCBpdCB3aWxsIHN0YXJ0IHRoZSBjb3VudGRvd24gZnJvbSAzLlxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCBvbmNlIHRoZSBjb3VudGRvd24gcmVhY2hlcyAwLlxyXG5cdCAqL1xyXG5cdGNvdW50ZG93blBhbmVsLnByb3RvdHlwZS5zdGFydENvdW50ZG93blRpbWVyID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyLCBjYWxsYmFjaykge1xyXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XHJcblx0XHRIZWxwZXIuc2hvd0VsZW1lbnQodGhpcy5jb3VudGRvd25QYW5lbCk7XHJcblx0XHR0aGlzLmNvdW50ZG93blBhbmVsLmlubmVySFRNTCA9IFwiXCI7XHJcblx0XHRjb25zdCBjb3VudERvd25UaW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICBcdFx0aWYgKGNvdW50ZG93bk51bWJlciA9PT0gMCkge1xyXG4gICAgICAgIFx0XHRjbGVhckludGVydmFsKGNvdW50RG93blRpbWVyKTtcclxuICAgICAgICBcdFx0SGVscGVyLmhpZGVFbGVtZW50KHNlbGYuY291bnRkb3duUGFuZWwpO1xyXG4gICAgICAgIFx0XHRjYWxsYmFjaygpO1xyXG4gICAgICAgIFx0fVxyXG4gICAgICAgIFx0c2VsZi5jb3VudGRvd25QYW5lbC5pbm5lckhUTUwgPSBjb3VudGRvd25OdW1iZXItLTtcclxuICAgIFx0fSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gY291bnRkb3duUGFuZWw7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bnBhbmVsLmpzXG4gKiovIiwiLy8gaXMgaXQgcmVhbGx5IHRoZSBiZXN0IHdheT8/PyBsb29rIHVwIENvbW1vbkpTL0FNRC9FUzYgaW1wb3J0L2V4cG9ydCAoPC0tIEkgZ3Vlc3MgdGhpcyBpcyBPSyBzbyBmYXIpXHJcbi8vIFdoYXQgYWJvdXQgaW5zdGVhZCBvZiBIZWxwZXIubWV0aG9kKCksIHVzZSBPYmplY3QuY3JlYXRlPyBEb2VzIHRoaXMgaGVscD9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0dmFyIElTX05VTUVSSUMgPSBuZXcgUmVnRXhwKC9eXFxkKyQvKTtcclxuXHJcblx0LyoqXHJcblx0ICogRmluZCB3aGljaCBDU1MgdHJhbnNpdGlvbiBldmVudHMgZW5kLlxyXG5cdCAqIGh0dHBzOi8vam9uc3VoLmNvbS9ibG9nL2RldGVjdC10aGUtZW5kLW9mLWNzcy1hbmltYXRpb25zLWFuZC10cmFuc2l0aW9ucy13aXRoLWphdmFzY3JpcHQvXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKXtcclxuXHQgIHZhciB0LFxyXG5cdCAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZha2VlbGVtZW50XCIpO1xyXG5cclxuXHQgIHZhciB0cmFuc2l0aW9ucyA9IHtcclxuXHQgICAgXCJ0cmFuc2l0aW9uXCIgICAgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG5cdCAgICBcIk9UcmFuc2l0aW9uXCIgICAgIDogXCJvVHJhbnNpdGlvbkVuZFwiLFxyXG5cdCAgICBcIk1velRyYW5zaXRpb25cIiAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiV2Via2l0VHJhbnNpdGlvblwiOiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIlxyXG5cdCAgfVxyXG5cclxuXHQgIGZvciAodCBpbiB0cmFuc2l0aW9ucyl7XHJcblx0ICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKXtcclxuXHQgICAgICByZXR1cm4gdHJhbnNpdGlvbnNbdF07XHJcblx0ICAgIH1cclxuXHQgIH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBlbCAtIFRoZSBlbGVtZW50IHRoYXQgd2Ugd2FudCB0byBmaW5kIHRoZSBjdXJyZW50IHBvc2l0aW9uIGlzIHJlbGF0aXZlIHRvIHRoZSB3aW5kb3cuXHJcblx0ICogaHR0cHM6Ly93d3cua2lydXBhLmNvbS9odG1sNS9nZXRfZWxlbWVudF9wb3NpdGlvbl91c2luZ19qYXZhc2NyaXB0Lmh0bVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGdldFBvc2l0aW9uKGVsKSB7XHJcblx0XHR2YXIgeFBvcyA9IDA7XHJcblx0XHR2YXIgeVBvcyA9IDA7XHJcblxyXG5cdFx0d2hpbGUgKGVsKSB7XHJcblx0XHRcdGlmIChlbC50YWdOYW1lID09IFwiQk9EWVwiKSB7XHJcblx0XHRcdFx0Ly8gZGVhbCB3aXRoIGJyb3dzZXIgcXVpcmtzIHdpdGggYm9keS93aW5kb3cvZG9jdW1lbnQgYW5kIHBhZ2Ugc2Nyb2xsXHJcblx0XHRcdFx0dmFyIHhTY3JvbGwgPSBlbC5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xyXG5cdFx0XHRcdHZhciB5U2Nyb2xsID0gZWwuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcblxyXG5cdFx0XHRcdHhQb3MgKz0gKGVsLm9mZnNldExlZnQgLSB4U2Nyb2xsICsgZWwuY2xpZW50TGVmdCk7XHJcblx0XHRcdFx0eVBvcyArPSAoZWwub2Zmc2V0VG9wIC0geVNjcm9sbCArIGVsLmNsaWVudFRvcCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gZm9yIGFsbCBvdGhlciBub24tQk9EWSBlbGVtZW50c1xyXG5cdFx0XHRcdHhQb3MgKz0gKGVsLm9mZnNldExlZnQgLSBlbC5zY3JvbGxMZWZ0ICsgZWwuY2xpZW50TGVmdCk7XHJcblx0XHRcdFx0eVBvcyArPSAoZWwub2Zmc2V0VG9wIC0gZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbCA9IGVsLm9mZnNldFBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiB4UG9zLFxyXG5cdFx0XHR5OiB5UG9zXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZCB0aGUgZm9jdXNlZCBlbGVtZW50OyBpdCB3aWxsIGNhbGwgdGhlIGNhbGxiYWNrIHdoZW4gdHJhbnNpdGlvbiBlbmRzLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gdGhlIG9iamVjdCB3aGljaCB3aWxsIGJlIGJpbmRlZCBieSBhIHRyYW5zaXRpb24gZW5kIGxpc3RlbmVyXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IHRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdHJhbnNpdGlvbiBlbmRcclxuXHQgKi9cclxuICBcdGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoZWxlbWVudCwgY2FsbGJhY2spIHtcclxuXHQgICAgY29uc3QgdHJhbnNpdGlvbkV2ZW50ID0gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuXHQgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FdmVudCwgY2FsbGJhY2spO1xyXG4gIFx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwbGF5IHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGRpc3BsYXllZC5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50LCBkaXNwbGF5KSB7XHJcblx0XHRpZiAodHlwZW9mIGRpc3BsYXkgIT09ICd1bmRlZmluZWQnICYmIGRpc3BsYXkgIT09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlIHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGhpZGRlbi5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50KSB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRhcmd1bWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCBhIENTUyBjbGFzcyB0byBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIGFkZGVkIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYSBDU1MgY2xhc3MgZnJvbSBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIHNwZWNpZmllZCBDU1MgY2xhc3MgcmVtb3ZlZC5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0XHQvLyB3ZWlyZCBoYWNrIHJ1bGUgLSBodHRwczovL2Nzcy10cmlja3MuY29tL3Jlc3RhcnQtY3NzLWFuaW1hdGlvbi9cclxuXHRcdHZvaWQgZWxlbWVudC5vZmZzZXRXaWR0aDtcdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGUgd2hldGhlciB0byBhZGQgb3IgcmVtb3ZlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBhZGQgb3IgcmVtb3ZlIHRoZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcbiAgXHRcdH1cclxuICBcdFx0YWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFZhbGlkYXRlIGlmIHVzZXIgaW5wdXQgaXMgYW4gaW50ZWdlciBvbmx5LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIHRleHRmaWVsZCB0aGF0IHdpbGwgYmUgdmFsaWRhdGVkLlxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdmFsaWRhdGVJZlVzZXJJbnB1dElzVmFsaWQodGV4dGZpZWxkKSB7XHJcblx0XHRpZiAoSVNfTlVNRVJJQy50ZXN0KHRleHRmaWVsZC52YWx1ZSkpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0b2dnbGVDbGFzcyh0ZXh0ZmllbGQsICdzaGFrZVRleHRmaWVsZEFuaW1hdGlvbicpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgXHRcdH1cclxuICBcdH1cclxuXHJcbiAgXHRyZXR1cm4ge1xyXG4gIFx0XHR0cmFuc2l0aW9uRW5kLFxyXG4gIFx0XHRnZXRQb3NpdGlvbixcclxuICBcdFx0c2hvd0VsZW1lbnQsXHJcbiAgXHRcdGhpZGVFbGVtZW50LFxyXG4gIFx0XHRhZGRDbGFzcyxcclxuICBcdFx0cmVtb3ZlQ2xhc3MsXHJcbiAgXHRcdHRvZ2dsZUNsYXNzLFxyXG4gIFx0XHR2YWxpZGF0ZUlmVXNlcklucHV0SXNWYWxpZFxyXG4gIFx0fVxyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaGVscGVyLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIHNsaWRlciB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGFmdGVyIHRoZSBjb3VudGRvd24uIEl0IHdpbGwgZGlzcGxheSBhbiBlbmRsZXNzIHN0cmVhbSBvZiBkb3RhIGltYWdlcyB0aGF0IHdlcmUgcmV0cmlldmVkIHZpYSBEb3RhIEFQSS5cclxuICogSXQgd2lsbCBjb25zdGFudGx5IHRyYW5zaXRpb24gdG8gdGhlIGxlZnQgdW50aWwgaXQgcmVhY2hlcyB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHBhbmVsIHRoYXQgaG9sZHMgdGhlIGltYWdlcywgd2hpY2ggaW4gdGhhdCBjYXNlIHRoZSBnYW1lXHJcbiAqIGxvc2UuIFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Y29uc3QgU0xJREVfRFVSQVRJT04gPSAxMDtcclxuXHRjb25zdCBXQVJOSU5HX1RIUkVTSE9MRCA9IDMwO1xyXG5cdGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdGNvbnN0IGltYWdlc1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzUGFuZWwnKVswXTtcclxuXHRjb25zdCBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxCYWNrZ3JvdW5kJylbMF07XHJcblxyXG5cdGZ1bmN0aW9uIHNsaWRlcihzbGlkZXIpIHtcclxuXHRcdHRoaXMuc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzbGlkZXIpWzBdO1xyXG5cdH1cclxuXHJcblx0c2xpZGVyLnByb3RvdHlwZS5nZXRJbWFnZXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdC8vIFRPRE8gLSBHZXQgbGlzdCBvZiBkb3RhIGltYWdlcyB1c2luZyBBSkFYLCBsb29rIHVwIFByb21pc2VzIGFuZCBHZW5lcmF0b3JzXHJcblx0XHQvLyBQcm9taXNlcyAtIGFzeWNocm9ub3VzIGNhbGxzLCBkbyB0aGlzLCB0aGVuIGRvIHRoaXNcclxuXHRcdC8vIEdlbmVyYXRvcnMgLSBzb21ldGhpbmcgYWJvdXQgd2FpdGluZyBpbmRlZmluaXRlbHkgdW50aWwgaXQgZ2V0cyBpdCAodXNlcyB0aGUga2V5d29yZCAneWllbGQnKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVHJhbnNpdGlvbiBlZmZlY3Qgb24gdGhlIGltYWdlcy5cclxuXHQgKi9cclxuXHRzbGlkZXIucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cdCAgICBjb25zdCBkZWZhdWx0V2lkdGggPSAoc2NyZWVuV2lkdGggLSBpbWFnZXNQYW5lbC5vZmZzZXRXaWR0aC8gMikgKyBpbWFnZXNQYW5lbC5vZmZzZXRXaWR0aDtcclxuXHQgICAgY29uc3Qgd2FybmluZ1dpZHRoID0gZGVmYXVsdFdpZHRoICogV0FSTklOR19USFJFU0hPTEQgLyAxMDA7XHJcblx0ICAgIGxldCB0aW1lcjtcclxuXHJcblx0XHRpbWFnZXMuc3R5bGUubWFyZ2luTGVmdCA9ICcwJztcclxuXHQgICAgaW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSBTTElERV9EVVJBVElPTiArICdzIGxpbmVhcic7XHJcblx0XHRIZWxwZXIucmVtb3ZlQ2xhc3MoaW1hZ2VzUGFuZWwsICd3YXJuaW5nQW5pbWF0aW9uJyk7XHJcblxyXG5cdCAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdCAgICBcdGlmIChIZWxwZXIuZ2V0UG9zaXRpb24oaW1hZ2VzKS54IDw9IHdhcm5pbmdXaWR0aCkge1xyXG5cdFx0XHRcdEhlbHBlci5hZGRDbGFzcyhpbWFnZXNQYW5lbCwgJ3dhcm5pbmdBbmltYXRpb24nKTtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHQgICAgXHR9XHJcblx0ICAgIH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3RhcnQgdGhlIHNsaWRlciB0cmFuc2l0aW9uLCBkaXNwbGF5IHRoZSBmYWlsIHBhbmVsIHdoZW4gdGhlIHRyYW5zaXRpb24gZW5kcy5cclxuXHQgKi9cclxuXHRzbGlkZXIucHJvdG90eXBlLnN0YXJ0U2xpZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRIZWxwZXIuc2hvd0VsZW1lbnQodGhpcy5zbGlkZXIpO1xyXG5cdFx0dGhpcy5zbGlkZSgpO1xyXG5cdFx0SGVscGVyLnRyYW5zaXRpb25FbmQoaW1hZ2VzLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0SGVscGVyLnNob3dFbGVtZW50KGZhaWxCYWNrZ3JvdW5kKTtcclxuXHRcdH0pO1x0XHRcclxuXHR9XHJcblxyXG5cdHJldHVybiBzbGlkZXI7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL3NsaWRlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=