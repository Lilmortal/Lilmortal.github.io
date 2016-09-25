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
						var self = this;
						config.start_button.addEventListener('click', function () {
							self[callback]();
						});
					},
					start: function start() {
						var self = this;
						Helper.toggle_class_for_animation(config.wrapper, 'grayscale_background_animation');
						Helper.hide_element(config.instruction_panel);
						self.start_slider_countdown().then(function (response) {
							self.start_slider().then(function (response) {
								self.display_fail_panel(response);
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
						var self = this;
						config.fail_button.addEventListener('click', function () {
							self[callback]();
						});
					},
					fail: function fail() {
						var self = this;
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
						self.start_slider_countdown().then(function (response) {
							self.start_slider().then(function (response) {
								self.display_fail_panel(response);
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
						var self = this;
						config.submit_button.addEventListener('click', function () {
							self[callback]();
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
				},
				slide: function slide() {
					var self = this;
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
					var self = this;
					var slider_promise = new Promise(function (resolve, reject) {
						if (config.images.children.length === 0) {
							self.load_images();
						}
						Helper.show_element(config.slider_panel);
						self.slide();
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWE5YzEwYWI0NmMwZTcxZjEzYjAiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvdGV4dGZpZWxkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBLEVBQUMsWUFBVztBQUNYOztBQUVBLE1BQU0sU0FBUyxvQkFBUSxDQUFSLENBQWY7QUFDQSxNQUFNLFlBQVksb0JBQVEsQ0FBUixDQUFsQjs7QUFFQSxNQUFNLGVBQWUsT0FBTyxhQUFQLENBQXFCLGNBQXJCLENBQXJCO0FBQ0EsZUFBYSxVQUFiLENBQXdCLE9BQXhCOztBQUVBLE1BQU0sY0FBYyxPQUFPLGFBQVAsQ0FBcUIsYUFBckIsQ0FBcEI7QUFDQSxjQUFZLFVBQVosQ0FBdUIsTUFBdkI7O0FBRUEsTUFBTSxnQkFBZ0IsT0FBTyxhQUFQLENBQXFCLGVBQXJCLENBQXRCO0FBQ0EsZ0JBQWMsVUFBZCxDQUF5QixRQUF6Qjs7QUFFQSxNQUFNLG1CQUFtQixVQUFVLGdCQUFWLENBQTJCLGtCQUEzQixDQUF6QjtBQUNBLG1CQUFpQixNQUFqQjtBQUNBLEVBakJE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S0FBa0MsQ0FBdEMsRUFBeUM7QUFDeEMsWUFBSyxXQUFMO0FBQ0E7QUFDRCxhQUFPLFlBQVAsQ0FBb0IsT0FBTyxZQUEzQjtBQUNBLFdBQUssS0FBTDtBQUNBLGNBQVEsT0FBTyxNQUFmO0FBQ0EsTUFQc0IsQ0FBdkI7QUFRQSxZQUFPLGNBQVA7QUFDQTtBQTlEWTtBQUxBLEdBQWY7QUFzRUEsU0FBTyxNQUFQO0FBQ0EsRUFqRmdCLEVBQWpCLEM7Ozs7Ozs7O0FDTEEsUUFBTyxPQUFQLEdBQWtCLFlBQVc7QUFDNUI7O0FBQ0EsTUFBTSxTQUFTLG9CQUFRLENBQVIsQ0FBZjs7QUFFQSxNQUFNLFlBQVk7QUFDakIsbUJBRGlCLDRCQUNBLFFBREEsRUFDVTtBQUMxQixXQUFPLE9BQU8sTUFBUCxDQUFjLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBZCxDQUFQO0FBQ0EsSUFIZ0I7OztBQUtqQixjQUFXO0FBQ1Ysc0JBQWtCO0FBQ2pCLFdBRGlCLG9CQUNSO0FBQ1IsVUFBTSxnQkFBZ0IsT0FBTyxhQUFQLENBQXFCLGVBQXJCLENBQXRCOztBQUVBLGFBQU8sZ0JBQVAsQ0FBd0IsZ0JBQXhCLENBQXlDLE9BQXpDLEVBQWtELFVBQVMsS0FBVCxFQUFnQjtBQUNqRSxXQUFJLE1BQU0sT0FBTixLQUFrQixFQUF0QixFQUEwQjtBQUN6QixzQkFBYyxNQUFkO0FBQ0E7QUFDRCxPQUpEO0FBS0E7QUFUZ0I7QUFEUjtBQUxNLEdBQWxCO0FBbUJBLFNBQU8sU0FBUDtBQUNBLEVBeEJnQixFQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNWE5YzEwYWI0NmMwZTcxZjEzYjBcbiAqKi8iLCIoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGNvbnN0IEJ1dHRvbiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9idXR0b24uanMnKTtcclxuXHRjb25zdCBUZXh0ZmllbGQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGV4dGZpZWxkLmpzJyk7XHJcblxyXG5cdGNvbnN0IHN0YXJ0X2J1dHRvbiA9IEJ1dHRvbi5jcmVhdGVfYnV0dG9uKCdzdGFydF9idXR0b24nKTtcclxuXHRzdGFydF9idXR0b24uaWZfY2xpY2tlZCgnc3RhcnQnKTtcclxuXHJcblx0Y29uc3QgZmFpbF9idXR0b24gPSBCdXR0b24uY3JlYXRlX2J1dHRvbignZmFpbF9idXR0b24nKTtcclxuXHRmYWlsX2J1dHRvbi5pZl9jbGlja2VkKCdmYWlsJyk7XHJcblxyXG5cdGNvbnN0IHN1Ym1pdF9idXR0b24gPSBCdXR0b24uY3JlYXRlX2J1dHRvbignc3VibWl0X2J1dHRvbicpO1xyXG5cdHN1Ym1pdF9idXR0b24uaWZfY2xpY2tlZCgnc3VibWl0Jyk7XHJcblxyXG5cdGNvbnN0IHN1Ym1pdF90ZXh0ZmllbGQgPSBUZXh0ZmllbGQuY3JlYXRlX3RleHRmaWVsZCgnc3VibWl0X3RleHRmaWVsZCcpO1xyXG5cdHN1Ym1pdF90ZXh0ZmllbGQuc3VibWl0KCk7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbml0LmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgYSBnZW5lcmljIGJ1dHRvbiwgd2hpY2ggaGFzIGEgbXVsdGl0dWRlIG9mIGdlbmVyaWMgdG8gc3BlY2lmaWMgZnVuY3Rpb25zIGZvciBhbGwgcG9zc2libGUgc2NlbmFyaW9zLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gQnV0dG9uXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQ291bnRkb3duX3BhbmVsID0gcmVxdWlyZSgnLi9jb3VudGRvd25fcGFuZWwuanMnKTtcclxuXHRjb25zdCBTbGlkZXIgPSByZXF1aXJlKCcuL3NsaWRlci5qcycpO1xyXG5cdGNvbnN0IEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci5qcycpO1xyXG5cdGNvbnN0IENvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZy5qcycpO1xyXG5cclxuXHRjb25zdCBjb25maWcgPSBDb25maWcuZWxlbWVudHM7XHJcblx0Y29uc3QgY29uc3RhbnRzID0gQ29uZmlnLmNvbnN0YW50cztcclxuXHRjb25zdCB0ZXh0ID0gQ29uZmlnLnRleHQ7XHJcblx0XHJcblx0bGV0IGltYWdlX2l0ZXJhdGlvbiA9IDA7XHJcblxyXG5cdGNvbnN0IEJ1dHRvbiA9IHtcclxuXHRcdGNyZWF0ZV9idXR0b24odHlwZSkge1xyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzLmJ1dHRvblt0eXBlXSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGJ1dHRvbjoge1xyXG5cdFx0XHRzdGFydF9idXR0b246IHtcdFxyXG5cdFx0XHRcdGlmX2NsaWNrZWQoY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRcdGNvbmZpZy5zdGFydF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0c2VsZltjYWxsYmFja10oKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhcnQoKSB7XHJcblx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdFx0XHRIZWxwZXIudG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24oY29uZmlnLndyYXBwZXIsICdncmF5c2NhbGVfYmFja2dyb3VuZF9hbmltYXRpb24nKTtcclxuXHRcdFx0XHRcdEhlbHBlci5oaWRlX2VsZW1lbnQoY29uZmlnLmluc3RydWN0aW9uX3BhbmVsKTtcclxuXHRcdFx0XHRcdHNlbGYuc3RhcnRfc2xpZGVyX2NvdW50ZG93bigpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0c2VsZi5zdGFydF9zbGlkZXIoKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZi5kaXNwbGF5X2ZhaWxfcGFuZWwocmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdGFydF9zbGlkZXJfY291bnRkb3duKGNvdW50ZG93bk51bWJlcikge1xyXG5cdFx0XHRcdFx0Y29uc3QgY291bnRkb3duX3BhbmVsID0gQ291bnRkb3duX3BhbmVsLmNyZWF0ZV9jb3VudGRvd25fcGFuZWwoKTtcclxuXHRcdFx0XHRcdHJldHVybiBjb3VudGRvd25fcGFuZWwuc3RhcnRfY291bnRkb3duX3RpbWVyKGNvdW50ZG93bk51bWJlcik7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdGFydF9zbGlkZXIoKSB7XHJcblx0XHRcdFx0XHRjb25zdCBzbGlkZXIgPSBTbGlkZXIuY3JlYXRlX3NsaWRlcigpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNsaWRlci5zdGFydF9zbGlkZXIoKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGRpc3BsYXlfZmFpbF9wYW5lbChpbWFnZXMpIHtcclxuXHRcdFx0XHRcdEhlbHBlci50cmFuc2l0aW9uX2VuZChpbWFnZXMsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRjb25maWcucmVzdWx0X3RleHQuaW5uZXJIVE1MID0gJ1lvdSBsb3NlLi4uJztcclxuXHRcdFx0XHRcdFx0SGVscGVyLnNob3dfZWxlbWVudChjb25maWcuZmFpbF9iYWNrZ3JvdW5kKTtcclxuXHRcdFx0XHRcdH0pO1x0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGZhaWxfYnV0dG9uOiB7XHJcblx0XHRcdFx0aWZfY2xpY2tlZChjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdFx0Y29uZmlnLmZhaWxfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHNlbGZbY2FsbGJhY2tdKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZhaWwoKSB7XHJcblx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdFx0XHRIZWxwZXIuaGlkZV9lbGVtZW50KGNvbmZpZy5mYWlsX2JhY2tncm91bmQsIGNvbmZpZy5zbGlkZXJfcGFuZWwpO1xyXG5cdFx0XHRcdFx0Ly8gcmVzZXQgdGhlIGltYWdlc1xyXG5cdFx0XHRcdFx0Y29uZmlnLmltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzEwMCUnO1xyXG5cdFx0ICBcdFx0XHRjb25maWcuaW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSAnMHMnO1xyXG5cdFx0ICBcdFx0ICBcdGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmltYWdlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHQgIFx0XHRcdFx0Y29uZmlnLmltYWdlW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdFx0ICBcdFx0XHR9XHJcblx0XHQgIFx0XHRcdGltYWdlX2l0ZXJhdGlvbiA9IDA7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5oaWdoX3Njb3JlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdGNvbmZpZy5oaWdoX3Njb3JlW2ldLmlubmVySFRNTCA9IDA7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25maWcuc3VibWl0X3RleHRmaWVsZC52YWx1ZSA9ICcnO1xyXG5cdFx0XHRcdFx0SGVscGVyLnJlbW92ZV9jbGFzcyhjb25maWcuc3VibWl0X3RleHRmaWVsZCwgJ3NoYWtlX3RleHRmaWVsZF9hbmltYXRpb24nKTtcclxuXHRcdFx0XHRcdEhlbHBlci5yZW1vdmVfY2xhc3MoY29uZmlnLmFkZF9wb2ludHMsICdhZGRfcG9pbnRzX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0Y29uZmlnLmFkZF9wb2ludHMuc3R5bGUub3BhY2l0eSA9IDA7XHJcblxyXG5cdFx0XHRcdFx0SGVscGVyLnRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKGNvbmZpZy53cmFwcGVyLCAnZ3JheXNjYWxlX2JhY2tncm91bmRfYW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0XHRzZWxmLnN0YXJ0X3NsaWRlcl9jb3VudGRvd24oKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdHNlbGYuc3RhcnRfc2xpZGVyKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGYuZGlzcGxheV9mYWlsX3BhbmVsKHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhcnRfc2xpZGVyX2NvdW50ZG93bihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGNvdW50ZG93bl9wYW5lbCA9IENvdW50ZG93bl9wYW5lbC5jcmVhdGVfY291bnRkb3duX3BhbmVsKCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gY291bnRkb3duX3BhbmVsLnN0YXJ0X2NvdW50ZG93bl90aW1lcihjb3VudGRvd25OdW1iZXIpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhcnRfc2xpZGVyKCkge1xyXG5cdFx0XHRcdFx0Y29uc3Qgc2xpZGVyID0gU2xpZGVyLmNyZWF0ZV9zbGlkZXIoKTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZXIuc3RhcnRfc2xpZGVyKCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRkaXNwbGF5X2ZhaWxfcGFuZWwoaW1hZ2VzKSB7XHJcblx0XHRcdFx0XHRIZWxwZXIudHJhbnNpdGlvbl9lbmQoaW1hZ2VzLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0Y29uZmlnLnJlc3VsdF90ZXh0LmlubmVySFRNTCA9IHRleHQuZmFpbF9tZXNzYWdlO1xyXG5cdFx0XHRcdFx0XHRIZWxwZXIuc2hvd19lbGVtZW50KGNvbmZpZy5mYWlsX2JhY2tncm91bmQpO1xyXG5cdFx0XHRcdFx0fSk7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0c3VibWl0X2J1dHRvbjoge1xyXG5cdFx0XHRcdGlmX2NsaWNrZWQoY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRcdGNvbmZpZy5zdWJtaXRfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHNlbGZbY2FsbGJhY2tdKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN1Ym1pdCgpIHtcclxuXHRcdFx0ICBcdFx0aWYgKEhlbHBlci52YWxpZGF0ZV9pZl9pbnB1dF9pc19kb3RhX2hlcm9fbmFtZShjb25maWcuaW1hZ2VbaW1hZ2VfaXRlcmF0aW9uXSwgY29uZmlnLnN1Ym1pdF90ZXh0ZmllbGQpKSB7XHJcblx0XHRcdCAgXHRcdFx0SGVscGVyLmhpZGVfZWxlbWVudChjb25maWcuaW1hZ2VbaW1hZ2VfaXRlcmF0aW9uXSk7XHJcblx0XHRcdCAgXHRcdFx0aW1hZ2VfaXRlcmF0aW9uKys7XHJcblx0XHRcdCAgXHRcdFx0Y29uZmlnLmFkZF9wb2ludHMuaW5uZXJIVE1MID0gJysnICsgY29uc3RhbnRzLlBPSU5UU19BRERFRDtcclxuXHRcdFx0ICBcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5oaWdoX3Njb3JlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdCAgXHRcdFx0XHRjb25maWcuaGlnaF9zY29yZVtpXS5pbm5lckhUTUwgPSBwYXJzZUludChjb25maWcuaGlnaF9zY29yZVtpXS5pbm5lckhUTUwpICsgcGFyc2VJbnQoY29uc3RhbnRzLlBPSU5UU19BRERFRCk7XHJcblx0XHRcdCAgXHRcdFx0fVxyXG5cdFx0XHQgIFx0XHRcdEhlbHBlci50b2dnbGVfY2xhc3NfZm9yX2FuaW1hdGlvbihjb25maWcuYWRkX3BvaW50cywgJ2FkZF9wb2ludHNfYW5pbWF0aW9uJyk7XHJcblx0XHRcdCAgXHRcdFx0SGVscGVyLnJlbW92ZV9jbGFzcyhjb25maWcuc3VibWl0X3RleHRmaWVsZCwgJ3NoYWtlX3RleHRmaWVsZF9hbmltYXRpb24nKTtcclxuXHRcdFx0ICBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0SGVscGVyLnRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKGNvbmZpZy5zdWJtaXRfdGV4dGZpZWxkLCAnc2hha2VfdGV4dGZpZWxkX2FuaW1hdGlvbicpO1xyXG5cdFx0XHQgIFx0XHR9XHJcblx0XHRcdCAgXHRcdGNvbmZpZy5zdWJtaXRfdGV4dGZpZWxkLnZhbHVlID0gJyc7XHJcblx0XHRcdCAgXHRcdGlmICh0eXBlb2YgY29uZmlnLmltYWdlW2ltYWdlX2l0ZXJhdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdCAgXHRcdFx0Y29uZmlnLnJlc3VsdF90ZXh0LmlubmVySFRNTCA9IHRleHQuc3VjY2Vzc19tZXNzYWdlO1xyXG5cdFx0XHQgIFx0XHRcdEhlbHBlci5zaG93X2VsZW1lbnQoY29uZmlnLmZhaWxfYmFja2dyb3VuZCk7XHJcblx0XHRcdCAgXHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIEJ1dHRvbjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvYnV0dG9uLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGNvdW50ZG93biBwYW5lbDsgaXQgd2lsbCBjb3VudGRvd24gdW50aWwgaXQgcmVhY2hlcyAwIGJlZm9yZSBpdCBkaXNwbGF5cyB0aGUgc2xpZGVyIHBhbmVsLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Y29uc3QgQ29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnLmpzJyk7XHJcblxyXG5cdGNvbnN0IGNvbmZpZyA9IENvbmZpZy5lbGVtZW50cztcclxuXHRjb25zdCBjb25zdGFudHMgPSBDb25maWcuY29uc3RhbnRzO1xyXG5cclxuXHRjb25zdCBDb3VudGRvd25fcGFuZWwgPSB7XHJcblx0XHRjcmVhdGVfY291bnRkb3duX3BhbmVsKCkge1xyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzLmNvdW50ZG93bl9wYW5lbCk7XHJcblx0XHR9LFxyXG5cdFx0Y291bnRkb3duX3BhbmVsOiB7XHJcblx0XHRcdHN0YXJ0X2NvdW50ZG93bl90aW1lcigpIHtcclxuXHRcdFx0XHRsZXQgY291bnRkb3duX2R1cmF0aW9uID0gY29uc3RhbnRzLkNPVU5URE9XTl9EVVJBVElPTjtcclxuXHRcdFx0XHRjb25zdCBjb3VudGRvd25fcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRcdFx0SGVscGVyLnNob3dfZWxlbWVudChjb25maWcuY291bnRkb3duX3BhbmVsKTtcclxuXHRcdFx0XHRcdGNvbmZpZy5jb3VudGRvd25fcGFuZWwuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRcdFx0XHRcdGNvbnN0IGNvdW50ZG93bl90aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQgICAgICBcdFx0aWYgKGNvdW50ZG93bl9kdXJhdGlvbiA9PT0gMCkge1xyXG5cdFx0XHQgICAgICAgIFx0XHRjbGVhckludGVydmFsKGNvdW50ZG93bl90aW1lcik7XHJcblx0XHRcdCAgICAgICAgXHRcdEhlbHBlci5oaWRlX2VsZW1lbnQoY29uZmlnLmNvdW50ZG93bl9wYW5lbCk7XHJcblx0XHRcdCAgICAgICAgXHRcdHJlc29sdmUoXCJTdWNjZXNzXCIpO1xyXG5cdFx0XHQgICAgICAgIFx0fVxyXG5cdFx0XHQgICAgICAgIFx0Y29uZmlnLmNvdW50ZG93bl9wYW5lbC5pbm5lckhUTUwgPSBjb3VudGRvd25fZHVyYXRpb24tLTtcclxuXHRcdFx0ICAgIFx0fSwgMTAwMCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuIGNvdW50ZG93bl9wcm9taXNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBDb3VudGRvd25fcGFuZWw7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qc1xuICoqLyIsIi8vIGlzIGl0IHJlYWxseSB0aGUgYmVzdCB3YXk/Pz8gbG9vayB1cCBDb21tb25KUy9BTUQvRVM2IGltcG9ydC9leHBvcnQgKDwtLSBJIGd1ZXNzIHRoaXMgaXMgT0sgc28gZmFyKVxyXG4vLyBXaGF0IGFib3V0IGluc3RlYWQgb2YgSGVscGVyLm1ldGhvZCgpLCB1c2UgT2JqZWN0LmNyZWF0ZT8gRG9lcyB0aGlzIGhlbHA/XHJcbi8vIGh0dHA6Ly9yZXF1aXJlanMub3JnL2RvY3Mvbm9kZS5odG1sIzFcclxuLy8gQnkgdXNpbmcgUmVxdWlyZUpTIG9uIHRoZSBzZXJ2ZXIsIHlvdSBjYW4gdXNlIG9uZSBmb3JtYXQgZm9yIGFsbCB5b3VyIG1vZHVsZXMsIHdoZXRoZXIgdGhleSBhcmUgcnVubmluZyBzZXJ2ZXIgc2lkZSBvciBpbiB0aGUgYnJvd3Nlci4gKGhtbS4uLilcclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0Y29uc3QgSUxMRUdBTF9DSEFSQUNURVJTID0gbmV3IFJlZ0V4cCgvW1xcLVxcc10rLyk7XHJcblxyXG4gIFx0LyoqXHJcbiAgXHQgKiBDb252ZXJ0IHN0cmluZyB0byBsb3dlciBjYXNlIGFuZCByZW1vdmUgaWxsZWdhbCBjaGFyYWN0ZXJzLlxyXG4gIFx0ICovXHJcbiAgXHRTdHJpbmcucHJvdG90eXBlLnRvTG93ZXJDYXNlQW5kUmVtb3ZlSWxsZWdhbENoYXJhY3RlcnMgPSBmdW5jdGlvbigpIHtcclxuICBcdFx0bGV0IGxvd2VyQ2FzZVZhbHVlID0gdGhpcy50b0xvd2VyQ2FzZSgpO1xyXG4gIFx0XHRyZXR1cm4gbG93ZXJDYXNlVmFsdWUucmVwbGFjZShJTExFR0FMX0NIQVJBQ1RFUlMsICcnKTtcclxuICBcdH1cclxuICBcdFxyXG5cdC8qKlxyXG5cdCAqIEZpbmQgd2hpY2ggQ1NTIHRyYW5zaXRpb24gZXZlbnRzIGVuZC5cclxuXHQgKiBodHRwczovL2pvbnN1aC5jb20vYmxvZy9kZXRlY3QtdGhlLWVuZC1vZi1jc3MtYW5pbWF0aW9ucy1hbmQtdHJhbnNpdGlvbnMtd2l0aC1qYXZhc2NyaXB0L1xyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHdoaWNoX3RyYW5zaXRpb25fZXZlbnQoKXtcclxuXHQgIHZhciB0LFxyXG5cdCAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZha2VlbGVtZW50XCIpO1xyXG5cclxuXHQgIHZhciB0cmFuc2l0aW9ucyA9IHtcclxuXHQgICAgXCJ0cmFuc2l0aW9uXCIgICAgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG5cdCAgICBcIk9UcmFuc2l0aW9uXCIgICAgIDogXCJvVHJhbnNpdGlvbkVuZFwiLFxyXG5cdCAgICBcIk1velRyYW5zaXRpb25cIiAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiV2Via2l0VHJhbnNpdGlvblwiOiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIlxyXG5cdCAgfVxyXG5cclxuXHQgIGZvciAodCBpbiB0cmFuc2l0aW9ucyl7XHJcblx0ICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKXtcclxuXHQgICAgICByZXR1cm4gdHJhbnNpdGlvbnNbdF07XHJcblx0ICAgIH1cclxuXHQgIH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBlbCAtIFRoZSBlbGVtZW50IHRoYXQgd2Ugd2FudCB0byBmaW5kIHRoZSBjdXJyZW50IHBvc2l0aW9uIGlzIHJlbGF0aXZlIHRvIHRoZSB3aW5kb3cuXHJcblx0ICogaHR0cHM6Ly93d3cua2lydXBhLmNvbS9odG1sNS9nZXRfZWxlbWVudF9wb3NpdGlvbl91c2luZ19qYXZhc2NyaXB0Lmh0bVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGdldF9wb3NpdGlvbihlbCkge1xyXG5cdFx0dmFyIHhQb3MgPSAwO1xyXG5cdFx0dmFyIHlQb3MgPSAwO1xyXG5cclxuXHRcdHdoaWxlIChlbCkge1xyXG5cdFx0XHRpZiAoZWwudGFnTmFtZSA9PSBcIkJPRFlcIikge1xyXG5cdFx0XHRcdC8vIGRlYWwgd2l0aCBicm93c2VyIHF1aXJrcyB3aXRoIGJvZHkvd2luZG93L2RvY3VtZW50IGFuZCBwYWdlIHNjcm9sbFxyXG5cdFx0XHRcdHZhciB4U2Nyb2xsID0gZWwuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuXHRcdFx0XHR2YXIgeVNjcm9sbCA9IGVsLnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHR4UG9zICs9IChlbC5vZmZzZXRMZWZ0IC0geFNjcm9sbCArIGVsLmNsaWVudExlZnQpO1xyXG5cdFx0XHRcdHlQb3MgKz0gKGVsLm9mZnNldFRvcCAtIHlTY3JvbGwgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIGZvciBhbGwgb3RoZXIgbm9uLUJPRFkgZWxlbWVudHNcclxuXHRcdFx0XHR4UG9zICs9IChlbC5vZmZzZXRMZWZ0IC0gZWwuc2Nyb2xsTGVmdCArIGVsLmNsaWVudExlZnQpO1xyXG5cdFx0XHRcdHlQb3MgKz0gKGVsLm9mZnNldFRvcCAtIGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudFRvcCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogeFBvcyxcclxuXHRcdFx0eTogeVBvc1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmQgdGhlIGZvY3VzZWQgZWxlbWVudDsgaXQgd2lsbCBjYWxsIHRoZSBjYWxsYmFjayB3aGVuIHRyYW5zaXRpb24gZW5kcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IHRoZSBvYmplY3Qgd2hpY2ggd2lsbCBiZSBiaW5kZWQgYnkgYSB0cmFuc2l0aW9uIGVuZCBsaXN0ZW5lclxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSB0aGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRyYW5zaXRpb24gZW5kXHJcblx0ICovXHJcbiAgXHRmdW5jdGlvbiB0cmFuc2l0aW9uX2VuZChlbGVtZW50LCBjYWxsYmFjaykge1xyXG5cdCAgICBjb25zdCB0cmFuc2l0aW9uX2V2ZW50ID0gd2hpY2hfdHJhbnNpdGlvbl9ldmVudCgpO1xyXG5cdCAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbl9ldmVudCwgY2FsbGJhY2spO1xyXG4gIFx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwbGF5IHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGRpc3BsYXllZC5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBzaG93X2VsZW1lbnQoZWxlbWVudCwgZGlzcGxheSkge1xyXG5cdFx0aWYgKHR5cGVvZiBkaXNwbGF5ICE9PSAndW5kZWZpbmVkJyAmJiBkaXNwbGF5ICE9PSAnJykge1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGlkZSB0aGUgZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSBoaWRkZW4uXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gaGlkZV9lbGVtZW50KGVsZW1lbnQpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGFyZ3VtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIGEgQ1NTIGNsYXNzIHRvIGFuIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgaGF2ZSB0aGUgYWRkZWQgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gYWRkX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKCFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGEgQ1NTIGNsYXNzIGZyb20gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBzcGVjaWZpZWQgQ1NTIGNsYXNzIHJlbW92ZWQuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiByZW1vdmVfY2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHRcdC8vIHdlaXJkIGhhY2sgcnVsZSAtIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vcmVzdGFydC1jc3MtYW5pbWF0aW9uL1xyXG5cdFx0dm9pZCBlbGVtZW50Lm9mZnNldFdpZHRoO1x0XHRcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZSB3aGV0aGVyIHRvIGFkZCBvciByZW1vdmUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGFkZCBvciByZW1vdmUgdGhlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHRvZ2dsZV9jbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZV9jbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG4gIFx0XHR9IGVsc2Uge1xyXG4gIFx0XHRcdGFkZF9jbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1x0XHRcdFxyXG4gIFx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGUgd2hldGhlciB0byBhZGQgb3IgcmVtb3ZlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBhZGQgb3IgcmVtb3ZlIHRoZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiB0b2dnbGVfY2xhc3NfZm9yX2FuaW1hdGlvbihlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZV9jbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG4gIFx0XHR9XHJcbiAgXHRcdGFkZF9jbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVmFsaWRhdGUgaWYgdXNlciBpbnB1dCBpcyBhIHN0cmluZy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSB0ZXh0ZmllbGQgdGhhdCB3aWxsIGJlIHZhbGlkYXRlZC5cclxuXHQgKi9cclxuICBcdGZ1bmN0aW9uIHZhbGlkYXRlX2lmX2lucHV0X2lzX2RvdGFfaGVyb19uYW1lKGltYWdlLCB0ZXh0ZmllbGQpIHtcclxuXHRcdGlmIChpbWFnZS5uYW1lLnRvTG93ZXJDYXNlQW5kUmVtb3ZlSWxsZWdhbENoYXJhY3RlcnMoKSA9PT0gdGV4dGZpZWxkLnZhbHVlLnRvTG93ZXJDYXNlQW5kUmVtb3ZlSWxsZWdhbENoYXJhY3RlcnMoKSkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuICBcdH1cclxuXHJcbiAgXHRyZXR1cm4ge1xyXG4gIFx0XHR0cmFuc2l0aW9uX2VuZCxcclxuICBcdFx0Z2V0X3Bvc2l0aW9uLFxyXG4gIFx0XHRzaG93X2VsZW1lbnQsXHJcbiAgXHRcdGhpZGVfZWxlbWVudCxcclxuICBcdFx0YWRkX2NsYXNzLFxyXG4gIFx0XHRyZW1vdmVfY2xhc3MsXHJcbiAgXHRcdHRvZ2dsZV9jbGFzcyxcclxuICBcdFx0dG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24sXHJcbiAgXHRcdHZhbGlkYXRlX2lmX2lucHV0X2lzX2RvdGFfaGVyb19uYW1lXHJcbiAgXHR9XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9oZWxwZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRjb25zdCBjb25maWcgPSB7XHJcblx0XHRlbGVtZW50czoge1xyXG5cdFx0XHQvLyBpbWFnZXNcclxuXHRcdFx0aW1hZ2VzOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXSxcclxuXHRcdFx0aW1hZ2VzX3BhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXNfcGFuZWwnKVswXSxcclxuXHRcdFx0aW1hZ2U6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlJyksXHJcblxyXG5cdFx0XHQvL2ZhaWxcclxuXHRcdFx0ZmFpbF9iYWNrZ3JvdW5kOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmYWlsX2JhY2tncm91bmQnKVswXSxcclxuXHRcdFx0ZmFpbF9idXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWlsX2J1dHRvbicpLFxyXG5cclxuXHRcdFx0Ly9zdWJtaXRcclxuXHRcdFx0c3VibWl0X3RleHRmaWVsZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdF90ZXh0ZmllbGQnKSxcclxuXHRcdFx0c3VibWl0X2J1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdF9idXR0b24nKSxcclxuXHJcblx0XHRcdC8vaW5zdHJ1Y3Rpb25cclxuXHRcdFx0aW5zdHJ1Y3Rpb25fcGFuZWw6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2luc3RydWN0aW9uX3BhbmVsJylbMF0sXHJcblx0XHRcdHN0YXJ0X2J1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0X2J1dHRvbicpLFxyXG5cclxuXHRcdFx0Ly9jb3VudGRvd25cclxuXHRcdFx0Y291bnRkb3duX3BhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRkb3duX3BhbmVsJyksXHJcblxyXG5cdFx0XHQvL3NsaWRlclxyXG5cdFx0XHRhZGRfcG9pbnRzOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRfcG9pbnRzJylbMF0sXHJcblx0XHRcdHNsaWRlcl9wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX3BhbmVsJylbMF0sXHJcblx0XHRcdGhpZ2hfc2NvcmU6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hpZ2hfc2NvcmUnKSxcclxuXHRcdFx0cmVzdWx0X3RleHQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Jlc3VsdF90ZXh0JylbMF0sXHJcblxyXG5cdFx0XHQvL2JvZHlcclxuXHRcdFx0d3JhcHBlcjogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd3JhcHBlcicpWzBdXHJcblx0XHR9LFxyXG5cclxuXHRcdGNvbnN0YW50czoge1xyXG5cdFx0XHRDT1VOVERPV05fRFVSQVRJT046IDMsXHJcblx0XHRcdFNMSURFX0RVUkFUSU9OOiAxMCxcclxuXHRcdFx0V0FSTklOR19USFJFU0hPTEQ6IDMwLFxyXG5cdFx0XHRQT0lOVFNfQURERUQ6IDEwMFxyXG5cdFx0fSxcclxuXHJcblx0XHR0ZXh0OiB7XHJcblx0XHRcdC8vZmFpbFxyXG5cdFx0XHRmYWlsX21lc3NhZ2U6ICdZb3UgbG9zZS4uLicsXHJcblxyXG5cdFx0XHQvL3dpblxyXG5cdFx0XHRzdWNjZXNzX21lc3NhZ2U6ICdFeiBXaW4hJyxcclxuXHJcblx0XHRcdGltYWdlc19qc29uX3VybDogJ2h0dHA6Ly9saWxtb3J0YWwtdGVzdC5hcGlnZWUubmV0L2dldGRvdGFoZXJvZXM/a2V5PTZDMUNGNzZDOTA3NjgzODg2MThGMzQ4QkI3M0VFMDE1Jmxhbmd1YWdlPWVuX3VzJmZvcm1hdD1KU09OJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gY29uZmlnO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29uZmlnLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIHNsaWRlciB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGFmdGVyIHRoZSBjb3VudGRvd24uIEl0IHdpbGwgZGlzcGxheSBhbiBlbmRsZXNzIHN0cmVhbSBvZiBkb3RhIGltYWdlcyB0aGF0IGFyZSByZXRyaWV2ZWQgdmlhIERvdGEgQVBJLlxyXG4gKiBJdCB3aWxsIGNvbnN0YW50bHkgdHJhbnNpdGlvbiB0byB0aGUgbGVmdCB1bnRpbCBpdCByZWFjaGVzIHRvIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgcGFuZWwgdGhhdCBob2xkcyB0aGUgaW1hZ2VzLCB3aGljaCBpbiB0aGF0IGNhc2UgdGhlIGdhbWVcclxuICogbG9zZS4gXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHRjb25zdCBDb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcuanMnKTtcclxuXHJcblx0Y29uc3QgY29uZmlnID0gQ29uZmlnLmVsZW1lbnRzO1xyXG5cdGNvbnN0IGNvbnN0YW50cyA9IENvbmZpZy5jb25zdGFudHM7XHJcblx0Y29uc3QgdGV4dCA9IENvbmZpZy50ZXh0O1xyXG5cclxuXHRjb25zdCBTbGlkZXIgPSB7XHRcclxuXHRcdGNyZWF0ZV9zbGlkZXIoKSB7XHJcblx0XHRcdHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMuc2xpZGVyX3BhbmVsKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0c2xpZGVyX3BhbmVsOiB7XHJcblx0XHRcdGdldF9zdGF0dXMocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCkpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGdldF9qc29uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0bG9hZF9pbWFnZXMoKSB7XHJcblx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdGZldGNoKHRleHQuaW1hZ2VzX2pzb25fdXJsKVxyXG5cdFx0XHRcdC50aGVuKHRoaXMuZ2V0X3N0YXR1cylcclxuXHRcdFx0XHQudGhlbih0aGlzLmdldF9qc29uKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgaGVyb2VzID0gcmVzcG9uc2UucmVzdWx0Lmhlcm9lcztcclxuXHRcdFx0ICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGhlcm9lcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cdFx0XHRcdFx0XHRpbWFnZS5jbGFzc05hbWUgPSAnaW1hZ2UnO1xyXG5cdFx0XHRcdFx0XHRpbWFnZS5zcmMgPSAnaHR0cDovL2Nkbi5kb3RhMi5jb20vYXBwcy9kb3RhMi9pbWFnZXMvaGVyb2VzLycgKyBoZXJvZXNbaV0ubmFtZS5yZXBsYWNlKCducGNfZG90YV9oZXJvXycsICcnKSArICdfbGcucG5nJztcclxuXHRcdFx0XHRcdFx0Ly9JdCBzaG91bGQgYmUgVHVza2FyLCBub3QgVHVzayFcclxuXHRcdFx0XHRcdFx0aWYgKGhlcm9lc1tpXS5sb2NhbGl6ZWRfbmFtZSA9PT0gJ1R1c2snKSB7XHJcblx0XHRcdFx0XHRcdFx0aGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lID0gJ1R1c2thcic7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aW1hZ2UubmFtZSA9IGhlcm9lc1tpXS5sb2NhbGl6ZWRfbmFtZTtcclxuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uZmlnLmltYWdlcy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSxcclxuXHRcdFx0c2xpZGUoKSB7XHJcblx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdGNvbnN0IHNjcmVlbl93aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cdFx0XHQgICAgY29uc3QgZGVmYXVsdF93aWR0aCA9IChzY3JlZW5fd2lkdGggLSBjb25maWcuaW1hZ2VzX3BhbmVsLm9mZnNldFdpZHRoLyAyKSArIGNvbmZpZy5pbWFnZXNfcGFuZWwub2Zmc2V0V2lkdGg7XHJcblx0XHRcdCAgICBjb25zdCB3YXJuaW5nX3dpZHRoID0gZGVmYXVsdF93aWR0aCAqIGNvbnN0YW50cy5XQVJOSU5HX1RIUkVTSE9MRCAvIDEwMDtcclxuXHRcdFx0ICAgIGxldCB0aW1lcjtcclxuXHRcdFx0XHRjb25maWcuaW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMCc7XHJcblx0XHRcdCAgICBjb25maWcuaW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSBjb25zdGFudHMuU0xJREVfRFVSQVRJT04gKyAncyBsaW5lYXInO1xyXG5cdFx0XHRcdEhlbHBlci5yZW1vdmVfY2xhc3MoY29uZmlnLmltYWdlc19wYW5lbCwgJ3dhcm5pbmdfYW5pbWF0aW9uJyk7XHJcblxyXG5cdFx0XHQgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHRcdFx0ICAgIFx0aWYgKEhlbHBlci5nZXRfcG9zaXRpb24oY29uZmlnLmltYWdlcykueCA8PSB3YXJuaW5nX3dpZHRoKSB7XHJcblx0XHRcdFx0XHRcdEhlbHBlci5hZGRfY2xhc3MoY29uZmlnLmltYWdlc19wYW5lbCwgJ3dhcm5pbmdfYW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdFx0XHQgICAgXHR9XHJcblx0XHRcdCAgICB9LCAxMDAwKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c3RhcnRfc2xpZGVyKCkge1xyXG5cdFx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRjb25zdCBzbGlkZXJfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRcdFx0aWYgKGNvbmZpZy5pbWFnZXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdHNlbGYubG9hZF9pbWFnZXMoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdEhlbHBlci5zaG93X2VsZW1lbnQoY29uZmlnLnNsaWRlcl9wYW5lbCk7XHJcblx0XHRcdFx0XHRzZWxmLnNsaWRlKCk7XHJcblx0XHRcdFx0XHRyZXNvbHZlKGNvbmZpZy5pbWFnZXMpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybiBzbGlkZXJfcHJvbWlzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gU2xpZGVyO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9zbGlkZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRjb25zdCBCdXR0b24gPSByZXF1aXJlKCcuL2J1dHRvbi5qcycpO1xyXG5cdFxyXG5cdGNvbnN0IFRleHRmaWVsZCA9IHtcclxuXHRcdGNyZWF0ZV90ZXh0ZmllbGQoY2FsbGJhY2spIHtcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy50ZXh0ZmllbGRbY2FsbGJhY2tdKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0dGV4dGZpZWxkOiB7XHJcblx0XHRcdHN1Ym1pdF90ZXh0ZmllbGQ6IHtcclxuXHRcdFx0XHRzdWJtaXQoKSB7XHJcblx0XHRcdFx0XHRjb25zdCBzdWJtaXRfYnV0dG9uID0gQnV0dG9uLmNyZWF0ZV9idXR0b24oJ3N1Ym1pdF9idXR0b24nKTtcclxuXHJcblx0XHRcdFx0XHRjb25maWcuc3VibWl0X3RleHRmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0XHRcdGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG5cdFx0XHRcdFx0XHRcdHN1Ym1pdF9idXR0b24uc3VibWl0KCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1x0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBUZXh0ZmllbGQ7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL3RleHRmaWVsZC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=