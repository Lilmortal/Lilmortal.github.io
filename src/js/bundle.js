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
		"use strict";
	
		var Button = __webpack_require__(2);
		var Textfield = __webpack_require__(6);
	
		//document.getElementById().initStart better? use "this"?
		// OR TRY USE FACTORY PATTERN ON THIS? 
		var start_button = Button.create_button('start_button');
		start_button.if_clicked('start');
	
		var fail_button = Button.create_button('fail_button');
		fail_button.if_clicked('fail');
	
		var submit_button = Button.create_button('submit_button');
		submit_button.if_clicked('submit');
	
		var submit_textfield = Textfield.create_textfield('submit_textfield');
		submit_textfield.submit();
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
		var Countdown_panel = __webpack_require__(3);
		var Slider = __webpack_require__(5);
		var Helper = __webpack_require__(4);
		//TODO - document.querySelector is better or nah? Heard performance is worse but how bad is it? why queryselector over getelement?
		// THIS IS TOO SHIT, ITS TOO DEPENDENT ON HARD CODED VARIABLES; CAN ANGULAR 2 DEPENDENCY INJECTION HELP? I KNOW
		// REACT CAN WITH ITS COMPONENT BASED LIBRARY; WHAT ABOUT EMBER? WHY ARE PEOPLE DITCHING EMBER? TOO OLD? KNOCKOUT MVVM HELPS?? EQUIVALENT FOR VANILLA JS?
		var submit_textfield = document.getElementById('submit_textfield');
		var fail_background = document.getElementsByClassName('fail_background')[0];
		var images = document.getElementsByClassName('images')[0];
		var image = document.getElementsByClassName('image');
		var instruction_panel = document.getElementsByClassName('instruction_panel')[0];
		var add_points = document.getElementsByClassName('add_points')[0];
		var wrapper = document.getElementsByClassName('wrapper')[0];
		var slider_panel = document.getElementsByClassName('slider_panel')[0];
		var high_score = document.getElementsByClassName('high_score');
		var image_iteration = 0;
		var Button = {
			create_button: function create_button(type) {
				return Object.create(this.button[type]);
			},
	
	
			button: {
				start_button: {
					if_clicked: function if_clicked(callback) {
						var self = this;
						document.getElementById('start_button').addEventListener('click', function () {
							self[callback]();
						});
					},
					start: function start() {
						var self = this;
						Helper.toggle_class_for_animation(wrapper, 'grayscale_background_animation');
						Helper.hide_element(instruction_panel);
						self.start_slider_countdown(COUNTDOWN_NUMBER).then(function (response) {
							self.start_slider().then(function (response) {
								self.display_fail_panel(response);
							});
						});
					},
					start_slider_countdown: function start_slider_countdown(countdownNumber) {
						var countdownPanel = Countdown_panel.create_countdown_panel();
						return countdownPanel.start_countdown_timer(countdownNumber);
					},
					start_slider: function start_slider() {
						var slider = Slider.create_slider();
						return slider.start_slider();
					},
					display_fail_panel: function display_fail_panel(images) {
						Helper.transition_end(images, function () {
							document.getElementsByClassName('result_text')[0].innerHTML = 'You lose...';
							Helper.show_element(fail_background);
						});
					}
				},
				fail_button: {
					if_clicked: function if_clicked(callback) {
						var self = this;
						document.getElementById('fail_button').addEventListener('click', function () {
							self[callback]();
						});
					},
					fail: function fail() {
						var self = this;
						Helper.hide_element(fail_background, slider_panel);
						// reset the images
						images.style.marginLeft = '100%';
						images.style.transition = '0s';
						for (var i = 0; i < image.length; i++) {
							image[i].style.display = 'block';
						}
						image_iteration = 0;
						for (var _i = 0; _i < high_score.length; _i++) {
							high_score[_i].innerHTML = 0;
						}
						submit_textfield.value = '';
						Helper.remove_class(submit_textfield, 'shake_textfield_animation');
						Helper.remove_class(add_points, 'add_points_animation');
						add_points.style.opacity = 0;
	
						Helper.toggle_class_for_animation(wrapper, 'grayscale_background_animation');
						self.start_slider_countdown(COUNTDOWN_NUMBER).then(function (response) {
							self.start_slider().then(function (response) {
								self.display_fail_panel(response);
							});
						});
					},
					start_slider_countdown: function start_slider_countdown(countdownNumber) {
						var countdownPanel = Countdown_panel.create_countdown_panel();
						return countdownPanel.start_countdown_timer(countdownNumber);
					},
					start_slider: function start_slider() {
						var slider = Slider.create_slider();
						return slider.start_slider();
					},
					display_fail_panel: function display_fail_panel(images) {
						Helper.transition_end(images, function () {
							document.getElementsByClassName('result_text')[0].innerHTML = 'You lose...';
							Helper.show_element(fail_background);
						});
					}
				},
				submit_button: {
					if_clicked: function if_clicked(callback) {
						var self = this;
						document.getElementById('submit_button').addEventListener('click', function () {
							self[callback]();
						});
					},
					submit: function submit() {
						if (Helper.validate_if_input_is_dota_hero_name(image[image_iteration], submit_textfield)) {
							Helper.hide_element(image[image_iteration]);
							image_iteration++;
							add_points.innerHTML = "+100";
							for (var i = 0; i < high_score.length; i++) {
								high_score[i].innerHTML = parseInt(high_score[i].innerHTML) + 100;
							}
							Helper.toggle_class_for_animation(add_points, 'add_points_animation');
							Helper.remove_class(submit_textfield, 'shake_textfield_animation');
						} else {
							Helper.toggle_class_for_animation(submit_textfield, 'shake_textfield_animation');
						}
						submit_textfield.value = '';
						if (typeof image[image_iteration] === 'undefined') {
							document.getElementsByClassName('result_text')[0].innerHTML = 'Ez Win!';
							Helper.show_element(fail_background);
						}
					}
				}
			}
		};
		return Button;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
	 */
	module.exports = function () {
		"use strict";
	
		var Helper = __webpack_require__(4);
	
		var Countdown_panel = {
			create_countdown_panel: function create_countdown_panel() {
				return Object.create(this.countdown_panel);
			},
	
			countdown_panel: {
				start_countdown_timer: function start_countdown_timer(countdown_number) {
					var self = this;
					var countdown_panel = document.getElementById('countdown_panel');
					var countdown_promise = new Promise(function (resolve, reject) {
						Helper.show_element(countdown_panel);
						countdown_panel.innerHTML = "";
						var countdown_timer = setInterval(function () {
							if (countdown_number === 0) {
								clearInterval(countdown_timer);
								Helper.hide_element(countdown_panel);
								resolve("Success");
							}
							countdown_panel.innerHTML = countdown_number--;
						}, 1000);
					});
					return countdown_promise;
				}
			}
		};
		return Countdown_panel;
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
	
		var ILLEGAL_CHARACTERS = new RegExp(/[\-\s]+/);
	
		/**
	  * Convert string to lower case and remove illegal characters.
	  */
		String.prototype.toLowerCaseAndRemoveIllegalCharacters = function () {
			var lowerCaseValue = this.toLowerCase();
			return lowerCaseValue.replace(ILLEGAL_CHARACTERS, '');
		};
	
		/**
	  * Find which CSS transition events end.
	  * https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
	  */
		function which_transition_event() {
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
		function get_position(el) {
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
		function transition_end(element, callback) {
			var transition_event = which_transition_event();
			element.addEventListener(transition_event, callback);
		}
	
		/**
	  * Display the element.
	  * @param  {Object} The element that will be displayed.
	  */
		function show_element(element, display) {
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
		function hide_element(element) {
			for (var i = 0; i < arguments.length; i++) {
				arguments[i].style.display = 'none';
			}
		}
	
		/**
	  * Add a CSS class to an element.
	  * @param  {Object} The element that will have the added CSS class.
	  * @param  {String} className - The CSS class name
	  */
		function add_class(element, className) {
			if (!element.classList.contains(className)) {
				element.classList.add(className);
			}
		}
	
		/**
	  * Remove a CSS class from an element.
	  * @param  {Object} The element that will have the specified CSS class removed.
	  * @param  {String} className - The CSS class name
	  */
		function remove_class(element, className) {
			if (element.classList.contains(className)) {
				element.classList.remove(className);
			}
			// weird hack rule - https://css-tricks.com/restart-css-animation/
			void element.offsetWidth;
		}
	
		/**
	  * Toggle whether to add or remove CSS class.
	  * @param  {Object} The element that will add or remove the CSS class.
	  * @param  {String} className - The CSS class name
	  */
		function toggle_class(element, className) {
			if (element.classList.contains(className)) {
				remove_class(element, className);
			} else {
				add_class(element, className);
			}
		}
	
		/**
	  * Toggle whether to add or remove CSS class.
	  * @param  {Object} The element that will add or remove the CSS class.
	  * @param  {String} className - The CSS class name
	  */
		function toggle_class_for_animation(element, className) {
			if (element.classList.contains(className)) {
				remove_class(element, className);
			}
			add_class(element, className);
		}
	
		/**
	  * Validate if user input is a string.
	  * @param  {Object} The textfield that will be validated.
	  */
		function validate_if_input_is_dota_hero_name(image, textfield) {
			if (image.name.toLowerCaseAndRemoveIllegalCharacters() === textfield.value.toLowerCaseAndRemoveIllegalCharacters()) {
				return true;
			}
			return false;
		}
	
		return {
			transition_end: transition_end,
			get_position: get_position,
			show_element: show_element,
			hide_element: hide_element,
			add_class: add_class,
			remove_class: remove_class,
			toggle_class: toggle_class,
			toggle_class_for_animation: toggle_class_for_animation,
			validate_if_input_is_dota_hero_name: validate_if_input_is_dota_hero_name
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
		var images_panel = document.getElementsByClassName('images_panel')[0];
		var fail_background = document.getElementsByClassName('fail_background')[0];
		var url = 'http://lilmortal-test.apigee.net/getdotaheroes?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON';
		var Slider = {
			create_slider: function create_slider() {
				return Object.create(this.slider_panel);
			},
	
	
			slider_panel: {
				load_images: function load_images() {
					return new Promise(function (resolve, reject) {
						var oReq = new XMLHttpRequest();
						oReq.open('GET', url);
						oReq.onload = function () {
							if (oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200) {
								resolve(JSON.parse(oReq.responseText));
							} else {
								reject(oReq.statusText);
							}
						};
						oReq.send();
					});
				},
				get_images: function get_images() {
					this.load_images(url).then(function (response) {
						var fragment = document.createDocumentFragment();
						var heroes = response.result.heroes;
						for (var i = 0; i < heroes.length; i++) {
							var image = document.createElement('img');
							image.className = 'image';
							image.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + heroes[i].name.replace('npc_dota_hero_', '') + '_lg.png';
							//It should be Tuskar, not Tusk!
							if (heroes[i].localized_name === 'Tusk') {
								heroes[i].localized_name = 'Tuskar';
							}
							image.name = heroes[i].localized_name;
							fragment.appendChild(image);
						}
						images.appendChild(fragment);
					}, function (error) {
						console.log("Error loading the images. " + error);
					});
				},
				slide: function slide() {
					var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
					var default_width = screen_width - images_panel.offsetWidth / 2 + images_panel.offsetWidth;
					var warning_width = default_width * WARNING_THRESHOLD / 100;
					var timer = void 0;
					images.style.marginLeft = '0';
					images.style.transition = SLIDE_DURATION + 's linear';
					Helper.remove_class(images_panel, 'warning_animation');
	
					timer = setInterval(function () {
						if (Helper.get_position(images).x <= warning_width) {
							Helper.add_class(images_panel, 'warning_animation');
							clearInterval(timer);
						}
					}, 1000);
				},
				start_slider: function start_slider() {
					var self = this;
					var slider = document.getElementsByClassName('slider_panel')[0];
					var slider_promise = new Promise(function (resolve, reject) {
						if (images.children.length === 0) {
							self.get_images();
						}
						Helper.show_element(slider);
						self.slide();
						resolve(images);
					});
					return slider_promise;
				}
			}
		};
		return Slider;
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function () {
		"use strict";
	
		var Button = __webpack_require__(2);
		var Textfield = {
			create_textfield: function create_textfield(callback) {
				return Object.create(this.textfield[callback]);
			},
	
	
			textfield: {
				submit_textfield: {
					submit: function submit() {
						var text = document.getElementById('submit_textfield');
						var submit_button = Button.create_button('submit_button');
	
						text.addEventListener('keyup', function (event) {
							if (event.keyCode === 13) {
								submit_button.submit();
							}
						});
					}
				}
			}
		};
		return Textfield;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDY1YTZlOTM1MjlkYjE4NDY2MjgiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy90ZXh0ZmllbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsRUFBQyxZQUFXO0FBQ1g7O0FBRUEsTUFBTSxTQUFTLG9CQUFRLENBQVIsQ0FBZjtBQUNBLE1BQU0sWUFBWSxvQkFBUSxDQUFSLENBQWxCOztBQUVBO0FBQ0E7QUFDQSxNQUFNLGVBQWUsT0FBTyxhQUFQLENBQXFCLGNBQXJCLENBQXJCO0FBQ0EsZUFBYSxVQUFiLENBQXdCLE9BQXhCOztBQUVBLE1BQU0sY0FBYyxPQUFPLGFBQVAsQ0FBcUIsYUFBckIsQ0FBcEI7QUFDQSxjQUFZLFVBQVosQ0FBdUIsTUFBdkI7O0FBRUEsTUFBTSxnQkFBZ0IsT0FBTyxhQUFQLENBQXFCLGVBQXJCLENBQXRCO0FBQ0EsZ0JBQWMsVUFBZCxDQUF5QixRQUF6Qjs7QUFFQSxNQUFNLG1CQUFtQixVQUFVLGdCQUFWLENBQTJCLGtCQUEzQixDQUF6QjtBQUNBLG1CQUFpQixNQUFqQjtBQUNBLEVBbkJELEk7Ozs7Ozs7O0FDQUE7Ozs7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Q0EsRUF4QmdCLEVBQWpCLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkNjVhNmU5MzUyOWRiMTg0NjYyOFxuICoqLyIsIihmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQnV0dG9uID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2J1dHRvbi5qcycpO1xyXG5cdGNvbnN0IFRleHRmaWVsZCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90ZXh0ZmllbGQuanMnKTtcclxuXHJcblx0Ly9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgpLmluaXRTdGFydCBiZXR0ZXI/IHVzZSBcInRoaXNcIj9cclxuXHQvLyBPUiBUUlkgVVNFIEZBQ1RPUlkgUEFUVEVSTiBPTiBUSElTPyBcclxuXHRjb25zdCBzdGFydF9idXR0b24gPSBCdXR0b24uY3JlYXRlX2J1dHRvbignc3RhcnRfYnV0dG9uJyk7XHJcblx0c3RhcnRfYnV0dG9uLmlmX2NsaWNrZWQoJ3N0YXJ0Jyk7XHJcblxyXG5cdGNvbnN0IGZhaWxfYnV0dG9uID0gQnV0dG9uLmNyZWF0ZV9idXR0b24oJ2ZhaWxfYnV0dG9uJyk7XHJcblx0ZmFpbF9idXR0b24uaWZfY2xpY2tlZCgnZmFpbCcpO1xyXG5cclxuXHRjb25zdCBzdWJtaXRfYnV0dG9uID0gQnV0dG9uLmNyZWF0ZV9idXR0b24oJ3N1Ym1pdF9idXR0b24nKTtcclxuXHRzdWJtaXRfYnV0dG9uLmlmX2NsaWNrZWQoJ3N1Ym1pdCcpO1xyXG5cclxuXHRjb25zdCBzdWJtaXRfdGV4dGZpZWxkID0gVGV4dGZpZWxkLmNyZWF0ZV90ZXh0ZmllbGQoJ3N1Ym1pdF90ZXh0ZmllbGQnKTtcclxuXHRzdWJtaXRfdGV4dGZpZWxkLnN1Ym1pdCgpO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaW5pdC5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIGEgZ2VuZXJpYyBidXR0b24sIHdoaWNoIGhhcyBhIG11bHRpdHVkZSBvZiBnZW5lcmljIHRvIHNwZWNpZmljIGZ1bmN0aW9ucyBmb3IgYWxsIHBvc3NpYmxlIHNjZW5hcmlvcy5cclxuICogQHBhcmFtIHtPYmplY3R9IEJ1dHRvblxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGNvbnN0IENPVU5URE9XTl9OVU1CRVIgPSAzO1xyXG5cdGNvbnN0IENvdW50ZG93bl9wYW5lbCA9IHJlcXVpcmUoJy4vY291bnRkb3duX3BhbmVsLmpzJyk7XHJcblx0Y29uc3QgU2xpZGVyID0gcmVxdWlyZSgnLi9zbGlkZXIuanMnKTtcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHQvL1RPRE8gLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIGlzIGJldHRlciBvciBuYWg/IEhlYXJkIHBlcmZvcm1hbmNlIGlzIHdvcnNlIGJ1dCBob3cgYmFkIGlzIGl0PyB3aHkgcXVlcnlzZWxlY3RvciBvdmVyIGdldGVsZW1lbnQ/XHJcblx0Ly8gVEhJUyBJUyBUT08gU0hJVCwgSVRTIFRPTyBERVBFTkRFTlQgT04gSEFSRCBDT0RFRCBWQVJJQUJMRVM7IENBTiBBTkdVTEFSIDIgREVQRU5ERU5DWSBJTkpFQ1RJT04gSEVMUD8gSSBLTk9XXHJcblx0Ly8gUkVBQ1QgQ0FOIFdJVEggSVRTIENPTVBPTkVOVCBCQVNFRCBMSUJSQVJZOyBXSEFUIEFCT1VUIEVNQkVSPyBXSFkgQVJFIFBFT1BMRSBESVRDSElORyBFTUJFUj8gVE9PIE9MRD8gS05PQ0tPVVQgTVZWTSBIRUxQUz8/IEVRVUlWQUxFTlQgRk9SIFZBTklMTEEgSlM/XHJcblx0Y29uc3Qgc3VibWl0X3RleHRmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRfdGV4dGZpZWxkJyk7XHJcblx0Y29uc3QgZmFpbF9iYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbF9iYWNrZ3JvdW5kJylbMF07XHJcblx0Y29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF07XHJcblx0Y29uc3QgaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZScpO1xyXG5cdGNvbnN0IGluc3RydWN0aW9uX3BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5zdHJ1Y3Rpb25fcGFuZWwnKVswXTtcclxuXHRjb25zdCBhZGRfcG9pbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkX3BvaW50cycpWzBdO1xyXG5cdGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3cmFwcGVyJylbMF07XHJcblx0Y29uc3Qgc2xpZGVyX3BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX3BhbmVsJylbMF07XHJcblx0Y29uc3QgaGlnaF9zY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hpZ2hfc2NvcmUnKTtcclxuXHRsZXQgaW1hZ2VfaXRlcmF0aW9uID0gMDtcclxuXHRjb25zdCBCdXR0b24gPSB7XHJcblx0XHRjcmVhdGVfYnV0dG9uKHR5cGUpIHtcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy5idXR0b25bdHlwZV0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRidXR0b246IHtcclxuXHRcdFx0c3RhcnRfYnV0dG9uOiB7XHRcclxuXHRcdFx0XHRpZl9jbGlja2VkKGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRfYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0c2VsZltjYWxsYmFja10oKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhcnQoKSB7XHJcblx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdFx0XHRIZWxwZXIudG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24od3JhcHBlciwgJ2dyYXlzY2FsZV9iYWNrZ3JvdW5kX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0SGVscGVyLmhpZGVfZWxlbWVudChpbnN0cnVjdGlvbl9wYW5lbCk7XHJcblx0XHRcdFx0XHRzZWxmLnN0YXJ0X3NsaWRlcl9jb3VudGRvd24oQ09VTlRET1dOX05VTUJFUikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRzZWxmLnN0YXJ0X3NsaWRlcigpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxmLmRpc3BsYXlfZmFpbF9wYW5lbChyZXNwb25zZSk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN0YXJ0X3NsaWRlcl9jb3VudGRvd24oY291bnRkb3duTnVtYmVyKSB7XHJcblx0XHRcdFx0XHRjb25zdCBjb3VudGRvd25QYW5lbCA9IENvdW50ZG93bl9wYW5lbC5jcmVhdGVfY291bnRkb3duX3BhbmVsKCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gY291bnRkb3duUGFuZWwuc3RhcnRfY291bnRkb3duX3RpbWVyKGNvdW50ZG93bk51bWJlcik7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdGFydF9zbGlkZXIoKSB7XHJcblx0XHRcdFx0XHRjb25zdCBzbGlkZXIgPSBTbGlkZXIuY3JlYXRlX3NsaWRlcigpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlci5zdGFydF9zbGlkZXIoKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGRpc3BsYXlfZmFpbF9wYW5lbChpbWFnZXMpIHtcclxuXHRcdFx0XHRcdEhlbHBlci50cmFuc2l0aW9uX2VuZChpbWFnZXMsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZXN1bHRfdGV4dCcpWzBdLmlubmVySFRNTCA9ICdZb3UgbG9zZS4uLic7XHJcblx0XHRcdFx0XHRcdEhlbHBlci5zaG93X2VsZW1lbnQoZmFpbF9iYWNrZ3JvdW5kKTtcclxuXHRcdFx0XHRcdH0pO1x0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGZhaWxfYnV0dG9uOiB7XHJcblx0XHRcdFx0aWZfY2xpY2tlZChjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhaWxfYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0c2VsZltjYWxsYmFja10oKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFpbCgpIHtcclxuXHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRcdEhlbHBlci5oaWRlX2VsZW1lbnQoZmFpbF9iYWNrZ3JvdW5kLCBzbGlkZXJfcGFuZWwpO1xyXG5cdFx0XHRcdFx0Ly8gcmVzZXQgdGhlIGltYWdlc1xyXG5cdFx0XHRcdFx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTAwJSc7XHJcblx0XHQgIFx0XHRcdGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gJzBzJztcclxuXHRcdCAgXHRcdCAgXHRmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHQgIFx0XHRcdFx0aW1hZ2VbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHQgIFx0XHRcdH1cclxuXHRcdCAgXHRcdFx0aW1hZ2VfaXRlcmF0aW9uID0gMDtcclxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaGlnaF9zY29yZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRoaWdoX3Njb3JlW2ldLmlubmVySFRNTCA9IDA7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRzdWJtaXRfdGV4dGZpZWxkLnZhbHVlID0gJyc7XHJcblx0XHRcdFx0XHRIZWxwZXIucmVtb3ZlX2NsYXNzKHN1Ym1pdF90ZXh0ZmllbGQsICdzaGFrZV90ZXh0ZmllbGRfYW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0XHRIZWxwZXIucmVtb3ZlX2NsYXNzKGFkZF9wb2ludHMsICdhZGRfcG9pbnRzX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0YWRkX3BvaW50cy5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHJcblx0XHRcdFx0XHRIZWxwZXIudG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24od3JhcHBlciwgJ2dyYXlzY2FsZV9iYWNrZ3JvdW5kX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0c2VsZi5zdGFydF9zbGlkZXJfY291bnRkb3duKENPVU5URE9XTl9OVU1CRVIpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0c2VsZi5zdGFydF9zbGlkZXIoKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZi5kaXNwbGF5X2ZhaWxfcGFuZWwocmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdGFydF9zbGlkZXJfY291bnRkb3duKGNvdW50ZG93bk51bWJlcikge1xyXG5cdFx0XHRcdFx0Y29uc3QgY291bnRkb3duUGFuZWwgPSBDb3VudGRvd25fcGFuZWwuY3JlYXRlX2NvdW50ZG93bl9wYW5lbCgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNvdW50ZG93blBhbmVsLnN0YXJ0X2NvdW50ZG93bl90aW1lcihjb3VudGRvd25OdW1iZXIpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhcnRfc2xpZGVyKCkge1xyXG5cdFx0XHRcdFx0Y29uc3Qgc2xpZGVyID0gU2xpZGVyLmNyZWF0ZV9zbGlkZXIoKTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZXIuc3RhcnRfc2xpZGVyKCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRkaXNwbGF5X2ZhaWxfcGFuZWwoaW1hZ2VzKSB7XHJcblx0XHRcdFx0XHRIZWxwZXIudHJhbnNpdGlvbl9lbmQoaW1hZ2VzLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVzdWx0X3RleHQnKVswXS5pbm5lckhUTUwgPSAnWW91IGxvc2UuLi4nO1xyXG5cdFx0XHRcdFx0XHRIZWxwZXIuc2hvd19lbGVtZW50KGZhaWxfYmFja2dyb3VuZCk7XHJcblx0XHRcdFx0XHR9KTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWJtaXRfYnV0dG9uOiB7XHJcblx0XHRcdFx0aWZfY2xpY2tlZChjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdF9idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRzZWxmW2NhbGxiYWNrXSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdWJtaXQoKSB7XHJcblx0XHRcdCAgXHRcdGlmIChIZWxwZXIudmFsaWRhdGVfaWZfaW5wdXRfaXNfZG90YV9oZXJvX25hbWUoaW1hZ2VbaW1hZ2VfaXRlcmF0aW9uXSwgc3VibWl0X3RleHRmaWVsZCkpIHtcclxuXHRcdFx0ICBcdFx0XHRIZWxwZXIuaGlkZV9lbGVtZW50KGltYWdlW2ltYWdlX2l0ZXJhdGlvbl0pO1xyXG5cdFx0XHQgIFx0XHRcdGltYWdlX2l0ZXJhdGlvbisrO1xyXG5cdFx0XHQgIFx0XHRcdGFkZF9wb2ludHMuaW5uZXJIVE1MID0gXCIrMTAwXCI7XHJcblx0XHRcdCAgXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBoaWdoX3Njb3JlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdCAgXHRcdFx0XHRoaWdoX3Njb3JlW2ldLmlubmVySFRNTCA9IHBhcnNlSW50KGhpZ2hfc2NvcmVbaV0uaW5uZXJIVE1MKSArIDEwMDtcclxuXHRcdFx0ICBcdFx0XHR9XHJcblx0XHRcdCAgXHRcdFx0SGVscGVyLnRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKGFkZF9wb2ludHMsICdhZGRfcG9pbnRzX2FuaW1hdGlvbicpO1xyXG5cdFx0XHQgIFx0XHRcdEhlbHBlci5yZW1vdmVfY2xhc3Moc3VibWl0X3RleHRmaWVsZCwgJ3NoYWtlX3RleHRmaWVsZF9hbmltYXRpb24nKTtcclxuXHRcdFx0ICBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0SGVscGVyLnRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKHN1Ym1pdF90ZXh0ZmllbGQsICdzaGFrZV90ZXh0ZmllbGRfYW5pbWF0aW9uJyk7XHJcblx0XHRcdCAgXHRcdH1cclxuXHRcdFx0ICBcdFx0c3VibWl0X3RleHRmaWVsZC52YWx1ZSA9ICcnO1xyXG5cdFx0XHQgIFx0XHRpZiAodHlwZW9mIGltYWdlW2ltYWdlX2l0ZXJhdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdCAgXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVzdWx0X3RleHQnKVswXS5pbm5lckhUTUwgPSAnRXogV2luISc7XHJcblx0XHRcdCAgXHRcdFx0SGVscGVyLnNob3dfZWxlbWVudChmYWlsX2JhY2tncm91bmQpO1xyXG5cdFx0XHQgIFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBCdXR0b247XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBjb3VudGRvd24gcGFuZWw7IGl0IHdpbGwgY291bnRkb3duIHVudGlsIGl0IHJlYWNoZXMgMCBiZWZvcmUgaXQgZGlzcGxheXMgdGhlIHNsaWRlciBwYW5lbC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGNvbnN0IEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci5qcycpO1xyXG5cdFxyXG5cdGNvbnN0IENvdW50ZG93bl9wYW5lbCA9IHtcclxuXHRcdGNyZWF0ZV9jb3VudGRvd25fcGFuZWwoKSB7XHJcblx0XHRcdHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMuY291bnRkb3duX3BhbmVsKTtcclxuXHRcdH0sXHJcblx0XHRjb3VudGRvd25fcGFuZWw6IHtcclxuXHRcdFx0c3RhcnRfY291bnRkb3duX3RpbWVyKGNvdW50ZG93bl9udW1iZXIpIHtcclxuXHRcdFx0XHRjb25zdCBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRjb25zdCBjb3VudGRvd25fcGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRkb3duX3BhbmVsJyk7XHJcblx0XHRcdFx0Y29uc3QgY291bnRkb3duX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0XHRcdEhlbHBlci5zaG93X2VsZW1lbnQoY291bnRkb3duX3BhbmVsKTtcclxuXHRcdFx0XHRcdGNvdW50ZG93bl9wYW5lbC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0XHRcdFx0Y29uc3QgY291bnRkb3duX3RpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICAgIFx0XHRpZiAoY291bnRkb3duX251bWJlciA9PT0gMCkge1xyXG5cdFx0XHQgICAgICAgIFx0XHRjbGVhckludGVydmFsKGNvdW50ZG93bl90aW1lcik7XHJcblx0XHRcdCAgICAgICAgXHRcdEhlbHBlci5oaWRlX2VsZW1lbnQoY291bnRkb3duX3BhbmVsKTtcclxuXHRcdFx0ICAgICAgICBcdFx0cmVzb2x2ZShcIlN1Y2Nlc3NcIik7XHJcblx0XHRcdCAgICAgICAgXHR9XHJcblx0XHRcdCAgICAgICAgXHRjb3VudGRvd25fcGFuZWwuaW5uZXJIVE1MID0gY291bnRkb3duX251bWJlci0tO1xyXG5cdFx0XHQgICAgXHR9LCAxMDAwKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm4gY291bnRkb3duX3Byb21pc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIENvdW50ZG93bl9wYW5lbDtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvY291bnRkb3duX3BhbmVsLmpzXG4gKiovIiwiLy8gaXMgaXQgcmVhbGx5IHRoZSBiZXN0IHdheT8/PyBsb29rIHVwIENvbW1vbkpTL0FNRC9FUzYgaW1wb3J0L2V4cG9ydCAoPC0tIEkgZ3Vlc3MgdGhpcyBpcyBPSyBzbyBmYXIpXHJcbi8vIFdoYXQgYWJvdXQgaW5zdGVhZCBvZiBIZWxwZXIubWV0aG9kKCksIHVzZSBPYmplY3QuY3JlYXRlPyBEb2VzIHRoaXMgaGVscD9cclxuLy8gaHR0cDovL3JlcXVpcmVqcy5vcmcvZG9jcy9ub2RlLmh0bWwjMVxyXG4vLyBCeSB1c2luZyBSZXF1aXJlSlMgb24gdGhlIHNlcnZlciwgeW91IGNhbiB1c2Ugb25lIGZvcm1hdCBmb3IgYWxsIHlvdXIgbW9kdWxlcywgd2hldGhlciB0aGV5IGFyZSBydW5uaW5nIHNlcnZlciBzaWRlIG9yIGluIHRoZSBicm93c2VyLiAoaG1tLi4uKVxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBJTExFR0FMX0NIQVJBQ1RFUlMgPSBuZXcgUmVnRXhwKC9bXFwtXFxzXSsvKTtcclxuXHJcbiAgXHQvKipcclxuICBcdCAqIENvbnZlcnQgc3RyaW5nIHRvIGxvd2VyIGNhc2UgYW5kIHJlbW92ZSBpbGxlZ2FsIGNoYXJhY3RlcnMuXHJcbiAgXHQgKi9cclxuICBcdFN0cmluZy5wcm90b3R5cGUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycyA9IGZ1bmN0aW9uKCkge1xyXG4gIFx0XHRsZXQgbG93ZXJDYXNlVmFsdWUgPSB0aGlzLnRvTG93ZXJDYXNlKCk7XHJcbiAgXHRcdHJldHVybiBsb3dlckNhc2VWYWx1ZS5yZXBsYWNlKElMTEVHQUxfQ0hBUkFDVEVSUywgJycpO1xyXG4gIFx0fVxyXG4gIFx0XHJcblx0LyoqXHJcblx0ICogRmluZCB3aGljaCBDU1MgdHJhbnNpdGlvbiBldmVudHMgZW5kLlxyXG5cdCAqIGh0dHBzOi8vam9uc3VoLmNvbS9ibG9nL2RldGVjdC10aGUtZW5kLW9mLWNzcy1hbmltYXRpb25zLWFuZC10cmFuc2l0aW9ucy13aXRoLWphdmFzY3JpcHQvXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd2hpY2hfdHJhbnNpdGlvbl9ldmVudCgpe1xyXG5cdCAgdmFyIHQsXHJcblx0ICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XHJcblxyXG5cdCAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG5cdCAgICBcInRyYW5zaXRpb25cIiAgICAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiT1RyYW5zaXRpb25cIiAgICAgOiBcIm9UcmFuc2l0aW9uRW5kXCIsXHJcblx0ICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJXZWJraXRUcmFuc2l0aW9uXCI6IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiXHJcblx0ICB9XHJcblxyXG5cdCAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuXHQgICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpe1xyXG5cdCAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGVsIC0gVGhlIGVsZW1lbnQgdGhhdCB3ZSB3YW50IHRvIGZpbmQgdGhlIGN1cnJlbnQgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cclxuXHQgKiBodHRwczovL3d3dy5raXJ1cGEuY29tL2h0bWw1L2dldF9lbGVtZW50X3Bvc2l0aW9uX3VzaW5nX2phdmFzY3JpcHQuaHRtXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gZ2V0X3Bvc2l0aW9uKGVsKSB7XHJcblx0XHR2YXIgeFBvcyA9IDA7XHJcblx0XHR2YXIgeVBvcyA9IDA7XHJcblxyXG5cdFx0d2hpbGUgKGVsKSB7XHJcblx0XHRcdGlmIChlbC50YWdOYW1lID09IFwiQk9EWVwiKSB7XHJcblx0XHRcdFx0Ly8gZGVhbCB3aXRoIGJyb3dzZXIgcXVpcmtzIHdpdGggYm9keS93aW5kb3cvZG9jdW1lbnQgYW5kIHBhZ2Ugc2Nyb2xsXHJcblx0XHRcdFx0dmFyIHhTY3JvbGwgPSBlbC5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xyXG5cdFx0XHRcdHZhciB5U2Nyb2xsID0gZWwuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcblxyXG5cdFx0XHRcdHhQb3MgKz0gKGVsLm9mZnNldExlZnQgLSB4U2Nyb2xsICsgZWwuY2xpZW50TGVmdCk7XHJcblx0XHRcdFx0eVBvcyArPSAoZWwub2Zmc2V0VG9wIC0geVNjcm9sbCArIGVsLmNsaWVudFRvcCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gZm9yIGFsbCBvdGhlciBub24tQk9EWSBlbGVtZW50c1xyXG5cdFx0XHRcdHhQb3MgKz0gKGVsLm9mZnNldExlZnQgLSBlbC5zY3JvbGxMZWZ0ICsgZWwuY2xpZW50TGVmdCk7XHJcblx0XHRcdFx0eVBvcyArPSAoZWwub2Zmc2V0VG9wIC0gZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbCA9IGVsLm9mZnNldFBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiB4UG9zLFxyXG5cdFx0XHR5OiB5UG9zXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZCB0aGUgZm9jdXNlZCBlbGVtZW50OyBpdCB3aWxsIGNhbGwgdGhlIGNhbGxiYWNrIHdoZW4gdHJhbnNpdGlvbiBlbmRzLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gdGhlIG9iamVjdCB3aGljaCB3aWxsIGJlIGJpbmRlZCBieSBhIHRyYW5zaXRpb24gZW5kIGxpc3RlbmVyXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IHRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdHJhbnNpdGlvbiBlbmRcclxuXHQgKi9cclxuICBcdGZ1bmN0aW9uIHRyYW5zaXRpb25fZW5kKGVsZW1lbnQsIGNhbGxiYWNrKSB7XHJcblx0ICAgIGNvbnN0IHRyYW5zaXRpb25fZXZlbnQgPSB3aGljaF90cmFuc2l0aW9uX2V2ZW50KCk7XHJcblx0ICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uX2V2ZW50LCBjYWxsYmFjayk7XHJcbiAgXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BsYXkgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHNob3dfZWxlbWVudChlbGVtZW50LCBkaXNwbGF5KSB7XHJcblx0XHRpZiAodHlwZW9mIGRpc3BsYXkgIT09ICd1bmRlZmluZWQnICYmIGRpc3BsYXkgIT09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlIHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGhpZGRlbi5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBoaWRlX2VsZW1lbnQoZWxlbWVudCkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0YXJndW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBDU1MgY2xhc3MgdG8gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBhZGRlZCBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiBhZGRfY2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYSBDU1MgY2xhc3MgZnJvbSBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIHNwZWNpZmllZCBDU1MgY2xhc3MgcmVtb3ZlZC5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHJlbW92ZV9jbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gd2VpcmQgaGFjayBydWxlIC0gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9yZXN0YXJ0LWNzcy1hbmltYXRpb24vXHJcblx0XHR2b2lkIGVsZW1lbnQub2Zmc2V0V2lkdGg7XHRcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0cmVtb3ZlX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcbiAgXHRcdH0gZWxzZSB7XHJcbiAgXHRcdFx0YWRkX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHRcdFx0XHJcbiAgXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZSB3aGV0aGVyIHRvIGFkZCBvciByZW1vdmUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGFkZCBvciByZW1vdmUgdGhlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0cmVtb3ZlX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcbiAgXHRcdH1cclxuICBcdFx0YWRkX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZSBpZiB1c2VyIGlucHV0IGlzIGEgc3RyaW5nLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIHRleHRmaWVsZCB0aGF0IHdpbGwgYmUgdmFsaWRhdGVkLlxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdmFsaWRhdGVfaWZfaW5wdXRfaXNfZG90YV9oZXJvX25hbWUoaW1hZ2UsIHRleHRmaWVsZCkge1xyXG5cdFx0aWYgKGltYWdlLm5hbWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpID09PSB0ZXh0ZmllbGQudmFsdWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG4gIFx0fVxyXG5cclxuICBcdHJldHVybiB7XHJcbiAgXHRcdHRyYW5zaXRpb25fZW5kLFxyXG4gIFx0XHRnZXRfcG9zaXRpb24sXHJcbiAgXHRcdHNob3dfZWxlbWVudCxcclxuICBcdFx0aGlkZV9lbGVtZW50LFxyXG4gIFx0XHRhZGRfY2xhc3MsXHJcbiAgXHRcdHJlbW92ZV9jbGFzcyxcclxuICBcdFx0dG9nZ2xlX2NsYXNzLFxyXG4gIFx0XHR0b2dnbGVfY2xhc3NfZm9yX2FuaW1hdGlvbixcclxuICBcdFx0dmFsaWRhdGVfaWZfaW5wdXRfaXNfZG90YV9oZXJvX25hbWVcclxuICBcdH1cclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2hlbHBlci5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBzbGlkZXIgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBhZnRlciB0aGUgY291bnRkb3duLiBJdCB3aWxsIGRpc3BsYXkgYW4gZW5kbGVzcyBzdHJlYW0gb2YgZG90YSBpbWFnZXMgdGhhdCBhcmUgcmV0cmlldmVkIHZpYSBEb3RhIEFQSS5cclxuICogSXQgd2lsbCBjb25zdGFudGx5IHRyYW5zaXRpb24gdG8gdGhlIGxlZnQgdW50aWwgaXQgcmVhY2hlcyB0byB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHBhbmVsIHRoYXQgaG9sZHMgdGhlIGltYWdlcywgd2hpY2ggaW4gdGhhdCBjYXNlIHRoZSBnYW1lXHJcbiAqIGxvc2UuIFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Y29uc3QgU0xJREVfRFVSQVRJT04gPSAxMDtcclxuXHRjb25zdCBXQVJOSU5HX1RIUkVTSE9MRCA9IDMwO1xyXG5cdGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdGNvbnN0IGltYWdlc19wYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlc19wYW5lbCcpWzBdO1xyXG5cdGNvbnN0IGZhaWxfYmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxfYmFja2dyb3VuZCcpWzBdO1xyXG5cdGNvbnN0IHVybCA9ICdodHRwOi8vbGlsbW9ydGFsLXRlc3QuYXBpZ2VlLm5ldC9nZXRkb3RhaGVyb2VzP2tleT02QzFDRjc2QzkwNzY4Mzg4NjE4RjM0OEJCNzNFRTAxNSZsYW5ndWFnZT1lbl91cyZmb3JtYXQ9SlNPTic7XHJcblx0Y29uc3QgU2xpZGVyID0ge1xyXG5cdFx0Y3JlYXRlX3NsaWRlcigpIHtcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy5zbGlkZXJfcGFuZWwpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRzbGlkZXJfcGFuZWw6IHtcclxuXHRcdFx0bG9hZF9pbWFnZXMoKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRcdFx0Y29uc3Qgb1JlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0XHRcdFx0b1JlcS5vcGVuKCdHRVQnLCB1cmwpO1xyXG5cdFx0XHRcdFx0b1JlcS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdCAgICBpZiAob1JlcS5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIG9SZXEuc3RhdHVzID09PSAyMDApIHtcclxuXHRcdFx0XHRcdCAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKG9SZXEucmVzcG9uc2VUZXh0KSk7XHJcblx0XHRcdFx0XHQgICAgfSBlbHNlIHtcclxuXHRcdFx0XHRcdCAgICBcdHJlamVjdChvUmVxLnN0YXR1c1RleHQpO1xyXG5cdFx0XHRcdFx0ICAgIH1cclxuXHRcdFx0XHRcdH07XHRcdFxyXG5cdFx0XHRcdFx0b1JlcS5zZW5kKCk7XHJcblx0XHRcdFx0fSlcdFx0XHRcclxuXHRcdFx0fSxcclxuXHRcdFx0Z2V0X2ltYWdlcygpIHtcclxuXHRcdFx0XHR0aGlzLmxvYWRfaW1hZ2VzKHVybCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHQgICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0XHRcdFx0Y29uc3QgaGVyb2VzID0gcmVzcG9uc2UucmVzdWx0Lmhlcm9lcztcclxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaGVyb2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblx0XHRcdFx0XHRcdGltYWdlLmNsYXNzTmFtZSA9ICdpbWFnZSc7XHJcblx0XHRcdFx0XHRcdGltYWdlLnNyYyA9ICdodHRwOi8vY2RuLmRvdGEyLmNvbS9hcHBzL2RvdGEyL2ltYWdlcy9oZXJvZXMvJyArIGhlcm9lc1tpXS5uYW1lLnJlcGxhY2UoJ25wY19kb3RhX2hlcm9fJywgJycpICsgJ19sZy5wbmcnO1xyXG5cdFx0XHRcdFx0XHQvL0l0IHNob3VsZCBiZSBUdXNrYXIsIG5vdCBUdXNrIVxyXG5cdFx0XHRcdFx0XHRpZiAoaGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lID09PSAnVHVzaycpIHtcclxuXHRcdFx0XHRcdFx0XHRoZXJvZXNbaV0ubG9jYWxpemVkX25hbWUgPSAnVHVza2FyJztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpbWFnZS5uYW1lID0gaGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lO1xyXG5cdFx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpbWFnZXMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJFcnJvciBsb2FkaW5nIHRoZSBpbWFnZXMuIFwiICsgZXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdCk7XHRcclxuXHRcdFx0fSxcclxuXHRcdFx0c2xpZGUoKSB7XHJcblx0XHRcdFx0Y29uc3Qgc2NyZWVuX3dpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XHJcblx0XHRcdCAgICBjb25zdCBkZWZhdWx0X3dpZHRoID0gKHNjcmVlbl93aWR0aCAtIGltYWdlc19wYW5lbC5vZmZzZXRXaWR0aC8gMikgKyBpbWFnZXNfcGFuZWwub2Zmc2V0V2lkdGg7XHJcblx0XHRcdCAgICBjb25zdCB3YXJuaW5nX3dpZHRoID0gZGVmYXVsdF93aWR0aCAqIFdBUk5JTkdfVEhSRVNIT0xEIC8gMTAwO1xyXG5cdFx0XHQgICAgbGV0IHRpbWVyO1xyXG5cdFx0XHRcdGltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzAnO1xyXG5cdFx0XHQgICAgaW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSBTTElERV9EVVJBVElPTiArICdzIGxpbmVhcic7XHJcblx0XHRcdFx0SGVscGVyLnJlbW92ZV9jbGFzcyhpbWFnZXNfcGFuZWwsICd3YXJuaW5nX2FuaW1hdGlvbicpO1xyXG5cclxuXHRcdFx0ICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICBcdGlmIChIZWxwZXIuZ2V0X3Bvc2l0aW9uKGltYWdlcykueCA8PSB3YXJuaW5nX3dpZHRoKSB7XHJcblx0XHRcdFx0XHRcdEhlbHBlci5hZGRfY2xhc3MoaW1hZ2VzX3BhbmVsLCAnd2FybmluZ19hbmltYXRpb24nKTtcclxuXHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdCAgICBcdH1cclxuXHRcdFx0ICAgIH0sIDEwMDApO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdGFydF9zbGlkZXIoKSB7XHJcblx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlcl9wYW5lbCcpWzBdO1xyXG5cdFx0XHRcdGNvbnN0IHNsaWRlcl9wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdFx0XHRpZiAoaW1hZ2VzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRzZWxmLmdldF9pbWFnZXMoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdEhlbHBlci5zaG93X2VsZW1lbnQoc2xpZGVyKTtcclxuXHRcdFx0XHRcdHNlbGYuc2xpZGUoKTtcclxuXHRcdFx0XHRcdHJlc29sdmUoaW1hZ2VzKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm4gc2xpZGVyX3Byb21pc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIFNsaWRlcjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvc2xpZGVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0Y29uc3QgQnV0dG9uID0gcmVxdWlyZSgnLi9idXR0b24uanMnKTtcclxuXHRjb25zdCBUZXh0ZmllbGQgPSB7XHJcblx0XHRjcmVhdGVfdGV4dGZpZWxkKGNhbGxiYWNrKSB7XHJcblx0XHRcdHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMudGV4dGZpZWxkW2NhbGxiYWNrXSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHRleHRmaWVsZDoge1xyXG5cdFx0XHRzdWJtaXRfdGV4dGZpZWxkOiB7XHJcblx0XHRcdFx0c3VibWl0KCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRfdGV4dGZpZWxkJyk7XHJcblx0XHRcdFx0XHRjb25zdCBzdWJtaXRfYnV0dG9uID0gQnV0dG9uLmNyZWF0ZV9idXR0b24oJ3N1Ym1pdF9idXR0b24nKTtcclxuXHJcblx0XHRcdFx0XHR0ZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcblx0XHRcdFx0XHRcdFx0c3VibWl0X2J1dHRvbi5zdWJtaXQoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIFRleHRmaWVsZDtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvdGV4dGZpZWxkLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==