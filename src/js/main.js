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
			element.style.display = 'none';
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
		var imageIteration = 0;
		var submitTextfield = document.getElementById('submitTextfield');
		var failBackground = document.getElementsByClassName('failBackground')[0];
		var images = document.getElementsByClassName('images')[0];
		var image = document.getElementsByClassName('image');
		var instructionPanel = document.getElementsByClassName('instructionPanel')[0];
		var addPoints = document.getElementsByClassName('addPoints')[0];
		var wrapper = document.getElementsByClassName('wrapper')[0];
	
		function Button(id) {
			this.button = document.getElementById(id);
			this.countdownPanel = new CountdownPanel('countdownPanel');
			this.slider = new Slider();
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
				Helper.hideElement(failBackground);
	
				// reset the images
				images.style.marginLeft = '100%';
				images.style.transition = '0s';
				for (var i = 0; i < image.length; i++) {
					image[i].style.display = 'block';
				}
				//find out how to remove error border
				//submitTextfield.style.border = '4x solid #3F3835';
			};
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
	
		function slider() {}
	
		/**
	  * Transition effect on the images.
	  */
		slider.prototype.slide = function () {
			var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			var defaultWidth = screenWidth - imagesPanel.offsetWidth / 2 + imagesPanel.offsetWidth;
			var warningWidth = defaultWidth * WARNING_THRESHOLD / 100;
			var startWarningAnimation = false;
			var timer;
	
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
			this.slide();
			Helper.transitionEnd(images, function () {
				Helper.showElement(failBackground);
			});
		};
	
		return slider;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzAyNDMyYWQzMDQ5NTllZGNlYjgiLCJ3ZWJwYWNrOi8vLy4vanMvc3RhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vanMvaGVscGVyLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvY291bnRkb3ducGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdENBOztBQUVBLHFCQUFRLENBQVI7QUFDQSxxQkFBUSxDQUFSO0FBQ0EscUJBQVEsQ0FBUjtBQUNBLHFCQUFRLENBQVI7O0FBRUEsRUFBQyxZQUFXO0FBQ1YsT0FBSSxjQUFjLElBQUksTUFBSixDQUFXLGFBQVgsQ0FBbEI7QUFDQSxlQUFZLFNBQVo7O0FBRUEsT0FBSSxhQUFhLElBQUksTUFBSixDQUFXLFlBQVgsQ0FBakI7QUFDQSxjQUFXLFFBQVg7O0FBRUEsT0FBSSxlQUFlLElBQUksTUFBSixDQUFXLGNBQVgsQ0FBbkI7QUFDQSxnQkFBYSxNQUFiO0FBQ0QsRUFURCxJOzs7Ozs7QUNQQTs7QUFFQSxRQUFPLE1BQVAsR0FBaUIsWUFBVztBQUMzQixNQUFJLGFBQWEsSUFBSSxNQUFKLENBQVcsT0FBWCxDQUFqQjs7QUFFQTs7OztBQUlBLFdBQVMsb0JBQVQsR0FBK0I7QUFDN0IsT0FBSSxDQUFKO0FBQUEsT0FDSSxLQUFLLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQURUOztBQUdBLE9BQUks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YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMzAyNDMyYWQzMDQ5NTllZGNlYjhcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnJlcXVpcmUoJy4vaGVscGVyLmpzJyk7XHJcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9idXR0b24uanMnKTtcclxucmVxdWlyZSgnLi9jb21wb25lbnRzL2NvdW50ZG93bnBhbmVsLmpzJyk7XHJcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9zbGlkZXIuanMnKTtcclxuXHJcbihmdW5jdGlvbigpIHtcclxuICB2YXIgc3RhcnRCdXR0b24gPSBuZXcgQnV0dG9uKCdzdGFydEJ1dHRvbicpO1xyXG4gIHN0YXJ0QnV0dG9uLmluaXRTdGFydCgpO1xyXG5cclxuICB2YXIgZmFpbEJ1dHRvbiA9IG5ldyBCdXR0b24oJ2ZhaWxCdXR0b24nKTtcclxuICBmYWlsQnV0dG9uLmluaXRGYWlsKCk7XHJcblxyXG4gIHZhciBzdWJtaXRCdXR0b24gPSBuZXcgQnV0dG9uKCdzdWJtaXRCdXR0b24nKTtcclxuICBzdWJtaXRCdXR0b24uc3VibWl0KCk7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9zdGFydC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxud2luZG93LkhlbHBlciA9IChmdW5jdGlvbigpIHtcclxuXHR2YXIgSVNfTlVNRVJJQyA9IG5ldyBSZWdFeHAoL15cXGQrJC8pO1xyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kIHdoaWNoIENTUyB0cmFuc2l0aW9uIGV2ZW50cyBlbmQuXHJcblx0ICogaHR0cHM6Ly9qb25zdWguY29tL2Jsb2cvZGV0ZWN0LXRoZS1lbmQtb2YtY3NzLWFuaW1hdGlvbnMtYW5kLXRyYW5zaXRpb25zLXdpdGgtamF2YXNjcmlwdC9cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3aGljaFRyYW5zaXRpb25FdmVudCgpe1xyXG5cdCAgdmFyIHQsXHJcblx0ICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XHJcblxyXG5cdCAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG5cdCAgICBcInRyYW5zaXRpb25cIiAgICAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiT1RyYW5zaXRpb25cIiAgICAgOiBcIm9UcmFuc2l0aW9uRW5kXCIsXHJcblx0ICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJXZWJraXRUcmFuc2l0aW9uXCI6IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiXHJcblx0ICB9XHJcblxyXG5cdCAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuXHQgICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpe1xyXG5cdCAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGVsIC0gVGhlIGVsZW1lbnQgdGhhdCB3ZSB3YW50IHRvIGZpbmQgdGhlIGN1cnJlbnQgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cclxuXHQgKiBodHRwczovL3d3dy5raXJ1cGEuY29tL2h0bWw1L2dldF9lbGVtZW50X3Bvc2l0aW9uX3VzaW5nX2phdmFzY3JpcHQuaHRtXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWwpIHtcclxuXHRcdHZhciB4UG9zID0gMDtcclxuXHRcdHZhciB5UG9zID0gMDtcclxuXHJcblx0XHR3aGlsZSAoZWwpIHtcclxuXHRcdFx0aWYgKGVsLnRhZ05hbWUgPT0gXCJCT0RZXCIpIHtcclxuXHRcdFx0XHQvLyBkZWFsIHdpdGggYnJvd3NlciBxdWlya3Mgd2l0aCBib2R5L3dpbmRvdy9kb2N1bWVudCBhbmQgcGFnZSBzY3JvbGxcclxuXHRcdFx0XHR2YXIgeFNjcm9sbCA9IGVsLnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcblx0XHRcdFx0dmFyIHlTY3JvbGwgPSBlbC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIHhTY3JvbGwgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSB5U2Nyb2xsICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBmb3IgYWxsIG90aGVyIG5vbi1CT0RZIGVsZW1lbnRzXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsID0gZWwub2Zmc2V0UGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IHhQb3MsXHJcblx0XHRcdHk6IHlQb3NcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kIHRoZSBmb2N1c2VkIGVsZW1lbnQ7IGl0IHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2hlbiB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgYmUgYmluZGVkIGJ5IGEgdHJhbnNpdGlvbiBlbmQgbGlzdGVuZXJcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gdGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0cmFuc2l0aW9uIGVuZFxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlbGVtZW50LCBjYWxsYmFjaykge1xyXG5cdCAgICB2YXIgdHJhbnNpdGlvbkV2ZW50ID0gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuXHQgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FdmVudCwgY2FsbGJhY2spO1xyXG4gIFx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwbGF5IHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGRpc3BsYXllZC5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50LCBkaXNwbGF5KSB7XHJcblx0XHRpZiAodHlwZW9mIGRpc3BsYXkgIT09ICd1bmRlZmluZWQnICYmIGRpc3BsYXkgIT09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlIHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGhpZGRlbi5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50KSB7XHJcblx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBDU1MgY2xhc3MgdG8gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBhZGRlZCBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGEgQ1NTIGNsYXNzIGZyb20gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBzcGVjaWZpZWQgQ1NTIGNsYXNzIHJlbW92ZWQuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdFx0Ly8gd2VpcmQgaGFjayBydWxlIC0gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9yZXN0YXJ0LWNzcy1hbmltYXRpb24vXHJcblx0XHR2b2lkIGVsZW1lbnQub2Zmc2V0V2lkdGg7XHRcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG4gIFx0XHR9XHJcbiAgXHRcdGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZSBpZiB1c2VyIGlucHV0IGlzIGFuIGludGVnZXIgb25seS5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSB0ZXh0ZmllbGQgdGhhdCB3aWxsIGJlIHZhbGlkYXRlZC5cclxuXHQgKi9cclxuICBcdGZ1bmN0aW9uIHZhbGlkYXRlSWZVc2VySW5wdXRJc1ZhbGlkKHRleHRmaWVsZCkge1xyXG5cdFx0aWYgKElTX05VTUVSSUMudGVzdCh0ZXh0ZmllbGQudmFsdWUpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dG9nZ2xlQ2xhc3ModGV4dGZpZWxkLCAnc2hha2VUZXh0ZmllbGRBbmltYXRpb24nKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4gIFx0XHR9XHJcbiAgXHR9XHJcblxyXG4gIFx0cmV0dXJuIHtcclxuICBcdFx0dHJhbnNpdGlvbkVuZDogdHJhbnNpdGlvbkVuZCxcclxuICBcdFx0Z2V0UG9zaXRpb246IGdldFBvc2l0aW9uLFxyXG4gIFx0XHRzaG93RWxlbWVudDogc2hvd0VsZW1lbnQsXHJcbiAgXHRcdGhpZGVFbGVtZW50OiBoaWRlRWxlbWVudCxcclxuICBcdFx0YWRkQ2xhc3M6IGFkZENsYXNzLFxyXG4gIFx0XHRyZW1vdmVDbGFzczogcmVtb3ZlQ2xhc3MsXHJcbiAgXHRcdHRvZ2dsZUNsYXNzOiB0b2dnbGVDbGFzcyxcclxuICBcdFx0dmFsaWRhdGVJZlVzZXJJbnB1dElzVmFsaWQ6IHZhbGlkYXRlSWZVc2VySW5wdXRJc1ZhbGlkXHJcbiAgXHR9XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9oZWxwZXIuanNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyBhIGdlbmVyaWMgYnV0dG9uLCB3aGljaCBoYXMgYSBtdWx0aXR1ZGUgb2YgZ2VuZXJpYyB0byBzcGVjaWZpYyBmdW5jdGlvbnMgZm9yIGFsbCBwb3NzaWJsZSBzY2VuYXJpb3MuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBCdXR0b25cclxuICovXHJcbndpbmRvdy5CdXR0b24gPSAoZnVuY3Rpb24oKSB7XHJcblx0dmFyIENPVU5URE9XTl9OVU1CRVIgPSAzO1xyXG5cdHZhciBpbWFnZUl0ZXJhdGlvbiA9IDA7XHJcblx0dmFyIHN1Ym1pdFRleHRmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRUZXh0ZmllbGQnKTtcclxuXHR2YXIgZmFpbEJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmYWlsQmFja2dyb3VuZCcpWzBdO1xyXG5cdHZhciBpbWFnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXTtcclxuXHR2YXIgaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZScpO1xyXG5cdHZhciBpbnN0cnVjdGlvblBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5zdHJ1Y3Rpb25QYW5lbCcpWzBdO1xyXG5cdHZhciBhZGRQb2ludHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRQb2ludHMnKVswXTtcclxuXHR2YXIgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dyYXBwZXInKVswXTtcclxuXHJcblx0ZnVuY3Rpb24gQnV0dG9uKGlkKSB7XHJcblx0XHR0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdHRoaXMuY291bnRkb3duUGFuZWwgPSBuZXcgQ291bnRkb3duUGFuZWwoJ2NvdW50ZG93blBhbmVsJyk7XHJcblx0XHR0aGlzLnNsaWRlciA9IG5ldyBTbGlkZXIoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGNsaWNrZWQsIHN0YXJ0IHRoZSBjb3VudGRvd24gcGFuZWwuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gQ291bnRkb3duIG51bWJlclxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBjb3VudGRvd24gbnVtYmVyIHJlYWNoZXMgMC5cclxuXHQgKiBAcmV0dXJuIHtbdHlwZV19XHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5zdGFydENvdW50ZG93bkZvclNsaWRlciA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlciwgY2FsbGJhY2spIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNhbGxiYWNrKCk7XHJcblx0XHRcdEhlbHBlci50b2dnbGVDbGFzcyh3cmFwcGVyLCAnZ3JheXNjYWxlQmFja2dyb3VuZEFuaW1hdGlvbicpO1xyXG5cdFx0XHRzZWxmLmNvdW50ZG93blBhbmVsLnN0YXJ0Q291bnRkb3duVGltZXIoY291bnRkb3duTnVtYmVyLCBzZWxmLnNsaWRlci5zdGFydFNsaWRlci5iaW5kKHNlbGYuc2xpZGVyKSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gY2xpY2tlZCwgY2hlY2sgaWYgdGhlIHVzZXIgaW5wdXQgaXMgdmFsaWQ7IGlmIGl0IGlzIHZhbGlkLCBpdCB3aWxsIHJlbW92ZSBhbiBpbWFnZSBhbmQgYWRkIHNvbWUgcG9pbnRzLCBlbHNlIGRpc3BsYXkgYSBmYWlsIGFuaW1hdGlvbi5cclxuXHQgKi9cclxuXHRCdXR0b24ucHJvdG90eXBlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHQgIFx0XHRpZiAoIUhlbHBlci52YWxpZGF0ZUlmVXNlcklucHV0SXNWYWxpZChzZWxmLnN1Ym1pdFRleHRmaWVsZCkpIHtcclxuXHQgIFx0XHRcdEhlbHBlci5oaWRlRWxlbWVudChpbWFnZVtpbWFnZUl0ZXJhdGlvbl0pO1xyXG5cdCAgXHRcdFx0aW1hZ2VJdGVyYXRpb24rKztcclxuXHQgIFx0XHRcdGFkZFBvaW50cy5pbm5lckhUTUwgPSBcIisyMDBcIjtcclxuXHQgIFx0XHRcdEhlbHBlci50b2dnbGVDbGFzcyhhZGRQb2ludHMsICdhZGRQb2ludHNBbmltYXRpb24nKTtcclxuXHQgIFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdG9yIGZvciB3aGVuIHRoZSBzdGFydCBidXR0b24gaXMgY2xpY2tlZC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBjb3VudGRvd24gbnVtYmVyLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuaW5pdFN0YXJ0ID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyKSB7XHJcblx0XHR2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGluc3RydWN0aW9uUGFuZWwpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zdGFydENvdW50ZG93bkZvclNsaWRlcihDT1VOVERPV05fTlVNQkVSLCBjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvciBmb3Igd2hlbiB0aGUgZmFpbCBidXR0b24gaXMgY2xpY2tlZC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBjb3VudGRvd24gbnVtYmVyLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuaW5pdEZhaWwgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoZmFpbEJhY2tncm91bmQpO1xyXG5cclxuXHRcdFx0Ly8gcmVzZXQgdGhlIGltYWdlc1xyXG5cdFx0XHRpbWFnZXMuc3R5bGUubWFyZ2luTGVmdCA9ICcxMDAlJztcclxuICBcdFx0XHRpbWFnZXMuc3R5bGUudHJhbnNpdGlvbiA9ICcwcyc7XHJcbiAgXHRcdCAgXHRmb3IgKHZhciBpID0gMDsgaSA8IGltYWdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgXHRcdFx0XHRpbWFnZVtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICBcdFx0XHR9XHJcbiAgXHRcdFx0Ly9maW5kIG91dCBob3cgdG8gcmVtb3ZlIGVycm9yIGJvcmRlclxyXG4gIFx0XHRcdC8vc3VibWl0VGV4dGZpZWxkLnN0eWxlLmJvcmRlciA9ICc0eCBzb2xpZCAjM0YzODM1JztcclxuXHRcdH1cclxuXHRcdHRoaXMuc3RhcnRDb3VudGRvd25Gb3JTbGlkZXIoQ09VTlRET1dOX05VTUJFUiwgY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIEJ1dHRvbjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvYnV0dG9uLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBjb3VudGRvd24gcGFuZWw7IGl0IHdpbGwgY291bnRkb3duIHVudGlsIGl0IHJlYWNoZXMgMCBiZWZvcmUgaXQgZGlzcGxheXMgdGhlIHNsaWRlciBwYW5lbC5cclxuICovXHJcbndpbmRvdy5Db3VudGRvd25QYW5lbCA9IChmdW5jdGlvbigpIHtcclxuXHRmdW5jdGlvbiBjb3VudGRvd25QYW5lbChpZCkge1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0IHRoZSBjb3VudGRvd247IGl0IHdpbGwgY291bnRkb3duIHRoZSBudW1iZXIgZGlzcGxheWVkIG9uIHRoZSBzY3JlZW4gdW50aWwgaXQgcmVhY2hlcyAwLCB3aGljaCBieSB0aGVuIGl0IHdpbGwgZGlzcGxheSB0aGUgc2xpZGVyIHBhbmVsLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IHRoZSBjb3VudGRvd24gbnVtYmVyLCBlLmcuIGlmIDMsIGl0IHdpbGwgc3RhcnQgdGhlIGNvdW50ZG93biBmcm9tIDMuXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIG9uY2UgdGhlIGNvdW50ZG93biByZWFjaGVzIDAuXHJcblx0ICovXHJcblx0Y291bnRkb3duUGFuZWwucHJvdG90eXBlLnN0YXJ0Q291bnRkb3duVGltZXIgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIsIGNhbGxiYWNrKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRIZWxwZXIuc2hvd0VsZW1lbnQodGhpcy5jb3VudGRvd25QYW5lbCk7XHJcblx0XHR0aGlzLmNvdW50ZG93blBhbmVsLmlubmVySFRNTCA9IFwiXCI7XHJcblx0XHR2YXIgY291bnREb3duVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgXHRcdGlmIChjb3VudGRvd25OdW1iZXIgPT09IDApIHtcclxuICAgICAgICBcdFx0Y2xlYXJJbnRlcnZhbChjb3VudERvd25UaW1lcik7XHJcbiAgICAgICAgXHRcdEhlbHBlci5oaWRlRWxlbWVudChzZWxmLmNvdW50ZG93blBhbmVsKTtcclxuICAgICAgICBcdFx0Y2FsbGJhY2soKTtcclxuICAgICAgICBcdH1cclxuICAgICAgICBcdHNlbGYuY291bnRkb3duUGFuZWwuaW5uZXJIVE1MID0gY291bnRkb3duTnVtYmVyLS07XHJcbiAgICBcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGNvdW50ZG93blBhbmVsO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9jb3VudGRvd25wYW5lbC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIHNsaWRlciB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGFmdGVyIHRoZSBjb3VudGRvd24uIEl0IHdpbGwgZGlzcGxheSBhbiBlbmRsZXNzIHN0cmVhbSBvZiBkb3RhIGltYWdlcyB0aGF0IHdlcmUgcmV0cmlldmVkIHZpYSBEb3RhIEFQSS5cclxuICogSXQgd2lsbCBjb25zdGFudGx5IHRyYW5zaXRpb24gdG8gdGhlIGxlZnQgdW50aWwgaXQgcmVhY2hlcyB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHBhbmVsIHRoYXQgaG9sZHMgdGhlIGltYWdlcywgd2hpY2ggaW4gdGhhdCBjYXNlIHRoZSBnYW1lXHJcbiAqIGxvc2UuIFxyXG4gKi9cclxud2luZG93LlNsaWRlciA9IChmdW5jdGlvbigpIHtcclxuXHR2YXIgU0xJREVfRFVSQVRJT04gPSAxMDtcclxuXHR2YXIgV0FSTklOR19USFJFU0hPTEQgPSAzMDtcclxuXHJcblx0dmFyIGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdHZhciBpbWFnZXNQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlc1BhbmVsJylbMF07XHJcblx0dmFyIGZhaWxCYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbEJhY2tncm91bmQnKVswXTtcclxuXHJcblx0ZnVuY3Rpb24gc2xpZGVyKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyYW5zaXRpb24gZWZmZWN0IG9uIHRoZSBpbWFnZXMuXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5zbGlkZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XHJcblx0ICAgIHZhciBkZWZhdWx0V2lkdGggPSAoc2NyZWVuV2lkdGggLSBpbWFnZXNQYW5lbC5vZmZzZXRXaWR0aC8gMikgKyBpbWFnZXNQYW5lbC5vZmZzZXRXaWR0aDtcclxuXHQgICAgdmFyIHdhcm5pbmdXaWR0aCA9IGRlZmF1bHRXaWR0aCAqIFdBUk5JTkdfVEhSRVNIT0xEIC8gMTAwO1xyXG5cdCAgICB2YXIgc3RhcnRXYXJuaW5nQW5pbWF0aW9uID0gZmFsc2U7XHJcblx0ICAgIHZhciB0aW1lcjtcclxuXHJcblx0XHRpbWFnZXMuc3R5bGUubWFyZ2luTGVmdCA9ICcwJztcclxuXHQgICAgaW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSBTTElERV9EVVJBVElPTiArICdzIGxpbmVhcic7XHJcblx0XHRIZWxwZXIucmVtb3ZlQ2xhc3MoaW1hZ2VzUGFuZWwsICd3YXJuaW5nQW5pbWF0aW9uJyk7XHJcblxyXG5cdCAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdCAgICBcdGlmIChIZWxwZXIuZ2V0UG9zaXRpb24oaW1hZ2VzKS54IDw9IHdhcm5pbmdXaWR0aCkge1xyXG5cdFx0XHRcdEhlbHBlci5hZGRDbGFzcyhpbWFnZXNQYW5lbCwgJ3dhcm5pbmdBbmltYXRpb24nKTtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHQgICAgXHR9XHJcblx0ICAgIH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3RhcnQgdGhlIHNsaWRlciB0cmFuc2l0aW9uLCBkaXNwbGF5IHRoZSBmYWlsIHBhbmVsIHdoZW4gdGhlIHRyYW5zaXRpb24gZW5kcy5cclxuXHQgKi9cclxuXHRzbGlkZXIucHJvdG90eXBlLnN0YXJ0U2xpZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnNsaWRlKCk7XHJcblx0XHRIZWxwZXIudHJhbnNpdGlvbkVuZChpbWFnZXMsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuc2hvd0VsZW1lbnQoZmFpbEJhY2tncm91bmQpO1xyXG5cdFx0fSk7XHRcdFxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHNsaWRlcjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvc2xpZGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==