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
		var Textfield = __webpack_require__(7);
		var Config = __webpack_require__(5);
		var Images = __webpack_require__(8);
	
		var images = Images.load_images();
	
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
	
		var Countdown_panel = __webpack_require__(3);
		var Slider = __webpack_require__(6);
		var Helper = __webpack_require__(4);
		var Config = __webpack_require__(5);
	
		var config = Config.elements;
		var constants = Config.constants;
		var text = Config.text;
	
		var image_iteration = 0;
	
		var Button = {
			create_button: function create_button(type) {
				return Object.create(this.button[type]);
			},
	
	
			button: {
				start_button: {
					if_clicked: function if_clicked(callback) {
						var _this = this;
	
						config.start_button.addEventListener('click', function () {
							_this[callback]();
						});
					},
					start: function start() {
						var _this2 = this;
	
						Helper.toggle_class_for_animation(config.wrapper, 'grayscale_background_animation');
						Helper.hide_element(config.instruction_panel);
						this.start_slider_countdown().then(function (response) {
							_this2.start_slider().then(function (response) {
								_this2.display_fail_panel(response);
							});
						});
					},
					start_slider_countdown: function start_slider_countdown(countdownNumber) {
						var countdown_panel = Countdown_panel.create_countdown_panel();
						return countdown_panel.start_countdown_timer(countdownNumber);
					},
					start_slider: function start_slider() {
						var slider = Slider.create_slider();
						return slider.start_slider();
					},
					display_fail_panel: function display_fail_panel(images) {
						Helper.transition_end(images, function () {
							config.result_text.innerHTML = 'You lose...';
							Helper.show_element(config.fail_background);
						});
					}
				},
				fail_button: {
					if_clicked: function if_clicked(callback) {
						var _this3 = this;
	
						config.fail_button.addEventListener('click', function () {
							_this3[callback]();
						});
					},
					fail: function fail() {
						var _this4 = this;
	
						Helper.hide_element(config.fail_background, config.slider_panel);
						// reset the images
						config.images.style.marginLeft = '100%';
						config.images.style.transition = '0s';
						for (var i = 0; i < config.image.length; i++) {
							config.image[i].style.display = 'block';
						}
						image_iteration = 0;
						for (var _i = 0; _i < config.high_score.length; _i++) {
							config.high_score[_i].innerHTML = 0;
						}
						config.submit_textfield.value = '';
						Helper.remove_class(config.submit_textfield, 'shake_textfield_animation');
						Helper.remove_class(config.add_points, 'add_points_animation');
						config.add_points.style.opacity = 0;
	
						Helper.toggle_class_for_animation(config.wrapper, 'grayscale_background_animation');
						this.start_slider_countdown().then(function (response) {
							_this4.start_slider().then(function (response) {
								_this4.display_fail_panel(response);
							});
						});
					},
					start_slider_countdown: function start_slider_countdown(countdownNumber) {
						var countdown_panel = Countdown_panel.create_countdown_panel();
						return countdown_panel.start_countdown_timer(countdownNumber);
					},
					start_slider: function start_slider() {
						var slider = Slider.create_slider();
						return slider.start_slider();
					},
					display_fail_panel: function display_fail_panel(images) {
						Helper.transition_end(images, function () {
							config.result_text.innerHTML = text.fail_message;
							Helper.show_element(config.fail_background);
						});
					}
				},
				submit_button: {
					if_clicked: function if_clicked(callback) {
						var _this5 = this;
	
						config.submit_button.addEventListener('click', function () {
							_this5[callback]();
						});
					},
					submit: function submit() {
						if (Helper.validate_if_input_is_dota_hero_name(config.image[image_iteration], config.submit_textfield)) {
							Helper.hide_element(config.image[image_iteration]);
							image_iteration++;
							config.add_points.innerHTML = '+' + constants.POINTS_ADDED;
							for (var i = 0; i < config.high_score.length; i++) {
								config.high_score[i].innerHTML = parseInt(config.high_score[i].innerHTML) + parseInt(constants.POINTS_ADDED);
							}
							Helper.toggle_class_for_animation(config.add_points, 'add_points_animation');
							Helper.remove_class(config.submit_textfield, 'shake_textfield_animation');
						} else {
							Helper.toggle_class_for_animation(config.submit_textfield, 'shake_textfield_animation');
						}
						config.submit_textfield.value = '';
						if (typeof config.image[image_iteration] === 'undefined') {
							config.result_text.innerHTML = text.success_message;
							Helper.show_element(config.fail_background);
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
		var Config = __webpack_require__(5);
	
		var config = Config.elements;
		var constants = Config.constants;
	
		var Countdown_panel = {
			create_countdown_panel: function create_countdown_panel() {
				return Object.create(this.countdown_panel);
			},
	
			countdown_panel: {
				start_countdown_timer: function start_countdown_timer() {
					var countdown_duration = constants.COUNTDOWN_DURATION;
					var countdown_promise = new Promise(function (resolve, reject) {
						Helper.show_element(config.countdown_panel);
						config.countdown_panel.innerHTML = "";
						var countdown_timer = setInterval(function () {
							if (countdown_duration === 0) {
								clearInterval(countdown_timer);
								Helper.hide_element(config.countdown_panel);
								resolve("Success");
							}
							config.countdown_panel.innerHTML = countdown_duration--;
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
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
				var config = {
							elements: {
										// images
										images: document.getElementsByClassName('images')[0],
										images_panel: document.getElementsByClassName('images_panel')[0],
										image: document.getElementsByClassName('image'),
	
										//fail
										fail_background: document.getElementsByClassName('fail_background')[0],
										fail_button: document.getElementById('fail_button'),
	
										//submit
										submit_textfield: document.getElementById('submit_textfield'),
										submit_button: document.getElementById('submit_button'),
	
										//instruction
										instruction_panel: document.getElementsByClassName('instruction_panel')[0],
										start_button: document.getElementById('start_button'),
	
										//countdown
										countdown_panel: document.getElementById('countdown_panel'),
	
										//slider
										add_points: document.getElementsByClassName('add_points')[0],
										slider_panel: document.getElementsByClassName('slider_panel')[0],
										high_score: document.getElementsByClassName('high_score'),
										result_text: document.getElementsByClassName('result_text')[0],
	
										//body
										wrapper: document.getElementsByClassName('wrapper')[0]
							},
	
							constants: {
										COUNTDOWN_DURATION: 3,
										SLIDE_DURATION: 10,
										WARNING_THRESHOLD: 30,
										POINTS_ADDED: 100
							},
	
							text: {
										//fail
										fail_message: 'You lose...',
	
										//win
										success_message: 'Ez Win!',
	
										images_json_url: 'http://lilmortal-test.apigee.net/getdotaheroes?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON'
							}
				};
				return config;
	}();

/***/ },
/* 6 */
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
		var Config = __webpack_require__(5);
	
		var config = Config.elements;
		var constants = Config.constants;
		var text = Config.text;
	
		var Slider = {
			create_slider: function create_slider() {
				return Object.create(this.slider_panel);
			},
	
	
			slider_panel: {
				slide: function slide() {
					var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
					var default_width = screen_width - config.images_panel.offsetWidth / 2 + config.images_panel.offsetWidth;
					var warning_width = default_width * constants.WARNING_THRESHOLD / 100;
					var timer = void 0;
					config.images.style.marginLeft = '0';
					config.images.style.transition = constants.SLIDE_DURATION + 's linear';
					Helper.remove_class(config.images_panel, 'warning_animation');
	
					timer = setInterval(function () {
						if (Helper.get_position(config.images).x <= warning_width) {
							Helper.add_class(config.images_panel, 'warning_animation');
							clearInterval(timer);
						}
					}, 1000);
				},
				start_slider: function start_slider() {
					var _this = this;
	
					var slider_promise = new Promise(function (resolve, reject) {
						Helper.show_element(config.slider_panel);
						_this.slide();
						resolve(config.images);
					});
					return slider_promise;
				}
			}
		};
		return Slider;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function () {
		"use strict";
	
		var Button = __webpack_require__(2);
		var Config = __webpack_require__(5);
	
		var config = Config.elements;
	
		var Textfield = {
			create_textfield: function create_textfield(callback) {
				return Object.create(this.textfield[callback]);
			},
	
	
			textfield: {
				submit_textfield: {
					submit: function submit() {
						var submit_button = Button.create_button('submit_button');
	
						config.submit_textfield.addEventListener('keyup', function (event) {
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function () {
		"use strict";
	
		var Config = __webpack_require__(5);
	
		var config = Config.elements;
		var text = Config.text;
	
		var Images = {
			get_status: function get_status(response) {
				if (response.status !== 200) {
					return Promise.reject(new Error(response.statusText));
				} else {
					return Promise.resolve(response);
				}
			},
			get_json: function get_json(response) {
				return response.json();
			},
			load_images: function load_images() {
				var self = this;
				fetch(text.images_json_url).then(this.get_status).then(this.get_json).then(function (response) {
					var heroes = response.result.heroes;
					var fragment = document.createDocumentFragment();
	
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
					config.images.appendChild(fragment);
				});
			}
		};
	
		return Images;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGQ4MmFmZTY3M2UzMzg5YjFlZWIiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvdGV4dGZpZWxkLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvaW1hZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBLEVBQUMsWUFBVztBQUNYOztBQUVBLE1BQU0sU0FBUyxvQkFBUSxDQUFSLENBQWY7QUFDQSxNQUFNLFlBQVksb0JBQVEsQ0FBUixDQUFsQjtBQUNBLE1BQU0sU0FBUyxvQkFBUSxDQUFSLENBQWY7QUFDQSxNQUFNLFNBQVMsb0JBQVEsQ0FBUixDQUFmOztBQUVBLE1BQU0sU0FBUyxPQUFPLFdBQVAsRUFBZjs7QUFFQSxNQUFNLGVBQWUsT0FBTyxhQUFQLENBQXFCLGNBQXJCLENBQXJCO0FBQ0EsZUFBYSxVQUFiLENBQXdCLE9BQXhCOztBQUVBLE1BQU0sY0FBYyxPQUFPLGFBQVAsQ0FBcUIsYUFBckIsQ0FBcEI7QUFDQSxjQUFZLFVBQVosQ0FBdUIsTUFBdkI7O0FBRUEsTUFBTSxnQkFBZ0Is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IGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwZDgyYWZlNjczZTMzODliMWVlYlxuICoqLyIsIihmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQnV0dG9uID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2J1dHRvbi5qcycpO1xyXG5cdGNvbnN0IFRleHRmaWVsZCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90ZXh0ZmllbGQuanMnKTtcclxuXHRjb25zdCBDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy5qcycpO1xyXG5cdGNvbnN0IEltYWdlcyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9pbWFnZXMuanMnKTtcclxuXHJcblx0Y29uc3QgaW1hZ2VzID0gSW1hZ2VzLmxvYWRfaW1hZ2VzKCk7XHJcblx0XHJcblx0Y29uc3Qgc3RhcnRfYnV0dG9uID0gQnV0dG9uLmNyZWF0ZV9idXR0b24oJ3N0YXJ0X2J1dHRvbicpO1xyXG5cdHN0YXJ0X2J1dHRvbi5pZl9jbGlja2VkKCdzdGFydCcpO1xyXG5cclxuXHRjb25zdCBmYWlsX2J1dHRvbiA9IEJ1dHRvbi5jcmVhdGVfYnV0dG9uKCdmYWlsX2J1dHRvbicpO1xyXG5cdGZhaWxfYnV0dG9uLmlmX2NsaWNrZWQoJ2ZhaWwnKTtcclxuXHJcblx0Y29uc3Qgc3VibWl0X2J1dHRvbiA9IEJ1dHRvbi5jcmVhdGVfYnV0dG9uKCdzdWJtaXRfYnV0dG9uJyk7XHJcblx0c3VibWl0X2J1dHRvbi5pZl9jbGlja2VkKCdzdWJtaXQnKTtcclxuXHJcblx0Y29uc3Qgc3VibWl0X3RleHRmaWVsZCA9IFRleHRmaWVsZC5jcmVhdGVfdGV4dGZpZWxkKCdzdWJtaXRfdGV4dGZpZWxkJyk7XHJcblx0c3VibWl0X3RleHRmaWVsZC5zdWJtaXQoKTtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2luaXQuanNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyBhIGdlbmVyaWMgYnV0dG9uLCB3aGljaCBoYXMgYSBtdWx0aXR1ZGUgb2YgZ2VuZXJpYyB0byBzcGVjaWZpYyBmdW5jdGlvbnMgZm9yIGFsbCBwb3NzaWJsZSBzY2VuYXJpb3MuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBCdXR0b25cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRjb25zdCBDb3VudGRvd25fcGFuZWwgPSByZXF1aXJlKCcuL2NvdW50ZG93bl9wYW5lbC5qcycpO1xyXG5cdGNvbnN0IFNsaWRlciA9IHJlcXVpcmUoJy4vc2xpZGVyLmpzJyk7XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Y29uc3QgQ29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnLmpzJyk7XHJcblxyXG5cdGNvbnN0IGNvbmZpZyA9IENvbmZpZy5lbGVtZW50cztcclxuXHRjb25zdCBjb25zdGFudHMgPSBDb25maWcuY29uc3RhbnRzO1xyXG5cdGNvbnN0IHRleHQgPSBDb25maWcudGV4dDtcclxuXHRcclxuXHRsZXQgaW1hZ2VfaXRlcmF0aW9uID0gMDtcclxuXHJcblx0Y29uc3QgQnV0dG9uID0ge1xyXG5cdFx0Y3JlYXRlX2J1dHRvbih0eXBlKSB7XHJcblx0XHRcdHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMuYnV0dG9uW3R5cGVdKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0YnV0dG9uOiB7XHJcblx0XHRcdHN0YXJ0X2J1dHRvbjoge1x0XHJcblx0XHRcdFx0aWZfY2xpY2tlZChjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0Y29uZmlnLnN0YXJ0X2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpc1tjYWxsYmFja10oKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhcnQoKSB7XHJcblx0XHRcdFx0XHRIZWxwZXIudG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24oY29uZmlnLndyYXBwZXIsICdncmF5c2NhbGVfYmFja2dyb3VuZF9hbmltYXRpb24nKTtcclxuXHRcdFx0XHRcdEhlbHBlci5oaWRlX2VsZW1lbnQoY29uZmlnLmluc3RydWN0aW9uX3BhbmVsKTtcclxuXHRcdFx0XHRcdHRoaXMuc3RhcnRfc2xpZGVyX2NvdW50ZG93bigpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc3RhcnRfc2xpZGVyKCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmRpc3BsYXlfZmFpbF9wYW5lbChyZXNwb25zZSk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN0YXJ0X3NsaWRlcl9jb3VudGRvd24oY291bnRkb3duTnVtYmVyKSB7XHJcblx0XHRcdFx0XHRjb25zdCBjb3VudGRvd25fcGFuZWwgPSBDb3VudGRvd25fcGFuZWwuY3JlYXRlX2NvdW50ZG93bl9wYW5lbCgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNvdW50ZG93bl9wYW5lbC5zdGFydF9jb3VudGRvd25fdGltZXIoY291bnRkb3duTnVtYmVyKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN0YXJ0X3NsaWRlcigpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHNsaWRlciA9IFNsaWRlci5jcmVhdGVfc2xpZGVyKCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGVyLnN0YXJ0X3NsaWRlcigpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZGlzcGxheV9mYWlsX3BhbmVsKGltYWdlcykge1xyXG5cdFx0XHRcdFx0SGVscGVyLnRyYW5zaXRpb25fZW5kKGltYWdlcywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25maWcucmVzdWx0X3RleHQuaW5uZXJIVE1MID0gJ1lvdSBsb3NlLi4uJztcclxuXHRcdFx0XHRcdFx0SGVscGVyLnNob3dfZWxlbWVudChjb25maWcuZmFpbF9iYWNrZ3JvdW5kKTtcclxuXHRcdFx0XHRcdH0pO1x0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGZhaWxfYnV0dG9uOiB7XHJcblx0XHRcdFx0aWZfY2xpY2tlZChjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0Y29uZmlnLmZhaWxfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzW2NhbGxiYWNrXSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRmYWlsKCkge1xyXG5cdFx0XHRcdFx0SGVscGVyLmhpZGVfZWxlbWVudChjb25maWcuZmFpbF9iYWNrZ3JvdW5kLCBjb25maWcuc2xpZGVyX3BhbmVsKTtcclxuXHRcdFx0XHRcdC8vIHJlc2V0IHRoZSBpbWFnZXNcclxuXHRcdFx0XHRcdGNvbmZpZy5pbWFnZXMuc3R5bGUubWFyZ2luTGVmdCA9ICcxMDAlJztcclxuXHRcdCAgXHRcdFx0Y29uZmlnLmltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gJzBzJztcclxuXHRcdCAgXHRcdCAgXHRmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5pbWFnZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0ICBcdFx0XHRcdGNvbmZpZy5pbWFnZVtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHRcdCAgXHRcdFx0fVxyXG5cdFx0ICBcdFx0XHRpbWFnZV9pdGVyYXRpb24gPSAwO1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWcuaGlnaF9zY29yZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRjb25maWcuaGlnaF9zY29yZVtpXS5pbm5lckhUTUwgPSAwO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uZmlnLnN1Ym1pdF90ZXh0ZmllbGQudmFsdWUgPSAnJztcclxuXHRcdFx0XHRcdEhlbHBlci5yZW1vdmVfY2xhc3MoY29uZmlnLnN1Ym1pdF90ZXh0ZmllbGQsICdzaGFrZV90ZXh0ZmllbGRfYW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0XHRIZWxwZXIucmVtb3ZlX2NsYXNzKGNvbmZpZy5hZGRfcG9pbnRzLCAnYWRkX3BvaW50c19hbmltYXRpb24nKTtcclxuXHRcdFx0XHRcdGNvbmZpZy5hZGRfcG9pbnRzLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cclxuXHRcdFx0XHRcdEhlbHBlci50b2dnbGVfY2xhc3NfZm9yX2FuaW1hdGlvbihjb25maWcud3JhcHBlciwgJ2dyYXlzY2FsZV9iYWNrZ3JvdW5kX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0dGhpcy5zdGFydF9zbGlkZXJfY291bnRkb3duKCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zdGFydF9zbGlkZXIoKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGlzcGxheV9mYWlsX3BhbmVsKHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhcnRfc2xpZGVyX2NvdW50ZG93bihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGNvdW50ZG93bl9wYW5lbCA9IENvdW50ZG93bl9wYW5lbC5jcmVhdGVfY291bnRkb3duX3BhbmVsKCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gY291bnRkb3duX3BhbmVsLnN0YXJ0X2NvdW50ZG93bl90aW1lcihjb3VudGRvd25OdW1iZXIpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhcnRfc2xpZGVyKCkge1xyXG5cdFx0XHRcdFx0Y29uc3Qgc2xpZGVyID0gU2xpZGVyLmNyZWF0ZV9zbGlkZXIoKTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZXIuc3RhcnRfc2xpZGVyKCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRkaXNwbGF5X2ZhaWxfcGFuZWwoaW1hZ2VzKSB7XHJcblx0XHRcdFx0XHRIZWxwZXIudHJhbnNpdGlvbl9lbmQoaW1hZ2VzLCAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbmZpZy5yZXN1bHRfdGV4dC5pbm5lckhUTUwgPSB0ZXh0LmZhaWxfbWVzc2FnZTtcclxuXHRcdFx0XHRcdFx0SGVscGVyLnNob3dfZWxlbWVudChjb25maWcuZmFpbF9iYWNrZ3JvdW5kKTtcclxuXHRcdFx0XHRcdH0pO1x0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Ym1pdF9idXR0b246IHtcclxuXHRcdFx0XHRpZl9jbGlja2VkKGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRjb25maWcuc3VibWl0X2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpc1tjYWxsYmFja10oKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3VibWl0KCkge1xyXG5cdFx0XHQgIFx0XHRpZiAoSGVscGVyLnZhbGlkYXRlX2lmX2lucHV0X2lzX2RvdGFfaGVyb19uYW1lKGNvbmZpZy5pbWFnZVtpbWFnZV9pdGVyYXRpb25dLCBjb25maWcuc3VibWl0X3RleHRmaWVsZCkpIHtcclxuXHRcdFx0ICBcdFx0XHRIZWxwZXIuaGlkZV9lbGVtZW50KGNvbmZpZy5pbWFnZVtpbWFnZV9pdGVyYXRpb25dKTtcclxuXHRcdFx0ICBcdFx0XHRpbWFnZV9pdGVyYXRpb24rKztcclxuXHRcdFx0ICBcdFx0XHRjb25maWcuYWRkX3BvaW50cy5pbm5lckhUTUwgPSAnKycgKyBjb25zdGFudHMuUE9JTlRTX0FEREVEO1xyXG5cdFx0XHQgIFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmhpZ2hfc2NvcmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0ICBcdFx0XHRcdGNvbmZpZy5oaWdoX3Njb3JlW2ldLmlubmVySFRNTCA9IHBhcnNlSW50KGNvbmZpZy5oaWdoX3Njb3JlW2ldLmlubmVySFRNTCkgKyBwYXJzZUludChjb25zdGFudHMuUE9JTlRTX0FEREVEKTtcclxuXHRcdFx0ICBcdFx0XHR9XHJcblx0XHRcdCAgXHRcdFx0SGVscGVyLnRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKGNvbmZpZy5hZGRfcG9pbnRzLCAnYWRkX3BvaW50c19hbmltYXRpb24nKTtcclxuXHRcdFx0ICBcdFx0XHRIZWxwZXIucmVtb3ZlX2NsYXNzKGNvbmZpZy5zdWJtaXRfdGV4dGZpZWxkLCAnc2hha2VfdGV4dGZpZWxkX2FuaW1hdGlvbicpO1xyXG5cdFx0XHQgIFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRIZWxwZXIudG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24oY29uZmlnLnN1Ym1pdF90ZXh0ZmllbGQsICdzaGFrZV90ZXh0ZmllbGRfYW5pbWF0aW9uJyk7XHJcblx0XHRcdCAgXHRcdH1cclxuXHRcdFx0ICBcdFx0Y29uZmlnLnN1Ym1pdF90ZXh0ZmllbGQudmFsdWUgPSAnJztcclxuXHRcdFx0ICBcdFx0aWYgKHR5cGVvZiBjb25maWcuaW1hZ2VbaW1hZ2VfaXRlcmF0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0ICBcdFx0XHRjb25maWcucmVzdWx0X3RleHQuaW5uZXJIVE1MID0gdGV4dC5zdWNjZXNzX21lc3NhZ2U7XHJcblx0XHRcdCAgXHRcdFx0SGVscGVyLnNob3dfZWxlbWVudChjb25maWcuZmFpbF9iYWNrZ3JvdW5kKTtcclxuXHRcdFx0ICBcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gQnV0dG9uO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9idXR0b24uanNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyB0aGUgY291bnRkb3duIHBhbmVsOyBpdCB3aWxsIGNvdW50ZG93biB1bnRpbCBpdCByZWFjaGVzIDAgYmVmb3JlIGl0IGRpc3BsYXlzIHRoZSBzbGlkZXIgcGFuZWwuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHRjb25zdCBDb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcuanMnKTtcclxuXHJcblx0Y29uc3QgY29uZmlnID0gQ29uZmlnLmVsZW1lbnRzO1xyXG5cdGNvbnN0IGNvbnN0YW50cyA9IENvbmZpZy5jb25zdGFudHM7XHJcblxyXG5cdGNvbnN0IENvdW50ZG93bl9wYW5lbCA9IHtcclxuXHRcdGNyZWF0ZV9jb3VudGRvd25fcGFuZWwoKSB7XHJcblx0XHRcdHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMuY291bnRkb3duX3BhbmVsKTtcclxuXHRcdH0sXHJcblx0XHRjb3VudGRvd25fcGFuZWw6IHtcclxuXHRcdFx0c3RhcnRfY291bnRkb3duX3RpbWVyKCkge1xyXG5cdFx0XHRcdGxldCBjb3VudGRvd25fZHVyYXRpb24gPSBjb25zdGFudHMuQ09VTlRET1dOX0RVUkFUSU9OO1xyXG5cdFx0XHRcdGNvbnN0IGNvdW50ZG93bl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdFx0SGVscGVyLnNob3dfZWxlbWVudChjb25maWcuY291bnRkb3duX3BhbmVsKTtcclxuXHRcdFx0XHRcdGNvbmZpZy5jb3VudGRvd25fcGFuZWwuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRcdFx0XHRcdGNvbnN0IGNvdW50ZG93bl90aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdFx0ICAgICAgXHRcdGlmIChjb3VudGRvd25fZHVyYXRpb24gPT09IDApIHtcclxuXHRcdFx0ICAgICAgICBcdFx0Y2xlYXJJbnRlcnZhbChjb3VudGRvd25fdGltZXIpO1xyXG5cdFx0XHQgICAgICAgIFx0XHRIZWxwZXIuaGlkZV9lbGVtZW50KGNvbmZpZy5jb3VudGRvd25fcGFuZWwpO1xyXG5cdFx0XHQgICAgICAgIFx0XHRyZXNvbHZlKFwiU3VjY2Vzc1wiKTtcclxuXHRcdFx0ICAgICAgICBcdH1cclxuXHRcdFx0ICAgICAgICBcdGNvbmZpZy5jb3VudGRvd25fcGFuZWwuaW5uZXJIVE1MID0gY291bnRkb3duX2R1cmF0aW9uLS07XHJcblx0XHRcdCAgICBcdH0sIDEwMDApO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybiBjb3VudGRvd25fcHJvbWlzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gQ291bnRkb3duX3BhbmVsO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9jb3VudGRvd25fcGFuZWwuanNcbiAqKi8iLCIvLyBpcyBpdCByZWFsbHkgdGhlIGJlc3Qgd2F5Pz8/IGxvb2sgdXAgQ29tbW9uSlMvQU1EL0VTNiBpbXBvcnQvZXhwb3J0ICg8LS0gSSBndWVzcyB0aGlzIGlzIE9LIHNvIGZhcilcclxuLy8gV2hhdCBhYm91dCBpbnN0ZWFkIG9mIEhlbHBlci5tZXRob2QoKSwgdXNlIE9iamVjdC5jcmVhdGU/IERvZXMgdGhpcyBoZWxwP1xyXG4vLyBodHRwOi8vcmVxdWlyZWpzLm9yZy9kb2NzL25vZGUuaHRtbCMxXHJcbi8vIEJ5IHVzaW5nIFJlcXVpcmVKUyBvbiB0aGUgc2VydmVyLCB5b3UgY2FuIHVzZSBvbmUgZm9ybWF0IGZvciBhbGwgeW91ciBtb2R1bGVzLCB3aGV0aGVyIHRoZXkgYXJlIHJ1bm5pbmcgc2VydmVyIHNpZGUgb3IgaW4gdGhlIGJyb3dzZXIuIChobW0uLi4pXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGNvbnN0IElMTEVHQUxfQ0hBUkFDVEVSUyA9IG5ldyBSZWdFeHAoL1tcXC1cXHNdKy8pO1xyXG5cclxuICBcdC8qKlxyXG4gIFx0ICogQ29udmVydCBzdHJpbmcgdG8gbG93ZXIgY2FzZSBhbmQgcmVtb3ZlIGlsbGVnYWwgY2hhcmFjdGVycy5cclxuICBcdCAqL1xyXG4gIFx0U3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZUFuZFJlbW92ZUlsbGVnYWxDaGFyYWN0ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgXHRcdGxldCBsb3dlckNhc2VWYWx1ZSA9IHRoaXMudG9Mb3dlckNhc2UoKTtcclxuICBcdFx0cmV0dXJuIGxvd2VyQ2FzZVZhbHVlLnJlcGxhY2UoSUxMRUdBTF9DSEFSQUNURVJTLCAnJyk7XHJcbiAgXHR9XHJcbiAgXHRcclxuXHQvKipcclxuXHQgKiBGaW5kIHdoaWNoIENTUyB0cmFuc2l0aW9uIGV2ZW50cyBlbmQuXHJcblx0ICogaHR0cHM6Ly9qb25zdWguY29tL2Jsb2cvZGV0ZWN0LXRoZS1lbmQtb2YtY3NzLWFuaW1hdGlvbnMtYW5kLXRyYW5zaXRpb25zLXdpdGgtamF2YXNjcmlwdC9cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3aGljaF90cmFuc2l0aW9uX2V2ZW50KCl7XHJcblx0ICB2YXIgdCxcclxuXHQgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKTtcclxuXHJcblx0ICB2YXIgdHJhbnNpdGlvbnMgPSB7XHJcblx0ICAgIFwidHJhbnNpdGlvblwiICAgICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJPVHJhbnNpdGlvblwiICAgICA6IFwib1RyYW5zaXRpb25FbmRcIixcclxuXHQgICAgXCJNb3pUcmFuc2l0aW9uXCIgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG5cdCAgICBcIldlYmtpdFRyYW5zaXRpb25cIjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJcclxuXHQgIH1cclxuXHJcblx0ICBmb3IgKHQgaW4gdHJhbnNpdGlvbnMpe1xyXG5cdCAgICBpZiAoZWwuc3R5bGVbdF0gIT09IHVuZGVmaW5lZCl7XHJcblx0ICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG5cdCAgICB9XHJcblx0ICB9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZWwgLSBUaGUgZWxlbWVudCB0aGF0IHdlIHdhbnQgdG8gZmluZCB0aGUgY3VycmVudCBwb3NpdGlvbiBpcyByZWxhdGl2ZSB0byB0aGUgd2luZG93LlxyXG5cdCAqIGh0dHBzOi8vd3d3LmtpcnVwYS5jb20vaHRtbDUvZ2V0X2VsZW1lbnRfcG9zaXRpb25fdXNpbmdfamF2YXNjcmlwdC5odG1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBnZXRfcG9zaXRpb24oZWwpIHtcclxuXHRcdHZhciB4UG9zID0gMDtcclxuXHRcdHZhciB5UG9zID0gMDtcclxuXHJcblx0XHR3aGlsZSAoZWwpIHtcclxuXHRcdFx0aWYgKGVsLnRhZ05hbWUgPT0gXCJCT0RZXCIpIHtcclxuXHRcdFx0XHQvLyBkZWFsIHdpdGggYnJvd3NlciBxdWlya3Mgd2l0aCBib2R5L3dpbmRvdy9kb2N1bWVudCBhbmQgcGFnZSBzY3JvbGxcclxuXHRcdFx0XHR2YXIgeFNjcm9sbCA9IGVsLnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcblx0XHRcdFx0dmFyIHlTY3JvbGwgPSBlbC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIHhTY3JvbGwgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSB5U2Nyb2xsICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBmb3IgYWxsIG90aGVyIG5vbi1CT0RZIGVsZW1lbnRzXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsID0gZWwub2Zmc2V0UGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IHhQb3MsXHJcblx0XHRcdHk6IHlQb3NcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kIHRoZSBmb2N1c2VkIGVsZW1lbnQ7IGl0IHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2hlbiB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgYmUgYmluZGVkIGJ5IGEgdHJhbnNpdGlvbiBlbmQgbGlzdGVuZXJcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gdGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0cmFuc2l0aW9uIGVuZFxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdHJhbnNpdGlvbl9lbmQoZWxlbWVudCwgY2FsbGJhY2spIHtcclxuXHQgICAgY29uc3QgdHJhbnNpdGlvbl9ldmVudCA9IHdoaWNoX3RyYW5zaXRpb25fZXZlbnQoKTtcclxuXHQgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRyYW5zaXRpb25fZXZlbnQsIGNhbGxiYWNrKTtcclxuICBcdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzcGxheSB0aGUgZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gc2hvd19lbGVtZW50KGVsZW1lbnQsIGRpc3BsYXkpIHtcclxuXHRcdGlmICh0eXBlb2YgZGlzcGxheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGlzcGxheSAhPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGUgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgaGlkZGVuLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGhpZGVfZWxlbWVudChlbGVtZW50KSB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRhcmd1bWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCBhIENTUyBjbGFzcyB0byBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIGFkZGVkIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGFkZF9jbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmICghZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSBhIENTUyBjbGFzcyBmcm9tIGFuIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgaGF2ZSB0aGUgc3BlY2lmaWVkIENTUyBjbGFzcyByZW1vdmVkLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gcmVtb3ZlX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0XHQvLyB3ZWlyZCBoYWNrIHJ1bGUgLSBodHRwczovL2Nzcy10cmlja3MuY29tL3Jlc3RhcnQtY3NzLWFuaW1hdGlvbi9cclxuXHRcdHZvaWQgZWxlbWVudC5vZmZzZXRXaWR0aDtcdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGUgd2hldGhlciB0byBhZGQgb3IgcmVtb3ZlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBhZGQgb3IgcmVtb3ZlIHRoZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiB0b2dnbGVfY2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVfY2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuICBcdFx0fSBlbHNlIHtcclxuICBcdFx0XHRhZGRfY2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcdFx0XHRcclxuICBcdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24oZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVfY2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuICBcdFx0fVxyXG4gIFx0XHRhZGRfY2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFZhbGlkYXRlIGlmIHVzZXIgaW5wdXQgaXMgYSBzdHJpbmcuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgdGV4dGZpZWxkIHRoYXQgd2lsbCBiZSB2YWxpZGF0ZWQuXHJcblx0ICovXHJcbiAgXHRmdW5jdGlvbiB2YWxpZGF0ZV9pZl9pbnB1dF9pc19kb3RhX2hlcm9fbmFtZShpbWFnZSwgdGV4dGZpZWxkKSB7XHJcblx0XHRpZiAoaW1hZ2UubmFtZS50b0xvd2VyQ2FzZUFuZFJlbW92ZUlsbGVnYWxDaGFyYWN0ZXJzKCkgPT09IHRleHRmaWVsZC52YWx1ZS50b0xvd2VyQ2FzZUFuZFJlbW92ZUlsbGVnYWxDaGFyYWN0ZXJzKCkpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgXHR9XHJcblxyXG4gIFx0cmV0dXJuIHtcclxuICBcdFx0dHJhbnNpdGlvbl9lbmQsXHJcbiAgXHRcdGdldF9wb3NpdGlvbixcclxuICBcdFx0c2hvd19lbGVtZW50LFxyXG4gIFx0XHRoaWRlX2VsZW1lbnQsXHJcbiAgXHRcdGFkZF9jbGFzcyxcclxuICBcdFx0cmVtb3ZlX2NsYXNzLFxyXG4gIFx0XHR0b2dnbGVfY2xhc3MsXHJcbiAgXHRcdHRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uLFxyXG4gIFx0XHR2YWxpZGF0ZV9pZl9pbnB1dF9pc19kb3RhX2hlcm9fbmFtZVxyXG4gIFx0fVxyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaGVscGVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0Y29uc3QgY29uZmlnID0ge1xyXG5cdFx0ZWxlbWVudHM6IHtcclxuXHRcdFx0Ly8gaW1hZ2VzXHJcblx0XHRcdGltYWdlczogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF0sXHJcblx0XHRcdGltYWdlc19wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzX3BhbmVsJylbMF0sXHJcblx0XHRcdGltYWdlOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZScpLFxyXG5cclxuXHRcdFx0Ly9mYWlsXHJcblx0XHRcdGZhaWxfYmFja2dyb3VuZDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbF9iYWNrZ3JvdW5kJylbMF0sXHJcblx0XHRcdGZhaWxfYnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFpbF9idXR0b24nKSxcclxuXHJcblx0XHRcdC8vc3VibWl0XHJcblx0XHRcdHN1Ym1pdF90ZXh0ZmllbGQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRfdGV4dGZpZWxkJyksXHJcblx0XHRcdHN1Ym1pdF9idXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRfYnV0dG9uJyksXHJcblxyXG5cdFx0XHQvL2luc3RydWN0aW9uXHJcblx0XHRcdGluc3RydWN0aW9uX3BhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnN0cnVjdGlvbl9wYW5lbCcpWzBdLFxyXG5cdFx0XHRzdGFydF9idXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydF9idXR0b24nKSxcclxuXHJcblx0XHRcdC8vY291bnRkb3duXHJcblx0XHRcdGNvdW50ZG93bl9wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50ZG93bl9wYW5lbCcpLFxyXG5cclxuXHRcdFx0Ly9zbGlkZXJcclxuXHRcdFx0YWRkX3BvaW50czogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkX3BvaW50cycpWzBdLFxyXG5cdFx0XHRzbGlkZXJfcGFuZWw6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlcl9wYW5lbCcpWzBdLFxyXG5cdFx0XHRoaWdoX3Njb3JlOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoaWdoX3Njb3JlJyksXHJcblx0XHRcdHJlc3VsdF90ZXh0OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZXN1bHRfdGV4dCcpWzBdLFxyXG5cclxuXHRcdFx0Ly9ib2R5XHJcblx0XHRcdHdyYXBwZXI6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dyYXBwZXInKVswXVxyXG5cdFx0fSxcclxuXHJcblx0XHRjb25zdGFudHM6IHtcclxuXHRcdFx0Q09VTlRET1dOX0RVUkFUSU9OOiAzLFxyXG5cdFx0XHRTTElERV9EVVJBVElPTjogMTAsXHJcblx0XHRcdFdBUk5JTkdfVEhSRVNIT0xEOiAzMCxcclxuXHRcdFx0UE9JTlRTX0FEREVEOiAxMDBcclxuXHRcdH0sXHJcblxyXG5cdFx0dGV4dDoge1xyXG5cdFx0XHQvL2ZhaWxcclxuXHRcdFx0ZmFpbF9tZXNzYWdlOiAnWW91IGxvc2UuLi4nLFxyXG5cclxuXHRcdFx0Ly93aW5cclxuXHRcdFx0c3VjY2Vzc19tZXNzYWdlOiAnRXogV2luIScsXHJcblxyXG5cdFx0XHRpbWFnZXNfanNvbl91cmw6ICdodHRwOi8vbGlsbW9ydGFsLXRlc3QuYXBpZ2VlLm5ldC9nZXRkb3RhaGVyb2VzP2tleT02QzFDRjc2QzkwNzY4Mzg4NjE4RjM0OEJCNzNFRTAxNSZsYW5ndWFnZT1lbl91cyZmb3JtYXQ9SlNPTidcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGNvbmZpZztcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbmZpZy5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBzbGlkZXIgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBhZnRlciB0aGUgY291bnRkb3duLiBJdCB3aWxsIGRpc3BsYXkgYW4gZW5kbGVzcyBzdHJlYW0gb2YgZG90YSBpbWFnZXMgdGhhdCBhcmUgcmV0cmlldmVkIHZpYSBEb3RhIEFQSS5cclxuICogSXQgd2lsbCBjb25zdGFudGx5IHRyYW5zaXRpb24gdG8gdGhlIGxlZnQgdW50aWwgaXQgcmVhY2hlcyB0byB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHBhbmVsIHRoYXQgaG9sZHMgdGhlIGltYWdlcywgd2hpY2ggaW4gdGhhdCBjYXNlIHRoZSBnYW1lXHJcbiAqIGxvc2UuIFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Y29uc3QgQ29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnLmpzJyk7XHJcblxyXG5cdGNvbnN0IGNvbmZpZyA9IENvbmZpZy5lbGVtZW50cztcclxuXHRjb25zdCBjb25zdGFudHMgPSBDb25maWcuY29uc3RhbnRzO1xyXG5cdGNvbnN0IHRleHQgPSBDb25maWcudGV4dDtcclxuXHJcblx0Y29uc3QgU2xpZGVyID0ge1x0XHJcblx0XHRjcmVhdGVfc2xpZGVyKCkge1xyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzLnNsaWRlcl9wYW5lbCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHNsaWRlcl9wYW5lbDoge1xyXG5cdFx0XHRzbGlkZSgpIHtcclxuXHRcdFx0XHRjb25zdCBzY3JlZW5fd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuXHRcdFx0ICAgIGNvbnN0IGRlZmF1bHRfd2lkdGggPSAoc2NyZWVuX3dpZHRoIC0gY29uZmlnLmltYWdlc19wYW5lbC5vZmZzZXRXaWR0aC8gMikgKyBjb25maWcuaW1hZ2VzX3BhbmVsLm9mZnNldFdpZHRoO1xyXG5cdFx0XHQgICAgY29uc3Qgd2FybmluZ193aWR0aCA9IGRlZmF1bHRfd2lkdGggKiBjb25zdGFudHMuV0FSTklOR19USFJFU0hPTEQgLyAxMDA7XHJcblx0XHRcdCAgICBsZXQgdGltZXI7XHJcblx0XHRcdFx0Y29uZmlnLmltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzAnO1xyXG5cdFx0XHQgICAgY29uZmlnLmltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gY29uc3RhbnRzLlNMSURFX0RVUkFUSU9OICsgJ3MgbGluZWFyJztcclxuXHRcdFx0XHRIZWxwZXIucmVtb3ZlX2NsYXNzKGNvbmZpZy5pbWFnZXNfcGFuZWwsICd3YXJuaW5nX2FuaW1hdGlvbicpO1xyXG5cclxuXHRcdFx0ICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG5cdFx0XHQgICAgXHRpZiAoSGVscGVyLmdldF9wb3NpdGlvbihjb25maWcuaW1hZ2VzKS54IDw9IHdhcm5pbmdfd2lkdGgpIHtcclxuXHRcdFx0XHRcdFx0SGVscGVyLmFkZF9jbGFzcyhjb25maWcuaW1hZ2VzX3BhbmVsLCAnd2FybmluZ19hbmltYXRpb24nKTtcclxuXHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdCAgICBcdH1cclxuXHRcdFx0ICAgIH0sIDEwMDApO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdGFydF9zbGlkZXIoKSB7XHJcblx0XHRcdFx0Y29uc3Qgc2xpZGVyX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdFx0XHRIZWxwZXIuc2hvd19lbGVtZW50KGNvbmZpZy5zbGlkZXJfcGFuZWwpO1xyXG5cdFx0XHRcdFx0dGhpcy5zbGlkZSgpO1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShjb25maWcuaW1hZ2VzKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm4gc2xpZGVyX3Byb21pc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIFNsaWRlcjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvc2xpZGVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0Y29uc3QgQnV0dG9uID0gcmVxdWlyZSgnLi9idXR0b24uanMnKTtcclxuXHRjb25zdCBDb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcuanMnKTtcclxuXHJcblx0Y29uc3QgY29uZmlnID0gQ29uZmlnLmVsZW1lbnRzO1xyXG5cdFxyXG5cdGNvbnN0IFRleHRmaWVsZCA9IHtcclxuXHRcdGNyZWF0ZV90ZXh0ZmllbGQoY2FsbGJhY2spIHtcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy50ZXh0ZmllbGRbY2FsbGJhY2tdKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0dGV4dGZpZWxkOiB7XHJcblx0XHRcdHN1Ym1pdF90ZXh0ZmllbGQ6IHtcclxuXHRcdFx0XHRzdWJtaXQoKSB7XHJcblx0XHRcdFx0XHRjb25zdCBzdWJtaXRfYnV0dG9uID0gQnV0dG9uLmNyZWF0ZV9idXR0b24oJ3N1Ym1pdF9idXR0b24nKTtcclxuXHJcblx0XHRcdFx0XHRjb25maWcuc3VibWl0X3RleHRmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuXHRcdFx0XHRcdFx0XHRzdWJtaXRfYnV0dG9uLnN1Ym1pdCgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gVGV4dGZpZWxkO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy90ZXh0ZmllbGQuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQ29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnLmpzJyk7XHJcblxyXG5cdGNvbnN0IGNvbmZpZyA9IENvbmZpZy5lbGVtZW50cztcclxuXHRjb25zdCB0ZXh0ID0gQ29uZmlnLnRleHQ7XHJcblxyXG5cdGNvbnN0IEltYWdlcyA9IHtcclxuXHRcdGdldF9zdGF0dXMocmVzcG9uc2UpIHtcclxuXHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRnZXRfanNvbihyZXNwb25zZSkge1xyXG5cdFx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0fSxcclxuXHRcdGxvYWRfaW1hZ2VzKCkge1xyXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdGZldGNoKHRleHQuaW1hZ2VzX2pzb25fdXJsKVxyXG5cdFx0XHQudGhlbih0aGlzLmdldF9zdGF0dXMpXHJcblx0XHRcdC50aGVuKHRoaXMuZ2V0X2pzb24pXHJcblx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGhlcm9lcyA9IHJlc3BvbnNlLnJlc3VsdC5oZXJvZXM7XHJcblx0XHQgICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGhlcm9lcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0Y29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHRcdFx0XHRcdGltYWdlLmNsYXNzTmFtZSA9ICdpbWFnZSc7XHJcblx0XHRcdFx0XHRpbWFnZS5zcmMgPSAnaHR0cDovL2Nkbi5kb3RhMi5jb20vYXBwcy9kb3RhMi9pbWFnZXMvaGVyb2VzLycgKyBoZXJvZXNbaV0ubmFtZS5yZXBsYWNlKCducGNfZG90YV9oZXJvXycsICcnKSArICdfbGcucG5nJztcclxuXHRcdFx0XHRcdC8vSXQgc2hvdWxkIGJlIFR1c2thciwgbm90IFR1c2shXHJcblx0XHRcdFx0XHRpZiAoaGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lID09PSAnVHVzaycpIHtcclxuXHRcdFx0XHRcdFx0aGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lID0gJ1R1c2thcic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpbWFnZS5uYW1lID0gaGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lO1xyXG5cdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25maWcuaW1hZ2VzLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBJbWFnZXM7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL2ltYWdlcy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=