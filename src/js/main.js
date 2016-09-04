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
		var imageIteration = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWEwMzE3ZDc2MWI3MzQ0MzA1MzAiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9idXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9jb3VudGRvd25wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7O0FBRUEscUJBQVEsQ0FBUjtBQUNBLHFCQUFRLENBQVI7QUFDQSxxQkFBUSxDQUFSO0FBQ0EscUJBQVEsQ0FBUjs7QUFFQSxFQUFDLFlBQVc7QUFDVixPQUFJLGNBQWMsSUFBSSxNQUFKLENBQVcsYUFBWCxDQUFsQjtBQUNBLGVBQVksU0FBWjs7QUFFQSxPQUFJLGFBQWEsSUFBSSxNQUFKLENBQVcsWUFBWCxDQUFqQjtBQUNBLGNBQVcsUUFBWDs7QUFFQSxPQUFJLGVBQWUsSUFBSSxNQUFKLENBQVcsY0FBWCxDQUFuQjtBQUNBLGdCQUFhLE1BQWI7QUFDRCxFQVRELEk7Ozs7OztBQ1BBOztBQUVBLFFBQU8sTUFBUCxHQUFpQixZQUFXO0FBQzNCLE1BQUksYUFBYSxJQUFJLE1BQUosQ0FBVyxPQUFYLENBQWpCOztBQUVBOzs7O0FBSUEsV0FBUyxvQkFBVCxHQUErQjtBQUM3QixPQUFJLENBQUo7QUFBQSxPQUNJLEtBQUssU0FBUyxhQUFULENBQXVCLGFBQXZCLENBRFQ7O0FBR0EsT0FBSSxjQUFjO0FBQ2hCLGtCQUFvQixlQURKO0FBRWhCLG1CQUFvQixnQkFGSjtBQUdoQixxQkFBb0IsZUFISjtBQUloQix3QkFBb0I7QUFKSixJQUFsQjs7QUFPQSxRQUFLLENBQUwsSUFBVSxXQUFWLEVBQXNCO0FBQ3BCLFFBQUksR0FBRyxLQUFILENBQVMsQ0FBVCxNQUFnQixTQUFwQixFQUE4QjtBQUM1QixZQUFPLFlBQVksQ0FBWixDQUFQO0FBQ0Q7QUFDRjtBQUNGOztBQUVEOzs7O0FBSUEsV0FBUyxXQUFULENBQXFCLEVBQXJCLEVBQXlCO0FBQ3hCLE9BQUksT0FBTyxDQUFYO0FBQ0EsT0FBSSxPQUFPLENBQVg7O0FBRUEsVUFBTyxFQUFQLEVBQVc7QUFDVixRQUFJLEdBQUcsT0FBSCxJQUFjLE1BQWxCLEVBQTBCO0FBQ3pCO0FBQ0EsU0FBSSxVQUFVLEdBQUcsVUFBSCxJQUFpQixTQUFTLGVBQVQsQ0FBeUIsVUFBeEQ7QUFDQSxTQUFJLFVBQVUsR0FBRyxTQUFILElBQWdCLFNBQVMsZUFBVCxDQUF5QixTQUF2RDs7QUFFQSxhQUFTLEdBQUcsVUFBSCxHQUFnQixPQUFoQixHQUEwQixHQUFHLFVBQXRDO0FBQ0EsYUFBUyxHQUFHLFNBQUgsR0FBZSxPQUFmLEdBQXlCLEdBQUcsU0FBckM7QUFDQSxLQVBELE1BT087QUFDTjtBQUNBLGFBQVMsR0FBRyxVQUFILEdBQWdCLEdBQUcsVUFBbkIsR0FBZ0MsR0FBRyxVQUE1QztBQUNBLGFBQVMsR0FBRyxTQUFILEdBQWUsR0FBRyxTQUFsQixHQUE4QixHQUFHLFNBQTFDO0FBQ0E7QUFDRCxTQUFLLEdBQUcsWUFBUjtBQUNBOztBQUVELFVBQU87QUFDTixPQUFHLElBREc7QUFFTixPQUFHO0FBRkcsSUFBUDtBQUlBOztBQUVEOzs7OztBQUtFLFdBQVMsYUFBVCxDQUF1QixPQUF2QixFQUFnQyxRQUFoQyxFQUEwQztBQUN4QyxPQUFJLGtCQUFrQixzQkFBdEI7QUFDQSxXQUFRLGdCQUFSLENBQXlCLGVBQXpCLEVBQTBDLFFBQTFDO0FBQ0Q7O0FBRUg7Ozs7QUFJQSxXQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEIsT0FBOUIsRUFBdUM7QUFDdEMsT0FBSSxPQUFPLE9BQVAsS0FBbUIsV0FBbkIsSUFBa0MsWUFBWSxFQUFsRCxFQUFzRDtBQUNyRCxZQUFRLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE9BQXhCO0FBQ0EsSUFGRCxNQUVPO0FBQ04sWUFBUSxLQUFSLENBQWMsT0FBZCxHQUF3QixNQUF4QjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxXQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEI7QUFDN0IsUUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFVBQVUsTUFBOUIsRUFBc0MsR0FBdEMsRUFBMkM7QUFDMUMsY0FBVSxDQUFWLEVBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixNQUE3QjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsV0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQTJCLFNBQTNCLEVBQXNDO0FBQ3JDLFdBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixTQUF0QjtBQUNBOztBQUVEOzs7OztBQUtBLFdBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE4QixTQUE5QixFQUF5QztBQUN4QyxXQUFRLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsU0FBekI7QUFDQTtBQUNBLFFBQUssUUFBUSxXQUFiO0FBQ0E7O0FBRUQ7Ozs7O0FBS0EsV0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCLFNBQTlCLEVBQXlDO0FBQ3hDLE9BQUksUUFBUSxTQUFSLENBQWtCLFFBQWxCLENBQTJCLFNBQTNCLENBQUosRUFBMkM7QUFDMUMsZ0JBQVksT0FBWixFQUFxQixTQUFyQjtBQUNFO0FBQ0QsWUFBUyxPQUFULEVBQWtCLFNBQWxCO0FBQ0Y7O0FBRUQ7Ozs7QUFJRSxXQUFTLDBCQUFULENBQW9DLFNBQXBDLEVBQStDO0FBQ2hELE9BQUksV0FBVyxJQUFYLENBQWdCLFVBQVUsS0FBMUIsQ0FBSixFQUFzQztBQUNyQyxXQUFPLElBQVA7QUFDQSxJQUZELE1BRU87QUFDTixnQkFBWSxTQUFaLEVBQXVCLHlCQUF2QjtBQUNBLFdBQU8sS0FBUDtBQUNFO0FBQ0Q7O0FBRUQsU0FBTztBQUNOLGtCQUFlLGFBRFQ7QUFFTixnQkFBYSxXQUZQO0FBR04sZ0JBQWEsV0FIUDtBQUlOLGdCQUFhLFdBSlA7QUFLTixhQUFVLFFBTEo7QUFNTixnQkFBYSxXQU5QO0FBT04sZ0JBQWEsV0FQUDtBQVFOLCtCQUE0QjtBQVJ0QixHQUFQO0FBVUYsRUE5SWUsRUFBaEIsQzs7Ozs7Ozs7QUNGQTs7OztBQUlBLFFBQU8sTUFBUCxHQUFpQixZQUFXO0FBQzNCLE1BQUksbUJBQW1CLENBQXZCO0FBQ0EsTUFBSSxpQkFBaUIsQ0FBckI7QUFDQSxNQUFJLGtCQUFrQixTQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLENBQXRCO0FBQ0EsTUFBSSxpQkFBaUIsU0FBUyxzQkFBVCxDQUFnQyxnQkFBaEMsRUFBa0QsQ0FBbEQsQ0FBckI7QUFDQSxNQUFJLFNBQVMsU0FBUyxzQkFBVCxDQUFnQyxRQUFoQyxFQUEwQyxDQUExQyxDQUFiO0FBQ0EsTUFBSSxRQUFRLFNBQVMsc0JBQVQsQ0FBZ0MsT0FBaEMsQ0FBWjtBQUNBLE1BQUksbUJBQW1CLFNBQVMsc0JBQVQsQ0FBZ0Msa0JBQWhDLEVBQW9ELENBQXBELENBQXZCO0FBQ0EsTUFBSSxZQUFZLFNBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsRUFBNkMsQ0FBN0MsQ0FBaEI7QUFDQSxNQUFJLFVBQVUsU0FBUyxzQkFBVCxDQUFnQyxTQUFoQyxFQUEyQyxDQUEzQyxDQUFkO0FBQ0EsTUFBSSxjQUFjLFNBQVMsc0JBQVQsQ0FBZ0MsYUFBaEMsRUFBK0MsQ0FBL0MsQ0FBbEI7O0FBRUEsV0FBUyxNQUFULENBQWdCLEVBQWhCLEVBQW9CO0FBQ25CLFFBQUssTUFBTCxHQUFjLFNBQVMsY0FBVCxDQUF3QixFQUF4QixDQUFkO0FBQ0EsUUFBSyxjQUFMLEdBQXNCLElBQUksY0FBSixDQUFtQixnQkFBbkIsQ0FBdEI7QUFDQSxRQUFLLE1BQUwsR0FBYyxJQUFJLE1BQUosQ0FBVyxhQUFYLENBQWQ7QUFDQTs7QUFFRDs7Ozs7O0FBTUEsU0FBTyxTQUFQLENBQWlCLHVCQUFqQixHQUEyQyxVQUFTLGVBQVQsRUFBMEIsUUFBMUIsRUFBb0M7QUFDOUUsT0FBSSxPQUFPLElBQVg7QUFDQSxRQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFXO0FBQ2hEO0FBQ0EsV0FBTyxXQUFQLENBQW1CLE9BQW5CLEVBQTRCLDhCQUE1QjtBQUNBLFNBQUssY0FBTCxDQUFvQixtQkFBcEIsQ0FBd0MsZUFBeEMsRUFBeUQsS0FBSyxNQUFMLENBQVksV0FBWixDQUF3QixJQUF4QixDQUE2QixLQUFLLE1BQWxDLENBQXpEO0FBQ0EsSUFKRDtBQUtBLEdBUEQ7O0FBU0E7OztBQUdBLFNBQU8sU0FBUCxDQUFpQixNQUFqQixHQUEwQixZQUFXO0FBQ3BDLFFBQUssTUFBTCxDQUFZLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQVc7QUFDOUMsUUFBSSxDQUFDLE9BQU8sMEJBQVAsQ0FBa0MsS0FBSyxlQUF2QyxDQUFMLEVBQThEO0FBQzdELFlBQU8sV0FBUCxDQUFtQixNQUFNLGNBQU4sQ0FBbkI7QUFDQTtBQUNBLGVBQVUsU0FBVixHQUFzQixNQUF0QjtBQUNBLFlBQU8sV0FBUCxDQUFtQixTQUFuQixFQUE4QixvQkFBOUI7QUFDQTtBQUNILElBUEQ7QUFRQSxHQVREOztBQVdBOzs7O0FBSUEsU0FBTyxTQUFQLENBQWlCLFNBQWpCLEdBQTZCLFVBQVMsZUFBVCxFQUEwQjtBQUN0RCxPQUFJLFdBQVcsU0FBWCxRQUFXLEdBQVc7QUFDekIsV0FBTyxXQUFQLENBQW1CLGdCQUFuQjtBQUNBLElBRkQ7QUFHQSxRQUFLLHVCQUFMLENBQTZCLGdCQUE3QixFQUErQyxRQUEvQztBQUNBLEdBTEQ7O0FBT0E7Ozs7QUFJQSxTQUFPLFNBQVAsQ0FBaUIsUUFBakIsR0FBNEIsVUFBUyxlQUFULEVBQTBCO0FBQ3JELE9BQUksV0FBVyxTQUFYLFFBQVcsR0FBVztBQUN6QixXQUFPLFdBQVAsQ0FBbUIsY0FBbkIsRUFBbUMsV0FBbkM7QUFDQTtBQUNBLFdBQU8sS0FBUCxDQUFhLFVBQWIsR0FBMEIsTUFBMUI7QUFDRSxXQUFPLEtBQVAsQ0FBYSxVQUFiLEdBQTBCLElBQTFCO0FBQ0UsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQU0sTUFBMUIsRUFBa0MsR0FBbEMsRUFBdUM7QUFDeEMsV0FBTSxDQUFOLEVBQVMsS0FBVCxDQUFlLE9BQWYsR0FBeUIsT0FBekI7QUFDQTtBQUNEO0FBQ0E7QUFDRixJQVZEO0FBV0E7QUFDQSxRQUFLLHVCQUFMLENBQTZCLGdCQUE3QixFQUErQyxRQUEvQztBQUNBLEdBZEQ7O0FBZ0JBLFNBQU8sTUFBUDtBQUNBLEVBL0VlLEVBQWhCLEM7Ozs7OztBQ0pBO0FBQ0E7Ozs7QUFHQSxRQUFPLGNBQVAsR0FBeUIsWUFBVztBQUNuQyxXQUFTLGNBQVQsQ0FBd0IsRUFBeEIsRUFBNEI7QUFDM0IsUUFBSyxjQUFMLEdBQXNCLFNBQVMsY0FBVCxDQUF3QixFQUF4QixDQUF0QjtBQUNBOztBQUVEOzs7OztBQUtBLGlCQUFlLFNBQWYsQ0FBeUIsbUJBQXpCLEdBQStDLFVBQVMsZUFBVCxFQUEwQixRQUExQixFQUFvQztBQUNsRixPQUFJLE9BQU8sSUFBWDtBQUNBLFVBQU8sV0FBUCxDQUFtQixLQUFLLGNBQXhCO0FBQ0EsUUFBSyxjQUFMLENBQW9CLFNBQXBCLEdBQWdDLEVBQWhDO0FBQ0EsT0FBSSxpQkFBaUIsWUFBWSxZQUFXO0FBQ3RDLFFBQUksb0JBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLG1CQUFjLGNBQWQ7QUFDQSxZQUFPLFdBQVAsQ0FBbUIsS0FBSyxjQUF4QjtBQUNBO0FBQ0E7QUFDRCxTQUFLLGNBQUwsQ0FBb0IsU0FBcEIsR0FBZ0MsaUJBQWhDO0FBQ0gsSUFQaUIsRUFPZixJQVBlLENBQXJCO0FBUUEsR0FaRDs7QUFjQSxTQUFPLGNBQVA7QUFDQSxFQXpCdUIsRUFBeEIsQzs7Ozs7O0FDSkE7O0FBRUE7Ozs7OztBQUtBLFFBQU8sTUFBUCxHQUFpQixZQUFXO0FBQzNCLE1BQUksaUJBQWlCLEVBQXJCO0FBQ0EsTUFBSSxvQkFBb0IsRUFBeEI7O0FBRUEsTUFBSSxTQUFTLFNBQVMsc0JBQVQsQ0FBZ0MsUUFBaEMsRUFBMEMsQ0FBMUMsQ0FBYjtBQUNBLE1BQUksY0FBYyxTQUFTLHNCQUFULENBQWdDLGFBQWhDLEVBQStDLENBQS9DLENBQWxCO0FBQ0EsTUFBSSxpQkFBaUIsU0FBUyxzQkFBVCxDQUFnQyxnQkFBaEMsRUFBa0QsQ0FBbEQsQ0FBckI7O0FBRUEsV0FBUyxNQUFULENBQWdCLE1BQWhCLEVBQXdCO0FBQ3ZCLFFBQUssTUFBTCxHQUFjLFNBQVMsc0JBQVQsQ0FBZ0MsTUFBaEMsRUFBd0MsQ0FBeEMsQ0FBZDtBQUNBOztBQUVEOzs7QUFHQSxTQUFPLFNBQVAsQ0FBaUIsS0FBakIsR0FBeUIsWUFBVztBQUNuQyxPQUFJLGNBQWMsT0FBTyxVQUFQLElBQXFCLFNBQVMsZUFBVCxDQUF5QixXQUE5QyxJQUE2RCxTQUFTLElBQVQsQ0FBYyxXQUE3RjtBQUNHLE9BQUksZUFBZ0IsY0FBYyxZQUFZLFdBQVosR0FBeUIsQ0FBeEMsR0FBNkMsWUFBWSxXQUE1RTtBQUNBLE9BQUksZUFBZSxlQUFlLGlCQUFmLEdBQW1DLEdBQXREO0FBQ0EsT0FBSSx3QkFBd0IsS0FBNUI7QUFDQSxPQUFJLEtBQUo7O0FBRUgsVUFBTyxLQUFQLENBQWEsVUFBYixHQUEwQixHQUExQjtBQUNHLFVBQU8sS0FBUCxDQUFhLFVBQWIsR0FBMEIsaUJBQWlCLFVBQTNDO0FBQ0gsVUFBTyxXQUFQLENBQW1CLFdBQW5CLEVBQWdDLGtCQUFoQzs7QUFFRyxXQUFRLFlBQVksWUFBVztBQUM5QixRQUFJLE9BQU8sV0FBUCxDQUFtQixNQUFuQixFQUEyQixDQUEzQixJQUFnQyxZQUFwQyxFQUFrRDtBQUNwRCxZQUFPLFFBQVAsQ0FBZ0IsV0FBaEIsRUFBNkIsa0JBQTdCO0FBQ0EsbUJBQWMsS0FBZDtBQUNHO0FBQ0QsSUFMTyxFQUtMLElBTEssQ0FBUjtBQU1ILEdBakJEOztBQW1CQTs7O0FBR0EsU0FBTyxTQUFQLENBQWlCLFdBQWpCLEdBQStCLFlBQVc7QUFDekMsVUFBTyxXQUFQLENBQW1CLEtBQUssTUFBeEI7QUFDQSxRQUFLLEtBQUw7QUFDQSxVQUFPLGFBQVAsQ0FBcUIsTUFBckIsRUFBNkIsWUFBVztBQUN2QyxXQUFPLFdBQVAsQ0FBbUIsY0FBbkI7QUFDQSxJQUZEO0FBR0EsR0FORDs7QUFRQSxTQUFPLE1BQVA7QUFDQSxFQTlDZSxFQUFoQixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDFhMDMxN2Q3NjFiNzM0NDMwNTMwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5yZXF1aXJlKCcuL2hlbHBlci5qcycpO1xyXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvYnV0dG9uLmpzJyk7XHJcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9jb3VudGRvd25wYW5lbC5qcycpO1xyXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvc2xpZGVyLmpzJyk7XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHN0YXJ0QnV0dG9uID0gbmV3IEJ1dHRvbignc3RhcnRCdXR0b24nKTtcclxuICBzdGFydEJ1dHRvbi5pbml0U3RhcnQoKTtcclxuXHJcbiAgdmFyIGZhaWxCdXR0b24gPSBuZXcgQnV0dG9uKCdmYWlsQnV0dG9uJyk7XHJcbiAgZmFpbEJ1dHRvbi5pbml0RmFpbCgpO1xyXG5cclxuICB2YXIgc3VibWl0QnV0dG9uID0gbmV3IEJ1dHRvbignc3VibWl0QnV0dG9uJyk7XHJcbiAgc3VibWl0QnV0dG9uLnN1Ym1pdCgpO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW5pdC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxud2luZG93LkhlbHBlciA9IChmdW5jdGlvbigpIHtcclxuXHR2YXIgSVNfTlVNRVJJQyA9IG5ldyBSZWdFeHAoL15cXGQrJC8pO1xyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kIHdoaWNoIENTUyB0cmFuc2l0aW9uIGV2ZW50cyBlbmQuXHJcblx0ICogaHR0cHM6Ly9qb25zdWguY29tL2Jsb2cvZGV0ZWN0LXRoZS1lbmQtb2YtY3NzLWFuaW1hdGlvbnMtYW5kLXRyYW5zaXRpb25zLXdpdGgtamF2YXNjcmlwdC9cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3aGljaFRyYW5zaXRpb25FdmVudCgpe1xyXG5cdCAgdmFyIHQsXHJcblx0ICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XHJcblxyXG5cdCAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG5cdCAgICBcInRyYW5zaXRpb25cIiAgICAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiT1RyYW5zaXRpb25cIiAgICAgOiBcIm9UcmFuc2l0aW9uRW5kXCIsXHJcblx0ICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJXZWJraXRUcmFuc2l0aW9uXCI6IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiXHJcblx0ICB9XHJcblxyXG5cdCAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuXHQgICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpe1xyXG5cdCAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGVsIC0gVGhlIGVsZW1lbnQgdGhhdCB3ZSB3YW50IHRvIGZpbmQgdGhlIGN1cnJlbnQgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cclxuXHQgKiBodHRwczovL3d3dy5raXJ1cGEuY29tL2h0bWw1L2dldF9lbGVtZW50X3Bvc2l0aW9uX3VzaW5nX2phdmFzY3JpcHQuaHRtXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWwpIHtcclxuXHRcdHZhciB4UG9zID0gMDtcclxuXHRcdHZhciB5UG9zID0gMDtcclxuXHJcblx0XHR3aGlsZSAoZWwpIHtcclxuXHRcdFx0aWYgKGVsLnRhZ05hbWUgPT0gXCJCT0RZXCIpIHtcclxuXHRcdFx0XHQvLyBkZWFsIHdpdGggYnJvd3NlciBxdWlya3Mgd2l0aCBib2R5L3dpbmRvdy9kb2N1bWVudCBhbmQgcGFnZSBzY3JvbGxcclxuXHRcdFx0XHR2YXIgeFNjcm9sbCA9IGVsLnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcblx0XHRcdFx0dmFyIHlTY3JvbGwgPSBlbC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIHhTY3JvbGwgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSB5U2Nyb2xsICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBmb3IgYWxsIG90aGVyIG5vbi1CT0RZIGVsZW1lbnRzXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsID0gZWwub2Zmc2V0UGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IHhQb3MsXHJcblx0XHRcdHk6IHlQb3NcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kIHRoZSBmb2N1c2VkIGVsZW1lbnQ7IGl0IHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2hlbiB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgYmUgYmluZGVkIGJ5IGEgdHJhbnNpdGlvbiBlbmQgbGlzdGVuZXJcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gdGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0cmFuc2l0aW9uIGVuZFxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlbGVtZW50LCBjYWxsYmFjaykge1xyXG5cdCAgICB2YXIgdHJhbnNpdGlvbkV2ZW50ID0gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuXHQgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FdmVudCwgY2FsbGJhY2spO1xyXG4gIFx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwbGF5IHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGRpc3BsYXllZC5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50LCBkaXNwbGF5KSB7XHJcblx0XHRpZiAodHlwZW9mIGRpc3BsYXkgIT09ICd1bmRlZmluZWQnICYmIGRpc3BsYXkgIT09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlIHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGhpZGRlbi5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50KSB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRhcmd1bWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCBhIENTUyBjbGFzcyB0byBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIGFkZGVkIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYSBDU1MgY2xhc3MgZnJvbSBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIHNwZWNpZmllZCBDU1MgY2xhc3MgcmVtb3ZlZC5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0XHQvLyB3ZWlyZCBoYWNrIHJ1bGUgLSBodHRwczovL2Nzcy10cmlja3MuY29tL3Jlc3RhcnQtY3NzLWFuaW1hdGlvbi9cclxuXHRcdHZvaWQgZWxlbWVudC5vZmZzZXRXaWR0aDtcdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGUgd2hldGhlciB0byBhZGQgb3IgcmVtb3ZlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBhZGQgb3IgcmVtb3ZlIHRoZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcbiAgXHRcdH1cclxuICBcdFx0YWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFZhbGlkYXRlIGlmIHVzZXIgaW5wdXQgaXMgYW4gaW50ZWdlciBvbmx5LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIHRleHRmaWVsZCB0aGF0IHdpbGwgYmUgdmFsaWRhdGVkLlxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdmFsaWRhdGVJZlVzZXJJbnB1dElzVmFsaWQodGV4dGZpZWxkKSB7XHJcblx0XHRpZiAoSVNfTlVNRVJJQy50ZXN0KHRleHRmaWVsZC52YWx1ZSkpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0b2dnbGVDbGFzcyh0ZXh0ZmllbGQsICdzaGFrZVRleHRmaWVsZEFuaW1hdGlvbicpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgXHRcdH1cclxuICBcdH1cclxuXHJcbiAgXHRyZXR1cm4ge1xyXG4gIFx0XHR0cmFuc2l0aW9uRW5kOiB0cmFuc2l0aW9uRW5kLFxyXG4gIFx0XHRnZXRQb3NpdGlvbjogZ2V0UG9zaXRpb24sXHJcbiAgXHRcdHNob3dFbGVtZW50OiBzaG93RWxlbWVudCxcclxuICBcdFx0aGlkZUVsZW1lbnQ6IGhpZGVFbGVtZW50LFxyXG4gIFx0XHRhZGRDbGFzczogYWRkQ2xhc3MsXHJcbiAgXHRcdHJlbW92ZUNsYXNzOiByZW1vdmVDbGFzcyxcclxuICBcdFx0dG9nZ2xlQ2xhc3M6IHRvZ2dsZUNsYXNzLFxyXG4gIFx0XHR2YWxpZGF0ZUlmVXNlcklucHV0SXNWYWxpZDogdmFsaWRhdGVJZlVzZXJJbnB1dElzVmFsaWRcclxuICBcdH1cclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2hlbHBlci5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIGEgZ2VuZXJpYyBidXR0b24sIHdoaWNoIGhhcyBhIG11bHRpdHVkZSBvZiBnZW5lcmljIHRvIHNwZWNpZmljIGZ1bmN0aW9ucyBmb3IgYWxsIHBvc3NpYmxlIHNjZW5hcmlvcy5cclxuICogQHBhcmFtIHtPYmplY3R9IEJ1dHRvblxyXG4gKi9cclxud2luZG93LkJ1dHRvbiA9IChmdW5jdGlvbigpIHtcclxuXHR2YXIgQ09VTlRET1dOX05VTUJFUiA9IDM7XHJcblx0dmFyIGltYWdlSXRlcmF0aW9uID0gMDtcclxuXHR2YXIgc3VibWl0VGV4dGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdFRleHRmaWVsZCcpO1xyXG5cdHZhciBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxCYWNrZ3JvdW5kJylbMF07XHJcblx0dmFyIGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdHZhciBpbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlJyk7XHJcblx0dmFyIGluc3RydWN0aW9uUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnN0cnVjdGlvblBhbmVsJylbMF07XHJcblx0dmFyIGFkZFBvaW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZFBvaW50cycpWzBdO1xyXG5cdHZhciB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd3JhcHBlcicpWzBdO1xyXG5cdHZhciBzbGlkZXJQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlclBhbmVsJylbMF07XHJcblxyXG5cdGZ1bmN0aW9uIEJ1dHRvbihpZCkge1xyXG5cdFx0dGhpcy5idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0XHR0aGlzLmNvdW50ZG93blBhbmVsID0gbmV3IENvdW50ZG93blBhbmVsKCdjb3VudGRvd25QYW5lbCcpO1xyXG5cdFx0dGhpcy5zbGlkZXIgPSBuZXcgU2xpZGVyKCdzbGlkZXJQYW5lbCcpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gY2xpY2tlZCwgc3RhcnQgdGhlIGNvdW50ZG93biBwYW5lbC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBDb3VudGRvd24gbnVtYmVyXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGNvdW50ZG93biBudW1iZXIgcmVhY2hlcyAwLlxyXG5cdCAqIEByZXR1cm4ge1t0eXBlXX1cclxuXHQgKi9cclxuXHRCdXR0b24ucHJvdG90eXBlLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyLCBjYWxsYmFjaykge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0dGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y2FsbGJhY2soKTtcclxuXHRcdFx0SGVscGVyLnRvZ2dsZUNsYXNzKHdyYXBwZXIsICdncmF5c2NhbGVCYWNrZ3JvdW5kQW5pbWF0aW9uJyk7XHJcblx0XHRcdHNlbGYuY291bnRkb3duUGFuZWwuc3RhcnRDb3VudGRvd25UaW1lcihjb3VudGRvd25OdW1iZXIsIHNlbGYuc2xpZGVyLnN0YXJ0U2xpZGVyLmJpbmQoc2VsZi5zbGlkZXIpKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBjbGlja2VkLCBjaGVjayBpZiB0aGUgdXNlciBpbnB1dCBpcyB2YWxpZDsgaWYgaXQgaXMgdmFsaWQsIGl0IHdpbGwgcmVtb3ZlIGFuIGltYWdlIGFuZCBhZGQgc29tZSBwb2ludHMsIGVsc2UgZGlzcGxheSBhIGZhaWwgYW5pbWF0aW9uLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuc3VibWl0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdCAgXHRcdGlmICghSGVscGVyLnZhbGlkYXRlSWZVc2VySW5wdXRJc1ZhbGlkKHNlbGYuc3VibWl0VGV4dGZpZWxkKSkge1xyXG5cdCAgXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGltYWdlW2ltYWdlSXRlcmF0aW9uXSk7XHJcblx0ICBcdFx0XHRpbWFnZUl0ZXJhdGlvbisrO1xyXG5cdCAgXHRcdFx0YWRkUG9pbnRzLmlubmVySFRNTCA9IFwiKzIwMFwiO1xyXG5cdCAgXHRcdFx0SGVscGVyLnRvZ2dsZUNsYXNzKGFkZFBvaW50cywgJ2FkZFBvaW50c0FuaW1hdGlvbicpO1xyXG5cdCAgXHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0b3IgZm9yIHdoZW4gdGhlIHN0YXJ0IGJ1dHRvbiBpcyBjbGlja2VkLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IGNvdW50ZG93biBudW1iZXIuXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5pbml0U3RhcnQgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoaW5zdHJ1Y3Rpb25QYW5lbCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdG9yIGZvciB3aGVuIHRoZSBmYWlsIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IGNvdW50ZG93biBudW1iZXIuXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5pbml0RmFpbCA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlcikge1xyXG5cdFx0dmFyIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdEhlbHBlci5oaWRlRWxlbWVudChmYWlsQmFja2dyb3VuZCwgc2xpZGVyUGFuZWwpO1xyXG5cdFx0XHQvLyByZXNldCB0aGUgaW1hZ2VzXHJcblx0XHRcdGltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzEwMCUnO1xyXG4gIFx0XHRcdGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gJzBzJztcclxuICBcdFx0ICBcdGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2UubGVuZ3RoOyBpKyspIHtcclxuICBcdFx0XHRcdGltYWdlW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIFx0XHRcdH1cclxuICBcdFx0XHQvL2ZpbmQgb3V0IGhvdyB0byByZW1vdmUgZXJyb3IgYm9yZGVyXHJcbiAgXHRcdFx0Ly9zdWJtaXRUZXh0ZmllbGQuc3R5bGUuYm9yZGVyID0gJzR4IHNvbGlkICMzRjM4MzUnO1xyXG5cdFx0fVxyXG5cdFx0Ly9IZWxwZXIuc2hvd0VsZW1lbnQoaW5zdHJ1Y3Rpb25QYW5lbCk7XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBCdXR0b247XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogVGhpcyBpcyB0aGUgY291bnRkb3duIHBhbmVsOyBpdCB3aWxsIGNvdW50ZG93biB1bnRpbCBpdCByZWFjaGVzIDAgYmVmb3JlIGl0IGRpc3BsYXlzIHRoZSBzbGlkZXIgcGFuZWwuXHJcbiAqL1xyXG53aW5kb3cuQ291bnRkb3duUGFuZWwgPSAoZnVuY3Rpb24oKSB7XHJcblx0ZnVuY3Rpb24gY291bnRkb3duUGFuZWwoaWQpIHtcclxuXHRcdHRoaXMuY291bnRkb3duUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdGFydCB0aGUgY291bnRkb3duOyBpdCB3aWxsIGNvdW50ZG93biB0aGUgbnVtYmVyIGRpc3BsYXllZCBvbiB0aGUgc2NyZWVuIHVudGlsIGl0IHJlYWNoZXMgMCwgd2hpY2ggYnkgdGhlbiBpdCB3aWxsIGRpc3BsYXkgdGhlIHNsaWRlciBwYW5lbC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSB0aGUgY291bnRkb3duIG51bWJlciwgZS5nLiBpZiAzLCBpdCB3aWxsIHN0YXJ0IHRoZSBjb3VudGRvd24gZnJvbSAzLlxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCBvbmNlIHRoZSBjb3VudGRvd24gcmVhY2hlcyAwLlxyXG5cdCAqL1xyXG5cdGNvdW50ZG93blBhbmVsLnByb3RvdHlwZS5zdGFydENvdW50ZG93blRpbWVyID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyLCBjYWxsYmFjaykge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0SGVscGVyLnNob3dFbGVtZW50KHRoaXMuY291bnRkb3duUGFuZWwpO1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0dmFyIGNvdW50RG93blRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIFx0XHRpZiAoY291bnRkb3duTnVtYmVyID09PSAwKSB7XHJcbiAgICAgICAgXHRcdGNsZWFySW50ZXJ2YWwoY291bnREb3duVGltZXIpO1xyXG4gICAgICAgIFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoc2VsZi5jb3VudGRvd25QYW5lbCk7XHJcbiAgICAgICAgXHRcdGNhbGxiYWNrKCk7XHJcbiAgICAgICAgXHR9XHJcbiAgICAgICAgXHRzZWxmLmNvdW50ZG93blBhbmVsLmlubmVySFRNTCA9IGNvdW50ZG93bk51bWJlci0tO1xyXG4gICAgXHR9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBjb3VudGRvd25QYW5lbDtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvY291bnRkb3ducGFuZWwuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBzbGlkZXIgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBhZnRlciB0aGUgY291bnRkb3duLiBJdCB3aWxsIGRpc3BsYXkgYW4gZW5kbGVzcyBzdHJlYW0gb2YgZG90YSBpbWFnZXMgdGhhdCB3ZXJlIHJldHJpZXZlZCB2aWEgRG90YSBBUEkuXHJcbiAqIEl0IHdpbGwgY29uc3RhbnRseSB0cmFuc2l0aW9uIHRvIHRoZSBsZWZ0IHVudGlsIGl0IHJlYWNoZXMgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIG9mIHRoZSBwYW5lbCB0aGF0IGhvbGRzIHRoZSBpbWFnZXMsIHdoaWNoIGluIHRoYXQgY2FzZSB0aGUgZ2FtZVxyXG4gKiBsb3NlLiBcclxuICovXHJcbndpbmRvdy5TbGlkZXIgPSAoZnVuY3Rpb24oKSB7XHJcblx0dmFyIFNMSURFX0RVUkFUSU9OID0gMTA7XHJcblx0dmFyIFdBUk5JTkdfVEhSRVNIT0xEID0gMzA7XHJcblxyXG5cdHZhciBpbWFnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXTtcclxuXHR2YXIgaW1hZ2VzUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXNQYW5lbCcpWzBdO1xyXG5cdHZhciBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxCYWNrZ3JvdW5kJylbMF07XHJcblxyXG5cdGZ1bmN0aW9uIHNsaWRlcihzbGlkZXIpIHtcclxuXHRcdHRoaXMuc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzbGlkZXIpWzBdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVHJhbnNpdGlvbiBlZmZlY3Qgb24gdGhlIGltYWdlcy5cclxuXHQgKi9cclxuXHRzbGlkZXIucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuXHQgICAgdmFyIGRlZmF1bHRXaWR0aCA9IChzY3JlZW5XaWR0aCAtIGltYWdlc1BhbmVsLm9mZnNldFdpZHRoLyAyKSArIGltYWdlc1BhbmVsLm9mZnNldFdpZHRoO1xyXG5cdCAgICB2YXIgd2FybmluZ1dpZHRoID0gZGVmYXVsdFdpZHRoICogV0FSTklOR19USFJFU0hPTEQgLyAxMDA7XHJcblx0ICAgIHZhciBzdGFydFdhcm5pbmdBbmltYXRpb24gPSBmYWxzZTtcclxuXHQgICAgdmFyIHRpbWVyO1xyXG5cclxuXHRcdGltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzAnO1xyXG5cdCAgICBpbWFnZXMuc3R5bGUudHJhbnNpdGlvbiA9IFNMSURFX0RVUkFUSU9OICsgJ3MgbGluZWFyJztcclxuXHRcdEhlbHBlci5yZW1vdmVDbGFzcyhpbWFnZXNQYW5lbCwgJ3dhcm5pbmdBbmltYXRpb24nKTtcclxuXHJcblx0ICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0ICAgIFx0aWYgKEhlbHBlci5nZXRQb3NpdGlvbihpbWFnZXMpLnggPD0gd2FybmluZ1dpZHRoKSB7XHJcblx0XHRcdFx0SGVscGVyLmFkZENsYXNzKGltYWdlc1BhbmVsLCAnd2FybmluZ0FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdCAgICBcdH1cclxuXHQgICAgfSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdGFydCB0aGUgc2xpZGVyIHRyYW5zaXRpb24sIGRpc3BsYXkgdGhlIGZhaWwgcGFuZWwgd2hlbiB0aGUgdHJhbnNpdGlvbiBlbmRzLlxyXG5cdCAqL1xyXG5cdHNsaWRlci5wcm90b3R5cGUuc3RhcnRTbGlkZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdEhlbHBlci5zaG93RWxlbWVudCh0aGlzLnNsaWRlcik7XHJcblx0XHR0aGlzLnNsaWRlKCk7XHJcblx0XHRIZWxwZXIudHJhbnNpdGlvbkVuZChpbWFnZXMsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuc2hvd0VsZW1lbnQoZmFpbEJhY2tncm91bmQpO1xyXG5cdFx0fSk7XHRcdFxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHNsaWRlcjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvc2xpZGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==